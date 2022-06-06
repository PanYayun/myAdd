<template>
    <div class="main_container" style="position: relative">
        <div class="result flex">
            <div class="result_left">
                <div class="result_left_table">
                    <div style="display:flex;">
                        <Input v-model="search_Val" style="margin-bottom:20px" placeholder="信号处理器" @on-enter="searchBtn()" />
                        <Button style="margin-left:20px" @click="searchBtn()" type="primary">检索</Button>
                    </div>
                    <!-- 上方表格  图谱 -->
                    <div class="recommedTable">
                        <div class="recommed_title">
                            {{titleName}}
                        </div>
                        <div class="recommed_table" style="margin-top:25px;">
                            <Table v-if="tableTab!=''" :columns="tableHeader" :data="tableTab" border stripe></Table>
                            <div v-else style="width:100%;text-align:center">暂无数据</div>
                        </div>
                    </div>
                </div>
                <div class="toggleType">
                    <ul class="flex list_nav_ul">
                        <li :class="selectIndex == 1 ? 'active' : ''" @click="selectClick(1)">
                            <!-- 综合结果 -->
                            {{ search_default_header[0] }}
                        </li>
                        <li :class="selectIndex == 2 ? 'active' : ''" @click="selectClick(2)">
                            <!-- 质量结果 -->
                            {{ search_default_header[1] }}
                        </li>
                        <li :class="selectIndex == 3 ? 'active' : ''" @click="selectClick(3)">
                            <!-- 标准结果 -->
                            {{ search_default_header[2] }}
                        </li>
                    </ul>
                </div>
                <div class="result_list">
                    <ul v-if="noData">
                        <li class="result_list_item" v-for="(item, index) in search_current" :key="index">
                            <div class="title flex vertical_center">
                                <div class="title_text" @click="gotoPage(item)" v-html="item.title"></div>
                                <div class="state_token flex" v-for="(tag, index2) in item.tag" :key="index2">
                                    <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{
                    tag
                  }}</span>
                                </div>
                            </div>
                            <div class="content" v-html='item.description.replace( /src=\"/g, `src="` + $store.state.app.img_url)'></div>
                            <div class="source">来源：{{ item.data_type }}</div>
                        </li>
                    </ul>
                    <div v-else style="text-align: center; padding: 150px 0; font-size: 22px">
                        暂无数据
                    </div>
                </div>
                <Row v-if="spin_search_Page_box">
                    <Col span="24">
                    <div style="margin-bottom: 60px;padding-top: 40px;display: flex; justify-content: center; align-items: center;">
                        <div>
                            <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
                        </div>
                        <div>
                            <Page :total="totalCount" :current="table_current_1" :page-size="10" :page-size-opts="[10, 20, 30, 50]" @on-change="table_Pagechange_1" @on-page-size-change="table_PageSizechange_1" show-sizer show-elevator></Page>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
            <div class="result_right">
                <!-- 相关术语解释 -->
                <div class="termExplain" v-if="search_term.data.length > 0">
                    <ul class="list_nav_ul flex">
                        <li class="active">{{ search_term.header }}</li>
                    </ul>
                    <div class="list">
                        <div @click="gotoPage(item)" v-for="(item, index) in search_term.data" :key="index">
                            <Tooltip max-width="100%" width="100%" theme="light" :content="
                  item.title + '\n' +
                    '释义来源：' +
                    (item.source ? item.source : '暂无数据')
                ">
                                <div class="item flex">
                                    <span class="span_tooltip" style="width:100px">{{
                    item.title
                  }}</span>
                                    <span class="span_tooltip" style="width:210px;text-align: right;">释义来源：{{ item.source || "暂无数据" }}</span>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <!-- 标准中的知识-->
                <div class="standardKnowledge" v-if="search_standard.data.length > 0">
                    <ul class="list_nav_ul flex">
                        <li class="active text_hidden_2" style="display: flex; align-items: center">
                            {{ search_standard.header }}
                        </li>
                    </ul>
                    <div class="list">
                        <div class="item flex" @click="gotoPage(item)" v-for="(item, index) in search_standard.data" :key="index">
                            <img :src="require('@/img/lianjie.png')" />
                            <Tooltip max-width="350" :content="item.title" theme="light">
                                <span class="name">{{ item.title }}</span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <!--  其他推荐 -->
                <div class="restsRecommend" v-if="search_other.data.length > 0">
                    <ul class="list_nav_ul flex">
                        <li class="active">{{ search_other.header }}</li>
                    </ul>
                    <div class="list">
                        <div class="item" v-for="(item, index) in search_other.data" :key="index" @click="gotoPage(item)">
                            <Tooltip max-width="350" :content="item.title" theme="light">
                                <div class="title text_hidden_1">
                                    {{ item.title }}
                                </div>
                            </Tooltip>
                            <div class="info flex">
                                <img :src="$store.state.app.img_url + item.image" />
                                <div class="flex text_info">
                                    <Tooltip max-width="350" :content="item.description" theme="light">
                                        <span class="name text_hidden_2">{{
                      item.description
                    }}</span>
                                    </Tooltip>
                                    <span class="reason" style="font-size: 12px">推荐理由:{{ item.data_type }}</span>
                                </div>
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
  name: 'queenSlowDownBoardRecommend',
  components: {},
  data() {
    return {
      isShowChat: false,
      search_Val: '',
      newWord: '', //新词发现
      //   search_main: {},
      search_term: { data: [] },
      search_standard: { data: [] },
      //   search_newword: {},
      search_other: { data: [] },
      //   search_quality_result: {},
      //   search_standard_result: {},
      search_current: {},
      tableTab: [],
      tableHeader: [
        {
          title: '问题现象',
          key: 'xianxiang',
          align: 'center',
          render: (h, params) => {
            if (params.row.xianxiang == '') {
              return h('span', {}, '-');
            } else {
              return h('div', [
                h(
                  'Tooltip',
                  {
                    props: {
                      // 设置属性--但是placement不定义，则为自动
                      placement: 'top',
                    },
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          display: '-webkit-box',
                          '-webkit-box-orient': 'vertical',
                          '-webkit-line-clamp': '2',
                          overflow: 'hidden',
                        },
                      },
                      params.row.xianxiang
                    ), // 表格显示文字
                    h(
                      'div',
                      {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                        },
                      },
                      params.row.xianxiang // 气泡内的文字
                    ),
                  ]
                ),
              ]);
            }
          },
        },
        {
          title: '原因',
          key: 'yuanyin',
          align: 'center',
          render: (h, params) => {
            if (params.row.yuanyin == '') {
              return h('span', {}, '-');
            } else {
              return h('div', [
                h(
                  'Tooltip',
                  {
                    props: {
                      // 设置属性--但是placement不定义，则为自动
                      placement: 'top',
                    },
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          display: '-webkit-box',
                          '-webkit-box-orient': 'vertical',
                          '-webkit-line-clamp': '2',
                          overflow: 'hidden',
                        },
                      },
                      params.row.yuanyin
                    ), // 表格显示文字
                    h(
                      'div',
                      {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                        },
                      },
                      params.row.yuanyin // 气泡内的文字
                    ),
                  ]
                ),
              ]);
            }
          },
        },
        {
          title: '机理',
          key: 'jili',
          align: 'center',
          render: (h, params) => {
            if (params.row.jili == '') {
              return h('span', {}, '-');
            } else {
              return h('div', [
                h(
                  'Tooltip',
                  {
                    props: {
                      // 设置属性--但是placement不定义，则为自动
                      placement: 'top',
                    },
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          display: '-webkit-box',
                          '-webkit-box-orient': 'vertical',
                          '-webkit-line-clamp': '2',
                          overflow: 'hidden',
                        },
                      },
                      params.row.jili
                    ), // 表格显示文字
                    h(
                      'div',
                      {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                        },
                      },
                      params.row.jili // 气泡内的文字
                    ),
                  ]
                ),
              ]);
            }
          },
        },
        {
          title: '解决措施',
          key: 'cuoshi',
          align: 'center',
          render: (h, params) => {
            if (params.row.cuoshi == '') {
              return h('span', {}, '-');
            } else {
              return h('div', [
                h(
                  'Tooltip',
                  {
                    props: {
                      // 设置属性--但是placement不定义，则为自动
                      placement: 'top',
                    },
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          display: '-webkit-box',
                          '-webkit-box-orient': 'vertical',
                          '-webkit-line-clamp': '2',
                          overflow: 'hidden',
                        },
                      },
                      params.row.cuoshi
                    ), // 表格显示文字
                    h(
                      'div',
                      {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                        },
                      },
                      params.row.cuoshi // 气泡内的文字
                    ),
                  ]
                ),
              ]);
            }
          },
        },
      ],
      modal13: true,
      selectIndex: '1',
      search_keyword: '',
      spin_search_Page_box: false,
      table_current_1: 1,
      totalCount: 1,
      titleName: '', //头部名称
      spin_search_box: false,
      noData: true, // 判断是否有数据局
      // 当前页
      pageNum: '1',
      // 分页粒度
      pageSize: '10',
      search_default: '', //默认
      search_default_header: [], //点击的大标题
    };
  },
  mounted() {
    if (this.$store.state.page.searchType == '综合') {
      this.selectClick(1);
    } else if (this.$store.state.page.searchType == '质量') {
      this.selectClick(2);
    } else if (this.$store.state.page.searchType == '标准') {
      this.selectClick(3);
    }
    this.searchBtn();
    this.loadSearch_worddefault();
  },
  methods: {
    openChat() {
      this.$refs.chat.openModel();
    },
    // 点击检索
    searchBtn() {
      this.$axios(
        '/baike/yuchuli/search_key_in_event_graph',
        'post',
        this.$qs.stringify({
          key: this.search_Val,
        })
      ).then(res => {
        this.titleName = res.data.name;
        if (res.data.chart != '') {
          this.tableTab = res.data.chart;
        } else {
          this.$Message.warning('未查询到结果');
          this.tableTab = '';
        }
      });
      if (this.search_Val != '') {
        this.search_keyword = this.search_Val;
        this.loadAllData();
      }
    },
    // 页面跳转
    gotoPage(val) {
      console.log(val);
      let pageId = val.search_id;
      // let keys = Object.keys(pageId)
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
        this.$router.push({
          name: 'qualityWikipediaDetails',
          query: { id: values },
        });
      }
    },
    newWordTrue() {
      this.$axios(
        '/baike/sousuo/search_insert',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
        })
      ).then(res => {
        this.$store.commit('ModifiesTaskList', {
          list: '',
          id: res.data.RecordId,
          name: '',
          TaskData: '',
        });
        this.$router.push({
          path: '/TableList/NeologismDiscovery',
        });
      });
    },
    // 点击切换目录
    selectClick(index) {
      this.selectIndex = index;
      this.pageNum = 1;
      this.totalCount = 0;
      this.search_current = [];
      this.spin_search_Page_box = false;
      this.loadData();
      if (index == '1') {
        this.$store.commit('updated_searchType', '综合');
        this.selectIndex = index;
      } else if (index == '2') {
        this.$store.commit('updated_searchType', '质量');
        this.selectIndex = index;
      } else if (index == '3') {
        this.$store.commit('updated_searchType', '标准');
        this.selectIndex = index;
      }
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.pageNum = index;
      // 遮罩层
      this.loadData();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageSize = index;
      this.loadData();
    },
    loadData() {
      if (this.selectIndex == 1) {
        this.loadSearch_main();
      } else if (this.selectIndex == 2) {
        //搜索结果页-质量结果
        this.loadSearch_quality_result();
      } else if (this.selectIndex == 3) {
        //搜索结果页-标准结果
        this.loadSearch_standard_result();
      }
    },
    loadAllData() {
      // this.loadSearch_worddefault();
      // setTimeout(function(){
      //   alert(this.search_keyword)
      // },500)
      this.loadData();
      //搜索结果页-相关术语
      this.loadSearch_term();
      //搜索结果页-标准中的知识
      this.loadSearch_standard();
      //搜索结果页-新词发现
      this.loadSearch_newword();
      //搜索结果页-其他领域知识推荐
      this.loadSearch_other();
    },

    loadSearch_main() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_main',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.spin_search_box = false;
        // this.search_main = res.data.data;
        //默认选中

        if (res.data.data.length > 0) {
          this.noData = true;
          this.search_current = res.data.data;
          this.totalCount = res.data.totalNum;
          if (this.totalCount > 0) {
            this.spin_search_Page_box = true;
          }
        } else {
          this.noData = false;
        }
      });
    },
    //搜索结果页-质量结果
    loadSearch_quality_result() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_quality_result',
        'post',
        this.$qs.stringify({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.spin_search_box = false;
        // this.search_quality_result = res.data.data;
        if (res.data.data.length > 0) {
          this.noData = true;
          this.search_current = res.data.data;
          this.totalCount = res.data.totalNum;
          if (this.totalCount > 0) {
            this.spin_search_Page_box = true;
          }
        } else {
          this.noData = false;
        }
      });
    },
    //搜索结果页-标准结果
    loadSearch_standard_result() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_standard_result',
        'post',
        this.$qs.stringify({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.spin_search_box = false;
        if (res.data.data.length > 0) {
          this.noData = true;
          // this.search_standard_result = res.data.data;
          this.search_current = res.data.data;
          this.totalCount = res.data.totalNum;
          if (this.totalCount > 0) {
            this.spin_search_Page_box = true;
          }
        } else {
          this.noData = false;
        }
      });
    },
    //搜索结果页-相关术语
    loadSearch_term() {
      this.$axios(
        '/baike/sousuo/search_term',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.search_term = res.data;
      });
    },
    //搜索结果页-标准中的知识
    loadSearch_standard() {
      this.$axios(
        '/baike/sousuo/search_standard',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.search_standard = res.data;
      });
    },
    //搜索结果页-新词发现
    loadSearch_newword() {
      this.$axios(
        '/baike/sousuo/search_newword',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
        })
      ).then(res => {
        if (res.data.code == 200) {
          this.newWord = res.data.data;
        } else {
          this.newWord = '';
        }
      });
    },
    //搜索结果页-其他领域知识推荐
    loadSearch_other() {
      this.$axios(
        '/baike/sousuo/search_other',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.search_other = res.data;
      });
    },
    //没有搜索词默认搜索这个词汇
    loadSearch_worddefault() {
      this.$axios('/baike/sousuo/search_default', 'post')
        .then(res => {
          this.search_keyword = res.data.query;
          this.loadAllData();
        })
        .catch(res => {
          this.search_keyword = '飞机';
          this.loadAllData();
        });
    },
  },
};
</script>

<style scoped lang="less">
.chatBoxShow {
  display: block !important;
}
.recommedTable {
  overflow: hidden;
  display: block;
  padding: 0 25px;
  padding-bottom: 34px;
  box-sizing: border-box;
  background: #ffffff;
  .recommed_title {
    font-size: 20px;
    color: #3f424b;
    display: flex;
    align-items: center;
    font-weight: 600;
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
  }
  .recommed_table {
    /deep/ .ivu-table-cell {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .recommed_list {
    height: auto;
    padding-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
    li {
      height: 158px;
      overflow: hidden;
      width: 100%;
    }
    .recommed_list_title {
      height: 46px;
      line-height: 46px;
      font-size: 16px;
      color: #3f424b;
    }
    .recommed_list_text {
      font-size: 14px;
      color: #60636f;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
    }
    .recommed_list_source {
      color: #a3a6ad;
      margin-top: 12px;
    }
  }
}

/deep/ .ivu-radio-group-button .ivu-radio-wrapper {
  border-radius: 0px;
  white-space: pre-line;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
}
.termExplain .list {
  & > div {
    border-bottom: 1px solid #e5e5e5;
  }
  & > div:nth-last-child(1) {
    border: none;
  }
}
.termExplain /deep/ .ivu-tooltip {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}
.text_info {
  display: flex;
  justify-content: space-between;
}
.hint {
  border: 1px solid #3388ff;
  height: 46px;
  background: #f4f9ff;

  img {
    width: 17px;
  }
}
.standardKnowledge .list .flex {
  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
}
.text_hidden_1 {
  line-height: 16px;
}
.text_hidden_2 {
  line-height: 20px;
}

.result {
  margin-top: 18px;
  .result_left_table {
    background: #f5f7f9;
    padding: 20px 0;
  }
  .result_left {
    width: 840px;
    margin-right: 18px;
    background: white;

    .toggleType {
      overflow: hidden;
      ul {
        padding: 0px 25px;
      }
    }

    .result_list {
      margin: 0px 27px;

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
          }

          .title_text:hover {
            color: #3388ff;
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
        }

        .content {
          font-size: 14px;
          line-height: 22px;
          color: #60636f;
          margin-top: 15px;
          /deep/ img {
            width: 100%;
            height: auto;
          }
        }

        .source {
          font-size: 14px;
          line-height: 18px;
          color: #a3a6ad;
          margin-top: 15px;
        }
      }
    }
  }

  .result_right {
    flex: 1;
    .termExplain {
      .list {
        & > div {
          cursor: pointer;
        }
        .item {
          font-size: 12px;
          padding: 0;
          .name {
            display: inline-block;
            white-space: nowrap;
            width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .restsRecommend item {
    cursor: pointer;
  }
  .span_tooltip {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /deep/ em {
      color: #e21e1e;
    }
  }
}
</style>
