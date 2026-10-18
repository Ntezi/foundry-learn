# 28 — Introduction

*Module: Data Connection: REST API · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Goal

Pull data from a **REST API** into a Foundry dataset.

## REST in one paragraph

REST APIs expose resources at URLs and use HTTP methods (**GET, POST, PUT, DELETE**). They're simple, scalable and widely supported, which makes them the usual way external systems offer data and services. The process applies to **any system with HTTP endpoints**.

## What's different in this module

There's no point-and-click sync. You make the source **importable into Code Repositories** and write a Python **external transform** that calls the API. Docs: [REST APIs](https://www.palantir.com/docs/foundry/data-integration/rest-apis/), [external transforms](https://www.palantir.com/docs/foundry/data-integration/external-transforms/).

**Review question:** why is code needed for this source but not for S3 or Postgres? An API's endpoints, authentication and response shape are specific to that API, so you write the request and parsing logic yourself.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864447) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 29 — Open the Data Connection Application.
