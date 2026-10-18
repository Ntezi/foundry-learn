# Sources, corrections and evidence boundaries

Checked September 12, 2026. Primary source: the signed-in [official course](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow). All 38 curriculum titles and lesson links were visible. Bodies of all 38 lessons were inspected across the first-half pass and authorized continuation. [Lesson manifest](lesson-manifest.json) records each prepared note's actual title, module and source ID.

## Substantive corrections

| Source | Issue | Treatment in these notes |
|---|---|---|
| [Install the Marketplace Product](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278623) | Two supply-chain references conflict with the named product and clinical-trial use case | Flag as apparent copied wording; follow the named agentic course product and inspect the actual installed assets later |
| [Compose the LLM Part](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279762) | Prompt asks for enrollment fields; output struct asks for eligibility fields | Align the teaching prompt with `eligibility_decision` and `eligibility_reasoning`, also used by the following Action lesson |
| Same prompt | Suggests enrollment while the configured operation records eligibility | Describe assessment; do not claim a separate enrollment operation occurred |
| [Preview](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2280712) and [Summary](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2280713) | Generic discussion of Chain of Thought and model-selected tools follows a Single completion configuration | Keep the concrete fixed block sequence separate from broader capabilities |
| [Agent introduction](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279745) and [Action lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2280694) | Requesting manual review could be read as a complete human handoff | Explain that storing an outcome does not establish routing, notification or resolution |
| [Explore the Application](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279656) | Manual walkthrough mentions two decisions; later prompt adds a third | Verify actual Action accepted values during practice; do not infer the full schema from that brief description |

The course's generic installation instruction permits any listed organization for Action submission. The notes recommend the organization intended for the learner's training context; this is contextual engineering judgment, not a claim that the source specifies stricter behavior.

## Supporting official documentation

- [AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview/): checked for the distinction between authoring an LLM-powered function and merely saving a prompt.
- [Execution mode settings](https://www.palantir.com/docs/foundry/logic/execution-mode-settings/): checked for user-scoped versus project-scoped permissions. This scope setting is distinct from prompting strategy.
- [Staged writes](https://www.palantir.com/docs/foundry/logic/staged-writes/): checked for current differences in edit semantics. The page describes beta availability and mode-dependent behavior. The notes require inspecting the actual enrollment before interpreting future execution; they do not assert which mode is enabled. The second-half notes flag the compatible Action-effect route as a current-documentation distinction from the shown course Logic effect.

## What is an explanation, not source evidence?

The software-service comparisons, equipment-loan example, concurrency questions and suggested debugging checks are teaching additions. The rewritten prompt is a proposed correction to test, not a measured improvement. The candidate/trial names in the preview note are official fictional examples; no eligibility outcome is inferred from them.

The course's text and curriculum were read through the signed-in browser. First-half screenshots were not independently transcribed. During the second half, screenshots were inspected for the three evaluation cases, the automatic effect bindings/edit behavior and the fictional new-patient form. No video was watched, no Marketplace bundle was inspected live, and no Foundry exercise was run. Record runtime details when actual practical work occurs.

## Completion evidence

The overview showed 0/38, then 18/38 (47%) after first-half viewing, and **38/38 (100%)** after the remaining lessons. A [course certificate](https://verify.skilljar.com/c/m5jt8wrr4avw) is visible. These changes result from page viewing, not hands-on verification. All 38 notes are prepared and Ready for Review; practical work remains Not Started. No certification exam pass is claimed.

Central files were preserved before editing under `Learn/study-backups/2026-09-12/agentic-aip-first-half-depth/`. This new course folder does not replace or duplicate Application Developer notes.


## Second-half additions and corrections

- [Configure Test Cases](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282376): screenshot confirms Priya Nair → Suitable, Vivek Kapoor → Not suitable, and Yash Rajan → Manual review required for the pictured Glycurex trial. These are source expectations, not model results.
- [Configure an Evaluator](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282374): scores only `eligibility_decision`. [Current evaluator documentation](https://www.palantir.com/docs/foundry/aip-evals/create-suite/#built-in-evaluators) confirms default case/whitespace-sensitive matching with configurable options.
- [Conclusion](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282392): the claim of covering all possible cases is too broad. Three examples cover three labels, not all inputs, explanations or edit behavior.
- [Create Automation](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282383): screenshot confirms event-derived patient, static trial and Automatically run edits. The shown Logic effect differs from the [current staged-write Action-effect path](https://www.palantir.com/docs/foundry/logic/staged-writes/); inspect enrollment configuration before practice.
- [Add a New Patient](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2286202): screenshot values are transcribed in lesson 33. Its heading saying newly added agent means patient in context. No patient was created.
- [Automation summary](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282386): the seconds-versus-hours claim is not a benchmark established by our work; no latency or productivity result is claimed.
- [Interactive AIP Agents](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282391): the linked official page redirects to [AIP Chatbot Studio](https://www.palantir.com/docs/foundry/chatbot-studio/overview/), which explicitly documents the former AIP Agent Studio name. The linked video-context build example was not inspected.

The complete pre-continuation course and central files were preserved under `Learn/study-backups/2026-09-12/agentic-aip-second-half-depth/`. First-half lesson teaching content was retained; lesson 18 and its review guide receive continuation markers. No previous course files were rewritten.
