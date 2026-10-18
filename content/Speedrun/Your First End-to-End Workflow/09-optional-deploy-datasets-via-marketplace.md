# 09 — Optional: obtain the datasets through Marketplace

This lesson is an alternative setup route. Use it when the course files cannot be downloaded or uploaded. If the three structured datasets already exist and are usable, the ingestion outcome has been achieved; installing another set would create ambiguity about which inputs the pipeline should use.

## What Marketplace contributes here

The course directs you to search Marketplace for **Speedrun: Your First End-to-End Workflow** and install its datasets into the course folder. In this context, Marketplace distributes prepared tutorial resources so you can reach the same starting point as a learner who uploaded the CSVs.

A useful software-engineering analogy is obtaining a sample project's fixtures through a packaged distribution instead of copying them manually. The analogy concerns delivery: it does not mean that installing the product creates a live connection to the two fictional companies.

## Choose the route based on the missing outcome

| Situation | Appropriate next step |
|---|---|
| All three uploaded datasets open correctly | Continue to the ingestion conclusion. |
| Course file download or upload is unavailable | Use the course-supported Marketplace alternative. |
| Marketplace installation is blocked too | Return to Permissions & Help with the actual error and target location. |
| You see two similarly named copies | Inspect their locations and resource identities before choosing inputs. |

The purpose is to obtain three known inputs, not to exercise every available installation method. This is an important engineering habit: distinguish an objective from one possible procedure for achieving it.

## Verify the installation's result

After following the product's installation flow, inspect the destination folder and confirm the two order datasets and consolidated customer reference are available. Open them and check their schemas. An installation notification describes an operation's status; the resources themselves establish whether you now have the required inputs.

Do not infer customer-master semantics or data freshness from the fact that the inputs came through Marketplace. The next transformation lessons still need to clean the order branches and reconcile customer IDs.

No Marketplace installation was performed as part of this notes revision. The earlier course review read this optional lesson; that is separate from installing its assets.

**What to remember:** alternative setup paths should converge on one clear downstream contract. Once the right datasets exist, the rest of this course should operate on those selected resources consistently.

**Reasoning check:** why could installing a second copy make debugging harder? A pipeline could point to the original while you inspect the replacement. Identical display names would conceal the fact that you are looking at different resources.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/2121226) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
