# 01 — Ontologies as resources

*Sources: [Ontologies overview](https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/) · [Shared ontologies](https://www.palantir.com/docs/foundry/ontologies/shared-ontologies/) · [Organizations and spaces](https://www.palantir.com/docs/foundry/security/orgs-and-spaces/) · checked October 2, 2026 · Ready for Review*

So far "the Ontology" has meant a concept. This note is about the thing you actually open in Ontology Manager: **an ontology**, a container with a name, an owner and a set of organizations. Most confusion about "why can't I link these two types?" comes from not knowing which container you're in.

## The container

**[Docs]** An ontology "is an artifact which stores ontological resources". It holds:

- object types and link types
- action types
- interfaces
- shared properties
- object type groups

Palantir calls these *Ontology resources*.

**[Docs]** Each ontology is mapped **1:1 with a space**. Creating a space creates an ontology with the same name and the same organization markings at the same moment. A private space gets a private ontology; a shared space gets a shared one. A shared ontology also takes the space's role grants.

That gives a simple rule of thumb: **one organization, one space, one ontology** — unless you deliberately collaborate with another organization.

## Private or shared

| | Private ontology | Shared ontology |
|---|---|---|
| Organizations | One | Two or more |
| Who can be given access | Members and guests of that organization | Members and guests of any applied organization |
| Comes from | A private space | A shared space |
| Typical use | Almost everything | A joint workflow between companies |

**[Docs]** The docs are blunt about a common temptation. Several teams working on the same objects "is not a reason to create a second ontology". Grant roles to groups on the projects that hold the resources instead.

**[Docs]** A shared ontology doesn't make data visible across organizations by itself. A dataset referenced from a private project keeps its original organization requirement until a developer removes it.

## A story from our own enrollment

**[Observed]** In the *Creating Your First Ontology* deep dive ([lesson 15](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/15-create-link-type.md)), the course asked for a link from a new `Flight Alert` type to an existing `[OFT] Flight` type.

The link couldn't be made. `Flight Alert` had been created in the **default** ontology, while `Flight` lived in **Hence - INTERNAL**. Selecting a type across ontologies wasn't possible, so `Flight Alert` was recreated in Hence - INTERNAL. The leftover copy is still in the default ontology, waiting for an approved deletion.

**[Explanation]** What this shows:

- Link types, action types and interfaces connect resources **inside one ontology**.
- Check which ontology you're saving into *before* creating anything. Pipeline Builder makes you choose one when an enrollment has several, and errors with *An ontology must be specified* otherwise ([Add an Ontology output](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/)).
- An enrollment can have a **Default Ontology**, which behaves differently. The docs say project-based permissions and value types are not available for Default Ontologies.

## Kestrel's setup

**[Example]** Kestrel has one organization, one space called `kestrel`, and therefore one private ontology. Storefront, warehouse, finance and fraud teams all work in it, separated by projects and markings (see [02 — Projects, spaces and markings](../02-foundry-data-foundations/04-projects-spaces-and-markings.md)).

Suppose a large carrier later wants to share shipment exceptions with Kestrel in a joint app. That is the one situation that justifies a **shared space** with both organizations, and with it a shared ontology. Kestrel's own ontology stays private, and only the shipment-exception types and their data are deliberately exposed in the shared one.

**Update:** [14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md#which-environment-changes-what) adds `kestrel-dev` and `kestrel-test` spaces, each with its own ontology, for **release management**. The rule above is about not splitting **teams** across ontologies; separate environments are a different case.

## Still open

- **Open question** [RQ-09](../SOURCES.md#open-research-questions): exactly what can reference what across ontologies (for example, whether a function can read objects from two ontologies). The docs read so far only describe resources living in one ontology.
- Moving resources between ontologies has its own page ([Migrating between ontologies](https://www.palantir.com/docs/foundry/ontologies/ontology-migration/)), read in [14 — Migration and export/import](../14-lifecycle-and-operations/05-migration-and-export-import.md).

---
[Module index](README.md) · Next: [02 — Ontology Manager](02-ontology-manager.md)
