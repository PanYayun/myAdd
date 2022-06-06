<template>
  <div class="main_container">
    <queen-slow-down-board-recommend :detailData="detailData"></queen-slow-down-board-recommend>
    <detail-category-model ref="categoryModel"></detail-category-model>
  </div>
</template>

<script>
import queenSlowDownBoardRecommend from "./components/queenSlowDownBoardRecommend";
import detailCategoryModel from "./components/detailCategoryModel";
export default {
  name: "qualityWikipediaRecommend",
  components: {
    queenSlowDownBoardRecommend,
    detailCategoryModel,
  },
  computed: {
    // current: function() {
    //   const { componentList, index } = this;
    //   return componentList[index];
    // },
    detailId() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      // componentList: ["queenSlowDownBoard", "leakageAndVenting"],
      detailData: {},
    };
  },
  mounted() {
    // this.requestDetailData();
  },
  methods: {
    showTree() {
      this.$refs.categoryModel.subShowTree();
    },
    //详情
    requestDetailData() {
       this.$store.commit("setspinShow_", true);
      this.$axios("/baike/appServer/requestGetData", "get", {
        // uToken: this.$store.state.user.userInfo.token,
        uid: this.$store.state.user.userInfo.username,
        requestSource: "ZL",
        requestCode: "92612",
        requestFuncId: "102",
        requestTime: Date.parse(new Date()) / 1000,
        requestParams: {
          Fault_Id: this.detailId,
          Page_Size: "1",
          Page_NUM: "5",
          Only_Records: false,
        },
      }).then((res) => {
        this.detailData = res.data.data;
        this.ProcessingData();
        setTimeout(() => {
          this.$store.commit("setspinShow_", false);
        }, 600);
      });
    },

    ProcessingData() {
      this.detailData.middleContent.forEach((middleContent) => {
        middleContent.middleBox.forEach((middleBox, index) => {
          middleBox.isOpen = true;
        });
      });
      this.$store.commit("updated_WikipediaDetails", this.detailData);
    },

    pushHome() {
      this.$router.push({
        name: "qualityWikipedia",
      });
    },
    pushHomeWithID(item) {
      //质量
      //路由跳转详情
      if (item.faultId && item.faultId != undefined) {
        console.log(item.faultId);

        this.$router.push({
          name: "qualityWikipediaDetails",
          query: { id: item.faultId },
        });
      }
    },
    checkitemfaultId(item) {
      if (item.faultId && item.faultId != undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    detailId: {
      handler(newVal, oldVal) {
        this.requestDetailData();
      },
      // 加上之后第一次定义时就会执行
      // immediate: true,
      // 深度监听即当要监听对象或数组的时候需要添加deep:true属性
      deep: true,
    },
  },
  destroyed() {
    this.$store.commit("updated_WikipediaDetails", null);
  },
};
</script>

<style scoped lang="less">
@import "../../styles/unified.css";

.main_container {
  margin-top: 0px;
}
.current_location {
  font-size: 14px;
  color: #999999;
  height: 56px;
  /deep/ .ivu-breadcrumb-item-separator {
    color: #999999;
  }
  i {
    font-size: 18px;
    color: #999;
    margin-left: 10px;
    cursor: pointer;
  }
}

/deep/ .left_module {
  flex: 1;
  margin-right: 20px;
}

/deep/ .right_module {
  width: 340px;
}
.tree_wrap {
  max-height: 500px;
  overflow: auto;
  > div {
    margin-top: 20px;
  }
  > div:first-of-type {
    margin-top: 0px;
  }
  label {
    cursor: pointer;
  }
}
.three_level_item {
  margin-top: 15px;

  > label {
    font-size: 16px;
    font-weight: bold;
  }

  label {
    cursor: pointer;
  }
}
.topbar-home {
  cursor: pointer;
}
.topbar-home:hover {
  color: #3388ff;
}
</style>
