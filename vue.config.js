const px2rem = require('postcss-px2rem');

const cssPlugin = px2rem({
    remUnit: 100   //基准大小 baseSize，需要和rem.js中相同
});
//导入配置
const {devUrl} = require('./src/global/config');
module.exports={
    //打包的相对路径
    publicPath:'./',
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css:{
        loaderOptions: { // css预设器配置项
            postcss: {
                plugins: [
                    cssPlugin
                ]
            }
        }
    },
    devServer:{
        //自动打开
      open: true,
      // host: 'localhost',
      host:"0.0.0.0",
      port: 8080,
      https: false,
      hotOnly: false,
        // proxy:{
        //     '/monitor': {
        //         target: 'http://119.3.229.31/mspf/main/monitor',  // 接口域名
        //         changeOrigin: true,  //是否跨域
        //         pathRewrite: {
        //             '^/monitor': ''   //需要rewrite的,
        //         }
        //     }
        // }
    },
    configureWebpack: {
        name: devUrl
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        // name: name,
        // resolve: {
        //     alias: {
        //         '@': resolve('src')
        //     }
        // }
    },

};