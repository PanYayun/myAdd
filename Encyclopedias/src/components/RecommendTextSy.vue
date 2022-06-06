<template>
    <div class="recommendText">
        <div class="recommend-header-box">
            <div class="recommend-header">
                <span>{{ title }}</span>
            </div>
            <div class="recommend-header-line"></div>
        </div>
        <div class="recommend-content-box">
            <div v-if="listData.length == 0" style="
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 25px;
          border-bottom: 1px solid #f5f5f5;
        ">
                <span>暂无数据</span>
            </div>
            <div v-else v-for="item in listData.slice(0, 5)" :key="item.XGBZBH" class="recommend-content" @click="toSYDetail(item)">
                <div><span class="line_ellipsis_2">{{ item.title }}</span></div>
                <div>
                    释义来源：<span :title="item.source" style="max-width: 86px;display: inline-block;" class="line_ellipsis_1">{{ item.source }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'recommend-text',
  props: ['title', 'listData'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //术语详情
    toSYDetail(item) {
      this.$router.push({
        path: '/TermDetail',
        query: { id: item.search_id.SYZWMC },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.recommendText {
  width: 100%;
  padding: 0 15px 0 15px;

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
    .recommend-content {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      padding-bottom: 10px;
      // padding-left: 25px;
      line-height: 30px;
      cursor: pointer;
      // background: url("../img/recommend_link.png") no-repeat 0px 18px;
      border-bottom: 1px solid #f5f5f5;
      span:hover {
        color: #3388ff;
      }
      div {
        max-width: 65%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
