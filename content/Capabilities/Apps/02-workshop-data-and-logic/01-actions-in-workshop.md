# 01 — Actions in Workshop

*Sources: [Actions](https://www.palantir.com/docs/foundry/workshop/actions-overview/) · [Use Actions in Workshop](https://www.palantir.com/docs/foundry/workshop/actions-use/) · [Getting started](https://www.palantir.com/docs/foundry/workshop/getting-started/) · checked October 18, 2026 · Ready for Review*

Workshop doesn't write data itself. Every change goes through an **action type** defined in Ontology Manager; Workshop decides **where** the action is offered, **what it is pre-filled with**, and **what happens around it**. Defining action types is covered in [Ontology 08](../../Ontology/08-actions/README.md); this note is the Workshop side.

## Where an action can be offered

**[Docs]** Actions are exposed through widgets, mainly the **Button Group** and the **Inline Action** widget. A **Media Uploader** can also run an action once per uploaded file. The form a user sees is generated from the action type, so "writeback to object data and the user interface associated with it are not defined separately".

**[Docs]** Creating or editing an action type needs membership of `actions-admins`; offering an existing one in Workshop doesn't.

## Wiring a Button Group to an action

**[Docs]** A button's configuration has three parts: **Button type**, **Button configuration** and **Display & formatting**. In Button configuration:

1. Set the label, colour (a preset **intent**: none, primary, success, warning, danger; or a custom colour, including a hex code) and left and right icons.
2. Under **On click**, choose **Action** and pick the action type.
3. Set **parameter defaults**. *Add all parameters* configures every parameter at once. For each parameter that gets a default, choose how the form shows it:

| Visibility | The user… | Use when |
|---|---|---|
| **Visible** | sees the default and can change it | the module's guess is usually right but not always |
| **Hidden** | doesn't see the parameter at all | the value is fixed by context, such as the selected object |
| **Disabled** | sees it read-only | the user should see what they are acting on but not change it |

Parameters with no default appear as empty fields for the user to fill in.

**[Docs]** Submission criteria run in the form: the form flags issues (for example "1 issue" at the bottom left) and the submit button is available only when every parameter passes. A successful submission shows a green toast.

**[Example]** On the Delivery Desk queue, *Hold order*:

| Parameter | Default | Visibility | Why |
|---|---|---|---|
| `order` (object reference) | `selectedOrder` (the table's active object) | **Disabled** | Agents should see which order they are holding, but not switch it in the form |
| `reason` (multiple choice) | — | (user picks) | The agent knows why the order is held |

**[Example]** The action's submission criteria come with it ([Ontology 08-01](../../Ontology/08-actions/01-action-types.md)): the user must be in *CS agents*, and the order mustn't be SHIPPED or DELIVERED. If an agent selects an order that shipped a minute ago, the form flags an issue and the submit button stays unavailable; Workshop needs no check of its own.

**[Explanation]** The getting-started tutorial hides the alert parameter instead. Hidden is fine when the selected row is obvious on screen; Disabled is safer if the form covers the table, because the agent can still check the order ID. Neither replaces the action's own submission criteria: a default from a variable is a convenience, not a security check, since the user can change Visible values and the action can be called elsewhere.

## Running events around an action

**[Docs]** At the bottom of the widget configuration, two triggers run Workshop events during an action's lifecycle:

- **On start of Action submission**
- **On successful completion of Action submission**

Use them to refresh data, navigate, or update variables.

**[Example]** After *Hold order* succeeds, two events run: *Set variable value* clears `selectedOrder`, then the order panel collapses. The held order doesn't leave the table, because ON_HOLD is one of the statuses `atRiskOrders` includes ([Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md)). That is intended: held orders still need watching, now with their new status showing.

**[Explanation]** Remember the event-order rule from [01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md#order-of-execution-the-trap): the success trigger runs after the action, but variables computed from the edited objects may not have recomputed by the time the next event in the list runs.

## Actions from uploads

**[Docs]** The Media Uploader can trigger an action for each uploaded file and pass a file identifier to a parameter:

| Upload destination | Identifier passed |
|---|---|
| Dataset | The uploaded filename |
| Compass folder | The file's RID |
| Media set | The file's media reference |

**[Docs]** The widget now appears as *Media uploader (Legacy)* in the widget picker, and the media set destination is hidden for new configurations. For media sets, open an action form from a Button Group or use the Inline Action widget instead.

---
[Module index](README.md) · Next: [02 — Functions and derived properties](02-functions-and-derived-properties.md)
