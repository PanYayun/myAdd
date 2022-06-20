<template>
  <div class="header flex" :class="{ indexPage: indexPage }">
    <div
      style="height:70px;display:flex;justify-content: center;align-items: center;cursor: pointer;"
    >
      <router-link
        to="/digitalQuality"
        style="display:flex;justify-content: center;align-items: center;"
      >
        <img src="@/img/avicLogo_w.png" alt="" />
        <span class="bigText">航空数智服务</span>
        <span class="shuxian">|</span>
        <span class="small_text">智慧标准</span></router-link
      >
    </div>
    <div class="nav flex">
      <ul class="flex">
        <!-- <li @click="$router.push('/home')" v-if="homeMadol">航空百科</li> -->
        <li @click="$router.push('/standard/index')" v-if="!homeMadol">首页</li>
        <li
          :class="$route.path == item.path ? 'active' : ''"
          v-for="(item, index) in navList"
          :key="index"
          @click="$router.push(item.path)"
        >
          {{ item.name }}
        </li>
      </ul>
      <Input
        search
        placeholder="请输入..."
        style="width: 260px;height:40px;line-height:40px;"
        @on-search="searchResult"
        v-model="value"
        v-if="$route.path != '/standard/index'"
      ></Input>
    </div>
    <div class="login flex" v-if="$store.state.user.isLogin != true">
      <div style="color:#ffffff; cursor: pointer;" @click="toLogin()">登录</div>
      <div
        style="color:#ffffff;margin-left:20px; cursor: pointer;"
        @click="toRegister()"
      >
        注册
      </div>
    </div>
    <div
      class="header_menu_cont_login"
      v-else
      @mousemove="handmoveMask"
      @mouseleave="handleaveMask"
    >
      <div style="color:#ffffff;white-space: nowrap;">
        当前登录：{{
          !$store.state.user.userInfo
            ? "游客登录"
            : this.$store.state.user.userInfo.name
        }}
        <div class="header_menu_li_sbox" v-if="maskShow">
          <div class="header_menu_li_list" v-if="!$store.state.user.userInfo">
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
</template>

<script>
export default {
  data() {
    return {
      value: "",
      maskShow: false,
      homeMadol: true, //是否显示航空百科 首页
      // homeMadol: false, //是否显示航空百科

      navList: [
      { name: "标准检索", path: "/standard/index" },
      { name: "公共体系", path: "/standard/standardSystem" },
      { name: "个人体系", path: "/standard/stardardPersonSys" },
      { name: "需求管理", path: "/standard/demandAdmin" },
      { name: "标准统计", path: "/standard/standardStatistics" },
      { name: "立项查新", path: "/standard/lixiangQuery" },

      
        // { name: "标准体系", path: "/standard/standardSystem" },
        // // {name:'检索结果',path:'/standard/searchingResult'},
        // // {name:'标准动态',path:'/standard/standardDynamic'},
        // { name: "个性知识", path: "/standard/personalityKnowledge" },
        // { name: "标准统计", path: "/standard/standardStatistics" },
        // { name: "需求管理", path: "/standard/demandAdmin" },
      ],
    };
  },
  mounted() {
    this.value = this.$store.state.standard.searchingVal;
    if (this.$route.path === "/standard/index") {
      this.homeMadol = true;
    } else {
      // this.homeMadol = false;
      this.homeMadol = true;
    }
  },
  computed: {
    indexPage: function() {
      return this.$route.path == "/standard/index";
    },
  },
  methods: {
    searchResult() {
      if (this.value == "") {
        this.$Message.warning("请输入检索信息");
        return false;
      }
      this.$router.push("/standard/searchingResult");
      this.$store.dispatch("setVal", this.value);
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
    logout() {
      this.$store.dispatch("storageUserInfo", ""); // 清空用户信息
      this.$store.dispatch("storageToken", ""); // 清空用户token
      this.$store.dispatch("storageisLogin", false); // 清空用户登录状态
      this.$store.dispatch("storageChatHistory", []); // 清空聊天记录
      this.$store.dispatch("storageChatHistoryLoad", false); // 加载过机器人聊天记录
      this.$router.push(this.$store.state.user.HomeYe);
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
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/standard/index") {
        this.homeMadol = true;
      } else {
        // this.homeMadol = false;
        this.homeMadol = true;

      }
    },
    "$store.state.standard.searchingVal": function(newVal, oldVal) {
      this.value = newVal;
    },
  },
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.header_menu_li_sbox {
  position: relative;
  background: #3388ff;
}
.header_menu_cont_login {
  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.header_menu_li_list {
  width: 100%;
  text-align: center;
  background: #3388ff;
  position: absolute;
  left: 0;
  top: 18px;
  cursor: pointer;
  z-index: 100;
}
.small_text {
  font-size: 18px;
  color: #3f424b;
  white-space: nowrap;
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
  white-space: nowrap;
}
.bigText {
  color: #ffffff !important;
}
.shuxian {
  color: #ffffff !important;
}
.small_text {
  color: #ffffff !important;
}
.header {
  padding: 0px 40px;
  height: 70px;
  background: #3388ff;
  align-items: center;
  // width: 1200px;
  // margin: 0 auto;
  .logo {
    align-items: center;
    span {
      font-size: 18px;
      color: white;
      padding-left: 25px;
      position: relative;
    }
    span:before {
      position: absolute;
      content: "";
      width: 2px;
      height: 17px;
      left: 15px;
      top: 4px;
      background: white;
    }
  }

  .nav {
    flex: 1;
    align-items: center;
    justify-content: center;
    /deep/ .ivu-input {
      height: 40px;
      line-height: 40px;
    }
    /deep/ .ivu-input-icon {
      height: 40px;
      line-height: 40px;
    }
    ul {
      margin-right: 50px;

      li {
        width: 104px;
        height: 70px;
        color: white;
        line-height: 70px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;

        &:hover {
          background: #1e74eb;
        }
      }
      .active {
        background: #1e74eb;
      }
    }
  }

  .login {
    align-items: center;

    span {
      font-size: 14px;
      color: white;
      margin-right: 10px;
      cursor: pointer;
    }

    button {
      width: 52px;
      height: 22px;
      background: white;
      color: #3388ff;
      font-size: 14px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}
.indexPage {
  background: #3388ff;
  .register_btn {
    background: #3388ff !important;
    color: white !important;
  }
}
</style>
