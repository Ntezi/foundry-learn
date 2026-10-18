# 45 — Get User Input

## Create question state

Select the top Section and insert a new section **Above** it. Add a **Text input** widget. In its configuration, open the variable under **String value** and rename it **User Question**.

This variable is the application's question state. The later retrieval and function call need to bind to this exact variable. A visible text box alone is not evidence that any downstream computation uses its value.

## Distinguish the UI variable from the function parameter

Workshop calls the variable User Question. The Logic function's parameter is userQuestion. They serve related roles but are not connected merely because their names resemble one another. The final function-backed variable explicitly supplies the UI value to the parameter.

This is similar to passing a component's state into an API request field. A naming convention helps readability; the binding establishes behavior.

## One value feeds two paths

User Question will feed Workshop's embedding search and the Logic function invocation. The list and graph depend on the first path. The displayed answer depends on the second, including its internal search.

If changing the question updates one part of the UI but not another, inspect the relevant variable binding. Do not assume the model ignored the question before verifying that the correct value reached it.

## Empty and changing input need observation

A new text field may have no useful question yet. The course later mentions an expected error before input is supplied, but that does not specify every empty-state behavior or make all errors harmless.

During practice, test blank text, a normal question and a changed question. Observe when variables recompute and how loading or previous results appear. The inspected instructions do not define a submit button, debounce interval or exact per-keystroke execution behavior, so these notes do not invent those details.

For a more polished application, explicitly managing when to submit and how to show loading can improve clarity and control unnecessary calls. Those are supplemental design options, not features already configured by adding this widget.

## Make the dependency easy to inspect

Choose a clear variable name and verify its current value before debugging downstream results. This is a simple but powerful technique: inspect the state at the boundary before blaming the computation that consumes it.

**Checkpoint:** a user types a new question but the answer remains unchanged. What should you inspect first? Confirm the User Question value, the function-input binding and the execution/loading state. Visual proximity to the text field does not prove a dependency exists.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962675) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
