<template>
  <div class="main_wrap">
    <standardHeader  ref="standardHeader" />
    <div v-if="$route.path == '/standard/index'">
      <div class="index-con">
        <div class="index-con2">
          <transition name="fade-transform" mode="out-in">
            <router-view class="indexView" />
          </transition>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="view_wrap">
        <transition name="fade-transform" mode="out-in">
          <router-view class="view" />
        </transition>
      </div>
      <standardFooter ref="standardFooter" />
    </div>
  </div>
</template>

<script>
import standardHeader from "./components/header";
import standardFooter from "./components/footer";

export default {
  name: "standardMain",
  components: {
    standardHeader,
    standardFooter,
  },
  mounted() {},
  computed: {
    viewH: function() {},
  },
};
</script>

<style scoped lang="less">
.main_wrap {
  width: 100%;
  background: #efefef;
  display: flex;
  flex-direction: column;
}

.view_wrap {
  padding: 25px 20px;
  .view {
    min-height: calc(100vh - 180px);
  }
}

.indexView {
  // width: 1600px;
  // position: relative;
  // left: 50%;
  margin: 0 auto;
  // margin-left:-800px;
  max-height: 900px;
  // height: calc(100vh - 70px);
  // background: url("~@/img/zhjb_index_bg.png") no-repeat center;
  // background: url("~@/img/zhbz_index.png") no-repeat center;

  // filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  // background-size: 100%;
  // overflow: hidden;
}
.index-con {
  width: 1600px;
  margin: 0 auto;
  /* background: url("~@/img/zhjb_index_bg.png") no-repeat center; */
  
  background: url("~@/img/zhbz_index.png") no-repeat center;

  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  background-size: 100%;
  overflow: hidden;
  height: calc(100vh - 70px);
  /* opacity: 0.3; */
}
.index-con2 {
  margin: 0 auto;
}
</style>
