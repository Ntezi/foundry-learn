# 05 — Shared ontologies and cross-organization work

*Sources: [Ontologies overview](https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/) · [Shared ontologies](https://www.palantir.com/docs/foundry/ontologies/shared-ontologies/) · [Cross-organization collaboration](https://www.palantir.com/docs/foundry/security/cross-organization-collaboration/) · [Migrating between ontologies](https://www.palantir.com/docs/foundry/ontologies/ontology-migration/) · [Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) · checked October 2, 2026 · Ready for Review*

[03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md#kestrels-setup) left a scenario open: *a large carrier wants to share shipment exceptions with Kestrel in a joint app*. This note runs that scenario as a **decision log**, from the first meeting to go-live. Each entry records the decision and the doc rule that forced it.

## The ask

Northwind Freight, one of Kestrel's carriers, offers to share its **delivery exceptions** (failed attempts, damaged parcels, address problems). In return, Kestrel shares the **promised delivery dates** for Northwind's parcels. Both companies want one app where their staff resolve exceptions together.

## Decision 1 — Do we need a shared ontology at all?

**[Docs]** "Organizations enforce strict separation between groups of users and resources." Each user is a **member of one** organization, and may be a **guest** of others. A private ontology serves "members and guest members of that one organization". Several *teams* inside one company are **not** a reason for a second ontology.

**Options considered:**

| Option | Verdict |
|---|---|
| Make Northwind staff **guests** of Kestrel's organization, and use Kestrel's private ontology | Rejected. Northwind would then be inside Kestrel's organization boundary. Every Kestrel project would need careful role grants to keep Northwind out |
| Exchange files by SFTP and build two separate apps | Rejected. That's no joint workflow, and the exceptions would be resolved twice |
| **A shared space and a shared ontology** with both organizations applied | **Chosen** |

**[Docs]** This matches the docs' own example (Sky Industries and Sunrise Airline): a shared ontology when "people in two or more organizations must work with the same objects".

## Decision 2 — Set up the organization side first

**[Docs]** These steps come from the cross-organization walkthrough, done by **enrollment administrators** in Control Panel:

1. **Create the partner organization**, optionally with collaboration settings and its own private space and ontology.
2. **Configure collaboration.** Make the organizations mutually **discoverable**, then set user and group discovery separately for each organization.
3. **Add the partner's identity provider**, assign its users to the organization, and set up **ingress** so they can reach Foundry.
4. **Grant partner administrators** their organization roles, through groups synced from their identity provider.
5. **Create a shared space.** The shared ontology is created with it, carrying **both organization markings**. "If you are unable to create a shared space, contact Palantir Support."
6. **Create a shared project** with both organizations applied. That needs the *Apply organization* permission for both. Groups for the project should be visible to both organizations.

**[Explanation]** Steps 1–4 apply when the partner joins **Kestrel's enrollment**, which is the docs' model. If Northwind had its own Foundry enrollment, this would be a different setup, which these pages don't cover.

## Decision 3 — Which types live where

**[Docs]** The 1:1 rule: "An ontology is mapped 1:1 with a space". **[Docs]** Links between object types in **different** ontologies "are not supported" ([06-01](../06-links/01-link-types-and-cardinality.md)). **[Docs]** A function's project can import **only one ontology** ([09-01](../09-functions/01-functions-on-objects.md#the-import-step-everyone-forgets)).

So everything the joint app links together must sit in the shared ontology:

| Type | Ontology | Data from |
|---|---|---|
| `DeliveryException` (new) | **Shared** | Northwind |
| `SharedShipment` (new): tracking number, promised date, status | **Shared** | Kestrel, a deliberately **narrow projection** of `Shipment` |
| `Shipment`, `Order`, `Customer` | Kestrel **private** | Kestrel |
| Northwind's internal driver and route types | Northwind **private** | Northwind |

**[Explanation]** Why a new `SharedShipment` rather than moving `Shipment`? Moving `Shipment` would take its links to `Order` and `Customer` with it, or break them. It would also expose every shipment property to Northwind. A projection carries only the fields both sides agreed to share, and only for Northwind's parcels.

**[Docs] If you do move types.** Resources can be **migrated between ontologies** (*Ontology Manager → Migrate resources*):

- **edits are preserved** by default;
- connected resources must move **together**, or the migration fails;
- migration changes permissions on the **resources**, not on the **underlying data**;
- you can't move types from a private ontology into the **default** ontology unless they started there.

## Decision 4 — Make the data visible, deliberately

**[Docs]** "Creating a shared ontology does not by itself make the underlying data visible to every applied organization." A dataset referenced from a private project into the shared project "continues to inherit the source Organization requirements until explicitly removed".

Steps:

1. Priya builds `shared_shipments` in Kestrel's private space: only Northwind's parcels, only the agreed columns.
2. She references it into the shared project.
3. She **stops inheriting** the Kestrel organization requirement on it. **[Explanation]** This is the single moment when Kestrel data becomes visible to another company. Kestrel's checklist requires Lena (data owner) **and** a security reviewer to approve it, and the approval is logged.
4. Northwind does the same for `delivery_exceptions`.

**[Explanation]** Use the same principle as [04](04-security-across-actions-functions-and-apis.md). Whatever enters the shared space should already be the **minimum**. Policies inside the shared ontology can filter reads, but they don't stop a Northwind user from exporting what they *can* read.

## Decision 5 — Permissions inside the shared ontology

**[Docs]** Shared Ontology resources follow the same project permission model as any other ([02](02-ontology-resource-permissions.md)). The shared ontology "holds the same organization markings and role grants as the shared space".

| Group | Visible to | Role on the shared project |
|---|---|---|
| `nw-kestrel-exceptions-builders` | Both organizations | Editor: Daniel and a Northwind developer |
| `nw-kestrel-exceptions-users` | Both | Viewer, plus the right to run the joint actions |
| Kestrel-only and Northwind-only admin groups | Own organization | Owner |

The joint actions are **Mark resolved**, **Reschedule delivery** and **Request new address**. Each has submission criteria that check the user's **organization** for organization-specific steps. For example, only Kestrel can confirm a new address with the customer. **[Explanation]** Write those checks positively ("organization *includes* Kestrel"). Never "is not Northwind" ([08-03](../08-actions/03-submission-criteria.md#the-trap-not-on-group-membership)).

## What happens to Kestrel's private ontology

Nothing structural. Kestrel's own Workshop apps continue to use `Shipment`. A Kestrel pipeline reads resolved exceptions back from the shared project into Kestrel's private space, to update `Shipment.isLate` and `ShipmentEvent`. **[Explanation]** Data crosses the boundary through **pipelines Kestrel owns**, never through links. That's what keeps the boundary easy to audit.

<!-- security-go-deeper -->
**Go deeper in the Security area:** [04 — Securing data and applications](../../Security/04-securing-data-and-applications/README.md)

---
[Module index](README.md) · Previous: [04 — Security across actions, functions and APIs](04-security-across-actions-functions-and-apis.md) · Next module: [13 — Backend architecture](../13-backend-architecture/README.md)
