# 11 — Ontology design

A deep compilation of Palantir's four **Ontology design** documentation pages. This module is the **design capstone** of the Ontology notes: it is the "why" behind every modeling choice, and it reads best after the building blocks in modules 04–10. Until those notes exist, it also works on its own, exactly as it did in the former `Ontology Design/` folder ([MIGRATION](../MIGRATION.md)).

The course design review and the practice material from the same compilation now live in [17 — Case studies](../17-case-studies/README.md) and [18 — Practice](../18-practice/README.md). Sources and corrections are in the central [SOURCES](../SOURCES.md).

| | |
|---|---|
| Sources | [Best practices](https://www.palantir.com/docs/foundry/ontology/ontology-best-practices/) · [Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) · [Anti-patterns](https://www.palantir.com/docs/foundry/ontology/ontology-anti-patterns/) · [Validation](https://www.palantir.com/docs/foundry/ontology/ontology-design-validation/) |
| Checked | September 25, 2026 (all four pages read in full, including the Validation page's expandable example sets) |
| Notes status | Ready for Review |
| Practice | Not Started ([Practice 01](../18-practice/01-design-exercises.md), [Practice 02](../18-practice/02-validation-drill-kit.md)) |
| Why it matters | This is the "why" behind every Ontology step in our courses. It supports the Ontology parts of Foundry Aware and the Application Developer / Data Engineer Associate exams, and it's core FDE judgement: design reviews, the right tool for each job, and proving a model works for users and agents. |

## Reading order
| # | File | What you get |
|---|---|---|
| 01 | [Best practices](01-best-practices.md) | 8 design guidelines; 4 principles in priority order; pragmatism and trade-offs |
| 02 | [Structural guidance](02-structural-guidance.md) | Normalization vs derived properties, structs, interfaces, links, naming, security |
| 03 | [Anti-patterns](03-anti-patterns.md) | 8 anti-patterns: causes, signs, costs and fixes; the tool-selection map |
| 04 | [Validation](04-validation.md) | Task-based drills: sourcing questions, drill design, reading results, people vs agents, formats |
| → | [Case study 01 — Applied to our courses](../17-case-studies/01-course-ontologies-reviewed.md) | Design review of the E2E, Ontology, Mining, AIP, Agentic, Function and Pipeline models |
| → | [Practice 01 — Design exercises](../18-practice/01-design-exercises.md) · [Practice 02 — Validation drill kit](../18-practice/02-validation-drill-kit.md) | 5 paper exercises with answers; a Foundry drill template for later practice |
| — | [Sources and notes](../SOURCES.md) | What was read, how it was compiled, and corrections to earlier study material (Ontology design section) |

## One-page cheat sheet
**Principles, in priority order:**
1. Model the **domain**, not the source.
2. **Don't repeat** yourself (rule of three).
3. **Open for extension**, closed for modification.
4. **Compose interfaces**, avoid deep hierarchies.

**Invariants to defend:** naming · semantic clarity · security design. Be flexible on everything else, and document every shortcut.

**Structure:**
- **Same-object, pipeline-updated values:** pre-compute in the pipeline.
- **Values that depend on links or action edits:** derived property. Above ~10k objects per query, consider documented denormalization.
- **Multi-part values and AI outputs with their evidence:** struct with a main field, and a reducer if it holds several values.
- **Shared shape or behaviour:** interface. Scaffold now, even where support is partial.
- **Relationships:** a link must answer a domain question. If the relationship has its own attributes, use an object-backed link.
- **Names:** singular concrete types; qualified properties; links readable from both directions; one date convention.
- **Security:** one type with row- and column-level policies (together, cell-level); start restrictive; follow domain boundaries; review new paths.

**Anti-patterns:**

| Anti-pattern | Cause | Fix |
|---|---|---|
| System Silos | one type per source system | merge in pipelines |
| Kitchen Sink | ETL columns exposed as properties | curate |
| Department Silos | one type per team | one shared type |
| God Object | one type, many entities | split + interfaces |
| Golden Hammer | one tool for everything | right tool per job |
| Action Sprawl | single-property actions | business-operation actions |
| Time Machine | a copy per version | one object + linked history or time series |
| Misnomer | vague names | specific names + descriptions |

**Right tool:**
- **actions:** human decisions;
- **batch pipelines:** transformation and pre-computation;
- **streaming pipelines:** continuous low latency;
- **automations:** reacting to Ontology events;
- **functions:** live, multi-object logic;
- **schedules:** recurring builds.

**Validation:**
- Structure ≠ usability.
- Take real, consequential questions from the operating rhythm, and order them situation → factors → impact.
- No purpose-built apps; non-builders drive.
- Record time, path, hesitation and exports.
- Rerun with agents, without giving them the human path.
- Keep the questions as an evaluation suite and rerun it.

---
← [10 — Applications on the Ontology](../10-applications/README.md) · [12 — Security and governance](../12-security-and-governance/README.md) → · [Ontology home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md) · [Study plan](../../STUDY-PLAN.md) · [Progress](../../PROGRESS.md)
