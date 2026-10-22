# 01 — OSDK React apps

*Sources: [OSDK React applications](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/overview/) · [Build applications with @osdk/react](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/osdk-react/) · [OSDK React components](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/osdk-react-components/) · [Development environment](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/development/) · [Troubleshooting](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/troubleshooting/) · checked October 18, 2026 · Ready for Review*

**[Concept]** An OSDK React app is an ordinary React front end that treats **Foundry as its backend**. It reads and edits the Ontology through a TypeScript SDK generated for exactly the types, actions and functions it needs. It's created and hosted through **Developer Console**. Who the user is, what the token can reach and how hosting is approved are covered in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md); this note is about building the front end.

| You get | You give up |
|---|---|
| Any UI React can build, the npm ecosystem, normal code review and tests | Workshop's ready-made widgets, low-code editing and no-deploy changes |
| Ontology governance carried through: the app sees what the user and the app's restrictions allow | You write loading states, caching, paging and errors yourself, or use the libraries below |

## The two libraries

**[Docs]** The docs recommend **always** using `@osdk/react` for React apps on the OSDK.

| Library | Gives you |
|---|---|
| **`@osdk/react`** | Typed **hooks** for objects, object sets, links and aggregations; applying and validating **actions**, with optimistic updates; calling **functions** and tracking their dependencies; a shared, normalised **cache**, with cached objects updated after actions |
| **`@osdk/react-components`** | Ready-made, Ontology-aware components built on `@osdk/react`: an object **table**, **filters** backed by aggregations, **action forms** that validate and apply, and **viewers** for documents, PDFs, spreadsheets, email, images and video. Themed with CSS custom properties and layers |

**[Docs]** The @osdk/react page's example reads incomplete to-do items with one hook:

```tsx
const { data, error, isLoading } = useOsdkObjects(Todo, {
  orderBy: { createdAt: "desc" },
  where: { isComplete: false },
});
```

The component handles three states: loading with no data yet, an error, and no results. Installation, provider setup and hook options are in the external OSDK React documentation, which the docs link to.

**[Example]** The same shape for Kestrel's late shipments would be `useOsdkObjects(Shipment, { where: { isLate: true }, orderBy: { eta: "asc" } })`. **[Explanation]** The user signs in with their own Foundry account (authorization code), so Shipment's **regional policy** filters the results to their region with no extra code. The customer portal in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get) has to deal with this explicitly, because its backend calls as a service user.

**[Recommendation]** Kestrel's internal apps stay in Workshop; none of them needs a look or interaction Workshop can't give. The snippet above is illustration, not part of the Kestrel model. A React app would earn its cost for a heavily custom, high-traffic interface, or one shared with users outside Foundry through a backend.

## Building one

**[Docs]** The development loop in the platform:

1. In Developer Console, choose **Create client-facing application** during setup, so the app can have code repositories.
2. **Create code repository** bootstraps a React template with authentication and the OSDK wired in.
3. **Open in VS Code** starts a Code Workspace: editor on the left, **live preview** on the right. The Ontology tab shows generated documentation and snippets.
4. Before pushing, run `npm run lint`, `npm run test` and `npm run build`, so CI checks pass.
5. **Deploy** by cutting a **release**: push a git tag, or use *Tags and releases* in Code Repositories. Once the release passes checks, the app appears in Developer Console.

**[Docs]** Other options:

- **Work locally**: clone from Code Repositories, which also exports a `FOUNDRY_TOKEN`. The repository can also live outside Foundry while Developer Console still hosts the app.
- **PR preview** *(beta)*: a working copy of the app built from a pull request's commits, available for **7 days** after the pull request is created. Creating pull requests and sharing previews needs **Owner** or **Editor** on the application; to let someone only view a preview, add them as a Viewer under *Share hosted website*.
- PWA install and Zen mode make the browser editor feel closer to desktop VS Code.

### Content Security Policy

**[Docs]** Hosted apps get a **restrictive CSP** by default: requests to non-Foundry URLs fail until allowed. Errors show in the browser console. You can set a temporary CSP for your own workspace while testing; it doesn't apply to others and expires when the workspace pauses. Then update the CSP on the Developer Console application.

## When npm fails

**[Docs]** Dependencies must be declared, and installs resolve only from the repository's backing sources: the OSDK bundles, an **npmjs.com mirror**, and your own SDK. A private package must be added as an Artifact first.

- `MODULE_NOT_FOUND` when adding a package usually means it isn't in any backing repository.
- `E401 Incorrect or missing password` means npmjs.com is unreachable from the workspace.
- First steps for other npm errors: delete `package-lock.json` and `node_modules/` and rerun, or pause and resume the workspace.

<!-- devtools-go-deeper -->
**Go deeper in the DevTools area:** [01 — Ontology SDK](../../DevTools/01-ontology-sdk/README.md) · [02 — Developer Console and platform APIs](../../DevTools/02-developer-console-and-apis/README.md)

---
[Module index](README.md) · Next: [02 — Inside the advanced to-do tutorial](02-advanced-to-do-tutorial.md)
