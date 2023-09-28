import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import babelPlugin from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
// import globals from 'rollup-plugin-node-globals'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

const config = defineConfig([
    // 输出两种模式：ES Module和CommonJS
    {
        input: ['src/index.ts'],
        output: [
            // {
            //     dir: 'dist/esm',
            //     format: 'es',
            //     preserveModules: true, // 开启这个选项会将每个模块单独打包，有利于摇树优化
            // },
            {
                dir: 'dist/',
                format: 'cjs',
                preserveModules: false, // 开启这个选项会将每个模块单独打包，有利于摇树优化
            },
        ],
        plugins: [
            ts(),
            resolve({ preferBuiltins: false }),
            babelPlugin(),
            json(),
            commonjs(),
        ],
    },
    // 打包为UMD
    // {
    //     input: 'src/index.ts',
    //     output: [
    //         {
    //             file: 'dist/umd/index.js',
    //             format: 'umd',
    //             name: 'utils',
    //         },
    //     ],
    //     plugins: [
    //         ts(),
    //         babelPlugin({ exclude: '**/node_modules/**' }),
    //         commonjs(),
    //         resolve({ preferBuiltins: true, mainFields: ['node'] }),
    //         globals(),
    //     ],
    // },
    // 打包类型声明
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist/',
            format: 'esm',
            preserveModules: true,
        },
        plugins: [dts()],
    },
])

export default config
