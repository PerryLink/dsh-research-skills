/**
 * `dsh-research-skills` — seven research SOP skills registered as runtime
 * contributions.
 *
 * Each skill is a directory under `skills/` with YAML frontmatter and a body
 * that names the concrete tools to call. The plugin only registers them; it
 * carries no tools, no storage and no network access.
 *
 * @module dsh-research-skills
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { VERSION } from './version.ts'

/** Cordis plugin name. */
export const name = 'research-skills'

/** The skill registry is required. */
export const inject = ['skills']

/** Raw config. */
export interface Config {
  /** Master switch. `false` registers no skills. */
  enabled?: boolean
}

/** Schemastery schema. */
export const Config: z<Config> = z.object({
  enabled: z.boolean().default(true),
})

/** The subset of `ctx.skills` this plugin uses. */
interface SkillRegistrySeam {
  register(skill: {
    name: string
    description: string
    content: string
    path?: string
    whenToUse?: string
    metadata?: Readonly<Record<string, unknown>>
  }): () => void
}

/** One parsed skill. */
export interface ParsedSkill {
  readonly name: string
  readonly description: string
  readonly content: string
  readonly whenToUse?: string
  readonly path: string
}

function frontmatterOf(input: string): { fields: Record<string, string>; body: string } {
  // A Windows checkout (or a hand-edited file) may use CRLF; the frontmatter and
  // body are line-oriented, so normalize before parsing.
  const text = input.replace(/\r\n?/gu, '\n')
  if (!text.startsWith('---\n')) throw new Error('skill is missing YAML frontmatter')
  const end = text.indexOf('\n---', 4)
  if (end === -1) throw new Error('skill frontmatter is not terminated')
  const fields: Record<string, string> = {}
  for (const line of text.slice(4, end).split('\n')) {
    const match = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/u.exec(line)
    if (match !== null) fields[match[1]!] = match[2]!.trim()
  }
  return { fields, body: text.slice(end + 4).replace(/^\s*\n/u, '') }
}

/**
 * Parse one `SKILL.md`.
 * @param text - file contents.
 * @param file - absolute path (recorded as the skill path).
 * @returns the parsed skill.
 */
export function parseSkill(text: string, file: string): ParsedSkill {
  const { fields, body } = frontmatterOf(text)
  const skillName = fields.name ?? ''
  const description = fields.description ?? ''
  if (!/^[a-z][a-z0-9-]*$/u.test(skillName)) throw new Error(`${file}: invalid or missing skill name`)
  if (description === '') throw new Error(`${file}: description is required`)
  if (body.trim() === '') throw new Error(`${file}: body is empty`)
  return {
    name: skillName,
    description,
    content: body,
    path: file,
    ...(fields.whenToUse === undefined ? {} : { whenToUse: fields.whenToUse }),
  }
}

/** Load every `skills/<name>/SKILL.md` next to the built module. */
export function loadSkills(directory?: string): ParsedSkill[] {
  const root = directory ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'skills')
  const skills: ParsedSkill[] = []
  for (const entry of readdirSync(root).sort()) {
    const file = path.join(root, entry, 'SKILL.md')
    try {
      if (!statSync(file).isFile()) continue
    } catch {
      continue
    }
    skills.push(parseSkill(readFileSync(file, 'utf8'), file))
  }
  return skills
}

/**
 * Register the bundled skills.
 * @param ctx - the plugin context (host).
 * @param config - raw plugin config.
 */
export function apply(ctx: Context, config: Config): void {
  const logger = ctx.logger('research-skills')
  if (config.enabled === false) {
    logger.info('disabled: enabled is false — no skills are registered')
    return
  }
  const registry = ctx.get('skills') as SkillRegistrySeam | undefined
  if (registry === undefined) {
    logger.info('ctx.skills is not mounted; no skills are registered')
    return
  }
  for (const skill of loadSkills()) {
    ctx.effect(() => registry.register({
      name: skill.name,
      description: skill.description,
      content: skill.content,
      path: skill.path,
      ...(skill.whenToUse === undefined ? {} : { whenToUse: skill.whenToUse }),
      metadata: { provider: 'dsh-research-skills', version: VERSION },
    }), `research-skills: ${skill.name}`)
  }
}

export { VERSION }
