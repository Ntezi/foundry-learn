# 41 — Finish the Action form: ask only for decisions the user makes

Open the Action's **User Interface** configuration. Remove the **Status** parameter if it remains visible, then save the Action to the Ontology. The user should provide an assignee and the target Order; the operation itself determines that Status becomes `assigned`.

This is a small UI change with a deeper lesson: the form should communicate the command's actual contract.

## Compare two forms

An invented form with fields for Order, Assignee and arbitrary Status asks the user to coordinate two related choices manually. They might choose Alex as assignee but leave Status open, or believe that assignment can produce any state.

The intended course form asks for the Order and Assignee. Its fixed rule supplies the assigned status. That makes the interface consistent with the meaning of **Assign Order**.

In backend terms, this resembles defining a request DTO containing the choices a caller is permitted to make, while the command handler derives the resulting state. You should not accept an extra field merely because the underlying object happens to have that property.

## Rule configuration and form configuration are separate

Removing an unused Status form parameter should not remove the rule that sets the object's Status. Inspect both sides after the edit:

- The form no longer asks the user to choose a status.
- The modification rule still maps Status to the static value `assigned`.
- Assignee still comes from the intended input.
- The operation still targets the correct Order type.

If you accidentally delete the status modification, the form could look perfect while the command no longer performs the complete assignment transition. Conversely, hiding an input without fixing an incorrect rule does not make the operation correct.

This is why UI inspection and behavior testing complement one another. One checks what the user is asked to do; the other checks what actually happens to modeled state.

## A hidden field is not a security boundary

The course's safety comes from the operation's configured behavior and permission checks, not from making a textbox disappear. If a business rule must hold regardless of which application invokes the operation, express it in the authoritative rule and validation rather than relying solely on a particular form layout.

The current tutorial still uses a simple assignee input. Removing Status does not make the remaining name a validated employee identity. That distinction becomes a future modeling question, discussed in lesson 42.

## What to observe when the form opens

Before integration into Workshop, understand which values are required and why. Later, Workshop will prefill the Order from table selection, reducing redundant input. That local default does not change the underlying Action's need for a definite target.

**Remember:** a good form asks for the user's decision and makes the operation's outcome understandable. It should not outsource an invariant to the user when the command can enforce it.

**Check yourself:** Status is absent from the form, but the resulting Order remains open. What do you inspect? The saved modification rule and the Action actually invoked—not just the form visibility setting.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792204) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
