# 14 — Introduction

*Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Why another application?

You already have a Machinery process definition. The next problem is giving an investigator a useful working surface: a graph, filters, and the specific claims behind the aggregate picture. Workshop combines Ontology objects, logic and widgets into that interactive surface. The course embeds Machinery within Workshop to investigate the process in more depth.

As a software engineer, think of this as composing an operational frontend around a domain model. A process definition supplies structure, while the application coordinates the user's current filter and selection. The analogy is useful, but the course is not asking you to implement React components or a REST API.

A diagram showing an unusual investigation state raises a question. An object table lets a user inspect the affected claims. Filters let that user ask whether the pattern belongs to a particular population. Together these support a progression from an aggregate signal to specific evidence. That is the purpose of the app, rather than simply making the graph more attractive.

## The data remains meaningful across views

The Claim is still the business entity and its history still comes from correlated logs. Embedding the graph does not create a second authoritative claims database. The important configuration task is making the graph and table respond to the intended object sets.

For example, if a user filters to non-high-risk claims but the graph still displays all claims, the screen can look coherent while answering two different questions. Shared context is therefore a correctness requirement, not just a convenience. Lesson 15 teaches the bindings that make this possible.

Use this pattern when an operations team needs to move from a process-level question to individual cases—for example, delayed support tickets or orders awaiting fulfilment. Those are transfer examples, not additional implemented course workflows. The app does not automatically establish the cause of a delay or repair a business rule merely because it displays the affected records.

**Remember:** Machinery defines the process used here; Workshop composes the investigation experience. Explain which question each panel should answer before configuring it.

**Review question:** why is the object table necessary if the graph already shows counts? It exposes the individual cases behind a pattern so the investigator can test a hypothesis against actual records.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102857) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md) · [Later practice](PRACTICE.md)

Course steps are paraphrased. Synthetic examples and engineering checks are teaching additions; no live Foundry implementation is claimed.
