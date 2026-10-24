# 02 — Foundry data foundations

| | |
|---|---|
| Purpose | The Foundry data layer the Ontology is built on: what backs an object type, how data gets there, and where it lives. Linked heavily to the Data Connection and Pipeline deep dives. |
| Prerequisites | [01 — Foundations (prerequisite concepts)](../01-foundations/README.md) |
| Status | Ready for Review (5 of 5 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Datasets, transactions and schemas](01-datasets-transactions-and-schemas.md) | Datasets as versioned files + schema; transaction types; views; why backing datasets must have stable keys | [Datasets](https://www.palantir.com/docs/foundry/data-integration/datasets/) | Ready for Review |
| 02 | [Pipelines that feed the Ontology](02-pipelines-that-feed-the-ontology.md) | Pipeline Builder and Code Repositories; batch vs streaming; shaping data for the Ontology (one row per object, deterministic keys, join tables) | [Types of pipelines](https://www.palantir.com/docs/foundry/building-pipelines/pipeline-types/) · [Recommended project structure](https://www.palantir.com/docs/foundry/building-pipelines/recommended-project-structure/) · [Add an Ontology output](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/) | Ready for Review |
| 03 | [Virtual tables and streams](03-virtual-tables-and-streams.md) | Backing sources other than datasets; when to use each; what the Ontology can index from them | [Virtual tables](https://www.palantir.com/docs/foundry/data-integration/virtual-tables/) · [Streams](https://www.palantir.com/docs/foundry/data-integration/streams/) · [Funnel streaming pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-streaming-pipelines/) | Ready for Review |
| 04 | [Projects, spaces and markings](04-projects-spaces-and-markings.md) | Projects, folders and resources; spaces and organizations; markings; why these decide where Ontology resources live and who sees them | [Projects and roles](https://www.palantir.com/docs/foundry/security/projects-and-roles/) · [Markings](https://www.palantir.com/docs/foundry/security/markings/) · [Access control propagation](https://www.palantir.com/docs/foundry/security/access-control-propagation/) | Ready for Review |
| 05 | [Lineage and builds](05-lineage-and-builds.md) | Data Lineage; builds and schedules; tracing an object property back to its source column | [Builds](https://www.palantir.com/docs/foundry/data-integration/builds/) · [Schedules](https://www.palantir.com/docs/foundry/data-integration/schedules/) · [Branching](https://www.palantir.com/docs/foundry/data-integration/branching/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

## Seen in our courses

- [Deep Dive — Creating Your First Data Connection](../../../Tracks/Deep%20Dive/Creating%20Your%20First%20Data%20Connection/README.md)
- [Deep Dive — Building Your First Pipeline](../../../Tracks/Deep%20Dive/Building%20Your%20First%20Pipeline/README.md)
- [Ontology deep dive 08 — Why data lineage matters](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/08-why-data-lineage-matters.md)
- [Intro course 09 — Data sources](../../../Tracks/Courses/Introduction%20to%20Foundry%20&%20AIP%20for%20Enterprise%20Organizations/09-data-sources.md)

---
← [01 — Foundations (prerequisite concepts)](../01-foundations/README.md) · [03 — Ontology fundamentals](../03-ontology-fundamentals/README.md) → · [Ontology home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
