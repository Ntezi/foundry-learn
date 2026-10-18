# 12 — Introduction

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## From an assessment task to an executable function

This module creates a function in AIP Logic that assesses a patient against trial criteria and prepares the corresponding Ontology edit. It also gives the model a way to report that the evidence is insufficient and manual review is required.

The useful mental model is a short pipeline with an uncertain component:

```text
identified patient + identified trial
             |
       selected properties
             |
      LLM interpretation
             |
    decision and explanation
             |
   existing business Action
```

You, the builder, choose the input types, data bindings, output shape and Action mapping. The model supplies values within that arrangement. The fact that one step uses natural language does not remove the need to specify the surrounding interfaces precisely.

## What “agent” means in this exercise

The course uses the word broadly for this AI-powered operational function. The actual later instructions select Single completion for the Use LLM block and place an Action after it. The first-half sequence is therefore chosen by the builder. Do not imagine a loop in which the model explores arbitrary tools until it decides the task is finished.

That distinction affects testing. Here you can inspect a known sequence: object inputs, rendered prompt, two-field result, Action arguments and proposed edit. A more dynamic tool-using design would additionally require examining which tools were selected, how often and in what order. We are not adding that more complex architecture to this tutorial.

## Uncertainty is part of the interface

The manual-review outcome prevents the decision space from being forced into two categories when the evidence does not support either. A relevant blank field is not proof of a negative fact. A contradictory record is not fixed by choosing whichever sentence appears last.

However, asking the model to recognize uncertainty does not guarantee that it will do so. Later evaluation must include incomplete and conflicting examples. A clear prompt expresses the intended behavior; tests show how the chosen configuration actually behaves on particular cases.

## The implementation order has a reason

Create and name the function first so you know where the work lives. Define typed inputs before the prompt so its variables have known sources. Define a structured output before wiring the Action so downstream fields are addressable. Preview the result before evaluation and automation so basic binding errors are caught at the smallest useful scale.

This order resembles implementing a service contract before scheduling a background worker to call it. Automating a broken mapping would simply repeat the error faster.

**Review question:** what responsibilities remain yours even if you write no traditional source code? Input identity, evidence selection, schema consistency, mapping, error handling, permissions and verification still need explicit decisions. Low-code authoring changes the interface used to express those decisions; it does not eliminate them.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279745) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
