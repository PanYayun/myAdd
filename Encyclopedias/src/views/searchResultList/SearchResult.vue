<template>
  <div
    class="layout_container"
    style="min-height: 900px; margin-top: 20px; position: relative"
  >
    <Spin fix v-if="spin_search_box"></Spin>
    <div class="title">
      <div>搜索结果</div>
    </div>
    <div
      style="
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        width: 100%;
      "
      v-if="if_data_null"
    >
      暂无数据
    </div>
    <ul class="result_ul">
      <li
        :data-i="index"
        v-for="(item, index) in list"
        :key="index"
        @click="touchRow(item)"
        style="cursor: pointer"
      >
        <div class="result_ul_div">
          <em>{{ item.SGMC }}</em>
        </div>
        <div class="result_ul_li_detail">
          <div>{{ item.SGLYWJQS }}</div>
          <div class="result_ul_type">{{ item.SGXZFL }}</div>
        </div>
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
  name: "SearchResult",
  components: {},
  data() {
    return {
      if_data_null: false,
      spin_search_Page_box: true,
      spin_search_box: true,
      pageIndex: 1,
      list: [],
      totalCount: 1,
      table_current_1: 1,
      // 当前页
      pageNum: "1",
      // 分页粒度
      pageSize: "5"
    };
  },
  mounted() { },
  methods: {
    touchRow(item) {
      this.$router.push({
        path: "/CivilAviationDetail",
        query: { id: item.SGID }
      });
    },
    loadData() {
      // 暂无数据的容器
      this.if_data_null = false;
      this.spin_search_Page_box = true;
      // 遮罩
      this.spin_search_box = true;
      if (this.SearchResult.status === "0") {
        // 一路点进来的
        let url = "";
        let par = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        if (this.$route.query.fl_name === "事故时间") {
          url = "/baike/minhang/search_by_fault_year";
          par.fault_year = this.$route.query.childName;
        } else if (this.$route.query.fl_name === "飞机型号") {
          url = "/baike/minhang/search_by_aircraft_type";
          par.aircraft_type = this.$route.query.childName;
        } else if (this.$route.query.fl_name === "航空公司") {
          url = "/baike/minhang/search_by_aircraft_company";
          par.aircraft_company = this.$route.query.childName;
        } else if (this.$route.query.fl_name === "飞行阶段") {
          url = "/baike/minhang/search_by_fly_period";
          par.fly_period = this.$route.query.childName;
        } else if (this.$route.query.fl_name === "事故等级") {
          url = "/baike/minhang/search_by_fault_level";
          par.fault_level = this.$route.query.childName;
        }
        // 配置参数
        this.$axios(url, "get", par).then(res => {
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
        this.$axios("/baike/minhang/search_by_keywords", "get", {
          keywords: this.SearchResult.data, //当前分类ID
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
  computed: {
    SearchResult() {
      if (JSON.stringify(this.$route.query.val) == undefined) {
        // 一路点进来的
        return {
          fl_name: this.$route.query.fl_name,
          childName: this.$route.query.childName,
          status: "0"
        };
      } else {
        let data_ = JSON.parse(this.$route.query.val);
        return {
          type: data_.type,
          data: data_.data,
          status: "1"
        };
      }
    }
  },
  watch: {
    SearchResult: {
      handler(newVal, oldVal) {
        this.loadData();
      },
      // 加上之后第一次定义时就会执行
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.layout_container {
  margin-top: 30px;
  padding: 0px 30px 0px 30px;
  background: white;
  min-height: 900px;
  width: 1200px;
  .title {
    height: 60px;
    float: left;
    box-sizing: border-box;
    & > div {
      height: 59px;
      line-height: 59px;
      color: #3f424b;
      font-size: 20px;
      width: 1140px;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .result_ul {
    min-height: 300px;
    overflow: hidden;
    clear: both;

    & > li {
      width: 100%;
      overflow: hidden;
      padding-top: 30px;
      box-sizing: border-box;
      height: 112px;
      border-bottom: 1px solid #eeeeee;
      .result_ul_div {
        width: 100%;
        font-size: 18px;
        color: #3f424b;
        line-height: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        & em:hover {
          color: #136ec2;
        }
      }
      .result_ul_li_detail {
        margin-top: 20px;
        font-size: 14px;
        line-height: 14px;
        color: #60636f;
        & > div {
          float: left;
        }
        .result_ul_type {
          margin-left: 160px;
        }
      }
    }
    & > li:last-child {
      border: none;
    }
  }
}
</style>