<template>
    <div class="termEncyclopediaDetail">
        <Spin fix v-if="spin_termEncyclopediaDetail"></Spin>
        <div class="box-left">
            <div class="left-content-top">
                <div class="con-header-bzh">
                    <span class="header-title-bzh">{{ title }}</span>
                </div>
                <div class="con-content" style="margin-top: 10px">
                    <div>{{ abstract }}</div>
                </div>
                <div class="con-button-box">
                    <div class="con-button-first con-button" @click="scrollToBZZW">
                        查看正文
                    </div>
                    <div class="con-button-second con-button" @click="scrollToGraph">
                        查看图谱
                    </div>
                </div>
            </div>

            <div class="left-content-wikipediaInfo">
                <div class="content-header">
                    <span class="title">基本信息</span>
                </div>
                <div class="wikipediaInfo-box">
                    <Table :columns="columns" :data="baseInfo" :show-header="false" :row-class-name="rowClassName" border></Table>
                </div>
            </div>
            <div class="left-content-standardText textScroll">
                <div class="content-header">
                    <span class="title">案例正文</span>
                </div>
                <div class="standardText-box">
                    <yqj-text :menu_default="menu_default" :StandardTextBoxData="yqjzw"></yqj-text>
                </div>
                <div class="left-content-detail graphScroll">
                    <div class="content-header">
                        <span class="title">图谱</span>
                    </div>
                    <div>
                        <atlas-components></atlas-components>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-right">
            <div class="right-content-recommendSwiper">
                <div class="right-content-carousel" v-if="image && image">
                    <div class="carousel-box">
                        <Carousel v-model="imagesModel" style="height: 100%">
                            <CarouselItem v-for="(item, index) in image" :key="index">
                                <div class="content-carousel">
                                    <img :src="item.TPLJ" alt="" @click="clickImages(item.TPLJ)" style="display: block; width: 100%; height: 100%" />
                                </div>
                            </CarouselItem>
                        </Carousel>
                    </div>
                    <!-- 网络图片数量 -->
                    <p>图片（{{ image.length }} 张）</p>
                </div>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <recommend-text-sg :title="rightName_sg" :listData="rightList_sg"></recommend-text-sg>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <RecommendInvalidation :title="rightName_sx" :listData="rightList_sx"></RecommendInvalidation>
            </div>
            <!-- xxx -->
            <div class="right-content-recommendImage" style="background: #ffffff">
                <RecommendSb :title="rightName_sb" :listData="rightList_sb"></RecommendSb>
            </div>
        </div>
        <div class="popContainer" @click="hiddenLayer" :style="{ display: showLayer ? 'block' : 'none' }">
            <img :src="selectImg" alt="" class="bigImg" />
        </div>
    </div>
</template>

<script>
import RecommendSwipers from '@/components/RecommendSwipers';
import RecommendNoun from '@/components/RecommendNoun';
import RecommendInvalidation from '@/components/RecommendInvalidation';
import RecommendTextSg from '@/components/RecommendTextSg';
import WikipediaInfo from './compents/WikipediaInfo';
import YqjText from './compents/YqjText';
import RecommendSb from '@/components/RecommendSb';
import atlasComponents from '@/components/atlasComponents.vue';

export default {
  name: 'BasicDetail',
  props: [''],
  components: {
    RecommendSwipers,
    RecommendNoun,
    WikipediaInfo,
    YqjText,
    RecommendInvalidation,
    RecommendTextSg,
    RecommendSb,
    atlasComponents,
  },
  data() {
    return {
      spin_termEncyclopediaDetail: true,
      title: '',
      abstract: '',
      baseInfo: [],
      image: [],
      menu_default: ['背景', '失效原因', '分析结论', '分析说明'],
      imagesModel: 0,
      rightList_sg: [],
      rightList_sx: [],
      rightName_sg: '相关事故区',
      rightName_sx: '相似案例区',
      rightName_sb: '相关分析设备与工具',
      rightList_sb: [],
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
      bzzw: [], //标准正文
      yqjzw: [], //元器件正文
      showLayer: false,
      selectImg: '',
    };
  },
  mounted() {},
  methods: {
    loadDetail() {
      this.$axios(
        '/baike/yuanqijian/get_case',
        'post',
        this.$qs.stringify({
          ALID: this.BasicDetail_key_id,
        })
      ).then(res => {
        setTimeout(() => {
          this.spin_termEncyclopediaDetail = false;
          this.title = res.data.data.title; //获取头部信息
          this.$store.commit('updated_atlasImg', res.data.knowledge_graph);
          var arr1 = res.data.typelist;
          arr1.unshift('全部');
          // list = res.data.data.typelist
          // this.listUl = arr1;
          this.$store.commit('updated_atlasTypeList', arr1);
          this.abstract = res.data.data.abstract; //获取详细信息
          this.rightList_sg = res.data.data.XGSG; //相似事故
          this.rightList_sx = res.data.data.XSAL; //相似事故
          this.setImagesUrl(res.data.data.picture);
          this.rightList_sb = res.data.data.Equip; //相关分析设备与工具
          this.setElectronBasicInfo(res.data.data.basic_info[0]); //基本信息的所有数据
          const dataVal = res.data.data.main_info[0]; //标准正文

          let arr = [];
          for (let i in dataVal) {
            const text1 = dataVal[i].replace(
              /src=\"/g,
              `src="` + this.$store.state.app.img_url
            );
            // 获取正文跳转
            const str1 = text1.replace(/<(\s*[^>]*)?>/g, '<$1>');
            const str2 = str1.replace(
              /<BK>(.*?)<\/BK>/g,
              '<a style="font-size:12pt;color: #136ec2">$1</a>'
            );
            arr.push(str2);
          }
          this.yqjzw = arr;
        }, 200);
      });
    },
    rowClassName(row, index) {
      if (index % 2 === 0) {
        return 'table-info-row-gray';
      } else {
        return 'table-info-row-white';
      }
    },
    setElectronBasicInfo(info) {
      this.baseInfo = [];
      if (info.WJMC && info.WJMC.length > 0) {
        this.baseInfo.push({
          key: '数据来源：',
          value: info.WJMC,
        });
      }
      if (info.ALMC && info.ALMC.length > 0) {
        this.baseInfo.push({
          key: '案例名称：',
          value: info.ALMC,
        });
      }
      if (info.YPMC && info.YPMC.length > 0) {
        this.baseInfo.push({
          key: '样品名称：',
          value: info.YPMC,
        });
      }
      if (info.YPLX && info.YPLX.length > 0) {
        this.baseInfo.push({
          key: '样品类型：',
          value: info.YPLX,
        });
      }
      if (info.SXMS && info.SXMS.length > 0) {
        this.baseInfo.push({
          key: '失效模式：',
          value: info.SXMS,
        });
      }
      if (info.SXYY && info.SXYY.length > 0) {
        this.baseInfo.push({
          key: '失效原因：',
          value: info.SXYY,
        });
      }
    },
    setImagesUrl(images) {
      for (var key in images) {
        images[key].TPLJ = this.$store.state.app.img_url + images[key].TPLJ;
      }
      this.image = images;
    },
    hiddenLayer() {
      this.showLayer = false;
    },
    clickImages(src) {
      this.selectImg = src;
      this.showLayer = true;
    },
    setBZZW(info) {
      this.bzzw = { default: info, form_data: this.$route.query.id };
    },
    scrollToBZZW() {
      $('html,body').animate({ scrollTop: $('.textScroll').offset().top }, 500);
    },
    scrollToGraph() {
      $('html,body').animate(
        { scrollTop: $('.graphScroll').offset().top },
        500
      );
    },
  },
  computed: {
    BasicDetail_key_id() {
      return this.$route.query.id;
    },
  },
  watch: {
    BasicDetail_key_id: {
      handler(newVal, oldVal) {
        this.spin_termEncyclopediaDetail = true;
        this.loadDetail();
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.termEncyclopediaDetail {
  width: 1200px;
  overflow: hidden;
  margin: 30px auto;
  position: relative;
  .box-left {
    width: 900px;
    float: left;
    overflow: hidden;

    .left-content-top {
      width: 100%;
      background: white;
      padding: 30px 30px 32px 30px;

      .con-header-bzh {
        width: 100%;
        line-height: 28px;
        display: flex;
        align-items: center;
        max-width: 730px;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
        font-weight: 600;
        .header-title-bzh {
          float: left;
          font-size: 24px;
          color: #3f424b;
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
          overflow: hidden;
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
        .category-third {
          color: #e7623e;
          background: #fce9e4;
          margin-left: 10px;
        }
      }
      .con-header {
        width: 100%;
        line-height: 28px;
        float: left;
        .header-title-bzm {
          font-size: 24px;
          color: #3f424b;
          font-weight: bold;
        }
      }
      .con-header-detail {
        width: 100%;
        line-height: 22px;
        float: left;
        .header-subtitle {
          font-size: 16px;
          color: #60636f;
        }
      }
      .con-content {
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
          line-height: 30px !important;
        }
      }
    }
    /deep/ .ivu-table-cell {
      line-height: 30px !important;
    }
    .left-content-detail {
      width: 100%;
      margin-top: 20px;
      background: white;
      padding: 0px 30px 32px 30px;

      .content-body {
        margin-top: 30px;
        font-size: 14px;
        color: #3f424b;
        line-height: 30px;
        overflow: hidden;
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
  }
}
img {
  max-width: 100% !important;
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
    background: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>