// Turns content/<Collection>/**/*.md into dist/data/*.json for the app.
//
// Output:
//   dist/data/index.json              collections → modules → notes (navigation, statuses, learning path)
//   dist/data/notes/<noteId>.json     one file per note: rendered HTML, table of contents, sources, labels
//   dist/data/search.json             one record per section, for client-side search
//   dist/data/<collection>.map.json       parsed MAP.md (concepts, tasks, design questions)
//   dist/data/<collection>.glossary.json  parsed GLOSSARY.md
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, resolve, dirname, posix } from 'node:path';
import MarkdownIt from 'markdown-it';
import { collections } from './config.mjs';

const root = resolve(import.meta.dirname, '..');
const contentDir = join(root, 'content');
const outDir = join(root, 'dist', 'data');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'notes'), { recursive: true });

// ---------- helpers ----------

// GitHub-style heading slugs, so the anchors the notes already use keep working.
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/ /g, '-');
}

function stripMd(s) {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

function words(s) {
  return (s.match(/\S+/g) || []).length;
}

const LABELS = ['Docs', 'Concept', 'Analogy', 'Explanation', 'Recommendation', 'Example', 'Observed'];

// ---------- collect files ----------

// noteId: "<collection>/<relative path without .md>", e.g. "ontology/04-object-types/01-object-types"
// Route for a module README is the module itself: "ontology/04-object-types".
// Route for the collection README is the collection: "ontology".
const notes = new Map(); // noteId → { id, collection, file, rel, kind, module, ... }

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function noteIdFor(collection, rel) {
  // rel is posix path inside the collection dir
  if (rel === 'README.md') return collection.id;
  if (rel.endsWith('/README.md')) return `${collection.id}/${rel.slice(0, -'/README.md'.length)}`;
  return `${collection.id}/${rel.replace(/\.md$/, '')}`;
}

for (const c of collections) {
  const base = join(contentDir, c.dir);
  if (!existsSync(base)) {
    console.warn(`collection ${c.id}: content/${c.dir} missing (run npm run sync)`);
    continue;
  }
  for (const file of walk(base)) {
    const rel = posix.normalize(file.slice(base.length + 1).split('\\').join('/'));
    const top = rel.split('/')[0];
    if ((c.skipDirs || []).includes(top)) continue;
    if (!rel.includes('/') && (c.skip || []).includes(rel)) continue;
    const id = noteIdFor(c, rel);
    const isModuleReadme = rel.endsWith('/README.md') && rel.split('/').length === 2;
    const special = !rel.includes('/') ? c.special?.[rel] : undefined;
    notes.set(id, {
      id,
      collection: c.id,
      file,
      rel,
      kind: rel === 'README.md' ? 'collection' : isModuleReadme ? 'module' : rel.includes('/') ? 'note' : 'page',
      module: rel.includes('/') ? rel.split('/')[0] : null,
      special: special || null,
      src: readFileSync(file, 'utf8'),
    });
  }
}

// ---------- link resolution ----------

const missingLinks = new Map(); // target → [from]

function resolveLink(fromNote, href) {
  if (/^(https?:|mailto:)/i.test(href)) return { kind: 'external', href };
  if (href.startsWith('#')) return { kind: 'anchor', href };
  const [pathPart, anchor] = href.split('#');
  const decoded = decodeURIComponent(pathPart);
  const c = collections.find((x) => x.id === fromNote.collection);
  // absolute path of the target inside content/
  const fromDir = dirname(join(contentDir, c.dir, fromNote.rel));
  const abs = resolve(fromDir, decoded);
  const relToContent = abs.slice(contentDir.length + 1).split('\\').join('/');
  // which collection does it fall in?
  for (const cc of collections) {
    if (relToContent === cc.dir || relToContent.startsWith(cc.dir + '/')) {
      const rel = relToContent === cc.dir ? 'README.md' : relToContent.slice(cc.dir.length + 1);
      const relMd = rel.endsWith('.md') ? rel : rel.replace(/\/?$/, '/README.md');
      const id = noteIdFor(cc, relMd);
      if (notes.has(id)) return { kind: 'note', id, anchor: anchor || null };
      break;
    }
  }
  // A Learn note that is not in the app (yet): Courses, Speedrun, AIP, …
  const label = relToContent.replace(/\.md$/, '').replace(/^\.\.\//, '');
  const list = missingLinks.get(label) || [];
  list.push(fromNote.id);
  missingLinks.set(label, list);
  return { kind: 'missing', label, anchor: anchor || null };
}

// ---------- markdown renderer ----------

const md = new MarkdownIt({ html: true, linkify: false, typographer: false });

// Fenced code: mermaid → <pre class="mermaid"> with the source kept for re-rendering on theme change.
const defaultFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const t = tokens[idx];
  const lang = (t.info || '').trim().split(/\s+/)[0];
  if (lang === 'mermaid') {
    env.mermaid = (env.mermaid || 0) + 1;
    return `<div class="diagram" data-diagram="${md.utils.escapeHtml(t.content)}"><pre class="mermaid-src">${md.utils.escapeHtml(t.content)}</pre></div>\n`;
  }
  return defaultFence(tokens, idx, options, env, self);
};

// Headings: GitHub-style ids, deduplicated; collect a table of contents.
md.core.ruler.push('heading_ids', (state) => {
  const seen = new Map();
  const toc = [];
  for (let i = 0; i < state.tokens.length; i++) {
    const t = state.tokens[i];
    if (t.type !== 'heading_open') continue;
    const inline = state.tokens[i + 1];
    const text = inline.children
      .filter((c) => c.type === 'text' || c.type === 'code_inline')
      .map((c) => c.content)
      .join('');
    let id = slugify(text);
    if (!id) id = 'section';
    if (seen.has(id)) {
      const n = seen.get(id) + 1;
      seen.set(id, n);
      id = `${id}-${n}`;
    } else seen.set(id, 0);
    t.attrSet('id', id);
    const level = Number(t.tag.slice(1));
    if (level >= 2 && level <= 3) toc.push({ level, id, text: stripMd(text) });
    // anchor link
    inline.children.push(
      Object.assign(new state.Token('html_inline', '', 0), { content: ` <a class="hlink" href="#${id}" aria-label="Link to section">#</a>` }),
    );
  }
  state.env.toc = toc;
});

// Links: rewrite to app routes.
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const t = tokens[idx];
  const href = t.attrGet('href') || '';
  const r = resolveLink(env.note, href);
  env.links = env.links || [];
  env.links.push(r);
  if (r.kind === 'external') {
    t.attrSet('target', '_blank');
    t.attrSet('rel', 'noopener');
    t.attrJoin('class', 'ext');
  } else if (r.kind === 'anchor') {
    t.attrSet('href', r.href);
    t.attrJoin('class', 'in-page');
  } else if (r.kind === 'note') {
    t.attrSet('href', `#/${r.id}${r.anchor ? '#' + r.anchor : ''}`);
    t.attrJoin('class', 'to-note');
    t.attrSet('data-note', r.id);
  } else {
    t.attrSet('href', '#');
    t.attrJoin('class', 'missing-link');
    t.attrSet('title', `Learn note not in the app yet: ${r.label}`);
    t.attrSet('data-missing', r.label);
  }
  return self.renderToken(tokens, idx, options);
};

// Tables: wrap for horizontal scrolling on small screens.
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
md.renderer.rules.table_close = () => '</table></div>';

// Task lists: "- [ ] text" → checkbox that the app persists.
md.core.ruler.push('task_lists', (state) => {
  const toks = state.tokens;
  let n = 0;
  for (let i = 0; i < toks.length; i++) {
    if (toks[i].type !== 'list_item_open') continue;
    const inline = toks[i + 2];
    if (!inline || inline.type !== 'inline') continue;
    const m = inline.content.match(/^\[([ xX])\]\s+/);
    if (!m) continue;
    const idx = n++;
    inline.content = inline.content.slice(m[0].length);
    if (inline.children?.[0]?.type === 'text') inline.children[0].content = inline.children[0].content.slice(m[0].length);
    toks[i].attrJoin('class', 'task');
    const cb = new state.Token('html_inline', '', 0);
    cb.content = `<input type="checkbox" class="task-box" data-task="${idx}" ${m[1] !== ' ' ? 'checked' : ''}> `;
    inline.children.unshift(cb);
  }
  state.env.tasks = n;
});

// Labels **[Docs]** → <span class="lbl lbl-docs">
function labelize(html, counts) {
  return html.replace(/<strong>\[(Docs|Concept|Analogy|Explanation|Recommendation|Example|Observed)\]<\/strong>/g, (_, l) => {
    counts[l] = (counts[l] || 0) + 1;
    return `<span class="lbl lbl-${l.toLowerCase()}" data-label="${l}">${l}</span>`;
  });
}

// ---------- parse each note ----------

function parseNote(n) {
  let src = n.src.replace(/\r\n/g, '\n');
  // Title
  const tm = src.match(/^#\s+(.+)$/m);
  const rawTitle = tm ? tm[1].trim() : n.rel;
  if (tm) src = src.replace(tm[0], '');
  const numM = rawTitle.match(/^(\d{2})\s+[—–-]\s+(.+)$/);
  const number = numM ? numM[1] : null;
  const title = stripMd(numM ? numM[2] : rawTitle);

  // Sources line: *Sources: [a](u) · [b](u) · checked Month D, YYYY · Status*
  let sources = [], checked = null, status = null, sourcesNote = null;
  const sm = src.match(/^\*Sources:\s*(.+?)\*\s*$/m);
  if (sm) {
    src = src.replace(sm[0], '');
    const parts = sm[1].split(/\s+·\s+/);
    for (const p of parts) {
      const lm = p.match(/\[([^\]]+)\]\(([^)]+)\)(.*)/);
      if (lm) sources.push({ title: lm[1], url: lm[2], note: lm[3].trim() || null });
      else if (/^checked\s/i.test(p)) checked = p.replace(/^checked\s+/i, '');
      else if (/^(written|updated|compiled)\s/i.test(p)) sourcesNote = (sourcesNote ? sourcesNote + '; ' : '') + p;
      else if (/^(Ready for Review|In Progress|Not Started|Blocked|Draft|not yet attempted)/i.test(p)) status = p;
      else sourcesNote = (sourcesNote ? sourcesNote + '; ' : '') + p;
    }
  }

  // Module README metadata table: | Purpose | … |, | Status | … |, | Prerequisites | … |
  const meta = {};
  if (n.kind === 'module' || n.kind === 'collection') {
    for (const key of ['Purpose', 'Status', 'Prerequisites', 'Structure', 'Next', 'Why it matters']) {
      const mm = src.match(new RegExp(`^\\|\\s*${key}\\s*\\|\\s*(.+?)\\s*\\|\\s*$`, 'm'));
      if (mm) meta[key] = mm[1];
    }
    if (meta.Status) status = meta.Status;
  }

  // Strip the trailing navigation line (← … · Ontology home · …); the app supplies its own.
  src = src.replace(/\n---\s*\n(?:\[|←)[^\n]*\s*$/, '\n');

  const env = { note: n };
  const html0 = md.render(src, env);
  const counts = {};
  const html = labelize(html0, counts);

  // Section records for search
  const sections = [];
  {
    const tokens = md.parse(src, { note: n });
    let current = { heading: '', id: '', text: [] };
    const flush = () => {
      const text = current.text.join(' ').replace(/\s+/g, ' ').trim();
      if (text || current.heading) sections.push({ heading: current.heading, id: current.id, text });
    };
    let lastHeadingId = '';
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type === 'heading_open') {
        flush();
        const inline = tokens[i + 1];
        const text = stripMd(inline.content);
        lastHeadingId = t.attrGet('id') || slugify(text);
        current = { heading: text, id: lastHeadingId, text: [] };
        i += 2;
        continue;
      }
      if (t.type === 'inline') current.text.push(stripMd(t.content));
      else if (t.type === 'fence' && (t.info || '').trim() !== 'mermaid') current.text.push(t.content);
    }
    flush();
  }

  const plain = sections.map((s) => s.text).join(' ');
  const wc = words(plain);
  const openQuestions = [...src.matchAll(/Open question\*\*\s*\[(RQ-\d+)\]/g)].map((m) => m[1]);

  return {
    id: n.id,
    collection: n.collection,
    kind: n.kind,
    special: n.special,
    module: n.module,
    rel: n.rel,
    number,
    title,
    status,
    checked,
    sourcesNote,
    sources,
    meta,
    html,
    toc: env.toc || [],
    labels: counts,
    diagrams: env.mermaid || 0,
    tasks: env.tasks || 0,
    words: wc,
    minutes: Math.max(1, Math.round(wc / 220)),
    openQuestions,
    links: (env.links || []).filter((l) => l.kind === 'note').map((l) => l.id),
    sections,
  };
}

const parsed = new Map();
for (const n of notes.values()) parsed.set(n.id, parseNote(n));

// ---------- navigation index ----------

function moduleTitleFromReadme(p) {
  return p.title;
}

const index = { builtAt: new Date().toISOString(), collections: [] };
const searchDocs = [];

for (const c of collections) {
  const col = parsed.get(c.id);
  if (!col) continue;
  // modules = numbered folders, in folder order
  const moduleDirs = [...new Set([...parsed.values()].filter((p) => p.collection === c.id && p.module).map((p) => p.module))].sort();
  const modules = [];
  for (const dir of moduleDirs) {
    const readme = parsed.get(`${c.id}/${dir}`);
    const moduleNotes = [...parsed.values()]
      .filter((p) => p.collection === c.id && p.module === dir && p.kind === 'note')
      .sort((a, b) => a.rel.localeCompare(b.rel));
    const number = dir.match(/^(\d+)/)?.[1] || null;
    modules.push({
      id: `${c.id}/${dir}`,
      dir,
      number,
      title: readme ? moduleTitleFromReadme(readme) : dir,
      purpose: readme?.meta.Purpose ? stripMd(readme.meta.Purpose) : null,
      status: readme?.status || null,
      prerequisites: readme?.meta.Prerequisites || null,
      hasReadme: !!readme,
      words: moduleNotes.reduce((s, p) => s + p.words, 0),
      minutes: moduleNotes.reduce((s, p) => s + p.minutes, 0),
      notes: moduleNotes.map((p) => ({ id: p.id, number: p.number, title: p.title, status: p.status, minutes: p.minutes, diagrams: p.diagrams, labels: p.labels, tasks: p.tasks })),
    });
  }
  // Root-level pages (MAP, GLOSSARY, SOURCES, …)
  const pages = [...parsed.values()]
    .filter((p) => p.collection === c.id && p.kind === 'page')
    .sort((a, b) => a.rel.localeCompare(b.rel))
    .map((p) => ({ id: p.id, title: p.title, special: p.special }));

  // Learning path: the first mermaid flowchart in the collection README, with node → module mapping.
  let learningPath = null;
  const fm = col && notes.get(c.id).src.match(/```mermaid\n(flowchart[\s\S]*?)```/);
  if (fm) {
    const graph = fm[1];
    const nodeMap = {};
    for (const m of graph.matchAll(/(\w+)\[([^\]]+)\]/g)) {
      const num = m[2].match(/^(\d{2})\b/)?.[1];
      const mod = modules.find((x) => x.number === num);
      if (mod) nodeMap[m[1]] = mod.id;
    }
    learningPath = { graph, nodeMap };
  }

  // Prev/next across the collection in reading order: module readme, then its notes.
  const order = [];
  for (const m of modules) {
    if (m.hasReadme) order.push(m.id);
    for (const n of m.notes) order.push(n.id);
  }
  order.forEach((id, i) => {
    const p = parsed.get(id);
    p.prev = i > 0 ? order[i - 1] : null;
    p.next = i < order.length - 1 ? order[i + 1] : null;
  });

  index.collections.push({
    id: c.id,
    title: c.title,
    tagline: c.tagline,
    selfCheck: c.selfCheck ? noteIdFor(c, c.selfCheck) : null,
    modules,
    pages,
    learningPath,
    totals: {
      notes: modules.reduce((s, m) => s + m.notes.length, 0),
      words: modules.reduce((s, m) => s + m.words, 0),
      minutes: modules.reduce((s, m) => s + m.minutes, 0),
    },
  });

  // Search records
  for (const p of parsed.values()) {
    if (p.collection !== c.id) continue;
    const mod = modules.find((m) => m.id === `${c.id}/${p.module}`);
    p.sections.forEach((s, i) => {
      if (!s.text && !s.heading) return;
      searchDocs.push({
        id: `${p.id}#${s.id || i}`,
        note: p.id,
        title: p.number ? `${p.number} — ${p.title}` : p.title,
        module: mod ? `${c.title} · ${mod.number} ${mod.title}` : c.title,
        heading: s.heading,
        anchor: s.id,
        text: s.text.slice(0, 4000),
      });
    });
  }

  // ----- MAP.md → finder data -----
  const mapNote = [...notes.values()].find((n) => n.collection === c.id && n.special === 'map');
  if (mapNote) {
    const map = parseMap(mapNote);
    writeFileSync(join(outDir, `${c.id}.map.json`), JSON.stringify(map));
    index.collections.at(-1).map = { concepts: map.concepts.length, tasks: map.tasks.length, questions: map.questions.length };
  }
  const glossNote = [...notes.values()].find((n) => n.collection === c.id && n.special === 'glossary');
  if (glossNote) writeFileSync(join(outDir, `${c.id}.glossary.json`), JSON.stringify(parseGlossary(glossNote)));
}

// Parse a markdown table into rows of cells (raw markdown per cell).
function tableRows(block) {
  return block
    .split('\n')
    .filter((l) => l.trim().startsWith('|'))
    .map((l) => l.trim().replace(/^\||\|$/g, '').split(/\s*\|\s*/).map((s) => s.trim()))
    .filter((cells, i) => i !== 1 || !cells.every((x) => /^:?-+:?$/.test(x)))
    .filter((cells) => !cells.every((x) => /^:?-+:?$/.test(x)));
}

// Render inline markdown for a cell, with links rewritten to app routes.
function cellHtml(note, cell) {
  const html = md.renderInline(cell, { note });
  return labelize(html, {});
}
function cellLinks(note, cell) {
  return [...cell.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => {
    const r = resolveLink(note, m[2]);
    return { text: m[1], ...(r.kind === 'note' ? { href: `#/${r.id}${r.anchor ? '#' + r.anchor : ''}` } : r.kind === 'external' ? { href: r.href, external: true } : { missing: r.label }) };
  });
}

function parseMap(n) {
  // Tables are classified by their first header cell, so a map with only an
  // "I need to…" table (AIP) parses as well as one with three sections (Ontology).
  const src = n.src;
  const concepts = [], tasks = [], questions = [];
  const blocks = src.split(/\n(?=\|)/).join('\n').match(/(?:^\|[^\n]*\n?)+/gm) || [];
  for (const block of blocks) {
    const rows = tableRows(block);
    if (rows.length < 2) continue;
    const head = stripMd(rows[0][0]).toLowerCase();
    if (/i need to/.test(head)) {
      for (const r of rows.slice(1)) tasks.push({ task: stripMd(r[0]), links: cellLinks(n, r[1] || '') });
    } else if (/question/.test(head)) {
      for (const r of rows.slice(1)) questions.push({ question: stripMd(r[0]), answer: cellHtml(n, r[1] || ''), links: cellLinks(n, r[2] || '') });
    } else if (/concept/.test(head)) {
      for (const r of rows.slice(1)) concepts.push({ concept: stripMd(r[0]), canonical: cellLinks(n, r[1] || ''), also: r[2] === '—' ? [] : cellLinks(n, r[2] || '') });
    }
  }
  const intro = src.match(/^# [^\n]+\n\n([^\n]+)/)?.[1] || '';
  return { intro: stripMd(intro), concepts, tasks, questions };
}

function parseGlossary(n) {
  const rows = tableRows(n.src).slice(1);
  const terms = rows.map((r) => ({
    term: stripMd(r[0]),
    definition: cellHtml(n, r[1] || ''),
    plain: stripMd(r[1] || ''),
    source: cellLinks(n, r[2] || '')[0] || null,
    note: cellLinks(n, r[3] || '')[0] || null,
  }));
  const intro = n.src.match(/^# [^\n]+\n\n([^\n]+)/)?.[1] || '';
  return { intro: stripMd(intro), terms };
}

// ---------- write ----------

for (const p of parsed.values()) {
  const { sections, ...rest } = p;
  writeFileSync(join(outDir, 'notes', `${p.id.replace(/\//g, '__')}.json`), JSON.stringify(rest));
}
writeFileSync(join(outDir, 'index.json'), JSON.stringify(index));
writeFileSync(join(outDir, 'search.json'), JSON.stringify(searchDocs));

const totalNotes = parsed.size;
console.log(`built ${totalNotes} pages, ${searchDocs.length} search sections`);
if (missingLinks.size) {
  const n = [...missingLinks.values()].reduce((s, l) => s + l.length, 0);
  console.log(`${n} links point at Learn notes outside the app (${missingLinks.size} distinct targets); they render as "not in the app yet"`);
}
writeFileSync(join(outDir, 'missing-links.json'), JSON.stringify([...missingLinks.entries()].map(([target, from]) => ({ target, from })), null, 1));
