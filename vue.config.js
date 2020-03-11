
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

//设置标题
const name = defaultSettings.title || '科研项目管理系统'

module.exports = {

    devServer: {
        port: 8081,     //端口号
        open: true      //是否自动打开浏览器
    },

    configureWebpack: {
        //设置网页标题
        name: name,
        //设置@为根路径
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    //设置svg-sprite-loader
    chainWebpack(config) {

        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
    }
}