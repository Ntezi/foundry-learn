// Verifies that every link between notes points at a page that exists and, when it has an anchor,
// at a heading that exists on that page. Run after `npm run build:data`.
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
const dir = resolve(import.meta.dirname, '..', 'dist', 'data', 'notes');
const notes = new Map();
for (const f of readdirSync(dir)) { const n = JSON.parse(readFileSync(join(dir, f), 'utf8')); notes.set(n.id, n); }
const idsIn = (html) => new Set([...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
let bad = 0, total = 0;
for (const n of notes.values()) {
  for (const m of n.html.matchAll(/href="#\/([^"#]+)(?:#([^"]+))?"/g)) {
    total++;
    const [, id, anchor] = m;
    const t = notes.get(id);
    if (!t) { console.log(`✗ ${n.id} → missing page ${id}`); bad++; continue; }
    if (anchor && !idsIn(t.html).has(anchor) && !(id.endsWith('/GLOSSARY') || id.endsWith('/MAP'))) { console.log(`✗ ${n.id} → ${id}#${anchor} (no such heading)`); bad++; }
  }
  for (const m of n.html.matchAll(/href="#([^"/][^"]*)"/g)) {
    total++;
    if (!idsIn(n.html).has(m[1])) { console.log(`✗ ${n.id} → in-page #${m[1]} (no such heading)`); bad++; }
  }
}
console.log(`${total} internal links checked, ${bad} broken`);
process.exit(bad ? 1 : 0);
