const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader',
                        options: {
                            import: false,
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: /@license/i,
                    }
                },
                extractComments: true,
            }),
            new OptimizeCssAssets({
                cssProcessor: require('cssnano'),
            }),
            new CleanWebpackPlugin()
        ]
    }
})