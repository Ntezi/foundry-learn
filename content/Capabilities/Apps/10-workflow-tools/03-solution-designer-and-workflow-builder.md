# 03 — Solution Designer and Workflow Builder

*Sources: [Solution Designer](https://www.palantir.com/docs/foundry/solution-designer/overview/) · [Navigation](https://www.palantir.com/docs/foundry/solution-designer/navigation/) · [Diagrams](https://www.palantir.com/docs/foundry/solution-designer/diagrams/) · [AIP Architect](https://www.palantir.com/docs/foundry/solution-designer/aip-architect/) · [AIP Critic](https://www.palantir.com/docs/foundry/solution-designer/aip-critic/) · [Tutorial: first diagram](https://www.palantir.com/docs/foundry/solution-designer/tutorial-create-your-first-diagram/) · [Troubleshooting](https://www.palantir.com/docs/foundry/solution-designer/troubleshooting/) · [Workflow Builder overview](https://www.palantir.com/docs/foundry/workflow-builder/overview/) · [Workflow Builder core concepts](https://www.palantir.com/docs/foundry/workflow-builder/core-concepts/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Two tools that sit before and beside building. **Solution Designer** draws the **architecture** of a solution, with optional AI help to plan and review it. **Workflow Builder**, as its core-concepts page describes it, builds and runs a **workflow** as a graph of nodes.

## Solution Designer

**[Docs]** A diagram is a Foundry file made of nodes and connections:

| Node | Represents |
|---|---|
| **Component** (Cmd/Ctrl + B) | A platform app or tool, such as Pipeline Builder, Workshop or an external system, with a documentation card and *Ask Assist* |
| **Resource** | A real Foundry resource: a file, object type, interface or action type, linked so it opens in its app |
| **Concept** | An abstract stage ("Data Sourcing", "Analytics") for AIP Architect to fill in |
| **Group**, **Text** | Containers and annotations |

**[Docs]** Connections run from an output handle to an input handle and can be labelled. Object-type nodes can generate their linked types (*object traversal*). Diagrams auto-save with full **version history**; restoring creates a new version. You can import from JSON, an **image** (a photographed whiteboard, converted by a vision model) or Data Lineage, and export JSON or a 2× PNG; exporting needs **edit** permission. `viewer=true` opens a read-only link, and `focusRID=` centres on a node. A **reference library** offers industry, technical and workflow patterns.

### AIP Architect and AIP Critic

**[Docs]** **AIP Architect** plans. A wizard asks:

1. what you're building and your requirements;
2. the data source (external, upload, existing Foundry data, user input), its update frequency, scale and special types;
3. **no code, low code or pro code**.

It produces a graph of concept nodes. *Select implementation* previews candidate patterns with a streamed rationale; the **Ontology** node instead has *Generate data model*, which proposes object types, properties and links. *Save and Start Building* opens a step-by-step walkthrough. The docs recommend GPT-5 among the models, subject to your organization's configuration.

**[Docs]** **AIP Critic** reviews. It sorts the diagram into sections (external systems, sourcing, processing, modelling, Ontology, analytics, application building, platform management, custom), answers questions about it in a conversation saved with the diagram, and can **generate an implementation plan** (phases, dependencies, practices, effort) exportable as PDF. The docs suggest using Architect to draft and Critic to review, and AI FDE to build what the plan describes.

**[Docs]** AI features need AIP enabled and at least one supported model; image conversion needs a vision model. Architect's output is a starting point to review, not a decision.

**[Example]** The carrier-invoice flow in [AIP 10-02](../../AIP/10-kestrel-case/02-carrier-invoices.md) as a diagram:

- groups for **Sourcing** (the PDF media set), **Processing** (Document Intelligence transform, reviewed parser), **Ontology** (`CarrierInvoice`, `CarrierInvoiceLine`, `Shipment`, as resource nodes) and **Applications** (the Workshop review module, the disputes chatbot, the re-extraction automation);
- text nodes carrying the decisions table's *why* column.

Asking Critic *where can a mistake move money?* should point at the matching step, which the architecture record already keeps deterministic. *Considered, not adopted* ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)). **[Explanation]** The value is that the diagram's resource nodes link to the real resources, so the architecture record and the system stay connected.

## Workflow Builder

**[Docs]** The core-concepts page describes Workflow Builder as a graph canvas with three areas:

- **side panel**: overview, reusable parameters, previews, execution, run history, version history;
- **bottom panel**: workflow objects and object **watchlists**;
- **nodes**, of these types:

| Node | Does |
|---|---|
| **Trigger** | Starts the workflow on a schedule or when an Ontology object changes |
| **Compute** | Runs a function, or a no-code transform |
| **Use LLM** | Calls a model, optionally with Ontology tools (actions, object queries, functions) |
| **Fork** / after fork | Branches on a condition, then rejoins |
| **Loop** / after loop | Iterates over a list, with element and index variables |
| **Effect** | Runs an action, or **does nothing** (to make a branch's route visible) |
| **Subgraph** | A reusable group of nodes; can't be shared across graphs, only copied |

**[Docs]** **Previews** run real objects through the graph, show each object's path and node values, re-run as you edit, and list every object created, edited or deleted.

**[Docs]** The Workflow Builder **overview** page, however, is the Workflow Lineage overview, which says Workflow Lineage was "previously known as Workflow Builder". The two pages describe different products under one name; logged as [RQ-11](../SOURCES.md#open-research-questions).

**[Explanation]** On the core-concepts description, Workflow Builder overlaps with Automate (triggers, effects) and AIP Logic (LLM steps, tools), with forks, loops and previews on real objects as its own additions. Until the docs settle what it is and who has it, Kestrel keeps building with Automate and Logic ([module 08](../08-automate/README.md)).

---
[Module index](README.md) · Previous: [02 — Autopilot](02-autopilot.md) · Next: [04 — Use Cases [Sunset]](04-use-cases-sunset.md)
