# Lesson 18 — Mark a Shipment for Consolidation Using an Action

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944315

## Selection and action

Enable selection in the Gantt layer and store the selected object set in `Selected Shipment`. In the same ontology used for Marketplace installation, allow edits on the username-suffixed Shipment object type. Create an action type that modifies Shipment and statically maps Status to `Eligible for Consolidation`. Name it `Mark [<username>] Shipment for Consolidation`, restrict submission to your own user, remove the unused Status UI parameter, and save it to the ontology.

Add a success-intent button above the Gantt chart. Configure it to call the action and default the Shipment parameter from `Selected Shipment`. This wiring removes redundant user input while keeping the action form as the controlled submission boundary.

## Conditional formatting

Color the Gantt events from the Status property. In Ontology Manager, add a first-match rule that renders `Eligible for Consolidation` with Warning intent, then an always-true Light Gray 1 catch-all. After saving ontology changes, refresh Workshop and add Status to the hover tooltip.

## Verification without write-back

Before submission, selection should populate the action form with the chosen shipment. The course's final test submits actions for two compatible shipments and verifies orange formatting; that write-back was intentionally not executed here.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: authorized but not yet performed. Enabling edits, creating an action, changing formatting, publishing the next Workshop version, and submitting actions remain unperformed because the authenticated Foundry browser session expired and redirected to Palantir sign-in on 2026-08-28.
