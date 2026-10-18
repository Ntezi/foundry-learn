# 27 — Create the Object Table: connect a population to a readable queue

The **Object Table** displays individual Orders in rows, with properties in columns. It gives a worker a place to scan and select work. Its first important input is an **object-set variable** describing which Orders it should display.

Create that variable over your intended Order type, connect it to the table, add all properties, sort by **Item Name**, and rename the displayed **Title** column to **Item Name**. Give the table's section **Flex width 2**, as directed by the course, so it has more room in the layout.

## The query population and the displayed fields are separate

Suppose an invented object set contains 100 Orders. Displaying five columns rather than eleven does not reduce the population to five Orders; it changes which attributes you see for each record. Sorting by Item Name changes presentation order, not which Orders belong to the set.

These distinctions resemble three concerns in a query:

```text
which records qualify → population
which fields are displayed → presentation/projection
how records are ordered → sorting
```

This is an explanatory analogy, not SQL that Workshop requires you to write. An object-set variable should not be assumed to be a JavaScript array eagerly containing every record. Think of it as defining the collection the widget consumes through the platform.

Workshop variables configure how data moves through a module, and object-set definitions can reference selected types and filters. The Variables panel lets you inspect those definitions. [Official variables documentation](https://www.palantir.com/docs/foundry/workshop/concepts-variables).

## Why the table begins broadly

At this point the table uses the base Orders variable. The next lesson will introduce a filtered version. Starting with the base set lets you establish that the intended objects and properties are available before adding another dependency.

If the table is empty, inspect the selected object type, base-set definition and relevant access. If Orders exist but a field is missing, inspect the column configuration and property mapping. These are different failure paths.

## The Title column is a display concern

In lesson 22, Item Name was chosen as the object's title property. Renaming the table header to Item Name helps users understand what the values mean. It does not rename the Ontology property or change the primary key.

Two rows may both say “Stapler.” They remain different Orders if their IDs differ. That distinction becomes essential when selecting one record for assignment.

Flex width is also a presentation choice. It gives a section a relative share of available space; it is not a data limit or a guarantee of a specific pixel width on every screen. Check readability after adding the filter and details panels.

## Verify one record before decorating the table

Find a known Order by its identity, compare its displayed values with the object you inspected earlier, and check the sort. Recognizing a familiar item name alone is insufficient because titles can repeat.

**Remember:** the set determines the population, the columns determine what you see about it, and the primary key distinguishes an individual entity. Changing one does not necessarily change the others.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/2288943) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
