# 13 — Backend architecture

| | |
|---|---|
| Purpose | What happens under the hood: the services behind the Ontology, how data is indexed, how edits are stored, and the limits and costs that follow. |
| Prerequisites | [04 — Object types](../04-object-types/README.md) · [08 — Actions](../08-actions/README.md) |
| Status | Ready for Review (5 of 5 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Backend services](01-backend-services.md) | Ontology Metadata Service, Object Set Service, Actions service, Object Data Funnel, object databases | [Ontology architecture overview](https://www.palantir.com/docs/foundry/object-backend/overview/) | Ready for Review |
| 02 | [Indexing and the Funnel](02-indexing-and-funnel.md) | Batch and streaming Funnel pipelines; direct datasources; data restrictions | [Indexing overview](https://www.palantir.com/docs/foundry/object-indexing/overview/) · [Indexing FAQ](https://www.palantir.com/docs/foundry/object-indexing/faq/) | Ready for Review |
| 03 | [Edits and materializations](03-edits-and-materializations.md) | How user edits are applied and merged with source data; edit history; materializations; schema migrations | [Object edits overview](https://www.palantir.com/docs/foundry/object-edits/overview/) · [How edits are applied](https://www.palantir.com/docs/foundry/object-edits/how-edits-applied/) · [Materializations](https://www.palantir.com/docs/foundry/object-edits/materializations/) | Ready for Review |
| 04 | [Object Storage v1 vs v2](04-object-storage-v1-vs-v2.md) | Why OSv2 exists; breaking changes; migration | [Breaking changes OSv1 → OSv2](https://www.palantir.com/docs/foundry/object-backend/object-storage-v2-breaking-changes/) · [Migrate from OSv1 to OSv2](https://www.palantir.com/docs/foundry/object-backend/osv1-osv2-migration/) | Ready for Review |
| 05 | [Limits, usage and compute](05-limits-usage-and-compute.md) | Volume, indexing compute, query compute; Object Set Service limitations; aggregation considerations | [Ontology volume](https://www.palantir.com/docs/foundry/ontologies/volume-usage/) · [OSS limitations](https://www.palantir.com/docs/foundry/ontologies/oss-limitations/) · [Aggregation considerations](https://www.palantir.com/docs/foundry/object-backend/aggregation-considerations/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

---
← [12 — Security and governance](../12-security-and-governance/README.md) · [14 — Lifecycle and operations](../14-lifecycle-and-operations/README.md) → · [Ontology home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
