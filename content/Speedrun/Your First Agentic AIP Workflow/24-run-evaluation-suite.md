# 24 — Run the Evaluation Suite

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Run under an explicit security context

Open the cog beside Run evaluation suite. Under Run security, select User-scoped execution and confirm with Okay. Then choose Run evaluation suite.

The important configuration is whose access is used. The course explicitly chooses user-scoped evaluation. Do not confuse that setting with Single completion, which controls the model prompting strategy, or with Logic write settings, which concern edit behavior. Similar-looking configuration panels can describe different dimensions of execution.

## Before the later run

Confirm that the three cases use the intended installed objects, the expected labels are populated and the actual-value mapping points to `eligibility_decision`. Record the model and configuration under test. These checks prevent spending a run on an avoidable setup error.

An evaluation run is real execution, not merely reading a lesson. It may invoke models and depends on available resources and permissions. No evaluation was run while preparing these notes. Do not infer side-effect isolation merely from the fact that one intermediate field is being scored; verify the actual runtime and evaluation behavior during the practical phase.

## Separate completion from correctness

An invocation can fail because an input is inaccessible, a model is unavailable or the configuration is invalid. That is different from a completed model invocation whose decision fails the evaluator. Both matter, but they lead to different remedies.

A useful record separates cases that completed, cases that produced mismatches and cases that errored. Do not quietly remove errors from the denominator and present the remaining cases as a full successful evaluation.

For example, if two cases return matching labels and the third cannot access its input, the honest result is two observed matches and one execution failure. It is not evidence that the complete three-case suite passed.

## A service-testing analogy

When testing an API, an HTTP authorization failure does not tell you whether the business algorithm would have returned the correct answer. It tells you the invocation did not reach or complete the intended path under that identity. Similarly, retrying a denied evaluation without correcting access does not improve confidence in the model.

Once the run starts, let it reach a terminal state and then inspect that specific run. The next lesson uses Most recent run; record a timestamp or run identity so you do not accidentally review an older result after a new run fails to start.

**Remember:** test configuration, execution identity, observed completion and metric outcome belong together. A green label detached from that context is weak evidence.

**Review question:** a user-scoped evaluation succeeds for you. Does that prove a future automated invocation has all necessary access? No. The automation's effective execution context and resource access need their own verification.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282377) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
