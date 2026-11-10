---
name: citation-audit
description: Verify that every citation exists, that its metadata is right, that it is not retracted, and export it in the required style.
whenToUse: A manuscript, grant or report has a reference list; the user asks "are these citations real / correct / retracted".
---

# Citation audit

## Rules

- `not_found` is a skipped check, never proof of fabrication.
- Metadata checks are field-by-field: DOI, title, authors, year, venue, pages.
- Retraction status is a separate lookup, not a guess from the title.

## Steps

1. For each reference run `cite_verify` with `doi` / `pmid` / `arxiv` / `bibtex`.
2. Batch with `cite_batch` when the list is long; read every `status`, `lookupError`, `duplicate`.
3. Run `retraction_watch` on the resolved DOIs; `clear` means no registered notice, not "valid".
4. Use `cite_fix` for a corrected BibTeX entry — text only, never edit the file silently.
5. Export with `cite_export` (`gbt7714-numeric`, `apa`, `ieee`, `vancouver`, `bibtex`, `ris`, `csl-json`); report `missing[]` fields.
6. Store the provider answers as REP evidence; cite the evidence ids in the audit summary.

## Output

- Per-reference verdict with the failing field.
- Retraction status per DOI with the lookup date.
- Export text + missing fields.
- A count of verified / warn / unchecked / not-found.

## Never

- Do not "fix" a DOI by guessing a nearby one.
- Do not treat a network failure as a clean citation.
