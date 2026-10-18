# 09 — Create a New Pipeline

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Preprocessing and Cleaning | 09/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874631) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Create a **batch** pipeline and add three inputs.
- Understand the difference between **structured** and **unstructured** uploads.

## Walkthrough with reasoning
**[Course]**
1. In your course folder: New → **Pipeline**. Name it "Pipeline", choose **Batch pipeline**, set **batch compute: Standard**, then Create. See the docs on [creating a batch pipeline](https://www.palantir.com/docs/foundry/building-pipelines/create-batch-pipeline-pb/).
2. **Upload data from your computer**, or *Add Foundry data* if you used Marketplace. Select the Parquet and CSV files together, rename them `products` and `customers`, and choose **Upload as individual structured datasets**. Foundry can infer the schema (column names) for these two formats.
3. Upload the JSON separately: *Add Data → Browse & upload* → **Upload to a new unstructured dataset**. Name it `transactions`, then also **rename the node** to `transactions`, because the upload name doesn't carry over to it.

## Key concepts
**[Course] Batch pipeline.** Processes data in scheduled or triggered runs. Contrast with *streaming* ([lesson 20](20-other-pipeline-builder-capabilities.md)).

**[Explanation] Structured vs unstructured dataset.** A *structured* dataset has a schema, so Foundry knows the columns and types. An *unstructured* dataset is a set of files with no tabular schema yet. The JSON goes in unstructured because Foundry needs a transform to decide how to turn its contents into rows ([lesson 12](12-work-with-different-file-types.md)).

**[Explanation] Nodes.** Each input appears as a rectangular node on the graph. Transforms, joins and outputs are more nodes connected by edges. The graph *is* the lineage within the pipeline.

## [Docs] Standard vs Faster batch compute
Checked Sep 24 in [create a batch pipeline](https://www.palantir.com/docs/foundry/building-pipelines/create-batch-pipeline-pb/) and [Faster pipelines](https://www.palantir.com/docs/foundry/building-pipelines/create-faster-pipeline-pb/). The course picks **Standard**: distributed Spark, suited to large data (roughly 50 GB and up). The alternative, **Faster** (formerly "lightweight"), is a single-node engine that starts quickly and suits roughly 1–50 GB or up to about 200M rows. It doesn't support some features, such as LLM, geospatial, media set and trained-model transforms. The docs suggest trying Faster first, and you can convert a pipeline between the two.

**[Explanation]** For three small training files, either works. On a project, choose by data volume and the features you need, not by habit.

## Trade-offs and gotchas
- **[Explanation]** Uploading from your computer is fine for training. In production, inputs come from **Data Connection syncs** so they refresh. An uploaded file is a one-off snapshot, and nothing updates it.
- **[Course]** The node name and dataset name differ for the JSON upload. Rename for clarity so later lessons match.

## Review checklist
- [ ] I can explain why the JSON was uploaded as unstructured.
- [ ] I can say what would replace manual uploads in a production pipeline.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Basic Transforms: Clean the Products Dataset](10-basic-transforms-clean-products.md)
