# Sources and corrections

## What was inspected
- **Course:** [Deep Dive: Building Your First Pipeline](https://learn.palantir.com/deep-dive-building-your-first-pipeline), in the signed-in Learn account on **September 24, 2026**.
  - All 24 lesson bodies were read: 23 required plus the optional Marketplace install.
  - The optional Course Feedback page was not opened.
  - [lesson-manifest.json](lesson-manifest.json) maps each note to its lesson ID.
  - Lessons were read from page source, so Learn may not show them as viewed. Only the Introduction lesson was opened in the browser. Click through the course yourself if you want Learn completion.
- **Images:** screenshots were not inspected one by one. The steps and values come from the lesson text.
- **Docs:** ten course claims were checked against public palantir.com/docs pages on September 24, 2026. The results are below.
- **Not done:** no Foundry work was carried out. Numbers such as "172 rows" and "up to 9 times" are **course figures**, not results from our own run.

## Corrections and clarifications

| Lesson | Course wording | Treatment | Basis |
|---|---|---|---|
| [11](11-advanced-transforms-clean-customers.md) | "Drop duplicates" step, done by **filtering rows with null email, name and address** | A null filter only removes duplicates if every extra copy is an incomplete row. The notes add a check: rerun View stats on `customer_id` afterwards. | Our reasoning about the configured rule |
| [11](11-advanced-transforms-clean-customers.md) | "street + city + state" format, but city, state, street are selected | Output order follows the selection order; check the result. | Inconsistency within the lesson |
| [12](12-work-with-different-file-types.md) | Multi-line off "because we have one JSON file per row" | Read as "one JSON object per line" (JSON Lines). | Our reading of the option |
| [16](16-add-a-dataset-output.md) | "Materialized outputs can not be further used as inputs to other transformations" | **Not found in the current docs.** Any pipeline can add an existing dataset as input, so other pipelines can reuse an output. Treat the course line as guidance for this graph. | [Outputs](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-overview/), [add datasets](https://www.palantir.com/docs/foundry/pipeline-builder/datasets-add/) |
| [18](18-create-an-operationally-valuable-dataset.md) | CLV defined as expected total **net profit** | The pipeline computes **historical revenue** only; name it accordingly in real work. | The course's own steps |
| [20](20-other-pipeline-builder-capabilities.md) | Streaming "processed on average in under 15 seconds" | The docs say data is **available in the Ontology and time series apps** in under 15 seconds on average. | [Streaming overview](https://www.palantir.com/docs/foundry/building-pipelines/streaming-overview/) |
| [20](20-other-pipeline-builder-capabilities.md) | Ontologies as "a comprehensive knowledge graph" | Noted as partial: the Ontology also models logic and actions. | [Intro course notes](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/08-three-pillars.md) |
| [21](21-user-defined-functions.md) | Links only to Java UDFs; "cannot be unpublished" | The docs now support **Python and Java** UDFs and **recommend Python**. The unpublish restriction is stated for Java. | [Transforms overview](https://www.palantir.com/docs/foundry/pipeline-builder/transforms-overview/), [Java UDFs](https://www.palantir.com/docs/foundry/transforms-java/user-defined-functions/) |
| [07](07-download-the-data-sources.md) | Link to the Marketplace alternative | The link points to a lesson in a different course (the AIP workflow speedrun), not this course's optional lesson. The notes link lesson 08 instead. | Link inspected |
| [14](14-simple-joins.md) | The join type isn't named | The notes say to check the selected type. The docs tutorial checks for Left join; no page states the default. | [Join data](https://www.palantir.com/docs/foundry/pipeline-builder/transforms-join-data/) |

## Documentation checks

Checked September 24, 2026, using public pages only.

1. **Batch compute:** confirmed. Standard means distributed Spark. The alternative, Faster, is single-node and suits roughly 1–50 GB, with some features unsupported. Pipelines can be converted between them. [Batch](https://www.palantir.com/docs/foundry/building-pipelines/create-batch-pipeline-pb/) · [Faster](https://www.palantir.com/docs/foundry/building-pipelines/create-faster-pipeline-pb/)
2. **Join types:** partly correct. Left, right, inner and outer are available, plus anti, semi, cross and special joins. The default isn't stated. There's no built-in match-rate check. [Join data](https://www.palantir.com/docs/foundry/pipeline-builder/transforms-join-data/) · [Join reference](https://www.palantir.com/docs/foundry/pb-functions-transform/joinV2/)
3. **"Outputs can't be inputs":** not found in the docs. Other pipelines can import output datasets. [Outputs](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-overview/)
4. **Streaming latency:** partly correct. The docs describe under 15 seconds on average as *availability*, not processing time. [Streaming](https://www.palantir.com/docs/foundry/building-pipelines/streaming-overview/)
5. **UDFs:** the course's framing is outdated. Python is now recommended and Java is also supported. The unpublish restriction is stated for Java. [Java UDFs](https://www.palantir.com/docs/foundry/transforms-java/user-defined-functions/)
6. **Data expectations:** confirmed. They are set per output, and a failed expectation fails the build. Types: primary key, row count, value is one of, not null, not NaN, row condition. [Expectations](https://www.palantir.com/docs/foundry/pipeline-builder/dataexpectations-overview/)
7. **Save / Deploy / Build:** confirmed as described in [lesson 16](16-add-a-dataset-output.md). Branches and proposals exist, and protected branches require approval. [Deliver](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-deliver-pipeline/) · [Branches](https://www.palantir.com/docs/foundry/pipeline-builder/branches-overview/)
8. **Schedules:** confirmed. Triggers can be time, data update, logic update, or a combination. [Schedules](https://www.palantir.com/docs/foundry/pipeline-builder/schedules-overview/)
9. **Incremental:** confirmed. Only appended data is processed, the input must change only by appending, and aggregations see only new rows. [Incremental](https://www.palantir.com/docs/foundry/building-pipelines/create-incremental-pipeline-pb/)
10. **Ontology outputs:** confirmed. They create object types, link types and time series syncs. Links only connect objects within the same pipeline, and IDs lock after the first deploy. [Ontology outputs](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/)

## Open questions (to settle during practice)
- Which join type does your UI select by default in the join board?
- Does the UI stop you from connecting a transform after an output node?
- After the null filter, is `customer_id` actually unique in your copy of the data?
- Does the Marketplace-installed `transactions` dataset need the same JSON extraction as the manual upload?
