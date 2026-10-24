# 04 — Legacy registered LLMs

*Sources: [Register an LLM using function interfaces [Legacy]](https://www.palantir.com/docs/foundry/aip/chat-completion-function-interface-quickstart/) · [Use your registered LLM [Legacy]](https://www.palantir.com/docs/foundry/aip/use-registered-llm/) · checked October 8, 2026 · Ready for Review*

You may meet this method in older repositories, older course material, or the [Ontology area's function note](../../Ontology/09-functions/04-functions-on-models-and-llms.md). This note is written as a **field guide**: how to recognise it, what it did, and how to move off it.

## Status

**[Docs]** Registering an LLM through function interfaces was replaced by registered models in **March 2026** ([01](01-choosing-a-byom-path.md)). It works with **TypeScript v1 only**, has no TypeScript v2 equivalent, and the docs say to contact Palantir Support **before** using it.

## How to recognise it in a repository

| Sign | Example |
|---|---|
| A TypeScript v1 functions repository | `@foundry/functions-api` imports |
| A function decorated with `@ChatCompletion()` | Usually without the generic `@Function()` decorator, which the docs say isn't required |
| Imports from `@palantir/languagemodelservice/contracts` and `/api` | `ChatCompletion`, `FunctionsGenericChatCompletionRequestMessages`, `GenericCompletionParams`, `FunctionsGenericChatCompletionResponse` |
| A Data Connection source imported into the repository | `@foundry/external-systems/sources`, with a webhook or `@ExternalSystems({ sources: [...] })` |
| In AIP Logic, the model is picked from a **Registered** tab of the Use LLM board | — |

## What it did

**[Docs]** The `ChatCompletion` **function interface** is a signature contract. AIP Logic finds every function that implements it and lists them as registered models; declaring the interface also makes the compiler check the signature.

```text
Data Connection REST source (+ egress policy, + secrets)
   └─ optional webhook "CreateChatCompletion"  ← must be a Read API webhook
TypeScript v1 repo
   └─ @ChatCompletion() myFunction(messages, params)
         → calls the webhook, or fetch() through the source
         → returns { completion, tokenUsage }
AIP Logic "Use LLM" → Registered tab → myFunction
Pipeline Builder "Use LLM" (beta) → Model type → Registered tab → myFunction
```

**[Docs] Details worth knowing:**

- The source needed **exports** switched on (*without markings validations* for AIP Logic; the plain toggle for Pipeline Builder) and **code imports** allowed.
- The webhook had to be **Read API**. A *Write API* webhook can only be called from an `@OntologyEditFunction()`, so a `@ChatCompletion()` function can't call it.
- Pipeline Builder's BYOM flow didn't support webhooks, so the second page shows a direct `fetch` through the source with `@ExternalSystems`, reading the URL with `getHttpsConnection().url` and secrets with `getSecret(...)`.

## The one idea worth keeping: rate-limit errors

**[Docs]** A legacy function could tell its callers to retry. Declare the interface's `ChatCompletionError` type on the function and return:

```typescript
return FunctionsResult.err("LanguageModel:RateLimitExceeded", { retryAfterMillis: 20000 });
```

AIP Logic and Pipeline Builder then retry with **exponential backoff and jitter**: each wait is longer than the last, plus a random extra amount. The docs' example maps the provider's HTTP **429** to this error.

**[Concept]** Backoff with jitter stops many clients that hit a limit together from all retrying at the same instant and hitting it again.

**[Explanation]** Registered models make this your administrator's concern rather than your code's: rate limits are set at registration and enforced by the platform ([02](02-rest-and-compute-module-backed-models.md#rate-limits-in-numbers)).

## Moving off it

**[Recommendation]** For each legacy `@ChatCompletion()` function:

1. **List its callers:** the Logic functions and pipelines that select it in the Registered tab. **[Docs]** Ontology Manager's page for a function shows its *Usage history*, the resources that use it, as in the [model retirement runbook](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired).
2. **Register the same model** through a REST source or a compute module ([02](02-rest-and-compute-module-backed-models.md)). The source and its egress policy can usually be reused.
3. **Declare capabilities** the legacy method couldn't express: tool calling, reasoning, structured outputs.
4. **Switch each caller** to the new entry in the model selector, run its Evals suite, republish.
5. **Retire the function** once Logic and Pipeline Builder no longer call it.

**[Explanation]** The legacy route only reached AIP Logic and Pipeline Builder. Registered models also reach Chatbot Studio, AI FDE, AIP Analyst and TypeScript functions, so migrating usually widens what the model can do.

---
[Module index](README.md) · Previous: [03 — Self-hosting and proxy layers](03-self-hosting-and-proxy-layers.md) · Next module: [03 — AIP Logic](../03-aip-logic/README.md)
