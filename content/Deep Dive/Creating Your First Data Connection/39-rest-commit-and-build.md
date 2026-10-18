# 39 — Commit and Build Your Dataset

*Module: Data Connection: REST API · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Steps

1. Source Control → commit message (for example "Added API retrieval logic for plants") → **Commit**.
2. With `spark-transform.py` open, click **Build**. Choose *Update then build* if asked.
3. Watch the **Build** tab. The first build is slower because Foundry packages and deploys the code. Later builds are faster.
4. Open `plants` to confirm the API data landed, ready for pipelines and the Ontology.

## Commit, then build

Build runs committed code, so uncommitted edits don't reach the dataset.

Docs: [Datasets](https://www.palantir.com/docs/foundry/data-integration/datasets/).

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864467) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 40 — Considerations and Best Practices.
