# Lesson 19 — Mark Multiple Shipments Using Functions

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944316

## Why a Function

The point-and-click action handles one straightforward object mapping. Batch updates require iteration over an object set, so the course uses a TypeScript ontology-edit function and a function-backed action.

## Repository and code

Create a TypeScript Functions code repository named `Functions`, import the username-suffixed Shipment object type, and confirm its generated API name and property API names. In `index.ts`, use `OntologyEditFunction`, `Edits`, `ObjectSet`, and the actual Shipment API type. Define a public `markShipmentsForConsolidation` method that accepts `ObjectSet<ShipmentType>`, materializes it with `.all()`, and sets every object's `status` to `Eligible for Consolidation`.

The decorators declare that the function edits the Shipment object type. The return type must be `void` because function-backed actions express edits rather than return a result. Previewing in the repository shows proposed edits without writing them to the Ontology.

## Release and integration

Commit the code, tag a minor version, release it, and wait for successful checks. Create a function-backed action named `Mark Multiple [<username>] Shipments for Consolidation`, restrict submission to yourself, and save it to the ontology. Update the Workshop button to call the new action, default its Shipments parameter from the selected-object-set variable, enable Gantt multiselect, and rename the variable/button to plural forms.

## Verification boundary

The course's final test multi-selects two Houston-to-Chicago shipments and submits the action. No repository, release, ontology action, Workshop change, or write-back was performed in this notes task.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: authorized but not yet performed. The Functions repository, release, function-backed action, Workshop rewiring, and write-back test remain unperformed because the authenticated Foundry browser session expired and redirected to Palantir sign-in on 2026-08-28.
