<template>
  <div class="search_box" style="position: relative">
    <Spin fix v-if="spin_search_box"></Spin>
    <div class="search_title">
      <div>搜索结果</div>
    </div>
    <div
      style="
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
      v-if="if_data_null"
    >
      暂无数据
    </div>
    <ul class="searchUl">
      <li v-for="(item, index) of list" :key="index" @click="touchRow(item)">
        <div class="searchUl_t">
          <div class="searchUl_type">有效</div>
          <div class="searchUl_text">
            <em>{{ item.BZBH }}</em
            >{{ item.BZZWMC }}
          </div>
        </div>
        <div class="searchUl_b">{{ item.SYFW }}</div>
      </li>
    </ul>
    <Row v-if="spin_search_Page_box">
      <Col span="24">
        <div
          style="
            margin-bottom: 60px;
            padding-top: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div>
            <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
          </div>
          <div>
            <Page
              :total="totalCount"
              :current="table_current_1"
              :page-size="5"
              :page-size-opts="[5, 10, 15, 20, 50]"
              @on-change="table_Pagechange_1"
              @on-page-size-change="table_PageSizechange_1"
              show-sizer
              show-elevator
            ></Page>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "BzSearchList",
  data() {
    return {
      if_data_null: false,
      spin_search_Page_box: true,
      spin_search_box: true,
      list: [],
      totalCount: 1,
      table_current_1: 1,
      // 当前页
      pageNum: "1",
      // 分页粒度
      pageSize: "5"
    };
  },
  methods: {
    loadData() {
      // 暂无数据的容器
      this.if_data_null = false;
      this.spin_search_Page_box = true;
      // 遮罩
      this.spin_search_box = true;
      if (this.SearchImg.status === "0") {
        // 一路点进来的
        this.$axios("/baike/biaozhun/search_by_classification", "get", {
          classification: this.SearchImg.id, //当前分类ID
          pageSize: this.pageSize, //每页条数
          pageNum: this.pageNum //页码
        }).then(res => {
          // 总页数
          this.totalCount = res.data.data.totalCount;
          if (this.totalCount == 0) {
            this.if_data_null = true;
            this.spin_search_Page_box = false;
          }
          // 当前页码
          this.table_current_1 = res.data.data.pageNum;
          this.list = res.data.data.resultList;
          setTimeout(() => {
            this.spin_search_box = false;
          }, 200);
           $("html,body").animate({ scrollTop: "0px" }, 500);
        });
      } else {
        // 通过检索进来的
        this.$axios("/baike/biaozhun/search_by_keywords", "get", {
          keywords: this.SearchImg.data, //当前分类ID
          pageSize: this.pageSize, //每页条数
          pageNum: this.pageNum //页码
        }).then(res => {
          // 总页数
          this.totalCount = res.data.data.totalCount;
          if (this.totalCount == 0) {
            this.if_data_null = true;
            this.spin_search_Page_box = false;
          }
          // 当前页码
          this.table_current_1 = res.data.data.pageNum;
          this.list = res.data.data.resultList;
          setTimeout(() => {
            this.spin_search_box = false;
          }, 200);
         $("html,body").animate({ scrollTop: "0px" }, 500);
        });
      }
    },
    touchRow(item) {
      // this.$router.push({
      //   path: "/BasicDetail",
      //   query: { id: "XXX 67.1A-2008" }
      // });
      this.$router.push({ path: "/BasicDetail", query: { id: item.BZBH } });
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.pageNum = index;
      this.loadData();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageSize = index;
      this.loadData();
    }
  },
  mounted() { },
  computed: {
    SearchImg() {
      if (JSON.stringify(this.$route.query.val) == undefined) {
        // {id: "BZCC02", type: "bzbk"}
        return {
          id: this.$route.query.id,
          type: this.$route.query.type,
          status: "0"
        };
      } else {
        let data_ = JSON.parse(this.$route.query.val);
        // {type: "0", data: "11111111111"}
        return {
          type: data_.type,
          data: data_.data,
          status: "1"
        };
      }
    }
  },
  watch: {
    SearchImg: {
      handler(newVal, oldVal) {
        this.pageNum = 1;
        this.loadData();
      },
      // 加上之后第一次定义时就会执行
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.search_box {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  background: #ffffff;
  padding: 0 30px;
  box-sizing: border-box;
  .search_title {
    height: 60px;
    box-sizing: border-box;
    & > div {
      height: 59px;
      line-height: 59px;
      color: #3f424b;
      font-size: 20px;
      width: 840px;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .searchUl {
    min-height: 300px;
    overflow: hidden;
    & > li {
      height: 134px;
      background: #ffffff;
      border-bottom: 1px solid #eeeeee;
      color: #60636f;
      padding-top: 30px;
      box-sizing: border-box;
      cursor: pointer;
      .searchUl_t {
        overflow: hidden;
        display: flex;
        align-items: center;
        & > div {
          float: left;
        }
        & em {
          color: #136ec2;
          margin-right: 6px;
        }
        .searchUl_type {
          width: 46px;
          text-align: center;
          color: #ffffff;
          border-radius: 3px;
          font-size: 12px;
          background-image: linear-gradient(to right, #3388ff, #7cb3ff);
          margin-right: 12px;
        }
        .searchUl_text {
          font-size: 18px;
          line-height: 18px;
          color: #333333;
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .searchUl_text:hover{
          color: #136ec2;
        }
      }
      .searchUl_b {
        clear: both;
        overflow: hidden;
        color: #60636f;
        font-size: 14px;
        line-height: 22px;
        margin-top: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight: normal;
      }
    }
  }
}
</style>