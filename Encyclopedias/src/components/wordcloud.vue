<template>
  <div ref="wordcloud" class="wordcloud">
    <!-- <img src="../../src/img/yuan.png" alt="" /> -->
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  props: ["wordcloudData"],
  data() {
    return {
      wordList: [],
    };
  },
  mounted() {},
  methods: {
    initchart() {
      // var maskImage = new Image()
      //重点：图片的base64码，我用的png图片
      // maskImage.src = require('../../src/img/yuan.png');
      let myChart = echarts.init(this.$refs.wordcloud);
      myChart.setOption({
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 5,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            //  maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                },
              },
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.wordList,
          },
        ],
      });
    },
  },
  watch: {
    wordcloudData: {
      handler(newVal, oldVal) {
        this.wordList = newVal;
        this.initchart();
      },
      // 加上之后第一次定义时就会执行
      // immediate: true,
      // 深度监听即当要监听对象或数组的时候需要添加deep:true属性
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.wordcloud {
  width: 100%;
  height: 230px;
  margin: auto;
}
</style>
