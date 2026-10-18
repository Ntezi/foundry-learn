# Sources and interpretation notes

Inspected September 23, 2026 through the signed-in [official course](https://learn.palantir.com/deep-dive-data-connection). Registered for the course on this date. All 41 required lesson bodies were read. The optional Course Feedback page was not opened. [lesson-manifest.json](lesson-manifest.json) maps each note to its lesson ID. Lesson bodies were read through the page source, so Learn may not record every page as viewed. Check the course overview for completion.

The notes paraphrase the course. Engineering comparisons, the summary table, troubleshooting tips and review questions are teaching additions. Screenshots were not inspected one by one.

## Deliberate omissions

- **Credentials:** the course publishes sandbox credentials for S3, Postgres and the REST API: access keys, a database password and an API token. They are **not** copied into these notes. Use the official lessons when practising.
- **Training hostnames:** these are mentioned only generally. The course says they may stop working after publication.

| Source wording or possible confusion | Treatment in the notes |
|---|---|
| "Update the S3 connection settings" heading on the REST API details lesson | A copy-paste slip in the course. The lesson configures the REST source. |
| The source secret is named "Secret", but the code calls `get_secret("additionalSecretSecret")` | Foundry exposes additional secrets under a derived name. Use the exact name the course code shows, and check the source's secret list if the build can't find it. The notes use a placeholder. |
| The Postgres egress lesson says "two Egress Policies" | The permissions lesson lists both a database hostname and an IP address on port 5432. The notes flag that more than one policy may be involved. They don't claim which one your instance needs. |
| "Create this policy" (S3/Postgres) vs "Request new policy" (REST) | UI wording differs between modules. It is the same egress policy workflow. |
| VS Code is offered as the recommended editor, but the course uses the Code Repository editor | Noted in lesson 35. Either works for the transform. |
| Folder example named "Speedrun: Creating Your First Data Connection" | The course's own example name, even though this is a Deep Dive. |
| Direct connection / agent proxy / agent worker | Matches the linked docs: Foundry worker is the default, and agent worker is legacy and discouraged. |
