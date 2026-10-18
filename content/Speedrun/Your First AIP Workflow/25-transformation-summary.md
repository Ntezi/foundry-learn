# 25 — Summary — Transforming the Data

## The first-half result to understand

The practical target is a pipeline that turns PDFs into Chunks, Entities and Join Table. Those outputs prepare the information for Ontology modeling in the next half. You have not yet configured the Chunk and Entity object types, their link, Vertex exploration, AIP Logic or the Workshop application.

For this notes phase, the outcome is an explanation of that pipeline and its assumptions. The course portal has moved from 0/49 to 25/49 required lessons through viewing these pages. That is reading progress, not evidence of a built pipeline or independent practical mastery.

## Inspect execution rather than estimating success

The course opens the **Deploy Pipeline** icon, selects **View deployment history** and then **Build report** for the current build. This is where you inspect actual execution instead of assuming that clicking Deploy finished the work.

The lesson gives a little over five minutes as an expected example duration. Treat that as a walkthrough estimate, not a promise or a completion test. Actual model availability, input data and execution conditions can differ. A long-running build deserves inspection; elapsed time alone does not identify the cause.

## Explain the three products without UI vocabulary

Chunks are identifiable passages with source context, generated summaries and vectors for later retrieval. Entities are the distinct extracted names under the tutorial's simple identity policy. Join Table preserves which names were extracted for which chunks.

The generated fields remain fallible. The vector represents a summary rather than the full original passage. Deduplication does not resolve every alias. A pair in the join table establishes an extracted association, not a typed factual relationship. These interpretation boundaries should travel with the datasets into the next half.

## Choose authoring tools by the work

The summary describes Pipeline Builder as a visual transformation environment and points to Code Repositories for code-based authoring and specialized libraries. As a software engineer, you do not need to regard visual authoring as less rigorous or code as automatically better.

Use the tool that expresses the transformations clearly and supports the required behavior. Whichever tool you choose, you still need defined row grain, keys, dependency management, execution evidence and data-quality checks. No-code removes some boilerplate; it does not remove engineering responsibility.

## First-half checkpoint

Read the [first-half review guide](FIRST-HALF-REVIEW.md) and work its synthetic example. Be able to trace a chunk back to its page, explain the two branches after Use LLM, distinguish name deduplication from semantic identity, and explain what build success does and does not prove.

The second half begins with [Configuring the Ontology](26-ontology-introduction.md). You authorized continuation, and its notes are now available; practical execution remains separately tracked. You do not need to memorize every click to be ready; you should be able to explain why each representation exists and what would make it misleading.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962313) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
