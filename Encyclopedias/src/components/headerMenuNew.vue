<template>
  <div class="header_menu">
    <div class="header_menu_cont">
      <div
        class="header_menu_cont_ul"
        @mousemove="handmoveMask"
        @mouseleave="handleaveMask"
      >
        <div
          class="header_menu_cont_ul_cont"
          :class="maskShow == true ? 'menuHieght' : ''"
        >
          <div :key="index" v-for="(firstData, index) in menuList">
            <template v-if="firstData.hasAuth">
              <template v-if="firstData.routingIsRaw == '1'">
                <a
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
          class="header_menu_cont_login"
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
import store from "@/store";
export default {
  name: "HeaderMenu",
  props: ["islogin"],
  data() {
    return {
      maskShow: false,
      menuList: [],
    };
  },
  mounted() {
    this.axiosMenu();
  },
  methods: {
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
      const { userInfo } = this.$store.state.user;
      const username = userInfo ? userInfo.username : "AnonymousUser";
      this.$axios("/users/auth", "post", { username }).then((res) => {
        this.menuList = res.data.data.auth;
      });
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
};
</script>

<style lang="less" scoped>
.header_menu {
  height: 46px;
  background: #3388ff;
  position: relative;
  .header_menu_cont {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    background: #3388ff;
    .header_menu_cont_ul {
      overflow: hidden;
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
        height: 46px;
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
          height: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: #ffffff;
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
          top: 45px;
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
      .header_menu_cont_ul_cont {
        overflow: hidden;
        float: left;
      }
      .menuHieght {
        height: 376px;
      }

      & > .header_menu_cont_ul_cont > div {
        float: left;
        line-height: 46px;
        height: auto;
        color: #ffffff;
        width: 220px;
        font-size: 16px;
        text-align: center;
        position: relative;
        cursor: pointer;

        .header_menu_li_sbox {
          position: absolute;
          left: 0;
          top: 46px;
          width: 220px;
          height: 330px;
          z-index: 100;
          font-size: 14px;
          // border-left: 1px solid #eeeeee;
          box-shadow: inset 0px 0px 1px 0px #c5c8ce,
            inset 0px 0px 0px 0px #c5c8ce, inset 0px 0px 0px 0px #c5c8ce,
            inset 0px 0px 0px 0px #c5c8ce;
          padding-top: 10px;

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
      }

      & > div > div:hover {
        background: #2377ee;
      }

      & > div > div:hover > div {
        background: #2662b7;
      }
    }
  }

  .header_menu_mask {
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
    height: 330px;
    background: #4681d3;
    z-index: 99;
    opacity: 0.9;
  }

  .a_hover {
    padding-bottom: 3px;
  }
}
</style>
