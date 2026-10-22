# 02 — Autopilot

*Sources: [Autopilot](https://www.palantir.com/docs/foundry/autopilot/overview/) · [Getting started](https://www.palantir.com/docs/foundry/autopilot/getting-started/) · [Workbench](https://www.palantir.com/docs/foundry/autopilot/workbench/) · [Kanban board view](https://www.palantir.com/docs/foundry/autopilot/workbench-kanban/) · [Dependency graph view](https://www.palantir.com/docs/foundry/autopilot/workbench-graph/) · [Object timeline](https://www.palantir.com/docs/foundry/autopilot/object-timeline/) · [Automation events](https://www.palantir.com/docs/foundry/autopilot/automation-events/) · [Integrations](https://www.palantir.com/docs/foundry/autopilot/integrations/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Workflow Lineage shows how a workflow is **built**. Autopilot shows it **running**: where every object is in its lifecycle, which automation or person moved it there, and which runs are failing right now. It's the control room for systems where automations and agents hand work to each other and to people.

**[Docs]** A **workbench** has two tabs:

- **Workbench**: a **Kanban** board, a **dependency graph**, or both side by side.
- **Automation events**: execution logs across all of the workbench's automations.

Workflows with many automations can use a lot of browser memory.

## Building a workbench

**[Docs]** Start from Autopilot by choosing object types (and their automations) or automations directly, or from an automation's *Actions → Open in Autopilot*. Autopilot generates a first version and then raises **alerts** for what's missing. What makes a workbench complete:

| Requirement | Why |
|---|---|
| All related automations added | Autopilot suggests the ones it finds |
| **Project-scoped** automations ([08-05](../08-automate/05-security-ownership-and-history.md#who-can-see-what-happened)) | All workbench users see execution events, and Autopilot can infer dependencies. It may not infer them for **user-scoped** automations owned by someone else |
| **Edit history** on the object types | Needed for object histories and the resource activity panel |
| Each automation has **run at least once** | Relationships are inferred from past runs; Autopilot can't infer dependents for an automation that has never run, or for **scheduled** ones |
| **Trace logs** per resource | Enabled by your enrollment administrator |
| Card properties, conditional formatting and the panel object view set in Ontology Manager | Cards and the sidebar use them |

## States and the Kanban board

**[Docs]** **States** are the workflow's stages: each is a Kanban column and a graph node. Autopilot infers them from automation conditions and effects; you can add, rename, reorder and delete them. Each state has a **definition** (which object types, entry and exit conditions), **display** settings (colour, icon, card properties, per state if you like), and **upstream / downstream** history of the last **100** transitions, split into manual and automated.

**[Docs]** On the board:

- **Cmd/Ctrl + F** finds any object by title or RID.
- *Filter to linked objects* narrows the board to one object's neighbourhood.
- Open an object for its **history**: current states, property changes, and **who or what** made each change (automation, Workshop app or user action, with the triggering object).
- **Retry** an automation on one object, or on everything in a state (*Execute automation for all objects*).
- **Liveness**: a spinner in the column header and an animated edge on cards being processed.

## The graph, timelines and events

**[Docs]** The dependency graph shows automations (including those running agents) and **Workshop apps** as nodes, so it separates human-driven transitions from automated ones. Select an object to draw its **historical path** through the states. The **resource activity panel** lists every create, modify and delete a resource made, if edit history is on.

**[Docs]** The **object timeline** (also in Object Explorer's *More*, when edit history is on) lays out one object's history by actor: bars for executions, diamonds for edits. It reports total **tokens**, runtime, waiting time for people, and **agentic coverage**, the share of the history driven by agents.

**[Docs]** **Automation events** groups executions by batch, like Automate's history. Filter by time, outcome (success, failure, fallback, success with no edits) and retries, then open per-object traces with errors and timing. The docs' troubleshooting loop: filter to failures, read the trace, open the object's full history, compare with a successful run of the same automation.

## Integrations

**[Docs]** Autopilot:

- shows edits from **third-party applications**: pro-code agents, OSDK apps, compute modules;
- can be **embedded** in Workshop through an iframe: add `embedded=true`, choose `viewMode=Kanban`, `Graph` or `SplitView`, and add `readonly=true` to stop viewers running automations from it.

## Kestrel: the order lifecycle

**[Example]** A candidate workbench for the fraud on-call team on `Order` and `Payment`, with *High-risk payment hold*. It belongs to them because `Payment` data carries the `Kestrel Pay – Financial` marking ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#7-security-environments-and-governance)); operations leads such as Kofi would get a separate workbench on `Order` alone. States follow `Order.status`: `PLACED → PAID → PICKING → SHIPPED → DELIVERED`, plus `ON_HOLD` and `CANCELLED`. The graph separates holds made by the automation from holds agents make in the Delivery Desk queue. *Considered, not adopted* ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)).

**[Explanation]** Two settings from module 08 decide whether this works:

- *High-risk payment hold* has a notification effect, so it **can't be project-scoped** today. Autopilot would show its events only to its owner, a service user. The split recommended in [08-05](../08-automate/05-security-ownership-and-history.md#who-can-see-what-happened) fixes this too.
- `Order` needs **edit history** turned on, or the board can't say who moved an order to `ON_HOLD`.

Embedded read-only in an operations page, the `Order`-only board gives team leads the picture without letting them retry automations by accident.

---
[Module index](README.md) · Previous: [01 — Workflow Lineage](01-workflow-lineage.md) · Next: [03 — Solution Designer and Workflow Builder](03-solution-designer-and-workflow-builder.md)
