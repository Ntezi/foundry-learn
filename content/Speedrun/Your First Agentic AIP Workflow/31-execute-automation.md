# 31 — Execute your Automation

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Process the existing training objects

The course opens the automation's Execute tab, selects all objects, chooses Execute, enables the effect in the confirmation flow and confirms. It then opens Manual execution to observe progress and waits for completion before continuing.

This is a real effect-execution exercise, not the earlier preview. The shown automation is configured to run edits automatically. During later practice, verify that the selected set belongs to your notional training installation and inspect its count and identities before applying the exercise to it. No objects were processed while writing these notes.

## Why a manual run is included

The supplied candidates already exist before you configure the new-object trigger. The manual path gives the existing population an assessment and lets you inspect the function through the automation's effect configuration. It serves a purpose similar to a controlled backfill in an event-driven service.

Do not infer a platform-wide rule about whether all existing objects automatically trigger on creation of every automation. This exercise explicitly uses a manual execution step for them. Follow and verify that path as shown.

## A run contains more than one possible result

A batch can include successful effects, failures and still-running work. Opening the execution details is necessary to understand which objects were actually processed. “The button worked” and “all selected objects have the expected stored result” are different statements.

Record the selection size, execution identity, observed effect statuses and any errors. After completion, inspect the application as the next lesson directs. A successful run status is useful evidence of execution, while the resulting object fields provide evidence of the visible business effect.

## Repetition is not automatically harmless

If you execute the same set again, the LLM may produce different output or an Action may encounter a changed record. A human may also have resolved a case since the previous run. The course does not establish an idempotency or overwrite policy.

For a real project, decide how repeated assessment should behave and how to protect a later human resolution from an older automated result. That is a design and test question, not a guarantee provided by the word automation.

If a run appears stalled, inspect its status and error details before launching another batch. A duplicate invocation can make later evidence harder to interpret and may repeat effects unnecessarily.

**Remember:** manual execution is useful for the existing population and for effect verification. It does not prove that the automatic trigger works. The later new-patient exercise tests that separate path.

**Review question:** all existing patients now display decisions after this step. Can you conclude that a newly created patient will be processed automatically? Not yet. You have evidence about the manual path; the event condition and automatic invocation still need observation.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282384) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
