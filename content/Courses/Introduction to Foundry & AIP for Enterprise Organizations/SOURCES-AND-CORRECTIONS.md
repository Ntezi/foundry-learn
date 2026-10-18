# Sources and interpretation notes

Inspected September 23, 2026 through the signed-in [official course](https://learn.palantir.com/introduction-to-foundry-aip-for-enterprise-organizations). All 21 content lessons and the course overview were read. The optional Course Feedback page was not opened. [lesson-manifest.json](lesson-manifest.json) maps each note to its lesson ID. Lesson bodies were read through the page source, so Learn may not record every page as viewed. Check the course overview for completion before relying on it.

The notes paraphrase the course. Engineering comparisons, review questions and the "traps" list are teaching additions. This is a conceptual course, so no Foundry build is involved.

## Images

Two diagrams were opened directly: the full-platform "AI + Human Teaming" diagram (lesson 15) and the "Automations & Progressive Automation" diagram (lesson 13). Both are versions of one architecture picture. At the bottom are data sources, logic sources and systems of action. The middle is the Ontology, with example objects and automations. The top holds analytics and workflows, automations, and products and SDKs, with AI + human teaming above that. The layer names in [05](05-high-level-architecture.md) come from that diagram. Other lesson images appear to repeat parts of the same picture and were not checked one by one.

| Source wording or possible confusion | Treatment in the notes |
|---|---|
| "Each phase transition" (Evals lesson) | The phases are never listed in text or diagram. The notes read it as the gradual shift from human-led to AI-led work, not a fixed named sequence. |
| "300+ native connectors" | A course claim. The exact count can change over time. |
| "Purpose-based controls" | Described as a capability in the course. It is not necessarily a separately named product you configure under that label. The Checkpoints and Projects docs cover how access by purpose is handled in practice. |
| "Multimodal Data Plane (MMDP)" | Course term for storage and compute interoperability (Virtual Tables, pushdown compute, open formats). Details are in Palantir's [interoperability page](https://www.palantir.com/interoperability/). |
| "Automations" (course section) | A broad category: generative AI + Ontology + agents + Evals. It is wider than the single Automate application used in the Agentic speedrun. |
| One sentence reads "If the you notice…" | A course typo. Doesn't affect meaning. |
