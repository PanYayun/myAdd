<template>
  <div class="recommendChart">
    <div class="recommend-header-box">
      <div class="recommend-header">
        <span>{{ title }}</span>
      </div>
      <div class="recommend-header-line"></div>
    </div>
    <div class="recommend-content-box">
      <!-- chart -->
      <img :src="testimg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendChart",
  props: ["title", "img"],
  components: {},
  data() {
    return {
      testimg: ""
    };
  },
  mounted() {
    this.setImg();
  },
  methods: {
    setImg() {
      var name = this.img;
      //变量是字符串格式  require 里面必须是一个路径
      this.testimg = require("../img/" + name);
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.recommendChart {
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
</style>