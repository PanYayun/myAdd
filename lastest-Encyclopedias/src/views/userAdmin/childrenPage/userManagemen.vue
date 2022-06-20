<template>
  <div class="userManagemen" style="position: relative;">
    <div class="title_nav">
      用户管理
    </div>
    <div class="form_wrap">
      <Form
        ref="formValidate"
        :model="formItem"
        :label-width="58"
        style="display: flex"
      >
        <div>
          <Form-item label="用户名:" prop="user_username">
            <Input
              v-model="formItem.user_username"
              placeholder="请填写用户名"
              class="info_input"
            ></Input>
          </Form-item>
          <Form-item label="单位:" prop="company">
            <Input
              v-model="formItem.company"
              placeholder="请填写单位:"
              class="info_input"
            ></Input>
          </Form-item>
        </div>
        <div>
          <Form-item label="姓名:" prop="name">
            <Input
              v-model="formItem.name"
              placeholder="请填写姓名"
              class="info_input"
            ></Input>
          </Form-item>
          <Form-item label="部门:" prop="department">
            <Input
              v-model="formItem.department"
              placeholder="请填写部门"
              class="info_input"
            ></Input>
          </Form-item>
        </div>
        <div>
          <Form-item label="邮箱:" prop="email">
            <Input
              v-model="formItem.email"
              placeholder="请填写邮箱"
              class="info_input"
            ></Input>
          </Form-item>
          <Form-item class="buttons-Form-item">
            <Button type="primary" @click="handleSubmit()">查询</Button>
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 10px;"
              >重置</Button
            >
          </Form-item>
        </div>
        <div>
          <Form-item label="手机:" prop="mobile">
            <Input
              v-model="formItem.mobile"
              placeholder="请填写手机"
              class="info_input"
            ></Input>
          </Form-item>
        </div>
      </Form>
    </div>
    <div class="add-button">
      <Icon type="ios-add-circle-outline" /><span>新增</span>
    </div>
    <!-- <Button class="add-button" type="primary" icon="ios-add-circle-outline">新增</Button> -->

    <div class="tab-list">
      <Table
        ref="table1"
        border
        stripe
        :columns="tabColumnsList"
        :data="tableList"
        style="width:977px;"
      ></Table>
    </div>
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
    <Modal
      v-model="operationTipShow"
      title="用户信息编辑"
      @on-ok="editUSerInfoOk"
      :width="800"
    >
      <pop-user-info :userInfo="editUserInfo" @commitInfoFinish="commitInfoFinish" ref="editor"></pop-user-info>
    </Modal>
  </div>
</template>

<script>
import popUserInfo from "./popUserInfo";

export default {
  components: { popUserInfo },
  name: "userManagemen",
  data() {
    return {
      editUserInfo: {},
      operationTipShow: false,
      formItem: {
        company: "",
        user_username: "",
        name: "",
        department: "",
        email: "",
        mobile: "",
      },
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
          title: "用户名",
          key: "username",
          align: "center",
        },

        {
          title: "姓名",
          key: "name",
          align: "center",
          //   minWidth: 180,
        },
        {
          title: "邮箱",
          key: "email",
          align: "center",
        },
        {
          title: "手机",
          key: "mobile",
          align: "center",
        },
        {
          title: "单位",
          key: "company",
          align: "center",
        },
        {
          title: "部门",
          key: "department",
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
                "操作"
              ),
            ]);
          },
        },
      ],
      tableList: [],
    };
  },
  mounted() {
    // console.log(this.$store.state.user.userInfo);
    this.loadData();
  },
  methods: {
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
    loadData() {
      this.$axios(
        "/users/get_all_users",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username, //当前分类ID
          pageNum: this.pageNum, //每页条数
          pageSize: this.pageSize, //页码
          user_username: this.formItem.user_username,
          name: this.formItem.name,
          email: this.formItem.email,
          mobile: this.formItem.mobile,
          company: this.formItem.company,
          department: this.formItem.department,
        })
      ).then((res) => {
        // this.table_current_1 = res.data.data;
        this.totalCount = res.data.data.totalCount;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
          this.tableList = res.data.data.users;
        }
      });
    },
    handleSubmit() {
      this.table_current_1 = 1;
      this.loadData();
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    clickOperation(param) {
      this.editUserInfo = param.row;
      this.operationTipShow = true;
    },
    editUSerInfoOk() {
      this.$refs.editor.commitInfo();
    },
    commitInfoFinish(res) {
      console.log(res)
      console.log(res.data.code);
      // this.spinShow = false;
      if (res.data.code === 200) {
        this.loadData()
        this.$Message.success(res.data.msg);
      } else {
        this.$Message.error(res.data.msg);
      }
    },
  },
};
</script>

<style scoped lang="less">
.userManagemen {
  .form_wrap {
    padding-top: 40px;
    border-bottom: 1px solid #eee;
  }
  .add-button {
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    span {
      padding-left: 5px;
    }
  }
  .add-button:hover {
    color: #3388ff;
  }
  /deep/ .ivu-input {
    height: 40px !important;
  }
  /deep/ .ivu-form-item-label {
    padding: 13px 12px 13px 0;
  }
  /deep/ .ivu-form-item-content {
    line-height: 39px;
  }
  .buttons-Form-item {
    /deep/ .ivu-form-item-content {
      margin-left: 20px !important;
    }
  }
  /deep/ .span-text-hover:hover {
    color: #3388ff;
  }
}
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
/deep/ .ivu-modal-body {
  padding: 0px 0px;
}
</style>
