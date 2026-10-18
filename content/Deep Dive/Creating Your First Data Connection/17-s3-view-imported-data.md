# 17 — View Imported Data

*Module: Data Connection: S3 · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Steps

1. From the sync, **Actions → Open** to see the dataset.
2. The file arrived as-is. Because it is structured CSV, click **Apply a schema** so Foundry shows it as a table.

## Why the schema step exists

A file sync copies **files** into the dataset. Applying a schema tells Foundry how to parse them into typed columns so pipelines and the Ontology can use them.

**Review question:** why does the S3 dataset need "Apply a schema" but the Postgres one (next module) doesn't? Files have no built-in schema; database tables arrive with their columns defined.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864436) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 18 — Introduction.
