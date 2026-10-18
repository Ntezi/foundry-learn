# 07 — Ingestion: make external data available for processing

Ingestion means bringing data from its source into the environment where you will use it. In this speedrun, the sources arrive as three CSV files. You are not yet correcting them or deciding how to merge their rows; you are establishing readable inputs.

## Why there are three inputs

The two order files describe business activity. The customer file is reference data: it helps interpret the customer identifiers carried by those orders.

| File | Role in the workflow |
|---|---|
| `orders_office_goods.csv` | Orders from the original company. |
| `orders_bureau_transactional_system.csv` | Orders from the acquired company. |
| `consolidated_customers.csv` | A mapping from each system's customer ID to consolidated identity and name. |

The customer file is not a third stream of orders. Appending its rows to the order rows would combine incompatible concepts. It must be used as a lookup during enrichment.

## A snapshot is different from a connection

An uploaded CSV contains values from when it was exported. Foundry does not learn about tomorrow's orders merely because that file was uploaded today. Manual upload is useful for training, prototyping and inspecting a bounded sample because it makes the input easy to understand.

The course introduces **Data Connection** as the managed route from source systems. A real integration must also specify when data is synchronized and how failures are detected. This tutorial does not configure that recurring ingestion.

You can compare this with a JSON fixture in a software test versus an API client connected to a live service. Both may provide records with the same fields, but only the latter has a designed mechanism for obtaining later changes. A fixture remains valuable; it simply proves a different thing.

## Preserve the source boundary

Keep Office Goods and Bureau separate at ingestion. Their schemas differ, and later transforms need to know which interpretation applies. Overwriting the raw values with hand-edited corrections would make it harder to explain which changes were supplied by the source and which were introduced by your pipeline.

The alternative Marketplace lesson supplies the tutorial datasets when downloading or uploading files is unavailable. It is another way to obtain inputs, not a second mandatory ingestion exercise.

**Remember:** ingestion establishes availability. It does not establish freshness, correctness or shared business meaning.

**Think ahead:** an orders dashboard is refreshed every minute, but its CSV inputs were uploaded last month. Are the orders current? No. Refreshing the view can retrieve the same old data repeatedly. The freshness problem begins at the source boundary.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790937) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
