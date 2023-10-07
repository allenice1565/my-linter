import { describe, test, expect } from 'vitest'
import { PKG_NAME, PKG_VERSION, cwd } from '@utils/constants'

describe('utils常量', () => {
    test('PKG_NAME常量', () => {
        expect(PKG_NAME).toBe('my-linter')
    })
    test('PKG_VERSION常量', () => {
        expect(PKG_VERSION).toBe('0.0.1')
    })
    test('cwd常量', () => {
        expect(cwd).toBeTypeOf('string')
    })
})
