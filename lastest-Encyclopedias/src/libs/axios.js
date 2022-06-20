import axios from "axios";
import store from "@/store";
import ViewUI from "view-design";
import router from "../router";

// 标准百科
const standardBaseURL = [
  "/standard/hotsearch",
  "/standard/trace",
  "/zhjb/reviewAnalysis/getSimilarReview",
  "/standard/sysmanage/sysManagetreeData",
  "/mirror/systemMirror/listDict",
  "/mirror/systemMirror/listDictGJB",
  "/mirror/systemMirror/list",
  "/mirror/systemMirror/listGJB",
  "/mirror/systemMirror/sysManagetreeData",
  "/zhjb/reviewAnalysis/getAnalysisResult",
  "/zhjb/reviewAnalysis/getGJBClassifierInfer",
  "/zhjb/countView/selectHtypeTotal",
  "/zhjb/countView/getTotalNum",
  "/zhjb/reviewAnalysis/getSystemInfer",
  "/zhjb/reviewAnalysis/getGJBClassifierInfer",
  "/zhjb/reviewAnalysis/getSimilarTerminology",
  "/zhjb/stdDemand/treeDatas",
  "/zhjb/stdDemand/query",
  "/baike/standServer/requestDataSenior",
  "/zhjb/stdDemand/delete",
  "/zhjb/stdDemand/save",
  "/standard/zhjb/stdDemand/exportExcel",
  "/standard/zhjb/stdDemand/exportReport",
];
//质量接口
const qualityBaseURL = ["/baike/appServer/requestGetData"];
const personalityBaseURL = [
  "/baike/standServer/requestData",
  "/baike/standServer/requestDataSenior",
  "/baike/smartstandard/requestData",
// 个人体系接口
  "/baike/standServer/treeName",
  "/baike/standServer/delete",
  "/baike/standServer/tree1",
  "/baike/standServer/save"
];
const notToken = ["/api/users/register", "/api/users/login"]; // 请求方法里面 不用判断token是否有效 的接口

const instance = axios.create({
  baseURL: "/api",
  timeout: 60000,
});

instance.interceptors.request.use(
  function(config) {
    setTimeout(() => {
      store.commit("setspinShow_", false);
    }, 200);
    if (standardBaseURL.includes(config.url)) {
      // 如果是标准百科的模块的接口 需要修改baseUrl
      config.baseURL = "/standard";
    }
    if (qualityBaseURL.includes(config.url)) {
      // 如果是标准百科的模块的接口 需要修改baseUrl
      config.baseURL = "/quality";
    }
    if (personalityBaseURL.includes(config.url)) {
      // 如果是个性知识的模块的接口 需要修改baseUrl
      // config.baseURL = "/personality/personality";
      config.baseURL = "/personality";
    }
    // 在发送请求之前做些什么
    const { userInfoToken } = store.state.user;
    if (userInfoToken) {
      config.headers["token"] = userInfoToken;
    }
    return config;
  },
  function(error) {
    setTimeout(() => {
      store.commit("setspinShow_", false);
    }, 200);
    // 对请求错误做些什么
    if (JSON.stringify(error).includes("timeout")) {
      ViewUI.Message.error("服务器响应超时，请刷新当前页");
      return;
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    var a = response.config.url;
    if (!notToken.includes(a)) {
      if (response.headers.token_is_valid != undefined) {
        if (response.headers.token_is_valid == "0") {
          store.dispatch("storageUserInfo", ""); // 清空用户信息
          store.dispatch("storageToken", ""); // 清空用户token
          store.dispatch("storageisLogin", false); // 清空用户登录状态
          store.dispatch("storageChatHistory", []); // 清空聊天记录
          store.dispatch("storageChatHistoryLoad", false); // 加载过机器人聊天记录
          router.push("/");
        } else if (response.headers.new_token != "none") {
          store.dispatch("storageToken", response.headers.new_token); // 单独储存一个token
        }
      }
    }

    setTimeout(() => {
      store.commit("setspinShow_", false);
    }, 200);
    if (response.data.code === 401) {
      // 获取那个新的token 赋值给vuex
      store.dispatch("storageUserInfo", "");
      store.dispatch("storageToken", ""); // 清空用户token
      store.dispatch("storageisLogin", false);
      ViewUI.Message.error(response.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    setTimeout(() => {
      store.commit("setspinShow_", false);
    }, 200);
    ViewUI.Message.error("服务端出现错误 请重试!");
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const request = (url, method, data) => {
  setTimeout(() => {
    store.commit("setspinShow_", false);
  }, 200);
  if (method.toLowerCase() == "get") {
    return instance({
      url,
      method: "get",
      params: data,
    });
  } else {
    return instance({
      url,
      method: "post",
      data,
    });
  }
};
