# 02 — Developer Console and platform APIs

| | |
|---|---|
| Purpose | Registering an application, scopes and restrictions, bootstrapping and hosting, operating it, and the platform API conventions (auth, paging, errors, limits). |
| Prerequisites | [01 — Ontology SDK](../01-ontology-sdk/README.md) |
| Status | Ready for Review (4 of 4 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Applications, scopes and restrictions](01-applications-scopes-and-restrictions.md) | Creating an application; client types and grants; scopes; application restrictions; permissions; legacy OAuth clients; apps in another organization | [Developer Console: Overview](https://www.palantir.com/docs/foundry/developer-console/overview/) · [Create a new application](https://www.palantir.com/docs/foundry/developer-console/create-application/) · [Developer Console: Permissions](https://www.palantir.com/docs/foundry/developer-console/permissions/) · [Application restrictions](https://www.palantir.com/docs/foundry/developer-console/application-restrictions/) · [Standalone OAuth clients (legacy)](https://www.palantir.com/docs/foundry/developer-console/oauth-clients/) · [Create an application in a different organization](https://www.palantir.com/docs/foundry/developer-console/how-to-create-backend-service-app-different-org/) | Ready for Review |
| 02 | [Bootstrapping and hosting](02-bootstrapping-and-hosting.md) | Bootstrapping TypeScript, Python, Java and back-end TypeScript apps; adding OSDK to an existing app; hosting on Foundry; the embedded ontology; Node.js versions | [Bootstrap a TypeScript application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-typescript/) · [Bootstrap a Python application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-python/) · [Bootstrap a Java application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-java/) · [Bootstrap a back-end TypeScript application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-server-side-typescript/) · [Add OSDK to an existing application](https://www.palantir.com/docs/foundry/developer-console/how-to-add-to-existing-typescript/) · [Hosting an application on Foundry](https://www.palantir.com/docs/foundry/developer-console/deploy-custom-application-on-foundry/) · [Create an offline-capable application with the embedded ontology](https://www.palantir.com/docs/foundry/developer-console/create-embedded-ontology-application/) · [Manage Node.js version in a Foundry code repository](https://www.palantir.com/docs/foundry/developer-console/manage-node-version-in-foundry-code-repository/) | Ready for Review |
| 03 | [Operating an application](03-operating-an-application.md) | Application metrics; branching Developer Console apps; installing an app through Marketplace | [Application metrics](https://www.palantir.com/docs/foundry/developer-console/application-metrics/) · [Branching Developer Console applications](https://www.palantir.com/docs/foundry/developer-console/branching-integration/) · [Install an application with Marketplace](https://www.palantir.com/docs/foundry/developer-console/marketplace-installation/) | Ready for Review |
| 04 | [Platform APIs](04-platform-apis.md) | How the REST APIs work: authentication, SDKs, paging, versioning, limits and errors | [API Reference: Introduction](https://www.palantir.com/docs/foundry/api/v2/general/overview/introduction/) · [API Reference: Getting started](https://www.palantir.com/docs/foundry/api/v2/general/overview/getting-started/) · [API Reference: Authentication](https://www.palantir.com/docs/foundry/api/v2/general/overview/authentication/) · [Software development kit (SDK)](https://www.palantir.com/docs/foundry/api/v2/general/overview/sdks/) · [API Reference: Paging](https://www.palantir.com/docs/foundry/api/v2/general/overview/paging/) · [API Reference: Versioning](https://www.palantir.com/docs/foundry/api/v2/general/overview/versioning/) · [API Reference: Limits](https://www.palantir.com/docs/foundry/api/v2/general/overview/limits/) · [API Reference: Errors](https://www.palantir.com/docs/foundry/api/v2/general/overview/errors/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

## Related in other areas

- [Ontology 10-04 — OSDK and APIs](../../Ontology/10-applications/04-osdk-and-apis.md)
- [Ontology 12-04 — Security across actions, functions and APIs](../../Ontology/12-security-and-governance/04-security-across-actions-functions-and-apis.md)

## Seen in our courses

- [Intro course 14 — Products and SDKs](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/14-products-and-sdks.md)

---
← [01 — Ontology SDK](../01-ontology-sdk/README.md) · [03 — Compute modules and custom endpoints](../03-compute-modules-and-custom-endpoints/README.md) → · [DevTools home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
