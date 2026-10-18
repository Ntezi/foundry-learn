# Lesson 15 — Provide Product Shipment Details via a Table

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944311

## Build steps

In the Layout hierarchy, add a section inside the right-side section below the chart. Add an Object table using `Filtered Product Shipments`. Include Shipment Name, origin and destination names, departing and arriving dates, Product Description, Quantity, and Vehicle Name. Sort by Product Shipment Name and fit columns horizontally.

## Layout refinement

Use compact padding on the top-level page and right section. Enable headers for chart and table sections. Configure:

- Chart: `Product Shipment Arrivals`, callout style, flow-end icon, Sepia 3.
- Table: `Shipment Details`, callout style, path-search icon, Indigo 3.
- Filter section: `Filters`, callout style, filter icon, Gray 5, collapsible.

## Why the table matters

The chart reveals patterns; the table supplies the object-level evidence needed to validate a decision. Both use the same filtered variable, so overview and detail remain synchronized.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: authorized but not yet performed. Blocked on 2026-08-28 because the authenticated Foundry browser session expired and redirected to Palantir sign-in.
