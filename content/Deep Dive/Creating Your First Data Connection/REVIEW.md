# Review guide — Deep Dive: Creating Your First Data Connection

Explain each answer in your own words before you check the lesson it points to.

## The story in five sentences

1. **Data Connection** syncs external systems into Foundry **datasets** through a configured **source**. The source's Project sets who can change it and its syncs ([07](07-basic-concepts.md)).
2. Connections run on the **Foundry worker** by default. Outbound traffic is allowed by **egress policies**: **direct connection** for public systems, and **agent proxy** plus a **Data Connection agent** for private or on-prem systems ([08](08-connecting-an-external-system.md)).
3. Creating egress policies needs the **Information Security Officer** role. An existing policy can be imported instead ([03](03-enabling-an-egress-policy.md)).
4. For S3 and Postgres, the flow is: create the source, add connection details and credentials, attach an egress policy (plus a **server certificate bundle** for Postgres), explore, **create a sync**, then run a **build** ([16](16-s3-configure-data-sync.md), [24](24-postgres-configure-certificates.md)).
5. For a REST API, make the source **importable into Code Repositories**. Then write a Python **external transform** with `transforms-external-systems` that reads the source and its secret, and commit and build ([34](34-rest-code-import-configuration.md)–[39](39-rest-commit-and-build.md)).

## Check yourself

| Question | Where |
|---|---|
| Which three apps does the course need? | [02](02-permissions-and-help.md) |
| What does an egress policy do, and who can create one? | [03](03-enabling-an-egress-policy.md) |
| Why keep training resources out of your home folder? | [05](05-create-learning-project.md) |
| What is controlled by the Project a source sits in? | [07](07-basic-concepts.md) |
| When do you need an agent, and which direction does its traffic flow? | [08](08-connecting-an-external-system.md) |
| Why is agent worker discouraged? | [08](08-connecting-an-external-system.md) |
| What is a "build" in Foundry's terms? | [16](16-s3-configure-data-sync.md) |
| Why does a synced CSV need "Apply a schema" but a synced table doesn't? | [17](17-s3-view-imported-data.md), [27](27-postgres-view-imported-data.md) |
| What two things does a server certificate give you? | [24](24-postgres-configure-certificates.md) |
| Why is the API token stored as a secret on the source? | [32](32-rest-input-connection-details.md) |
| What does `@external_systems` provide to the transform? | [38](38-rest-configure-code.md) |
| Which production questions affect whether an incremental sync is safe? | [40](40-considerations-and-best-practices.md) |

## Traps to watch for in exam options

- **"Open inbound firewall ports so Foundry can reach an on-prem database."** Use a Data Connection agent instead. It only makes outbound connections.
- **"Agent worker is the recommended way to reach private systems."** The course discourages it.
- **"S3 needs a certificate bundle like Postgres."** AWS secures S3 connections with its own mechanisms.
- **"REST APIs are synced point-and-click like tables."** In this course they are read through code with an external transform.
- **"Anyone can create egress policies."** That needs a security-admin role, though an existing policy can be imported.
