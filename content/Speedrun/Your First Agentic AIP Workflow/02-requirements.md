# 02 — Requirements

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

This is explicitly an advanced course. The official prerequisites are familiarity with Ontology objects, relationships and Actions, Workshop, basic AIP capabilities, and the general process of building an operational Foundry use case. Your First AIP Workflow is recommended preparation.

## Convert familiarity into concrete abilities

For a software engineer new to Foundry, “know the Ontology” is too vague. Before implementation, be able to explain these distinctions:

| Concept | Useful engineering comparison | What you should be able to explain |
|---|---|---|
| Object type | Domain entity type | Why Patient and Clinical Trial are separate types |
| Object instance | Identified entity | Why a displayed name is insufficient to identify a mutation target |
| Property | Typed entity attribute | Which input supplies a particular prompt value |
| Relationship | Navigable domain association | Why association with a trial is different from satisfying its criteria |
| Action | Domain command | Which operation records a decision and what parameters it accepts |
| Workshop | Operational application UI | How selection supplies the context for a user's operation |
| AIP Logic | Function orchestration | How inputs flow into a model result and then an Action |

These are comparisons, not claims that Foundry is simply an ORM and a form builder. Use the similarities to orient yourself, then verify the platform's actual identity and execution rules.

## Why the earlier courses matter

The end-to-end course explains how source data becomes objects and then a usable application. Ontology Function explains typed inputs, return values and the difference between calculation and mutation. Your First AIP Workflow introduces model prompts and the importance of supplying the right evidence. This course combines those responsibilities without rebuilding every foundation.

A completed Learn page is not proof that these ideas are comfortable yet. If you cannot explain an Action, revisit that concept before trying to debug an AI-driven Action. Otherwise a field-mapping error can be mistaken for an unreliable model, wasting both time and model calls.

## A small readiness exercise without Foundry

Describe an ordinary support-ticket workflow in four sentences: identify the ticket; identify the policy used to review it; state the proposed classification; state the operation that stores it. Then add a fifth sentence describing what happens when the policy or ticket is ambiguous.

If the fifth sentence only says “the AI decides,” you have not yet defined a complete process. You need an explicit unresolved state and an owner for resolving it. This exercise is supplemental and does not count as course practice.

**Remember:** the prerequisite is understanding the interfaces between components, not memorizing navigation labels. In the next lesson, permissions form a separate readiness check: knowing how a feature works does not establish that your enrollment allows you to use it.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278611) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
