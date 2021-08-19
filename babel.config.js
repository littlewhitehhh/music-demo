module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    // 按需引入element ui  需要安装babel-plugin-component 插件
    //babel-plugin-component 配置
    'plugins': [
        [
            'component',
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}