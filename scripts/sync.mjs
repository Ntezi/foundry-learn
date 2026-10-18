// Copies the note folders listed in config.mjs from Learn/ into content/.
// Usage: npm run sync            (reads ../Learn)
//        LEARN_DIR=~/x npm run sync
import { cpSync, rmSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { collections, learnDirDefault } from './config.mjs';

const root = resolve(import.meta.dirname, '..');
const learnDir = resolve(root, process.env.LEARN_DIR || learnDirDefault);
const contentDir = join(root, 'content');

if (!existsSync(learnDir)) {
  console.error(`Learn folder not found: ${learnDir}\nSet LEARN_DIR to the path of your Learn/ folder.`);
  process.exit(1);
}
mkdirSync(contentDir, { recursive: true });

for (const c of collections) {
  const from = join(learnDir, c.dir);
  const to = join(contentDir, c.dir);
  if (!existsSync(from)) {
    console.warn(`skip ${c.dir}: not found in ${learnDir}`);
    continue;
  }
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, {
    recursive: true,
    filter: (src) => {
      const name = src.split('/').pop();
      const rel = src.slice(from.length + 1);
      if (name === '.DS_Store') return false;
      if (statSync(src).isDirectory()) {
        if ((c.skipDirs || []).includes(name)) return false;
        if (c.only && !rel.includes('/') && rel && !c.only.includes(name)) return false;
        return true;
      }
      if (c.pages && !rel.includes('/') && name !== 'README.md' && !c.pages.includes(name)) return false;
      return name.endsWith('.md');
    },
  });
  console.log(`synced ${c.dir} → content/${c.dir}`);
}
