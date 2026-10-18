# 35 — Create a Code Repositories Resource

*Module: Data Connection: REST API · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Steps (paraphrased)

1. Applications → **Code Repositories** → **New repository** → type **Pipelines → Python**.
2. Name it and save it in the same Project. The course uses the Code Repository editor, though VS Code is offered as the recommended option.
3. Choose **Distributed transform (Spark)**.
4. Add an **output** dataset called `plants` in your course folder → **Generate file**.

## Why a transform

A **Foundry transform** is code that produces a dataset. Declaring the output here gives the code a dataset path to write to, which is also what lineage records.

Docs: [Code Repositories](https://www.palantir.com/docs/foundry/code-repositories/overview/), [Python transforms](https://www.palantir.com/docs/foundry/transforms-python/overview/).

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864455) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 36 — Add External Transform Library.
