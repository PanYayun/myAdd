<template>
    <div>
        <!-- 科研辅助 -->
        <ul>
            <li class="result_list_item" v-for="(item, index) in search_science" :key="index">
                <div class="title flex vertical_center">
                    <div class="title_text" @click="gotoPage(item)" v-html="item.title"></div>
                    <div class=" state_token state_token2  flex" v-for="(tag, index2) in item.tag" :key="index2">
                        <span v-if="tag != ''" :class="'span_' + (index2 + 1)">{{ tag }}</span>
                    </div>
                </div>
                <div class="seartch_types_bottom" style="margin-top:10px;">
                    <div class="seartch_types_bottom_cont" v-for="(listCont, index3) in item.description" :key="index3">
                        <div class="seartch_types_bottom_cont_l">{{listCont.name}}：</div>
                        <div v-if="listCont.name != '相关航空知识元'" class="seartch_types_bottom_cont_r" v-html="listCont.value"></div>
                        <div v-else>
                            <span class="supType" @click="gotoPage2(itemSpan)" v-for="(itemSpan,index4) in listCont.value" :key="index4">
                                {{itemSpan}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="seartch_source_bottom">
                    <div v-if="item.source">来源：{{item.source}}</div>
                    <div v-if="item.refer_no">被引用量：{{item.refer_no}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['search_science'],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
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
    gotoPage2(val) {
      this.$router.push({
        path: '/semanticSearch',
        query: {
          val: val,
        },
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.supType:hover {
  color: #3388ff;
  cursor: pointer;
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
      /deep/ em {
        color: #e21e1e;
      }
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
.seartch_types_bottom {
  overflow: hidden;
  clear: both;
  .seartch_types_bottom_cont {
    overflow: hidden;
    font-size: 14px;
    color: #60636f;
    display: flex;
    line-height: 26px;
    .seartch_types_bottom_cont_r {
      flex: 1;
      /deep/ em {
        color: #e21e1e;
      }
    }
  }
}
.seartch_source_bottom {
  display: flex;
  line-height: 30px;
  font-size: 12px;
  color: #b1b3b9;
  & > div {
    margin-right: 30px;
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
  font-size: 16px;
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
</style>