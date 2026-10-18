# 30 — Summary — Configuring the Ontology

## The application now has a shared interface

The intended practical checkpoint is two indexed object types and their many-to-many relationship. Chunk objects expose identifiable passages and source context. Entity objects expose extracted names. The link supports navigation between them.

This gives app builders a shared model rather than requiring every widget or function to understand the original PDF-processing pipeline. It resembles a domain API: consumers use stable concepts while the producing workflow handles representation changes upstream.

## What is shared and what remains a responsibility

Reusing an Ontology type can reduce repeated modeling and integration work. It also means changes to identity, properties or links affect consumers. A new interpretation of entityName is not just a local pipeline cleanup if applications already rely on it as a key.

The course describes the underlying assets as high quality. That quality is an intended outcome, not a property conferred by saving them to the Ontology. Source extraction, model fidelity and reference integrity still require evidence.

A field can be indexed correctly and still contain a misleading summary. A link can be navigable and still represent an extraction mistake. The semantic layer organizes the data you provide; it does not automatically audit every claim.

## Actions are another part of the model

The summary notes that the Ontology can define and restrict updates through Actions. In this course, generating Entity Create/Delete Actions is distinct from giving the answering model editing tools. The implemented question path later uses search and a single completion.

Keep reading and writing responsibilities separate. An application that answers questions does not need to mutate the source knowledge merely to display an answer. Do not infer a write operation from a resource being called operational.

## Before moving to Vertex

During practice, verify known Chunk and Entity instances, their link and the media reference. Confirm the branch and indexing context, especially if the enrollment uses proposals. A successful schema save alone is insufficient evidence of queryable objects.

Once those checks pass, Vertex becomes a way to inspect the modeled information rather than a substitute for making it available. If no objects appear in a graph picker, investigate the model and access context before adjusting graph layout.

**Review exercise:** explain the whole handoff in one sentence: the pipeline produces rows, the Ontology maps them into typed objects and links, and consumers use that interface. Then identify which earlier assumption would be most damaging if it were wrong—chunk identity, summary accuracy or entity-name resolution—and explain its downstream effect.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1969298) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
