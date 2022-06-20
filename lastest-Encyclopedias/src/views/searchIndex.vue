<template>
  <div
    style="background:#0a59c8;justify-content: center;display: flex;flex-direction: column;justify-content: center;align-items: center;"
  >
    <div class="bodyCont">
      <div class="bodyCont_c">
        <!-- 背景图谱的文字 -->
        <div class="bkWord">
          <div
            style="cursor:pointer"
            v-for="(item, index) in background_word"
            @click="gotoPage2(item)"
            :key="index"
            :class="'bkWord_' + (index + 1)"
          >
            {{ item }}
          </div>
        </div>
        <div style="width:100%;text-align:center">
          <div
            style="font-size:40px;line-height:40px;color:#ffffff;font-weight:600;margin-bottom:18px;margin-top:100px;"
          >
            {{ searchTitle }}
          </div>
          <div style="font-size:16px;line-height:16px;color:#ffffff;">
            {{ intro }}
          </div>
        </div>
        <div class="searchBox">
          <div style="margin-left: 90px;position: relative;">
            <Select v-model="search_list_val" style="width:100px">
              <Option
                v-for="(item, index) in search_list"
                :key="index"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
            <Input
              v-model="searchWord"
              @on-change="specifiName()"
              @on-enter="spendBtn()"
              :placeholder="defVal"
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
            <Button
              @click="searchBtn()"
              type="primary"
              style="width: 100px;height: 50px;overflow: hidden;"
              icon="ios-search"
              >检索</Button
            >
          </div>
          <div style="color:#ffffff;font-size:16px;margin-left:16px;">
            <router-link to="/pictureSearch" style="color:#ffffff"
              >跨模态检索</router-link
            >
          </div>
        </div>
        <div class="iconBox">
          <div v-for="(item, index) in statistics" :key="index">
            <img
              v-if="index == '0'"
              src="../img/searchIndex/icon1.png"
              alt=""
            />
            <img
              v-if="index == '1'"
              src="../img/searchIndex/icon2.png"
              alt=""
            />
            <img
              v-if="index == '2'"
              src="../img/searchIndex/icon3.png"
              alt=""
            />
            <img
              v-if="index == '3'"
              src="../img/searchIndex/icon4.png"
              alt=""
            />
            <img
              v-if="index == '4'"
              src="../img/searchIndex/icon5.png"
              alt=""
            />
            <img
              v-if="index == '5'"
              src="../img/searchIndex/icon6.png"
              alt=""
            />
            <div>
              <div class="iconBox_t">{{ item.name }}</div>
              <div class="iconBox_b">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="textCont">
          <div class="stress_list">
            <div
              style="height:48px;line-height:48px;padding-left:20px;color:#ffffff"
            >
              <img src="../img/searchIndex/icon7.png" alt="" /> 引擎介绍
            </div>
            <div class="stress_list_cont">
              <ul class="stress_list_cont_l">
                <li
                  :key="index"
                  :class="index == 0 ? 'hoverClick' : ''"
                  @mouseover="tab(index, $event)"
                  v-for="(item, index) in stress_list"
                >
                  {{ item.name }}
                </li>
              </ul>
              <div class="stress_list_cont_r">
                <div
                  :class="index == showBox ? 'hover' : ''"
                  :key="index"
                  v-for="(item, index) in stress_list"
                >
                  <span
                    v-html="
                      item.value.replace(
                        /src=\&quot;/g,
                        `src=&quot;` + $store.state.app.img_url
                      )
                    "
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div class="stress_list_r">
            <div style="margin-bottom:20px;">
              <div class="title">
                <img
                  style="position: absolute;left: -29px;top: 8px;"
                  src="../img/searchIndex/icon8.png"
                  alt=""
                />
                联系方式
              </div>
              <div>地址：北京市朝阳区京顺路7号</div>
              <div>传值：010-84142105</div>
            </div>
            <div>
              <div class="title">
                <img
                  style="position: absolute;left: -29px;top: 10px;"
                  src="../img/searchIndex/icon9.png"
                  alt=""
                />合作机构
              </div>
              <div>大数据与计算智能联合实验室</div>
              <div>国家科技图书文献中心</div>
            </div>
          </div>
        </div>
        <div class="searchFooter">
          <div class="searchFooter_t">
            <div>使用协议</div>
            <div>免责声明</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      maskShow: false,
      stress_list: {}, // 精致条目
      relatedwordShow: false, //联想词
      showBox: 0,
      background_word: [], //背景词
      searchTitle: "", //页面头部信息
      intro: "", //提示信息
      search_list: [], //搜索栏左侧下拉
      search_list_val: "", //下拉选中的值
      searchWord: "", //搜索值
      statistics: [], //数据列表
      relatedwordBox: "",
      ajaxShow: true,
      defVal: "", //默认词
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 点击触发搜索
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
    // 点击logo去首页
    gotoHome() {
      this.$router.push("/");
    },
    gotoPage2(val) {
      this.$store.commit("updated_searchType", "知识探索");
      this.$router.push({
        path: "/semanticSearch",
        query: {
          val: val,
          data: Date.parse(new Date()),
        },
      });
    },
    // 回车触发
    spendBtn() {
      this.searchBtn();
    },
    // 触发联想词
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
    // 点击联想词
    relatedwordText(val) {
      this.ajaxShow = false;
      this.relatedwordShow = false;
      this.searchWord = val;
      this.ajaxShow = true;
    },
    // 页面已加载触发默认词
    urlText() {
      this.searchWord = this.$route.query.val;
    },
    // 移入移出
    handmoveMask() {
      this.maskShow = true;
    },
    handleaveMask() {
      this.maskShow = false;
    },

    toUserCenter() {
      this.$router.push("/userAdmin/mineInfo");
      this.handleaveMask();
    },
    // 首页的信息
    loadData() {
      this.$axios("/baike/sousuo/search_homepage", "post").then((res) => {
        console.log(res);
        this.background_word = res.data.background_word;
        this.searchTitle = res.data.title;
        this.intro = res.data.intro;
        this.search_list = res.data.search_list;
        this.search_list_val = res.data.search_list[0];
        this.stress_list = res.data.fields_intro;
        this.statistics = res.data.statistics;
        this.defVal = res.data.sentence_in_search;
      });
    },
    tab: function(val, e) {
      this.showBox = val;
      for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
        const element = e.currentTarget.parentElement.children[i];
        if (i == val) {
          element.classList.add("hoverClick");
        } else {
          element.classList.remove("hoverClick");
        }
      }
    },
  },
  created() {},
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
.relatedword {
  overflow: hidden;
  width: 598px;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: absolute;
  left: 104px;
  top: 50px;
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
  width: 598px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 50px;
  line-height: 50px;
  /deep/ .ivu-input {
    height: 50px;
    box-shadow: none;
    line-height: 50px;
    border-radius: 0;
    float: left;
  }
}
.bkWord {
  font-size: 15px;
  color: #5991e6;
  font-weight: 600;
  & > div {
    min-width: 200px;
    text-align: center;
  }
  .bkWord_1 {
    position: absolute;
    left: -10px;
    top: 142px;
  }
  .bkWord_2 {
    position: absolute;
    right: -33px;
    top: 85px;
  }
  .bkWord_3 {
    position: absolute;
    right: -77px;
    top: 290px;
  }
  .bkWord_4 {
    position: absolute;
    left: 332px;
    top: 411px;
  }
  .bkWord_5 {
    position: absolute;
    left: 701px;
    top: 424px;
  }
}

.bodyCont {
  width: 1600px;
  height: 900px;
  display: flex;
  justify-content: center;
  background: #0a59c8 url(~@/img/searchBk.png) no-repeat center;
  background-position-y: -73px;
}

.bodyCont_c {
  width: 1200px;
  height: 900px;
  position: relative;
}
.searchBox {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 46px;
  // 下拉框
  /deep/ .ivu-select {
    width: 104px !important;
  }

  /deep/ .ivu-select-selection {
    width: 104px;
    height: 50px;
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
    height: 50px !important;
    line-height: 50px !important;
    text-align: center;
  }
  /deep/ .ivu-select-placeholder {
    padding-left: 14px;
  }
  /deep/ .ivu-input {
    height: 100% !important;
    border-radius: 0;
  }
  /deep/ .ivu-input:hover {
    border-color: #dcdee2;
  }
  /deep/ .ivu-input:focus {
    box-shadow: none;
  }
  /deep/ .ivu-select-dropdown {
    box-shadow: none;
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
      line-height: 52px;
    }
  }
}
.iconBox {
  display: flex;
  margin-top: 67px;
  overflow: hidden;
  padding-left: 20px;
  box-sizing: border-box;
  & > div {
    width: 16.6666%;
    display: flex;
    color: #ffffff;
    & > img {
      margin-right: 12px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .iconBox_t {
        font-size: 18px;
        line-height: 20px;
      }
      .iconBox_b {
        font-size: 12px;
        line-height: 20px;
        color: #b9c8ea;
        font-weight: 600;
      }
    }
  }
}
.textCont {
  display: flex;
  justify-content: space-between;
  height: 240px;
  margin-top: 70px;
  .stress_list {
    overflow: hidden;
    width: 870px;
    background: #3c7edb;
    opacity: 0.9;
    border-radius: 4px;
    overflow: hidden;
    .stress_list_cont {
      overflow: hidden;
      clear: both;
      width: 870px;
      height: 192px;
      box-sizing: border-box;

      .stress_list_cont_l {
        width: 120px;
        float: left;

        & > li {
          width: 146px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #ffffff;
          text-align: center;
          box-sizing: border-box;
          cursor: pointer;
          &:hover {
            background: #3388ff;
            color: #ffffff;
          }
        }
        & > li:last-child {
          margin-bottom: 0px;
        }
      }
      .stress_list_cont_r {
        width: 700px;
        padding-right: 32px;
        float: right;
        line-height: 28px;
        color: #ffffff;

        & > div {
          display: none;
          height: 218px;
          overflow: auto;
        }

        /* 谷歌、苹果浏览器 */
        ::-webkit-scrollbar {
          display: none;
        }

        /* IE浏览器 */
        ::-ms-scrollbar {
          display: none;
        }

        /* 火狐浏览器 */
        ::-moz-scrollbar {
          display: none;
        }

        /* 欧朋浏览器 */
        ::-o-scrollbar {
          display: none;
        }

        .hover {
          display: block;
        }
      }
    }
  }
  .hoverClick {
    background: #0a59c8 !important;
    color: #ffffff !important;
  }
  .stress_list_r {
    width: 308px;
    height: 240px;
    background: #3c7edb;
    opacity: 0.9;
    display: flex;
    padding-left: 54px;
    padding-top: 12px;
    box-sizing: border-box;
    flex-direction: column;
    border-radius: 4px;
    overflow: hidden;
    & > div {
      font-size: 14px;
      color: #ffffff;
      .title {
        line-height: 36px;
        font-size: 18px;
        font-weight: 600;
        position: relative;
      }
      & > div {
        line-height: 30px;
      }
    }
  }
}
.searchFooter {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 44px;
  .searchFooter_t {
    width: 100%;
    display: flex;
    justify-content: center;
    & > div {
      padding: 0 31px;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .searchFooter_b {
    margin-top: 20px;
    font-size: 12px;
    color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: center;
  }
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
    top: 60px;
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
