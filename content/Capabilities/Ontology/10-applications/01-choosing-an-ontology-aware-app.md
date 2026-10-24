# 01 — Choosing an Ontology-aware app

*Sources: [Ontology-aware applications](https://www.palantir.com/docs/foundry/ontology/applications/) · checked October 2, 2026 · Ready for Review*

Modules 03–09 built a model. This module is about the people who use it. The first question for each of them is *which app*. Kestrel has seven users and a backlog of requests, and the docs give a small framework for sorting them.

## The framework

**[Docs]** The docs compare apps on three dimensions:

- **Primary use case.**
  - **Discovery**: find the right information or workflow, through curated hubs ("360 views") and search.
  - **Analysis**: answer questions along a path the *user* defines, often iteratively.
  - **Dashboards**: pre-configured visualizations, mostly read-only, for a broad audience.
  - **Applications**: interactive, "on-rails" interfaces for one group and one problem, usually capturing input (writeback).
- **Workflow style.**
  - **Exploratory**: no builder needed; usable as soon as data is modelled.
  - **Workflow-specific**: a *builder* configures it first, for *end users*.
- **Configuration model.**
  - **Walk-up usable**: little or no configuration or maintenance.
  - **Customizable**: upfront investment and "a higher ongoing maintenance cost", in exchange for a fit-for-purpose interface.

**[Docs]** The apps on the docs' comparison table:

| App | Use case | Style | Configuration | Objects or datasets |
|---|---|---|---|---|
| **Object Views** | Discovery | Workflow-specific | Walk-up usable | Objects |
| **Object Explorer** | Discovery and analysis | Exploratory | Walk-up usable | Objects |
| **Quiver** | Analysis and dashboards | Exploratory (analysis); workflow-specific (dashboard) | Walk-up (analysis); customizable (dashboard) | Objects |
| **Workshop** | Applications and dashboards | Workflow-specific | Customizable | Objects |
| **Slate** | Applications and dashboards (complex) | Workflow-specific | Customizable | Objects (recommended) **and datasets** |
| **Map** | Geospatial | Exploratory or workflow-specific | Walk-up usable | Objects |

**[Docs]** **Carbon** doesn't appear in the table. It sits on top of the others, combining apps and analyses into curated workspaces, the "last mile" for operational users.

## Sorting Kestrel's backlog

| Request | Who | Use case | First try | Why not something heavier |
|---|---|---|---|---|
| "Show me everything about order O-10442" | Ama | Discovery | **Object View** (standard first) | Free for every type the moment it exists ([02](02-object-views-and-object-explorer.md)) |
| "How many late shipments per carrier this month?" | Priya, Kofi | Analysis | **Object Explorer**, then **Quiver** | One-off questions don't need an app |
| "Weekly refunds by reason, for the finance meeting" | Lena | Dashboard | **Quiver dashboard** | Read-only, recurring, parameterized |
| "My queue of at-risk orders, with Hold and Re-route buttons" | Ama, Kofi | Application | **Workshop** ([03](03-workshop-and-slate.md)) | Needs writeback and a guided flow |
| "Customer portal showing delivery status" | External customers | Application, outside Foundry | **OSDK** app ([04](04-osdk-and-apis.md)) | The users aren't Foundry users |
| "Late shipments on a map over delivery zones" | Kofi | Geospatial | **Map** ([05](05-specialized-apps.md)) | Walk-up usable |
| "Fraud ring: payments sharing card fingerprints" | Tomás | Analysis (graph) | **Vertex** ([05](05-specialized-apps.md)) | Graph exploration is its job |
| "Alert me when a high-risk payment arrives" | Tomás | Automation | **Automate** ([06](06-automate-and-ontology-events.md)) | Nobody should have to watch a screen |
| "One home page for the Delivery Desk team" | Ama's team | Workspace | **Carbon** | Combines what already exists; built in [Apps 11-03](../../Apps/11-kestrel-case/03-delivery-desk-workspace.md) |

## The rule of thumb this table suggests

**[Explanation]** Move **left to right** along the configuration axis, and only when you have to:

```text
walk-up usable ─────────────────────────────────────────────► customizable
Object View · Object Explorer · Map · Quiver analysis   →   Quiver dashboard · Workshop   →   Slate · OSDK app
       (free once modelled)                                     (builder time)                 (developer time)
```

Every step to the right adds a builder, a maintenance burden and something to keep in sync with the model. Ama's first request didn't need an app at all: a good **title key**, **prominent properties** and named **links** ([04-03](../04-object-types/03-primary-keys-and-titles.md), [06-01](../06-links/01-link-types-and-cardinality.md)) made the standard Object View useful on day one.

**[Explanation]** The reverse is also true. **Model quality shows up first in walk-up apps.** If Object Explorer is confusing to Ama, a Workshop app built on the same model will be too. It will just hide the confusion behind configuration. That makes Object Explorer the cheapest usability test for a new object type, before anyone builds on it. The validation drills in [Design 04](../11-design/04-validation.md) use this.

## Slate or Workshop?

**[Docs]** Slate "requires more technical configuration and code than Workshop", supports deep visual customization "based on web development paradigms", and can read **datasets directly** as well as objects. Workshop is "point-and-click code-less" with layouts and an events system, and it aims at the quality of "custom React applications".

**[Explanation]** For Kestrel, the default is Workshop. Slate is the exception, used when a requirement can't be met with objects or needs custom web behaviour. Reading datasets directly doesn't go through the Ontology's actions, links or object and property policies. Dataset permissions still apply, but the Ontology's own rules don't. That is sometimes needed for a legacy report, but it's never free. If the real need is a fully custom UI, compare Slate with an OSDK app ([04](04-osdk-and-apis.md)) before choosing.

---
[Module index](README.md) · Next: [02 — Object Views and Object Explorer](02-object-views-and-object-explorer.md)
