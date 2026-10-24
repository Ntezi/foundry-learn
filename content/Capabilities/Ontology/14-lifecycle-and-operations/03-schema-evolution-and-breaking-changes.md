# 03 — Schema evolution and breaking changes

*Sources: [Manage schema changes](https://www.palantir.com/docs/foundry/object-edits/schema-migrations/) · [Statuses](https://www.palantir.com/docs/foundry/object-link-types/metadata-statuses/) · [Viewing usage](https://www.palantir.com/docs/foundry/ontology-manager/view-usage/) · [Ontology cleanup](https://www.palantir.com/docs/foundry/ontology-manager/cleanup/) · [Action log](https://www.palantir.com/docs/foundry/action-types/action-log/) · [Materializations](https://www.palantir.com/docs/foundry/object-edits/materializations/) · [Configured Object Views](https://www.palantir.com/docs/foundry/object-views/config-overview/) · [Query functions](https://www.palantir.com/docs/foundry/functions/query-functions/) · checked October 3, 2026 · Ready for Review*

[04-04 Part B](../04-object-types/04-creating-and-editing-object-types.md#part-b--change-it-safely) covers the Ontology's own side of a breaking change: which changes count as breaking, and the migrations for **user edits**. That protects the **data**. This note covers the other side, the **consumers** built on the schema. It has two parts: a matrix of who breaks when, and a deprecation playbook worked through one Kestrel change.

## Part 1 — Who breaks when the schema changes

Rows are consumers; columns are changes. ✅ means unaffected, ⚠ means it needs attention, ❌ means it breaks until fixed. Each cell gives its basis: **D** = documented, **E** = our explanation.

| Consumer | Add property | Rename display name | Change type | Delete property | Change status to deprecated |
|---|---|---|---|---|---|
| **User edits** | ✅ | ✅ (D) | ❌ until a **cast** migration is chosen (D) | ⚠ **drop or move** migration if it was edited (D) | ✅ |
| **Action types** that write it | ✅ | ✅ | ❌ "update every action that writes it" (D, 04-04) | ❌ the rule references a missing property (E) | ✅ |
| **Action log** types | ✅ | ✅ | ❌ log property types are **fixed**; the action fails validation until you add a new log property (D, [08-07](../08-actions/07-consistency-reverts-and-logs.md#incident-4--who-changed-this-and-why)) | ❌ (E) | ✅ |
| **Interface** implementations | ✅ | ✅ | ⚠ the mapped type must still fit (E) | ❌ a required interface property loses its mapping (E, [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md)) | ✅ |
| **Functions** (TSv2 / Python with an OSDK) | ✅ after SDK regeneration | ✅ (code uses **API names**) | ❌ at compile time, once regenerated; old published versions keep old assumptions (E) | ❌ same (E) | ✅ |
| **OSDK apps** | ✅ once a new SDK version is generated | ✅ | ❌ (E) | ❌ (E) | ✅ |
| **Workshop** modules | ✅ | ✅ | ⚠ widget formatting and filters (E) | ❌ widgets referencing it (E) | ✅ |
| **Configured Object Views** | ⚠ **not added automatically** once edited (D, [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-5--daniel-configures-the-order-view)) | ✅ | ⚠ (E) | ❌ (E) | ✅ |
| **Automate** conditions | ✅ | ✅ | ⚠ the filter may no longer match (E) | ❌ (E) | ✅ |
| **Materializations** → downstream pipelines | ⚠ new column (E) | ✅ | ❌ column type changes downstream (E) | ❌ column disappears (E) | ✅ |
| **API-named queries** | ✅ | ✅ | ⚠ the query **always runs the latest tag** (D, [09-02](../09-functions/02-query-functions-and-ontology-edits.md#queries-and-the-api-gateway)) | ⚠ same | ✅ |

**[Explanation]** Three patterns stand out:

1. **Display names are free.** Everything in code and configuration refers to **API names** or IDs, which is why **active** resources forbid API-name changes ([03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md#statuses)).
2. **Edits are safe; consumers aren't.** The migration framework protects user edits, but nothing in it updates the action, function, view or pipeline that reads the property. Those breaks are your job.
3. **Deprecation breaks nothing.** That is exactly why it comes **before** anything is removed: announce early, remove last.

**[Docs]** The **Usage** tab is the tool for finding consumers: who read or wrote the type in the last 30 days, and from which app. It doesn't show code that hasn't run in that window, such as a monthly job. **[Explanation]** Search function repositories and pipelines for the property's API name as well.

## Part 2 — A deprecation playbook, worked once

**The change.** Kestrel's fraud team replaces the text band `riskAssessment.band` (`HIGH`/`MEDIUM`/`LOW`) with a numeric tier, `riskTier` (1–5), on `Payment`. Consumers include:

- the *High-risk payment hold* automation ([10-06](../10-applications/06-automate-and-ontology-events.md));
- *Approve refund*'s log ([08-07](../08-actions/07-consistency-reverts-and-logs.md));
- Tomás's Workshop app;
- the Delivery Desk agent.

| Step | What | Doc rule that makes it safe |
|---|---|---|
| **1. Add** | Add `riskTier` as a new property (Integer, required once backfilled). Keep `band` | Adding a property is **non-breaking** |
| **2. Fill both** | The scoring pipeline writes both `band` and `riskTier` for a transition period | — |
| **3. Announce** | `band` is a **struct field**, and statuses belong to object types, properties, link types, actions and interfaces. **[Explanation]** No field-level status is documented. So announce it in the field's display name ("band (deprecated)") and the struct's description, with the deadline and the replacement, and log the deadline in the governance review ([01](01-saving-reviewing-and-restoring.md#5-audit-trail)). For a whole **property** you would set the status to **deprecated** instead | **[Docs]** A deprecated status needs a reason and a deadline, and can name a replacement ([03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md#statuses)). The cleanup tool's *past deprecation date* flag covers **object types** only ([06](06-monitoring-and-cleanup.md)) |
| **4. Move consumers** | Using the **Usage** tab and code search, update each consumer in turn: <br>• the automation filter becomes `riskTier >= 4`; <br>• add a new log property `riskTierAtApproval` (log property types can't change); <br>• update the Workshop filters; <br>• update the agent tool description. <br>Do it all on **one global branch**, so consumers and schema merge together ([02](02-branching-and-proposals.md)). `Payment` is a core type, not a product output, so this happens **in each environment**: dev first, then prod ([04](04-marketplace-packaging.md#which-environment-changes-what)) | Automations, Workshop, functions and actions are all branchable ([02](02-branching-and-proposals.md#which-branching)) |
| **5. Verify** | No consumer reads `band` for one full reporting cycle, including the month-end jobs. Check the consumer list from step 4 and re-run the code search | **[Docs]** Usage metrics are per **object type and link type**, so the Usage tab shows who still uses `Payment`, not who reads `band`. **[Explanation]** Property-level use has to come from code search and the consumer list |
| **6. Remove** | Delete `band`. It's a **struct field**, so if it had user edits, choose **drop struct field edits** | **[Docs]** Deleting an edited struct field is breaking and needs a migration |
| **7. Clean** | Remove the transition code from the scoring pipeline | — |

**[Explanation]** The playbook works for any rename or type change. The rename `etaDate` → `promisedDeliveryDate` in 04-04 is the same seven steps with **move edits** in step 6. The pattern never edits an active property in place. That costs a few weeks of running both properties, and buys **zero downtime** for every consumer in the matrix.

## Changes this playbook can't soften

**[Docs]**

- **Primary key.** "The current schema migration framework does not support applying migration instructions on the primary key property." **[Explanation]** Changing the key is effectively a new object type. Build the new type alongside the old one, migrate consumers, and use the cleanup tool to retire the old one.
- **Over 500 migrations at once** must be applied in batches.
- **Failed migrations** show an error above the replacement pipeline. *Fix schema migrations* stages the extra migrations needed.

---
[Module index](README.md) · Previous: [02 — Branching and proposals](02-branching-and-proposals.md) · Next: [04 — Packaging with Marketplace](04-marketplace-packaging.md)
