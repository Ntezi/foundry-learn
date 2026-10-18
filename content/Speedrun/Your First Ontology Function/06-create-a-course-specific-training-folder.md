# 06 — Create the course folder: make the installation and code easy to find

Favorite the learning Project, then create a folder named **Speedrun: Your First Ontology Function**, or inspect the existing course folder if it already exists. Favorites shorten navigation; the folder identifies the exercise's home.

This looks like a small setup step, but it supports an important debugging habit: know which installation, repository and application belong to the workflow you are tracing.

## Know which resource answers which question

| Question | Resource to inspect |
|---|---|
| Which sample assets were deployed? | Marketplace installation and its destination. |
| Which types and properties does the code use? | Ontology references and generated SDK bindings. |
| Which algorithm was changed? | Functions repository and source revision. |
| Which function release is used by the card? | Workshop variable configuration. |
| Why is a Financial value wrong or missing? | The relevant object and its backing data path. |

Keeping resources discoverable reduces the time spent searching. It does not merge these responsibilities into one file or mean that all problems can be fixed from the folder view.

## Names and identifiers serve different purposes

A folder name tells a human which course it belongs to. An object API name is a technical identifier used by generated code. A function release version identifies a consumable implementation. They can all be correct independently, or one can refer to the wrong resource while the others look plausible.

For example, a repository can sit in the correct folder while importing another learner's similarly named Clinic type. Location alone would not reveal that mistake; the resource references and generated names would.

## Why the folder is not a cleanup guarantee

Grouping resources makes a workflow easier to inspect, but some dependencies may be shared or consumed elsewhere. Do not assume that everything inside can be removed as an independent unit, or that everything outside is unrelated.

This is the same distinction between directories and dependencies in a codebase. Folder structure helps navigation; imports and references determine the actual graph.

For this notes revision, the local study material remains under `Learn/Speedrun/Your First Ontology Function/`. The platform installation and coding exercise have not been executed. The folder names in these instructions describe the planned Foundry organization, not completed setup evidence.

**Navigation exercise:** imagine the card returns an unexpected value. Explain why you might inspect the Workshop binding, then the function release, then the Financial inputs. Each step answers a different question about the same displayed result.

**Remember:** a clear resource home supports investigation, but correctness depends on the relationships between the resources you actually selected.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131545) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
