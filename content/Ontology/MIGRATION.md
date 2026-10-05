# Migration record

What happened to the former `Ontology Design/` folder when this `Ontology/` area was created on **October 2, 2026** (Phase 2 of the approved plan). Nothing was discarded: every line of the old notes is in one of the files below.

## Backup
- Location: `../study-backups/2026-10-02/ontology-consolidation/`
- `before-consolidation.tar.gz`: the whole `Ontology Design/` folder plus the 11 files that linked to it, as they were before any change
- `before-sha256.txt`: a checksum of each of those 19 files; `SHA256SUMS`: the archive checksum (`b33df64c…8e9f64`, verified OK)

## Where each file went

| Old file | Action | New location | What changed |
|---|---|---|---|
| `Ontology Design/README.md` | Split | [11-design/README.md](11-design/README.md) | Intro rewritten for the new module; Sources table, reading order and **one-page cheat sheet kept word for word**; rows for 05/06/SOURCES now point to their new homes. Overall status moved to the [Ontology README](README.md) |
| `01-best-practices.md` | Moved | [11-design/01-best-practices.md](11-design/01-best-practices.md) | One "Moved from" line added; footer says "Design index"; link paths updated |
| `02-structural-guidance.md` | Moved | [11-design/02-structural-guidance.md](11-design/02-structural-guidance.md) | Same |
| `03-anti-patterns.md` | Moved | [11-design/03-anti-patterns.md](11-design/03-anti-patterns.md) | Same |
| `04-validation.md` | Moved | [11-design/04-validation.md](11-design/04-validation.md) | Same; "Next" pointed to Case study 01 until October 4, now to module 12 (the case study is a "See also") |
| `05-applied-to-our-courses.md` | Moved and renamed | [17-case-studies/01-course-ontologies-reviewed.md](17-case-studies/01-course-ontologies-reviewed.md) | Heading renumbered 05 → 01; "Moved from" note in the status line; footer links updated |
| `06-exercises-and-drill-kit.md` | Split | [18-practice/01-design-exercises.md](18-practice/01-design-exercises.md) (exercises A–E) and [18-practice/02-validation-drill-kit.md](18-practice/02-validation-drill-kit.md) (exercise F) | Headings renumbered; the intro sentence about exercise F now links to its new page; F got a short header of its own; footers updated |
| `SOURCES.md` | Merged | [SOURCES.md](SOURCES.md), section *Ontology design pages* | Heading levels demoted by one; link paths updated; text unchanged |

## Links updated elsewhere
14 links in 11 files now point into `Ontology/`: `README.md`, `PROGRESS.md`, `AIP/README.md`, `AIP/06-prompt-engineering.md`, `AIP/07-choosing-the-right-aip-tool.md`, and `AIP/applications/` 01, 03, 08, 09, 11 and 13. Anchors such as `#the-golden-hammer` were kept.

## Planned later moves
None. The Learn course notes stay in place; Phase 7 adds a "Concept reference" back-link to each relevant lesson.


**Update, October 4, 2026 (quality review).** The four design notes (11-01 to 11-04) now use the shared one-line *Sources · checked · status* header instead of the source table, with "quotes re-verified October 4, 2026". Five uses of "genuinely" were removed or reworded; nothing else in their text changed. The status lines of Case study 01 and Practice 01–02 became the same one-line header; their text is unchanged.
---
[Ontology home](README.md) · [Sources](SOURCES.md)
