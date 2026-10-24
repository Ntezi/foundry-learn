# 01 — Markings and classification-based access controls

*Sources: [Markings](https://www.palantir.com/docs/foundry/security/markings/) · [Manage markings](https://www.palantir.com/docs/foundry/platform-security-management/manage-markings/) · [Classification-based Access Controls](https://www.palantir.com/docs/foundry/security/classification-based-access-controls/) · checked October 23, 2026 · Ready for Review*

Three parts. **What a marking does** (the rules), **how markings are run** (categories, permissions, applying and removing safely, finding where one came from) and **classification markings** (the government variant, with its own rules). The Ontology area uses markings from [02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md) on; this is the full platform behaviour behind that.

## Part 1 — What a marking does

**[Docs]** A marking is an access requirement on files, folders and projects. Access is **binary**: "Regardless of role, a user cannot access a file in any way unless the user satisfies all marking requirements." Markings are **conjunctive**: a user must be a member of **all** markings on a resource. Platform administrators usually manage them per organization; they're meant to let data protection officers "centrally manage and audit exactly who can access any given category of data".

**[Docs]** The mandatory/discretionary contrast, in the page's own example: a user can be **Owner** of a dataset marked PII and still be unable to remove the marking, because removing needs the marking's centrally managed **Expand Access** permission. Discretionary controls, by contrast, "expand access and are granted through data sharing workflows without centralized restrictions": any Owner can make another user Owner.

### Two ways a marking is inherited

| Route | What carries it | Effect |
|---|---|---|
| **File hierarchy** | A marking on a project or folder | Every file and folder inside inherits it. Restricting a container always restricts everything in it |
| **Data dependency** | A marking on a dataset | Every dataset derived from it inherits it, as a **data marking**, through transform and analysis logic |

**[Docs]** The two routes produce different failures. A user who meets the **file** requirements but not the **data** requirements inherited from upstream "can detect the presence of the derived dataset and view the file metadata, but cannot access the data". A user who fails the file requirements can't discover the resource at all.

**[Explanation]** That distinction is the whole reason the two routes exist separately. A marking on a project hides existence; a data marking hides content while leaving the catalogue entry visible. The CBAC section below has the same split under the names *file classification* and *data classification*.

**[Docs]** Applying **and** removing a marking are both "sensitive" actions: applying propagates immediately down every file and data dependency and can lock out downstream users; removing at the point of application immediately removes it downstream too, whereas removing in a transformation removes it along data dependencies only.

### Markings restrict; roles provision

**[Docs]** "Markings should not be used to provision access." Being eligible for a marking (having done the PII training, say) doesn't mean a user should see every PII dataset; their **role** on each project still decides. The worked example: a finance user with the PII marking and Viewer on the finance project sees finance PII, and nothing else.

**[Recommendation]** The page's privacy rule is the design rule for this whole area: combine markings with resource permissions so that access reflects **eligibility and need**. Markings answer *may this person see this category at all?*; roles answer *does this person need this project?*

### Four ways to structure markings

**[Docs]**

| Structure | Rule | When |
|---|---|---|
| One marking per **sensitive data category** | PII, financial, health… Data with several sensitivities carries all of them; only users eligible for all can access | The most common structure; works best with written criteria for what counts as each category |
| One marking per **data owner** | *Sales Data*, granted at the sales team's discretion; propagation means the owner must also clear anyone who wants derived resources | When teams own their data and decide who sees it |
| Markings for **pipeline stages** | *Raw Data* on ingested data; removed after PII is hashed or encrypted and other markings applied | When raw data is unsuitable for end users |
| Markings to **restrict discovery** | Because they're all-or-nothing, markings hide the resource from search and from the project view | When existence itself must be hidden |

**[Docs]** The three worked examples: **healthcare tiers** (*Identifiable Data* → *De-identified Data* → *Synthetic Data*, each transform stage removing the previous marking and adding the next, with the marking manager reviewing the transform logic); **investigations** (a `Case - xxxxxx` marking per case so one investigator's cases never mix); and **banking** (one marking per team; Internal Compliance gets the other teams' markings for audits, writes its report under its own marking only, and grants the Data Protection Office that marking to read it).

### Scoped sessions

**[Docs]** Where enabled, a user picks a **subset of their markings** for the session at login; a banner names the session, *Change scoped session* switches (with a page refresh), and some users may choose **Unscoped access** to use all their markings. The purpose is "a visual separation between different types of work". [AIP 08-03](../../AIP/08-security-governance-and-admin/03-llm-data-access-with-markings.md) already uses scoped sessions for Kestrel Pay users who want to call models outside the Kestrel Pay policy.

## Part 2 — Running markings

### Categories and markings are permanent

**[Docs]** Markings live in categories, managed in *Foundry Settings > Markings*, which needs special platform permissions. **Categories can't be deleted. Markings can't be deleted or moved to another category.** The creator of a category is its administrator by default and can hand that over.

**[Docs]** Category **visibility** is set per category (organizations are the exception, each with its own setting). *Visible* (default): everyone in the organization can see the category and its markings exist, though users without a marking's permissions won't see that marking. *Hidden*: existence is sensitive, shown only to users explicitly granted **Category Viewer**. Visibility can't be set per marking; anyone with access to one marking in a category, or a role on it, can see the whole category and all its markings, even though the API won't list them as category viewers. A category can also be **restricted to one organization**.

| Category permission | Allows |
|---|---|
| **Category Administrator** | Change the category's description and permissions; create markings in it |
| **Category Viewer** | See the category and its markings exist |

### Marking permissions are four separate things

**[Docs]** Creating a marking grants the creator *Manage permissions*; the page recommends spreading the permissions below across several people rather than one administrator.

| Marking permission | Allows | Grants membership? |
|---|---|---|
| **Manage permissions** | Grant permissions to manage the marking, its members and metadata | No |
| **Apply marking** | Put the marking on projects and resources | No |
| **Remove marking** | Take it off (the user must also be able to apply it) | No |
| **Members** | See resources protected by the marking | This **is** membership |

**[Docs]** The page's example: someone with *Apply marking* and *Manage permissions* can mark files and administer the marking "but they could not see the data marked with that Marking". Membership is **global**: a member is entitled to that category of content everywhere, subject to roles. Members can't grant membership without administrative permission. Permissions granted to a group reach new members of the group.

**[Explanation]** This is the separation of duties the whole model rests on: the person who decides a dataset is PII, the person who decides who may see PII, and the person who sees PII can be three different people. Organizations have their own pair of permissions, *Apply organization* and *Expand access* ([01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#the-two-organization-permissions)).

### Applying a marking to a live pipeline

**[Docs]** To apply you need *Apply marking* on the marking **and** *Update Markings on resource* on the resource, which Owner has by default. Because the marking propagates immediately, the page gives a procedure for existing pipelines:

1. Confirm the marking exists.
2. **Branch** the pipeline. `stop_propagating` takes effect only on **protected** branches, so the stop points have to be merged before the marking is applied.
3. Review **data lineage** for the full set of downstream nodes.
4. Review **transaction types**. Markings propagate "at the transaction level": a dataset built with `SNAPSHOT` transactions (the default) depends only on the latest upstream transactions; one built with `APPEND` or `UPDATE` keeps dependencies on old upstream transactions and needs the separate guidance.
5. Decide **where to stop inheriting**, for example once the `DOB` column is dropped; **simulation mode** shows where the marking would propagate.
6. Add `stop_propagating` in those transforms on the branch and **merge**.
7. **Build** the stop-propagating datasets and everything downstream.
8. Review the simulated lineage: nothing below the stop points affected, no sensitive columns below them.
9. Apply the marking.

**[Docs]** If it goes wrong (a large group suddenly can't see data), remove the marking: it stops propagating immediately. Then re-check the simulation.

### Removing a marking

**[Docs]** Needs *Apply* **and** *Remove* on the marking, plus a role on the resource that allows changing its markings (Owner, with default roles). Two cases:

| Removing a… | How | Rebuild needed? |
|---|---|---|
| **Directly applied** marking | From the file, folder or project where it was applied; it leaves every dependency immediately | No |
| **Inherited** marking | Only on **restricted views** (*Stop Propagating* in the view editor) and **datasets** (`stop_propagating` in the transform). The branch must be protected **and** have *Require security approvals before merging* on; the syntax does nothing until merged | Yes: the stop-propagating datasets and everything downstream, along the latest transactions |

**[Docs]** Removing an inherited marking from a derived dataset doesn't open the upstream: "Users will still need access to the Marking to see upstream data."

**[Explanation]** The *Require security approvals* condition is the control that stops a developer unmarking data by merging a one-line change. The merge that activates `stop_propagating` is itself an approval event, which [DevTools 06-01](../../DevTools/06-branching-and-cross-app/01-global-branching.md) covers from the branching side.

### Finding where a marking came from

**[Docs]** The resource sidebar's *Access requirements > Markings* shows the marking with a **folder** icon if it came down the file hierarchy, or a **data lineage** icon if it came through a dependency. For the hierarchy, walk up the folders. For a dependency, use **Data Lineage** (*Legend > Permissions type: Data access in datasets*, expand upstream, find the origin), then the dataset's **Compare** tab, which shows the logic **and security** changes between transactions, for example a new input that introduced PII or a dropped input that removed it.

## Part 3 — Classification markings (CBAC)

**[Docs]** Classification-based Access Controls are **off by default**, differ between institutions, and need Palantir to configure. They protect "sensitive government information" and may line up with clearance processes outside the platform. They combine with roles and ordinary markings. Three things set them apart:

| Characteristic | Ordinary markings | Classification markings |
|---|---|---|
| **Hierarchy** | None built in (the healthcare example builds one by convention) | Built in: *Top Secret* users can read *Secret* |
| **Disjunction** | Always AND | A **category** can be disjunctive (OR), typically for **releasability**: *RELEASE TO GBR, CAN* is readable by anyone in GBR **or** CAN. Categories combine with each other conjunctively |
| **Ubiquity** | Optional | **Every project** needs a project classification; every dataset a data classification, so a raw dataset with no inputs needs a **file classification** set by its creator |

**[Docs]** The page's example: `mwashington` is in GBR and CAN, `jadams` in GBR only; data classified *GBR, CAN* in the disjunctive *RELEASE TO* category is readable by both.

**[Docs]** Three classifications on a resource:

| Classification | Governs | Set how |
|---|---|---|
| **File** | Whether a user can **discover** the file | Edited in the resource sidebar |
| **Data** | Whether a user can **view the data**; metadata (name, description, schema) stays visible | Can't be edited: it's the file classification combined with the data classifications of all upstream dependencies, so always at least as strict as either |
| **Project** | Whether a user can discover the project and access what's inside; chosen at creation, updatable, never removable | Project settings |

**[Docs]** Project classifications are **not** inherited along data dependencies (only data classification is), unlike project **markings**, which downstream datasets do inherit. The **project maximum classification** (the "allowed marking limit") caps what can be created in or moved into a project; it equals the project classification at creation and can be edited or removed separately. Removing it may be necessary to add object or link types, though a type without a file classification will fail to materialize. If an upstream file classification pushes a dataset's data classification above the maximum, the data stays protected, a warning shows, and **nothing in the project can build** until the upstream is fixed or the maximum raised: "the same behavior as project constraint violations" ([03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md)).

## For Kestrel

**[Example]** Kestrel has two markings, `Customer PII` and `Kestrel Pay – Financial` ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout), [AIP 08-03](../../AIP/08-security-governance-and-admin/03-llm-data-access-with-markings.md)). What this note adds, all *adopted* in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)):

- **One category, `Kestrel data`, visible**, holding both markings (and the `Audit` marking that [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md#for-kestrel) adds for the audit export). The names aren't sensitive; a hidden category would only make the request flow harder. Restricted to the Kestrel organization, so Northwind never sees them listed.
- **Permissions split three ways.** *Manage permissions* and *Category Administrator*: the platform administrators group. *Apply* and *Remove* on `Customer PII`: Priya's pipeline leads, because they decide where PII stops. *Members* of `Customer PII`: granted by Ama's team lead for customer service, by Lena for Kestrel Pay, after the PII training. *Members* of `Kestrel Pay – Financial`: Lena's group only; *Apply* and *Remove* on it: Kestrel Pay engineers, who own the ledger pipeline. Nobody holds *Remove* without *Apply*.
- **Where `Customer PII` stops.** It's applied on `Storefront [Datasource]`'s `/raw` folder and stops in `Commerce [Transform]` at `customer_master`'s downstream, in the transform that drops email and address into the separate `customer_contact` dataset, with `stop_propagating`. That needs `Commerce [Transform]`'s main branch to be protected with *Require security approvals before merging* on; Kestrel's two-approval policy ([Ontology 14-01](../../Ontology/14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md)) so far covers only the ontology projects, so extending it to the transform project is part of this proposal. `customer_contact` (new, adopted in Phase 7) keeps the marking; the Ontology's `Customer` object type backs onto both, and the property security policy from [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md) hides the contact properties from users without the marking. That's a worked case of the page's *pipeline stages* structure.
- **CBAC: not adopted.** Kestrel is a retailer with no classified data; its tiers are handled by the two markings and by roles. Recorded so no later note reaches for it.

---
[Module index](README.md) · Next: [02 — Granular policies](02-granular-policies.md)
