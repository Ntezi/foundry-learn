# Lesson 6 — Fresh Air Operations

## Course Essentials
Start from the `[OFT] Airline` object `Fresh Air Inc`, then move from one object to its 320 Routes and onward to linked Airports. The important skill is not remembering clicks; it is asking business questions through objects, properties, sets, and links.

The live example reveals FA as the IATA code, FRS as the ICAO code, Bombardier as the fleet manufacturer, and CLT, DCA, and PHL as the dominant route hubs. Only BNA–RDU and its return avoid all three hubs.

## Why this matters
A table-first analyst asks which datasets to join and which keys match. An ontology-first user asks, “Which routes does this airline operate?” The ontology encapsulates the joins and exposes them as meaningful relationships.

An **exploration** is a view over an object set. Charts are projections of properties; filtering a chart restricts the current set. **Pivoting** means traversing a semantic link to a new object set—not constructing a spreadsheet pivot table.

```text
Fresh Air → operated routes → 320 Routes
Routes → origin airport → Airports
Airports → runways → Runways
```

## Practical Ontology Engineering
Weak design duplicates airport details on every Route. Better design links Route to Airport, making Airport the authoritative entity. This avoids inconsistent city, altitude, and runway data and lets new airport facts benefit every workflow.

Counts after a pivot are usually distinct target objects, not relationship occurrences. Always ask whether you are counting routes, airports, or link edges.

## Common traps
- Confusing a filtered set with a new object type.
- Forgetting to clear filters before interpreting counts.
- Assuming every route is unique without checking its identity definition.
- Treating a hub pattern as causal evidence rather than an observed distribution.

## Deeper Mastery
Link traversal is graph navigation. A multi-hop question such as “Can the highest airport served by Fresh Air accommodate its aircraft?” combines semantic navigation with constraints across Airport, Runway, and Aircraft.

## Deep Understanding Check
1. Why is `Route → Origin Airport` more expressive than storing an origin name string?
2. Design the path needed to find aircraft models used on flights departing CLT.

