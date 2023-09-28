const path = require('path')
// const nodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
    entry: {
        cli: './src/cli.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib'),
        libraryTarget: 'module',
        chunkFormat: 'module',
    },
    mode: 'development',
    target: 'es2020',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // watch: true,
    // plugins: [new nodemonPlugin()],
}
