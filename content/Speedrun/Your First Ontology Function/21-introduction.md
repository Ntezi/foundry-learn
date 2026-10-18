# 21 — Introduction

## The workflow now needs a decision

The card, column and chart help a manager understand the situation. They do not record what the manager decides to do. The next module lets the manager put a clinic under review and assign a DSO goal, or end that review and clear the goal.

This is the point where an analytical application becomes an operational workflow. Reading data helps someone decide; an Action records a permitted change to the business objects. The value is not merely another button. It is making a decision visible in the shared operational state.

## Translate it into software-engineering terms

The earlier functions resemble queries: their purpose is to return information. The edit function resembles command preparation: given a Clinic and its current state, it describes intended changes. The Action supplies the execution surface through which those edits are applied.

A useful distinction is “calculate an answer” versus “change the system.” A chart can rerun because selection changes or the application refreshes. That must not silently start and stop clinic reviews. Mutations should be tied to an explicit operator intention, with the relevant rules and permissions checked.

For example, an operator might inspect a worsening monthly trend and decide that Clinic A needs review. The function can derive a candidate goal from DSO, while the Action applies the Clinic update. The calculation alone does not decide that the operator has authority or that review is appropriate.

## Why use a function behind an Action?

A straightforward field assignment can often be expressed directly in an Action configuration. A function becomes useful when a change depends on a calculation, related data, or branching business logic. Here, the review-start branch computes DSO before deriving a goal.

This does not mean every Action should have custom code. Code adds implementation, release and testing responsibilities. Choose it when the behavior needs it, not simply because TypeScript is familiar. As a software engineer, part of learning Foundry is recognizing which responsibilities the platform already models.

## Read the state transition carefully

The course uses a toggle. A clinic already under review follows the stop branch; other states follow the start branch. The same function invocation can therefore express opposite decisions depending on state. That is compact for a demo, but the operator-facing intention can become ambiguous.

Later notes discuss clearer Start review and End review commands as design alternatives. They are not implemented features or guarantees about Foundry concurrency. The immediate learning objective is to understand exactly what this tutorial proposes and where persistence happens.

**Checkpoint:** if Function Preview shows `underReview: true`, what additional evidence would establish that a Clinic actually changed? You need an applied Action and an observed before/after object state. A returned edit description alone is not enough. Keep this distinction in mind while reading the next three lessons.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131746) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
