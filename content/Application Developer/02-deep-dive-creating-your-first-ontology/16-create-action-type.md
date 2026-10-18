# Lesson 16 — Create an Action Type

## Execution result

Completed in Foundry on 2026-08-28:

- Edits enabled on the correctly scoped `[Marius] Flight Alert`
- Action: `[Marius] Assign root cause`
- API name: `marius-assign-root-cause`
- Action RID: `ri.actions.main.action-type.7f50a5b0-fb2f-4a2d-b845-c5cbf06473bb`
- Rule: modify `[Marius] Flight Alert`
- Editable property exposed by the action: `Root Cause` only
- Submission criterion: `Current User is equal to Marius Ngaboyamahina`
- Verification: saved and reloaded successfully in Hence - INTERNAL

## Course Essentials
Enable edits for Flight Alert, create a Modify-object action named `[username] Assign root cause`, expose only Root Cause, restrict submission permission appropriately, and save.

## Why actions exist
An action is a controlled semantic verb. It defines who may change what, which inputs are accepted, what rules execute, and which side effects occur. Direct generic editing is weaker because it exposes storage mechanics rather than business intent.

Weak: “Edit Flight Alert.”

Improved: “Assign root cause,” requiring an authorized operator and a permitted cause while recording provenance.

## Controls and trade-offs
Free text captures nuance but harms consistency. Enumerations improve analysis but may reject novel causes. A hybrid design uses a governed category plus optional explanatory notes.

Submission criteria control authorization; validation controls acceptable input; rules control effects. Keep these concerns distinct. Complex actions may use functions, but code increases testing, deployment, and observability obligations.

## Deeper Mastery
Actions resemble commands in domain-driven design. A command expresses intent and may be rejected; an event records what occurred. A robust workflow may emit an audit event after a successful command.

## Deep Understanding Check
What invariants should `Assign root cause` enforce, and which belong in permissions, validation, or workflow rules?

**Go deeper in the Ontology area:** [08 — Actions](../../Ontology/08-actions/README.md)
