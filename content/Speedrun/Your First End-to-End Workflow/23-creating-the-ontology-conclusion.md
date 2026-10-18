# 23 — Ontology conclusion: verify the model before building screens

The intended result of this section is an Order type backed by the prepared dataset, with identifiable instances available for application use. The next step is easier to debug if you first confirm that the model itself presents the expected data.

A blank table in Workshop could mean an app configuration problem. It could also mean that there are no indexed objects, the wrong type was selected, or the user lacks relevant access. Testing the object layer first narrows those possibilities.

## Trace one known Order across the boundary

Pick a real order ID from the prepared output and inspect the corresponding Order instance. Compare its item, customer name, due date, status and assignee with the dataset values expected at this stage.

This is an integration check similar to verifying an API response against its intended database record before debugging frontend rendering. Use the same identity at every step; matching only an item title such as “Stapler” can select a different order.

At this point in the course, you have not configured the assignment Action yet. Later, object edits introduce another state concern, which the second half will explain. For this checkpoint, the goal is to understand the initial data-to-object mapping.

## Interpret the possible observations

| Observation | What to investigate |
|---|---|
| Definition exists but no objects appear | Backing data, mapping, indexing status and applicable access. |
| Count differs from the expected dataset population | Primary keys, datasource selection, indexing and visibility; do not assume one cause. |
| Known order exists with wrong customer context | Trace the property mapping and upstream customer join. |
| Two objects share the same title | This can be valid; compare primary keys rather than titles. |

These are diagnostic starting points, not claims that such failures occurred in the current build.

## What the model enables—and what still needs design

Applications can refer to Orders using a common identity and properties. That is the basis for tables, filters, charts and details. The broader platform also supports richer formatting, relationships, developer interfaces and security configuration; this introductory section does not fully configure those concerns.

Do not read “security policies are deferred” as “there is no security.” The enrollment and resources already have access controls. The course simply has not established a complete production permission design for your future application.

Likewise, an Order type is not proof of source-system write-back. Defining a business representation and sending mutations to an external transactional system are different pieces of work.

## A short explanation you should now be able to give

“The pipeline produces prepared records. The Order type defines how those records are identified and exposed as business objects. Indexing makes the backed objects available for application use. Workshop will consume those objects.”

If any phrase feels vague, return to lessons 18, 21 or 22. Understanding these boundaries will save you from rebuilding a UI to solve a problem that belongs in the pipeline or object model.

**Checkpoint question:** why is one known-order comparison valuable even when the object count matches? Counts establish population size, while the comparison tests whether the intended entity carries the intended values.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792150) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
