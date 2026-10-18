# 09 — Scoping the Workflow

*Module: Scoping the Workflow · Inspected September 23, 2026 · Notes: Ready for Review*

## A checklist of building blocks

The course walks through the main blocks of a use case with a diagram whose groups are phrased as questions. Not every use case needs every block, but **consider them all during scoping** so none is missed by accident.

| # | Block | Key questions (paraphrased) |
|---|---|---|
| 1 | **Data sources** | *Where does the data come from?* Is it a new external source (external system → data connector with credentials), or is it already in Foundry (a Project → raw dataset)? Knowing this early starts validation, connection work and IT approvals. If the data is already there, you see how the work compounds with other use cases. |
| 2 | **User needs** | *What do users need to do?* There may be several answers for several user profiles. Which front ends suit technical and less technical users? A **rigid guided workflow**, or **freedom** to build their own analyses? |
| 3 | **User interactions with data** | *How will users interact with the data?* Will they **enter or transform** data themselves? Should pipelines be open to them, and in **pro-code or low-code**? Where are the data-entry points, and in what form? |
| 4 | **Data asset** | *What data must be provided to users, and in what form?* Datasets and/or **Ontology objects**. **Not every dataset belongs in the Ontology.** It should hold assets that are **easy to understand**, not backend tables, and they can evolve. Consider what users need to access, and what the workflow needs to be built. |
| 5 | **Automations** | *Are automations needed for users to complete their tasks?* Repetitive tasks, optimizations, monitoring, notifications, reporting. What causes friction or takes time? |
| 6 | **Models and what-if** | *How could the data be used further?* Should changes be **persisted or only simulated and compared**? Which tools: homegrown external models, open-source LLMs, models in Foundry? |
| 7 | **Roles and permissions** | Which user groups, with which roles and rights? What must be protected or restricted? Start with a **two-way table of user types × resources** and the role for each cell. This shapes the **Project structure and permissions**, and documents them at the same time. |
| 8 | **Data controls (quality and freshness)** | *What constraints control data quality?* Ask users what they expect for **freshness and content**. Often implemented when moving to production, but central when freshness or quality is a main concern. List it early, since fixes are slow. Data used must be **validated by a governance body**. Data quality can spawn side workflows. |

After this you should have a view of the **end-to-end user journey**, the **data asset** to build and use, and the **interfaces** to create. The course suggests the **Solution Design** app for designing the use case blueprint together, using existing platform resources.

**Remember:** data sources → user needs → interactions → data asset → automations → models → permissions → data controls.

**Review question:** should every cleaned dataset be added to the Ontology? No. The Ontology should hold understandable, workflow-relevant objects. Technical tables can stay in the backend.

---
[Official lesson](https://learn.palantir.com/scoping-use-cases-for-foundry-aip/2104086) · [Course index](README.md) · [Review guide](REVIEW.md)

Course content is paraphrased. Tables, summaries and review questions are teaching additions. Next: 10 — Wrap-Up.
