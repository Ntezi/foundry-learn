# 12 — Create the pipeline and add its inputs

Create **Orders Pipeline** using **Batch Pipeline → Standard**, then add the three existing datasets. The course uses this execution mode because the example does not require continuous incoming events or unusually low processing latency.

You are creating a saved transformation definition. Adding a dataset to the graph establishes an input reference; it does not clean that dataset or mutate its source records.

## Why execution mode is an engineering decision

A batch pipeline processes a bounded input when it runs. A streaming design addresses ongoing data arrival and introduces different operational questions. The useful decision starts with required freshness: how soon must a newly placed order become visible to the worker?

For this static tutorial, a standard batch is sufficient. Choosing a faster or streaming option would not make the CSV receive new orders. Upstream data arrival and downstream processing speed are separate parts of the freshness problem.

In a production scenario, first describe an acceptable delay in business terms. A daily planning report and a queue used to prevent imminent fulfillment failures can have different needs. Then design ingestion and processing to meet that requirement. This is a design extension, not a schedule implemented by this lesson.

## Build the starting graph deliberately

1. Open the course's training location and create the named pipeline, or inspect and reuse the recorded training pipeline if it already exists.
2. Select the batch/standard choices used by this course.
3. Add `orders_office_goods`, `orders_bureau_transactional_system` and `consolidated_customers`.
4. Check each selected resource's location and schema, especially if several similarly named datasets exist.
5. Save the definition and inspect the graph before adding transformations.

A correct starting graph has two transaction inputs and one reference input. Selecting the wrong customer dataset can lead to null or incorrect enrichment even if its schema looks plausible.

## Preview is a development aid

Pipeline Builder provides previews that help you understand configured operations. A preview can expose a wrong column selection or unexpected null. However, seeing a small number of correct rows does not prove every input record works or that the final output dataset has been built.

Compare this with running a function against sample data in your IDE. It provides useful feedback while developing; it does not establish that a production job has executed successfully for its complete input.

**What to take away:** the pipeline definition, its input resources and its execution result are separate things. Know which one you are inspecting when you say “the pipeline works.”

**Diagnostic exercise:** you corrected a transform and the preview now looks right, but the application is unchanged. What could be missing? The output may not have been built from the revised logic, or a later stage may not have consumed the new output. Lessons 18–23 will separate those boundaries.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791013) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
