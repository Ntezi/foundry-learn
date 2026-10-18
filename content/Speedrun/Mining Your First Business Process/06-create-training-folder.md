# 06 — Create a Course-Specific Training Folder

*Module: Project Setup · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Give the process investigation one home

Favorite the learning Project if useful, then choose New → Folder inside it. The source suggests naming the folder `Speedrun: Mining Your First Business Process`. Favoriting is a navigation convenience; it does not change which data the process uses.

The folder is the intended destination for the package and course resources. When a later step lets you choose a dedicated subfolder for generated process contents, keep that location understandable within the training structure.

## Why a folder helps but does not prove correctness

Suppose the course folder contains a Claims Process resource and a dataset named claim logs. That is a good organizational sign, but it does not prove the process references that dataset. The configuration could still point to a similarly named resource elsewhere.

The distinction resembles a configuration file in a repository that connects to a database outside the repository's apparent environment. Where a file lives and what it references are separate facts. Later, the lineage lesson verifies the latter.

## Name resources for their roles

Use the folder to distinguish this mining exercise from the earlier agentic assessment course. Within it, the process entity is a Claim, the historical source is the claim logs dataset, and the generated Log representation has its own identity. Avoid several anonymous copies named “new” or “final” that make source tracing harder.

If you intentionally create a later experiment, state what changes: source window, mapping or graph configuration. That makes comparison meaningful. Merely moving nodes on a graph or renaming a resource is a different change from replacing its data source.

The source notes that folders and files can be renamed through their context menu. This does not establish that every underlying identifier or reference changes with the display name. Inspect those properties explicitly when they matter.

## Local notes versus Foundry contents

The local `Learn/Speedrun/Mining Your First Business Process` directory stores lesson notes and review/practice files. The course's actual datasets are supplied by Marketplace during later Foundry practice. These Markdown files are not a copy of that installed data.

Keep related documentation here rather than creating another Application Developer collection or an assistant-specific subfolder. The goal is one recognizable home for the course and one central learning-status record.

**Review question:** why do we still inspect lineage after placing everything in a course folder? Folder organization reduces confusion, but lineage establishes the actual dependency from generated process data to the intended source logs.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102638) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
