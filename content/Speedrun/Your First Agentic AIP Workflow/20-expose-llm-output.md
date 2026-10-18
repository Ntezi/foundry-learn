# 20 — Expose LLM Output to Evaluation

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Put a measurement point at the right boundary

Select the lab icon on the Use LLM block to expose its output for evaluation. The course keeps the display name `Use LLM (block)` and API name `useLlm`. The display name helps a person recognize the measurement point; the API name identifies it for references in the evaluation configuration.

The function already contains two different responsibilities: interpreting evidence and preparing an Ontology update. Exposing the intermediate model output lets you score the interpretation result directly instead of trying to infer it from a final edit representation.

A useful comparison is adding an observable result from an internal calculation so a test can inspect it. You are not changing what “correct eligibility” means. You are making the particular value you intend to measure accessible to the test configuration.

## Follow the nested field

The Use LLM block returns a struct. The evaluator will select the `eligibility_decision` field inside that exposed result. It should not select the entire struct, the reasoning string or an unrelated final output.

```text
Use LLM output exposed as useLlm
             |
      eligibility_decision
             |
  Exact string match evaluator
```

This is why the first-half naming correction matters. If your prompt, struct and consumer use different names, adding evaluation can reveal the mismatch but cannot repair it automatically. Verify the actual field path through the picker.

## Measurement scope is not execution scope

The lesson describes the approach as a unit test of the LLM component. Read that as the **scoring target**. Merely exposing an intermediate output does not establish that every other block is skipped, that no model costs occur or that all execution settings are harmless. Check the actual evaluation/run configuration before practical execution.

Likewise, a passing decision label does not prove that the Action maps that label into the correct property. The model and the mapping are different boundaries; retain the first-half preview checks and later persistence checks.

## When this is useful elsewhere

A document-processing function might extract facts, classify a case and update an object. Exposing each meaningful intermediate value can help locate where an error begins. If the extracted facts are wrong, changing the final classifier may only hide the upstream issue. This is a supplemental engineering example, not an additional course configuration.

Do not expose outputs merely to collect more fields. Choose a value because it answers a specific diagnostic or quality question. Here that question is narrow: did the model produce the expected decision label for the supplied case?

**Check your understanding:** the exposed decision passes, but the stored explanation contains the decision label. What should you inspect? The Action's field mapping; the evaluator did not score the reasoning field or its destination.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282372) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
