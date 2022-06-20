<template>
  <div class="header_menu">
    <div class="header_menu_cont">
      <div class="header_menu_cont_ul">
        <div
          class="header_menu_cont_ul_cont"
          :class="maskShow == true ? 'menuHieght' : ''"
        >
          <div class="header_menu_cont_ul_cont_title">
            <router-link style="color:#ffffff" to="/qualityIndex"
              >质量知识服务云平台</router-link
            >
          </div>
          <div class="header_menu_cont_ul_cont_l">
            <div :class="$route.path === '/quality_private' ? 'active' : ''">
              <router-link to="/quality_private">质量知识展示</router-link>
            </div>
            <div
              :class="
                $route.path === '/TableList/NewDataUpload' ? 'active' : ''
              "
            >
              <router-link to="/TableList/NewDataUpload">数据管理</router-link>
            </div>
            <div
              :class="
                $route.path === '/TableList/TaskManagementDetailsFirst'
                  ? 'active'
                  : ''
              "
            >
              <router-link to="/TableList/TaskManagementDetailsFirst"
                >知识加工</router-link
              >
            </div>
            <div
              :class="
                $route.path === '/qualityWikipediaRecommend' ? 'active' : ''
              "
            >
              <router-link to="/qualityWikipediaRecommend"
                >知识推送</router-link
              >
            </div>
          </div>
        </div>
        <div
          @mousemove="handmoveMask"
          @mouseleave="handleaveMask"
          class="header_menu_cont_login"
          v-if="$store.state.user.isLogin != true"
        >
          <div @click="toLogin()">登录</div>
          <div @click="toRegister()">注册</div>
        </div>
        <div
          class="header_menu_cont_login"
          @mousemove="handmoveMask"
          @mouseleave="handleaveMask"
          v-else
        >
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
    // this.axiosMenu();
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
  .header_menu_cont_ul_cont_l {
    display: flex;
    height: 46px;
    .active {
      background: #317ef3;
    }
    & > div {
      font-size: 16px;
      line-height: 46px;
      width: 130px;
      text-align: center;
      cursor: pointer;
      & > a {
        color: #ffffff;
        display: block;
      }
    }
    & > div:hover {
      background: #317ef3;
    }
  }
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
          background: #3388ff;

          & > .header_menu_li_sbox_all > a {
            color: #c4ddff;
          }
          & > .header_menu_li_sbox_all:hover > a {
            color: #ffffff;
          }
          & > .header_menu_li_sbox_all:hover span {
            color: #ffffff;
          }
          & > .header_menu_li_sbox_all:hover {
            background: #317ef3;
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
        }
      }
      .menuHieght {
        height: 104px;
      }

      .header_menu_cont_ul_cont {
        overflow: hidden;
        float: left;
        color: #ffffff;
        align-items: center;
        .header_menu_cont_ul_cont_title {
          width: 290px;
          height: 46px;
          line-height: 46px;
          display: flex;
          font-size: 20px;
          float: left;
        }
      }
    }
  }

  .header_menu_mask {
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 99;
    opacity: 0.9;
  }

  .a_hover {
    padding-bottom: 3px;
  }
}
</style>
