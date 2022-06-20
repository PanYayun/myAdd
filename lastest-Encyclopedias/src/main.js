import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "view-design/dist/styles/iview.css";
import ViewUI from "view-design";
import qs from "qs";
import ElementResizeDetectorMaker from "element-resize-detector";
import "@/libs/permission"
import { request } from '@/libs/axios'

Vue.prototype.$erd = ElementResizeDetectorMaker();

Vue.config.productionTip = false;
Vue.use(ViewUI);
// 全局注册，使用方法为:this.Spin
Vue.prototype.$Spin = ViewUI.Spin;
// 全局注册，使用方法为:this.$qs
Vue.prototype.$qs = qs;
// 全局注册，使用方法为:this.axios，一般下载文件时用
Vue.prototype.axios = axios;
// 全局注册，使用方法为:this.$erd
Vue.prototype.$erd = ElementResizeDetectorMaker();
// 全局注册，使用方法为:this.$axios，一般接口使用，仅封装GET和POST
Vue.prototype.$axios = request;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
