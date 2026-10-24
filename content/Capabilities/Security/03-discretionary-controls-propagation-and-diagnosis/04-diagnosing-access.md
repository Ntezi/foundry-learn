# 04 — Diagnosing access

*Sources: [Checking permissions](https://www.palantir.com/docs/foundry/security/checking-permissions/) · [Emulation mode](https://www.palantir.com/docs/foundry/security/emulation-mode/) · checked October 23, 2026 · Ready for Review*

A **troubleshooting guide**: the complaint, then the tool that answers it. Exam domain 8 calls this *operational diagnosis*; [Apps 01-04](../../Apps/01-workshop-foundations/04-permissions.md) has the Workshop-specific symptom table, and this note is the platform tooling behind it.

## The two questions behind every complaint

**[Docs]** The *Check access* panel splits a user's position on a project, folder or file into two lists:

| List | Contains | Failing it means |
|---|---|---|
| **Access requirements** | Organization and marking requirements; at least one role (direct, via a group, or the default role) | The user can't see the resource |
| **Additional data requirements** | Whatever else the file needs: markings inherited **through lineage** for a dataset's data; for a Workshop module, the object types, link types, action types and datasources it uses | The user sees the resource and its metadata but not the data, or sees the module with holes in it |

**[Docs]** The page's two examples: John Smith meets a dataset's access requirements but not its data requirements because of a `Common: Food` marking inherited through lineage, so he "can see the dataset and its metadata, but not its data". On a Workshop module he meets the access requirements, and the panel lists the module's object, link and action types with coloured dots showing which he has; the arrow icon opens each.

**[Explanation]** This is the same file-vs-data split as in [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#two-ways-a-marking-is-inherited). The panel is the fastest way to tell the two apart, which matters because they have different fixes: a missing role is granted by a project owner; a missing inherited marking is granted by the marking's administrators, or removed upstream by whoever owns the pipeline.

## *She can't open it* → Check access

**[Docs]** On the resource: sidebar, *Access > Check access* (the "Access checker"). Enter the user. If *Access requirements* fails, read which of organization, marking or role is missing. Nothing further to diagnose.

## *She can open it but it's empty* → Additional data requirements

**[Docs]** Same panel, second list. For a dataset, an inherited marking. For a Workshop module, one of its dependencies.

**[Explanation]** For objects, "empty" has two more possible causes the panel doesn't show: an object security policy that gives her zero rows, or a property security policy that blanks a column ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)). Those are read filters, so they aren't *requirements* and don't appear here. Emulation mode (below) is how you see them.

## *Half the pipeline is red for him* → Data Lineage

**[Docs]** From *Explore data lineage* in the panel, or in Data Lineage set *Node coloring* to **Permissions**, with two sub-options: **Resource access** (does the user meet each node's access requirements) and **Data access in datasets** (does he meet the additional data requirements; datasets only). Select a node and open *Access information* for the same detail as the panel. The page's example: Jane Doe meets the access requirements of one dataset but not `Fruit` (no `Common: Food` marking), and fails the data requirements for every dataset downstream of it, including `Derived Fruit`.

**[Explanation]** Colour the graph by *Data access in datasets* and you're looking at marking propagation ([03-01](01-access-control-propagation.md)) drawn out: the point where the nodes turn red is the dataset that introduced the marking. That is also how [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#finding-where-a-marking-came-from) says to find a marking's origin.

## *Who even has this marking?* → Access graph

**[Docs]** The **access graph** shows relationships between projects, users, groups and markings. Select a node to expand into related entities: from the `My analysis` project to its markings and groups, from the `Developers` group to its members.

## *Will it work for them before we ship?* → Emulation mode [Beta]

**[Docs]** Emulation mode makes a **scoped session** from a subset of your own groups and markings, for "testing workflows before releasing to end-users". You need **unscoped** marking access and the ability to scope groups, both set by your organization's scoped-session configuration in Control Panel (*Security presets & scoped sessions*).

**[Docs]** *Account > Enable emulation mode*, then: pick the **groups** to keep (none is valid: you then behave as a member of no groups); review the markings those groups **inherit** and add more if wanted; start. A banner shows the active groups and markings. The restriction applies "across all resources in Foundry": role grants, rows in restricted views, objects under an object security policy, actions whose submission criteria you satisfy. *Exit emulation mode* from the banner or account menu restores full permissions (or asks you to pick a scoped session if you have several).

**[Docs]** What it does **not** change: your **organizations** and your **user attributes**. The page's example: of eight groups, keeping only *Group 1* also keeps *Group 7* (nested) and *Marking 2* (inherited through Group 1).

**[Explanation]** The attribute limitation decides what emulation can test. Kofi's regional policy compares a `region` **attribute** ([02-02](../02-markings-and-mandatory-controls/02-granular-policies.md)); Daniel can't emulate Kofi's region, because his own attribute stays. He **can** test a group-based policy, a marking, or a role by dropping his own groups. For attribute policies, the test is a real account in a test enrollment, or a second identity.

## The diagnosis table

| Complaint | First tool | What you're looking for |
|---|---|---|
| Can't find or open the resource | Check access → *Access requirements* | Organization, marking or role missing |
| Opens, but no data / blank module parts | Check access → *Additional data requirements* | Inherited marking; a dependency of the module |
| Opens, but fewer rows or blank columns than a colleague | Emulation mode with that colleague's groups, or the policy itself | Object or property security policy, restricted view policy |
| Many datasets fail for one person | Data Lineage, *Permissions* colouring | The node where the marking enters |
| *Who can see this?* rather than *why can't she?* | Access graph | Groups and markings around the project |
| Testing an app before release | Emulation mode | Behaviour with fewer groups and markings; not attributes |

## For Kestrel

**[Example]** Kestrel's release checklist for a Delivery Desk version ([DevTools 09-03](../../DevTools/09-kestrel-case/03-delivery-desk-product-release.md)) gains two steps, adopted in Phase 7: Daniel runs the queue module in emulation mode with only the `delivery-desk-viewers` group (no `Customer PII`), confirming the module opens and the contact properties are blank rather than erroring; and Ama's team lead runs *Check access* for one new CS agent on the module, confirming *Additional data requirements* lists exactly the object types the module uses. Kofi's regional behaviour is **not** tested this way, because emulation can't change the `region` attribute; it stays a test-enrollment check with Kofi's test account.

---
[Module index](README.md) · Previous: [03 — Project constraints](03-project-constraints.md) · Next: [05 — Download controls and the two deprecated settings](05-download-controls-and-the-two-deprecated-settings.md)
