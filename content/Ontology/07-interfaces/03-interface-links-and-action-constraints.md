# 03 — Interface links and action constraints

*Sources: [Interface link type constraints](https://www.palantir.com/docs/foundry/interfaces/interface-link-types-overview/) · [Interface action type constraints](https://www.palantir.com/docs/foundry/interfaces/interface-action-type-constraints/) (beta) · [Actions on interfaces](https://www.palantir.com/docs/foundry/action-types/actions-on-interfaces/) · checked October 2, 2026 · Ready for Review*

A reference sheet. Properties tell you what a `Case` *looks like*. This note covers the two ways an interface says what a `Case` is *connected to* and what you can *do* with one, plus the separate feature of actions that operate on interface objects. Those are three different things with confusingly similar names:

| Term | What it is | Defined on | Status |
|---|---|---|---|
| **Link type constraint** | "Every implementer must (or may) have a link like this" | The interface | Not marked beta; OSS support for interface link types is "in development" |
| **Action type constraint** | "Every implementer must (or may) have an action like this" | The interface | **Beta** |
| **Interface action rule** | A concrete action whose edits apply to *any* implementer | An action type | Partial support |

## Link type constraints

**[Docs]** A constraint has four settings:

- **Link target type:** interface or object type.
- **Target:** the specific interface or object type.
- **Cardinality:** **ONE** or **MANY**, "analogous to one-to-one and one-to-many modeling".
- **Required or not.**

Each implementer fills the constraint with one of its own **concrete link types**. Code then reaches that link through the interface's API name.

**Choosing the target:**

- **Object type**, when the far end is concrete and should be enforced. The docs' example is Facility → Airline.
- **Interface**, when *both* ends are abstract. The docs' example is Facility → Alert, filled concretely by Airport → Flight Alert.

**Kestrel's constraints on `Case`:**

| Constraint | Target | Cardinality | Required | Concrete links that fill it |
|---|---|---|---|---|
| `customer` | Object type **Customer** | ONE | Yes | Ticket → Customer, Chargeback → Customer (a new foreign key: Priya copies `customerId` from the payment onto `Chargeback`), Fraud Case → Customer |
| `relatedOrder` | Object type **Order** | ONE | No | Ticket → Order, Chargeback → Order; skipped on Fraud Case |
| `atLocation` | Interface **Location** | ONE | No | Ticket → Pickup Point (*locker didn't open*) |

**[Explanation]** Making `customer` required is the strongest promise in the design. It is also the reason Chargeback needed a new foreign-key link before it could implement `Case`. That is exactly what a required constraint is for.

**Watch the cardinality wording.** Interface links offer ONE and MANY. **[Docs]** ONE means each implementing object "should link to one object of the target type". MANY means it "may link to any number". So the setting counts **targets per implementing object**. It doesn't constrain how many implementing objects point at the same target. **[Explanation]** It is a modelling statement. The docs don't say it is enforced at runtime, any more than one-to-one is enforced on concrete links ([06-01](../06-links/01-link-types-and-cardinality.md)).

## Action type constraints (beta)

**[Docs]** An action type constraint "defines an expected action capability common across object types that implement an interface". It sets:

- the display name, description and API name;
- the **parameter constraints**: each one has a type (string, timestamp, object reference, interface reference, object set, attachment, media reference, struct and so on), single or list, and whether it must be mapped;
- whether the constraint is required.

**What it is *not*:** **[Docs]** it does "not define action execution logic, submission criteria, side effects, or form layout". Those stay on each concrete action type.

**Kestrel:** `Case` gets an **Escalate case** constraint with two required parameters: `newPriority` (string) and `reason` (string). It is filled by:

- *Escalate ticket*, which also notifies the support lead;
- *Escalate chargeback*, which has a submission criterion of Kestrel Pay group only;
- *Escalate fraud case*.

Each one keeps its own rules. The constraint only guarantees that the *shape* matches.

**Save-time validation.** **[Docs]** Ontology Manager won't save if:

- a required constraint is unmapped;
- a required parameter constraint is unmapped;
- a mapped parameter has an incompatible type;
- one concrete parameter is mapped to two parameter constraints;
- the constraint or parameter constraint no longer exists.

**Inheritance.** Constraints flow down through extensions. So `MoneyCase` implementers must also provide *Escalate case* ([02](02-implementing-and-extending-interfaces.md#part-c--extend-moneycase)).

**Where you can use them today.** **[Docs]**

| Surface | Support |
|---|---|
| Ontology Manager | Define and map; validated on save |
| Marketplace | Package and install |
| OSDK (TypeScript) | Partial: resolve the concrete action for an object type, then invoke *that*. The constraint itself can't be invoked. |
| Workshop | Not directly; build a custom widget that uses the OSDK |
| Pipeline Builder | Mapping not supported |

**[Explanation]** Today the main value is **governance**: Ontology Manager forces every new case type to ship with an escalation action. The runtime value ("one Escalate button for any case") currently needs Daniel to write custom OSDK code.

## Interface action rules

These are different from constraints. **[Docs]** An action type can be built *on an interface* with these rules:

- **Create object(s) of interface.** An *Object type* parameter is generated so the user picks which kind to create.
- **Modify.** Uses an *interface reference* parameter.
- **Delete.**
- **Create interface link** and **Delete interface link**, using a link type constraint.

Rules can touch only interface properties, never type-specific ones.

**The gotchas, all from the docs:**

- **Primary keys.**
  - A *Create* rule must set an interface property that each implementer uses as its primary key, or submission fails.
  - A *Modify* rule fails if it touches a property that some implementer uses as its primary key. Primary keys can't be modified by any action.
- **Multiple concrete links.** If an implementer has several concrete links filling one constraint, **Create interface link fails**, and **Delete interface link deletes all of them**. The behaviour is asymmetric, so be careful.
- **Foreign keys.** Creating a one-to-many link writes the foreign key on the many side. Don't let another rule in the same action write that key too.
- **Permissions are uniform.** Submission criteria "apply uniformly across all object types that implement the interface". To keep an implementer out, disable the inherited action on that object type's **Interfaces** tab, under **Interface action control**.
- **Not yet supported:** action logs, and use with functions.
- **Where they render:** Object Explorer and Object Views.

**Kestrel decision.** Daniel proposed a generic *Set case priority* interface action. It was **rejected**: one set of submission criteria would let support agents re-prioritise chargebacks. Escalation stays as three concrete actions tied together by the constraint. **[Explanation]** Use interface action rules for edits that really are uniform and low-risk, such as *Add case note*. Keep anything that touches restricted data on concrete actions.

## Before you rely on any of this

- [ ] Your target app is in the support tables in [01](01-interfaces.md#the-support-table) and above.
- [ ] Every required constraint is something *every future* implementer can meet.
- [ ] No implementer has two concrete links filling the same constraint.
- [ ] Interface action rules don't write any implementer's primary key.
- [ ] You tested what a restricted user sees through the interface ([RQ-20](../SOURCES.md#open-research-questions)).

---
[Module index](README.md) · Previous: [02 — Implementing and extending interfaces](02-implementing-and-extending-interfaces.md) · Next module: [08 — Actions](../08-actions/README.md)
