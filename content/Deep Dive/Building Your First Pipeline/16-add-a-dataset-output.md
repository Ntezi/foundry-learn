# 16 — Add a Dataset Output

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Integration, Joining, and Aggregations | 16/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875627) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Understand **materializing** and why it's selective.
- Know what **Save** and **Deploy** do.

## Key concepts
**[Course]** Nodes so far are **intermediate transforms**. **Materializing** stores a node's result as a **new dataset** that other use cases and analyses can reuse. It helps with **maintainability and traceability** for large or complex logic, because you can track each dataset's lineage. The course says materialized outputs **can't be used as inputs to further transforms**; they are the pipeline's results. Docs: [outputs overview](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-overview/).

**[Docs / clarification]** On Sep 24 we didn't find this restriction in the [outputs docs](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-overview/). The docs do say any pipeline can [add an existing dataset](https://www.palantir.com/docs/foundry/pipeline-builder/datasets-add/) as an input, so **another pipeline can read your materialized output**. That is the segmenting pattern in [lesson 22](22-segmenting-and-materializing-outputs.md). **[Explanation]** Within one graph, treat an output node as an end point and keep transforming from the transform node before it. That's how the course builds CLV. Whether the UI blocks connecting an output node onward is something to observe in practice, not a documented rule.

## Walkthrough
**[Course]**
1. On **transactions x products** → **Add output → New dataset**, and name it.
2. Same for **transactions x customers**.
3. **Save**, then **Deploy**. A build starts, and the outputs become real Foundry datasets **in the pipeline's folder**.

## Save vs Deploy vs Build
**[Docs]** (checked Sep 24, [deliver a pipeline](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-deliver-pipeline/)): **Save** stores your edits without changing the live logic. **Deploy** pushes the logic to the outputs. Outputs are created on the first deploy, and you choose which outputs to **build**. A **build** runs the logic and writes the data.

**[Explanation]** Until you deploy and build, downstream users see nothing new. It's the same "a build writes a dataset" idea as in the Data Connection course. After a fix like [lesson 17](17-identify-a-bad-join.md)'s, the materialized outputs stay wrong until you redeploy and rebuild.

## Trade-offs
**[Explanation]** Every materialized output costs storage and build time, and becomes something people may start depending on. Materialize where there's a reuse or debugging benefit, not at every node.

## Review checklist
- [ ] I can explain what "output can't be an input" means inside a pipeline, and how other pipelines still use the dataset.
- [ ] I can say what Deploy does that Save doesn't.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Identify a Bad Join: Drill into Transactions x Products](17-identify-a-bad-join.md)
