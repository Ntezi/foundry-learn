# 37 — Next Steps: Interactive AIP Agents

*Module: Conclusion · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## A different interaction pattern

The course's main function operates in response to configured inputs and events. This lesson points toward an interactive assistant, where a user asks questions or requests work while the application supplies relevant context.

The source calls the tool AIP Agent Studio. Its official documentation link now redirects to **AIP Chatbot Studio**, and the page explicitly records the former name. Use that terminology mapping when locating the current documentation; a different label does not necessarily mean you found the wrong concept. [Current official overview](https://www.palantir.com/docs/foundry/chatbot-studio/overview/).

The documentation describes assistants using enterprise information and tools, including Ontology and document context, with application integration. This is a broader capability than the fixed Single completion followed by an Action configured in the speedrun.

## Event-driven and conversational entry points

| Design question | Course automation | Interactive assistant |
|---|---|---|
| What starts work? | A configured event or manual execution | A user's conversational request |
| Where does context come from? | Explicit function input bindings | Configured application/retrieval context and user interaction |
| How is scope defined? | Selected set, fixed trial and function | Assistant instructions, available context and tools |
| What needs verification? | Event-to-effect path | Request interpretation, context and any selected operation |

These are engineering comparisons, not step-by-step instructions for a second build. A conversational interface does not remove the need to define allowed operations and verify their inputs.

## The application context matters

Imagine an operator viewing one candidate while asking, “Why does this need review?” An assistant should use the relevant candidate and evidence rather than guessing from a display name or stale conversation. Before enabling a write, the interface should make the intended target and change understandable.

That example shows why context is an explicit dependency. A fluent answer about the wrong object is still wrong. The identity and evidence lessons from the first half remain useful even when the interaction becomes conversational.

## Do not confuse interface flexibility with correctness

An assistant may be able to interpret a wider range of requests than a single-purpose form. That expands the behavior you need to evaluate. Ambiguous requests, missing context and unintended changes become part of the test space.

The lesson also links a Build with AIP example using transcribed video context. The linked example was not opened or implemented in this pass, so these notes do not claim its configuration or results. It remains a source-provided exploration option.

Choose an interactive interface when the work benefits from user-led exploration and clarification. A well-defined background operation may remain easier to reason about as a configured function and event path. This is a design trade-off to assess, not a mandate to replace the speedrun implementation.

**Review question:** does adding chat automatically make the existing assessment more reliable? No. It changes the interaction and potentially the available context or tools; reliability still requires explicit contracts and evaluation.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282391) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
