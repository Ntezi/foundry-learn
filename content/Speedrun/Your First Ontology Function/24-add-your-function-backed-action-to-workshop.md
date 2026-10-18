# 24 — Add Your Function-Backed Action to Workshop

## Put the operation where the manager works

The final integration adds the function-backed Action to Workshop's Inline Actions widget. The manager can investigate a clinic and submit a review decision in the same application. This reduces the gap between identifying a problem and recording responsibility for it.

The widget is an operator interface to the Action. It does not replace the Action Type or make the edit function a direct browser write. The execution path is application input → Action → edit function → applied Clinic change, followed by a display of the resulting state.

## Course interaction and target identity

Refresh Workshop after saving the Action Type. Configure the blank Inline Actions widget, add **Set Clinic Goal**, choose the intended Clinic input and submit during later practice. Do not assume that a visually highlighted row automatically populates every Action input. Inspect the widget's configured target and the actual form value.

A useful operator flow makes the Clinic identity visible near the operation. Names help recognition, but the verification record should include the stable object identity. If two clinics share a name, a screenshot containing only that name is weak evidence of which object changed.

Before submission, predict the branch. A Clinic with underReview true should follow the stop/clear path. A Clinic with false should follow the start/goal path. This small prediction is how you catch a mismatch between the user's intention, the visible state and the function's actual input.

## A planned before-and-after exercise

Use one training Clinic that is not under review. Record its object ID and original goal/review values. Submit once, inspect the Action result, then inspect the actual Clinic state. Expect review enabled and a goal derived from the observed DSO, subject to successful execution and the tutorial's random multiplier.

Then deliberately test ending review as a separate operation. Record the true state before submitting and verify review disabled and goal cleared afterward. Also inspect a different Clinic to ensure the intended target boundary held. These are planned expectations, not observed results from this editorial pass.

If the display does not change immediately, do not reflexively resubmit. The Action may have failed, may still be running, or may have applied while the UI remains stale. Inspect execution evidence and current state first. A toggle makes an uninformed retry particularly confusing.

## Why application verification needs more than a green notification

A success message is useful evidence about submission, but the business question is whether the intended Clinic now has the intended state. Conversely, a stale widget is not proof that persistence failed. Compare the command outcome, object state and display as distinct observations.

After validating the configuration, save/publish the application version you intend operators to use and verify that version's behavior. A correct editor draft is not evidence that users see the same configuration. This is the same release-boundary discipline used for backend services and frontend deployments.

**What to remember:** the complete result is an understandable operator intention, a correctly targeted Action and verified state. The code, form and notification each cover only part of it. The detailed evidence fields remain in [P4](PRACTICE.md#p4).

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131749) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
