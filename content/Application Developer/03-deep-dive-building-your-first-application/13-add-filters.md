# Lesson 13 — Add Filters

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944285

## Build steps

Add a Filter list widget to the left section and set `All Shipments` as its input. Expose Origin Location Name, Destination Location Name, Departing Origin Date, Arriving Destination Date, and Total Unit Quantity. Rename the widget's filter-definition output to `Shipments Filter`.

Create `Filtered Shipments` as a new object-set definition starting from `All Shipments`, then apply `Shipments Filter` using a variable. Change the XY chart's layer input from `All Shipments` to `Filtered Shipments` and restore the arriving-date/day configuration if needed.

## Key distinction

The Filter list emits a filter definition, not an object set. This lets one filter be combined with others or reused against different object sets. The separate `Filtered Shipments` variable materializes the intended scope for downstream widgets.

## Verification

Filtering Houston Facility to New York Facility should update the chart. The course sample produces arrivals on seven days with four on 23 April; data may vary.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: completed on 2026-08-28.
- Evidence: the Filter list uses `All Shipments` and exposes Origin Location Name, Destination Location Name, Departing Origin Date, Arriving Destination Date, and Total Unit Quantity.
- Its output is named `Shipments Filter`; `Filtered Shipments` derives from `All Shipments` using that variable; the XY chart now consumes `Filtered Shipments` while retaining arrival-date/day/count configuration.
