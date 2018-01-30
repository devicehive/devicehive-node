module.exports = {
    entry: `${__dirname}/index.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: `bundle.js`,
        libraryTarget: "commonjs2"
    },
    target: `web`,
    resolve: {
        modules: ["node_modules"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                APP_ENV: JSON.stringify('browser')
            }
        }),
    ]
};