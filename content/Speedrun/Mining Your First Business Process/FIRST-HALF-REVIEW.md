# First-half review — Mining Your First Business Process

**Lessons 01–13 · Ready for Review · Practice Not Started**

This part ends with a mined process and an explanation of its generated Ontology resources. The Workshop application and alert belong to the next part. The purpose of this review is to explain how recorded events become useful operational evidence, before relying on the resulting diagram.

## Follow one claim across the system

Imagine a claims API that stores a Claim row with its latest state and appends state-change events. A current row can tell you that a claim is under investigation. It cannot, on its own, tell you when it entered investigation, whether it returned there, or what happened before that. Those questions require history.

In this course the Marketplace package supplies Claims, Customers and claim logs. The Claim is the process entity: the thing whose journey matters. Its identifier correlates events to the right journey. The log's state says which state was entered, and its timestamp makes temporal ordering possible. A Customer provides useful context but is not the process entity for this exercise.

Machinery uses these relationships to mine the observed process. The setup generates a log Object Type and links it to the Claim type. The resulting graph summarizes states and transitions across claims. It is useful for finding paths and forming questions about delays; its shape alone does not establish why those delays occur.

Read [data overview](08-data-overview.md), [mining introduction](10-process-mining-introduction.md) and [Mine Process](11-mine-process.md) together if this chain is still unclear.

## Work through a small example

These are synthetic events, not the course dataset. All times are UTC.

| Claim | State entered | Time |
|---|---|---|
| A | submitted | September 1, 09:00 |
| A | investigation | September 1, 10:00 |
| A | approved | September 3, 10:00 |
| B | submitted | September 1, 09:00 |
| B | investigation | September 1, 10:00 |

At September 4, 10:00, A has a completed investigation visit of 48 hours. B has an observed open investigation age of 72 hours, provided no exit event is missing and the current object agrees. B does not have a completed visit of zero hours. Mixing completed visits and open ages silently would make a metric hard to interpret.

There are five event rows, two claim identities, three distinct state labels and two distinct directed transition kinds. There are three transition occurrences: submitted→investigation twice and investigation→approved once. The last event for A does not tell you how long it remains approved after that point.

Now suppose B actually completed yesterday but its exit event has not arrived. The apparent 72-hour unresolved age would be misleading. Before blaming the investigation team, check ingestion freshness and consistency between current Claim state and the newest event.

## Questions to answer in your own words

1. Why can claim_id repeat in the logs but still identify a unique Claim?
2. Why is parsing a timestamp more than making a string look like a date? What does a literal T in a format tell you about timezone?
3. A graph has a large approved node. What additional evidence would distinguish ordinary completed volume from a bottleneck?
4. A claim follows submitted→investigation→submitted→investigation→rejected. Which part signals rework, and why does counting only distinct graph edges hide some of its frequency?
5. Why inspect lineage before renaming a generated Log Object Type?
6. What does removing a state from the graph change? Does it delete its source events?
7. What is the difference between mining observed paths and authoring an intended future process?

## Answer cues, after attempting the questions

1. A Claim is one entity; each event is an observation about it. Correlation identity is not automatically a unique event key.
2. Parsing establishes a typed temporal value and requires correct format/timezone interpretation. T is a separator, not a declaration of UTC. Incorrect interpretation can distort sequence and duration.
3. Define the population and time window, then inspect waiting/processing durations, inflow/outflow, unresolved work and representative histories. Terminal states naturally accumulate completed cases.
4. The return to submitted and second investigation visit show repeated work. One distinct submitted→investigation edge represents two traversals here.
5. Confirm which generated type and backing dataset belong to the intended installation. A friendly display name does not prove identity or data provenance.
6. The graph representation changes; source datasets and Ontology objects are not thereby deleted.
7. Mining reconstructs what available events show. Authoring expresses desired behavior and may bind Actions/Automations; mining alone does not implement those behaviors.

## Review pacing and next step

One suggested two-hour block is 30 minutes for setup/purpose, 60 minutes for event data/mining, and 30 minutes for these questions. Carry uncertainty into another block instead of rushing. This is a suggestion, not logged time or a change to the unresolved study deadline.

Tell me which explanations need more detail. Once this first part is reviewed, continue with lessons 14–20, then use [PRACTICE.md](PRACTICE.md) after the course understanding review. Learn's 13/20 viewing status does not mark this review as passed.

**Continuation update:** lessons 14–20 are now prepared; use the [second-half review](SECOND-HALF-REVIEW.md). The 13/20 checkpoint above records the earlier first-part boundary. Current Learn status is 20/20; practice remains Not Started.
