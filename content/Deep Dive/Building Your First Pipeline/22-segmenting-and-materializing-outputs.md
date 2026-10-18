# 22 — Best Practices: Segmenting your Pipeline and Materializing Outputs

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Additional Considerations and Best Practices | 22/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875655) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## The problem
**[Course]** Real pipelines have many inputs and steps. **Above about 100 nodes** the graph becomes hard to navigate and may even struggle to load. The answer is **strategic segmentation** and deliberate choices about **what to materialize**.

## Two strategies
**[Course]**

| Optimize for | Shape | How it behaves |
|---|---|---|
| **Latency** | One end-to-end pipeline per **use case**, materializing only at the end | Each output is built in **one step** from the inputs (raw → clean → joined → Ontology in one chain), so data arrives fastest |
| **Extensibility and readability** | Separate Pipeline Builder resources per **stage** (cleaning, joining, Ontology…), each materializing its outputs, which feed the next | Maximizes **reuse and clarity**, but costs **build latency**, because each stage waits for the one before |

**[Course] Rules of thumb:** modularize like code; **materialize judiciously** at key points, to create breakpoints and capture reusable intermediate states; **test segments** at key points to catch bad joins, wrong aggregations or wrong assumptions early.

## Reasoning
**[Explanation]**
- **The tension:** fewer materializations means fresher data sooner, but no reusable checkpoints and harder debugging. More materializations means reusable, inspectable stages, but more builds, storage and end-to-end delay.
- **A useful middle ground:** materialize **clean** outputs per source (many use cases reuse them), and keep use-case logic end to end after that.
- **Team effects:** materialized stages are **interfaces between teams**. A "clean customers" dataset owned by one team can be used by several use-case pipelines owned by others, with Project permissions at each boundary. Changing a shared stage affects everyone downstream, so treat its schema like an API.
- **Link to this course:** the two outputs you materialized in lesson 16 (transactions x products, transactions x customers) are exactly the reusable checkpoints this lesson describes. They also made the bad join easy to inspect in Contour.

## Review checklist
- [ ] I can argue for either strategy in a given scenario.
- [ ] I can explain why a shared materialized stage is like an API for other teams.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Pipeline Maintainability](23-pipeline-maintainability.md)
