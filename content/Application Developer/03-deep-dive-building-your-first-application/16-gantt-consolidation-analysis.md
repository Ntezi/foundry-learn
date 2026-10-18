# Lesson 16 — Find Shipments for Consolidation Using a Gantt Chart

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944312

## Decision rule

Two shipments are consolidation candidates when they share origin and departure date, share destination and arrival date, and their combined quantity fits within one vehicle's capacity.

## Build steps

Enable tabs on the lower section and name them `Product Shipments` and `Schedule`. Add a Gantt chart to Schedule. Configure its data layer from `Filtered Shipments`, using Departing Origin Date as event start and Arriving Destination Date as event end. Add Total Unit Quantity and Vehicle Unit Capacity to hover properties.

## Why Gantt

Aligned bars make identical schedules visually obvious. The hover details then provide the capacity evidence needed to decide whether an apparent schedule match is feasible.

## Verification

Filter St. Louis Facility to New York Facility and confirm that same-length, aligned shipment bars can be compared with quantity and vehicle capacity.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: authorized but not yet performed. Blocked on 2026-08-28 because the authenticated Foundry browser session expired and redirected to Palantir sign-in.
