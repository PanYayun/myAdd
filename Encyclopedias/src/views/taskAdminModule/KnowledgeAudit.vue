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
        <Col
          span="24"
          style="text-align: center;padding-bottom:50px; margin-top: 30px"
        >
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
    <Modal v-model="modal2" width="900" footer-hide>
      <p slot="header">
        <span>标准实体加链</span>
      </p>
      <div style="height:450px;overflow-x: auto;">
        <Table :columns="columns1" :data="data1"></Table>
      </div>
    </Modal>
  </div>
</template>
<script>
import { _debounce } from "@/libs/Perform_optimization.js";
import { mapActions } from "vuex";
import { parse } from "qs";
export default {
  name: "KnowledgeAudit",
  data() {
    return {
      // 表格的loading
      loading_1: false,
      modal2: false, //实体加链弹框
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
          minWidth: 130,
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
          minWidth: 70,
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
          minWidth: 100,
          render: (h, params) => {
            return h("div", params.row.take_time + "s");
          },
        },
        {
          title: "结果审核",
          key: "take_time",
          align: "center",
          tooltip: true,
          minWidth: 80,
          render: (h, params) => {
            if (
              params.row.task_name == "标准实体加链" ||
              params.row.task_name == "实体加链"
            ) {
              if (this.pageType == "biaozhun") {
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
                        cursor: "pointer",
                        color: "#2d8cf0",
                      },
                      on: {
                        click: () => {
                          //Check方法是查看,show_1是审核
                          params.row.task_name == "标准实体加链" ||
                          params.row.task_name == "实体加链"
                            ? this.Check(params)
                            : this.show_1(params);
                        },
                      },
                    },
                    params.row.task_name == "标准实体加链" ||
                      params.row.task_name == "实体加链"
                      ? "查看"
                      : "审核"
                  ),
                ]);
              } else {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "text",
                        size: "small",
                        ghost: true,
                        disabled: true,
                      },
                      style: {},
                      on: {
                        click: () => {
                          console.log("xxx");
                        },
                      },
                    },
                    "审核"
                  ),
                ]);
              }
            } else {
              if (params.row.task_status == "Finished") {
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
                        cursor: "pointer",
                        color: "#2d8cf0",
                      },
                      on: {
                        click: () => {
                          //Check方法是查看,show_1是审核
                          params.row.task_name == "标准实体加链" ||
                          params.row.task_name == "实体加链"
                            ? this.Check(params)
                            : this.show_1(params);
                        },
                      },
                    },
                    params.row.task_name == "标准实体加链" ||
                      params.row.task_name == "实体加链"
                      ? "查看"
                      : "审核"
                  ),
                ]);
              } else {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "text",
                        size: "small",
                        ghost: true,
                        disabled: true,
                      },
                      style: {},
                      on: {
                        click: () => {
                          console.log("xxx");
                        },
                      },
                    },
                    "审核"
                  ),
                ]);
              }
            }
          },
        },
      ],
      // 表格数据
      tableData_1: [],
      // 判断当前页面的类型
      pageType: "",
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
      // 定时刷新
      intervalId: null,
      //实体加链弹框表头
      columns1: [
        {
          title: "标准号",
          key: "bzbh",
          align: "center",
        },
        {
          title: "标准中文名称",
          key: "BZZWMC",
          align: "center",
          tooltip: true,
        },
        {
          title: "操作",
          key: "address",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    cursor: "pointer",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/BasicDetail",
                        query: {
                          id: params.row.bzbh,
                        },
                      });
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      //实体加链弹框表数据
      data1: [],
    };
  },
  methods: {
    //事故初始化
    Initialize() {
      this.$axios(
        "/baike/yuchuli/go_model_check_page",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          jobName: this.TaskName,
        })
      ).then((res) => {
        if (res.data.code === 200) {
          this.tableData_1 = res.data.resultList;
          console.log(res.data, "知识审核");
          this.$store.dispatch("changeTaskFlow", 2);
        }
      });
    },

    //下一步
    Next_step() {
      this.tableData_1.map((item) => {
        if (item.task_name == "标准实体加链" || item.task_name == "实体加链") {
          item.task_status = "Done";
        }
        return item;
      });
      let ss = this.tableData_1.every((item) => {
        return item.task_status === "Done" || item.task_status === "Failure";
      });
      console.log(ss);
      if (ss) {
        this.$router.push("DataWarehousing");
      } else {
        this.$Message.info("请完成所有审核");
      }
    },
    //上一步
    // PreviousStep() {
    //   this.$store.dispatch("upperTaskFlow", this.TaskFlow);
    //   this.$router.push("/TableList/TaskExpertise");
    // },
    //审核
    show_1(params) {
      this.$store.commit("changetoExamineid", params.row.subjobid);
      if (params.row.task_name === "民航事故属性抽取") {
        this.$router.push("/TableList/AccidentExtraction");
      } else if (params.row.task_name === "事理图谱生成") {
        this.$router.push({
          name: "AccidentAtlas",
          params: {
            task_name: params.row.task_name,
          },
        });
      } else if (
        params.row.task_name === "现象事理知识抽取" ||
        params.row.task_name === "原因事理知识抽取" ||
        params.row.task_name === "机理事理知识抽取"
      ) {
        // this.$router.push('/TableList/AccidentAtlas');
        this.$router.push({
          name: "AccidentAtlas",
          params: {
            task_name: params.row.task_name,
          },
        });
      } else if (params.row.task_name === "新词发现") {
        this.$router.push("/TableList/NeologismDiscovery");
      } else if (params.row.task_name === "摘要生成") {
        this.$router.push("/TableList/KnowledgeSummary");
      } else if (
        params.row.task_name === "民航事故性质分类" ||
        params.row.task_name === "标准分类-按832"
      ) {
        this.$router.push("/TableList/StandardClassification");
      } else if (
        params.row.task_name === "相似事故" ||
        params.row.task_name === "相似标准计算"
      ) {
        this.$router.push("/TableList/SimilarAccident");
      } else if (
        params.row.task_name === "民航事故原因分类" ||
        params.row.task_name === "标准分类-按集团执行体系"
      ) {
        this.$router.push("/TableList/CauseAccident");
      } else if (params.row.task_name === "标准关键词提取") {
        this.$router.push("/TableList/AuditKeywords");
      } else if (params.row.task_name === "标准指标抽取") {
        this.$router.push("/TableList/AuditIndicatorsList");
      }
    },
    //查看
    Check(params) {
      console.log(params.row);
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/list_linked_biaozhun",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          subjobid: params.row.subjobid,
        })
      ).then((res) => {
        console.log(res, "211111111");
        if (res.data.code == 200) {
          this.data1 = res.data.table;
          setTimeout(() => {
            this.modal2 = true;
            this.$Spin.hide();
          }, 600);
        }
      });
    },
  },
  computed: {
    TaskFlow() {
      return 3;
    },
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    TaskId() {
      return this.$store.state.standard.TaskId;
    },
    KnowledgeAuditList() {
      return this.$store.state.standard.KnowledgeAuditList;
    },
    TaskFlow2() {
      return this.$store.state.standard.TaskFlow2;
    },
  },
  destroyed() {
    // 页面销毁
  },
  watch: {},
  mounted() {
    if (this.TaskFlow2 === 3) {
      //任务管理
      this.$axios(
        "/baike/yuchuli/get_job_detail_info",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          jobName: this.TaskName,
          jobStatus: 2,
        })
      ).then((res) => {
        this.tableData_1 = res.data.resultList;
        this.pageType = res.data.dataType;
        console.log(this.pageType, "任务查询知识审核接口");
      });
    } else {
      //新建接口
      this.Initialize();
    }
    // console.log(this.KnowledgeAuditList, "要也没有");
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
</style>
