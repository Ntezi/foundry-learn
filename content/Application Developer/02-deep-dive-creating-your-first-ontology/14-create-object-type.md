# Lesson 14 — Create an Object Type

## Execution result

Completed in Foundry on 2026-08-28:

- Object type: `[Marius] Flight Alert`
- Datasource: `flight_alerts` in the training project’s `data/flight alerts/ontology` folder
- Primary key: `Flight Alert Id`
- Title: `Alert Title`
- Properties mapped: 27
- Generic actions generated: none
- Ontology RID: `ri.ontology.main.object-type.26223074-d8ac-429a-ad19-7b7ac9f71cb0`
- Verification state: saved successfully; initial Object Storage sync running

### Ontology-scope correction

For Lesson 15 compatibility, the type was recreated in the authoritative **Hence - INTERNAL** ontology alongside the OFT types:

- Correct ID: `lydxpf6t.id-6ff22a26-539c-7315-696c-6a4cd6df1317`
- Correct RID: `ri.ontology.main.object-type.a5e40096-09de-4926-8c59-3fdb5c86c7cc`

The earlier default-ontology copy (`ri.ontology.main.object-type.26223074-d8ac-429a-ad19-7b7ac9f71cb0`) remains present until deletion is separately approved.

## Course Essentials
Create `[username] Flight Alert` from `flight_alerts`, use `Flight Alert Id` as primary key and `Alert Title` as title, omit generic actions, then save and allow Object Storage v2 indexing to complete.

## Row-to-object mapping
Rows supply initial object state and columns commonly map to properties, but the mapping is not inherently one-to-one. Properties can be renamed, omitted, derived, or user-edited. Datasource permissions influence object visibility.

## Identity versus display
The primary key is stable machine identity; the title is a human-readable label. A good key is unique, non-null, deterministic, and invariant across rebuilds. Never generate a fresh random key in a rebuildable pipeline: it would make old and new versions appear to be different objects and can orphan links and edits.

Weak key: row number or random UUID generated on every build.

Improved key: stable source alert ID, or a deterministic composite derived from immutable business identifiers.

## Root cause trade-off
An empty pipeline column makes future source-derived values easy to integrate. A user-edit-only property cleanly separates operational input from pipeline facts. In production, define precedence and conflict behavior when automated evidence and human judgment disagree.

## Object Storage
Saving the definition triggers indexing. Only successful indexing makes objects queryable. Schema validity, datasource validity, identity uniqueness, permissions, and index freshness are separate concerns.

## Deep Understanding Check
1. Which changes to a flight alert should preserve identity?
2. How would you migrate from manual to automated root cause without silently overwriting reviewed decisions?

**Go deeper in the Ontology area:** [04 — Object types](../../Ontology/04-object-types/README.md)
