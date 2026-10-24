# 03 — LLM data access with markings

*Sources: [Control LLM data access with Markings](https://www.palantir.com/docs/foundry/aip/control-llm-data-access-with-markings/) · [Bring your own model to AIP](https://www.palantir.com/docs/foundry/aip/bring-your-own-model/) · checked October 8, 2026 · Ready for Review*

[Ontology 16-01](../../Ontology/16-ai-and-agents/01-ontology-as-ai-context.md) explains that a model only reads what the user can read. This note covers the other control: which **users' sessions** may talk to a model at all, decided by their mandatory markings. It's counter-intuitive, so it's taught as a set of cases.

## The rule

**[Docs]** Enrollment administrators set which mandatory markings are allowed for requests to AIP models. The policy applies to **interactive** use and **automated** workflows.

**[Docs]** Two settings:

- **Allow any data**: no restriction by markings.
- **Allow only the following markings**: a request is allowed only when **every mandatory marking available to the request token** is in the allowlist.

**[Docs]** The check is on the **token**, not the data: "AIP rejects the request if the token includes any mandatory Marking outside the allowlist, even when the data included in the request does not have that Marking." A token with **no** mandatory markings passes. An allowlist doesn't require the data to carry an allowed marking.

**[Docs] The page's table**, with allowlist A, B:

| Markings on the token | Result |
|---|---|
| none | Allowed |
| A | Allowed |
| B | Allowed |
| A, B | Allowed |
| A, C | **Rejected**: C isn't allowed |

**[Docs] The way out:** a user whose session carries more markings than allowed can pick a **scoped session** that limits the markings in their session; if it contains none outside the allowlist, the request passes.

## Kestrel's cases

**[Example]** Kestrel's enrollment policy: *Allow only* `Customer PII`. Kestrel Pay's self-hosted registered model has its own policy, allowing `Customer PII` and `Kestrel Pay – Financial` ([02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md#kestrel-pays-decision)).

| Who, doing what | Markings on the token | Model | Result | Why |
|---|---|---|---|---|
| Ama drafts a delay update | `Customer PII` | Palantir-provided | Allowed | Everything on the token is allowlisted |
| Lena asks Threads about a carrier rate card | `Customer PII`, `Kestrel Pay – Financial` | Palantir-provided | **Rejected** | Her token carries the Kestrel Pay marking, although the rate card has no such marking |
| Lena, again, in a **scoped session** without the Kestrel Pay marking | `Customer PII` | Palantir-provided | Allowed | The token now fits the allowlist |
| Lena summarises a payment dispute | `Customer PII`, `Kestrel Pay – Financial` | Kestrel Pay self-hosted model | Allowed | The model-specific policy replaces the enrollment policy |
| A project-scoped Logic function in `Payments [Ontology]` runs from an automation | Whatever its token carries | Palantir-provided | Rejected if the token includes `Kestrel Pay – Financial` | "The same token-level check applies to automated workflows" |

**[Explanation]** The docs don't give the reasoning. Our reading: checking what the session **could** read, rather than what a prompt happens to contain, is the conservative choice, because a prompt can be assembled from many reads, tool results and earlier turns. Expect people with broad access to hit it first; scoped sessions are the intended answer, not a workaround.

## Configuring it

**[Docs] Enrollment policy** (Palantir-provided models, and registered models without their own policy): Control Panel → **AIP settings** → *Data access* → *Allow any data* or *Allow only the following markings* → choose at least one marking → save.

**[Docs] Registered-model override:** Control Panel → AIP settings → **Registered models** → register or edit → *Data access* step:

| Registered model setting | Effective policy |
|---|---|
| Not configured | The enrollment policy |
| Allow any data | Any data, **even if the enrollment has an allowlist** |
| Allow only the following markings | Only those markings, regardless of the enrollment allowlist |

**[Explanation]** "Completely replaces" cuts both ways: a registered model set to *Allow any data* is the most open model on the enrollment, whatever the enrollment says. Review registered-model policies whenever the enrollment policy is tightened.

## How it fits with the other controls

| Control | Decides | Note |
|---|---|---|
| Object and property security policies | **What** the model reads for a user | [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md), [Ontology 16-01](../../Ontology/16-ai-and-agents/01-ontology-as-ai-context.md) |
| This policy | **Whether** a session may call a model at all | Token-level, interactive and automated |
| Georestriction | **Where** the model runs | [01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#2-why-a-model-is-missing) |
| Markings on outputs | Who reads what the model **wrote** | Read-time controls don't follow the output ([03-01](../03-aip-logic/01-logic-concepts.md#what-the-model-can-and-cant-see)) |

<!-- security-go-deeper -->
**Go deeper in the Security area:** [02 — Markings and mandatory controls](../../Security/02-markings-and-mandatory-controls/README.md)

---
[Module index](README.md) · Previous: [02 — Enabling AIP features](02-enabling-aip.md) · Next: [04 — Capacity and rate limits](04-capacity-and-rate-limits.md)
