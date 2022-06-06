<template>
    <div>
        <!-- 相关科研期刊 -->
        <ul class="list_nav_ul flex">
            <li class="active text_hidden_2" style="display: flex; align-items: center">
                {{ search_standard.header }}
            </li>
        </ul>
        <div class="list list_em">
            <div id="main" style="width: 312;height: 312px;"></div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
  components: {},
  props: ['search_standard'],
  data() {
    return {
      charts: '',
      chartsData: this.search_standard.data,
    };
  },
  watch: {
    search_standard() {
      this.chartsData = this.search_standard.data;
      console.log(this.chartsData);
      this.drawPie('main');
    },
  },
  computed: {},
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.opinion,
          show: false,
        },
        series: [
          {
            name: '相关科研期刊',
            type: 'pie',
            radius: '50%',
            data: this.chartsData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.name {
  /deep/ em {
    color: #e21e1e;
  }
}
.flex2 {
  display: flex;
  justify-content: space-between;
}
.result_list_item {
  padding: 20px 0px;
  border-bottom: 1px solid #eeeeee;

  &:last-of-type {
    border-bottom: none;
  }

  .title {
    .title_text {
      font-size: 17px;
      font-weight: bold;
      white-space: nowrap;
      max-width: 670px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      // /deep/ em {
      //   color: rgb(223, 11, 64);
      // }
    }

    .title_text:hover {
      color: #3388ff;
    }

    .state_token2 {
      span {
        padding: 0px 6px;
        line-height: 18px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }

  .content {
    font-size: 14px;
    line-height: 22px;
    color: #60636f;
    margin-top: 15px;
  }

  .source {
    font-size: 14px;
    line-height: 18px;
    color: #a3a6ad;
    margin-top: 15px;
  }
}
.seartch_types_bottom {
  overflow: hidden;
  clear: both;
  .seartch_types_bottom_cont {
    overflow: hidden;
    font-size: 14px;
    color: #60636f;
    display: flex;
    line-height: 26px;
    .seartch_types_bottom_cont_r {
      flex: 1;
    }
  }
}
.seartch_source_bottom {
  display: flex;
  line-height: 30px;
  font-size: 12px;
  color: #b1b3b9;
  & > div {
    margin-right: 30px;
  }
}

// 科研-标准-质量-视角  -------知识探索
.searchlist_visualangle {
  overflow: hidden;
  clear: both;
  padding-left: 24px;
  margin-bottom: 18px;
}
.searchlist_visualangle_header {
  font-size: 16px;
  color: #3f424b;
  line-height: 28px;
  font-weight: 600;
}
.searchlist_visualangle_cont {
  overflow: hidden;
  line-height: 32px;
  & > div {
    display: flex;
    font-size: 18px;
    .searchlist_visualangle_header_l {
      font-size: 14px;
      white-space: nowrap;
      max-width: 570px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .searchlist_visualangle_header_r {
      display: flex;
      align-items: center;
      span {
        padding: 0px 6px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 12px;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
.state_token {
  span {
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 10px;
    font-size: 14px;
    white-space: nowrap;
  }

  .span_1 {
    background: rgba(51, 136, 255, 0.14);
    color: #3388ff;
  }

  .span_2 {
    background: rgba(255, 137, 0, 0.14);
    color: #ff8900;
  }

  .span_3 {
    background: rgba(231, 98, 62, 0.14);
    color: #e7623e;
  }
  .span_4 {
    background: rgba(125, 241, 8, 0.14);
    color: #56eb16;
  }
  .span_5 {
    background: rgba(231, 7, 26, 0.14);
    color: #e21e1e;
  }
}
</style>