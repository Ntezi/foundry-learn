// Which note folders from Learn/ the app includes, in display order.
// `dir` is the folder name inside content/ (synced from Learn/ by `npm run sync`).
// Adding a collection later (Courses, AIP, …) is a matter of adding a row here
// and running `npm run sync && npm run build`.
export const collections = [
  {
    id: 'ontology',
    dir: 'Ontology',
    title: 'Ontology',
    tagline: 'The Palantir Foundry Ontology: a structured course and working reference',
    // Root-level files that get a special, interactive page instead of plain rendering.
    special: { 'MAP.md': 'map', 'GLOSSARY.md': 'glossary' },
    // Root-level files to leave out of the app entirely.
    skip: ['MIGRATION.md', 'QUALITY-REVIEW.md'],
    // Folders inside the collection to leave out.
    skipDirs: ['_templates'],
    // The note that holds the self-check questions, if any.
    selfCheck: '18-practice/03-review-questions-by-module.md',
  },
];

// Folder in Learn/ to sync from. Override with LEARN_DIR=/path/to/Learn.
export const learnDirDefault = '../Learn';
