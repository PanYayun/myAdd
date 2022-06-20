<template>
    <div class="main_container">
        <div class="current_location flex vertical_center">
            <div v-if="privateHeaderShow" class="topbar-home" @click="pushHome">质量知识百科：</div>
            <div v-else class="topbar-home" @click="pushHome2">质量知识服务云平台：</div>
            <Breadcrumb separator=">">
                <Breadcrumb-item v-for="(item, index) in fileterLevel_Path" :key="index" @click.native="pushHomeWithID(item)" :class="[checkitemfaultId(item) ? 'topbar-home' : '']">{{ item.pathName }}</Breadcrumb-item>
            </Breadcrumb>
            <div v-if="detailData.hasFuncIcon">
                <i class="iconfont icon-hengxian" @click="showTree"></i>
            </div>

        </div>
        <div v-if="isJJ">
            <queen-slow-downBoard :rightImgText='rightImgText' :rightImgText2 = 'rightImgText2' :rightImgText3 = 'rightImgText3'  :detailData="detailData" @privateShow="privateShowVal"></queen-slow-downBoard>
            <detail-category-model ref="categoryModel"></detail-category-model>
        </div>
        <div v-else-if="isJJ == false">
            <queen-slow-downBoard2 :rightImgText='rightImgText' :detailData="detailData"></queen-slow-downBoard2>
        </div>
    </div>
</template>

<script>
import collapse from '@/libs/collapse';
import queenSlowDownBoard from './components/queenSlowDownBoard';
import queenSlowDownBoard2 from './components/queenSlowDownBoard2';
import detailCategoryModel from './components/detailCategoryModel';

export default {
  name: 'Details',
  components: {
    queenSlowDownBoard,
    queenSlowDownBoard2,
    collapse,   
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
      privateShow: '', // XX院的判断
      detailData: {},
      fileterLevel_Path: [],
      privateHeaderShow: true, //头部判断
      isJJ: Boolean,
      rightImgText: '', //右侧的banner图的名字
      rightImgText2:'',
      rightImgText3:'',
    };
  },
  mounted() {
    this.requestDetailData();
  },
  methods: {
    // 子元素的接收信息
    privateShowVal(data) {
      this.privateShow = data;
    },
    showTree() {
      this.$refs.categoryModel.subShowTree();
    },
    //详情
    requestDetailData() {
   
      this.$store.commit('setspinShow_', true);
      this.$axios('/baike/appServer/requestGetData', 'get', {
        // uToken: this.$store.state.user.userInfo.token,
        uid: this.$store.state.user.userInfo.username,
        requestSource: 'ZL',
        requestCode: '92612',
        requestFuncId: '102',
        requestTime: Date.parse(new Date()) / 1000,
        requestParams: {
          Fault_Id: this.detailId,
          Page_Size: '5',
          Page_NUM: '1',
          Only_Records: false,
        },
      }).then(res => {
        this.detailData = res.data.data;
        this.ProcessingData();
        setTimeout(() => {
          this.$store.commit('setspinShow_', false);
        }, 600);
      });
    },
    checkIsJunJi() {
      var ji = this.detailData.Level_Path[0].pathName;
      if (ji == '民机') {
        this.isJJ = false;
      } else {
        this.isJJ = true;
      }
      this.$forceUpdate();
    },
    ProcessingData() {
      this.checkIsJunJi();
      this.fileterLevel_Path = [];
      if (this.detailData.Level_Path.length > 0) {
        this.detailData.Level_Path.forEach(item => {
          if (item.pathName != 'display') {
            this.fileterLevel_Path.push(item);
          }
        });
      }
      this.rightImgText = this.fileterLevel_Path[
        this.fileterLevel_Path.length - 1
      ].pathName;
       this.rightImgText2 = this.fileterLevel_Path[1].pathName;
       this.rightImgText3 = this.fileterLevel_Path[3].pathName
      if (this.fileterLevel_Path[0].pathName == 'X14研究院') {
        this.privateHeaderShow = false;
      } else {
        this.privateHeaderShow = true;
      }
      this.detailData.middleContent.forEach(middleContent => {
        middleContent.middleBox.forEach((middleBox, index) => {
          middleBox.isOpen = true;
        });
      });
      this.$store.commit('updated_WikipediaDetails', this.detailData);
    },

    pushHome() {
      this.$router.push({
        name: 'qualityWikipedia',
      });
    },
    pushHome2() {
      this.$router.push({
        name: 'quality_private',
      });
    },
    pushHomeWithID(item) {
      //质量
      //路由跳转详情
      if (item.click && item.click != undefined) {
        this.$router.push({
          name: 'qualityWikipediaDetails',
          query: { id: item.faultId },
        });
      }
    },
    checkitemfaultId(item) {
      if (item.click && item.click != undefined) {
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
    $route: {
      handler: function(val, oldVal) {
        this.requestDetailData();
      },
    },
  },
  destroyed() {
    this.$store.commit('updated_WikipediaDetails', null);
  },
};
</script>

<style scoped lang="less">
@import '../../styles/unified.css';

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
