# 21 — Create an Evaluation Suite

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Give the experiment a durable home

Open Evals from the right-hand toolbar and choose Set up tests manually. The course uses the suite name `Review Patient Clinical Trial - evaluation suite`. Save it, then choose Add test cases and Edit. The UI reports output schema changes because the previous lesson exposed the LLM block; inspect and accept the expected changes.

Creating the suite stores the test configuration. It does not run the tests or establish a passing result. That distinction is familiar from creating a test file without invoking the runner, but visual tools can make the stages look deceptively similar.

## What belongs in a suite?

Think of four related pieces:

- The function or configuration being tested.
- Test inputs, here a patient and clinical trial for each case.
- Expected values, supplied independently of the current model output.
- Evaluators that turn actual-versus-expected comparisons into metrics.

A run is an execution of that setup. Its observations belong to a particular configuration and time. The suite can persist while its cases or target configuration evolve, so record which version produced each result during later practice.

## Why accept schema changes deliberately?

The evaluation UI needs to understand the outputs available from the function. Exposing `useLlm` changes that interface. Accepting the schema change makes the evaluation configuration aware of the new field path used in the following lesson.

This is analogous to updating a client after an API contract changes. Do not make “Accept schema changes” an automatic response to every warning. First establish that the change is the expected intermediate output and that existing mappings still point to the intended fields. A renamed or removed field can invalidate a test's meaning even if the UI allows you to save.

## Name the suite for the behavior

A business-specific name helps distinguish this exercise from another learner's tests or a different function. During practical work, record the suite's actual identity and the Logic resource it targets. Display names alone are weak evidence when copies exist.

If the exposed output does not appear, return to the Use LLM block and confirm that exposure and saving occurred. If the output appears but its fields differ, inspect the output struct before adding more tests. This follows the dependency order instead of trying to repair a schema mismatch by changing expected values.

**Remember:** the suite is the specification and experiment setup; a run supplies observations. Keep both so you can explain why a score exists.

**Review question:** after creating and saving the suite, can you report that the agent was evaluated? No. You have prepared the container for evaluation; cases, evaluator configuration and observed execution results still need to exist.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282375) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
