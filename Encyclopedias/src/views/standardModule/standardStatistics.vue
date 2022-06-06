<template>
  <div class="content" style="overflow: hidden;">
    <div class="group flex">
      <div class="chunk">
        <div class="chunk_wrap">
          <div class="title flex">
            <span class="name">总体统计</span>
            <div class="toggle_view flex">
              <div
                class="view_item flex"
                :class="{ active: totalType == 'echarts' }"
                @click="totalType = 'echarts'"
              >
                <span>饼图</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
              <div
                class="view_item flex"
                :class="{ active: totalType == 'table' }"
                @click="totalType = 'table'"
              >
                <span>表格</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
            </div>
          </div>
          <div
            class="echarts_wrap"
            id="total"
            v-show="totalType == 'echarts'"
          ></div>
          <div class="echarts_wrap" v-show="totalType == 'table'">
            <Table
              style="margin-bottom:10px"
              border
              height="270"
              :columns="columns1"
              :data="data1"
            ></Table>
          </div>
        </div>
      </div>
      <div class="chunk">
        <div class="chunk_wrap">
          <div class="title flex">
            <span class="name">趋势统计</span>
            <div class="toggle_view flex">
              <div
                class="view_item flex"
                :class="{ active: tendencyType == 'echarts' }"
                @click="tendencyType = 'echarts'"
              >
                <span>柱状图</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
              <div
                class="view_item flex"
                :class="{ active: tendencyType == 'table' }"
                @click="tendencyType = 'table'"
              >
                <span>表格</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
            </div>
          </div>
          <div
            class="echarts_wrap"
            id="tendency"
            v-show="tendencyType == 'echarts'"
          ></div>
          <div class="echarts_wrap" v-show="tendencyType == 'table'">
            <Table
              style="margin-bottom:10px"
              border
              height="270"
              :columns="columns2"
              :data="data2"
            ></Table>
          </div>
        </div>
      </div>
    </div>
    <div class="group flex">
      <div class="chunk history">
        <div class="chunk_wrap">
          <div class="title flex">
            <span class="name">个人浏览历史</span>
            <div class="toggle_view flex">
              <div
                class="view_item flex"
                :class="{ active: HistoryType == 'echarts' }"
                @click="HistoryType = 'echarts'"
              >
                <span>词云图</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
              <div
                class="view_item flex"
                :class="{ active: HistoryType == 'table' }"
                @click="HistoryType = 'table'"
              >
                <span>表格</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
            </div>
          </div>
          <div
            class="echarts_wrap"
            id="history"
            v-show="HistoryType == 'echarts'"
          >
            <!-- <img src="../../img/zhjb_history.png"> -->
            <wordcloud :wordcloudData="wordcloudData"></wordcloud>
          </div>
          <div class="echarts_wrap" v-show="HistoryType == 'table'">
            <Table
              style="margin-bottom:10px"
              border
              height="270"
              :columns="columns3"
              :data="data3"
            ></Table>
          </div>
        </div>
      </div>
      <div class="chunk">
        <div class="chunk_wrap">
          <div class="title flex">
            <span class="name">兴趣领域趋势</span>
            <div class="toggle_view flex">
              <div
                class="view_item flex"
                :class="{ active: interestType == 'echarts' }"
                @click="interestType = 'echarts'"
              >
                <span>河流图</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
              <div
                class="view_item flex"
                :class="{ active: interestType == 'table' }"
                @click="interestType = 'table'"
              >
                <span>表格</span>
                <i class="iconfont icon-xiaoyuanjiaoshengxu"></i>
              </div>
            </div>
          </div>
          <div
            class="echarts_wrap"
            id="interest"
            v-show="interestType == 'echarts'"
          >
            <!--<img src="../../img/zhjb_interest_trend.png">-->
          </div>
          <div class="echarts_wrap" v-show="interestType == 'table'">
            <Table
              style="margin-bottom:10px"
              border
              height="270"
              :columns="columns4"
              :data="data4"
            ></Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  totalStatistics,
  tendencyStatistics,
  interestStatistics,
} from "@/libs/echarts_uni";
import wordcloud from "@/components/wordcloud.vue";

export default {
  name: "standardStatistics",
  components: {
    wordcloud,
  },
  data() {
    return {
      totalType: "echarts", // totalType 总体统计 视图类型  echarts 饼图 table 表格
      tendencyType: "echarts", // tendencyType 趋势统计 视图类型  echarts 饼图 table 表格
      HistoryType: "echarts", // HistoryType 个人浏览历史 视图类型  echarts 饼图 table 表格
      interestType: "echarts", // interestType 兴趣领域趋势 视图类型  echarts 饼图 table 表格
      columns1: [
        {
          title: "类别",
          key: "name",
          align: "center",
          minWidth: 100,
          tooltip: true,
        },
        {
          title: "占比",
          key: "rate",
          align: "center",
          minWidth: 100,
          tooltip: true,
        },
        {
          title: "总数量",
          key: "value",
          align: "center",
          minWidth: 100,
          tooltip: true,
        },
        {
          title: "有效数量",
          key: "available_no",
          align: "center",
          minWidth: 100,
          tooltip: true,
        },
        {
          title: "近10年新增",
          key: "ten_no",
          align: "center",
          minWidth: 100,
          tooltip: true,
        },
      ],
      data1: [],
      columns2: [
        {
          title: "标准类别",
          align: "center",
          minWidth: 100,
          key: "name2",
        },
        {
          title: "标准级别",
          align: "center",
          children: [
            {
              title: "GB",
              align: "center",
              minWidth: 80,
              key: "value1",
            },
            {
              title: "GJB",
              align: "center",
              minWidth: 80,
              key: "value2",
            },
            {
              title: "HB",
              align: "center",
              minWidth: 80,
              key: "value3",
            },
            {
              title: "Q/AVIC",
              align: "center",
              minWidth: 80,
              key: "value4",
            },
            {
              title: "企业标准",
              align: "center",
              minWidth: 80,
              key: "value5",
            },
          ],
        },
        {
          title: "合计",
          align: "center",
          minWidth: 100,
          key: "value6",
        },
        {
          title: "近一年新增",
          align: "center",
          minWidth: 100,
          key: "value7",
        },
      ],
      data2: [],
      columns3: [
        {
          title: "热搜词",
          align: "center",
          key: "name",
        },
        {
          title: "数量",
          align: "center",
          key: "value",
        },
      ],
      data3: [],
      wordcloudData: [],
      columns4: [
        {
          title: "兴趣领域",
          key: "name",
          align: "center",
        },
        {
          title: "近第1个月",
          key: "value1",
          align: "center",
        },
        {
          title: "近第2个月",
          key: "value2",
          align: "center",
        },
        {
          title: "近第3个月",
          key: "value3",
          align: "center",
        },
        {
          title: "近第4个月",
          key: "value4",
          align: "center",
        },
        {
          title: "近第5个月",
          key: "value5",
          align: "center",
        },
        {
          title: "近第6个月",
          key: "value6",
          align: "center",
        },
      ],
      data4: [],
    };
  },
  mounted() {
    this.settingSize();
    this.totalData();
    this.tendencyData();
    this.HistoryData();
    this.interestData();
  },
  methods: {
    // 总体统计
    async totalData() {
      this.$axios(
        "/baike/biaozhun/get_total_map",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        const totalEcharts = echarts.init(document.getElementById("total"));
        let total = 0;
        res.data.data.map((item) => {
          total += item.total_no;
          item.value = item.total_no;
        });
        totalStatistics.series[0].data = res.data.data;
        totalStatistics.title.text = total;
        totalEcharts.setOption(totalStatistics);
        this.data1 = res.data.data;
      });
    },
    // 趋势统计
    tendencyData() {
      this.$axios(
        "/baike/biaozhun/get_trend_chart",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        const tendencyEcharts = echarts.init(
          document.getElementById("tendency")
        );
        for (let i = 0; i < tendencyStatistics.series.length; i++) {
          if (
            tendencyStatistics.series[i].name == res.data.data_transpose[i].name
          ) {
            tendencyStatistics.series[i].data =
              res.data.data_transpose[i].value;
          }
        }
        tendencyEcharts.setOption(tendencyStatistics);
        this.data2 = [];
        res.data.data.map((item) => {
          for (const k in item) {
            if (Object.hasOwnProperty.call(item, k)) {
              const element = item[k];
              this.data2.push({
                name2: k,
                value1: element[0],
                value2: element[1],
                value3: element[2],
                value4: element[3],
                value5: element[4],
                value6: element[5],
                value7: element[6],
              });
            }
          }
        });
      });
    },
    // 个人浏览历史
    HistoryData() {
      this.$axios(
        "/users/get_wordcloud",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        this.wordcloudData = res.data.data.wordClouds.map((item) => {
          return {
            name: item.word,
            value: item.quantity,
          };
        });
        this.data3 = this.wordcloudData;
      });
    },
    // 兴趣领域趋势
    interestData() {
      this.$axios(
        "/users/get_riverplot",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        let resdata = JSON.parse(JSON.stringify(res.data.data.riverPic));
        let data_ = resdata.map((item) => {
          return item.riverPicList.map((item2) => {
            return [item2.TrendTime, item2.TrendQuantity, item.riverPicName];
          });
        });
        data_ = [].concat(...data_);
        const interestEcharts = echarts.init(
          document.getElementById("interest")
        );
        interestStatistics.series[0].data = data_;
        interestEcharts.setOption(interestStatistics);
        // for (let i = 0; i < res.data.data.riverPic.length; i++) {
        //   const element = res.data.data.riverPic[i];
        //   console.log(element.riverPicList);
        // }
        this.data4 = res.data.data.riverPic.map((item) => {
          return {
            name: item.riverPicName,
            value1: item.riverPicList[0].TrendQuantity,
            value2: item.riverPicList[1].TrendQuantity,
            value3: item.riverPicList[2].TrendQuantity,
            value4: item.riverPicList[3].TrendQuantity,
            value5: item.riverPicList[4].TrendQuantity,
            value6: item.riverPicList[5].TrendQuantity,
          };
        });
      });
    },
    settingSize() {
      // 设置每个echarts容器的高  高等于宽的40%
      $(".chunk_wrap").each(function() {
        let echartsWrapW = $(".chunk_wrap").width();
        $(".echarts_wrap").css({
          width: echartsWrapW,
          height: "280px",
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.chunk_wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.group {
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0px;
  }

  .chunk {
    background: white;
    padding: 15px 24px 0px 24px;
    flex: 1;

    &:first-of-type {
      margin-right: 10px;
    }

    &:last-of-type {
      margin-left: 10px;
    }

    .echarts_wrap {
      margin-top: 15px;
    }

    .title {
      align-items: center;
      padding-bottom: 13px;
      border-bottom: 1px solid #eeeeee;

      .name {
        font-size: 20px;
        font-weight: bold;
        flex: 1;
      }

      .toggle_view {
        .view_item {
          width: 70px;
          height: 30px;
          border: solid 1px #d9d9d9;
          align-items: center;
          justify-content: center;
          color: #60636f;
          cursor: pointer;

          i {
            display: block;
            transform: rotate(180deg);
          }
        }

        .view_item:nth-child(odd) {
          border-right: 0px;
        }

        .view_item:first-of-type {
          border-bottom-left-radius: 3px;
          border-top-left-radius: 3px;
        }

        .view_item:last-of-type {
          border-bottom-right-radius: 3px;
          border-top-right-radius: 3px;
        }

        .active {
          background: #3388ff;
          color: white;
          border: 1px solid #3388ff;
        }
      }
    }
  }
}
#tendency,
#history,
#interest {
  display: flex;
  align-items: center;
  justify-content: center;
}
#history img {
  width: auto;
  height: 95%;
  margin-top: -13px;
}
#tendency img,
#interest img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
