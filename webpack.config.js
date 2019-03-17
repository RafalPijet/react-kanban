const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const plugins = [new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    inject: "body"
    })];

module.exports = (env) => {
    return {
        mode: env,
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "app.bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        plugins: env !== "production" ? ["react-hot-loader/babel"] : []
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: "style-loader"},
                        {
                            loader: "css-loader",
                            options: {
                                modules: true
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(jpeg|svg|ttf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {},
                        }
                    ]
                }
            ]
        },
        plugins: plugins
    }
};