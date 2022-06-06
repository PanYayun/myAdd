<template>
  <!-- 顶部检索 -->
  <div class="layout_container" style="display: flex">
    <div style="display:flex;align-items: center;">
      <router-link
        to="/digitalQuality"
        style="display:flex;justify-content: center;align-items: center;"
      >
        <img src="@/img/avicLogo.png" alt="" />
        <span
          style="  font-size: 24px;
    color: #282828;
    margin-left: 12px;
    font-weight: 600;"
          >航空数智服务</span
        >
        <span
          style=" margin: 0 10px;
    font-size: 20px;
    color: #d4d4d4;"
          >|</span
        >
        <span
          style=" font-size: 18px;
    color: #3f424b;"
          >知识检索</span
        >
      </router-link>
    </div>
    <div
      style="height: 104px; display: flex; align-items: center; position: relative;margin-left:50px;"
    >
      <Select v-model="search_list_val" style="width:100px;height:40px;">
        <Option
          v-for="(item, index) in search_list"
          :key="index"
          :value="item"
          >{{ item }}</Option
        >
      </Select>
      <Input
        class="search_input"
        :placeholder="defVal"
        v-model="Input_seach_data_1"
        @on-change="specifiName()"
        @on-enter="spendBtn()"
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
      <!-- <Button style="border-top-left-radius: 0; border-bottom-left-radius: 0; width: 100px; height: 40px" type="primary" search @click="searchBtn()">知识发现</Button>
            <Button type="primary" ghost style="margin-left: 12px; width: 100px; height: 40px" @click="handShow()">智能问答</Button> -->
      <Button
        style="border-top-left-radius: 0; border-bottom-left-radius: 0; width: 90px; height: 40px"
        type="primary"
        search
        @click="searchBtn()"
      >
        <Icon
          type="ios-search"
          style="font-size:20px;float: left;margin-right: 4px;"
        />检索
      </Button>
      <Button
        type="primary"
        ghost
        style="margin-left: 12px; width: 100px; height: 40px"
      >
        <router-link to="/pictureSearch" style="color:#3388ff"
          >跨模态检索</router-link
        >
      </Button>
    </div>
    <intelligent-chat :isShowChat2="isShowChat" ref="chat"></intelligent-chat>
  </div>
</template>
<script>
import IntelligentChat from "@/components/IntelligentChat.vue";

export default {
  name: "HeaderSearch",
  props: {
    isShowChat2: {
      isightBox: true,
    },
  },

  components: {
    IntelligentChat,
  },
  inject: ["reload"],
  data() {
    return {
      // 第一个输入框的值
      Input_seach_data_1: "",
      relatedwordBox: "",
      relatedwordShow: false,
      ajaxShow: true,
      isShowChat: false,
      search_list_val: "",
      search_list: [],
      defVal: "",
    };
  },
  methods: {
    loadData() {
      this.$axios("/baike/sousuo/search_homepage", "post").then((res) => {
        this.search_list = res.data.search_list;
        this.search_list_val = res.data.search_list[0];
        this.defVal = res.data.sentence_in_search;
      });
    },
    // 点击logo去首页
    gotoHome() {
      this.$router.push("/");
    },
    // 回车触发
    spendBtn() {
      this.searchBtn();
    },
    // 判断是否弹出对话框
    handShow() {
      this.isShowChat = !this.isShowChat;
      this.$refs.chat.scrollToBottom(); // 对话框 内容滑到底部
    },
    // 点击触发搜索
    searchBtn() {
      if (this.Input_seach_data_1 == "") {
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
            val: this.Input_seach_data_1,
          },
        });
      }
    },
    // 触发联想词
    specifiName() {
      if (this.ajaxShow === true) {
        this.relatedwordShow = true;

        this.$axios(
          "/baike/sousuo/search_relatedword",
          "post",
          this.$qs.stringify({
            query: this.Input_seach_data_1,
          })
        ).then((res) => {
          this.relatedwordBox = res.data.data;
        });
      }
    },
    // 点击联想词
    relatedwordText(val) {
      this.ajaxShow = false;
      this.relatedwordShow = false;
      this.Input_seach_data_1 = val;
      this.ajaxShow = true;
    },
    // 页面已加载触发默认词
    urlText() {
      this.Input_seach_data_1 = this.$route.query.val;
    },
  },
  mounted() {
    this.urlText();
    this.loadData();
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.Input_seach_data_1 = val.query.val;
        if (val.query.val) {
          this.reload();
        }
      },
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.layout_container {
  /deep/ .ivu-select-selected-value {
    height: 40px !important;
    line-height: 40px !important;
    text-align: center;
  }
  /deep/ .ivu-select-selection {
    height: 40px;
    line-height: 40px;
    border-radius: 0;
    border-right: 0;
    border-color: #dcdee2;
    outline: 0;
    box-shadow: none;
  }
  /deep/ .ivu-select-placeholder {
    padding-left: 14px;
  }
  /deep/ .ivu-input:focus {
    border-color: #dcdee2;
  }
  /deep/ .ivu-input:hover {
    border-color: #dcdee2;
  }
  /deep/ .ivu-select-selection:hover {
    border-color: #dcdee2;
  }
}
.relatedword {
  overflow: hidden;
  width: 528px;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: absolute;
  left: 0;
  top: 72px;
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
.search_input {
  width: 528px;
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
  }
}
</style>
