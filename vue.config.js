module.exports = {
    devServer: {
        proxy: 'https://c.astellia.club',
        disableHostCheck: true
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}