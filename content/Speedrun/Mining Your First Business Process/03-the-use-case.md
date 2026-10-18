# 03 — The Use Case

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Turn the complaint into questions you can investigate

The course places you at an insurer facing complaints about slow claims. You need to understand an unfamiliar process without reading thousands of log rows individually. The two stated questions are what is causing the delay and how large the problem is.

Those questions are related but require different evidence. A process map can show where claims travel. Counts describe the population. Timestamps help quantify waiting or elapsed time. Explaining the cause usually requires examining the affected cases and their operational context as well.

## Avoid diagnosing from a large node alone

Imagine a support queue containing 100 tickets. That might indicate a bottleneck, a recent burst of arrivals or a normal stage through which most tickets pass. Compare how long tickets remain there and how quickly they leave. A count is a stock at a point in time; throughput is movement over an interval; duration is elapsed time for an entity or visit. They are not interchangeable metrics.

In a claims process, a terminal state such as approved can accumulate many objects simply because completed claims remain in the dataset. A high count in that state does not mean claims are stuck awaiting approval.

This is a supplemental reasoning example. We have not inspected the later course investigation or identified its actual bottleneck, so these notes do not invent an answer to the scenario.

## The intended architecture

The use-case page describes ingesting data, exposing business entities through the Ontology, mining historical logs and building a Workshop application for investigation. Its manual-upload wording differs from the subsequent concrete lesson, which installs a Marketplace package. Follow that package route for this version of the exercise.

The source calls the Ontology the organization's API. A useful interpretation is a common domain interface for applications: Claim objects, Customer objects and their relationships expose business meaning above raw tables. It is not a claim that one generic REST endpoint is created by naming an object.

## Ask for evidence before assigning a cause

Suppose many claims spend a long time under investigation. The next questions include whether the pattern is recent, whether it affects all claims or a subset, and whether the logs reliably record entry and exit. Missing exit events can make completed work look unfinished. Different timestamp conventions can distort durations.

Use the process view to form a hypothesis, then inspect representative cases and the underlying source. A correlation with a customer attribute is not proof that the attribute caused the delay. The business owner may know about exception handling or an external dependency that is not represented in the logs.

**Remember:** a useful finding includes scope, time window, metric definition, affected objects and supporting evidence. “This looks slow” is the beginning of an investigation.

**Review question:** why should you distinguish the largest state population from the slowest stage? Population reflects arrivals and accumulation as well as departures; duration and throughput reveal different aspects of process behavior.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102614) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
