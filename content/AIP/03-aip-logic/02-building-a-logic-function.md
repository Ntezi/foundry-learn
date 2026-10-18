# 02 — Building a Logic function

*Sources: [Getting started](https://www.palantir.com/docs/foundry/logic/getting-started/) · [Blocks](https://www.palantir.com/docs/foundry/logic/blocks/) · [AIP Logic FAQ](https://www.palantir.com/docs/foundry/logic/faq/) · checked October 14, 2026 · Ready for Review*

A build log: Kestrel's delay-message drafting rebuilt as a Logic function, step by step, with the docs' rules at the point where each one matters. The finished function is compared with the TypeScript version at the end.

## Step 0 — Where the file goes

**[Docs]** Open AIP Logic from the workspace bar, with Cmd/Ctrl + J, or from Files → **+New → AIP Logic**. A Logic file "must be saved in a project folder, not in your home folder".

**[Example]** Daniel saves `Draft delay message (Logic)` in `Delivery Desk [Workflow]`.

**[Docs]** The screen has three parts: inputs, blocks and outputs on the left; the **Debugger** in the middle; the **Run panel** on the right. The right sidebar holds Automate, Evals, unit tests and run history.

## Step 1 — Inputs

**[Docs]** Supported input types: array, boolean, date, double, float, integer, long, media reference, model, object, object list, object set, short, string, struct and timestamp.

**[Example]** One input: `order` (object, `Order`).

## Step 2 — Blocks

**[Docs]** The common block types:

| Block | What it does | Uses tokens? |
|---|---|---|
| **Use LLM** | A prompt, tools and an output; "the heart of AIP Logic" | Yes |
| **Apply action** | Calls an action **deterministically**, with parameters you fill, no LLM | No |
| **Execute function** | Calls an existing TypeScript, Python or Logic function | No |
| **Conditionals** | If / else-if / else; every branch must return the same type | No |
| **Loops** | Runs over a **list** (an array input gets an automatic *Array to List* block); iterations run in parallel if the loop contains no actions | No |
| **Create variable** | A value for later blocks | No |

The token column is from the FAQ: deterministic blocks "do not use any tokens".

**[Example]** Daniel's chain:

```text
order ─► Execute function: shipmentFacts(order)          ← existing TSv2 function: shipment, local ETA date, plain-text reason
      ─► Conditionals: reason empty?
           then ─► Create variable reasonText = "a delay at the carrier"
           else ─► return facts.reasonText
      ─► Use LLM: draft  (prompt from 01-03, output type Struct {subject, body})
      ─► output: the struct
```

**[Docs]** "By using the *Struct* output type you can return multiple named values" from one LLM block.

## Step 3 — The prompt

**[Docs]** Start with the most important information (the task), then the data, then guidance on when to use tools. The model "only has access to what you specifically provide". Type `/` in the prompt to insert inputs or earlier block outputs; for an object you then choose which **properties** to insert.

**[Example]** The prompt is the second draft from [01-03](../01-models-and-llms/03-prompt-engineering.md), with `/facts.firstName`, `/facts.etaLocalDate` and `/reasonText` inserted. Only those properties go in, not the whole order.

## Step 4 — Tools (when the LLM should choose)

The drafting block needs no tools, because the facts are loaded deterministically. Tools matter when the model must decide what to look up or do.

**[Docs]** Tools are how Logic lets the LLM read or write the Ontology. The model **can't** use them directly: it "can only ask to use tools", and Logic executes the call "within the invoking user's permissions".

| Tool | Lets the LLM… |
|---|---|
| **Apply actions** | Edit the Ontology through actions you choose, with a description of when to use each |
| **Call function** | Call code functions or other Logic functions |
| **Query objects** | Read the object types you list, limited to the properties you pick |
| **Calculator** | Do exact arithmetic |

- **[Docs] Tool calling modes.** *Native* tool calling uses the model's own capability and is more token-efficient; *prompted* tool calling instructs the model through the prompt. Logic switches to native automatically when **every** model in the Use LLM board supports it, and says so in the Debugger.
- **[Docs]** You can limit how many objects a query or function tool returns to the LLM (*Configure object return limits*).

**[Explanation]** Prefer a deterministic block whenever you already know what to fetch. A tool is a decision handed to the model, with the token cost and variance that come with it.

## Step 5 — Run and debug

**[Docs]** **Run** opens the Debugger with the chain of thought; you can expand blocks, clear tool calls and read the generated prompts. **Show raw** displays the exact string sent to the model. The token count appears at the end of each message; a **red** bar means you should cut tokens.

**[Docs]** Temperature: set it in a Use LLM block's configuration field, for example `{"temperature": 0.9}`. The **default is 0**.

**[Docs] Saving tests as you go:** the unit-test icon saves the current input as a test case; *Add as test case* in **Run history** turns past runs into test cases for an evaluation suite; *Generate evals* in the Evals tab bootstraps a suite ([04](../04-aip-evals/README.md)).

## Step 6 — Publish and use

**[Docs]** Select **Publish** next to save. A string-returning function can back a Workshop Markdown widget; any function can be called from Workshop or other functions. The version history sidebar lets you compare versions (blocks added, edited or removed) and roll back.

## If the function must edit the Ontology

**[Docs]** Four steps:

1. Add an **Apply actions** tool in a Use LLM block (or an Apply action block).
2. Publish the function.
3. Create a **new action backed by the published function**.
4. Use that action in Workshop. Or run the function from an automation, from the Logic file's *Automations* option.

Until step 3, edits only appear as proposals in the Debugger. **[Example]** This is how *Propose re-route* would be built in Logic: an Apply actions tool limited to the action that creates a `RerouteProposal`, never *Re-route shipment* itself ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)).

## Logic version vs TypeScript version

| | `draftDelayMessage` (TSv2) | Draft delay message (Logic) |
|---|---|---|
| Who changes the wording rules | Daniel, through a pull request | Ama's lead, in the prompt, reviewed through a branch proposal ([03](03-execution-modes-and-branching.md)) |
| How the model is chosen | Alias `draftModel` | Model selector on the Use LLM block |
| Tests | Unit tests in the repository | Unit tests in Logic and an Evals suite |
| Facts loading | In the same function | Reuses the TS function through *Execute function* |
| Cost | Tokens | Tokens plus Logic's per-block compute ([04](04-logic-in-production.md)) |

**[Example]** Kestrel's decision: keep the TSv2 function as the Delivery Desk tool T4, because it's pinned and tested, and use the Logic version as the place where wording changes are tried first, measured with Evals, then copied into the TS function's template. One source of truth for the shipped behaviour; one sandbox for wording.

---
[Module index](README.md) · Previous: [01 — AIP Logic concepts](01-logic-concepts.md) · Next: [03 — Execution modes and branching](03-execution-modes-and-branching.md)
