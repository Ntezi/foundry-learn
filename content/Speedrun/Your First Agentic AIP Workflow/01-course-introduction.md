# 01 — Course Introduction

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## What you are learning to build

The course adds AI-assisted eligibility review to an existing clinical-trial recruitment application. The supplied records are fictional training data. Its published 1–2 hour duration describes the walkthrough, not the time needed to understand, evaluate and operate such a system independently.

Previously, Your First AIP Workflow retrieved passages and generated an answer for a user. This course crosses another boundary: the generated result feeds an Action that can change operational state. A sentence on a screen and an updated business record have different consequences. Understanding that boundary is the central learning objective.

The first half ends with a function that receives a patient and a trial, asks an LLM to assess suitability, and maps two output fields into an existing Ontology Action. The second half covers evaluation and automatic invocation. Reading this first half does not mean either later capability is configured.

## A software engineer's translation

Imagine an existing service with a `reviewCandidate` operation. Today, an employee reads information and submits its form. You add an implementation that derives the form's values from text using an LLM. The business operation remains the same; the producer of its arguments changes.

That is a useful entry point for Foundry's Ontology. Patient and Clinical Trial objects identify the entities. Their properties expose relevant information. An Action represents the operation that updates the review. Workshop gives people a user interface. AIP Logic connects the typed inputs, model call and Action. These components form one workflow rather than a collection of unrelated AI tools.

The lesson calls the result an agent. Follow the actual configuration when interpreting that word: the first-half implementation uses Single completion and a predetermined downstream Action. It does not demonstrate the model choosing an arbitrary sequence of tools. This is still valuable automation; the distinction tells you where decisions are fixed by the builder and where they depend on the model.

## Where this pattern is useful

As a teaching analogy, a support team could extract a proposed issue category and explanation from a ticket, then update a case through its established business operation. The same design question appears: what information is needed, which states are allowed, and what happens when the evidence is insufficient? That analogy is not an additional official exercise.

The lesson to retain is that operational AI needs both interpretation and a trustworthy path from interpretation to state. A clear prompt addresses only part of that problem. Identity, field mapping, validation, permissions and human handling of unresolved cases remain engineering responsibilities.

**Check your understanding:** what changed if the model produces a convincing answer but the Action receives the wrong patient? The language result may look correct, while the workflow is fundamentally wrong because the mutation targets the wrong entity.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278610) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
