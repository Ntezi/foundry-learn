# 04 — AIP Analyst

*Sources: [AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/overview/) · [Capabilities](https://www.palantir.com/docs/foundry/aip-analyst/capabilities/) · [Using AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/using-aip-analyst/) · [Analysis resources](https://www.palantir.com/docs/foundry/aip-analyst/analysis-resources/) · [Compute usage](https://www.palantir.com/docs/foundry/aip-analyst/compute-usage/) · [Workshop widget](https://www.palantir.com/docs/foundry/aip-analyst/workshop-widget/) · [Embed AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/embed/) · [Admin configuration](https://www.palantir.com/docs/foundry/aip-analyst/admin-configuration/) · checked October 8, 2026 · Ready for Review*

AIP Analyst is the agent you **ask questions of** rather than build. This note follows one analysis by Tomás, then covers cost, the Workshop widget and the admin switches. It's long because the docs are: eight pages.

## What it does

**[Docs]** "An interface for agentic workflows" for ad-hoc analysis across your Ontology in natural language. You ask; the agent "autonomously" searches the Ontology, creates object sets, transforms data, and produces summaries and charts. Analyses can be saved as Compass resources and embedded in Workshop or, through an iframe, in OSDK apps.

## An analysis, step by step

**[Example]** Tomás (fraud analyst) asks: *"Which carriers had the most chargebacks on late deliveries last quarter?"* What the agent does, with the docs' tool names:

| Step | Tool category → tool | What happens |
|---|---|---|
| 1 | Ontology → **Object type search** | Finds `Chargeback`, `Shipment`, `Carrier` by name, description, aliases |
| 2 | Ontology → **Object type lookup** | Reads properties and links |
| 3 | Ontology → **Object set** | Chargebacks last quarter, searched around to their orders' late shipments |
| 4 | Ontology → **Ontology aggregation** | Count grouped by carrier |
| 5 | Visualization → **Create visualization** | A bar chart from a Vega-Lite spec |
| 6 | Planning → **Clarifying questions** | "Late against the promised date or the original ETA?" |

**[Docs] The tool categories:** Ontology (type and object lookup and search, object sets with filters, search-arounds or semantic search, **Ontology SQL**, aggregation, map view), Visualization, Planning (analysis lookup, clarifying questions, **context cleanup**, manage tools, **write skill**, skill lookup), Datasets (backing dataset, **Dataset SQL**, preview), Functions (lookup, **execute**), Actions (lookup, **execute**), Media (PDF pages, PDF semantic search), Time series, Notepad, Quiver, Contour, Workshop lookup, Machinery lookup. Categories and single tools can be switched on or off in the **Tools** menu.

**[Docs]** **Execute action** asks for approval "unless the action is configured to submit automatically". You can also upload spreadsheets, Word files, images and PDFs, or attach media items.

**[Explanation]** Tomás can see Kestrel Pay data because his permissions allow it; the agent reads as him. The object and property security policies on Kestrel Pay types ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)) apply to the agent exactly as to Tomás. Because his session carries `Kestrel Pay – Financial`, the markings policy decides which models he may use at all ([08-03](../08-security-governance-and-admin/03-llm-data-access-with-markings.md)).

## Trusting the answer

**[Docs]**

- **Graph view**: a directed graph of each step's provenance, to check the logic, audit transformations and "verify that results are grounded in actual data".
- **Outline**: questions, answers, context and tool calls, with **token usage per tool call**; hide a result (eye icon) so it isn't resent.
- **Tabs and branching**: fork the analysis at any point into a new tab with the same starting context.
- **Export**: PDF, Notepad (verbatim or summarised), **Generate AIP Skill**, convert to **Quiver** or **Contour**. An organisation can force a **watermark** on PDF exports.

## Saving and sharing

**[Docs]** A saved analysis is a Compass resource that stores **messages, tool calls and referenced resources, not results**. Reopening it **re-runs the tools** on current data and "respect[s] each viewer's permissions". Opening it doesn't grant access to what it references. Settings, model category and enabled tools are saved with it; a saved model **category** follows whatever model that category currently maps to.

**[Explanation]** So a saved analysis is a recipe, not a report. If Tomás needs the numbers as they were on the day, he exports to PDF or Notepad.

## Settings worth knowing

**[Docs]**

| Setting | Effect |
|---|---|
| **Limit search scope** | Ontology, object type groups, statuses (Endorsed, Active, Experimental, Deprecated, Example), visibility, projects. Organisation defaults can apply to new unsaved analyses |
| **Initial context** | Recent and favourite resources |
| **Similarity threshold** | 0 (broadest) to 1 (exact) for semantic search in the object set tool |
| **Models** | Categories **Fast**, **Balanced**, **Smart**, updated by the Analyst team; a **Custom** model per category stops automatic updates |
| **Skills** | Reusable instructions; the agent gets each skill's name and description and loads the full text only when relevant. Groups can assign skills |
| **Unsaved analysis cost attribution** | Which project pays for unsaved analyses |

## What it costs

**[Docs]** Two sources: **LLM tokens** for the agent's reasoning, converted to compute-seconds at a per-model rate, and **federated Foundry compute** for each tool's backend (Ontology queries, SQL, functions, media, Contour…). Three consequences the page draws:

1. Token use **grows through a conversation**, because earlier messages and results are resent each turn.
2. **Large tool results** dominate: thousands of objects, wide SQL results, long PDFs.
3. **Enabled tools cost** on every request, because their definitions are sent.

**[Docs] Attribution:** saved analysis → the analysis resource; embedded → the owning resource (for example the Workshop module); unsaved → the user, or the project chosen in settings. Dashboards or Contour analyses the agent creates keep costing whenever someone opens them.

**[Docs] Levers:** clean up context or hide results; **branch instead of continuing**; **aggregate rather than load**; narrow the search scope; preload context; disable unused tool categories; pick smaller models for routine work. The page says model rates differ "by more than an order of magnitude".

**[Docs] When to move work out of the agent:**

| Approach | Token cost | Use for |
|---|---|---|
| Integrated tools | Highest | Questions still taking shape |
| Skills | Similar, fewer wasted steps | Recurring analyses that still need judgment |
| Functions | Low: only inputs and the result enter context | Stable, repeated calculations |
| Pro-code agents | Separate loop | Long-running work; they return **Void**, so write results to objects and read them back |

**[Example]** Tomás's question becomes weekly. Daniel writes `lateDeliveryChargebacksByCarrier(quarter)` as a function, and a skill tells the agent to call it and explain the result. The agent still writes the narrative; the counting is deterministic and cheap.

## Embedding it

**[Docs] Workshop widget** (the full set of controls):

| Section | Highlights |
|---|---|
| Base | Custom system prompt (appended to the default), default model or categories, suggested prompts |
| Input | A **user message** variable that starts an analysis when it changes; object sets (named Input 1, 2…), Notepad documents, skills, object types, functions, **actions with auto-submit on or off**, modules, datasets, media items, each with a rationale |
| Output | Last object set, messages, Vega chart specs (snapshots), cited object or media, *agent running* flag |
| Apply actions | Run an action **On user message send** or **On agent stopped** |
| Tools | Default enabled tools; filters to Ontology, groups, projects, statuses, visibilities |
| View | Hide input, tabs, exports, outline, tools button, token estimator, **model selector**; clear chat on navigation; reset key |
| Save | Save location, loaded analysis, module-only filter |

**[Docs] Iframe URL parameters** (for OSDK or other apps): `ontologyRid`, `objectTypeGroupRids`, `compassProjectRids`, `hideManualContextMenu`; preload with `workshopRids`, `objectSetRids`, `datasetRids`, `objectTypeIds`, `objectRids`, `functionRids`, `actionTypeRids`, `autoSubmitActionTypeRids`, `notepadRids`; `initialMessage` + `autoStart`; `embedded`, `hideSettingsMenu`, `theme`, `modelRid`. For anything else, embed a Workshop module with a full-page widget.

**[Example]** Kofi's region dashboard gets a widget limited to `Commerce [Ontology]`'s shipment and warehouse types, preloaded with his region's open shipments, model selector hidden, Balanced model, no action tools. One suggested prompt: "Which of my warehouses has the most late shipments this week, and why?"

## Admin switches

**[Docs]** In Control Panel's AIP Analyst extension:

| Level | Control |
|---|---|
| Enrollment | **Disable analysis saving** · **Disable action execution** (except allowed groups) · **Disable file uploads** · group-level skills |
| Organisation | Default search scope · default model category · **required PDF watermark** |

**[Example]** Kestrel disables action execution for everyone except the operations leads' group: Analyst is for asking, and Kestrel's writes go through Workshop actions and Delivery Desk's confirmation rules.

---
[Module index](README.md) · Previous: [03 — Custom content sources for AIP Assist](03-assist-custom-content-sources.md) · Next: [05 — AI FDE](05-ai-fde.md)
