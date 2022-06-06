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
        <Col
          span="24"
          style="
            padding-top: 55px;
            padding-bottom: 45px;
            display: flex;
            justify-content: center;
          "
        >
          <div style="width: 100%;display:flex">
            <div :class="[TaskFlow == 1 ? 'activele' : '', 'Taskschedule']">
              <div class="iconlis">
                <img
                  v-show="TaskFlow == 1"
                  src="@/img/knowledge/AfterKnowledge.png"
                  alt=""
                />
                <img
                  v-show="TaskFlow !== 1"
                  src="@/img/knowledge/PreKnowledge.png"
                  alt=""
                />
              </div>
              <p>通用知识加工</p>
              <p style="font-size:24px">01</p>
              <div class="back">
                <div></div>
                <div>
                  <img
                    v-show="TaskFlow == 1"
                    src="@/img/knowledge/done.png"
                    alt=""
                  />
                  <img
                    v-show="TaskFlow !== 1"
                    src="@/img/knowledge/Unchecked.png"
                    alt=""
                  />
                </div>

                <div></div>
              </div>
            </div>
            <div :class="[TaskFlow == 2 ? 'activele' : '', 'Taskschedule']">
              <div class="iconlis">
                <img
                  v-show="TaskFlow == 2"
                  src="@/img/knowledge/AfterMajor.png"
                  alt=""
                />
                <img
                  v-show="TaskFlow !== 2"
                  src="@/img/knowledge/PreProfessional.png"
                  alt=""
                />
              </div>
              <p>专业知识抽取</p>
              <p style="font-size:24px">02</p>
              <div class="back">
                <div></div>
                <div>
                  <img
                    v-show="TaskFlow == 2"
                    src="@/img/knowledge/done.png"
                    alt=""
                  />
                  <img
                    v-show="TaskFlow !== 2"
                    src="@/img/knowledge/Unchecked.png"
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            </div>
            <div :class="[TaskFlow == 3 ? 'activele' : '', 'Taskschedule']">
              <div class="iconlis">
                <img
                  v-show="TaskFlow == 3"
                  src="@/img/knowledge/AfterAudit.png"
                  alt=""
                />
                <img
                  v-show="TaskFlow !== 3"
                  src="@/img/knowledge/BeforeAudit.png"
                  alt=""
                />
              </div>
              <p>知识审核</p>
              <p style="font-size:24px">03</p>
              <div class="back">
                <div></div>
                <div>
                  <img
                    v-show="TaskFlow == 3"
                    src="@/img/knowledge/done.png"
                    alt=""
                  />
                  <img
                    v-show="TaskFlow !== 3"
                    src="@/img/knowledge/Unchecked.png"
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            </div>
            <div :class="[TaskFlow == 4 ? 'activele' : '', 'Taskschedule']">
              <div class="iconlis">
                <img
                  v-show="TaskFlow == 4"
                  src="@/img/knowledge/AfterData.png"
                  alt=""
                />
                <img
                  v-show="TaskFlow !== 4"
                  src="@/img/knowledge/BeforeData.png"
                  alt=""
                />
              </div>
              <p>数据入库</p>
              <p style="font-size:24px">04</p>
              <div class="back">
                <div></div>
                <div>
                  <img
                    v-show="TaskFlow == 4"
                    src="@/img/knowledge/done.png"
                    alt=""
                  />
                  <img
                    v-show="TaskFlow !== 4"
                    src="@/img/knowledge/Unchecked.png"
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Table
        border
        stripe
        height="522"
        highlight-row
        :data="tableData_1"
        :loading="loading_1"
        :columns="tableColumns_1"
      ></Table>
      <Row>
        <Col span="24" style="text-align: center;padding-bottom:50px; margin-top: 30px">
          <!-- <Button
            type="primary"
            @click="PreviousStep"
            style="width: 100px;margin-right:20px"
            >上一步</Button
          > -->
          <Button type="primary" @click="Next_step()" style="width: 100px"
            >下一步</Button
          >
        </Col>
      </Row>
    </Card>
    <Modal
      v-model="modal1"
      width="800"
      :mask-closable="false"
      scrollable
      inline
      class="modal1_log_1"
      @on-visible-change="Modal_status"
    >
      <p slot="header" style="fontsize: 16px; fontweight: 600">
        <span>查看日志</span>
      </p>
      <div>
        <div>{{ modal1_log_1_text || "暂无日志" }}</div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="width: 80px" type="text" @click="cancel_1">关闭</Button>
        <Button style="width: 80px" type="primary" @click="ok_1">刷新</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { _debounce } from "@/libs/Perform_optimization.js";
import { mapActions } from "vuex";
export default {
  name: "TaskExpertise",
  data() {
    return {
      modal1: false,
      // 表格的loading
      loading_1: false,
      // 表格表头
      tableColumns_1: [
        {
          title: "序号",
          key: "index",
          align: "center",
          tooltip: true,
          width: 80,
        },
        {
          title: "子任务名称",
          key: "task_name",
          align: "center",
          tooltip: true,
          minWidth: 130,
        },
        {
          title: "API名称",
          key: "API_name",
          align: "center",
          tooltip: true,
          minWidth: 160,
        },
        {
          title: "启动时间",
          key: "start_time",
          align: "center",
          tooltip: true,
          minWidth: 120,
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
                    params.row.start_time
                    // params.row.start_time.length > 10
                    //   ? params.row.start_time.substring(0, 10)
                    //   : params.row.start_time
                  ), // 表格显示文字
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.start_time
                    // params.row.start_time.length > 10
                    //   ? params.row.start_time.substring(0, 10)
                    //   : params.row.start_time // 气泡内的文字
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "任务状态",
          key: "task_status",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            if (params.row.task_status == "Starting") {
              return h("div", [h("span", "加载中")]);
            } else if (params.row.task_status == "Working") {
              return h("div", [h("span", "处理中")]);
            } else if (params.row.task_status == "Finished") {
              return h("div", [h("span", "待审核")]);
            } else if (params.row.task_status == "Failure") {
              return h("div", [h("span", "失败")]);
            } else if (params.row.task_status == "Done") {
              return h("div", [h("span", "已审核")]);
            }
          },
        },
        {
          title: "花费时间",
          key: "take_time",
          align: "center",
          tooltip: true,
          minWidth: 80,
          render: (h, params) => {
            if (params.row.take_time) {
              return h("div", [h("span", params.row.take_time + "S")]);
            } else {
              return h("div", [h("span", "0S")]);
            }
          },
        },
        {
          title: "操作",
          key: "take_time",
          align: "center",
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            if (params.row.task_name == "事理图谱生成") {
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
                        this.log_status = {
                          subjobid: params.row.subjobid,
                          taskName: params.row.task_name,
                        };
                        this.show_log_1(this.log_status);
                      },
                    },
                  },
                  "查看日志"
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
                        this.show_1(params);
                      },
                    },
                  },
                  "生成过程"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer",
                      color: "#3388ff",
                    },
                    on: {
                      click: () => {
                        this.log_status = {
                          subjobid: params.row.subjobid,
                          taskName: params.row.task_name,
                        };
                        this.show_log_1(this.log_status);
                      },
                    },
                  },
                  "查看日志"
                ),
              ]);
            }
          },
        },
      ],
      // 表格数据
      tableData_1: [],
      // 选中的总数量
      selectedSum_1: 0,
      if_Next_btn: false,
      // 获取表格数据时用到的参数
      table_form_1: {
        jobId: "",
      },
      table_form_2: {
        dataType: "",
        jobName: "",
        recordId: "",
      },
      // 日志
      modal1_log_1_text: "",
      log_status: {},
    };
  },
  methods: {
    //初始化
    Initialize() {
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/go_special_model_page",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          jobName: this.TaskName,
        })
      ).then((res) => {
        console.log(res,'专业知识数据');
        if (res.data.code === 200) {
          this.tableData_1=res.data.resultList
          this.$store.dispatch("changeTaskFlow", 1);
        }
        setTimeout(() => {
          this.$Spin.hide();
        }, 300);
      });
    },
    //下一步
    Next_step() {
      this.$router.push("/TableList/KnowledgeAudit");
      console.log(this.TaskId, this.TaskName, "id是否还在");
      //#region 
      // this.$axios(
      //   "/baike/yuchuli/go_model_check_page",
      //   "post",
      //   this.$qs.stringify({
      //     jobId: this.TaskId,
      //     jobName: this.TaskName,
      //   })
      // ).then((data) => {
      //   if (data.data.code === 200) {
      //     console.log(data.data, "知识审核");
      //     this.$store.dispatch("changeTaskFlow", this.TaskFlow);
      //     this.$store.commit("chaneKnowledgeAuditList", data.data.resultList);
      //     this.$router.push("/TableList/KnowledgeAudit");
      //   }
      // });
      //#endregion
    },
    //上一步
    // PreviousStep() {
    //   this.$store.dispatch("upperTaskFlow", this.TaskFlow);
    //   this.$router.push("TaskManagementDetailsFirst");
    // },
    //查看
    show_1(params) {
      console.log(params.row.subjobid);
      if (params.row.task_name === "事理图谱生成") {
        this.$store.commit("changeSubjobid", params.row.subjobid);
        this.$store.commit("ModifiesSteps", 1);
        this.$router.push("GenerateTaskOne");
      }
    },
    //查看
    show_log_1(params) {
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/get_model_logs",
        "post",
        this.$qs.stringify(params)
      )
        .then((data) => {
          console.log(data,'日志');
          setTimeout(() => {
            this.modal1_log_1_text = data.data.subjobLogs;
          }, 200);
          setTimeout(() => {
            this.$Spin.hide();
            this.modal1 = true;
          }, 400);
        })
        .catch(() => {
          setTimeout(() => {
            this.$Spin.hide();
          }, 400);
        });
    },
    ok_1() {
      this.modal1_log_1_text = "";
      this.show_log_1(this.log_status);
    },
    cancel_1() {
      this.modal1_log_1_text = "";
      this.modal1 = false;
      this.log_status = {};
    },
    Modal_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          this.modal1_log_1_text = "";
          this.log_status = {};
        }, 300);
      }
    },
  },
  computed: {
    TaskFlow() {
      return 2;
    },
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    TaskId() {
      return this.$store.state.standard.TaskId;
    },
    TaskFlow2() {
      return this.$store.state.standard.TaskFlow2;
    },
    // majorList() {
    //   return this.$store.state.standard.majorList;
    // },
  },
  destroyed() {
    // 页面销毁
  },
  watch: {},
  mounted() {
    console.log(this.TaskFlow2,'是否有数据');
    if (this.TaskFlow2 === 2) {
      //任务管理
      this.$axios(
        "/baike/yuchuli/get_job_detail_info",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          jobName: this.TaskName,
          jobStatus: 1,
        })
      ).then((res) => {
        this.tableData_1=res.data.resultList
        console.log(res, "任务查询专业知识接口");
      });
    } else {
      //新建接口
      this.Initialize();
    }
    console.log(this.majorList, "要也没有");
  },
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
.Taskschedule {
  width: 25%;
  text-align: center;
  .iconlis {
    width: 80px;
    height: 70px;
    padding-top: 6px;
    margin: 0 auto 10px auto;
  }
  p {
    font-size: 20px;
    color: #42454e;
    margin: 5px 0;
    font-weight: bold;
  }
  .back {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .back div:first-child {
    width: 47%;
    height: 2px;
    background: #f2f2f2;
  }
  .back div:last-child {
    width: 47%;
    height: 2px;
    background: #f2f2f2;
  }
}
.activele {
  .iconlis {
    padding: 0;
  }
  p {
    color: #4788ff;
  }
}
.modal1_log_1 /deep/ .ivu-modal-body {
  overflow-y: scroll;
  height: 500px;
  color: #fff;
  background-color: #42454e;
  padding: 30px;
}
</style>
