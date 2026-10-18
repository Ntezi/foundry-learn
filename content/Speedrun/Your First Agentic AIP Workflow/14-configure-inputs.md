# 14 — Configure Inputs

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## The function's contract starts with identity

Add two function inputs. Name the first `patient`, choose Object as its type, and select the username-prefixed Patient type installed for this course. Name the second `clinicalTrial`, again choose Object, and select the matching Clinical Trial type.

Both inputs are individual objects. The lesson does not define an object set, a list of candidates or an arbitrary text question. One invocation is configured around one patient and one trial.

A conceptual signature helps translate the visual configuration:

```typescript
// Teaching pseudocode, not a Foundry SDK declaration.
reviewPatientForClinicalTrial(
  patient: Patient,
  clinicalTrial: ClinicalTrial
)
```

The arguments provide a typed route to relevant properties and an identified patient for the downstream Action. They do not by themselves decide which properties the LLM receives: you explicitly insert those into the task prompt in the next lesson.

## Why not pass a patient name?

Names are for people to recognize. They may be duplicated, changed or displayed differently. A typed object input gives the workflow an entity reference that can also be passed to the Action. You should still verify that the selected object is the intended one; a valid object of the right type can be the wrong candidate.

A useful service-design analogy is the difference between accepting an entity reference and trying to locate a mutable record from a free-text display label. The reference keeps the operation tied to the selected entity rather than asking the model to guess who should be updated.

## Why is the trial separate?

Suitability is relative to criteria. The same candidate may be suitable under one set of conditions and unsuitable under another. Keeping `clinicalTrial` explicit makes that dependency visible instead of burying a specific trial's rules in a static prompt.

The starter application currently presents one trial according to the lesson. That simplifies the exercise but should not mislead you into thinking that patient eligibility is an intrinsic, universal property. If a production candidate can be assessed for several trials simultaneously, the data model may need a separate assessment entity keyed by patient and trial. That is an architectural consideration, not a schema change performed here.

## Inspect bindings, not just labels

When you later use the variable picker, ensure criteria come from `clinicalTrial` and patient attributes come from `patient`. Also verify that both selected types belong to the same intended training installation. A similarly named type from another course can create a valid-looking but irrelevant workflow.

The type system can help prevent passing a Trial where a Patient is expected. It cannot prove that the chosen patient belongs to the selected trial's candidate pool, that the data is current, or that a relevant property is populated. Those are semantic checks beyond basic typing.

**Later verification:** record the two configured input types, selected test-object identities and the actual values inserted into the prompt. Do not rely only on a screenshot of the function's name.

**Review question:** the model output is reasonable but applies the wrong protocol. Which boundary should you inspect first? Check the selected `clinicalTrial` and the criteria binding before altering the model instructions.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279752) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
