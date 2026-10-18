# 23 — Attach Your Function to an Action

## Turn edit logic into an operational capability

The released function knows how to describe a Clinic update. An Action Type gives that behavior a named, configured place in the Ontology so applications can offer it to operators. For a software engineer, it is useful to compare this with exposing application-service logic through a command interface, while remembering that Foundry has its own Action rules and permissions.

The function and Action Type are separate resources. Changing source code does not by itself create an operator form, select the new release or establish who may submit changes. This separation lets the business operation have a stable identity even as implementation details evolve.

## Follow the course setup

Open Ontology Manager and create an Action Type from the released function. Choose the intended edit function and version, use the course name **[username] Set Clinic Goal**, select the instructed save location and training audience, create the Action, then **Save to Ontology**.

Inspect the target parameter and function rule as you configure it. The Clinic passed to the function must be the object the operator intends to change. A function working correctly on the wrong Clinic is still an incorrect operation.

The course uses an organization audience in its training setup. Preserve that as a description of the walkthrough; it is not a recommendation to broadly expose a real operational Action. In a later deployment, choose an audience and submission rules appropriate to the actual process and data.

## Names should explain consequences

“Set Clinic Goal” sounds like a command that always sets a goal. The implementation also clears the goal when the clinic is already under review. This mismatch is worth noticing before the button reaches users.

For the training exercise, understand and reproduce the named course behavior. For a real application, consider whether a dynamic label, a clear confirmation description, or separate start/end operations would communicate intent better. These are product design alternatives, not changes already made to the tutorial resources.

An operator should be able to predict the result without reading TypeScript. If a name conceals a toggle, the backend may execute exactly as written while the user experiences it as a mistake.

## Separate three kinds of readiness

Code readiness means the expected function version exists and returns a suitable edit batch. Action readiness means the configured rule and parameters reference the intended function and target. Operator readiness means the actual user can perform the permitted operation with valid inputs.

Do not treat the TypeScript edit declaration as proof of any user's permission. Likewise, being able to see a resource or edit an application does not by itself establish permission to apply every Action. When a later submission is rejected, investigate the precise error and relevant rules rather than widening access until it disappears.

**Review scenario:** the edit function previews successfully but the application cannot apply its Action. Explain why this does not contradict the preview result. Preview evaluated one part of the path; applying a governed change adds configuration, input and access requirements. [P4](PRACTICE.md#p4) records those checks when practice begins.


**Go deeper in the Ontology area:** [08 — Actions](../../Ontology/08-actions/README.md)

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131748) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
