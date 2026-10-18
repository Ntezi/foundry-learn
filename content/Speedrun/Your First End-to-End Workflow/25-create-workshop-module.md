# 25 — Create the Workshop module: establish the application resource

The first half created the data foundation and an Order model. You now need a place to configure the user interface over those Orders. In Workshop, that application resource is called a **module**. It contains the layouts, widgets, variables and interactions that describe the application.

A module is not another copy of the order dataset. Creating it establishes an interface that will consume the object model; it does not repeat ingestion or create new Orders.

## Start from the intended Order type

The course opens the Order object's **Overview → Dependents → Workshop** and creates **[username] Orders Inbox** in the course folder. Save the Ontology changes before taking this step so you are building against the intended saved model.

Starting from the object helps keep the relationship visible: this application will depend on your training Order type. Still inspect the type you selected. A similarly named Order belonging to another exercise can expose a different population or incompatible properties.

The earlier training record identifies **Marius Orders Inbox** under `/Hence/Exploration/Marius/Application Developer Training`. Reuse that resource when revisiting the existing build, after verifying its identity. This is historical navigation information, not a fresh observation of the application.

## Translate the new vocabulary into familiar responsibilities

| Workshop concept | Role | Software-engineering connection |
|---|---|---|
| Module | Holds the application configuration | The application or feature you are composing. |
| Layout/section | Organizes space and information | Containers and layout structure. |
| Widget | Presents data or accepts interaction | A UI component with configured inputs and outputs. |
| Variable | Carries values or defines data dependencies | State, query definitions and derived values. |
| Event | Triggers configured behavior | An event handler such as a button click. |

These are conceptual connections, not a promise that Workshop runs like your particular frontend framework. You configure the relationships rather than implementing every component from scratch.

## Why the module is a separate resource

The pipeline determines how order data is prepared. The Ontology determines its modeled identity and properties. The module determines how a user works with that model. Keeping those responsibilities separate allows two applications to use the same Orders while presenting different workflows.

For example, a fulfillment inbox and a supervisor summary might share the model but offer different layouts. Creating the second application should not require copying every order into another dataset merely to display it differently.

This separation also helps debugging: an empty newly created module can be normal because it has no configured display widgets yet. If a configured table later has no data, investigate its selected type, object-set definition, access and backing objects rather than assuming module creation failed.

**What to retain:** the module is the home of the user experience. Its name identifies the application to people; its configured dependencies establish which data it actually uses.

**Check yourself:** why is creating an application from an Order type different from creating the Order type? One defines how users interact with existing modeled entities; the other defines the model those interactions rely on.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792153) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
