# 03 — Users, groups and Portfolios

*Sources: [Users and groups](https://www.palantir.com/docs/foundry/security/users-and-groups/) · [Manage users](https://www.palantir.com/docs/foundry/platform-security-management/manage-users/) · [Manage groups](https://www.palantir.com/docs/foundry/platform-security-management/manage-groups/) · [Portfolios](https://www.palantir.com/docs/foundry/security/portfolios/) · checked October 23, 2026 · Ready for Review*

An **administrator's runbook**: each section is a situation, followed by what the docs say to do. Portfolios are at the end because they organize projects, not people, but they share the *Users and groups* concept pages.

## Who a user is

**[Docs]** A user is "an authenticated individual with access to Foundry", typically defined by an external **identity provider** such as Active Directory, which validates users at login and supplies their **attributes** (public, structured information: name, email, job title) and **groups**. Authentication and organization assignment are configured in Control Panel.

**[Docs]** The *Users* page under *Platform Settings* shows each user's permanent **User ID**, **Organization**, **Groups** and **Attributes** (key-value pairs other services use; the example is a geographical region attribute that a restricted view can filter on, [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md)).

### Situation: a new hire starts Monday

**[Docs]** Administrators with **preregister** permission can act on a user before their first login: create the username, add group memberships, assign the organization and markings. The username "needs to match the user's login username exactly" or none of it applies.

### Situation: *my token stopped working* after a holiday

**[Docs]** An account becomes **inactive** after **30 days** without a successful login. Inactive accounts behave normally except that **all their tokens are invalid**; the next successful login reactivates the account and its tokens with no administrator involved. Some groups and realms can be excluded from this rule (ask Palantir). A different message, *Your account has been locked*, needs your Palantir representative.

**[Explanation]** Service users are the ones to watch. A service user never logs in interactively, so a backend application whose service user isn't excluded from the inactivity rule can lose its tokens after a month of quiet. The *Manage groups* page gives the fix: put service users in an internal-realm group and exclude that group from expiry rules.

### Situation: "Your account has been disabled"

**[Docs]** That message means the account was **deleted**. An organization administrator with *Manage membership* can find it (`getDeletedUsers`, page size up to 1,000) and restore it (`undeleteExternalUser`) through the Multipass administration endpoints; the page gives both `curl` calls.

## Groups: where permissions should land

**[Docs]** A group is a set of users (and of other groups). Access to projects and resources "is usually granted to groups rather than individual users". A group is typically defined by the external identity provider.

**[Docs]** The *Groups* page shows name, description, permanent **Group ID**, **type** (external, internal or rule based), **realm**, the **organizations** whose members can see the group, **members**, **group permissions** and **attributes**. Two administrative permissions:

| Permission | Allows |
|---|---|
| **Manage permissions** | Granting the group's own permissions, managing members, editing metadata |
| **Manage membership** | Managing members, including expiration properties |

**[Docs]** You can only see groups of an organization on which you hold *View group membership*, granted under *Organizations > Manage > Organization permissions*.

### Realms: external vs internal groups

**[Docs]** A **realm** is an authentication source. External realms are set up in Control Panel (SSO, SAML, ADFS); Foundry also has an internal identity provider for cases where none fits.

| | External realm groups | Internal realm groups |
|---|---|---|
| Come from | The identity provider | Created in Foundry |
| Editable in Foundry? | **No**: read-only. Renaming, adding users, changing attributes, creating groups all happen in the external system | Yes |
| Best for | "most authorization and authentication-related functions": discretionary and mandatory controls, and allowing or denying platform access by group | Foundry-level functions, such as bundling **service user accounts** for allow- or deny-listing (for example excluding them from account expiry) |
| Access requests | Users **can't** request to join one in Foundry; Control Panel can show a custom message and URL (the example points at a Jira instance) to users in the same realm | Requests route to the group's administrators |
| Organization | **Must** be assigned one; otherwise the group is visible to every user regardless of organization | Assigned on creation |

**[Docs]** External realm groups can also drive **organization assignment at login**: the SSO group membership decides which organization a user lands in.

**[Recommendation]** The page's own rule, worth repeating: when external groups are in use, **don't add users directly to internal groups**. Nest the external group inside the internal one, so membership keeps being managed in one place.

### Situation: a contractor needs access for six weeks

**[Docs]** With *Manage membership* you can make all **new** memberships temporary by setting **Latest expiration** (every new membership must end before this date) and/or **Maximum duration** (every new membership must end within this long); when both are set, the more constraining one wins. You can also add individual temporary members to a group that has neither setting. Access requests that lead to membership in such a group are bounded the same way.

**[Docs]** Notifications: a revocation notice when a membership expires, and a reminder **seven days** before, unless the membership was created with less than seven days left. Users can switch these off under *Account > Settings > Notifications*.

### Situation: the request form confuses people

**[Docs]** Three levers on the access request pop-up ([02](02-projects-roles-and-project-templates.md#3-someone-wants-in-what-happens)):

1. **Custom request forms.** Add an attribute to a group with a role on the project, key `access-request:'group-category-name'` and the intended value (the example: key `access-request: Team`, value `blue`). The attribute appears in the form so the requester picks a category instead of a group name.
2. **Exclude groups.** In the project's *Access panel > Settings > Project access request*, an Owner hides groups from the form (others can view the list). It's **per project**: an admin group can be hidden everywhere except one designated project, and someone approved there gains the group's access **everywhere it has a role**.
3. **Custom approval policies [Beta].** Users with either group permission can attach a policy to the group's membership requests. An access request is approved only when **all** its subtasks are, so the policy on the group-membership subtask gates the whole request. Policies are shown to the requester and the reviewer.

**[Explanation]** Lever 2 cuts both ways. Hiding the admin group stops accidental requests, but the approval in the designated project is an approval for the group's access to **every** project it has a role on. Whoever reviews requests in that project is, in effect, approving platform-wide access.

### Situation: *what would this group lose if I removed her?*

**[Docs]** The group's **Project access** tab lists every project the group has a role on and which role. *Show inherited permissions* (on by default) walks nested groups; off, it shows only direct grants.

### Situation: a group needs renaming

**[Docs]** With *Manage membership* you can rename. Three things happen: the group is renamed with its ID unchanged; a **new group with the old name** is created for applications that depend on the name; and the renamed group is made a **member** of that new group. The page recommends not renaming at all.

**[Explanation]** Anything keyed on the old name keeps working because the old name now resolves to a group that contains the renamed one. Nothing keyed on the ID notices. The cost is a second group to remember.

### Situation: who do I contact about this project?

**[Docs]** A group can carry **contact details** (Foundry Issues or an email), and a project Owner can set the group as the project's **point of contact** in the project overview.

### Situation: a restricted view rule names a group

**[Docs]** The rule editor needs the group's **realm** so the name matches; look it up on the *Groups* page and set it at the bottom of the rule editor ([03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md)).

### The recommended project setup

**[Docs]** At least **three groups per project**, one per default role (Viewer, Editor, Owner), with the project's **default role set to Discoverer**. Grant permissions to groups, not users, so they are "more transparent and auditable".

## Portfolios: organizing projects

**[Docs]** A Portfolio organizes projects **within a space**. Each project belongs to **at most one** Portfolio; moving it to another removes it from the first. Anyone with access to the space can see its Portfolios, but still needs permissions on each project inside.

| Who | Can |
|---|---|
| Space **Editor** | Create a Portfolio (unique name in the space; optional description and thumbnail) and manage its contents |
| Administrators and **curators** | Edit name, description and logo (not the space, which is fixed at creation); add Markdown documentation visible to everyone who can see the Portfolio; add or remove projects (optionally with display names); promote pinned resources into the Portfolio **catalog** |
| Users with management access | Extend the **curators** list from the Portfolio sidebar |

**[Docs]** The catalog shows resources pinned in member projects, grouped by project or resource type; the project sidebar lists the member projects.

**[Explanation]** A Portfolio adds no security: it changes what people see on the Portfolios page, not what they can open. That is also why [Apps 10-04](../../Apps/10-workflow-tools/04-use-cases-sunset.md) points to it as the replacement for Use Cases: Use Cases were a way of grouping and documenting projects, and that's what a Portfolio is.

## For Kestrel

**[Example]** The open gap in [17-02 §9](../../Ontology/17-case-studies/02-kestrel-reference-model.md#9-known-gaps-in-the-example): should Kestrel's projects sit in a Portfolio? *Adopted answer:* yes, **two**. A `Commerce` Portfolio holding `Storefront [Datasource]`, `Commerce [Transform]`, `Commerce [Ontology]` and `Delivery Desk [Workflow]`, with the Delivery Desk's documentation page as its Markdown; and a `Kestrel Pay` Portfolio holding `Kestrel Pay [Datasource]` and `Payments [Ontology]`. One project, one Portfolio, so the split follows the marking boundary. Curators: Ama for Commerce (she owns the Delivery Desk's documentation), Lena for Kestrel Pay. Neither needs space Editor for that. The Northwind shared space gets no Portfolio. Adopted in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)).

**[Example]** Groups, *adopted* in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)): all human groups come from Kestrel's identity provider (external realm) and are nested in internal groups named by the project template ([02](02-projects-roles-and-project-templates.md#for-kestrel)); one internal group `kestrel-service-users` holds the customer portal's and nightly export's service users ([DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md)) and is excluded from the 30-day inactivity rule. Kestrel's external auditors, who review the refund ledger once a year, get a **temporary membership** of a `kestrel-pay-auditors` group with *Maximum duration* set to the audit window, rather than a standing grant; Tomás's fraud work is continuous, so his access stays a normal group membership. Kofi's warehouse staff carry a `region` attribute from the identity provider, which [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)'s policy already relies on.

---
[Module index](README.md) · Previous: [02 — Projects, roles and project templates](02-projects-roles-and-project-templates.md) · Next module: [02 — Markings and mandatory controls](../02-markings-and-mandatory-controls/README.md)
