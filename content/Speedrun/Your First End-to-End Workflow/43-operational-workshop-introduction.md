# 43 — Make the application operational: connect observation to a decision

The application can show an Order that needs attention. The Action can record assignment. This section connects them so a worker can move from investigating work to assigning it in the same context.

The target journey is: find an Order, select it, inspect it, choose Assign, supply the assignee, submit, and observe the resulting state. Every step should preserve the intended Order identity.

## Two flows meet at the selected Order

```text
Read:  filtered Orders → table selection → selected-order details
                                      │
Write:                                └→ Action target
                                              + assignee input
                                              → object changes
                                              → observed result
```

The selection is the bridge. A correct Action applied to the wrong Order is still an operational failure. A correct details panel beside an unbound button can create that risk if the form targets something different.

This is similar to connecting a detail page's current resource ID to a command request. The button label expresses intention; the supplied parameter determines which entity receives it.

## What “operational” adds

A read interface supports awareness. The assignment operation captures a decision that changes responsibility in the modeled workflow. To be useful, the worker also needs feedback: did the operation succeed, fail validation, lack permission or remain unresolved?

A success message is one observation. The corresponding object's resulting Assignee and Status provide another. The user should be able to connect the result to the Order they intended to change.

The tutorial's assignment does not itself prove that a named person received a notification. Recording responsibility and communicating it are separate capabilities. Nor does it establish that either original transactional system received the edit.

## Think about the effect of changing state

An invented worker filters the table to `open` Orders and assigns one. Its status becomes `assigned`. Once the updated state is reflected, it may no longer match the open filter and disappear from that view.

That can be a correct result rather than lost data. The worker needs enough feedback to understand why the row is gone, and a way to find the Order under its new state. This interaction connects the earlier filtering lessons directly to the write operation.

The exact refresh and selection behavior must be inspected in the actual application. The example describes what the filter logic implies when the updated state is observed; it does not claim that a particular timing or empty-selection behavior has been configured.

**Where this pattern is useful:** ticket assignment, case routing, inventory review and any workflow in which a person inspects a queue and then changes one entity's state.

**Remember:** a complete interaction includes intent, target, permitted change and visible outcome. Adding a button supplies only one part of that chain.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792212) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
