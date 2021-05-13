module.exports = {
    devServer: {
        proxy: 'https://c.fbk.sh',
        disableHostCheck: true
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}