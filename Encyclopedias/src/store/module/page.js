export default {
  state: {
    Menu_top_active: "",
    Menu_top_active_help: "",
    Menu_top_active_tools: "",
    UploadRecordManagementDetails: "",
    TaskManagementDetailsFirst: "",
    TaskManagementDetailsThird: "",
    SearchResult: "",
    SearchImg: "",
    atlasImg: {}, //图谱的图片
    atlasTypeList: {}, //图谱头部的选择框
    activeText: "", //大图谱的点击
    WikipediaDetails: "", //质量详情数据
    WikipediaDetailsCagetory: "", //质量详情分类
    searchKey: "", //搜索的关键字
    searchType: "", //搜索的关键字
    taskPageVal:"",//体验模块的详情数据
  },
  getters: {},
  mutations: {
    updated_Menu_top_active(state, name) {
      state.Menu_top_active = name;
    },
    updated_Menu_top_active_help(state, name) {
      state.Menu_top_active_help = name;
    },
    updated_Menu_top_active_tools(state, name) {
      state.Menu_top_active_tools = name;
    },
    updated_UploadRecordManagementDetails(state, name) {
      state.UploadRecordManagementDetails = name;
    },
    // 知识抽取-服务监控
    updated_TaskManagementDetailsFirst(state, name) {
      state.TaskManagementDetailsFirst = name;
    },
    // 知识抽取-知识入库
    updated_TaskManagementDetailsThird(state, name) {
      state.TaskManagementDetailsThird = name;
    },
    //基础百科 -> 民航事故百科点击某个字段跳至搜索结果时用到
    updated_SearchResult(state, name) {
      state.SearchResult = name;
    },
    //基础百科 -> 民航事故百科点击某个字段跳至搜索结果时用到
    updated_SearchImg(state, name) {
      state.SearchImg = name;
    },
    updated_atlasImg(state, name) {
      state.atlasImg = name;
    },
    updated_atlasTypeList(state, name) {
      state.atlasTypeList = name;
    },
    updated_activeText(state, name) {
      state.activeText = name;
    },
    updated_WikipediaDetails(state, name) {
      state.WikipediaDetails = name;
    },
    updated_WikipediaDetailsCagetory(state, name) {
      state.WikipediaDetailsCagetory = name;
    },
    updated_searchKey(state, name) {
      state.searchKey = name;
    },
    updated_searchType(state, name) {
      state.searchType = name;
    },
    updated_taskPageVal(state, name) {
      state.taskPageVal = name;
    },
  },
  actions: {},
};
