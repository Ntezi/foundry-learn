# 20 — Other Pipeline Builder Capabilities

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Additional Considerations and Best Practices | 20/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875653) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Streaming
**[Course]** Pipeline Builder supports **streaming pipelines** for time-sensitive cases. Data is processed almost in real time as it arrives, and the course says **under 15 seconds on average**. Docs: [streaming overview](https://www.palantir.com/docs/foundry/building-pipelines/streaming-overview/).

**[Explanation] Batch vs streaming.**

| | Batch | Streaming |
|---|---|---|
| Runs | On a schedule or trigger, processing a set of data | Continuously, record by record or in micro-batches |
| Freshness | Minutes to hours | Seconds |
| Good for | Reports, daily metrics, most operational datasets | Alerts, sensor/IoT monitoring, fast operational signals |
| Cost and complexity | Lower | Higher: always-on compute, handling of late or out-of-order events |

**[Docs]** (checked Sep 24, [streaming overview](https://www.palantir.com/docs/foundry/building-pipelines/streaming-overview/)): the docs' figure is that streaming data is available in the **Ontology and time series apps in under 15 seconds on average**. That's end-to-end availability, a little different from the course's "processed in under 15 seconds".

Choose streaming only when the *decision* needs seconds-fresh data. The Data Connection course's question "how recent does it have to be to be useful?" is the deciding test.

## Outputting to the Ontology
**[Course]** Besides datasets, Pipeline Builder can write outputs **straight to the Ontology**, making structured, relationship-rich data usable in analyses and applications. Docs: [add an Ontology output](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/).

**[Explanation]** The usual route is dataset output → object type backed by that dataset, configured in Ontology Manager (the E2E and Ontology courses). An Ontology output lets you define the object data from the pipeline itself. Either way, the **primary-key uniqueness** you checked earlier is what makes the objects valid. **[Docs]** (checked Sep 24, [Ontology outputs](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/)): Ontology outputs create **object types, link types and time series syncs** backed by the pipeline's batch or streaming data. Current limits:
- Links can only connect objects produced in the **same pipeline**, and one-to-one links aren't supported.
- IDs are **locked after the first deploy**.
- Stream-backed objects can't be edited unless you use a beta feature.

**[Explanation]** Because IDs lock after the first deploy, settle the primary key design *before* deploying an Ontology output.

**[Course wording]** The course calls ontologies "a comprehensive knowledge graph". **[Explanation]** Elsewhere in the curriculum the Ontology is framed as the business's nouns and verbs, with data, logic and action. A knowledge graph is only the data part.

## Review checklist
- [ ] I can pick batch or streaming for a scenario and justify it by decision latency.
- [ ] I can explain two ways pipeline data reaches the Ontology.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [User-Defined Functions (UDFs)](21-user-defined-functions.md)
