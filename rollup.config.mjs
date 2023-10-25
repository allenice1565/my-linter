import { defineConfig } from 'rollup'
import ts from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

const config = defineConfig([
    {
        input: ['src/index.ts'],
        output: [
            {
                dir: 'dist',
                format: 'cjs',
            },
        ],
        plugins: [
            resolve({ preferBuiltins: true, exportConditions: ['node'] }),
            commonjs(),
            ts(),
            json(),
        ],
        external: ['readable-stream'],
    },
    {
        input: ['src/cz.ts'],
        output: [
            {
                dir: 'dist',
                format: 'cjs',
            },
        ],
        plugins: [
            resolve({ preferBuiltins: true, exportConditions: ['node'] }),
            commonjs(),
            ts(),
            json(),
        ],
        external: ['readable-stream'],
    },
])

export default config
