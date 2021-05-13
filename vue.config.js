module.exports = {
    publicPath: undefined,
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/scss/core/_variables.scss";`
            }
        },
        sourceMap: false
    },
    devServer: {
        watchOptions: {
            poll: true
        }
    },
    pwa: {
        name: 'DoorsCRM'
    }
};