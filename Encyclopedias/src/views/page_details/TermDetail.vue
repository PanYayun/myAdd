<template>
    <div class="termEncyclopediaDetail">
        <div class="box-left">
            <div class="left-content-top">
                <div class="con-header">
                    <span class="header-title">{{ mainInfo.SYZWMC }}</span>
                    <div class="category-first category" v-if="mainInfo.YJFL">
                        {{ mainInfo.YJFL }}
                    </div>
                    <div class="category-sec category" v-if="mainInfo.EJFL">
                        {{ mainInfo.EJFL }}
                    </div>
                </div>
                <div class="con-content">
                    <div>
                        {{ mainInfo.ZY }}
                    </div>
                </div>
                <div class="con-button-box">
                    <div class="con-button-first con-button" @click="scrollToZW">
                        查看正文
                    </div>
                    <div class="con-button-second con-button" @click="scrollToGraph">
                        查看图谱
                    </div>
                    <div @click="isTrue">
                        <collection :coliectionData="coliectionData"></collection>
                    </div>
                </div>
            </div>
            <div class="left-content-table">
                <div class="content-header">
                    <span class="title">词条详情</span>
                </div>
                <div class="content-table-div">
                    <Table :columns="columns" :data="basicInfo" :show-header="false" :row-class-name="rowClassName" border></Table>
                </div>
            </div>
            <div class="left-content-detail textScroll">
                <div class="content-header">
                    <span class="title">条目详情文本</span>
                </div>
                <div class="content-body">
                    <div @click="clickText($event)" v-html="syzw"></div>
                </div>
            </div>
            <div class="left-content-map graphScroll">
                <div class="content-header">
                    <span class="title">知识图谱</span>
                </div>
                <div>
                    <atlas-components></atlas-components>
                </div>
            </div>
        </div>
        <div class="box-right">
            <div class="right-content-carousel" v-if="images">
                <div class="carousel-box">
                    <!-- 死图片  -->
                    <!-- <recommend-swipers style="height: 100%"></recommend-swipers> -->
                    <!-- 网络图片 -->
                    <Carousel v-model="imagesModel" style="height: 100%">
                        <CarouselItem v-for="(item, index) in images" :key="index">
                            <div class="content-carousel">
                                <img :src="item" alt="" @click="clickImages(item)" style="display: block; width: 100%; height: 100%" />
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <!-- 网络图片数量 -->
                <p>图片（{{ images.length }} 张）</p>
            </div>
            <!-- <div
        class="right-content-recommendText"
        v-if="TitleData.recommendText.isShow"
      >
        <recommend-text :title="TitleData.recommendText.title"></recommend-text>
      </div> -->
            <!-- <div
        class="right-content-recommendImage"
      >
        <recommend-image
          title="相似指标"
        ></recommend-image>
      </div> -->
            <div class="right-content-recommendNoun" v-if="this.mainInfo.XGSY">
                <recommend-noun title="相关术语" :listData="xgc"></recommend-noun>
            </div>
            <div class="popContainer" @click="hiddenLayer" :style="{ display: showLayer ? 'block' : 'none' }">
                <!-- <p class="bigImg"></p> -->
                <img :src="selectImg" alt="" class="bigImg" />
            </div>
        </div>
    </div>
</template>

<script>
import RecommendText from '@/components/RecommendText';
import RecommendImage from '@/components/RecommendImage';
import RecommendNoun from '@/components/RecommendNoun';
import WikipediaInfo from './compents/WikipediaInfo';
import StandardText from './compents/StandardText';
import RecommendSwipers from '@/components/RecommendSwipers';
import atlasComponents from '@/components/atlasComponents.vue';
import collection from '@/components/collection.vue';

export default {
  name: 'TermEncyclopediaDetail',
  props: [''],
  components: {
    RecommendText,
    RecommendImage,
    RecommendNoun,
    WikipediaInfo,
    StandardText,
    RecommendSwipers,
    atlasComponents,
    collection,
  },
  data() {
    return {
      mainInfo: {},
      basicInfo: [],
      columns: [
        {
          title: '标准号',
          key: 'key',
          width: 150,
        },
        {
          title: '标准名称',
          key: 'value',
        },
      ],
      syzw: '',
      xgc: [],
      images: [],
      imagesModel: 0,
      showLayer: false,
      selectImg: '',
      coliectionType: '术语知识百科', //["术语知识百科","标准指标", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      coliectionData: {
        username: '',
        content: { type: '', name: '', param: { SYZWMC: '' } },
      },
    };
  },
  mounted() {
    this.loadDetail();
    this.isTrue();
  },
  methods: {
    rowClassName(row, index) {
      if (index % 2 === 0) {
        return 'table-info-row-gray';
      } else {
        return 'table-info-row-white';
      }
    },
    // 点击收藏
    isTrue() {
      this.coliectionData.username = this.$store.state.user.userInfo.username;
      this.coliectionData.content.type = this.coliectionType;
      this.coliectionData.content.name = this.$route.query.id;
      this.coliectionData.content.param = {
        SYZWMC: this.$route.query.id,
      };
    },
    clickText(e) {
      if (e.target.text != undefined) {
        this.$router.push({
          path: '/TermDetail',
          query: {
            id: e.target.text,
          },
        });
      }
    },
    loadDetail() {
      this.$axios(
        '/baike/hangkongshuyu/details_page',
        'post',
        this.$qs.stringify({
          SYZWMC: this.$route.query.id,
        })
      ).then(res => {
        this.mainInfo = res.data.data.main_info;
        this.setPropertyListData(res.data.data.basic_info);
        this.images = res.data.data.images;
        this.setImagesUrl();
        var arr1 = res.data.data.typelist;
        arr1.unshift('全部');
        // this.listUl = arr1;
        this.$store.commit('updated_atlasTypeList', arr1);
        if (res.data.data.graph.nodes.length > 0) {
          this.$store.commit('updated_atlasImg', res.data.data.graph);
        }
        // 获取正文跳转
        this.syzw = res.data.data.syzw.replace(
          /src=\"/g,
          `src="` + this.$store.state.app.img_url
        );

        const str1 = this.syzw.replace(/<(\s*[^>]*)?>/g, '<$1>');
        this.syzw = str1.replace(
          /<BK>(.*?)<\/BK>/g,
          '<a style="font-size:12pt;color: #136ec2">$1</a>'
        );
        this.xgc = [
          {
            key: '相关词',
            value: this.mainInfo.XGSY,
          },
        ];
      });
    },
    setImagesUrl() {
      for (var key in this.images) {
        this.images[key] = this.$store.state.app.img_url + this.images[key];
      }
    },
    setPropertyListData(data) {
      this.basicInfo = [];
      var zsc = data.ZSC.toString();
      if (zsc && zsc.length > 0) {
        this.basicInfo.push({
          key: '族首词',
          value: zsc,
        });
      }
      var swc = data.SWC.toString();
      if (swc && swc.length > 0) {
        this.basicInfo.push({
          key: '上位词',
          value: data.SWC.toString(),
        });
      }
      var xwc = data.XWC.toString();
      if (xwc && xwc.length > 0) {
        this.basicInfo.push({
          key: '下位词',
          value: data.XWC.toString(),
        });
      }
      var tyc = data.TYC.toString();
      if (tyc && tyc.length > 0) {
        this.basicInfo.push({
          key: '同义词',
          value: data.TYC.toString(),
        });
      }
    },
    scrollToGraph() {
      $('html,body').animate(
        { scrollTop: $('.graphScroll').offset().top },
        500
      );
    },
    scrollToZW() {
      $('html,body').animate({ scrollTop: $('.textScroll').offset().top }, 500);
    },
    hiddenLayer() {
      this.showLayer = false;
    },
    clickImages(src) {
      this.selectImg = src;
      this.showLayer = true;
    },
  },
  computed: {
    syzwmc() {
      return this.$route.query.id;
    },
  },
  watch: {
    syzwmc: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.loadDetail();
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.termEncyclopediaDetail {
  width: 1200px;
  overflow: hidden;
  margin: 30px auto;
  /deep/ .ivu-table-cell {
    line-height: 30px;
  }
  .box-left {
    width: 900px;
    float: left;
    overflow: hidden;

    .left-content-top {
      width: 100%;
      background: white;
      padding: 30px 30px 32px 30px;

      .con-header {
        width: 100%;
        height: 28px;
        line-height: 28px;
        display: flex;
        vertical-align: middle;
        align-items: center;
        .header-title {
          float: left;
          font-size: 24px;
          color: #3f424b;
          font-weight: bold;
        }
        .category {
          float: left;
          min-width: 60px;
          padding: 0 6px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          border-radius: 4px;
          text-align: center;
        }
        .category-first {
          color: #3388ff;
          background: #e2eeff;
          margin-left: 20px;
        }
        .category-sec {
          color: #ff8900;
          background: #ffeedb;
          margin-left: 10px;
        }
      }
      .con-content {
        margin-top: 22px;
        line-height: 24px;
        color: #3f424b;
        font-size: 14px;
      }
      .con-button-box {
        height: 29px;
        margin-top: 20px;
        .con-button {
          width: 81px;
          height: 29px;
          border-radius: 4px;
          line-height: 29px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          float: left;
        }
        .con-button-first {
          background: #3388ff;
          color: white;
        }
        .con-button-second {
          background: white;
          color: #3388ff;
          border: 1px solid #3388ff;
          margin-left: 10px;
        }
      }
    }
    .left-content-table {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 40px 30px;

      .content-table-div {
        width: 100%;
        margin-top: 30px;

        /deep/ .ivu-table .table-info-row-gray td {
          background-color: #f5f5f5;
        }
        /deep/ .ivu-table .table-info-row-white td {
          background-color: #ffffff;
        }
        /deep/ .ivu-table-cell {
          padding-left: 27px;
        }
      }
    }
    .left-content-detail {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 32px 30px;

      .content-body {
        margin-top: 30px;
        font-size: 16px;
        line-height: 30px;
        color: #3f424b;
        overflow: hidden;
        line-height: 30px;
        img {
          max-width: 100% !important;
        }
      }
    }
    .left-content-map {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 32px 30px;
    }
    .left-content-wikipediaInfo {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 35px 30px;

      .wikipediaInfo-box {
        padding-top: 16px;
      }
    }
    .left-content-standardText {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 35px 30px;
      .standardText-box {
        padding-top: 25px;
      }
    }
    .left-content-accident {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 32px 30px;
      .content-list {
        width: 100%;
        padding: 25px 0 25px 0;
        border-bottom: 1px solid #eeeeee;
        .content-list-title {
          font-size: 16px;
          color: #3f424b;
          font-weight: bold;
        }
        .content-list-title:hover {
          color: #136ec2;
        }
        .content-list-subBox {
          margin-top: 12px;
          overflow: hidden;
          .content-list-subTitle {
            font-size: 14px;
            color: #60636f;
            float: left;
            width: 527px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-weight: normal;
          }
          .content-list-category {
            font-size: 14px;
            color: #60636f;
            float: left;
          }
        }
      }
    }
  }
  .box-right {
    width: 280px;
    float: right;

    .right-content-carousel {
      height: 203px;
      background: white;

      .carousel-box {
        padding: 10px 10px 5px 10px;
        .content-carousel {
          height: 158px;
          width: 100%;
          background: #ffffff;
          // color: white;
        }
      }
      p {
        font-size: 14px;
        text-align: center;
        color: #333333;
      }
    }
    .right-content-recommendText {
      background: white;
      margin-top: 10px;
    }
    .right-content-recommendImage {
      background: white;
      margin-top: 10px;
    }
    .right-content-recommendNoun {
      background: white;
      margin-top: 10px;
    }
  }
  .content-header {
    height: 63px;
    line-height: 63px;
    border-bottom: 1px solid #eeeeee;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #3f424b;
    }
    .sub-title {
      font-size: 14px;
      color: #e65271;
      margin-left: 130px;
    }
    .content-header-button {
      width: 81px;
      height: 29px;
      background: #3388ff;
      border-radius: 4px;
      line-height: 29px;
      text-align: center;
      font-size: 12px;
      color: white;
      float: right;
      cursor: pointer;
      margin-top: 16px;
    }
    .look-all-button {
      font-size: 14px;
      color: #3388ff;
      cursor: pointer;
      float: right;
    }
    .look-all-button:hover {
      color: #3388ff;
    }
  }
  .clean-margin-top {
    margin-top: 0 !important;
  }
}
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
</style>
