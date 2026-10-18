# 40 — Create Assign Order: connect inputs to a fixed state transition

Create a **Modify objects** Action for your training Order type. Add **Assignee** and **Status** to the modification rules, map Assignee from the user-supplied parameter, and map Status to the static value **assigned**. Name the Action **[username] Assign Order** and restrict submission to your own user, as this course directs.

The essential design is a parameter-to-rule mapping. The form collects a choice; the rule determines how that choice changes the target object.

## Write the contract before inspecting the form

| Contract element | Course meaning |
|---|---|
| Target | One Order of the intended training type. |
| Assignee input | The name provided for this assignment. |
| Assignee rule | Set the target's Assignee to that input. |
| Status rule | Set the target's Status to the fixed value `assigned`. |
| Submission restriction | Limit this training operation to your user. |

A **static value** does not vary with the user's entry. In this operation, `assigned` expresses the consequence of the command. A **parameter value** varies per submission: a different chosen assignee produces a different ownership value on the same kind of transition.

For an invented example, submitting `AssignOrder(OG-101, "Alex")` should make that identified Order's Assignee Alex and Status assigned. This notation explains the contract; it is not an API call executed by these notes.

## Why a declarative Action is enough here

The required change is simple: two properties, with one chosen value and one constant. A configured modification rule makes that behavior visible without custom code. Introducing a Function solely to perform those assignments would add another component to understand without a demonstrated need in this exercise.

More complex operations can require additional logic. The lesson is to match the implementation to the rule, not to avoid code regardless of complexity.

## Permission to define is different from permission to apply

Someone who can inspect an Action definition is not necessarily permitted to submit it. Action permissions distinguish viewing, editing the definition and applying it with particular parameters. Submission criteria can constrain who may run it, alongside the relevant object configuration and access requirements. [Official Action permissions](https://www.palantir.com/docs/foundry/action-types/permissions).

Use the current course's user-specific restriction. Other tutorials or production groups may have different requirements; copying a broader permission from them would change this exercise's intended scope.

## Name collisions in a shared Ontology

The historical build used display name **Marius Assign Order** and API name `marius-ngaboyamahina-assign-order` after `marius-assign-order` was already occupied. A friendly name and a technical identifier serve different purposes, just as they did for the Order type.

When revisiting the build, inspect the existing Action and target type rather than creating another similarly named definition. A matching label alone does not prove the button will invoke your rule.

**Verify before continuing:** inspect the target type, the Assignee mapping, the literal Status value and the submission restriction. The form's appearance is reviewed next; a correct form cannot compensate for an incorrect modification rule.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792202) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
