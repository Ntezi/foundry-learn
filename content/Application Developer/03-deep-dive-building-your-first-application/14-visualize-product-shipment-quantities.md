# Lesson 14 — Visualize Product Shipment Quantities

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944290

## Linked-object traversal

Create `Filtered Product Shipments` by starting from `Filtered Shipments` and traversing the link to the username-suffixed Product Shipment object type. This converts the selected journey scope into the line-item scope needed for product quantities.

## Multi-layer chart

Add a second bar layer titled `Product shipments`. Use `Filtered Product Shipments`, bucket `Arriving Destination Date` by day, replace count with sum of `Quantity`, and segment by `Product Description`. Customize the Y axes so shipment count and product quantity use different scales. Convert the original shipment-count layer to a dashed Gray 1 line.

Name axes `Count of Shipments` and `Product Quantities`, format large numbers with grouping, add a top legend, and map Blue Triangles, Red Squares, and Yellow Circles to Blue 3, Red 3, and Gold 3.

## Design insight

Two measures with orders-of-magnitude differences should not share one unlabeled scale. Layer type, axis assignment, legend, and semantic color all reduce misinterpretation.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: authorized but not yet performed. Blocked on 2026-08-28 because the authenticated Foundry browser session expired and redirected to Palantir sign-in.
