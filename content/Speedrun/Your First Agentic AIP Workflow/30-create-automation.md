# 30 — Create Automation

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Specify the event and the effect independently

From the published Logic resource's Usage tab, choose Create new automation. The course opens a configuration window with a condition, effect and summary.

Under Objects added, select the condition for an object added to a set and the username-prefixed Patient type. The inspected screenshot shows a dynamic object set with no property filter populated and a live-monitoring setting. That screenshot describes the teaching example, not a guarantee of immediate detection or your enrollment's configuration.

In the effect tab, bind `clinicalTrial` as a Static object and choose the supplied Glycurex trial. The screenshot shows `patient` already set from the newly added Patient object. Verify that automatic mapping rather than assuming every required input is correct.

| Function input | Source in the shown automation | Consequence |
|---|---|---|
| patient | Object responsible for the addition event | Changes for each new candidate |
| clinicalTrial | A selected static trial | Every invocation uses that same trial |

The fixed trial is a deliberate simplification. The automation does not discover the appropriate trial for every patient. A multi-trial design would need an explicit relationship or selection rule and a suitable assessment data model.

## What does “added to set” mean?

The configured condition is about membership in a monitored object set. In this course, selecting the Patient type without a filter makes a newly created patient the relevant demonstration. Do not replace that definition with an unsupported assumption that every property edit triggers the function.

If you later change the set's filters, membership behavior becomes part of the design to verify. An existing object can be relevant to a filtered set differently from a newly created object. Record the exact condition and filters when reasoning about what should run.

## The edit behavior is consequential

The embedded effect screenshot selects **Automatically run edits**, rather than staging actions for approval. This setting explains why later lessons expect decisions and reasoning to appear in the application after execution. It is different from the model producing Manual review required: that label is itself an assessment value, not a switch that stages every write for approval.

The course shows a Logic effect and a version selector. Current official documentation says staged-write Logic functions use an Action wrapper and an Action effect instead of the legacy Logic effect. During practice, inspect the function's actual write mode and follow the compatible integration; do not toggle modes blindly to reproduce an old screenshot. [Staged-write integration](https://www.palantir.com/docs/foundry/logic/staged-writes/).

Here, internal staged-write execution is also distinct from staging a proposed Action for human approval. The similar terminology does not mean the same thing.

## Save a configuration you can trace

In Summary, give the automation a username-specific name, confirm the course working folder and create it. Before later execution, inspect the selected function/version, object type, input bindings, effect behavior and effective permissions.

A supplemental failure example: if `patient` is accidentally static, each event could invoke the function for the same patient while the trigger history names different new objects. This is why event identity and effect arguments must be compared.

**Review question:** does this automation assess every patient against every trial? No. It reacts to its configured set and supplies one static trial. Generalizing beyond that requires additional design, not merely renaming the automation.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282383) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
