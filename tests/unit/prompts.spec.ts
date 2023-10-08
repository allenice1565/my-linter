import { describe, test, expect } from 'vitest'
import { getConfig } from '@/utils/prompts'

describe('prompts', async () => {
    const promptResult = await getConfig()
    test('promptResult应该是一个对象', () => {
        expect(promptResult).toBeTypeOf('object')
    })
    test('promptResult.config包含enableESLint、eslintType、enableStylelint、enableMarkdownlint、enablePrettier', () => {
        expect(promptResult).toHaveProperty('enableESLint')
        expect(promptResult).toHaveProperty('eslintType')
        expect(promptResult).toHaveProperty('enableStylelint')
        expect(promptResult).toHaveProperty('enableMarkdownlint')
        expect(promptResult).toHaveProperty('enablePrettier')
    })
})
