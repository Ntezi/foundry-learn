# 28 — Create the Entity Object Type

## A simple entity identity policy becomes explicit

Create another object type using the existing **Entities** dataset. Name it `(<username>) Entity`, choose its icon and use **Entity Name** as both the primary key and title.

Unlike Chunk, this tutorial's Entity has one field serving both identity and display. That is convenient for a distinct-name training catalogue. It also makes the first-half limitation visible: two aliases for one concept can become two objects, while an ambiguous shared name can collapse meanings into one identity.

Creating the object type does not add a canonical registry identifier or disambiguation. The Ontology exposes the representation produced by the pipeline.

## Course steps and Action choices

Choose **New → Object type → Use existing datasource**, select your Entities dataset, complete metadata and property selection, then configure the offered Actions. The lesson explicitly selects **Create** and **Delete**, with only your own user allowed to execute them. Save the resource in the course folder, create it and **Save to Ontology**.

The lesson explains that Modify is unavailable because the only field is also the primary key, which cannot be modified through that Action. This is an identity constraint, not an arbitrary missing edit form. Changing an identity is different from changing an ordinary property.

Generating Actions defines available operations and their audience. It does not execute those operations. The later question-answering function does not receive an instruction to invoke these Actions merely because they exist.

## Think through a rename

Suppose the catalogue contains `Example Institute` and you later want a canonical ID with a separate display label. That is a modeling change affecting the dataset, object identity and relationship mappings. It is not safely reduced to editing one visible label in isolation.

Likewise, manually creating or deleting a training Entity could leave questions about its relationship to the pipeline's backing data and join pairs. Do not assume user edits automatically rewrite the original PDFs or every upstream dataset. This course does not exercise those lifecycle behaviors.

## Checks worth doing later

Confirm the selected backing dataset, inspect non-null unique names and verify representative Entity objects. Record generated Action configuration without claiming it proves successful mutation. Check the appropriate branch/indexing context if the type is saved but unavailable to consumers.

Keep the audience choice scoped to the learner as instructed. The training default is not a general recommendation for how a shared organizational catalogue should be maintained.

**What to remember:** a field used as a primary key is part of the object's identity contract. Explain why name-based deduplication in the first half directly affects which Entity objects exist, and why adding a type does not solve semantic ambiguity.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962317) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
