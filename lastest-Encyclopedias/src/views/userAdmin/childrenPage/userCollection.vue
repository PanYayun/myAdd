<template>
  <div class="user-collection" style="position: relative;">
    <div class="title_nav">
      我的收藏
    </div>
    <div class="form_wrap">
      <Form
        ref="formValidate"
        :model="formItem"
        :label-width="45"
        style="display: flex"
      >
        <Form-item label="名称:" prop="name">
          <Input
            v-model="formItem.name"
            placeholder="请输入名称"
            class="info_input"
          ></Input>
        </Form-item>
        <FormItem label="类型:" prop="searchName" style="margin-left: 25px;">
          <Select
            v-model="formItem.type"
            placeholder="请选择类型"
            style="width: 160px"
          >
            <Option v-for="item in typeList" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
        </FormItem>
        <Form-item class="buttons-Form-item">
          <Button type="primary" @click="handleSubmit()">查询</Button>
        </Form-item>
      </Form>
    </div>
    <div class="tab-list">
      <Table
        height="281"
        width="950"
        ref="table1"
        border
        stripe
        :columns="tabColumnsList"
        :data="tableList"
      ></Table>
    </div>
    <Row v-if="spin_search_Page_box">
      <Col span="24">
        <div
          style="
            margin-bottom: 60px;
            padding-top: 40px;
            display: flex;
            justify-content: flex-end;
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
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "userCollection",
  data() {
    return {
      formItem: {
        name: "",
        type: "全部",
      },
      typeList: [
        "全部",
        "术语知识百科",
        "标准指标",
        "标准知识百科",
        "质量知识百科",
        "元器件知识百科",
        "民航事故百科",
      ],
      // 表格的loading
      loading_1: true,
      spin_search_Page_box: true,
      // 总页数
      totalCount: 1,
      // 当前页码
      table_current_1: 1,
      pageNum: "1",
      // 分页粒度
      pageSize: "5",
      tabColumnsList: [
        {
          title: "序号",
          key: "",
          align: "center",
          width: 80,
          render: (h, params) => {
            return h("span", {}, params.index + 1);
          },
        },
        {
          title: "名称",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    // 设置属性--但是placement不定义，则为自动
                    // placement: "bottom",
                  },
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        display: "inline-block",
                        width: params.column._width * 0.8 + "px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    },
                    params.row.name
                  ), // 表格显示文字
                  ,
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.name // 气泡内的文字
                  ),
                ]
              ),
            ]);
          },
        },

        {
          title: "类型",
          key: "type",
          align: "center",
          //   minWidth: 180,
        },
        {
          title: "时间",
          key: "time",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          //   minWidth: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                  },
                  class: { "span-text-hover": true },
                  on: {
                    click: () => {
                      this.clickOperation(params);
                    },
                  },
                },
                "详情"
              ),
              h(
                "span",
                {
                  style: {
                    marginLeft: "20px",
                    cursor: "pointer",
                  },
                  class: { "span-text-hover": true },
                  on: {
                    click: () => {
                      this.cancelCollecction(params);
                    },
                  },
                },
                "取消收藏"
              ),
            ]);
          },
        },
      ],
      tableList: [],
    };
  },
  methods: {
    handleSubmit() {
      this.loadData();
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
    },
    loadData: _debounce(function(params) {
      var par = {
        username: this.$store.state.user.userInfo.username,
        type: this.formItem.type,
        name: this.formItem.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$axios(
        "/users/get_collection",
        "post",
        this.$qs.stringify(par)
      ).then((res) => {
        this.tableList = res.data.data.items;
        this.totalCount = res.data.data.totalCount;
      });
    }, 200),
    //取消收藏
    cancelCollecction(obj) {
      var par = obj.row;
      par.username = this.$store.state.user.userInfo.username;

      var coliectionData = {
        username: this.$store.state.user.userInfo.username,
        content: {
          type: par.type,
          name: par.name,
          param: {
            [Object.keys(par.param)[0]]: Object.values(par.param)[0],
          },
        },
      };
      this.$axios("/users/delete_collection", "post", coliectionData).then(
        (res) => {
          this.$Message.success("已取消收藏");
          setTimeout(() => {
            this.loadData();
          }, 500);
        }
      );
    },
    //详情
    clickOperation(par) {
      //["术语知识百科","标准指标", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      if (par.row.type == "标准知识百科") {
        this.$router.push({
          path: "/BasicDetail",
          query: { id: par.row.param.BZBH },
        });
      } else if (par.row.type == "民航事故百科") {
        this.$router.push({
          path: "/CivilAviationDetail",
          query: { id: par.row.param.SGID },
        });
      } else if (par.row.type == "术语知识百科") {
        this.$router.push({
          path: "/TermDetail",
          query: { id: par.row.name },
        });
      } else if (par.row.type == "元器件知识百科") {
        this.$router.push({
          path: "/ElectronDetail",
          query: { entity_name: par.row.name },
        });
      } else if (par.row.type == "质量知识百科") {
        this.$router.push({
          path: "/qualityWikipediaDetails",
          query: { id: par.row.param.query },
        });
      } else if (par.row.type == "标准指标") {
        this.$router.push({
          path: "/BasicQuotaDetail",
          query: { id: par.row.name },
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped lang="less">
.user-collection {
  .form_wrap {
    margin-top: 20px;
  }
  .buttons-Form-item {
    /deep/ .ivu-form-item-content {
      margin-left: 20px !important;
    }
  }
  /deep/ .span-text-hover {
    color: #60636f;
    font-size: 14px;
  }
  /deep/ .span-text-hover:hover {
    color: #3388ff;
  }
}
</style>
