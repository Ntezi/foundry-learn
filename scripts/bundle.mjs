// Bundles src/app.js (with Mermaid as a lazy chunk) and copies site/ into dist/.
import { build } from 'esbuild';
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
mkdirSync(dist, { recursive: true });

await build({
  entryPoints: [join(root, 'src/app.js')],
  bundle: true,
  format: 'esm',
  splitting: true,
  minify: true,
  sourcemap: false,
  target: ['es2022'],
  outdir: dist,
  chunkNames: 'chunks/[name]-[hash]',
  logLevel: 'info',
});
cpSync(join(root, 'site'), dist, { recursive: true });
writeFileSync(join(dist, '.nojekyll'), '');
console.log('bundled → dist/');
