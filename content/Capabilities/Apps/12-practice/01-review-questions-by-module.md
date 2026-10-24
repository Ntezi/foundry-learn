# 01 — Review questions by module

*Sources: the notes each question links to · written October 21, 2026 · not yet attempted*

Scenario questions in the style of the Application Developer Associate exam: a situation, a question, and the answer folded away. Each is tagged with its exam domain from the [official guide](../../../Tracks/Application%20Developer/07_Exam_Guide.md):

- **D4** Workshop application development
- **D5** OSDK, APIs and external applications
- **D6** Automate and operational workflows
- **D8** Application security, governance and operations
- **—** not in the Associate guide (useful for work, not the exam)

Answer before opening each one. Every answer links to the note that explains it.

## 00 — Orientation

**Q1 · D4** A team's new app shows late shipments on a chart and a table. Users then phone carriers and update a spreadsheet. Which of the docs' checks says this isn't an operational application yet, and what's the smallest change that fixes it?

<details><summary>Answer</summary>

"The user has to act somewhere else" and "Nothing is written back". Add an action (for example *Re-route shipment*) the user runs from the same screen, so the decision is recorded in the Ontology. [00-01](../00-orientation/01-operational-applications.md)
</details>

**Q2 · —** Workshop has no widget for a candlestick chart that one page needs. Which builder do you choose?

<details><summary>Answer</summary>

Keep the app in Workshop and add a **custom widget** for that one visual. Leaving Workshop for Slate or React to get one widget costs more than it saves. [00-02](../00-orientation/02-choosing-a-builder.md)
</details>

## 01–04 — Workshop

**Q3 · D4** A button sets `selectedOrder` and then opens a form that reads `orderSummary`, a variable computed from `selectedOrder`. Users sometimes see the previous order's summary. Why?

<details><summary>Answer</summary>

Events run in order **without waiting** for downstream variables to recompute, so `orderSummary` can still hold the old value when the form opens. Compute what the second step needs from the event's source, or split it into two clicks. [01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md)
</details>

**Q4 · D8** Kofi sees only his region's shipments in the queue. He exports the table to CSV and emails it. Is the region restriction still enforced on the file?

<details><summary>Answer</summary>

No. Row security controls what he can load; once exported, the file carries no policy. That's why the queue leaves CSV export off. [01-04](../01-workshop-foundations/04-permissions.md), [03-01](../03-workshop-widgets/01-core-display-widgets.md)
</details>

**Q5 · D4** The *Hold order* form should always act on the order selected in the table, and agents must not change it. How do you configure the `order` parameter?

<details><summary>Answer</summary>

Default it to `selectedOrder` and set its visibility to **Disabled**: the agent sees which order, but can't switch it. The action's submission criteria still apply; Workshop needs no extra check. [02-01](../02-workshop-data-and-logic/01-actions-in-workshop.md)
</details>

**Q6 · D4** The same order panel is needed in two modules. What do you build, and what makes a fix reach both?

<details><summary>Answer</summary>

A child module with a **module interface** variable (`order`), embedded in both parents with the variable mapped. Publishing the child updates both. [02-04](../02-workshop-data-and-logic/04-embedding-modules.md)
</details>

**Q7 · D4** An Iframe widget hosts a bidirectional custom app that must receive an object set of 50,000 orders and a struct. What goes wrong, and what do the docs recommend instead?

<details><summary>Answer</summary>

Bidirectional iframes cap object sets at **10,000** objects and don't support structs. The docs prefer a **custom widget** for new work. [03-06](../03-workshop-widgets/06-ai-observability-and-embedding.md#iframe), [06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md)
</details>

**Q8 · D4** A module should refresh automatically when orders change. What does auto-refresh require, and why might a shipment-status column still not update?

<details><summary>Answer</summary>

The watched object sets must be on **Object Storage v2**, with at least 10 seconds between refreshes. Only registered object sets are watched; a column from a linked Shipment isn't, so also register a set of the shipments (the queue uses a zero-size Object Set Title). [04-02](../04-workshop-in-production/02-performance.md#auto-refresh)
</details>

**Q9 · D4** A warehouse module is switched to Mobile. Which three widgets stop working, and what replaces the table?

<details><summary>Answer</summary>

**Object Table, Chart and Map** are disabled. Use an Object List (and Map [Legacy] if a map is essential). [04-05](../04-workshop-in-production/05-mobile.md#what-changes-in-a-mobile-module)
</details>

## 05 — Slate

**Q10 · D5** A partner without a Foundry account must see their order status in a Slate app. Will a public Slate app work?

<details><summary>Answer</summary>

No. Public apps can't read objects, datasets, actions or files; they can only **upload** data through secure-upload channels. Showing someone their own records needs an authenticated app or a backend with its own login. [05-01](../05-slate/01-slate-apps.md#integrated-and-public-apps)
</details>

**Q11 · —** A reset button sets `v_defaults` to the same object as before, and nothing resets. Why, and what's the fix?

<details><summary>Answer</summary>

Slate's dependency graph is **lazy**: setting a node to an unchanged value doesn't re-evaluate anything downstream. Add entropy, such as a random value, so it's seen as new. [05-03](../05-slate/03-functions-variables-and-handlebars.md#the-dependency-graph), [05-04](../05-slate/04-events-and-interaction.md#reset-to-defaults)
</details>

**Q12 · —** A query works with *Test* but times out in the app on page load. Name two likely causes.

<details><summary>Answer</summary>

Many root queries run at once on load; Postgate gives each user **10** connections and a queued query times out after **5 seconds** waiting. And Slate's own client timeout is **20 seconds**. Make data queries manual or conditional and push work upstream. [05-06](../05-slate/06-troubleshooting-and-query-performance.md)
</details>

## 06 — OSDK React and custom widgets

**Q13 · D5** A custom widget's OSDK calls fail even though the OSDK is configured. What step is likely missing, and who can do it?

<details><summary>Answer</summary>

The widget set's **Ontology APIs** must be enabled, by a user with the Information Security Officer role or a custom role granting *Enable widget set unscoped API access*. [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md#create), [06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md#the-osdk-inside-a-widget)
</details>

**Q14 · D5** You publish a fixed version of a widget set. Users of the Workshop module still see the bug. Why?

<details><summary>Answer</summary>

A new version doesn't update existing usages: each module keeps its configured version until someone selects the new one and republishes the module. (Workflow Lineage can bulk-upgrade custom widgets.) [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md#publish), [10-01](../10-workflow-tools/01-workflow-lineage.md#bulk-changes)
</details>

**Q15 · D8** A widget needs to store a draft between visits. Can it use `localStorage`?

<details><summary>Answer</summary>

No. The runtime blocks persistent browser storage. Keep state in Workshop variables passed as parameters, saved state, or the Ontology. [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md#runtime-limits)
</details>

## 07 — Pilot

**Q16 · D8** A Pilot-built app is released, but colleagues can't submit its new action. You can. Why?

<details><summary>Answer</summary>

Actions Pilot creates allow only **the user who created them** to submit. Change the submission criteria in Ontology Manager before others test. [07-02](../07-pilot/02-building-and-shipping.md#two-traps-after-the-first-release)
</details>

**Q17 · D8** A Pilot preview on **Production data** deletes a test task. Was main affected?

<details><summary>Answer</summary>

Yes. Production data reads the main Ontology branch and actions change real objects, even in Editor view or on a separate code branch. Test on a deployment branch instead. [07-01](../07-pilot/01-what-pilot-is.md#which-data-the-preview-uses)
</details>

## 08 — Automate

**Q18 · D6** An automation should fire when a payment's risk band **becomes** HIGH. Which condition, and why not *Objects modified in set*?

<details><summary>Answer</summary>

*Objects added to set* with the filter `band = HIGH`: an edit that makes a payment match the filter counts as an add. *Modified* fires on changes to objects already in the set. [08-02](../08-automate/02-conditions.md#object-set-conditions)
</details>

**Q19 · D6** A condition watches an interface with *older than 48 hours*. Can it be live?

<details><summary>Answer</summary>

No. Interfaces and relative time filters both force **scheduled** monitoring. [08-04](../08-automate/04-execution-settings.md#evaluation-frequency)
</details>

**Q20 · D6** A Logic function was switched to staged writes and now can't be selected in a Logic effect. Why, and what do you do?

<details><summary>Answer</summary>

A staged-write function doesn't return Ontology edits, which a Logic effect needs. Wrap it in an action type (Logic's *Create action*) and use an **action effect**. [08-03](../08-automate/03-effects.md#actions-logic-and-functions)
</details>

**Q21 · D6** An action effect occasionally runs twice for one trigger. Is that a bug?

<details><summary>Answer</summary>

No: effects are **at-least-once**. Make actions idempotent, for example check the current state before editing. [08-03](../08-automate/03-effects.md#effect-settings)
</details>

**Q22 · D8** An automation's owner leaves the company and their account is disabled. What happens, and how do you prevent it?

<details><summary>Answer</summary>

Action, Logic and function effects stop, because they run as the owner. Have a **third-party application's** service user own it: confidential client, client credentials, unrestricted, Editor on the automation. [08-05](../08-automate/05-security-ownership-and-history.md#third-party-application-ownership)
</details>

**Q23 · D8** A team wants everyone to see an automation's effect results, and the automation sends notifications. Can it be project-scoped?

<details><summary>Answer</summary>

No: project scope doesn't support notification effects. Split it: a project-scoped automation for the action, a separate one for the notification. [08-05](../08-automate/05-security-ownership-and-history.md#who-can-see-what-happened)
</details>

**Q24 · D6** An object type updated 100 times a day per object drives a costly automation. Which two changes do the docs recommend first?

<details><summary>Answer</summary>

Add a **time condition** to cap evaluations, and use **single execution** so one run handles all triggered objects; effects should take object sets. [08-06](../08-automate/06-operating-automations.md#performance-three-levers)
</details>

## 09 — Carbon

**Q25 · D8** An editor builds a workspace and sets it as a group's default, but nobody sees it in the menu. Why?

<details><summary>Answer</summary>

Only a Carbon administrator can **promote** a workspace, and a default workspace must be promoted. [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#who-can-do-what)
</details>

**Q26 · D8** Does access to a Carbon workspace give users access to the Workshop modules in it?

<details><summary>Answer</summary>

No. Each module, object and app keeps its own permissions. [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#who-can-do-what)
</details>

## 10 — Workflow tools

**Q27 · D8** An agent can't submit *Hold order*. Where's the quickest place to find out why?

<details><summary>Answer</summary>

Workflow Lineage on the module: Ontology permissions colour mode, **Debug permissions → Check action submission** for that user. [10-01](../10-workflow-tools/01-workflow-lineage.md#security-and-debugging)
</details>

**Q28 · —** You replace a deprecated model across twenty Logic functions in Workflow Lineage. Does it go through a proposal?

<details><summary>Answer</summary>

No. Bulk model replacement applies directly, with no review step, and skips functions you can't edit. [10-01](../10-workflow-tools/01-workflow-lineage.md#bulk-changes)
</details>

## 11 — Kestrel case

**Q29 · D4** Why can't Kofi's mobile module embed the Order panel child module?

<details><summary>Answer</summary>

In a mobile module only mobile modules can be embedded, and the panel isn't one. The Shipment screen uses a Property List instead. [11-02](../11-kestrel-case/02-warehouse-floor-mobile.md#what-a-phone-changes)
</details>

**Q30 · D8** A team lead is in both the CS agents group and the operations group, each with a different default Carbon workspace. Where does `/workspace/carbon/` send them?

<details><summary>Answer</summary>

Two or more defaults count as **none**: they choose from the promoted workspaces, and after that the most recently visited one is used, remembered in a browser cookie. [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#where-users-land), [11-03](../11-kestrel-case/03-delivery-desk-workspace.md#who-lands-there)
</details>

**Q31 · —** Inside the Delivery Desk workspace, *Open in* offers only the queue. Outside Carbon, the same user sees more modules. Why?

<details><summary>Answer</summary>

Inside a workspace, *Open in* shows that workspace's discoverable modules. Outside Carbon, it shows the **union** across all promoted workspaces in every organization the user belongs to or is a guest of. [09-02](../09-carbon-workspaces/02-modules-and-navigation.md#open-in-discoverable-modules)
</details>

**Q32 · D4** Daniel releases a new `delivery-widgets` version with a timeline fix. What has to happen before agents in the queue see it?

<details><summary>Answer</summary>

The Order panel module must select the new widget set version and be republished; the queue embeds the panel, so it picks up the published panel. Workflow Lineage can do the upgrade in bulk. [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md#publish), [11-01](../11-kestrel-case/01-delivery-desk-queue-built-out.md#shipping-and-operating-it)
</details>

---
[Module index](README.md) · Next module: [99 — Reference](../99-reference/README.md)
