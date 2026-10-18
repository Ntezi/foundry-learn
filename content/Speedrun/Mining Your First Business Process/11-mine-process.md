# 11 — Mine Process

*Module: Process Mining · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Choose mining because the process already exists

In the Foundry course folder, choose New → Process. If Process is missing, investigate Machinery availability, location and authoring access as described in the permissions note. No application setting has been changed here.

The new resource opens an empty process map. Choose Add Process. The UI offers State, Action and Automation nodes, which can support authoring a process. This exercise instead chooses **Configure mining** because it already has evidence of an implemented process.

The distinction is consequential: authoring says how a process is defined or extended; mining uses history to discover its recorded behavior. Do not redraw the history merely to match an ideal diagram.

## Bind the entity and its history

In Ontology configuration, select your installed Claim object type and its State property, then confirm. Under Transition log ontology, choose Install log object type. The alternative Manual configuration is for mapping an existing log object; it is not the path followed by this tutorial.

Keep Changes to a backing dataset selected, choose the claim logs dataset as Changelog Dataset, and map these fields:

| Machinery role | Source column | Meaning |
|---|---|---|
| Process ID | `claim_id` | Which Claim this event belongs to |
| State | `new_state` | State entered by that claim |
| Timestamp | `timestamp` | When the state entry occurred |

Process ID is not the saved diagram's identifier. It is the identifier of the entity moving through the process. Choosing a customer ID instead would combine separate claims belonging to one customer; choosing a log-row ID would prevent events from being grouped into the intended claim history.

Select the installation location in the training Project, optionally within a clear process subfolder, and install. After installation, confirm the log Ontology configuration. The course expects a newly created Process Log object that must finish indexing before Ready to mine becomes available.

Installation, indexing and mining are separate stages. If the button is unavailable, inspect the current stage and error rather than assuming that another installation is necessary.

## Inspect the graph before accepting it

When Ready to mine is available, run the mining step. Review the proposed states and directed transitions. The source example has **7 states and 9 transitions**. Treat these as expected counts from the course dataset, not measurements from your enrollment or numbers to force by deleting mismatches.

If the result differs, first inspect the source version, mapped columns, state labels, missing records and indexing status. A different count is a diagnostic clue, not an instruction to make the picture match at any cost.

The graph aggregates state and transition kinds. An edge is not one claim, and nine transition kinds do not mean nine total event rows. Many claims can traverse the same transition; a claim can revisit a state and traverse an edge more than once.

A supplemental path example illustrates this:

```text
C-201: submitted -> investigation -> approved
C-202: submitted -> investigation -> submitted -> investigation -> rejected
```

There are four distinct directed transition kinds in those two paths, but six transition occurrences. Counting occurrences answers a different question from counting distinct edges. Repeated work may be operationally important even when it adds few new shapes to the graph.

## Save and distinguish visual edits from data changes

Confirm the expected proposal and save the graph as Claims Process in your learning folder. The source allows unlocking the layout to move nodes. Moving a node changes presentation; it does not change when a claim entered a state.

The lesson also describes removing an unexpected state from the Machinery process. It explicitly says this does not remove the corresponding data from datasets or objects. Therefore hiding a state is not data cleansing. Investigate whether it is a typo, an exception or genuine behavior before deciding how to treat it, and preserve source evidence when correcting data.

Likewise, drawing an edge does not prove that historical claims traversed it. The UI can support assigning Actions or Automations, but those require explicit configuration and execution. Their availability does not mean mining the map has already automated the claims process.

## What to verify during later practice

Record the Claim type, current-state property, log dataset, three mappings, generated Log type, indexing result, mined counts and saved process identity. Select a small number of claims and compare their actual log sequences with the graph. This checks the meaning of the result rather than only the presence of a successful screen.

Do not infer time spent in a state from the horizontal distance between nodes. Layout is visual organization; duration needs timestamp-based analysis with a defined metric. The application exploration that follows this module will be documented in the second part.

**Review question:** why might a clean-looking map be misleading? It may omit real states, mix different claims, misinterpret time or summarize incomplete history. The graph is only as meaningful as its input contract and the decisions made while configuring it.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102797) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
