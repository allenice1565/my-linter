import { defineConfig } from 'rollup'
import ts from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

const config = defineConfig([
    // 输出两种模式：ES Module和CommonJS
    {
        input: ['src/index.ts'],
        output: [
            // {
            //     dir: 'dist/esm',
            //     format: 'es',
            // },
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
    // 打包类型声明
    // {
    //     input: 'src/index.ts',
    //     output: {
    //         dir: 'dist/',
    //         format: 'esm',
    //         preserveModules: true,
    //     },
    //     plugins: [dts()],
    // },
])

export default config
