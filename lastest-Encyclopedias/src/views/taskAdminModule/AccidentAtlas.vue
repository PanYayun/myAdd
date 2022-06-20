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
          <p style="font-size: 18px; font-weight: 800">事理图谱抽取</p>
        </Col>
        <Col span="24">
          <div class="textarea" v-html="textarea"></div>
        </Col>
        <Col span="24" style="padding:  15px 0;text-align: right;">
          <p>当前审核第{{ num + 1 }}条数据，共{{ total_count }}条</p>
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
        style="box-sizing: content-box;"
      >
      </Table>
      <Row>
        <Col
          style="width:100%;text-align: right;margin-top:20px;padding-right:20px"
        >
          <Button type="primary" @click="modal2 = true">添加</Button>
        </Col>
      </Row>
      <div style="overflow:hidden;margin-top:30px">
        <atlas-components></atlas-components>
      </div>
      <Row>
        <Col
          span="24"
          style="text-align: center; margin-top: 30px;padding-bottom:50px;"
        >
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
            <Col span="12">
              <FormItem label="原因" label-position="top" prop="from">
                <Input v-model="formCustom_1.from" placeholder="请输入属性值" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="原因主体" label-position="top" prop="from_zhuti">
                <Input
                  v-model="formCustom_1.from_zhuti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="原因客体" label-position="top" prop="from_keti">
                <Input
                  v-model="formCustom_1.from_keti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem
                label="原因触发词"
                label-position="top"
                prop="from_chufaci"
              >
                <Input
                  v-model="formCustom_1.from_chufaci"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结果" label-position="top" prop="to">
                <Input v-model="formCustom_1.to" placeholder="请输入属性值" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结果主体" label-position="top" prop="to_zhuti">
                <Input
                  v-model="formCustom_1.to_zhuti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结果客体" label-position="top" prop="to_keti">
                <Input
                  v-model="formCustom_1.to_keti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem
                label="结果触发词"
                label-position="top"
                prop="to_chufaci"
              >
                <Input
                  v-model="formCustom_1.to_chufaci"
                  placeholder="请输入属性值"
                />
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
    <Modal
      v-model="modal2"
      width="600"
      :mask-closable="false"
      scrollable
      inline
      class="modal1_log_1"
      @on-visible-change="Modal_status2"
    >
      <p
        slot="header"
        style="fontsize: 16px; fontweight: 600;text-align: center;"
      >
        <span>添加属性值</span>
      </p>
      <div>
        <Form ref="formCustom_2" :model="formCustom_2">
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="原因" label-position="top" prop="from">
                <Input v-model="formCustom_2.from" placeholder="请输入属性值" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="原因主体" label-position="top" prop="from_zhuti">
                <Input
                  v-model="formCustom_2.from_zhuti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="原因客体" label-position="top" prop="from_keti">
                <Input
                  v-model="formCustom_2.from_keti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem
                label="原因触发词"
                label-position="top"
                prop="from_chufaci"
              >
                <Input
                  v-model="formCustom_2.from_chufaci"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结果" label-position="top" prop="to">
                <Input v-model="formCustom_2.to" placeholder="请输入属性值" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结果主体" label-position="top" prop="to_zhuti">
                <Input
                  v-model="formCustom_2.to_zhuti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结果客体" label-position="top" prop="to_keti">
                <Input
                  v-model="formCustom_2.to_keti"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem
                label="结果触发词"
                label-position="top"
                prop="to_chufaci"
              >
                <Input
                  v-model="formCustom_2.to_chufaci"
                  placeholder="请输入属性值"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="text" @click="modal2 = false"
          >关闭</Button
        >
        <Button style="width: 80px" type="primary" @click="ok_2('formCustom_2')"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { _debounce } from "@/libs/Perform_optimization.js";
import atlasComponents from "@/components/atlasComponents.vue";
export default {
  name: "AccidentAtlas",
  components: {
    atlasComponents,
  },
  data() {
    return {
      modal1: false, //编辑弹出框
      modal2: false, //新增弹出框
      textarea: "",
      // 表格的loading
      loading_1: false,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 分页的粒度
      pageNum: "10",
      // 表格表头
      tableColumns_1: [
        {
          title: "原因事件",
          key: "from",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "原因主体",
          key: "from_zhuti",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "原因客体",
          key: "from_keti",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "原因触发词",
          key: "from_chufaci",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "结果事件",
          key: "to",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "结果主体",
          key: "to_zhuti",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "结果客体",
          key: "to_keti",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "结果触发词",
          key: "to_chufaci",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 150,
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
                      this.$axios("/baike/yuchuli/del_event_graph", "post", {
                        recordid: this.record_id,
                        from_id: params.row.from_id,
                        to_id: params.row.to_id,
                      }).then((data) => {
                        console.log(data, "删除成功");
                        this.TableData_1();
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
        from: "",
        from_chufaci: "",
        from_keti: "",
        from_zhuti: "",
        to: "",
        to_chufaci: "",
        to_keti: "",
        to_zhuti: "",
      },
      //新增数据
      formCustom_2: {
        from: "",
        from_chufaci: "",
        from_keti: "",
        from_zhuti: "",
        to: "",
        to_chufaci: "",
        to_keti: "",
        to_zhuti: "",
      },
    };
  },
  methods: {
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      //原id this.toExamineid
      //测试ID "9e082000-fff6-11eb-aa87-0242ac110006"
      // alert(this.$route.query.type == 'equipment')
      this.$axios(
        "/baike/yuchuli/search_event_graph_new",
        "post",
        this.$qs.stringify({
          subjobid: this.toExamineid,
          index: this.num,
          pageNum: this.pageNum,
          pageIndex: this.table_current_1 - 1,
        })
      ).then((res) => {
        console.log(res, "事理图谱抽取");
        this.textarea = res.data.text;
        this.current_count = res.data.total_num;
        this.total_count = res.data.total_len;
        this.tableData_1 = res.data.table;
        this.record_id = res.data.recordid;
        var arr1 = res.data.typelist;
        arr1.unshift("全部");
        this.$store.commit("updated_atlasTypeList", arr1);
        this.$store.commit("updated_atlasImg", res.data.graph);
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
      if (this.total_count === this.num + 1) {
        this.$Message.info("已经是最后一条数据");
        return;
      }
      this.num += 1;
      this.TableData_1();
    },
    //保存结果
    preservation() {
      if (
        this.$route.params.task_name != undefined &&
        this.$route.params.task_name != ""
      ) {
        this.$store.commit("changeExamineName", this.$route.params.task_name);
        var examineName = this.$route.params.task_name;
      } else {
        var examineName = this.$store.state.standard.ExamineName;
      }
      this.$axios("/baike/yuchuli/confirm_event_graph", "post", {
        recordid: this.record_id,
        subjob_name: examineName,
      }).then((data) => {
        if (this.total_count === 1) {
          this.$router.push("/TableList/KnowledgeAudit");
          return;
        }
        this.num = 0;
        this.TableData_1();
        console.log(data, "保存成功");
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
      (this.formCustom_1 = {
        from: params.row.from,
        from_chufaci: params.row.from_chufaci,
        from_keti: params.row.from_keti,
        from_zhuti: params.row.from_zhuti,
        to: params.row.to,
        to_chufaci: params.row.to_chufaci,
        to_keti: params.row.to_keti,
        to_zhuti: params.row.to_zhuti,
        to_id: params.row.to_id,
        from_id: params.row.from_id,
      }),
        this.$nextTick(() => {
          this.modal1 = true;
        });
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
      this.$axios("/baike/yuchuli/edit_event_graph", "post", {
        recordid: this.record_id,
        ...this.formCustom_1,
      }).then((data) => {
        this.TableData_1();
        console.log(data, "编辑成功");
      });
      console.log(this.formCustom_1, "123");
    },
    //添加数据
    ok_2() {
      this.modal2 = false;
      this.$axios("/baike/yuchuli/add_event_graph", "post", {
        recordid: this.record_id,
        ...this.formCustom_2,
        subjobid: this.toExamineid,
      }).then((data) => {
        this.TableData_1();
        this.$refs["formCustom_2"].resetFields();
        console.log(data, "添加成功");
      });
      console.log(this.formCustom_2, "添加数据");
    },
    Modal_status2() {
      if (status) {
      } else {
        setTimeout(() => {
          this.$refs["formCustom_2"].resetFields();
          // 重置
        }, 300);
      }
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
