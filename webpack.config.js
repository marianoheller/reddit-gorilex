const path = require('path');


module.exports = {
    entry: "./src/index.js",
    node: {
        fs: "empty",
        child_process: 'empty',
        net: 'empty'
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};