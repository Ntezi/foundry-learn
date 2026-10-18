# 38 — Actions: model assignment as a business command

The next operation is **Assign Order**. It accepts a target Order and an assignee, then sets the Order's Assignee and Status to `assigned`. The purpose is to capture one meaningful business decision rather than expose unrelated editable fields.

An **Action type** is the definition of the operation. An **Action submission** applies that definition with specific inputs. A **parameter** supplies an input, and a **rule** describes the changes made from those inputs or fixed values.

## Relate the operation to a backend command

Here is explanatory pseudocode, not Foundry API syntax:

```text
AssignOrder(orderIdentity, chosenAssignee)
    set target.Assignee = chosenAssignee
    set target.Status = "assigned"
```

The caller chooses the target and owner. It does not choose an arbitrary new status as part of this operation. That is similar to a domain command that expresses an allowed transition instead of a generic endpoint accepting any column/value pair.

The distinction helps maintain meaning. A field editor could let a user change Assignee and forget Status. The command groups those related edits under one intention: responsibility has been assigned.

Palantir defines an Action as a transaction over object changes governed by configured logic; an Action type defines those changes and may include side-effect behavior. That transaction boundary should not be extended in your reasoning to external systems that the tutorial never integrates. [Official Action types overview](https://www.palantir.com/docs/foundry/action-types/overview).

## Grouping edits does not answer every business question

An invented request to assign a closed Order illustrates a missing decision. Should it be allowed, rejected or treated as reopening work? This tutorial's simple status rule does not establish a complete lifecycle policy.

Likewise, a free-text assignee can be misspelled, and the fact that the status becomes assigned does not prove the named person exists or is eligible. Those concerns require additional modeled identity and validation in a production workflow.

You do not need to add those features to understand the speedrun. Recognize which guarantee comes from the current command and which needs further design.

## Why keep the rule outside the button?

Workshop launches the operation, but the assignment rule belongs to the Action definition. If another application later uses the same Action, it can reuse that operation rather than implement a second interpretation of assignment in its own click handler.

For a software engineer, the architectural benefit is familiar: shared business rules should have a defined home. UI convenience and the authority to change business state are separate responsibilities.

The tutorial does not configure notifications to the assignee or send an update to either original transactional system. Capturing a name in the object layer is not proof that the person was informed or the source database changed.

**Remember:** identify the command, its inputs, its permitted target and its resulting state. This is the reasoning behind the Action configuration in the next lessons.


**Go deeper in the Ontology area:** [08 — Actions](../../Ontology/08-actions/README.md)

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792199) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
