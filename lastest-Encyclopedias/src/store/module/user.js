import router from "@/router";

export default {
  state: {
    userInfo: null,
    userInfoToken: "",
    isLogin: null,
    isAdmin: false,
    chatHistory: [],
    isLoadChat: false, //加载过用户机器人聊天记录
    HomeYe:'/',//判断是进入百科首页,还是智慧标准首页
  },
  mutations: {
    ["STORAGE_USER_INFO"](state, value) {
      state.userInfo = value;
    },
    ["STORAGE_IS_LOGIN"](state, value) {
      state.isLogin = value;
    },
    ["STORAGE_IS_ADMIN"](state, value) {
      state.isAdmin = value;
    },
    ["STORAGE_CHAT_HISTORY"](state, value) {
      state.chatHistory = value;
    },
    ["STORAGE_CHAT_HISTORY_LOAD"](state, value) {
      console.log(value, "user");
      state.isLoadChat = value;
    },
    ["STORAGE_TOKEN"](state, value) {
      state.userInfoToken = value;
    },
    //判断是进入百科首页,还是智慧标准首页
    changeHomeYe(state, value){
      state.HomeYe = value;
    }
  },
  getters: {
    userInfo: (state) => state.userInfo,
    isLogin: (state) => state.isLogin,
    isAdmin: (state) => state.isAdmin,
    chatHistory: (state) => state.chatHistory,
    isLoadChat: (state) => state.isLoadChat,
    userInfoToken: (state) => state.userInfoToken,
  },
  actions: {
    storageUserInfo({ commit }, data) {
      commit("STORAGE_USER_INFO", data);
    },
    storageisLogin({ commit }, data) {
      commit("STORAGE_IS_LOGIN", data);
    },
    storageisAdmin({ commit }, data) {
      commit("STORAGE_IS_ADMIN", data);
    },
    clearUserInfo({ commit }) {
      commit("UPDATE_TOKEN", null);
      window.location.reload();
    },
    storageChatHistory({ commit }, data) {
      commit("STORAGE_CHAT_HISTORY", data);
    },
    storageChatHistoryLoad({ commit }, data) {
      commit("STORAGE_CHAT_HISTORY_LOAD", data);
    },
    storageToken({ commit }, data) {
      commit("STORAGE_TOKEN", data);
    },
  },
};
