# Practice preparation

**Status: Not Started.** Nothing here has been done in a live Foundry environment yet.

## Before you start

- [ ] Can you open the **Data Connection**, **Code Repositories** and **Compass** apps?
- [ ] Is there a learning Project and a course folder you can edit ([05](05-create-learning-project.md), [06](06-create-training-folder.md))?
- [ ] Can you create egress policies (Control Panel → Network egress not greyed out)? If not, ask an admin to create or allow the training policies, or plan to import existing ones ([03](03-enabling-an-egress-policy.md)).
- [ ] REST module: can an admin enable external connections on your repository?
- [ ] Have the lesson pages open for the sandbox hostnames, credentials and certificate file. They are deliberately not copied into these notes.

## Evidence to record for each module

| Module | Done when you can show |
|---|---|
| S3 | The source exists in your folder, the egress policy is attached, the sync build succeeded, and the dataset shows as a table after applying the schema |
| Postgres | Same, plus the certificate bundle is attached with SSL mode = require, and the `plants` table is synced |
| REST API | The source is importable into code, the library is installed, the source is imported, and the commit and build succeeded with rows in the `plants` dataset |

## If something fails

- **Timeout or connection refused:** check the egress policy (host, port, attached to this source).
- **SSL error on Postgres:** check the certificate bundle and the SSL mode.
- **REST build fails with 401/403:** check the secret name and value on the source, and the header the code sends.
- **REST build fails immediately:** check the library is installed, the source is imported into the repository, the RID and path placeholders are replaced, and the indentation is correct.

Record results in [PROGRESS.md](../../PROGRESS.md).
