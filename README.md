# dsh-research-skills

**Seven research SOP skills for DeepSeek Harness — each one ends in a record or an explicit verdict, never prose alone.**

*Literature review · citation audit · claim/evidence audit · manuscript preflight · reviewer response · reproducibility audit · data-management plan. The plugin registers the skill bodies; the tools stay in their own packages.*

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

English · [简体中文](README-zh.md)

---

## Skills

| Skill | Use it when | Ends with |
|---|---|---|
| `literature-review` | a review / related work / evidence map is requested | sufficiency report + sealed report |
| `citation-audit` | a reference list must be real, correct and not retracted | per-reference verdict + export |
| `claim-evidence-audit` | claims need to be checked against their evidence | claim → evidence → verdict trail |
| `manuscript-preflight` | the user is about to submit | findings by check + "not checked" list |
| `reviewer-response` | reviewer comments need a point-by-point letter | coverage table + response letter |
| `reproducibility-audit` | "can someone reproduce this?" | artifact manifest + drift verdict |
| `data-management-plan` | a DMP / ethics / data-availability statement is due | completed sections + open questions |

Each `SKILL.md` names the concrete tools (`lit_search`, `cite_verify`, `claim_check`, `research_trail`, `repro_audit`, `dmp`, …), the order to call them, and what must never be claimed.

## Install

```sh
dsh plugin --profile <name> add dsh-research-skills
dsh --profile <name> --dump-config | grep dsh-research-skills
```

The skills appear in the session skill catalog; the tools they reference are separate packages (install the research suite for the full set).

## What it does not do

- **No tools, no storage, no network.** It only calls `ctx.skills.register`.
- **No hidden instructions.** Every body is a plain `SKILL.md` in this package.
- **No journal-specific rules.** The checklist skills say which guideline starter items they cover and which they do not.

## Compatibility

| | |
|---|---|
| DeepSeek Harness | peer line `>=0.2.1-0 <0.3.0 \|\| >=0.2.2-0 <0.3.0` |
| Node | `^22.19.0 \|\| >=24.9.0` |
| Runtime dependencies | **zero** |

## Development

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm verify:package
```

## License

Apache-2.0. See [LICENSE](LICENSE).
