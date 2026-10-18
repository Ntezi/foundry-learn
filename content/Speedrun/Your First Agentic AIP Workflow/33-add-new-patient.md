# 33 — Add a New Patient

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Introduce a controlled event into the workflow

In the Workshop application, choose Add new patient, populate the form and submit. The course expects a creation notification. It then selects Pending in the Eligibility Decision filters, refreshing if necessary, to locate the new patient before automatic assessment finishes.

Creating a new object is the input event for the next lesson. The creation notification proves only that the application accepted the creation operation as reported; it is not evidence that the assessment automation already completed.

## The fictional values pictured in the course

The embedded screenshot was inspected. It supplies this training example:

| Field | Pictured value |
|---|---|
| Name | John Doe |
| Age | 35 |
| Gender | Male |
| Informed Consent | Yes |
| Diagnosis | Type 2 Diabetes |
| Disease Stage | Stable |
| Health Status | Healthy |
| Lab Results | HbA1c: 6.9% |
| Lifestyle Factors | Non-smoker, occasional alcohol |
| Treatment History | No recent treatment history |
| Pregnancy Status | N/A |
| Contraception | N/A |

These are notional example inputs, not a recommendation about eligibility or real clinical data. No outcome should be inferred from this table without the actual training protocol. No patient was created in this notes pass.

## Why this tests more than the model

The earlier evaluation directly supplies object inputs to a function. This step goes through the operational application's creation path. It can reveal whether the new object appears in the monitored set and whether the automation detects and binds it correctly.

The same idea applies to testing a new support ticket through the actual UI rather than inserting an unrelated mock directly into a handler. You are checking the boundary where operational data enters the automated process.

## Do not mistake timing for missing data

The course expects an initial Pending state, but processing is asynchronous. If the automation completes quickly, a Pending-only filter may no longer show the object by the time you inspect it. Search for its identity across decision states and inspect the event history before creating another copy.

A missing row under a filter is not proof that creation failed. Similarly, a row still Pending does not alone identify the cause: the trigger may not yet have evaluated, an effect may be running or an execution may have failed.

The source's step heading says newly added agent; the actual operation creates a patient. The notes use patient consistently to avoid confusing a data object with the function processing it.

The lesson also suggests that a scheduled data pipeline could supply new patients instead of manual entry. That is an extension, not a pipeline configured here. Data ingestion and assessment triggering would remain separate stages to observe.

**Review question:** the patient disappears from the Pending filter. What should you do first? Locate the same object without that filter and correlate it with the automation event; do not assume deletion or resubmit the form blindly.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2286202) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
