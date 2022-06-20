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
            "{{ TaskName }}"任务审核
          </p>
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <p style="font-size: 18px; font-weight: 800">事故属性抽取</p>
        </Col>
        <Col span="24">
          <div class="textarea" v-html="textarea"></div>
        </Col>
        <Col span="24" style="padding:  15px 0;text-align: right;">
          <p>当前审核第{{ current_count }}条数据，共{{ total_count }}条</p>
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <Button type="primary" style="width: 100px" @click="PreviousStep()"
            >查看下一条</Button
          >
          <Button
            type="primary"
            style="width: 100px;margin-left:20px"
            @click="NextSteps()"
            >刷新结果</Button
          >
        </Col>
        <Col span="24" style="padding:  30px 0;">
          <p style="font-size: 18px; font-weight: 800">
            分析结果
          </p>
        </Col>
      </Row>
      <Table
        border
        stripe
        highlight-row
        :data="tableData_1"
        ref="NewTask_table1"
        :loading="loading_1"
        :columns="tableColumns_1"
        :on-cell-click="tableName_1"
      >
      </Table>
      <Row>
        <Col span="24" style="text-align: center;padding-bottom:50px; margin-top: 30px">
          <Button
            type="primary"
            @click="preservation"
            style="width: 100px;margin-right:20px"
            >保存结果</Button
          >
          <Button type="primary" @click="returnkey" style="width: 100px"
            >返回</Button
          >
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
      <p
        slot="header"
        style="fontsize: 16px; fontweight: 600;text-align: center;"
      >
        <span>修改属性值</span>
      </p>
      <div>
        <Form ref="formCustom_1" :model="formCustom_1">
          <Row :gutter="32">
            <Col span="12" v-if="!DatePicker">
              <FormItem label="属性值" label-position="top">
                <Input v-model="formCustom_1.name" placeholder="请输入属性值" />
              </FormItem>
            </Col>
            <Col span="12" v-else>
              <FormItem label="属性值" label-position="top">
                <DatePicker
                  type="date"
                  placeholder="请选择日期"
                  @on-change="getDateValue($event)"
                ></DatePicker>
                <!-- <Input v-model="formCustom_1.name" placeholder="请输入属性值" /> -->
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="text" @click="modal1 = false"
          >关闭</Button
        >
        <Button style="width: 80px" type="primary" @click="ok_1">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "AccidentExtraction",
  data() {
    return {
      modal1: false, //编辑弹出框
      textarea: "",
      // 表格的loading
      loading_1: false,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 表格表头
      tableColumns_1: [
        // {
        //   title: "序号",
        //   key: "num_id",
        //   align: "center",
        //   // 超出部分显示省略号，鼠标悬停显示悬浮框
        //   tooltip: true,
        // },
        {
          title: "属性名",
          key: "key",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
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
                          if (
                            this.textarea.indexOf(
                              `<span style='color:red'>${params.row.key}</span>`
                            ) !== -1
                          ) {
                            this.textarea = this.textarea.replace(
                              new RegExp("<span style='color:red'>", "g"),
                              ""
                            );
                            this.textarea = this.textarea.replace(
                              new RegExp("</span>", "g"),
                              ""
                            );
                            return;
                          }
                          this.textarea = this.textarea.replace(
                            new RegExp("<span style='color:red'>", "g"),
                            ""
                          );
                          this.textarea = this.textarea.replace(
                            new RegExp("</span>", "g"),
                            ""
                          );
                          this.textarea = this.textarea.replace(
                            new RegExp(params.row.key, "g"),
                            `<span style='color:red'>${params.row.key}</span>`
                          );
                        },
                      },
                    },
                    params.row.key
                  ), // 表格显示文字
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.key // 气泡内的文字
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "抽取结果",
          key: "value",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
        },
        {
          title: "操作",
          key: "action",
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
                      this.show_1(params);
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
                      this.$axios(
                        "/baike/yuchuli/shigu/delete_attribute_extract",
                        "post",
                        this.$qs.stringify({
                          record_id: this.record_id,
                          attribute_key: params.row.key,
                        })
                      ).then((data) => {
                        if (data.data.code == 200) this.TableData_1();
                        console.log(data, "删除成功");
                      });
                      console.log(params.row, "确认");
                    },
                    "on-cancel": () => {
                      console.log(params.row, "取消");
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
      //默认请求从0开始
      num: 0,
      // 当前查看的数据是第几个
      current_count: "",
      //总数据个数
      total_count: "",
      //当前正在审核的数据记录ID
      record_id: "",
      //修改数据 姓名
      formCustom_1: {
        name: "",
      },
      //编辑时间格式
      DatePicker: false,
    };
  },
  methods: {
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      //原id 
      //测试ID "3c102838-00bf-11ec-9e0d-0242ac110006"
      this.$axios(
        "/baike/yuchuli/shigu/check_attribute_extract",
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.num,
        })
      ).then((res) => {
        console.log(res, "事故属性抽取");
        this.textarea = res.data.original_text;
        this.current_count = res.data.current_count;
        this.total_count = res.data.total_count;
        this.tableData_1 = res.data.extraction_result;
        this.record_id = res.data.record_id;
        setTimeout(() => {
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    //刷新结果
    NextSteps() {
      this.TableData_1();
    },
    //查看下一条
    PreviousStep() {
      if (this.total_count === this.current_count) {
        this.$Message.info("已经是最后一条数据");
        return;
      }
      this.num += 1;
      this.TableData_1();
    },
    //保存结果
    preservation() {
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/shigu/save_attribute_extract",
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          record_id: this.record_id,
        })
      ).then((data) => {
        setTimeout(() => {          
          if (this.total_count === 1) {
            this.$Spin.hide();
            this.$router.push("/TableList/KnowledgeAudit");
            return;
          }
          this.$Spin.hide();
          this.num=0;
          this.TableData_1();
          this.$Message.success("保存成功！");
        }, 600);
      });
    },
    //返回
    returnkey() {
      this.$router.push("/TableList/KnowledgeAudit");
    },
    //点击属性名文本变红
    tableName_1(e) {
      console.log("123", e);
    },
    //编辑
    show_1(params) {
      console.log(params.row, "编辑");
      if (params.row.key === "发生时间") {
        this.DatePicker = true;
      } else {
        this.DatePicker = false;
      }

      this.formCustom_1 = {
        // 姓名
        name: params.row.value,
        age: params.row.key,
      };
      this.$nextTick(() => {
        this.modal1 = true;
      });
    },
    //编辑发生时间
    getDateValue(val) {
      console.log(val, "选中的值");
      this.formCustom_1.name = val;
    },
    //重置修改表单
    Modal_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          this.$refs["formCustom_1"].resetFields();
          // 重置
        }, 300);
      }
    },
    //确认修改
    ok_1() {
      this.modal1 = false;

      this.$axios(
        "/baike/yuchuli/shigu/edit_attribute_extract",
        "post",
        this.$qs.stringify({
          record_id: this.record_id,
          attribute_key: this.formCustom_1.age,
          attribute_value: this.formCustom_1.name,
        })
      ).then((data) => {
        this.TableData_1();
        console.log(data, "编辑成功");
      });
      console.log(this.formCustom_1, "123");
    },
  },
  mounted() {
    this.TableData_1();
  },
  computed: {
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    //知识审核传的ID
    toExamineid() {
      return this.$store.state.standard.toExamineid;
    },
  },
};
</script>
<style lang="less" scoped>
textarea.ivu-input {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  line-height: 2;
}
.textarea {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  overflow-y: auto;
  line-height: 2;
}
</style>
