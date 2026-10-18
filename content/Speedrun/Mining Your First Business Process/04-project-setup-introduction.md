# 04 — Introduction

*Module: Project Setup · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Reuse the learning workspace deliberately

The source recommends one Foundry learning Project with a folder for each course. Replace `<username>` placeholders with your login identifier. Local organizational conventions may require adapting the exact layout.

Your local documentation follows the same organizing idea under `Learn/Speedrun/Mining Your First Business Process`. That folder contains notes, not Foundry resources. Creating Markdown files does not create or configure a Project in your enrollment.

## Why organization matters to the investigation

This exercise produces more than a diagram. It uses installed claim/customer assets, a logs dataset, generated log-related resources and a saved process. Later it adds an application and alert material. You need to know which resources belong to the same training installation when tracing a result back to its source.

Several learners can have similarly named Claim or Process Log resources. If you mine another installation's logs or rename the wrong generated type, the interface may still look plausible. Naming and location conventions help you choose correctly; actual references and lineage establish the dependency.

Think of a Project and course folder as a workspace organization comparable to a service's repository and related deployment artifacts. The comparison is useful for navigation, but a folder name alone does not provide security or guarantee that its resources reference one another.

## Separate training convenience from production design

A single Project is convenient for an individual learning several tools. A production process may involve shared source data, separate ownership and different access boundaries. The source mentions more structured production layouts; do not assume the learning convention is a universal architecture recommendation.

The deeper lesson is to make ownership and dependencies legible. An operator or teammate should be able to identify the process, its business entities and its source history without reconstructing your entire course session.

## Plan the artifact map before creation

During later practice, record the chosen learning Project and course-folder location. Add the Marketplace installation identity, Claim type and logs dataset. After mining, add the generated Log type, backing data and process resource. This small map will support the lineage check in lesson 12.

No new progress tracker is needed inside another Application Developer folder. The central Learn tracker remains the status record; this course folder holds its detailed explanation and evidence plan.

**Review question:** a Log object has your username in its display name. Does that prove it derives from your course logs? No. The name helps locate a candidate resource; backing-dataset lineage and the source location provide the stronger evidence.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102623) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
