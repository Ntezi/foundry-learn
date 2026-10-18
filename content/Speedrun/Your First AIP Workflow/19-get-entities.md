# 19 — Get Entities

## Start from the branch that still has the response

Select **Use LLM** again and create a second transform path named **Get Entities**. Extract `response.entities` into an `entities` column, then add **Explode array** and name its output `entityName`.

This branches before Embed Chunks drops response. If you start from the wrong node, the required entities field may no longer exist. Follow the dependency graph rather than the order in which lesson pages happen to appear.

## An occurrence is not a unique entity

Suppose chunk C1 has the synthetic list `["Entity A", "Entity B"]` and C2 has `["Entity B"]`. Explosion produces three occurrence rows:

| chunkId | entityName |
|---|---|
| C1 | Entity A |
| C1 | Entity B |
| C2 | Entity B |

The original chunk identity remains attached to each occurrence. Entity B appears twice because it was associated with two chunks. That is meaningful relationship information, not automatically a duplicate to delete globally.

The next lesson creates a distinct entity-name list on another branch. Keeping occurrences first allows you to produce both the entity catalogue and the chunk-to-entity pairs later.

## Row multiplication is doing useful work

Before explosion, one row holds a collection of names. After explosion, each row can be treated as one association. This is similar to normalizing a nested API response into relational child rows so it can be joined and queried.

The prompt requests an empty list when no relevant entities are found. During practice, inspect how this transform handles empty and null arrays. They are different situations: an empty result can be valid extraction output, while a missing response may reflect an error. Do not interpret both as a successfully processed chunk with no relevant information.

A chunk without an entity association can still exist in Chunks and potentially be useful to semantic retrieval. The entity graph is one route into evidence, not proof that unlinked chunks have no value.

## Validate before reducing information

Inspect sample occurrence rows against the original content and LLM response. If the model returned the same name twice for one chunk, explosion can preserve repeated pairs. Deduplicating the later Entities list does not automatically remove those duplicate pairs from the join-table branch.

**Review question:** why must Get Entities retain chunkId even though the final Entities dataset keeps only names? Because this occurrence-level branch supplies the relationship pairs. Once the association is discarded, a distinct name list cannot reconstruct which chunks mentioned it.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962234) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
