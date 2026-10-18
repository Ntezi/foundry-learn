# 09 — Summary — Uploading the Data

## The checkpoint is a usable source corpus

At this stage of the practical walkthrough, the intended result is a training Project and folder containing the Articles input. The documents are available for processing, but their contents have not yet become searchable Chunk objects or model-generated answers.

The course summary uses completed-work language because it follows the upload instructions. In these study notes, treat that as the expected practical checkpoint. We have read the steps; we have not performed the upload or verified a Foundry media set.

## Manual upload versus recurring ingestion

Manual import is appropriate for a small, fixed learning corpus. A real document library may receive additions, corrections and removals. That introduces questions about how changes are detected, what gets reprocessed and how downstream data remains consistent.

The lesson points to Data Connection for recurring batch and streaming ingestion. The useful distinction is between acquiring source data and transforming it. A connector can bring a new PDF into Foundry; the document-processing pipeline still needs to extract and enrich it. Conversely, a well-designed transformation cannot process a source document that was never ingested.

Do not infer that deploying the upcoming batch pipeline automatically watches every external source. Scheduling and ingestion configuration need their own evidence.

## Access travels with the data workflow

The summary introduces Project-based discretionary sharing. For learning, understand that the place where resources live affects who can discover, view or edit them. That does not exhaust every security mechanism on the platform, nor does it prove a later user can access every derived object or model capability.

A practical application must serve users who can access the evidence they are expected to inspect. An answer linked to an inaccessible source is difficult for that user to verify. This is a design consideration for later application work, not a permission change performed here.

## A simple handoff to transformation

Before starting the next module, be able to state: which Articles resource is used, what documents it contains, how it was provisioned and whether the PDFs are readable. Those four facts provide a much stronger handoff than “the upload screen looked right.”

You will next change the representation from files to page rows, then chunk rows. Keep the original evidence reachable while creating representations optimized for computation.

**Understanding check:** if the corpus changes tomorrow, which parts of the workflow need attention? Consider ingestion, reprocessing, output rebuilds and downstream consumption separately. This tutorial's manual upload does not define all of that lifecycle for you.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1968763) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
