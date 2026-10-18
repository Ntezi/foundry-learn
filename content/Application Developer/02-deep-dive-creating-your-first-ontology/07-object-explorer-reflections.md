# Lesson 7 — Object Explorer Reflections

## Course Essentials
Object Explorer makes ontology data usable without requiring users to locate backing tables, understand join keys, or write queries. It supports object search, link traversal, and lightweight analysis of one object set.

## Tool-selection judgment
- Use **Object Explorer** for discovery, inspection, and simple filtering.
- Use **Quiver** for richer calculations, comparisons, timeseries, and visual analysis.
- Use **Workshop** for a repeatable operational workflow with a tailored interface.

The boundary is about task shape, not prestige. A one-off investigation does not need an application; a recurring decision process should not force operators to reconstruct filters every day.

## Practical Ontology Engineering
Usability is evidence about ontology quality. If users continually export data, memorize opaque IDs, or recreate joins, the semantic layer may be incomplete even if technically valid.

Weak: “Find the route table, join airport twice, then join runway.”

Improved: “Open the airline, follow Routes, pivot to Airports, then inspect Runways.”

## Deeper Mastery
An ontology acts as a cognitive compression layer: engineers resolve identity and relationship complexity once, then many users reuse that meaning. The abstraction is valuable only when it remains traceable to evidence—hence the next lessons on lineage.

## Deep Understanding Check
1. When would Object Explorer become unsafe or inefficient for an operational process?
2. What repeated user workaround would signal a missing link or property?

