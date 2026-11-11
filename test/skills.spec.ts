/**
 * Skill loading and registration.
 * @module test/skills.spec
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { apply, loadSkills, parseSkill } from '../src/index.ts'

const SKILLS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'skills')

describe('loadSkills', () => {
  it('loads the seven SOP skills', () => {
    const skills = loadSkills(SKILLS)
    expect(skills.map(skill => skill.name).sort()).toEqual([
      'citation-audit',
      'claim-evidence-audit',
      'data-management-plan',
      'literature-review',
      'manuscript-preflight',
      'reproducibility-audit',
      'reviewer-response',
    ])
    for (const skill of skills) {
      expect(skill.description.length).toBeGreaterThan(20)
      expect(skill.content).not.toContain('---')
      expect(skill.content.length).toBeGreaterThan(200)
    }
  })

  it('rejects malformed frontmatter', () => {
    expect(() => parseSkill('no frontmatter', '/x')).toThrow(/frontmatter/u)
    expect(() => parseSkill('---\nname: Bad_Name\ndescription: x\n---\nbody', '/x')).toThrow(/skill name/u)
  })
})

describe('apply', () => {
  it('registers every skill through ctx.skills, and honours enabled', () => {
    const registered: string[] = []
    const ctx = {
      logger: () => ({ info: () => {} }),
      effect: (fn: () => unknown) => { fn() },
      get: (name: string) => name === 'skills'
        ? { register: (skill: { name: string }) => { registered.push(skill.name); return () => {} } }
        : undefined,
    } as never
    apply(ctx, { enabled: true })
    expect(registered).toHaveLength(7)

    registered.length = 0
    apply(ctx, { enabled: false })
    expect(registered).toHaveLength(0)
  })
})
