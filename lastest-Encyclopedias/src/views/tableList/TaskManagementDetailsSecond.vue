<template>
  <div
    style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px"
  >
    <Card :bordered="false" dis-hover :padding="0">
      <Row>
        <Col
          span="24"
          style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee"
        >
          <p style="font-size: 18px; font-weight: 800">
            "{{ TaskManagementDetailsFirst.JOBNAME }}"任务审核
          </p>
        </Col>
        <Col
          span="24"
          style="
            padding-top: 55px;
            padding-bottom: 45px;
            display: flex;
            justify-content: center;
          "
        >
          <div style="width: 80%">
            <Steps :current="1">
              <Step>
                <p slot="content" class="Step_item">服务监控</p>
              </Step>
              <Step>
                <p slot="content" class="Step_item">知识审核</p>
              </Step>
              <Step>
                <p slot="content" class="Step_item">数据入库</p>
              </Step>
            </Steps>
          </div>
        </Col>
        <Col span="24" style="padding-top: 15px; padding-bottom: 15px">
          <Button
            type="text"
            @click="btn_1_xc"
            style="
              padding: 0px;
              box-shadow: 0px 0px 0px 0px;
              margin-right: 10px;
            "
          >
            <img
              src="~@/img/icon/New_word_discovery.png"
              alt=""
              style="margin-right: 5px"
            />查看新词</Button
          >
          <Button
            type="text"
            @click="btn_2_tp"
            style="
              padding: 0px;
              box-shadow: 0px 0px 0px 0px;
              margin-right: 10px;
            "
          >
            <img
              src="~@/img/icon/EnterpriseMap.png"
              alt=""
              style="margin-right: 5px"
            />查看图谱</Button
          >
          <Button
            type="text"
            @click="btn_3_xs"
            style="
              padding: 0px;
              box-shadow: 0px 0px 0px 0px;
              margin-right: 10px;
            "
          >
            <img
              src="~@/img/icon/Compared.png"
              alt=""
              style="margin-right: 5px"
            />查看相似</Button
          >
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Table
        border
        stripe
        ref="TaskManagementDetailsSecond_table1"
        height="522"
        highlight-row
        :data="tableData_1"
        :loading="loading_1"
        :columns="tableColumns_1"
        @on-select="handleSelectRow_1"
        @on-select-all="handleSelectAll_1"
        @on-select-cancel="handleCancelRow_1"
        @on-select-all-cancel="handleSelectAll_1"
      ></Table>
      <Row>
        <Col span="24">
          <div
            style="
              margin: 20px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div>
              <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
              <span>已选择{{ selectedSum_1 }}条记录</span>
            </div>
            <div>
              <Page
                :total="totalCount"
                :current="table_current_1"
                @on-change="table_Pagechange_1"
                @on-page-size-change="table_PageSizechange_1"
                show-sizer
                show-elevator
              ></Page>
            </div>
          </div>
        </Col>
        <Col span="24" style="text-align: center; margin-top: 30px; margin-bottom: 30px">
          <Button type="primary" @click="Next_step" style="width: 100px"
            >下一步</Button
          >
        </Col>
      </Row>
    </Card>
    <Modal
      v-model="Modal_1"
      width="500"
      :mask-closable="false"
      scrollable
      inline
    >
      <p slot="header" style="fontsize: 16px; fontweight: 600">
        <span>新词列表</span>
      </p>
      <div>
        <Row>
          <Col span="24">
            <!-- ref="modal_table_form_1"绑定Form -->
            <Form
              inline
              :label-width="75"
              ref="modal_table_form_1"
              :rules="modal_form_rules_1"
              :model="modal_table_form_1"
              label-position="left"
              :hide-required-mark="true"
            >
              <!-- prop的值要与v-model的值相同便于重置 -->
              <FormItem
                label="关键字:"
                prop="keyWord"
                style="margin-bottom: 0px"
              >
                <Input
                  style="width: 200px"
                  clearable
                  placeholder="请输入关键字"
                  v-model="modal_table_form_1.keyWord"
                ></Input>
              </FormItem>
              <FormItem style="margin-bottom: 0px">
                <Button
                  type="primary"
                  icon="ios-search"
                  style="margin-left: -70px"
                  @click="handleSubmit('modal_table_form_1')"
                  >查询</Button
                >
                <Button
                  @click="handleReset('modal_table_form_1')"
                  style="margin-left: 8px"
                  >重置</Button
                >
              </FormItem>
            </Form>
          </Col>
          <Col span="24" style="margin: 10px 0px">
            <Button
              type="text"
              @click="Modal_1_btn_1"
              style="
                padding: 0px;
                box-shadow: 0px 0px 0px 0px;
                margin-right: 10px;
              "
            >
              <span style="vertical-align: middle"
                ><img
                  src="~@/img/icon/delete.png"
                  alt=""
                  style="margin-right: 5px"
                />删除</span
              ></Button
            >
          </Col>
          <!-- 表格 -->
          <!-- border -->
          <Table
            style="width: 100%"
            border
            stripe
            ref="TaskManagementDetailsSecond_table_moadl_1"
            height="424"
            highlight-row
            :data="modal_tableData_1"
            :loading="modal_loading_1"
            :columns="modal_tableColumns_1"
            @on-select="modal_handleSelectRow_1"
            @on-select-all="modal_handleSelectAll_1"
            @on-select-cancel="modal_handleCancelRow_1"
            @on-select-all-cancel="modal_handleSelectAll_1"
          ></Table>
        </Row>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="primary" @click="ok_1">确定</Button>
        <Button style="width: 80px" type="text" @click="cancel_1">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="Modal_2"
      width="1000"
      :mask-closable="false"
      scrollable
      inline
    >
      <p slot="header" style="fontsize: 16px; fontweight: 600">
        <span>查看图谱</span>
      </p>
      <div>
        <Row>
          <Col span="24" style="margin: 10px 0px; position: relative">
            <Spin fix v-if="Modal_2_Spin"></Spin>
            <atlas-components :listUl = listUl></atlas-components>
          </Col>
        </Row>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="primary" @click="ok_2">确定</Button>
        <Button style="width: 80px" type="text" @click="cancel_2">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="Modal_3"
      width="1200"
      :mask-closable="false"
      scrollable
      inline
    >
      <p slot="header" style="fontsize: 16px; fontweight: 600">
        <span>查看相似</span>
      </p>
      <div>
        <Row>
          <!-- 表格 -->
          <!-- border -->
          <Table
            style="width: 100%"
            border
            stripe
            height="424"
            highlight-row
            :data="modal_tableData_3"
            :loading="modal_loading_3"
            :columns="modal_tableColumns_3"
          ></Table>
        </Row>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="primary" @click="ok_3">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { _debounce } from "@/libs/Perform_optimization.js";
import atlasComponents from "@/components/atlasComponents.vue";
export default {
  name: "TaskManagementDetailsSecond",
  data() {
    return {
      // 表格的loading
      loading_1: true,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 表格表头
      tableColumns_1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80
        },
        {
          title: "事故名称",
          key: "sgmc",
          align: "center",
          tooltip: true,
          minWidth: 170
        },
        {
          title: "时间",
          key: "fssj",
          align: "center",
          tooltip: true,
          minWidth: 110
        },
        {
          title: "航空公司",
          key: "hkgs",
          align: "center",
          tooltip: true,
          minWidth: 150
        },
        {
          title: "机型",
          key: "jx",
          align: "center",
          tooltip: true,
          minWidth: 140
        },
        {
          title: "注册号",
          key: "zch",
          align: "center",
          tooltip: true,
          minWidth: 90
        },
        {
          title: "航班号",
          key: "hbh",
          align: "center",
          tooltip: true,
          minWidth: 120
        },
        {
          title: "起飞地点",
          key: "qfdd",
          align: "center",
          tooltip: true,
          minWidth: 140
        },
        {
          title: "到达地点",
          key: "dddd",
          align: "center",
          tooltip: true,
          minWidth: 140
        }
      ],
      // 表格数据
      tableData_1: [],
      // 表格勾选的数据ID
      selectedData_1: new Set(),
      // 表格勾选的数据
      selectedData_2: new Set(),
      // 选中的总数量
      selectedSum_1: 0,
      // 获取表格数据时用到的参数
      table_form_1: {
        jobId: "",
        // 获取第几页的数据
        pageIndex: "1",
        a: "aa",
        // 分页的粒度
        pageNum: "10"
      },
      // 弹窗一系列
      Modal_1: false,

      modal_loading_1: true,
      modal_table_form_1: {
        keyWord: "",
        // 表格勾选的数据ID
        selectedData_1: new Set(),
        // 表格勾选的数据
        selectedData_2: new Set(),
        // 选中的总数量
        selectedSum_1: 0
      },
      modal_form_rules_1: {},
      modal_tableColumns_1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80
        },
        {
          title: "词语名称",
          key: "cymc",
          align: "center",
          tooltip: true,
          minWidth: 130
        }
      ],
      modal_tableData_1: [],
      Modal_2_Spin: true,
      Modal_2: false,
      Modal_3: false,
      modal_loading_3: true,
      modal_tableColumns_3: [
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80
        },
        {
          title: "事故名称",
          key: "sgmc",
          align: "center",
          tooltip: true,
          minWidth: 200
        },
        {
          title: "相似度",
          key: "similarity",
          align: "center",
          tooltip: true,
          minWidth: 100
        },
        {
          title: "时间",
          key: "fssj",
          align: "center",
          tooltip: true,
          minWidth: 110
        },
        {
          title: "航空公司",
          key: "hkgs",
          align: "center",
          tooltip: true,
          minWidth: 200
        },
        {
          title: "机型",
          key: "jx",
          align: "center",
          tooltip: true,
          minWidth: 200
        },
        {
          title: "注册号",
          key: "zch",
          align: "center",
          tooltip: true,
          minWidth: 100
        },
        {
          title: "航班号",
          key: "hbh",
          align: "center",
          tooltip: true,
          minWidth: 100
        },
        {
          title: "起飞地点",
          key: "qfdd",
          align: "center",
          tooltip: true,
          minWidth: 140
        },
        {
          title: "到达地点",
          key: "dddd",
          align: "center",
          tooltip: true,
          minWidth: 140
        }
      ],
      modal_tableData_3: []
    };
  },
  components: {
    atlasComponents
  },
  methods: {
    //  选中某一行
    handleSelectRow_1(selection, row) {
      this.selectedData_1.add(row.num_id);
      this.selectedData_2.add(row);
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  取消某一行
    handleCancelRow_1(selection, row) {
      this.selectedData_1.delete(row.num_id);
      this.selectedData_2.forEach(item => {
        if (item.num_id == row.num_id) {
          this.selectedData_2.delete(item);
        }
      });
      this.selectedSum_1 = this.selectedData_1.size;
    },
    handleSelectAll_1(selection) {
      // 取消全选 数组为空
      if (selection.length === 0) {
        let data = this.$refs.TaskManagementDetailsSecond_table1.data;
        data.forEach(item => {
          if (this.selectedData_1.has(item.num_id)) {
            this.selectedData_1.delete(item.num_id);
            this.selectedData_2.forEach(item_ => {
              if (item_.num_id == item.num_id) {
                this.selectedData_2.delete(item_);
              }
            });
          }
        });
      } else {
        selection.forEach(item => {
          this.selectedData_1.add(item.num_id);
          this.selectedData_2.forEach(item_ => {
            if (item_.num_id == item.num_id) {
              this.selectedData_2.delete(item_);
            }
          });
          this.selectedData_2.add(item);
        });
      }
      // 同步
      this.selectedSum_1 = this.selectedData_1.size;
    },
    setChecked() {
      // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
      let objData = this.$refs.TaskManagementDetailsSecond_table1.objData;
      for (let index in objData) {
        if (this.selectedData_1.has(objData[index].num_id)) {
          objData[index]._isChecked = true;
        }
      }
    },
    //  第一个弹窗选中某一行
    modal_handleSelectRow_1(selection, row) {
      this.modal_table_form_1.selectedData_1.add(row.num_id);
      this.modal_table_form_1.selectedData_2.add(row);
      this.modal_table_form_1.selectedSum_1 = this.modal_table_form_1.selectedData_1.size;
    },
    //  第一个弹窗取消某一行
    modal_handleCancelRow_1(selection, row) {
      this.modal_table_form_1.selectedData_1.delete(row.num_id);
      this.modal_table_form_1.selectedData_2.forEach(item => {
        if (item.num_id == row.num_id) {
          this.modal_table_form_1.selectedData_2.delete(item);
        }
      });
      this.modal_table_form_1.selectedSum_1 = this.modal_table_form_1.selectedData_1.size;
    },
    //  第一个弹窗取消全选
    modal_handleSelectAll_1(selection) {
      // 取消全选 数组为空
      if (selection.length === 0) {
        let data = this.$refs.TaskManagementDetailsSecond_table_moadl_1.data;
        data.forEach(item => {
          if (this.modal_table_form_1.selectedData_1.has(item.num_id)) {
            this.modal_table_form_1.selectedData_1.delete(item.num_id);
            this.modal_table_form_1.selectedData_2.forEach(item_ => {
              if (item_.num_id == item.num_id) {
                this.modal_table_form_1.selectedData_2.delete(item_);
              }
            });
          }
        });
      } else {
        selection.forEach(item => {
          this.modal_table_form_1.selectedData_1.add(item.num_id);
          this.modal_table_form_1.selectedData_2.forEach(item_ => {
            if (item_.num_id == item.num_id) {
              this.modal_table_form_1.selectedData_2.delete(item_);
            }
          });
          this.modal_table_form_1.selectedData_2.add(item);
        });
      }
      // 同步
      this.modal_table_form_1.selectedSum_1 = this.modal_table_form_1.selectedData_1.size;
    },
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      this.$axios(
        "/baike/yuchuli/finishLoadModel",
        "post",
        this.$qs.stringify({
          pageIndex: this.table_form_1.pageIndex - "1",
          pageNum: this.table_form_1.pageNum,
          jobId: this.table_form_1.jobId
        })
      ).then(res => {
        // 总页数
        this.totalCount = res.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.pageIndex + 1;
        res.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_1.pageNum * (this.table_current_1 - 1) + key + 1;
        });
        // 表数据
        setTimeout(() => {
          this.tableData_1 = res.data.resultList;
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    // 切换页码
    table_Pagechange_1(index) {
      this.table_form_1.pageIndex = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.table_form_1.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    btn_1_xc() {
      // JSON.parse(JSON.stringify());
      if (this.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要查看的数据！",
          background: true,
          duration: 3
        });
        return;
      } else if (this.selectedSum_1 > 1) {
        this.$Message.warning({
          content: "仅可勾选一条数据！",
          background: true,
          duration: 3
        });
        return;
      }
      // 重置第一个弹窗里的选中数据
      this.modal_table_form_1.selectedData_1 = new Set();
      this.modal_table_form_1.selectedData_2 = new Set();
      this.modal_table_form_1.selectedSum_1 = this.modal_table_form_1.selectedData_1.size;
      // 打开第一个弹窗的表数据loading
      // 打开弹窗
      this.Modal_1 = true;
      this.modal_loading_1 = true;
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      this.$axios(
        "/baike/yuchuli/searchNewWords",
        "post",
        this.$qs.stringify({
          recordId: data[0].sgid
        })
      ).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i] = { num_id: i + 1, cymc: res.data.data[i] };
        }
        setTimeout(() => {
          // 表数据
          this.modal_tableData_1 = res.data.data;
          this.modal_loading_1 = false;
        }, 200);
      });
    },
    Modal_1_btn_1() {
      if (this.modal_table_form_1.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要删除的数据！",
          background: true,
          duration: 3
        });
        return;
      }
      // 第一个弹窗的删除
      let data = JSON.parse(
        JSON.stringify(Array.from(this.modal_table_form_1.selectedData_2))
      );
      let data_filter = data.map(item => {
        return item.cymc;
      });
      data_filter = data_filter.join("|");
      this.$axios(
        "/baike/yuchuli/deleteNewWords",
        "post",
        this.$qs.stringify({
          recordId: data_filter
        })
      ).then(res => {
        if (res.data.code == 200) {
          this.$Message.success({
            content: "删除数据成功！",
            background: true,
            duration: 3
          });
        } else {
          this.$Message.error({
            content: "删除数据失败,请重新选择！",
            background: true,
            duration: 3
          });
        }
        // 重置第一个弹窗里的检索
        this.$refs["modal_table_form_1"].resetFields();
        // 重置第一个弹窗里的选中数据
        this.modal_table_form_1.selectedData_1 = new Set();
        this.modal_table_form_1.selectedData_2 = new Set();
        this.modal_table_form_1.selectedSum_1 = this.modal_table_form_1.selectedData_1.size;
        // 重新获取弹窗数据
        this.btn_1_xc();
      });
    },
    btn_2_tp() {
      if (this.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要查看的数据！",
          background: true,
          duration: 3
        });
        return;
      } else if (this.selectedSum_1 > 1) {
        this.$Message.warning({
          content: "仅可勾选一条数据！",
          background: true,
          duration: 3
        });
        return;
      }
      // 打开第二个弹窗的内部添加loading
      this.Modal_2_Spin = true;
      // 第二个弹窗的图谱
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      this.$axios(
        "/baike/yuchuli/search_event_graph",
        "post",
        this.$qs.stringify({
          recordId: data[0].sgid
        })
      ).then(res => {
        this.$store.commit("updated_atlasImg", res.data.data);
        var arr1 = res.data.typelist;
        arr1.unshift("全部");
        // list = res.data.data.typelist
        // this.listUl = arr1;
        this.$store.commit("updated_atlasTypeList", arr1);
        this.Modal_2_Spin = false;
        // 打开弹窗
        this.Modal_2 = true;
      });
    },
    btn_3_xs() {
      if (this.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要查看的数据！",
          background: true,
          duration: 3
        });
        return;
      } else if (this.selectedSum_1 > 1) {
        this.$Message.warning({
          content: "仅可勾选一条数据！",
          background: true,
          duration: 3
        });
        return;
      }
      // 打开弹窗
      this.Modal_3 = true;
      // 打开第二个弹窗的内部添加loading
      this.modal_loading_3 = true;
      // 当前选中的数据
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      this.$axios(
        "/baike/yuchuli/search_similar_accident",
        "post",
        this.$qs.stringify({
          recordId: data[0].sgid
        })
      ).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].num_id = i + 1;
        }
        setTimeout(() => {
          // 表数据
          this.modal_tableData_3 = res.data.data;
          this.modal_loading_3 = false;
        }, 200);
      });
    },
    modal_TableData_1_seach() {
      // 点击检索按钮重新获取数据
      this.modal_loading_1 = true;
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      this.$axios(
        "/baike/yuchuli/searchNewWordsByKeyword",
        "post",
        this.$qs.stringify({
          recordId: data[0].sgid,
          keyWord: this.modal_table_form_1.keyWord
        })
      ).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i] = { num_id: i + 1, cymc: res.data.data[i] };
        }
        // 表数据
        setTimeout(() => {
          this.modal_tableData_1 = res.data.data;
          this.modal_loading_1 = false;
        }, 200);
      });
    },
    // 检索搜索框
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (name == "modal_table_form_1") {
            // 重置第一个弹窗里的选中数据
            this.modal_table_form_1.selectedData_1 = new Set();
            this.modal_table_form_1.selectedData_2 = new Set();
            this.modal_table_form_1.selectedSum_1 = this.modal_table_form_1.selectedData_1.size;
            // 检索获取第一个弹窗的检索数据
            this.modal_TableData_1_seach();
          }
        } else {
          this.$Message.error({
            content: "表单验证失败！",
            background: true,
            duration: 3
          });
        }
      });
    },
    handleReset(name) {
      // 重置$refs为table_form_1的表单数据
      this.$refs[name].resetFields();
    },
    ok_1() {
      this.Modal_1 = false;
    },
    cancel_1() {
      this.Modal_1 = false;
    },
    ok_2() {
      this.Modal_2 = false;
    },
    cancel_2() {
      this.Modal_2 = false;
    },
    ok_3() {
      this.Modal_3 = false;
    },
    Next_step() {
      if (this.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要入库的数据！",
          background: true,
          duration: 3
        });
        return;
      }
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      let data_filter = data.map(item => {
        return item.sgid;
      });
      data_filter = data_filter.join("|");
      this.$store.commit("updated_TaskManagementDetailsThird", {
        jobId: this.TaskManagementDetailsFirst.JOBID,
        recordId: data_filter,
        status: "2"
      });
      this.$router.push("TaskManagementDetailsThird");
    }
  },
  computed: {
    TaskManagementDetailsFirst() {
      return this.$store.state.page.TaskManagementDetailsFirst;
    }
  },
  watch: {
    tableData_1: function() {
      // 给表格数据赋值后并渲染完成表格后执行
      this.$nextTick(function() {
        // Spin.hide();
        this.setChecked();
        this.loading_1 = false;
      });
    }
  },
  mounted() {
    this.table_form_1.jobId = this.TaskManagementDetailsFirst.JOBID;
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
  }
};
</script>
<style lang="less" scoped>
.ivu-steps-item {
  overflow: visible;
}
.ivu-btn-text:hover {
  background: initial;
}
.Step_item {
  font-size: 20px;
  font-weight: 600;
  position: relative;
  top: 10px;
  left: -50px;
}
.ivu-steps-item /deep/ .ivu-steps-head-inner {
  width: 40px;
  height: 40px;
  line-height: 38px;
  .ivu-icon-ios-checkmark {
    font-size: 38px;
  }
}
.ivu-steps-item /deep/ .ivu-steps-tail {
  top: 20px;
}
</style>

