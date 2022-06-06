import { type } from "jquery";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/digitalQuality",
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页",
      requireLogin: false,
    },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: (resolve) => require(["@/views/login.vue"], resolve),
  },
  {
    path: "/searchIndex",
    name: "searchIndex",
    meta: {
      title: "搜索首页",
    },
    component: (resolve) => require(["@/views/searchIndex.vue"], resolve),
  },
  {
    path: "/digitalQuality",
    name: "digitalQuality",
    meta: {
      title: "数质服务首页",
    },
    component: (resolve) => require(["@/views/digitalQuality.vue"], resolve),
  },
  {
    path: "/magicMirror",
    name: "magicMirror",
    meta: {
      title: "知识魔镜首页",
    },
    component: (resolve) =>
      require(["@/views/moreIndex/magicMirror.vue"], resolve),
  },
  {
    path: "/magicBox",
    name: "magicBox",
    meta: {
      title: "算法魔盒首页",
    },
    component: (resolve) =>
      require(["@/views/moreIndex/magicBox.vue"], resolve),
  },
  {
    path: "/magicSquare",
    name: "magicSquare",
    meta: {
      title: "数据魔方首页",
    },
    component: (resolve) =>
      require(["@/views/moreIndex/magicSquare.vue"], resolve),
  },
  {
    path: "/practice",
    name: "practice",
    meta: {
      title: "数知实践列表",
    },
    component: (resolve) =>
      require(["@/views/moreIndex/practice.vue"], resolve),
  },
  {
    path: "/encyclopediasHelp",
    name: "encyclopediasHelp",
    meta: {
      title: "航空数质服务-帮助中心",
    },
    component: (resolve) =>
      require(["@/views/helpCenter/encyclopediasHelp.vue"], resolve),
    children: [
      {
        path: "/helpCenter/introduce",
        name: "introduce",
        meta: {
          title: "平台简介",
        },
        component: (resolve) =>
          require(["@/views/helpCenter/introduce.vue"], resolve),
      },
      {
        path: "/helpCenter/our",
        name: "our",
        meta: {
          title: "关于我们",
        },
        component: (resolve) =>
          require(["@/views/helpCenter/our.vue"], resolve),
      },
      {
        path: "/helpCenter/copyright",
        name: "copyright",
        meta: {
          title: "版权声明",
        },
        component: (resolve) =>
          require(["@/views/helpCenter/copyright.vue"], resolve),
      },
      {
        path: "/helpCenter/exemption",
        name: "exemption",
        meta: {
          title: "免责声明",
        },
        component: (resolve) =>
          require(["@/views/helpCenter/exemption.vue"], resolve),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "注册",
    },
    component: (resolve) => require(["@/views/user/register.vue"], resolve),
  },
  {
    path: "/userCenter",
    name: "userCenter",
    meta: {
      title: "用户管理中心",
    },
    children: [
      {
        path: "/myLib",
        name: "myLib",
        meta: {
          title: "我的资料",
        },
        component: (resolve) => require(["@/views/user/myLib.vue"], resolve),
      },
      {
        path: "/modifyPassword",
        name: "modifyPassword",
        meta: {
          title: "修改密码",
        },
        component: (resolve) =>
          require(["@/views/user/modifyPassword.vue"], resolve),
      },
      {
        path: "/managerUsers",
        name: "managerUsers",
        meta: {
          title: "用户管理",
        },
        component: (resolve) =>
          require(["@/views/user/managerUsers.vue"], resolve),
      },
    ],
    component: (resolve) => require(["@/views/user/userCenter.vue"], resolve),
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "关于",
      requireLogin: true,
    },
    component: (resolve) => require(["@/views/About.vue"], resolve),
  },
  // 标准
  {
    path: "/bz/search/list",
    name: "BzSearchList",
    meta: {
      title: "标准搜索结果",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/bz/search/list",
      requireLogin: true,
    },
    component: (resolve) =>
      require(["@/views/searchResultList/BzSearchList.vue"], resolve),
  },
  {
    path: "/standardList",
    name: "StandardList",
    meta: {
      title: "标准百科",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/bz/search/list",
      requireLogin: true,
    },
    component: (resolve) =>
      require(["@/views/page_details/StandardList.vue"], resolve),
  },
  {
    path: "/BasicDetail",
    name: "BasicDetail",
    meta: {
      title: "标准百科详情",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/bz/search/list",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/BasicDetail.vue"),
  },
  {
    path: "/BasicQuotaDetail",
    name: "BasicQuotaDetail",
    meta: {
      title: "基础百科指标详情",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/bz/search/list",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/BasicQuotaDetail.vue"),
  },
  {
    path: "/ContentDetail",
    name: "ContentDetail",
    meta: {
      title: "正文详情",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/bz/search/list",
      requireLogin: true,
    },
    component: (resolve) =>
      require(["@/views/page_details/ContentDetail.vue"], resolve),
  },
  // 民航
  {
    path: "/SearchResult",
    name: "SearchResult",
    meta: {
      title: "民航搜索结果",
      val: "/SearchResult",
      requireLogin: true,
    },
    component: (resolve) =>
      require(["@/views/searchResultList/SearchResult.vue"], resolve),
  },
  {
    path: "/accidentCategory",
    name: "AccidentCategory",
    meta: {
      title: "民航事故百科",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/SearchResult",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/AccidentCategory.vue"),
  },
  {
    path: "/CivilAviationDetail",
    name: "CivilAviationDetail",
    meta: {
      title: "民航详情",
      val: "/SearchResult",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/CivilAviationDetail.vue"),
  },
  // 元器件
  {
    path: "/ElectronResult",
    name: "ElectronResult",
    meta: {
      title: "元器件搜索结果",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/ElectronResult",
      requireLogin: true,
    },
    component: (resolve) =>
      require(["@/views/searchResultList/ElectronResult.vue"], resolve),
  },
  {
    path: "/ElectronDetail",
    name: "ElectronDetail",
    meta: {
      title: "元器件详情",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/ElectronResult",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/ElectronDetail.vue"),
  },
  {
    path: "/ElectronDetailInvalid",
    name: "ElectronDetailInvalid",
    meta: {
      title: "元器件失效分析案例详情",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/ElectronResult",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/ElectronDetailInvalid.vue"),
  },
  {
    path: "/ElectronDetailTools",
    name: "ElectronDetailTools",
    meta: {
      title: "元器件失效分析案例详情",
      // 在当前页面，点击本站搜索即跳转至val的路径
      val: "/ElectronResult",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/ElectronDetailTools.vue"),
  },
  // 术语
  {
    path: "/TermDetail",
    name: "TermDetail",
    meta: {
      title: "术语详情",
      val: "/ShuYuSearchResult",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/TermDetail.vue"),
  },
  {
    path: "/ShuYuSearchResult",
    name: "ShuYuSearchResult",
    meta: {
      title: "术语搜索结果",
      requireLogin: true,
    },
    component: () => import("@/views/searchResultList/ShuYuSearchResult.vue"),
  },

  // 搜索结果
  {
    path: "/ApplicationSearchResult",
    name: "ApplicationSearchResult",
    meta: {
      title: "智能应用-检索结果",
      requireLogin: true,
    },
    component: (resolve) =>
      require([
        "@/views/searchResultList/ApplicationSearchResult.vue",
      ], resolve),
  },
  {
    path: "/atlasImg",
    name: "atlasImg",
    meta: {
      title: "图谱",
      requireLogin: true,
    },
    component: () => import("@/views/page_details/atlasImg.vue"),
  },
  // 模型工具
  {
    path: "/modelTools",
    name: "modelTools",
    meta: {
      title: "模型工具",
      requireLogin: true,
    },
    component: (resolve) => require(["@/views/modelTools/index.vue"], resolve),
    children: [
      {
        path: "/modelTools/experienceNow",
        name: "experienceNow",
        meta: {
          title: "立即体验",
        },
        component: (resolve) =>
          require(["@/views/modelTools/experienceNow.vue"], resolve),
      },
      {
        path: "/modelTools/newTask",
        name: "newTask",
        meta: {
          title: "新建任务",
        },
        component: (resolve) =>
          require(["@/views/modelTools/newTask.vue"], resolve),
      },
      {
        path: "/modelTools/taskManagement",
        name: "taskManagement",
        meta: {
          title: "任务管理",
        },
        component: (resolve) =>
          require(["@/views/modelTools/taskManagement.vue"], resolve),
      },
      {
        path: "/modelTools/taskPage",
        name: "taskPage",
        meta: {
          title: "任务详情",
        },
        component: (resolve) =>
          require(["@/views/modelTools/taskPage.vue"], resolve),
      },
      {
        path: "/modelTools/modelPage",
        name: "modelPage",
        meta: {
          title: "模型详情",
        },
        component: (resolve) =>
          require(["@/views/modelTools/modelPage.vue"], resolve),
      },
      {
        path: "/modelTools/sourseCeive",
        name: "sourseCeive",
        meta: {
          title: "知识元抽取",
        },
        component: (resolve) =>
          require(["@/views/modelTools/sourseCeive.vue"], resolve),
      },
      {
        path: "/modelTools/indexCeive",
        name: "indexCeive",
        meta: {
          title: "指标抽取",
        },
        component: (resolve) =>
          require(["@/views/modelTools/indexCeive.vue"], resolve),
      },
      {
        path: "/modelTools/autoAsk",
        name: "autoAsk",
        meta: {
          title: "智能问答",
        },
        component: (resolve) =>
          require(["@/views/modelTools/autoAsk.vue"], resolve),
      }
    ],
  },
  {
    path: "/TableList",
    name: "TableList",
    meta: {
      title: "数据采集",
      requireLogin: true,
    },
    component: (resolve) => require(["@/views/tableList/index.vue"], resolve),
    children: [
      {
        path: "/TableList/UploadRecordManagement",
        name: "UploadRecordManagement",
        meta: {
          title: "上传记录管理",
        },
        component: (resolve) =>
          require(["@/views/tableList/UploadRecordManagement.vue"], resolve),
      },
      {
        path: "/TableList/UploadRecordManagementDetails",
        name: "UploadRecordManagementDetails",
        meta: {
          title: "条目详情",
        },
        component: (resolve) =>
          require([
            "@/views/tableList/UploadRecordManagementDetails.vue",
          ], resolve),
      },
      {
        path: "/TableList/NewDataUpload",
        name: "NewDataUpload",
        meta: {
          title: "新增数据上传",
        },
        component: (resolve) =>
          require(["@/views/tableList/NewDataUpload.vue"], resolve),
      },
      // TableList以上不动，以下随意
      {
        path: "/TableList/TaskManagement",
        name: "TaskManagement",
        meta: {
          title: "任务管理",
        },
        component: (resolve) =>
          require(["@/views/tableList/TaskManagement.vue"], resolve),
      },
      {
        path: "/TableList/viewTaskDetails",
        name: "viewTaskDetails",
        meta: {
          title: "任务详情",
        },
        component: () => import("@/views/taskAdminModule/taskDetails"),
      },
      {
        path: "/TableList/audit",
        name: "audit",
        meta: {
          title: "知识审核",
        },
        component: () => import("@/views/taskAdminModule/audit"),
      },
      {
        path: "/TableList/TaskManagementDetailsFirst",
        name: "TaskManagementDetailsFirst",
        meta: {
          title: "通用知识加工",
        },
        component: (resolve) =>
          require([
            "@/views/tableList/TaskManagementDetailsFirst.vue",
          ], resolve),
      },
      {
        path: "/TableList/TaskManagementDetailsSecond",
        name: "TaskManagementDetailsSecond",
        meta: {
          title: "知识审核",
        },
        component: (resolve) =>
          require([
            "@/views/tableList/TaskManagementDetailsSecond.vue",
          ], resolve),
      },
      {
        path: "/TableList/TaskManagementDetailsThird",
        name: "TaskManagementDetailsThird",
        meta: {
          title: "数据入库",
        },
        component: (resolve) =>
          require([
            "@/views/tableList/TaskManagementDetailsThird.vue",
          ], resolve),
      },
      {
        path: "/TableList/NewTask",
        name: "NewTask",
        meta: {
          title: "新建任务",
        },
        component: (resolve) =>
          require(["@/views/tableList/NewTask.vue"], resolve),
      },
      {
        path: "/TableList/addTask",
        name: "addTask",
        meta: {
          title: "新建任务",
        },
        component: () => import("@/views/taskAdminModule/addTask"),
      },
      {
        path: "/TableList/GenerateTaskOne",
        name: "GenerateTaskOne",
        meta: {
          title: "事理图谱生成过程",
        },
        component: () => import("@/views/taskAdminModule/GenerateTaskOne"),
      },
      {
        path: "/TableList/aaaa",
        name: "aaaa",
        meta: {
          title: "aaaa",
        },
        component: () => import("@/views/taskAdminModule/aaaa"),
      },
      {
        path: "/TableList/bbbb",
        name: "bbbb",
        meta: {
          title: "bbbb",
        },
        component: () => import("@/views/taskAdminModule/bbbb"),
      },
      //任务-专业知识
      {
        path: "/TableList/TaskExpertise",
        name: "TaskExpertise",
        meta: {
          title: "专业知识抽取",
        },
        component: () => import("@/views/taskAdminModule/TaskExpertise"),
      },
      //事理图谱生产-2
      {
        path: "/TableList/GenerateTaskTwo",
        name: "GenerateTaskTwo",
        meta: {
          title: "事理图谱生成过程",
        },
        component: () => import("@/views/taskAdminModule/GenerateTaskTwo"),
      },
      //事理图谱生产-3
      {
        path: "/TableList/GenerateTaskThree",
        name: "GenerateTaskThree",
        meta: {
          title: "事理图谱生成过程",
        },
        component: () => import("@/views/taskAdminModule/GenerateTaskThree"),
      },
      //事理图谱生产-4
      {
        path: "/TableList/GenerateTaskFour",
        name: "GenerateTaskFour",
        meta: {
          title: "事理图谱生成过程",
        },
        component: () => import("@/views/taskAdminModule/GenerateTaskFour"),
      },
      //事理图谱生产-5
      {
        path: "/TableList/GenerateTaskFive",
        name: "GenerateTaskFive",
        meta: {
          title: "事理图谱生成过程",
        },
        component: () => import("@/views/taskAdminModule/GenerateTaskFive"),
      },
      //事理图谱生产-6
      {
        path: "/TableList/GenerateTaskSix",
        name: "GenerateTaskSix",
        meta: {
          title: "事理图谱生成过程",
        },
        component: () => import("@/views/taskAdminModule/GenerateTaskSix"),
      },
      //任务-知识审核
      {
        path: "/TableList/KnowledgeAudit",
        name: "KnowledgeAudit",
        meta: {
          title: "知识审核",
        },
        component: () => import("@/views/taskAdminModule/KnowledgeAudit"),
      },
      //审核-事故属性抽取
      {
        path: "/TableList/AccidentExtraction",
        name: "AccidentExtraction",
        meta: {
          title: "AccidentExtraction",
        },
        component: () => import("@/views/taskAdminModule/AccidentExtraction"),
      },
      //审核-事理图谱抽取
      {
        path: "/TableList/AccidentAtlas",
        name: "AccidentAtlas",
        meta: {
          title: "AccidentAtlas",
        },
        component: () => import("@/views/taskAdminModule/AccidentAtlas"),
      },
      //审核-新词发现
      {
        path: "/TableList/NeologismDiscovery",
        name: "NeologismDiscovery",
        meta: {
          title: "NeologismDiscovery",
        },
        component: () => import("@/views/taskAdminModule/NeologismDiscovery"),
      },
      //审核-知识摘要
      {
        path: "/TableList/KnowledgeSummary",
        name: "KnowledgeSummary",
        meta: {
          title: "KnowledgeSummary",
        },
        component: () => import("@/views/taskAdminModule/KnowledgeSummary"),
      },
      //审核-事故性质分类
      {
        path: "/TableList/StandardClassification",
        name: "StandardClassification",
        meta: {
          title: "StandardClassification",
        },
        component: () =>
          import("@/views/taskAdminModule/StandardClassification"),
      },
      //审核-相似事故
      {
        path: "/TableList/SimilarAccident",
        name: "SimilarAccident",
        meta: {
          title: "SimilarAccident",
        },
        component: () => import("@/views/taskAdminModule/SimilarAccident"),
      },
      //审核-事故原因分类
      {
        path: "/TableList/CauseAccident",
        name: "CauseAccident",
        meta: {
          title: "CauseAccident",
        },
        component: () => import("@/views/taskAdminModule/CauseAccident"),
      },

      //审核-关键词
      {
        path: "/TableList/AuditKeywords",
        name: "AuditKeywords",
        meta: {
          title: "AuditKeywords",
        },
        component: () => import("@/views/taskAdminModule/AuditKeywords"),
      },
      //审核-指标列表
      {
        path: "/TableList/AuditIndicatorsList",
        name: "AuditIndicatorsList",
        meta: {
          title: "AuditIndicatorsList",
        },
        component: () => import("@/views/taskAdminModule/AuditIndicatorsList"),
      },
      //审核-指标列表:标准条款
      {
        path: "/TableList/AuditClauseList",
        name: "AuditClauseList",
        meta: {
          title: "AuditClauseList",
        },
        component: () => import("@/views/taskAdminModule/AuditClauseList"),
      },
      //审核-指标提取
      {
        path: "/TableList/IndicatorExtraction",
        name: "IndicatorExtraction",
        meta: {
          title: "IndicatorExtraction",
        },
        component: () => import("@/views/taskAdminModule/IndicatorExtraction"),
      },
      //数据入库
      {
        path: "/TableList/DataWarehousing",
        name: "DataWarehousing",
        meta: {
          title: "DataWarehousing",
        },
        component: () => import("@/views/taskAdminModule/DataWarehousing"),
      },
    ],
  },
  {
    path: "/userAdmin",
    name: "userAdmin",
    meta: {
      title: "用户管理",
      requireLogin: true,
    },
    component: () => import("@/views/userAdmin/index"),
    children: [
      {
        path: "/userAdmin/mineInfo",
        name: "mineInfo",
        meta: {
          title: "我的资料",
        },
        component: () => import("@/views/userAdmin/childrenPage/mineInfo"),
      },
      {
        path: "/userAdmin/mineInterest",
        name: "mineInterest",
        meta: {
          title: "我的兴趣",
        },
        component: () => import("@/views/userAdmin/childrenPage/mineInterest"),
      },
      {
        path: "/userAdmin/modifiPassword",
        name: "modifiPassword",
        meta: {
          title: "修改密码",
        },
        component: () =>
          import("@/views/userAdmin/childrenPage/modifiPassword"),
      },
      {
        path: "/userAdmin/userCollection",
        name: "userCollection",
        meta: {
          title: "我的收藏",
        },
        component: () =>
          import("@/views/userAdmin/childrenPage/userCollection"),
      },
      {
        path: "/userAdmin/userManagemen",
        name: "userManagemen",
        meta: {
          title: "用户管理",
        },
        component: () => import("@/views/userAdmin/childrenPage/userManagemen"),
      },
    ],
  },
  {
    path: "/pictureSearch",
    name: "pictureSearch",
    meta: {
      title: "按图索骥",
      requireLogin: true,
    },
    component: () => import("@/views/appIntelligence/accordingPictureSearch"),
  },
  {
    path: "/semanticSearch",
    name: "semanticSearch",
    meta: {
      title: "语义检索首页",
      requireLogin: true,
    },
    component: () => import("@/views/appIntelligence/semanticSearch"),
  },
  {
    path: "/qualityWikipedia",
    name: "qualityWikipedia",
    meta: {
      title: "质量百科首页",
      requireLogin: true,
    },
    component: () => import("@/views/wikipedia/quality"),
  },
  {
    path: "/quality_private",
    name: "quality_private",
    meta: {
      title: "质量知识展示",
      requireLogin: true,
    },
    component: () => import("@/views/wikipedia/quality_private"),
  },
  {
    path: "/qualityIndex",
    name: "qualityIndex",
    meta: {
      title: "智慧大脑首页",
      requireLogin: true,
    },
    component: () => import("@/views/wikipedia/qualityIndex"),
  },
  {
    path: "/qualityWikipediaDetails",
    name: "qualityWikipediaDetails",
    meta: {
      title: "质量百科详情页",
      requireLogin: true,
    },
    component: () => import("@/views/wikipedia/details"),
  },
  {
    path: "/qualityWikipediaRecommend",
    name: "qualityWikipediaRecommend",
    meta: {
      title: "质量百科详情页",
      requireLogin: true,
    },
    component: () => import("@/views/wikipedia/detailsRecommend"),
  },
  {
    path: "/standard",
    name: "standard",
    meta: {
      requireLogin: true,
      title: "质量百科详情页",
    },
    component: () => import("@/views/standardModule/standardMain"),
    children: [
      {
        path: "/standard",
        redirect: "/standard/index",
      },
      {
        path: "/standard/index",
        name: "index",
        meta: {
          title: "标准百科首页",
          requireLogin: true,
        },
        component: () => import("@/views/standardModule/index"),
      },
      {
        path: "/standard/searchingResult",
        name: "searchingResult",
        meta: {
          title: "检索结果",
        },
        component: () => import("@/views/standardModule/searchingResult"),
      },
      {
        path: "/standard/standardSystem",
        name: "standardSystem",
        meta: {
          title: "标准体系",
        },
        component: () => import("@/views/standardModule/standardSystem"),
      },
      {
        path: "/standard/standardStatistics",
        name: "standardStatistics",
        meta: {
          title: "标准统计",
        },
        component: () => import("@/views/standardModule/standardStatistics"),
      },
      {
        path: "/standard/lixiang",
        name: "lixiang",
        meta: {
          title: "立项查新",
          
        },
        component: () => import("@/views/standardModule/lixiang"),
      },
      {
        path: "/standard/queryResult",
        name: "queryResult",
        meta: {
          title: "相关查询",
        
        },
        component: () => import("@/views/standardModule/queryResult"),
      },
      {
        path: "/standard/showReport",
        name: "showReport",
        meta: {
          title: "报告预览",
        
        },
        component: () => import("@/views/standardModule/showReport"),
      },
      {
        path: "/standard/standardDetails",
        name: "standardDetails",
        meta: {
          title: "标准详情",
        },
        component: () => import("@/views/standardModule/standardDetails"),
      },
      {
        path: "/standard/advancedSearch",
        name: "advancedSearch",
        meta: {
          title: "高级检索",
        },
        component: () => import("@/views/standardModule/advancedSearch"),
      },
      {
        path: "/standard/standardDynamic",
        name: "standardDynamic",
        meta: {
          title: "标准动态",
        },
        component: () => import("@/views/standardModule/standardDynamic"),
      },
      {
        path: "/standard/standardAtlas",
        name: "standardAtlas",
        meta: {
          title: "标准图谱",
        },
        component: () => import("@/views/standardModule/standardAtlas"),
      },
      {
        path: "/standard/standardDynamicDetails",
        name: "standardDynamicDetails",
        meta: {
          title: "标准动态详情",
        },
        component: () =>
          import("@/views/standardModule/standardDynamicDetails"),
      },
      {
        path: "/standard/demandAdmin",
        name: "demandAdmin",
        meta: {
          title: "需求管理",
        },
        component: () => import("@/views/standardModule/demandAdmin"),
      },
      {
        path: "/standard/personalityKnowledge",
        name: "personalityKnowledge",
        meta: {
          title: "个性知识",
        },
        component: () => import("@/views/standardModule/personalityKnowledge"),
      },
      {
        path: "/standard/demo",
        name: "demo",
        meta: {
          title: "体系维护",
        },
        component: () => import("@/views/standardModule/demo"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
