<template>
  <div class="termEncyclopediaDetail">
      <Spin fix v-if="spin_termEncyclopediaDetail"></Spin>
      <div class="box-left">
          <div class="left-content-top">
              <div class="con-header-bzh">
                  <span class="header-title-bzh">{{ this.mainInfo.BZBH }}</span>
                  <div class="category-first category" v-if="this.mainInfo.BZZTMC">
                      {{ this.mainInfo.BZZTMC }}
                  </div>
                  <div class="category-sec category" v-if="this.mainInfo.BZLYLMMC">
                      {{ this.mainInfo.BZLYLMMC }}
                  </div>
                  <div class="category-third category" v-if="this.mainInfo.BZCCLMMC">
                      {{ this.mainInfo.BZCCLMMC }}
                  </div>
              </div>
              <div class="con-header">
                  <span class="header-title-bzm">{{ this.mainInfo.BZZWMC }}</span>
              </div>
              <div class="con-header-detail">
                  <span class="header-subtitle">{{ this.mainInfo.BZWWMC }}</span>
              </div>
              <div class="con-content">
                  <div>{{ this.mainInfo.SYFW }}</div>
              </div>
              <div class="con-button-box">
                  <div class="con-button-first con-button" @click="scrollToBZZW">
                      查看正文
                  </div>
                  <div class="con-button-second con-button" @click="scrollToGraph">
                      查看图谱
                  </div>
                  <div style="float:left" @click="isTrue">
                      <collection :coliectionData="coliectionData"></collection>
                  </div>
              </div>
          </div>

          <div class="left-content-wikipediaInfo">
              <div class="content-header">
                  <span class="title">基本信息</span>
              </div>
              <div class="wikipediaInfo-box">
                  <Table :columns="columns" :data="basicInfo" :show-header="false" :row-class-name="rowClassName" border></Table>
              </div>
          </div>
          <div class="left-content-standardText textScroll">
              <div class="content-header">
                  <span class="title">标准正文</span>
                  <div class="look-all-button" @click="toBZZW">查看正文 >></div>
              </div>
              <div class="standardText-box">
                  <standard-text :StandardTextBoxData="bzzw" @touchOpenAll="touchOpenAll"></standard-text>
              </div>
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
      <div class="box-right">
          <div class="system_module">
              <ul class="system_module_tab">
                  <li @click="activeClick(index,item)" :key="index" v-for="(item, index) in systemClassify" :class="index == checked_type ? 'active' : ''">{{item.text}}</li>
              </ul>
              <div class="system_module_cont">
                  <div :title="item.parentNames" :key="index" v-for="(item,index) in system_module_list  ">
                      <span @click="jumpSystem(item)">{{  item.parentNames || item.classAllName}}</span>
                  </div>
              </div>
          </div>
          <div class="right-content-recommendSwiper">
              <recommend-swipers></recommend-swipers>
          </div>
          <div class="right-content-recommendText" v-if="typeof bz_similarity === 'object' && bz_similarity.length > 0">
              <recommend-text title="相似标准区" :listData="bz_similarity"></recommend-text>
          </div>
          <div class="right-content-recommendImage" v-if="typeof xg_similarity === 'object' && xg_similarity.length > 0">
              <recommend-text-sg :title="rightName_sg" :listData="xg_similarity"></recommend-text-sg>
          </div>
          <div class="right-content-recommendText" v-if="typeof bz_quote === 'object' && bz_quote.length > 0">
              <recommend-text-yy title="引用标准" :listData="bz_quote"></recommend-text-yy>
          </div>
          <div class="right-content-recommendText" v-if="typeof bz_xgsy === 'object' && bz_xgsy.length > 0">
              <recommend-text-sy title="相关术语" :listData="bz_xgsy"></recommend-text-sy>
          </div>
          <div class="right-content-recommendText" v-if="typeof bz_xgwj === 'object' && bz_xgwj.length > 0">
              <recommend-text-xgwj title="相关文件" :listData="bz_xgwj"></recommend-text-xgwj>
          </div>
      </div>
  </div>
</template>

<script>
import RecommendText from '@/components/RecommendText';
import RecommendTextSg from '@/components/RecommendTextSg';
import RecommendTextYy from '@/components/RecommendTextYy';
import RecommendTextXgwj from '@/components/RecommendTextXgwj';
import RecommendTextSy from '@/components/RecommendTextSy';
import RecommendSwipers from '@/components/RecommendSwipers';
import RecommendNoun from '@/components/RecommendNoun';
import WikipediaInfo from './compents/WikipediaInfo';
import StandardText from './compents/StandardText';
import atlasComponents from '@/components/atlasComponents.vue';
import collection from '@/components/collection.vue';
import {
correlationFile,
correlationTerm,
GJBClassifierInfer,
systemInfer,
} from '@/libs/api';

export default {
name: 'BasicDetail',
props: [''],
components: {
  RecommendText,
  RecommendTextYy,
  RecommendSwipers,
  RecommendTextSg,
  RecommendNoun,
  WikipediaInfo,
  StandardText,
  atlasComponents,
  collection,
  RecommendTextXgwj,
  RecommendTextSy,
},
data() {
  return {
    spin_termEncyclopediaDetail: true,
    checked_type: '0',
    imageValue: 0,
    rightName_sg: '相关事故区',
    systemClassify: [
      { text: '集团标准体系', type: 1 },
      { text: '国军标体系', type: 4 },
      { text: '832A', type: 2 },
      { text: '832', type: 3 },
    ],
    system_module_list: [],
    collectionName: '',
    basicInfo: [], //基本信息的所有数据
    coliectionType: '标准知识百科', //["术语知识百科", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
    coliectionData: {
      username: '',
      content: { type: '', name: '', param: { BZBH: '' } },
    },
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
    mainInfo: {}, //最上面的页面数据
    bzzw: [], //标准正文
    bz_similarity: [], //相关标准区
    bz_quote: [], //引用标准
    xg_similarity: [], //相关事故区
    bz_xgwj: [], //相关文件
    bz_xgsy: [], //相关术语
  };
},
mounted() {
  this.loadDetail();
  this.fileData(); // 获取相关文件
  this.term(); //获取相关术语
  setTimeout(() => {
         this.systemData(1);
    }, 500);
},
methods: {
  jumpSystem(item) {
    if (!item) {
      this.$Message.error('找不到体系id');
    }
    const index = this.classIndex;
    this.$router.push({
      path: '/standard/standardSystem',
      query: { id: item.sysId || item.classId, index },
    });
  },
  activeClick(index, item) {
    this.checked_type = index;
    this.systemData(item.type);
  },
  // 获取集团和国军标体系
  async systemData(type) {
    let url = type == 1 || type == 4 ? systemInfer : GJBClassifierInfer;
    this.$axios(
      url,
      'post',
      this.$qs.stringify({
        searchQuery: this.mainInfo.BZZWMC,
        classType: type,
      })
    ).then(res => {
      this.system_module_list = res.data.system_infer;
    });
  },
  loadDetail() {
    this.$axios(
      '/baike/biaozhun/details_page',
      'post',
      this.$qs.stringify({
        BZBH: this.$route.query.id,
      })
    ).then(res => {
      this.setBZBasicInfo(res.data.data.basic_info); //基本信息的所有数据
      this.mainInfo = res.data.data.main_info; //最上面的页面数据

      //图谱所有数据，每一条数据代表两个实体之间的关系
      // console.log(res.data.data,"aaaaaaaaaaaaaaaaa")
      if (res.data.data.graph.nodes.length > 0) {
        this.$store.commit('updated_atlasImg', res.data.data.graph);
      }
      this.setBZZW(res.data.data.bzzw); //标准正文
      setTimeout(() => {
        this.spin_termEncyclopediaDetail = false;
      }, 200);
      var arr1 = res.data.data.typelist;
      arr1.unshift('全部');
      // list = res.data.data.typelist
      // this.listUl = arr1;
      this.$store.commit('updated_atlasTypeList', arr1);
      this.collectionName = this.mainInfo.BZZWMC;
      setTimeout(() => {
        this.isTrue();
      }, 500);
    });
  },
  // 点击收藏
  isTrue() {
    this.coliectionData.username = this.$store.state.user.userInfo.username;
    this.coliectionData.content.type = this.coliectionType;
    this.coliectionData.content.name = this.collectionName;
    this.coliectionData.content.param = {
      BZBH: this.$route.query.id,
    };
  },
  // 获取相关文件
  fileData() {
    this.$axios(
      correlationFile,
      'post',
      this.$qs.stringify({ searchQuery: this.mainInfo.BZZWMC })
    ).then(res => {
      this.bz_xgwj = res.data.reviewRecordList; //相关文件
      if (JSON.stringify(res.data) == '{}') {
        this.corrFiles = [];
      } else {
        this.corrFiles = res.data.reviewRecordList;
      }
    });
  },
  // 获取相关术语
  term() {
    this.$axios(
      correlationTerm,
      'post',
      this.$qs.stringify({ searchQuery: this.mainInfo.BZZWMC })
    ).then(res => {
      this.bz_xgsy = res.data.data; //相关术语
      if (res.data.code != 500) {
        this.termList = res.data.data;
      } else {
        this.$Message.error('获取相关术语失败');
      }
    });
  },

  load_standard() {
    this.$axios(
      '/baike/biaozhun/get_reference_standard',
      'post',
      this.$qs.stringify({
        BZBH: this.$route.query.id,
      })
    ).then(res => {
      this.bz_quote = res.data.data;
    });
  },
  loadBeSimilarBZ() {
    this.$axios(
      '/baike/biaozhun/get_similarity_zb',
      'post',
      this.$qs.stringify({
        BZBH: this.$route.query.id,
      })
    ).then(res => {
      this.bz_similarity = res.data.data.bz_similarity;
      this.xg_similarity = res.data.data.xg_similarity;
    });
  },
  rowClassName(row, index) {
    if (index % 2 === 0) {
      return 'table-info-row-gray';
    } else {
      return 'table-info-row-white';
    }
  },
  setBZBasicInfo(info) {
    this.basicInfo = [];
    if (info.BZBH && info.BZBH.length > 0) {
      this.basicInfo.push({
        key: '标准编号：',
        value: info.BZBH,
      });
    }
    if (info.BZZWMC && info.BZZWMC.length > 0) {
      this.basicInfo.push({
        key: '中文名称：',
        value: info.BZZWMC,
      });
    }
    if (info.BZWWMC && info.BZWWMC.length > 0) {
      this.basicInfo.push({
        key: '英文名称：',
        value: info.BZWWMC,
      });
    }
    if (info.BZLXDH && info.BZLXDH.length > 0) {
      this.basicInfo.push({
        key: '标准类型：',
        value: info.BZLXDH,
      });
    }
    if (info.BZQCR && info.BZQCR.length > 0) {
      this.basicInfo.push({
        key: '起草人：',
        value: info.BZQCR,
      });
    }
    if (info.BZZTMC && info.BZZTMC.length > 0) {
      this.basicInfo.push({
        key: '标准状态：',
        value: info.BZZTMC,
      });
    }

    if (info.BZFBWH && info.BZFBWH.length > 0) {
      this.basicInfo.push({
        key: '发布正号：',
        value: info.BZFBWH,
      });
    }
    if (info.ZWYZMC && info.ZWYZMC.length > 0) {
      this.basicInfo.push({
        key: '正文语种：',
        value: info.ZWYZMC,
      });
    }
    if (info.YS && info.YS.length > 0) {
      this.basicInfo.push({
        key: '页数：',
        value: info.YS,
      });
    }
    if (info.GJBZFLH && info.GJBZFLH.length > 0) {
      this.basicInfo.push({
        key: '国际标准分类号ics：',
        value: info.GJBZFLH,
      });
    }
    if (info.FBRQ && info.FBRQ.length > 0) {
      this.basicInfo.push({
        key: '发布日期：',
        value: info.FBRQ,
      });
    }
    if (info.SSRQ && info.SSRQ.length > 0) {
      this.basicInfo.push({
        key: '实施日期：',
        value: info.SSRQ,
      });
    }
    if (info.XDHFZRQ && info.XDHFZRQ.length > 0) {
      this.basicInfo.push({
        key: '修订或废止日期：',
        value: info.XDHFZRQ,
      });
    }
    if (info.PZDWMC && info.PZDWMC.length > 0) {
      this.basicInfo.push({
        key: '批准单位：',
        value: info.PZDWMC,
      });
    }
    if (info.TCDWMC && info.TCDWMC.length > 0) {
      this.basicInfo.push({
        key: '提出单位：',
        value: info.TCDWMC,
      });
    }
    var zbdw = info.ZBDWMC ? info.ZBDWMC.toString() : info.ZBDWMC;
    if (zbdw && zbdw.length > 0) {
      this.basicInfo.push({
        key: '主编单位：',
        value: zbdw,
      });
    }
    if (info.GKDWMC && info.GKDWMC.length > 0) {
      this.basicInfo.push({
        key: '归口单位：',
        value: info.GKDWMC,
      });
    }
    if (info.GGDBH && info.GGDBH.length > 0) {
      this.basicInfo.push({
        key: '更改单：',
        value: info.GGDBH,
      });
    }
    if (info.CYBZJCD && info.CYBZJCD.length > 0) {
      this.basicInfo.push({
        key: '采用标准及程度：',
        value: info.CYBZJCD,
      });
    }
    if (info.YYBZH && info.YYBZH.length > 0) {
      this.basicInfo.push({
        key: '引用标准：',
        value: info.YYBZH.toString(),
      });
    }
    if (info.DTLBZH && info.DTLBZH.length > 0) {
      this.basicInfo.push({
        key: '代替号（老标准）：',
        value: info.DTLBZH,
      });
    }
    if (info.GJC && info.GJC.length > 0) {
      this.basicInfo.push({
        key: '关键字：',
        value: info.GJC,
      });
    }
    if (info.XGBZH && info.XGBZH.length > 0) {
      this.basicInfo.push({
        key: '相关标准：',
        value: info.XGBZH.toString(),
      });
    }
    if (info.YQYBBHQK && info.YQYBBHQK.length > 0) {
      this.basicInfo.push({
        key: '与前一版变化：',
        value: info.YQYBBHQK,
      });
    }
    if (info.XLBZH && info.XLBZH.length > 0) {
      this.basicInfo.push({
        key: '系列标准：',
        value: info.XLBZH,
      });
    }
    if (info.JTZXBZTXFLMC && info.JTZXBZTXFLMC.length > 0) {
      this.basicInfo.push({
        key: '集团执行标准分类',
        value: info.JTZXBZTXFLMC,
      });
    }
    if (info.BZGJC && info.BZGJC.length > 0) {
      this.basicInfo.push({
        key: '标准关键词',
        value: info.BZGJC,
      });
    }
  },
  setBZZW(info) {
    this.bzzw = { default: info, form_data: this.$route.query.id };
  },
  toBZZW() {
    this.$router.push({
      path: '/ContentDetail',
      query: { id: this.mainInfo.BZBH, BZZWMC: this.mainInfo.BZZWMC },
    });
  },
  scrollToBZZW() {
    $('html,body').animate({ scrollTop: $('.textScroll').offset().top + $("body").scrollTop() }, 500);
  },
  scrollToGraph() {
    $('html,body').animate(
      { scrollTop: $('.graphScroll').offset().top + $("body").scrollTop() },
      500
    );
  },
  touchOpenAll() {
    this.toBZZW();
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
      this.loadBeSimilarBZ();
      this.load_standard();
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
.system_module {
width: 100%;
height: auto;
background: #ffffff;
margin-bottom: 10px;
padding: 0 20px;
padding-bottom: 20px;
box-sizing: border-box;
}
.system_module_tab {
display: flex;
width: 100%;
justify-content: space-between;
line-height: 40px;
height: 40px;
border-bottom: 1px solid #e5e5e5;
.active {
  border-bottom: 2px solid #3388ff;
}
}
.system_module_tab > li {
cursor: pointer;
}
.system_module_cont {
overflow: hidden;
padding-top: 20px;
}
.system_module_cont > div {
margin-top: 10px;
cursor: pointer;
width: 100%;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.system_module_cont > div:nth-child(1) {
margin-top: 0;
}
</style>
