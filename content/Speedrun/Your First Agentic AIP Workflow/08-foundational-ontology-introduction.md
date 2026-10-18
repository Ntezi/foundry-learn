# 08 — Introduction

*Module: Install Foundational Ontology & Understand Agentic Workflow · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Build on a working business model

This module installs an existing Ontology and operational application. Its purpose is to let you focus on adding AI behavior to a process that people can already perform manually. The course explicitly states that all supplied data is notional and only for training.

The application lets a user inspect candidate characteristics and trial criteria, then record an eligibility decision. This manual path is valuable: it establishes what the AI-assisted path is trying to reproduce. Without it, you could build an impressive model call that does not match how the business actually works.

## What the foundation saves you from rebuilding

The previous end-to-end course developed the data-to-application chain. Here, a Marketplace product supplies that foundation. You still need to understand what it contains: the Patient and Clinical Trial object types, the application's selection context, and the operation used to modify a decision.

Think of joining an existing codebase with a domain model and a working UI. Your task is to enhance one operation. You would not normally replace the database, rebuild every page and invent another domain command before understanding the current one. The same restraint is useful here.

An installed bundle is not a black box you should trust without inspection. Installation can succeed before downstream data is ready, and a reusable package can have inputs that need binding in your environment. The next lesson deals with those dependencies; this lesson establishes why they are needed.

## Learn the manual baseline first

When you later open the application, trace one candidate from the main table into the review overlay. Identify where the protocol comes from, where patient details appear, which state is currently stored, and which Action would change it. You do not need to submit a decision merely to learn the interface.

This inspection gives you a baseline for debugging. If the manual view lacks relevant data, the agent cannot reliably reason from that missing evidence just because it uses a model. If the manual Action rejects a value, sending the same invalid value from Logic will not make the business operation correct.

## Where this approach transfers

In an existing support or procurement application, identify a repetitive interpretation step while retaining the established domain operation. That reduces duplicated business behavior and gives both people and software a common way to update the record. This is a general engineering lesson, not a second official exercise.

**Check your understanding:** what should you understand about the installed application before writing the agent? The decision's inputs, the meaning of each result, the identity of the target object and the operation that records the result. Familiarity with the screen alone is not enough.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278622) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
