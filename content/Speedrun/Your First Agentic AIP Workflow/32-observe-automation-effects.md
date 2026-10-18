# 32 — Observe the Automation Effects

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Verify the business state after execution

Return to the course working folder, open Clinical Trial Recruitment Hub and refresh. The expected course result is that the decision and reasoning columns now contain the agent's assessments. These are expected outcomes, not observations from a live run in this notes session.

This step matters because the application is where people use the result. A function's technical execution can appear successful while a wrong binding, different object type or stale view makes the intended business result absent.

## Compare the same object across boundaries

Choose an object from the execution record and find that same patient in the application. Compare the stored decision and reasoning with the effect's result. Checking “some rows changed” is weaker than checking the object identity and fields tied to a specific execution.

A refresh may be needed, as the lesson notes. If data still appears unchanged, inspect the selected trial and filters, then the execution details and target object. Do not immediately rerun the model: an application-view issue and a failed write need different fixes.

## Manual review becomes visible work

Select a patient marked for manual review and open Review Patient. The course asks you to take the subject-matter expert's perspective again, this time using the agent's explanation to focus the investigation.

The new contribution is not that the agent has resolved every case. It has produced an initial assessment and, for uncertain cases, a reason that can help the person locate missing or conflicting evidence. That can reduce investigation time if the explanation is accurate and actionable.

The explanation remains a generated claim. Compare it with the protocol and patient details. Do not accept it merely because it is concise or confidently worded. If it claims a fact is missing when the fact is visible, record that as a quality issue for the evaluation set.

## A visible label is not a complete work queue

This lesson demonstrates manually selecting a flagged patient and opening the review UI. It does not configure an assigned reviewer, notification, service-level target or escalation process. Those can be useful extensions, but they are not accomplished automatically by storing Manual review required.

The same distinction appears in a support system: a ticket status can identify a need for attention without guaranteeing that someone owns the next action. Effective human-AI teaming needs both the classification and the operational handoff.

**Verification to record later:** the run identity, patient identity, persisted fields visible after refresh and the evidence supporting or challenging the generated explanation. If a person changes the result, record that separately as a human action rather than attributing it to the original automation.

**Review question:** why inspect the application after a successful execution status? It confirms the intended business effect on the intended object and exposes issues that a technical run status alone cannot establish.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282385) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
