# 04 — Session logging

*Sources: [Session logging](https://www.palantir.com/docs/foundry/chatbot-studio/session-logging/) · checked October 8, 2026 · Ready for Review*

A **cookbook**: what a chatbot log contains, then three questions Kestrel answers with it. The privacy rules come first, because the logs contain people's words.

## Before you export anything

**[Docs]** Each message to a chatbot is one **execution**, logged as structured events that can be exported to a Foundry **streaming dataset**, using the platform's *configure logging* feature. Event schemas "are subject to change".

**[Docs]** Exported logs can contain **user prompts, identifiers, application variables, retrieval context, and tool inputs and results**, and every entry can be traced to the user who sent it. Before exporting, the page asks you to:

- define the **monitoring purpose**;
- **restrict** the output dataset to people who need it, and apply **markings** to it (the recommended *Apply markings* step);
- set a **retention** period.

It requires the log-export permissions and points to its privacy and civil liberties guidance.

**[Example]** Kestrel's export: purpose "tool reliability and failure analysis for Delivery Desk"; dataset `delivery-desk-session-logs` in `Delivery Desk [Workflow]`, marked so only Daniel and the platform team can read it; 30 days' retention. Customer messages appear in tool inputs, so Ama's team leads don't get access by default.

## What a log entry looks like

**[Docs] Common fields**, shared with function and model logs in the same request:

| Field | Meaning |
|---|---|
| `traceId` | One per execution; follow a request end to end |
| `uid` | The user who sent the message |
| `owning_rid` | The **source** executor that started it. If chatbot A calls a function that calls chatbot B, every log line has **A's** RID |

**[Docs]** Chatbot events add `event_name` and a `payload`; every payload has a `session_rid` to group one conversation.

**[Docs] Event types, in the order they happen:**

| `event_name` | Records |
|---|---|
| `session_metadata` | Chatbot RID and version, session RID, caller identifier |
| `user_request` | The message, retrieval contexts (from the chatbot's configuration and from the user's input), application variables and their values |
| `system_chat_message` | The compiled system prompt, including tool definitions (native tools in `native_tools`; prompted tools are in the content) |
| `user_chat_message` | The user message as sent to the LLM |
| `assistant_chat_message` | The LLM's reply: text or tool calls |
| `tool_call` | Tool name and parsed input |
| `tool_call_result` | Success (the value returned to the LLM, variable updates) or failure (message and reason), and **`duration_milliseconds`** |
| `final_response` | The answer, or a *client tool call* (the chatbot defers to a client-side action) |
| `execution_error` | The error name |

## Recipe 1 — Replay a conversation

**[Docs]** Filter `owning_rid` = the chatbot's RID → filter one `session_rid` → take `user_query` from `user_request` events and `response` from `final_response` events.

**[Example]** Ama reports "it suggested a re-route for an order that was already delivered". Daniel replays the session and sees from `user_request` that the selected-order variable still held the previous order: an app wiring bug, not a model one.

## Recipe 2 — Which tools are unreliable or slow

**[Docs]** From `tool_call_result`: count success vs failure per `tool_name`; sort by `duration_milliseconds`.

**[Example]** Weekly view for Delivery Desk:

| Tool | Calls | Failures | Median ms | What it told Kestrel |
|---|---|---|---|---|
| T2 Look up orders and shipments | 3,410 | 0.4% | 380 | Fine |
| T3 Policy search | 1,120 | 0.1% | 1,900 | Slow: the hybrid search queries too many chunks |
| T5 Send delay update | 860 | 6.2% | 520 | Failures are the action's submission criteria rejecting the call: the criteria work, but the instructions should tell the model when T5 doesn't apply |

## Recipe 3 — Spot retries

**[Docs]** Within one `traceId`, several `tool_call` / `tool_call_result` pairs with the same `tool_name`, where a failure is followed by another call, mean the chatbot retried.

**[Explanation]** Retries cost tokens and, for action tools, can mean the model is trying different parameters until the action's criteria accept one. For T6 (*Propose re-route*) Kestrel alerts on more than two calls in one trace: the model should ask Kofi or Ama (T7) instead of guessing destinations.

## Where else to look

**[Docs]** Logs can also be viewed in the platform through Ontology and AIP observability ([09](../09-cost-and-observability/README.md)); the studio's **Monitoring** and **Usage** tabs show metrics and thumbs-up/down feedback ([01](01-chatbot-concepts.md#save-view-publish-watch)).

---
[Module index](README.md) · Previous: [03 — Chatbots outside the studio](03-chatbots-outside-the-studio.md) · Next module: [06 — AIP Document Intelligence](../06-document-intelligence/README.md)
