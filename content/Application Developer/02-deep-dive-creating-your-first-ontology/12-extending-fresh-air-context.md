# Lesson 12 — Context: Extending Fresh Air’s Ontology

## Course Essentials
The course introduces `Flight Alert` to represent a delayed, cancelled, or diverted flight requiring an operational response. It will link to Flight and support an action that records root cause.

## Why model an alert as an object?
An alert has identity, lifecycle, properties, relationships, ownership, and actions. A Boolean `flight.hasProblem` loses alert history and cannot naturally represent multiple events, assignments, causes, or resolution states.

```text
Flight 1 ← many Flight Alerts
Flight Alert → root-cause assignment action
```

## Practical Ontology Engineering
Decide whether an alert is an event, a case, or both. An immutable event records that something happened; an operational case accumulates status, assignee, decisions, and resolution. Mature systems may separate `FlightDisruptionEvent` from `FlightAlertCase`.

Avoid encoding workflow status in free text. Define states and valid transitions, but allow uncertainty where investigation is incomplete.

## Deeper Mastery
Operational ontologies combine descriptive semantics—the nouns and relationships—with prescriptive semantics: permitted actions, constraints, and state transitions. This is the bridge from a knowledge graph to an executable organizational model.

## Deep Understanding Check
1. Why is Flight Alert not merely a property of Flight?
2. What lifecycle states and transitions would you model for a real alert workflow?
