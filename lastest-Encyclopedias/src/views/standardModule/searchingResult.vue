<template>
  <div class="content">
    <div class="lf">
      <div class="lf_tp flex">
        <div class="item standard_total">
          <div class="item_content" ref="item">
            <div
              id="standardStatistics"
              ref="standardStatistics"
              :style="{ width: w + 'px', height: h + 'px' }"
            ></div>
            <div class="flex info">
              <p class="text" >相关标准</p>
              <p class="num">{{ !standardTotal ? 0 : standardTotal }}</p>
            </div>
          </div>
          <Spin size="large" fix v-if="!corrStandard"></Spin>
        </div>
        <div class="item" style="display:flex;align-items: center;">
          <div class="item_content searching_condition">
            <div class="title" style="white-space: nowrap;">行业热搜</div>
            <ul class="list" v-for="item in topSearchList" :key="item.id">
              <li
                :title="item.brzsearchCont"
                @click="HotSearch(item)"
                class="list_li"
              >
                {{ item.brzsearchCont }}
              </li>
            </ul>
          </div>
          <Spin size="large" fix v-if="!topSearchList"></Spin>
        </div>
        <div class="item" style="display:flex;align-items: center;">
          <div class="item_content searching_condition">
            <div class="title" style="white-space: nowrap;">个人足迹</div>
            <ul class="list" v-for="item in historyList" :key="item.id">
              <li
                :title="item.brzsearchCont"
                @click="HotSearch(item)"
                class="list_li"
              >
                {{ item.brzsearchCont }}
              </li>
            </ul>
          </div>
          <Spin size="large" fix v-if="!historyList"></Spin>
        </div>
        <div
          class="item flex"
          style="align-items: center;justify-content: center;"
        >
          <div class="item_content zstp_entrance">
            <img src="../../img/zstpImg.png" @click="jumpzstp" />
            <p @click="jumpzstp">查看标准关系图谱</p>
          </div>
        </div>
      </div>
      <div class="lf_bt">
        <div class="query_module flex">
          <div style="font-weight: 600;font-size: 14px;">
            查询条件：
            <span style="color:#3388ff">
              {{ $store.state.standard.searchingVal }}</span
            >
          </div>
          <!-- <div class="select_item">
            <Select v-model="sortKey" size="small">
              <Option
                v-for="item in sortModeList"
                :value="item.key"
                :key="item.key"
                >{{ item.name }}
              </Option>
            </Select>
          </div>
          <div class="select_item">
            <Select
              v-model="standardSearchConObj.searchHType"
              size="small"
              @on-change="searchChange()"
            >
              <Option value="all">主编单位</Option>
              <Option
                v-for="item in searchHType"
                :value="item.searchCode"
                :key="item.searchCode"
              >
                {{ item.searchValue }}
              </Option>
            </Select>
          </div>
          <div class="select_item">
            <Select
              v-model="standardSearchConObj.sysCode"
              size="small"
              @on-change="searchChange()"
            >
              <Option value="all">体系类别</Option>
              <Option
                v-for="item in sysCode"
                :value="item.searchCode"
                :key="item.searchCode"
              >
                {{ item.searchValue }}
              </Option>
            </Select>
          </div>
          <div class="select_item">
            <Select
              v-model="standardSearchConObj.searchGjbType"
              size="small"
              @on-change="searchChange()"
            >
              <Option value="all">标准状态</Option>
              <Option
                v-for="item in searchGjbType"
                :value="item.searchCode"
                :key="item.searchCode"
              >
                {{ item.searchValue }}
              </Option>
            </Select>
          </div> -->
          <div
            style="flex: 1;display: flex;align-items: center;justify-content: flex-end;"
          >
            <span
              class="btnStyle"
              style="cursor: pointer;"
              @click="demandManage"
              >需求反馈与管理</span
            >
          </div>
        </div>
        <div class="table_am flex">
          <div style="flex: 1;margin-top: 1px;">
            <!-- <ul class="flex">
              <li class="active">技术维度1</li>
              <li>技术维度2</li>
              <li>技术维度3</li>
            </ul> -->
          </div>
          <div class="flex">
            找到<span style="margin: 0px 3px;color: #3388ff;">{{
              dataSource.length
            }}</span
            >条结果
          </div>
          <div class="selected_num">
            (<span style="margin: 0px 3px;"
              >已选<span style="color: #3388ff;margin: 0px 3px;">{{
                selectedNum
              }}</span
              >条</span
            >)
          </div>
          <div class="am flex" @click="clearSelected" style="cursor: pointer;">
            <i class="iconfont icon-lajitong"></i>
            <span>清除已选</span>
          </div>
          <div class="am flex" style="margin-right:0px">
            <i class="iconfont icon-chakan"></i>
            <span @click="jumpzstp">查看标准关系图谱</span>
          </div>
        </div>
        <div class="data_list" ref="listWrap">
          <!-- 别删后期会用 -->
          <!-- <standard-list
                      :columns="columns"
                      :dataSource="dataSource"
                      :total="standardList.length"
                      @change="pageChange"
                      @table_change="table_change"
                      ref="table"
                    ></standard-list> -->
          <div style="padding: 12px 0px 25px 0px">
            <Table
              :columns="columns"
              :data="dataSource"
              :total="standardList.length"
              @on-selection-change="table_change"
              ref="tables"
              :loading="loading"
              border
            ></Table>
          </div>
        </div>
      </div>
    </div>
    <div class="rg">
      <div class="system_module md">
        <tab
          :tabList="systemClassify"
          :tabIndex="classIndex"
          @tabClick="toggleSystemClassify"
        ></tab>
        <div class="list" style="height: 193px;">
          <Spin size="large" fix v-if="!systemList"></Spin>
          <div class="item" v-for="item in systemList" :key="item.sysId">
            <span @click="jumpSystem(item)">{{
              item.parentNames || item.classAllName
            }}</span>
          </div>
          <not-data v-if="systemList && systemList.length == 0"></not-data>
        </div>
      </div>
      <div class="correlation_term md" style="margin-top: 20px;">
        <tab :tabList="[{ text: '相关术语' }]" :tabIndex="0"></tab>
        <div class="list" style="height: 193px;">
          <Spin size="large" fix v-if="!termList"></Spin>
          <div
            class="item flex"
            v-for="(item, index) in termList"
            :key="index"
            @click="toSYDetail(item)"
          >
            <Tooltip
              style="width: 100%;"
              max-width="350"
              theme="light"
              :content="
                item.title +
                  '\n' +
                  '释义来源：' +
                  (item.source ? item.source : '暂无数据')
              "
            >
              <div class="item flex" @click="didClickTerm(item)">
                <span style="width: 50%;" class="name">{{ item.title }}</span>
                <span
                  class="paraphrase"
                  style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                  >释义来源：{{ item.source || "暂无数据" }}</span
                >
              </div>
            </Tooltip>
          </div>
          <not-data v-if="termList && termList.length == 0"></not-data>
        </div>
      </div>
      <div class="correlation_file md" style="margin-top: 20px;">
        <tab :tabList="[{ text: '相关文件' }]" :tabIndex="0"></tab>
        <div class="list" style="height: 193px;">
          <Spin size="large" fix v-if="!corrFiles"></Spin>
          <not-data v-if="corrFiles && corrFiles.length == 0"></not-data>
          <div
            class="item flex"
            v-for="item in corrFiles"
            :key="item.id"
            @click="toFileDetail(item)"
          >
            {{ item.projectName }}
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal2" width="50" footer-hide>
      <p slot="header">
        <span>相关文件</span>
      </p>
      <div class="modallive">
        <p>
          <span>项目代号:</span><span> {{ RelatedDocumentsForm.Code }}</span>
        </p>
        <p>
          <span>项目名称:</span><span>{{ RelatedDocumentsForm.Name }}</span>
        </p>
        <p>
          <span>项目部门:</span
          ><span>{{ RelatedDocumentsForm.department }}</span>
        </p>
        <p>
          <span>项目单位:</span><span>{{ RelatedDocumentsForm.Company }}</span>
        </p>
        <p>
          <span>项目周期:</span><span>{{ RelatedDocumentsForm.cycle }}</span>
        </p>
        <p>
          <span>总概算:</span><span>{{ RelatedDocumentsForm.Estimate }}</span>
        </p>
        <p>
          <span>项目内容:</span><span>{{ RelatedDocumentsForm.content }}</span>
        </p>
        <p>
          <span>评审结论:</span
          ><span>{{ RelatedDocumentsForm.conclusion }}</span>
        </p>
        <p>
          <span>专家意见:</span><span>{{ RelatedDocumentsForm.opinion }}</span>
        </p>
        <p>
          <span>建议经费:</span><span>{{ RelatedDocumentsForm.funds }}</span>
        </p>
      </div>
    </Modal>
    <!--        &lt;!&ndash; 创建体系 &ndash;&gt;-->
    <!-- <create-system ref="createSystem"></create-system> -->
    <!--        &lt;!&ndash; 需求反馈 &ndash;&gt;-->
    <!-- <feed-back-one ref="feedBack"></feed-back-one> -->
  </div>
</template>

<script>
import { standardStatistics } from "@/libs/echarts_uni";
import echarts from "echarts";
import standardList from "@/components/standardList";
import Tab from "@/components/tab";
import notData from "@/components/notData";
import createSystem from "./components/createSystem";
import feedBackOne from "./components/feedBackOne";

import {
  correlationFile,
  correlationTerm,
  GJBClassifierInfer,
  personageRecord,
  searchingResultStandard,
  systemInfer,
  topSearch,
  add_collection_old,
  delete_collection_old,
} from "@/libs/api";

export default {
  name: "searchingResult",
  components: {
    Tab,
    notData,
    standardList,
    createSystem,
    feedBackOne,
  },
  data() {
    return {
      loading: true,
      seach_1: [],
      seach_2: [],
      seach_3: [],
      seach_4: [],
      sortKey: "comprehensive_result",
      sortModeList: [{ key: "comprehensive_result", name: "全部类别" }],
      searchHType: [],
      sysCode: [],
      searchGjbType: [],
      standardSearchConObj: {
        searchHType: "all",
        sysCode: "all",
        searchGjbType: "all",
      },
      topSearchList: null,
      historyList: null,
      columns: [],
      allStandardData: [], //全部标准数据
      standardList: [],
      dataSource: [], //展示的数据
      pageNo: 1,
      pageSize: 10,
      selectedNum: 0,
      corrFiles: null,
      classIndex: 0,
      systemList: null,
      systemClassify: [
        { text: "集团标准体系", type: 1 },
        { text: "国军标体系", type: 4 },
        { text: "832A", type: 2 },
        { text: "832", type: 3 },
      ],
      termList: null,
      corrStandard: null,
      standardTotal: null,
      w: null,
      h: null,
      modal2: false, //相关文件弹框
      RelatedDocumentsForm: {
        Code: "", //代号
        Name: "", //名称
        department: "", //部门
        Company: "", //单位
        cycle: "", //周期
        Estimate: "", //概算
        content: "", //内容
        conclusion: "", //结论
        opinion: "", //意见
        funds: "", //经费
      },
    };
  },
  watch: {
    "$store.state.standard.searchingVal"(value) {
      console.log(value, "===========");
      const { clientWidth } = this.$refs.item;
      this.w = clientWidth;
      this.h = clientWidth * 0.8;
      // 后期解开
      // this.columns = this.columnsData();
      this.topSearchData(); //获取热搜
      this.personageRecordData(); //获取个人足迹
      this.fileData(); // 获取相关文件
      this.term(); //获取相关术语
      this.standardData("comprehensive_result", 1); // 获取标准列表
      this.systemData(); //集团和国军标体系
    },
  },
  mounted() {
    const { clientWidth } = this.$refs.item;
    this.w = clientWidth;
    this.h = clientWidth * 0.8;
    // 后期解开
    // this.columns = this.columnsData();
    this.topSearchData(); //获取热搜
    this.personageRecordData(); //获取个人足迹
    this.fileData(); // 获取相关文件
    this.standardData("comprehensive_result", 1); // 获取标准列表
    this.systemData(); //集团和国军标体系
    this.term(); //获取相关术语
  },
  methods: {
    columnsData() {
      let columns = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "标准号",
          key: "stdNo",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "jumpKey",
                  style: {
                    cursor: "pointer",
                    // color: "#3388ff",
                  },
                  on: {
                    click: () => {
                      this.toBZDetail(params);
                    },
                  },
                },
                params.row.stdNo
              ),
            ]);
          },
        },
        {
          title: "标准名称",
          key: "nameCn",
          align: "center",
          minWidth: 220,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "jumpKey",
                  style: {
                    cursor: "pointer",
                    // color: "#3388ff",
                  },
                  on: {
                    click: () => {
                      this.toBZDetail(params);
                    },
                  },
                },
                params.row.nameCn
              ),
            ]);
          },
        },
        {
          title: "标准级别",
          key: "htype",
          minWidth: 100,
          align: "center",
          filters: this.seach_1,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.htype == value;
          },
        },
        {
          title: "主编单位",
          key: "editor",
          tooltip: true,
          minWidth: 150,
          align: "center",
          filters: this.seach_2,
          filterMethod(value, row) {
            return row.editor.indexOf(value) > -1;
          },
        },
        {
          title: "标准体系",
          key: "sysCode",
          minWidth: 130,
          align: "center",
          render: function(h, params) {
            return h("span", `${params.row.sysCode}${params.row.sysName}`);
          },
          filters: this.seach_3,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.sysCode + row.sysName == value;
          },
        },
        {
          title: "标准状态",
          minWidth: 80,
          key: "stdStatus",
          align: "center",
          render: function(h, params) {
            let className = null;
            let { stdStatus } = params.row;
            if (stdStatus == "计划") {
              className = "plan";
            } else if (stdStatus == "有效") {
              className = "valid";
            } else {
              className = "abolish";
            }
            return h(
              "div",
              {
                class: `${className} stdStatus`,
              },
              stdStatus
            );
          },
          filters: this.seach_4,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.stdStatus == value;
          },
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            // 当前是没有收藏，需要收藏
            if (params.row.standard_fav == 0) {
              return h(
                "div",
                {
                  class: "actionWrap",
                },
                [
                  h("i", {
                    class: "iconfont icon-shoucang",
                    style: {
                      marginRight: "12px",
                    },
                    on: {
                      click: () => {
                        this.add_collection_old_fun(params.row);
                      },
                    },
                  }),
                  h("i", {
                    class: "iconfont icon-icon_zhishiku",
                    on: {
                      click: () => {
                        this.toBZDetail(params);
                      },
                    },
                  }),
                ]
              );
            } else {
              return h(
                "div",
                {
                  class: "actionWrap",
                },
                [
                  h("i", {
                    class: "iconfont icon-shoucang",
                    style: {
                      color: "#EF6C00",
                      marginRight: "12px",
                    },
                    on: {
                      click: () => {
                        this.delete_collection_old_fun(params.row);
                      },
                    },
                  }),
                  h("i", {
                    class: "iconfont icon-icon_zhishiku",
                    on: {
                      click: () => {
                        this.toBZDetail(params);
                      },
                    },
                  }),
                ]
              );
            }
          },
        },
      ];
      return columns;
    },
    //文件详情
    toFileDetail(item) {
      this.modal2 = true;
      console.log(item);
      this.RelatedDocumentsForm = {
        Code: item.projectNo, //代号
        Name: item.projectName, //名称
        department: item.viewDeptName, //部门
        Company: item.unit, //单位
        cycle: item.startYear + "-" + item.startYearEnd, //周期
        Estimate: item.generalCount, //概算
        content: item.projectContent, //内容
        conclusion: item.recordResult, //结论
        opinion: item.expertSuggest, //意见
        funds: item.proposedFunding, //经费
      };
    },
    //术语详情
    toSYDetail(item) {
      this.$router.push({
        path: "/TermDetail",
        query: { id: item.search_id.SYZWMC },
      });
    },
    //标准详情
    toBZDetail(values) {
      this.$router.push({
        path: "/BasicDetail",
        query: { id: values.row.stdNo },
      });
    },
    // 获取标准统计数量
    initStandardStatistics() {
      this.$nextTick(() => {
        const standardTotalEcharts = echarts.init(
          document.getElementById("standardStatistics")
        );
        let option = this.corrStandard.map((item) => ({
          value: item.searchValue,
          name: item.searchCode,
        }));
        let val = this.corrStandard.map((item) => Number(item.searchValue));
        var standardTotal = val.reduce((x, y) => x + y, 0);
        // 获取标准统计数量
        this.standardTotal = standardTotal;
        standardStatistics.series[0].data = option;
        standardTotalEcharts.setOption(standardStatistics);
      });
    },
    //获取标准
    standardData(key) {
      this.loading = true;
      const { searchingVal } = this.$store.state.standard;
      this.$axios(
        `${searchingResultStandard}`,
        "post",
        this.$qs.stringify({
          searchQuery: searchingVal,
          searchCorrelationType: key,
        })
      ).then((res) => {
        const { data } = res;
        if (JSON.stringify(data) == "{}") {
          this.allStandardData = [];
          this.standardList = [];
          this.searchHType = [];
          this.sysCode = [];
          this.searchGjbType = [];
          this.corrStandard = [];
          this.dataSource = [];
          this.initStandardStatistics();
          setTimeout(() => {
            this.loading = false;
          }, 600);
        } else {
          this.allStandardData = data[key];
          this.standardList = data[key];
          this.searchHType = data[`${key}_HType`];
          this.sysCode = data[`${key}_sysName`];
          this.searchGjbType = [];
          this.corrStandard = data[`${key}_echartsHType`];
          // 筛选后期注掉
          let arr_seach = JSON.parse(JSON.stringify(this.standardList));
          this.seach_1 = arr_seach.map((item) => {
            return {
              label: item.htype,
              value: item.htype,
            };
          });
          // 数组对象去重
          let hash1 = {};
          this.seach_1 = this.seach_1.reduceRight((item, next) => {
            hash1[next.value]
              ? ""
              : (hash1[next.value] = true && item.push(next));
            return item;
          }, []);
          this.seach_2 = arr_seach.map((item) => item.editor);
          this.seach_2 = [...new Set(this.seach_2.join(";").split(";"))];
          for (let i = 0; i < this.seach_2.length; i++) {
            const element = this.seach_2[i];
            if (!element) {
              this.seach_2.splice(i, 1);
              i--;
            } else {
              this.seach_2[i] = {
                label: element,
                value: element,
              };
            }
          }
          this.seach_3 = arr_seach.map((item) => {
            return {
              label: item.sysCode + item.sysName,
              value: item.sysCode + item.sysName,
            };
          });
          // 数组对象去重
          let hash3 = {};
          this.seach_3 = this.seach_3.reduceRight((item, next) => {
            hash3[next.value]
              ? ""
              : (hash3[next.value] = true && item.push(next));
            return item;
          }, []);
          this.seach_4 = arr_seach.map((item) => {
            return {
              label: item.stdStatus,
              value: item.stdStatus,
            };
          });
          // 数组对象去重
          let hash4 = {};
          this.seach_4 = this.seach_4.reduceRight((item, next) => {
            hash4[next.value]
              ? ""
              : (hash4[next.value] = true && item.push(next));
            return item;
          }, []);
          // 截止
          this.initStandardStatistics();
          this.userDefinedPageData();
          // 后期注掉
          this.columns = this.columnsData();
          setTimeout(() => {
            this.loading = false;
          }, 600);
        }
      });
    },
    userDefinedPageData() {
      //自定义分页数据
      const { standardList, pageNo, pageSize } = this;
      // const start = (pageNo - 1) * pageSize; // 开始截取的位置
      // const endNum = (pageNo - 1) * pageSize + pageSize;
      // const end = endNum > standardList.length ? standardList.length : endNum; // 结束截取的位置
      // const current = standardList.slice(start, end);
      // this.dataSource = current;
      this.dataSource = standardList;
    },
    // 获取行业热搜
    topSearchData() {
      this.$axios(
        topSearch,
        "post",
        this.$qs.stringify({ brzsearchType: 1 })
      ).then((res) => {
        let { data } = res;
        if (data.code != 500) {
          this.topSearchList = data.length >= 6 ? data.slice(0, 5) : data;
        } else {
          this.$Message.error("获取行业热搜失败");
        }
      });
    },
    // 收藏
    add_collection_old_fun(item) {
      this.$axios(add_collection_old, "post", {
        username: this.$store.state.user.userInfo.username,
        content: {
          type: "标准知识百科",
          name: item.nameCn,
          param: { BZBH: item.stdNo },
        },
      }).then((res) => {
        this.$Message.success("收藏成功");
        this.standardData("comprehensive_result", 1); // 获取标准列表
      });
    },
    // 取消收藏
    delete_collection_old_fun(item) {
      this.$axios(delete_collection_old, "post", {
        username: this.$store.state.user.userInfo.username,
        content: {
          type: "标准知识百科",
          name: item.nameCn,
          param: { BZBH: item.stdNo },
        },
      }).then((res) => {
        this.$Message.success("已取消收藏");
        this.standardData("comprehensive_result", 1); // 获取标准列表
      });
    },
    //点击热搜刷新结果页
    HotSearch(val) {
      this.$store.dispatch("setVal", val.brzsearchCont);
    },
    // 获取个人足迹
    personageRecordData() {
      this.$axios(
        personageRecord,
        "post",
        this.$qs.stringify({ brzsearchType: 2 })
      ).then((res) => {
        let { data } = res;
        if (data.code != 500) {
          this.historyList = data.length >= 6 ? data.slice(0, 5) : data;
        } else {
          this.$Message.error("获取个人足迹失败");
        }
      });
    },
    // 获取集团和国军标体系
    async systemData() {
      this.systemList = null;
      const { type, text } = this.systemClassify.find((item, index) => {
        return index == this.classIndex;
      });

      const { searchingVal } = this.$store.state.standard;
      let url = type == 1 || type == 4 ? systemInfer : GJBClassifierInfer;
      const list = await this.$axios(
        url,
        "post",
        this.$qs.stringify({ searchQuery: searchingVal, classType: type })
      );

      if (type == 1 || type == 4) {
        this.systemList = list.data.system_infer;
        return;
      }
      this.systemList = list.data.allClassList;
      //else if (type == 3) {
      //   this.systemList = list.data.allClassList;
      // } else {
      //   if (list.data.allClassList.length == 0) {
      //     this.systemList = [];
      //   } else {
      //     this.systemList = list.data.allClassList.filter(item => {
      //       return (item.classAllName.charAt(0) == text) == '832A' ? 'B' : 'A';
      //     });
      //   }
      // }
    },
    // 获取相关文件
    fileData() {
      const { searchingVal } = this.$store.state.standard;
      this.$axios(
        correlationFile,
        "post",
        this.$qs.stringify({ searchQuery: searchingVal })
      ).then((res) => {
        if (JSON.stringify(res.data) == "{}") {
          this.corrFiles = [];
        } else {
          this.corrFiles = res.data.reviewRecordList;
        }
      });
    },
    // 获取相关术语
    term() {
      const { searchingVal } = this.$store.state.standard;
      this.$axios(
        correlationTerm,
        "post",
        this.$qs.stringify({ searchQuery: searchingVal })
      ).then((res) => {
        if (res.data.code != 500) {
          this.termList = res.data.data;
        } else {
          this.$Message.error("获取相关术语失败");
        }
      });
    },
    pageChange(page) {
      this.selectedNum = 0;
      this.pageNo = page;
      this.userDefinedPageData();
    },
    table_change(data) {
      this.selectedNum = data.length;
    },
    clearSelected() {
      this.$refs.tables.selectAll(false);
    },
    searchChange() {
      this.pageNo = 1;
      this.$refs.tables.resetPage();
      let tempFilter = {};
      let filterStandard = null;
      for (let key in this.standardSearchConObj) {
        if (this.standardSearchConObj[key] != "all") {
          tempFilter[key] = this.standardSearchConObj[key];
        }
      }
      let keys = Object.keys(tempFilter);
      if (keys.length == 0) {
        filterStandard = this.allStandardData;
      } else {
        filterStandard = this.allStandardData.filter((item) => {
          return (function() {
            let flag;
            for (let k in item) {
              if (tempFilter[k]) {
                if (item[k] == tempFilter[k]) {
                  flag = true;
                } else {
                  flag = false;
                  break;
                }
              }
            }
            return flag;
          })();
        });
      }
      this.standardList = filterStandard;
      this.userDefinedPageData();
    },
    toggleSystemClassify(index) {
      this.classIndex = index;
      // console.log(index);
      this.systemData();
    },
    addSystem() {
      this.$refs.createSystem.showModal();
    },
    demandManage() {
      this.$router.push("/standard/demandAdmin");
    },
    jumpzstp() {
      const selectData = this.$refs.tables.getSelection();
      if (selectData.length == 0) {
        this.$Message.warning("请选择至少一条标准");
        return false;
      }
      console.log(selectData)
      const stdNos = selectData.map((item) => item.stdNo).join(",");
      this.$store.dispatch("setStdNo", stdNos);
      this.$router.push("/standard/standardAtlas");
    },
    jumpSystem(item) {
      if (!item) {
        this.$Message.error("找不到体系id");
      }
      const index = this.classIndex;
      this.$router.push({
        path: "/standard/standardSystem",
        query: { id: item.sysId || item.classId, index },
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../styles/less/standardModule";

.text_hidden_2 {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.data_list {
  /deep/ .ivu-table-cell {
    & > span {
      // display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
    }
  }
}

.flex {
  display: flex;
}

.content {
  overflow: hidden;

  .lf {
    width: 72%;
    float: left;

    .lf_tp {
      background: white;

      .item {
        flex: 1;
        border-right: 1px solid #efefef;
        padding: 20px;
        position: relative;

        &:first-of-type {
          padding: 20px 10px;
        }

        &:last-of-type {
          border-right: none;
        }
      }

      .item_content {
        position: relative;
      }

      .standard_total .info {
        flex-direction: column;
        text-align: center;
        margin-top: -25px;
        color: #333333;

        .text {
          font-size: 16px;
        }

        .num {
          font-size: 21px;
          font-weight: bold;
        }
      }

      .searching_condition {
        .title {
          font-size: 15px;
          font-weight: bold;
          position: relative;
          text-indent: 12px;
        }

        .title:before {
          content: "";
          width: 3px;
          height: 15px;
          background: #3388ff;
          position: absolute;
          left: 0px;
          top: 3px;
        }

        .list {
          margin-top: 20px;

          li {
            font-size: 14px;
            color: #60636f;
            position: relative;
            text-indent: 12px;
            margin-bottom: 18px;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            cursor: pointer;

            &:last-of-type {
              margin-bottom: 0px;
            }
          }

          li:before {
            content: "";
            width: 5px;
            height: 5px;
            background: #bbbbbb;
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
          }
        }
      }

      .zstp_entrance {
        cursor: pointer;
        text-align: center;

        p {
          margin-top: 22px;
          font-size: 15px;
          color: #005ea7;
        }
      }
    }

    .lf_bt {
      background: white;
      margin-top: 20px;
      padding: 0px 20px;

      .query_module {
        padding: 10px 0px;
        border-bottom: 1px solid #eeeeee;

        .select_item {
          padding: 0px 15px;
          position: relative;

          /deep/ .ivu-select-selection {
            border: none;
          }

          /deep/ .ivu-select-visible .ivu-select-selection {
            box-shadow: 0 0 0 0px transparent;
            border: none;
          }
        }

        .select_item:after {
          content: "";
          width: 1px;
          height: 16px;
          background: #dfdfdf;
          position: absolute;
          right: 0px;
          top: 4px;
        }

        .select_item:first-of-type {
          padding-left: 0px;
        }
      }

      .table_am {
        .am {
          cursor: pointer;
        }

        ul {
          li {
            margin-right: 40px;
            font-size: 14px;
            position: relative;
          }

          &:last-of-type {
            margin-right: 0px;
          }

          .active {
            font-weight: bold;
          }

          .active:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background: #3388ff;
            bottom: -12px;
            left: 0px;
          }
        }
      }
    }
  }

  .rg {
    width: calc(28% - 20px);
    float: left;
    margin-left: 20px;

    .system_module {
      .item {
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        cursor: pointer;
      }

      /deep/ .tab_type li {
        margin-right: 25px;
        white-space: nowrap;
      }
    }

    .correlation_term {
      .item {
        .name {
          flex: 1;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          cursor: pointer;
        }

        .source {
          color: #a3a6ad;
        }
      }
    }

    .correlation_file {
      .item {
        cursor: pointer;
      }
    }

    .md {
      background: white;
      padding: 0px 16px 19px 16px;

      .list {
        border-top: 1px solid #efefef;
        margin-top: -1px;
        padding-top: 19px;
        position: relative;
        overflow: auto;
        .item:hover {
          color: #3388ff;
        }
        .item {
          margin-bottom: 17px;
          font-size: 14px;
          &:last-of-type {
            margin-bottom: 0px;
          }
        }
      }
    }

    /deep/ .tab_type {
      padding-left: 0px;
      white-space: nowrap;
    }

    /deep/ .tab_type li {
      margin-right: 30px;
      white-space: nowrap;
    }
  }
}
.modallive {
  max-height: 450px;
  overflow-x: auto;
  p {
    font-size: 14px;
    display: flex;
    span {
      width: 100px;
      text-align: right;
      display: inline-block;
      margin-bottom: 5px;
      margin-right: 10px;
    }
    span:last-child {
      width: 80%;
      // max-height: 100px;
      overflow-x: auto;
      text-align: left;
    }
  }
}
.btnStyle {
  color: #005ea7;
}
/deep/ .actionWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-checkbox-wrapper-checked {
  display: none;
}
/deep/ .ivu-table-cell {
  padding-right: 10px;
  padding-left: 10px;
}

/deep/ .actionWrap i {
  font-size: 18px;
  cursor: pointer;
}
/deep/ .jumpKey:hover {
  color: #3388ff;
}
/deep/ .stdStatus {
  width: 42px;
  height: 22px;
  text-align: center;
  line-height: 23px;
  margin: 0 auto;
  border-radius: 3px;
}
/deep/ .valid {
  background: rgba(255, 120, 4, 0.15);
  color: #ff7804;
}
/deep/ .plan {
  background: rgba(51, 136, 255, 0.15);
  color: #3388ff;
}
/deep/ .abolish {
  background: rgba(121, 121, 121, 0.15);
  color: #797979;
}
.list_li:hover {
  color: #3388ff !important;
}
.jumpKey {
  line-height: 20px;
}
</style>
