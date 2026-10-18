# 18 — Add Output for Chunks

## Define a dataset boundary

Select **Embed Chunks → Add output → New dataset**, then name the output **Chunks**. This turns the branch's result into a named dataset that later stages can consume. The output node is part of the pipeline definition; the dataset still needs a successful build before its contents are established.

This is comparable to publishing a derived table from a data job. Intermediate previews help author the transformation, while the output is the resource another component will reference.

## What one Chunks row should mean

One row represents a chunk from a particular document page under the extraction layout. Important fields include `chunkId`, source identity/reference, page and chunk positions, original `content`, generated `summary` and `embedding`. Inspect the actual schema rather than assuming the note is a complete exported schema listing.

The original text and summary have different roles. Content is the extracted passage to inspect; summary is model-generated metadata used by the embedding step. Keeping both makes it possible to detect whether an attractive summary misrepresented the source.

The Chunks dataset is not yet an Ontology object type. The second half will configure that semantic representation. A dataset's existence alone does not make its rows automatically available in every Ontology consumer.

## Use expectations to make assumptions visible

The lesson notes that output configuration supports expectations such as non-null and unique values. Useful candidates here include a non-null, unique `chunkId` and checks for the fields required downstream. Choose enforcement behavior deliberately in the actual UI; these notes do not claim that checks have already been configured or that every expectation always blocks a build.

A syntactically valid embedding array does not establish that retrieval works well. A non-null summary does not establish fidelity to content. Data expectations can enforce structural contracts, while source comparison and retrieval evaluation address meaning.

## Diagnose unexpected counts

More rows than PDFs are expected because pages and chunks expand the data. The important comparison is whether the count is consistent with extraction and chunking, not whether it equals five. Unexpectedly zero or very few rows should lead you back to media selection and PDF extraction.

Likewise, duplicate keys are more serious than repeated words. Two overlapping chunks can legitimately share text, but two distinct rows intended as separate Chunk objects should not accidentally share the same primary-key value.

**Remember:** an output dataset is a handoff contract. Before the next half, be able to explain its row grain, identity, source fields and model-derived fields. Those facts matter more than the friendly name Chunks.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962230) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
