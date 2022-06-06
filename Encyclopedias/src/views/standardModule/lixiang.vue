<template>
  <div>
    <tab :tabList="tabList" :tabIndex="tabIndex" class="tab" @tabClick="toggleNav"></tab>
    <div class="content">
      <!-- 左侧的树 -->
      <div class="content_l">
        <div>
          <Input search @on-search="searchTree" placeholder="请输入分类名称或分类号" v-model="treeVal">
          </Input>
          <div class="tree" v-if="treeData">
            <Tree :data="treeData" :show-checkbox="false" :render="renderContent" @on-select-change="treeChange"></Tree>
          </div>
        </div>
      </div>
      <!-- 右侧的内容 -->
      <div class="content_r">
        <!-- 第一层 -->
        <div class="sort_module">
          <div class="sort_module flex" v-show="false">
            <sort v-for="(item, index) in sortList" :sortType="item.sortType" :text="item.text" :key="item.key"
              @sort="sort(item.key, index)"></sort>
          </div>
          <div class="sort_module_r">
            <Select v-model="model8" clearable style="width:180px" @on-change="Select_change_1">
              <Option v-for="item in TypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!-- 请输入分类名称或分类号 -->
            <Input style="margin-left:12px" @on-search="editContentToSearch()" search :placeholder="Input_placeholder"
              v-model="treeVal2"></Input>
          </div>
        </div>
        <!-- 第二层 -->
        <div class="sort_module sort_btn">
          <div class="sort_btn_l">
            <Button type="primary" @click="queryReport" style="margin-right: 20px;">查新报告（相关性查询报告）</Button>
            <Button type="primary" @click="assessSort">立项评估排序</Button>
          </div>
          <div class="sort_btn_r">
            <Button type="primary" @click="newFeedback">新增需求</Button>
            <Button type="primary" @click="editFeedback">编辑</Button>
            <Button type="primary" @click="deleteFeedback">删除</Button>
            <!-- <Button type="primary" @click="toGraph">查看图谱</Button> -->
            <!-- <Button type="primary" @click="exportData">数据导出</Button>
            <Button type="primary" @click="generateReport">生成报告</Button> -->
          </div>
        </div>
        <!-- 第三册tbale表格 -->
        <div class="table_cont">
          <Table style="width:100%" border ref="selection" :columns="tableTitle" :loading="spinShow" :data="tableData"
            @on-selection-change="selectRow"></Table>
          <div class="page_number_list">
            <div>
              每页{{ this.pageSize }}条,共计{{
                Math.ceil(this.total / this.pageSize)
              }}页
            </div>
            <div>
              <Page :total="total" :page-size="pageSize" @on-change="changePageNum" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <feed-back ref="feedBack" :demandItem="seleteItem" :tabList="tabList" @saveFinish="saveFinish"></feed-back>
    <feed-back-three ref="feedBackThree" :demandItem="seleteItem" :tabList="tabList" @saveFinish="saveFinish">
    </feed-back-three>
    <new-demand ref="newDemand" :tabList="tabList" :treeList="treeData" @saveFinish="saveFinish"></new-demand>
    <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
    <Modal v-model="delBtn" width="360" class="delStyle">
      <p slot="header" style="text-align:left;">
        <span>删除</span>
      </p>
      <div style="text-align:center">
        <p>您已选择{{ delBtnNum }}条需求，请确认是否删除？</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="del">确定</Button>
        <Button @click="delclose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import tab from "@/components/tab"; //顶部消息
  import sort from "@/components/sort"; //右侧筛选
  import {
    construct
  } from "@aximario/json-tree";
  import feedBack from "./components/feedBack.vue";
  import feedBackThree from "./components/feedBackThree.vue";
  import newDemand from "./components/newDemand.vue";
  import axios from "axios";

  import {
    stdDemandQuery, //表格
    stdDemandQuery1, //智能排序

    stdDemandTreeDatas, //管理体系树
    stdExportExcel, // 数据
    stdDemandExportReport, // 生成报告
    stdDemandDelete, //删除
  } from "@/libs/api"; //获取接口
  import {
    toExcel
  } from "@/excel/file";
  import fileDownload from "js-file-download";
  export default {
    name: 'lixiang',
    components: {
      tab,
      sort,
      feedBack,
      newDemand,
      feedBackThree,
    },
    props: {},
    data() {
      return {
        sortTime: true,
        sortField: "",
        Input_placeholder: "请输入需求编号",
        delBtn: false, //删除弹窗
        delBtnNum: "1", //删除条数
        spinShow: false,
        // 顶部列表信息
        tabList: [{
            text: "集团标准体系",
            treeApi: "standard",
            stdType: 1
          },
          {
            text: "国军标体系",
            treeApi: "standard",
            stdType: 0
          },
          {
            text: "832A",
            treeApi: "standard",
            stdType: 3
          },
          {
            text: "832",
            treeApi: "standard",
            stdType: 2
          },
        ],
        sortList: [
          //排序列表
          {
            text: "发布日期",
            key: "pub_date"
          },
          {
            text: "智能排序",
            key: "implement_date"
          },
        ],
        treeVal: "", //左侧树的关键字搜索
        treeVal2: "", //右侧树的关键字搜索
        treeData: null, //左侧树的数据
        tabIndex: 0, //默认下标
        selectedNum: 0, //表格选中的数据的条数
        TypeList: [
          // 右侧下拉框
          {
            value: "demandId",
            label: "需求编号"
          },
          {
            value: "demandName",
            label: "需求名称",
          },
          {
            value: "scope",
            label: "用途或场景",
          },
          // {
          //   value: "stdType",
          //   label: "建议分类体系",
          // },
          {
            value: "stdSystemId",
            label: "建议分类号",
          },
          {
            value: "problem",
            label: "存在问题",
          },
          {
            value: "content",
            label: "标准编制内容",
          },
          // {
          //   value: "user",
          //   label: "提出人",
          // },
          // {
          //   value: "createDept",
          //   label: "所属部门",
          // },
          // {
          //   value: "createTime",
          //   label: "提出时间",
          // },
          // {
          //   value: "status",
          //   label: "状态",
          // },
          // {
          //   value: "relatedFile",
          //   label: "相关文件",
          // },
          // {
          //   value: "createDept",
          //   label: "提出人所属单位",
          // },
        ],
        currentChoose: '',
        tableTitle: [{
          title:'选择',
            width: 80,
            align: "center",
            key: 'checkBox',
            _isChecked: false,
            resizable: true,
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                  props: {
                    value: params.row.checkBox
                  },
                  on: {
                    'on-change': (e) => {
                      
                      this.selection=[];
                      this.tableData.forEach((items) => {
                        this.$set(items, 'checkBox', false)
                      });
                      this.tableData[params.index].checkBox = e;
                      this.selection.push(this.tableData[params.index]);
                    }
                  }
                })
              ])
            }
          },

          {
            title: "需求编号",
            tooltip: true,
            key: "demandId",
            minWidth: 150,
            align: "center",
          },
          // {
          //   title: '标准名称',
          //   key: 'demandId',
          //   align: 'center',
          // },
          {
            title: "需求名称",
            tooltip: true,
            minWidth: 150,
            key: "demandName",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("Tooltip", [
                  h(
                    "span", {
                      style: {
                        cursor: "pointer",
                        display: "inline-block",
                        width: params.column._width * 0.8 + "px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        paddingTop: "7px",
                      },
                      on: {
                        click: () => {
                          this.toPage(params.row, params.row.stdSystemId);
                        },
                      },
                    },
                    params.row.demandName
                  ), // 表格显示文字
                  h(
                    "div", {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.demandName // 气泡内的文字
                  ),
                ]),
              ]);
            },
          },
          {
            title: "用途或场景",
            tooltip: true,
            minWidth: 200,
            key: "scope",
            align: "center",
          },
          {
            title: "建议分类体系",
            minWidth: 130,
            key: "stdType",
            align: "center",
            render: function (h, params) {
              if (params.row.stdType == 0) {
                return h("span", {}, "国军标体系");
              } else if (params.row.stdType == 1) {
                return h("span", {}, "集团标准体系");
              } else if (params.row.stdType == 2) {
                return h("span", {}, "832");
              } else if (params.row.stdType == 3) {
                return h("span", {}, "832A");
              }
            },
          },
          {
            title: "建议分类号",
            key: "stdSystemId",
            minWidth: 150,
            tooltip: true,
            align: "center",
          },
          {
            title: "存在问题",
            key: "problem",
            minWidth: 200,
            tooltip: true,
            align: "center",
          },
          {
            title: "标准编制内容",
            key: "content",
            tooltip: true,
            minWidth: 150,
            align: "center",
          },
          // {
          //   title: "参考文件",
          //   key: "relatedFile",
          //   tooltip: true,
          //   minWidth: 130,
          //   align: "center",
          // },
          {
            title: "提出人",
            key: "createBy",
            tooltip: true,
            minWidth: 100,
            align: "center",
            // render: function(h, params) {
            //   return h("span", {}, "admin");
            // },
          },
          {
            title: "所属部门",
            key: "createDept",
            tooltip: true,
            minWidth: 300,
            align: "center",
            // render: function(h, params) {
            //   return h("span", {}, "航空工业综合技术研究所");
            // },
          },
          {
            title: "提出时间",
            key: "createTime",
            tooltip: true,
            minWidth: 120,
            align: "center",
          },
          {
            title: "状态",
            key: "status",
            minWidth: 100,
            align: "center",
            render: function (h, params) {
              if (params.row.status == 1) {
                return h("span", {}, "有效");
              } else if (params.row.status == 0) {
                return h("span", {}, "无效");
              }
            },
          },
        ],
        tableData: [],
        model8: "demandId",
        sortType: "",
        isAIsort: 0,
        valid: "全部",
        selectTreeItem: "",
        total: 0,
        pageSize: 10,
        pageNum: 1,
        selection: [], // 选中的数据
        seleteItem: {},
      };
    },
    watch: {},
    computed: {},
    methods: {
      // 查询报告页面打开
      queryReport() {
        // this.$router.push("/standard/queryResult");
        if(this.selection.length==0){
          this.$Message.error("请选择节点");
          return;
        }
        this.$router.push({
          path: "/standard/queryResult",
          query: {
            data: JSON.stringify(this.selection),
            fristFlag:true
          },
        });

      },
      Select_change_1(value) {
        if (value == "demandId") {
          this.Input_placeholder = "请输入需求编号";
        } else if (value == "demandName") {
          this.Input_placeholder = "请输入需求名称";
        } else if (value == "scope") {
          this.Input_placeholder = "请输入用途或场景";
        } else if (value == "stdSystemId") {
          this.Input_placeholder = "请输入建议分类号";
        } else if (value == "problem") {
          this.Input_placeholder = "请输入存在问题";
        } else if (value == "content") {
          this.Input_placeholder = "请输入标准编制内容";
        } else if (value == "") {
          this.Input_placeholder = "";
        }
      },
      toPage(val, id) {
        this.$refs.feedBackThree.showModule(val, id);
      },
      //新增需求
      newFeedback() {
        console.log(this.tabList[this.tabIndex]);
        if (this.selectTreeItem.length > 0) {
          this.$refs.newDemand.showModule(
            "",
            this.selectTreeItem[0].title,
            this.tabList[this.tabIndex],
            this.selectTreeItem[0].sysCode
          );
        } else {
          this.$Message.error("请选择节点");
        }
      },
      delclose() {
        this.delBtn = false;
      },
      saveFinish() {
        this.pageNum = 1;
        this.sysManagetreeData();
        this.listData();
      },
      //表数据选中或取消选中是执行
      selectRow(selection) {
        this.selection = selection;
      },
      // 删除需求
      deleteFeedback() {
        if (this.selection.length > 0) {
          this.delBtnNum = this.selection.length;
          this.delBtn = true;
        } else {
          this.$Message.error("请选中数据进行删除");
        }
      },
      //确认删除
      del() {
        var array = this.selection.map((item) => {
          return item.demandId;
        });
        const parameter = {
          ids: array,
        };
        this.$axios(stdDemandDelete, "post", parameter).then((res) => {
          if (res.data.code != "500") {
            this.$Message.success(res.data.msg);
            this.sysManagetreeData();
            this.listData();
            this.delBtn = false;
          } else {
            this.$Message.error(res.data.msg);
          }
        });
      },
      // 编辑 跳标准需求反馈说明弹窗进行编辑，保存则生效。
      editFeedback() {
        if (this.selection.length > 1) {
          this.$Message.error("只能选中一条数据进行编辑");
          return;
        }
        if (this.selection.length > 0) {
          this.seleteItem = this.selection[0];
          if (this.seleteItem.stdSystemId) {
            console.log(
              this.seleteItem,
              "---",
              this.seleteItem.stdSystemId,
              "---"
            );
            this.$refs.feedBack.showModule(
              this.seleteItem,
              this.seleteItem.stdSystemId
            );
          } else {
            this.$Message.error("当前数据没有节点");
          }
        } else {
          this.$Message.error("请选中一条数据进行编辑");
        }
      },

      // 查看图谱
      toGraph() {
        // if (this.selection.length > 1) {
        //   this.$Message.error("只能选中一条数据查看图谱");
        //   return;
        // }
        if (this.selection.length > 0) {
          // this.seleteItem = this.selection[0];
          const stdNos = this.selection.map((item) => item.demandId).join(",");
          console.log(stdNos, "stdNos");
          this.$store.dispatch("setStdNo", stdNos);
          this.$router.push("/standard/standardAtlas");
        } else {
          this.$Message.error("请选中一条数据查看图谱");
        }
      },
      // 导出数据
      exportData() {
        if (this.selection.length > 0) {
          const stdNos = this.selection.map((item) => item.id).join(",");
          const parameter = {
            id_list: stdNos,
          };
          this.spinShow = true;
          const header = {
            token: this.$store.state.user.userInfo.token,
          };
          this.axios({
            url: stdExportExcel,
            method: "post",
            params: parameter,
            responseType: "blob",
            headers: header,
          }).then((res) => {
            setTimeout(() => {
              this.spinShow = false;
            }, 500);
            let blob = new Blob([res.data], {
              type: "application/msword"
            });
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); // 创建下载的链接
            downloadElement.href = href;
            let fileName = res.headers["content-disposition"].substring(
              res.headers["content-disposition"].indexOf("filename=") + 9,
              res.headers["content-disposition"].length
            );
            downloadElement.download = decodeURIComponent(fileName); // 下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); // 点击下载
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放blob对象
          });
        } else {
          this.$Message.error("请选中一条数据导出");
        }
      },
      // 生成报告
      generateReport() {
        // if (this.selection.length > 1) {
        //   this.$Message.error("只能选中一条数据生成报告");
        //   return;
        // }
        if (this.selection.length > 0) {
          var item = this.selection[0];
          var status = "";
          if (this.valid == "有效") {
            status = 1;
          } else if (this.valid == "无效") {
            status = 0;
          } else if (this.valid == "全部") {
            status = "";
          }
          const {
            stdType
          } = this.tabList[this.tabIndex];
          const stdNos = this.selection.map((item) => item.id).join(",");
          console.log(stdNos, "stdNos");

          const parameter = {
            id_list: stdNos,
          };
          console.log(parameter);
          const header = {
            token: this.$store.state.user.userInfo.token,
          };
          // axios.get('http://10.216.6.231:9994/standard/zhjb/stdDemand/exportReport').then(res => {
          //
          // })
          this.axios({
            url: stdDemandExportReport,
            method: "get",
            headers: header,
            params: parameter,
            responseType: "blob",
          }).then((res) => {
            let blob = new Blob([res.data], {
              type: "application/msword"
            });
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); // 创建下载的链接
            downloadElement.href = href;
            let fileName = res.headers["content-disposition"].substring(
              res.headers["content-disposition"].indexOf("filename=") + 9,
              res.headers["content-disposition"].length
            );
            downloadElement.download = decodeURIComponent(fileName); // 下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); // 点击下载
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放blob对象
          });
        } else {
          this.$Message.error("请选中一条数据生成报告");
        }
      },

      // 左侧搜索
      searchTree() {
        this.sysManagetreeData();
      },

      // 有效 无效
      changeStatus() {
        this.pageNum = 1;
        this.listData();
      },

      // 切换第几页
      changePageNum(num) {
        this.pageNum = num;
        this.listData();
      },

      // 排序
      sort(key, index) {
        if (key == 'implement_date') {
          this.sortTime = false;
        } else {
          this.sortTime = true;
        }
        this.sortField = "createTime";
        this.pageNum = 1;
        this.sortList.forEach((t, i) => {
          if (i != index) t.sortType = null;
        });
        this.sortList[index].sortType = this.sortList[index].sortType ?
          this.sortList[index].sortType == "asc" ?
          "desc" :
          "asc" :
          "asc";
        this.sortType = this.sortList[index].sortType;
        this.isAIsort = index === 0 ? 0 : 1;
        this.listData();
        this.$forceUpdate();
      },
      // 获取体系树
      sysManagetreeData(id) {
        this.selection.length = 0;
        const {
          stdType
        } = this.tabList[this.tabIndex];
        var par = {
          // this.treeVal = this.treeVal!='':this.treeVal2
          searchQuery: this.treeVal,
          stdType,
        };
        if (this.selectTreeItem && this.selectTreeItem.length > 0) {
          par.systemid = this.selectTreeItem[0].sysCode;
        }
        this.$axios(stdDemandTreeDatas, "get", par).then((res) => {
          const {
            data
          } = res;
          if (data.code != 500) {
            let treeList = this.filterTreeData(data);
            this.treeData = treeList;
            // for (i = 0; i < treeList.length; i++) {
            //   if (treeList[i].pid == "0" || treeList[i].pid == "-1") {
            //     alert(treeList[i].name);
            //   }
            // }
            //
            this.treeData.forEach((item, index) => {
              if (item.pId == "0" || item.pId == "-1") {
                item.disabled = true;
              }
            });
            if (this.selectTreeItem && this.selectTreeItem.length > 0) {
              this.selectTreeItem = [];
            }
          } else {
            this.$Message.error("获取体系树异常！");
          }
        });
        // this.listData();
      },
      // 树的值改变
      treeChange(data) {
        if (data.length != 0) {
          this.pageNum = 1;
          this.selectTreeItem = data;
          this.treeIds = this.getTreeIds(data, []);
          this.listData();
          this.treeData.forEach((item, index) => {
            if (item.pId == "0" || item.pId == "-1") {
              item.disabled = true;
            }
          });
        }
      },
      // 树的渲染条件
      renderContent(h, {
        root,
        node,
        data
      }) {
        return h(
          "span", {
            style: {
              display: "inline-block",
              width: "100%",
            },
          },
          [
            h("span", [
              h("Icon", {
                props: {
                  type: node.children ?
                    "ios-folder-outline" : "ios-document-outline",
                },
                style: {
                  marginRight: "8px",
                },
              }),
              h("span", data.title),
            ]),
          ]
        );
      },
      tree(result) {
        let newData = this.deepClone(result);
        return this.recursionTree(newData);
      },
      // 筛选树的数据
      filterTreeData(data) {
        let result = construct(data, {
          id: "id",
          pid: "pId"
        });
        const treeData = this.tree(result);
        return treeData;
      },
      // 递归树
      recursionTree(data) {
        data.forEach((item) => {
          let len = item.children && item.children.length > 0;
          if (item.pId == "0" || item.pId == "-1") {
            item.expand = true;
            item.disabled = true;
          }
          item.title = item.name;
          if (len) {
            this.recursionTree(item.children);
          }
        });
        return data;
      },
      // 获取树ID
      getTreeIds(data, idArr) {
        data.forEach((item) => {
          idArr.push(item.id);
          if (item.children && item.children.length != 0) {
            this.getTreeIds(item.children, idArr);
          }
        });
        return idArr;
      },
      // 定义一个深拷贝函数  接收目标target参数
      deepClone(target) {
        // 定义一个变量
        let result;
        // 如果当前需要深拷贝的是一个对象的话
        if (typeof target === "object") {
          // 如果是一个数组的话
          if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
              // 递归克隆数组中的每一项
              result.push(this.deepClone(target[i]));
            }
            // 判断如果当前的值是null的话；直接赋值为null
          } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
          } else if (target.constructor === RegExp) {
            result = target;
          } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
              result[i] = this.deepClone(target[i]);
            }
          }
          // 如果不是对象的话，就是基本数据类型，那么直接赋值
        } else {
          result = target;
        }
        // 返回最终结果
        return result;
      },

      // 头部切换导航
      toggleNav(index) {
        if (this.tabIndex != index) {
          this.pageNum = 1;
          this.selectTreeItem = [];
          this.tabIndex = index;
          this.treeData = null;
          this.selection.length = 0;
          this.valid = "全部";
          this.sysManagetreeData();
          this.listData();
        }
      },
      changeSelected() {
        // if (this.treeVal2 && this.treeVal2.length > 0) {
        this.listData();
        // }
      },

      editContentToSearch() {
        this.pageNum = 1;
        if (this.model8 == "demandId" || this.model8 == "stdSystemId") {
          var numReg = /^[0-9]*$/;
          var numRe = new RegExp(numReg);
          if (!numRe.test(this.treeVal2)) {
            this.$Message.error("请输入数字");
            return;
          }
        }
        if (this.treeVal2 && this.treeVal2.length > 0) {
          if (this.model8 && this.model8.length > 0) {
            this.sysManagetreeData();
            this.listData();
          } else {
            this.$Message.error("请选择搜索类型");
          }
        } else {
          this.sysManagetreeData();
          this.listData();
        }
      },
      // 获取列表
      listData() {
        this.selection.length = 0;
        this.spinShow = true;
        var status = "";
        if (this.valid == "有效") {
          status = 1;
        } else if (this.valid == "无效") {
          status = 0;
        }
        const {
          stdType
        } = this.tabList[this.tabIndex];
        const parameter = {
          stdType: stdType, //  --建议分类体系 0-GJB;1-AVIC;2-832;3-832A
          status: status, //  -- 状态 0-有效、1-无效
          isAIsort: this.isAIsort, // 1为智能排序，默认进入为0，走普通时间排序。
          sortType: this.sortType, //  – 排序方式 （asc或desc）
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          sortField: "create_time",
        };
        if (this.selectTreeItem && this.selectTreeItem.length > 0) {
          parameter.stdSystemId = this.selectTreeItem[0].sysCode; //  --建议分类号
        }
        if (this.model8 === "demandId") {
          // --需求编号
          parameter.demandId = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "demandName") {
          //  --需求名称
          parameter.demandName = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "scope") {
          //  --用途或场景
          parameter.scope = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "stdType") {
          //  --建议分类体系
          parameter.stdType = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "stdSystemId") {
          //  --建议分类号
          parameter.stdSystemId = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "problem") {
          //  --存在问题
          parameter.problem = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "content") {
          //  --标准编制内容
          parameter.content = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "user") {
          //  --提出人
          parameter.user = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "createDept") {
          //  --所属部门
          parameter.createDept = this.treeVal2;
          parameter.isAIsort = 0;
        } else if (this.model8 === "createTime") {
          //  --提出时间
          parameter.createTime = this.treeVal2;
          parameter.isAIsort = 0;
        }
        // else if (this.model8 === "relatedFile") {
        //   //  --相关文件
        //   parameter.relatedFile = this.treeVal2;
        //   parameter.isAIsort = 0;
        // }
        else if (this.model8 === "status") {
          //  --状态
          parameter.status = this.treeVal2;
          parameter.isAIsort = 0;
        }
        //gk_要求 选择下拉框时排序按默认的时间排序
        let sortUrl = "";
        let sortMethod = "";
        this.sortTime = true;
        if (!this.sortTime) {
          sortUrl = stdDemandQuery1;
          sortMethod = "post";
        } else {
          sortUrl = stdDemandQuery;
          sortMethod = "get";

        }

        this.$axios(sortUrl, sortMethod, parameter).then((res) => {
          -setTimeout(() => {
            this.spinShow = false;
          }, 500);
          const {
            data
          } = res;
          if (data.code != 500) {
            const _this = this;
            _this.total = data.total;
            _this.tableData = data.list;
            if (this.erd) {
              this.erd.listenTo(this.$refs.data, function (element) {
                _this.maxHeight = `${element.clientHeight}px`;
              });
            }
          } else {
            this.$Message.error("获取列表异常！");
          }
        });
        setTimeout(() => {
          this.spinShow = false;
        }, 500);
      },
    },
    created() {},
    mounted() {
      const {
        index,
        id
      } = this.$route.query;
      if (index != null && index != undefined) {
        this.tabIndex = index;
      }
      // 获取树
      this.sysManagetreeData(id);
      this.listData();
    },
  };
</script>
<style lang="less" scoped>
  .treeValBox {
    .ivu-btn {
      color: #fff;
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      border-radius: 0;
    }
  }

  .content {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 250px);
    display: flex;
    margin-top: 20px;

    // 左侧树
    .content_l {
      width: 300px;
      min-height: 30px;
      padding-top: 20px;
      padding-left: 16px;
      padding-right: 16px;
      background: #ffffff;
      margin-right: 20px;

      .tree {
        overflow: auto;
      }
    }

    // 右侧内容
    .content_r {
      flex: 1;
      width: calc(100% - 320px);
      min-height: 30px;
      background: #ffffff;
      padding: 0px 20px;
      box-sizing: border-box;

      // 第一层
      .sort_module {
        height: 46px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ececec;

        .sort_module_l {
          display: flex;
          height: 16px;

          &>div {
            font-size: 14px;
            padding: 0 14px;
            line-height: 16px;
            border-right: 1px solid #ececec;
          }
        }
      }

      // 第二层
      .sort_btn {
        display: flex;
        justify-content: space-between;

        .sort_btn_l {
          display: flex;

          &>div {
            margin-right: 30px;
          }
        }

        .sort_btn_r {
          /deep/ .ivu-btn {
            width: 70px;
            height: 28px;
            padding: 0;
            margin-left: 8px;
          }
        }
      }

      // 第三层
      .table_cont {
        overflow: hidden;

        // tbale表格
        // table 的页码
        .page_number_list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }
      }
    }

    .sort_module_r {
      display: flex;
    }

    .sort_module {
      padding: 12px 0px;

      /deep/ .sort {
        padding: 0px 15px;
        position: relative;
      }

      /deep/ .sort:before {
        position: absolute;
        width: 1px;
        height: 18px;
        content: "";
        background: #dddddd;
        right: 0px;
        top: 2px;
      }

      /deep/ .sort:first-of-type {
        padding-left: 0px;
      }
    }
  }

  .delStyle {
    /deep/ .ivu-modal-header {
      padding: 8px 16px;
    }

    /deep/ .ivu-modal-close {
      top: 3px;
    }

    /deep/ .ivu-btn {
      width: 60px;
      height: 28px;
      font-size: 14px;
    }
  }
</style>