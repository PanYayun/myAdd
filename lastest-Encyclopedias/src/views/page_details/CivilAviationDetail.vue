<template>
    <div class="termEncyclopediaDetail">
        <div class="box-left">
            <div class="left-content-top">
                <div class="con-header">
                    <div class="header-title">{{ headerTitle }}</div>
                </div>
                <div class="con-content">
                    {{ abstractText }}
                </div>
                <div class="con-button-box">
                    <div class="con-button-first con-button" @click="first_btn_1">
                        事故报告
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
                    <span class="title">事故详情</span>
                </div>
                <div class="content-table-div">
                    <Table :columns="columns" :data="tableData" :show-header="false" :row-class-name="rowClassName" border></Table>
                </div>
            </div>
            <div class="left-content-detail textScroll">
                <div class="content-header">
                    <span class="title">事故报告</span>
                </div>
                <div class="content-body" v-html="accidentReport" @click="clickText($event)"></div>
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
            <div class="right-content-carousel" v-if="image && image">
                <!-- <recommend-swipers
          :imageArr="image"
          :imageCount="imageCount"
        ></recommend-swipers> -->
                <!-- 网络图片 -->
                <div class="carousel-box">
                    <Carousel v-model="imagesModel" style="height: 100%">
                        <CarouselItem v-for="(item, index) in image" :key="index">
                            <div class="content-carousel">
                                <img :src="item.SGTPLJ" alt="" @click="clickImages(item.SGTPLJ)" style="display: block; width: 100%; height: 100%" />
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <!-- 网络图片数量 -->
                <p>图片（{{ image.length }} 张）</p>
            </div>
            <div class="right-content-recommendText" style="background: #ffffff">
                <recommend-text :title="rightName_bz" :listData="rightList_bz"></recommend-text>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <recommend-text-sg :title="rightName_sg" :listData="rightList_sg"></recommend-text-sg>
            </div>
        </div>
        <div class="popContainer" @click="hiddenLayer" :style="{ display: showLayer ? 'block' : 'none' }">
            <!-- <p class="bigImg"></p> -->
            <img :src="selectImg" alt="" class="bigImg" />
        </div>
    </div>
</template>

<script>
import RecommendText from '@/components/RecommendText';
import RecommendTextSg from '@/components/RecommendTextSg';
import RecommendSwipers from '@/components/RecommendSwipers';
import WikipediaInfo from './compents/WikipediaInfo';
import StandardText from './compents/StandardText';
import atlasComponents from '@/components/atlasComponents.vue';
import collection from '@/components/collection.vue';

export default {
  name: 'CivilAviationDetail',
  props: [''],

  components: {
    collection,
    RecommendSwipers,
    RecommendText,
    RecommendTextSg,
    WikipediaInfo,
    StandardText,
    atlasComponents,
  },
  data() {
    return {
      // 图片
      imageValue: 0,
      image: [],
      imagesModel: 0,
      headerTitle: '', //标题内容
      accidentReport: '',
      imageCount: '',
      abstractText: '', //标题下方内容
      rightName_bz: '相关标准区',
      rightName_sg: '相似事故区',
      // 右侧列表
      rightList_bz: [],
      rightList_sg: [],
      columns: [
        {
          title: '标准号',
          key: 'key',
          width: 150,

          // render: (h, params) => {
          //   return h("div", [h("strong", params.row.name)]);
          // },
        },
        {
          title: '标准名称',
          key: 'value',
        },
      ],
      tableData: [],
      coliectionType: '民航事故百科', //["术语知识百科", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      coliectionData: {
        username: '',
        content: { type: '', name: '', param: { SGID: '' } },
      },
      showLayer: false,
      selectImg: '',
    };
  },
  mounted() {
    this.resultList();
  },
  methods: {
    clickText(e) {
      if (e.target.text != undefined) {
        this.$router.push({
          path: '/TermDetail',
          query: { id: e.target.text },
        });
      }
    },
    // 点击收藏
    isTrue() {
      this.coliectionData.username = this.$store.state.user.userInfo.username;
      this.coliectionData.content.type = this.coliectionType;
      this.coliectionData.content.name = this.headerTitle;
      this.coliectionData.content.param = {
        SGID: this.$route.query.id,
      };
    },
    first_btn_1() {
      $('html,body').animate({ scrollTop: $('.textScroll').offset().top + $("body").scrollTop() }, 500);
    },
    rowClassName(row, index) {
      if (index % 2 === 0) {
        return 'table-info-row-gray';
      } else {
        return 'table-info-row-white';
      }
    },
    resultList() {
      this.$axios(
        '/baike/minhang/request',
        'post',
        this.$qs.stringify({
          SGID: this.$route.query.id,
        })
      ).then(res => {
        var arr1 = res.data.typelist;
        arr1.unshift('全部');
        // this.listUl = arr1;
        this.$store.commit('updated_atlasTypeList', arr1);
        console.log(res.data, '------------------------');
        this.setList(res.data.form[0]);
        this.$store.commit('updated_atlasImg', res.data.knowledge_graph);
        this.accidentReport = res.data.report[0].SGWBDGS;
        this.accidentReport = this.accidentReport.replace(
          /src=\"/g,
          `src="` + this.$store.state.app.img_url
        );

        // 获取正文跳转
        const str1 = this.accidentReport.replace(/<(\s*[^>]*)?>/g, '<$1>');
        this.accidentReport = str1.replace(
          /<BK>(.*?)<\/BK>/g,
          '<a style="font-size:12pt;color: #136ec2">$1</a>'
        );
        if (res.data.data.bz_similarity != '') {
          this.rightList_bz = res.data.data.bz_similarity;
        } else {
          this.bz_show = false;
        }

        if (res.data.relation != null) {
          this.rightList_sg = res.data.relation;
        } else {
          this.sg_show = false;
        }

        this.headerTitle = res.data.topic[0].SGMC;
        this.abstractText = res.data.abstract[0].SGZY;
        this.setImagesUrl(res.data.image);
           this.isTrue()
      });
    },
    setImagesUrl(images) {
      for (var key in images) {
        images[key].SGTPLJ = this.$store.state.app.img_url + images[key].SGTPLJ;
      }
      this.image = images;
    },
    setList(info) {
      this.tableData = [];
      if (info.XSSGMC && info.XSSGMC.length > 0) {
        this.tableData.push({
          key: '事故名称',
          value: info.XSSGMC,
        });
      }
      if (info.FSSJ && info.FSSJ.length > 0) {
        this.tableData.push({
          key: '发生时间',
          value: info.FSSJ,
        });
      }
      if (info.HKGS && info.HKGS.length > 0) {
        this.tableData.push({
          key: '航空公司',
          value: info.HKGS,
        });
      }
      if (info.JX && info.JX.length > 0) {
        this.tableData.push({
          key: '机型',
          value: info.JX,
        });
      }
      if (info.ZCH && info.ZCH.length > 0) {
        this.tableData.push({
          key: '注册号',
          value: info.ZCH,
        });
      }
      if (info.HBH && info.HBH.length > 0) {
        this.tableData.push({
          key: '航班号',
          value: info.HBH,
        });
      }
      if (info.QFDD && info.QFDD.length > 0) {
        this.tableData.push({
          key: '起飞地点',
          value: info.QFDD,
        });
      }
      if (info.DDDD && info.DDDD.length > 0) {
        this.tableData.push({
          key: '到达地点',
          value: info.DDDD,
        });
      }
      if (info.JSCK && info.JSCK.length > 0) {
        this.tableData.push({
          key: '机上乘客',
          value: info.JSCK,
        });
      }
      if (info.JSJZRY && info.JSJZRY.length > 0) {
        this.tableData.push({
          key: '机上机组人员',
          value: info.JSJZRY,
        });
      }
      if (info.DCJG && info.DCJG.length > 0) {
        this.tableData.push({
          key: '调查机构',
          value: info.DCJG,
        });
      }
      if (info.SSXT && info.SSXT.length > 0) {
        this.tableData.push({
          key: '所属系统',
          value: info.SSXT,
        });
      }
      if (info.GZCP && info.GZCP.length > 0) {
        this.tableData.push({
          key: '故障产品',
          value: info.GZCP,
        });
      }
      if (info.JCNR && info.JCNR.length > 0) {
        this.tableData.push({
          key: '检测内容',
          value: info.JCNR,
        });
      }
      if (info.BHSY && info.BHSY.length > 0) {
        this.tableData.push({
          key: '包含术语',
          value: info.BHSY,
        });
      }
      if (info.SGXZFL && info.SGXZFL.length > 0) {
        this.tableData.push({
          key: '事故性质分类',
          value: info.SGXZFL,
        });
      }
      if (info.SGYYFL && info.SGYYFL.length > 0) {
        this.tableData.push({
          key: '事故原因分类',
          value: info.SGYYFL,
        });
      }
      if (info.SGHGFL && info.SGHGFL.length > 0) {
        this.tableData.push({
          key: '事故后果分类',
          value: info.SGHGFL,
        });
      }
      if (info.CSJYFL && info.CSJYFL.length > 0) {
        this.tableData.push({
          key: '措施建议分类',
          value: info.CSJYFL,
        });
      }
      if (info.SGXXGC && info.SGXXGC.length > 0) {
        this.tableData.push({
          key: '事故详细过程',
          value: info.SGXXGC,
        });
      }
      if (info.XXYY && info.XXYY.length > 0) {
        this.tableData.push({
          key: '详细原因',
          value: info.XXYY,
        });
      }
      if (info.SGXXHG && info.SGXXHG.length > 0) {
        this.tableData.push({
          key: '事故详细后果',
          value: info.SGXXHG,
        });
      }
      if (info.CSJYXQ && info.CSJYXQ.length > 0) {
        this.tableData.push({
          key: '措施建议详情',
          value: info.CSJYXQ,
        });
      }
    },
    scrollToGraph() {
      $('html,body').animate(
        { scrollTop: $('.graphScroll').offset().top + $("body").scrollTop() },
        500
      );
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
    sgid() {
      return this.$route.query.id;
    },
  },
  watch: {
    sgid(oldVal, newVal) {
      this.resultList();
    },
  },
  $route: {
    handler: function(val, oldVal) {
      this.resultList();
    },
  },
};
</script>
<style lang="less" scoped>
.termEncyclopediaDetail {
  width: 1200px;
  overflow: hidden;
  margin: 30px auto;

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
          width: 60px;
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
          width: 88px;
          height: 28px;
          border-radius: 4px;
          line-height: 28px;
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
    .left-content-detail {
      width: 100%;
      margin-top: 20px;
      background: white;
      word-break: break-all;
      overflow: hidden;
      padding: 0px 30px 32px 30px;

      .content-body {
        margin-top: 30px;
        font-size: 14px;
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
  }
}
.content-table-div /deep/ .ivu-table td {
  height: 36px;
}
.content-table-div /deep/ .ivu-table-cell {
  padding-top: 8px;
  padding-bottom: 8px;
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