<template>
  <div class="right-content-carousel">
    <div class="carousel-box">
      <!-- loop不能加 轮播会生成两个一模一样的div 绑定的点击事件只在第一个div里面的某个节点上，而在另外一个div的那个节点上并没有绑定，所以说又一次点击是生效的，另外一次就不会生效
      不加loop轮播时，图片会倒带回第一张图片开始轮播
      -->
      <Carousel v-model="imageValue" style="height: 100%">
        <CarouselItem v-for="(item, index) in imgs" :key="index">
          <div class="content-carousel">
            <img :src="item" alt="" @click="clickImages(item)" />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <p>图片（3张）</p>
    <div
      class="popContainer"
      @click="hiddenLayer"
      :style="{ display: showLayer ? 'block' : 'none' }"
    >
      <img :src="selectImg" alt="" class="bigImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendSwiper",
  props: [],
  components: {},
  data() {
    return {
      imageValue: 0,
      imgs: [
        require("@/img/bz_img/bz_img2.png"),
        require("@/img/bz_img/bz_img3.png"),
        require("@/img/bz_img/bz_img1.png"),
      ],
      showLayer: false,
      selectImg: "",
    };
  },
  methods: {
    hiddenLayer() {
      this.showLayer = false;
    },
    clickImages(src) {
      this.selectImg = src;
      this.showLayer = true;
    },
  },
};
</script>
<style lang="less" scoped>
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  .bigImg {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.right-content-carousel {
  height: 203px;
  background: white;
  .carousel-box {
    padding: 10px 10px 5px 10px;
    .content-carousel {
      height: 156px;
      width: 100%;
      text-align: center;
      & > img {
        height: 100%;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
  p {
    font-size: 14px;
    text-align: center;
    color: #333333;
  }
}
</style>
