<template>
  <div class="wikipediaInfo">
    <div
      v-for="(item, index) in basicInfoValue"
      :key="index"
      class="recommend-content-box"
    >
      <div
        v-for="(v, index2) in item.value"
        :key="index2"
        class="recommend-subContent-box"
      >
        <div class="con-left">{{ cItemKey(item.key, index2) }}</div>
        <div class="con-right">{{ v }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikipediaInfo",
  props: ["basicInfoValue"],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    cItemKey(item, index) {
      if (index > 0) {
        return "";
      } else {
        return item;
      }
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.wikipediaInfo {
  width: 100%;
  .recommend-content-box {
    .recommend-subContent-box {
      margin-top: 10px;
      overflow: hidden;
      .con-left {
        float: left;
        width: 152px;
        font-size: 14px;
        color: #3f424b;
        text-align: right;
        line-height: 30px;
      }
      .con-right {
        float: right;
        width: 688px;
        padding-right: 20px;
        font-size: 14px;
        color: #3f424b;
        line-height: 30px;
      }
    }
  }
}
</style>
