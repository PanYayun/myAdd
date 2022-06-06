<template>
  <!-- background:antiquewhite; -->
  <div style="background: #f7f9fa">
    <div style="width: 100%">
      <div class="bannerBox" style="min-width: 1200px; margin: 0 auto">
        <div class="layout_container">
          <Row>
            <Col span="12" style="padding: 90px 10px">
              <Carousel
                v-model="Carousel_value"
                @on-change="Carousel_change"
                height="auto"
                dots="none"
                arrow="always"
              >
                <CarouselItem
                  v-for="(item, index) in CarouselItem_data"
                  :key="index"
                >
                  <div class="carousel_box">
                    <Card class="Carousel_Card" :bordered="false" dis-hover>
                      <div class="Carousel_Card_box">
                        <h2 style="font-size: 20px">{{ item.title }}</h2>
                        <br />
                        <span style="display: block; line-height: 30px">
                          <div>{{ item.contant }}</div>
                          <div>{{ item.br_contant }}</div>
                        </span>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              </Carousel>
            </Col>
            <Col span="12">
              <div
                class="BrainMapMain BrainMapMain_hover"
                @mouseover="BrainMapMain_mouseover(0, $event)"
                style="
                  width: 76px;
                  height: 76px;
                  font-size: 100%;
                  top: 120px;
                  left: 300px;
                "
              >
                <a
                  class="BrainMapMain_Dom_a BrainMapMain_Dom_a_hover"
                  href="javascript:void(0);"
                  @click="BrainMapMain_Dom_a_click(0)"
                  >标准</a
                >
              </div>
              <div
                class="BrainMapMain"
                @mouseover="BrainMapMain_mouseover(1, $event)"
                style="
                  width: 76px;
                  height: 76px;
                  font-size: 90%;
                  top: 80px;
                  left: 470px;
                "
              >
                <a
                  class="BrainMapMain_Dom_a"
                  href="javascript:void(0);"
                  @click="BrainMapMain_Dom_a_click(1)"
                  >元器件</a
                >
              </div>
              <div
                class="BrainMapMain"
                @mouseover="BrainMapMain_mouseover(2, $event)"
                style="
                  width: 85px;
                  height: 85px;
                  font-size: 100%;
                  top: 170px;
                  left: 375px;
                "
              >
                <a
                  class="BrainMapMain_Dom_a"
                  href="javascript:void(0);"
                  style="font-size: 14px"
                  @click="BrainMapMain_Dom_a_click(2)"
                >
                  <p>航空术语</p>
                </a>
              </div>
              <div
                class="BrainMapMain"
                @mouseover="BrainMapMain_mouseover(3, $event)"
                style="
                  width: 85px;
                  height: 85px;
                  font-size: 90%;
                  top: 210px;
                  left: 460px;
                "
              >
                <a
                  class="BrainMapMain_Dom_a"
                  href="javascript:void(0);"
                  @click="BrainMapMain_Dom_a_click(3)"
                  style="font-size: 14px"
                  >民航事故</a
                >
              </div>
              <div
                class="BrainMapMain"
                @mouseover="BrainMapMain_mouseover(4, $event)"
                style="
                  width: 70px;
                  height: 70px;
                  font-size: 80%;
                  top: 210px;
                  left: 260px;
                "
              >
                <a
                  class="BrainMapMain_Dom_a"
                  href="javascript:void(0);"
                  @click="BrainMapMain_Dom_a_click(4)"
                  >军事</a
                >
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="sheetIndex">
      <div>
        <div class="sheetIndex_title">
          <div class="sheetIndex_title_l">近期热搜</div>
          <div class="sheetIndex_title_r">
            <div
              :key="index"
              @mouseover="hotSearch(index, $event)"
              v-for="(item, index) in sheetIndex_ul_l"
            >
              <em>/</em><span>{{ item.type }}</span>
            </div>
          </div>
        </div>
        <div class="sheetIndex_ul">
          <div
            :class="index === hotSearchNum ? 'showClass' : ''"
            class="sheetIndex_ul_box"
            :key="index"
            v-for="(item, index) in sheetIndex_ul_l"
          >
            <ul class="sheetIndex_ul_l">
              <li
                :key="index"
                v-for="(item, index) in item.contents.slice(0, 4)"
                @click="toAllSearchResult(item)"
                :title="item"
                v-html="item"
              ></li>
            </ul>
            <ul class="sheetIndex_ul_r">
              <li
                :key="index"
                v-for="(item, index) in item.contents.slice(4, 8)"
                @click="toAllSearchResult(item)"
                v-html="item"
              ></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sheetIndex_right">
        <div class="sheetIndex_title">
          <div class="sheetIndex_title_l">你知道吗？</div>
        </div>
        <ul class="sheetIndex_right_ul">
          <li
            :key="index"
            v-for="(item, index) in sheetIndex_right_ul.slice(0, 4)"
            @click="toAllSearchResult(item)"
            class="txt_hover"
          >
            <em>Q</em>{{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 精选条目 -->
    <div class="stress_list">
      <div class="sheetIndex_title">
        <div class="sheetIndex_title_l">精选条目</div>
      </div>
      <div class="stress_list_cont">
        <ul class="stress_list_cont_l">
          <li
            :key="index"
            :class="index == 0 ? 'hoverClick' : ''"
            @mouseover="tab(index, $event)"
            v-for="(value, key, index) in stress_list"
          >
            {{ key }}
          </li>
        </ul>
        <div class="stress_list_cont_r">
          <div
            :class="index == showBox ? 'hover' : ''"
            :key="index"
            v-for="(value, key, index) in stress_list"
          >
            <span v-html="value"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 精选图片 -->
    <div class="stress_list">
      <div class="sheetIndex_title">
        <div class="sheetIndex_title_l">精选图片</div>
      </div>
      <div class="stress_img_cont">
        <div
          :key="index"
          v-for="(item, index) in stress_list_img.slice(0, 5)"
          @click="clickStressImg(item)"
        >
          <div class="stress_img_cont_t">
            <img :src="urrl + item.src" alt="" />
          </div>
          <div class="stress_img_cont_b">
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下方的nav -->
    <div class="indexNav">
      <div class="back_img">
        提供数据自动化采集、智能化提取、智慧化应用的新型知识服务新范式。
      </div>
      <!-- <img src="@/img/indexImg3.png" alt="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      urrl: this.$store.state.app.img_url,
      Carousel_value: 0,
      sheetIndex_ul_l: [], //近期热搜
      sheetIndex_right_ul: [], //你知道吗
      stress_list: {}, // 精致条目
      stress_list_img: [],
      showBox: 0,
      hotSearchNum: 0,
      CarouselItem_data: [
        {
          title: "标准百科",
          contant:
            "标准文本经电子化、结构化、语义化、关联化处理，形成包含标准分类、标准体系、标准文本、技术指标、装备类型、装备结构、机构、人员、术语等实体类型及其关系的标准百科知识，以知识推理、关联挖掘、智能推荐和问答等方式提供智能服务。",
          br_contant:
            "目前，标准百科包含GB、GJB、HB等各类标准XX项，技术指标240项。",
          url: { path: "/standardList", query: { type: "bzbk" } },
        },
        {
          title: "元器件百科",
          contant:
            "元器件是武器装备电子系统的基础及核心部件，型号相关元器件数据经结构化、关联化处理，形成包含生产厂家、国别、质量等级、装机系统等实体类型及关系的基础元器件百科知识，基于知识图谱的展现形式，以智能问答、智能检索、统计分析等方式提供智能服务。",
          url: { path: "/standardList", query: { type: "yqjbk" } },
          // br_contant:
          // "目前，航空术语百科知识库包含术语8万项，术语关系近30万个。"
        },
        {
          title: "航空术语百科",
          contant:
            "利用自然语言处理、机器学习、知识图谱等大数据技术从航空领域文本中提取术语，基于术语标准化定义技术方法，对术语进行分类、释文文本摘要、段落主题生成、目录自动生成、实体抽取与融合处理，形成结构化、语义化、关联化的航空领域术语知识库，基于语义查询、智能检索、动态实体链接技术为领域用户提供术语知识服务。",
          br_contant:
            "   目前，航空术语百科知识库包含术语8万项，术语关系近30万个",
          url: { path: "/standardList", query: { type: "hksybk" } },
        },
        {
          title: "民航事故百科",
          contant:
            "基于近20年的“世界民航事故调查跟踪报告”文本，利用自然语言处理、机器学习技术，开发事故分类、实体抽取、事理图谱生成、相似度计算等智能算法，生成包含事故摘要、结构化属性信息、事理图谱、相关标准、相似事故等信息的民航事故知识百科，以知识推理、关联挖掘、智能推荐和问答等方式提供智能服务。",
          url: { path: "/accidentCategory" },
          // br_contant:
          //   "目前，航空术语百科知识库包含术语8万项，术语关系近30万个。"
        },
        {
          title: "军事百科",
          contant:
            "基于军事领域百科全书等文本资源，利用自然语言处理、机器学习技术，开发文本分类、文本摘要、实体抽取、知识图谱生成、文本相似度计算等智能算法，生成包含术语来源、术语分类、术语概念体系、术语语义关系、词条释文/释图、实体结构化属性信息的军事百科知识，以智能推荐、知识问答等方式提供智能服务。",
          url: { path: "/standardList", query: { type: "jssybk" } },
          // br_contant:
          //   "目前，航空术语百科知识库包含术语8万项，术语关系近30万个。"
        },
      ],
    };
  },
  mounted() {
    //判断如果是从百科首页登录,等进入百科首页
    if (this.$route.path == "/digitalQuality") {
      this.$store.commit("changeHomeYe", "/");
    }
    this.indexData();
    this.stress_list_img = [];
    // 初始化图片
  },
  methods: {
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
    // 热门搜索
    hotSearch: function(val, e) {
      this.hotSearchNum = val;
      for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
        const element = e.currentTarget.parentElement.children[i];
        if (i == val) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      }
    },
    indexData() {
      this.$axios("/baike/newindex/", "post").then((res) => {
        // for (const key in res.data.data.selected_pictures) {
        //   res.data.data.selected_pictures[key] =
        //     this.$store.state.app.img_url +
        //     res.data.data.selected_pictures[key];
        // }
        this.sheetIndex_ul_l = res.data.data.trending2;
        this.sheetIndex_right_ul = res.data.data.questions;
        this.stress_list = res.data.data.highlights;
        this.stress_list_img = res.data.data.selected_pictures;
      });
    },
    //显示操作项
    showDialog(index, item) {
      this.ishow = true;
      this.current = index;
    },
    //隐藏蒙层
    hideDialog(index, item) {
      this.ishow = false;
      this.current = null;
    },
    BrainMapMain_mouseover(val, e) {
      if (val != this.Carousel_value) {
        this.Carousel_value = val;
        for (
          let i = 0;
          i < e.currentTarget.parentElement.children.length;
          i++
        ) {
          const element = e.currentTarget.parentElement.children[i];
          element.classList.remove("BrainMapMain_hover");
          element.firstElementChild.classList.remove(
            "BrainMapMain_Dom_a_hover"
          );
        }
        e.currentTarget.classList.add("BrainMapMain_hover");
        e.currentTarget.firstElementChild.classList.add(
          "BrainMapMain_Dom_a_hover"
        );
      }
    },
    Carousel_change(oldValue, value) {
      for (
        let i = 0;
        i < document.getElementsByClassName("BrainMapMain").length;
        i++
      ) {
        const element = document.getElementsByClassName("BrainMapMain")[i];
        if (i == value) {
          element.classList.add("BrainMapMain_hover");
          element.firstElementChild.classList.add("BrainMapMain_Dom_a_hover");
        } else {
          element.classList.remove("BrainMapMain_hover");
          element.firstElementChild.classList.remove(
            "BrainMapMain_Dom_a_hover"
          );
        }
      }
    },
    moreSearch() {
      this.$router.push("/ApplicationSearchResult");
    },
    toAllSearchResult(item) {
      // 如果现在就是全站搜索页面就先去另一个页面刷新一下
      // this.$store.commit("updated_SearchImg", { type: undefined });
      this.$store.commit("updated_searchType", "知识探索");
      this.$router.push({
        path: "/semanticSearch",
          query: {
          val: item,
          data: Date.parse(new Date()),
        },
      });
    },
    clickStressImg(item) {
      this.$router.push({ path: "/TermDetail", query: { id: item.SYZWMC } });
    },
    BrainMapMain_Dom_a_click(index) {
      const { href } = this.$router.resolve(this.CarouselItem_data[index].url);
      window.open(href, "_blank");
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.carousel_box {
  margin: 0 auto;
  // background: aqua;
}
.layout_container {
  height: 420px;
}
.bannerBox {
  height: 420px;
  margin: 0 auto;
  overflow: hidden;
  background: url(../img/bg_index.png) no-repeat center;
}
.Carousel_Card {
  width: 100%;
  margin: 0 auto;
}
.Carousel_Card_box {
  padding: 20px 60px;
  color: #ffffff;
  div {
    text-indent: 2em;
  }
}
.carousel_box > .ivu-card {
  background: rgba(0, 0, 0, 0);
}
.BrainMapMain {
  position: absolute;
  background: url(../img/BrainText.png) no-repeat center center;
  background-size: cover;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s ease 0s;
}
.BrainMapMain_Dom_a {
  width: 100%;
  height: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.BrainMapMain_Dom_a_hover {
  color: #ff7d01;
}
.BrainMapMain_hover {
  transform: scale(1.2);
}
.hoverClick {
  background: #3388ff !important;
  color: #ffffff !important;
}
.sheetIndex {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  & > div {
    width: 590px;
    height: 228px;
    background: #ffffff;
    float: left;
    padding: 0 30px;
    box-sizing: border-box;

    .sheetIndex_ul {
      overflow: hidden;
      .sheetIndex_ul_box {
        display: none;
      }
      .showClass {
        display: block !important;
      }
      ul {
        box-sizing: border-box;
        margin-top: 16px;
        height: 128px;
        li {
          line-height: 32px;
          font-size: 14px;
          color: #3f424b;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
        }
      }
      .sheetIndex_ul_l {
        float: left;
        width: 48%;
        margin-right: 20px;
      }
      .sheetIndex_ul_r {
        width: 48%;
        float: left;
      }
    }
  }
  .sheetIndex_right {
    float: right;
    background: #ffffff url(../img/back001.png) no-repeat right bottom;
    .sheetIndex_right_ul {
      overflow: hidden;
      margin-top: 16px;
      & > li {
        line-height: 32px;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        & em {
          color: #3388ff;
          margin-right: 10px;
          font-weight: 600;
        }
      }
    }
  }
}
.sheetIndex_title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  .sheetIndex_title_l {
    float: left;
    font-weight: 600;
    font-size: 20px;
  }
  .sheetIndex_title_r {
    display: flex;
    font-size: 12px;
    cursor: pointer;
    color: #3388ff;
    & > div {
      color: #3f424b;
      & > span {
        margin: 0 4px;
      }
      em {
        color: #3f424b;
      }
    }
    & > div:nth-child(1) em {
      display: none;
    }
    .active {
      color: #3388ff;
    }
  }
}
.txt_hover:hover {
  color: #3388ff;
}
// 精致条目
.stress_list {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 30px;
  background: #ffffff;
  margin-top: 30px;

  .stress_list_title {
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    font-size: 20px;
    color: #3f424b;
  }
  .stress_list_cont {
    overflow: hidden;
    clear: both;
    width: 100%;
    height: 300px;
    background: #ffffff;
    padding: 30px 0;
    box-sizing: border-box;

    .stress_list_cont_l {
      width: 120px;
      float: left;
      & > li {
        width: 120px;
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        color: #60636f;

        background: #ffffff;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        margin-bottom: 12px;
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
      width: 980px;
      float: right;
      line-height: 28px;
      color: #3f424b;
      & > div {
        display: none;
        height: 218px;
        overflow: auto;
      }
      .hover {
        display: block;
      }
    }
  }
}
.stress_img_cont {
  height: 230px;
  padding-top: 30px;
  box-sizing: border-box;
  & > div {
    width: 210px;
    float: left;
    margin-right: 20px;
  }
  & > div:last-child {
    margin-right: 0;
  }
  .stress_img_cont_t {
    width: 210px;
    height: 140px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .stress_img_cont_b {
    height: 46px;
    line-height: 46px;
    text-align: center;
  }
}
.indexNav {
  min-width: 1200px;
  margin: 0 auto;
  height: 200px;
  margin-top: 50px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}
.back_img {
  background: url("../img/indexImg3.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
}
</style>
