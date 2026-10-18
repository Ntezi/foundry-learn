# 28 — Introduction

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Move from a callable function to an operating process

The agent can be configured and tested without doing anything automatically when new data arrives. This module adds the invocation mechanism: an automation that reacts when a new patient appears in the monitored object set and calls the assessment function.

For a software engineer, separate the handler from the event subscription. The function describes what to do with a patient and trial. The automation describes when to call it and how to populate those arguments. A handler can work perfectly while its event subscription is missing or points at the wrong data.

## Two paths appear in this module

The course first manually executes the automation against existing objects. This initializes assessments for the supplied candidates and lets you inspect effects in the application. It later adds a new patient to test automatic triggering.

Those paths share a configured effect but prove different things. Manual execution demonstrates that the selected objects can be processed through that effect. The new-patient exercise demonstrates that the trigger detects a relevant change and supplies the intended object without someone pressing Execute for it.

```text
Existing candidates -> manual execution -> configured effect
New candidate       -> observed event   -> configured effect
```

Do not count the first path as proof that the second works. In an ordinary message-driven service, directly invoking a consumer handler would not prove that the broker subscription receives messages.

## Automation adds operational responsibilities

You must know the monitored set, effect input bindings, published function version and effective execution authority. You also need to distinguish an event being detected from the effect completing and the object state becoming visible in the application.

A future production design would address retries, duplicate processing, stale input, human overrides and monitoring. The course does not establish a full policy for these concerns. The notes identify them as questions to test, not as guaranteed platform behavior.

The model assessment remains the same fixed sequence from the first half. Adding an event trigger does not turn Single completion into a model-selected loop of tools. It changes when the workflow runs.

## The learning objective

By the end of the module, you should be able to trace one candidate through event detection, function invocation and the stored assessment. That is much stronger than observing that a number in the application changed.

**Review question:** why could a manually executed assessment succeed while new patients remain Pending? The function and effect may work, while the monitored set, trigger state or automatic input binding is wrong. Investigate the event path before changing the prompt.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282381) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
