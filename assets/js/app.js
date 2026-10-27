(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Toast
  const toastEl = $('.toast');
  let toastTimer;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.setAttribute('data-show', '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.removeAttribute('data-show'), 1800);
  };

  // Theme: explicit choice overrides the system setting.
  $('.theme').addEventListener('click', () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // Copy install commands and page links.
  const copy = async (text, msg, el) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(msg);
      if (el) { el.setAttribute('data-copied', ''); setTimeout(() => el.removeAttribute('data-copied'), 1500); }
    } catch (e) {
      toast('복사하지 못했습니다. 직접 선택해서 복사해 주세요.');
    }
  };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-copy]');
    if (c) return copy(c.dataset.copy, '설치 명령을 복사했습니다.', c);
    if (e.target.closest('[data-share]')) copy(location.href, '링크를 복사했습니다.');
  });

  // Search: "/" or Cmd/Ctrl+K focuses the search field.
  const search = $('#q');
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      search.focus();
      search.select();
    } else if (e.key === 'Escape' && document.activeElement === search) {
      search.blur();
    }
  });

  // Card hover: play the demo inside the thumbnail frame (loaded on first hover only).
  if (!reduceMotion) {
    document.addEventListener('pointerover', (e) => {
      const card = e.target.closest('.card');
      if (!card || e.pointerType !== 'mouse' || card.contains(e.relatedTarget)) return;
      const m = $('.card-media video, .card-media .card-demo', card);
      if (!m) return;
      if (!m.src) m.src = m.dataset.src;
      card.setAttribute('data-playing', '');
      if (m.play) m.play().catch(() => {});
    });
    document.addEventListener('pointerout', (e) => {
      const card = e.target.closest('.card');
      if (!card || card.contains(e.relatedTarget)) return;
      card.removeAttribute('data-playing');
      const v = $('.card-media video', card);
      if (v) { v.pause(); v.currentTime = 0; }
    });
  }

  // Detail page: demo / screenshot tabs.
  const tabs = $$('.showcase [role="tab"]');
  const selectTab = (t) => {
    tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(x.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (!on) $$('video', panel).forEach((v) => v.pause());
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const next = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  // Catalog: search, tag, member, sort, view — all reflected in the URL.
  const catalog = $('#catalog');
  if (catalog) {
    const params = new URLSearchParams(location.search);
    const state = {
      q: params.get('q') || '',
      tag: params.get('tag') || '',
      author: params.get('author') || '',
      sort: params.get('sort') === 'name' ? 'name' : 'new',
      view: params.get('view') === 'people' ? 'people' : 'all',
    };
    const authorSel = $('[data-filter="author"]', catalog);
    const sortSel = $('[data-filter="sort"]', catalog);
    search.value = state.q;

    // People view: groups ordered by project count, collapsed ones remembered per browser.
    const groups = $$('[data-group]', catalog);
    const peoplePanel = $('[data-panel="people"]', catalog);
    groups
      .sort((a, b) => b.dataset.total - a.dataset.total || a.dataset.name.localeCompare(b.dataset.name, 'ko'))
      .forEach((g) => peoplePanel.appendChild(g));
    const toggleAll = $('[data-toggle-all]', catalog);
    const KEY = 'collapsed-members';
    let collapsed = [];
    try { collapsed = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
    const details = (g) => $('details', g);
    const syncToggleAll = () => {
      toggleAll.textContent = groups.some((g) => details(g).open) ? '모두 접기' : '모두 펼치기';
    };
    groups.forEach((g) => {
      if (collapsed.includes(g.dataset.group)) details(g).open = false;
      details(g).addEventListener('toggle', () => {
        const closed = groups.filter((x) => !details(x).open).map((x) => x.dataset.group);
        try { localStorage.setItem(KEY, JSON.stringify(closed)); } catch (e) {}
        syncToggleAll();
      });
    });
    toggleAll.addEventListener('click', () => {
      const open = !groups.some((g) => details(g).open);
      groups.forEach((g) => { details(g).open = open; });
    });
    syncToggleAll();

    const sortGrid = (grid) => {
      const cards = $$('.card', grid);
      cards.sort((a, b) => state.sort === 'name'
        ? a.dataset.title.localeCompare(b.dataset.title, 'ko')
        : b.dataset.date.localeCompare(a.dataset.date));
      cards.forEach((c) => grid.appendChild(c));
    };

    const apply = () => {
      const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      const match = (c) =>
        terms.every((t) => c.dataset.text.includes(t)) &&
        (!state.tag || c.dataset.tags.split(',').includes(state.tag)) &&
        (!state.author || c.dataset.authors.split(',').includes(state.author));

      $$('.card', catalog).forEach((c) => { c.hidden = !match(c); });
      $$('.grid', catalog).forEach(sortGrid);
      const filtering = Boolean(state.q || state.tag);
      $$('[data-group]', catalog).forEach((g) => {
        const n = $$('.card:not([hidden])', g).length;
        $('[data-group-count]', g).textContent = n;
        g.hidden = (state.author && g.dataset.group !== state.author) || (filtering && n === 0);
      });
      toggleAll.hidden = state.view !== 'people';

      const panel = $(`[data-panel="${state.view}"]`, catalog);
      $$('[data-panel]', catalog).forEach((p) => { p.hidden = p !== panel; });
      const shown = $$('[data-panel="all"] .card:not([hidden])', catalog).length;
      $('[data-count]', catalog).textContent = shown;
      $('.empty', catalog).hidden = shown > 0;

      $$('[data-view]', catalog).forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view));
      $$('[data-tag]', catalog).forEach((b) => b.setAttribute('aria-pressed', b.dataset.tag === state.tag));
      authorSel.value = state.author;
      sortSel.value = state.sort;

      const next = new URLSearchParams();
      if (state.q) next.set('q', state.q);
      if (state.tag) next.set('tag', state.tag);
      if (state.author) next.set('author', state.author);
      if (state.sort !== 'new') next.set('sort', state.sort);
      if (state.view !== 'all') next.set('view', state.view);
      const qs = next.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
    };

    $('.search').addEventListener('submit', (e) => e.preventDefault());
    search.addEventListener('input', () => { state.q = search.value.trim(); apply(); });
    authorSel.addEventListener('change', () => { state.author = authorSel.value; apply(); });
    sortSel.addEventListener('change', () => { state.sort = sortSel.value; apply(); });
    catalog.addEventListener('click', (e) => {
      const v = e.target.closest('[data-view]');
      const t = e.target.closest('[data-tag]');
      if (v) state.view = v.dataset.view;
      else if (t) state.tag = t.dataset.tag;
      else if (e.target.closest('[data-reset]')) {
        Object.assign(state, { q: '', tag: '', author: '' });
        search.value = '';
      } else return;
      apply();
    });
    apply();
  }

  // Member page: public repos from the GitHub API (cached for 10 minutes).
  const repoBox = $('[data-github-repos]');
  if (repoBox) {
    const user = repoBox.dataset.githubRepos;
    const key = 'repos:' + user;
    const fail = () => {
      repoBox.replaceChildren();
      const p = document.createElement('p');
      p.className = 'muted';
      p.append('지금은 레포지토리를 불러올 수 없습니다. ');
      const a = document.createElement('a');
      a.href = `https://github.com/${encodeURIComponent(user)}?tab=repositories`;
      a.textContent = 'GitHub에서 보기';
      p.append(a);
      repoBox.append(p);
    };
    const render = (repos) => {
      const list = repos
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
        .slice(0, 10);
      repoBox.replaceChildren();
      if (!list.length) {
        const p = document.createElement('p');
        p.className = 'muted';
        p.textContent = '공개 레포지토리가 없습니다.';
        return repoBox.append(p);
      }
      const ul = document.createElement('ul');
      ul.className = 'repo-list';
      for (const r of list) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = r.html_url;
        const name = document.createElement('span');
        name.className = 'repo-name';
        name.textContent = r.name;
        const meta = document.createElement('span');
        meta.className = 'repo-meta';
        if (r.language) meta.append(Object.assign(document.createElement('span'), { textContent: r.language }));
        meta.append(Object.assign(document.createElement('span'), { textContent: '★ ' + r.stargazers_count }));
        meta.append(Object.assign(document.createElement('span'), {
          textContent: new Date(r.pushed_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' }),
        }));
        a.append(name, meta);
        if (r.description) a.append(Object.assign(document.createElement('span'), { className: 'repo-desc', textContent: r.description }));
        li.append(a);
        ul.append(li);
      }
      repoBox.append(ul);
    };
    let cached;
    try { cached = JSON.parse(sessionStorage.getItem(key)); } catch (e) {}
    if (cached && Date.now() - cached.t < 600000) render(cached.data);
    else {
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((data) => {
          render(data);
          try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch (e) {}
        })
        .catch(fail);
    }
  }
})();
