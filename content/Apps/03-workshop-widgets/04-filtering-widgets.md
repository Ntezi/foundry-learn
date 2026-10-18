# 04 — Filtering widgets

*Sources: [Filtering widgets](https://www.palantir.com/docs/foundry/workshop/widgets-filtering/) · [Filter List](https://www.palantir.com/docs/foundry/workshop/widgets-filter-list/) · [Object Dropdown](https://www.palantir.com/docs/foundry/workshop/widgets-object-dropdown/) · [String Selector](https://www.palantir.com/docs/foundry/workshop/widgets-string-selector/) · [Date and Time Picker](https://www.palantir.com/docs/foundry/workshop/widgets-date-time-picker/) · [Text Input](https://www.palantir.com/docs/foundry/workshop/widgets-text-input/) · [Numeric Input](https://www.palantir.com/docs/foundry/workshop/widgets-numeric-input/) · [Exploration Filter Pills](https://www.palantir.com/docs/foundry/workshop/widgets-exploration-filter-pills/) · [Exploration Search Bar](https://www.palantir.com/docs/foundry/workshop/widgets-exploration-search-bar/) · [Prominent Terms](https://www.palantir.com/docs/foundry/workshop/widgets-prominent-terms/) · [User Select](https://www.palantir.com/docs/foundry/workshop/widgets-user-select/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Filtering widgets fall into two kinds by what they output. **Filter widgets** output an **object set filter variable** that you apply to an object set. **Input widgets** output a plain value (a string, number, timestamp, object or user ID) that you use wherever a variable is accepted. The difference decides how you wire them.

| Widget | Output | Kind |
|---|---|---|
| **Filter List** | Object set filter | Filter |
| **Exploration Filter Pills** | Object set filter (optional) | Filter |
| **Exploration Search Bar** | Object set filter (optional) | Filter |
| **Prominent Terms** [Beta] | Object set filter | Filter |
| **Object Dropdown** | Object set of one object | Input |
| **String Selector** | String, or string array (multiple) | Input |
| **Date and Time Picker** | Timestamp | Input |
| **Text Input** | String (single line, text area or Markdown) | Input |
| **Numeric Input** | Number | Input |
| **User Select** | User ID string, or array (multiple) | Input |

**[Docs]** The overview also lists Object Selector (several objects), Checkbox and Date Input, which have no pages of their own in this sidebar.

## Filter List

**[Docs]** The workhorse. Per property you choose a display: keyword, histogram, single or multi-select, distribution chart, date pickers or timeline. Layout is **vertical** or **pills**. Users can add and remove filters if allowed.

**[Docs]** Points that matter in practice:

- The **filter output** variable is also how you set **default filters**: give it a default value and those filters apply on load.
- A filter output can filter object sets of **another** object type when the **property IDs match** (check them in Ontology Manager).
- **Several object types** in one Filter List (a union of sets): common properties need the same property ID and the same Object Storage version (V1 or V2).
- **Linked filters** filter on properties of linked objects, plus a *Has link* filter; on Object Storage v1 the linked filter limit is **100,000** objects.
- **Keyword** is the only option for string properties without exact-match support; regex search appears for properties with regex enabled in Ontology Manager. **Advanced syntax** allows bracketed Boolean searches (precedence: quotes, parentheses, NOT, AND, OR).

**[Example]** Ama's team needs "orders whose shipment is with DHL". On the queue's Filter List: a linked filter on Order → Shipment (via `Shipment.orderId`), carrier property, multi-select. Kestrel is on Object Storage v2 ([Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md)), so the 100,000 cap doesn't apply. The base set for the Filter List is its **own** variable, not the filtered one ([01-01](../01-workshop-foundations/01-workshop-at-a-glance.md#the-tutorial-read-against-kestrels-queue)).

## The exploration widgets

**[Docs]** **Exploration Filter Pills** and the **Exploration Search Bar** show the filters on a single-type object set in three modes: *Read only*, *Remove only* or *Update existing filters only*. The Search Bar adds property and link type pickers (all, prominent, visible, custom), value autocomplete, keyword filtering, and a clear button. The design guidance puts it for expert users with complex queries ([01-05](../01-workshop-foundations/05-design-best-practices.md)).

**[Docs]** **Prominent Terms** [Beta] counts matches for a fixed list of terms on one property and lets users click a term to filter; it may need Support to enable.

## Input widgets: the details that bite

**[Docs]**

- **Object Dropdown**: one object, optional "no selection", properties under the title, sorting (shared properties only across types), and search over on-screen, specific or all searchable properties.
- **String Selector**: dropdown, radio buttons or checkboxes; options static (in your order, no partial sorting) or from a string array; users can create options if allowed. There's no widget-level default: set the default on the **output variable**.
- **Date and Time Picker**: 12- or 24-hour, precision to the minute, second or millisecond; time zone static, local, or from a variable holding an **IANA** name (`Africa/Accra`, not `GMT+0`).
- **Text Input**: single line (with an *on enter* event), text area, or a **Markdown** editor (the Notepad editor; content stored as Markdown; no on-enter event; image syntax can break the rich view).
- **Numeric Input**: grouping, prefix and suffix; a **%** suffix divides the output by 100; min and max **clamp** the value; up to 10 decimal places.
- **User Select**: single or multiple; filtering to Multipass groups requires viewers to hold *View group membership* on the group's organization, or they see an error.

**[Example]** Kofi picks a cut-off ("due before 18:00") to list shipments that won't make today's last truck. Bind the Date and Time Picker's time zone to a string variable set to `Africa/Accra`, so 18:00 means 18:00 at the warehouse whichever office the user sits in. The picker outputs a timestamp, which compares correctly with `Shipment.eta`, stored in UTC ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)).

---
[Module index](README.md) · Previous: [03 — Media, documents and history](03-media-documents-and-history.md) · Next: [05 — Buttons, forms and navigation](05-buttons-forms-and-navigation.md)
