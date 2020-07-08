const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

let config = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.css', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ],
};

module.exports = config;