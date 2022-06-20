<template>
    <div class="main_container" style="position: relative">
        <Spin fix v-if="spin_search_box"></Spin>
        <div class="hint flex vertical_center horizontal_center" v-if="newWord != ''">
            <img src="@/img/lightbulb.png" />
            <span style="margin-top: 2px">{{ newWord }} <a @click="newWordTrue()">是</a> / <a>否</a></span>
        </div>
        <div class="result flex">
            <div class="result_left">
                <div class="toggleType">
                    <ul class="flex list_nav_ul">
                        <li v-for="(item,index) in search_default_header" @click="selectClick(index+1,item)" :class="selectIndex == index+1 ? 'active' : ''" :key=index>{{item}}</li>
                    </ul>
                </div>
                <!-- 标准、质量、综合页面 -->
                <div class="result_list" v-if="selectType == '质量查询'">
                    <searchminData :search_current='search_current'></searchminData>
                </div>
                <div class="result_list" v-if="selectType == '标准查询'">
                    <searchminData :search_current='search_current_bz'></searchminData>
                </div>
                <!-- 科研辅助页面 -->
                <div class="result_list" v-if="selectType == '科研辅助'">
                    <searchlistScience :search_science='search_science'></searchlistScience>

                </div>
                <!-- 知识探索页面 -->
                <div class="result_list" v-if="selectType == '知识探索'">
                    <searchlistViscosity :pageSize='pageSize' :pageNum='pageNum' :search_keyword='search_keyword' :search_knowledge='search_knowledge'></searchlistViscosity>
                </div>

                <Row v-if="spin_search_Page_box">
                    <Col span="24">
                    <div style="margin-bottom: 60px;padding-top: 40px;display: flex; justify-content: center; align-items: center;">
                        <div>
                            <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
                        </div>
                        <div>
                            <Page :total="totalCount" :current="table_current" :page-size="10" :page-size-opts="[10, 20, 30, 50]" @on-change="table_Pagechange_1" @on-page-size-change="table_PageSizechange_1" show-sizer show-elevator></Page>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
            <div class="result_right">
                <!-- ----------------------------------------------上----------------------------------------- -->
                <!-- 相关航空知识元 -->
                <div class="termExplain" v-if="selectType == '科研辅助'">
                    <searchAviation :search_term='searchAviationData'></searchAviation>
                </div>
                <!-- 相关术语推荐 -->
                <div class="termExplain" v-if="selectType == '质量查询'">
                    <searchTrem :search_term='searchTremData'></searchTrem>
                </div>
                <div class="termExplain" v-if="selectType == '标准查询'">
                    <searchTrem :search_term='searchTremData'></searchTrem>
                </div>
                <!-- 知识体系搜索 -->
                <div class="termExplain" v-if="selectType == '知识探索'">
                    <searchKnowledge :search_term='searchKnowledgeData'></searchKnowledge>
                </div>
                <!-- ----------------------------------------------中----------------------------------------- -->
                <!-- 标准中的知识-->
                <div class="standardKnowledge" v-if="selectType == '质量查询'">
                    <searchStandard :search_standard='search_standardData'></searchStandard>
                </div>
                <div class="standardKnowledge" v-if="selectType == '标准查询'">
                    <searchStandard :search_standard='search_standardData'></searchStandard>
                </div>
                <!-- 其他领域相关论文-->
                <div class="standardKnowledge" v-if="selectType == '科研辅助'">
                    <searchPaper :search_standard='searchPaperData'></searchPaper>
                </div>
                <!-- 相关科研期刊 -->
                <div class="standardKnowledge" v-if="selectType == '知识探索'">
                    <searchFrequency :search_standard='searchFrequencyData'></searchFrequency>
                </div>
                <!-- ----------------------------------------------下----------------------------------------- -->
                <!--  其他领域知识推荐 -->
                <div class="restsRecommend" v-if="selectType == '质量查询'">
                    <searchOtherRecommend :search_other='searchOtherRecommendData'></searchOtherRecommend>
                </div>
                <div class="restsRecommend" v-if="selectType == '标准查询'">
                    <searchOtherRecommend :search_other='searchOtherRecommendData'></searchOtherRecommend>
                </div>
                <!--  例证推荐 -->
                <div class="restsRecommend" v-if="selectType == '科研辅助'">
                    <searchExamples :search_other='searchExamplesData'></searchExamples>
                </div>
                <!--  相关专家推荐 -->
                <div class="restsRecommend" v-if="selectType == '知识探索'">
                    <searchSpecialist :search_other='searchSpecialistData'></searchSpecialist>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 左侧
import searchlistViscosity from './components/searchlistViscosity'; //知识发现
import searchlistScience from './components/searchlistScience'; //科研辅助
import searchminData from './components/searchminData'; //标准、质量、综合查询
// 右侧
import searchAviation from './components/searchAviation'; //航空知识元
import searchTrem from './components/searchTrem'; //相关术语推荐
import searchKnowledge from './components/searchKnowledge'; // 知识体系搜索
import searchStandard from './components/searchStandard'; //标准中的知识
import searchPaper from './components/searchPaper'; //其他领域相关论文
import searchFrequency from './components/searchFrequency'; // 相关科研期刊
import searchOtherRecommend from './components/searchOtherRecommend'; //其他领域知识推荐
import searchExamples from './components/searchExamples'; //例证推荐
import searchSpecialist from './components/searchSpecialist'; //相关专家推荐
export default {
  name: 'semanticSearch',
  components: {
    searchlistViscosity,
    searchlistScience,
    searchminData,
    searchOtherRecommend,
    searchAviation,
    searchStandard,
    searchPaper,
    searchTrem,
    searchFrequency,
    searchKnowledge,
    searchSpecialist,
    searchExamples,
  },
  data() {
    return {
      newWord: '', //新词发现
      search_term: { data: [] },
      search_standard: { data: [] },
      search_other: { data: [] },
      search_current: {}, //质量-----------------左侧
      search_current_bz: [], //标准-----------------左侧
      search_science: [], //科研辅助的返回数据-----------------左侧
      search_knowledge: [], //知识探索------------------------左侧
      searchAviationData: [], //航空知识元的数据-------------------右上侧
      searchTremData: [], //相关术语-------------------右上侧
      searchKnowledgeData: [], //知识体系搜索-------------------右上侧
      search_standardData: [], //标准中的知识------------------------右中侧
      searchPaperData: [], //其他领域相关论文-------------------右中侧
      searchFrequencyData: [], //相关科研期刊-------------------右中侧
      searchOtherRecommendData: [], //其他领域知识推荐-------------------右下侧
      searchExamplesData: [], //例证推荐-------------------右下侧
      searchSpecialistData: [], //相关专家推荐-------------------右下侧
      selectIndex: '1',
      selectType: '知识探索', //选中的关键字
      search_keyword: '',
      spin_search_Page_box: false,
      table_current: 1,
      totalCount: 1,
      spin_search_box: false,
      // 当前页
      pageNum: '1',
      // 分页粒度
      pageSize: '10',
      search_default: '', //默认
      search_default_header: [], //点击的大标题
    };
  },
  mounted() {
    if (this.$route.query.val == undefined) {
      this.loadSearch_worddefault(true);
    } else {
      this.loadSearch_worddefault(false);
      this.search_keyword = this.$route.query.val;
    }
    this.loadSearch_newword();

    this.selectIndex = 1;

    this.selectType = this.$store.state.page.searchType;
    if (this.$store.state.page.searchType == '知识探索') {
      this.selectClick(1, '知识探索');
    } else if (this.$store.state.page.searchType == '科研辅助') {
      this.selectClick(2, '科研辅助');
    } else if (this.$store.state.page.searchType == '标准查询') {
      this.selectClick(3, '标准查询');
    } else if (this.$store.state.page.searchType == '质量查询') {
      this.selectClick(4, '质量查询');
    }
  },
  methods: {
    openChat() {
      this.$refs.chat.openModel();
    },

    // 新词发现
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
        this.$store.commit('StartBut', '民航事故知识抽取');
        this.$router.push({
          path: '/TableList/NeologismDiscovery',
        });
      });
    },
    // 点击切换目录
    selectClick(index, val) {
      this.selectIndex = index;
      this.selectType = val;
      this.pageNum = 1;
      this.totalCount = 0;
      this.spin_search_Page_box = false;
      // this.loadData();
      if (val == '知识探索') {
        this.$store.commit('updated_searchType', '知识探索');
        this.selectIndex = index;
      } else if (val == '科研辅助') {
        this.$store.commit('updated_searchType', '科研辅助');
        this.selectIndex = index;
      } else if (val == '标准查询') {
        this.$store.commit('updated_searchType', '标准查询');
        this.selectIndex = index;
      } else if (val == '质量查询') {
        this.$store.commit('updated_searchType', '质量查询');
        this.selectIndex = index;
      }
      this.loadData();
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
      if (this.selectType == '知识探索') {
        this.loadSearch_knowledge_result(); //知识探索
        this.loadSearch_Knowledge(); //知识体系搜索
        this.loadSearch_frequency(); //相关科研期刊
        this.loadSearch_specialist(); // 相关专家推荐
      } else if (this.selectType == '科研辅助') {
        this.loadSearch_science_result(); //科研辅助
        this.loadSearch_aviation(); //相关航空知识元
        this.loadSearch_paper(); //其他领域相关论文
        this.loadSearch_examples(); // 例证推荐
      } else if (this.selectType == '标准查询') {
        this.loadSearch_standard_result();
        this.loadSearch_term(); //相关术语
        this.loadSearch_recommend(); //其他领域知识推荐
        this.loadSearch_standard(); //标准中的知识
      } else if (this.selectType == '质量查询') {
        this.loadSearch_quality_result();
        this.loadSearch_term(); //相关术语
        this.loadSearch_recommend(); //其他领域知识推荐
        this.loadSearch_standard(); //标准中的知识
      }
    },
    // 左侧------------------------------------------------------------------综合结果
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
        if (res.data.data.length > 0) {
          this.search_current = res.data.data;
          this.totalCount = res.data.totalNum;
          if (this.totalCount > 0) {
            this.spin_search_Page_box = true;
          }
        }
      });
    },
    //左侧-------------------------------------------------------------------知识探索
    loadSearch_knowledge_result() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_main_update',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          return_num: '3',
        })
      ).then(res => {
        this.spin_search_box = false;
        this.search_knowledge = res.data.data;
        this.totalCount = res.data.totalNum;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
        }
      });
    },
    //左侧------------------------------------------------------------------科研辅助
    loadSearch_science_result() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_research',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          searchType: 'hk',
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.spin_search_box = false;
        this.search_science = res.data.data;
        this.totalCount = res.data.totalNum;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
        }
      });
    },
    //左侧------------------------------------------------------------------质量结果
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
        this.search_current = res.data.data;
        this.totalCount = res.data.totalNum;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
        }
      });
    },
    //左侧--------------------------------------------------------------------标准结果
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
        this.search_current_bz = res.data.data;
        this.totalCount = res.data.totalNum;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
        }
      });
    },
    //右侧--------------------------------------------------------------相关航空知识元
    loadSearch_aviation() {
      this.$axios(
        '/baike/sousuo/search_knowledge_unit',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.searchAviationData = res.data;
      });
    },
    //右侧-------------------------------------------------------------------相关术语
    loadSearch_term() {
      this.$axios(
        '/baike/sousuo/search_term',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.searchTremData = res.data;
      });
    },
    //右侧-------------------------------------------------------------------知识体系搜索
    loadSearch_Knowledge() {
      this.$axios(
        '/baike/sousuo/search_system',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.searchKnowledgeData = res.data;
      });
    },
    //右侧------------------------------------------------------------------其他领域相关论文
    loadSearch_paper() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_research',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          searchType: 'general',
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.spin_search_box = false;
        this.searchPaperData = res.data;
      });
    },
    //右侧------------------------------------------------------------------相关科研期刊
    loadSearch_frequency() {
      this.spin_search_box = true;
      this.$axios(
        '/baike/sousuo/search_related_journal',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          searchType: 'general',
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.spin_search_box = false;
        this.searchFrequencyData = res.data;
        console.log(this.searchFrequencyData);
      });
    },
    //右侧------------------------------------------------------------------标准中的知识
    loadSearch_standard() {
      this.$axios(
        '/baike/sousuo/search_standard',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.search_standardData = res.data;
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
    //右侧-------------------------------------------------其他领域知识推荐
    loadSearch_recommend() {
      this.$axios(
        '/baike/sousuo/search_other',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.searchOtherRecommendData = res.data;
      });
    },
    //右侧-------------------------------------------------例证推荐
    loadSearch_examples() {
      this.$axios(
        '/baike/sousuo/search_example',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.searchExamplesData = res.data;
      });
    },
    //右侧-------------------------------------------------相关专家推荐
    loadSearch_specialist() {
      this.$axios(
        '/baike/sousuo/search_professor',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.searchSpecialistData = res.data;
      });
    },
    //没有搜索词默认搜索这个词汇
    loadSearch_worddefault(isSearch) {
      this.$axios('/baike/sousuo/search_default', 'post').then(res => {
        this.search_default_header = res.data.header;
        if (isSearch == true) {
          this.$store.commit('updated_searchType', '知识探索');
          this.$router.push({
            path: '/semanticSearch',
            query: {
              val: res.data.query,
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import '../../styles/unified.css';
.chatBoxShow {
  display: block !important;
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

.result {
  margin-top: 18px;

  .result_left {
    width: 840px;
    margin-right: 18px;
    background: white;

    .toggleType {
      ul {
        padding: 0px 25px;
      }
    }

    .result_list {
      margin: 0px 27px;
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
</style>
