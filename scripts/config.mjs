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
  {
    id: 'aip',
    dir: 'AIP',
    title: 'AIP',
    tagline: 'Palantir AIP: the AI Platform products, from models and Logic to Evals, chatbots and end-user apps',
    special: { 'MAP.md': 'map', 'GLOSSARY.md': 'glossary' },
    skip: ['MIGRATION.md', 'QUALITY-REVIEW.md'],
    skipDirs: ['_templates'],
    selfCheck: '11-practice/01-review-questions-by-module.md',
  },
  {
    id: 'apps',
    dir: 'Apps',
    title: 'Apps',
    tagline: 'Use case development: Workshop, Slate, OSDK React apps, Pilot, Automate and the workflow tools around them',
    special: { 'MAP.md': 'map', 'GLOSSARY.md': 'glossary' },
    skip: ['MIGRATION.md', 'QUALITY-REVIEW.md'],
    skipDirs: ['_templates'],
    selfCheck: null,
  },
  // Course notes referenced from the areas above. They keep their own folder structure:
  // one area per Learn folder, one module per course.
  {
    id: 'courses',
    dir: 'Courses',
    title: 'Courses',
    kind: 'courses',
    tagline: 'Notes from the Palantir Learn courses',
    only: ['Introduction to Foundry & AIP for Enterprise Organizations', 'Scoping Use Cases for Foundry & AIP'],
  },
  {
    id: 'speedrun',
    dir: 'Speedrun',
    title: 'Speedrun',
    kind: 'courses',
    tagline: 'Notes from the Palantir Learn speedruns',
    only: ['Your First End-to-End Workflow', 'Your First Ontology Function', 'Your First AIP Workflow', 'Your First Agentic AIP Workflow', 'Mining Your First Business Process'],
    skipDirs: ['course-files'],
  },
  {
    id: 'deep-dive',
    dir: 'Deep Dive',
    title: 'Deep Dive',
    kind: 'courses',
    tagline: 'Notes from the Palantir Learn deep dives',
    only: ['Creating Your First Data Connection', 'Building Your First Pipeline'],
  },
  {
    id: 'application-developer',
    dir: 'Application Developer',
    title: 'Application Developer',
    kind: 'courses',
    tagline: 'Notes from the Application Developer learning path',
    only: ['02-deep-dive-creating-your-first-ontology', '03-deep-dive-building-your-first-application'],
    pages: ['00_Overview.md', '03_Workshop.md', '04_Slate.md', '07_Exam_Guide.md'],
    moduleTitles: { '02-deep-dive-creating-your-first-ontology': 'Deep Dive: Creating Your First Ontology' },
  },
];

// Folder in Learn/ to sync from. Override with LEARN_DIR=/path/to/Learn.
export const learnDirDefault = '../Learn';
