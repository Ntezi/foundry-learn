# 34 — Configure Code Import Configuration

*Module: Data Connection: REST API · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Make the source usable from code

1. Tick **Allow this source to be imported into code repositories**.
2. Leave the other options as default.
3. Give it a unique **API name** in camel case (for example `FirstLastnameRestApiSource`).

This connects the Data Connection source to Code Repositories. Without it, the transform can't reference the source or its secrets.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864454) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 35 — Create a Code Repositories Resource.
