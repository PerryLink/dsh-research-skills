---
name: literature-review
description: Turn a research question into a bounded, reproducible review: search four indexes, check sufficiency, screen records, then seal a report.
whenToUse: The user asks for a literature review, related-work section, evidence map or "what is known about X".
---

# Literature review

## Rules

- A review is a record, not a narrative. Every claim must point at an evidence id.
- Never invent a paper, DOI, author or year. A missing result is `not_found`, not a guess.
- The search query and each round's per-source counts are part of the record.

## Steps

1. `lit_search` with the question; start with 2–4 sources and `max: 10`.
2. `lit_sufficiency` with 2–5 subtopics and quotas (`minCore`, `minTotal`). Do not proceed while `gaps[]` is non-empty unless the user accepts the gap.
3. `lit_harvest_run` for the bounded loop when the user wants automation; keep `maxRounds` small and show `rounds[].errors`.
4. `lit_resolve_oa` for the papers the user wants to read; report `MAILTO_REQUIRED` instead of silently skipping.
5. `sr_init` (or `sr_import` for RIS/BibTeX/CSL-JSON) with the identified records.
6. `sr_screen` at title-abstract, then full-text; conflicts stay open until an adjudicator settles them.
7. `research_report` with sections whose paragraphs cite the surviving claim ids; seal it.

## Output

- Search queries and per-source counts.
- Sufficiency report with explicit gaps.
- Screening decisions with reviewer and reason.
- Sealed report path + `dsh-rep-verify` result.

## Never

- Do not paste a search-result list as if it were a reviewed evidence table.
- Do not screen at full text before title-abstract inclusion.
- Do not hide retracted or unreachable records.
