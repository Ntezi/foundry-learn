# 12 — Renaming Automatically Created Ontology Artifacts

*Module: Process Mining · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Trace first, rename second

Machinery can create a Log object type and its relationship to the process entity. It can also create a process-entity type in other setups, but this exercise reuses the installed Claim type. Do not infer that it creates another Claim type merely because the lesson lists that optional capability.

Generated names can become confusing when several processes exist. The goal is to make the correct artifact recognizable without losing track of where its data comes from.

## Follow the source's verification path

In the process's View mode, open its Claim object from the upper-left panel. The lesson calls the resulting management application OMA and later refers to Ontology Manager. Use the resource-management view reached from the process, rather than searching blindly for the first similarly named Log type.

In the link-types graph, select the Claim-associated Log type. Open its Datasources tab and inspect the backing dataset, named Process Log Datasource by default in the source. Use its menu to Explore Data Lineage.

Follow the lineage to the original claim logs dataset. Select that source node, expand View node properties and check its Location. This verifies that the generated data comes from the intended course installation.

```text
Original claim logs at the intended location
                  |
      Generated Process Log Datasource
                  |
             Log object type
                  |
       relationship to Claim objects
```

This is a conceptual dependency map. Record the actual resource identities and lineage visible in your enrollment during practice; no live lineage was inspected here.

## Why this is stronger than a display-name check

Two datasets can share a name while residing in different installations. A Log type can also retain a generic generated name. The lineage and source location answer which data actually backs the artifact, not merely what someone called it.

The technique transfers directly to software debugging: trace the configured dependency before changing it. Renaming the wrong Log type can make the system more confusing while leaving the intended process untouched.

## Make the name useful after verification

Return to the correct Log type's Overview in Ontology Manager. Change its singular name to something like `(<username>) Claim Log`, update the plural name consistently, and follow Save, Save to ontology or Save to branch as shown by the context, then Save changes.

These are future exercise instructions. The note does not assume the branch/save context in your enrollment and does not claim that a live Ontology was modified.

The source demonstrates changing names, not rewriting every technical identifier or dataset name. Avoid assuming that display-name changes imply API-name changes or a different data source. Verify the properties you actually intend to change.

## What the lesson teaches beyond tidying

An automatically generated dependency is still part of your system. You need to be able to identify it, explain its source and understand which consumer uses it. That is why this lesson belongs after mining and before application work: the operator-facing application will rely on these resources.

**Review question:** a Log type has the desired new name, but its backing source is another learner's dataset. Was the task successful? No. The semantic label is clearer, but the resource is still the wrong dependency. Correct identification must precede the rename.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102845) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
