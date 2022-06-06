<template>
  <!-- 顶部检索 -->
  <div class="layout_container" style="display: flex">
    <div
      style="
        width: 210px;
        height: 104px;
        margin-right: 162px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <img
        @click="gotoHome"
        style="display: block; width: 210px; cursor: pointer"
        src="@/img/Logo.png"
      />
    </div>
    <div style="height: 104px; display: flex; align-items: center">
      <Input
        class="search_input"
        v-model="Input_seach_data_1"
        @on-enter="Btnimg_seach_click_1('0')"
      />
      <Button
        style="
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 100px;
          height: 40px;
        "
        type="primary"
        search
        @click="Btnimg_seach_click_1('0')"
        >本站搜索</Button
      >
      <Button
        type="primary"
        ghost
        style="margin-left: 12px; width: 100px; height: 40px"
        @click="Btnimg_seach_click_1('1')"
        >全站搜索</Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSearchType",
  components: {},
  data() {
    return {
      // 第一个输入框的值
      Input_seach_data_1: ""
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    Btnimg_seach_click_1(index) {
      // 0是本站搜索，1是全站搜索，val.date是输入框的内容即参数，2是以图搜索，val.date是文件数据
      this.$emit(
        "seach_btn",
        JSON.stringify({ type: index, data: this.Input_seach_data_1 })
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.router_val != undefined) {
          this.Input_seach_data_1 = this.router_val.data;
        } else {
          this.Input_seach_data_1 = "";
        }
      }, 500);
    });
  },
  watch: {},
  computed: {
    router_val() {
      if (this.$route.query.val == undefined) {
        return undefined;
      } else {
        return JSON.parse(this.$route.query.val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.search_input {
  width: 615px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 40px;
  line-height: 40px;
  /deep/ .ivu-input {
    height: 40px;
    box-shadow: none;
    line-height: 40px;
    border-radius: 0;
    float: left;
  }
}
</style>