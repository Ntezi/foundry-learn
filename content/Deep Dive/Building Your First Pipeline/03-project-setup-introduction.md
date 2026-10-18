# 03 — Introduction

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Setting up your Project and Folder | 03/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1873619) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Key concept
**[Course]** Every Foundry resource lives in a **Project**. For production, the docs recommend a Project per workflow stage ([recommended Project structure](https://www.palantir.com/docs/foundry/building-pipelines/recommended-project-structure/)). For training, use one learning Project with a folder per course, and a `<username>` naming convention so your resources don't clash with other learners'.

## Why it matters for pipelines in particular
**[Explanation]** Project boundaries become permission boundaries. A common production pattern (see the docs link above) splits Projects into data source Projects, transformation (pipeline) Projects, and Ontology/workflow Projects. Consumers can then be given access to *clean outputs* without edit rights on raw data or pipeline logic. When you later segment pipelines ([lesson 22](22-segmenting-and-materializing-outputs.md)), the materialized outputs are natural points to cross Project boundaries.

## Review checklist
- [ ] I can explain why a production pipeline might live in a different Project from its raw inputs.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Create a Foundry Learning Project](04-create-learning-project.md)
