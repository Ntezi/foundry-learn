# 02 — Validation drill kit

*Sources: our own practice material built on [Design 01–04](../11-design/README.md) · written September 25, 2026; split from `Ontology Design/06` (exercise F) on October 2, 2026 ([MIGRATION](../MIGRATION.md)) · drill prepared, not run*

Everything here is **[Explanation / Example]**: our own practice material built on [Design 04 — Validation](../11-design/04-validation.md). Record results only after actually doing the drill.

---

## F. The drill kit (later practice phase, in Foundry)
**Objective:** validate one Ontology you have access to (for example a course Ontology) the way [04](../11-design/04-validation.md) describes.

**Prerequisites:**
- read access to the Ontology;
- access to a general-purpose app (the docs name Insight, Contour and Quiver);
- ideally one participant who didn't build the model;
- optionally AIP Analyst or AI FDE access, for the agent comparison.

**Steps:**
1. **Write questions:** 5–6 questions in *situation → factors → impact* order, taken from what the use case's users actually decide, not from what you know the model contains. For the Pipeline course data, use [04 §2](../11-design/04-validation.md).
2. **Set the rules:** no purpose-built Workshop apps, and no AI help in the human round. The least familiar person drives. Answers need a demonstrated path.
3. **Run and observe:** for each question, fill in the log below.
4. **Agent round:** give the same questions to AIP Analyst or AI FDE, with access but without the human path.
5. **Diagnose:** map each observation to a likely cause ([04 §4](../11-design/04-validation.md)). First decide whether it's the model, the data, permissions, the app or training.
6. **Prioritize:** fix what affects several questions or blocks high-value work. Rerun some questions and add new ones.

**Observation log (copy per question):**

| Question | Correct? | Time | Hesitation points | Search terms used | Types / links tried | Help needed? | Export or manual join? | Agent result | Likely cause |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |

**Expected result:** a short list of design changes, each tied to observed evidence.
**Verification:** after the changes, rerun the repeated questions. Time and hesitation should drop, and new questions should also go better.
**Common failure modes:**
- the builder drives, so the gaps stay hidden;
- only questions the model can already answer are chosen;
- a single slow answer is treated as a design flaw when it's really a data or permissions issue;
- the agent round is skipped.

**Reflection prompt (after running it):** what did participants search for that didn't exist? Which knowledge did people supply that the agent couldn't find? What would you add first?

**Results:** _not yet recorded._

---
[Practice index](README.md) · Previous: [01 — Design exercises](01-design-exercises.md) · Next: [03 — Review questions by module](03-review-questions-by-module.md)
