module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // webpack配置的一点点
    configureWebpack: {
        resolve: {
            // 别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'plugins': '@/plugins',
                'store': '@/store'
            }
        }
    },
    // 服务器配置
    devServer: {
        // 解决跨域  服务器代理
        proxy: {
            '/api': { //匹配所有以'/api开头的请求路径
                target: 'http://www.codeman.ink:3000', //代理目标的基本路径
                changeOrigin: true,
                ws: true,
                pathRewrite: { '/api': '' } //路径重写
            },
        }
    }


}