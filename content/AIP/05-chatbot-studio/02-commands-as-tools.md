# 02 — Commands as tools

*Sources: [Use commands as tools in AIP Chatbot Studio](https://www.palantir.com/docs/foundry/chatbot-studio/commands-as-tools/) · checked October 8, 2026 · Ready for Review*

Every tool in Delivery Desk's sheet ([Ontology 16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md)) runs on the **back end**: it queries objects, calls a function or applies an action. **Commands** are the other kind: they run **in the user's open application**, so the chatbot can move the screen the user is looking at.

## Backend tool vs command

| | Backend tools (action, query, function…) | Command tools |
|---|---|---|
| Runs | In the platform | **[Docs]** "Directly in the user's application", with access to its current state and screen |
| Typical use | Read or change data | **[Docs]** Navigate the interface, for example set a map's view to a location; draw on a map |
| Needs an open app | No | Yes: the chatbot must be **paired** with an app that produces the command |
| Works when the chatbot runs as a function in Automate | Yes | **[Docs]** No. Commands are **ignored** in environments that don't support them |

**[Docs]** Applications declare and produce commands; Workshop's **Button Group**, **Metric Card** and **App Pairing** widgets can also trigger operations in apps that produce commands.

## Adding and configuring a command

**[Docs]** **Add tool → Commands**, search, pick one or more. You can add the **same command more than once** to give each instance different instructions.

**[Docs] Configuration** (marked **beta**):

| Setting | What it does |
|---|---|
| **Additional documentation** | Extra guidance on top of the command's built-in documentation, on exactly when and how to call it |
| **Input parameters** | Per parameter, an override: **Chatbot decides** (default) · **Preset values** (a fixed value) · **Application variable** (a string or object-set variable) · **Don't pass the parameter to chatbot** (optional parameters only) |
| **Asks for user approval before execution** | **On by default.** The user sees the payload and approves or rejects. Off: the command runs straight from the prompt |

**[Docs]** The page calls approval a privacy best practice for commands that "change operational data, share information, or otherwise have consequential effects". Turning it off can let an incorrect or overly broad command act without anyone checking.

**[Docs]** Chatbots with command tools have a retention window that **expires after 24 hours of inactivity**.

## Testing with app pairing

**[Docs]**

1. Open the app that produces the command in a **separate browser window**, next to the studio.
2. **Choose an app to pair with… → Pair**.
3. Prompt the chatbot and watch the other window.

**[Docs]** Through **App Pairing** the chatbot discovers other open apps; *Add* groups several app instances into a pairing group. If nothing is paired when a command is needed, the chatbot asks the user to pick an app.

## Where users meet it

**[Docs]**

| Embed in | How | Pairing |
|---|---|---|
| **AIP Assist** | Rocket icon → **Usage** panel → **AIP Assist** toggle → **Publish**. Users pick it from *Chat with an AIP Chatbot* in the Assist panel | Automatic with the target app; asks if a needed app isn't open |
| **Workshop** | **AIP Chatbot** widget, with the target app in an **Iframe** widget next to it | Automatic with the iframe-embedded app |

**[Docs]** The page recommends embedding over using the studio with a paired app, for a smoother experience.

## Kestrel: a map command for Kofi

**[Example]** Kofi reviews `RerouteProposal`s for Accra ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)). His Workshop page has the proposal list, a map in an Iframe widget, and a small reviewer chatbot. Two commands were added as tools:

| Instance | Command | Parameter overrides | Approval |
|---|---|---|---|
| "Show the shipment" | Set map view | Location: **application variable** (the selected proposal's shipment) | **Off**: it only moves the view |
| "Show alternatives" | Draw polygon | Fill pattern: **preset**; area: chatbot decides | **Off**: draws a temporary overlay |

Kofi types "where would this go instead?" and the map moves and draws the warehouses in range. Accepting the proposal is still the *Re-route shipment* action, a backend tool with its own criteria, never a command.

**[Explanation]** The approval default is the right default; Kestrel switched it off only for commands that change nothing but the view. Anything that writes, shares or sends stays an action with confirmation (Delivery Desk's T5 rule).

---
[Module index](README.md) · Previous: [01 — Chatbot Studio concepts](01-chatbot-concepts.md) · Next: [03 — Chatbots outside the studio](03-chatbots-outside-the-studio.md)
