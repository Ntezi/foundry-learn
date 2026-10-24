# 01 — Securing a data foundation

*Sources: [Securing a data foundation](https://www.palantir.com/docs/foundry/security/securing-a-data-foundation/) · checked October 23, 2026 · Ready for Review*

The docs' own worked example, **Sky Industries**, re-run **side by side with Kestrel**. The left column is what the page does; the right is the same step in Kestrel's estate, so the two can be compared line by line. Ontology [02-02](../../Ontology/02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md) and [02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md) already use this chain; this note is its security rationale.

**[Docs]** The goal: "a canonical view of the objective reality within your organization", and the first step is to "build and permission your data foundation". The example integrates raw Flight, Runway, Airport, Alert, Route and Passenger data and makes it available to the whole organization.

## Step 1 — Projects with distinct purposes

| **[Docs]** Sky Industries | **[Example]** Kestrel |
|---|---|
| Three projects, one per stage: *Flight Control System [Datasource]* (raw data from the Bureau of Transportation Statistics, ingested and cleaned), *Flight Delays [Transform]* (imports from Datasource, produces reusable datasets), *Aviation [Ontology]* (imports from Transform, represents organizational objects) | `Storefront [Datasource]` and `Kestrel Pay [Datasource]` → `Commerce [Transform]` → `Commerce [Ontology]` and `Payments [Ontology]`, with `Delivery Desk [Workflow]` on top ([02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)). Two datasource projects because the ledger data carries a marking the storefront data doesn't |
| Three groups per project, each mapped to a default role (Viewer, Editor, Owner); projects discoverable by the organization, so default role **Discoverer** and **no project markings**; a code repository in each project | The `kestrel-standard` template does the same ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#for-kestrel)); the payments datasource project uses `kestrel-pay`, which **does** apply a marking at project level, the one departure from the page; `Payments [Ontology]` stays unmarked at project level ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)) |

**[Explanation]** Why the page keeps project markings off: a marking on a Datasource project would propagate to every derived dataset in every downstream project ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#two-ways-a-marking-is-inherited)). The page wants raw data governed by **roles** (discoverable, requestable), and reserves markings for the sensitive subset in [03](03-protecting-sensitive-data-and-requesting-justification.md). Kestrel's `Kestrel Pay [Datasource]` is that sensitive subset from the start, so the departure is deliberate.

## Step 2 — References instead of access

| **[Docs]** Sky Industries | **[Example]** Kestrel |
|---|---|
| Before using another project's data, add a **reference** to it. Then the reference lets "anyone in our Project to author transformations on that data, even without having access to the source Project themselves" | Priya references `storefront_orders_clean` from the Datasource project into `Commerce [Transform]`; Daniel, who has no role on the Datasource project, can still build on `customer_master` |
| The final pipeline spans three projects, so roles are granted separately per project | Same; the payments chain is a second, parallel set of references |

## Step 3 — People get roles per stage

| **[Docs]** Sky Industries | **[Example]** Kestrel |
|---|---|
| **Eric**, the first operational user, joins *Aviation [Ontology] - Viewer*. With Discoverer as the default elsewhere, he is Discoverer on Datasource and Transform and Viewer on Ontology. "Having discoverer access to the Datasource Project will not preclude users from being granted access to downstream data" | **Ama's CS agents** join `commerce-ontology-viewers` and `delivery-desk-viewers`; they are Discoverer on `Storefront [Datasource]` and `Commerce [Transform]`, and can see those projects exist without seeing raw data |
| **Linda** maintains the pipeline: Owner and Editor groups on all three projects | **Priya**: `-editors` on all three commerce projects, `-owners` on Transform; Kestrel Pay engineers own the payments chain |

**[Docs]** "Breaking your pipeline into discrete Projects and groups is the easiest to maintain long term."

**[Explanation]** The Discoverer default is doing more work than it looks. It's what makes the request flow in [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#3-someone-wants-in-what-happens) usable: a Discoverer can see the project, read its cover page ([02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md)) and ask for the right group. With no default role, a project is invisible to everyone outside its groups, and every access request starts with *what's the project called?*.

## Step 4 — Share by group, then check

**[Docs]** Share "by adding them to the correct Project group so they have uniform access", which is "more legible and easier to manage than sharing resources directly". Then confirm that markings and organization membership are met too, with *Check access* ([03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md)).

**[Recommendation]** Make *add to the group, then run Check access* the whole onboarding procedure. The first half grants the role; the second catches the marking or organization the role doesn't give.

## For Kestrel

**[Example]** Nothing new to propose: Kestrel's chain already follows the page, and the group and template details were proposed in module 01. One check this note added, done in Phase 7: the Kestrel model ([17-02 §7](../../Ontology/17-case-studies/02-kestrel-reference-model.md#7-security-environments-and-governance)) lists three projects, while [02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) lays out six. The six are the chain the page recommends; 17-02's list should be completed to match when this area's decisions are adopted.

---
[Module index](README.md) · Next: [02 — Securing an operational application](02-securing-an-operational-application.md)
