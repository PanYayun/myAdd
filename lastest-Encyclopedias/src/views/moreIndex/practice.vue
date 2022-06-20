<template>
  <div class="contBack">
    <!-- banner -->
    <div class="cont_max">
      <div class="cont_1600 headerBack" style="height:480px">
        <div class="headerText">
          <div
            style="font-size:46px;font-weight:600;line-height:46px;color:#ffffff;letter-spacing: 2px;"
          >
            航空数智服务平台数知实践
          </div>
          <div
            style="font-size:18px;color:#ffffff;margin-top:29px;letter-spacing: 2px;"
          >
            深度融合，创造数字化未来
          </div>
        </div>
      </div>
    </div>
    <div
      class="cont_max cont_maxTop"
      style="background:#f5f8fa;padding-top:100px;position:relative;"
    >
      <div
        class="cont_max_header"
        :class="
          headerOpen == true ? 'cont_max_headerNoFixed' : 'cont_max_headerFixed'
        "
      >
        <div
          :class="nowIndex == index ? 'active' : ''"
          v-for="(item, index) in arrList"
          :key="index"
          @click="scrollToGraph(item.value, index)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="cont_1600 headerBack2">
        <div
          class="headerBack2_cont"
          :class="'item' + (1 + index)"
          v-for="(item, index) in practiceCont"
          :key="index"
        >
          <div
            class="headerBack2_cont_header"
            :class="'headerBack_back' + (1 + index)"
          >
            <div class="headerBack2_cont_title">
              {{ item.title }}
            </div>
            <div class="headerBack2_cont_text">
              {{ item.contText }}
            </div>
          </div>
          <div class="headerBack2_cont_list">
            <div v-for="(item2, index) in item.arr" :key="index">
              <div class="headerBack2_cont_list_title">{{ item2.title }}</div>
              <div class="headerBack2_cont_list_cont">{{ item2.contText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { practiceData } from "@/libs/practiceData.js";
export default {
  name: "magicBox",
  components: {},
  props: {},
  data() {
    return {
      searchWord: "", //搜索词
      arrList: [
        { name: "航空百科", value: "item1" },
        { name: "智慧标准", value: "item2" },
        { name: "智慧质量", value: "item3" },
      ],
      practiceCont: practiceData,
      nowIndex: "0",
      headerOpen: true,
    };
  },
  mounted() {
    document.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    scrollToGraph(item, index) {
      $("body").animate(
        {
          scrollTop:
            $("." + item + "").offset().top + $("body").scrollTop() - 49,
        },
        500
      );
    },
    handleScroll() {
      //获取滚动时的高度
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let hearTop = $(".cont_maxTop").offset().top + $("body").scrollTop(); //滚动条头部开始的地方
      let hearTop1 = $(".item1").offset().top + $("body").scrollTop() - 50;
      let hearTop2 = $(".item2").offset().top + $("body").scrollTop() - 50;
      let hearTop3 = $(".item3").offset().top + $("body").scrollTop() - 50;
      if (scrollTop > hearTop) {
        this.headerOpen = false;
      }
      if (scrollTop < hearTop) {
        this.headerOpen = true;
      }
      if (scrollTop >= hearTop1) {
        this.nowIndex = "0";
      }
      if (scrollTop >= hearTop2) {
        this.nowIndex = "1";
      }
      if (scrollTop >= hearTop3) {
        this.nowIndex = "2";
      }
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
.contBack {
  background-size: 1600px;
  min-width: 1600px;
}
.headerBack {
  position: relative;
  background: url(~@/img/modeIndex/list_banner.png) no-repeat center;
  .headerText {
    position: absolute;
    top: 215px;
    left: 197px;
  }
}
.cont_max_headerFixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.cont_max_headerNoFixed {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.cont_max_header {
  width: 100%;
  height: 50px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 5px 2px #e5e5e5;
  & > div {
    width: 200px;
    font-size: 16px;
    color: #858b9a;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > a {
      color: #858b9a;
    }
  }
  .active {
    color: #3388ff;
    border-bottom: 2px solid #3388ff;
  }
}
.headerBack_back1 {
  background: url(~@/img/modeIndex/list_banner2.png) no-repeat center;
}
.headerBack_back2 {
  background: url(~@/img/modeIndex/list_banner3.png) no-repeat center;
}
.headerBack_back3 {
  background: url(~@/img/modeIndex/list_banner4.png) no-repeat center;
}
.headerBack2 {
  position: relative;
  background: url(~@/img/modeIndex/list_back.png) no-repeat center;
  .headerBack2_cont {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    .headerBack2_cont_header {
      height: 120px;
      width: 100%;
      padding-left: 25px;
      padding-top: 24px;
      box-sizing: border-box;
      margin-bottom: 30px;

      .headerBack2_cont_title {
        font-size: 28px;
        line-height: 28px;
        font-weight: 600;
        color: #ffffff;
      }
      .headerBack2_cont_text {
        margin-top: 12px;
        line-height: 22px;
        font-size: 14px;
        color: #ffffff;
        max-width: 994px;
      }
    }
    .headerBack2_cont_list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      & > div {
        width: 586px;
        height: 194px;
        background: #ffffff;
        margin-bottom: 30px;
        padding: 25px 28px 0 23px;
        box-shadow: 0px 0px 7px 2px #e5e5e5;
        .headerBack2_cont_list_title {
          font-size: 18px;
          color: #3f424b;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .headerBack2_cont_list_cont {
          color: #858b9a;
          line-height: 24px;
        }
      }
    }
    .headerBack2_cont_list > div:hover .headerBack2_cont_list_title {
      color: #3388ff;
    }
  }
}
.cont_max {
  width: 100%;
  overflow: hidden;
  min-width: 1600px;
  .cont_1600 {
    width: 1600px;
    height: auto;
    margin: 0 auto;
  }
  .cont_1200 {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }
}
</style>
