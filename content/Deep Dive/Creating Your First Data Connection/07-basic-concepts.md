# 07 — Basic Concepts

*Module: Data Connection: Getting Data Into Foundry · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## What Data Connection does

**Data Connection** synchronizes data from external systems into Foundry. It hides connection complexity behind a front-end and supports object stores, file systems, databases and warehouses. The course diagram shows flows from S3 buckets or RDS PostgreSQL into **Foundry datasets**. Its design goals are robustness, extensibility and ease of use, so more people can do connection work.

## Security: put sources in the right Project

Like the rest of Foundry, Data Connection enforces access control. The course stresses placing **sources in a Project with the correct permissions**, so only authorized users can access, modify or delete the **sources, syncs and webhooks** attached to them. See [Data Connection permissions](https://www.palantir.com/docs/foundry/data-connection/permissions).

## Vocabulary

- **Source:** the configured connection to an external system (address, credentials, networking).
- **Sync:** a job that copies data from the source into a Foundry dataset.
- **Webhook:** a request Foundry sends out to the external system.
- **Dataset:** Foundry's versioned data resource that the sync writes into.

**Remember:** a source's permissions come from its Project, so choose the Project deliberately.

**Review question:** a contractor can edit a Project containing a production database source. What can they do? Potentially modify or remove the source and its syncs. That's why source placement matters.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1855247) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 08 — Connecting an External System with Foundry.
