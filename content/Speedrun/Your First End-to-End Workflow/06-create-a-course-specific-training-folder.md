# 06 — Create the course-specific training folder

Favorite the learning Project so you can return to it easily. Within it, use **New → Folder** and name the folder **Speedrun: Your First E2E Workflow**, following the course. If an existing folder already contains your training build, use that location rather than creating a second set of resources.

The folder's purpose is simple: keep one exercise's related artifacts discoverable. Its importance becomes clearer as the course grows. You will need to distinguish raw order inputs from a pipeline that transforms them and an output dataset that a model consumes.

## A useful inventory to recognize

| Resource | Why you will return to it |
|---|---|
| Two raw order datasets | Inspect what each company actually supplied. |
| Consolidated customer dataset | Explain how source customer IDs are reconciled. |
| `Orders Pipeline` | Inspect or change the preparation logic. |
| `all_orders` | Check the persisted output consumed by the Order model. |
| Workshop module | Inspect the application configuration and user experience. |

The Order object type is also part of the workflow, but its definition is managed in the Ontology. Do not assume everything in the architecture is controlled just by moving a folder.

## Location and dependency are different

A folder answers “Where did we organize this resource?” Lineage answers “Which resources produce or consume its data?” Both help you navigate, but they are not interchangeable. Two datasets in the same folder are not automatically joined, and resources in different locations can still have dependencies.

This is similar to source-code directories: putting two modules together makes them easier to find, but imports and calls establish their actual relationships.

The historical build used `/Hence/Exploration/Marius/Application Developer Training`. That is a record of the previous platform location, not a claim that it was reopened in this revision. Its name does not need to match our local notes folder. The [practical evidence record](PRACTICE-AND-EVIDENCE.md) tracks the existing resources.

**A small navigation exercise:** without opening the pipeline editor, explain which resource you would inspect if the original source value was wrong, and which if the cleaning rule was wrong. The raw dataset answers the first question; the pipeline answers the second.

**Remember:** a clear location saves time, but resource identity and lineage establish what you are actually using.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790905) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
