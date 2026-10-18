# 34 — Observe Automatic Processing by your AIP Agent

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Follow one event all the way to its effect

Open the automation from the working folder and choose History. In the Event log, select the event for an object added to the object set. The detail drawer shows the relevant patient and effect status. After processing finishes, return to the application, find the same patient and refresh if needed to inspect the decision and reasoning.

The course expects the creation of the new patient to trigger this path. The evidence must tie the event to the same object created in the previous lesson. A recent successful event for another patient is not sufficient.

## Four stages to distinguish

```text
Patient exists
    -> addition event detected
    -> configured effect executes
    -> assessment visible on that patient
```

Each arrow can fail or be delayed independently. If the patient exists but no event appears, inspect the monitored type/set and automation state. If an event exists but the effect fails, inspect the effect error, function version, inputs and access. If the effect succeeds but the app looks unchanged, inspect the target object, current filters and refreshed data.

This is the same discipline you would use to trace a message from publication through consumption to a database effect. It prevents you from blaming the model when the invocation never reached it.

## Preserve useful evidence

Record the new patient's identity, creation observation, event identity/time, bound patient and trial, effect status, and final stored fields. You do not need a large report; you need enough information to connect the stages.

A duration observed on one case is not a general latency promise. The lesson says processing may take a few seconds, but actual timing depends on the enrollment, monitoring and model execution. Use observations rather than the tutorial's optimistic timing language when reporting your result.

## What the successful path establishes

A correctly correlated event and stored result show that the configured automatic path worked for that case. They do not establish exactly-once processing, unlimited scale, every-case quality or protection against concurrent human edits. Those require additional design and testing.

Also remember the static trial binding. The automation does not choose among many trials; it supplies the one configured object. If the candidate population expands, revisiting that assumption is part of changing the workflow.

The result is an eligibility assessment. It may help the recruitment process, but the configured operation does not establish that the candidate has been enrolled.

**Review question:** a new patient has a decision, but the only run you can find is a manual execution. Has automatic triggering been verified? No. You have evidence of a result, but not the claimed event-driven path. Locate the corresponding addition event and effect or leave the trigger unverified.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2286205) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
