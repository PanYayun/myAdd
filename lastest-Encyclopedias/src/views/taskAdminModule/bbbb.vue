<template>
  <div
    style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px"
  >
    <Card :bordered="false" dis-hover :padding="0">
      <Row>
        <Col span="24" style="padding-top: 8px">
          <!-- ref="table_form_2"绑定Form，form_rules_2绑定表单验证，hide-required-mark不显示小红点，不要 -->
          <Form
            inline
            :label-width="75"
            ref="table_form_2"
            :rules="form_rules_2"
            :model="table_form_2"
            label-position="left"
            :hide-required-mark="true"
            style="margin-top:8px"
          >
            <!-- prop的值要与v-model的值相同便于重置 -->
            <FormItem label="请选择类型:" prop="dataType" :label-width="90">
              <Select
                filterable
                placeholder="请选择数据类型"
                v-model="table_form_2.dataType"
                style="width: 120px"
              >
                <Option value="shuyu" key="shuyu">术语百科</Option>
                <Option value="minhang" key="minhang">民航事故百科</Option>
                <Option value="biaozhun" key="biaozhun">标准百科</Option>
                <Option value="junshi" key="junshi">军事百科</Option>
                <Option value="yuanqijian" key="yuanqijian">元器件百科</Option>
              </Select>
            </FormItem>
            <FormItem label="上传时间:" prop="temporary_date" :label-width="75">
              <DatePicker
                style="width: 200px"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择数据上传时间"
                format="yyyy-MM-dd"
                @on-change="getDateValue"
                v-model="table_form_2.temporary_date"
              ></DatePicker>
            </FormItem>
            <FormItem label="关键词:" prop="keyWord" :label-width="60">
              <Tooltip
                max-width="200"
                :content="
                  table_form_2.keyWord.toString() == ''
                    ? '您未输入数据'
                    : table_form_2.keyWord.toString()
                "
                placement="top"
              >
                <Input
                  style="width: 180px"
                  clearable
                  placeholder="请输入关键词"
                  v-model="table_form_2.keyWord"
                ></Input>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                icon="ios-search"
                style="margin-left: -70px"
                @click="handleSubmit('table_form_2')"
                >查询</Button
              >
              <Button
                @click="handleReset('table_form_2')"
                style="margin-left: 8px"
                >重置</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Table
        border
        stripe
        height="529"
        highlight-row
        :data="tableData_1"
        ref="NewTask_table1"
        :loading="loading_1"
        :columns="tableColumns_1"
        @on-select="handleSelectRow_1"
        @on-select-all="handleSelectAll_1"
        @on-select-cancel="handleCancelRow_1"
        @on-select-all-cancel="handleSelectAll_1"
        style="box-sizing: content-box;"
      >
      </Table>
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
      </Row>
    </Card>
    <Modal
      v-model="modal1"
      width="600"
      :mask-closable="false"
      scrollable
      inline
      class="modal1_log_1"
      @on-visible-change="Modal_status"
    >
      <p slot="header" style="fontsize: 16px; fontweight: 600">
        <span>xxxxxxxxxxxx</span>
      </p>
      <div>
        <Form ref="formCustom_1" :model="formCustom_1" :rules="ruleValidate_1">
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="姓名" label-position="top" prop="name">
                <Input v-model="formCustom_1.name" placeholder="请输入姓名" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="年龄" label-position="top" prop="age">
                <Input
                  v-model="formCustom_1.age"
                  placeholder="请输入年龄"
                  number
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="text" @click="cancel_1">关闭</Button>
        <Button style="width: 80px" type="primary" @click="ok_1">确定</Button>
      </div>
    </Modal>
    <!-- !!!! -->
    <Modal
      v-model="modal_table_1"
      width="600"
      :mask-closable="false"
      scrollable
      inline
      @on-visible-change="Modal_table_status"
    >
      <p slot="header" style="fontsize: 16px; fontweight: 600">
        <span>xxxxxxxxxxxx</span>
      </p>
      <div>
        <Table
          border
          stripe
          height="522"
          highlight-row
          :data="Modal_tableData_1"
          ref="modal_table1"
          :loading="modal_table_loading_1"
          :columns="Modal_tableColumns_1"
          @on-selection-change="Table_change_1"
        >
        </Table>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="text" @click="cancel_table_1"
          >关闭</Button
        >
        <Button style="width: 80px" type="primary" @click="ok_table_1"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { fun_date, fun_date_start_3 } from "@/libs/tools";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "bbbb",
  data() {
    return {
      modal_table_1: false,
      modal_table_loading_1: false,
      Modal_table_select: [],
      Modal_tableColumns_1: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "事故ID",
          key: "sgid",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "事故名称",
          key: "sgmc",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "上传人",
          key: "scrid",
          align: "center",
          tooltip: true,
          minWidth: 80,
        },
        {
          title: "上传时间",
          key: "scsj",
          align: "center",
          tooltip: true,
          minWidth: 110,
        },
      ],
      Modal_tableData_1: [{ sgid: "1111" }, { sgid: "2222" }],
      // !!!!
      formCustom_1: {
        // 姓名
        name: "",
        // 年龄
        age: "",
      },
      // 正则
      ruleValidate_1: {
        name: [
          {
            required: true,
            message: "请输入姓名!",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄!",
            trigger: "blur",
          },
        ],
      },
      modal1: false,
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
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          width: 70,
        },
        {
          title: "事故ID",
          key: "sgid",
          align: "center",
          minWidth: 150,
          tooltip: true,
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    // 设置属性--但是placement不定义，则为自动
                    placement: "top",
                  },
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        display: "inline-block",
                        width: params.column._width * 0.7 + "px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                      class: { "span-text-hover": true },
                      on: {
                        click: () => {
                          this.$Spin.show();
                          setTimeout(() => {
                            this.$Spin.hide();
                          }, 600);
                        },
                      },
                    },
                    params.row.sgid
                  ), // 表格显示文字
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.sgid // 气泡内的文字
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "事故ID",
          key: "sgid",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "事故名称",
          key: "sgmc",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "上传人",
          key: "scrid",
          align: "center",
          tooltip: true,
          minWidth: 80,
        },
        {
          title: "上传时间",
          key: "scsj",
          align: "center",
          tooltip: true,
          minWidth: 110,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    cursor: "pointer",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.show_1(params);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "操作2",
          key: "action",
          align: "center",
          width: 130,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "#3388ff",
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                    },
                  },
                },
                "1111"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "#3388ff",
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                    },
                  },
                },
                "2222"
              ),
            ]);
          },
        },
        {
          title: "操作3",
          key: "action",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "#3388ff",
                  },
                  on: {
                    click: () => {
                      this.modal_table_1 = true;
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "确定要删除吗？",
                    "ok-text": "确定",
                    "cancel-text": "取消",
                  },
                  style: {
                    textAlign: "initial",
                  },
                  on: {
                    "on-ok": () => {
                      console.log(params.row);
                    },
                    "on-cancel": () => {
                      console.log(params.row);
                    },
                  },
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#3388ff",
                      },
                      on: {
                        click: () => {},
                      },
                    },
                    "删除"
                  ),
                ]
              ),
            ]);
          },
        },
      ],
      // 表格数据
      tableData_1: [],
      // 表格勾选的数据ID
      selectedData_1: new Set(),
      // 表格勾选的数据
      selectedData_2: new Set(),
      // 选中的总数量
      selectedSum_1: 0,
      form_rules_2: {
        temporary_date: [
          {
            // blur失去焦点时触发  change数据发生改变时触发
            required: true,
            // blur失去焦点时触发  change数据发生改变时触发
            trigger: "change",
            validator: (rule, value, callback) => {
              if (
                this.table_form_2.beginDate == "" &&
                this.table_form_2.endDate == ""
              ) {
                return callback(new Error("请选择时间范围！"));
              } else {
                return callback();
              }
            },
          },
        ],
      },
      table_form_2: {
        dataType: "minhang",
        beginDate: "",
        endDate: "",
        keyWord: "",
        // 仅存放显示时间，给时间选择框加入change事件，重置beginDate和endDate，传输时使用beginDate和endDate
        temporary_date: [],
        // 获取第几页的数据
        pageIndex: "1",
        // 分页的粒度
        pageNum: "10",
      },
    };
  },
  methods: {
    //  选中某一行，不动
    handleSelectRow_1(selection, row) {
      this.selectedData_1.add(row.num_id);
      this.selectedData_2.add(row);
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  取消某一行，不动
    handleCancelRow_1(selection, row) {
      this.selectedData_1.delete(row.num_id);
      this.selectedData_2.forEach((item) => {
        if (item.num_id == row.num_id) {
          this.selectedData_2.delete(item);
        }
      });
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  不动
    handleSelectAll_1(selection) {
      // 取消全选 数组为空
      if (selection.length === 0) {
        let data = this.$refs.NewTask_table1.data;
        data.forEach((item) => {
          if (this.selectedData_1.has(item.num_id)) {
            this.selectedData_1.delete(item.num_id);
            this.selectedData_2.forEach((item_) => {
              if (item_.num_id == item.num_id) {
                this.selectedData_2.delete(item_);
              }
            });
          }
        });
      } else {
        selection.forEach((item) => {
          this.selectedData_1.add(item.num_id);
          this.selectedData_2.forEach((item_) => {
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
    //  不动
    setChecked() {
      // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
      let objData = this.$refs.NewTask_table1.objData;
      for (let index in objData) {
        if (this.selectedData_1.has(objData[index].num_id)) {
          objData[index]._isChecked = true;
        }
      }
    },
    // 获取时间
    getDateValue(val) {
      this.table_form_2.beginDate = val[0];
      this.table_form_2.endDate = val[1];
    },
    // 检索搜索框
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (
          valid &&
          this.table_form_2.startTime != "" &&
          this.table_form_2.endDate != ""
        ) {
          // 需先重置参数如分页倒序检索条件
          this.loading_1 = true;
          this.selectedData_1 = new Set();
          this.selectedData_2 = new Set();
          this.selectedSum_1 = this.selectedData_1.size;
          //第几页
          this.table_form_2.pageIndex = 1;
          this.TableData_1();
        } else {
        }
      });
    },
    // 重置$refs为table_form_2的表单数据
    handleReset(name) {
      this.$refs[name].resetFields();
      // 获取上个月的日期然后减去参数天
      let date_temporary = fun_date(0, 0);
      // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
      this.$set(this.table_form_2.temporary_date, "1", date_temporary[0]);
      this.table_form_2.endDate = date_temporary[0];
      // 传入今天的时间，获取三个月前的时间
      let date_temporary_2 = fun_date_start_3(date_temporary[0]);
      this.$set(this.table_form_2.temporary_date, "0", date_temporary_2);
      this.table_form_2.beginDate = date_temporary_2;
    },
    // 表数据，_debounce为防抖事件，例如共20条数据，我在第二页切换数据粒度
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      this.$axios(
        "/baike/yuchuli/searchUploadRecordsByRow",
        "post",
        this.$qs.stringify({
          pageIndex: this.table_form_2.pageIndex - "1",
          pageNum: this.table_form_2.pageNum,
          dataType: this.table_form_2.dataType,
          beginDate: this.table_form_2.beginDate + " 00:00:00",
          endDate: this.table_form_2.endDate + " 23:59:59",
          keyWord: this.table_form_2.keyWord,
        })
      ).then((res) => {
        // 总页数
        this.totalCount = res.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.pageIndex + 1;
        res.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_2.pageNum * (this.table_current_1 - 1) + key + 1;
        });
        // 表数据
        setTimeout(() => {
          this.tableData_1 = res.data.resultList;
          this.tableData_1.push({ a: 1 }, { a: 1 });
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    // 切换页码
    table_Pagechange_1(index) {
      this.table_form_2.pageIndex = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.table_form_2.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    show_1(params) {
      this.formCustom_1 = {
        // 姓名
        name: "aaaaa",
        // 年龄
        age: "12331",
      };
      this.$nextTick(() => {
        this.modal1 = true;
      });
    },
    ok_1() {
      this.$refs["formCustom_1"].validate((valid) => {
        if (valid) {
          this.modal1 = false;
          console.log(this.formCustom_1);
        } else {
          this.$Message.error("表单验证不通过!");
        }
      });
    },
    cancel_1() {
      this.modal1 = false;
    },
    Modal_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          this.$refs["formCustom_1"].resetFields();
          // 重置
        }, 300);
      }
    },
    // !!!!
    // 表格选中的值发生变化
    Table_change_1(item) {
      this.Modal_table_select = item;
    },
    // 弹窗的确定按钮
    ok_table_1() {
      console.log(this.Modal_table_select);
    },
    // 弹窗的关闭按钮
    cancel_table_1() {
      // 关闭弹窗
      this.modal_table_1 = false;
      // 重置选中的数据
      this.Modal_table_select = [];
      // 重置表格的数据
      this.Modal_tableData_1 = [];
    },
    Modal_table_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          // 重置选中的数据
          this.Modal_table_select = [];
          // 重置表格的数据
          this.Modal_tableData_1 = [];
        }, 300);
      }
    },
  },
  watch: {
    tableData_1: function() {
      // 给表格数据赋值后并渲染完成表格后执行
      this.$nextTick(function() {
        // Spin.hide();
        this.setChecked();
        this.loading_1 = false;
      });
    },
  },
  mounted() {
    // 获取上个月的日期然后减去7天
    let date_temporary = fun_date(0, 0);
    // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
    this.$set(this.table_form_2.temporary_date, "1", date_temporary[0]);
    this.table_form_2.endDate = date_temporary[0];
    // 传入今天的时间，获取三个月前的时间
    let date_temporary_2 = fun_date_start_3(date_temporary[0]);
    this.$set(this.table_form_2.temporary_date, "0", date_temporary_2);
    this.table_form_2.beginDate = date_temporary_2;
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
  },
  created() {},
};
</script>

<style lang="less" scoped></style>
