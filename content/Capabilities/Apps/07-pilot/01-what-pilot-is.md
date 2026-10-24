# 01 — What Pilot is

*Sources: [Pilot](https://www.palantir.com/docs/foundry/pilot/overview/) · [Getting started](https://www.palantir.com/docs/foundry/pilot/getting-started/) · [Build a to-do application](https://www.palantir.com/docs/foundry/pilot/tutorial-todo-application/) · [The Pilot workspace](https://www.palantir.com/docs/foundry/pilot/workspace-overview/) · [Ontology tab](https://www.palantir.com/docs/foundry/pilot/ontology-tab/) · [Models and agent modes](https://www.palantir.com/docs/foundry/pilot/models-and-modes/) · [Work with data](https://www.palantir.com/docs/foundry/pilot/work-with-data/) · [Provide context and attachments](https://www.palantir.com/docs/foundry/pilot/provide-context/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Pilot is an AI builder that turns a prompt into the code-built front ends of [module 06](../06-osdk-react-and-custom-widgets/README.md). From one description it proposes the **Ontology** entities the app needs, writes a **React + OSDK** front end, and generates **seed data** to try it on, all in an isolated container with a live preview. It builds two kinds of output:

| Output | Lives where | Shipped through |
|---|---|---|
| **Application** | A standalone app at its own subdomain | Developer Console ([02](02-building-and-shipping.md#shipping-an-application)) |
| **Custom widget set** | Inside a Workshop module | The Widget Registry ([02](02-building-and-shipping.md#shipping-a-widget-set)) |

**[Explanation]** Pilot doesn't replace modules 01–06; it writes their kind of output for you. Everything those notes say about OSDK apps and widget sets (tokens, CSP, versions that don't update existing usages, sandbox limits) applies to what Pilot produces. AI FDE ([AIP 07-05](../../AIP/07-end-user-apps/05-ai-fde.md)) is the related agent for transforms, repositories and the Ontology; Pilot is for front ends.

**[Docs]** Prerequisites: Pilot enabled on the enrollment; existing Ontology entities, or a project where you can write to the Ontology; permission to create repositories in the project (usually **Editor**). Deploying needs more ([02](02-building-and-shipping.md#shipping-an-application)).

## Starting a build

**[Docs]** Open Pilot from the application menu. The welcome screen asks for:

- the **type**: OSDK application or **Custom widget set**;
- a **prompt**;
- optional **context**: object types, action types, functions, files, images ([below](#steering-it));
- the **save location** and **Ontology**;
- a **theme**: **Blueprint components** for a Foundry look, or **Custom components**, for which a designer agent writes a design specification;
- **Modify Ontology permissions**: what Pilot may create or change ([below](#what-pilot-may-change-in-the-ontology));
- a **model**.

Pilot then provisions a container, which takes a few moments, and opens the workspace.

| Workspace area | Shows |
|---|---|
| **Chat panel** | Prompts, agent replies, each tool step (file reads, edits, shell commands) and a separate thread per subagent |
| **Preview** | The running app, with a device selector, or the widget inside Workshop's widget sandbox |
| **Ontology** | Graph of object, action and link types, each marked **Existing** or **Proposed**; select an object type to see its seed records |
| **Code** | The source, in the same editor as Code Workspaces |
| **Changes** / **Proposals** | Code diffs and code proposals ([02](02-building-and-shipping.md#branches-versions-and-proposals)) |
| **… → Pilot diagnostics** | Last 500 lines of container logs |
| **Status indicator** | Pilot connection, dev server, dependencies, **Deployability** (an Ontology deployment dry run), upgrades, with *Fix with Pilot* |

## Agents, modes and models

**[Docs]** Pilot delegates to subagents:

- **ontology architect**: object, action and link types;
- **designer**: the design specification, with Custom components only;
- **app builder**: the React code;
- **notional data generator**: seed data;
- **production-data viewer**, where enabled ([below](#production-data-analysis)).

They read and edit files, search, run shell commands, search the Ontology and commit.

**[Docs]** **Act mode** (the default) applies changes straight away. **Plan mode** writes a plan and waits for **Execute**. On a protected branch, *Implement on a branch* creates an editable branch first. The docs suggest plan mode for significant structural changes and when you want to see a change's scope before it starts.

**[Docs]** Model families are Claude, GPT and Gemini variants, depending on the enrollment, chosen on the welcome screen and sometimes in the chat's More menu. The docs' general guidance: larger models for complex work, smaller ones for quick changes.

**[Explanation]** As with the model lists in [RQ-02](../SOURCES.md#open-research-questions), check the selector in your enrollment rather than the docs page for what's actually available.

## What Pilot may change in the Ontology

**[Docs]** **Ontology permissions** decide what Pilot may **propose**. Set them on the welcome screen or from the Ontology tab:

- **Allow Pilot to create new object types / action types.** With creation off, Pilot builds only on entities that already exist.
- **Default edit permissions**: *Allow modifications* (Pilot may add properties or parameters, which can break the Ontology API) or *Do not allow modifications* (use exactly as deployed).
- **Per-entity overrides.** Link types follow their object types.

With creation off and everything unmodifiable, the Ontology is **fully locked**, and Pilot designs around what's deployed. If a request needs a locked entity changed, Pilot **pauses and asks**: allow it, make the change yourself in Foundry, or leave it.

**[Docs]** These settings control **schema proposals only**. They don't grant access to records, permission to run actions, or permission to deploy.

## Which data the preview uses

**[Docs]** Code, Ontology definitions, preview data and agent context are separate, and the docs ask you to check each one.

| Data source | Preview reads | Actions in the preview |
|---|---|---|
| **Notional data** | Seed records in the container's local mock store | Change only seed data |
| **Production data** | The **main** Ontology branch | **Change real objects**, even in Editor view and on a separate code branch |
| **Production data on branch** (*Branched data* for widgets) | The Foundry branch chosen for deployment | Change records on that branch only; those edits never merge to main |

**[Docs]** More on seed and production data:

- Seed data **never deploys**. The Ontology tab's data preview always shows seed records, even while the app preview uses production data.
- Mock responses don't test permissions, real function results or every runtime behaviour.
- An empty production preview can mean missing data, missing permissions or an undeployed definition, not necessarily a broken front end.
- A **code branch** versions files only. It doesn't change the data source or isolate production data.

### Production-data analysis

**[Docs]** Where enabled, a **production-data viewer** agent reads real objects in a separate context and writes an analysis. Before the building agents see it, you **review** it, edit out anything sensitive, and approve or reject it. The viewer has **already read** the data by then: approval controls sharing with the other agents, not the initial read.

## Steering it

**[Docs]** Context makes the result better:

- **Ontology entities** (object types, action types, functions), shown as tags with their edit permission;
- **files**: PDF, Markdown, plain text;
- **images**: screenshots, wireframes, design references;
- **Notepad** documents;
- a selected **element** in the preview;
- dictation.

The docs' prompting advice: be specific about the data model, describe **workflows** rather than screens, say what each attachment is for, and build up in small steps.

**[Docs]** The to-do tutorial is a good first build. It shows both routes: letting Pilot propose new types (one object type, three actions), and attaching existing types with the Ontology locked (the graph should show *Existing 4, Proposed 0*). It tests seven interactions on seed data, again on a branch, and again after release.

**[Example]** In Kestrel's carrier-invoice flow, matching lines to shipments is deterministic code, and lines it can't match (`matchStatus = UNMATCHED`) go to a review queue for Lena's team ([AIP 10-02](../../AIP/10-kestrel-case/02-carrier-invoices.md)). The team reviews invoices in Workshop with a PDF viewer ([03-03](../03-workshop-widgets/03-media-documents-and-history.md)). Lena wants a side-by-side **line matcher** for that queue: unmatched lines on one side, candidate shipments on the other. She starts a **Custom widget set** in Pilot, attaches `CarrierInvoice`, `CarrierInvoiceLine` and `Shipment`, turns creation off and sets all three to *Do not allow modifications*. Pilot builds a read-only matcher on seed data. When she asks for a *Match line to shipment* button, Pilot has no action to call: no Kestrel action sets `CarrierInvoiceLine.shipmentId` and `matchStatus` ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#5-actions)). Allowing creation would let Pilot **propose** one, which then goes through Kestrel's normal Ontology review ([02](02-building-and-shipping.md#shipping-an-application)). *Considered, not adopted* ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)).

**[Explanation]** One thing the Pilot pages don't cover: Lena's own session carries the `Kestrel Pay – Financial` marking, which limits which models may see her data ([AIP 08-03](../../AIP/08-security-governance-and-admin/03-llm-data-access-with-markings.md)). Whether those marking rules govern Pilot's agents, for example the production-data viewer, isn't documented; logged as [RQ-08](../SOURCES.md#open-research-questions). Until it's answered, keep her Pilot work on seed data.

---
[Module index](README.md) · Next: [02 — Building and shipping with Pilot](02-building-and-shipping.md)
