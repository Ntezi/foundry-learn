// Ontology Lab: build Kestrel's Ontology by hand, then use it.
// Five stations: object types → links → interfaces → actions → explore. Each station has a
// mission (steps that are checked against the model you build), a canvas and a tool panel.
import { DATASETS, BASE_TYPES, guessType, keyCheck, cardinality, nameAdvice, apiName, propApiName } from './lab-data.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, el = document) => el.querySelector(sel);
const fmt = (v) => (v == null ? '<span class="null">null</span>' : esc(v));

// ---------- model ----------
const EMPTY = () => ({
  types: {},        // apiName → { name, plural, ds, key, title, props: [{col, api, type}], pos: {x,y}, created }
  links: [],        // { id, from, to, fromCol, toCol, via?: { ds, fromCol, toCol }, kind }
  interfaces: {},   // apiName → { name, props: [{name, type, required}], impls: { typeApi: { map: {ifaceProp: typeProp} } }, pos }
  actions: {},      // apiName → { name, type, rule: {prop, value}, param: {name, required}, criteria: {prop, allowed: []}, group, notify }
  edits: [],        // { id, type, pk, prop, before, after, actionApi, by, at, reverted }
  log: [],          // { id, action, pk, by, at, params, status }
  seen: {},         // flags for "try the trap" steps and quiz answers
  user: 'Ama Mensah',
});

const USERS = { 'Ama Mensah': ['Support', 'Everyone'], 'Kofi Boateng': ['Analyst', 'Everyone'], 'Priya Nair': ['Data engineering', 'Everyone'] };
const GROUPS = ['Everyone', 'Support', 'Analyst', 'Data engineering'];

const NOTE = {
  types: ['ontology/04-object-types/01-object-types', '04 — Object types'],
  keys: ['ontology/04-object-types/03-primary-keys-and-titles', '04 — Primary keys and titles'],
  naming: ['ontology/11-design/03-anti-patterns', 'Design — anti-patterns (The Misnomer)'],
  links: ['ontology/06-links/01-link-types-and-cardinality', '06 — Link types and cardinality'],
  m2m: ['ontology/06-links/02-many-to-many-and-object-backed-links', '06 — Many-to-many and object-backed links'],
  traversal: ['ontology/06-links/03-traversal-and-search-arounds', '06 — Traversal and Search Arounds'],
  ifaces: ['ontology/07-interfaces/01-interfaces', '07 — Interfaces'],
  impl: ['ontology/07-interfaces/02-implementing-and-extending-interfaces', '07 — Implementing interfaces'],
  actions: ['ontology/08-actions/01-action-types', '08 — Action types'],
  rules: ['ontology/08-actions/02-rules-and-parameters', '08 — Rules and parameters'],
  criteria: ['ontology/08-actions/03-submission-criteria', '08 — Submission criteria'],
  perms: ['ontology/08-actions/06-action-permissions', '08 — Action permissions'],
  logs: ['ontology/08-actions/07-consistency-reverts-and-logs', '08 — Consistency, reverts and logs'],
  explorer: ['ontology/10-applications/02-object-views-and-object-explorer', '10 — Object Views and Object Explorer'],
  ref: ['ontology/17-case-studies/02-kestrel-reference-model', '17 — Kestrel reference model'],
};
const noteLink = (k) => `<a class="why" href="#/${NOTE[k][0]}">${esc(NOTE[k][1])}</a>`;

let M; // the model
let ctx; // { store, toast, onLeave }
let station = 'types';
let ui = { selected: null, preview: null, form: null, hop: null, flight: 0 };

const save = () => ctx.store.set('lab', M);

// Objects of a type, indexed by key (later rows win, like a last-wins merge; collisions are reported).
function objectsOf(api) {
  const t = M.types[api];
  if (!t) return [];
  const ds = DATASETS[t.ds];
  const ki = ds.columns.indexOf(t.key);
  const map = new Map();
  for (const r of ds.rows) {
    const k = r[ki];
    if (k == null) continue;
    const o = { __type: api, __pk: k };
    for (const p of t.props) o[p.api] = r[ds.columns.indexOf(p.col)];
    map.set(k, o);
  }
  // user edits on top
  for (const e of M.edits) if (!e.reverted && e.type === api && map.has(e.pk)) map.get(e.pk)[e.prop] = e.after;
  return [...map.values()];
}
const titleOf = (o) => { const t = M.types[o.__type]; const tp = t.props.find((p) => p.col === t.title); return tp ? String(o[tp.api]) : String(o.__pk); };
const propOf = (api, col) => M.types[api]?.props.find((p) => p.col === col);

// Follow a link from one object: the linked objects on the other side.
function traverse(o, link) {
  const dir = link.from === o.__type ? 'fwd' : link.to === o.__type ? 'back' : null;
  if (!dir) return [];
  const [myType, otherType, myCol, otherCol] = dir === 'fwd' ? [link.from, link.to, link.fromCol, link.toCol] : [link.to, link.from, link.toCol, link.fromCol];
  const others = objectsOf(otherType);
  if (link.via) {
    const ds = DATASETS[link.via.ds];
    const [myViaCol, otherViaCol] = dir === 'fwd' ? [link.via.fromCol, link.via.toCol] : [link.via.toCol, link.via.fromCol];
    const mi = ds.columns.indexOf(myViaCol), oi = ds.columns.indexOf(otherViaCol);
    const myKeyVal = o[propOf(myType, myCol)?.api] ?? o.__pk;
    const keys = new Set(ds.rows.filter((r) => r[mi] === myKeyVal).map((r) => r[oi]));
    const otherKeyProp = propOf(otherType, otherCol)?.api;
    return others.filter((x) => keys.has(otherKeyProp ? x[otherKeyProp] : x.__pk));
  }
  const myVal = o[propOf(myType, myCol)?.api] ?? (myCol === M.types[myType].key ? o.__pk : undefined);
  const otherProp = propOf(otherType, otherCol)?.api;
  return others.filter((x) => (otherProp ? x[otherProp] : x.__pk) === myVal);
}

// ---------- missions ----------
const STATIONS = [
  { id: 'types', title: 'Object types', blurb: 'Turn source tables into things the business recognises. Pick a key that survives rebuilds, a title people search for, and a name that isn\'t a table in disguise.' },
  { id: 'links', title: 'Links', blurb: 'Relate the types. The data decides the cardinality; you decide whether a many-to-many needs an object in the middle. Then walk the graph.' },
  { id: 'interfaces', title: 'Interfaces', blurb: 'Let different types share one shape. One widget, several object types.' },
  { id: 'actions', title: 'Actions', blurb: 'Governed edits: a rule, parameters, criteria and permissions. Then run it as a user and watch the log.' },
  { id: 'explore', title: 'Explore', blurb: 'Use what you built: filter, search around, aggregate, and export the model.' },
];

function typeFromDs(ds) { return Object.values(M.types).find((t) => t.ds === ds); }
const hasType = (ds, key) => { const t = typeFromDs(ds); return !!t && (!key || t.key === key); };
const hasLink = (a, b) => M.links.some((l) => (l.from === a && l.to === b) || (l.from === b && l.to === a));
const apiOfDs = (ds) => typeFromDs(ds)?.name && apiName(typeFromDs(ds).name);

const MISSIONS = {
  types: [
    { id: 'customer', text: 'Create an object type from customers_crm, keyed by customer_id', done: () => hasType('customers_crm', 'customer_id'), hint: 'Open customers_crm in the Source tables panel. The key must be unique and never null: the checker tells you which columns qualify.', why: 'keys' },
    { id: 'trap-key', text: 'Try the trap: pick a key that is not unique (email) and read what the checker says', done: () => !!M.seen.badKey, hint: 'With customers_crm open in the panel, select email as the key and read the checker before changing it back.', why: 'keys' },
    { id: 'order', text: 'Create Order from orders_web', done: () => hasType('orders_web', 'order_id'), hint: 'Same recipe. Think about the title: what would Ama type into search to find an order?', why: 'types' },
    { id: 'product', text: 'Create Product from products_pim', done: () => hasType('products_pim', 'sku'), hint: 'The key is the SKU; the title is the name.', why: 'types' },
    { id: 'shipment', text: 'Create a well-named type from wms_shp_hdr', done: () => { const t = typeFromDs('wms_shp_hdr'); return !!t && nameAdvice(t.name).ok && !/hdr|wms/i.test(t.name); }, hint: 'The table is called wms_shp_hdr. The thing is a shipment. Name the thing.', why: 'naming' },
    { id: 'lines', text: 'Make OrderLine from order_lines: no single column is unique, so build a composite key', done: () => hasType('order_lines', 'line_id'), hint: 'order_lines has no unique column. Use "Add composite key" in the form: the pipeline would compute order_id + "-" + line_no.', why: 'keys' },
  ],
  links: [
    { id: 'cust-order', text: 'Link Order to Customer (customer_id)', done: () => hasLink(apiOfDs('orders_web'), apiOfDs('customers_crm')), hint: 'From Order, join by customer_id → Customer.customer_id. The lab reads the data and tells you the cardinality.', why: 'links' },
    { id: 'order-ship', text: 'Link Order to the shipment type (ord_ref)', done: () => hasLink(apiOfDs('orders_web'), apiOfDs('wms_shp_hdr')), hint: 'The warehouse calls the order "ord_ref". The link doesn\'t care about names, only values.', why: 'links' },
    { id: 'order-product', text: 'Link Order to Product many-to-many through order_lines', done: () => M.links.some((l) => l.via && l.kind === 'many-to-many'), hint: 'Choose Order → Product and pick "through a join table". order_lines carries both keys.', why: 'm2m' },
    { id: 'product-supplier', text: 'Create Supplier and link Product to it', done: () => hasType('suppliers') && hasLink(apiOfDs('products_pim'), apiOfDs('suppliers')), hint: 'Go back to Object types for Supplier if you need to, then link by supplier_id.', why: 'links' },
    { id: 'walk', text: 'Search around: how many distinct products has Ama Mensah (C-001) ever ordered?', done: () => M.seen.quizProducts === true, hint: 'In the Search around panel, start from Customer C-001, hop to Orders, then to Products. Count distinct products and answer.', why: 'traversal', quiz: { key: 'quizProducts', answer: 4, prompt: 'Distinct products for C-001' } },
  ],
  interfaces: [
    { id: 'trackable', text: 'Create interface Trackable with status (String, required) and eta (Date, optional)', done: () => { const i = M.interfaces.Trackable; return !!i && i.props.some((p) => p.name === 'status' && p.required) && i.props.some((p) => p.name === 'eta' && !p.required); }, hint: 'Define the shared shape first. Required properties are the contract every implementer must meet.', why: 'ifaces' },
    { id: 'impl-ship', text: 'Implement Trackable on the shipment type', done: () => !!M.interfaces.Trackable?.impls?.[apiOfDs('wms_shp_hdr')], hint: 'Map status → shp_status and eta → eta.', why: 'impl' },
    { id: 'return-type', text: 'Create Return from returns and implement Trackable on it', done: () => hasType('returns') && !!M.interfaces.Trackable?.impls?.[apiOfDs('returns')], hint: 'Two different things, one shape. The interface view on the right then shows both.', why: 'impl' },
    { id: 'trap-impl', text: 'Try the trap: implement Trackable on Product and read why it fails', done: () => !!M.seen.badImpl, hint: 'Product has no status. A required property with nothing to map it to is a contract you can\'t sign.', why: 'impl' },
  ],
  actions: [
    { id: 'cancel', text: 'Create action "Cancel order" on Order: set status to cancelled, with a required reason', done: () => Object.values(M.actions).some((a) => a.type === apiOfDs('orders_web') && a.rule.prop === 'status' && a.rule.value === 'cancelled' && a.param?.required), hint: 'Rule: modify status → cancelled. Parameter: reason, required.', why: 'rules' },
    { id: 'criteria', text: 'Add submission criteria: only open or paid orders can be cancelled', done: () => Object.values(M.actions).some((a) => a.criteria?.prop === 'status' && a.criteria.allowed.includes('open') && a.criteria.allowed.includes('paid') && !a.criteria.allowed.includes('shipped')), hint: 'A shipped order is already with the carrier. Encode the policy, don\'t rely on people remembering it.', why: 'criteria' },
    { id: 'perm', text: 'Restrict the action to the Support group', done: () => Object.values(M.actions).some((a) => a.group === 'Support'), hint: 'Who may run it is part of the action, not of the app that shows the button.', why: 'perms' },
    { id: 'run', text: 'Run it as Ama (Support) on ORD-1003 and watch the log', done: () => M.log.some((l) => l.status === 'applied' && l.pk === 'ORD-1003'), hint: 'Switch to "Run as a user" in the Actions panel, pick ORD-1003, give a reason, submit.', why: 'logs' },
    { id: 'trap-criteria', text: 'Try the trap: cancel ORD-1001 (shipped)', done: () => M.log.some((l) => l.status === 'blocked' && l.pk === 'ORD-1001'), hint: 'The criteria should refuse. Read the message a user would see.', why: 'criteria' },
    { id: 'trap-perm', text: 'Try the trap: run it as Kofi (Analyst)', done: () => M.log.some((l) => l.status === 'denied'), hint: 'Change the user at the top of the run panel.', why: 'perms' },
    { id: 'revert', text: 'Revert one applied edit', done: () => M.edits.some((e) => e.reverted), hint: 'Each log entry has a revert. Reverts are one-shot: they create a new edit, they don\'t delete history.', why: 'logs' },
  ],
  explore: [
    { id: 'filter', text: 'Filter Orders to status = open', done: () => !!M.seen.filteredOpen, hint: 'Pick Order, filter on status.', why: 'explorer' },
    { id: 'agg', text: 'Aggregate: count Orders by status', done: () => !!M.seen.aggStatus, hint: 'Use "Count by" on the status property.', why: 'explorer' },
    { id: 'export', text: 'Export your model as a diagram and compare it with the Kestrel reference model', done: () => !!M.seen.exported, hint: 'Export gives you a Mermaid ER diagram; the reference model note shows where Kestrel ended up.', why: 'ref' },
  ],
};

// ---------- rendering ----------
export async function viewLab(main, route, context) {
  ctx = context;
  M = ctx.store.get('lab', null) || EMPTY();
  if (!M.seen) M.seen = {};
  ensureComposite();
  station = route.query.get('s') || station;
  if (!STATIONS.some((s) => s.id === station)) station = 'types';
  ui = { selected: null, preview: null, form: null, hop: null, flight: 0 };
  main.innerHTML = `<div class="lab">
    <div class="lab-top">
      <div class="lab-title"><span class="lab-badge">Lab</span><strong>Build Kestrel's Ontology</strong><span class="muted small">learn by doing: every step is checked against what you build</span></div>
      <div class="lab-tabs" id="lab-tabs"></div>
      <div class="lab-readouts" id="lab-readouts"></div>
    </div>
    <div class="lab-body">
      <aside class="lab-mission" id="lab-mission"></aside>
      <div class="lab-canvas" id="lab-canvas"><svg class="lab-lines" id="lab-lines"></svg><div class="lab-nodes" id="lab-nodes"></div><div class="lab-empty" id="lab-empty"></div></div>
      <aside class="lab-side" id="lab-side"></aside>
    </div>
  </div>`;
  renderAll();
  const onKey = (e) => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const i = STATIONS.findIndex((s) => s.id === station);
    if (e.key >= '1' && e.key <= '5') go(STATIONS[Number(e.key) - 1].id);
    else if (e.key === 'n' && i < STATIONS.length - 1) go(STATIONS[i + 1].id);
    else if (e.key === 'p' && i > 0) go(STATIONS[i - 1].id);
  };
  document.addEventListener('keydown', onKey);
  ctx.onLeave(() => document.removeEventListener('keydown', onKey));
}
function go(s) { station = s; ui.form = null; ui.preview = null; ui.selected = null; history.replaceState(null, '', `#/lab?s=${s}`); renderAll(); }
function renderAll() { renderTabs(); renderReadouts(); renderMission(); renderCanvas(); renderSide(); }

function renderTabs() {
  $('#lab-tabs').innerHTML = STATIONS.map((s, i) => {
    const ms = MISSIONS[s.id], done = ms.filter((m) => m.done()).length;
    return `<button class="${s.id === station ? 'active' : ''} ${done === ms.length ? 'done' : ''}" data-s="${s.id}"><span class="k">${i + 1}</span>${esc(s.title)}<span class="prog">${done}/${ms.length}</span></button>`;
  }).join('');
  $('#lab-tabs').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => go(b.dataset.s)));
}
function renderReadouts() {
  const types = Object.keys(M.types).length;
  const objects = Object.keys(M.types).reduce((s, a) => s + objectsOf(a).length, 0);
  const r = [['object types', types], ['objects indexed', objects], ['links', M.links.length], ['interfaces', Object.keys(M.interfaces).length], ['actions', Object.keys(M.actions).length], ['edits', M.edits.filter((e) => !e.reverted).length]];
  $('#lab-readouts').innerHTML = r.map(([l, v]) => `<div class="ro"><span class="v">${v}</span><span class="l">${l}</span></div>`).join('') + `<button class="btn sm" id="lab-reset" title="Start the lab again">Reset lab</button>`;
  $('#lab-reset').addEventListener('click', () => { if (confirm('Throw away everything you built in the lab?')) { M = EMPTY(); save(); renderAll(); } });
}
function renderMission() {
  const s = STATIONS.find((x) => x.id === station), ms = MISSIONS[station];
  const next = ms.find((m) => !m.done());
  $('#lab-mission').innerHTML = `<div class="m-head"><div class="m-step">Station ${STATIONS.indexOf(s) + 1} of ${STATIONS.length}</div><h2>${esc(s.title)}</h2><p>${esc(s.blurb)}</p></div>
    <div class="coach ${next ? '' : 'done'}"><div class="coach-k">${next ? 'Coach' : 'Station complete'}</div><div>${next ? esc(next.hint) : 'Everything here is built. Move on, or keep experimenting: nothing you do is graded.'}</div>${next?.why ? `<div class="coach-why">Read the why: ${noteLink(next.why)}</div>` : ''}</div>
    <ol class="m-steps">${ms.map((m) => `<li class="${m.done() ? 'done' : m === next ? 'next' : ''}"><span class="tick">${m.done() ? '✓' : ''}</span><div>${esc(m.text)}${m.quiz && !m.done() ? `<form class="quiz" data-key="${m.quiz.key}" data-answer="${m.quiz.answer}"><input type="number" min="0" placeholder="${esc(m.quiz.prompt)}" required><button class="btn sm primary">Check</button><span class="qmsg"></span></form>` : ''}</div></li>`).join('')}</ol>
    <div class="m-nav">${STATIONS.indexOf(s) > 0 ? `<button class="btn sm" data-go="${STATIONS[STATIONS.indexOf(s) - 1].id}">← ${esc(STATIONS[STATIONS.indexOf(s) - 1].title)}</button>` : ''}${STATIONS.indexOf(s) < STATIONS.length - 1 ? `<button class="btn sm ${next ? '' : 'primary'}" data-go="${STATIONS[STATIONS.indexOf(s) + 1].id}">${esc(STATIONS[STATIONS.indexOf(s) + 1].title)} →</button>` : ''}</div>
    <div class="m-keys small muted"><kbd>1</kbd>–<kbd>5</kbd> stations · <kbd>n</kbd>/<kbd>p</kbd> next / previous</div>`;
  $('#lab-mission').querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => go(b.dataset.go)));
  $('#lab-mission').querySelectorAll('form.quiz').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = Number(f.querySelector('input').value), ok = v === Number(f.dataset.answer);
    if (ok) { M.seen[f.dataset.key] = true; save(); ctx.toast('Right. Search around does the counting for you in real life; the point is knowing which hops to take.'); renderAll(); }
    else f.querySelector('.qmsg').textContent = v > Number(f.dataset.answer) ? 'Too many: count distinct products, not lines.' : 'Too few: did you follow every order?';
  }));
}

// ----- canvas: draggable type cards, interface nodes, link lines -----
function renderCanvas() {
  const nodes = $('#lab-nodes'), lines = $('#lab-lines');
  const types = Object.values(M.types);
  const ifaces = Object.values(M.interfaces);
  $('#lab-empty').innerHTML = types.length ? '' : `<div class="empty-canvas"><div class="big">The Ontology is empty.</div><p>Pick a source table on the right and create your first object type. Cards appear here; drag them around.</p></div>`;
  // New nodes take the first free slot of a grid, so they never land on top of each other.
  const taken = [...types, ...ifaces].filter((n) => n.pos).map((n) => n.pos);
  const free = () => { for (let r = 0; r < 20; r++) for (let c = 0; c < 3; c++) { const pos = { x: 40 + c * 262, y: 40 + r * 200 }; if (!taken.some((p) => Math.abs(p.x - pos.x) < 230 && Math.abs(p.y - pos.y) < 170)) { taken.push(pos); return pos; } } return { x: 40, y: 40 }; };
  for (const n of [...types, ...ifaces]) if (!n.pos) n.pos = free();
  nodes.innerHTML = types.map((t) => {
    const api = apiName(t.name), objs = objectsOf(api), edits = M.edits.filter((e) => !e.reverted && e.type === api).length;
    const impl = ifaces.filter((f) => f.impls?.[api]).map((f) => f.name);
    const acts = Object.values(M.actions).filter((a) => a.type === api).length;
    return `<div class="node type ${ui.selected === api ? 'sel' : ''}" data-id="${api}" style="left:${t.pos.x}px;top:${t.pos.y}px">
      <div class="n-head"><span class="n-icon">▣</span><span class="n-name">${esc(t.name)}</span><span class="n-api">${esc(api)}</span></div>
      <div class="n-row"><span class="n-k">key</span>${esc(t.key)}<span class="n-k">title</span>${esc(t.title)}</div>
      <div class="n-props">${t.props.slice(0, 5).map((p) => `<span>${esc(p.api)}<i>${esc(p.type)}</i></span>`).join('')}${t.props.length > 5 ? `<span class="more">+${t.props.length - 5}</span>` : ''}</div>
      <div class="n-foot"><span class="n-count" title="objects indexed from ${esc(t.ds)}">${objs.length} objects</span>${impl.length ? `<span class="n-impl" title="implements">◇ ${esc(impl.join(', '))}</span>` : ''}${acts ? `<span class="n-act">⚡ ${acts}</span>` : ''}${edits ? `<span class="n-edit">✎ ${edits}</span>` : ''}</div>
      <div class="n-src">from ${esc(t.ds)}</div>
    </div>`;
  }).join('') + ifaces.map((f) => `<div class="node iface" data-id="iface:${esc(f.name)}" style="left:${f.pos.x}px;top:${f.pos.y}px"><div class="n-head"><span class="n-icon">◇</span><span class="n-name">${esc(f.name)}</span><span class="n-api">interface</span></div><div class="n-props">${f.props.map((p) => `<span>${esc(p.name)}<i>${esc(p.type)}${p.required ? ' *' : ''}</i></span>`).join('')}</div><div class="n-foot"><span class="n-count">${Object.keys(f.impls || {}).length} implementer${Object.keys(f.impls || {}).length === 1 ? '' : 's'}</span></div></div>`).join('');
  drawLines();
  // drag
  nodes.querySelectorAll('.node').forEach((el) => {
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const id = el.dataset.id;
      const target = id.startsWith('iface:') ? M.interfaces[id.slice(6)] : M.types[id];
      const sx = e.clientX - target.pos.x, sy = e.clientY - target.pos.y;
      el.setPointerCapture(e.pointerId);
      let moved = false;
      const mv = (ev) => { moved = true; target.pos = { x: Math.max(0, ev.clientX - sx), y: Math.max(0, ev.clientY - sy) }; el.style.left = target.pos.x + 'px'; el.style.top = target.pos.y + 'px'; drawLines(); };
      const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); save(); if (!moved && !id.startsWith('iface:')) { ui.selected = ui.selected === id ? null : id; renderCanvas(); renderSide(); } };
      el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up);
    });
  });
}
function nodeCenter(id) {
  const el = $(`#lab-nodes .node[data-id="${CSS.escape(id)}"]`);
  if (!el) return null;
  return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2, w: el.offsetWidth, h: el.offsetHeight };
}
function drawLines() {
  const svg = $('#lab-lines');
  const canvas = $('#lab-canvas');
  svg.setAttribute('width', canvas.scrollWidth); svg.setAttribute('height', canvas.scrollHeight);
  let out = '';
  for (const l of M.links) {
    const a = nodeCenter(l.from), b = nodeCenter(l.to);
    if (!a || !b) continue;
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const glyph = { 'one-to-many': ['1', 'n'], 'many-to-one': ['n', '1'], 'one-to-one': ['1', '1'], 'many-to-many': ['n', 'n'] }[l.kind] || ['', ''];
    out += `<path class="link ${l.via ? 'via' : ''}" d="M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}"/>`;
    out += `<text class="card" x="${a.x + (b.x - a.x) * 0.18}" y="${a.y + (b.y - a.y) * 0.18 - 6}">${glyph[0]}</text><text class="card" x="${a.x + (b.x - a.x) * 0.82}" y="${a.y + (b.y - a.y) * 0.82 - 6}">${glyph[1]}</text>`;
    out += `<text class="lbl" x="${mx}" y="${my - 6}" text-anchor="middle">${esc(l.via ? `via ${l.via.ds}` : l.fromCol)}</text>`;
  }
  for (const f of Object.values(M.interfaces)) {
    for (const api of Object.keys(f.impls || {})) {
      const a = nodeCenter(`iface:${f.name}`), b = nodeCenter(api);
      if (a && b) out += `<path class="impl" d="M${a.x},${a.y} L${b.x},${b.y}"/>`;
    }
  }
  svg.innerHTML = out;
}

// ----- side panel per station -----
function renderSide() {
  const side = $('#lab-side');
  side.innerHTML = { types: sideTypes, links: sideLinks, interfaces: sideInterfaces, actions: sideActions, explore: sideExplore }[station]();
  bindSide();
}
const sel = (name, opts, val, attrs = '') => `<select name="${name}" ${attrs}>${opts.map((o) => `<option value="${esc(o.v ?? o)}" ${(o.v ?? o) === val ? 'selected' : ''}>${esc(o.l ?? o)}</option>`).join('')}</select>`;

function dsTable(ds, highlightCol, bad = new Set()) {
  const d = DATASETS[ds];
  return `<div class="ds-table"><table><thead><tr>${d.columns.map((c) => `<th class="${c === highlightCol ? 'hl' : ''}">${esc(c)}</th>`).join('')}</tr></thead><tbody>${d.rows.map((r, ri) => `<tr class="${bad.has(ri) ? 'bad' : ''}">${r.map((v, ci) => `<td class="${d.columns[ci] === highlightCol ? 'hl' : ''}">${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function sideTypes() {
  const f = ui.form;
  if (ui.selected && M.types[ui.selected]) {
    const t = M.types[ui.selected];
    return `<div class="s-head"><h3>${esc(t.name)}</h3><button class="btn sm" data-act="unselect">close</button></div>
      <p class="small muted">Backed by <code>${esc(t.ds)}</code> · key <code>${esc(t.key)}</code> · ${objectsOf(ui.selected).length} objects.</p>
      ${dsTable(t.ds, t.key)}
      <div class="s-actions"><button class="btn sm" data-act="delete-type" data-id="${esc(ui.selected)}">Delete type</button></div>`;
  }
  if (f?.ds) {
    const d = DATASETS[f.ds];
    const kc = f.key === '__composite' ? null : keyCheck(d, f.key);
    const badRows = new Set();
    if (kc && !kc.ok) { const ki = d.columns.indexOf(f.key); d.rows.forEach((r, i) => { if (r[ki] == null || kc.dupes.some(([v]) => v === r[ki])) badRows.add(i); }); }
    const adv = nameAdvice(f.name || '');
    const compositeOk = f.ds === 'order_lines';
    return `<div class="s-head"><h3>New object type</h3><button class="btn sm" data-act="cancel">cancel</button></div>
      <form id="type-form" class="lab-form">
        <label>Source dataset <code>${esc(f.ds)}</code> <span class="muted small">(${esc(d.system)}, ${d.rows.length} rows)</span></label>
        <label>Name <input name="name" value="${esc(f.name || '')}" placeholder="Business noun, singular, PascalCase" autocomplete="off"></label>
        <div class="advice ${adv.ok ? (adv.warn ? 'warn' : 'ok') : 'bad'}">${esc(adv.ok ? (adv.warn || `API name will be ${apiName(f.name)}. Plural: ${esc(f.name)}s.`) : adv.msg)}</div>
        <label>Primary key ${sel('key', [...d.columns.filter((c) => c !== 'line_id'), ...(compositeOk ? [{ v: '__composite', l: 'line_id = order_id + "-" + line_no (computed in the pipeline)' }] : [])], f.key === 'line_id' ? '__composite' : f.key)}</label>
        <div class="advice ${kc ? (kc.ok ? 'ok' : 'bad') : 'ok'}">${kc ? (kc.ok ? `✓ ${kc.objects} unique, never null → ${kc.objects} objects.` : `✗ ${kc.nulls ? `${kc.nulls} null row${kc.nulls > 1 ? 's' : ''} would be dropped. ` : ''}${kc.dupes.length ? `${kc.dupes.length} duplicate value${kc.dupes.length > 1 ? 's' : ''} (${kc.dupes.map(([v, n]) => `${v} ×${n}`).join(', ')}): ${kc.collapsed} row${kc.collapsed > 1 ? 's' : ''} would collapse into one object and every edit on them would land on the wrong thing.` : ''} Rows that would break are marked below.`) : '✓ A composite key computed in the pipeline: every line gets a stable, unique id.'}</div>
        <label>Title property ${sel('title', d.columns.filter((c) => c !== 'line_id'), f.title)}</label>
        <div class="advice ${f.title === f.key ? 'warn' : 'ok'}">${f.title === f.key ? 'The title is the key. Fine for an order number; for a person, people search by name.' : 'What a person sees in search results and lists.'}</div>
        <fieldset><legend>Properties</legend>${d.columns.filter((c) => c !== 'line_id').map((c) => { const vals = d.rows.map((r) => r[d.columns.indexOf(c)]); const p = f.props[c]; return `<div class="prop-row"><label><input type="checkbox" name="p:${esc(c)}" ${p ? 'checked' : ''}> <code>${esc(propApiName(c))}</code></label>${sel('t:' + c, BASE_TYPES, p?.type || guessType(vals))}</div>`; }).join('')}</fieldset>
        <button class="btn primary" ${adv.ok && (kc ? kc.ok : true) ? '' : 'disabled'}>Create object type</button>
      </form>
      ${dsTable(f.ds, f.key === '__composite' ? null : f.key, badRows)}`;
  }
  return `<div class="s-head"><h3>Source tables</h3></div><p class="small muted">Kestrel's systems export these. Each becomes zero or one object types. Click one.</p>
    <div class="ds-list">${Object.values(DATASETS).map((d) => { const t = typeFromDs(d.label); return `<button class="ds ${t ? 'used' : ''}" data-ds="${esc(d.label)}"><span class="ds-name">${esc(d.label)}</span><span class="ds-sys">${esc(d.system)} · ${d.rows.length} rows · ${d.columns.length} columns</span>${t ? `<span class="ds-used">→ ${esc(t.name)}</span>` : ''}</button>`; }).join('')}</div>`;
}

function sideLinks() {
  const types = Object.values(M.types);
  if (types.length < 2) return `<div class="s-head"><h3>Links</h3></div><p class="muted">You need at least two object types. Go back to station 1.</p>`;
  if (ui.form && (!M.types[ui.form.from] || !M.types[ui.form.to])) ui.form = null;
  const f = ui.form || (ui.form = { from: apiName(types[0].name), to: apiName(types[1].name), mode: 'direct' });
  const ft = M.types[f.from], tt = M.types[f.to];
  const fd = DATASETS[ft.ds], td = DATASETS[tt.ds];
  f.fromCol = f.fromCol && fd.columns.includes(f.fromCol) ? f.fromCol : fd.columns[0];
  f.toCol = f.toCol && td.columns.includes(f.toCol) ? f.toCol : tt.key;
  // join tables: datasets not used by a type that contain a column matching each side's key values
  // Any other table can back a join; a table that also backs an object type (OrderLine) is fine, that is the object-backed case.
  const joins = Object.values(DATASETS).filter((d) => d.label !== ft.ds && d.label !== tt.ds).sort((a, b) => (typeFromDs(a.label) ? 1 : 0) - (typeFromDs(b.label) ? 1 : 0));
  let analysis = '';
  if (f.mode === 'direct') {
    const c = cardinality(fd, f.fromCol, td, f.toCol);
    const matched = fd.rows.length - c.unmatched;
    analysis = `<div class="advice ${matched ? 'ok' : 'bad'}">${matched ? `Values in <code>${esc(f.fromCol)}</code> match <code>${esc(tt.name)}.${esc(f.toCol)}</code> for ${matched} of ${fd.rows.length} rows${c.unmatched ? ` (${c.unmatched} would have no linked object)` : ''}.<br>Inferred: <strong>${esc(ft.name)} → ${esc(tt.name)} is ${c.kind}</strong>: a ${esc(ft.name)} has up to ${c.maxTo} ${esc(tt.name)}${c.maxTo === 1 ? '' : 's'}; a ${esc(tt.name)} has up to ${c.maxFrom} ${esc(ft.name)}${c.maxFrom === 1 ? '' : 's'}. <span class="muted">Inferred from this sample; in Foundry you declare the cardinality you believe, and the data is checked against it.</span>` : `No value of <code>${esc(f.fromCol)}</code> appears in <code>${esc(tt.name)}.${esc(f.toCol)}</code>. Wrong column?`}</div>`;
    if (c.kind === 'many-to-many' && matched) analysis += `<div class="advice warn">Many-to-many through a plain column means the key repeats on both sides. Foundry needs a join table (or an object in the middle) for that.</div>`;
  } else {
    const jd = DATASETS[f.via];
    if (!jd) analysis = '<div class="advice bad">No spare table to join through.</div>';
    else {
      f.viaFrom = f.viaFrom && jd.columns.includes(f.viaFrom) ? f.viaFrom : jd.columns[0];
      f.viaTo = f.viaTo && jd.columns.includes(f.viaTo) ? f.viaTo : jd.columns[1];
      const c1 = cardinality(fd, ft.key, jd, f.viaFrom), c2 = cardinality(td, tt.key, jd, f.viaTo);
      const ok = c1.maxTo > 0 && c2.maxTo > 0;
      analysis = `<div class="advice ${ok ? 'ok' : 'bad'}">${ok ? `<code>${esc(f.via)}</code> carries both keys: a ${esc(ft.name)} appears on up to ${c1.maxTo} rows, a ${esc(tt.name)} on up to ${c2.maxTo}. <strong>many-to-many</strong>, backed by the join table.` : 'The chosen columns don\'t carry these keys.'}</div><div class="advice">If the relationship had its own facts (quantity, price), you would make it an object type instead and link both sides to it. order_lines has qty and unit_price: that is exactly the OrderLine case. Both are valid; the join-table link is the quick way to walk Order ↔ Product.</div>`;
    }
  }
  return `<div class="s-head"><h3>New link</h3></div>
    <form id="link-form" class="lab-form">
      <div class="two"><label>From ${sel('from', types.map((t) => ({ v: apiName(t.name), l: t.name })), f.from)}</label><label>To ${sel('to', types.map((t) => ({ v: apiName(t.name), l: t.name })), f.to)}</label></div>
      <div class="seg"><button type="button" class="${f.mode === 'direct' ? 'on' : ''}" data-mode="direct">by a column</button><button type="button" class="${f.mode === 'via' ? 'on' : ''}" data-mode="via" ${joins.length ? '' : 'disabled'}>through a join table</button></div>
      ${f.mode === 'direct' ? `<div class="two"><label>${esc(ft.name)} column ${sel('fromCol', fd.columns, f.fromCol)}</label><label>= ${esc(tt.name)} column ${sel('toCol', td.columns, f.toCol)}</label></div>` : `<label>Join table ${sel('via', joins.map((d) => d.label), f.via || joins[0]?.label)}</label>${f.via && DATASETS[f.via] ? `<div class="two"><label>${esc(ft.name)} key column ${sel('viaFrom', DATASETS[f.via].columns, f.viaFrom)}</label><label>${esc(tt.name)} key column ${sel('viaTo', DATASETS[f.via].columns, f.viaTo)}</label></div>` : ''}`}
      ${analysis}
      <button class="btn primary">Create link</button>
    </form>
    <hr>
    <div class="s-head"><h3>Search around</h3></div>
    ${searchAround()}
    ${M.links.length ? `<hr><div class="s-head"><h3>Your links</h3></div><div class="list">${M.links.map((l) => `<div class="row"><span>${esc(M.types[l.from]?.name)} → ${esc(M.types[l.to]?.name)} <span class="chip">${esc(l.kind)}</span></span><button class="btn sm" data-act="delete-link" data-id="${l.id}">✕</button></div>`).join('')}</div>` : ''}`;
}
function searchAround() {
  const types = Object.values(M.types);
  if (ui.hop && !M.types[ui.hop.type]) ui.hop = null;
  const h = ui.hop || (ui.hop = { type: apiName(types[0].name), pk: objectsOf(apiName(types[0].name))[0]?.__pk, path: [] });
  const objs = objectsOf(h.type);
  const o = objs.find((x) => x.__pk === h.pk) || objs[0];
  if (!o) return '<p class="muted">No objects.</p>';
  const links = M.links.filter((l) => l.from === h.type || l.to === h.type);
  return `<div class="sa">
    <div class="two"><label>Start from ${sel('sa-type', types.map((t) => ({ v: apiName(t.name), l: t.name })), h.type)}</label><label>Object ${sel('sa-pk', objs.map((x) => ({ v: x.__pk, l: `${x.__pk} · ${titleOf(x)}` })), o.__pk)}</label></div>
    ${h.path.length ? `<div class="sa-path small">${h.path.map((p) => esc(p)).join(' → ')} → <strong>${esc(titleOf(o))}</strong></div>` : ''}
    <div class="sa-obj"><div class="sa-title">${esc(titleOf(o))} <span class="chip">${esc(M.types[o.__type].name)}</span></div><div class="sa-props">${M.types[o.__type].props.map((p) => `<span><i>${esc(p.api)}</i> ${fmt(o[p.api])}</span>`).join('')}</div></div>
    ${links.length ? links.map((l) => { const other = l.from === h.type ? l.to : l.from; const res = traverse(o, l); return `<div class="sa-hop"><div class="sa-hop-h">→ ${esc(M.types[other].name)} <span class="muted small">${res.length} linked${l.via ? ` via ${esc(l.via.ds)}` : ''}</span></div><div class="sa-hits">${res.map((x) => `<button class="hit" data-hop-type="${esc(other)}" data-hop-pk="${esc(x.__pk)}">${esc(titleOf(x))}</button>`).join('') || '<span class="muted small">none</span>'}</div></div>`; }).join('') : '<p class="muted small">No links touch this type yet.</p>'}
  </div>`;
}

function sideInterfaces() {
  const f = ui.form || (ui.form = { tab: 'define', props: [{ name: 'status', type: 'String', required: true }, { name: 'eta', type: 'Date', required: false }] });
  const ifaces = Object.values(M.interfaces), types = Object.values(M.types);
  let body = '';
  if (f.tab === 'define') {
    body = `<form id="iface-form" class="lab-form"><label>Name <input name="name" value="${esc(f.name || 'Trackable')}" autocomplete="off"></label>
      <fieldset><legend>Properties the implementers must provide</legend>${f.props.map((p, i) => `<div class="prop-row"><input name="pn${i}" value="${esc(p.name)}" placeholder="name">${sel('pt' + i, BASE_TYPES, p.type)}<label><input type="checkbox" name="pr${i}" ${p.required ? 'checked' : ''}> required</label><button type="button" class="btn sm" data-rm="${i}">✕</button></div>`).join('')}<button type="button" class="btn sm" id="iface-add">+ property</button></fieldset>
      <button class="btn primary">Create interface</button></form>`;
  } else if (f.tab === 'impl') {
    const iface = M.interfaces[f.iface] || ifaces[0];
    if (!iface) body = '<p class="muted">Define an interface first.</p>';
    else if (!types.length) body = '<p class="muted">Create an object type first (station 1).</p>';
    else {
      const t = M.types[f.type] || types[0];
      const map = f.map || {};
      const problems = iface.props.filter((p) => p.required && !map[p.name]).map((p) => p.name);
      const typeMismatch = iface.props.filter((p) => map[p.name] && t.props.find((x) => x.api === map[p.name])?.type !== p.type).map((p) => `${p.name} (${p.type} ≠ ${t.props.find((x) => x.api === map[p.name])?.type})`);
      body = `<form id="impl-form" class="lab-form"><div class="two"><label>Interface ${sel('iface', ifaces.map((x) => x.name), iface.name)}</label><label>Object type ${sel('type', types.map((x) => ({ v: apiName(x.name), l: x.name })), apiName(t.name))}</label></div>
        <fieldset><legend>Map each interface property to a property of ${esc(t.name)}</legend>${iface.props.map((p) => `<div class="prop-row"><span><code>${esc(p.name)}</code> <i class="small muted">${esc(p.type)}${p.required ? ', required' : ''}</i></span>${sel('m:' + p.name, [{ v: '', l: '— not mapped —' }, ...t.props.map((x) => ({ v: x.api, l: `${x.api} (${x.type})` }))], map[p.name] || '')}</div>`).join('')}</fieldset>
        <div class="advice ${problems.length || typeMismatch.length ? 'bad' : 'ok'}">${problems.length ? `✗ Required but unmapped: ${esc(problems.join(', '))}. ${esc(t.name)} can't honour the contract: it has no such fact.` : typeMismatch.length ? `✗ Type mismatch: ${esc(typeMismatch.join(', '))}.` : `✓ ${esc(t.name)} satisfies ${esc(iface.name)}.`}</div>
        <button class="btn primary" ${problems.length || typeMismatch.length ? 'data-fail="1"' : ''}>Implement</button></form>`;
    }
  } else {
    const iface = M.interfaces[f.iface] || ifaces[0];
    if (!iface || !Object.keys(iface.impls || {}).length) body = '<p class="muted">Implement an interface on at least one type to see the shared view.</p>';
    else {
      const rows = [];
      for (const [api, impl] of Object.entries(iface.impls)) for (const o of objectsOf(api)) rows.push({ type: M.types[api].name, title: titleOf(o), vals: iface.props.map((p) => (impl.map[p.name] ? o[impl.map[p.name]] : undefined)) });
      body = `<p class="small muted">One widget bound to <strong>${esc(iface.name)}</strong> shows every implementer with the same columns, whatever its own property names are.</p>
        <div class="ds-table"><table><thead><tr><th>type</th><th>object</th>${iface.props.map((p) => `<th>${esc(p.name)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr><td><span class="chip">${esc(r.type)}</span></td><td>${esc(r.title)}</td>${r.vals.map((v) => `<td>${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
  }
  return `<div class="s-head"><h3>Interfaces</h3></div><div class="seg"><button class="${f.tab === 'define' ? 'on' : ''}" data-tab="define">1 Define</button><button class="${f.tab === 'impl' ? 'on' : ''}" data-tab="impl">2 Implement</button><button class="${f.tab === 'view' ? 'on' : ''}" data-tab="view">3 Interface view</button></div>${body}
    ${ifaces.length ? `<hr><div class="list">${ifaces.map((x) => `<div class="row"><span>◇ ${esc(x.name)} · ${Object.keys(x.impls || {}).length} impl.</span><button class="btn sm" data-act="delete-iface" data-id="${esc(x.name)}">✕</button></div>`).join('')}</div>` : ''}`;
}

function sideActions() {
  const types = Object.values(M.types);
  if (!types.length) return '<div class="s-head"><h3>Actions</h3></div><p class="muted">Create an object type first.</p>';
  const f = ui.form || (ui.form = { tab: Object.keys(M.actions).length ? 'run' : 'build', name: 'Cancel order', type: apiOfDs('orders_web') || apiName(types[0].name), prop: 'status', value: 'cancelled', pname: 'reason', preq: true, cprop: 'status', allowed: ['open', 'paid'], group: 'Support', notify: true });
  const t = M.types[f.type] || types[0];
  let body = '';
  if (f.tab === 'build') {
    const vals = (p) => [...new Set(objectsOf(apiName(t.name)).map((o) => o[p]).filter((v) => v != null))];
    const cprop = t.props.find((p) => p.api === f.cprop) ? f.cprop : t.props[0].api;
    body = `<form id="action-form" class="lab-form">
      <div class="two"><label>Name <input name="name" value="${esc(f.name)}"></label><label>On object type ${sel('type', types.map((x) => ({ v: apiName(x.name), l: x.name })), apiName(t.name))}</label></div>
      <fieldset><legend>Rule: modify a property</legend><div class="two"><label>Property ${sel('prop', t.props.map((p) => p.api), f.prop)}</label><label>Set to <input name="value" value="${esc(f.value)}"></label></div></fieldset>
      <fieldset><legend>Parameter the user fills in</legend><div class="two"><label>Name <input name="pname" value="${esc(f.pname)}"></label><label><input type="checkbox" name="preq" ${f.preq ? 'checked' : ''}> required</label></div></fieldset>
      <fieldset><legend>Submission criteria</legend><label>Only when ${sel('cprop', t.props.map((p) => p.api), cprop)} is one of:</label><div class="chips">${vals(cprop).map((v) => `<label class="chk"><input type="checkbox" name="al:${esc(v)}" ${f.allowed.includes(String(v)) ? 'checked' : ''}> ${esc(v)}</label>`).join('') || '<span class="muted small">no values</span>'}</div></fieldset>
      <fieldset><legend>Permissions and side effects</legend><div class="two"><label>Who may run it ${sel('group', GROUPS, f.group)}</label><label><input type="checkbox" name="notify" ${f.notify ? 'checked' : ''}> notify the customer's owner</label></div></fieldset>
      <button class="btn primary">Create action</button></form>`;
  } else {
    const acts = Object.values(M.actions);
    if (!acts.length) body = '<p class="muted">Build an action first.</p>';
    else {
      const a = M.actions[f.action] || acts[0];
      const objs = objectsOf(a.type);
      body = `<div class="two"><label>Run as ${sel('user', Object.keys(USERS).map((u) => ({ v: u, l: `${u} (${USERS[u][0]})` })), M.user)}</label><label>Action ${sel('action', acts.map((x) => ({ v: apiName(x.name), l: x.name })), apiName(a.name))}</label></div>
        <p class="small muted">${esc(a.name)}: sets <code>${esc(a.rule.prop)}</code> to <code>${esc(a.rule.value)}</code>${a.criteria ? ` when <code>${esc(a.criteria.prop)}</code> is ${a.criteria.allowed.map((v) => `<code>${esc(v)}</code>`).join(' or ')}` : ''}; allowed for <strong>${esc(a.group)}</strong>.</p>
        <div class="ds-table"><table><thead><tr><th>object</th>${t.props.filter((p) => p.api === a.rule.prop || p.api === a.criteria?.prop || p.col === M.types[a.type].title).map((p) => `<th>${esc(p.api)}</th>`).join('')}<th></th></tr></thead><tbody>${objs.map((o) => `<tr><td>${esc(o.__pk)}</td>${t.props.filter((p) => p.api === a.rule.prop || p.api === a.criteria?.prop || p.col === M.types[a.type].title).map((p) => `<td>${fmt(o[p.api])}</td>`).join('')}<td><button class="btn sm primary" data-run="${esc(o.__pk)}">Run</button></td></tr>`).join('')}</tbody></table></div>
        ${ui.runFor ? `<form id="run-form" class="lab-form run"><strong>${esc(a.name)} on ${esc(ui.runFor)}</strong><label>${esc(a.param.name)}${a.param.required ? ' *' : ''} <input name="param" ${a.param.required ? 'required' : ''} autofocus></label><div class="two"><button class="btn primary">Submit</button><button type="button" class="btn" data-act="cancel-run">Cancel</button></div></form>` : ''}
        <hr><div class="s-head"><h3>Action log</h3></div>
        <div class="log">${M.log.length ? [...M.log].reverse().map((l) => `<div class="log-row ${l.status}"><span class="st">${l.status}</span><span>${esc(l.action)} · ${esc(l.pk)} · ${esc(l.by)}${l.params ? ` · ${esc(Object.values(l.params).join(', '))}` : ''}${l.msg ? `<div class="small muted">${esc(l.msg)}</div>` : ''}</span>${l.status === 'applied' && !M.edits.find((e) => e.id === l.editId)?.reverted ? `<button class="btn sm" data-revert="${l.editId}">Revert</button>` : ''}</div>`).join('') : '<p class="muted small">Nothing has run yet.</p>'}</div>`;
    }
  }
  return `<div class="s-head"><h3>Actions</h3></div><div class="seg"><button class="${f.tab === 'build' ? 'on' : ''}" data-tab="build">1 Build</button><button class="${f.tab === 'run' ? 'on' : ''}" data-tab="run">2 Run as a user</button></div>${body}
    ${Object.keys(M.actions).length && f.tab === 'build' ? `<hr><div class="list">${Object.values(M.actions).map((x) => `<div class="row"><span>⚡ ${esc(x.name)} on ${esc(M.types[x.type]?.name)}</span><button class="btn sm" data-act="delete-action" data-id="${esc(apiName(x.name))}">✕</button></div>`).join('')}</div>` : ''}`;
}

function sideExplore() {
  const types = Object.values(M.types);
  if (!types.length) return '<div class="s-head"><h3>Explore</h3></div><p class="muted">Nothing to explore yet.</p>';
  const f = ui.form || (ui.form = { type: apiOfDs('orders_web') || apiName(types[0].name), prop: '', value: '', agg: '' });
  const t = M.types[f.type] || types[0];
  let objs = objectsOf(apiName(t.name));
  if (f.prop && f.value !== '') objs = objs.filter((o) => String(o[f.prop] ?? '').toLowerCase().includes(String(f.value).toLowerCase()));
  const agg = f.agg ? objs.reduce((m, o) => { const k = String(o[f.agg] ?? 'null'); m[k] = (m[k] || 0) + 1; return m; }, {}) : null;
  const mermaid = exportMermaid();
  return `<div class="s-head"><h3>Object Explorer</h3></div>
    <form id="explore-form" class="lab-form">
      <label>Object type ${sel('type', types.map((x) => ({ v: apiName(x.name), l: x.name })), apiName(t.name))}</label>
      <div class="two"><label>Filter ${sel('prop', [{ v: '', l: '— any property —' }, ...t.props.map((p) => p.api)], f.prop)}</label><label>contains <input name="value" value="${esc(f.value)}"></label></div>
      <label>Count by ${sel('agg', [{ v: '', l: '— none —' }, ...t.props.map((p) => p.api)], f.agg)}</label>
    </form>
    <p class="small muted">${objs.length} of ${objectsOf(apiName(t.name)).length} ${esc(t.name)} objects</p>
    ${agg ? `<div class="agg">${Object.entries(agg).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="agg-row"><span>${esc(k)}</span><i style="width:${Math.round((100 * v) / objs.length)}%"></i><b>${v}</b></div>`).join('')}</div>` : ''}
    <div class="ds-table"><table><thead><tr>${t.props.slice(0, 5).map((p) => `<th>${esc(p.api)}</th>`).join('')}</tr></thead><tbody>${objs.map((o) => `<tr class="clickable" data-open="${esc(o.__pk)}">${t.props.slice(0, 5).map((p) => `<td>${fmt(o[p.api])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <hr><div class="s-head"><h3>Export</h3></div>
    <p class="small muted">Your model as a Mermaid ER diagram (paste it into any Mermaid renderer or a note). Compare with ${noteLink('ref')}.</p>
    <textarea class="export" rows="8" readonly>${esc(mermaid)}</textarea><button class="btn sm" id="copy-export">Copy</button>`;
}
function exportMermaid() {
  const lines = ['erDiagram'];
  for (const t of Object.values(M.types)) { lines.push(`  ${apiName(t.name)} {`); for (const p of t.props) lines.push(`    ${p.type} ${p.api}${p.col === t.key ? ' PK' : ''}`); lines.push('  }'); }
  const card = { 'one-to-many': '||--o{', 'many-to-one': '}o--||', 'one-to-one': '||--||', 'many-to-many': '}o--o{' };
  for (const l of M.links) lines.push(`  ${l.from} ${card[l.kind] || '--'} ${l.to} : "${l.via ? 'via ' + l.via.ds : l.fromCol}"`);
  for (const f of Object.values(M.interfaces)) for (const api of Object.keys(f.impls || {})) lines.push(`  ${api} ||..|| ${apiName(f.name)} : implements`);
  return lines.join('\n');
}

// ----- events -----
function bindSide() {
  const side = $('#lab-side');
  side.querySelectorAll('[data-act="unselect"], [data-act="cancel"]').forEach((b) => b.addEventListener('click', () => { ui.selected = null; ui.form = null; renderCanvas(); renderSide(); }));
  side.querySelectorAll('[data-act="delete-type"]').forEach((b) => b.addEventListener('click', () => {
    const api = b.dataset.id;
    delete M.types[api]; M.links = M.links.filter((l) => l.from !== api && l.to !== api);
    for (const f of Object.values(M.interfaces)) delete f.impls?.[api];
    for (const [k, a] of Object.entries(M.actions)) if (a.type === api) delete M.actions[k];
    ui.selected = null; ui.hop = null; save(); renderAll();
  }));
  side.querySelectorAll('[data-act="delete-link"]').forEach((b) => b.addEventListener('click', () => { M.links = M.links.filter((l) => String(l.id) !== b.dataset.id); save(); renderAll(); }));
  side.querySelectorAll('[data-act="delete-iface"]').forEach((b) => b.addEventListener('click', () => { delete M.interfaces[b.dataset.id]; save(); renderAll(); }));
  side.querySelectorAll('[data-act="delete-action"]').forEach((b) => b.addEventListener('click', () => { delete M.actions[b.dataset.id]; save(); renderAll(); }));
  side.querySelectorAll('.ds-list .ds').forEach((b) => b.addEventListener('click', () => {
    const ds = b.dataset.ds, d = DATASETS[ds];
    const existing = typeFromDs(ds);
    if (existing) { ui.selected = apiName(existing.name); renderCanvas(); renderSide(); return; }
    const key = d.columns.find((c) => keyCheck(d, c).ok) || d.columns[0];
    ui.form = { ds, name: '', key, title: d.columns.find((c) => /name|title/.test(c)) || key, props: Object.fromEntries(d.columns.map((c) => [c, { type: guessType(d.rows.map((r) => r[d.columns.indexOf(c)])) }])) };
    renderSide();
    $('#lab-side input[name="name"]')?.focus();
  }));
  // type form: live updates
  const tf = $('#type-form');
  if (tf) {
    const read = () => {
      const fd = new FormData(tf);
      ui.form.name = fd.get('name') || ''; ui.form.key = fd.get('key'); ui.form.title = fd.get('title');
      const props = {};
      for (const c of DATASETS[ui.form.ds].columns) if (fd.get('p:' + c)) props[c] = { type: fd.get('t:' + c) };
      ui.form.props = props;
      if (ui.form.key !== '__composite' && !keyCheck(DATASETS[ui.form.ds], ui.form.key).ok) M.seen.badKey = true;
    };
    tf.addEventListener('input', (e) => { read(); if (e.target.name !== 'name') { renderSide(); } else { const adv = nameAdvice(ui.form.name); const box = tf.querySelector('.advice'); box.className = `advice ${adv.ok ? (adv.warn ? 'warn' : 'ok') : 'bad'}`; box.textContent = adv.ok ? (adv.warn || `API name will be ${apiName(ui.form.name)}. Plural: ${ui.form.name}s.`) : adv.msg; tf.querySelector('button.primary').disabled = !adv.ok; } });
    // Text inputs fire `change` on blur, which happens between mousedown and mouseup on the Create
    // button; re-rendering then would swallow the click. Only selects and checkboxes re-render.
    tf.addEventListener('change', (e) => { read(); if (e.target.tagName === 'INPUT' && e.target.type === 'text') return; renderSide(); renderMission(); });
    tf.addEventListener('submit', (e) => {
      e.preventDefault(); read();
      const f = ui.form, d = DATASETS[f.ds];
      if (!nameAdvice(f.name).ok) return;
      const api = apiName(f.name);
      if (M.types[api]) { ctx.toast(`${f.name} already exists.`); return; }
      let props = d.columns.filter((c) => f.props[c]).map((c) => ({ col: c, api: propApiName(c), type: f.props[c].type }));
      let key = f.key;
      if (key === '__composite') { DATASETS.order_lines.columns.includes('line_id') || addCompositeKey(); key = 'line_id'; props.unshift({ col: 'line_id', api: 'lineId', type: 'String' }); }
      if (!props.some((p) => p.col === key)) props.unshift({ col: key, api: propApiName(key), type: guessType(d.rows.map((r) => r[d.columns.indexOf(key)])) });
      M.types[api] = { name: f.name, plural: f.name + 's', ds: f.ds, key, title: f.title, props, created: Date.now() };
      save(); ui.form = null; ui.selected = null;
      renderAll();
      flyRows(api, objectsOf(api).length);
      ctx.toast(`${f.name}: ${objectsOf(api).length} objects indexed from ${f.ds}.`);
    });
  }
  // link form
  const lf = $('#link-form');
  if (lf) {
    lf.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => { ui.form.mode = b.dataset.mode; if (ui.form.mode === 'via' && !ui.form.via) ui.form.via = 'order_lines'; renderSide(); }));
    lf.addEventListener('change', () => { const fd = new FormData(lf); for (const k of ['from', 'to', 'fromCol', 'toCol', 'via', 'viaFrom', 'viaTo']) if (fd.has(k)) ui.form[k] = fd.get(k); renderSide(); });
    lf.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = ui.form, ft = M.types[f.from], tt = M.types[f.to];
      if (f.from === f.to) { ctx.toast('A self-link is possible in Foundry, but pick two different types here.'); return; }
      if (hasLink(f.from, f.to)) { ctx.toast('Those two types are already linked.'); return; }
      let link;
      if (f.mode === 'via') {
        const jd = DATASETS[f.via]; if (!jd) return;
        link = { id: Date.now(), from: f.from, to: f.to, fromCol: ft.key, toCol: tt.key, via: { ds: f.via, fromCol: f.viaFrom, toCol: f.viaTo }, kind: 'many-to-many' };
      } else {
        const c = cardinality(DATASETS[ft.ds], f.fromCol, DATASETS[tt.ds], f.toCol);
        if (DATASETS[ft.ds].rows.length - c.unmatched === 0) { ctx.toast('No matching values: that link would connect nothing.'); return; }
        if (c.kind === 'many-to-many') { ctx.toast('Many-to-many needs a join table. Switch to "through a join table".'); return; }
        link = { id: Date.now(), from: f.from, to: f.to, fromCol: f.fromCol, toCol: f.toCol, kind: c.kind };
      }
      M.links.push(link); save(); renderAll();
    });
  }
  // search around
  side.querySelectorAll('select[name="sa-type"]').forEach((s) => s.addEventListener('change', () => { ui.hop = { type: s.value, pk: objectsOf(s.value)[0]?.__pk, path: [] }; renderSide(); }));
  side.querySelectorAll('select[name="sa-pk"]').forEach((s) => s.addEventListener('change', () => { ui.hop.pk = s.value; ui.hop.path = []; renderSide(); }));
  side.querySelectorAll('.hit').forEach((b) => b.addEventListener('click', () => { const cur = objectsOf(ui.hop.type).find((x) => x.__pk === ui.hop.pk); ui.hop.path.push(titleOf(cur)); ui.hop.type = b.dataset.hopType; ui.hop.pk = b.dataset.hopPk; renderSide(); }));
  // interfaces
  side.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { ui.form.tab = b.dataset.tab; ui.runFor = null; renderSide(); }));
  const iff = $('#iface-form');
  if (iff) {
    const read = () => { const fd = new FormData(iff); ui.form.name = fd.get('name'); ui.form.props = ui.form.props.map((p, i) => ({ name: fd.get('pn' + i), type: fd.get('pt' + i), required: !!fd.get('pr' + i) })); };
    iff.addEventListener('change', read); iff.addEventListener('input', read);
    $('#iface-add').addEventListener('click', () => { read(); ui.form.props.push({ name: '', type: 'String', required: false }); renderSide(); });
    iff.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { read(); ui.form.props.splice(Number(b.dataset.rm), 1); renderSide(); }));
    iff.addEventListener('submit', (e) => { e.preventDefault(); read(); const name = (ui.form.name || '').trim(); if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) { ctx.toast('Interface names are PascalCase, like Trackable.'); return; } const props = ui.form.props.filter((p) => p.name.trim()); if (!props.length) { ctx.toast('Give the interface at least one property.'); return; } M.interfaces[name] = { name, props, impls: {}, pos: M.interfaces[name]?.pos }; save(); ui.form.tab = 'impl'; ui.form.iface = name; renderAll(); });
  }
  const imf = $('#impl-form');
  if (imf) {
    const read = () => { const fd = new FormData(imf); ui.form.iface = fd.get('iface'); if (ui.form.type !== fd.get('type')) ui.form.map = {}; ui.form.type = fd.get('type'); const map = {}; for (const [k, v] of fd.entries()) if (k.startsWith('m:') && v) map[k.slice(2)] = v; ui.form.map = map; };
    imf.addEventListener('change', () => { read(); renderSide(); });
    imf.addEventListener('submit', (e) => {
      e.preventDefault(); read();
      if (e.submitter?.dataset.fail) { M.seen.badImpl = true; save(); ctx.toast("Refused: a required interface property has nothing to map to. That's the contract doing its job."); renderMission(); return; }
      const iface = M.interfaces[ui.form.iface]; iface.impls = iface.impls || {}; iface.impls[ui.form.type] = { map: ui.form.map }; save(); ui.form.tab = 'view'; renderAll();
    });
  }
  // actions
  const af = $('#action-form');
  if (af) {
    const read = () => { const fd = new FormData(af); const f = ui.form; f.name = fd.get('name'); f.type = fd.get('type'); f.prop = fd.get('prop'); f.value = fd.get('value'); f.pname = fd.get('pname'); f.preq = !!fd.get('preq'); f.cprop = fd.get('cprop'); f.allowed = [...fd.keys()].filter((k) => k.startsWith('al:')).map((k) => k.slice(3)); f.group = fd.get('group'); f.notify = !!fd.get('notify'); };
    af.addEventListener('change', (e) => { read(); if (['type', 'cprop'].includes(e.target.name)) renderSide(); });
    af.addEventListener('submit', (e) => { e.preventDefault(); read(); const f = ui.form; if (!f.name.trim()) return; M.actions[apiName(f.name)] = { name: f.name.trim(), type: f.type, rule: { prop: f.prop, value: f.value }, param: { name: f.pname || 'note', required: f.preq }, criteria: f.allowed.length ? { prop: f.cprop, allowed: f.allowed } : null, group: f.group, notify: f.notify }; save(); ui.form.tab = 'run'; ui.form.action = apiName(f.name); renderAll(); });
  }
  side.querySelectorAll('select[name="user"]').forEach((s) => s.addEventListener('change', () => { M.user = s.value; save(); renderSide(); }));
  side.querySelectorAll('select[name="action"]').forEach((s) => s.addEventListener('change', () => { ui.form.action = s.value; ui.runFor = null; renderSide(); }));
  side.querySelectorAll('[data-run]').forEach((b) => b.addEventListener('click', () => { ui.runFor = b.dataset.run; renderSide(); $('#run-form input')?.focus(); }));
  side.querySelectorAll('[data-act="cancel-run"]').forEach((b) => b.addEventListener('click', () => { ui.runFor = null; renderSide(); }));
  const rf = $('#run-form');
  if (rf) rf.addEventListener('submit', (e) => { e.preventDefault(); runAction(M.actions[ui.form.action] || Object.values(M.actions)[0], ui.runFor, new FormData(rf).get('param')); });
  side.querySelectorAll('[data-revert]').forEach((b) => b.addEventListener('click', () => {
    const ed = M.edits.find((x) => x.id === Number(b.dataset.revert)); if (!ed || ed.reverted) return;
    ed.reverted = true;
    M.log.push({ id: Date.now(), action: 'Revert', pk: ed.pk, by: M.user, at: Date.now(), status: 'reverted', msg: `${ed.prop}: ${ed.after} → ${ed.before}` });
    save(); renderAll(); ctx.toast('Reverted. The original edit stays in history; a new edit undoes it.');
  }));
  // explore
  const ef = $('#explore-form');
  if (ef) {
    ef.addEventListener('input', () => { const fd = new FormData(ef); ui.form = { type: fd.get('type'), prop: fd.get('prop'), value: fd.get('value'), agg: fd.get('agg') }; if (ui.form.prop === 'status' && String(ui.form.value).toLowerCase() === 'open') M.seen.filteredOpen = true; if (ui.form.agg === 'status') M.seen.aggStatus = true; save(); renderSide(); renderMission(); $('#explore-form input[name="value"]')?.focus(); });
    $('#copy-export')?.addEventListener('click', async () => { try { await navigator.clipboard.writeText(exportMermaid()); } catch {} M.seen.exported = true; save(); renderMission(); ctx.toast('Copied. Try it in a note or any Mermaid renderer.'); });
    side.querySelectorAll('tr.clickable').forEach((tr) => tr.addEventListener('click', () => { ui.hop = { type: ui.form.type, pk: tr.dataset.open, path: [] }; station = 'links'; history.replaceState(null, '', '#/lab?s=links'); ui.form = null; renderAll(); ctx.toast('Opened in Search around.'); }));
  }
}

function addCompositeKey() {
  const d = DATASETS.order_lines;
  d.columns.push('line_id');
  d.rows.forEach((r) => r.push(`${r[0]}-${r[1]}`));
}
// The composite column must exist whenever a saved model uses it.
function ensureComposite() { if (Object.values(M.types).some((t) => t.ds === 'order_lines' && t.key === 'line_id') && !DATASETS.order_lines.columns.includes('line_id')) addCompositeKey(); }

function runAction(a, pk, param) {
  const user = M.user, groups = USERS[user] || [];
  const o = objectsOf(a.type).find((x) => x.__pk === pk);
  const entry = { id: Date.now(), action: a.name, pk, by: user, at: Date.now(), params: { [a.param.name]: param } };
  if (!groups.includes(a.group)) { entry.status = 'denied'; entry.msg = `${user} is not in ${a.group}. The button would not even show.`; }
  else if (a.param.required && !String(param || '').trim()) { entry.status = 'blocked'; entry.msg = `${a.param.name} is required.`; }
  else if (a.criteria && !a.criteria.allowed.includes(String(o[a.criteria.prop]))) { entry.status = 'blocked'; entry.msg = `Submission criteria failed: ${a.criteria.prop} is "${o[a.criteria.prop]}", must be ${a.criteria.allowed.join(' or ')}.`; }
  else {
    const before = o[a.rule.prop];
    const edit = { id: entry.id, type: a.type, pk, prop: a.rule.prop, before, after: a.rule.value, actionApi: apiName(a.name), by: user, at: entry.at, reverted: false };
    M.edits.push(edit); entry.status = 'applied'; entry.editId = edit.id; entry.msg = `${a.rule.prop}: ${before} → ${a.rule.value}${a.notify ? ' · notification sent' : ''}`;
  }
  M.log.push(entry); ui.runFor = null; save(); renderAll();
  ctx.toast(entry.status === 'applied' ? `Applied. ${entry.msg}` : `${entry.status}: ${entry.msg}`);
}

// A small animation: rows fly from the panel into the new card.
function flyRows(api, n) {
  const card = $(`#lab-nodes .node[data-id="${CSS.escape(api)}"]`);
  const canvas = $('#lab-canvas');
  if (!card || !canvas) return;
  const r = card.getBoundingClientRect(), c = canvas.getBoundingClientRect();
  for (let i = 0; i < Math.min(n, 12); i++) {
    const dot = document.createElement('div');
    dot.className = 'fly';
    dot.style.left = c.width - 10 + 'px'; dot.style.top = 40 + i * 14 + 'px';
    canvas.appendChild(dot);
    requestAnimationFrame(() => { dot.style.transitionDelay = i * 40 + 'ms'; dot.style.left = r.left - c.left + r.width / 2 + 'px'; dot.style.top = r.top - c.top + r.height / 2 + 'px'; dot.style.opacity = '0'; });
    setTimeout(() => dot.remove(), 900 + i * 40);
  }
}
