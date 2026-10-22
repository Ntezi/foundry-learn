# Decision guide

*Sources: the notes each branch links to · compiled October 21, 2026 · Ready for Review. The flowcharts are ours; every leaf links to the note with the docs' wording.*

Five decisions that come up on almost every application project, as flowcharts. Each ends at the note to read next.

## 1. Which builder?

```mermaid
flowchart TD
    A{Are the users Foundry users?} -- no, they submit data --> P["Public Slate app (05-01)"]
    A -- no, they read their own records --> B["Backend app with its own login (Ontology 10-04)"]
    A -- yes --> W{Do Workshop's widgets cover it?}
    W -- yes --> WS["Workshop (01–04)"]
    W -- one piece missing --> CW["Workshop + custom widget (06-03, 06-04)"]
    W -- the whole UI is custom --> D{Maintained by front-end developers?}
    D -- yes --> R["OSDK React app (06-01)"]
    W -- need a first version fast --> PL["Pilot (07-01), then review it as an OSDK app or widget set (07-02)"]
    D -- no, or an existing Slate app --> S["Slate (05)"]
```

[00-02](../00-orientation/02-choosing-a-builder.md) · [07-02](../07-pilot/02-building-and-shipping.md) · [05-01](../05-slate/01-slate-apps.md) · [06-01](../06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) · [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) · [07-01](../07-pilot/01-what-pilot-is.md)

## 2. Which widget?

The [widget finder](../03-workshop-widgets/README.md) in module 03 maps needs to widgets. Two questions decide most cases first:

```mermaid
flowchart TD
    A{Does the user act on objects here?} -- yes --> B{One object at a time?}
    B -- yes --> F["Button Group or right-click item → action form (02-01, 03-05)"]
    B -- many, same values --> G["Inline Action table (03-05)"]
    A -- no, they read --> C{Rows or a picture?}
    C -- rows --> T["Object Table or Object List (03-01)"]
    C -- a picture --> H["Chart, Map, Vega (03-02)"]
```

[01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md) · [02-01](../02-workshop-data-and-logic/01-actions-in-workshop.md) · [03-01](../03-workshop-widgets/01-core-display-widgets.md) · [03-02](../03-workshop-widgets/02-charts-and-maps.md) · [03-05](../03-workshop-widgets/05-buttons-forms-and-navigation.md)

## 3. Which Automate condition?

```mermaid
flowchart TD
    A{What should start it?} -- a time --> T["Time condition (08-02)"]
    A -- a dataset build --> D["Dataset condition (08-02)"]
    A -- another automation finishing --> X["Automation dependency (08-02)"]
    A -- objects --> O{What about them?}
    O -- an object enters a filtered set --> AD["Objects added to set (08-02)"]
    O -- an object leaves it --> RM["Objects removed from set (08-02)"]
    O -- a property changes on objects already in it --> MD["Objects modified in set, live only (08-02)"]
    O -- a sweep over all of them --> RA["Run on all objects, scheduled (08-02)"]
    O -- a metric or function crosses a line --> TH["Threshold crossed, scheduled (08-02)"]
    AD --> L{Interface, relative time, derived properties or function set?}
    L -- yes --> S["Scheduled monitoring (08-04)"]
    L -- no --> LV["Live monitoring, OSv2 (08-04)"]
```

[08-02](../08-automate/02-conditions.md) · [08-04](../08-automate/04-execution-settings.md#evaluation-frequency)

## 4. Whose identity does it run as?

```mermaid
flowchart TD
    A{What runs?} -- a module, used by a person --> U["The user's own permissions (01-04)"]
    A -- an automation's actions, Logic, functions --> O{Must it survive people leaving?}
    O -- yes --> TP["Third-party application's service user, unrestricted (08-05)"]
    O -- no --> OW["The owner who last took ownership (08-05)"]
    A -- an automation's notifications --> R["Each recipient's permissions (08-03)"]
    A -- a custom widget's OSDK calls --> V["The viewing user's token (06-04)"]
    A -- an external backend --> S["Its service user: filter per customer yourself (Ontology 10-04)"]
```

[01-04](../01-workshop-foundations/04-permissions.md) · [06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md#the-osdk-inside-a-widget) · [08-03](../08-automate/03-effects.md#notifications) · [08-05](../08-automate/05-security-ownership-and-history.md)

## 5. How does a change reach users?

```mermaid
flowchart TD
    A{What changed?} -- a Workshop module --> W["Save, then publish a version; branches and rebase (04-01)"]
    A -- a widget set --> CW["Tag a release; each module must select the new version (06-03)"]
    A -- a Slate app --> S["Save; published version or always-publish; tags (05-01)"]
    A -- an OSDK React app --> R["Git tag, CI checks, release in Developer Console (06-01)"]
    A -- a Pilot build --> P["Ontology proposal, code proposal, tagged release (07-02)"]
    A -- an automation --> AU["Save; on a protected automation, through a branch (08-06)"]
    A -- a Carbon workspace --> C["Save publishes immediately; version history to roll back (09-01)"]
    W & CW & S & AU & C --> M["Across environments: Marketplace product (04-01, 05-01, 06-03, 08-06, 09-01)"]
```

[04-01](../04-workshop-in-production/01-publishing-versions-and-branching.md) · [05-01](../05-slate/01-slate-apps.md#versions-tags-and-merging) · [06-01](../06-osdk-react-and-custom-widgets/01-osdk-react-apps.md#building-one) · [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md#publish) · [07-02](../07-pilot/02-building-and-shipping.md) · [08-06](../08-automate/06-operating-automations.md#branches-scenarios-and-marketplace) · [09-01](../09-carbon-workspaces/01-carbon-workspaces.md#creating-and-editing)

---
[Module index](README.md) · [Limits and thresholds](limits-and-thresholds.md) · [Docs index](docs-index.md)
