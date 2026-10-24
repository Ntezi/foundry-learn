# 02 — AIP Assist

*Sources: [AIP Assist](https://www.palantir.com/docs/foundry/assist/overview/) · [AIP Assist best practices](https://www.palantir.com/docs/foundry/assist/aip-best-practices/) · [AIP Assist application integrations](https://www.palantir.com/docs/foundry/assist/application-integrations/) · [Suggested actions in AIP Assist](https://www.palantir.com/docs/foundry/assist/aip-assist-suggested-actions/) · checked October 8, 2026 · Ready for Review*

AIP Assist is the assistant everyone already has. This note is a **field guide**: what it knows, what it can't see, where it shows up inside other apps, and how to ask it well.

## What it is and what it knows

**[Docs]** "An LLM-powered support tool designed to help users navigate, understand, and generate value with the Palantir platform." It is trained on Palantir's platform documentation, answers in "all common languages", keeps the conversation's context, and knows **which application** you are in.

**[Docs]** It is available only if an administrator has enabled AIP in Control Panel. Open it from the bottom of the workspace bar or with **Cmd+Shift+U** (macOS) / **Ctrl+Shift+U** (Windows).

**[Docs] Modes:**

| Mode | Answers from |
|---|---|
| **AIP Assist** (default) | Chooses between platform documentation, developer documentation and custom content sources |
| **Platform Documentation Assist** | Platform documentation |
| **Developer Assist** | Foundry APIs and common developer examples |
| **AIP Chatbots** | A user-built chatbot, for example one backed by your own documentation ([03](03-assist-custom-content-sources.md)) |

## What it can see: read this twice

**[Docs]** The overview says Assist "does not access your data"; the best-practices page says it "does not have access to any data or metadata that you are working with". But the Code Repositories integration lets you **attach** the repository, files or a snippet, and then Assist "will also have access to the metadata of referenced datasets and objects in attachments".

**[Explanation]** The two statements fit together: by default Assist sees documentation and the name of the app you're in, not your data. When **you** attach code, it can see that code and the metadata of the datasets and objects it references. So "Assist can't see my data" is true until someone attaches a file. Don't paste customer data into the chat on the assumption that Assist ignores it.

## Where it appears inside other apps

**[Docs]**

| App | Integration |
|---|---|
| **Code Repositories** | *Ask AIP Assist* helper with preset code actions; attach the whole repository, files or a highlighted snippet, then ask it to explain, optimise, search or summarise |
| **Carbon workspaces** | *Enable AIP Assist* so users chat with chatbots configured for their group |
| **Contour** | In the expression board: explain code, find bugs, translate code into expressions |
| **Workshop** | A Button widget's **Send to AIP Assist** event opens Assist with a fixed or variable-driven prompt, optionally with a default chatbot |
| **Slate** | `slate.askAIPAssist` opens Assist with an optional prompt built from app state |
| **Issues** | *Open AIP Assist* before filing an issue; answer or summarise an existing issue |
| **Ontology Manager** | *Explain with AIP Assist* on an error in the Errors tab |

**[Docs] Suggested actions.** Assist can suggest navigational and in-app actions. If it lacks the information, it can suggest a post on the Palantir Developer Community with a drafted title and description; administrators can switch that suggestion off on the AIP Assist page in Control Panel.

**[Example]** Daniel's most-used integration is Ontology Manager's *Explain with AIP Assist* while adding the carrier-invoice types ([06-01](../06-document-intelligence/01-extraction-strategies.md#where-the-data-goes)). For Kofi's reviewer page, a Workshop **Send to AIP Assist** button asks "How do I compare two re-route proposals?" against Kestrel's own help content ([03](03-assist-custom-content-sources.md)).

## Asking it well

**[Docs]** Be specific about the product or feature; ask one question at a time; follow up or rephrase; use full sentences; give examples of the format you want.

| Weak (the docs' kind of example) | Strong |
|---|---|
| "This thing isn't working, what's wrong?" | "My Python transforms repository fails its checks with *Could not solve for environment specs* after I added a library. How do I troubleshoot it?" |
| "Python extract 2 character string" | "Write a Python transform that takes column `id` and returns the two characters before the dash: `AB-02` → `AB`; `123-MA` → no match." |

**[Explanation]** These are the general prompting rules from [01-03](../01-models-and-llms/03-prompt-engineering.md) applied to a tool whose context you can't edit: since you can't add a system prompt, the question has to carry the context.

**[Docs]** Assist is not supported for registered (bring-your-own) models ([02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md#where-a-registered-model-works)).

---
[Module index](README.md) · Previous: [01 — Which app for whom](01-which-app-for-whom.md) · Next: [03 — Custom content sources for AIP Assist](03-assist-custom-content-sources.md)
