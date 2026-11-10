---
name: reproducibility-audit
description: Record what would be needed to reproduce an analysis, then check whether the artifacts have drifted.
whenToUse: The user asks "can someone reproduce this", before archiving, or after a code/data change.
---

# Reproducibility audit

## Rules

- Record facts, not intentions: commit, lockfiles, environment, data hashes, seeds, run commands.
- A missing artifact is reported as missing, never filled in from memory.
- Drift is a comparison against a recorded baseline, not a guess.

## Steps

1. `repro_audit` on the project root; capture the artifact manifest.
2. `notebook_capture` for `.ipynb` files; report execution order, hidden state, absolute paths and runtime installs.
3. `dataset_card` for each dataset; flag PII-like columns and missing sections.
4. Bind the manifest to `research_report` evidence.
5. Re-run `repro_audit` after changes to show drift; do not edit the baseline.

## Output

- Manifest summary: commit, lockfile, environment, data hashes, figures, seeds.
- Drift report with changed/missing artifacts.
- Notebook risks (out-of-order execution, unpinned installs).
- A three-level verdict: reproducible / partially / not reproducible.

## Never

- Do not execute the notebook to "make it reproducible".
- Do not overwrite the recorded baseline.
