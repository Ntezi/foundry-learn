# 19 — Finalize and run: turn the definition into built data

Until now, you have been designing how to produce `all_orders`. This lesson deploys the pipeline logic and runs the output build. The practical result should be a dataset containing the prepared order records, available for the next Ontology stage.

## Separate the lifecycle states

| State/action | What it establishes | What it does not establish by itself |
|---|---|---|
| Save | Your pipeline edits are recorded. | Consumers have new output data. |
| Preview | You can inspect development results. | The complete output has been built. |
| Deploy | The configured logic is deployed for the target outputs. | Every future run will succeed or every input is correct. |
| Build | The selected output computation runs and writes its result. | Business correctness, recurring refresh or completed object indexing. |

The course's deployment flow can deploy logic and build the selected output together. They remain conceptually distinct: one concerns the definition to execute, the other its execution and result.

## Follow the execution path

Save the pipeline, open **Deploy**, inspect validation messages, keep `all_orders` selected for the build, and deploy. Monitor the task until it has a final result. Then open the output dataset and inspect its schema and records.

The required computation follows the graph: read the three inputs, clean both order branches, perform their customer joins, combine the prepared rows and write `all_orders`. You do not manually run every transform in sequence; the dependency graph describes which upstream work the output requires.

Think of a build system determining dependencies for a target. That analogy explains ordering, but the product here is processed data, not a compiled executable.

## “Succeeded” answers an execution question

A job may complete successfully while applying the wrong join key. The resulting dataset could have valid types and incorrect customer names. Therefore inspect both the execution result and the data contract.

For this course, useful checks are: both company populations are represented; the intended eleven columns exist; retained order IDs are nonempty and unique across the combined output; and representative orders carry the expected customer mapping. Compare the full row count rather than mistaking a preview limit for the total.

The local CSV inspection supports an expectation of 1,492 records for these exact inputs under the described transformations. That number is not a substitute for observing the current dataset. Historical evidence records a successful build on August 15, 2026, with build RID `ri.foundry.main.build.e9ce4ac3-9939-4447-89d2-3b3193828a48`; this revision did not rerun it.

## Trace an unchanged application in the right order

If you later change a transform but the app still shows an old value, ask whether the revision was saved, deployed, successfully built into the intended output, and consumed by the intended object mapping. Only then investigate what the app queries or displays. This avoids trying to solve an upstream stale-data problem by rebuilding a widget.

**Remember:** configuration evidence, execution evidence and data-quality evidence answer different questions. A reliable engineer collects the one relevant to the claim being made.

**Self-check:** what additional configuration would make tomorrow's inputs update automatically? A designed ingestion/refresh and build process. A single successful run does not create that process.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791234) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
