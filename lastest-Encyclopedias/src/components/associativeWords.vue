<template>
  <div >
    <Input
      v-model="searchWord"
      @on-change="specifiName()"
      @on-enter="spendBtn()"
      placeholder="请输入关键字"
      class="search_input"
    />
    <ul class="relatedword" v-if="relatedwordShow">
      <li
        v-for="(item, index) in relatedwordBox"
        :key="index"
        @click="relatedwordText(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      ajaxShow: true,
      relatedwordShow: false, //联想词
      searchWord: "", //搜索值
      relatedwordBox: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    specifiName() {
      this.$emit("searchWord", this.searchWord);
      if (this.ajaxShow === true) {
        this.relatedwordShow = true;
        this.$axios(
          "/baike/sousuo/search_relatedword",
          "post",
          this.$qs.stringify({
            query: this.searchWord,
          })
        ).then((res) => {
          this.relatedwordBox = res.data.data;
        });
      }
    },
    relatedwordText(val) {
      this.ajaxShow = false;
      this.relatedwordShow = false;
      this.searchWord = val;
      this.ajaxShow = true;
      this.$emit("searchWord", this.searchWord);
    },
    spendBtn() {
      this.$emit("searchBtn", this.searchWord);
    },
    urlText() {
      this.searchWord = this.$route.query.val;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.search_input {
  width: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: auto;
  line-height:auto;
  /deep/ .ivu-input {
    height: 100%;
    box-shadow: none;
    line-height: 100%;
    border-radius: 0;
    float: left;
  }
}
.relatedword {
  overflow: hidden;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: auto;
  z-index: 99999;
  li {
    padding: 0 10px;
    color: #666666;
    height:100%;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    // display: flex;
    // align-items: center;
    cursor: pointer;
    line-height: 40px;
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > li:hover {
    color: #3388ff;
  }
}
</style>
