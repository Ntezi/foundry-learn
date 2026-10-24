# 02 — LLM-provider compatible APIs

*Sources: [LLM-provider compatible APIs](https://www.palantir.com/docs/foundry/aip/llm-provider-compatible-apis/) · [Model deprecation (TypeScript v2 example)](https://www.palantir.com/docs/foundry/model-catalog/model-deprecation/) · checked October 8, 2026 · Ready for Review*

**What it is in one sentence.** **[Docs]** Foundry exposes proxy endpoints that accept requests "in the same format as the providers' native APIs", so you can use a provider's own SDK while Foundry applies rate limiting, data governance and usage tracking.

## The endpoints

| Provider API | Foundry path (after your enrollment URL) | Status |
|---|---|---|
| Anthropic messages | `/api/v2/llm/proxy/anthropic/v1/messages` | Supported |
| OpenAI chat completions | `/api/v2/llm/proxy/openai/v1/chat/completions` | Supported |
| OpenAI responses | `/api/v2/llm/proxy/openai/v1/responses` | Supported |
| OpenAI embeddings | `/api/v2/llm/proxy/openai/v1/embeddings` | Supported |
| xAI chat completions | `/api/v2/llm/proxy/xai/v1/chat/completions` | Beta |
| xAI responses | `/api/v2/llm/proxy/xai/v1/responses` | Beta |
| Google generateContent | `/api/v2/llm/proxy/google/v1/models/{model}:generateContent` | Beta |
| Google streamGenerateContent | `/api/v2/llm/proxy/google/v1/models/{model}:streamGenerateContent?alt=sse` | Beta; SSE only, so `alt=sse` is required |

**[Docs]** The beta endpoints may not support every feature or field yet.

## Rules the page sets

- **[Docs] Prerequisites:** AIP enabled on the enrollment, and permission to use AIP builder capabilities.
- **[Docs] Auth:** `Authorization: Bearer {FOUNDRY_TOKEN}`. OpenAI's SDK already sends a bearer token. Anthropic's normal header is different, so configure its SDK to send a bearer token instead.
- **[Docs] Request shape:** the same as the provider's endpoint; see the provider's docs.
- **[Docs] Governance:** the same as other AIP usage, including zero data retention and georestriction. Palantir "selectively" enables provider features that are compatible with those rules.
- **[Docs] Routing:** only models and providers enabled on your enrollment are reachable. A model served by several providers is routed only to enabled ones.
- **[Docs] Visibility:** usage appears in Resource Management and is rate limited.

## Two callers, one endpoint

The same proxy is used from two places, which is the easiest way to remember why it exists.

**Inside Foundry**, a TypeScript v2 function. **[Docs]** The model deprecation page's TSv2 example builds an OpenAI client with `getFoundryToken(client)`, `getOpenAiBaseUrl(client)` and `createFetch(client)` from `@osdk/language-models`, and passes `Aliases.model("…").rid` as the `model`. This is the pattern behind Kestrel's `draftDelayMessage` ([Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md)).

**Outside Foundry**, a script or service with a token. **[Example]** A sketch for a Python script, written from the page's rules rather than copied from it:

```python
# [Example] — not from the docs. Endpoint and auth follow the page; see the open question on `model`.
import os
from openai import OpenAI

client = OpenAI(
    base_url=f"{os.environ['FOUNDRY_URL']}/api/v2/llm/proxy/openai/v1",  # the SDK appends /chat/completions
    api_key=os.environ["FOUNDRY_TOKEN"],                                  # sent as Authorization: Bearer
)
reply = client.chat.completions.create(
    model=os.environ["KESTREL_MODEL"],   # see RQ-01
    messages=[{"role": "user", "content": "Summarise this delay reason in one sentence: ..."}],
)
```

For Anthropic's Python SDK the equivalent is to pass the Foundry token as a bearer token (the SDK's `auth_token` setting) rather than as `api_key`. **[Concept]** That is a property of the Anthropic SDK, not something the Palantir page specifies.

**Open question** [RQ-01](../SOURCES.md#open-research-questions): the page doesn't say what to send in the request's `model` field from outside Foundry. Inside a TSv2 function the docs pass a model **RID** through an alias. Whether a provider-style model name is also accepted is not documented.

## When to use it

| Situation | Use the proxy? | Why |
|---|---|---|
| You have code written against OpenAI's or Anthropic's SDK and want it governed | Yes | Same request shape, Foundry's governance and limits |
| A TSv2 or Python function needs an LLM | Yes, via the function's model import and alias | The documented pattern; aliases make model changes one line |
| A no-code step in a workflow | No | Use [AIP Logic](../03-aip-logic/README.md) |
| You need a provider feature that breaks zero data retention | No | **[Docs]** Only compatible features are enabled |
| You need a model the enrollment hasn't enabled | No | Enable it ([01](01-supported-llms-and-model-catalog.md)) or [bring your own](../02-bring-your-own-model/README.md) |

**[Explanation]** A token you give an external script is a credential with your access. The governance the page promises is about the model (retention, region, rate limits), not about what data your script chooses to send.

---
[Module index](README.md) · Previous: [01 — Supported LLMs and the Model Catalog](01-supported-llms-and-model-catalog.md) · Next: [03 — Prompt engineering](03-prompt-engineering.md)
