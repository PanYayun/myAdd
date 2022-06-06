<template>
  <div class="recommendText">
    <div class="recommend-header-box">
      <div class="recommend-header">
        <span>{{ title }}</span>
      </div>
      <div class="recommend-header-line"></div>
    </div>
    <div class="recommend-content-box">
      <div
        v-if="listData.length == 0"
        style="
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 25px;
          border-bottom: 1px solid #f5f5f5;
        "
      >
        <span>暂无数据</span>
      </div>
      <div
        v-else
        v-for="item in listData.slice(0, 5)"
        :id="item.XGBZID"
        :key="item.XGBZBH"
        class="recommend-content"
        @click="touchRow(item)"
        :title="item.XGBZBH + item.XGBZ"
      >
        <span class="line_ellipsis_2">{{item.XGBZBH + " "+item.XGBZ }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend-text",
  props: ["title", "listData"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    touchRow(item) {
      this.$store.commit("setspinShow_", true);
      setTimeout(() => {
        this.$store.commit("setspinShow_", false);
      }, 200);
      this.$router.push({
        path: "/BasicDetail",
        query: { id: item.XGBZBH }
      });
    }
  }
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
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 25px;
      line-height: 30px;
      cursor: pointer;
      background: url("../img/recommend_link.png") no-repeat 0px 18px;
      border-bottom: 1px solid #f5f5f5;
      span:hover {
        color: #3388ff;
      }
    }
  }
}
</style>
