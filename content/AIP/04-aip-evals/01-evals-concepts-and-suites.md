# 01 — Evals concepts and suites

*Sources: [AIP Evals](https://www.palantir.com/docs/foundry/aip-evals/overview/) · [Evaluation suites for Logic functions](https://www.palantir.com/docs/foundry/aip-evals/getting-started/) · [Create an evaluation suite](https://www.palantir.com/docs/foundry/aip-evals/create-suite/) · [AIP Logic core concepts](https://www.palantir.com/docs/foundry/logic/core-concepts/) · checked October 8, 2026 · Ready for Review*

This note is written as a **test plan**: the one Daniel writes before Delivery Desk's drafting goes live. The docs' concepts appear where the plan needs them.

## Why a test plan for an LLM

**[Docs]** AIP Evals is "a testing environment" for AIP Logic functions, AIP Chatbot functions and code-authored functions, "specifically designed to help you deal with the non-deterministic nature of LLMs". It is also available inside AI FDE through conversational commands ([07](../07-end-user-apps/README.md)).

**[Explanation]** A normal unit test asks "is the output equal to X?". For a drafted message there is no single right answer, so the plan tests **properties** of the answer (length, forbidden words, format, facts present) and runs each case more than once.

## The five parts of a suite

**[Docs]**

| Concept | Meaning | In Kestrel's plan |
|---|---|---|
| **Evaluation suite** | Test cases, target functions and evaluation functions together | `Delivery Desk drafts — suite` |
| **Target function** | The function under test; a suite can have several | Draft delay message (Logic) **and** `draftDelayMessage` (TSv2), compared on the same cases |
| **Evaluation function (evaluator)** | Compares actual output with expected output | See the evaluator table below |
| **Test cases** | Inputs and expected outputs | Delayed orders, plus hand-written edge cases |
| **Metrics** | Evaluator results, per test case; compared in aggregate or one by one | Pass rate per rule |

## Creating the suite

**[Docs]** Ways in, depending on the target:

| Target | Where you create the suite |
|---|---|
| AIP Logic function | Logic's **Evals** panel: *Set up tests manually*, or **Generate evals** if the function is eligible; or *Add as test case* from the Preview panel or Run history |
| AIP Chatbot | Publish the chatbot **as a function** first, then use its Evaluation tab ([05-03](../05-chatbot-studio/03-chatbots-outside-the-studio.md)) |
| Code-authored function | Code Repositories → Code → Functions → **Published** |

- **[Docs] Generate evals** analyses the Logic function, "including all referenced object types, not just input and output types", and creates editable test cases, evaluators and metrics. *View limitations* explains when it can't; the button is then disabled with a reason.
- **[Docs]** A suite with no evaluators just runs the function and shows outputs: useful for reading by eye, but it gives no aggregate metrics.
- **[Docs]** You can add more **target functions** later (*Add target function*); each can have a different signature, and evaluators are configured per target.

## Test cases: two sources

**[Docs]**

| Source | How | Best for |
|---|---|---|
| **Manual** | *Add test case*; name it (the AIP star suggests a name); fill inputs and expected values | Edge cases and precise control |
| **Object set** | *Add object set*; each object becomes a test case; columns can be the object, its properties, linked objects or sets, properties of linked objects (**Object Storage v2 only**), or a static value | Scale and real data |

**[Example]** Kestrel's cases:

| Set | Count | Why |
|---|---|---|
| Object set: orders with `Shipment.isLate = true` last month, sampled | 40 | Real variety of reasons and carriers |
| Manual: empty delay reason | 3 | The prompt's fallback rule |
| Manual: customer name with an apostrophe and one with non-Latin characters | 2 | Formatting and greeting |
| Manual: order `ON_HOLD` for payment risk | 2 | **Must not** mention the hold reason ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)) |
| Manual: ETA crosses midnight UTC | 2 | Local date, not UTC |

## Evaluators: from rules to metrics

**[Docs]** Built-in evaluators include exact matches (boolean, string, numeric, object, arrays), **regex match**, **Levenshtein distance**, **string length**, **keyword checker**, object-set checks, numeric and **temporal ranges**, a **generic exact match**, **LLM-as-a-judge** (an LLM checks "a user-defined condition"; you write the condition as a clear, verifiable assertion) and **ROUGE** (wording overlap; precision, recall and F-measure on 0–1).

**[Docs]** **Custom evaluators** are published functions (code or Logic) that return at least one boolean or numeric metric; they can return several as a struct, and strings appear as debug output.

**[Example]** Kestrel's rules, mapped:

| Rule (from [01-03](../01-models-and-llms/03-prompt-engineering.md)) | Evaluator | Objective |
|---|---|---|
| At most 3 sentences | Custom function `sentenceCount` | Numeric, minimise, threshold ≤ 3 |
| Body under 400 characters | String length | Range 1–400 |
| No refund or compensation language | Keyword checker on "refund", "compensation", "voucher" | Boolean: **false** passes |
| Valid subject and body | Generic exact match is wrong here; use a custom `isValidDraft` returning booleans | Both true |
| Mentions the new date | Regex match on the expected local date | True |
| Never reveals a payment hold | LLM-as-a-judge: "The message does not suggest any payment, fraud or account problem" | True |
| Tone | LLM-as-a-judge: "The message contains at most one apology and no blame of the customer" | True |

**[Explanation]** Two rules of thumb from building this table: use a deterministic evaluator whenever the rule can be checked mechanically, and keep LLM-as-a-judge for rules about meaning. A judge is itself an LLM, so its verdicts vary too ([03](03-runs-and-experiments.md)).

## When a test case passes

**[Docs]** Each metric has an **objective**: for booleans, which value passes; for numbers, maximise or minimise, optionally with a threshold (at least / at most). A test case iteration passes when **all** its metrics meet their objectives; a test case with several iterations passes only if **all iterations** pass. **[Docs]** An optional metric that doesn't apply shows *No value* and is left out of aggregates.

**[Explanation]** "All iterations must pass" makes the pass rate strict. A draft that breaks the refund rule once in three runs fails the case, which is the right behaviour for a rule like that.

---
[Module index](README.md) · Next: [02 — Evaluating inside a function](02-intermediate-parameters.md)
