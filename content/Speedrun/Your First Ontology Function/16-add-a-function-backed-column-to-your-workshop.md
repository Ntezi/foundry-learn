# 16 — Add a Function-Backed Column to Your Workshop

## What you are wiring together

The released function produces an object-keyed map. The Object Table already has Clinic rows. This lesson connects the two so a manager can compare the metric beside each clinic's ordinary properties. Think of it as configuring a frontend component to consume a typed backend response.

The table does not learn the DSO algorithm. It needs a compatible function, appropriate inputs, matching Clinic identities, and a display format. Keeping the calculation outside the widget makes it easier to inspect and reuse, while the widget remains responsible for presentation.

## Course configuration, with the purpose of each step

1. Refresh the Workshop application after the function release succeeds. This gives the editor an opportunity to discover the released function; refreshing cannot repair a failed release.
2. Select the Clinic Object Table and choose **Add column → Function-backed property**. This tells Workshop that the values come from computation rather than a stored Clinic property.
3. Select `functionColumnDaysSalesOutstanding` and inspect the selected version. The expected course release is `1.0.1`.
4. Resolve any required input configuration against the actual consumer contract. The Client-only course snippet and documented object input differ, as explained in lesson 15. Do not assume the picker has accepted it until you observe that result.
5. Rename the column to Days Sales Outstanding and configure numeric formatting with the custom unit **Days**. This makes the number interpretable without changing its value or return type.

For example, 40.514563 can be displayed with two decimal places and a Days suffix. The underlying result remains numeric. Returning a string such as `"40.51 Days"` would change the function contract and interfere with numeric comparisons. Formatting belongs at the presentation boundary.

## Diagnose the symptom at the correct layer

If the function is absent from the picker, investigate release status, visibility, output type and signature before changing its arithmetic. If every row is empty, check whether the returned object type and object specifiers match the Clinic objects in this table. An installation with a similar display name can still be the wrong type.

If only some rows lack values, compare displayed identities with map keys and examine the first-page limitation. A missing key is different from a calculated zero. Filling missing values with zero would hide incomplete coverage and could mislead the manager into believing a clinic has an excellent result.

If every row shows the same value, first inspect query scope and clinic names. It is possible for equal results to be legitimate, so equality alone is not proof of a bug. Use a clinic whose source totals you can distinguish manually.

## Filtering does not rewrite the function

A table filter changes what the user sees. It only narrows function work when the function receives and uses a corresponding input. The course function independently fetches a Clinic page, so do not promise that filtering reduces its queries. This distinction is useful whenever a dashboard has several widgets that appear to share context: visual proximity does not establish a data dependency.

**Review exercise:** a clinic appears in the table but its DSO cell is empty. Name two checks before editing the formula. Good answers include checking its object specifier in the returned map and checking whether the Clinic query retrieved that object. Later [P2](PRACTICE.md#p2) records the evidence; no live table configuration is claimed here.


**Go deeper in the Ontology area:** [05 — Properties and values](../../Ontology/05-properties/README.md)

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131741) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
