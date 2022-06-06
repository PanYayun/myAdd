const path = require("path");
const webpack = require("webpack");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === "production" ? "./" : "/";

module.exports = {
  publicPath: BASE_URL,
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
    config.plugin("provide").use(webpack.ProvidePlugin, [{
      $: "jquery",
      jquery: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    }, ]);
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // host: 'localhost.charlesproxy.com',
    // port: 3000,
    open: true,
    proxy: {
      "/api": {
        // target: 'http://10.216.6.231:8992', // 设置你调用的接口域名和端口号 别忘了加http
        target: "http://10.216.6.231:8009", // 设置你调用的接口域名和端口号 别忘了加http
        // target: "http://10.216.3.17:32881", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      // 标准
      "/standard": {
        target: "http://10.216.6.231:9993/standard", // 设置你调用的接口域名和端口号 别忘了加http
        // target: "http://10.216.6.28:9993/standard", // 设置你调用的接口域名和端口号 别忘了加http
        //target: 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
          "^/standard": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      // 需求管理排序  未写完
      // "/baikeSort": {
      //   target: "http://10.216.6.223:8000/baike/yuchuli/sort_zhibiao", // 设置你调用的接口域名和端口号 别忘了加http
      //   // target: "http://10.216.6.28:9993/standard", // 设置你调用的接口域名和端口号 别忘了加http
      //   //target: 'http://localhost',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ["^/baikeSort"]: "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   },
      // },
      // 质量
      "/quality": {
        target: "http://10.216.6.231:8731/quality", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/quality": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      "/gk_": {
        target: "http://10.216.6.231:9994", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/gk_": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      "/personality": {
        // target: "http://10.216.6.231:9993", // 设置你调用的接口域名和端口号 别忘了加http
        // target: "http://10.216.6.231:38888", // 设置你调用的接口域名和端口号 别忘了加http
        target: "http://10.216.6.231:8733", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/personality": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
       // 质量
       "/knowledge": {
        target: "http://10.216.6.223:1206/knowledge", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/knowledge": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      "/zhibiao": {
        target: "http://10.216.6.223:1280/zhibiao", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/zhibiao": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      "/QA": {
        // target: "http://10.216.6.231:9993", // 设置你调用的接口域名和端口号 别忘了加http
        // target: "http://10.216.6.231:38888", // 设置你调用的接口域名和端口号 别忘了加http
        target: "http://10.216.6.223:1288/QA", // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/QA": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      // "/baike": {
      //   target: "http://10.216.6.231:8009/baike", // 设置你调用的接口域名和端口号 别忘了加http
      //   // target: "http://10.216.6.28:9993/standard", // 设置你调用的接口域名和端口号 别忘了加http
      //   //target: 'http://localhost',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/baike": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   },
      // },
 

      // "/supSearch": {
      //   // target: "http://10.216.6.231:9993", // 设置你调用的接口域名和端口号 别忘了加http
      //   target: "http://10.216.6.231:38888/standard", // 设置你调用的接口域名和端口号 别忘了加http
      //   // target: "https://www.bootcdn.cn/", // 设置你调用的接口域名和端口号 别忘了加http
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/supSearch": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   },
      // },

      // "/DSJPIC": {
      //   // target: "http://10.216.6.231:9993", // 设置你调用的接口域名和端口号 别忘了加http
      //   // target: "http://10.216.6.231:38888", // 设置你调用的接口域名和端口号 别忘了加http
      //   target: "http://10.216.3.17/data/DSJPIC", // 设置你调用的接口域名和端口号 别忘了加http
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/DSJPIC": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   },
      // },
    },
  },
  // webpack配置
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false,
    },
    // 或者
    // 警告 webpack 的性能提示
    performance: {
      hints: "warning",
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
  },
};