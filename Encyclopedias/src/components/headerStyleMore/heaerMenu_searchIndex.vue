<template>
  <div
    class="searchHeader"
    :class="$route.path == '/semanticSearch' ? 'searchStyle' : ''"
  >
    <div class="searchHeader_cont">
      <div
        style="height:70px;display:flex;justify-content: center;align-items: center;cursor: pointer;"
      >
        <router-link
          to="/digitalQuality"
          style="display:flex;justify-content: center;align-items: center;"
        >
          <img
            v-if="$route.path == '/semanticSearch'"
            src="@/img/avicLogo_w.png"
            alt=""
          />
          <img v-else src="@/img/avicLogo.png" alt="" />
          <span class="bigText">航空数智服务</span>
          <span class="shuxian">|</span>
          <span
            class="small_text"
            v-if="
              $route.path == '/searchIndex' || $route.path == '/semanticSearch'
            "
            >知识检索</span
          >
          <span
            class="small_text"
            v-if="
              $route.path == '/helpCenter/our' ||
                $route.path == '/helpCenter/copyright' ||
                $route.path == '/helpCenter/encyclopediasHelp' ||
                $route.path == '/helpCenter/exemption' ||
                $route.path == '/helpCenter/introduce'
            "
            >帮助中心</span
          >
        </router-link>
      </div>
      <div class="searchBox" v-if="$route.path == '/semanticSearch'">
        <div style="position: relative;display:flex;">
          <Select v-model="search_list_val" style="width:100px;">
            <Option
              v-for="(item, index) in search_list"
              :key="index"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
          <div style="display:flex;position:relative;">
            <Input
              v-model="searchWord"
              @on-change="specifiName()"
              @on-enter="spendBtn()"
              placeholder="请输入关键字"
              class="search_input"
            />
            <ul class="relatedword" v-if="relatedwordShow">
              <li
                v-for="(item, index) in relatedwordBox"
                :key="index"
                @click="relatedwordText(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <Button
            @click="searchBtn()"
            style="width: 42px;height: 40px;overflow: hidden;border-left:0;color:#9d9fa4"
            icon="ios-search"
          ></Button>
        </div>
      </div>
      <div
        style="display:flex;    align-items: center;"
        @mousemove="handmoveMask"
        @mouseleave="handleaveMask"
      >
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
            <div class="header_menu_li_sbox" v-show="maskShow">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  inject: ["reload"],
  props: {},
  data() {
    return {
      maskShow: false,
      search_list: [], 
      search_list_val: "", 
      ajaxShow: true,
      relatedwordShow: false, 
      searchWord: "",
      relatedwordBox: [],
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.reload();
      },
    },
  },
  computed: {},
  methods: {
    searchBtn() {
      if (this.searchWord == "") {
        (this.relatedwordShow = false),
          this.$Message.warning({
            duration: 5,
            background: true,
            content: "当前输入值为空",
          });
      } else {
        this.relatedwordShow = false;
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
    loadData() {
      this.$axios("/baike/sousuo/search_homepage", "post").then((res) => {
        this.search_list = res.data.search_list;
        this.search_list_val = res.data.search_list[0];
      });
    },
    handmoveMask() {
      this.maskShow = true;
    },
    handleaveMask() {
      this.maskShow = false;
    },
    spendBtn() {
      this.searchBtn();
    },
    relatedwordText(val) {
      this.ajaxShow = false;
      this.relatedwordShow = false;
      this.searchWord = val;
      this.ajaxShow = true;
    },
    specifiName() {
      if (this.ajaxShow === true) {
        this.relatedwordShow = true;

        this.$axios(
          "/baike/sousuo/search_relatedword",
          "post",
          this.$qs.stringify({
            query: this.searchWord,
          })
        ).then((res) => {
          this.relatedwordBox = res.data.data;
        });
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
    toUserCenter() {
      this.$router.push("/userAdmin/mineInfo");
      this.handleaveMask();
    },
  },
  created() {},
  mounted() {
    if (this.$route.query.val != undefined) {
      this.searchWord = this.$route.query.val;
    }
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
.searchBox {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  // 下拉框
  /deep/ .ivu-select {
    width: 104px !important;
  }

  /deep/ .ivu-select-selection {
    width: 104px;
    height: 40px;
    border: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-color: #dcdee2;
    outline: 0;
    box-shadow: none;
  }
  /deep/ .ivu-select-selection-focused,
  .ivu-select-selection:hover {
    border: none;
  }
  /deep/ .ivu-select-placeholder,
  /deep/ .ivu-select-selected-value {
    height: 40px !important;
    line-height: 40px !important;
    text-align: center;
  }
  /deep/ .ivu-select-placeholder {
    padding-left: 14px;
  }
  /deep/ .ivu-input {
    height: 100% !important;
    border-radius: 0;
    border-color: #dcdee2 !important;
  }
  /deep/ .ivu-input:hover {
    border-color: #dcdee2;
  }
  /deep/ .ivu-input:focus {
    box-shadow: none;
  }
  /deep/ .ivu-select-dropdown {
    box-shadow: none;
    margin: 0px;
    padding: 0px;
    top: 40px !important;
  }
  /deep/ .ivu-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 16px;
    .ivu-icon {
      font-size: 22px;
      vertical-align: middle;
      margin-top: -1 px;
      margin-right: -5 px;
      line-height: 42px;
    }
  }
}
.ivu-btn:hover {
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
}
.ivu-input:focus {
  border-color: #dcdee2;
}
.searchStyle {
  background: #3388ff !important;
  color: #ffffff;
  .bigText {
    color: #ffffff !important;
  }
  .shuxian {
    color: #ffffff !important;
  }
  .small_text {
    color: #ffffff !important;
  }
  .header_menu_cont_login {
    color: #ffffff;
    & > div {
      color: #ffffff;
    }
  }
  .header_menu_cont_login > div:hover {
    color: #ffffff;
  }
  .header_menu_li_list {
    background: #3388ff;
    overflow: hidden;
    color: #ffffff;
    & > .header_menu_li_sbox_all > a {
      color: #ffffff;
    }
    & > .header_menu_li_sbox_all:hover > a {
      color: #ffffff;
      text-decoration: underline;
    }
    & > .header_menu_li_sbox_all:hover span {
      color: #ffffff;
    }
  }
}
.relatedword {
  overflow: hidden;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 40px;
  z-index: 99999;
  li {
    padding: 0 10px;
    color: #666666;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    // display: flex;
    // align-items: center;
    cursor: pointer;
    line-height: 40px;
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > li:hover {
    color: #3388ff;
  }
}
.searchHeader {
  width: 100%;
  height: 70px;
  background: #ffffff;
  .small_text {
    font-size: 18px;
    color: #3f424b;
  }
  .shuxian {
    margin: 0 10px;
    font-size: 20px;
    color: #d4d4d4;
  }
  .bigText {
    font-size: 24px;
    color: #282828;
    margin-left: 12px;
    font-weight: 600;
  }
  .searchHeader_cont {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    & > div:nth-child(1) {
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #3f424b;
    }
  }
}
.search_input {
  width: 480px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 40px;
  line-height: 40px;
  /deep/ .ivu-input {
    height: 40px;
    box-shadow: none;
    line-height: 40px;
    border-radius: 0;
    float: left;
    border-right: 0;
  }
}
.header_menu_cont_login {
  display: flex;
  font-size: 16px;
}
.header_menu_cont_login > div {
  color: #333333;
}
.header_menu_cont_login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  height: 100%;
  .header_menu_li_list {
    background: #3388ff;
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #333333;
  }
  & > div:hover {
    color: #3388ff;
  }
  & > div:hover a {
    background: #3388ff !important;
  }
  & > div:nth-child(2) {
    margin-left: 42px;
  }
  .header_menu_li_sbox {
    position: absolute;
    width: 100%;
    top: 70px;
    z-index: 99;

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
</style>
