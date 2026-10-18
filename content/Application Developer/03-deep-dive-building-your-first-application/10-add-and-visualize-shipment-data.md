# Lesson 10 — Add and Visualize Shipment Data

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944271

## Core architecture

Workshop widgets are arranged in sections and powered by typed variables. Data comes from Ontology objects, not directly from datasets. Widget outputs can become inputs to other widgets, making a module a typed dependency graph.

## Build steps

Create an object-set-definition variable named `All Shipments`, starting from the username-suffixed Shipment object type. In the larger right section, add a Chart: XY widget. Configure its first bar layer with `All Shipments`, use `Arriving Destination Date` on the X axis, bucket by day, and retain count as the aggregation.

## Why this design works

The object-set variable separates data scope from presentation. The same scope can later be filtered, traversed, or reused without rebuilding the chart logic. Static typing prevents incompatible values from being wired together.

## Verification

The chart should show daily arriving-shipment counts across all locations. The course sample has its highest count on 24 April 2024, though installed data may vary.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: completed on 2026-08-28.
- Evidence: created `All Shipments` from the installed Shipment type (83 current objects) and an XY bar chart using `Arriving Destination Date`, daily bucketing, and count aggregation.
