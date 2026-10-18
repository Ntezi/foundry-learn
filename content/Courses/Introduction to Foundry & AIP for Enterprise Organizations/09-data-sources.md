# 09 — 2.1 Data Sources

*Module: Section 2: South of the Ontology · Inspected September 23, 2026 · Notes: Ready for Review*

## Connect to data wherever it lives

Foundry is described as connecting to all enterprise data regardless of location, format or system age: transactional data from ERPs and CRMs, IoT/sensor data, geospatial data from fleets and logistics, unstructured documents, images and maintenance logs, relational databases, and more.

## Connectors

The course cites native connectors for **more than 300 enterprise systems**, including SAP, Salesforce and ServiceNow as well as homegrown legacy systems, plus frameworks for building custom connections.

## Multimodal Data Plane (MMDP)

The MMDP makes "any storage" concrete:

- **Virtual Tables** work with data in Snowflake, Databricks, BigQuery and similar platforms **without copying it** (zero-copy federation). Data stays where it is.
- **Pushdown compute** sends the computation to where the data lives, instead of moving data to compute.
- **Open standards:** Apache Iceberg, Parquet and CSV, and interfaces such as REST, JDBC and S3-compatible APIs.

## The key insight

Foundry is **not asking you to abandon your data lake or warehouse**, only to connect it. The Ontology then turns connected data into context, and context makes data operational.

**Remember:** virtual tables + zero-copy + pushdown compute = no rip-and-replace of existing data platforms.

**Review question:** a company has years of data in Snowflake and doesn't want to duplicate it. What does the course point to? Virtual Tables with zero-copy federation and pushdown compute.


**Go deeper in the Ontology area:** [02 — Foundry data foundations](../../Ontology/02-foundry-data-foundations/README.md)

---
[Official lesson](https://learn.palantir.com/introduction-to-foundry-aip-for-enterprise-organizations/1995609) · [Course index](README.md) · [Review guide](REVIEW.md)

Course content is paraphrased. Engineering comparisons and review questions are teaching additions. Next: 10 — 2.2 Logic Sources.
