const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        compress: true,
        open: true,
        port: 9000,
        disableHostCheck: true,
    }
})