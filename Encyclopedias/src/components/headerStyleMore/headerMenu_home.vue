<template>
  <div class="header_menu">
    <div
      class="header_menu_cont"
      :class="maskShow == true ? 'noHidden' : 'haveHidden '"
    >
      <div
        class="header_menu_cont_ul"
        @mousemove="handmoveMask"
        @mouseleave="handleaveMask"
      >
        <div
          style="height:70px;display:flex;justify-content: center;align-items: center;cursor: pointer;"
        >
          <router-link
            to="/digitalQuality"
            style="display:flex;justify-content: center;align-items: center;"
          >
            <img src="@/img/avicLogo_w.png" alt="" />
            <span
              style="font-size:24px;color:#ffffff;margin-left:12px;font-weight:600"
              >航空数智服务</span
            >
            <span
              v-if="$route.path != '/digitalQuality'"
              style="margin:0 10px;font-size:20px;color:#ffffff"
              >|</span
            >
            <span style="font-size:18px;color:#ffffff">{{ nowPageType }} </span>
          </router-link>
        </div>
        <div
          class="header_menu_cont_ul_cont"
          :class="maskShow == true ? 'menuHieght' : ''"
        >
          <div :key="index" v-for="(firstData, index) in menuList">
            <template v-if="firstData.hasAuth">
              <template v-if="firstData.routingIsRaw == '1'">
                <a
                  target="_blank"
                  style="color: #ffffff"
                  :href="firstData.routing"
                  >{{ firstData.name }}</a
                >
              </template>
              <template v-else>
                <router-link
                  style="color: #ffffff"
                  v-if="firstData.routing"
                  :to="{ path: firstData.routing }"
                >
                  {{ firstData.name }}
                </router-link>
                <span v-else @click="firstHref(firstData.routing)">{{
                  firstData.name
                }}</span>
              </template>
            </template>
            <div class="header_menu_li_sbox" v-if="maskShow">
              <div class="header_menu_li_list">
                <div
                  class="header_menu_li_sbox_all"
                  :key="index"
                  v-for="(secondData, index) in firstData.childInfo"
                >
                  <span class="header_menu_li_sbox_l">
                    <template v-if="firstData.hasAuth && secondData.hasAuth">
                      <template v-if="secondData.routingIsRaw == '1'">
                        <a
                          target="_blank"
                          style="color: #ffffff"
                          :href="secondData.routing"
                          >{{ secondData.name }}</a
                        >
                      </template>
                      <template v-else>
                        <router-link
                          v-if="secondData.routing"
                          :to="{ path: secondData.routing }"
                        >
                          {{ secondData.name }}</router-link
                        >
                        <span
                          style="line-height: 20px"
                          v-else
                          @click="secondHref(secondData.routing)"
                          >{{ secondData.name }}</span
                        >
                      </template>
                    </template>
                  </span>
                  <div class="header_menu_li_sbox_r">
                    <div
                      :key="index"
                      v-for="(third, index) in secondData.childInfo"
                    >
                      <template
                        v-if="
                          firstData.hasAuth &&
                            secondData.hasAuth &&
                            third.hasAuth
                        "
                      >
                        <template v-if="third.routingIsRaw == '1'">
                          <a
                            target="_blank"
                            style="color: #ffffff"
                            :href="third.routing"
                            >{{ third.name }}</a
                          >
                        </template>
                        <template v-else>
                          <router-link
                            v-if="third.routing"
                            :to="{ path: third.routing }"
                          >
                            {{ third.name }}
                          </router-link>
                          <span v-else @click="thirdHref(third.routing)">{{
                            third.name
                          }}</span>
                        </template>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="noneInput"
          class="inputSearch"
          :class="$route.path == '/home' ? 'span_w' : 'span_none'"
        >
          <span style="position:relative">
            <AssociativeWords
              @searchWord="haveSearchWord"
              @searchBtn="spendBtn"
            />
          </span>
          <p class="searchBox">
            <Button
              :class="$route.path == '/home' ? 'span_w' : 'span_none'"
              @click="searchBtn()"
              style="width: 42px;height: 40px;overflow: hidden;border-left:0;color:#9d9fa4"
              icon="ios-search"
            ></Button>
          </p>
        </div>
        <div
          class="header_menu_cont_login2"
          v-if="$store.state.user.isLogin != true"
        >
          <div @click="toLogin()">登录</div>
          <div @click="toRegister()">注册</div>
        </div>
        <div class="header_menu_cont_login" v-else>
          <div>
            当前登录：{{
              !$store.state.user.userInfo
                ? "游客登录"
                : this.$store.state.user.userInfo.name
            }}
            <div class="header_menu_li_sbox" v-if="maskShow">
              <div
                class="header_menu_li_list"
                v-if="!$store.state.user.userInfo"
              >
                <div class="header_menu_li_sbox_all" @click="logout()">
                  <span class="header_menu_li_sbox_l" style="line-height: 30px"
                    >退出登录</span
                  >
                </div>
              </div>
              <div class="header_menu_li_list" v-else>
                <div class="header_menu_li_sbox_all">
                  <span
                    class="header_menu_li_sbox_l"
                    style="line-height: 30px"
                    @click="toUserCenter()"
                    >用户中心</span
                  >
                </div>
                <div class="header_menu_li_sbox_all">
                  <span
                    class="header_menu_li_sbox_l"
                    style="line-height: 30px"
                    @click="logout()"
                    >退出登录</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header_menu_mask" v-if="maskShow"></div>
    </div>
  </div>
</template>

<script>
import AssociativeWords from "@/components/associativeWords.vue"; 
import {
  url_power_magicBox,
  url_power_magicMirror,
  url_power_magicSquare,
  whiteList,
  url_power_quality,
} from "@/libs/url_power.js";
export default {
  name: "HeaderMenu",
  components: { AssociativeWords },
  props: ["islogin"],
  data() {
    return {
      maskShow: false,
      menuList: [],
      searchWord: "",
      isMagicBox: false,
      isMagicMirror: false,
      isMagicSquare: false,
      isBk: false,
      noneInput: false,
      isQuality: false,
      nowPageType: "",
    };
  },
  mounted() {
    this.firstDataLoad();
  },
  methods: {
    firstDataLoad() {
      this.isMagicBox = url_power_magicBox.includes(this.$route.path);
      this.isMagicMirror = url_power_magicMirror.includes(this.$route.path);
      this.isMagicSquare = url_power_magicSquare.includes(this.$route.path);
      this.isBk = whiteList.includes(this.$route.path);
      this.isQuality = url_power_quality.includes(this.$route.path);
      if (this.isBk == false) {
        this.nowPageType = "航空百科";
      } else if (this.isMagicBox) {
        this.nowPageType = "算法魔盒";
      } else if (this.isMagicMirror) {
        this.nowPageType = "知识魔镜";
      } else if (this.isMagicSquare) {
        this.nowPageType = "数据魔方";
      } else if (this.$route.path == "/practice") {
        this.nowPageType = "数知服务";
      } else if (this.isQuality) {
        this.nowPageType = "智慧质量";
      } else if (this.$route.path == "/digitalQuality") {
        this.nowPageType = "";
      }

      if (
        this.isMagicMirror == false &&
        this.isMagicBox == false &&
        this.isMagicSquare == false &&
        this.isQuality == false
      ) {
        this.noneInput = true;
      } else {
        this.noneInput = false;
      }
      this.axiosMenu();
    },
    // 点击触发搜索
    searchBtn() {
      if (this.searchWord == "") {
        this.$Message.warning({
          duration: 5,
          background: true,
          content: "当前输入值为空",
        });
      } else {
        if (this.search_list_val == "知识探索") {
          this.$store.commit("updated_searchType", "知识探索");
        } else if (this.search_list_val == "科研辅助") {
          this.$store.commit("updated_searchType", "科研辅助");
        } else if (this.search_list_val == "标准检索") {
          this.$store.commit("updated_searchType", "标准查询");
        } else if (this.search_list_val == "质量查询") {
          this.$store.commit("updated_searchType", "质量查询");
        } else if (this.search_list_val == "专家查询") {
          this.$store.commit("updated_searchType", "科研辅助");
        } else {
          this.$store.commit("updated_searchType", "知识探索");
        }
        this.$router.push({
          path: "/semanticSearch",
          query: {
            val: this.searchWord,
            data: Date.parse(new Date()),
          },
        });
      }
    },
    haveSearchWord(val) {
      this.searchWord = val;
    },
    spendBtn(key) {
      this.searchWord = key;
      this.searchBtn();
    },
    firstHref(val) {
      //  this.$Message.info('建设中');
      return false;
    },
    secondHref(val) {
      if (val == "") {
        this.$Message.info("建设中");
        return false;
      }
    },
    thirdHref(val) {
      if (val == "") {
        this.$Message.info("建设中");
        return false;
      }
    },
    logout() {
      this.$store.dispatch("storageUserInfo", ""); // 清空用户信息
      this.$store.dispatch("storageToken", ""); // 清空用户token
      this.$store.dispatch("storageisLogin", false); // 清空用户登录状态
      this.$store.dispatch("storageChatHistory", []); // 清空聊天记录
      this.$store.dispatch("storageChatHistoryLoad", false); // 加载过机器人聊天记录
      this.$router.push("/");
      this.handleaveMask();
    },
    toLogin() {
      this.$store.dispatch("storageUserInfo", ""); // 将用户信息存储到vuex里面
      this.$store.dispatch("storageToken", ""); // 清空用户token
      this.$router.push("/login");
      this.handleaveMask();
    },
    toRegister() {
      this.$store.dispatch("storageUserInfo", ""); // 将用户信息存储到vuex里面
      this.$store.dispatch("storageToken", ""); // 清空用户token
      this.$router.push("/register");
      this.handleaveMask();
    },
    toUserCenter() {
      this.$router.push("/userAdmin/mineInfo");
      this.handleaveMask();
    },
    // 移入移出
    handmoveMask() {
      this.maskShow = true;
    },
    handleaveMask() {
      this.maskShow = false;
    },
    axiosMenu() {
      if (this.nowPageType != "") {
        var parms = { page_name: this.nowPageType };
      } else {
        var parms = { page_name: "首页" };
      }
      this.$axios("/users/get_menu", "post", this.$qs.stringify(parms)).then(
        (res) => {
          this.menuList = res.data.data.auth;
        }
      );
    },
    menu_btn_1() {
      this.$store.commit("updated_Menu_top_active", "上传记录管理");
      this.$router.push({
        name: "UploadRecordManagement",
      });
    },
    menu_btn_2() {
      this.$store.commit("updated_Menu_top_active", "任务管理");
      this.$router.push({
        name: "TaskManagement",
      });
    },
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        if (!newRoute || !oldRoute) return false;
        if (newRoute.path === oldRoute.path) return false;
        this.firstDataLoad();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.haveHidden {
  height: 70px;
}
.noHidden {
  overflow: initial;
}
.header_menu {
  height: 70px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  .header_menu_cont {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    .header_menu_cont_ul {
      position: relative;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      .header_menu_cont_login {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        height: 69px;
        .header_menu_li_list {
          overflow: hidden;
          color: #c4ddff;
          & > .header_menu_li_sbox_all > a {
            color: #c4ddff;
          }
          & > .header_menu_li_sbox_all:hover > a {
            color: #ffffff;
            text-decoration: underline;
          }
          & > .header_menu_li_sbox_all:hover span {
            color: #ffffff;
          }
        }
        & > div {
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: #ffffff;
          padding: 0 10px;
        }
        & > div:hover {
          background: #3388ff !important;
        }
        & > div:hover a {
          background: #ffffff !important;
        }
        & > div:nth-child(2) {
          margin-left: 42px;
        }
        .header_menu_li_sbox {
          position: absolute;
          width: 100%;
          top: 69px;
          display: none;
          .header_menu_li_sbox_all {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            & > span {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .header_menu_li_sbox_l {
          line-height: 30px;
          color: #c4ddff;
        }
        .header_menu_li_sbox_l:hover a {
          color: #ffffff;
          text-decoration: underline;
        }
      }
      .header_menu_cont_login2 {
        display: flex;
        color: #ffffff;
        justify-content: center;
        align-items: center;
        & > div {
          cursor: pointer;
          color: #ffffff;
          margin-left: 10px;
        }
        & > div:hover {
          cursor: pointer;
          color: #3388ff !important;
          background: none;
        }
        & > a {
          cursor: pointer;
          color: #ffffff;
        }
      }
      .header_menu_cont_ul_cont {
        float: left;
        flex: 1;
        margin-left: 20px;
      }
      // .menuHieght {
      //   // height: 376px;
      // }

      & > .header_menu_cont_ul_cont > div {
        float: left;
        line-height: 70px;
        height: auto;
        color: #ffffff;
        padding: 0 9px;
        font-size: 16px;
        text-align: center;
        position: relative;
        cursor: pointer;

        .header_menu_li_sbox {
          position: absolute;
          left: 0;
          top: 70px;
          padding: 0;
          // height: 330px;
          // min-width: 250px;
          z-index: 100;
          font-size: 14px;
          display: none;
          // border-left: 1px solid #eeeeee;
          box-shadow: inset 0px 0px 1px 0px #c5c8ce,
            inset 0px 0px 0px 0px #c5c8ce, inset 0px 0px 0px 0px #c5c8ce,
            inset 0px 0px 0px 0px #c5c8ce;
          // padding-top: 10px;
          & > div {
            margin-top: 10px;
          }
          & > div > div {
            height: auto;
            line-height: 30px;
            cursor: pointer;
            & > a {
              color: #ffffff;
            }
          }
          .header_menu_li_sbox_list {
            overflow: hidden;
          }
          .header_menu_li_sbox_all {
            display: flex;
            margin-bottom: 10px;
            .header_menu_li_sbox_r {
              width: 106px;
              font-size: 12px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              // margin-top: 4px;
              & > div {
                color: #c4ddff;
                line-height: 18px;
                text-align: left;
                // margin-bottom: 2px;
                & > a {
                  color: #c4ddff;
                }
              }
              & > div:hover {
                color: #ffffff;
              }
              & > div:hover a {
                color: #ffffff;
                text-decoration: underline;
              }
            }
          }
          .header_menu_li_sbox_l {
            width: 112px;
            display: flex;
            flex-direction: initial;
            justify-content: flex-start;
            padding-left: 12px;
            box-sizing: border-box;
            color: #c4ddff;
            & > a {
              color: #c4ddff;
            }
          }
          .header_menu_li_sbox_l:hover {
            color: #ffffff;
          }
          .header_menu_li_sbox_l:hover a {
            color: #ffffff;
          }
        }
        a{
          display: inline-block;
        }
      }

      & > div > div:hover {
        background: #2377ee;
      }
      & > div > div:hover > div {
        display: block !important;
      }

      & > div > div:hover > div {
        background: #2662b7;
      }
    }
  }
  .a_hover {
    padding-bottom: 3px;
  }
}
.span_w {
  & > span {
    background: rgba(255, 255, 255);
  }
  /deep/ .ivu-btn {
    background: rgba(255, 255, 255) !important;
    border-color: rgba(255, 255, 255) !important;
  }
}
.ivu-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.span_none {
  background: none;
  /deep/ .ivu-input {
    color: #ffffff !important;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #ffffff;
  }
  /deep/ .ivu-icon {
    color: #ffffff;
  }
  /deep/ .ivu-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 16px;
    border: none;
    background: rgba(255, 255, 255, 0.3) !important;
    border: none;
  }
}
.inputSearch {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  & > span {
    width: 180px;
    height: 40px;
    display: inline-block;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    /deep/ .ivu-input {
      height: 40px !important;
      line-height: 40px;
      background: rgba(255, 255, 255, 0.3);
      border: none;
      color: #3f424b;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    /deep/ .ivu-icon {
      line-height: 40px;
      color: #ffffff;
    }
  }
  & > div:hover {
    background: rgba(255, 255, 255, 0.3) !important;
  }
  .ivu-btn:hover {
    border-color: #e3e5e8;
  }
}
</style>
