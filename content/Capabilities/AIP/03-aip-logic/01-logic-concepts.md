# 01 — AIP Logic concepts

*Sources: [AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/logic/core-concepts/) · [Getting started: use a Logic function](https://www.palantir.com/docs/foundry/logic/getting-started/) · checked October 8, 2026 · Ready for Review*

The [official exam guide](https://learn.palantir.com/page/palantir-application-developer-associate-certification-exam-guide)'s domain 3 (summary: [07_Exam_Guide](../../../Tracks/Application%20Developer/07_Exam_Guide.md)) asks you to "select a paradigm" between TypeScript v2, Python v2 and AIP Logic. This note gives the vocabulary first, then answers that question.

## Five words

| Term | **[Docs]** meaning |
|---|---|
| **Logic function** | Takes inputs (Ontology objects, text and other types) and returns a value, an object, or an edit to the Ontology. Usable "like any other function in the platform" |
| **Block** | The unit a function is built from: read or write the Ontology, calculate, aggregate, call functions, loop, branch, or use an LLM. Blocks chain: one block's output feeds the next |
| **Evaluations** | Tests for a published Logic function: compare models, measure variance across runs, run experiments on parameters, and group failures by root cause ([04](../04-aip-evals/README.md)) |
| **Debugger** | Opens when you run the function; shows the LLM's chain of thought block by block, and any tools it used |
| **Execution mode** | **User-scoped** (the caller's permissions; the default) or **project-scoped** (the project's permissions) ([03](03-execution-modes-and-branching.md)) |

**[Docs]** AIP Logic is "a no-code development environment for building, testing, and releasing functions powered by LLMs". Its examples: connecting unstructured inputs to the Ontology, resolving scheduling conflicts, finding the best allocation, reacting to supply-chain disruption.

## Where a Logic function can be used

**[Docs]**

- **Back an action** with it, then call the action from Workshop.
- **Back a Markdown widget** in Workshop; the function must return a string.
- **Call it from other functions**: other Logic functions, and functions on objects, through the Ontology function tool.
- **Run it from the command line**: the *Uses* tab gives a curl request. Not available for Logic functions that return Ontology edits.
- **Automate it**, so its edits are applied or staged for review ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)).

## The rule that trips people up

**[Docs]** A Logic function edits the Ontology **only when it runs from an action** (or an automation). In the Debugger you see the proposed edits "in your scenario", but they "will not actually be executed". This holds even if the function contains an *Apply action* block.

**[Explanation]** So a Logic function that "creates a `RerouteProposal`" does nothing on its own. The chain is: publish the function → create an action backed by it → call that action from Workshop, or run the function from an automation.

## What the model can and can't see

**[Docs]** Logic runs inside the platform's security model. Row and column controls (restricted views, object security policies, property security policies) filter what the model reads on a user's behalf: "the model can never see data the user is not authorized to read". But these controls "do not extend to the model's output or any Ontology edits it composes". The docs say to pair them with a marking or classification-based access control.

**[Explanation]** This is the same read-time-only rule as [Ontology 16-01](../../Ontology/16-ai-and-agents/01-ontology-as-ai-context.md). If Kofi can read an Accra shipment and the model summarises it into a field on an object everyone can see, the row policy didn't follow the text.

## Logic or code?

**[Explanation]** The docs describe Logic but don't give a decision rule against code. This table is ours, built from what each page documents:

| Need | AIP Logic | TypeScript v2 or Python function |
|---|---|---|
| Core of the task is language: classify, extract, draft, choose | ✓ The Use LLM block is "the heart" of Logic | Possible through the proxy APIs ([01-02](../01-models-and-llms/02-llm-provider-compatible-apis.md)), with more code |
| Deterministic rules, maths, aggregation over many objects | Only through deterministic blocks or by calling a function | ✓ |
| Business users or analysts maintain it | ✓ No code; prompts are readable | Needs developers and a repository |
| Unit tests and code review in Git | Version history, comparison view, branching and proposals ([03](03-execution-modes-and-branching.md)) | ✓ Full repository tooling |
| An LLM must choose which tool to call | ✓ Tools on the Use LLM block | Build the loop yourself |
| Call from outside Foundry | curl from the *Uses* tab; not for edit-returning functions | API gateway, OSDK |
| Runs longer than five minutes | ✗ Five-minute limit outside the Debugger ([04](04-logic-in-production.md)) | Also subject to function limits |

**[Recommendation]** A good default: deterministic work in code, language work in Logic, and Logic calling code through the *Execute function* block or the *Call function* tool. That's also the exam guide's wording: choose by "determinism, runtime capabilities, LLM needs, maintainability, and maintainer audience".

**[Example]** Kestrel keeps `draftDelayMessage` in TypeScript v2 because Daniel owns it with unit tests in the `kestrel-functions` repository. [02](02-building-a-logic-function.md) builds the same feature in Logic, so Ama's team lead could change the wording rules without a developer, and compares the two.

---
[Module index](README.md) · Next: [02 — Building a Logic function](02-building-a-logic-function.md)
