<template>
  <div class="contBack">
    <!-- banner -->
    <div class="cont_max">
      <div class="cont_1600 headerBack" style="height:520px">
        <div class="headerText">
          <div
            style="font-size:46px;font-weight:600;line-height:46px;color:#ffffff;letter-spacing: 2px;"
          >
            航空数智服务平台算法魔盒
          </div>
          <div
            style="font-size:18px;color:#ffffff;margin-top:29px;letter-spacing: 2px;"
          >
            算法孵化基地，给数据赋能，让数据更有价值
          </div>
        </div>
      </div>
    </div>
    <!-- 背景图 -->
    <div class="cont_max">
      <div class="cont_1600 headerBack2" style="height:736px"></div>
    </div>
    <!-- 内容 -->
    <div class="cont_max">
      <div class="cont_1600 headerBack3" style="height:746px">
        <div class="headerBack3_cont">
          <div class="headerBack3_cont_c">
            <div @click="gotoPage()">
                <div class="headerBack3_cont_title">模型工具</div>
                <div class="headerBack3_cont_text">
                  航空数智服务平台根据航空领域的数据特点，结合当下的人工智能技术，研究并开发出了大量的人工智能模型，包括文本分类、新词发现、实体抽取等，可以高效的处理各类结构化和非结构化的文本图像数据，从数据中提取出大量有价值的信息。
                </div>
            </div>
            <div>
              <a href="http://10.216.6.232:8888/#/index">
                <div class="headerBack3_cont_title">模型工厂</div>
                <div class="headerBack3_cont_text">
                  基于模型的全生命周期，模型工厂提供了可视化的模型创建操作，平台封装了数十种智能算法模型，用户可以根据自己的业务数据的特点，选择合适的模型，调用平台的高性能计算资源，训练出相应的业务模型，让更多的用户可以训练自己的AI模型。
                </div>
              </a>
            </div>
            <div>
              <router-link to="/TableList/addTask">
                <div class="headerBack3_cont_title">模型应用</div>
                <div class="headerBack3_cont_text">
                  航空数智服务平台将智能AI模型应用到航空核心业务中，定制开发了基于标准、质量、装备、事故等数据的业务模型，可自动化处理特定场景下的业务数据，从复杂的数据中抽取出有价值的信息，将业务人员从繁杂的数据处理中解放出来。
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "magicBox",

  props: {},
  data() {
    return {
      searchWord: "", //搜索词
    };
  },
  created() {},
  methods(){},
  mounted() {
   
  },
};
</script>
<style lang="less" scoped>
.contBack {
  background-size: 1600px;
  min-width: 1600px;
}
.headerBack {
  position: relative;
  background: url(~@/img/modeIndex/mh_banner.png) no-repeat center;
  .headerText {
    position: absolute;
    top: 215px;
    left: 197px;
  }
}
.headerBack2 {
  background: #ffffff url(~@/img/modeIndex/mh_banner2.png) no-repeat center;
}
.headerBack3 {
  background: #f1f3fa url(~@/img/modeIndex/mh_banner3.png) no-repeat center;
  .headerBack3_cont {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .headerBack3_cont_c {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 400px;
      & > div {
        width: 380px;
        height: 250px;
        .headerBack3_cont_title {
          font-size: 24px;
          line-height: 24px;
          color: #3f424b;
          padding: 0 30px;
          box-sizing: border-box;
          font-weight: 600;
        }
        .headerBack3_cont_text {
          margin-top: 48px;
          font-size: 14px;
          line-height: 26px;
          color: #858b9a;
          padding: 0 30px;
          box-sizing: border-box;
        }
      }
    }
  }
}

.cont_max {
  width: 100%;
  overflow: hidden;
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
