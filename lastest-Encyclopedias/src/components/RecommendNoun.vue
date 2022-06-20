<template>
  <div class="recommendNoun">
    <div class="recommend-header-box">
      <div class="recommend-header">
        <span>{{ title }}</span>
      </div>
      <div class="recommend-header-line"></div>
    </div>
    <div
      v-for="(item, index) in listData"
      :key="index"
      class="recommend-content-box"
    >
      <div
        v-if="listData_box_1"
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
        v-else-if="listData_box_2"
        v-for="(v, index2) in item.value"
        :key="index2"
        class="recommend-subContent-box"
        :class="[index2 > 0 ? 'con-subContent-top' : '']"
      >
        <div class="con-left">{{ cItemKey(item.key, index2) }}</div>
        <div v-if="v.detail_page" class="con-right" @click="con_right_click(v.name)">{{ v.name }}</div>
        <div v-else class="con-right_2">{{ v.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendNoun",
  props: ["title", "listData"],
  components: {},
  data() {
    return {
      listData_box_1: false,
      listData_box_2: true
    };
  },
  mounted() {
    if (this.listData[0].value.length == "0") {
      this.listData_box_1 = true;
      this.listData_box_2 = false;
    } else {
      this.listData_box_1 = false;
      this.listData_box_2 = true;
    }
  },
  methods: {
    cItemKey(item, index) {
      if (index > 0) {
        return "";
      } else {
        return item;
      }
    },
    con_right_click(index) {
      this.$store.commit("setspinShow_", true);
      setTimeout(() => {
        this.$store.commit("setspinShow_", false);
      }, 200);
      this.$router.push({ path: "/TermDetail", query: { id: index } });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.recommendNoun {
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
    margin-top: 17px;
    .recommend-subContent-box {
      overflow: hidden;
      .con-left {
        float: left;
        width: 66px;
        font-size: 14px;
        color: #3f424b;
        font-weight: bold;
      }
      .con-right {
        float: right;
        width: 184px; //280-15-15-66
        font-size: 14px;
        color: #3f424b;
        cursor: pointer;
        color: #3388ff;
      }
      .con-right_2 {
        float: right;
        width: 184px; //280-15-15-66
        font-size: 14px;
        color: #3f424b;
      }
    }
    .con-subContent-top {
      margin-top: 8px;
    }
  }
}
</style>