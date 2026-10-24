// Foundry Learn — the reading app. Hash-routed, data from dist/data/*.json (built by scripts/build.mjs).
import MiniSearch from 'minisearch';

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const DATA = './data';

// ---------- persistent state (per browser) ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem('fl:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('fl:' + k, JSON.stringify(v)); } catch {} },
};
const state = {
  index: null,
  noteCache: new Map(),
  read: new Set(store.get('read', [])),
  tasks: store.get('tasks', {}),      // noteId → { idx: true }
  openModules: new Set(store.get('open', [])),
  last: store.get('last', null),      // { id, title, at }
  search: null,                       // MiniSearch
  searchDocs: null,
  glossary: {},                       // collection id → glossary json
  map: {},                            // collection id → map json
  route: null,
  cleanup: [],                        // functions to run before the next page renders
  onTheme: null,                      // re-render hook for theme changes (home page learning path)
};
function onLeave(fn) { state.cleanup.push(fn); }
const saveRead = () => store.set('read', [...state.read]);

// ---------- theme ----------
function isDark() {
  const t = document.documentElement.dataset.theme;
  if (t) return t === 'dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
}
$('#theme-btn').addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  store.set('theme', next);
  rerenderDiagrams();
});

// ---------- data ----------
async function getJSON(path) {
  const r = await fetch(`${DATA}/${path}`);
  if (!r.ok) throw new Error(`${path}: ${r.status}`);
  return r.json();
}
async function getGlossary(cid) {
  if (!state.glossary[cid]) state.glossary[cid] = await getJSON(`${cid}.glossary.json`);
  return state.glossary[cid];
}
async function getNote(id) {
  if (state.noteCache.has(id)) return state.noteCache.get(id);
  const n = await getJSON(`notes/${id.replace(/\//g, '__')}.json`);
  state.noteCache.set(id, n);
  return n;
}
function findNoteMeta(id) {
  for (const c of state.index.collections) {
    if (c.id === id) return { kind: 'collection', collection: c, title: c.title };
    for (const m of c.modules) {
      if (m.id === id) return { kind: 'module', collection: c, module: m, title: m.number ? `${m.number} — ${m.title}` : m.title };
      const n = m.notes.find((x) => x.id === id);
      if (n) return { kind: 'note', collection: c, module: m, note: n, title: n.number ? `${n.number} — ${n.title}` : n.title };
    }
    const p = c.pages.find((x) => x.id === id);
    if (p) return { kind: 'page', collection: c, page: p, title: p.title };
  }
  return null;
}
// Id of a collection's special page (map / glossary), or null when it has none.
function pageId(c, special) { return c.pages.find((p) => p.special === special)?.id || null; }
function moduleProgress(m) {
  const done = m.notes.filter((n) => state.read.has(n.id)).length;
  return { done, total: m.notes.length, pct: m.notes.length ? Math.round((100 * done) / m.notes.length) : 0 };
}
function collectionProgress(c) {
  const total = c.totals.notes;
  const done = c.modules.reduce((s, m) => s + moduleProgress(m).done, 0);
  return { done, total, pct: total ? Math.round((100 * done) / total) : 0 };
}

// ---------- routing ----------
function parseHash() {
  let h = location.hash || '#/';
  if (!h.startsWith('#/')) return null; // plain in-page anchor
  h = h.slice(2);
  const i = h.indexOf('#');
  const path = i >= 0 ? h.slice(0, i) : h;
  const anchor = i >= 0 ? h.slice(i + 1) : null;
  const [p, q] = path.split('?');
  return { path: p.replace(/\/+$/, ''), anchor, query: new URLSearchParams(q || '') };
}
function navigate(id, anchor) {
  location.hash = `#/${id}${anchor ? '#' + anchor : ''}`;
}
window.addEventListener('hashchange', () => {
  const r = parseHash();
  if (!r) {
    // "#some-heading": scroll within the current page, then restore the route hash silently.
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: 'start' });
    if (state.route) history.replaceState(null, '', `#/${state.route.path}${id ? '#' + id : ''}`);
    return;
  }
  render(r);
});

// The collection (note area) the current route belongs to; falls back to the last one used.
function currentCollection() {
  const cs = state.index.collections;
  const first = (state.route?.path || '').split('/')[0];
  const byRoute = cs.find((c) => c.id === (first === 'lab' ? 'ontology' : first));
  if (byRoute) { store.set('col', byRoute.id); return byRoute; }
  return cs.find((c) => c.id === store.get('col', null)) || cs[0];
}

// ---------- sidebar ----------
function renderSidebar() {
  const c = currentCollection();
  const cs = state.index.collections;
  const cur = state.route?.path || '';
  const curModule = cur.split('/').slice(0, 2).join('/');
  const icon = (d) => `<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ic = {
    home: icon('<path d="M3 9.5 10 4l7 5.5V17H3z"/>'),
    map: icon('<path d="M3 5l5-2 4 2 5-2v12l-5 2-4-2-5 2z"/><path d="M8 3v12M12 5v12"/>'),
    book: icon('<path d="M4 3h5a2 2 0 0 1 2 2v12a1.5 1.5 0 0 0-1.5-1.5H4z"/><path d="M16 3h-5a2 2 0 0 0-2 2v12a1.5 1.5 0 0 1 1.5-1.5H16z"/>'),
    check: icon('<path d="M4 10l4 4 8-8"/>'),
    src: icon('<circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/>'),
    cards: icon('<rect x="3" y="6" width="11" height="11" rx="1.5"/><path d="M6 3h11v11"/>'),
    lab: icon('<path d="M7 3h6M8 3v5l-4.5 7.5A1.5 1.5 0 0 0 4.8 18h10.4a1.5 1.5 0 0 0 1.3-2.5L12 8V3"/><path d="M6 13h8"/>'),
  };
  const link = (id, label, svg) => `<a class="side-link ${cur === id ? 'active' : ''}" href="#/${id}">${svg}<span>${esc(label)}</span></a>`;
  const prog = collectionProgress(c);
  const areaRow = (x) => { const pp = collectionProgress(x); return `<a class="area-link ${x.id === c.id ? 'active' : ''}" href="#/${x.id}"><span>${esc(x.title)}</span><span class="mod-prog ${pp.done === pp.total && pp.total ? 'done' : ''}">${pp.done}/${pp.total}</span></a>`; };
  let html = `${cs.length > 1 ? `<div class="side-section areas-nav"><div class="side-title"><a href="#/">All areas</a></div>${cs.filter((x) => x.kind !== 'courses').map(areaRow).join('')}${cs.some((x) => x.kind === 'courses') ? `<div class="side-title sub">Course notes</div>${cs.filter((x) => x.kind === 'courses').map(areaRow).join('')}` : ''}</div>` : ''}
  <div class="side-section">
    ${link(c.id, c.title + ' home', ic.home)}
    ${pageId(c, 'map') ? link(pageId(c, 'map'), 'Topic map · I need to…', ic.map) : ''}
    ${pageId(c, 'glossary') ? link(pageId(c, 'glossary'), 'Glossary', ic.book) : ''}
    ${c.selfCheck ? link(c.selfCheck, 'Self-check by module', ic.check) : ''}
    ${pageId(c, 'glossary') || c.map?.questions ? link(c.id + '/cards', 'Flashcards', ic.cards) : ''}
    ${c.id === 'ontology' ? link('lab', 'Ontology Lab · build it', ic.lab) : ''}
    ${c.pages.filter((p) => !p.special).map((p) => link(p.id, p.title, ic.src)).join('')}
  </div>
  <div class="side-section">
    <div class="side-title">${c.kind === 'courses' ? 'Courses' : 'Learning path'} · ${prog.done}/${prog.total} read</div>`;
  for (const m of c.modules) {
    const p = moduleProgress(m);
    const open = state.openModules.has(m.id) || curModule === m.id;
    html += `<div class="mod ${open ? 'open' : ''} ${curModule === m.id ? 'active' : ''}" data-mod="${m.id}">
      <button class="mod-head" aria-expanded="${open}">
        <svg class="chev" width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 4l6 6-6 6"/></svg>
        ${m.number ? `<span class="mod-num">${esc(m.number)}</span>` : ''}<span class="mod-name">${esc(m.title)}</span>
        <span class="mod-prog ${p.done === p.total && p.total ? 'done' : ''}">${p.done}/${p.total}</span>
      </button>
      <div class="mod-notes">
        ${m.hasReadme ? `<a class="side-link readme ${cur === m.id ? 'active' : ''}" href="#/${m.id}">${c.kind === 'courses' ? 'Course overview' : 'Module overview'}</a>` : ''}
        ${m.notes.map((n) => `<a class="note-link ${state.read.has(n.id) ? 'read' : ''} ${cur === n.id ? 'active' : ''}" href="#/${n.id}" title="${esc(n.title)}"><i class="dot"></i>${n.number ? `<span class="nn">${esc(n.number)}</span>` : ''}<span>${esc(n.title)}</span></a>`).join('')}
      </div>
    </div>`;
  }
  html += `</div>`;
  const side = $('#sidebar');
  side.innerHTML = html;
  side.querySelectorAll('.mod-head').forEach((b) => b.addEventListener('click', () => {
    const mod = b.closest('.mod');
    const id = mod.dataset.mod;
    mod.classList.toggle('open');
    b.setAttribute('aria-expanded', mod.classList.contains('open'));
    if (mod.classList.contains('open')) state.openModules.add(id); else state.openModules.delete(id);
    store.set('open', [...state.openModules]);
  }));
  side.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
  const active = side.querySelector('.active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}
function openNav() { document.body.classList.add('nav-open'); $('#menu-btn').setAttribute('aria-expanded', 'true'); }
function closeNav() { document.body.classList.remove('nav-open'); $('#menu-btn').setAttribute('aria-expanded', 'false'); }
$('#menu-btn').addEventListener('click', () => (document.body.classList.contains('nav-open') ? closeNav() : openNav()));
$('#backdrop').addEventListener('click', closeNav);

function renderTopnav() {
  const c = currentCollection();
  const cur = state.route?.path || '';
  const items = [
    ...(state.index.collections.length > 1 ? [['', 'All areas']] : []),
    [c.id, c.title],
    ...(pageId(c, 'map') ? [[pageId(c, 'map'), 'Topic map']] : []),
    ...(pageId(c, 'glossary') ? [[pageId(c, 'glossary'), 'Glossary']] : []),
    ...(c.selfCheck ? [[c.selfCheck, 'Self-check']] : []),
    ...(pageId(c, 'glossary') || c.map?.questions ? [[c.id + '/cards', 'Flashcards']] : []),
    ...(c.id === 'ontology' ? [['lab', 'Lab']] : []),
  ];
  $('#topnav').innerHTML = items.map(([id, l]) => `<a href="#/${id}" class="${cur === id ? 'active' : ''}">${l}</a>`).join('');
}

// ---------- views ----------
const main = $('#main');

function setTitle(t) { document.title = t ? `${t} · Foundry Learn` : 'Foundry Learn'; }

async function render(r) {
  for (const fn of state.cleanup.splice(0)) { try { fn(); } catch {} }
  state.onTheme = null;
  state.route = r;
  userScrolled = false;
  closeNav();
  renderSidebar();
  renderTopnav();
  const path = r.path;
  try {
    const col = state.index.collections.find((c) => c.id === path);
    if (!path) await (state.index.collections.length > 1 ? viewLanding() : viewHome(state.index.collections[0]));
    else if (col) await viewHome(col);
    else if (path === 'lab') { document.body.classList.add('lab-mode'); onLeave(() => document.body.classList.remove('lab-mode')); const { viewLab } = await import('./lab.js'); await viewLab(main, r, { store, toast, onLeave }); }
    else if (/\/cards$/.test(path) && state.index.collections.find((c) => c.id === path.replace(/\/cards$/, ''))) await viewCards(state.index.collections.find((c) => c.id === path.replace(/\/cards$/, '')), r);
    else {
      let meta = findNoteMeta(path);
      if (!meta && path !== path.toLowerCase() && findNoteMeta(path.toLowerCase())) { location.replace(`#/${path.toLowerCase()}${r.anchor ? '#' + r.anchor : ''}`); return; } // old links used MAP / GLOSSARY
      if (!meta) return viewNotFound(path);
      if (meta.kind === 'page' && meta.page.special === 'map') await viewMap(meta, r);
      else if (meta.kind === 'page' && meta.page.special === 'glossary') await viewGlossary(meta, r);
      else if (meta.kind === 'module') await viewModule(meta);
      else await viewNote(meta, r);
    }
  } catch (e) {
    console.error(e);
    main.innerHTML = `<div class="page"><h1 class="title">Something went wrong</h1><p class="muted">${esc(e.message)}</p></div>`;
  }
  // Scroll
  if (r.anchor) {
    const el = document.getElementById(r.anchor);
    if (el) { el.scrollIntoView({ block: 'start' }); return; }
  }
  window.scrollTo(0, 0);
}

// ----- Landing: all note areas -----
async function viewLanding() {
  setTitle(null);
  const cs = state.index.collections;
  const last = state.last && findNoteMeta(state.last.id) ? state.last : null;
  const total = cs.reduce((a, c) => a + c.totals.notes, 0);
  const done = cs.reduce((a, c) => a + collectionProgress(c).done, 0);
  main.innerHTML = `<div class="page wide">
    <div class="hero">
      <div>
        <h1>Foundry Learn</h1>
        <p class="lead">Your Foundry study notes as a site: ${cs.length} areas, ${total} notes, about ${Math.round(cs.reduce((a, c) => a + c.totals.minutes, 0) / 60)} hours of reading. Search spans every area.</p>
        <div class="quick">
          <button class="btn primary" id="home-search">Search all notes <kbd style="margin-left:4px">⌘K</kbd></button>
          <a class="btn lab-btn" href="#/lab">🧪 Ontology Lab: learn by building</a>
          <span class="small muted" style="align-self:center">Each area below also has a topic map, glossary, flashcards and self-check.</span>
        </div>
      </div>
      <div class="card">
        <h3>Your progress</h3>
        <div class="progress-row"><span class="big">${total ? Math.round((100 * done) / total) : 0}%</span><span class="muted small">${done} of ${total} notes read</span></div>
        <div class="progress"><i style="width:${total ? Math.round((100 * done) / total) : 0}%"></i></div>
        ${last ? `<a class="continue" href="#/${last.id}"><span class="k">Continue where you left off</span><span class="t">${esc(last.title)}</span></a>` : ''}
        <p class="small muted" style="margin:12px 0 0">Progress is saved in this browser only.</p>
      </div>
    </div>
    ${[['Areas', cs.filter((c) => c.kind !== 'courses'), 'structured courses built from the official docs'], ['Course notes', cs.filter((c) => c.kind === 'courses'), 'what each Palantir Learn course taught, lesson by lesson']].filter(([, l]) => l.length).map(([h, list, sub]) => `
    <div class="section-h"><h2>${h}</h2><span class="small muted">${sub}</span></div>
    <div class="areas">
      ${list.map((c) => {
        const p = collectionProgress(c);
        return `<a class="acard" href="#/${c.id}">
          <div class="top"><span class="ttl">${esc(c.title)}</span>${p.done === p.total && p.total ? '<span class="chip ok">done</span>' : c.written && c.written.done < c.written.planned ? `<span class="chip warn">${c.written.done} of ${c.written.planned} written</span>` : ''}</div>
          <div class="desc">${esc(c.tagline)}.</div>
          <div class="foot"><span>${c.modules.length} ${c.kind === 'courses' ? (c.modules.length === 1 ? 'course' : 'courses') : 'modules'} · ${c.totals.notes} notes · ${Math.round(c.totals.minutes / 60 * 10) / 10} h</span><div class="progress"><i style="width:${p.pct}%"></i></div><span>${p.done}/${p.total}</span></div>
          ${pageId(c, 'map') || pageId(c, 'glossary') || c.selfCheck ? `<div class="links">${pageId(c, 'map') ? '<span class="chipl">Topic map</span>' : ''}${pageId(c, 'glossary') ? '<span class="chipl">Glossary</span>' : ''}${c.selfCheck ? '<span class="chipl">Self-check</span>' : ''}</div>` : ''}
        </a>`;
      }).join('')}
    </div>`).join('')}
  </div>`;
  $('#home-search').addEventListener('click', openSearch);
}

function viewNotFound(path) {
  setTitle('Not found');
  main.innerHTML = `<div class="page"><h1 class="title">Not found</h1><p class="muted">No note at <code>${esc(path)}</code>.</p><p><a href="#/">Back to the start</a></p></div>`;
}

// ----- Home -----
async function viewHome(c) {
  setTitle(null);
  const prog = collectionProgress(c);
  const last = state.last && findNoteMeta(state.last.id) ? state.last : null;
  const firstUnread = c.modules.flatMap((m) => m.notes).find((n) => !state.read.has(n.id));
  const cont = last || (firstUnread ? { id: firstUnread.id, title: findNoteMeta(firstUnread.id).title } : null);
  main.innerHTML = `<div class="page wide">
    <div class="hero">
      <div>
        ${state.index.collections.length > 1 ? `<div class="crumbs"><a href="#/">All areas</a><span class="sep">/</span><span>${esc(c.title)}</span></div>` : ''}
        <h1>${esc(c.title)}</h1>
        <p class="lead">${esc(c.tagline)}. ${c.written && c.written.done < c.written.planned ? `<span class="chip warn">in progress: ${c.written.done} of ${c.written.planned} notes written</span> ` : ''}${c.totals.notes} notes in ${c.modules.length} ${c.kind === 'courses' ? (c.modules.length === 1 ? 'course' : 'courses') : 'modules'}, about ${Math.round(c.totals.minutes / 60)} hour${Math.round(c.totals.minutes / 60) === 1 ? '' : 's'} of reading.</p>
        <div class="quick">
          <button class="btn primary" id="home-search">Search the notes <kbd style="margin-left:4px">⌘K</kbd></button>
          ${c.map?.tasks ? `<a class="btn" href="#/${pageId(c, 'map')}?tab=tasks">I need to…</a>` : ''}
          ${c.map?.questions ? `<a class="btn" href="#/${pageId(c, 'map')}?tab=questions">Design questions</a>` : ''}
          ${c.map?.concepts ? `<a class="btn" href="#/${pageId(c, 'map')}?tab=concepts">By concept</a>` : ''}
          ${pageId(c, 'glossary') ? `<a class="btn" href="#/${pageId(c, 'glossary')}">Glossary</a>` : ''}
          ${pageId(c, 'glossary') || c.map?.questions ? `<a class="btn" href="#/${c.id}/cards">Flashcards</a>` : ''}
          ${c.id === 'ontology' ? `<a class="btn lab-btn" href="#/lab">🧪 Ontology Lab: build it yourself</a>` : ''}
        </div>
      </div>
      <div class="card">
        <h3>Your progress</h3>
        <div class="progress-row"><span class="big">${prog.pct}%</span><span class="muted small">${prog.done} of ${prog.total} notes read</span></div>
        <div class="progress"><i style="width:${prog.pct}%"></i></div>
        ${cont ? `<a class="continue" href="#/${cont.id}"><span class="k">${last ? 'Continue where you left off' : 'Start here'}</span><span class="t">${esc(cont.title)}</span></a>` : `<p class="small muted" style="margin:12px 0 0">Everything is read.${c.selfCheck ? ` Try the <a href="#/${c.selfCheck}">self-check</a>.` : ''}</p>`}
        <p class="small muted" style="margin:12px 0 0">Progress is saved in this browser only.</p>
      </div>
    </div>

    <div class="section-h"><h2>${c.kind === 'courses' ? 'Courses' : 'Modules'}</h2><span class="small muted">in reading order</span></div>
    <div class="modules">
      ${c.modules.map((m) => {
        const p = moduleProgress(m);
        return `<a class="mcard" href="#/${m.id}">
          <div class="top">${m.number ? `<span class="num">${esc(m.number)}</span>` : ''}<span class="ttl">${esc(m.title)}</span>${p.done === p.total && p.total ? '<span class="chip ok">done</span>' : ''}</div>
          <div class="desc">${esc(m.purpose || '')}</div>
          <div class="foot"><span>${m.notes.length} notes · ${m.minutes} min</span><div class="progress"><i style="width:${p.pct}%"></i></div><span>${p.done}/${p.total}</span></div>
        </a>`;
      }).join('')}
    </div>

    <div class="section-h"><h2>Learning path</h2><span class="small"><button class="btn sm" id="path-toggle">Show the whole map</button></span></div>
    <div class="path" id="path">
      <div class="diagram" data-diagram=""></div>
      <div class="legend-row"><span><i style="background:var(--ok-2);border-color:var(--ok)"></i>finished</span><span><i style="background:var(--accent-2);border-color:var(--accent)"></i>in progress</span><span><i></i>not started</span></div>
    </div>

    ${c.hasReadme ? `<div class="section-h"><h2>About these notes</h2>${c.pages.some((p) => p.id === c.id + '/sources') ? `<span class="small"><a href="#/${c.id}/sources">Sources and open questions</a></span>` : ''}</div>
    <div class="intro" id="intro"></div>` : ''}
  </div>`;
  $('#home-search').addEventListener('click', openSearch);
  // Learning path diagram, coloured by progress
  const drawPath = async () => {
    const done = [], started = [];
    for (const [node, modId] of Object.entries(c.learningPath.nodeMap)) {
      const m = c.modules.find((x) => x.id === modId);
      const p = moduleProgress(m);
      if (p.total && p.done === p.total) done.push(node);
      else if (p.done > 0) started.push(node);
    }
    const dark = isDark();
    const extra = [
      `classDef default fill:${dark ? '#21252d' : '#ffffff'},stroke:${dark ? '#3a404b' : '#cfd4dc'},color:${dark ? '#e6e8ec' : '#1a1d23'}`,
      `classDef done fill:${dark ? '#163123' : '#e6f4ec'},stroke:${dark ? '#6fcf97' : '#2f855a'},color:${dark ? '#e6e8ec' : '#1a1d23'}`,
      `classDef started fill:${dark ? '#1d2f45' : '#e7f0fb'},stroke:${dark ? '#6aa5e8' : '#2b6cb0'},color:${dark ? '#e6e8ec' : '#1a1d23'}`,
      done.length ? `class ${done.join(',')} done` : '',
      started.length ? `class ${started.join(',')} started` : '',
    ].filter(Boolean).join('\n');
    const el = $('#path .diagram');
    el.dataset.diagram = c.learningPath.graph.trim() + '\n' + extra;
    await renderDiagrams($('#path'), () => {
      // Mermaid scales the SVG to the container; cap it so the map stays readable rather than huge.
      const svg = el.querySelector('svg');
      const vb = svg?.getAttribute('viewBox')?.split(/\s+/).map(Number);
      if (svg && vb) { svg.style.width = Math.min(Math.round(vb[2] * 0.9), el.clientWidth) + 'px'; }
      // attach clicks: mermaid gives nodes ids like "flowchart-O-12"
      el.querySelectorAll('g.node').forEach((g) => {
        const m = g.id.match(/flowchart-([A-Za-z0-9_]+)-\d+$/);
        const target = m && c.learningPath.nodeMap[m[1]];
        if (!target) return;
        g.classList.add('node');
        g.addEventListener('click', () => navigate(target));
      });
    }, { compact: true });
  };
  if (c.learningPath) {
    state.onTheme = drawPath;
    $('#path-toggle').addEventListener('click', (e) => {
      const box = $('#path');
      box.classList.toggle('expanded');
      e.target.textContent = box.classList.contains('expanded') ? 'Collapse map' : 'Show the whole map';
    });
    await drawPath();
  } else {
    $('#path').closest('.page').querySelector('.section-h:has(#path-toggle)')?.remove();
    $('#path').remove();
  }
  // Collection README (intro) below
  if (!c.hasReadme) return;
  const col = await getNote(c.id);
  $('#intro').innerHTML = `<article class="article">${col.html}</article>`;
  // The README's own "Learning path" section is already shown above, interactively; drop the copy.
  for (const h of $('#intro').querySelectorAll('h2')) {
    if (!/learning path/i.test(h.textContent)) continue;
    let el = h.nextElementSibling;
    h.remove();
    while (el && el.tagName !== 'H2') { const nx = el.nextElementSibling; el.remove(); el = nx; }
  }
  enhanceArticle($('#intro .article'), col);
}

// ----- Module -----
async function viewModule(meta) {
  const { module: m, collection: c } = meta;
  setTitle(meta.title);
  const p = moduleProgress(m);
  const readme = m.hasReadme ? await getNote(m.id) : null;
  const selfCheckAnchor = c.selfCheck ? `${m.number}--${m.title.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-')}` : null;
  main.innerHTML = `<div class="page">
    <div class="crumbs"><a href="#/${c.id}">${esc(c.title)}</a><span class="sep">/</span><span>${m.number ? `Module ${esc(m.number)}` : c.kind === 'courses' ? 'Course' : 'Module'}</span></div>
    <h1 class="title">${m.number ? `<span class="num">${esc(m.number)}</span>` : ''}${esc(m.title)}</h1>
    <div class="meta-row">
      ${statusChip(m.status)}
      <span>${m.notes.length} notes · ${m.minutes} min</span>
      <span>${p.done}/${p.total} read</span>
      ${selfCheckAnchor ? `<a href="#/${c.selfCheck}#${selfCheckAnchor}">Self-check for this module →</a>` : ''}
    </div>
    ${m.purpose ? `<p class="lead" style="font-size:17px;color:var(--fg-2)">${esc(m.purpose)}</p>` : ''}
    <div class="note-list">
      ${m.notes.map((n) => `<a class="nrow ${state.read.has(n.id) ? 'read' : ''}" href="#/${n.id}"><i class="st"></i>${n.number ? `<span class="num">${esc(n.number)}</span>` : ''}<span class="ttl">${esc(n.title)}</span><span class="tags">${n.minutes} min${n.diagrams ? ` · ${n.diagrams} diagram${n.diagrams > 1 ? 's' : ''}` : ''}${n.tasks ? ` · checklist` : ''}</span></a>`).join('')}
    </div>
    ${readme ? `<article class="article" id="article">${readme.html}</article>` : ''}
    ${pager(readme)}
  </div>`;
  if (readme) enhanceArticle($('#article'), readme);
}

function statusChip(s) {
  if (!s) return '';
  const t = String(s);
  const cls = /ready/i.test(t) ? 'ok' : /progress|not yet|attempted/i.test(t) ? 'warn' : '';
  return `<span class="chip ${cls}">${esc(t.replace(/\s*\(.*\)\s*$/, ''))}</span>`;
}
function pager(n) {
  if (!n) return '';
  const p = n.prev && findNoteMeta(n.prev), x = n.next && findNoteMeta(n.next);
  return `<nav class="pager">
    ${p ? `<a class="prev" href="#/${n.prev}"><span class="lab">← Previous</span><span class="ttl">${esc(p.title)}</span></a>` : '<span></span>'}
    ${x ? `<a class="next" href="#/${n.next}"><span class="lab">Next →</span><span class="ttl">${esc(x.title)}</span></a>` : '<span></span>'}
  </nav>`;
}

// ----- Note / page -----
async function viewNote(meta, r) {
  const n = await getNote(meta.kind === 'note' ? meta.note.id : meta.page.id);
  const c = meta.collection, m = meta.module;
  setTitle(meta.title);
  const isRead = state.read.has(n.id);
  const labels = Object.entries(n.labels || {}).sort((a, b) => b[1] - a[1]);
  main.innerHTML = `<div class="page with-toc">
    <div>
      <div class="crumbs"><a href="#/${c.id}">${esc(c.title)}</a>${m ? `<span class="sep">/</span><a href="#/${m.id}">${m.number ? esc(m.number) + ' — ' : ''}${esc(m.title)}</a>` : ''}</div>
      <h1 class="title">${n.number ? `<span class="num">${esc(n.number)}</span>` : ''}${esc(n.title)}</h1>
      <div class="meta-row">
        ${statusChip(n.status)}
        ${isRead ? '<span class="chip ok">✓ read</span>' : ''}
        <span>${n.minutes} min read</span>
        ${n.checked ? `<span>checked against the docs ${esc(n.checked)}</span>` : ''}
        ${n.sourcesNote ? `<span>${esc(n.sourcesNote)}</span>` : ''}
        ${n.openQuestions?.length ? `<a href="#/${c.id}/sources#open-research-questions" class="chip warn">${n.openQuestions.length} open question${n.openQuestions.length > 1 ? 's' : ''}</a>` : ''}
      </div>
      ${n.sources?.length ? `<details class="sources"><summary>Sources · ${n.sources.length} official page${n.sources.length > 1 ? 's' : ''}</summary><ul>${n.sources.map((s) => `<li><a class="ext" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>${s.note ? ` <span class="muted">${esc(s.note)}</span>` : ''}</li>`).join('')}</ul></details>` : ''}
      ${labels.length ? `<div class="legend" id="legend"><span class="lt">Claims:</span>${labels.map(([l, k]) => `<button data-label="${l}" title="Highlight ${l} paragraphs"><span class="lbl lbl-${l.toLowerCase()}">${l}</span><span class="cnt">${k}</span></button>`).join('')}<span class="hint">click a label to focus on that kind of claim</span></div>` : ''}
      <article class="article" id="article">${n.html}</article>
      <div class="read-bar">
        <span class="txt" id="read-txt">${isRead ? 'You have read this note.' : 'Finished? Mark it read to track your progress.'}</span>
        <button class="btn ${isRead ? 'ok' : 'primary'}" id="read-btn">${isRead ? '✓ Read · mark unread' : 'Mark as read'}</button>
      </div>
      ${backlinksHtml(n, c)}
      ${pager(n)}
    </div>
    <aside class="toc" id="toc">${tocHtml(n)}</aside>
  </div>`;
  const art = $('#article');
  enhanceArticle(art, n);
  // label focus
  $('#legend')?.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    const l = b.dataset.label;
    const on = b.classList.contains('on');
    $('#legend').querySelectorAll('button').forEach((x) => x.classList.remove('on'));
    art.querySelectorAll('.lbl.hl').forEach((x) => x.classList.remove('hl'));
    art.classList.remove('focus');
    if (!on) {
      b.classList.add('on');
      art.classList.add('focus');
      art.querySelectorAll(`.lbl[data-label="${l}"]`).forEach((x) => x.classList.add('hl'));
    }
  }));
  // read toggle
  const toggleRead = () => {
    if (state.read.has(n.id)) state.read.delete(n.id); else state.read.add(n.id);
    saveRead();
    const now = state.read.has(n.id);
    $('#read-btn').textContent = now ? '✓ Read · mark unread' : 'Mark as read';
    $('#read-btn').className = `btn ${now ? 'ok' : 'primary'}`;
    $('#read-txt').textContent = now ? 'You have read this note.' : 'Finished? Mark it read to track your progress.';
    renderSidebar();
  };
  $('#read-btn').addEventListener('click', toggleRead);
  $('#toc-read')?.addEventListener('click', toggleRead);
  // auto mark as read when the reader reaches the end of a note (not for reference pages)
  if (meta.kind === 'note' && !isRead) {
    const end = $('.read-bar');
    const opened = Date.now();
    const dwellMs = Math.min(45, Math.max(12, n.minutes * 60 * 0.3)) * 1000; // 12–45 s depending on length
    let timer = null, atEnd = false;
    const markRead = () => {
      if (state.read.has(n.id) || !document.body.contains(end)) return;
      state.read.add(n.id); saveRead();
      $('#read-btn').textContent = '✓ Read · mark unread'; $('#read-btn').className = 'btn ok';
      $('#read-txt').textContent = 'Marked as read because you reached the end.';
      renderSidebar();
      io.disconnect();
    };
    const io = new IntersectionObserver((es) => {
      atEnd = es.some((e) => e.isIntersecting);
      clearTimeout(timer);
      if (!atEnd) return;
      const left = dwellMs - (Date.now() - opened);
      if (left <= 0) markRead(); else timer = setTimeout(() => { if (atEnd) markRead(); }, left);
    }, { threshold: 0.5 });
    io.observe(end);
    onLeave(() => { clearTimeout(timer); io.disconnect(); });
  }
  // remember position
  if (meta.kind === 'note') { state.last = { id: n.id, title: meta.title, at: Date.now() }; store.set('last', state.last); }
  // scroll spy
  spy(art, $('#toc'));
}

// "Referenced by": notes that link here, grouped so other areas stand out.
function backlinksHtml(n, c) {
  const refs = (n.backlinks || []).map((id) => ({ id, meta: findNoteMeta(id) })).filter((x) => x.meta);
  if (!refs.length) return '';
  const row = (x) => `<a href="#/${x.id}">${x.meta.collection.id !== c.id ? `<span class="area-chip">${esc(x.meta.collection.title)}</span>` : ''}${esc(x.meta.title)}</a>`;
  const own = refs.filter((x) => x.meta.collection.id === c.id), other = refs.filter((x) => x.meta.collection.id !== c.id);
  return `<details class="backlinks"><summary>Referenced by ${refs.length} note${refs.length > 1 ? 's' : ''}${other.length ? ` · ${other.length} from other areas` : ''}</summary><div class="bl-list">${[...other, ...own].map(row).join('')}</div></details>`;
}

function tocHtml(n) {
  const items = (n.toc || []).filter((t) => t.text);
  const isRead = state.read.has(n.id);
  return `${items.length ? `<div class="toc-title">On this page</div>${items.map((t) => `<a class="l${t.level}" href="#${t.id}">${esc(t.text)}</a>`).join('')}` : ''}
  <div class="toc-actions">
    <button class="btn sm" id="toc-read">${isRead ? 'Mark unread' : 'Mark as read'}</button>
    ${n.prev ? `<a class="btn sm" href="#/${n.prev}">← Previous</a>` : ''}
    ${n.next ? `<a class="btn sm" href="#/${n.next}">Next →</a>` : ''}
  </div>`;
}

function spy(article, toc) {
  if (!toc) return;
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  if (!links.length) return;
  const heads = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  const onScroll = () => {
    const y = window.scrollY + 90;
    let cur = heads[0];
    for (const h of heads) if (h.offsetTop <= y) cur = h;
    links.forEach((a) => a.classList.toggle('active', cur && a.getAttribute('href') === '#' + cur.id));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onLeave(() => window.removeEventListener('scroll', onScroll));
  onScroll();
}

// Make a rendered article interactive: in-page anchors, task checkboxes, diagrams.
function enhanceArticle(art, n) {
  // In-page anchors: scroll without changing the route.
  art.querySelectorAll('a.in-page, a.hlink').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    history.replaceState(null, '', `#/${state.route.path}#${id}`);
  }));
  // Same for the TOC
  $('#toc')?.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    history.replaceState(null, '', `#/${state.route.path}#${id}`);
  }));
  // Links to notes not in the app yet
  art.querySelectorAll('a.missing-link').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const why = a.dataset.why;
    toast(why === 'track' ? `Course note (Learn Tracks aren't included in this app): ${a.dataset.missing}` : why === 'planned' ? `That note isn't written yet: ${a.dataset.missing}` : `Not a note in this app: ${a.dataset.missing}`);
  }));
  // Glossary terms: a definition on hover or tap
  art.querySelectorAll('abbr.term').forEach((el) => {
    el.addEventListener('mouseenter', () => showTerm(el));
    el.addEventListener('mouseleave', () => hideTerm(300));
    el.addEventListener('click', (e) => { e.preventDefault(); showTerm(el, true); });
  });
  // Diagrams: click to enlarge
  art.querySelectorAll('.diagram').forEach((d) => d.addEventListener('click', (e) => { if (e.target.closest('a')) return; const svg = d.querySelector('svg'); if (svg) lightbox(svg); }));
  // Task checkboxes persist per note
  const saved = state.tasks[n.id] || {};
  art.querySelectorAll('input.task-box').forEach((cb) => {
    const k = cb.dataset.task;
    if (k in saved) cb.checked = !!saved[k];
    cb.closest('li')?.classList.toggle('done', cb.checked);
    cb.addEventListener('change', () => {
      state.tasks[n.id] = state.tasks[n.id] || {};
      state.tasks[n.id][k] = cb.checked;
      store.set('tasks', state.tasks);
      cb.closest('li')?.classList.toggle('done', cb.checked);
    });
  });
  renderDiagrams(art);
}

// ---------- diagrams (Mermaid, loaded on demand) ----------
let mermaidP = null;
function loadMermaid() {
  if (!mermaidP) mermaidP = import('mermaid').then((m) => m.default);
  return mermaidP;
}
let diagramSeq = 0;
async function renderDiagrams(root, after, opts = {}) {
  const els = [...root.querySelectorAll('.diagram[data-diagram]')].filter((e) => e.dataset.diagram && !(opts.skipPath && e.closest('.path')));
  if (!els.length) return;
  const mermaid = await loadMermaid();
  mermaid.initialize({ startOnLoad: false, theme: isDark() ? 'dark' : 'neutral', securityLevel: 'strict', fontFamily: 'inherit', flowchart: { htmlLabels: true, curve: 'basis', ...(opts.compact ? { nodeSpacing: 22, rankSpacing: 26, padding: 6 } : {}) } });
  for (const el of els) {
    try {
      const { svg } = await mermaid.render(`d${++diagramSeq}`, el.dataset.diagram);
      el.innerHTML = svg;
      el.classList.remove('err');
    } catch (e) {
      el.classList.add('err');
      el.innerHTML = `<pre class="mermaid-src">${esc(el.dataset.diagram)}</pre>`;
      console.warn('diagram failed', e);
    }
  }
  after?.();
  if (!opts.compact && state.route?.anchor && !userScrolled) document.getElementById(state.route.anchor)?.scrollIntoView({ block: 'start' });
}
let userScrolled = false;
window.addEventListener('wheel', () => (userScrolled = true), { passive: true });
window.addEventListener('touchmove', () => (userScrolled = true), { passive: true });
window.addEventListener('keydown', (e) => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'End', 'Home'].includes(e.key)) userScrolled = true; });
function rerenderDiagrams() {
  // Re-render the current page's diagrams in the new theme without rebuilding the page
  // (so scroll position, filter text and timers survive). The home page re-draws its path itself.
  if (state.onTheme) state.onTheme();
  renderDiagrams(main, null, { skipPath: true });
}

// ---------- glossary term popover ----------
let termPop = null, termHideT = null, termPinned = false;
async function showTerm(el, pin = false) {
  clearTimeout(termHideT);
  const [cid, idx] = el.dataset.t.split(':');
  const g = await getGlossary(cid);
  const t = g.terms[Number(idx)];
  if (!t) return;
  if (!termPop) {
    termPop = document.createElement('div');
    termPop.className = 'term-pop';
    termPop.addEventListener('mouseenter', () => clearTimeout(termHideT));
    termPop.addEventListener('mouseleave', () => hideTerm(200));
    document.body.appendChild(termPop);
  }
  termPinned = pin;
  const col = state.index.collections.find((c) => c.id === cid);
  termPop.innerHTML = `<div class="tp-term">${esc(t.term)}${col && col.id !== currentCollection().id ? ` <span class="area-chip">${esc(col.title)}</span>` : ''}</div><div class="tp-def">${t.definition}</div><div class="tp-links">${t.note?.href ? `<a href="${esc(t.note.href)}">Explained in ${esc(t.note.text)}</a>` : ''}<a href="#/${pageId(col, 'glossary')}#t-${esc(t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">Glossary</a></div>`;
  termPop.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => hideTerm(0)));
  termPop.style.display = 'block';
  const r = el.getBoundingClientRect();
  const w = Math.min(360, window.innerWidth - 24);
  termPop.style.width = w + 'px';
  let left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
  const ph = termPop.offsetHeight;
  const below = r.bottom + 8 + ph < window.innerHeight;
  termPop.style.left = left + 'px';
  termPop.style.top = (below ? r.bottom + 8 : r.top - ph - 8) + window.scrollY + 'px';
}
function hideTerm(delay) {
  clearTimeout(termHideT);
  termHideT = setTimeout(() => { if (termPop && !(termPinned && delay)) { termPop.style.display = 'none'; termPinned = false; } }, delay);
}
document.addEventListener('click', (e) => { if (termPop && termPop.style.display === 'block' && !e.target.closest('.term-pop, abbr.term')) { termPop.style.display = 'none'; termPinned = false; } });

// ---------- diagram lightbox ----------
function lightbox(svg) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  const clone = svg.cloneNode(true);
  clone.removeAttribute('style'); clone.removeAttribute('width'); clone.removeAttribute('height');
  box.innerHTML = '<div class="lb-hint">Scroll to zoom · drag to pan · Esc to close</div>';
  const inner = document.createElement('div'); inner.className = 'lb-inner'; inner.appendChild(clone); box.appendChild(inner);
  let scale = 1, x = 0, y = 0, drag = null;
  const apply = () => (inner.style.transform = `translate(${x}px, ${y}px) scale(${scale})`);
  box.addEventListener('wheel', (e) => { e.preventDefault(); scale = Math.min(6, Math.max(.3, scale * (e.deltaY < 0 ? 1.1 : 0.9))); apply(); }, { passive: false });
  box.addEventListener('mousedown', (e) => { drag = { x: e.clientX - x, y: e.clientY - y }; });
  box.addEventListener('mousemove', (e) => { if (drag) { x = e.clientX - drag.x; y = e.clientY - drag.y; apply(); } });
  box.addEventListener('mouseup', () => (drag = null));
  box.addEventListener('click', (e) => { if (e.target === box || e.target === inner) close(); });
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey); };
  document.addEventListener('keydown', onKey);
  document.body.appendChild(box);
  const vb = clone.getAttribute('viewBox')?.split(/\s+/).map(Number);
  if (vb) { const fit = Math.min((window.innerWidth - 80) / vb[2], (window.innerHeight - 120) / vb[3], 2.5); clone.style.width = Math.round(vb[2] * fit) + 'px'; clone.style.height = 'auto'; }
}

// ---------- flashcards ----------
// Cards come from the area's glossary (term → definition) and its design questions (question → answer).
// A simple Leitner box per card (0–3) is kept in localStorage: "Again" sends a card back to box 0.
async function viewCards(c, r) {
  setTitle(`${c.title} flashcards`);
  const gl = pageId(c, 'glossary') ? await getGlossary(c.id) : { terms: [] };
  const map = c.map?.questions ? (state.map[c.id] = state.map[c.id] || (await getJSON(`${c.id}.map.json`))) : null;
  const deck = [
    ...gl.terms.map((t, i) => ({ id: `${c.id}:t:${i}`, kind: 'term', front: t.term, back: t.definition, links: [t.note?.href ? { text: 'Explained in ' + t.note.text, href: t.note.href } : null].filter(Boolean), module: t.note?.text?.match(/^\d{2}/)?.[0] || '' })),
    ...(map ? map.questions.map((q, i) => ({ id: `${c.id}:q:${i}`, kind: 'question', front: q.question, back: q.answer, links: q.links.filter((l) => l.href), module: '' })) : []),
  ];
  const boxes = store.get('cards', {});
  let kind = r.query.get('kind') || 'all';
  let queue = [], i = 0, flipped = false;
  const BOX_NAMES = ['new or again', 'seen once', 'getting there', 'known'];
  const build = () => {
    const pool = deck.filter((d) => kind === 'all' || d.kind === kind);
    // lowest box first, then shuffle within a box
    const by = (d) => boxes[d.id]?.box || 0;
    queue = pool.map((d) => [d, by(d), Math.random()]).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map((x) => x[0]);
    i = 0; flipped = false;
  };
  const stats = () => {
    const pool = deck.filter((d) => kind === 'all' || d.kind === kind);
    const counts = [0, 0, 0, 0];
    pool.forEach((d) => counts[boxes[d.id]?.box || 0]++);
    return { pool: pool.length, counts };
  };
  main.innerHTML = `<div class="page">
    <div class="crumbs"><a href="#/${c.id}">${esc(c.title)}</a><span class="sep">/</span><span>Flashcards</span></div>
    <h1 class="title">${esc(c.title)} flashcards</h1>
    <p class="muted" style="margin:0 0 14px">${gl.terms.length} glossary terms${map ? ` and ${map.questions.length} design questions` : ''}. Flip a card, then say whether you knew it; cards you miss come back first. Keys: <kbd>space</kbd> flip · <kbd>1</kbd> again · <kbd>2</kbd> got it · <kbd>s</kbd> skip.</p>
    <div class="tabs" id="ctabs">
      <button data-kind="all">All <span class="muted">${deck.length}</span></button>
      ${gl.terms.length ? `<button data-kind="term">Terms <span class="muted">${gl.terms.length}</span></button>` : ''}
      ${map ? `<button data-kind="question">Design questions <span class="muted">${map.questions.length}</span></button>` : ''}
    </div>
    <div class="card-stage" id="stage"></div>
    <div class="card-stats" id="cstats"></div>
  </div>`;
  const draw = () => {
    const st = stats();
    $('#ctabs').querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.kind === kind));
    $('#cstats').innerHTML = `<div class="boxes">${st.counts.map((n, b) => `<div class="box b${b}"><span class="n">${n}</span><span class="l">${BOX_NAMES[b]}</span></div>`).join('')}</div><button class="btn sm" id="creset">Reset progress for this deck</button>`;
    $('#creset').addEventListener('click', () => { if (confirm('Forget what you know about these cards?')) { deck.forEach((d) => delete boxes[d.id]); store.set('cards', boxes); build(); draw(); } });
    const stage = $('#stage');
    if (!queue.length) { stage.innerHTML = '<div class="empty">No cards here.</div>'; return; }
    if (i >= queue.length) { stage.innerHTML = `<div class="card-done"><div class="big">Round done</div><p class="muted">${queue.length} cards reviewed. Cards you marked "again" come first next round.</p><button class="btn primary" id="cagain">Start another round</button></div>`; $('#cagain').addEventListener('click', () => { build(); draw(); }); return; }
    const d = queue[i];
    const box = boxes[d.id]?.box || 0;
    stage.innerHTML = `<div class="card-pos muted small">${i + 1} / ${queue.length} · <span class="chip">${d.kind === 'term' ? 'term' : 'design question'}</span> · box ${box}</div>
      <div class="flashcard ${flipped ? 'flipped' : ''}" id="fc" tabindex="0" role="button" aria-label="Flip card">
        <div class="face front"><div class="q">${esc(d.front)}</div><div class="hint">${d.kind === 'term' ? 'What does this mean?' : 'What would you answer?'} · click to flip</div></div>
        <div class="face back"><div class="q small-q">${esc(d.front)}</div><div class="a">${d.back}</div>${d.links.length ? `<div class="links">${d.links.map((l) => `<a class="chipl" href="${esc(l.href)}">${esc(l.text)}</a>`).join('')}</div>` : ''}</div>
      </div>
      <div class="card-actions">
        ${flipped ? `<button class="btn" id="c-again">Again <kbd>1</kbd></button><button class="btn primary" id="c-got">Got it <kbd>2</kbd></button>` : `<button class="btn primary" id="c-flip">Flip <kbd>space</kbd></button>`}
        <button class="btn sm" id="c-skip">Skip <kbd>s</kbd></button>
      </div>`;
    $('#fc').addEventListener('click', (e) => { if (!e.target.closest('a')) flip(); });
    $('#c-flip')?.addEventListener('click', flip);
    $('#c-again')?.addEventListener('click', () => grade(false));
    $('#c-got')?.addEventListener('click', () => grade(true));
    $('#c-skip').addEventListener('click', () => { i++; flipped = false; draw(); });
  };
  const flip = () => { flipped = !flipped; draw(); };
  const grade = (ok) => {
    const d = queue[i];
    const cur = boxes[d.id]?.box || 0;
    boxes[d.id] = { box: ok ? Math.min(3, cur + 1) : 0, at: Date.now() };
    store.set('cards', boxes);
    i++; flipped = false; draw();
  };
  const onKey = (e) => {
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName) || !modal.hidden) return;
    if (e.key === ' ') { e.preventDefault(); flip(); }
    else if (e.key === '1' && flipped) grade(false);
    else if (e.key === '2' && flipped) grade(true);
    else if (e.key === 's') { i++; flipped = false; draw(); }
  };
  document.addEventListener('keydown', onKey);
  onLeave(() => document.removeEventListener('keydown', onKey));
  $('#ctabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; kind = b.dataset.kind; history.replaceState(null, '', `#/${c.id}/cards?kind=${kind}`); build(); draw(); });
  build(); draw();
}

// ---------- toast ----------
let toastT;
function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--fg);color:var(--bg);padding:9px 14px;border-radius:8px;font-size:13.5px;z-index:60;box-shadow:var(--shadow);max-width:90vw'; document.body.appendChild(t); }
  t.textContent = msg; t.style.display = 'block';
  clearTimeout(toastT); toastT = setTimeout(() => (t.style.display = 'none'), 3200);
}

// ---------- Topic map: concepts / I need to… / design questions ----------
function highlight(text, q) {
  if (!q) return esc(text);
  const words = q.trim().split(/\s+/).filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!words.length) return esc(text);
  return esc(text).replace(new RegExp(`(${words.join('|')})`, 'gi'), '<mark>$1</mark>');
}
function linksHtml(links) {
  return links.map((l) => l.href ? `<a class="chipl ${l.external ? 'ext' : ''}" href="${esc(l.href)}" ${l.external ? 'target="_blank" rel="noopener"' : ''}>${esc(l.text)}</a>` : `<span class="missing" title="Learn note not in the app yet: ${esc(l.missing)}">${esc(l.text)}</span>`).join('');
}
async function viewMap(meta, r) {
  const c = meta.collection;
  setTitle('Topic map');
  state.map[c.id] = state.map[c.id] || (await getJSON(`${c.id}.map.json`));
  const map = state.map[c.id];
  const tabsAvail = ['concepts', 'tasks', 'questions'].filter((t) => map[t].length);
  let tab = r.query.get('tab') || tabsAvail[0];
  if (!tabsAvail.includes(tab)) tab = tabsAvail[0];
  let q = r.query.get('q') || '';
  main.innerHTML = `<div class="page">
    <div class="crumbs"><a href="#/${c.id}">${esc(c.title)}</a><span class="sep">/</span><span>Topic map</span></div>
    <h1 class="title">${esc(c.title)} topic map</h1>
    <p class="muted" style="margin:0 0 6px">${esc(map.intro)}</p>
    <div class="tabs" id="tabs">
      ${map.concepts.length ? `<button data-tab="concepts">By concept <span class="muted">${map.concepts.length}</span></button>` : ''}
      ${map.tasks.length ? `<button data-tab="tasks">I need to… <span class="muted">${map.tasks.length}</span></button>` : ''}
      ${map.questions.length ? `<button data-tab="questions">Design questions <span class="muted">${map.questions.length}</span></button>` : ''}
    </div>
    <div class="filter"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/></svg><input id="mf" placeholder="Type to filter…" value="${esc(q)}" autofocus><span class="cnt" id="mcnt"></span></div>
    <div id="mlist"></div>
  </div>`;
  const list = $('#mlist'), input = $('#mf'), cnt = $('#mcnt');
  const draw = () => {
    const qq = input.value.trim().toLowerCase();
    const hit = (s) => !qq || qq.split(/\s+/).every((w) => s.toLowerCase().includes(w));
    let rows = [], html = '';
    if (tab === 'concepts') {
      rows = map.concepts.filter((x) => hit(x.concept + ' ' + x.canonical.map((l) => l.text).join(' ')));
      html = rows.map((x) => `<div class="frow"><div class="q">${highlight(x.concept, qq)}</div><div><div class="links">${linksHtml(x.canonical)}</div>${x.also.length ? `<div class="also">also in: ${linksHtml(x.also).replace(/class="chipl[^"]*"/g, '')}</div>` : ''}</div></div>`).join('');
    } else if (tab === 'tasks') {
      rows = map.tasks.filter((x) => hit(x.task + ' ' + x.links.map((l) => l.text).join(' ')));
      html = rows.map((x) => `<div class="task-row"><span class="q">${highlight(x.task, qq)}</span><span class="links">${linksHtml(x.links)}</span></div>`).join('');
    } else {
      rows = map.questions.filter((x) => hit(x.question + ' ' + x.answer));
      html = rows.map((x) => `<div class="frow"><div class="q">${highlight(x.question, qq)}</div><div><div class="a">${x.answer}</div><div class="links">${linksHtml(x.links)}</div></div></div>`).join('');
    }
    list.innerHTML = html || `<div class="empty">Nothing matches "${esc(input.value)}".</div>`;
    cnt.textContent = `${rows.length} shown`;
    $('#tabs').querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
    history.replaceState(null, '', `#/${meta.page.id}?tab=${tab}${qq ? '&q=' + encodeURIComponent(input.value.trim()) : ''}`);
  };
  $('#tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { tab = b.dataset.tab; draw(); } });
  input.addEventListener('input', draw);
  draw();
  input.focus();
}

// ---------- Glossary ----------
async function viewGlossary(meta, r) {
  const c = meta.collection;
  setTitle('Glossary');
  const g = await getGlossary(c.id);
  const q0 = r.query.get('q') || '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const present = new Set(g.terms.map((t) => t.term[0].toUpperCase()));
  main.innerHTML = `<div class="page">
    <div class="crumbs"><a href="#/${c.id}">${esc(c.title)}</a><span class="sep">/</span><span>Glossary</span></div>
    <h1 class="title">${esc(c.title)} glossary</h1>
    <p class="muted" style="margin:0 0 12px">${esc(g.intro)}</p>
    <div class="filter"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/></svg><input id="gf" placeholder="Filter terms and definitions…" value="${esc(q0)}"><span class="cnt" id="gcnt"></span></div>
    <div class="alpha">${letters.map((L) => `<a href="#g-${L}" class="${present.has(L) ? '' : 'off'}">${L}</a>`).join('')}</div>
    <div id="glist"></div>
  </div>`;
  const input = $('#gf'), list = $('#glist'), cnt = $('#gcnt');
  const draw = () => {
    const qq = input.value.trim().toLowerCase();
    const rows = g.terms.filter((t) => !qq || qq.split(/\s+/).every((w) => (t.term + ' ' + t.plain).toLowerCase().includes(w)));
    let html = '', letter = '';
    for (const t of rows) {
      const L = t.term[0].toUpperCase();
      if (!qq && L !== letter) { letter = L; html += `<div class="gletter" id="g-${L}">${L}</div>`; }
      html += `<div class="gterm" id="t-${esc(t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}"><div class="t">${highlight(t.term, qq)}</div><div class="d">${qq ? highlight(t.plain, qq) : t.definition}</div><div class="l">${t.note?.href ? `<a href="${esc(t.note.href)}">Explained in ${esc(t.note.text)}</a>` : ''}${t.source?.href ? `<a class="ext" href="${esc(t.source.href)}" target="_blank" rel="noopener">${esc(t.source.text)} ↗</a>` : ''}</div></div>`;
    }
    list.innerHTML = html || `<div class="empty">No term matches "${esc(input.value)}".</div>`;
    cnt.textContent = `${rows.length} of ${g.terms.length}`;
    history.replaceState(null, '', `#/${meta.page.id}${qq ? '?q=' + encodeURIComponent(input.value.trim()) : ''}`);
  };
  input.addEventListener('input', draw);
  $('.alpha').addEventListener('click', (e) => {
    const a = e.target.closest('a'); if (!a) return;
    e.preventDefault(); input.value = ''; draw();
    document.getElementById(a.getAttribute('href').slice(1))?.scrollIntoView({ block: 'start' });
  });
  draw();
  if (r.anchor) document.getElementById(r.anchor)?.scrollIntoView();
}

// ---------- Search ----------
const modal = $('#search-modal'), sInput = $('#search-input'), sResults = $('#search-results');
let sel = 0, lastResults = [];
async function ensureSearch() {
  if (state.search) return state.search;
  const cs = state.index.collections.filter((c) => pageId(c, 'glossary'));
  const [docs, ...gls] = await Promise.all([getJSON('search.json'), ...cs.map((c) => getGlossary(c.id))]);
  const all = docs.map((d) => ({ ...d, kind: 'note' }));
  cs.forEach((c, ci) => gls[ci].terms.forEach((t, i) => all.push({ id: `term-${c.id}-${i}`, kind: 'term', note: pageId(c, 'glossary'), anchor: `t-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, title: t.term, heading: '', module: `${c.title} glossary`, text: t.plain })));
  const ms = new MiniSearch({
    fields: ['title', 'heading', 'text'],
    storeFields: ['kind', 'note', 'anchor', 'title', 'heading', 'module', 'text'],
    searchOptions: { boost: { title: 4, heading: 2 }, prefix: true, fuzzy: 0.15, combineWith: 'AND' },
    tokenize: (s) => s.toLowerCase().split(/[\s\-–—/,.;:()"'[\]{}<>!?]+/).filter(Boolean),
  });
  ms.addAll(all);
  state.searchDocs = all;
  state.search = ms;
  return ms;
}
function snippet(text, q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();
  let pos = -1;
  for (const w of words) { const i = lower.indexOf(w); if (i >= 0 && (pos < 0 || i < pos)) pos = i; }
  const start = Math.max(0, pos - 70);
  const s = (start > 0 ? '…' : '') + text.slice(start, start + 220) + (start + 220 < text.length ? '…' : '');
  return highlight(s, q);
}
function openSearch() {
  modal.hidden = false; sInput.value = ''; sResults.innerHTML = '<div class="modal-hint">Search across every note, heading and glossary term. Try "primary key", "restricted view" or "function-backed".</div>';
  sInput.focus();
  ensureSearch();
}
function closeSearch() { modal.hidden = true; }
$('#search-btn').addEventListener('click', openSearch);
modal.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });
let sT;
sInput.addEventListener('input', () => { clearTimeout(sT); sT = setTimeout(doSearch, 60); });
async function doSearch() {
  const q = sInput.value.trim();
  if (!q) { sResults.innerHTML = ''; lastResults = []; return; }
  const ms = await ensureSearch();
  let res = ms.search(q);
  if (!res.length) res = ms.search(q, { combineWith: 'OR' });
  // one result per note section, but cap repeats of the same note
  const seen = new Map(); lastResults = [];
  for (const r of res) { const k = r.note; const n = seen.get(k) || 0; if (n >= 3) continue; seen.set(k, n + 1); lastResults.push(r); if (lastResults.length >= 25) break; }
  sel = 0;
  sResults.innerHTML = lastResults.length ? lastResults.map((r, i) => `<a class="result ${i === sel ? 'sel' : ''}" href="#/${r.note}${r.anchor ? '#' + r.anchor : ''}" data-i="${i}">
      <div class="r1">${r.kind === 'term' ? '<span class="kind">term</span>' : ''}<span class="t">${highlight(r.title, q)}</span>${r.heading ? `<span class="h">${highlight(r.heading, q)}</span>` : ''}<span class="m">${esc(r.module)}</span></div>
      <div class="r2">${snippet(r.text || '', q)}</div></a>`).join('') : `<div class="modal-hint">No results for "${esc(q)}".</div>`;
  sResults.querySelectorAll('.result').forEach((a) => a.addEventListener('click', closeSearch));
}
function moveSel(d) {
  const items = sResults.querySelectorAll('.result'); if (!items.length) return;
  sel = (sel + d + items.length) % items.length;
  items.forEach((el, i) => el.classList.toggle('sel', i === sel));
  items[sel].scrollIntoView({ block: 'nearest' });
}
document.addEventListener('keydown', (e) => {
  const inField = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
  if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !inField)) { e.preventDefault(); modal.hidden ? openSearch() : closeSearch(); return; }
  if (!modal.hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
    else if (e.key === 'Enter') { const a = sResults.querySelectorAll('.result')[sel]; if (a) { e.preventDefault(); closeSearch(); location.hash = a.getAttribute('href'); } }
    return;
  }
  if (inField) return;
  if (e.key === '[' || e.key === ']') {
    const cur = state.route && state.noteCache.get(state.route.path);
    const to = cur && (e.key === '[' ? cur.prev : cur.next);
    if (to) navigate(to);
  }
  if (e.key === 'Escape') closeNav();
});

// ---------- boot ----------
(async function boot() {
  try {
    state.index = await getJSON('index.json');
  } catch (e) {
    main.innerHTML = `<div class="page"><h1 class="title">No data</h1><p class="muted">Run <code>npm run build</code> first. (${esc(e.message)})</p></div>`;
    return;
  }
  const r = parseHash() || { path: '', anchor: null, query: new URLSearchParams() };
  await render(r);
})();
