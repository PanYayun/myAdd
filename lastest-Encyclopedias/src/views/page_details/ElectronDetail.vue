<template>
    <div class="termEncyclopediaDetail">
        <Spin fix v-if="spin_termEncyclopediaDetail"></Spin>
        <div class="box-left">
            <div class="left-content-top">
                <div class="left-content-r" >
                    <div class="left-content-r-title">
                        {{ list_top_title["元器件名称"] }}
                    </div>
                    <div class="left-content-r-type">
                        <div>
                            <div class="left-content-r-type-l">
                                分<span style="width: 24px; display: inline-block"></span> 类：
                            </div>
                            <div class="left-content-r-type-r">
                                {{ list_top_title["分类"] }}
                            </div>
                        </div>
                        <div>
                            <div>生产厂商：</div>
                            <div class="result_ul_type">{{ list_top_title["生产厂家"] }}</div>
                        </div>
                        <div>
                            <div>封装形式：</div>
                            <div class="result_ul_type">{{ list_top_title["封装形式"] }}</div>
                        </div>
                    </div>
                    <div style="margin-top: 20px; overflow: hidden">
                        <div class="con-button-second con-button" @click="scrollToGraph">
                            查看图谱
                        </div>
                        <div @click="isTrue">
                            <collection :coliectionData="coliectionData"></collection>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left-content-table">
                <div class="content-header">
                    <span class="title">规格参数</span>
                </div>
                <div class="content-table-div">
                    <Table :columns="columns" :data="tableData" :show-header="false" :row-class-name="rowClassName" border></Table>
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
            <div class="right-content-recommendSwiper">
                <recommend-swipers></recommend-swipers>
            </div>
            <div class="right-content-recommendText">
                <recommend-text :title="rightName_bz" :listData="rightList_bz"></recommend-text>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <recommend-text-sg :title="rightName_sg" :listData="rightList_sg"></recommend-text-sg>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <RecommendInvalidation :title="rightName_sx" :listData="rightList_sx"></RecommendInvalidation>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <RecommendDevice :title="rightName_qj" :listData="rightList_qj"></RecommendDevice>
            </div>
            <div class="right-content-recommendImage" style="background: #ffffff">
                <RecommendFactory :title="rightName_cj" :listData="rightList_cj"></RecommendFactory>
            </div>
        </div>
    </div>
</template>

<script>
import RecommendSwipers from '@/components/RecommendSwipers';
import RecommendText from '@/components/RecommendText';
import RecommendInvalidation from '@/components/RecommendInvalidation';
import RecommendDevice from '@/components/RecommendDevice';
import RecommendFactory from '@/components/RecommendFactory';
import RecommendTextSg from '@/components/RecommendTextSg';
import RecommendImage from '@/components/RecommendImage';
import WikipediaInfo from './compents/WikipediaInfo';
import atlasComponents from '@/components/atlasComponents.vue';
import collection from '@/components/collection.vue';
export default {
  name: 'ElectronDetail',
  components: {
    RecommendSwipers,
    RecommendText,
    RecommendTextSg,
    RecommendInvalidation,
    RecommendDevice,
    RecommendFactory,
    RecommendImage,
    WikipediaInfo,
    atlasComponents,
    collection,
  },
  data() {
    return {
      bzzw: [], //标准正文
      spin_termEncyclopediaDetail: true,
      list_top_title: {},
      // 图片
      imageValue: 0,
      imageArr: [],
      accidentReport: '',
      imageCount: '',
      rightName_bz: '相关标准区',
      rightName_sg: '相关事故区',
      rightName_sx: '失效案例区',
      rightName_qj: '相似元器件',
      rightName_cj: '相关厂家',
      // 右侧列表
      rightList_bz: [],
      rightList_sg: [],
      rightList_sx: [],
      rightList_qj: [],
      rightList_cj: [],
      coliectionType: '元器件知识百科', //["术语知识百科", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      coliectionData: {
        username: '',
        content: { type: '', name: '', param: { SYZWMC: '' } },
      },
      columns: [
        {
          title: '标准号',
          key: 'key',
          width: 160,
        },
        {
          title: '标准名称',
          key: 'value',
        },
      ],
      tableData: [],
    };
  },
  mounted() {
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
      this.coliectionData.content.name = this.BasicDetail_key_entity_name;
      this.coliectionData.content.param = {
        entity_name: this.BasicDetail_key_entity_name,
      };
    },
    resultList() {
      this.$axios(
        '/baike/yuanqijian/get_unit',
        'post',
        this.$qs.stringify({
          entity_name: this.BasicDetail_key_entity_name,
        })
      ).then(res => {
        if(res.data.data['规格参数']){
        this.list_top_title = res.data.data['规格参数'];
        }else{
          // this.list_top_title=null;
        }
        if(res.data.data['规格参数']){
          console.log("规格参数");
          console.log(res.data.data['规格参数']);
          
          this.setList(res.data.data['规格参数']);
        }
        this.rightList_bz = res.data.data.bz_similarity;
        this.rightList_sg = res.data.data.XGSG;
        this.rightList_sx = res.data.data.al_similarity;
        this.rightList_qj = res.data.data.XSYQJ;
        if(res.data.data.cj_similarity){this.rightList_cj = res.data.data.cj_similarity;}
        
        this.$store.commit('updated_atlasImg', res.data.knowledge_graph);
        var arr1 = res.data.typelist;
        arr1.unshift('全部');
        // list = res.data.data.typelist
        // this.listUl = arr1;
        this.$store.commit('updated_atlasTypeList', arr1);
        setTimeout(() => {
          this.spin_termEncyclopediaDetail = false;
        }, 300);
      });
    },
    setList(info) {
      this.tableData = [];
      if (info['名称'] && info['名称'].length > 0) {
        this.tableData.push({
          key: '名称',
          value: info['名称'],
        });
      }
      if (info['分类'] && info['分类'].length > 0) {
        this.tableData.push({
          key: '分类',
          value: info['分类'],
        });
      }
      if (info['型号'] && info['型号'].length > 0) {
        this.tableData.push({
          key: '型号',
          value: info['型号'],
        });
      }
      if (info['器件结构'] && info['器件结构'].length > 0) {
        this.tableData.push({
          key: '器件结构',
          value: info['器件结构'],
        });
      }
      if (info['工作温度'] && info['工作温度'].length > 0) {
        this.tableData.push({
          key: '工作温度',
          value: info['工作温度'],
        });
      }
      if (info['工作电压范围'] && info['工作电压范围'].length > 0) {
        this.tableData.push({
          key: '工作电压范围',
          value: info['工作电压范围'],
        });
      }
      if (info['模块重量'] && info['模块重量'].length > 0) {
        this.tableData.push({
          key: '模块重量',
          value: info['模块重量'],
        });
      }
      if (info['生产厂家'] && info['生产厂家'].length > 0) {
        this.tableData.push({
          key: '生产厂商',
          value: info['生产厂家'],
        });
      }
      if (info['厂商地域'] && info['厂商地域'].length > 0) {
        this.tableData.push({
          key: '国别',
          value: info['厂商地域'],
        });
      }
      if (info['质量等级'] && info['质量等级'].length > 0) {
        this.tableData.push({
          key: '质量等级',
          value: info['质量等级'],
        });
      }
      if (info['温度范围'] && info['温度范围'].length > 0) {
        this.tableData.push({
          key: '温度范围',
          value: info['温度范围'],
        });
      }
      if (info['function'] && info['function'].length > 0) {
        this.tableData.push({
          key: 'function',
          value: info['function'],
        });
      }
      if (info['esd'] && info['esd'].length > 0) {
        this.tableData.push({
          key: 'esd',
          value: info['esd'],
        });
      }
      if (info['subfamily'] && info['subfamily'].length > 0) {
        this.tableData.push({
          key: 'subfamily',
          value: info['subfamily'],
        });
      }
      if (info['compression ratio'] && info['compression ratio'].length > 0) {
        this.tableData.push({
          key: 'compression ratio',
          value: info['compression ratio'],
        });
      }
      if (info['封装形式'] && info['封装形式'].length > 0) {
        this.tableData.push({
          key: '封装形式',
          value: info['封装形式'],
        });
      }
      if (info['封装尺寸'] && info['封装尺寸'].length > 0) {
        this.tableData.push({
          key: '封装尺寸',
          value: info['封装尺寸'],
        });
      }
      if (info['厂商简述'] && info['厂商简述'].length > 0) {
        this.tableData.push({
          key: '厂商简述',
          value: info['厂商简述'],
        });
      }
      if (info['生产状态'] && info['生产状态'].length > 0) {
        this.tableData.push({
          key: '生产状态',
          value: info['生产状态'],
        });
      }
    },
    scrollToGraph() {
      $('html,body').animate(
        { scrollTop: $('.graphScroll').offset().top + $("body").scrollTop() },
        500
      );
    },
  },
  computed: {
    BasicDetail_key_entity_name() {
      return this.$route.query.entity_name;
    },
  },
  watch: {
    BasicDetail_key_entity_name: {
      handler(newVal, oldVal) {
        this.spin_termEncyclopediaDetail = true;
        this.resultList();
        // this.loadBeSimilarBZ();
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

    .con-button {
      width: 88px;
      height: 28px;
      box-sizing: border-box;
      border-radius: 2px;
      line-height: 28px;
      text-align: center;
      margin-right: 10px;
      float: left;
      cursor: pointer;
    }
    .con-button-first {
      background: #3388ff;
      color: #ffffff;
    }
    .con-button-second {
      color: #3388ff;
      border: 1px solid #3388ff;
    }
    .left-content-top {
      width: 100%;
      background: white;
      padding: 30px 30px 32px 30px;
      overflow: hidden;
      .left-content-r {
        float: left;
        width: 100%;
        & > div {
          clear: both;
          overflow: hidden;
        }
        .left-content-r-title {
          font-size: 18px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #3f424b;
          line-height: 18px;
          font-weight: 600;
        }
        .left-content-r-type {
          overflow: hidden;
          font-size: 14px;
          color: #858b9a;
          margin-top: 18px;
          .left-content-r-type-l {
            width: 75px;
          }
          & > div {
            overflow: hidden;
            float: left;
            clear: both;
            height: 34px;
            line-height: 34px;
            & > div {
              float: left;
            }
          }
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
          line-height: 30px;
        }
        /deep/ .ivu-table td {
          height: 36px;
        }
        /deep/ .ivu-table-cell {
          padding-top: 8px;
          padding-bottom: 8px;
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
  }
  .box-right {
    width: 280px;
    float: right;

    .right-content-recommendSwiper {
      background: #ffffff;
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
  .result_ul_type {
    width: 750px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>