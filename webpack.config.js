module.exports = {
    entry: "./lib/main.js",
    output: {
        filename: "./bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".js"]
    }
};