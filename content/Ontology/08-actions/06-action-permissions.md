# 06 — Action permissions

*Sources: [Permissions](https://www.palantir.com/docs/foundry/action-types/permissions/) · [Read and write authorizations](https://www.palantir.com/docs/foundry/action-types/read-write-authorizations/) (beta) · [Submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria/) · [Notifications](https://www.palantir.com/docs/foundry/action-types/notifications/) · [Trigger schedule build](https://www.palantir.com/docs/foundry/action-types/trigger-schedule-build/) · checked October 2, 2026 · Ready for Review*

**[Docs]** Permissions on an action type answer three questions: who can **view** it, who can **edit** it, and who can **apply** it "with a given set of parameters". **[Explanation]** The first two follow the action type as a resource in its project ([03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md)). This note covers the third, which is where the surprises are.

It is written as a set of "what could go wrong" questions about Kestrel Pay data. Each one has an answer from the docs.

## To apply an action, a user needs…

**[Docs]**

1. **To view** the edited object types and link types, *and their datasources*.
2. **To pass** the submission criteria ([03](03-submission-criteria.md)).
3. **Depending on how the type accepts edits**, possibly more:
   - **edits only through actions** (the default for new types): nothing more. Users can edit every object they can view.
   - **edits through Forms, Object Explorer and the API as well**: *edit* permission on the writeback dataset.
   - **backed by a restricted view**: the user must pass its **edit policy**.
4. **Permissions on the action-log object type**, if the action keeps a log ([07](07-consistency-reverts-and-logs.md)).

## Q1 — Can someone edit an object they can't see?

**[Docs]** Yes, in one case. On "only via actions" types, the submitter "will only need Read access on the objects that are being edited. This means that it is possible for users to create objects that they cannot view."

**[Explanation]** This doesn't override rule 1 above: the submitter still has to see the object *type* and its datasources. What it allows is creating a **row** that row-level security then hides.

For Kestrel, `ChargebackQuery` is created only by actions, so it has no backing datasource. **[Docs]** A type like that must use an **object security policy** ([12-03](../12-security-and-governance/03-object-and-property-security.md)). The policy shows each query only to Kestrel Pay staff. Customer service agents can see the type, so they can run *Raise chargeback query*. Afterwards the policy hides the new object from them. That is by design: the action is the only controlled door. Tell users what will happen ("your query has been sent to Kestrel Pay"), or the action will look as if it failed.

## Q2 — Why not just open up editing?

**[Docs]** On a dataset-backed type that also allows Forms, Object Explorer and API edits, the submitter needs **edit** permission on the writeback datasets, and "a user with Edit permissions will be able to view all data in a writeback dataset". The docs discourage this setting. Switching back to "only via actions" stops new non-action edits but keeps the old ones.

**[Docs]** Also, "an action type's configuration does not display permission settings on affected underlying object types". Whoever builds the action has to check those settings separately.

## Q3 — Does a restricted view protect the data the action writes?

**[Docs]** No. This is the most important sentence on the page: row and column controls (restricted views, object security policies, property security policies) "filter what a user can read when invoking an action. These controls do not extend to the action's write." To protect data as it flows downstream, pair them with a **marking** or classification-based access control.

**[Explanation]** Suppose *Approve refund* copies `cardFingerprint` from a restricted `Payment` onto a new `RefundAudit` object. The policy that hid the fingerprint from most users doesn't follow the copy. Kestrel has two rules here:

- don't copy restricted properties onto new objects; link to them instead;
- if a copy is unavoidable, the target type must carry the Kestrel Pay **marking** ([05-06](../05-properties/06-edit-only-required-and-mandatory-control.md)).

This links to [RQ-17](../SOURCES.md#open-research-questions) on how markings propagate.

## Q4 — Can an action quietly declassify data?

**[Docs]** "An action can … produce output at the same, higher, or lower security than the data it receives or reads." Mandatory markings propagate through *data dependencies*, but an action's logic decides the security of what it writes.

**Read and write authorizations (beta)** set the bounds:

- **Read authorization:** the most-marked data the action may load, whether as parameter values, inputs from other logic, or reads inside a backing function. It applies *even if the user could otherwise see more*.
- **Write authorization:** the **minimum** security of anything the action creates or modifies. The action is blocked if the result falls below it. It doesn't add markings for you.

**[Docs]** Some details:

- If the two differ, a warning appears. Whoever saves the action type must have permission to declassify every marking that the difference severs. That check happens **once, at save time**, not at runtime.
- If read authorization isn't configured, there is no declassification check at all. The docs warn that this "can cause a data spill". Configure read authorization whenever an action may read marked data.
- Write authorization **isn't enforced** on platform-managed writes such as action logs and edit history. Those can end up *below* the boundary.
- How markings combine depends on the category. Classifications follow the environment's rules; other mandatory markings are all required. Organizations are *all required* for read and *at least one* for write.

**[Explanation]** Kestrel enables access constraints on every action that touches the Kestrel Pay project. Read and write are both set to the *Kestrel Pay* marking, so they're equal, and nothing is declassified. Remember the action-log exception when you design [07](07-consistency-reverts-and-logs.md)'s log.

## Q5 — Who controls the side effects?

**[Docs]**

- "Any user who can set up an action may configure side effects."
- **Webhooks are not enabled by default.** Configuring the Data Connection webhook needs extra permissions.
- If the submission criteria fail, no side effects run.
- The submitter must be able to **view the recipient users and groups**.
- Notification recipients need access to the content. What happens when they don't is configurable, and the default is to fail the action ([05](05-side-effects.md#notifications)).
- A **schedule rule** hands control of running that schedule to whoever manages the action type ([05](05-side-effects.md#schedule-rules)).

## Q6 — How do I check what a user can actually do?

**[Docs]** Use the **Check access** panel in the Workspace sidebar. It checks a user's access to a Workshop module, including the action types it depends on and their submission criteria. **[Explanation]** Then do a test run as that user ([03](03-submission-criteria.md#test-cases-run-before-go-live)). Check access tells you what *should* happen. The test run shows what *does*.

## The one-page summary

| Layer | Controls | Where it's configured |
|---|---|---|
| Action type resource | View, edit the definition | Project permissions |
| Data access | Must see the edited types and their datasources | Object type, datasource, restricted view |
| Edit mode | Actions only (default) vs open edits | Object type → datasources |
| Submission criteria | Business rules and who may apply | Action type |
| Read/write authorizations | Marking bounds on inputs and outputs | Action type → Access constraints (beta) |
| Recipients | Who may receive what | Notification rule + recipients' access |

---
[Module index](README.md) · Previous: [05 — Side effects](05-side-effects.md) · Next: [07 — Consistency, reverts and logs](07-consistency-reverts-and-logs.md)
