# 44 — Reopen the existing module: extend the right application

Return to the Workshop module you already built. The course allows navigation through its View menu, Search or the known training folder. Enter **Edit** mode to configure the assignment interaction.

The task is to extend the existing orders inbox. Creating a second module would leave the original without the new behavior and make it harder to determine which version a user is opening.

## Check identity before configuration

The historical application is **Marius Orders Inbox** in the training location. Its expected data is the Marius Order type used throughout this course. Confirm the module and inspect its existing table, filtered-set variable and selected-object output.

A title is useful evidence but not sufficient identity. Two modules can have similar titles, and an old copy can display plausible Orders. Use the resource location and actual dependencies to establish that you are editing the intended application.

This resembles checking the repository, branch and deployment target before modifying a feature. The cost of a perfectly implemented change in the wrong app is that the intended user still never receives it.

## Edit and View have different purposes

Edit mode configures layouts, variable definitions, widget inputs and click behavior. View provides the configured user experience for the version being viewed. Entering Edit does not automatically publish a change or guarantee a private sandbox for data mutations.

In particular, do not assume every Action submitted while inspecting a development interface is a harmless preview. Before any live test, establish the execution context and intended target. This notes pass changes documentation only; practical work remains in the separate evidence plan.

## Reuse the existing pieces

Locate the selected-order area created in lesson 29 and its Button Group. Identify the active-object variable already used by the title and Property List. Reusing that same selection context is simpler and clearer than adding an unrelated object selector just for the assignment button.

If the expected pieces are missing, first check the module's selected version and earlier configuration. Duplicating the app or creating new variables immediately can hide the underlying navigation mistake.

The next lesson will connect the button to the existing Action. It should not redefine the status rule in Workshop; the saved Action remains responsible for that operation.

**A short preflight you should be able to explain:** “I am in the intended module, editing the expected configuration, using the same Order type and selection variable as the details panel.” Each clause removes a different source of mistaken context.

**Check yourself:** Search returns two Orders Inbox modules. Should you pick the newest title match? No. Inspect identity, location, version and dependencies to determine which one belongs to the recorded workflow.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792214) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
