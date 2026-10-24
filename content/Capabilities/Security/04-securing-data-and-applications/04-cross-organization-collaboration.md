# 04 — Cross-organization collaboration

*Sources: [Cross-Organization collaboration](https://www.palantir.com/docs/foundry/security/cross-organization-collaboration/) · checked October 23, 2026 · Ready for Review*

The **enrollment administrator's checklist**. [Ontology 12-05](../../Ontology/12-security-and-governance/05-shared-ontologies-and-cross-org.md) already read this page for the Ontology side and decided Kestrel's Northwind Freight setup (shared space, shared ontology, `SharedShipment` projection). This note is the platform side in full: the organization, its identity provider, the spaces, and the one transform step that actually moves data across the line.

**[Docs]** The scenario: Sunrise Airline wants to share its maintenance issues with Sky Industries so both can fix recurring delays. An **enrollment** "represents an instance of the Foundry platform and is made up of one or more Organizations"; most companies have one organization, and multi-organization enrollments exist "to enforce strict silos between groups of users", for example several companies on one platform. Every user is a member of one organization and may be a guest of several ([01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md)).

## The checklist

| # | Step | **[Docs]** detail | Who |
|---|---|---|---|
| 1 | **Create the organization** | In Control Panel; the creation workflow can also configure collaboration and create a private space and ontology. Renamable later under *Actions > Rename organization* with *Edit organization metadata* | Enrollment administrator |
| 2 | **Configure collaboration** | Adding a collaborating organization lets members of both "discover the name of the other"; user and group discovery is then set **separately for each organization**. The example makes both mutually discoverable with users and groups visible | Enrollment administrator |
| 3 | **Private space and ontology** | An isolated place for the partner's own work, accessible only to its organization | Created with the organization |
| 4 | **Identity provider** | Add the partner's identity provider in Control Panel; assign its users to the new organization; set up **ingress rules** so they can reach Foundry from their network | Enrollment administrator |
| 5 | **Partner administrators** | Once they've logged in, grant organization roles, to **groups synced from the partner's identity provider** so new members get the roles on login | Enrollment administrator |
| 6 | **Shared space and ontology** | Marked with **both** organizations. "In most cases, creating a shared space is self-service for Enrollment Administrators, and the associated shared Ontology will be created automatically." If not, Palantir Support. Grant both organizations' administrators roles on the space so they can create projects | Enrollment administrator |
| 7 | **Shared project** | Created in the shared space by either side's administrator, with both organizations applied, which needs *Apply organization* for **both** (Foundry Settings). Three groups as usual, each visible to both organizations | Either administrator |
| 8 | **Reference and un-inherit** | See below | Developers on each side |

**[Explanation]** Steps 2 and 5 are where privacy is decided, not step 6. Discoverability (step 2) is what stops Northwind listing Kestrel's groups; granting partner roles to **synced** groups (step 5) is what stops Kestrel's administrators from having to manage Northwind's people by hand. The shared space is just where the agreed work lands.

## The step that moves data: stop requiring the organization

**[Docs]** A dataset referenced from a private project into the shared space "continues to inherit the source Organization requirements until explicitly removed", so the partner still can't see it. The developer who referenced it must **stop inheriting** the upstream organization, in a code repository in the shared project:

1. Create a branch.
2. Remove any sensitive columns.
3. Remove the inherited organization from the input dataset with **`stop_requiring`**.
4. Open the pull request.
5. Get approvals and merge.

The example filters the aircraft dataset down to Sunrise Airline's aircraft and then stops requiring the Sky Industries organization; the built output is visible to both. "Once inherited Organizations are removed, all the work built on top of the input datasets will be visible to both Organizations."

**[Explanation]** Two syntaxes, two controls: `stop_propagating` removes an inherited **marking** ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking)); `stop_requiring` removes an inherited **organization**. Both live in transform code, both need a merge, and both are the single point where a mandatory control is lifted, which is why 12-05 puts a named approver on the step. Step 2, filtering columns and rows **before** the stop, is the whole safety of the pattern: once the organization is gone, everything downstream is shared.

## For Kestrel

**[Example]** 12-05 decided the shape; this page fills in who does what. *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), in 17-02 §7:

- **Discoverability:** Kestrel and Northwind mutually discoverable as organizations; Kestrel's **users and groups hidden** from Northwind except the three shared-project groups, which are created visible to both. Northwind's visibility of its own side is Northwind's choice.
- **Northwind administrators** hold their organization roles through a group synced from Northwind's identity provider; Kestrel never edits Northwind membership.
- **`stop_requiring` approvals:** the pull request that stops requiring the Kestrel organization on `shared_shipments` needs Lena (data owner) and a security reviewer, as 12-05 already requires for its step 3; this note names the syntax and puts the step in `Commerce [Transform]`'s protected branch policy.
- **Ingress:** Northwind reaches Foundry from its own network, so an ingress rule for Northwind's egress addresses is part of onboarding; recorded as an open item for Kestrel's platform team rather than designed here.

---
[Module index](README.md) · Previous: [03 — Protecting sensitive data and requesting justification](03-protecting-sensitive-data-and-requesting-justification.md) · Next module: [05 — Third-party applications and tokens](../05-third-party-applications-and-tokens/README.md)
