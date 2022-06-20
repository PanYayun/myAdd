<template>
  <div class="standard" style="position: relative">
    <Spin fix v-if="spin_standard_box"></Spin>
    <div class="standard_content">
      <bzretrieval-list
        :standardList="standardList"
        v-on:touchChild="touchChild"
      ></bzretrieval-list>
    </div>
    <div class="standard_right">
      <div
        class="right-content-chart"
        v-for="(string, index) in chartTitle"
        :key="index"
        :style="{
          marginTop: index == 0 ? '0px' : '20px',
        }"
      >
        <!-- <recommend-chart title="按标准领域分布"></recommend-chart> -->
        <div class="recommend-header-box" v-if="string == '' ? false : true">
          <div class="recommend-header">
            <span>{{ string }}</span>
          </div>
          <div class="recommend-header-line"></div>
        </div>
        <div class="recommend-content-box">
          <div
            :id="standard_echarts_index(index + 1)"
            :style="{ width: '100%', height: chartHeight[index] }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BzretrievalList from "@/components/bzretrievalList.vue";
import RecommendChart from "@/components/RecommendChart.vue";
import echarts from "echarts";
import tdTheme from "@/libs/echarts_them.json";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "StandardList",
  data() {
    return {
      standardList: [],
      chartTitle: [],
      chartHeight: ["270px", "260px", "240px"],
      chartDataKey1: [],
      chartData1: [],
      chartData2: [],
      chartData3: [],
      spin_standard_box: true,
    };
  },
  components: {
    BzretrievalList,
    RecommendChart,
  },
  mounted() {
    this.getData();
  },
  methods: {
    standard_echarts_index(i) {
      return "standard_echarts_index_" + i;
    },
    touchChild: function(item) {
      //childID childName
      if (this.$route.query.type === "hksybk") {
        this.$router.push({
          path: "/ShuYuSearchResult",
          query: { id: item.childName, type: this.$route.query.type },
        });
      } else if (this.$route.query.type === "bzbk") {
        this.$router.push({
          path: "/bz/search/list",
          query: { id: item.childID, type: this.$route.query.type },
        });
      } else if (this.$route.query.type === "yqjbk") {
        this.$router.push({
          path: "/ElectronResult",
          query: { id: item.childName, type: this.$route.query.type },
        });
      }
    },
    // 请求标准列表
    bzList() {
      this.$axios("/baike/biaozhun/get_classification", "get", {
        fatherID: "ROOT",
      }).then((res) => {
        this.standardList = res.data.data;
      });
    },
    //请求标准3个图表数据
    bzChartData() {
      this.chartTitle = ["按标准领域分布", "按百科词条分类统计", "按产品层级"];
      this.$axios("/baike/biaozhun/get_statistic_info", "get").then((res) => {
        if (res.data.data.length > 0) {
          let data = res.data.data[0];
          let keys = [];
          let values = [];
          for (var dic of data.static_info) {
            keys.push(dic["name"]);
            values.push(dic["count"]);
          }
          this.chartDataKey1 = keys;
          this.chartData1 = values;
        }
        if (res.data.data.length > 1) {
          this.chartData2 = res.data.data[1];
        }
        if (res.data.data.length > 2) {
          this.chartData3 = res.data.data[2];
        }
        setTimeout(() => {
          this.spin_standard_box = false;
        }, 300);
      });
    },
    //请求航空3个图表数据
    bzChartData_2() {
      this.chartTitle = [
        "按知识类型统计",
        "按百科词条分类统计",
        "按语义关系类型统计",
      ];
      this.chartDataKey1 = ["优选词", "语义关系", "百科词条"];
      this.chartData1 = [78000, 410000, 63000];
      this.chartData2 = {
        static_info: [
          {
            name: "综合类",
            count: 2824,
            value: 2824,
          },
          {
            name: "飞行器",
            count: 2250,
            value: 2250,
          },
          {
            name: "基础理论",
            count: 4546,
            value: 4546,
          },
          {
            name: "飞行器结构设计与强度",
            count: 1442,
            value: 1442,
          },
          {
            name: "推进技术与航空发动机",
            count: 2583,
            value: 2583,
          },
          {
            name: "飞行控制、导航、显示/控制和记录系统",
            count: 2278,
            value: 2278,
          },
          {
            name: "航空电子与计算机技术",
            count: 7635,
            value: 7635,
          },
          {
            name: "航空机电系统",
            count: 3506,
            value: 3506,
          },
          {
            name: "机载武器系统",
            count: 3916,
            value: 3916,
          },
          {
            name: "航空安全、生命保障与航空医学",
            count: 2671,
            value: 2671,
          },
          {
            name: "航空材料",
            count: 2478,
            value: 2478,
          },
          {
            name: "航空制造工程",
            count: 2065,
            value: 2065,
          },
          {
            name: "飞行、飞行试验及测试技术",
            count: 3350,
            value: 3350,
          },
          {
            name: "航空装备订货",
            count: 646,
            value: 646,
          },
          {
            name: "航空装备维修保障",
            count: 1839,
            value: 1839,
          },
          {
            name: "其他",
            count: 19161,
            value: 19161,
          },
        ],
      };
      this.chartData3 = {
        static_info: [
          {
            name: "同义词",
            count: 59000,
            value: 59000,
          },
          {
            name: "上位词",
            count: 67000,
            value: 67000,
          },
          {
            name: "下位词",
            count: 67000,
            value: 67000,
          },
          {
            name: "族首词",
            count: 30000,
            value: 30000,
          },
          {
            name: "相关词",
            count: 187000,
            value: 187000,
          },
        ],
      };
      setTimeout(() => {
        this.spin_standard_box = false;
      }, 300);
    },
    // 请求元器件列表
    yqjList() {
      this.$axios("/baike/yuanqijian/get_classification", "get").then((res) => {
        this.standardList = res.data.data;
      });
    },
    // 请求术语标准列表
    syList() {
      this.$axios("/baike/hangkongshuyu/get_classification", "get").then(
        (res) => {
          this.standardList = res.data.data;
        }
      );
    },
    getData() {
      this.spin_standard_box = true;
      console.log(this.$route.query.type);
      if (this.$route.query.type === "bzbk") {
        this.bzList();
        this.bzChartData();
      } else if (this.$route.query.type === "hksybk") {
        this.syList();
        // 假数据
        this.bzChartData_2();
      } else if (this.$route.query.type === "yqjbk") {
        this.yqjList();
        // 暂时使用航空术语百科的假数据
        this.bzChartData_2();
      }
    },
    chartDraw1() {
      let myChart = document.getElementById("standard_echarts_index_1");
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "rgba(150,150,150,0.1)",
            },
          },
          formatter: function(params) {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              if (i === 0) {
                relVal =
                  "当前选项：" +
                  "<br/>" +
                  params[i].marker +
                  params[i].axisValue +
                  "：" +
                  params[i].value +
                  "";
              }
            }
            return relVal;
          },
        },
        grid: {
          top: 20,
          bottom: 40,
          left: 50,
          right: 20,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
          splitLine: { show: false },
          data: this.chartDataKey1,
        },
        yAxis: {
          type: "value",
          name: "",
          axisLabel: {
            formatter: function(params) {
              return params / 10000 + "W";
            },
          },
        },
        series: [
          {
            data: this.chartData1,
            barWidth: "50%",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#418efe",
              },
            },
          },
          // {
          //   data: this.chartData1,
          //   barWidth: "30%",
          //   type: "bar",
          // },
        ],
      };
      // 当数据更新了 在dom中渲染后 再去渲染echarts
      this.$nextTick(() => {
        echarts.init(myChart, "tdTheme").setOption(option, true);
      });
    },
    chartDraw2() {
      let myChart = document.getElementById("standard_echarts_index_2");
      for (var item of this.chartData2.static_info) {
        item.value = item.count;
      }
      let data = this.chartData2.static_info;
      let getArrByKey = (data, k) => {
        let key = k || "value";
        let res = [];
        if (data) {
          data.forEach(function(t) {
            res.push(t[key]);
          });
        }
        return res;
      };
      let opt = {
        index: 0,
      };
      data = data.sort((a, b) => {
        return b.value - a.value;
      });
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "rgba(150,150,150,0.1)",
            },
          },
          formatter: function(params) {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              if (i === 0) {
                relVal =
                  "当前选项：" +
                  "<br/>" +
                  params[i].marker +
                  params[i].axisValue +
                  "：" +
                  params[i].value +
                  "";
              }
            }
            return relVal;
          },
        },
        grid: {
          top: "2%",
          bottom: -15,
          right: 50,
          left: 0,
          containLabel: true,
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, "name"),
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              align: "left",
              margin: 30,
              fontSize: 13,
              formatter: function(value, index) {
                if (opt.index === 0 && index < 3) {
                  return "{idx" + index + "|" + (1 + index) + "}";
                } else if (opt.index !== 0 && index + opt.index < 9) {
                  return "{idx|0" + (1 + index + opt.index) + "}";
                } else {
                  return "{idx|" + (1 + index + opt.index) + "}";
                }
              },
              rich: {
                idx0: {
                  color: "#fff",
                  backgroundColor: "#EF5350",
                  align: "center",
                  width: 15,
                  height: 15,
                  borderRadius: 2,
                },
                idx1: {
                  color: "#fff",
                  align: "center",
                  backgroundColor: "#EF5350",
                  width: 15,
                  height: 15,
                  borderRadius: 2,
                },
                idx2: {
                  color: "#fff",
                  align: "center",
                  backgroundColor: "#EF5350",
                  width: 15,
                  height: 15,
                  borderRadius: 2,
                },
                idx: {
                  color: "#333",
                  align: "center",
                  width: 15,
                  height: 15,
                  borderRadius: 2,
                },
              },
            },
          },
          {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, "name"),
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "#666",
              align: "left",
              margin: 20,
              fontSize: 12,
              formatter: function(value, index) {
                return " ";
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            realtimeSort: true,
            name: "X",
            yAxisIndex: 0,
            data: data,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
              formatter: function(params) {
                console.log(params)
                if(params.dataIndex == 0){
                  return params.data.name.slice(0,3)+"...";
                }else{
                  return params.data.name;
                }
              },
            },
            itemStyle: {
              normal: {
                color: "#418efe",
                with:"20px",
                overflow:"hidden",
              },
            },
          },
        ],
      };
      // myChart.setOption(option);
      // 当数据更新了 在dom中渲染后 再去渲染echarts
      this.$nextTick(() => {
        echarts.init(myChart, "tdTheme").setOption(option, true);
      });
    },
    chartDraw3() {
      let myChart = document.getElementById("standard_echarts_index_3");
      let max_data = this.chartData3.static_info.map((item) => {
        return item.value;
      });
      max_data = max_data.sort((a, b) => {
        if (a > b) return -1;
        else if (a < b) return 1;
        else return 0;
      });
      for (var item of this.chartData3.static_info) {
        item.value = item.count;
      }
      var data = this.chartData3.static_info;
      let option = {
        title: {},
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            avoidLabelOverlap: false,
            top: "10%",
            bottom: "10%",
            left: "center",
            height: "80%",
            radius: ["90%", "130%"],
            emphasis: {
              label: {
                show: true,
                fontSize: "25",
              },
            },
            itemStyle: {
              normal: {
                label: {
                  position: "inner",
                  formatter: function(params) {
                    return params.name;
                  },
                  textStyle: {
                    color: "#000",
                  },
                },
                labelLine: {
                  show: false,
                },
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#ffb32f",
                    "#e95652",
                    "#07b36e",
                    "#a0a7e6",
                    "#919e8b",
                  ];
                  if (params.value == max_data[0]) {
                    return "#418efe";
                  } else if (params.dataIndex >= colorList.length) {
                    return colorList[params.dataIndex - colorList.length];
                  } else {
                    return colorList[params.dataIndex];
                  }
                },
              },
            },
            data: data,
          },
        ],
      };
      // 当数据更新了 在dom中渲染后 再去渲染echarts
      this.$nextTick(() => {
        echarts.init(myChart, "tdTheme").setOption(option, true);
      });
    },
    
  },
  watch: {
    $route(n, o) {
      if (n.fullPath !== o.fullPath) {
        //监听路由参数是否变化
        this.getData(); //methods中封装的加载数据函数
      }
    },
    // echarts_data发生变化  当数据更新了 在dom中渲染后 再去执行this.chartDraw1
    chartData1() {
      this.$nextTick(() => {
        this.chartDraw1();
      });
    },
    chartData2() {
      this.$nextTick(() => {
        this.chartDraw2();
      });
    },
    chartData3() {
      this.$nextTick(() => {
        this.chartDraw3();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.standard {
  width: 1200px;
  margin: 30px auto 0;
  overflow: hidden;

  .standard_content {
    width: 900px;
    background: #fff;
    float: left;
    margin-right: 20px;
    padding: 0 30px;
    box-sizing: border-box;
    padding-bottom: 60px;
  }

  .standard_right {
    width: 280px;
    float: left;

    & > div {
      background: #ffffff;
    }
    .standard_charts {
      width: 100%;
      min-height: 280px;
      margin-bottom: 20px;
      background: #fff;
      padding: 0 14px 14px;
      box-sizing: border-box;
      .standard_charts_title {
        font-size: 18px;
        line-height: 26px;
        color: #3f424b;
        position: relative;
        height: 50px;
        padding-top: 10px;
        border-bottom: 1px solid #ccc;
        &:before {
          content: "";
          width: 102px;
          height: 2px;
          position: absolute;
          background: #3388ff;
          bottom: 0;
        }
      }
    }
    .right-content-chart {
      width: 100%;
      padding: 0 15px 30px 15px;

      .recommend-header-box {
        height: 50px;

        .recommend-header {
          height: 48px;
          line-height: 48px;

          span {
            font-size: 18px;
            color: #3f424b;
          }
        }

        .recommend-header-line {
          position: relative;
          width: 105px;
          height: 2px;
          background: #3388ff;
        }
      }
      .recommend-content-box {
        width: 100%; //随意写的 去掉就行
        img {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
