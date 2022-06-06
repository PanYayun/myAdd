<template>
  <div
    style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px"
  >
    <Spin size="large" fix v-if="spinShow_1"></Spin>
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
          <div style="width: 100%;display:flex" v-if="!(this.TaskFlow2 === 5)">
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
        <Col span="12" style="padding-bottom: 15px">
          <p style="font-size: 18px; font-weight: 800">数据入库详情</p>
          <div
            style="
              margin-top: 20px;
              padding: 20px 0px 0px 20px;
              border-left: 1px solid #eeeeee;
            "
          >
            <p
              style="font-size: 16px; font-weight: 600; padding-bottom: 10px; letter-spacing: 1px;"
            >
              {{ li_data_obj.job_time }}，
              {{
                li_data_obj.job_name || TaskName + "标准碎片化"
              }}任务已完成，数据入库信息如下：
            </p>
             <!-- 标准碎片化详情 -->
            <ul class="ul_data_box" v-if="this.TaskFlow2 === 5">
                <li>
                    <span class="li_data_dian">●</span>
                    <span class="li_data">上传标准{{ li_data_obj.job_name || "0" }}个</span>
                </li>
                <li>
                    <span class="li_data_dian">●</span>
                    <span class="li_data">加工标准{{ li_data_obj.accident_num || "0" }}个</span>
                </li>
                <li>
                    <span class="li_data_dian">●</span>
                    <span class="li_data">抽取条款{{ li_data_obj.new_word_num || "0" }}个</span>
                </li>
            </ul>

            <!-- 标准碎片化详情 ----------------------------------------------------------------------民航 -->
            <ul class="ul_data_box" v-if="pageType == 'minhang'">
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库事故数量{{ li_data_obj.accident_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库新词数量{{ li_data_obj.new_word_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库事故属性数量{{
                    li_data_obj.attribute_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库相似事故数量{{
                    li_data_obj.similar_accident_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库事件数量{{ li_data_obj.event_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库摘要数量{{ li_data_obj.summary_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库实体加链数量{{ li_data_obj.link_num || "0" }}条</span
                >
              </li>
            </ul>
            <!-- 标准碎片化详情 ----------------------------------------------------------------------标准 -->
            <ul class="ul_data_box" v-if="pageType == 'biaozhun'">
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库标准数量{{ li_data_obj.record_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库新词数量{{ li_data_obj.new_word_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库摘要数量{{ li_data_obj.summary_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库实体加链数量{{ li_data_obj.link_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库关键词数量{{ li_data_obj.keyWords_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库832标准体系分类数量{{
                    li_data_obj.classifier832_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库集团标准体系分类数量{{
                    li_data_obj.classifierJT_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库标准指标数量{{
                    li_data_obj.biaozhun_index_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库相似标准数量{{
                    li_data_obj.similiar_biaozhun_num || "0"
                  }}条</span
                >
              </li>
            </ul>
            <!-- 标准碎片化详情 ----------------------------------------------------------------------质量 -->
            <ul class="ul_data_box" v-if="pageType == 'zhiliang'">
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库质量知识数量{{ li_data_obj.record_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库新词数量{{ li_data_obj.new_word_num || "0" }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库现象事件数量{{
                    li_data_obj.xianxiang_event_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库原因事件数量{{
                    li_data_obj.yuanyin_event_num || "0"
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span>
                <span class="li_data"
                  >入库机理事件数量{{
                    li_data_obj.jili_event_num || "0"
                  }}条</span
                >
              </li>
            </ul>
          </div>
          <template v-if="pageType == 'biaozhun'|| this.TaskFlow2 === 5">
            <Button
              type="primary"
              class="btnDetails"
              @click="Check"
              >加工标准详情</Button
            >
          </template>
        </Col>
        <Col span="12" style="padding-bottom: 15px">
          <div id="echarts_index_11"></div>
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Row>
        <Col
          span="24"
          style="text-align: center;padding-bottom:50px; margin-top: 30px"
        >
          <!-- <Button type="primary" @click="Next_step()" style="width: 100px"
            >上一步</Button
          > -->
          <Button
            type="primary"
            @click="Next_step()"
            style="width: 100px;margin-left:10px"
            >完成</Button
          >
        </Col>
      </Row>
    </Card>
    <Modal v-model="modal2" width="500" footer-hide>
      <p slot="header">
        <span v-if="this.TaskFlow2 === 5">标准实体加链</span>
        <span v-if="this.TaskFlow2 === 4">加工标准</span>
      </p>
      <div style="height:450px;overflow-x: auto;">
        <Table :columns="columns1" :data="data1"></Table>
      </div>
    </Modal>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "DataWarehousing",
  data() {
    return {
      modal2: false, //标准碎片化弹框
      modal1: false,
      spinShow_1: false,
      pageType: "", //页面类型
      JOBID: "",
      echarts_data: [],
      li_data_obj: {
        // 任务时间
        job_time: "",
        // 任务名称
        job_name: "",
        // 事故数量
        biaozhun_index_num: "", //入库标准指标数量
        classifier832_num: "", //入库832标准体系分类数量
        classifierJT_num: "", //入库集团标准体系分类数量
        keyWords_num: "", //入库关键词数量XX
        link_num: "", // 入库实体加链数量XX
        new_word_num: "", // 入库新词数量XX
        record_num: "", //入库标准数量XX
        similiar_biaozhun_num: "", // 入库相似标准数量XX
        summary_num: "", // 入库摘要数量XX
        // 事件数量
        event_num: "",
      },
      table_form_2: {
        dataType: "",
        jobName: "",
        recordId: "",
      },
      // 日志
      modal1_log_1_text: "",
      log_status: {},
      //实体加链弹框表头
      columns1: [
        {
          title: "标准号",
          key: "bzbh",
          width: 200,
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
    //初始化
    //完成返回任务管理
    Next_step() {
      // this.$store.dispatch("upperTaskFlow", this.TaskFlow);
      this.$store.dispatch("changeTaskFlow", -1);
      this.$store.commit("ModifiesTaskList", {
        list: "",
        id: "",
        name: "",
        TaskData: {},
      });
      console.log(this.TaskFlow2);
      this.$store.commit("updated_Menu_top_active", "任务管理");
      this.$router.push("/TableList/TaskManagement");
    },
    //标准碎片加工过详情
    Check() {
      this.$Spin.show();
      if (this.TaskFlow2 == 5) {
        this.$axios(
          "/baike/chip/get_standard_detail",
          "post",
          this.$qs.stringify({
            jobId: this.TaskId,
          })
        ).then((res) => {
          if (res.data.code == 200) {
            if (res.data.data == null) {
              setTimeout(() => {
                this.modal2 = true;
                this.$Spin.hide();
              }, 600);
              return;
            }
            this.data1 = res.data.data;
            setTimeout(() => {
              this.modal2 = true;
              this.$Spin.hide();
            }, 600);
          }
        });
      } else {
        this.$axios(
          "/baike/yuchuli/list_linked_biaozhun",
          "post",
          this.$qs.stringify({
            jobId: this.TaskId,
            subjobid: this.JOBID,
          })
        ).then((res) => {
          this.data1 = res.data.table;
          setTimeout(() => {
            this.modal2 = true;
            this.$Spin.hide();
          }, 600);
        });
      }
    },
  },
  computed: {
    TaskFlow() {
      return 4;
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
  },
  watch: {},
  mounted() {
    console.log(this.TaskId, "asddas");
    if (this.TaskFlow2 === 5) {
      //任务管理标准碎片化
      this.$axios(
        "/baike/chip/task_detail",
        "post",
        this.$qs.stringify({ id: this.TaskId })
      ).then((res) => {
        (this.li_data_obj = {
          // 任务时间
          job_time: res.data.data.created_time,
          //上传标准数量
          job_name: res.data.data.total_count,
          // 加工标准数量
          accident_num: res.data.data.process_count,
          // 抽取条款数量
          new_word_num: res.data.data.zb_count,
        }),
          console.log(res, "标准碎片化");
        this.echarts_data = [
          ["上传标准", res.data.data.total_count],
          ["加工标准", res.data.data.process_count],
          ["抽取条款", res.data.data.zb_count],
        ];
        var myCharts = document.getElementById("echarts_index_11");
        let option = {
          // 1、 格式化提示信息
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              var str = ""; // 辅助变量，存储要展示的提示信息
              // 循环存储
              for (var i = 0; i < params.length; i++) {
                str =
                  str +
                  params[i].marker +
                  params[i].value[0] +
                  "：" +
                  params[i].value[1] +
                  "条<br/>";
              }
              // 返回结果值
              return "数据入库详情<br>" + str;
            },
          },
          grid: {
            left: "5%",
            right: "5%",
            top: "5%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              axisLabel: {
                interval: 0,
                formatter: function(value) {
                  return value.split("").join("\n");
                },
              },
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              splitLine: {
                show: true,
              },
              axisLabel: {
                formatter: "{value} ",
              },
            },
          ],
          series: [
            {
              barWidth: "50%",
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#418efe",
                },
              },
              data: this.echarts_data,
            },
          ],
        };
        // 当数据更新了 在dom中渲染后 再去渲染echarts
        this.$nextTick(() => {
          // 渲染
          echarts.init(myCharts).setOption(option, true);
        });
      });
    } else if (this.TaskFlow2 === 4) {
      //任务管理
      this.$axios(
        "/baike/yuchuli/get_job_detail_info",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          jobName: this.TaskName,
          jobStatus: 3,
        })
      ).then((res) => {
        this.JOBID = res.data.link_subjobid;
        this.li_data_obj = res.data.statisticData;
        this.echarts_data = [
          // ["入库事故", res.data.statisticData.accident_num],
          // ["入库新词", res.data.statisticData.new_word_num],
          // ["入库属性", res.data.statisticData.attribute_num],
          // ["入库事理图谱", res.data.statisticData.event_num],
          // ["入库摘要", res.data.statisticData.summary_num],
        ];
        this.pageType = res.data.dataType;
        // -------------------------------------------------------------------------------标准
        if (res.data.dataType == "biaozhun") {
          this.echarts_data.push([
            "入库标准数量",
            res.data.statisticData.record_num,
          ]);
          this.echarts_data.push([
            "入库新词数量",
            res.data.statisticData.new_word_num,
          ]);
          this.echarts_data.push([
            "入库摘要数量",
            res.data.statisticData.summary_num,
          ]);
          this.echarts_data.push([
            "入库实体加链数量",
            res.data.statisticData.link_num,
          ]);
          this.echarts_data.push([
            "入库关键词数量",
            res.data.statisticData.keyWords_num,
          ]);
          this.echarts_data.push([
            "入库832标准体系分类数量",
            res.data.statisticData.classifier832_num,
          ]);
          this.echarts_data.push([
            "入库集团标准体系分类数量",
            res.data.statisticData.classifierJT_num,
          ]);
          this.echarts_data.push([
            "入库标准指标数量",
            res.data.statisticData.biaozhun_index_num,
          ]);
          this.echarts_data.push([
            "入库相似标准数量",
            res.data.statisticData.similiar_biaozhun_num,
          ]);
          // -------------------------------------------------------------------------------民航
        } else if (res.data.dataType == "minhang") {
          this.echarts_data.push([
            "入库事故数量",
            res.data.statisticData.accident_num,
          ]);
          this.echarts_data.push([
            "入库新词数量",
            res.data.statisticData.new_word_num,
          ]);
          this.echarts_data.push([
            "入库事故属性数量",
            res.data.statisticData.attribute_num,
          ]);
          this.echarts_data.push([
            "入库相似事故数量",
            res.data.statisticData.similar_accident_num,
          ]);
          this.echarts_data.push([
            "入库事件数量",
            res.data.statisticData.event_num,
          ]);
          this.echarts_data.push([
            "入库摘要数量",
            res.data.statisticData.summary_num,
          ]);
          this.echarts_data.push([
            "入库实体加链数量",
            res.data.statisticData.link_num,
          ]);
          //----------------------------------------------------------------------质量
        } else if (res.data.dataType == "zhiliang") {
          this.echarts_data.push([
            "入库实体加链数量",
            res.data.statisticData.record_num,
          ]);
          this.echarts_data.push([
            "入库新词数量",
            res.data.statisticData.new_word_num,
          ]);
          this.echarts_data.push([
            "入库现象事件数量",
            res.data.statisticData.xianxiang_event_num,
          ]);
          this.echarts_data.push([
            "入库原因事件数量",
            res.data.statisticData.yuanyin_event_num,
          ]);
          this.echarts_data.push([
            "入库机理事件数量",
            res.data.statisticData.jili_event_num,
          ]);
        }

        var myCharts = document.getElementById("echarts_index_11");
        let option = {
          // 1、 格式化提示信息
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              var str = ""; // 辅助变量，存储要展示的提示信息
              // 循环存储
              for (var i = 0; i < params.length; i++) {
                str =
                  str +
                  params[i].marker +
                  params[i].value[0] +
                  "：" +
                  params[i].value[1] +
                  "条<br/>";
              }
              // 返回结果值
              return "数据入库详情<br>" + str;
            },
          },
          grid: {
            left: "5%",
            right: "5%",
            top: "5%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              axisLabel: {
                interval: 0,
                formatter: function(value) {
                  return value.split("").join("\n");
                },
              },
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              splitLine: {
                show: true,
              },
              axisLabel: {
                formatter: "{value} ",
              },
            },
          ],
          series: [
            {
              barWidth: "50%",
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#418efe",
                },
              },
              data: this.echarts_data,
            },
          ],
        };
        // 当数据更新了 在dom中渲染后 再去渲染echarts
        this.$nextTick(() => {
          // 渲染
          echarts.init(myCharts).setOption(option, true);
        });
        console.log(res, "任务查询数据入库接口");
      });
    } else {
      //新建任务
      this.$axios(
        "/baike/yuchuli/go_model_result_page",
        "post",
        this.$qs.stringify({
          jobId: this.TaskId,
          jobName: this.TaskName,
        })
      ).then((res) => {
        if (res.data.code === 200) {
          this.JOBID = res.data.link_subjobid;
          this.li_data_obj = res.data.statisticData;
          this.pageType = res.data.dataType;
          this.echarts_data = [
            // ["入库事故", res.data.statisticData.accident_num],
            // ["入库新词", res.data.statisticData.new_word_num],
            // ["入库属性", res.data.statisticData.attribute_num],
            // ["入库事理图谱", res.data.statisticData.event_num],
            // ["入库摘要", res.data.statisticData.summary_num],
          ];

          if (res.data.dataType == "biaozhun") {
            this.echarts_data.push([
              "入库标准数量",
              res.data.statisticData.record_num,
            ]);
            this.echarts_data.push([
              "入库新词数量",
              res.data.statisticData.new_word_num,
            ]);
            this.echarts_data.push([
              "入库摘要数量",
              res.data.statisticData.summary_num,
            ]);
            this.echarts_data.push([
              "入库实体加链数量",
              res.data.statisticData.link_num,
            ]);
            this.echarts_data.push([
              "入库关键词数量",
              res.data.statisticData.keyWords_num,
            ]);
            this.echarts_data.push([
              "入库832标准体系分类数量",
              res.data.statisticData.classifier832_num,
            ]);
            this.echarts_data.push([
              "入库集团标准体系分类数量",
              res.data.statisticData.classifierJT_num,
            ]);
            this.echarts_data.push([
              "入库标准指标数量",
              res.data.statisticData.biaozhun_index_num,
            ]);
            this.echarts_data.push([
              "入库相似标准数量",
              res.data.statisticData.similiar_biaozhun_num,
            ]);
            // -------------------------------------------------------------------------------民航
          } else if (res.data.dataType == "minhang") {
            this.echarts_data.push([
              "入库事故数量",
              res.data.statisticData.accident_num,
            ]);
            this.echarts_data.push([
              "入库新词数量",
              res.data.statisticData.new_word_num,
            ]);
            this.echarts_data.push([
              "入库事故属性数量",
              res.data.statisticData.attribute_num,
            ]);
            this.echarts_data.push([
              "入库相似事故数量",
              res.data.statisticData.similar_accident_num,
            ]);
            this.echarts_data.push([
              "入库事件数量",
              res.data.statisticData.event_num,
            ]);
            this.echarts_data.push([
              "入库摘要数量",
              res.data.statisticData.summary_num,
            ]);
            this.echarts_data.push([
              "入库实体加链数量",
              res.data.statisticData.link_num,
            ]);
            //----------------------------------------------------------------------质量
          } else if (res.data.dataType == "zhiliang") {
            this.echarts_data.push([
              "入库实体加链数量",
              res.data.statisticData.record_num,
            ]);
            this.echarts_data.push([
              "入库新词数量",
              res.data.statisticData.new_word_num,
            ]);
            this.echarts_data.push([
              "入库现象事件数量",
              res.data.statisticData.xianxiang_event_num,
            ]);
            this.echarts_data.push([
              "入库原因事件数量",
              res.data.statisticData.yuanyin_event_num,
            ]);
            this.echarts_data.push([
              "入库机理事件数量",
              res.data.statisticData.jili_event_num,
            ]);
          }

          var myCharts = document.getElementById("echarts_index_11");
          let option = {
            // 1、 格式化提示信息
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                var str = ""; // 辅助变量，存储要展示的提示信息
                // 循环存储
                for (var i = 0; i < params.length; i++) {
                  str =
                    str +
                    params[i].marker +
                    params[i].value[0] +
                    "：" +
                    params[i].value[1] +
                    "条<br/>";
                }
                // 返回结果值
                return "数据入库详情<br>" + str;
              },
            },
            grid: {
              left: "5%",
              right: "5%",
              top: "5%",
              bottom: "10%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "category",
                axisLabel: {
                  interval: 0,
                  formatter: function(value) {
                    return value.split("").join("\n");
                  },
                },
                axisPointer: {
                  type: "shadow",
                },
              },
            ],
            yAxis: [
              {
                type: "value",
                splitLine: {
                  show: true,
                },
                axisLabel: {
                  formatter: "{value} ",
                },
              },
            ],
            series: [
              {
                barWidth: "50%",
                type: "bar",
                itemStyle: {
                  normal: {
                    color: "#418efe",
                  },
                },
                data: this.echarts_data,
              },
            ],
          };
          // 当数据更新了 在dom中渲染后 再去渲染echarts
          this.$nextTick(() => {
            // 渲染
            echarts.init(myCharts).setOption(option, true);
          });
        }
        this.$store.dispatch("changeTaskFlow", 3);
      });
    }
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
.ul_data_box {
  li {
    padding: 10px 0px;
    .li_data_dian {
      color: #d7d7d7;
      font-size: 20px;
      margin-right: 15px;
    }
    .li_data {
      font-size: 18px;
    }
  }
}
#echarts_index_11 {
  margin-top: 20px;
  height: 400px;
}
.btnDetails {
  margin-top: 50px;
}
</style>
