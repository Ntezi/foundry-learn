# 03 — Prompt engineering

*Sources: [Best practices for LLM prompt engineering](https://www.palantir.com/docs/foundry/aip/best-practices-prompt-engineering/) · checked October 8, 2026 · Ready for Review*

Palantir's page is a short, general checklist; it has nothing Foundry-specific. So this note applies it once, to a real Kestrel prompt, and marks which strategy each change comes from.

## The page's seven strategies

**[Docs]** The page frames prompting as "a dynamic and iterative process" and groups its advice into seven strategies:

| # | Strategy | In short |
|---|---|---|
| S1 | Be clear and specific | Plain language for the task; give context that anchors the answer |
| S2 | Refine and iterate | Test, adjust the wording, re-test |
| S3 | Use examples | Show the format and pattern you want |
| S4 | Manage length and complexity | Be concise; split complex tasks into parts |
| S5 | Incorporate constraints | Limit scope and length; say what to leave out |
| S6 | Provide relevant context | Fit the prompt to what the model is good at |
| S7 | Optimize the interaction | Give the model a role; use a sequence of prompts for complex output |

**[Docs]** It also notes the effect of each strategy "might vary depending on the LLM used", points to the providers' own prompting guides (Anthropic, Google, Microsoft, OpenAI), and has a separate page for AIP Assist ([07](../07-end-user-apps/README.md)).

## Worked example: the delay-message prompt

**[Example]** `draftDelayMessage` ([Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md)) loads the order, the shipment and the reason for the delay, then asks a model for a customer message.

**First draft** (what Daniel wrote in five minutes):

```text
Write a message to the customer about their late order {orderId}. The shipment is {shipmentId}
and the new ETA is {eta}. Reason: {delayReason}.
```

What came back was polite but varied: some drafts apologised three times, some quoted the internal reason code (`CARRIER_CAPACITY`), some promised a refund. Ama's team rewrote most of them.

**Second draft:**

```text
You write delivery updates for Kestrel's customer service team.                       ← S7 role
A team member will read and edit your draft before it is sent.                        ← S6 context

Write a delay update for this order:
- Customer first name: {firstName}
- Order: {orderId}
- New delivery date: {etaLocalDate} (the customer's local date, not UTC)
- Reason, in plain words: {delayReasonText}

Rules:                                                                                 ← S5 constraints
- At most 3 sentences, and one apology at most.
- Never mention refunds, compensation or internal codes.
- If the reason is empty, say the carrier has told us of a delay.

Return JSON: {"subject": "...", "body": "..."}                                          ← S1 specific output

Example of the tone we want:                                                           ← S3 example
{"subject": "Your order O-10442 is now arriving Thursday",
 "body": "Hi Sam, your parcel is now due on Thursday 9 October because of a delay at the carrier's
          depot. We're sorry for the wait. Track it any time from your order page."}
```

**What changed, and why it isn't only wording:**

| Change | Strategy | The real fix behind it |
|---|---|---|
| Role and "a person will edit this" | S7, S6 | Sets tone and tells the model it's a draft, matching the control ladder's *draft* rung |
| `{delayReasonText}` instead of the code | S6 | A data fix: the function now maps codes to plain text before the prompt |
| Local date instead of UTC `eta` | S1 | A data fix: `Shipment.eta` is UTC in the model, and customers don't think in UTC |
| No refunds or compensation | S5 | A policy fix: refunds are *Issue refund*, an action with its own permissions, never a promise in a draft |
| JSON with subject and body | S1, S3 | Lets *Send delay update* prefill its parameters reliably |
| One example | S3 | Fixes tone and length better than adjectives |

**[Explanation]** Half the improvements came from changing the **inputs** the function puts into the prompt, not the prompt's wording. In Foundry the prompt sits on top of Ontology data, so "provide relevant context" (S6) usually means "load the right properties", which is a modelling question.

## How you know it's better

**[Explanation]** S2, *refine and iterate*, is the one the page can't do for you. "Ama's team rewrote fewer drafts" is a judgement; an evaluation suite makes it a number. [04 — AIP Evals](../04-aip-evals/README.md) turns these rules (three sentences, no refund language, valid JSON) into evaluators and runs both prompt versions on the same test orders.

**[Recommendation]** Keep each prompt version with the model it was tested on. A prompt tuned for one model can behave differently on its replacement ([01 — Model deprecation runbook](01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired)).

---
[Module index](README.md) · Previous: [02 — LLM-provider compatible APIs](02-llm-provider-compatible-apis.md) · Next module: [02 — Bring your own model](../02-bring-your-own-model/README.md)
