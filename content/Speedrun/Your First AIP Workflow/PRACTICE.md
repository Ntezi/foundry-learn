# Practice evidence — core workflow verified

**Status: Verified for the core question-to-answer path (completed September 14, 2026).** The input, enrichment pipeline, three deployed outputs, two object types, relationship, Vertex graph/template, learner-owned Logic function, and published Workshop question-to-answer flow below were executed in the learner's `app.hence.ai` enrollment. The separate Workshop evidence-list and graph widgets remain a supplemental exercise. The central two-hour daily allowance remains in force; these notes do not log study time or authorize a deadline change.

## Verified live context

- Course folder: `/Hence/Exploration/Marius/Application Developer Training/Speedrun/Your First AIP Workflow` (`ri.compass.main.folder.68a4cd03-1eea-4e24-8c84-ca1ee02859ca`).
- Official Learning Store product `Speedrun: Your First AIP Workflow` 0.1.0 installed successfully as the Marius copy (`ri.marketplace.main.block-set-installation.2083b34f-c76e-4e4f-ad97-84223d6dfcb9`).
- `Articles` is a PDF media set (`ri.mio.main.media-set.9ba6fdb0-df18-4d89-bfde-f5144950634e`) containing the intended five documents, 5.9 MB total.
- Batch pipeline `Document Processing Transform` uses Standard compute (`ri.eddie.main.pipeline.70222c02-e5bf-450f-bc6c-8a401f6acee0`).
- `Process PDFs` uses Digital Text extraction from `media_reference`, writes `content`, explodes pages with position, maps `position → pageNumber` and `element → content`, and drops `timestamp`. A one-document live preview completed with 58 page rows and five retained columns.
- `Extract Chunks` chunks `content` at 512 characters with zero overlap and the displayed default separators, explodes chunks with position, and maps `position → chunkNumber` and `element → content`. The live preview exposed six columns and reached the 500-row preview limit for the sampled input.
- `Create Chunk ID` concatenates `media_item_rid`, `pageNumber` cast to String, and `chunkNumber` cast to String with `_`, producing `chunkId`.
- `Use LLM` used Gemini 3.1 Flash Lite with a typed response containing `summary: String` and `entities: Array<String>`. A live tuberculosis title/author trial returned a grounded summary and relevant extracted names; this is one reviewed trial, not corpus-wide accuracy evidence.
- `Embed Chunks` extracts the generated summary and uses Text Embedding 3 Large to produce `embedding`; the preview displayed actual vectors while retaining chunk identity and source fields.
- The entity branch starts before embedding, explodes `response.entities`, preserves `chunkId`, deduplicates the catalogue by `entityName`, and retains `entityName` plus `chunkId` in the relationship branch.
- Outputs are `Chunks` (`ri.foundry.main.dataset.84ae6e73-4521-400c-8a17-b81c1776cca8`, 9/9 mapped), `Entities` (`ri.foundry.main.dataset.075035a8-8fac-4953-b2dd-87e3c36b0d73`, 1/1), and `Join Table` (`ri.foundry.main.dataset.8cd6498e-c491-425e-a43a-d004c4df0f10`, 2/2).
- Deployment build `ri.foundry.main.build.88e42ddc-9049-42bd-a4a3-a7c5de7c2bc8` succeeded on September 14 in 2m34s with all 15 stages complete. The embedding-model reference was imported and all outputs placed in one non-default job group because they share the cached LLM result.
- `(Marius) Chunk` uses `chunkId` as primary key, `summary` as title, and the original Articles media set as its Media Reference source. It indexed 578 objects. Ontology ID: `lydxpf6t.id-e5d97053-a0d0-6b32-1bab-94d3b879c474`.
- `(Marius) Entity` uses `entityName` as primary key and title. Its Create/Delete actions are restricted to Marius's current account. Ontology ID: `lydxpf6t.id-802628ee-9801-c080-06be-c814e3b121c2`; RID: `ri.ontology.main.object-type.16f612ee-bc94-47de-ba77-a7bd663ea8bc`.
- The many-to-many Entity–Chunk relation uses Marius's Join Table with `entityName` mapped to Entity and `chunkId` mapped to Chunk. Relation ID: `lydxpf6t.id-339c74d7-27e5-6208-b310-680bbf0f653f`; RID: `ri.ontology.main.relation.c05f1b0b-a386-4453-a8e2-726f3bcc9135`. Its initial sync was running when last observed.
- Vertex graph `Knowledge Graph` (`ri.opus.main.graph.9975632e-6d76-4aa7-880a-1ad0849f5d60`) was saved as V2 after adding one representative `(Marius) Chunk`, searching around to its five linked `(Marius) Entity` objects, verifying five relation edges and applying a Radial layout.
- Vertex template `Knowledge Graph Template` (`ri.opus.main.graph-template.05f60cf1-9323-4f49-bb5a-c77559dadd5c`) was saved in the course folder. It accepts `(Marius) Chunk` objects, traverses the learner-owned Chunk-to-Entity relation and applies a Radial layout. This verifies one controlled input; the planned two-input-set template test remains open.
- Learner-owned Logic resource `(Marius) Ontology Augmented Generation` (`ri.eddie.main.logic.f4c9687c-93a3-4d0a-a688-cda415706f49`) accepts required `userQuestion: String`. Semantic search targets all `(Marius) Chunk` objects through `Embedding`, returns ten objects and binds its query to `userQuestion`. The task prompt now binds the actual `userQuestion` variable plus the formatted `Content` property from the search results; the formatter passes at most ten objects separated by newlines. The grounded system prompt instructs the model to use only those references and report insufficient evidence.
- A live preview with GPT-5.6 Sol and the question `What factors influence tuberculosis treatment outcomes according to the supplied articles?` succeeded in 14.49 seconds. The returned answer cited retrieved evidence about drug resistance, number of effective drugs, rifampin, treatment supervision and completion. This proves the configured retrieval-to-generation path executes; it is not a clinical validation or a proof that every claim in the corpus is correct.
- The Logic function was bound to the default `Ontology` and published as version `1.0.0` on September 14, 2026. Published function RID: `ri.function-registry.main.function.26733d6e-7434-4ea9-9cb2-aa5bb6326df8`; API name: `mariusOntologyAugmentedGeneration`.
- Workshop module `(Marius) Research Assistant` was created in the learner's `Your First AIP Workflow` folder (`ri.workshop.main.module.7be29e5e-f76f-4512-b7aa-daef4e4b1ded`). It has a `User Question` String variable from a Text input and an `AIP Response` String variable backed by the learner-owned published Logic function, with `userQuestion` explicitly bound to `User Question`. Markdown renders the function output.
- Workshop version `0.2.0` was saved and published. In published View mode, the same controlled TB question produced a grounded Markdown answer and the earlier empty-query error cleared once input was supplied. This verifies the user-input-to-published-function-to-rendered-answer path. The middle evidence area has not yet been configured with `Relevant Chunks`, Object list and the `Knowledge Graph Template`; those display-path lessons remain open and are not implied by the successful answer path.

The build and indexing evidence validate the configured representation changes and availability of the outputs. They do not yet establish full-corpus uniqueness, complete extraction quality, corpus-wide semantic quality, or that every join key resolves correctly.

## P0 — Explain before executing

Draw the dataflow and name the row grain at each stage. Work the [review example](FIRST-HALF-REVIEW.md). Explain source content versus model summary, semantic similarity versus factual support, and entity catalogue versus relationship pairs.

Success means the learner can explain these distinctions and identify unresolved runtime checks. It does not require memorizing UI labels.

## P1 — Establish the input and training context

Locate the intended Learning Project and course folder. Confirm Pipeline Builder and AIP developer access. Use one input route: manual upload to Articles or the documented Marketplace alternative. Inspect the actual resource type and five intended documents; record identities and route used.

Expected evidence: usable input resource, readable representative documents and exact location. Failure diagnosis: separate upload/import, resource selection and permission failures.

## P2 — Validate PDF extraction, chunking and identity

Create the course batch pipeline with Standard compute and the intended Articles input. Follow Process PDFs, Extract Chunks and Create Chunk ID.

Inspect extracted text against representative source pages, including difficult layouts. Confirm page-position origin, chunk-size unit and overlap. Inspect sentence boundaries and retained media/page/chunk fields. Check non-null/unique chunkId on actual output. Record the effects of any source or chunking change instead of assuming IDs remain historically stable.

Expected evidence: accurate-enough source text for the exercise, explainable chunk layout and traceable unique identities. No corpus page/chunk count is prescribed without observation.

## P3 — Trial enrichment and embedding

Configure the source lesson's LLM prompt and response schema. Record actual model/settings. Trial varied rows: clear entities, no relevant entities, repeated names and qualified statements. Compare summaries and names with original content; distinguish structural validation from semantic correctness.

Create the summary embedding branch and record the embedding model. Verify the actual vector output and retained source fields. Confirm Get Entities branches from Use LLM before response is dropped. Do not claim current model names or dimensions from an old screenshot.

Expected evidence: reviewed trial outputs, known failure cases and an understood embedding-input contract. A few good rows are not a whole-corpus quality guarantee.

## P4 — Build and inspect the three outputs

Create Chunks, Entities and Join Table from their intended branches. Check row grain, duplicate/null names, duplicate pairs and keys unmatched to either target. Inspect actual empty/null-array behavior and preserve the distinction between valid empty extraction and processing failure.

Save and deploy all three outputs. If the documented cached-LLM grouping error appears, put them in the same non-default group. Inspect required references and the actual build report. Record successes and failures separately for each output, then inspect built data.

Expected evidence: a completed build plus structural and source-based checks. Build success alone is insufficient evidence of extraction quality or a functioning Ontology/application.

## Evidence to record later

Record date, enrollment, executing identity, Project/folder and resource IDs, source/model/configuration versions, step, expected behavior, actual result, evidence link, error/repair and learner reflection. Update [central progress](../../PROGRESS.md) only from observed execution or explicit learner confirmation. Do not turn these expected results into success claims before execution.

## P5 — Expose objects and verify links

Configure Chunk and Entity types from the intended outputs. Verify Chunk Id versus Summary, Entity Name identity, Media Reference against Articles and actual Embedding property configuration. Follow the enrollment's branch/proposal and indexing process where applicable. Record Entity Create/Delete Action configuration without treating it as execution.

Map Join Table to both endpoints. Verify known objects and a small set of expected links, then follow a Chunk back to its PDF. Record branch/context, indexing availability and any unmatched keys. Do not infer source quality from indexing success.

## P6 — Build and parameterize the Vertex view

Create the exploratory graph, add a controlled Chunk sample and Search Around to Entities. Save the Chunk-parameter template with its configured traversal and Radial layout. Test two input sets and verify the view follows them. Record template identity and expected associations; graph position is not evidence of causal importance.

## P7 — Preview and publish the answering function

Configure userQuestion String, Chunk Embedding search with ten results, Content formatting and Single completion. Inspect actual retrieved IDs, reference text and answer for supported, unsupported, ambiguous and time-sensitive questions. Test blank input and insufficient references. Record actual model/settings and available execution evidence.

Publish the function with the intended Ontology, display/API names and version where exposed. Do not claim published consumer behavior from a preview alone. No clinical correctness claim is inferred from the training examples.

## P8 — Bind and verify the application

Create User Question, Relevant Chunks with K 10, the object list, template-backed graph and function-backed AIP Response String. Verify the question reaches both paths and that changing it updates the intended display. Inspect empty/loading/error states and selected published resources.

Compare Workshop's retrieved Chunk IDs with Logic's actual references for a controlled run. The tutorial has separate searches; record any difference rather than assuming exact evidence correspondence. Save/publish Workshop and test View mode. Record the answer's actual support, not just successful rendering.

These additional checks extend the practice scope; they do not silently allocate extra hours or mark any prior work complete. Keep the existing daily limit and carry unresolved work forward explicitly.
