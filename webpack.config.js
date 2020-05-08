const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./app/index.html",
    filename: "./index.html",
});

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [htmlPlugin, new Dotenv()],
};