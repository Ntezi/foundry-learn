# Decision guide

*Sources: the notes each branch links to · compiled October 23, 2026 · Ready for Review. The flowcharts are ours; every leaf links to the note with the docs' wording.*

Six decisions that come up on almost every Foundry security question, as flowcharts. Each ends at the note to read next.

## 1. Mandatory or discretionary?

```mermaid
flowchart TD
    A{Must the protection survive<br/>derivation, export, writeback<br/>or a model's output?} -- yes --> M[Mandatory control]
    A -- "no: filter what a user<br/>reads, nothing more" --> D[Discretionary control]
    M --> M1{Who is kept out?}
    M1 -- "another company's users" --> ORG["Organization (01-01)"]
    M1 -- "people without a clearance,<br/>column by column" --> CB["CBAC (02-01 Part 3)"]
    M1 -- "everyone outside a<br/>category of content" --> MK["Marking (02-01)"]
    D --> D1{Unit of filtering?}
    D1 -- "rows of a dataset,<br/>for Contour or a backing view" --> RV["Restricted view (03-02)"]
    D1 -- "objects" --> OSP["Object security policy (Ontology 12-03)"]
    D1 -- "properties" --> PSP["Property security policy (Ontology 12-03)"]
    D1 -- "what a person may do" --> ROLE["Project role (01-02)"]
    M -. "both needed" .-> B["Marking on the backing dataset<br/>+ a view or policy on top (03-01)"]
```

[01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md) · [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md) · [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md) · [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md) · [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md) · [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)

## 2. Which container?

```mermaid
flowchart TD
    A{Do the users belong to<br/>different companies?} -- yes --> O["One organization each; a shared space<br/>marked with both (01-01, 04-04)"]
    A -- no --> S{Do they need a separate ontology<br/>or separate storage, billing or compute?}
    S -- yes --> SP["A second space (01-01)"]
    S -- "no: most organizations<br/>need only one" --> P{What separates the work?}
    P -- "a pipeline stage or a team" --> PR["A project per stage:<br/>Datasource → Transform → Ontology → Workflow (04-01)"]
    P -- "a category of sensitive content" --> MK["A marking, applied on the raw data<br/>and stopped in a transform (02-01, 04-03)"]
    P -- "two kinds of data that<br/>must never be joined" --> PC["Project constraints (03-03)"]
    PR --> T["Make it repeatable with a project template (01-02)"]
```

[01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md) · [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md) · [04-01](../04-securing-data-and-applications/01-securing-a-data-foundation.md) · [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md) · [04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md) · [03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md) · [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md)

## 3. The data must cross a boundary. How?

```mermaid
flowchart TD
    A{What is the boundary?} -- "a marking that should stop<br/>once sensitive columns are gone" --> SP["stop_propagating in the transform,<br/>on a protected branch, then rebuild (02-01, 04-03)"]
    A -- "an organization requirement<br/>on data a partner must read" --> SR["stop_requiring in the transform,<br/>approved by the data owner (04-04)"]
    A -- "readers need the shape of a value<br/>but not the value" --> C{Reversible later?}
    C -- yes --> ENC["Cipher encryption; deterministic if<br/>joins and counts are needed (07-01)"]
    C -- no --> HASH["Cipher hashing with a pepper (07-01)"]
    A -- "some rows of a dataset,<br/>per reader" --> RV["Restricted view downstream;<br/>keep the marking on the source (03-02)"]
    A -- "outside Foundry altogether" --> EX["Nothing travels: a checkpoint for the reason,<br/>download controls if the enrollment enforces them (03-05, 06-02)"]
```

[02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking) · [04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md) · [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md) · [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md) · [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md) · [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md) · [06-02](../06-approvals-and-checkpoints/02-checkpoints.md)

## 4. Someone has to say yes, or say why. Which mechanism?

```mermaid
flowchart TD
    A{What is being asked?} -- "access or a change the<br/>requester may not make" --> AP["Approvals: request → review → invoke (06-01)"]
    A -- "a reason for something the<br/>user is already allowed to do" --> CP["Checkpoint: justification recorded,<br/>access unchanged (06-02)"]
    A -- "a change to the ontology<br/>on a protected project" --> PR["Proposal under the two-approval policy<br/>(Ontology 14-02)"]
    A -- "a merge that lifts a<br/>mandatory control" --> BR["Protected branch with security approvals (02-01)"]
    AP --> E["Eligible: whoever could have done it themselves;<br/>pools under 50 so people are told"]
    CP --> F["Not for routine clicks: the overview<br/>warns against disproportionate use"]
```

[06-01](../06-approvals-and-checkpoints/01-approvals.md) · [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) · [Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md) · [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking)

## 5. Which Cipher licence?

```mermaid
flowchart TD
    A{Who operates on the value?} -- "a person, one value at a time,<br/>with a reason" --> OU["Operational User: cell-level audit,<br/>rate limit, optional checkpoint bypass (07-01)"]
    A -- "a pipeline builder, whole columns,<br/>in Pipeline Builder or Contour" --> DM["Data Manager: no key access (07-01)"]
    A -- "code in Code Repositories" --> AD["Admin: effectively key access;<br/>elevated users only (07-01)"]
    OU --> F{Needed in a Function<br/>or an API call?}
    F -- yes --> BY["Allow checkpoint bypass; still<br/>audited and rate-limited (07-01)"]
    AD -. "can a Data Manager licence do it instead?" .-> DM
```

[07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#choosing-a-licence) · [07-02](../07-cipher/02-cipher-workflows.md)

## 6. *She can't see it.* Where do you look?

```mermaid
flowchart TD
    A{Can she find and open<br/>the resource at all?} -- no --> AR["Check access → Access requirements:<br/>organization, marking or role missing (03-04)"]
    A -- "opens, but no data or<br/>blank parts" --> AD["Check access → Additional data requirements:<br/>an inherited marking or a dependency (03-04)"]
    A -- "opens, wrong rows" --> RP{Is the filter on groups,<br/>markings or an attribute?}
    RP -- "groups or markings" --> EM["Emulation mode as her groups (03-04)"]
    RP -- attribute --> TU["A test user in a test environment;<br/>emulation can't change attributes (03-04)"]
    A -- "worked yesterday,<br/>tokens fail today" --> IN["Inactive account after 30 days;<br/>log in to reactivate (01-03)"]
    AD --> W["Where did the marking come from?<br/>Lineage, marked sources (02-01)"]
```

[03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md) · [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md) · [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#finding-where-a-marking-came-from)

---
[Module index](README.md) · [Security home](../README.md)
