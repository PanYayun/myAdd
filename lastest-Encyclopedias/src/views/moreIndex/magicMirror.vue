<template>
  <div class="contBack">
    <!-- banner -->
    <div class="cont_max">
      <div class="cont_1600 headerBack" style="height:520px">
        <div class="headerText">
          <div
            style="font-size:46px;font-weight:600;line-height:46px;color:#ffffff;letter-spacing: 2px;"
          >
            航空数智服务平台知识魔镜
          </div>
          <div
            style="font-size:18px;color:#ffffff;margin-top:29px;letter-spacing: 2px;"
          >
            AI赋能的有价值数据，为航空提供更专业的知识服务
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
             <router-link to="/home">
                <div class="headerBack3_cont_title">知识超市</div>
              <div class="headerBack3_cont_text">
                基于航空数智服务平台的数据魔方、算法模型而打造的航空百科平台，其中包含经过电子化、智能化处理的标准文本，通过知识图谱、自然语言处理、机器学习技术加工处理的元器件数据、航空术语数据、军事数据、民航事故数据等。旨在为航空领域提供全量的有价值信息
              </div>
             </router-link>
            </div>
            <div>
              <router-link to="/searchIndex">
                <div class="headerBack3_cont_title">知识检索</div>
              <div class="headerBack3_cont_text">
                依据目前的航空标准、航空质量、学术、多模态数据，打造的智能化搜索引擎，可进行航空领域数据的高效检索，提升各类业务人员的工作效率。
              </div>
              </router-link>
            </div>
            <div>
             <router-link to="/qualityIndex">
                <div class="headerBack3_cont_title">知识服务</div>
              <div class="headerBack3_cont_text">
                依据中国空空导弹研究院、中航西飞的核心业务特点，航空数智服务平台将目前的核心算法模型结合到业务中去，成功打造了智慧标准和智慧质量平台，可对标准文本和飞机质量故障数据进行全生命周期的智能化处理。
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
  name: "magicMirror",
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
  background: url(~@/img/modeIndex/mj_banner.png) no-repeat center;
  .headerText {
    position: absolute;
    top: 215px;
    left: 197px;
  }
}
.headerBack2 {
  background: #ffffff url(~@/img/modeIndex/mj_banner2.png) no-repeat center;
}
.headerBack3 {
  background: #f1f3fa url(~@/img/modeIndex/mj_banner3.png) no-repeat center;
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
