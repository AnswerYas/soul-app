'user strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const portfinder = require('portfinder')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const process = require('process')
const { resolve } = require('path')

const host = process.env.HOST || config.dev.host
const port = (process.env.PORT && Number(process.env.PORT)) || config.dev.port

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    cache: true,
    devServer: {
        host,
        port,
        contentBase: resolve('dist'),
        quiet: true,
        hot: true,
        disableHostCheck: true,
        stats: 'errors-only',
        historyApiFallback: true,
        proxy: {
            '/api/*': config.dev.apihost
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['common', 'index'],
            chunksSortMode: 'dependency',
            template: 'public/index.html',
            filename: 'index.html',
            favicon: 'public/favicon.ico'
        }),
        new AddAssetHtmlPlugin(),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        }),
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            console.log(err)
            reject(err)
        } else {
            process.env.PORT = port
            devWebpackConfig.plugins.push(
                new FriendlyErrorsWebpackPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `✨ done Your application is running here: http://${config.dev.host}:${port}`
                        ]
                    },
                    onErrors: (severity, errors) => {
                        console.log('errors')
                        if (severity !== 'error') {
                            return
                        }
                        const error = errors[0]
                        console.log('error message:', error.message)
                    },
                    clearConsole: true
                })
            )
            console.log('debug')
            resolve(devWebpackConfig)
        }
    })
})
