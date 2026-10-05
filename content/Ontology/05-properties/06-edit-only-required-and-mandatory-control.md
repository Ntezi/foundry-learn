# 06 — Edit-only, required and mandatory-control properties

*Sources: [Edit-only properties](https://www.palantir.com/docs/foundry/object-link-types/edit-only-properties/) · [Required properties](https://www.palantir.com/docs/foundry/object-link-types/required-properties/) · [Mandatory control properties](https://www.palantir.com/docs/foundry/object-link-types/mandatory-control-properties/) · [Restricted views](https://www.palantir.com/docs/foundry/security/restricted-views/) · [How user edits are applied](https://www.palantir.com/docs/foundry/object-edits/how-edits-applied/) · checked October 2, 2026 · Ready for Review*

Three property settings that change *who may write a value, whether it may be empty, and who may see the rest of the object*. All three are **OSv2-only**.

## Edit-only: values that only people write

**[Docs]** An edit-only property **isn't mapped to any column** in the backing dataset. Its values come only from user edits through actions. It must still be "permissioned to" one of the type's datasets: when there are several, you pick which one.

You can later map it to a real column by untoggling *Edit-only* and choosing the column.

**[Docs]** Two related facts:

- If *every* property is populated by edits, create the object type **without a backing datasource** instead.
- Removing a type's backing datasource turns all its mapped properties into edit-only ones ([04 — Creating and editing](../04-object-types/04-creating-and-editing-object-types.md)).

**[Docs]** Edits to edit-only properties always apply, even when the datasource uses the *Apply most recent value* conflict strategy. There is no source value to compare against.

**[Example]** `Order.holdReason` and `Order.heldBy` are edit-only. Ama's *Hold order* action sets them. No source system knows about holds, so there's no column to map. This is **decision data** in the sense of [00 — Why an Ontology](../00-orientation/02-why-an-ontology.md).

## Required: values that can't be missing

**[Docs]** A required property must have a value: not null, and for arrays, not empty.

- **Indexing:** the check runs when data is **indexed**, not when you save the Ontology change. A save can succeed while the backing column still contains nulls; the **reindex then fails**. Fix the data or unset *Required*.
- **Actions:** writing null or empty through an action makes the action **fail**.
- **Empty arrays:** a required array can be set to allow empty arrays. Note that an action writes an empty array to any mapped property whose parameter was left blank. Allow empty arrays only if that's acceptable.

**[Docs] The multi-datasource trap.** On an object type backed by several datasources (an MDO), a required property is enforced only for objects **present in the datasource that supplies it**.

The docs' example is a `Movie` whose required *Genre* comes from datasource 2. A movie present only in datasource 1 indexes fine, with an empty Genre. If an action then adds a value from datasource 2, such as *Budget*, the movie now exists there too. Genre is enforced, and the action fails.

**[Explanation]** "Required" therefore means "required wherever this datasource has a row", not "required for every object". Pair it with a pipeline check if you need the stronger guarantee.

## Mandatory control: rows that carry their own markings

**[Docs]** A mandatory-control property holds **markings, organizations or (with CBAC) classifications** for each object. It restricts access to **all the other properties from the same datasource**: only users who satisfy the values can see them.

How it is wired:

1. Build a **marking-backed restricted view**. Its backing dataset has a `STRING ARRAY` column of marking (or organization) IDs, and the view's policy compares the user's markings with that column.
2. Map the property to that column and set its base type to **Mandatory Control**.
3. On the datasource, declare the **allowed markings and/or organizations**, or a **max classification**.
   - Values outside the allowed set fail indexing, and edits that set them are rejected.
   - These allowed values also mark any dataset **materialized** from the object type.
4. With several datasources, give each one its own mandatory-control property. Each secures only its own datasource's properties; others appear **null** to users who lack access.

**[Docs] Rules worth remembering:**

- Mandatory-control properties must be **required**, but may be **empty arrays**, which means visible to everyone.
- **Markings and organizations combine:** a user needs all the markings and at least one of the organizations. **Classifications** can't be combined with either.
- They are **hidden** by default.
- **Retrofitting:** to add one to an action-only type that already has objects, add a nullable string-array property, backfill it with an action, then change its base type.
- **Actions** can take marking or classification parameters to set the property on new objects. Organization parameters aren't supported.
- **Marketplace:** packaging declares the allowed markings or max classification as installation inputs.

**[Example]** Kestrel stores some customers under EU data-protection rules. Their rows in the customer dataset carry the marking `EU Customer Data` in a `rowMarkings` column; other customers have an empty array.

- **Kofi**, without that marking, sees the non-EU customers and none of the EU ones.
- **Ama**, who holds the marking, sees everyone.

This is a *row-level, mandatory* control. Unlike a plain restricted-view policy, the marking also travels to datasets materialized from `Customer` (see [02 — Projects, spaces and markings](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#propagation-where-discretionary-controls-stop)).

## Side by side

| | Edit-only | Required | Mandatory control |
|---|---|---|---|
| Question it answers | Where does the value come from? | Can it be empty? | Who may see this object's data? |
| Backing column | None | Any | A marking or organization array column on a restricted view |
| Enforced when | — | At indexing and at action apply time | At read time, plus at indexing and edit time for allowed values |
| Typical use | Decision data, notes, assignments | Fields apps and actions depend on | Per-row sensitivity: region, case, data-protection regime |
| Gotcha | Must be permissioned to one dataset | MDO rows missing from the supplying datasource | Must be required; each datasource needs its own |

Security design in full is in [12 — Security and governance](../12-security-and-governance/README.md).

---
[Module index](README.md) · Previous: [05 — Derived properties](05-derived-properties.md) · Next: [07 — Formatting and reducers](07-formatting-and-reducers.md)
