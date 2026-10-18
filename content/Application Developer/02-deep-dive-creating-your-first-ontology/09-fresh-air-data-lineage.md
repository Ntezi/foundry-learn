# Lesson 9 — Fresh Air Data Lineage

## Course Essentials
The exercise starts from Fresh Air in Object Explorer, opens its lineage, adds seven OFT object types, expands their parents, and lays out the graph. The observed system has 11 uploaded inputs, 35 derived datasets, and seven principal business object types.

## Why these steps exist
Starting from an object anchors lineage in a business concept. Adding related types widens the boundary. Expanding parents reveals provenance. Layout changes presentation, not semantics, but reduces cognitive load.

## Under the hood
An object type is backed by indexed datasource data. The graph connects semantic resources to the datasets and transformation logic that materialize them. The ontology does not replace pipelines; it stabilizes their outputs into reusable concepts.

## Practical Ontology Engineering
Do not expand everything indiscriminately in a large graph. Begin with a question and a bounded slice: one property, object type, incident, or proposed change. Record source ownership and transformation boundaries.

Weak architecture lets every consumer independently clean airport data. Improved architecture centralizes authoritative integration, then publishes the Airport type for reuse.

## Deep Understanding Check
1. Why can two object types share an upstream dataset without meaning the same thing?
2. What would you inspect before rebuilding a stale ontology datasource?

