# 02 — Granular policies

*Sources: [Manage granular policies](https://www.palantir.com/docs/foundry/platform-security-management/manage-granular-policies/) · checked October 23, 2026 · Ready for Review*

A **design guide** for the one page that explains the engine under both restricted views and object security policies. The Ontology area writes object security policies in [12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md); restricted views are in [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md). This note is the shared rule set: what a policy may compare, what it costs, and what it does **not** do.

**[Concept]** A granular policy is "a set of rules and logical operators that compare user attributes, columns or properties, and values to determine which data the user can see". It's a **template**: when an application asks for data (Contour, say), the template becomes a query that returns only the rows or objects matching that user. The same engine serves restricted views (datasets) and object security policies (objects).

## Mandatory first, policy second

**[Docs]** The page's clearest sentence: a granular policy "filters which rows a user can read; it does not extend to downstream outputs or exports". A marking on the backing dataset does propagate. "The two controls serve different purposes and should generally be used together. Do not remove an inherited marking on the assumption that the granular policy already controls access."

**[Explanation]** Why this matters in practice: a user who can read 1% of the rows can still derive, export or copy those rows into something the policy doesn't govern. The marking is what follows them. The policy decides *which* rows; the marking decides *who may ever hold* rows of this kind. [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md) is the full model.

## Five questions before writing one

**[Docs]** How do you want to restrict access? Which **user attributes** can the policy use? Which **columns or properties** could it depend on? Which **markings** propagate through the pipeline but might be removed when the resource is created? How will **new users** get permission?

### The recommendations, with why

| **[Docs]** Rule | **[Explanation]** Why |
|---|---|
| **Keep it simple.** Write the policy down first; find the minimum set of conditions | Every condition is something a reviewer must verify and a future change can break |
| **Policy columns must be non-null.** Null rows are inaccessible to **everyone** and break syncs and downstream processes (Phonograph syncs are named) | A null compares equal to nothing, so no user's attribute matches it |
| **Leverage the pipeline.** Compute columns that make the policy easy | A join or a case statement is testable in a transform; the same logic inside a policy isn't |
| **Use a dedicated policy column.** Separate the logic that decides the policy from the business columns | A business column gets renamed or reformatted for business reasons; a column that exists only for the policy doesn't |
| **Use attributes.** From SSO or a user manager | The identity provider already knows the user's region or department; copying it into groups is a second source of truth |
| **Use markings** alongside | See above |

## What a policy can compare

**[Docs]** Supported user attributes:

| Attribute | Note |
|---|---|
| User ID | Foundry's unique ID |
| Username | From the identity provider at login |
| Group IDs; group names | All groups, **direct and inherited** |
| Authorized group IDs | Advanced; relates to scoped sessions; "Contact your Palantir administrator" |
| Organization marking IDs | The **marking** UUIDs of the user's organizations (primary and guest), not the `ri.multipass..organization` IDs |
| Marking IDs | All markings the user may view |
| Custom attributes | Whatever the identity provider is configured to send |

**[Docs]** Two hard rules. Users, groups and organizations are referenced by **UUID** in both the policy column and the definition: "Specifying names instead of IDs is not supported to prevent renaming-related issues". And **never write NOT conditions** on group, marking or organization membership: "Using a NOT condition in these circumstances is a misconfiguration." The reason is scoped tokens, which carry only a subset of a user's permissions; a token lacking the attribute the NOT checks would **pass** the condition and get more than intended.

**[Explanation]** The NOT rule is the same trap the Ontology area flagged for action submission criteria ([08-03](../../Ontology/08-actions/03-submission-criteria.md#the-trap-not-on-group-membership)): write what a user **must have**, never what they must lack. The mechanism is now explained: absence of evidence (a scoped token) is not evidence of absence.

### Comparisons

| Comparison | Sides |
|---|---|
| Equal | Both single-valued, same type |
| Intersects | At least one side a collection; same type |
| Subset of | At least the right side a collection |
| Superset of | At least the left side a collection |
| Less than, less than or equal, greater than or equal, greater than | Both single-valued, same type; **not available in object security policies** |

**[Example]** Kofi's regional access in [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md) is an *Equal*: the user's `region` attribute against the shipment's `warehouseRegion` property. A policy that lets regional **managers** see several regions would be *Intersects*: the user's `regions` attribute (a collection) against the row's single `region` value.

## What a policy costs

**[Docs]** At most **ten comparisons** per policy, and a weight budget:

| Comparison | Weight |
|---|---|
| A constant against a field | 1 |
| A **collection** against a field | 1,000 |
| A **marking** condition | 3,000 |
| Limit | Sum under **10,000** |

**[Docs]** The page's example: user ID against a field (1) plus all the user's groups against a group column (1,000) is 1,001. It also admits the limit "provides little protection against a policy that could overwhelm weight limits"; weight errors go to Palantir Support.

**[Explanation]** Read the weights as a cost model for the query the template turns into. One collection comparison can expand into a large `IN` list; three marking conditions alone exceed the budget. A policy that needs many collection comparisons is telling you to precompute a policy column in the pipeline.

## Keeping the policy true

**[Docs]** Granular policies "introduce a set of assumptions about the data that backs them" and is only correct while they hold. The page's answer is a **checking step upstream** of the resource:

- **Invariants** that fail the build if false. The example: whenever `event_occurred_in_state` is `NY`, `state_name` must be `New York`.
- **Statistics** with expected ranges. The example: a policy mirroring an organization hierarchy; if more than **20%** of the hierarchy changes between daily builds, stop and have the policy owners check.

**[Docs]** These checks protect the **upstream** data the policy reads. They do not extend the policy downstream; for that, pair it with a marking or CBAC.

**[Docs]** Two management goals: **transparency** (everyone responsible for data access knows the policies and how they interact with the data) and **robust change management** (review before applying).

## For Kestrel

**[Example]** Kestrel's policies are the Shipment regional policy and the Customer PII property policy ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)), and Kofi's `region` attribute now comes from the identity provider ([01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#for-kestrel)). Additions *adopted* in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)):

- **A dedicated `policyRegion` column** on the shipments dataset, computed in `Commerce [Transform]` from the warehouse, rather than comparing against `warehouseRegion` directly. The business column can change when Kestrel renames a region; the policy column changes only when someone edits the policy transform.
- **An invariant transform** just upstream of the Ontology-facing shipments dataset: `policyRegion` is non-null for every row, and equals one of the regions in the warehouse reference table. A null would hide the shipment from **everyone**, including Ama's team, which is a worse failure than a wrong region.
- **A statistics check:** if the share of shipments per region shifts by more than 20% between builds (the page's own threshold), the build stops. Kestrel's regions don't change that fast; a shift that size means a warehouse mapping broke.
- **No NOT conditions anywhere**, including the Northwind shared ontology's submission criteria, which 12-05 already writes positively.

---
[Module index](README.md) · Previous: [01 — Markings and classification-based access controls](01-markings-and-classification-based-access-controls.md) · Next: [03 — Property security markings and cover pages](03-property-security-markings-and-cover-pages.md)
