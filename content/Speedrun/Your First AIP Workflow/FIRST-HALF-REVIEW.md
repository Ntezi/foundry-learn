# First-half review: from PDFs to an evidence foundation

**Scope: required lessons 01–25 plus optional 08a. Ready for your review.** The half ends after the transformation summary. Continuation was authorized on September 10. The Ontology, graph, Logic and application lessons are now available in the [second-half review](SECOND-HALF-REVIEW.md). Understanding review remains separate.

## Where to start

- [13 — Process PDFs](13-process-pdfs.md): files become page rows; understand arrays, structs and position.
- [14 — Extract Chunks](14-extract-chunks.md): why chunking helps retrieval and how it can lose context.
- [15 — Create Chunk ID](15-create-chunk-id.md): identity, collisions and stability across changes.
- [16 — Use LLM](16-use-llm.md): the output contract and why valid structure is not proof of truth.
- [17 — Embedding](17-embedding.md): the course embeds summaries, and similarity is not factual support.
- [20 — Resolve Entities](20-resolve-entities.md): what name deduplication accomplishes and what it does not.
- [22 — Define Join Table](22-define-join-table.md): many-to-many associations and reference integrity.
- [24 — Deploy Pipeline](24-deploy-pipeline.md): save, deployment, build and data correctness as separate milestones.

The setup notes are shorter than the core concepts. Read the [full index](README.md) in order when you want the complete procedure.

## Work through a tiny synthetic corpus

Imagine two PDFs. PDF A has two extracted pages: the first produces two chunks, the second one. PDF B has one page producing two chunks. There are therefore five chunk rows. These counts are invented for learning, not observations of the course PDFs.

Assign schematic identities A-p0-c0, A-p0-c1, A-p1-c0, B-p0-c0 and B-p0-c1. The notation is explanatory; the actual course concatenates the media-item RID and positions with underscores. Verify index origin in the real transform before displaying page citations.

Suppose the LLM returns these synthetic arrays:

| Chunk | Extracted names |
|---|---|
| A-p0-c0 | [Entity X, Entity Y] |
| A-p0-c1 | [Entity Y] |
| A-p1-c0 | [] |
| B-p0-c0 | [Entity X, Entity X] |
| B-p0-c1 | [Entity Z] |

If explosion emits one row per array element and no occurrence for the empty array, there are six occurrence rows, three distinct entity names, six raw pair rows and five unique pairs. Actual empty/null-array behavior must be checked in the installed transform. The duplicate X in B-p0-c0 is a deliberate defective model output for the exercise.

Notice that deduplicating the entity catalogue produces X, Y and Z but does not change the raw pair branch. The empty-list chunk can remain in Chunks even though it has no entity association. It may still be relevant through semantic retrieval.

The embedding branch uses each chunk's generated summary. If a summary omits an important term, a vector representing that summary may not retrieve the chunk for a question about that term, even though original content still contains it.

## Questions to answer in your own words

1. Why use a media set before building tabular datasets?
2. What does one row represent after PDF extraction, chunk explosion and entity explosion?
3. Why do page position and chunk position both appear in chunkId?
4. Does the key guarantee stable citations after changing chunk size or replacing a PDF?
5. What does the value 512 establish, and what settings still need checking?
6. Why does a valid response struct not establish correct extraction?
7. Does the course store an entity category for each extracted name?
8. Which text is embedded, and why can that choice affect retrieval?
9. Why must Get Entities branch from Use LLM rather than Embed Chunks?
10. What are the occurrence, distinct-name and raw/unique-pair counts in the synthetic example?
11. Does Drop duplicates resolve abbreviations and ambiguous names?
12. What does an entity-to-chunk link establish? What does it not establish?
13. Why must the join-table keys be checked against both output datasets?
14. What is the remedy for the specific cached-LLM shared-output grouping error?
15. What is still unproven after clicking Deploy successfully?

## Answer guidance

1. The PDFs are source media items. Their content must first be extracted into a form the pipeline can transform; references retain a route to the source.
2. A page associated with a document; a chunk within a page; then an entity occurrence associated with a chunk. Keeping grain explicit prevents incorrect counts and joins.
3. Chunk positions repeat across pages, and page positions repeat across documents. Media-item identity supplies the document scope.
4. No. The positional identity depends on the source identity and extraction/chunk layout. Historical reproducibility needs a deliberate version/provenance policy.
5. The course sets Chunk size to 512. The inspected text does not establish the unit or numeric overlap. Confirm those in the actual transform instead of assuming tokens or a particular overlap.
6. A schema checks representation. It cannot establish that each name occurs in the passage or that a summary preserved negation and qualifications.
7. No. Categories guide the prompt; the output is summary plus an array of entity-name strings, with no category field.
8. The generated summary. Omitted or distorted summary content can affect the vector and which passages are selected later.
9. Embed Chunks drops response on its branch. Use LLM still has both fields needed by the two downstream paths.
10. Under the stated explosion assumption: six occurrences, three names, six raw pairs, five unique pairs. The entity catalogue's deduplication does not deduplicate the other branch.
11. No such normalization, alias mapping or semantic disambiguation is shown. The operation creates a distinct-name catalogue.
12. It records an extracted association with a passage. It does not encode causation, agreement, treatment efficacy or any other typed relation between entities.
13. A pair can be structurally well formed while pointing to a missing Chunk or Entity. Check referential integrity and also compare representative associations with source text.
14. Place Chunks, Entities and Join Table in the same non-default job group, then apply, save and retry. Three separate groups do not meet the stated shared-group requirement.
15. Full execution success, usable built outputs, data quality, later Ontology configuration and application behavior. Check build history/report and output content separately.

## A useful debugging exercise

A user later receives an answer based on the wrong document. Trace the path backward: selected evidence, embedding input, generated summary, original chunk content, page extraction and source media identity. Identify which observation would distinguish a retrieval issue from incorrect source selection. Avoid changing the prompt before you know where the evidence became wrong.

## First-half review remains available

Check whether the explanations make sense without prior Foundry knowledge. Tell me where you still cannot explain why a step exists, where you would use it or what its limitations are. The second half builds on these three dataset contracts and is now available.

At the first-half checkpoint Learn showed **25/49 required lessons (51%)**, plus the optional import page viewed. The September 10 second-half reading brought it to 49/49. This reflects lesson viewing. [Practice](PRACTICE.md) remains **Not Started**; no PDFs were uploaded, no models invoked and no pipeline deployed in this notes phase.
