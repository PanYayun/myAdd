<template>
  <div class="recommendImage">
    <div class="recommend-header-box">
      <div class="recommend-header">
        <span>{{ title }}</span>
      </div>
      <div class="recommend-header-line"></div>
    </div>
    <div class="recommend-content-box">
      <div
        v-for="(item, index) in listData.slice(0, 2)"
        :key="index"
        :id="item.SGXSDID"
        class="recommend-content"
        @click="touchRow(item)"
      >
        <div class="image-Box">
          <img :src="item.img" />
        </div>
        <div class="text-box">
          <div class="text-subBox">
            <span>{{ item.XGMC }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendImage",
  props: ["title", "listData"],
  components: {},
  data() {
    return {};
  },
  mounted() { },
  methods: {
    touchRow(item) {
      this.$store.commit("setspinShow_", true);
      setTimeout(() => {
        this.$store.commit("setspinShow_", false);
      }, 200);
      this.$router.push({
        path: "/CivilAviationDetail",
        query: {
          id: item.XGBZBH
        }
      });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.recommendImage {
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
      height: 94px;
      cursor: pointer;
      line-height: 30px;
      border-bottom: 1px solid #f5f5f5;

      .image-Box {
        float: left;
        line-height: 94px;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .text-box {
        width: 190px; //280-15-15-60
        height: 100%;
        overflow: hidden;
        padding-left: 10px;
        float: left;
        display: table;

        .text-subBox {
          display: table-cell;
          vertical-align: middle;

          span {
            font-size: 14px;
            color: #3f424b;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: normal;
          }
          &span:hover {
            color: #3388ff;
          }
        }
      }
    }
  }
}
</style>