const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/script/index.ts",
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "b.js",
        path: path.resolve(__dirname, "dist/script"),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/index.html", to: path.resolve(__dirname, "dist/index.html") },
                { from: "src/style", to: path.resolve(__dirname, "dist/style") },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                terserOptions: {
                    compress: {
                        dead_code: true,
                        booleans_as_integers: true,
                        arrows: true,
                        if_return: true,
                        inline: true,
                        booleans: true,
                    },
                },
            }),
        ],
    },
};
