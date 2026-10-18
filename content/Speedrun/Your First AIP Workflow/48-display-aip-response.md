# 48 — Display AIP Response

## Connect the answer service to a text display

Select the bottom empty Section, hide its header and set Row height to **Auto (max)**. Add a **Markdown** widget, choose a variable-based input and create a **new String variable** backed by a **Function**.

Name it **AIP Response**, select the published Ontology Augmented Generation function and bind its input to **User Question**. The function returns text and Markdown renders it.

The lesson briefly calls the new variable an object-set variable, but the surrounding steps explicitly create a String variable for Markdown. Treat that phrase as an inconsistent label; do not change the contract to an object set.

## Trace both application paths

The display path is User Question → Relevant Chunks → Object list and Vertex template. The answer path is User Question → published Logic function → internal semantic search → formatted Content → Use LLM → AIP Response → Markdown.

Only the question is shared by the two paths in the shown configuration. The answer variable does not receive Relevant Chunks. This distinction explains why showing a graph next to text is not enough to establish exact provenance.

For a stronger future design, the answer service could return its reference identities along with the text, or consume a deliberately shared retrieval set. Such a change would require updating the function and UI contracts; it is not an invisible feature of the existing binding.

## Handle errors according to their cause

The course says an initial error is expected until a question is supplied. Check that specific situation rather than ignoring every error. If valid input is present and the failure continues, inspect the selected published function, parameter binding, Ontology availability, model access and actual execution result.

An empty question, unavailable function and failed model request are different conditions. A useful application should communicate them differently. The tutorial does not fully configure these states, so record observed behavior during practice rather than claiming a polished error experience.

## Save and publish the application

The final course step is **Save and publish**, then **View**. This publishes the Workshop configuration, separately from the Logic function publication in lesson 40. Both resources need the intended versions and bindings.

In View mode, submit a controlled question, inspect the answer and compare it with actual references. Change the question and verify the current result corresponds to the current input rather than an earlier run. Observe loading and update behavior; no precise scheduling or debouncing guarantee is inferred from these steps.

## Rendering is not validation

Markdown makes a response readable. It does not verify claims, attach guaranteed source citations or ensure the model abstained when references were insufficient. Compare substantive statements with the actual evidence supplied to Logic.

The app is a training demonstration over a bounded research corpus. A successful published view does not make it a clinically validated decision system or establish complete literature coverage.

**Review exercise:** the list and graph update, but the answer errors. Trace the answer-specific path before changing Relevant Chunks. Conversely, if the answer works but the graph is stale, inspect the template binding. Separate paths give you separate places to diagnose.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962680) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
