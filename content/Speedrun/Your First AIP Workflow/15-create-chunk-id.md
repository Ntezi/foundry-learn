# 15 — Create Chunk ID

## Stable identity connects the later workflow

The future Chunk object needs a primary key. The course builds `chunkId` from the media-item RID, page position and chunk position. This makes each derived passage addressable and lets the join table refer to it later.

The identifier answers “which chunk?” It does not answer “what does this chunk mean?” Two chunks with similar text may still have different identities because they came from different documents or locations.

## Build the course key

Create **Create Chunk ID** from Extract Chunks. Add **Concatenate strings**, use `_` as the separator and combine:

1. The course's `media_Item_Rid` column.
2. `pageNumber`, cast to String.
3. `chunkNumber`, cast to String.

Name the result `chunkId`, apply and close. Inspect the actual input schema if the generated media-item column's spelling differs; do not silently substitute the media-set identity for the item identity. Every PDF in one media set shares that set, so using the set alone would weaken the key.

A schematic example is `document-A_2_3`. It means the chunk at position 3 on page position 2 of document A under the pipeline's indexing convention. It is not a literal Foundry RID or proof that the user-facing page is page 2.

## Why all three components matter

`chunkNumber` repeats on different pages. `pageNumber` repeats across documents. Their combination with the document identity is intended to distinguish each passage in this extraction layout. Later practice should check non-null values and uniqueness over the actual output, rather than treating a plausible formula as sufficient evidence.

The course prefers readable combinations where possible because they help diagnose collisions. This is useful advice for the exercise, not a universal prohibition on hashes or generated IDs. Other applications may require different identity strategies, especially when inputs change over time.

## Identity stability depends on the transformation

A position-based key is stable only while the relevant document identity and extraction/chunk layout remain stable. Changing the chunk size can change which text occupies a position. Replacing or reimporting a PDF can also affect media identity or page layout.

Therefore, the same-looking key design is not automatically a durable citation policy across every corpus revision. If historical answers must remain reproducible, consider document versions and pipeline configuration as part of provenance. Those are supplemental design questions, not features already implemented by concatenation.

Also check how null components and separators behave. A key being a String does not prove it is unique, nonempty or unambiguous. Assertions about those properties need data evidence.

**Review exercise:** why would `pageNumber_chunkNumber` collide in a multi-document corpus, and why would changing chunk size matter even with the media-item RID included? The first omits document identity; the second changes the passage associated with a positional identifier.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962225) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
