# Deep Dive: Creating Your First Data Connection

[Official course](https://learn.palantir.com/deep-dive-data-connection) · [Foundry & AIP Aware curriculum](https://learn.palantir.com/foundry-aip-aware) · [Study progress](../../PROGRESS.md)

Updated September 23, 2026. **All 41 required lesson notes are prepared and Ready for Review.** Registered on September 23, 2026; lesson bodies were read from the signed-in course. Hands-on practice is Not Started. Optional Course Feedback was not opened.

The central question: how does Foundry reach an external system safely, and how does the data become a Foundry dataset? You connect three source types (S3, PostgreSQL and a REST API) using Data Connection sources, egress policies, syncs and, for the API, a Python external transform. The course advertises 60 minutes, and the modules are independent.

Use the [review guide](REVIEW.md) after reading, [practice preparation](PRACTICE.md) before the hands-on work, and [sources and corrections](SOURCES-AND-CORRECTIONS.md) for interpretation notes.

## Prepared lessons

| Lesson | Notes | Module |
|---|---|---|
| 01 | [Introduction](01-introduction.md) | Overview |
| 02 | [Permissions & Help](02-permissions-and-help.md) | Permissions & Help |
| 03 | [Enabling an Egress Policy](03-enabling-an-egress-policy.md) | Permissions & Help |
| 04 | [Introduction](04-project-setup-introduction.md) | Setting up your Project and Folder |
| 05 | [Create a Foundry Learning Project](05-create-learning-project.md) | Setting up your Project and Folder |
| 06 | [Create a Course-Specific Training Folder](06-create-training-folder.md) | Setting up your Project and Folder |
| 07 | [Basic Concepts](07-basic-concepts.md) | Data Connection: Getting Data Into Foundry |
| 08 | [Connecting an External System with Foundry](08-connecting-an-external-system.md) | Data Connection: Getting Data Into Foundry |
| 09 | [Introduction](09-s3-introduction.md) | Data Connection: S3 |
| 10 | [Open the Data Connection Application](10-s3-open-data-connection.md) | Data Connection: S3 |
| 11 | [Select Source Type](11-s3-select-source-type.md) | Data Connection: S3 |
| 12 | [Create Source](12-s3-create-source.md) | Data Connection: S3 |
| 13 | [Input Connection Details](13-s3-input-connection-details.md) | Data Connection: S3 |
| 14 | [Set-up a Direct connection Egress Policy](14-s3-direct-connection-egress-policy.md) | Data Connection: S3 |
| 15 | [Select an Output Folder](15-s3-select-output-folder.md) | Data Connection: S3 |
| 16 | [Configure a Data Sync](16-s3-configure-data-sync.md) | Data Connection: S3 |
| 17 | [View Imported Data](17-s3-view-imported-data.md) | Data Connection: S3 |
| 18 | [Introduction](18-postgres-introduction.md) | Data Connection: Relational Database |
| 19 | [Open the Data Connection Application](19-postgres-open-data-connection.md) | Data Connection: Relational Database |
| 20 | [Select Source Type](20-postgres-select-source-type.md) | Data Connection: Relational Database |
| 21 | [Create Source](21-postgres-create-source.md) | Data Connection: Relational Database |
| 22 | [Input Connection Details](22-postgres-input-connection-details.md) | Data Connection: Relational Database |
| 23 | [Set-up a Direct connection Egress Policy](23-postgres-direct-connection-egress-policy.md) | Data Connection: Relational Database |
| 24 | [Configure Certificates](24-postgres-configure-certificates.md) | Data Connection: Relational Database |
| 25 | [Select an Output Folder](25-postgres-select-output-folder.md) | Data Connection: Relational Database |
| 26 | [Configure a Data Sync](26-postgres-configure-data-sync.md) | Data Connection: Relational Database |
| 27 | [View Imported Data](27-postgres-view-imported-data.md) | Data Connection: Relational Database |
| 28 | [Introduction](28-rest-introduction.md) | Data Connection: REST API |
| 29 | [Open the Data Connection Application](29-rest-open-data-connection.md) | Data Connection: REST API |
| 30 | [Select Source Type](30-rest-select-source-type.md) | Data Connection: REST API |
| 31 | [Create Source](31-rest-create-source.md) | Data Connection: REST API |
| 32 | [Input Connection Details](32-rest-input-connection-details.md) | Data Connection: REST API |
| 33 | [Set-up a Direct connection Egress Policy](33-rest-direct-connection-egress-policy.md) | Data Connection: REST API |
| 34 | [Configure Code Import Configuration](34-rest-code-import-configuration.md) | Data Connection: REST API |
| 35 | [Create a Code Repositories Resource](35-rest-create-code-repository.md) | Data Connection: REST API |
| 36 | [Add External Transform Library](36-rest-add-external-transform-library.md) | Data Connection: REST API |
| 37 | [Import Rest API Source](37-rest-import-source.md) | Data Connection: REST API |
| 38 | [Configure Code for Accessing Data](38-rest-configure-code.md) | Data Connection: REST API |
| 39 | [Commit and Build Your Dataset](39-rest-commit-and-build.md) | Data Connection: REST API |
| 40 | [Considerations and Best Practices](40-considerations-and-best-practices.md) | Wrapping Up |
| 41 | [Conclusion](41-conclusion.md) | Wrapping Up |

**Go deeper in the Ontology area:** [02 — Foundry data foundations](../../Ontology/02-foundry-data-foundations/README.md)
