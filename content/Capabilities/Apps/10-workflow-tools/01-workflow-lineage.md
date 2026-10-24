# 01 — Workflow Lineage

*Sources: [Workflow Lineage](https://www.palantir.com/docs/foundry/workflow-lineage/overview/) · [Getting started](https://www.palantir.com/docs/foundry/workflow-lineage/getting-started/) · [Refactors and understanding workflows](https://www.palantir.com/docs/foundry/workflow-lineage/refactor-and-understand-workflows/) · [AIP usage and observability](https://www.palantir.com/docs/foundry/workflow-lineage/aip-usage-observability/) · [Manage security](https://www.palantir.com/docs/foundry/workflow-lineage/manage-security/) · [Branching](https://www.palantir.com/docs/foundry/workflow-lineage/branching-workflow-lineage/) · [Keyboard shortcuts](https://www.palantir.com/docs/foundry/workflow-lineage/keyboard-shortcuts/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Workflow Lineage draws the graph **behind an application**: the object types, actions, functions, Logic functions, models, automations and apps a workflow touches, and how they connect. Then it lets you act on that graph in bulk. It's the tool for *what breaks if I change this?* and *change it everywhere at once*.

**[Docs]** Where it sits:

| Tool | Covers |
|---|---|
| Pipeline Builder | Raw data into the Ontology |
| **Workflow Lineage** | Workflows built **on** the Ontology |
| Data Lineage | Data end to end, from source through the Ontology to the workflow |

**[Docs]** Access is controlled per enrollment in Control Panel (*Application access → Ontology → Workflow Lineage*). It was previously called **Workflow Builder** ([03](03-solution-designer-and-workflow-builder.md#workflow-builder) explains the naming conflict).

## Opening a graph

**[Docs]** Press **Cmd/Ctrl + I** on a resource, or use *Open in Workflow Lineage*, from Workshop, Slate, Ontology Manager, AIP Logic, Automate, custom widgets, function repositories, projects, folders, Chatbot Studio, Global Branching, Quiver, models and more. Opened from Ontology Manager, an object type, action type, function or Logic function shows its upstream and downstream nodes automatically. From Workshop or third-party apps it expands to about **800 nodes**, then stops; expand further by hand. In **AI FDE**, Cmd/Ctrl + I graphs everything in the conversation, or you can ask for a specific graph with annotations.

**[Docs]** The **graph panel** sits beside a **Workshop panel**: select a node and its uses in the module light up, or select a widget and see its nodes. You can also:

- search by RID or property name;
- add whole folders or projects;
- open any node in its own app;
- pin nodes;
- add Markdown **text nodes**;
- save **presentation frames** (graph only, not side panels).

## What a node tells you

| Node | Selection details |
|---|---|
| Object type | Properties and **where each is used** (property provenance), links, backing data, data preview |
| Action | API name, RID, inputs, Ontology edits, **submission criteria**, function code, action log |
| Function / Logic | Inputs, outputs, code, dependencies, repository; for Logic, automations and **models** |
| Automation | Which properties its condition depends on; the **lightning bolt** shows actions or functions that can trigger it, including ones that set a property to the watched value |
| Workshop app | Its actions, functions and objects; **weekly views** |
| Language / trained model | Lifecycle stage, context window, functions that use it; live deployment for trained models |
| Custom widget | The Workshop apps that use it |

**[Docs]** **Colour modes** turn the graph into a dashboard: node type, permissions for a chosen user, failure rate (actions, functions, Logic), monitoring status, views over four weeks, out-of-date functions, model usage, OSv2 indexing and last reindex, Ontology status, action rule type, **automation expiration**, last modified, folder, project, portfolio and repository. Several ontologies can share one graph; nodes from another ontology show a warning icon and have limited actions.

## Bulk changes

| Change | How | Notes |
|---|---|---|
| **Upgrade functions** in actions, automations and Workshop apps | *Out-of-date functions* colour mode, then the bottom panel | Green: upgradable; grey: current; yellow: **breaking**; red: errors. For automations and apps, *all or nothing* or *partial*. Actions with an action log whose new version edits a new type must be upgraded in Ontology Manager |
| **Upgrade custom widgets** in Workshop apps | *Update application → Custom widgets* | — |
| **Bulk publish** Workshop apps | Right-click → *Publish N Workshop modules* | Skips apps already *Latest published* or *Published* |
| **Replace a model** across Logic functions | Model node → *Replace model* | **No proposal or review**; skips functions you can't edit; Palantir-provided models only, not registered ones |
| **Update submission criteria** to match a source action | *Update submission criteria* | On a new branch, an existing branch, or **directly on main** |
| **Grant Ontology roles** on objects and actions | Right-click → *Edit permissions* | Immediate; can't be undone |
| **Delete** objects and actions | Right-click → *Delete resources* | Creates a proposal, including affected link types |
| **Move** resources | Right-click → *Move resources* | Shows skipped resources and why |
| **Check Marketplace packages** | *Marketplace products* sidebar | Colours resources by package; flags missing inputs |

**[Recommendation]** Only two of these changes offer a choice of where to apply them: function upgrades in **actions** and **submission criteria** updates (new branch, existing branch, or main). On Kestrel's protected Ontology projects ([Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md)), choose **Create a new branch** for those, so they go through the same proposal and approvals as a hand edit. Function upgrades in **automations** and **Workshop apps**, model replacement and role grants apply directly with no review step; for those, open Workflow Lineage on a branch first ([below](#on-a-branch)) where the change is supported, or treat the bulk change like a production release.

## Security and debugging

**[Docs]** Useful tools:

- *View as* a user in the permissions colour mode: what they can see and edit, both Ontology permissions (definition; data and execution) and resource roles.
- **Debug permissions → Check action submission** explains why a user can't submit an action.
- *Highlight matching actions* finds actions with the same submission criteria, or objects with matching security policies.
- Bottom-panel **observability**: Logic **executions** and **P95 duration**, model **requests and tokens** (successful, attempted, rate-limited) per Workshop app, automation or OSDK app, and searchable service logs.

**[Example]** An agent reports that *Hold order* is greyed out. Open the queue with Cmd+I, select *Hold order*, *Debug permissions*, and pick the agent. The breakdown shows they can see the action but fail the *CS agents* group criterion ([Ontology 08-01](../../Ontology/08-actions/01-action-types.md)). That's a group membership fix, not a bug in the module.

## On a branch

**[Docs]** Opened from a branch (AI FDE, the branch bar, the branch or proposal page, or Cmd+I on a branched resource), the graph shows each resource as **added, modified, deleted or unchanged**. You can upgrade functions, delete resources, change criteria and **index object types onto the branch**, optionally with main's edits, so actions can run there. Logic can't be bulk-upgraded on a branch.

---
[Module index](README.md) · Next: [02 — Autopilot](02-autopilot.md)
