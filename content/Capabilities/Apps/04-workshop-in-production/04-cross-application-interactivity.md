# 04 — Cross-application interactivity

*Sources: [Cross-application interactivity](https://www.palantir.com/docs/foundry/workshop/workshop-cross-app-interactivity/) · [Drag and drop in Workshop](https://www.palantir.com/docs/foundry/workshop/drag-and-drop/) · [App Pairing](https://www.palantir.com/docs/foundry/workshop/widgets-app-pairing/) · [Commands](https://www.palantir.com/docs/foundry/workshop/commands/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Three mechanisms let a module work with other Palantir applications open beside it or inside it: **drag and drop** moves data by hand, **App Pairing** keeps two apps in sync, and **Commands** let one app (or a chatbot) run operations in another. The Workshop pages here are short and point to the platform-wide docs; this note is the Workshop side.

| Mechanism | Moves | Triggered by | Workshop pieces |
|---|---|---|---|
| **Drag and drop** | Object RIDs or object sets (media types) | The user dragging | Drop zones: sections. Drag zones: Object Set Title, Object Table cells, the Object View header icon |
| **App Pairing** | Changes in either app reflected in the other | Ongoing, once paired | The App Pairing widget, with supported apps such as Gotham's Gaia and Graph, and Vertex |
| **Commands** | Operations declared by apps | A button, a metric card, or an AIP Chatbot | Button Group, Metric Card and App Pairing can trigger commands; chatbots can use them as tools ([AIP 05-02](../../AIP/05-chatbot-studio/02-commands-as-tools.md)) |

## Drag and drop in practice

**[Docs]** A **section** becomes a drop zone with *Drop Handling* (if the toggle is missing, an administrator has to enable the feature). Configure the drop label and icon, the **output object set** the dropped data is written to, and an **On drop** event. It accepts the Foundry object RID and object set media types; with **enrichment**, Gotham objects can be dropped too.

**[Docs]** Drag sources: an **Object Set Title** with *Enable drag* (fewer than 500 objects), **Object Table cells** and the **Object View** header icon. Without enrichment, a source only reaches drop zones that accept its exact media type.

**[Docs]** Reordering cards inside an Object List is a separate, in-widget drag ([03-01](../03-workshop-widgets/01-core-display-widgets.md#object-list)).

**[Example]** Ama keeps a *Follow up today* section as a drop zone writing to a `followUps` object set, with an Object List below it. Agents drag orders from the queue's table cells into it during the shift. The set lives only in the module, so it disappears on reload unless it's a saved-state variable ([03](03-routing-state-and-presentation.md#state-saving)) or an action stores it.

## App Pairing and Commands

**[Docs]** **App Pairing** connects a module to supported applications so changes to data or an object in one update the other. **Commands** are a common interface for declaring and running operations in Palantir applications **embedded** in a module; they work alone or with App Pairing, and AIP Chatbots can use them to read from and write to those applications.

**[Example]** Kofi's re-route review page already uses commands: his reviewer chatbot moves the map and draws warehouses through map commands ([AIP 05-02](../../AIP/05-chatbot-studio/02-commands-as-tools.md)).

---
[Module index](README.md) · Previous: [03 — Routing, state and presentation](03-routing-state-and-presentation.md) · Next: [05 — Mobile](05-mobile.md)
