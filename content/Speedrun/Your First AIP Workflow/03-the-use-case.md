# 03 — The Use Case

## Start from the user's problem

The course places you in a charity team working on access to medication and a new tuberculosis initiative. A large research library makes onboarding slow. The proposed application lets the team ask questions and inspect supporting passages instead of searching each document manually.

The engineering objective is evidence discovery. The medical subject matter provides training documents; these notes do not evaluate treatments or provide clinical recommendations. A useful result here is an inspectable path from a question to relevant source material.

## Assign a responsibility to each tool

Pipeline Builder extracts and enriches the documents. The Ontology later represents Chunks and Entities as objects with relationships. Vertex makes those relationships explorable. AIP Logic provides the model-assisted question path. Workshop gives a nontechnical user an interface for entering a question and inspecting the evidence behind the answer.

The course groups these into data preparation, an organizational semantic API and operational applications. In ordinary engineering terms, the layers separate how information is produced from how it is modeled and consumed. A user should not need to understand array explosion or embedding generation to inspect a source passage.

## What the graph will actually mean

Suppose one chunk mentions entities A and B and another mentions B and C. The graph can help a user move from B to both chunks and inspect their text. That is a connection through shared evidence, not automatically a claim that A causes B or that B is equivalent to C.

The first-half extraction only produces names, summaries and chunk-to-entity associations. It does not extract a typed relationship such as “treats,” “causes” or “contradicts.” Those stronger meanings would require different modeling and validation. A graph's visual richness must not imply semantics absent from its data.

## Define a useful answer before optimizing

A practical success criterion would be: a user can find relevant passages, understand which documents they came from and recognize when the corpus does not support an answer. That is more meaningful than checking whether the LLM returns text quickly.

For a software engineer, this suggests tests at boundaries. Does the text correspond to the PDF? Does the chunk preserve context? Are entities actually mentioned? Does retrieval select a useful passage? Does the final answer stay within that passage's support? The first half prepares the data needed for those later questions.

**Transfer exercise:** imagine an internal engineering incident library instead of research papers. The same pattern could organize incident passages and service names. You would still need to distinguish “two services are mentioned together” from “one caused the other's outage.” The application architecture transfers; domain conclusions require evidence.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961849) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
