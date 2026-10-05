# 03 — Object and property security

*Sources: [Managing object security](https://www.palantir.com/docs/foundry/object-permissioning/managing-object-security/) · [Object and property security policies](https://www.palantir.com/docs/foundry/object-permissioning/object-security-policies/) · [Restricted-view-backed object types](https://www.palantir.com/docs/foundry/object-permissioning/configuring-rv-access-controls/) · [Multi-datasource object types](https://www.palantir.com/docs/foundry/object-permissioning/multi-datasource-objects/) · [Access control propagation](https://www.palantir.com/docs/foundry/security/access-control-propagation/) · checked October 2, 2026 · Ready for Review*

The **data** layer from [01](01-two-layer-permission-model.md): which objects, and which property values, a user can read. The note starts with a decision guide, then applies it to three Kestrel requirements, then lists the rules that bite.

## Two families of mechanism

**[Docs]** There are two ways to get row-, column- and cell-level security:

| | **Object and property security policies** (recommended) | **Datasource policies** (restricted views + MDOs) |
|---|---|---|
| Configured on | The **object type**, in its Security tab | The **datasets**: a restricted view for rows; an MDO's separate datasources for columns |
| Row level | **Object** security policy | Restricted view policy |
| Column level | **Property** security policy | One datasource per sensitivity, combined into an MDO ([04-02](../04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos)) |
| Cell level | Both together | Restricted view + MDO |
| Policy changes take effect | "Near-instantaneous" | After a **pipeline rebuild** |
| Streams | **Supported** | Restricted views work on **datasets only** |
| Global Branching | Supported | — |
| Protects the raw dataset outside the Ontology | **No**: scoped to the Ontology | **Yes**, e.g. reads in Code Workspaces |
| Types with **no** backing datasource | **Required** | Impossible |

**[Docs]** The docs recommend security policies "in most cases". Datasource policies remain right when:

- the **backing dataset is used outside the Ontology** and needs row-level control there; or
- you need **MDOs for other reasons**, such as different conflict-resolution strategies or build schedules per datasource.

**[Docs]** A migration tool moves a restricted-view-backed type onto its backing dataset plus matching policies. It doesn't support:

- MDOs;
- several materializations, or a restricted-view materialization;
- range comparison operators or numeric constants in the policies;
- group, organization-marking or static-marking IDs used as user properties.

**[Explanation]** This shifts earlier advice in these notes. [02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) and [08-06](../08-actions/06-action-permissions.md) used restricted views for Kestrel's row-level needs. For new types, Kestrel now defaults to **object security policies**, and uses restricted views only where the raw dataset needs them.

## How a read is decided

**[Docs]** A user sees an object if they have:

1. **Viewer on the object type**;
2. a pass on the **granular policy**, if one is configured;
3. a pass on any **marking, organization or classification** checks.

With a security policy in place, users **don't need** Viewer on the backing datasources. On the legacy datasource-derived model they still do, which "defeat[s] the decoupling". That is one reason to migrate first ([02](02-ontology-resource-permissions.md)).

**[Docs]** Property policies sit **on top**:

- Users who fail the object policy see **no object**.
- Users who pass it but fail a property policy see **null** for those properties.

## Three Kestrel requirements

**R1 — Kofi sees shipments for his region only.**

- *Mechanism:* an **object security policy** on `Shipment`, with a granular policy comparing the user's `region` attribute with `Shipment.region`. **[Docs]** Avoid `NOT` on memberships, the same warning as for submission criteria ([08-03](../08-actions/03-submission-criteria.md#the-trap-not-on-group-membership)).
- *Service users:* a service user has no `region` attribute, so it fails this policy unless it has its own branch. The customer portal needs one ([10-04](../10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get)). So does any automation owned by an application that touches shipments. Write each branch positively, for example *user is the portal service user*.
- *Order isn't regional.* Kestrel keeps `Order` without row-level security, because orders can ship from several regions. Regional restriction applies to **shipments**.
- *Why not a restricted view:* the shipments dataset isn't read outside the Ontology, and the policy should change without a rebuild when Kestrel opens a new region.
- *Test:* **[Docs]** **Test policies** checks a chosen user against a chosen object, **before saving**. You can also edit the property values the policy reads, to try hypothetical objects.

**R2 — Customer contact details are PII.**

- *Mechanism:* a **property security policy** on `Customer.email`, `phone` and `addresses` (the array of structs from [05-03](../05-properties/03-structs.md)), carrying the `Customer PII` marking.
- *First, stop the inherited marking.* The customer dataset inherits `Customer PII` from `/raw` ([02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)), and the object security policy inherits it from the dataset. If nothing changes, **only PII holders see any Customer object**. Following the docs' Passenger example, the object policy stops inheriting `Customer PII`, and the property policy puts it back on the PII properties only. **[Explanation]** This is the declassification step R3 warns about. It's acceptable here only because the property policy re-applies the marking where it matters.
- **[Docs]** Requirements:
  - an object security policy must exist first;
  - the **primary key can't be in a property policy**;
  - a property can belong to **at most one** property policy;
  - the combined granular-policy comparison weight must stay under **10,000**.
- *A copy elsewhere is also PII.* `Order.deliveryAddress` is a struct on **Order** ([05-01](../05-properties/01-properties-and-base-types.md)). Customer's policy doesn't protect it. Order needs its own property policy on that property, with the same marking. This is the propagation point from [04](04-security-across-actions-functions-and-apis.md) at small scale: each copy of a value needs its own protection.
- *Consequence:* Kofi sees the customer and their order history, but `email` is null. **[Explanation]** Apps must treat null as "possibly hidden", not "missing". The same lesson as option A in [04-02](../04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos).

**R3 — EU customers are visible only to holders of `EU Customer Data`.**

- *Mechanism:* the **mandatory-control property** `rowMarkings` from [05-06](../05-properties/06-edit-only-required-and-mandatory-control.md#mandatory-control-rows-that-carry-their-own-markings), used **inside the object security policy's granular policy**. **[Docs]** The Passenger example in the docs does exactly this with a VIP marking.
- *Two routes to the same property.* 05-06 described the **datasource route**: a marking-backed **restricted view** compares the user's markings with the column. Here the type is backed by the plain dataset, and the **object security policy** does that comparison instead. You pick one route per type. Kestrel uses the policy route, the default from this note.
- **[Docs] Inheritance.** An object security policy **inherits all mandatory controls from its datasources** by default. You can add more, or remove inherited ones. The Passenger example removes the inherited PII and VIP markings so non-holders can see the object, then re-applies them with finer granularity.
- **[Explanation]** Removing an inherited marking is a declassification decision. Do it only when a policy re-applies the protection.

## Rules that bite

**[Docs]**

- **Read-time only.** Granular row and column controls "filter what a user can read" and don't extend to downstream outputs or exports. **Mandatory** controls inside a policy *do* continue to apply to derived data ([04](04-security-across-actions-functions-and-apis.md)).
- **Materializations.** Types with object security policies can only be materialized to **datasets**. The **most restrictive** markings apply: all datasource markings, the policy markings, and markings from every mandatory-control property used. A new policy marking only applies to transactions committed **after** it is added. So rebuild the materialization, and mark it, to protect older transactions.
- **Downloads.** For types saved in a project, download permission is checked on the **object type**. For legacy models it's checked on the **datasource**.
- **Restricted views and edits** (datasource policies). Editing a property the view's policy reads can **change who sees the object** in the Ontology, while the raw row stays visible as before. The docs' example reassigns a ticket's group. On OSv2 you must be able to **see the restricted view** to see its objects.
- **External resources.** A **media reference** property secures the *reference*, not the media item. If the media set's permissions are looser, users could fetch the item directly. Secure the media set too.
- **Testing limits.** You can't test **derived property** visibility. Organizations you don't belong to aren't fully evaluated in tests.
- **Who can edit policies.** Owner of the object type: on project-based permissions, **Owner on the project**.

## Correction to module 08

[08-06 Q1](../08-actions/06-action-permissions.md#q1--can-someone-edit-an-object-they-cant-see) used a restricted view for `ChargebackQuery`. `ChargebackQuery` is created only by actions. **[Docs]** A type without a backing datasource "require[s] an object security policy". So if it really is action-only, the restricted view isn't available at all: the policy is the only mechanism. 08-06 has been updated to match.

---
[Module index](README.md) · Previous: [02 — Ontology resource permissions](02-ontology-resource-permissions.md) · Next: [04 — Security across actions, functions and APIs](04-security-across-actions-functions-and-apis.md)
