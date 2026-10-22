# 03 — Configuration and permissions

*Sources: [Configure permissions](https://www.palantir.com/docs/foundry/carbon/permissions-configure/) · [Set a default workspace](https://www.palantir.com/docs/foundry/carbon/permissions-default-workspace/) · [Carbon as the landing page](https://www.palantir.com/docs/foundry/carbon/permissions-landing-page/) · Configuration: [General](https://www.palantir.com/docs/foundry/carbon/configuration-general/), [Home](https://www.palantir.com/docs/foundry/carbon/configuration-home/), [Menu bar](https://www.palantir.com/docs/foundry/carbon/configuration-menu-bar/), [Access](https://www.palantir.com/docs/foundry/carbon/configuration-access/) · [YAML example](https://www.palantir.com/docs/foundry/carbon/code-example/) · [YAML reference](https://www.palantir.com/docs/foundry/carbon/code-reference/) · [Dark mode](https://www.palantir.com/docs/foundry/carbon/dark-mode/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Carbon settings live at two levels. The **organization** level (promoted workspaces, the Navigation Menu's links, dark mode) belongs to Carbon administrators. The **workspace** level (what one workspace shows) belongs to whoever can edit that file.

## Who can do what

| Role | Can | Granted by |
|---|---|---|
| **Carbon administrator** | Promote and order workspaces, set organization links and dark mode, set default workspaces | Control Panel → organization permissions: the **User experience administrator** role, or a custom role with *Manage Carbon workspaces*; per organization |
| **Editor** | Edit one workspace's home page and menu bar | Edit access on the workspace file |
| **Viewer** | Use a workspace | View access on the file. It appears in the menu only if **promoted** for their organization; otherwise by exact URL |

**[Docs]** Two consequences:

- An editor can build a draft workspace freely, but **can't** put it in anyone's Navigation Menu. Even a group's default workspace doesn't show in the menu unless an administrator promotes it.
- Access to a workspace **isn't** access to its modules, objects or apps. Each keeps its own permissions.

## Where users land

**[Docs]** A **default workspace** is where `/workspace/carbon/` sends a user. It must be **promoted** and list the user's group under *Default workspace* (Access tab); that list saves immediately.

- **No default**: the user picks from promoted workspaces on first visit; afterwards the most recent one is used, remembered in a **browser cookie** (another browser or cleared cookies means choosing again).
- **Two or more defaults** (one group with several, or several groups with different ones) count as **no default**.

**[Docs]** To make Carbon the Foundry home page, set the **Home page URL** to `/carbon` in Control Panel → *Platform experience*, for the organization or, with *New home page URL*, for specific groups.

## The four tabs

### General

**[Docs]** Name and description; **discoverable modules** ([02](02-modules-and-navigation.md#open-in-discoverable-modules)); **appearance** (override the organization's light or dark theme); **navigation out of Carbon**, which external links and some utilities depend on; **external links**, optionally copied from the organization's; **menu bar utilities** (notifications); the **search bar** (hide it, or default it to object types or type groups); **Enable AIP Assist**; and **Delete workspace**, which is permanent.

**[Docs]** AIP Assist is **off** by default in workspaces. With it on, users can reach the AIP Assist chatbots configured in Chatbot Studio that they have access to.

### Home

**[Docs]** Logo (an image from a project, with maximum dimensions), subtitle, and columns **A, B, C** of **featured items**: objects, object types, saved explorations, modules and more, as default widgets (favourite objects, saved explorations) or custom ones. Each widget is a **list** (compact) or **cards** (larger, with thumbnails; better for few items). *Replace Home with Compass Resource* uses a module as the home page instead.

### Menu bar

**[Docs]** **Anchored modules** are permanent tabs: object views, object sets or explorations, object type explorations, Workshop modules, Quiver templates, Slate apps, Search. The docs strongly recommend keeping them to what users need **daily**. **New-tab modules** go behind the **+**. Only some notifications reach the Carbon menu: announcements, Ontology actions, comments on objects, shared resources, access requests, approvals and issues.

### Access

**[Docs]** The workspace's file location (follow it to change permissions or move it), **visibility** (*Link only* or *Promoted*; promoting needs an administrator) and the **default workspace** groups.

## YAML

**[Docs]** Every workspace can be edited as YAML, covering metadata, icons (Blueprint or Palantir application), discoverable modules, anchored and multi-tab modules, and home sections. To pass a Workshop module interface variable, add it to `parameterValues` with the `variable.` prefix; the reference's example passes `status` = `Open`.

**[Explanation]** YAML makes a workspace reviewable as text, which suits a governed setup. Saving still publishes immediately, so keep a copy of the YAML before large changes and use version history to roll back.

## Dark mode

**[Docs]** Carbon administrators enable dark mode for all of an organization's workspaces in *Configure organization metadata*. A workspace's *Appearance* setting overrides it.

## Kestrel: who lands where

**[Example]** For the Delivery Desk workspace ([01](01-carbon-workspaces.md#kestrel-a-delivery-desk-workspace)):

- A user experience administrator promotes it and sets it as the **default** for the CS agents group only.
- Control Panel sets the CS agents' home page URL to `/carbon`, so agents start their day in the workspace.
- Agents also in another group with a different default workspace would end up with **no** default. **[Explanation]** Check group memberships before assigning defaults; team leads in both the agents and operations groups are the likely case.
- AIP Assist stays off: the Delivery Desk chatbot already sits inside the queue module.

---
[Module index](README.md) · Previous: [02 — Modules and navigation](02-modules-and-navigation.md) · Next module: [10 — Workflow tools](../10-workflow-tools/README.md)
