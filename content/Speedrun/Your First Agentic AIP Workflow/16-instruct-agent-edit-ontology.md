# 16 — Instruct Agent to Edit your Ontology

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Turn the result into a domain operation

Add an Ontology block, choose Action, and select the username-prefixed **Modify Eligibility Decision** Action from the training installation. This is the same business operation you inspected in the Workshop application.

Map its arguments by meaning, not by their visual position:

| Action input | Value to bind |
|---|---|
| Patient | The function input `patient` |
| Eligibility Decision Reasoning | Use LLM → `eligibility_reasoning` |
| Eligibility Decision | Use LLM → `eligibility_decision` |

The course warns that parameter order can differ. Both generated fields are strings, so reversing them could escape a simple type check while producing a semantically invalid operation. Inspect the parameter labels and the binding path, then save the function.

## Why reuse the existing Action?

A domain operation centralizes the meaning of a change. The human application's form and the Logic function can both submit the same kind of update rather than each implementing its own mutation route. This is comparable to a UI and a background worker invoking the same service command.

The reuse makes the workflow easier to reason about: the model supplies arguments to a defined operation. It does not grant the model unrestricted database access, and it does not mean the model chooses which Action runs in this exercise. You chose the Action and placed it in the sequence.

Centralizing an operation also does not prove all desired validation is already present. During practice, inspect the installed Action's accepted values and submission conditions. In particular, verify that Manual review required is supported rather than assuming the model's prompt defines the Action's schema.

## Trace a proposed edit end to end

A supplemental example uses an imaginary candidate whose relevant evidence is incomplete. The LLM produces:

```json
{
  "eligibility_decision": "Manual review required",
  "eligibility_reasoning": "A required item of evidence is missing from the supplied record."
}
```

The Action receives the original patient object and those two values. It should not receive a name invented or returned by the model as the target. Keeping identity outside the generated text limits one class of accidental wrong-record edits.

The expected edit records the assessment outcome and explanation on the intended object according to the installed Action. It does not by itself notify a reviewer, enroll a candidate, or demonstrate that the update has already been persisted. Those conclusions need their own configuration and execution evidence.

## What to verify before later execution

Compare the Action's target type with the `patient` input type, then compare each argument with the Use LLM output schema. Inspect the resulting object and property changes in the preview lesson. Confirm that the reasoning is evidence-based, not merely grammatically fluent.

For a production design, also consider stale inputs and competing writes. If a human resolves a case while an earlier model invocation is still running, should the older result overwrite the human's work? The tutorial does not establish a concurrency policy. Record that as a design question for later work rather than claiming protection exists because an Action is used.

**Review question:** why does sharing an Action improve consistency but not prove equal runtime authority? The operation can be shared while callers and execution settings differ. Each path still needs its own permission and result checks.

**Key lesson:** input identity, generated values and the write operation are separate pieces. Verify all three. A correct sentence applied to the wrong object is a failed workflow.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2280694) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
