<template>
    <div>
        <!-- 相关专家推荐 -->
        <ul class="list_nav_ul flex">
            <li class="active">{{ search_other.header }}</li>
        </ul>
        <div class="list" v-if="search_other.data != ''">
            <div class="item" v-for="(item, index) in search_other.data" :key="index" @click="gotoPage(item)">
                <Tooltip max-width="350" :content="item.title" theme="light">
                    <div class="title text_hidden_1" v-html=" item.title"></div>
                </Tooltip>
                <div class="info flex">
                    <img :src="$store.state.app.img_url + item.image" />
                    <div class="flex text_info">
                        <Tooltip max-width="350" theme="light">
                            <div slot="content">
                                <span v-html="item.description"></span>
                            </div>
                            <span class="name text_hidden_2" v-html="item.description">}</span>
                        </Tooltip>
                        <div class="reason" style="font-size: 12px;display:flex;">
                            <div style="width:66px;">专业标签: </div>
                            <div><span v-for=" (tag , index2) in item.tag" :key="index2">{{tag}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="width: 100%; height: 60px; display: flex; justify-content: center; align-items: center;">
            暂无数据
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['search_other'],
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
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.text_hidden_2 {
  /deep/ em {
    color: #e21e1e;
  }
}
.item {
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
// 知识探索
// 绝对粘度
.searchlist_viscosity {
  overflow: hidden;
  clear: both;
  padding-left: 24px;
  margin-bottom: 18px;

  .searchlist_viscosity_header {
    display: flex;
    font-size: 18px;
    .searchlist_viscosity_header_l {
      font-size: 17px;
      font-weight: bold;
      white-space: nowrap;
      max-width: 670px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .searchlist_viscosity_header_r {
      display: flex;
      span {
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }
  .searchlist_viscosity_cont {
    color: #60636f;
    font-size: 14px;
    line-height: 26px;
    margin-top: 8px;
    margin-bottom: 4px;
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