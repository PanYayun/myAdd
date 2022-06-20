<template>
  <div id="app" class="app" style="background:#f5f7f9">
    <div v-if="standardModule" style="width: 100%; height: 100%;position: relative;min-width: 1600px;">
      <transition name="fade-transform" mode="out-in">
        <header
          v-if="isWhite"
          style="height: auto; padding: 0; width: 100%;position: absolute;left: 0;top: 0;z-index:99;"
        >
          <!-- 魔盒 魔方 魔镜 数智实践列表 数智首页-->
          <HeaderMenuHome :islogin="islogin" />
        </header>
        <header
          v-if="isBlue"
          style="background:#3388ff;height: auto; padding: 0; width: 100%"
        >
          <HeaderMenuHome :islogin="islogin" />
        </header>
        <header
          v-if="$route.path === '/atlasImg'"
          style="background: #fff; height: auto; padding: 0; width: 100%"
        >
          <!-- 图谱 -->
          <HeaderSearchQuestion @seach_btn="seach_btn" />
        </header>
        <!-- 搜索首页 -->
        <header
          v-if="$route.path == '/searchIndex'"
          style="background: #fff; height: auto; padding: 0; width: 100%"
        >
          <template>
            <HeaerMenuSearchIndex @seach_btn="seach_btn" />
          </template>
        </header>
        <header
          v-if="
            $route.path == '/helpCenter/our' ||
              $route.path == '/helpCenter/copyright' ||
              $route.path == '/helpCenter/encyclopediasHelp' ||
              $route.path == '/helpCenter/exemption' ||
              $route.path == '/helpCenter/introduce'
          "
          style="background: #fff; height: auto; padding: 0; width: 100%"
        >
          <template>
            <HeaerMenuSearchIndex @seach_btn="seach_btn" />
          </template>
        </header>

        <header
          v-if="$route.path == '/semanticSearch'"
          style="background: #3388ff; height: auto; padding: 0; width: 100%"
        >
          <!-- 搜索子页面 -->
          <template>
            <HeaerMenuSearchIndex @seach_btn="seach_btn" />
          </template>
        </header>
      </transition>

      <transition name="fade-transform" mode="out-in">
        <router-view v-if="routerAlive" />
      </transition>
      <div style="width:100%;">
        <common-footer></common-footer>
      </div>
    </div>
    <div style="min-width: 1200px;" v-else>
      <Spin fix style="z-index: 1000" v-if="app_spin"></Spin>
      <Layout style="justify-content: center; align-items: center">
        <header
          style="background: #3388ff; height: auto; padding: 0; width: 100%"
        >
          <HeaderMenuHome />
        </header>
        <Content style="min-height: 600px; width: 100%">
          <transition name="fade-transform" mode="out-in">
            <router-view v-if="routerAlive" />
          </transition>
        </Content>
        <div style="width:100%;"><common-footer></common-footer></div>
      </Layout>
    </div>
  </div>
</template>
<script>
import {
  whiteList,
  url_power_page_w,
  url_power_page_b,
} from "@/libs/url_power.js";
import commonFooter from "@/components/commonFooter.vue";
import HeaderSearchQuestion from "@/components/HeaderSearchQuestion.vue";
import HeaderMenuQuality from "@/components/headerMenuQuality.vue";
import HeaderMenu from "@/components/headerMenuNew.vue";
import HeaderMenuHome from "@/components/headerStyleMore/headerMenu_home.vue";
import HeaerMenuSearchIndex from "@/components/headerStyleMore/heaerMenu_searchIndex.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    commonFooter,
    HeaderSearchQuestion,
    HeaderMenuQuality,
    HeaderMenu,
    HeaerMenuSearchIndex,
    HeaderMenuHome,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      app_spin: false,
      standardModule: true,
      routerAlive: true,
      chatHistoryFromNet: [],
      isWhite: false,
      isBlue: false,
    };
  },
  beforeCreate() {},
  created() {},
  mounted() {
    this.$store.commit("setspinShow_", false);
    // this.setScrollBar();
    // 浏览器缩放，更新ScrollBar位置
    // window.addEventListener("resize", this.setScrollBar);
  },
  methods: {
    reload() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
    checkLogin() {
      if (
        this.$router.currentRoute.matched.some(
          (record) => record.meta.requireLogin
        )
      ) {
        if (this.$router.state.user.isLogin === false) {
          this.$router.push({
            path: "/login",
          });
        }
      }
    },
    seach_btn(value) {
      let val = JSON.parse(value);
      if (!val.data) {
        this.$Message.warning({
          duration: 5,
          background: true,
          content: "当前输入值为空",
        });
      } else {
        if (val.type == "2") {
          this.$router.push({
            name: "ApplicationSearchResult",
          });
        } else if (val.type == "0") {
          if (this.$route.name == "ApplicationSearchResult") {
            val.type = "1";
            this.$router.push({
              path: "/About",
              query: {
                val: JSON.stringify(val),
              },
            });
          } else {
            this.$store.commit("updated_SearchImg", { type: undefined });
            var path = this.$route.meta.val;
            if (this.$route.query.type == "hksybk") {
              path = "/ShuYuSearchResult";
            } else if (this.$route.query.type == "yqjbk") {
              path = "/ElectronResult";
            }
            this.$router.push({
              path: path,
              query: {
                val: JSON.stringify(val),
              },
            });
          }
        } else if (val.type == "1") {
          if (this.$route.name == "ApplicationSearchResult") {
            this.$router.push({
              path: "/About",
              query: {
                val: JSON.stringify(val),
              },
            });
          } else {
            this.$store.commit("updated_SearchImg", { type: undefined });
            this.$router.push({
              path: "/ApplicationSearchResult",
              query: {
                val: JSON.stringify(val),
              },
            });
          }
        } else if (val.type == "3" || val.type == "4") {
          this.$store.commit("updated_SearchImg", { type: undefined });
          this.$router.push({
            path: "/atlasImg",
            query: {
              val: JSON.stringify(val),
            },
          });
        }
      }
    },
    //获取机器人聊天记录
    loadChatHistoryFromRobot() {
      if (this.$store.state.user.isLoadChat === true) {
        return;
      }
      this.$store.dispatch("storageChatHistoryLoad", true); // 加载过机器人聊天记录
      let param = new FormData(); // 创建form对象
      param.append("uid", this.$store.state.user.userInfo.username);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      axios.post("api/baike/sousuo/check_record", param, config).then((res) => {
        if (res.data.code == 200) {
          var chatHistoryFromVUEX = this.$store.state.user.chatHistory;
          this.chatHistoryFromNet = res.data.data;
          if (chatHistoryFromVUEX && chatHistoryFromVUEX.length > 0) {
            chatHistoryFromVUEX.forEach((item) => {
              this.chatHistoryFromNet.push(item);
            });
          }
          this.$store.dispatch("storageChatHistory", this.chatHistoryFromNet); // 将聊天记录存储到vuex里面
          res.data.data.forEach((item, index) => {
            //将网络图片转成base64
            if (item.imgName) {
              item.imgUrl =
                this.$store.state.app.img_url + "DSJPIC/" + item.imgName;
            }
          });
        }
      });
    },
    // setScrollBar() {
    //   this.$nextTick(function() {
    //       var div = document.querySelector(".app");
    //       div.style.height = window.innerHeight-1  + "px";
    //     // console.log("mounted: ", div);
    //     // console.log("mounted: ", window.innerHeight);
    //   });
    // },
  },
  computed: {
    app_spin_vuex() {
      return this.$store.state.app.spinShow_;
    },
    islogin() {
      return this.$store.state.user.userInfo;
    },
    isLoadChat() {
      return this.$store.state.user.isLoadChat;
    },
  },
  watch: {
    islogin: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) != "null") {
          if (newVal && newVal.name) {
            this.loadChatHistoryFromRobot();
          }
        }
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
    },
    app_spin_vuex: {
      handler(newVal, oldVal) {
        this.app_spin = newVal;
      },
      immediate: true,
    },
    $route: {
      handler(newRoute, oldRoute) {
        if (!newRoute || !oldRoute) return false;
        if (newRoute.path === oldRoute.path) return false;
        const isStandardModule = whiteList.includes(newRoute.path);
        this.isWhite = url_power_page_w.includes(newRoute.path);
        this.isBlue = url_power_page_b.includes(newRoute.path);
        this.standardModule = isStandardModule;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less">
@import "styles/common.css";
@import "/iconfont.css";
html,
body {
  margin: 0;
  padding: 0 !important;
  height: 100vh;
  overflow: auto;
  background: rgb(245, 247, 249);

}

#app {
  min-height: 100%;
}

#app /deep/ .ivu-spin-fix {
  z-index: 1000;
}

.layout_container {
  width: 1200px;
  margin: 0 auto;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.footerBox {
  min-width: 1200px;
  background: #2e3033;
  color: #ffffff;
  overflow: hidden;
}

.footer {
  width: 1200px;
  margin: 0 auto;
  padding-top: 40px;
  box-sizing: border-box;
}

.footer_title {
  float: left;
  overflow: hidden;
  font-size: 20px;
  font-weight: 600;
}

.footer_one {
  overflow: hidden;
  clear: both;
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 50px;
  float: left;
  margin-left: 25px;
}

.footer_two {
  overflow: hidden;
  clear: both;
  height: 76px;
  border-top: 1px solid #666666;
  padding-top: 18px;
  box-sizing: border-box;
}

.footer_one > div {
  float: left;
  overflow: hidden;
  margin-right: 140px;
}

.footer_one > div:last-child {
  margin: 0;
}

.footer_two > div {
  float: left;
  overflow: hidden;
  line-height: 22px;
  font-size: 12px;
  color: #c5c5c5;
  margin-right: 90px;
}

.footer_two > div > div {
  clear: both;
}

.footer_two > div:nth-child(1) {
  margin-right: 40px;
}

.footer_two > div:last-child {
  margin-right: 0px;
}

.footer_bottom {
  height: 40px;
  min-width: 1200px;
  background: #25272a;
  font-size: 12px;
  color: #999999;
  text-align: center;
  line-height: 40px;
}

.ivu-layout-footer {
  padding: 0 !important;
}
</style>
