# Lesson 11 — Data Lineage Reflections

## Course Essentials
The ontology provides ease of use and a shared organizational vocabulary. Teams should converge on one Airport concept instead of maintaining incompatible local definitions.

## Golden table versus ontology
A golden table identifies authoritative rows. An ontology additionally defines identity, human-readable properties, links, actions, security-aware access, and reusable behavior. Local datasets such as `better_airports` create dialects; enriching the shared Airport type keeps improvements discoverable.

## Practical Ontology Engineering
“One type” does not mean every user sees every field. Row- and column-level controls can preserve one semantic concept while enforcing least privilege.

Centralization has trade-offs. A shared type needs governance, ownership, change review, backward compatibility, and mechanisms for domain-specific extensions. Otherwise the canonical model becomes either a bottleneck or an incoherent dumping ground.

## Deeper Mastery
This is vocabulary governance: multiple communities negotiate the intension of `Airport`—what qualifies, how identity works, and which properties are authoritative. Interoperability improves when mappings and semantics are explicit rather than merely sharing a table name.

## Deep Understanding Check
1. When is a local enriched dataset legitimate, and when should enrichment move into the ontology?
2. How can one Airport type support teams with different permissions and needs?

