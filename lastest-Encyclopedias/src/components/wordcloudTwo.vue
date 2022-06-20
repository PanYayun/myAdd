<template>
    <div ref="wordcloud" class="wordcloud"> </div>
</template>

<script>
import echarts from 'echarts';
import 'echarts-wordcloud/dist/echarts-wordcloud';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
export default {
  props: ['wordcloudData'],
  data() {
    return {
      wordList: [],
    };
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      let myChart = echarts.init(this.$refs.wordcloud);
      myChart.setOption({
        series: [
          {
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [14, 28],
            rotationRange: [0, 0],
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' + 63 + ', ' + 66 + ', ' + 75 + ')';
                },
              },
            },
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '200%',
            height: '200%',
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
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.wordcloud {
  width: 100%;
  height: 114px;
  margin: auto;
}
</style>