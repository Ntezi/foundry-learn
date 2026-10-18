# 20 — Transformation conclusion: what the pipeline has taught you

The transformation section prepares a shared order dataset from two different source systems. Its lasting value is the reasoning behind that preparation: isolate source differences, reconcile customer identity, preserve order meaning, and create a deliberate output contract.

The course leaves branching, custom code, production promotion, best practices and refresh scheduling for later study. Recognizing those boundaries helps you describe the result accurately.

## Reconstruct the design without the editor

Try narrating the pipeline in your own words:

“Office Goods and Bureau describe orders using different field conventions. Each source is cleaned into a compatible schema. Each then uses its own customer-ID namespace to look up shared customer details. The prepared populations are combined and written into `all_orders`.”

Now add the reason for each stage. Cleaning supports type/name compatibility and addressable records. Customer joins establish shared context. Union collects the population. The dataset output provides a stable consumption boundary. A build produces the stored result.

If you can only list button names, return to the relevant lesson and explain its input, operation and output. You should be able to predict what breaks when a stage is configured incorrectly.

## Three diagnostic problems

**The output has too many rows.** Investigate duplicate customer-reference keys multiplying a join, repeated source records, or accidentally selecting an input twice. Do not immediately deduplicate every output row: that could hide the cause or remove legitimately distinct orders.

**The count looks right but customer names are wrong.** Check source-ID namespaces and the join conditions. A wrong but unique match can preserve counts while corrupting meaning.

**The output looks correct but the due-day chart becomes stale.** Check where its values originate. `days_until_due` is supplied in the course data; this pipeline has not established a clock-based recalculation. Refreshing a chart cannot make an unchanged stored value current.

These examples illustrate why row count is a useful signal rather than a complete correctness test.

## What you would add for a real operational service

A production design would identify the data owner, acceptable freshness, handling of rejected/unmatched records, quality checks, failure monitoring and how changes are reviewed. For example, if the customer feed fails but the order feed succeeds, the business needs a policy for whether to continue with missing enrichment or retain an older complete view.

These are engineering extensions, not tasks you must implement to finish this half of the speedrun. Their purpose is to help you recognize the questions behind the tutorial's simplified inputs.

## Ready to model Orders?

You should now understand what one output row represents and how its identity was obtained. The next stage maps that prepared data into an application-facing business model. It cannot repair unclear identity simply by giving a field a nicer display name.

**Your recall task:** sketch the graph from memory and annotate one possible failure at each boundary. A strong sketch connects failures to business effects, such as hidden work, duplicated workload or incorrect customer context.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791235) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
