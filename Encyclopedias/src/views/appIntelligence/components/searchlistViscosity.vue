<template>
    <div>
        <Spin fix v-if="spin_search_box"></Spin>
        <!-- 知识探索模块 -->
        <ul v-if="search_knowledge.length>0">
            <li class="result_list_item" :key="index" v-for="(knowledgeData,index) in search_knowledge">
                <!-- 绝对粘度 -->
                <div class="searchlist_viscosity searchOne" v-if="knowledgeData.term.value!=''">
                    <!-- 头部 -->
                    <div class="searchlist_viscosity_header" @click="gotoPage(knowledgeData.term.value)">
                        <div class="searchlist_viscosity_header_l" v-html="knowledgeData.term.value.title"></div>
                        <div class="searchlist_viscosity_header_r state_token" v-for="(tag, index2) in knowledgeData.term.value.tag" :key="index2">
                            <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                        </div>
                    </div>
                    <!-- 内容 -->
                    <div class="searchlist_viscosity_cont" v-html='knowledgeData.term.value.description.replace( /src=\"/g, `src="` + $store.state.app.img_url)'>
                    </div>
                    <!-- 底部来源 -->
                    <div class="searchlist_viscosity_bottom">
                        来源：{{knowledgeData.term.value.source}}
                    </div>
                </div>
                <!-- 科研-标准-质量-视角 -->
                <!-- 科研 -->
                <div class="searchlist_visualangle searchTwo" v-if="knowledgeData.journal.value!=''">
                    <div class="searchlist_visualangle_header">{{knowledgeData.journal.name}}</div>
                    <div class="searchlist_visualangle_cont">
                        <div v-for="(journalCont,index) in knowledgeData.journal.value" :key='index' @click="gotoPage(journalCont)">
                            <div class="searchlist_visualangle_header_l">
                                <Tooltip max-width="350" theme="light">
                                    <div slot="content">
                                        <div v-html="journalCont.title"></div>
                                    </div>
                                    <div class="supColor" v-html="journalCont.title"></div>
                                </Tooltip>
                            </div>
                            <div class="searchlist_visualangle_header_r state_token" v-for="(tag, index2) in journalCont.tag" :key="index2">
                                <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 标准 -->
                <div class="searchlist_visualangle searchThree" v-if="knowledgeData.standard.value!=''">
                    <div class="searchlist_visualangle_header">{{knowledgeData.standard.name}}</div>
                    <div class="searchlist_visualangle_cont">
                        <div v-for="(standardCont,index) in knowledgeData.standard.value" :key='index' @click="gotoPage(standardCont)">
                            <div class="searchlist_visualangle_header_l">
                                <Tooltip max-width="350" theme="light">
                                    <div slot="content">
                                        <div v-html="standardCont.title"></div>
                                    </div>
                                    <div class="supColor" v-html="standardCont.title"></div>
                                </Tooltip>
                            </div>

                            <div class="searchlist_visualangle_header_r state_token" v-for="(tag, index2) in standardCont.tag" :key="index2">
                                <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="searchlist_visualangle searchFour" v-if="knowledgeData.quality.value!=''">
                    <div class="searchlist_visualangle_header">{{knowledgeData.quality.name}}</div>
                    <div class="searchlist_visualangle_cont">
                        <div v-for="(qualityCont,index) in knowledgeData.quality.value" :key='index' @click="gotoPage(qualityCont)">

                            <div class="searchlist_visualangle_header_l">
                                <Tooltip max-width="350" theme="light">
                                    <div slot="content">
                                        <div v-html="qualityCont.title"></div>
                                    </div>
                                    <div class="supColor" v-html="qualityCont.title"></div>
                                </Tooltip>
                            </div>
                            <div class="searchlist_visualangle_header_r state_token" v-for="(tag, index2) in qualityCont.tag" :key="index2">
                                <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="moreLook(index)" style="width:100%;text-align:center;cursor:pointer"> 展开更多 <img src="@/img/icon_more.png" /></div>
            </li>
        </ul>
        <div v-else style="font-size: 20px;width: 100%;display: flex;justify-content: center;align-items: center;height: 450px;">
            查询无结果
        </div>
        <Modal v-model="moreShow" width="800" scrollable title="查看全部" @on-cancel="cancel">
            <ul style="height: 430px;overflow: hidden; overflow-y: scroll;">
                <li class="result_list_item" :key="index" v-for="(knowledgeData2,index) in search_knowledge2">
                    <!-- 绝对粘度 -->
                    <div class="searchlist_viscosity searchOne" v-if="knowledgeData2.term.value!=''">
                        <!-- 头部 -->
                        <div class="searchlist_viscosity_header" @click="gotoPage(knowledgeData2.term.value)">
                            <div class="searchlist_viscosity_header_l" v-html="knowledgeData2.term.value.title"></div>
                            <div class="searchlist_viscosity_header_r state_token" v-for="(tag, index2) in knowledgeData2.term.value.tag" :key="index2">
                                <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                            </div>
                        </div>
                        <!-- 内容 -->
                        <div class="searchlist_viscosity_cont" v-html='knowledgeData2.term.value.description.replace( /src=\"/g, `src="` + $store.state.app.img_url)'>
                        </div>
                        <!-- 底部来源 -->
                        <div class="searchlist_viscosity_bottom">
                            来源：{{knowledgeData2.term.value.source}}
                        </div>
                    </div>
                    <!-- 科研-标准-质量-视角 -->
                    <!-- 科研 -->
                    <div class="searchlist_visualangle searchTwo" v-if="knowledgeData2.journal.value!=''">
                        <div class="searchlist_visualangle_header">{{knowledgeData2.journal.name}}</div>
                        <div class="searchlist_visualangle_cont">
                            <div v-for="(journalCont2,index) in knowledgeData2.journal.value" :key='index' @click="gotoPage(journalCont2)">
                                <div class="searchlist_visualangle_header_l">
                                    <Tooltip max-width="350" theme="light">
                                        <div slot="content">
                                            <div v-html="journalCont2.title"></div>
                                        </div>
                                        <div class="supColor" v-html="journalCont2.title"></div>
                                    </Tooltip>
                                </div>
                                <div class="searchlist_visualangle_header_r state_token" v-for="(tag, index2) in journalCont2.tag" :key="index2">
                                    <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 标准 -->
                    <div class="searchlist_visualangle searchThree" v-if="knowledgeData2.standard.value!=''">
                        <div class="searchlist_visualangle_header">{{knowledgeData2.standard.name}}</div>
                        <div class="searchlist_visualangle_cont">
                            <div v-for="(standardCont2,index) in knowledgeData2.standard.value" :key='index' @click="gotoPage(standardCont2)">
                                <div class="searchlist_visualangle_header_l">
                                    <Tooltip max-width="350" theme="light">
                                        <div slot="content">
                                            <div v-html="standardCont2.description"></div>
                                        </div>
                                        <div class="supColor" v-html="standardCont2.description"></div>
                                    </Tooltip>
                                </div>

                                <div class="searchlist_visualangle_header_r state_token" v-for="(tag, index2) in standardCont2.tag" :key="index2">
                                    <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 质量 -->
                    <div class="searchlist_visualangle searchFour" v-if="knowledgeData2.quality.value!=''">
                        <div class="searchlist_visualangle_header">{{knowledgeData2.quality.name}}</div>
                        <div class="searchlist_visualangle_cont">
                            <div v-for="(qualityCont2,index) in knowledgeData2.quality.value" :key='index' @click="gotoPage(qualityCont2)">

                                <div class="searchlist_visualangle_header_l">
                                    <Tooltip max-width="350" theme="light">
                                        <div slot="content">
                                            <div v-html="qualityCont2.title"></div>
                                        </div>
                                        <div class="supColor" v-html="qualityCont2.title"></div>
                                    </Tooltip>
                                </div>
                                <div class="searchlist_visualangle_header_r state_token" v-for="(tag2, index2) in qualityCont2.tag" :key="index2">
                                    <span v-if="tag2 != ''" :class="'span_' + (index2 + 1)">{{ tag2 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div slot="footer">
                <div class="footerBtn" style="width:100%;height:60px;display:flex;">
                    <div @click="ok()">确定</div>
                    <div @click="ok()">关闭</div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['search_knowledge', 'search_keyword', 'pageNum', 'pageSize'],
  data() {
    return {
      moreShow: false, //弹窗的展示
      search_knowledge2: [], //弹框的数据
      clickIndex: '', //点击的下标
      spin_search_box: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 点击更多
    moreLook(index) {
      this.spin_search_box = true;
      this.clickIndex = index;
      this.$axios(
        '/baike/sousuo/search_main_update',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          return_num: '10',
        })
      ).then(res => {
        this.spin_search_box = false;
        this.moreShow = true;
        this.search_knowledge2 = res.data.data.slice(index, index + 1);
      });
    },
    // 页面跳转
    gotoPage(val) {
      let pageId = val.search_id;
      let values = Object.values(pageId).toString();
      if (val.data_jump == '/baike/biaozhun/details_page') {
        this.$router.push({
          path: '/BasicDetail',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/hangkongshuyu/details_page') {
        this.$router.push({
          path: '/TermDetail',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/minhang/request') {
        this.$router.push({
          path: '/CivilAviationDetail',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/yuanqijian/get_case') {
        this.$router.push({
          path: '/ElectronDetailInvalid',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/appServer/requestGetData') {
        //质量
        //路由跳转详情
        this.$router.push({
          name: 'qualityWikipediaDetails',
          query: { id: values },
        });
      } else if (val.data_jump == 'URL') {
        window.open(values, '_blank');
      }
    },
    ok() {
      this.moreShow = false;
    },
    cancel() {
      this.moreShow = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.footerBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 90px;
    height: 32px;
    border-radius: 3px;
    margin: 0 10px;
    line-height: 32px;
    cursor: pointer;
  }
  & > div:nth-child(1) {
    background: #3388ff;
    color: #ffffff;
  }
  & > div:nth-child(2) {
    border: 1px solid #e5e5e5;
    color: #999999;
  }
}
.result_list_item {
  padding: 20px 0px;
  border-bottom: 1px solid #eeeeee;

  &:last-of-type {
    border-bottom: none;
  }

  .title {
    .title_text {
      font-size: 17px;
      font-weight: bold;
      white-space: nowrap;
      max-width: 670px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      // /deep/ em {
      //   color: rgb(223, 11, 64);
      // }
    }

    .title_text:hover {
      color: #3388ff;
    }

    .state_token2 {
      span {
        padding: 0px 6px;
        line-height: 18px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }

  .content {
    font-size: 14px;
    line-height: 22px;
    color: #60636f;
    margin-top: 15px;
  }

  .source {
    font-size: 14px;
    line-height: 18px;
    color: #a3a6ad;
    margin-top: 15px;
  }
}
// 知识探索
// 绝对粘度
.searchlist_viscosity {
  overflow: hidden;
  clear: both;
  padding-left: 30px;
  margin-bottom: 18px;
  background-position: 1px 3px;

  .searchlist_viscosity_header {
    display: flex;
    font-size: 18px;
    align-items: center;
    .searchlist_viscosity_header_l {
      font-size: 18px;
      font-weight: bold;
      max-width: 670px;
      overflow: hidden;
      cursor: pointer;
      /deep/ em {
        color: #e21e1e;
      }

      /deep/ .ivu-tooltip-rel {
        width: 100%;
      }
    }
    .searchlist_viscosity_header_r {
      display: flex;
      span {
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 14px;
        white-space: nowrap;
        max-width: 164px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .searchlist_viscosity_cont {
    color: #60636f;
    font-size: 14px;
    line-height: 26px;
    margin-top: 8px;
    margin-bottom: 4px;
    /deep/ img {
      width: 100%;
      height: auto;
    }
    /deep/ em {
      color: #e21e1e;
    }
  }
  .searchlist_viscosity_bottom {
    color: #a3a6ad;
    font-size: 14px;
    line-height: 26px;
  }
}
// 科研-标准-质量-视角  -------知识探索
.searchlist_visualangle {
  overflow: hidden;
  clear: both;
  padding-left: 24px;
  margin-bottom: 18px;
}
.searchlist_visualangle_header {
  font-size: 14px;
  color: #3f424b;
  line-height: 28px;
  font-weight: 600;
}
.searchlist_visualangle_cont {
  overflow: hidden;
  line-height: 32px;
  & > div {
    display: flex;
    font-size: 18px;
    .searchlist_visualangle_header_l {
      font-size: 14px;
      white-space: nowrap;
      max-width: 570px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      padding-left: 18px;
      height: 32px;
      /deep/ .ivu-tooltip {
        width: 100% !important;
      }
      .supColor {
        /deep/ em {
          color: #e21e1e;
        }
      }

      .ivu-tooltip-rel {
        & > div {
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .searchlist_visualangle_header_r {
      display: flex;
      align-items: center;
      span {
        padding: 0px 6px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 12px;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
.state_token {
  span {
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 10px;
    font-size: 14px;
    white-space: nowrap;
  }

  .span_1 {
    background: rgba(51, 136, 255, 0.14);
    color: #3388ff;
  }

  .span_2 {
    background: rgba(255, 137, 0, 0.14);
    color: #ff8900;
  }

  .span_3 {
    background: rgba(231, 98, 62, 0.14);
    color: #e7623e;
  }
  .span_4 {
    background: rgba(125, 241, 8, 0.14);
    color: #56eb16;
  }
  .span_5 {
    background: rgba(231, 7, 26, 0.14);
    color: #e21e1e;
  }
}
.searchOne {
  background: url(~@/img/icon/sc_icon1.png) no-repeat top left;
  background-position: 0px 6px;
}
.searchTwo {
  background: url(~@/img/icon/sc_icon2.png) no-repeat top left;
  background-position: 0px 5px;
  .searchlist_visualangle_header_l {
    background: url(~@/img/icon/sc_icon5.png) no-repeat top left;
    background-position: 0px 10px;
  }
}
.searchThree {
  background: url(~@/img/icon/sc_icon3.png) no-repeat top left;
  background-position: 1px 7px;
  .searchlist_visualangle_header_l {
    background: url(~@/img/icon/sc_icon6.png) no-repeat top left;
    background-position: 0px 10px;
  }
}
.searchFour {
  background: url(~@/img/icon/sc_icon4.png) no-repeat top left;
  background-position: 1px 4px;
  .searchlist_visualangle_header_l {
    background: url(~@/img/icon/sc_icon7.png) no-repeat top left;
    background-position: 0px 10px;
  }
}
/deep/ .ivu-modal-footer {
  text-align: center;
}
/deep/ .ivu-btn-text {
  border: 1px solid #e5e5e5;
}
</style>