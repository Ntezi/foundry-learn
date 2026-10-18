# 41 — Conclusion

*Module: Wrapping Up · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## What you achieved

You synced data from three kinds of source into Foundry datasets. That data is the base layer for pipelines and the Ontology. The course stresses that Data Connection makes a hard technical task **accessible to more users**, while still enforcing governance over source systems.

## Next

The [Data Engineer training track](https://learn.palantir.com/page/training-track-data-engineer).

## The whole course in one table

| | S3 | PostgreSQL | REST API |
|---|---|---|---|
| Connector | S3 | PostgreSQL (JDBC) | REST API (protocol) |
| Credentials | Access key + secret | Username + password | Token stored as an additional secret, used in code |
| Networking | Direct connection, 443 | Direct connection, 5432 | Direct connection, 443 |
| Extra security step | None (AWS built-in) | Server certificate bundle, SSL mode = require | None |
| How data arrives | Sync a file → apply a schema | Sync a table | Python external transform → commit → build |

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1855287) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes.
