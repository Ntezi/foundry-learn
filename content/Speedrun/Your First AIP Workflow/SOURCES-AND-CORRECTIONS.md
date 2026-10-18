# Sources and interpretation boundaries

First half inspected September 9; second half September 10, 2026. Primary source: the signed-in [Palantir Learn course](https://learn.palantir.com/speedrun-your-e2e-aip-workflow). Every first-half note links directly to its actual lesson. The [manifest](lesson-manifest.json) records those IDs and filenames.

## Coverage and evidence

The curriculum has 49 required lessons, an optional import alternative and optional feedback. All 49 required lesson bodies and the optional import page have now been read. The original midpoint was the transformation summary; second-half notes cover 26–49.

Learn started at 0/49, showed 25/49 (51%) after first-half viewing, and confirmed 49/49 (100%) after the second half on September 10. The portal marks viewed text lessons complete. No completion assessment, feedback form, Foundry exercise, model call, upload, installation or deployment was performed.

Firecrawl was available but could not resolve api.firecrawl.dev. The signed-in browser provided the actual lesson text. Embedded screenshots were not comprehensively inspected; screenshot-only settings are not invented. No source PDFs were downloaded or independently analyzed. Article titles and the CC0 label are reported as course descriptions, not independent licensing or scientific validation.

## Details that should not be overstated

| Lesson | Source behavior | Interpretation or check |
|---|---|---|
| 01 | Describes reliable answers without hallucinations | Grounding is not a guarantee; extraction, retrieval and generation can each fail |
| 07–08 | Five PDF inputs stored as Articles media set | Upload is separate from text extraction and model processing; no actual page/chunk counts are claimed |
| 08 | Transactionless write mode | Preserve course selection; detailed update/rollback semantics were not established by reading its name |
| 13 | Exploded position mapped directly to pageNumber | Verify index origin and relation to human-facing PDF/printed page numbering |
| 14 | Chunk size 512; describes possible overlap | Inspected text does not specify unit or numeric overlap; inspect current transform before practice |
| 15 | Concatenate media_Item_Rid, pageNumber and chunkNumber | Verify actual column spelling, non-null uniqueness and stability if source/chunking changes |
| 16 | response has summary String and entities Array<String> | Entity categories guide extraction but are not stored as per-entity fields; prompt constraints are not guaranteed output correctness |
| 16–17 | Course examples include GPT-4o and text-embedding-ada-002 | Examples are not a claim of current model availability; record actual model/configuration during practice |
| 17 | Embeds summary and drops response | Does not directly embed original content; entity branch must start from Use LLM |
| 19 | Explodes entity array | Check actual empty/null behavior; distinguish absent model result from valid empty extraction |
| 20 | Select entityName then Drop duplicates | Not complete semantic entity resolution; no alias/case/whitespace normalization is configured by the shown steps |
| 22 | Select entityName and chunkId | No explicit pair deduplication; catalogue uniqueness does not establish relationship uniqueness |
| 22–23 | Join table supports many-to-many connections | A single scalar FK is insufficient; the chosen link representation is a pair table. Other database representations exist |
| 24 | Shared cached-LLM outputs may require same non-default job group | Use the documented remedy for that actual error; do not claim a reproduced runtime failure or universal grouping requirement |
| 25 | Example build time a little over five minutes | Estimate only; verify the build report and output data |

## Teaching additions

Software-engineering comparisons, row-grain explanations, key-stability discussion, model-quality evaluation, relationship-integrity checks and the synthetic five-chunk example are explanatory additions. No generated example is presented as a real medical finding or a result from the supplied corpus.

The review example's counts were checked locally: five chunks, six name occurrences, three distinct names, six raw pairs and five unique pairs, under the stated one-row-per-array-element assumption. This is local arithmetic/data-structure validation, not a Foundry transform test.

## Before dependent practical work

Resolve actual access and resource identities, PDF extraction/index conventions, chunk unit/overlap, model availability, empty/null-array handling and output schemas. Inspect representative content and extraction quality before relying on derived summaries or associations. These are explicit runtime checks, not reasons to block the current notes revision.

[Review guide](FIRST-HALF-REVIEW.md) · [Practice plan](PRACTICE.md) · [Course index](README.md)

## Second-half source findings — September 10

| Lesson | Source detail | Interpretation boundary |
|---|---|---|
| 27 | Chunk Id key; Summary title; Media Reference configured against Articles | Identity, display and source access have separate roles. Indexing and branch availability need runtime checks |
| 27 | Restricted Main edits may use a branch/proposal; optional branch indexing | Follow actual enrollment process. No branch or merge was performed; notes do not grant approval to change Main |
| 27 | Default Embedding settings described as adequate in example | Do not ignore an actual runtime incompatibility or invent screenshot-only configuration |
| 28 | Entity Name key/title; Create/Delete Actions restricted to own user | Primary-key modification is not offered. Generating Actions does not execute them or give the LLM tools |
| 29 | Join-table mapping entityName to Entity and chunkId to Chunk | Availability and semantic correctness require separate checks |
| 34 | Chunk parameter plus one Search Around to Entity | Not an arbitrary recursive graph expansion |
| 38 | Search Chunk Embedding, ten results, format Content, Single completion, return Use LLM | Summary vectors rank the objects; original extracted Content supplies reference text. No Entity traversal or tool loop is configured for generation |
| 39–41 | Broader agent modes discussed in explanatory text | Those capabilities are not part of the Single completion implementation. Available traces are debugging evidence, not guaranteed access to internal model reasoning |
| 46–48 | Workshop independently retrieves Relevant Chunks; Logic only receives User Question | Displayed evidence is not guaranteed to equal actual generation references. Compare identities or deliberately share the retrieval contract |
| 47 | Static backing template, variable Chunk input | Fixed renderer resource can consume dynamic data |
| 48 | New String variable for Markdown, later called object set in one line | Preserve the explicit String/function contract; identify the inconsistent wording |
| 48 | Initial error expected before question input | Does not justify ignoring persistent errors after valid input |
| 49 | Conclusion describes all relevant information and trustworthy answers | Top-ten retrieval is bounded and grounding is fallible; neither completeness nor medical validation is established |

All 24 second-half lesson texts were inspected in the signed-in browser. Screenshots were not comprehensively inspected. No model responses were generated or scientifically evaluated. The two-search example in the review guide is synthetic; it is not a reproduced mismatch. No exact debounce timing, citation schema or guaranteed ranking equivalence is invented.

Learn's course overview exposed the certificate link after 49/49. Optional feedback and conclusion question checkboxes were not submitted. The previous course files and navigation are preserved in the [archive](../../study-backups/2026-09-10/aip-second-half-depth/notes-before.tar.gz).
