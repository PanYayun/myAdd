<template>
  <div class="termEncyclopediaDetail">
    <Spin fix v-if="spin_termEncyclopediaDetail"></Spin>
    <div class="box-left">
      <div class="left-content-table">
        <div
          class="content-header"
          style="display:flex;align-items: center; justify-content: space-between;"
        >
          <span class="title">基本信息</span>
          <div style="display: flex;align-items: center;">
            <div @click="isTrue">
              <collection :coliectionData="coliectionData"></collection>
            </div>
            <div class="content-header-button" @click="scrollToGraph">
              查看图谱
            </div>
          </div>
        </div>
        <div class="content-table-div">
          <Table
            :columns="columns"
            :data="tableData"
            :show-header="false"
            stripe
            border
            highlight-row
          ></Table>
        </div>
      </div>
      <div class="left-content-detail">
        <Table
          :columns="columns2"
          :data="tableData2"
          stripe
          border
          highlight-row
        ></Table>
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
      <div class="right-content-RecommendText" style="background: #ffffff">
        <recommend-text-zb
          :title="TitleData.RecommendText_data.title"
          :listData="TitleData.RecommendText_data.listData"
        ></recommend-text-zb>
      </div>
      <div class="right-content-RecommendTextSg" style="background: #ffffff">
        <recommend-text-sg
          :title="TitleData.RecommendTextSg_data.title"
          :listData="TitleData.RecommendTextSg_data.listData"
        ></recommend-text-sg>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendTextZb from "@/components/RecommendTextZb";
import RecommendTextSg from "@/components/RecommendTextSg";
import atlasComponents from "@/components/atlasComponents.vue";
import collection from "@/components/collection.vue";

export default {
  name: "BasicQuotaDetail",
  props: [""],
  components: {
    RecommendTextZb,
    RecommendTextSg,
    atlasComponents,
    collection,
  },
  data() {
    return {
      test: "02YQJ+3.1",
      spin_termEncyclopediaDetail: true,
      TitleData: {
        RecommendText_data: {
          title: "相似条款",
          listData: [],
        },
        RecommendTextSg_data: {
          title: "相关事故",
          listData: [],
        },
      },
      columns: [
        {
          key: "Table_name",
          width: 150,
          render: (h, params) => {
            return h("div", [h("strong", params.row.Table_name)]);
          },
        },
        {
          key: "Table_value",
          tooltip: true,
        },
      ],
      columns2: [
        {
          title: "序号",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.index + 1);
          },
        },
        {
          title: "指标参数名",
          key: "ZBMC",
        },
        {
          title: "指标参数值",
          key: "ZBZ",
        },
        {
          title: "约束条件",
          key: "YSTJ",
        },
      ],
      coliectionType: "标准指标", //["术语知识百科","标准指标", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      coliectionData: {
        username: "",
        content: { type: "", name: "", param: { ZBID: "" } },
      },
      tableData: [
        {
          Table_name: "标准号",
          key: "BZBH",
          Table_value: "",
        },
        {
          Table_name: "标准名称",
          key: "BZZWMC",
          Table_value: "",
        },
        {
          Table_name: "上级产品名称",
          key: "SJCPMC",
          Table_value: "",
        },
        {
          Table_name: "产品名称",
          key: "CPMC",
          Table_value: "",
        },
        {
          Table_name: "上级条款名称",
          key: "SJZBMC",
          Table_value: "",
        },
        {
          Table_name: "条款名称",
          key: "ZBMC",
          Table_value: "",
        },
        {
          Table_name: "条款章条号",
          key: "ZBZTH",
          Table_value: "",
        },
        {
          Table_name: "条款要求",
          key: "ZBYQ",
          Table_value: "",
        },
        {
          Table_name: "具体条款值",
          key: "JTZBZ",
          Table_value: "",
        },
        {
          Table_name: "试验方法章条号",
          key: "SYFFZTH",
          Table_value: "",
        },
        {
          Table_name: "试验方法",
          key: "SYFF",
          Table_value: "",
        },
      ],
      tableData2: [],
    };
  },
  mounted() {
    this.loadDetail();
    this.isTrue();
  },
  methods: {
    // 点击收藏
    isTrue() {
      this.coliectionData.username = this.$store.state.user.userInfo.username;
      this.coliectionData.content.type = this.coliectionType;
      this.coliectionData.content.name = this.all_data_key;
      this.coliectionData.content.param = {
        ZBID: this.all_data_key,
      };
    },
    loadDetail() {
      // 标准指标页面的数据
      this.$axios(
        "/baike/biaozhun/get_bzzb_detail",
        "post",
        this.$qs.stringify({
          ZBID: this.all_data_key, //当前分类ID
        })
      ).then((res) => {
        console.log(res, "123");
        if (res.data.code == 200) {
          var arr1 = res.data.data.typelist;
          arr1.unshift("全部");
          // this.listUl = arr1;
          this.$store.commit("updated_atlasTypeList", arr1);
          let res_data = JSON.parse(JSON.stringify(res.data.data));
          // 给表格赋值
          var newDataList = [];
          for (const key_ in res_data.text) {
            for (let i = 0; i < this.tableData.length; i++) {
              const element = this.tableData[i];
              if (element.key == key_) {
                var value = res_data.text[key_];
                if (value && value.length > 0) {
                  element.Table_value = res_data.text[key_];
                  newDataList.push(element); //如果值不为空，放入新数据
                }
              }
            }
          }
          if (res.data.data.graph.nodes.length > 0) {
            this.$store.commit("updated_atlasImg", res.data.data.graph);
          }
          this.tableData = newDataList;
          this.tableData2 = res.data.data.zbcsxx;
          this.TitleData.RecommendText_data.listData = res_data.similarity_zb;
          this.TitleData.RecommendTextSg_data.listData = res_data.similarity_sg;
          setTimeout(() => {
            this.spin_termEncyclopediaDetail = false;
          }, 200);
        } else {
          this.$Message.error({
            content: res.data.msg,
            duration: 10,
            closable: true,
          });
        }
      });
    },
    View_map_btn() {
      console.log("run");
    },
    scrollToGraph() {
      $("html,body").animate(
        { scrollTop: $(".graphScroll").offset().top + $("body").scrollTop() },
        500
      );
    },
  },
  computed: {
    all_data_key() {
      return this.$route.query.id;
      // return this.test;
    },
    XGZBMC() {
      return this.$route.query.id;
    },
  },
  watch: {
    XGZBMC(oldVal, newVal) {
      if (oldVal != newVal) {
        this.loadDetail();
      }
    },
  },
};
</script>
<style lang="less" scoped>
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
.termEncyclopediaDetail {
  width: 1200px;
  position: relative;
  overflow: hidden;
  margin: 30px auto;

  .box-left {
    width: 900px;
    float: left;
    overflow: hidden;

    .left-content-top {
      width: 100%;
      background: white;
      padding: 30px 30px 32px 30px;
      overflow: hidden;
    }
    .left-content-table {
      width: 100%;
      background: white;
      padding: 0px 30px 40px 30px;

      .content-table-div {
        width: 100%;
        margin-top: 30px;
        /deep/ .ivu-table-cell {
          padding-left: 27px;
        }
      }
    }
  }
  .box-right {
    width: 280px;
    float: right;

    .right-content-recommendNoun {
      background: white;
      margin-top: 10px;
    }
    .right-content-RecommendTextSg {
      background: white;
      margin-top: 30px;
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
    }
  }
}
</style>
