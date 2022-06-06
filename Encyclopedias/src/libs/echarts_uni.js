// 标准统计
export const standardStatistics = {
  tooltip: {
    //提示框，可以在全局也可以在
    trigger: "item", //提示框的样式
    formatter: "{a} <br/>{b}: {c} ({d}%)",
    color: "#000", //提示框的背景色
    textStyle: {
      //提示的字体样式
      color: "white",
    },
    position: "right",
  },
  series: [
    {
      name: "",
      type: "pie", //环形图的type和饼图相同
      radius: ["28%", "40%"], //饼图的半径，第一个为内半径，第二个为外半径
      center: ["50%", "45%"],
      color: [
        "#fa4343",
        "#16afcc",
        "#85c021",
        "#d12a6a",
        "#0e72cc",
        "#6ca30f",
        "#f59311",
        "#fa4343",
        "#16afcc",
      ],
      label: {
        normal: {
          //正常的样式
          show: true,
          color: "#333333",
          fontSize: 12,
          position: "right",
          formatter: function (res) {
            return res.name.substring(0, 4) + "...";
          },
        },
        // emphasis: { //选中时候的样式
        //     show: true,
        //     textStyle: {
        //         fontSize: '20',
        //         fontWeight: 'bold'
        //     }
        // }
      }, //提示文字
      data: [],
    },
  ],
};

// 总体统计
export const totalStatistics = {
  tooltip: {
    //提示框，可以在全局也可以在
    trigger: "item", //提示框的样式
    formatter: "{b} ({d}%)",
    color: "#000", //提示框的背景色
    textStyle: {
      //提示的字体样式
      color: "white",
    },
    position: "right",
  },
  title: {
    show: true,
    text: "",
    left: "center",
    top: "44%",
    textStyle: {
      fontSize: 25,
      align: "center",
    },
  },
  series: [
    {
      name: "",
      type: "pie", //环形图的type和饼图相同
      radius: ["58%", "80%"], //饼图的半径，第一个为内半径，第二个为外半径
      center: ["50%", "50%"],
      color: [
        "rgb(4,106,243)",
        "rgb(219,228,255)",
        "rgb(194,207,255)",
        "rgb(116,147,255)",
        "rgb(51,136,255)",
        "rgb(249,98,112)",
        "rgb(253,195,0)",
        "rgb(48,211,148)",
      ],
      label: {
        normal: {
          //正常的样式
          show: true,
          color: "#333333",
          fontSize: 12,
          position: "right",
        },
        // emphasis: { //选中时候的样式
        //     show: true,
        //     textStyle: {
        //         fontSize: '20',
        //         fontWeight: 'bold'
        //     }
        // }
      }, //提示文字
      minShowLabelAngle: 5,
      data: [],
    },
  ],
};

//趋势统计
export const tendencyStatistics = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "none", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  xAxis: {
    type: "category",
    data: [
      "设计标准",
      "制造标准",
      "试验标准",
      "服务标准",
      "通用标准",
      "基础产品",
      "运营管理",
    ],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#e6e9f0",
      },
    },
    axisLabel: {
      color: "#60636f",
    },
  },
  legend: {
    bottom: "3%",
  },
  grid: {
    left: "1%",
    right: "1%",
    bottom: "16%",
    top: "7%",
    containLabel: true,
  },
  yAxis: {
    type: "value",
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        opacity: 0.2,
      },
    },
    axisLine: {
      lineStyle: {
        color: "#e6e9f0",
      },
    },
    axisLabel: {
      color: "#60636f",
    },
  },
  series: [
    {
      name: "GB",
      type: "bar",
      barWidth: 25,
      stack: 'Ad',
      data: [100, 222, 3333, 444, 555, 666, 100, 100, 100],
      color: "#046af3",
    },
    {
      name: "GJB",
      type: "bar",
      barWidth: 25,
      stack: 'Ad',
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
      color: "#3388ff",
    },
    {
      name: "HB",
      type: "bar",
      barWidth: 25,
      stack: 'Ad',
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
      color: "#7493ff",
    },
    {
      name: "Q/AVIC",
      type: "bar",
      barWidth: 25,
      stack: 'Ad',
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
      color: "#76adf9",
    },
    {
      name: "SJ",
      type: "bar",
      barWidth: 25,
      stack: 'Ad',
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
      color: "#c2cfff",
    },
    {
      name: "近一年新增",
      type: "bar",
      barWidth: 25,
      data: [300, 300, 300, 300, 300, 300, 300, 300, 300],
      color: "#d5dfff",
    },
  ],
};

// 个人浏览历史记录
export const historyStatistics = {};

// 兴趣领域趋势
export const interestStatistics = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "rgba(0,0,0,0.2)",
        width: 1,
        type: "solid",
      },
    },
  },
  legend: {
    data: ["制造类", "数字化技术", "数据管理"],
    bottom: "2%",
  },

  singleAxis: {
    left: 30,
    right: 30,
    top: 20,
    bottom: 75,
    axisTick: {},
    axisLabel: {},
    type: "time",
    show: true,
    axisPointer: {
      animation: true,
      label: {
        show: true,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        opacity: 0.2,
      },
    },
  },

  series: [
    {
      type: "themeRiver",
      emphasis: {
        focus: "series",
        blurScope: "coordinateSystem",
      },
      label: {
        fontSize: 10,
        show: false,
      },
      color: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      data: [
      ],
    },
  ],
};
