# 05 — Design best practices

*Sources: [Application design best practices](https://www.palantir.com/docs/foundry/workshop/application-design-best-practices/) · [Component-specific best practices](https://www.palantir.com/docs/foundry/workshop/application-design-components/) · [Application design FAQs](https://www.palantir.com/docs/foundry/workshop/application-design-faqs/) · checked October 18, 2026 · Ready for Review*

The docs' design guidance, turned into a checklist to run before showing a module to its users, followed by the docs' answers to the questions builders keep asking.

## The checklist

**[Docs]** Numbers and rules from the three pages:

**Load per screen**
- [ ] No more than **five** primary actions in the top-level navigation.
- [ ] No more than **ten** visible components (buttons, panels, widgets) in one view.
- [ ] Whitespace around **30–40%** of the screen.

**Layout and hierarchy**
- [ ] Follows an **F-shaped** reading pattern: filters anchored in the left-most section, content flowing right.
- [ ] One page header for the app's purpose; section headers for groups; subheadings as section descriptions.
- [ ] **Compact** padding by default; the docs' reliable custom setting is 80% height or width with 16 px spacing.
- [ ] An outer drop shadow (or other shaded style) used **once per page**, on the main content or primary modal. Inner shadow and darker backgrounds for less important parts.

**Tables and lists**
- [ ] A count on every table or list: a Metric Card in **Tag** style in the section header.
- [ ] Detail in collapsible panels, not overlays that hide the list.
- [ ] No horizontal scrolling: *Fit columns horizontally* on Object Tables.
- [ ] Touch targets at least **30 px** in scrolling sections.

**Buttons**
- [ ] One primary action per group, first from the left, coloured by its **intent**; other actions de-emphasised or in a menu.
- [ ] Not every button a different colour.
- [ ] Icons that say what happens; arrows for navigation (horizontal for within the module, angled for a new tab).
- [ ] Sentence-case labels in plain language, placed next to the widget they act on.

**Filtering**
- [ ] Filter List **vertical** layout for many simultaneous filters; **Pills** (or Exploration Filter Pills) for compact, frequent filtering; **Exploration Search Bar** for expert, complex queries.

**Consistency across apps**
- [ ] A landing page that centralises navigation, with thumbnails for embedded modules.
- [ ] The same header (logo top-left, settings top-right) and the same placement of filters, tabs, metric cards and buttons in every module.
- [ ] Typography: a **system font** rather than a custom typeface. A custom typeface renders only if the viewer has it installed, and there is no way to upload a font to Foundry.

**[Docs]** To validate: squint at the screen to see what stands out, keep checking against real user workflows, and hide any element that isn't needed where it sits.

## The questions builders keep asking

**[Docs]** From the FAQ and the overlay guidance:

| Question | The docs' answer |
|---|---|
| Object Table or Object List? | **Table** for many attributes, comparison, sorting and bulk actions; **List** for simple content with few attributes and single-item actions |
| Modal or drawer? | **Modal** (centred) for critical tasks needing full attention: confirmations, alerts, action forms. **Drawer** for secondary tasks where the main content should stay visible |
| Overlay at all? | For temporary, secondary interactions. Not for analysis that needs several layers visible at once. A dialog blocks the background, so put inputs next to any long text users must read |
| Collapsible or hidden section? | **Collapsible** when the section's place should stay visible (side panels, filters); don't stack them. **Hidden until a button** when the content is only relevant to certain actions, or space is tight |
| Side panel open by default? | When it's essential or frequently used, simple, and users have large screens. Otherwise collapsible or hidden |
| When to embed modules? | To separate logic, cut the variable count of a large module, or reuse one interface on several pages ([02-04](../02-workshop-data-and-logic/04-embedding-modules.md)) |

## Applied: the Delivery Desk queue

**[Example]** Run against the checklist, the queue from [Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md) needs three changes:

1. The two buttons, *Hold order* and *Re-route shipment*, are both coloured. *Hold order* is the common action, so it becomes the primary (first, coloured); *Re-route shipment* moves to a de-emphasised style.
2. The table has no count. A Metric Card in Tag style ("23 at risk") goes in its section header.
3. The *Hold order* form opens in a **modal**, which is right for an action form. The order panel stays a collapsible section, not a drawer, so agents can scan the list while reading it.

---
[Module index](README.md) · Previous: [04 — Permissions](04-permissions.md) · Next module: [02 — Workshop data and logic](../02-workshop-data-and-logic/README.md)
