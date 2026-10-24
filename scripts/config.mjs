// Which note folders from Learn/ the app includes, in display order.
// `dir` is the folder path inside Learn/ (mirrored under content/ by `npm run sync`), so links
// between folders keep working. Only the Capabilities areas are included; the Learn Tracks
// (course notes) are deliberately left out, and links to them say so.
const area = (id, dir, title, tagline, selfCheck, extra = {}) => ({
  id,
  dir: `Capabilities/${dir}`,
  title,
  tagline,
  special: { 'MAP.md': 'map', 'GLOSSARY.md': 'glossary' },
  skip: ['MIGRATION.md', 'QUALITY-REVIEW.md'],
  skipDirs: ['_templates'],
  selfCheck,
  ...extra,
});

export const collections = [
  area('ontology', 'Ontology', 'Ontology', 'The Palantir Foundry Ontology: a structured course and working reference', '18-practice/03-review-questions-by-module.md'),
  area('aip', 'AIP', 'AIP', 'Palantir AIP: the AI Platform products, from models and Logic to Evals, chatbots and end-user apps', '11-practice/01-review-questions-by-module.md'),
  area('apps', 'Apps', 'Apps', 'Use case development: Workshop, Slate, OSDK React apps, Pilot, Automate and the workflow tools around them', '12-practice/01-review-questions-by-module.md'),
  area('devtools', 'DevTools', 'DevTools', 'The developer toolchain and product delivery: Ontology SDK, Developer Console and APIs, compute modules, MCP, development environments, branching, FoundryTS and Marketplace', '10-practice/01-review-questions-by-module.md'),
  area('security', 'Security', 'Security', 'Security and governance: organizations, projects and roles, markings and mandatory controls, discretionary controls, securing data and applications, tokens, approvals, Cipher, Compass and privacy', '12-practice/01-review-questions-by-module.md'),
  area('observability', 'Observability', 'Observability', 'Observability: Data Health monitoring views and health checks, alert routing, and the Ontology and AIP observability tools', '05-practice/01-review-questions-by-module.md'),
  area('model-integration', 'ModelIntegration', 'Model integration', 'Model connectivity and development: models and adapters, training in Foundry, bringing models in, experiments and evaluations, objectives and deployments, language models', null),
];

// Folder in Learn/ to sync from. Override with LEARN_DIR=/path/to/Learn.
export const learnDirDefault = '../Learn';
