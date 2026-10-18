# 08 — Manual upload: turn each CSV into a structured dataset

A CSV is a text file. A structured dataset exposes its contents as rows with named, typed columns that tools can inspect and transform. Uploading as three individual structured datasets gives each source its own usable input resource.

## Upload procedure and the reason for each choice

1. Open the training Project and course folder. This establishes where the new inputs belong.
2. Select **New → Upload files...** and choose all three CSVs from [course-files](course-files/). Dragging the files into the folder is the course's alternative entry point.
3. Enable **Upload as individual structured datasets**. Each file represents a distinct table-like input; they should remain separately identifiable.
4. Upload, then open each resulting dataset. Do not stop at the upload notification: inspect the parsed schema and a few rows.

The expected dataset names are `orders_office_goods`, `orders_bureau_transactional_system` and `consolidated_customers`.

## Read the schema as an input contract

A **schema** describes column names and data types. CSV text does not carry a strong type contract like a compiled interface. An importer must interpret values such as dates and numbers, so readable rows are only the first check.

For example, Office Goods uses `dueDateTime` and `orderId`, while Bureau uses `order_due_date` and `order_id`. Those differences are real reasons for later transformation. The first local date value is `7/30/23`; interpreting date formats is part of parsing, not something a column's name guarantees.

Identifiers should retain their exact meaning. In general, converting an identifier such as `00042` to a number can destroy leading zeros. That is an illustrative risk, not a claim that this tutorial contains that particular value.

## What the supplied local files actually contain

A local inspection on September 9, 2026 found:

| Source | Data rows, excluding header | Columns |
|---|---:|---:|
| Office Goods | 746 | 10 |
| Bureau | 746 | 9 |
| Customers | 59 | 4 |

These are local file observations, not a fresh Foundry build result. The CSVs have a UTF-8 byte-order mark at the beginning; a reader should handle that encoding marker rather than treating it as part of the first column name.

The Office Goods file includes `orderPlacementDate`; Bureau does not. The customer file contains `officegoods_customer_id`, `bureau_customer_id`, `consolidated_customer_id` and `customer_name`. Recognizing these fields now makes the joins easier to understand later.

## What to check before transformation

Confirm three separate inputs, sensible column boundaries and representative values. Compare row counts with the files and investigate unexpected differences. A date parsed as text, an entire CSV parsed into one column, or a header treated as data can all allow a resource to exist while making it unsuitable for the next step.

**The transferable lesson:** treat ingestion like deserializing an external payload. Successful transport is not proof that the payload was interpreted correctly.

**Check yourself:** why should the 59 customer rows not be added to the 1,492 order rows? They describe customer mappings, not additional Orders. They enrich the order population through matching.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790938) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
