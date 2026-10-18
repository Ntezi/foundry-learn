# 01 — Workshop at a glance

*Sources: [Workshop overview](https://www.palantir.com/docs/foundry/workshop/overview/) · [Getting started](https://www.palantir.com/docs/foundry/workshop/getting-started/) · [Example applications](https://www.palantir.com/docs/foundry/workshop/example-applications/) · checked October 18, 2026 · Ready for Review*

Workshop is Foundry's low-code builder for **operational** applications: screens where someone reviews objects and acts on them. This note covers what it is built on, the app shapes it is known for, and the getting-started tutorial read against Kestrel's own queue.

## What it is built on

**[Docs]** The overview gives three principles:

| Principle | What it means for a builder |
|---|---|
| **Object data** | "All data in a Workshop Application is read from the Object Data Layer". Writes go through **actions**, logic through **functions**, runtime values through **derived properties**. |
| **Consistent design** | Every widget follows one design system, so modules look and behave alike. |
| **Interactivity and complexity** | Layouts and an events system aim for apps "as user-friendly and high-quality as custom React applications". |

**[Explanation]** The first principle is the one with consequences. Workshop has no direct connection to a dataset; if data isn't in the Ontology, a module can't show it. That is why the Ontology area comes first in this course, and why "can Workshop do X?" usually turns into "does the Ontology have X?".

## The shapes it is known for

**[Docs]** Two patterns are named, and both have a Design Hub example:

- **Inbox**: a filtered, prioritised list of alerts or tasks, a detail view of one item, and action types to decide on it. The example uses Prominent Terms, Filter List, Object Table and Button Group, with **state saving** so users keep and share their views.
- **Common operating picture (COP)**: a shared, often on-the-wall view with a map, statistics, charts and drill-downs. The example uses Metric Card, Map, Chart XY and Object Table.

**[Docs]** The **Workshop Design Hub** is a Marketplace product with six example modules: Alert Inbox, Guided Creation Form, Metrics Dashboard, Common Operating Picture, Rental Booking App and Illustrations App. They are "design examples and inspiration rather than ready-made app templates". Assets are read-only by default; duplicate a module before changing it, because Design Hub updates overwrite local changes. Access goes through your Palantir representative.

**[Docs]** Separately, the **Workshop home page** can generate a working module from your own data for three templates: inbox, map and metrics. You pick an object type and properties, then a save location.

## The tutorial, read against Kestrel's queue

**[Docs]** The getting-started tutorial builds a *Flight Alert Inbox* in six parts. **[Example]** The same steps produce the skeleton of Kestrel's **Delivery Desk queue** ([Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md)):

| Tutorial step | What it teaches | Delivery Desk queue equivalent |
|---|---|---|
| I. New module in a project folder | A module **inherits the permissions** of the folder it is created in | Created in `Delivery Desk [Workflow]` |
| II. Object Table on a **new object set variable** | Widgets read variables, not object types directly | `atRiskOrders` feeds the Object Table |
| III. Filter List on its **own** object set variable; table switched to *Filter… — Using a variable* | The filter needs its own base set "so that the filter does not limit the base object set"; its output is an **object set filter variable** | Filters on order status, customer tier, promised date |
| IV. Collapsible right section with an Object View on the table's **Active object** | Output variables chain widgets together | Order panel on `selectedOrder` |
| V. Button Group running an action, parameter default from the active object, set to **Hidden** | Action forms take defaults from variables | *Hold order* with the order hidden, the reason left for the agent |
| VI. Header icon, title, section titles | Polish | Header *Delivery Desk queue* |

**[Explanation]** Part III is the step people get wrong. If the Filter List and the table share one object set variable, filtering shrinks the set the filter itself is built from, and options start disappearing. Two variables, one filter output: that is the pattern every filtered table in this area uses.

## Where to go next

- How a module is laid out and how widgets talk: [02 — Layouts, widgets and events](02-layouts-widgets-and-events.md)
- The rest of the Ontology picture (derived properties, interface casting, permissions) for this same app: [Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md)
- **[Docs]** The guided version of the tutorial is the *Deep dive: Building your first application* course; our notes on it are listed in this module's [README](README.md#seen-in-our-courses).

---
[Module index](README.md) · Next: [02 — Layouts, widgets and events](02-layouts-widgets-and-events.md)
