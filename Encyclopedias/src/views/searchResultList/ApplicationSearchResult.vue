<template>
  <div class="applicationSearch" style="position: relative">
    <Spin fix v-if="spin_search_box"></Spin>
    <div class="answer">
      <div class="answer-header">
        <div class="answer-header-title">答案区</div>
      </div>
      <ul>
        <template v-for="(item, index) in answer">
          <li
            :key="index"
            @click="selectAnwer(item)"
            v-if="item && item.data && item.data.length > 0"
          >
            <div class="item-text conent-div">{{ item.data }}</div>
            <div class="item-source">
              <span class="source-div">来源：{{ item.source }}</span>
              <span class="item-index-number"
                >信心指数：{{ item.reliability }}</span
              >
            </div>
          </li>
        </template>
      </ul>
    </div>

    <div class="recommend">
      <div class="recommend-header">
        <div>推荐区</div>
      </div>
      <ul>
        <li
          v-for="(item, index) in recommend"
          :id="item.reco_id"
          :key="index"
          @click="selectRecommed(item)"
        >
          <div class="r-item-title-div">
            <span class="r-item-title">{{ item.reco_title }}</span>
            <span class="r-item-index-number"
              >信心指数：{{ item.reco_score }}</span
            >
          </div>
          <div class="r-item-content conent-div">{{ item.reco_abstract }}</div>
          <div class="r-item-source source-div">
            来源：{{ item.reco_source }}
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="recommend" v-if="atlasImgShow">
      <div class="recommend-header">
        <div>图谱区</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ApplicationSearchResult",
  data() {
    return {
      answer: [],
      recommend: [],
      spin_search_box: true
    };
  },
  methods: {
    selectAnwer(item) {
      // this.toDetail(item.source_type,item.reco_id)
    },
    selectRecommed(item) {
      this.toDetail(item.reco_source_type, item.reco_id);
    },
    toDetail(detailType, detailKey) {
      switch (detailType) {
        case "BZ":
          this.$router.push({
            name: "BasicDetail",
            query: {
              id: detailKey
            }
          });
          break;
        case "ZB":
          this.$router.push({
            name: "BasicQuotaDetail",
            query: {
              id: detailKey
            }
          });
          break;
        case "MHSG":
          this.$router.push({
            name: "CivilAviationDetail",
            query: {
              id: detailKey
            }
          });
          break;
        case "SY":
          this.$router.push({
            name: "TermDetail",
            query: {
              id: detailKey
            }
          });
          break;
        default:
          break;
      }
    },
    // 获取页面传值-以图搜索
    routerPath(newVal) {
      this.spin_search_box = true;
      this.$axios("/baike/sousuo/search_by_image", "post", newVal.data).then(
        res => {
          this.answer = res.data.answer;
          this.recommend = res.data.recommend;
          setTimeout(() => {
            this.spin_search_box = false;
          }, 200);
        }
      );
    },
    // 获取页面传值-全站搜索
    routerPath_2(newVal) {
      this.spin_search_box = true;
      this.$axios(
        "/baike/sousuo/search_by_keywords",
        "post",
        this.$qs.stringify({
          keywords: newVal.data
        })
      ).then(res => {
        this.answer = res.data.answer;
        this.recommend = res.data.recommend;
        setTimeout(() => {
          this.spin_search_box = false;
        }, 200);
      });
    }
  },
  computed: {
    SearchImg() {
      return this.$store.state.page.SearchImg;
    },
    router_val() {
      return JSON.parse(this.$route.query.val);
    }
  },
  mounted() {},
  watch: {
    SearchImg: {
      handler(newVal, oldVal) {
        console.log(this.SearchImg);
        if (newVal.type == "2") {
          this.routerPath(newVal);
        } else if (newVal.type == undefined) {
          this.routerPath_2(this.router_val);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.applicationSearch {
  padding: 30px 0px;
  width: 1200px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 auto;
  .answer {
    min-height: 300px;
    background-color: white;
    padding: 0px 30px 0px 30px;
    .answer-header {
      border-bottom: 1px solid #eee;
      width: 100%;
      height: 60px;
      .answer-header-title {
        font-size: 20px;
        color: #3f424b;
        padding: 20px 0px 0px 0px;
        line-height: 20px;
        float: left;
      }
      & > button {
        float: right;
        width: 80px;
        height: 30px;
        background-color: #3388ff;
        font-size: 14px;
        float: right;
        margin-top: 15px;
        color: white;
        border-radius: 2px;
      }
    }
    ul {
      clear: both;
      li {
        border-bottom: 1px solid #eee;
        padding-top: 26px;
        padding-bottom: 30px;
        .item-source {
          padding-top: 16px;
          .item-index-number {
            float: right;
            font-size: 16px;
            color: #3388ff;
          }
        }
      }
      & > li:last-child {
        border-bottom: none;
      }
    }
  }
  .recommend {
    background-color: white;
    width: 100%;
    margin-top: 20px;
    padding: 0px 30px 0px 30px;
    .recommend-header {
      border-bottom: 1px solid #eee;
      width: 100%;
      height: 60px;
      div {
        font-size: 20px;
        color: #3f424b;
        padding: 20px 0px 0px 0px;
        line-height: 20px;
        float: left;
      }
    }
    ul > li {
      border-bottom: 1px solid #eee;
      padding-top: 30px;
      padding-bottom: 28px;
      .r-item-title-div {
        overflow: hidden;
        align-content: center;
        display: flex;
        justify-content: space-between;
        .r-item-title:hover {
          color: #3388ff;
          cursor: pointer;
        }
        .r-item-title {
          font-size: 18px;
          line-height: 18px;
          color: #3f424b;
          padding-bottom: 20px;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 834px;
          white-space: nowrap;
        }
        .r-item-index-number {
          font-size: 16px;
          line-height: 18px;
          color: #3388ff;
        }
      }
      .r-item-content {
        clear: both;
      }
      .r-item-source {
        font-size: 14px;
        line-height: 14px;
        color: #afb2b8;
        padding-top: 22px;
      }
    }
    ul > li:last-child {
      border: none;
    }
  }
  .conent-div {
    line-height: 22px;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    max-height: 100px;
    overflow: hidden;
  }
  .source-div {
    font-size: 14px;
    line-height: 14px;
    color: #afb2b8;
  }
  // .recommend .atlas
}
</style>