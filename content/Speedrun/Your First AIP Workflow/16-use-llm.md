# 16 — Use LLM

## This model call prepares metadata for each chunk

Select **Create Chunk ID → Use LLM → Empty prompt**. The course asks the model to summarize a scientific-text snippet and extract selected entity names. This is batch enrichment of source passages, not the later question-answering function.

The input is the `content` column, inserted through the input-data selector using `/`. The output is a struct named `response`, containing `summary: String` and `entities: Array<String>`. This typed shape gives later transforms predictable fields to extract.

For a software engineer, it resembles an external service call that returns a typed DTO. The type constrains the response format, but you still need to evaluate whether its contents are accurate.

## What the course prompt asks for

The prompt requests a summary and names in five categories: biological specimens, harmful agents, healthcare organizations, treatments and symptoms. It excludes other categories, requests an empty list if none apply, asks for singular individual names without descriptive prefixes, and asks for no duplicates.

Use the original prompt on the linked lesson when implementing the walkthrough. Its purpose is to narrow the extraction target and make names easier to reuse. It does not return a category field for each entity: the actual output contains strings only. Do not later assume the Entities dataset already knows which category each name belongs to.

The prompt also does not establish a canonical identifier system. Two chunks might produce different aliases for the same concept. Asking for singular names helps consistency, but does not perform complete entity resolution.

## A successful schema is not a successful extraction

Consider a synthetic source sentence: “The laboratory compared Sample A with Sample B.” If the model outputs a well-formed entity list containing Sample C, the schema can still be valid while the extraction is unsupported. If it returns no entities, that might be appropriate under the category policy, or it might be an omission. You have to compare with the input.

Similarly, a summary can sound fluent while dropping a negation or limitation. Retaining original content allows later inspection. The generated summary should not silently replace the source as the final authority.

The course warns that duplicates can still appear and suggests deduplication. This is a useful general lesson: instructions express desired behavior; deterministic checks enforce what they can. Removing duplicate strings does not repair invented names or missing entities.

## Trial a small sample deliberately

The lesson selects a few input rows, uses **Use rows for trial run**, runs the prompt and inspects the results before applying it. Choose varied examples during practice: clear entities, no relevant entities, repeated names and a passage with important qualifications.

Compare each output with its content. Look for grounded names, omitted names, duplicate values, correct summary meaning and proper empty-list behavior. Record the actual model and settings. The course's GPT-4o example and alternative model names describe its walkthrough, not a guarantee of current availability in your enrollment.

The lesson explains that Pipeline Builder handles per-row calls and rate-limited parallelism. That saves orchestration work, but does not remove model latency, cost, failed rows or the need to review quality. A few good trial rows do not establish reliable behavior across the entire corpus.

## Why this response becomes a branching point

One downstream branch uses `response.summary` to create an embedding. Another uses `response.entities` to construct occurrence rows. If the response is wrong, both retrieval paths can inherit the error. This is why checking extraction quality before expanding the rest of the graph has high value.

**Remember:** structured output makes model results easier to process, not automatically true. Explain the difference between response-shape validation, duplicate removal and source-grounded semantic evaluation. None of these model calls has been executed during this notes phase.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962226) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
