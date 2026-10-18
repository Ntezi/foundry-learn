# 45 — Connect Assign to the active Order: wire the command's target

In the selected-order area, configure the Button Group with button text **Assign**. Set **On Click → Action**, choose your saved **[username] Assign Order** Action, and set the Order parameter's local default to **Object table 1 Active object**. Save and publish the intended module version, then open View.

This is the main integration point between Workshop's interaction state and the Ontology operation.

## Trace what each configuration supplies

| Configuration | Responsibility |
|---|---|
| Assign button text | Communicates the operation to the worker. |
| On Click → selected Action | Determines which operation opens. |
| Order local default → active object | Supplies the selected entity as the initial target. |
| Assignee form input | Supplies the worker's assignment choice. |
| Action rule | Applies the Assignee value and fixed `assigned` status. |

The button does not need to implement the two property edits itself. It supplies context to the operation already defined in the Ontology.

Workshop supports configuring Action parameter values from the application context. This lets an application reuse an Action while providing defaults appropriate to the current interaction. [Official use of Actions in Workshop](https://www.palantir.com/docs/foundry/workshop/actions-use).

## A local default helps, but does not prove the final target

The course's default removes a redundant search for an Order the worker already selected. However, a default should not be interpreted as an authorization rule or a universal guarantee that the target cannot change in the form.

Inspect the opened form and its actual target. If it remains editable, verify the submitted target rather than assuming it is locked. The Action's permission and validation logic remains authoritative regardless of how convenient the initial value is.

This is analogous to pre-populating a command dialog from a detail page. The prefill reduces friction; the command still needs a valid, permitted resource identity.

## Test the selection relationship before submitting

With two distinguishable training Orders, select the first and open Assign to inspect its target; cancel without changing data. Select the second and repeat. Confirm that the title, details and form target all follow the same Order.

This is a proposed integration check, not a test executed during the notes revision. It is more informative than checking that an Assign button exists because it verifies the parameter path.

Also inspect what happens with no active selection and after filters exclude the selected Order. Do not treat an empty context as permission to choose an arbitrary record or assume that the widget supplies the desired behavior automatically.

## Keep definitions and versions straight

The historical Action API name is `marius-ngaboyamahina-assign-order`; the historical operational module version was `v0.4.0`. Those records help identify previous work. They do not prove that the current module invokes that Action or that its published version is unchanged.

**Remember:** the correctness condition is identity agreement—selected table Order, displayed details and submitted Action target must refer to the intended entity. A matching item title is not enough.

**Check yourself:** the form opens correctly but targets an old selection. Inspect the local-default binding and its source variable before modifying the Action's business rule.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792217) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
