---
name: claim-evidence-audit
description: Check that each claim is supported by the evidence it cites, then produce a reviewer-facing trail of verdicts.
whenToUse: A draft or report makes factual/numeric claims; the user asks "does the evidence actually support this".
---

# Claim / evidence audit

## Rules

- A claim without a resolvable evidence id is **unbound**, not "probably fine".
- Quote support is verbatim; paraphrase support needs semantic checking and must be labelled as such.
- `insufficient` means "cannot decide", never "false".

## Steps

1. `doc_anchor` the source documents (PDF/HTML/LaTeX/Markdown); keep page/section anchors.
2. `claim_check` each claim against its evidence id; record the verdict and the quote span.
3. For numbers, run `statcheck` on the reported statistics; for pooled effects, `meta_analysis`.
4. `research_trail` to render claim → evidence → verdict and to list unbound/dangling rows.
5. `research_report` to seal the corrections; unresolved claims stay visibly marked.

## Output

- Table: claim id, verdict, evidence id, failing check, suggested repair.
- Counts: verified / unverified / insufficient / contradicted / disproven.
- Unbound and dangling rows called out separately.

## Never

- Do not soften `contradicted` or `disproven` into "needs review".
- Do not delete a claim to make the report cleaner; mark it.
