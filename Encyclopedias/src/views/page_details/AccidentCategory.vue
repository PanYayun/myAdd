<template>
  <div class="accidentCategory">
    <div class="box-left">
      <div class="left-content-news">
        <div class="content-header-box">
          <div class="content-header">
            <span class="title">最新民航事故新闻</span>
          </div>
        </div>
        <div class="content-new-bottom">
          <div v-for="item in newsList" :key="item.XWID">
            <!-- <a target="_blank" :href="item.XWURL"> -->
            <a :href="item.XWURL">
              <div class="content-new-box">
                <div class="content-new-title">{{ item.XWMC }}</div>
                <div class="content-new-time">{{ item.FBSJ }}</div>
              </div>
              <p class="content-new-zhengwen">{{ item.XWZY }}</p>
            </a>
          </div>
        </div>
      </div>
      <div class="left-content-catgory">
        <jmretrieval-list :standardList="standardList"> </jmretrieval-list>
      </div>
    </div>
    <div class="box-right">
      <div class="right-content-chart">
        <recommend-chart
          title="事故数量随年度变化过程"
          img="sgslsndbhgc.png"
        ></recommend-chart>
      </div>
      <div
        class="right-content-chart right-content-chart2"
        style="margin-top: 20px"
      >
        <recommend-chart
          title="事故数量随年度变化统计"
          img="sgslsndbhgcz.png"
        ></recommend-chart>
      </div>
      <div
        class="right-content-chart right-content-chart3"
        style="margin-top: 20px"
      >
        <recommend-chart
          title="事故发生阶段统计"
          img="sgfsjdtj.png"
        ></recommend-chart>
      </div>
      <div class="right-content-chart 4" style="margin-top: 20px">
        <recommend-chart
          title="所属系统统计"
          img="ssxttj.png"
        ></recommend-chart>
      </div>
      <div class="right-content-chart 5" style="margin-top: 20px">
        <recommend-chart
          title="原因分类统计"
          img="yyfltj.png"
        ></recommend-chart>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendChart from "@/components/RecommendChart";
import JmretrievalList from "@/components/JmretrievalList";
export default {
  name: "AccidentCategory",
  components: { RecommendChart, JmretrievalList },
  data() {
    return {
      newsList: [
        {
          XWID: "MHSGXW0001",
          XWMC: "中国首个国产大飞机生产试飞中心竣工",
          XWZY:
            "从中国铁建股份有限公司获悉，由中国自主设计建造的首个国产大飞机生产试飞中心——中国商飞江西生产试飞中心24日全面竣工，标志着中国已形成从科研设计、生产试飞到交付运营一整套相对完善的大飞机产业链条",
          XWURL: "http://news.carnoc.com/list/559/559747.html",
          FBSJ: "2021/04/25",
        },
        {
          XWID: "MHSGXW0002",
          XWMC: "印度北阿肯德邦雪崩事故死亡人数升至10人，另有30余人下落不明",
          XWZY:
            "央视新闻客户端消息，根据新德里电视台等多家媒体当地时间24日的报道，印度陆军当天下午发布声明表示，救援人员当天下午在印度北阿肯德邦查莫利地区尼蒂河谷的雪崩事故现场又搜寻出2具遇难者遗体",
          XWURL: "https://www.jiemian.com/article/6005461.html",
          FBSJ: "2021/04/24",
        },
      ],
      standardList: [],
      // standardList2: [
      //   {
      //     title: "aa",
      //     data: [
      //       { name: "ssssss" },
      //       { name: "ssssss1" },
      //       { name: "ssssss2" },
      //       { name: "ssssss3" },
      //       { name: "ssssss4" },
      //       { name: "ssssss5" },
      //       { name: "ssssss6" },
      //       { name: "ssssss7" },
      //       { name: "ssssss8" }
      //     ]
      //   },
      //   {
      //     title: "bb",
      //     data: [
      //       { name: "ssssss5" },
      //     ]
      //   }
      // ]
    };
  },
  mounted() {
    this.bzList();
  },
  methods: {
    // 请求列表
    bzList() {
      this.$axios("/baike/minhang/get_classification", "get").then((res) => {
        this.newsList = res.data.news_info;
        let listAll = Object.values(res.data.classification_info);
        this.standardList = listAll;
      });
    },
  },
  computed: {},
  watch: {},
};
</script>
<style scoped lang="less">
.accidentCategory {
  width: 1200px;
  overflow: hidden;
  margin: 30px auto;

  .box-left {
    width: 700px;
    float: left;
    overflow: hidden;

    .left-content-news {
      width: 100%;
      background: white;
      padding: 0px 20px 0px 20px;

      .content-new-bottom {
        padding-top: 20px;

        .content-new-box {
          overflow: hidden;
          .content-new-title {
            max-width: 778px;
            height: 24px;
            font-size: 16px;
            color: #3f424b;
            font-weight: bold;
            float: left;
            padding-left: 10px;
            background: url(../../img/blue_rot.png) no-repeat left;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            cursor: pointer;
          }
          .content-new-title:hover {
            color: #3388ff;
          }
          .content-new-time {
            font-size: 12px;
            color: #858b9a;
            float: right;
            height: 24px;
            line-height: 24px;
          }
        }
        .content-new-zhengwen {
          font-size: 14px;
          line-height: 30px;
          color: #60636f;
          margin: 8px 0px 20px 10px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .left-content-catgory {
      width: 100%;
      background: #ffffff;
      padding: 0px 30px 96px 30px;
      margin-top: 20px;
    }
  }
  .box-right {
    width: 480px;
    float: right;

    .right-content-chart {
      height: 310px;
      background: #ffffff;
    }
    .right-content-chart2 {
      height: 300px;
    }
    .right-content-chart3 {
      height: 294px;
    }
    .right-content-chart4 {
      height: 290px;
    }
    .right-content-chart5 {
      height: 290px;
    }
  }
  .content-header-box {
    padding: 0px 10px 0px 10px;
    .content-header {
      height: 63px;
      line-height: 63px;
      border-bottom: 1px solid #eeeeee;

      .title {
        font-size: 20px;
        font-weight: bold;
        color: #3f424b;
      }
      .sub-title {
        font-size: 14px;
        color: #e65271;
        margin-left: 130px;
      }
    }
  }
}
</style>
