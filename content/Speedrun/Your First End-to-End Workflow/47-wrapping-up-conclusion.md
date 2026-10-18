# 47 — Wrap up with Workflow Lineage: understand the system behind the screen

The course has connected imported data, preparation logic, the Order model, a Workshop interface and an assignment operation. **Workflow Lineage** helps inspect those relationships so you can understand what an application depends on and what a change might affect.

From Workshop, the course opens Workflow Lineage with **Cmd+i** on macOS or **Ctrl+i** on Windows/Linux. Inspect the dependency graph, select the Action to locate its use in the application, and inspect downstream property usages from the object node.

## Read the architecture in both directions

```text
CSV datasets → Orders Pipeline → all_orders → Order type → Workshop
                                                   ↑          │
                                                   └─ Assign Action
```

The forward path explains how prepared data becomes visible. The return path represents the object edit initiated through the application's Action. It does not imply the CSVs or external source systems are updated by that Action.

For investigation, trace backward: a wrong customer name in the details panel leads to the property, its mapping, the output and the customer join. For impact analysis, trace forward: a property change can affect filters, table columns, chart groupings, details and Action rules.

## A worked refactoring question

Imagine changing the meaning or type of Status. The pie chart groups by it; filters select values from it; the table displays it; and Assign Order sets it to the literal `assigned`.

An apparently small model change could therefore require coordinated updates in several consumers. Workflow Lineage gives you a way to inspect dependencies before making the change. It is similar in purpose to an IDE's Find References combined with a data-dependency graph, though it covers platform resources and their configured relationships rather than only source-code symbols.

A graph is not a substitute for behavior tests. It can show a dependency without proving that the associated business rule is correct or that every external consumer has been considered.

## Translate the course's extensions into engineering concerns

| Possible extension | Problem it would address |
|---|---|
| Live transactional feeds | Freshness and ongoing data arrival. |
| Assignment notifications | Communicating responsibility to the intended person. |
| Comments and richer status updates | Collaboration and operational context. |
| Stronger validation and permissions | Who can make which transitions under which conditions. |
| Appropriate audit facilities | Investigating who changed what and when. |
| External write-back | Synchronizing decisions with source systems. |

These are future capabilities described by the course, not features established by the simple assignment demonstration. In particular, sending external updates introduces failure, retry and ownership questions that a local object edit does not solve automatically.

Workflow Lineage also exposes broader administration capabilities. Listing bulk publishing, deletion or security changes does not mean the tutorial requires you to execute them. For this lesson, the meaningful exercise is inspecting relationships and explaining change impact.

## Tell the complete story

The two companies retain their source systems. The pipeline prepares a common order view. The Ontology establishes shared identity and properties. Workshop lets workers find and inspect Orders. The Action records assignment, and the application displays the resulting modeled state.

**Final reasoning exercise:** if a user asks “Why does this Order have this customer name?”, identify the path you would inspect. Then reverse the question: “Who might be affected if we change the customer mapping?” This ability to trace cause and impact is one of the most transferable lessons in the speedrun.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792219) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
