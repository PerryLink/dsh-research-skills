// Post-build package gate.
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
const fail = message => {
  console.error(`verify-package: ${message}`)
  process.exit(1)
}

for (const file of ['lib/index.js', 'lib/index.d.ts', 'README.md', 'README-zh.md', 'CHANGELOG.md', 'LICENSE', 'cordis.patch.yml']) {
  if (!existsSync(path.join(root, file))) fail(`missing ${file}`)
}
if (!(pkg.files ?? []).includes('skills')) fail('package.json#files does not publish skills')
if (Object.keys(pkg.dependencies ?? {}).length !== 0) fail('runtime dependencies must stay empty')
const names = ['literature-review', 'citation-audit', 'claim-evidence-audit', 'manuscript-preflight', 'reviewer-response', 'reproducibility-audit', 'data-management-plan']
for (const name of names) {
  if (!existsSync(path.join(root, 'skills', name, 'SKILL.md'))) fail(`missing skills/${name}/SKILL.md`)
}
console.log(`verify-package: ok (${names.length} skills, zero runtime dependencies)`)
