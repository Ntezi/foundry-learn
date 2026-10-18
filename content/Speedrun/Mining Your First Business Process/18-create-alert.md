# 18 — Creating an Alert

*Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Turn a rule violation into an event to investigate

The course creates an **Automate** notification for a Claim that enters a filtered set: State is **under investigation** AND high-risk is **false**. This supports the scenario's policy that only high-risk claims should enter investigation.

This condition has no duration threshold. It detects membership in a suspicious set; it does not wait for a claim to be stuck for a specified number of hours. The word “stuck” in the motivation should not be mistaken for an implemented age-based service-level rule.

## Course configuration, in order

1. Open Automate and choose Create new.
2. Choose the **Objects added to set** condition and the course's Claim Object Type.
3. Enable Advanced mode. Filter State to under investigation and high-risk to false, combined with AND.
4. Select **Live monitoring** as evaluation frequency and continue.
5. Add a **Notification** effect. Choose **Send one notification for all Claims added**.
6. Under Recipients, choose Static and select yourself.
7. Choose Plain notification and write a message describing the suspicious routing. Continue through effects, Settings and the summary.
8. Choose Create automation, give it a name, select the course folder, set Expiry date to **Indefinitely** as demonstrated, and save.
9. The source then offers adding the automation to the relevant graph node using Add Automation and its name.

These are future practice instructions, not actions performed during notes. Automate access is an additional practical requirement revealed here. Selecting a recipient in the walkthrough does not mean any message has been sent.

## Set membership is the key abstraction

Think of a predicate P(claim) that is true only when both filters match. The event of interest is an object being added to the set where P is true. In software terms, it resembles watching a query result for new members, rather than periodically emailing every matching database row without distinction.

Synthetic examples:

| Change | Before → after membership | Interpretation to test |
|---|---|---|
| Non-high-risk claim changes from submitted to investigation | false → true | Intended suspicious-entry case |
| High-risk claim enters investigation | false → false | Should not match the predicate |
| Claim already in investigation changes high-risk true to false | false → true | Membership can change without a new investigation transition |
| Matching claim changes an unrelated property | true → true | Not a new membership entry merely because a field changed |

The third row is particularly important: a set-entry alert is not identical to an alert on a specific state-transition event. Check whether current risk values are the right basis for the business policy. The source does not establish initial-backfill behavior, re-entry behavior, batching windows or delivery deduplication. Verify those during practice rather than promising them.

## Detection, execution and delivery are separate

Live monitoring requests responsive evaluation; it does not guarantee zero latency. Data must arrive, the object state must update, the condition must be evaluated, and the effect must execute. Notification delivery is separate evidence from saving an automation.

The grouping option sends one notification for the claims added in the relevant grouping, rather than necessarily one message per claim. Do not infer the exact grouping interval from its label. A useful message states the condition and directs the recipient toward investigation; the plain notification alone does not repair the claim or modify routing logic.

Adding the automation to the graph makes the association visible in the process context. It does not replace validating the automation's actual condition, activation and effect. The course's Indefinitely expiry is a persistent setting; after training, review whether the demonstration should remain active. No expiry or activation setting was changed here.

**Review question:** what evidence would distinguish “configured” from “working”? A known nonmatching case, a controlled matching set entry, a corresponding automation execution and an observed notification to the intended recipient.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2103028) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md) · [Later practice](PRACTICE.md)

Course steps are paraphrased. Synthetic examples and engineering checks are teaching additions; no live Foundry implementation is claimed.
