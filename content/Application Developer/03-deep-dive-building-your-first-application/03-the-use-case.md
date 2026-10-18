# Lesson 3 — The Use Case

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944238

## Business problem

Shipment managers need visibility into upcoming supply-chain movements and a way to identify wasteful shipments that could be consolidated. The target Shipment Operations Center must support both diagnosis and action in one interface.

## Ontology model

- Product describes a kind of good.
- Product Shipment represents a quantity of one Product.
- Shipment groups multiple Product Shipments into one Vehicle journey.
- Location represents factories, warehouses, and other physical nodes.
- Vehicle carries a Shipment and has a capacity.

The one-to-many Shipment-to-Product Shipment relationship is central: a manager evaluates the schedule at Shipment level but needs product quantities and vehicle capacity to make a safe consolidation decision.

## Success criteria

The finished app should show upcoming shipments, break them down by product, filter the operational scope, expose schedule and capacity details, and capture the decision to mark eligible shipments for consolidation.

## Status

- Palantir Learn lesson: completed.
- Foundry changes: none required.
