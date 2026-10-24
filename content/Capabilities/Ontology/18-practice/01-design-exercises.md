# 01 — Design exercises

*Sources: our own practice material built on [Design 01–04](../11-design/README.md) · written September 25, 2026; split from `Ontology Design/06` on October 2, 2026 ([MIGRATION](../MIGRATION.md)) · exercises prepared, none attempted*

Everything here is **[Explanation / Example]**: our own practice material built on pages [01](../11-design/01-best-practices.md)–[04](../11-design/04-validation.md). The drill structure follows the Validation page. The scenarios and questions are invented.

Exercises A–E are **design-on-paper** and need no Foundry access. Exercise F, a **drill in Foundry** for the later practice phase, is now in [02 — Validation drill kit](02-validation-drill-kit.md). Record results only after actually doing them.

---

## A. Find the entities (domain-driven design)
**Objective:** turn a flat dataset into a domain model.
**Input:** a fleet-maintenance export, one row per repair:

```text
repair_id, opened_at, closed_at, vehicle_vin, vehicle_make, vehicle_model, depot_code, depot_city,
mechanic_id, mechanic_name, part_numbers (comma-separated), part_costs (comma-separated), labour_hours, status
```

**Task:**
1. List the real-world entities.
2. List the links, named from both directions.
3. Decide what the comma-separated parts become.
4. Name every property properly.

**Expected shape (check yourself after):**
- Repair (event), Vehicle, Depot, Mechanic and Part. Repair → Part is many-to-many *with* cost and quantity, so it's an **object-backed** link (a Repair Line).
- Vehicle → Depot as the vehicle's home depot. Note that this may differ from where a repair happened.
- Comma lists become separate linked records, never parallel arrays.

**Common failure:** keeping `mechanic_name` on Repair. Renaming a mechanic then means editing every repair.

## B. Pick the tool (Golden Hammer)
For each requirement, choose action, batch pipeline, streaming pipeline, automation, function or schedule, and give one sentence of justification.
1. Nightly total spend per depot.
2. A mechanic marks a repair "waiting on parts" and gives an expected date.
3. When a repair has been waiting on parts for more than 5 days, notify the depot manager.
4. Live location of vehicles from GPS pings every 5 seconds.
5. In a Workshop view, show the cost of a proposed repair plan that the user is editing right now.
6. `vehicleDisplayName = make + model + last 4 of VIN`.

*(Suggested: 1 batch pipeline; 2 action; 3 automation; 4 streaming pipeline; 5 function; 6 batch pipeline, not a function-backed column.)*

## C. Spot the anti-pattern
Name the anti-pattern and the fix:
1. `Asset` with `assetKind ∈ {vehicle, licence, building}` and 140 properties.
2. `Customer_SAP`, `Customer_Salesforce`.
3. `Contract_2024` and `Contract_2025` object types.
4. 14 actions on `Employee`, all named "Update …".
5. Properties `_ingested_at`, `_batch_id`, `etl_hash` on `Order`.
6. A pipeline scheduled every minute to find tickets with no owner and assign them.
7. `Item.value`, `Item.type`, `Item.date`.
8. `Marketing Contact` and `Support Customer` for the same people.
9. `PublicPatient` and `RestrictedPatient`.

*(1 God Object · 2 System Silos · 3 Time Machine · 4 Action Sprawl · 5 Kitchen Sink · 6 Golden Hammer → automation · 7 Misnomer · 8 Department Silos · 9 security by duplication, [02 §6](../11-design/02-structural-guidance.md) → one type with row- and column-level policies.)*

## D. Normalize or derive?
For each value, choose **pipeline pre-compute**, **derived property** or **documented denormalization**:
1. A depot's count of open repairs, where repairs are opened and closed through actions.
2. A vehicle's age in years, from its manufacture date.
3. An order's customer region, shown on 2 million orders in a heavily used table.
4. A mechanic's total labour hours this month, from repair objects edited through actions.

*(1 derived, since it changes through actions · 2 pipeline, or derive at read time; stable input · 3 derived by default; at 2M rows a documented denormalization **may** be justified, with an explicit sync strategy · 4 derived, watching performance.)*

## E. Extend without modifying (open/closed)
The core `Vehicle` type is used by six apps. A new team needs emissions-test data for diesel vehicles only (test date, result, certificate number, next due date).
**Task:** design the extension. Say what you add, what you *don't* touch, and whether an interface is justified.
*(Suggested: a linked `Emissions Test` type (event) and possibly an `EmissionsTested` interface if other types, such as generators, will need it. `Vehicle` stays unchanged. The new team owns the new type.)*

---
[Practice index](README.md) · Previous: [Case study 01 — Applied to our courses](../17-case-studies/01-course-ontologies-reviewed.md) · Next: [02 — Validation drill kit](02-validation-drill-kit.md)
