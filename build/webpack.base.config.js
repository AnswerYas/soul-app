'use strict'
const { resolve } = require('path')
const process = require('process')
const theme = require('../theme')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    context: resolve(__dirname, '../'),
    entry: {
        index: [resolve('src')]
    },
    output: {
        path: resolve('dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['node_modules', resolve('src')],
        alias: {
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!react-intl|intl-messageformat|intl-messageformat-parser)/
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000000
                }
            },
            {
                test: /\.(eot|ttf|woff|svg|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000000
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
