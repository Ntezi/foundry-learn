# 04 — Functions on models and LLMs

*Sources: [Functions on models](https://www.palantir.com/docs/foundry/functions/functions-on-models/) · [Language models in TypeScript v2 and Python](https://www.palantir.com/docs/foundry/functions/language-models-python-tsv2/) · [Model aliases](https://www.palantir.com/docs/foundry/functions/model-aliases/) · [Function interfaces](https://www.palantir.com/docs/foundry/functions/function-interfaces/) · [Feature support by language](https://www.palantir.com/docs/foundry/functions/language-feature-support/) · checked October 2, 2026 · Ready for Review*

Three patterns, each with what the docs guarantee and what Kestrel adds on top. This is the bridge to [16 — AI and agents](../16-ai-and-agents/README.md). The code here is the *plumbing*. Module 16 covers the agent design.

## Pattern 1 — Wrap a predictive model

**The need.** Kestrel's fraud model scores payments ([05-03](../05-properties/03-structs.md)). Tomás wants the score **live**, for a payment that arrived a minute ago, before the batch pipeline has scored it.

**[Docs]** Model functions are "automatically generated wrappers around live model deployments". It has the same input and output API as the model. You publish one from either a **direct model deployment** (the model page) or a **Modeling Objective** live deployment. Model functions are fully supported in TSv1, TSv2 and Python.

**[Docs]** To use it:

1. In the repository, go to **Resource Imports → Add → Query Functions** and search by the function name.
2. Call it like any query: TSv2 `client(fraudModelDeployment).executeFunction({...})`, Python `FoundryClient().ontology.queries.<name>(...)`. The Python example uses `@function(beta=True)`.

**[Docs] Ontology-bound vs space-bound.** "Starting from February 2026 onwards, all new model functions will be tied to an ontology". TSv2 and Python **require** that. Older, space-bound model functions show a migration prompt on the model page. TSv1 can import both kinds, with slightly different syntax. Model functions are recognised as Marketplace inputs only when they are *imported*, not when they are called directly through the Platform SDK.

**Kestrel's wrapper:**

```typescript
// TSv2: liveFraudScore.ts (shape only)
export default async function liveFraudScore(client: Client, payment: Osdk.Instance<Payment>) {
    const out = await client(fraudModelDeployment).executeFunction({
        df_in: [{ amount: payment.amount, cardCountry: payment.cardCountry,
                  ipCountry: payment.ipCountry, merchantCategory: payment.mcc }],
    });
    return { score: out.df_out[0].score, modelVersion: out.df_out[0].modelVersion };
}
```

**[Explanation]** Three things about the wrapper:

- **It's a query.** It only *returns* a score. Saving the score is an action's job: *Record fraud score* writes the score struct with its model version ([05-03](../05-properties/03-structs.md)), so every stored score has provenance.
- **Mapping is where bugs live.** The wrapper maps properties onto model columns by hand. A renamed property breaks it quietly. The docs suggest using an Object or ObjectSet directly in the model API, which removes the hand mapping.
- **Know the batch path.** TSv1 can do row-wise processing when the model API has one tabular input and one tabular output. For Workshop columns over many payments, send one batched call, not one call per row ([03](03-function-lifecycle.md#020--make-it-fast)).

## Pattern 2 — Call a language model

**The need.** The Delivery Desk drafts customer updates for late orders: *"Your parcel is now arriving Thursday because…"*.

**[Docs]** Prerequisites: AIP enabled, and permission to use AIP builder capabilities. Then:

1. **Import the model.** In **Resource imports → Platform SDK → Add → Models**, pick Palantir-provided or registered models. Give each one an **alias** that is unique in the repository.
2. **Call it through a proxy endpoint.** The docs' example uses the OpenAI-compatible chat completions proxy. You install the `openai` library yourself. In TSv2, `getFoundryToken(client)`, `getOpenAiBaseUrl(client)` and `createFetch(client)` configure the client. In Python, `get_foundry_token`, `get_openai_base_url` and `get_http_client` do the same, with `preview=True`.
3. **Reference the model by alias:** `Aliases.model("draftModel").rid` in TSv2, `model("draftModel").rid` in Python. The docs say this "reduces the need to hardcode resource identifiers".

**[Docs] Aliases and Marketplace.** Model aliases travel with a Marketplace product but **can't be remapped at install**. If the target environment lacks the model, the alias fails at runtime. **Custom aliases**, plain configurable strings, *can* be set by the installer.

**[Docs] Language support.** LLM integration is **TSv2 and Python only** in the feature table. TSv1 has a separate, older path.

**Kestrel's design:**

```text
draftDelayMessage(order) ─► query function: loads order, shipment, ETA reason
                            └► LLM call with a fixed template + those facts
                            └► returns { subject, body }        (no edits)

Send delay update (action) ─► parameters prefilled from draftDelayMessage
                             ─► Ama edits, then submits
                             ─► side-effect webhook to messaging API (08-05)
```

**[Explanation]** The LLM never sends anything. It **drafts into an action form**, and a person applies the action, with its criteria, log and limits ([08](../08-actions/README.md)). This is the "agent proposes, a human approves" pattern from [00-02](../00-orientation/02-why-an-ontology.md). Module 16 expands it into agent tools.

**What the docs don't cover here.** **[Explanation]** The function pages don't discuss:

- what the model may see (only what the *calling user* can load: see [03](03-function-lifecycle.md#who-can-run-it));
- logging prompts;
- token cost.

Treat these as design questions for [16](../16-ai-and-agents/01-ontology-as-ai-context.md). Don't assume defaults.

## Pattern 3 — Bring your own LLM

**The need.** Kestrel Pay's compliance team requires a self-hosted model for anything that touches payment data.

**[Docs]** A **function interface** is a signature contract, "not itself a function". Foundry apps can discover implementations of it. Palantir provides **`ChatCompletion`**. AIP Logic's **Use LLM** block can select functions that implement it alongside Palantir models, and Pipeline Builder support is "coming soon".

**[Docs]** Some details:

- Implementations may use custom types if they're *compatible*.
- Input names must match by position.
- The docs now point to **registered models** as the current way to bring an LLM. The function-interface method is marked **Legacy**.
- The feature table lists bring-your-own-model for **AIP Logic and TSv1 only**. That describes the legacy function-interface method; registered models reach more apps, including Chatbot Studio, AI FDE, AIP Analyst and TypeScript functions ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md#where-a-registered-model-works)).

**[Explanation]** For Kestrel Pay, start with **registered models**, covered in [AIP 02 — Bring your own model](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md). Only fall back to a TSv1 `@ChatCompletion()` implementation if registration isn't available on the enrollment.

## Which pattern, when

| You have | Use | Edits? |
|---|---|---|
| A trained model with a live deployment | Model function inside a query function | No; an action stores the result |
| A general language task | Language model through a proxy and an alias | No; drafts into an action |
| A model you must host yourself | Registered model (current) or `ChatCompletion` interface (legacy) | No |
| AI output that must change the Ontology | Any of the above + **function-backed action** | Yes, governed by [08](../08-actions/README.md) |

---
[Module index](README.md) · Previous: [03 — Function lifecycle](03-function-lifecycle.md) · Next: [05 — Writing functions in practice](05-writing-functions-in-practice.md)
