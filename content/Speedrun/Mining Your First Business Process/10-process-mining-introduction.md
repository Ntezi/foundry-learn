# 10 — Introduction

*Module: Process Mining · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Connect historical events to business objects

The next module uses Machinery to turn the supplied logs dataset into a Log object representation associated with Claim objects. The process can then be mined and visualized through the Ontology.

The business entity and the log entry are different things. A Claim persists through several stages. A log records one state-entry event for that claim. The relationship lets an application move from a claim to its history and interpret each historical event in the context of the correct entity.

## Think of correlation before visualization

If you have worked with distributed tracing, a correlation identifier ties separate events to one request or operation. Here `claim_id` ties state-entry events to the claim undergoing the process. It is a similar purpose, though the course is not claiming that its records are distributed trace spans or a complete event-sourced system.

Once events are grouped by claim and ordered using valid timestamps, successive recorded states describe an observed path. Across claims, recurring state changes can be summarized as transitions in a graph.

That is a conceptual explanation of the input-to-map reasoning, not documentation of Machinery's exact internal algorithm. Handling duplicate or equal-time events remains a practical configuration/data check; do not infer hidden tie-breaking rules from the graph's layout.

## Current state and historical transitions answer different questions

Current state helps locate present work. Historical transitions show where work has moved. A claim currently approved may have spent most of its elapsed time under investigation. Counting only current objects would not reveal that earlier delay.

Conversely, an old investigation event does not prove the claim is still under investigation today. Compare the complete available history with the current object and its freshness. Each representation needs to be interpreted according to its role.

## A mined map is evidence, not a verdict

A graph can identify paths worth investigating. It cannot reveal events absent from the source or prove the organizational cause of an observed delay. Missing logs can make a path look shorter; inconsistent state labels can make it look more complex.

The lesson describes monitoring current entities in real time. That is a capability whose usefulness depends on the data-update path. This notes pass does not establish streaming ingestion or fresh production monitoring.

## Why keep the generated resources visible?

Automatically creating the Log type saves authoring effort, but the generated type and data are still dependencies you may need to debug. The later renaming lesson traces those resources back to the original dataset. This is especially valuable when several processes generate similarly named artifacts.

**Remember:** a process map is the last link in a chain of identity, event semantics, time interpretation and data availability. Verify the earlier links before explaining the shape of the map.

**Review question:** why can two claims in the same current state have different process histories? They can arrive at different times, follow different paths or revisit states. Current status is a snapshot, not a path.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102796) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
