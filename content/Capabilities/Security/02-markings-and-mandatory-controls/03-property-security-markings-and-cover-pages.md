# 03 — Property security markings and cover pages

*Sources: [Property security markings](https://www.palantir.com/docs/foundry/security/property-security-markings/) · [Cover pages](https://www.palantir.com/docs/foundry/security/cover-pages/) · checked October 23, 2026 · Ready for Review*

Two short pages about **what users see**, not about what they can access. Neither adds a control, and both are easy to mistake for one, so this note is mostly a pair of corrections.

## Property security markings: a label, not a lock

**[Docs]** Property security markings "display the markings and Classification-based Access Controls (CBAC) values configured through object and property security policies" when a property is shown in three Workshop widgets: **Property List**, **Object List** and **Object Table**. More widgets and applications are promised. They're "displayed strictly for informational purposes", as a condensed grey pill that expands when selected.

**[Docs]** Foundry still checks every property against its real requirements whether or not the pill is shown. The pill can also **understate** the requirement: a property marked *Mock Unclassified* inside an object marked *Mock Secret* displays as *Mock Unclassified*, but seeing its value needs *Mock Secret*.

**[Explanation]** So the pill tells a user *which marking this value carries*, which is useful when deciding whether to paste it into an email. It doesn't tell them *everything they needed to be able to see it*: the object-level requirement is left off. Anyone reasoning about who can see a value must go to the policies themselves ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)) or to *Check access* ([03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md)).

### Turning it on

**[Docs]** *Show security markings* in the widget's setup tab, then a display option:

| Option | Shows |
|---|---|
| **Responsive** | The full marking when there's room, a truncated tag otherwise, full text on hover. Not available on Object Table |
| **Full Tag** | The full marking always, wrapping at narrow widths |
| **Icon Only** | The icon; full marking on hover |

**[Docs]** Enrollments **without CBAC** get none of these options: just a shield icon beside properties with mandatory markings, labels on hover. Selecting the pill (Object List, Property List) or hovering the value (Object Table) opens the expanded view.

### Per base type

**[Docs]** Struct values share one marking, shown in one pill. Array values each carry the same marking, shown in separate pills. A **derived** property can carry **different markings per value** when it collects from several properties with *Collect list*. Not supported at all: arrays of cipher text, media references, attachments, geoshapes, geotemporal series references, time series and vectors. Not rendered on Object Table hover: attachment, cipher text, geotemporal series reference, media reference, vector.

**[Recommendation]** Turn it on for Kestrel Pay users' Object Tables (Lena's invoice review, [Ontology 17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)): a visible `Kestrel Pay – Financial` pill beside an amount is a cheap reminder before someone screenshots a table. Leave it off on Kofi's warehouse-floor module, where screen space is the constraint ([Apps 04-05](../../Apps/04-workshop-in-production/05-mobile.md)). *Adopted* in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)).

## Cover pages: documentation that outruns the marking

**[Docs]** A project's **Cover Page** is a Markdown editor for documentation: goals, where the active work is, **which groups new users should request access to**, and user guides for the applications in the project.

**[Docs]** The security-relevant sentence: owners can make the cover page "discoverable by all users in the Project's organization, even in cases when a Project has markings applied to it". Users without access to the project or its files can still find and read the cover page, which lets them find the project and request access.

**[Explanation]** This is the one documented exception to "markings hide existence" ([01](01-markings-and-classification-based-access-controls.md#part-1--what-a-marking-does)). It's deliberate: a marked project that nobody can find is a project nobody can request access to. The cost is that the cover page's **text** is readable by the whole organization, so it must not describe the sensitive data itself, only what the project is for and how to get in.

**[Recommendation]** Write a cover page as if it were public within the organization: purpose, owner group, request path. Never dataset names from a marked project, sample values, or schema.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)): every Kestrel project gets a cover page from the `kestrel-standard` template's checklist ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#for-kestrel)). For `Payments [Ontology]` and `Kestrel Pay [Datasource]` the page is made discoverable to the organization and says only: *Kestrel Pay financial data; owner Lena's group; request `Kestrel Pay – Financial` membership via the finance lead after training*. The **Portfolio** documentation ([01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#portfolios-organizing-projects)) carries the longer guide, because a Portfolio is visible to anyone with access to the space anyway.

**[Explanation]** The plan for this area suggested *property security markings on `Customer` PII columns* as an alternative to the existing property security policy. Having read the page, there is no alternative to choose: property security markings are the **display** of what a property security policy already enforces. Kestrel's control stays the policy in Ontology 12-03; this note only decides where the pills are shown. Logged in [SOURCES](../SOURCES.md#corrections-log).

---
[Module index](README.md) · Previous: [02 — Granular policies](02-granular-policies.md) · Next module: [03 — Discretionary controls, propagation and diagnosis](../03-discretionary-controls-propagation-and-diagnosis/README.md)
