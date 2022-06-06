<template>
  <div class="contBack">
    <!-- banner -->
    <div class="cont_max">
      <div class="cont_1600 headerBack" style="height:520px">
        <div class="headerText">
          <div
            style="font-size:46px;font-weight:600;line-height:46px;color:#ffffff;letter-spacing: 2px;"
          >
            航空数智服务平台数据魔方
          </div>
          <div
            style="font-size:18px;color:#ffffff;margin-top:29px;letter-spacing: 2px;"
          >
            涵盖数据采集、治理、储存的智能平台
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
            <div>
              <div class="headerBack3_cont_title">数据采集</div>
              <div class="headerBack3_cont_text">
                航空数智服务平台是依赖于数据进行智能化处理的服务平台，采集数据是首要的步骤。系统内部提供了统一的接口，可以处理包括结构化、非机构化等各种形式的数据，也可以采集文本、图像、视频等各个模态的数据，为后续的智能化处理提供原始素材。
              </div>
            </div>
            <div>
              <div class="headerBack3_cont_title">数据治理</div>
              <div class="headerBack3_cont_text">
                数据治理的最终目标是提升数据的价值，数据治理非常必要，是企业实现数字战略的基础，它是一个管理体系，包括组织、制度、流程、工具。系统在基于安全性、开放性、有价值、有效性的原则之上，进行了数据安全、数据质量、元数据管理等模块的研究开发。
              </div>
            </div>
            <div>
              <div class="headerBack3_cont_title">数据仓库</div>
              <div class="headerBack3_cont_text">
                数据仓库是信息的中央存储库，通过数据治理之后的有价值数据将流入数据仓库。数据仓库包含众多数据库，可以根据业务需求进行数据的定义，也可以通过查询工具使用定义好的schema来访问和分析数据。数据仓库可以整合多个来源的数据，数据质量高、一致且准确。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "magicSquare",
  components: {},
  props: {},
  data() {
    return {
      searchWord: "", //搜索词
    };
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.contBack {
  background-size: 1600px;
  min-width: 1600px;
  }
.headerBack {
  position: relative;
  background: url(~@/img/modeIndex/mf_banner.png) no-repeat center;
  .headerText {
    position: absolute;
    top: 215px;
    left: 197px;
  }
}
.headerBack2 {
  background: #ffffff url(~@/img/modeIndex/mf_banner2.png) no-repeat center;
}
.headerBack3 {
  background: #f1f3fa url(~@/img/modeIndex/mf_banner3.png) no-repeat center;
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
