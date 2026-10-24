# 02 — Checkpoints

*Sources: [Checkpoints](https://www.palantir.com/docs/foundry/checkpoints/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/checkpoints/core-concepts/) · [Checkpoint types](https://www.palantir.com/docs/foundry/checkpoints/checkpoint-types/) · [Configure checkpoints](https://www.palantir.com/docs/foundry/checkpoints/configure-checkpoints/) · [Review checkpoint records](https://www.palantir.com/docs/foundry/checkpoints/review-checkpoint-records/) · [Add checkpoint configurations to a Marketplace product](https://www.palantir.com/docs/foundry/checkpoints/checkpoints-marketplace/) · checked October 23, 2026 · Ready for Review*

A **configuration guide with a type catalogue**: what a checkpoint is, the five decisions in a configuration, the families of interaction it can guard, who sees the records, and what survives Marketplace packaging. [AIP 08-01](../../AIP/08-security-governance-and-admin/01-security-privacy-and-ethics.md) and [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md) referred to Checkpoints as a tool; this is the tool. (Not to be confused with transaction checkpoints in pipelines, [Ontology 02-01](../../Ontology/02-foundry-data-foundations/01-datasets-transactions-and-schemas.md).)

## What it is

**[Docs]** Checkpoints "supports purpose justification and accountable records": it interrupts "potentially sensitive user interactions with prompts requesting justification", and the justifications let reviewers judge whether activity "aligns with organizational policies". A **checkpoint** is the prompt; a **checkpoint configuration** defines its prompt, justification type and the conditions and users it applies to; a **checkpoint record** is created on submission. The privacy rule: require justification "when the reason for a sensitive action matters to whether it is appropriate", and apply it proportionally.

**[Docs]** It is integrated into "60+ different interactions", fired both when a user acts directly and when the action comes through an Approvals request ([01](01-approvals.md)). Everyone can review their own records in the Checkpoints application (*Data Governance* category); administrators can configure and review for organizations or spaces.

**[Concept]** A checkpoint never **prevents** anything a user is allowed to do. It adds a pause, a reason, and a record. The prevention is still the role or the marking; the checkpoint is the accountability layer on top ([03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md#the-four-layers)).

## The record

**[Docs]** Each record holds: the **user**; the **timestamp**; the **checkpoint type**; the **checkpoint language** (title, prompt, description), which is **frozen** at submission and "will not be updated if the underlying checkpoint configuration is edited or deleted"; the **justification**; the **checkpointed items** (for a *Compass export*, the resource; for a *Submit action*, the action type with its Ontology and the Ontology's version at the time); a **checkpoint RID**; and the **configuration RID**.

**[Explanation]** Freezing the language is what makes the record evidence: a reviewer a year later sees exactly what the user was asked, not what the prompt says now.

## Five decisions in a configuration

**[Docs]**

| # | Decision | Options |
|---|---|---|
| 1 | **Type(s)** | At least one checkpoint type; several allowed, but then only the condition types common to all of them are available |
| 2 | **Scope** | **Organization**: prompts members of that organization (not guests); needs the **Data governance officer** role for it in Control Panel. **Space**: prompts anyone interacting with a resource in that space; needs a role with *Administer resource-scoped checkpoint configurations*, plus Owner on the targeted resource or Space Administrator on the space. *Login* can't be space-scoped and needs the Checkpoints Login asynchronous user manager enabled in Control Panel |
| 3 | **Additional conditions** | *Locations* (a resource, project or space); *User submitting checkpoint* (a user or group); *Selected user or group* (the subject of the interaction, optionally including member groups); *Markings* (interacting with, or on a resource carrying, a marking); *Action type*; *Object set* (object type, type group, Ontology, datasource location, datasource marking, saved exploration or list). Each can be an **AND** matcher (show only if true) or a **NOT** exemption (show only if false). One matcher of each type per configuration; unlimited exemptions |
| 4 | **Prompt** | *Title* (required, under **45** characters), *prompt* (required), *description* (optional); prompt and description take Markdown |
| 5 | **Justification type** | **Acknowledgment** (a checkbox with your text); **Response** (free text, optionally validated by a regular expression); **Dropdown** (predefined values, single or multiple, optionally with free text; multiple selection renders as checkboxes); **Reauthentication** (sign in again with the configured identity provider; not for *Login* or *Scoped session select*). *Response* and *Dropdown* can show the user's **5** most recent justifications from the past month |

**[Docs]** *Login* checkpoints alone have a **frequency** setting (show again only after a set time). The configuration's own **name and description** are visible to other configurers, never to the users who see the prompt.

**[Explanation]** The conditions let one configuration be exact. *Export from `Payments [Ontology]`* is *Compass export* + a *Locations* matcher on the project. *Export of anything carrying `Kestrel Pay – Financial`, wherever it is* is the same type + a *Markings* matcher, which follows the data instead of the folder. *Everyone except the DevOps release group* is a *User submitting checkpoint* **exemption**. The NOT here is safe, unlike the NOT in granular policies ([02-02](../02-markings-and-mandatory-controls/02-granular-policies.md#what-a-policy-can-compare)), because exempting someone from a prompt grants no access.

## The catalogue

**[Docs]** Types are grouped by category; some exist only when the related application is enabled. A summary of the tables (the page lists every type):

| Category | What it covers | Examples |
|---|---|---|
| **Download** | Taking data out: Compass, Contour, Quiver, Notepad, Reports, Slate, Workshop (function-backed export, object set export), AIP Analyst, chatbot sessions, media sets, model weights, build and code logs, API metadata and metrics, Code Workspace imports, Flow Capture | *Compass export* (all datasets, files and images); *Object set export* (download or copy as string); *Frontend export* (pivot tables, Code Workbook and Foundry templates); *Contour export* vs *Contour dashboard export* (PDF) |
| **Upload** | Bringing data in: Compass import, attachment import, media set import, Code Workspace saves, Notepad media, Flow Capture | *Compass import* covers all frontend imports and uploads into a dataset |
| **Manage security** | Changes to who can see what: group member addition and removal, membership expiration, marking member addition and removal, project constraint changes, references, role grants, OAuth secret rotation, token creation, two-factor reset, Cipher encrypt and decrypt, custom widgets' camera, microphone and download permissions | *Marking member addition*; *Role grant addition*; *Rotate OAuth client secret*; *Token create* |
| **Login** | Logging in | Needs the login AUM |
| **Other** | Builds, schedules, merges, approval-policy changes, Data Connection syncs, Pipeline Builder deployments and proposals, Contour creation, issues, Object Explorer searches, virtual table registration, retention policies, walkthroughs, and **Submit action** | *Submit action* applies only to actions submitted **by users in the UI** (Workshop, object views, Object Explorer, Vertex), and "does not apply to actions that are submitted asynchronously, such as via Automate or by means other than the user interface, such as via API call or the Ontology SDK" |

**[Docs]** Legacy types (no new configurations, records still reviewable): *Data Connection source share*; *Hubble export* (replaced by *Object set export*, configurations migrated automatically); *Package static dataset* (replaced by DevOps warnings). A *Submit action* prompt renders as **required fields inside the action form**, or as a separate dialog when the action has no form (an inline edit).

**[Explanation]** The *Submit action* scope is the important limit for the Kestrel designs: a checkpoint on *Re-route shipment* guards Kofi clicking the button; it does **not** guard the Delivery Desk agent proposing the same action through Automate or a Logic function. Those paths are governed by [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)'s staged writes and approvals, not by checkpoints.

## Who can read the records

**[Docs]** One of: you **created** it; you hold *Review records by resource* (`checkpoints:review-records`) on the checkpointed resource, an operation "not granted to any roles in the default role sets"; you're **Space Administrator** on the resource's space; or you hold the **Data governance officer** role for the organization, which covers all its users' records. Items you can't see are redacted; records from undiscoverable organizations are hidden. Filters: organization, space, type, user, checkpointed resource, time.

**[Recommendation]** Grant `checkpoints:review-records` through a custom role to the people who own a project's data (Lena for the payments projects), so review doesn't depend on someone holding the organization-wide officer role.

## Marketplace

**[Docs]** Configurations can be packaged as DevOps outputs (*Checkpoint configuration* under *add outputs*), with limits: on install they become **space-scoped** with a *Locations* matcher on the installation, so only types that support both can ship; no *Markings* matchers; no location matchers naming a space; no *User submitting checkpoint* condition naming a **single user** (a group is fine); **one type per configuration**.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), checked against [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)'s control ladder:

| Configuration | Type | Conditions | Justification |
|---|---|---|---|
| **Payments export** | *Compass export*, *Object set export*, *Contour export* (three configurations, one type each, so they can ship in the Delivery Desk product if ever needed) | *Markings*: `Kestrel Pay – Financial`; exemption: `kestrel-service-users` | Dropdown (*regulatory report*, *reconciliation*, *audit request*) + mandatory free text |
| **Issue refund** | *Submit action* | *Action type*: `Issue refund`; *Object set*: datasource marking `Kestrel Pay – Financial` | Response, validated to contain a ticket reference |
| **Marking membership** | *Marking member addition* | *Selected user or group*: any; scope organization | Acknowledgment of the PII training policy |
| **Secret rotation** | *Rotate OAuth client secret* | scope organization | Reauthentication |

*Not* checkpointed: *Re-route shipment* and *Hold order*. 16-04 already puts those behind an explicit approval step for the agent's proposals, and a human clicking them in the queue is the normal workflow; a prompt on every click would be the disproportionate use the overview warns against. Records for the payments configurations are reviewed weekly by Lena's team through `checkpoints:review-records` on the payments projects.

---
[Module index](README.md) · Previous: [01 — Approvals](01-approvals.md) · Next module: [07 — Cipher](../07-cipher/README.md)
