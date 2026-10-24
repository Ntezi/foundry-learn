# 01 — The two-layer permission model

*Sources: [Object permissioning overview](https://www.palantir.com/docs/foundry/object-permissioning/overview/) · [Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) · [Managing object security](https://www.palantir.com/docs/foundry/object-permissioning/managing-object-security/) · checked October 2, 2026 · Ready for Review*

## Two questions people run together

When Kofi says "I can't see payments", he could mean either of two things:

1. "I can't find the **Payment** object type." That's a question about the **schema**.
2. "I can find Payment, but the table is empty." That's a question about the **data**.

**[Docs]** The Ontology keeps these apart. It describes its authorization "on these two levels":

| Layer | What it covers | Example | Governed by |
|---|---|---|---|
| **Ontology resources** | Object types, link types, action types, interfaces, shared properties: names, property definitions, descriptions | "Payment has a property `amount` of type Decimal" | **Project-based permissions** (Compass), or a legacy model ([02](02-ontology-resource-permissions.md)) |
| **Objects and links** | The data: primary keys and property values | "Payment P-889 has amount €42.10" | The type's **data security**: datasource policies, or object and property security policies ([03](03-object-and-property-security.md)) |

**[Docs]** To see an object type, you need **View on the object type**. You don't need View on its backing datasource. To see its **objects**, you need View on the object type **and** access to the data, which comes from one of two places:

- **object and property security policies**, configured on the type and "independent of the backing datasource permissions"; or
- **datasource policies**, where you need View on the backing datasource (or restricted view).

"If you only have viewing rights for the object type, you can only see information such as schema and contact information, not the actual data."

## The data engineer's mental model

**[Explanation]** It's similar to a database that separates catalogue privileges from table privileges. In PostgreSQL terms, `USAGE` on a schema lets you see that a table exists; `SELECT` lets you read it; row-level security filters what `SELECT` returns. The Ontology version has three differences:

- **Schema visibility is a file permission.** Object types are files in projects, permissioned like any other Foundry resource.
- **Data access can come from the datasource *or* from the type itself.** With object security policies, a user can read objects without being able to open the backing dataset at all.
- **The two layers move separately.** Migrating a type to another project changes who can see its *definition*, not who can see its *data*. **[Docs]** "Migrating to projects does not change who has access to the backing datasource."

## Kestrel's matrix

| Person | Can see the `Payment` type? | Can see Payment objects? | Why |
|---|---|---|---|
| Lena (finance, Kestrel Pay) | Yes | Yes, all | Viewer on `Payments [Ontology]`; holds the `Kestrel Pay – Financial` marking on the backing datasets |
| Tomás (fraud) | Yes | Yes, all | Same |
| Ama (customer service) | Yes, *if* granted a role on `Payments [Ontology]` | **No** | The project itself isn't marked ([02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)). The datasets are, and she lacks the marking |
| Kofi (warehouse) | **No** | No | No role on `Payments [Ontology]`. The type doesn't show up in search |
| Priya (data engineer) | Yes | Only if she holds the marking | Her pipeline work on payments uses development data. **[Explanation]** Production payment data is protected by the marking, not by her project role |

**[Explanation]** Ama's row is deliberate. She can see in the schema that orders *have* payments, even though no payment data loads for her. That tells her a question belongs with Kestrel Pay. How each app displays a link to objects you can't read isn't documented, so check it in the apps you use. Kofi's row is also deliberate: warehouse staff don't need to know the type exists. Each choice comes from **where the type is saved** and **how its data is secured**, decided separately.

## When an object "doesn't show up"

Kestrel's support runbook asks five questions, in this order:

1. **Can they see the type?** Check the Security tab and the project role.
2. **Can they see the data?** Check the datasource, restricted view, or object security policy.
3. **Do they hold the markings and organization?** These are mandatory controls, which apply to everything ([02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md)).
4. **Is it a property-level block?** **[Docs]** When an object passes the object policy but fails a property policy, that property shows as **null** ([03](03-object-and-property-security.md)).
5. **Is the object indexed at all?** That's an indexing problem, not a permissions one ([13](../13-backend-architecture/02-indexing-and-funnel.md)).

**[Docs]** The **Check access** panel in the sidebar checks one user's access to a Workshop or Slate app. That includes the dependent object types, their datasources and granular access controls. It's the fastest way through steps 1–4.

---
[Module index](README.md) · Next: [02 — Ontology resource permissions](02-ontology-resource-permissions.md)
