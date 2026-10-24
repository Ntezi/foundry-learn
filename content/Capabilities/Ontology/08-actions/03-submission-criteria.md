# 03 — Submission criteria

*Sources: [Submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria/) · [Test run](https://www.palantir.com/docs/foundry/action-types/test-run/) · [Dropdown security](https://www.palantir.com/docs/foundry/action-types/dropdown-security/) · checked October 2, 2026 · Ready for Review*

**[Docs]** Submission criteria (formerly *validations*) are "the conditions that determine whether an action can be submitted". "Actions can only be submitted if all the submission criteria are met." They are separate from who may *edit* the action type, and every action type has its own.

This note works through one example from the policy to the test cases: Lena's **Approve refund**.

## The policy, as finance wrote it

> A refund can be approved by Kestrel Pay finance staff. Refunds over €500 need a senior approver. Nobody approves a refund on their own order. Refunds can't be approved for a payment under an open fraud case. In planning scenarios, analysts may approve anything for modelling.

## Translating it into conditions

**[Docs]** A condition is "a single comparison check between two values", built from one of three templates:

| Template | Reads | Kestrel use |
|---|---|---|
| **Current user** | User ID, **group IDs** (direct or inherited), other Multipass attributes such as Organization | Finance group; senior group; "not your own order" |
| **Parameter** | Values of parameters, including properties of object-reference parameters, or the *length* of a list | Amount; fraud-case status |
| **Execution context** | Whether the action runs **in an Ontology Scenario** (not which one) | Planning exception |

**[Docs]** Operators depend on the value type:

- single values: *is*, *is not*, *matches* (regex), *is less than*, *is greater than or equals* and so on;
- lists: *includes*, *includes any*, *is included in*, *each is*, *each is not*.

The right-hand side is a parameter, a static value, or **no value**, which is a null check. Group membership needs **includes**, because the user belongs to many groups.

**[Docs]** Logical operators (**all**, **any**, **none**) combine and nest conditions.

Priya's first draft of the tree:

```text
ANY
├── ALL                                   ← planning exception
│   ├── Execution context is Scenario
│   └── Current user › groups includes  kestrel-pay-analysts
└── ALL                                   ← the real rule
    ├── Current user › groups includes  kestrel-pay-finance
    ├── ANY
    │   ├── refund › amount  is less than  500
    │   └── Current user › groups includes  kestrel-pay-finance-senior
    ├── Current user › user ID  is not  refund › order › placedByUserId   ⚠
    └── refund › payment › openFraudCaseCount  is  0                      ⚠
```

The two ⚠ lines follow **links** (refund → order, refund → payment), and that is where the policy meets the model:

- **"Not your own order."** The condition compares the current user's ID with a property. That only works if the user ID is a property **on the refund**, or can be reached through an object parameter. **[Explanation]** The *Parameter* template reads properties of a parameter's object. The docs don't show conditions that follow links, so Priya adds `orderPlacedByUserId` to `Refund` in the pipeline.
- **"No open fraud case."** This one is the same problem. A count across a link isn't a parameter value. **[Explanation]** Options:
  - a property on `Payment` kept up to date by the fraud pipeline;
  - a derived property ([05-05](../05-properties/05-derived-properties.md)), but check that submission criteria can read it;
  - a **function-backed action** that checks and throws ([04](04-function-backed-actions.md)).

  Kestrel picks the property. It's the simplest to test. It lives on `Payment`, so the action gets a hidden, single-value `payment` parameter, defaulted to the refund's payment, and the condition reads that parameter.

The two corrected lines, which replace the ⚠ lines in the tree:

```text
    ├── Current user › user ID  is not  refund › orderPlacedByUserId
    └── payment › openFraudCaseCount  is  0          (payment: hidden object-reference parameter)
```

## The trap: `NOT` on group membership

The obvious way to write "contractors can't approve" is *NOT (groups includes contractors)*.

**[Docs]** Don't. "Avoid using NOT conditions with group, marking, or organization memberships." Scoped tokens carry only part of a user's permissions, "may lack the attribute the NOT condition checks against, causing the condition to pass and grant more access than intended."

**[Explanation]** Write every access condition **positively**: *must be in finance*, never *must not be in contractors*. That is why Kestrel's tree has no NOT on any membership. The `none` logical operator is a NOT too. The one *is not* in the tree compares two **user IDs** ("not the person who placed the order"). That is a comparison between values, not a missing-attribute check, so the scoped-token problem doesn't arise. **[Explanation]** That reading is ours. The warning names group, marking and organization memberships only.

## Failure messages

**[Docs]** Every root-level condition and logical operator has its own failure message. When a nested condition fails, the user sees the message of its **root-level parent**. Messages show in Object Explorer, Workshop and Quiver.

**[Explanation]** Here the root is one big `ANY`, so a single message covers every failure. Lena would see "You can't approve this refund" whether the problem was the amount or the fraud case. Kestrel restructures the tree:

1. The planning exception moves to a separate *Approve refund (planning)* action type, available only in scenarios.
2. The root becomes `ALL` with four children. Each gets a specific message: *"Finance staff only"*, *"Over €500 needs a senior approver"*, *"You can't approve refunds on your own orders"*, *"Payment is under fraud review — see case"*.

The trade-off is clearer errors in exchange for one more action type. Choosing it is a judgement call. Overrides can't help here: they change a parameter's constraints, visibility, requiredness and default, not the criteria.

## What criteria can't see

**[Docs]**

- Attachment and **object set** parameters can't be used in submission criteria.
- When you change a parameter, every condition that uses it has to be reconfigured.
- Criteria are hidden from users who can't edit the action type, so the logic isn't exposed through the form.

## Test cases, run before go-live

**[Docs]** A **test run** in Ontology Manager evaluates the saved action "with your permissions, enforcing the same object security and submission criteria". It reports:

- **Proposed changes**;
- **Details**: an execution log, a side-effect preview, referred entities, and errors split into admin-facing and end-user-facing.

Nothing is written. Test runs are available in the **form** layout only, and not while there are unsaved edits.

Because a test run uses *your* permissions, Lena runs it once herself. A colleague in each group then runs it as well.

| # | Who | Refund | Expected |
|---|---|---|---|
| 1 | Finance, not senior | €120, clean payment | Pass |
| 2 | Finance, not senior | €750 | Fail: *needs a senior approver* |
| 3 | Finance senior | €750 | Pass |
| 4 | Finance senior | Their own order | Fail: *own orders* |
| 5 | Finance | Payment with an open fraud case | Fail: *under fraud review* |
| 6 | Customer service (Ama) | €20 | Fail: *finance staff only* |
| 7 | Analyst, in a scenario | €5,000 | Pass with the planning action; the production action fails with *finance staff only* |

**[Docs]** One more test-run detail: side-effect webhooks, notifications and schedule builds are **skipped**. Functions and **writeback webhooks** needed to compute the result **do run**, after you confirm. A test run can therefore still call Kestrel Pay's ledger API ([05](05-side-effects.md)).

---
[Module index](README.md) · Previous: [02 — Rules and parameters](02-rules-and-parameters.md) · Next: [04 — Function-backed actions](04-function-backed-actions.md)
