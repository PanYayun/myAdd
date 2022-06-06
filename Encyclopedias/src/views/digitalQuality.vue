<template>
  <div class="contBack">
    <!-- banner -->
    <div class="cont_max">
      <div class="cont_1600 headerBack" style="height:520px">
        <div class="headerText">
          <div
            style="font-size:46px;font-weight:600;line-height:46px;color:#ffffff;letter-spacing: 2px;"
          >
            航空数智服务平台
          </div>
          <div
            style="font-size:18px;color:#ffffff;margin-top:29px;letter-spacing: 2px;"
          >
            针对航空领域打造的一站式数据智能服务平台
          </div>
        </div>
      </div>
    </div>
    <!-- 数据魔方  -->
    <div class="cont_max" style="background:#f4f5fa">
      <div class="cont_1200 headerBack2" style="height:616px">
        <div class="moreBtn">
          <router-link to="/magicSquare">MORE ></router-link>
        </div>
        <div class="modeOne">
          <div>
            <div class="headerBack2_img">
              <img src="../img/2214_new/icon1.png" alt="" />
            </div>
            <div class="headerBack2_title">数据采集</div>
            <div class="headerBack2_text">
              数据采集可以通过系统内部提供的接口收集结构化、非结构化等各个模态的数据
            </div>
            <div class="headerBack2_btn">
              <div>
                <router-link to="/TableList/UploadRecordManagement"
                  >查看详情</router-link
                >
              </div>
            </div>
          </div>
          <div>
            <div class="headerBack2_img">
              <img src="../img/2214_new/icon2.png" alt="" />
            </div>
            <div class="headerBack2_title">数据治理</div>
            <div class="headerBack2_text">
              数据治理是组织中涉及企业内部数据使用的一整套管理行为
            </div>
            <div class="headerBack2_btn">
              <div @click="noPage()">
                查看详情
              </div>
            </div>
          </div>
          <div>
            <div class="headerBack2_img">
              <img src="../img/2214_new/icon3.png" alt="" />
            </div>
            <div class="headerBack2_title">数据仓库</div>
            <div class="headerBack2_text">
             一种面向各类业务系统的智能活动（尤其是分析）的数据管理系统，适用于查询和分析，涉及大量的历史数据。
            </div>
            <div class="headerBack2_btn">
              <div @click="noPage()">
                查看详情
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 算法魔盒 -->
    <div class="cont_max" style="height:680px;background:#ffffff">
      <div class="cont_1600 headerBack6">
        <div class="headerBack6_cont">
          <div class="moreBtn" style="color:#666666;top:104px">
            <router-link to="/magicBox">MORE ></router-link>
          </div>

          <!-- 搜索框 -->
          <div class="headerBack6_cont_t">
            <div v-for="(item, index) in arrBanner" :key="index">
              <div :class="nowIndex == index ? 'active' : ''">
                <img
                  class="imgShow imgShow_l"
                  @click="leftBtn()"
                  style="left: -28px;top: 50%;margin-top: -26px;"
                  src="../img/2214_new/banne-l.png"
                  alt=""
                />
                <img
                  @click="rightBtn()"
                  class="imgShow imgShow_r"
                  style="right: -28px;top: 50%;margin-top: -26px;"
                  src="../img/2214_new/banne-r.png"
                  alt=""
                />
                <img src="" alt="" />
                <div class="imgText"></div>
                <div>
                  <div class="headerBack6_cont_t_title">{{ item.title }}</div>
                  <span class="headerBack6_cont_t_tip"></span>
                  <div class="headerBack6_cont_t_text">{{ item.text }}</div>
                  <div class="moreBtn_a">
                    <router-link v-if="item.url != ''" :to="item.url">
                      查看更多</router-link
                    >
                    <a :href="item.sup" v-else>查看更多</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 知识魔镜 -->
    <div class="cont_max">
      <div class="cont_1600 headerBack3" style="height:728px">
        <div class="headerBack3_cont">
          <div class="moreBtn" style="color:#ffffff;top:100px">
            <router-link style="color:#ffffff;" to="/magicMirror"
              >MORE ></router-link
            >
          </div>
          <!-- 搜索框 -->
          <div class="headerBack3_cont_t">
            <div class="inputStyle">
              <span style="position:relative;flex:1;height:50px">
                <AssociativeWords
                  @searchWord="haveSearchWord"
                  @searchBtn="spendBtn"
                />
              </span>
              <Button class="search_btn" @click="searchBtn()">知识探索</Button>
            </div>
          </div>
          <div class="headerBack3_cont_b">
            <div>
              <div class="headerBack3_cont_b_title">知识超市</div>
              <div class="headerBack3_cont_b_text">
                通过大数据技术和AI智能技术打造的航空领域专有数据平台，包含标准、元器件、术语、民航事故等专业的航空领域数据，旨在为航空从业人员提供更好的数据服务。
              </div>
            </div>
            <div>
              <div class="headerBack3_cont_b_title">知识探索</div>
              <div class="headerBack3_cont_b_text">
                以航空知识元为线索，融合学术、标准、质量、专家、体系数据的全方位知识检索。
              </div>
            </div>
            <div>
              <div class="headerBack3_cont_b_title">知识服务</div>
              <div class="headerBack3_cont_b_text">
                使用机器学习、知识图谱、自然语言处理等AI智能技术，针对标准全文数据、飞机质量故障数据打造的智慧标准和智慧质量平台。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 数知服务 -->
    <div class="cont_max">
      <div class="cont_1600 headerBack4" style="height:690px">
        <div class="headerBack4_cont">
          <div class="moreBtn" style="color:#ffffff;top:88px">
            <router-link style="color:#ffffff;" to="/practice"
              >MORE ></router-link
            >
          </div>
          <div class="headerBack4_cont_c">
            <div>
              <div class="headerBack4_cont_c_img">
                <img src="../img/2214_new/img01.png" alt="" />
              </div>
              <div class="headerBack4_cont_c_b">
                <div class="headerBack4_cont_c_b_title">航空百科</div>
                <div class="headerBack4_cont_c_b_text">
                  航空百科是通过大数据技术和AI智能技术打造的航空领域专有平台，包含标准、元器件、术语、民航事故等专业的航空领域数据，旨在为航空从业人员提供更好的数据服务。
                </div>
                <div class="headerBack4_cont_c_b_btn">
                  <div class="headerBack4_cont_c_b_btn_l">
                    <router-link to="/home">查看详情</router-link>
                  </div>
                  <img src="../img/2214_new/jt.png" alt="" />
                </div>
              </div>
            </div>
            <div>
              <div class="headerBack4_cont_c_img">
                <img src="../img/2214_new/img02.png" alt="" />
              </div>
              <div class="headerBack4_cont_c_b">
                <div class="headerBack4_cont_c_b_title">智慧标准</div>
                <div class="headerBack4_cont_c_b_text">
                  利用深度模型等算法，提供基于标准题录、标准体系、标准全文等的智能检索功能，并提供标准需求提出/管理和多维度标准统计功能，可支撑用户在标准管理、标准查询、标准立项、标准统计等方面的需求
                </div>
                <div class="headerBack4_cont_c_b_btn">
                  <div class="headerBack4_cont_c_b_btn_l">
                    <router-link to="/standard/index">查看详情</router-link>
                  </div>
                  <img src="../img/2214_new/jt.png" alt="" />
                </div>
              </div>
            </div>
            <div>
              <div class="headerBack4_cont_c_img">
                <img src="../img/2214_new/img03.png" alt="" />
              </div>
              <div class="headerBack4_cont_c_b">
                <div class="headerBack4_cont_c_b_title">智慧质量</div>
                <div class="headerBack4_cont_c_b_text">
                  针对飞机全生命周期内外场发生的质量问题、故障记录等数据，使用机器学习、知识图谱等智能技术，实现飞机质量问题数据的科学管理和高效检索。
                </div>
                <div class="headerBack4_cont_c_b_btn">
                  <div class="headerBack4_cont_c_b_btn_l">
                    <router-link to="qualityIndex">查看详情</router-link>
                  </div>
                  <img src="../img/2214_new/jt.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="cont_max">
      <div class="cont_1600 headerBack5" style="height:552px">
        <div class="headerBack5_cont">
          <div class="headerBack5_cont_c">
            <div><img src="../img/2214_new/logo01.png" alt="" /></div>
            <div><img src="../img/2214_new/logo02.png" alt="" /></div>
            <div><img src="../img/2214_new/logo03.png" alt="" /></div>
            <div><img src="../img/2214_new/logo04.png" alt="" /></div>
            <div><img src="../img/2214_new/logo05.png" alt="" /></div>
            <div><img src="../img/2214_new/logo06.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssociativeWords from "@/components/associativeWords.vue"; 
export default {
  name: "digitalQuality",
  components: { AssociativeWords },
  props: {},
  data() {
    return {
      searchWord: "", //搜索词
      arrBanner: [
        {
          title: "模型工具",
          text:
            "基于深度学习和大数据打造的各类高性能模型，涵盖文本、图像等诸多领域，可即时获取模型结果",
          url: "/modelTools/experienceNow",
        },
        {
          title: "模型工厂",
          text:
            "一站式模型定制，全流程可视化创建模型，轻松创建容器，高效使用云计算资源。",
          url: "",
          sup: "http://10.216.6.232:8888/#/index",
        },
        {
          title: "模型应用",
          text:
            "针对核心业务定制开发的智能模型。场景包含：民航事故抽取、标准碎片化加工、标准知识加工、装备故障/产品质量问题抽取、术语百科知识抽取等模型。",
          url: "/TableList/addTask",
        },
      ],
      nowIndex: 1,
    };
  },
  watch: {},
  computed: {},
  methods: {
    noPage() {
      this.$Message.info("建设中");
      return false;
    },
    haveSearchWord(val) {
      this.searchWord = val;
    },
    spendBtn(key) {
      this.searchWord = key;
      this.searchBtn();
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
    leftBtn() {
      this.nowIndex = this.nowIndex - 1;
    },
    rightBtn() {
      this.nowIndex = Number(1 + this.nowIndex);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.contBack {
  background-size: 1600px;
  min-width: 1600px;
}
.headerBack {
  position: relative;
  background: url(~@/img/2214_new/banner2214_01.png) no-repeat center;
  .headerText {
    position: absolute;
    top: 215px;
    left: 197px;
  }
}
.headerBack2 {
  position: relative;
  background: url(~@/img/2214_new/banner2214_03.png) no-repeat center;
  display: flex;
}
.search_input {
  width: 570px;
  height: 50px;
  line-height: 50px;
}
.headerBack3 {
  position: relative;
  background: url(~@/img/2214_new/banner2214_02.png) no-repeat center;
  .headerBack3_cont {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .headerBack3_cont_t {
      display: flex;
      justify-content: flex-end;
      margin-top: 176px;
      margin-right: 60px;
      .inputStyle {
        width: 680px;
        height: 50px;
        display: flex;
        .search_input {
          width: 570px;
          height: 50px;
          line-height: 50px;
        }
        /deep/ .ivu-input {
          height: 100% !important;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          height: 49px !important;
          line-height: 50px;
        }
        /deep/ .ivu-input:focus {
          border-color: #dcdee2;
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
          border: none !important;
          box-sizing: border-box;
          .ivu-icon {
            font-size: 22px;
            vertical-align: middle;
            margin-top: -1 px;
            margin-right: -5 px;
            line-height: 52px;
          }
        }
        /deep/.ivu-btn:hover {
          color: #ffffff !important;
          background-color: #ffab33 !important;
          border-color: #ffab33 !important;
        }
        .search_btn {
          width: 110px;
          height: 49px;
          font-size: 16px;
          line-height: 49px;
          box-sizing: border-box;
          color: #ffffff !important;
          background-color: #ffab33 !important;
          border-color: #ffab33 !important;
        }
      }
    }
    .headerBack3_cont_b {
      display: flex;
      margin-top: 248px;
      padding: 0 36px;
      box-sizing: border-box;
      justify-content: space-between;
      & > div {
        width: 322px;
        height: 158px;
        .headerBack3_cont_b_title {
          font-size: 24px;
          line-height: 24px;
          color: #3f424b;
          text-align: center;
        }
        .headerBack3_cont_b_text {
          line-height: 26px;
          color: #858b9a;
          font-size: 16px;
          text-align: center;
          margin-top: 26px;
        }
      }
    }
  }
}
.headerBack4 {
  position: relative;
  background: url(~@/img/2214_new/banner2214_04.png) no-repeat center;
  .headerBack4_cont {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    .headerBack4_cont_c {
      display: flex;
      margin-top: 188px;
      width: 100%;
      justify-content: space-between;
      & > div {
        width: 380px;
        height: 420px;
        background: #ffffff;
        .headerBack4_cont_c_img {
          width: 100%;
          height: 210px;
        }
        .headerBack4_cont_c_b {
          width: 100%;
          height: 210px;
          padding-left: 27px;
          padding-right: 27px;
          padding-top: 24px;
          box-sizing: border-box;
          .headerBack4_cont_c_b_title {
            font-size: 24px;
            color: #3f424b;
            line-height: 22px;
          }
          .headerBack4_cont_c_b_text {
            line-height: 22px;
            color: #858b9a;
            font-size: 14px;
            margin-top: 16px;
            height: 86px;
            overflow: hidden;
          }
          .headerBack4_cont_c_b_btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
            .headerBack4_cont_c_b_btn_l {
              cursor: pointer;
              color: #787b81;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
.headerBack5 {
  position: relative;
  background: url(~@/img/2214_new/banner2214_05.png) no-repeat center;
  .headerBack5_cont {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .headerBack5_cont_c {
      margin-top: 195px;
      height: 272px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      & > div {
        width: 190px;
        height: 190px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & > div:nth-child(even) {
        margin-top: 80px;
      }
    }
  }
}
.headerBack6 {
  position: relative;
  display: flex;
  background: url(~@/img/2214_new/mohe_banner.png) no-repeat center;
  background-position-y: 0px;
  .headerBack6_cont {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .headerBack6_cont_t {
      width: 100%;
      height: 380px;
      background: #ffffff;
      margin-top: 218px;
      display: flex;
      justify-content: space-between;
      .imgText {
        display: none;
        width: 312px;
        height: 380px;
        border: 3px solid #ffffff;
        box-sizing: border-box;
        margin-top: -36px;
        margin-left: 62px;
        margin-right: 36px;
        // background: url(~@/img/2214_new/moheImg3.png) no-repeat center;
        // background-size: cover;
      }
      .imgShow {
        display: none;
      }
      .moreBtn_a {
        display: none;
        width: 88px;
        height: 32px;
        border: 1px solid #ffffff;
        color: #ffffff;
        cursor: pointer;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        box-sizing: border-box;
        border-radius: 18px;
        & > a {
          color: #ffffff;
        }
      }
      & > div {
        display: flex;
        flex-direction: column;
        .active {
          width: 710px;
          height: 380px;
          display: flex;
          position: relative;
          .moreBtn_a {
            display: block;
          }
          .headerBack6_cont_t_title {
            color: #ffffff;
            margin-top: 60px;
          }
          .headerBack6_cont_t_text {
            color: #ffffff;
            -webkit-line-clamp: 6;
            height: 150px;
            margin-bottom: 20px;
          }
          .imgShow {
            display: block;
            width: 52px;
            height: 52px;
            position: absolute;
            z-index: 99;
            cursor: pointer;
          }
          .imgText {
            display: block;
          }
        }
        & > div {
          width: 200px;
          height: 380px;
          .headerBack6_cont_t_title {
            line-height: 24px;
            font-size: 24px;
            font-weight: 600;
            color: #3f424b;
            margin-top: 140px;
          }
          .headerBack6_cont_t_tip {
            display: inline-block;
            width: 24px;
            height: 3px;
            background: #ffab33;
            margin-top: 24px;
            margin-bottom: 20px;
          }
          .headerBack6_cont_t_text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: normal;
            line-height: 26px;
            color: #858b9a;
            width: 192px;
          }
        }
      }
      & > div:nth-child(1) > div {
        background: url(~@/img/2214_new/bck01.png) no-repeat;
        background-position-y: 40px;
        .imgText {
          background: url(~@/img/2214_new/moheImg3.png) no-repeat center;
          background-size: cover;
        }
        .imgShow_l {
          display: none;
        }
      }
      & > div:nth-child(2) > div {
        background: url(~@/img/2214_new/bck02.png) no-repeat;
        background-position-y: 40px;
        .imgText {
          background: url(~@/img/2214_new/moheImg3.png) no-repeat center;
          background-size: cover;
        }
      }
      & > div:nth-child(3) > div {
        background: url(~@/img/2214_new/bck03.png) no-repeat;
        background-position-y: 40px;
        .imgText {
          background: url(~@/img/2214_new/moheImg3.png) no-repeat center;
          background-size: cover;
        }
        .imgShow_r {
          display: none;
        }
      }

      & > div:nth-child(1) > .active {
        background: url(~@/img/2214_new/bck1.png) no-repeat;
      }
      & > div:nth-child(2) > .active {
        background: url(~@/img/2214_new/bck2.png) no-repeat;
      }
      & > div:nth-child(3) > .active {
        background: url(~@/img/2214_new/bck3.png) no-repeat;
      }
    }
  }
}
.cont_max {
  width: 100%;
  overflow: hidden;
  .cont_1600 {
    width: 1600px;
    height: auto;
    margin: 0 auto;
  }
  .cont_1200 {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }
}
.modeOne {
  display: flex;
  margin-top: 178px;
  justify-content: space-between;
  width: 100%;
  & > div {
    width: 380px;
    height: 360px;
    background: #ffffff;
    box-shadow: 0px 0px 15px 3px #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
    .headerBack2_img {
      margin-top: 40px;
    }
    .headerBack2_title {
      font-size: 24px;
      line-height: 24px;
      color: #3f424b;
      margin-top: 20px;
    }
    .headerBack2_text {
      text-align: center;
      padding: 0 36px;
      box-sizing: border-box;
      line-height: 26px;
      font-size: 16px;
      margin-top: 20px;
      height: 90px;
      overflow: hidden;
      color: #858b9a;
    }
    .headerBack2_btn {
      width: 100%;
      display: flex;
      justify-content: center;
      & > div {
        width: 120px;
        height: 36px;
        border: 1px solid #3388ff;
        font-size: 16px;
        color: #3388ff;
        text-align: center;
        line-height: 36px;
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
}
.moreBtn {
  position: absolute;
  right: 0;
  top: 105px;
  color: #666666;
  font-size: 12px;
  cursor: pointer;
}
</style>
