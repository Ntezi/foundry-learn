# 01 — Course Introduction

## What AIP is doing in this workflow

This course turns a small library of PDFs into information that a person can search, inspect and ask questions about. AIP supplies the model capabilities inside a larger Foundry workflow. The useful product is not merely a fluent response: it is an answer connected to the documents that support it.

You will prepare the PDFs in Pipeline Builder, create Chunk and Entity objects in the Ontology, explore their connections in Vertex, configure an AIP Logic function and expose the result in Workshop. This first half stops after the pipeline outputs, so you can understand the evidence foundation before building the question-answering interface.

## Connect it to your software-engineering background

Think of the architecture as a document-processing backend plus a domain API and an application. The original PDFs resemble source files in storage. Extracted text and chunk rows are intermediate representations. The Ontology later gives those rows business-facing types and relationships. AIP Logic composes model behavior with that context, while Workshop presents an operator interface.

The key difference from a conventional deterministic service is that some derived fields come from a model. A summary and list of entities may be well-formed while still omitting or misrepresenting source information. You need both schema checks and semantic review. A successful response is not the same thing as a correct extraction.

## Why the pipeline comes first

Sending the entire library with every question would make the question path depend on repeatedly processing lots of irrelevant text. Preparing smaller, identifiable pieces makes it possible to select useful evidence and trace it back to its origin. Later retrieval can use semantic similarity and entity connections to find candidate material.

This preparation is not training a new foundation model. The course uses existing models to transform your data and later work with selected context. Creating an embedding column is also different from fine-tuning model weights.

The course assumes short chunks contain individual pieces of information. Treat that as a working simplification: a chunk can contain several claims, an incomplete sentence or only a table heading. Inspect the actual boundaries before treating a row as a self-contained fact.

## Reliability is a workflow property

The introduction describes answering reliably without hallucinations. Grounding an answer in retrieved documents can reduce unsupported answers and improve inspection, but does not guarantee their absence. Retrieval can miss the relevant passage, extraction can lose a qualification, and generation can misread the evidence. Later evaluation should test those stages independently.

**Remember:** the pipeline prepares evidence, the Ontology organizes it, and the application makes it usable. The quality of the final answer depends on all three. After reading this lesson, explain why a polished chat interface cannot compensate for incorrect PDF extraction.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961844) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
