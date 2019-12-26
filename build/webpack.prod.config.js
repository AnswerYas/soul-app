'use strict'
const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/
                },
                antdesign: {
                    test: /[\\/]node_modules[\\/]@ant-design[\\/]/
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.(less|css)\.*(?!.*map)/g, //注意不要写成 /\.css$/g
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                // 避免 cssnano 重新计算 z-index
                safe: true,
                // cssnano 集成了autoprefixer的功能
                // 会使用到autoprefixer进行无关前缀的清理
                // 关闭autoprefixer功能
                // 使用postcss的autoprefixer功能
                autoprefixer: false
            },
            canPrint: true
        }),
        new ParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false,
                    comments: false
                },
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    // warnings: false, //默认
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true
                }
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),

        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ])
    ]
})

module.exports = webpackConfig
