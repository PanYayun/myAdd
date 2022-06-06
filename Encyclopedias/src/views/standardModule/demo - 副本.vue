<template>
  <div>
    <div class="content">
      <div class="content_l">
        <div class="content_l_title">
          我的知识体系
        </div>
        <div style="padding:0 16px;box-sizeing:border-box;">
          <div class="content_l_title_search">
            <Select v-model="treeSearchVal" style="width:150px;" @on-change="tree_change" default-label="treeSearchVal"
              placeholder="已存在知识体系">
              <Option v-for="item in treeSearchList" :value="item.value" :key="item.value">{{ item.label }}
              </Option>
            </Select>
            <Button type="primary" class="system_btn" @click="addNewProject">新建</Button>
            <!-- <Button type="primary" class="system_btn" @click="editNewProject"
              >编辑</Button
            > -->
          </div>
          <div style="">
            <Button type="primary" class="edit_btn" @click="nodeEdit" v-show="editBtnShow" size="small"
              style="position: absolute;right: 6px;z-index: 2;">编辑</Button>
            <Spin size="large" fix v-show="spinShow"></Spin>
            <Tree class="user_tree" :data="treeData" :show-checkbox="false" :render="renderContent"
              @on-select-change="treeChange" @sendTreeData="setTreeData" z-index="1" v-show="!editBtnShow"
              :loading="spinShow"></Tree>
            <Tree class="user_tree" :data="treeData" :show-checkbox="false" :render="renderContent1"
              @on-select-change="treeChange" @sendTreeData="setTreeData" z-index="1" v-show="editBtnShow"
              :loading="spinShow"></Tree>
          </div>
          <div>
            <Button type="primary" class="add_btn bottom_btn" @click="nodeAdd" v-show="addBtnShow"
              size="small">补充</Button>
            <Button type="primary" class="save_btn bottom_btn" @click="nodeSave" v-show="saveBtnShow"
              size="small">保存</Button>
          </div>
        </div>
      </div>
      <div class="content_r">
        <!-- 查询条件 -->
        <div class="query_module">
          <!-- 查询头部 -->
          <div class="query_title" style="justify-content: space-between;">
            <span>查询标准</span>
            <Select v-model="serchTypeVal" @on-change="miji_change" style="width: 100px;margin-right: 20px;"
              placeholder="已存在知识体系">
              <Option v-for="item in searchTypeList" :value="item.value" :key="item.value">{{ item.label }}
              </Option>
            </Select>
            <Input search placeholder="请输入标准号或标准名称关键字进行搜索" style="width: 310px" v-model="searchVal"
              @on-search="conditionData"></Input>
          </div>
          <!-- 查询内容 -->
          <div class="searchCont">
            <ul class="searchCont_all">
              <li class="searchCont_li" :key="index" v-for="(search, index) in dataSearch">
                <div class="searchCont_li_l">{{ search.standDataTittle }}</div>
                <div class="searchCont_li_r" ref="wrap" :style="{
                    height: search.isOpen ? search.openH : search.closeH,
                  }">
                  <div @click="
                      selectedCondition(
                        item.standId,
                        item.standName,
                        item.standCounts
                      )
                    " :key="index" :id="item.standId" v-for="(item, index) in search.stands">
                    {{ item.standName }}
                  </div>
                </div>
                <div class="more" @click="fold(index)" v-if="search.openH != '30px'">
                  <span>{{ search.isOpen ? "收起" : "展开" }}</span>
                  <i class="iconfont icon-shouqi" :style="{
                      transform: search.isOpen
                        ? 'rotate(0deg)'
                        : 'rotate(-180deg)',
                    }"></i>
                </div>
              </li>
            </ul>
            <div class="searchCont_all">
              <li class="searchCont_li">
                <div class="searchCont_li_l">检索条件：</div>
                <div class="searchCont_li_r">
                  <div class="item" v-for="(item, indexs) in conditionList" :key="item.standId">
                    <span>{{ item.standName }}</span>
                    <i class="iconfont icon-cuowu" @click="clearCondition(indexs)"></i>
                  </div>
                  <div class="reset_condition" v-if="conditionList.length != 0" @click="resetCondition">
                    重置条件
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="standard_list_wrap">
          <!-- 排序 -->
          <div class="sort_module flex">
            <sort v-for="(item, index) in sortList" :sortType="item.sortType" :text="item.text" :key="item.key"
              @sort="sort(item.key, index)"></sort>
          </div>
          <!-- 排序下的功能键 -->
          <div class="table_am">
            <div class="selected_num">
              (<span style="margin: 0px 3px;">已选<span style="color: #3388ff;margin: 0px 3px;">{{
                  selectedNum
                }}</span>条</span>)
            </div>
            <div class="am " @click="clearSelected">
              <i class="iconfont icon-lajitong"></i>
              <span>清除已选</span>
            </div>
            <div class="am " @click="jumpzstp">
              <i class="iconfont icon-chakan"></i>
              <span>查看标准关系图谱</span>
            </div>
            <div class="am " @click="showSys">
              <i class="iconfont icon-shoucang"></i>
              <span>纳入已有知识体系</span>
            </div>
            <div style="display:flex;flex: 1;margin-right: 0px;justify-content: flex-end;">
              找到<span style="margin: 0px 3px;color: #3388ff;">{{
                total
              }}</span>条结果
            </div>
          </div>
          <div>
            <Table border :columns="tableTitle" :data="tableData" :loading="Table_loading"
              @on-selection-change="table_change" ref="tables" height="521"></Table>
            <div class="page">
              <span>每页10条,共计<span style="margin: 0px 3px;color: #3388ff;">{{
                  totalPage
                }}</span>页</span>
              <Page :total="total" @on-change="pageChange" ref="pages"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  创建体系 -->
    <!-- <child @sendTreeData='setTreeData'/> -->

    <create-system ref="createSystem" @sendTreeData='setTreeData' :data="createSys"></create-system>
  </div>
</template>

<script>
  import sort from "@/components/sort"; //右侧筛选

  // import createSystem from "./components/createSystem"; //创建新体系弹窗
  import createSystem from "./components/createSystem1"; //创建新体系
  import axios from 'axios';

  import {
    construct
  } from "@aximario/json-tree"; //构造函数

  export default {
    components: {
      createSystem,
      sort,
    },
    props: {},
    inject: ["reload"],
    data() {
      return {
        editBtnShow: true, //编辑按钮标识
        addBtnShow: true, //补充按钮展示
        saveBtnShow: true, //保存按钮展示
        buttonProps: {
          type: 'default',
          size: 'small',
        },
        // 输入框要修改的内容
        inputContent: "",
        // 修改前的TreeNode名称
        oldName: "",
        // 公共树已选
        oldTreeData: [],
        //公共树已选去根
        noRootTreeData: [],
        //父页面传值
        createSys: {},
        //弹出页传值
        csOldTreeData: [],
        csSelectTreeData: [],
        // 添加节点标识
        appendIndex: 0,


        //
        firstPageInitData: [], //初始化左侧树的所有保存节点
        firstPageDelData: [], //初始化左侧树的删除的所有节点
        firstPageInitDataDel: [], //删除节点保存下来的


        sysName: '', //体系名称
        treeNameArr: [], //所有体系名称
        spinShow: true, //loading左侧
        refresh: false,
        newSave:true,//保存之后可编辑，未保存不可编辑






        // 个性知识
        sortList: [
          //排序列表
          {
            text: "标准编号",
            key: "classificationCode"
          },
          {
            text: "标准名称",
            key: "standName"
          },
          {
            text: "发布时间",
            key: "releaseTime"
          },
        ],
        Table_loading: true,
        treeData: [], //树数据
        dataSearch: [], //查询数据
        tableData: [], //查询数据
        treeSearchVal: "sssssssssss", //左侧树筛选下拉关键字
        conditionList: [], //检索的关键词
        treeSearchList: [], //左侧树的下拉
        searchVal: "", //右侧查询搜索关键字
        serchTypeVal: "", //右侧搜索类型的下拉框关键字
        searchTypeList: [
          //右侧搜索类型选择
          {
            value: "全部",
            label: "全部",
          },
          {
            value: "内部",
            label: "内部",
          },
          {
            value: "公开",
            label: "公开",
          },
        ],
        tableTitle: [{
            type: "selection",
            align: "center",
            width: 80,
          },
          {
            title: "分类编号",
            align: "center",
            minWidth: 120,
            tooltip: true,
            key: "classificationCode",
          },
          {
            title: "分类名称",
            align: "center",
            minWidth: 150,
            tooltip: true,
            key: "classificationName",
          },
          {
            title: "标准编号",
            align: "center",
            minWidth: 150,
            tooltip: true,
            key: "standCode",
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
                          this.$router.push({
                            path: "/BasicDetail",
                            query: {
                              id: params.row.standCode
                            },
                          });
                        },
                      },
                    },
                    params.row.standCode
                  ), // 表格显示文字
                  h(
                    "div", {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.standCode // 气泡内的文字
                  ),
                ]),
              ]);
            },
          },
          {
            title: "标准名称",
            align: "center",
            minWidth: 150,
            tooltip: true,
            key: "standName",
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
                          this.$router.push({
                            path: "/BasicDetail",
                            query: {
                              id: params.row.standCode
                            },
                          });
                        },
                      },
                    },
                    params.row.standName
                  ), // 表格显示文字
                  h(
                    "div", {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.standName // 气泡内的文字
                  ),
                ]),
              ]);
            },
          },
          {
            title: "标准级别",
            align: "center",
            minWidth: 150,
            tooltip: true,
            key: "standLevel",
          },
          {
            title: "状态",
            align: "center",
            minWidth: 70,
            key: "status",
            render: function (h, params) {
              let className = null;
              let {
                status
              } = params.row;
              if (status == null) return;
              if (status == "计划") {
                className = "plan";
              } else if (status == "有效") {
                className = "valid";
              } else {
                className = "abolish";
              }
              return h(
                "div", {
                  class: `${className} stdStatus`,
                },
                status
              );
            },
          },
          {
            title: "密级",
            align: "center",
            width: 80,
            key: "secretLevel",
          },
          {
            title: "发布时间",
            align: "center",
            minWidth: 100,
            key: "releaseTime",
            render: (h, params) => {
              if (params.row.releaseTime == null) {
                return h("div", {}, params.row.releaseTime);
              } else {
                if (params.row.releaseTime.length <= 10) {
                  return h("div", {}, params.row.releaseTime);
                } else {
                  return h("div", {}, params.row.releaseTime.substring(0, 10));
                }
              }
            },
          },
          // {
          //   title: "是否收藏",
          //   align: "center",
          //   minWidth: 100,
          //   key: "nice",
          // },
          {
            title: "操作",
            key: "action",
            width: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.nice == false) {
                return h(
                  "div", {
                    class: "actionWrap",
                  },
                  [
                    h("i", {
                      class: "iconfont icon-shoucang",
                      style: {
                        marginRight: "15px",
                      },
                      on: {
                        click: () => {
                          // 需要收藏
                          this.collectionBtn(
                            params.row.standName,
                            params.row.standCode
                          );
                        },
                      },
                    }),
                    h("i", {
                      class: "iconfont icon-icon_zhishiku",
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/BasicDetail",
                            query: {
                              id: params.row.standCode
                            },
                          });
                        },
                      },
                    }),
                  ]
                );
              } else {
                return h(
                  "div", {
                    class: "actionWrap",
                  },
                  [
                    h("i", {
                      class: "iconfont icon-shoucang",
                      style: {
                        color: "#EF6C00",
                        marginRight: "15px",
                      },
                      on: {
                        click: () => {
                          // 取消收藏
                          this.iscollectionCancel(
                            params.row.standName,
                            params.row.standCode
                          );
                        },
                      },
                    }),
                    h("i", {
                      class: "iconfont icon-icon_zhishiku",
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/BasicDetail",
                            query: {
                              id: params.row.standCode
                            },
                          });
                        },
                      },
                    }),
                  ]
                );
              }
            },
          },
        ],
        tableDatas: [],
        selectedNum: "0", //表格选中条数
        total: 27,
        pageNum: "1", //当前页
        dataSource: "", //右侧表格第二层找到多少条件结果
        // 体系标准ID
        txStandId: "",
      };
    },
    computed: {
      totalPage: function () {
        let pageNum = !this.total ? 0 : Math.ceil(this.total / 10);
        return pageNum;
      },
    },
    methods: {

      // 点击补充按钮，公共弹出页面
      nodeAdd() {
        this.createSys['treeData'] = this.treeData;
        this.createSys['oldTreeData'] = this.oldTreeData;
        this.createSys['noRootTreeData'] = this.noRootTreeData;
        this.createSys['csSelectTreeData'] = this.csSelectTreeData;
        this.createSys['sysName'] = this.sysName;
        this.createSys['firstPageInitData'] = this.firstPageInitData;
        this.createSys['treeNameArr'] = this.treeNameArr;







        // this.$refs.createSystem.editFile();
        this.$refs.createSystem.showModal('补充', this.createSys, );
        // this.$refs.createSystem.sysManagetreeData(0);


      },
      //点击保存按钮，操作节点消失 以及编辑按钮出现并且下发
      nodeSave() {
        //可选中
        this.newSave=true;
        //编辑按钮显示 操作节点消失
        this.editBtnShow = true;
        //数据下发
        let submitDatas = this.treeData;

        let handleData = this.firstPageInitData;
        console.info(handleData, '==============ppp')
        let handleDataArr = [];
        let txname = '';
        handleData.forEach((item1) => {
          let parId = item1.hasOwnProperty('pId') ? item1.pId : item1.parentId;
          if (parId == 0 || parId == -1 || parId == null) {
            // txname = item1.className ? item1.className : (item1.title || item1.name);
            txname = item1.className ? item1.className : item1.title ;

          } else {
            // if (!item1.classNameNew || (item1.classNameNew.indexOf('(') != -1)) {
            //   let countSt = item1.title.lastIndexOf('(');
            //   let handleCon = item1.title.slice(0, countSt);
            //   item1.classNameNew = handleCon
            // }
          }
          if(!item1.classNoNew){
            item1.classNoNew=item1.classNo?item1.classNo:item1.sysCode;
          }

        });
        let username = this.$store.state.user.userInfo.username;
        handleData.forEach((item) => {
          item.stdUserPin = username;
          item.stdTxName = txname;
          let {
            children,
            ...params
          } = item
          console.log(params, '-------------oooo')
          handleDataArr.push(params);
        });

        handleDataArr = JSON.stringify(handleDataArr);
        console.log(handleDataArr, '-------------oooo')

        // 添加请求头
        let param = new FormData(); // 创建form对象
        param.append('stdTxEntities', handleDataArr); // 通过append向form对象添加数据
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        };
        axios
          .post('/personality/baike/standServer/save', param, config)
          .then(res => {
            // this.spinShow = false;
            if (res.data.msg == "SUCCESS") {
              this.$Message.success('保存成功');
              // this.refresh=true;
              // this.$router()
              // this.created()
              location.reload()
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        // this.$axios("/baike/standServer/save", "post", {
        //   stdTxEntities: handleDataArr,

        // }).then((res) => {
        //   this.dataSearch = res.data.data.standList;
        //   this.dataSearch.map((item) => {
        //     item.isOpen = false;
        //   });

        //   this.$nextTick(() => {
        //     var _dom = this.$refs.wrap;
        //     var _list = this.dataSearch;
        //     // 循环源数据，给每行数据添加原高度
        //     for (let i = 0; i < this.dataSearch.length; i++) {
        //       _list[i].openH = `${_dom[i].clientHeight}px`;
        //       _list[i].closeH = "25px";
        //     }
        //     // 重新渲染
        //     this.dataSearch = _list;
        //     // 重新刷新组件
        //     this.$forceUpdate();
        //   });
        // });


      },

      //点击编辑按钮，操作节点 以及编辑按钮删除
      nodeEdit() {
        this.editBtnShow = false;
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
      tree(result) {
        let newData = this.deepClone(result);
        return this.recursionTree(newData);
      },
      // 筛选树的数据
      filterTreeData(data) {
        let result;
        if (data[0]['pId']) {
          result = construct(data, {
            id: "id",
            pid: "pId"
          });
        } else {
          result = construct(data, {
            id: "id",
            pid: "parentId"
          });
        }
        // let result = construct(data, {
        //   id: "id",
        //   pid: "pId"
        // });
        console.info(result, 'pppp')
        const treeData = this.tree(result);
        return treeData;
      },
      // 递归树
      recursionTree(data) {
        data.forEach((item) => {

          let len = item.children && item.children.length > 0;
          let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
          if (parId == 0 || parId == null || parId == -1) {
            item.expand = true;
            item.selected = false;
          } else {
            item.expand = false;
          }
          // item.title = item.title ? item.title : (item.name || item.className);

          item.name = item.name ;
          item.className = item.className;

          item.classNameNew =item.classNameNew?item.classNameNew:item.className;
          if (len) {
            this.recursionTree(item.children);
          }
        });
        return data;
      },

      //子页面传值到父页面
      setTreeData(msg) {
        // this.treeData = msg.newTreeList;
        this.oldTreeData = msg.newTreeList;
        this.noRootTreeData = msg.oldTreeList;
        this.csOldTreeData = msg.oldTreeData; //弹出页面选择数组
        this.csSelectTreeData = msg.selectTreeData; //弹出页面选择数组
        this.firstPageInitData = msg.newSelInterData; //子页面补充完之后的数据
        this.newSave=msg.newSave;
        console.info(msg.newTreeList, '====oooo')

        console.info(msg.newSelInterData, '====oooorrrr')
        this.treeData = this.filterTreeData(msg.newSelInterData);


        //按钮是否显示
        if (this.treeData.length == 0) {
          this.editBtnShow = false;
          this.saveBtnShow = false;
          this.addBtnShow = false;
        } else {
          this.editBtnShow = true;
          this.saveBtnShow = true;
          this.addBtnShow = true;
        }

      },
      // 排序
      sort(key, index) {
        this.sortList.forEach((t, i) => {
          if (i != index) t.sortType = null;
        });
        this.sortList[index].sortType = this.sortList[index].sortType ?
          this.sortList[index].sortType == "asc" ?
          "desc" :
          "asc" :
          "asc";

        this.TableList();
        this.$forceUpdate();
      },
      // 折叠
      fold(index) {
        const {
          isOpen
        } = this.dataSearch[index];
        this.dataSearch[index].isOpen = !isOpen;
        this.$forceUpdate();
      },
      // 表格选中
      table_change(data) {
        this.selectedNum = data.length;
      },
      // 表格分页
      pageChange(page) {
        // 页码改变
        this.selectedNum = 0;
        this.pageNum = page;
        this.Table_loading = true;
        this.TableList();
      },
      //左侧的新增按钮
      addNewProject() {
        // this.$refs.createSystem.mo();
        let nodeData = {};
        nodeData['treeNameArr'] = this.treeNameArr
        this.$refs.createSystem.showModal('新建', nodeData);
      },

      //左侧的编辑按钮
      editNewProject() {},
      // 获取当前页面的值
      treeChange(item) {
        if (item.length != 0) {
          // 处于选中状态
          // 体系标准ID
          this.txStandId = item[0].id;
          // 重置全部的数据的状态，默认不选中，可操作
          this.rightData();
          this.TableList();
          this.treeData[0].disabled = true;
        } else {
          // 取消选中
        }
      },
      // 收藏按钮
      collectionBtn(val, id) {
        let coliectionData = {
            username: this.$store.state.user.userInfo.username,
            content: {
              type: "标准知识百科",
              name: val,
              param: {
                BZBH: id
              },
            },
          },
          _this = this;
        _this
          .$axios("/users/add_collection", "post", coliectionData)
          .then((res) => {
            this.$Message.success("收藏成功");
            this.TableList();
          });
      },
      // 取消收藏
      iscollectionCancel(val, id) {
        let coliectionData = {
            username: this.$store.state.user.userInfo.username,
            content: {
              type: "标准知识百科",
              name: val,
              param: {
                BZBH: id
              },
            },
          },
          _this = this;
        _this
          .$axios("/users/delete_collection", "post", coliectionData)
          .then((res) => {
            this.$Message.success("已取消收藏");
            this.TableList();
          });
      },
      // 循环树
      update_disabled(list) {
        list.map((item) => {
          // 默认不选中
          // item.selected = false;
          // 可操作
          item.disabled = false;
          // 含有子级
          if (item.children.length != 0) {
            this.update_disabled(item.children);
          }
        });
      },
      // 循环树
      find_update(list, val) {
        list.map((item) => {
          if (item.txNodeId == val) {
            // 默认选中
            item.selected = true;
            // 不可操作
            item.disabled = true;
            return;
          } else {
            // 含有子级
            if (item.children.length != 0) {
              this.find_update(item.children, val);
            }
          }
        });
      },
      // 点击查询关键字
      selectedCondition(id, name, standCounts) {
        const findRepetition = this.conditionList.find(
          (item) => item.standId == id || item.standName == name
        );
        if (!findRepetition) {
          this.conditionList.push({
            standName: name,
            standId: id,
            standCounts: standCounts,
          });
          this.rightData();
          this.TableList();
        }
      },
      // 清除某个条件
      clearCondition(index) {
        // 标准ID
        this.conditionList.splice(index, 1);
        this.rightData();
        this.TableList();
      },
      // 重置条件
      resetCondition() {
        // 标准ID
        this.conditionList = [];
        this.rightData();
        this.TableList();
      },
      // 初始化树的渲染
      renderContent1(h, {
        root,
        node,
        data
      }) {
        let parId=data.hasOwnProperty('pId')?data.pId:data.parentId;
        // 编辑前渲染
        let beforeEdit = h(
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
              h("span",(parId==-1||parId==0||parId==null)?data.classNameNew:data.classNameNew+'('+data.count+')')
            ]),
          ]);
        return beforeEdit
      },


      // 编辑树的渲染条件
      renderContent(h, {
        root,
        node,
        data
      }) {
        let parId=data.hasOwnProperty('pId')?data.pId:data.parentId;
        // 编辑前渲染
        let beforeEdit = h(
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
              h('span', {
                style: {
                  position: 'relative'
                }
              }, [
                h(`${ data.isEdit ? '' : 'span'}`, {
                  on: {
                    click: (event) => {
                      event.stopPropagation();
                      this.oldName = data.className
                      this.$set(data, 'isEdit', true);
                      // this.oldName = data.title;
                      // this.classNameNew = data.title;
                      // let countSt = data.title.lastIndexOf('(');
                      // let countEnd = data.title.lastIndexOf(')');
                      // let handleCon = countSt != -1 ? data.title.slice(0, countSt) : data.title;
                      // data.title = handleCon;
                      // event.target.value = handleCon;
                      // this.$set(data, 'isEdit', true);
                    }
                  }
                }, (parId==-1||parId==0||parId==null)?data.classNameNew:data.classNameNew+'('+data.count+')'),
                h(`${ data.isRemove ? 'span' : ''}`, {
                  attrs: {
                    class: 'sss',
                  },
                  style: {
                    background: 'grey',
                    width: '100%',
                    height: '1px',
                    position: 'absolute',
                    left: 0,
                    top: '50%'
                  }
                }),
              ]),
              // h(`${ data.isEdit ? '' : 'span'}`, {
              //   on: {
              //     click: (event) => {
              //       event.stopPropagation();
              //       this.oldName = data.title
              //       this.$set(data, 'isEdit', true);
              //     }
              //   }
              // }, data.title),
              h(`${ data.isEdit ? 'input' : ''}`, {
                attrs: {
                  value: `${ data.isEdit ? data.classNameNew : ''}`,
                  autofocus: "autofocus"
                },
                style: {
                  width: '160px',
                  cursor: 'auto',
                },
                on: {
                  change: (event) => {

                    this.inputContent = event.target.value;
                  },
                  blur: () => {
                    //this.confirmTheChange(data);
                  }
                }
              }),
              h('span', [
                h(`${ data.isEdit ? '' : 'Button'}`, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-add'
                  }),
                  style: {
                    marginRight: '2px',
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.append(data)
                    }
                  }
                }),
                h(`${ data.isEdit ? '' : 'Button'}`, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-trash-outline'
                  }),
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                      this.$set(data, 'isRemove', true);
                    }
                  }
                }),
                h(`${ data.isEdit ? '' : 'Button'}`, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-arrow-round-up'
                  }),
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toUp(root, node, data)
                    }
                  }
                }),
                h(`${ data.isEdit ? '' : 'Button'}`, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-arrow-round-down'
                  }),
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toDown(root, node, data)
                    }
                  }
                }),
                h(`${ data.isEdit ? '' : 'Button'}`, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'md-trash'
                  }),
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toBack(root, node, data)
                      this.$set(data, 'isRemove', false);
                    }
                  }
                }),
                // 确认/取消修改部分
                h(`${ data.isEdit ? 'span' : ''}`, {
                    style: {
                      marginLeft: '5px'
                    }
                  },
                  [
                    // 确认按钮
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'md-checkmark'
                      }),
                      style: {
                        border: 0,
                        background: 'rgba(0,0,0,0)',
                        fontSize: '5px',
                        outline: "none",
                        lineHeight: 1
                      },
                      on: {
                        click: (event) => {
                          this.confirmTheChange(data)
                        }
                      }
                    }),
                    // 取消按钮
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'md-close'
                      }),
                      style: {
                        border: '0',
                        background: 'rgba(0,0,0,0)',
                        fontSize: '5px',
                        outline: "none",
                        lineHeight: 1
                      },
                      on: {
                        click: () => {
                          this.CancelChange(data)
                        }
                      }
                    })
                  ]
                )
              ]),

            ]),
          ]);
        return beforeEdit
      },
      // 操作树节点
      // 确认修改树节点
      confirmTheChange(data) {
        if (!this.inputContent) {
          this.inputContent = data.className;

          this.$set(data, 'isEdit', false);
        } else {
          if (this.oldName !== this.inputContent) {
            this.$Modal.confirm({
              title: "提示",
              content: `您确定将  “${this.oldName}”  重命名为 “ ${this.inputContent} ” 吗？`,
              onOk: () => {

                data.className = this.inputContent;
                data.classNameNew = this.inputContent;
                this.firstPageInitData.forEach((item) => {
                  if (item.id == data.id) {
                    item.classNameNew = this.inputContent;
                  } else {
                    item.classNameNew = item.classNameNew?item.classNameNew:item.className;
                  }
                });

                this.$Message.info('修改成功');
                this.$set(data, 'isEdit', false);
              },
              onCancel: () => {
                this.$Message.info('取消');
                this.$set(data, 'isEdit', false);
              }
            });
          } else {
            this.$set(data, 'isEdit', false);
          }
        }

      },
      // 取消修改树节点
      CancelChange(data) {
        this.$Notice.info({
          title: '取消修改',
        });
        this.$set(data, 'isEdit', false);
      },
      append(data) {
        const children = data.children || [];
        let childObj = {
          title: 'appended node',
          expand: true,
          id: 'append' + (this.appendIndex++),
          isRecommend: false,
          name: "appended node(0)",
          nameOld: 'appended node',
          pId: data.id,
          parentId: data.id,
          stdNum: "(0)",
          sysCode: "JTTX",
          classType: 5,
          className: "appended node",
          classNameNew: "appended node",
          classNo: data.id+'1',
          classNoNew: data.id+'1',
          isChild: 0,
          classTypeCn: "自定义体系",
          stdTxName: "appended node",
          count:0,
          stdUserPin: this.$store.state.user.userInfo.username
        };
        // 树节点结构添加
        children.push(childObj);

        //父节点展开
        data.expand = true;
        this.$set(data, 'children', children);
        // 树节点数组添加 add
        this.firstPageInitData.push(childObj);
        this.csSelectTreeData['append'] ? this.csSelectTreeData['append'].push(childObj) : '';
      },
      remove(root, node, data) {
        const parentKey = root.find(el => el === node).parent;

        const parent = root.find(el => el.nodeKey === parentKey).node;

        const index = parent.children.indexOf(data);



        //用划线代替
        // this.$set(data, 'isEdit', true);

        // parent.children.splice(index, 1);
        // 树节点数组减少
        console.info(this.firstPageInitData, 'llllllppppp')
        //递归删除数组节点
        // this.firstPageInitDataDel=this.firstPageInitData.slice();

        for (var j = 0; j < this.firstPageInitData.length; j++) {
          let item = this.firstPageInitData[j];
          if (item.id == data.id) { //删去父节点
            this.firstPageInitData.splice(j, 1);
            j--;
            // 删除节点保存
            this.firstPageDelData.push(item);
            console.info(item.className, '删除名字par============')


            if (item.children && item.children.length != 0) {
              this.recursionRemove(item, item.children)
            }
          }
        }


        // this.firstPageInitData.forEach((item, index) => {
        //   if (item.id == data.id) { //删去父节点
        //     this.firstPageInitData.splice(index, 1);
        //     index--;

        //     // 删除节点保存
        //     this.firstPageDelData.push(item);
        //     console.info(item.title, '删除名字')
        //     console.info(this.firstPageInitDataDel, '删除名字dddd')


        //     if (item.children && item.children.length != 0) {
        //       this.recursionRemove(item, item.children)
        //     }
        //   }
        // });







      },
      recursionRemove(data, childs) {
        // for (var i = 0; i < this.firstPageInitData.length; i++) {
        //   let item = this.firstPageInitData[i];
        //   for (var z = 0; z < childs.length; z++) {
        //     let item1 = childs[z];
        //     const bbb = item1.className;
        //     if (item1.id == item.id) {
        //       this.firstPageInitData.splice(i, 1);
        //       i--;

        //       // 删除节点保存
        //       this.firstPageDelData.push(item);
        //       console.info(item.title, '删除名字child========')
        //       if (item1.children && item1.children.length != 0) {
        //         this.recursionRemove(item1, item1.children)
        //       }
        //     }
        //   }

        // }

        for (var z = 0; z < childs.length; z++) {
          let item1 = childs[z];
          const bbb = item1.className;
          for (var i = 0; i < this.firstPageInitData.length; i++) {
            let item = this.firstPageInitData[i];
            if (item1.id == item.id) {
            this.firstPageInitData.splice(i, 1);
            i--;

            // 删除节点保存
            this.firstPageDelData.push(item);
            console.info(item.className, '删除名字child========')
            if (item1.children && item1.children.length != 0) {
              this.recursionRemove(item1, item1.children)
            }
          }
          }
         
        }

        // this.firstPageInitData.forEach((item, index) => {
        //   const aaa = item.className;
        //   childs.forEach((item1, index1) => {
        //     const bbb = item1.className;
        //     if (item1.id == item.id) {
        //       this.firstPageInitData.splice(index, 1);
        //       // 删除节点保存
        //       this.firstPageDelData.push(item);
        //       console.info(item.title, '删除名字')
        //       console.info(this.firstPageInitData, '===splicechild')
        //       console.info(this.firstPageDelData, '===delchild')


        //       if (item1.children && item1.children.length != 0) {
        //         this.recursionRemove(item1, item1.children)
        //       }
        //     }

        //   });
        // });


      },
      toBack(root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;

        const index = parent.children.indexOf(data);
        console.info(this.firstPageInitData, 'llllllppppp')
        //递归恢复数组节点

        this.firstPageDelData.forEach((item, index) => {
          if (item.id == data.id) { //删去父节点
            // this.firstPageDelData.splice(index, 1);
            // 恢复节点
            this.firstPageInitData.push(item);
            console.info(item.className, '恢复名字')

            if (item.children && item.children.length != 0) {
              this.recursionBack(item, item.children)
            }
          }
        });

        console.info(this.firstPageInitData, 'llllllpppppoooo')


      },
      recursionBack(data, childs) {
        this.firstPageDelData.forEach((item, index) => {
          childs.forEach((item1, index1) => {
            if (item1.id == item.id) {
              this.firstPageDelData.splice(index, 1);
              //恢复节点
              this.firstPageInitData.push(item);
              console.info(item.className, '恢复名字')

              if (item1.children && item1.children.length != 0) {
                this.recursionBack(item1, item1.children)
              }
            }



          });
        });
      },
      toUp(root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        const children = parent.children;
        if (index === 0) {
          this.$Message.success('当前层级下只有一个元素，不可调动');
          return;
        }
        const upSysCode=parent.children[index-1].hasOwnProperty('sysCode')?(parent.children[index-1].classNoNew||parent.children[index-1].sysCode):(parent.children[index-1].classNoNew||parent.children[index-1].classNo);
        const currentSysCode=parent.children[index].hasOwnProperty('sysCode')?(parent.children[index].classNoNew||parent.children[index].sysCode):(parent.children[index].classNoNew||parent.children[index].classNo);
        const upId=parent.children[index-1].id;
        // 交换
        // parent.children[index-1].sysCode=currentSysCode;
        // parent.children[index].sysCode=upSysCode;
        parent.children[index-1].classNoNew=currentSysCode;
        parent.children[index].classNoNew=upSysCode;
        this.firstPageInitData.forEach((item) => {
          // if(item.id==data.id){
          //   item['sysCode']=upSysCode;
          // })
          // 当前节点的code变换
          if(item.id==data.id){
            // item['sysCode']=upSysCode;
            item['classNoNew']=upSysCode;
          }
          if(upId==item.id){
            // item['sysCode']=currentSysCode;
            item['classNoNew']=currentSysCode;
          }
          
        });
        
        let parId = parent.hasOwnProperty('pId') ? parent.pId : parent.parentId;
        if (parId == 0 || parId == -1 || parId == null) {
          this.$Message.success('当前层级的父元素是根节点，不可调动');
          return;
        }
        children.splice(index - 1, 1, ...children.splice(index, 1, children[index - 1]));
      },
      toDown(root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        const children = parent.children;
        if ((index + 1) === children.length) {
          this.$Message.success('当前层级下无元素，不可调动');
          return;
        }
        const downSysCode=parent.children[index+1].hasOwnProperty('sysCode')?(parent.children[index+1].classNoNew||parent.children[index+1].sysCode):(parent.children[index+1].classNoNew||parent.children[index+1].classNo);
        const currentSysCode=parent.children[index].hasOwnProperty('sysCode')?(parent.children[index].classNoNew||parent.children[index].sysCode):(parent.children[index].classNoNew||parent.children[index].classNo);
        const downId=parent.children[index+1].id;
        // 交换
        // parent.children[index-1].sysCode=currentSysCode;
        // parent.children[index].sysCode=upSysCode;
        parent.children[index-1].classNoNew=currentSysCode;
        parent.children[index].classNoNew=downSysCode;

        this.firstPageInitData.forEach((item) => {
          // if(item.id==data.id){
          //   item['sysCode']=upSysCode;
          // })
          // 当前节点的code变换
          if(item.id==data.id){
            // item['sysCode']=downSysCode;
            item['classNoNew']=downSysCode;
          }
          if(downId==item.id){
            // item['sysCode']=currentSysCode;
            item['classNoNew']=currentSysCode;
          }
          
        });
        // if ((index + 1) === children.length) return;
        children.splice(index + 1, 1, ...children.splice(index, 1, children[index + 1]));
      },
      // 右侧条件数据筛选
      conditionData() {
        this.TableList();
      },
      //右侧清除选择按钮
      clearSelected() {
        this.$refs.tables.selectAll(false);
      },
      // 右侧查看图谱
      jumpzstp() {},
      // 纳入已有知识体系
      showSys() {
        // 已选哪些节点
        let nodeArr = this.$refs.tables.getSelection();
        nodeArr.forEach((item) => {
          item.title = item.classificationName ? item.classificationName : '(分类名称缺失)';
          item.sysCode = item.classificationCode;
          item.name = item.title;
          item.nameOld = item.title;
          item.classNo = item.sysCode;
          item.className = item.name;
          item.ClassNameNew = item.name;
        });
        let naruParam = {};
        naruParam['csSelectTreeData'] = this.csSelectTreeData;
        naruParam['naruData'] = nodeArr;
        naruParam['treeNameArr'] = this.treeNameArr;

        this.$refs.createSystem.showModal('纳入', naruParam);
      },
      // 右侧数据
      rightData() {
        this.selectedNum = 0;
        // 获取右上方检索数据
        this.$axios("/baike/standServer/requestData", "get", {
          uid: this.$store.state.user.userInfo.username,
          uToken: this.$store.state.user.userInfo.token,
          requestSource: "BZ",
          requestCode: "90226",
          requestFuncId: "201",
          requestTime: Date.parse(new Date()) / 1000,
          requestParams: {
            txStandId: this.txStandId,
          },
        }).then((res) => {
          if(res.data.data.msg=="NODATA"){
            return
          }
          this.dataSearch = res.data.data.standList;
          this.dataSearch.map((item) => {
            item.isOpen = false;
          });

          this.$nextTick(() => {
            var _dom = this.$refs.wrap;
            var _list = this.dataSearch;
            // 循环源数据，给每行数据添加原高度
            for (let i = 0; i < this.dataSearch.length; i++) {
              _list[i].openH = `${_dom[i].clientHeight}px`;
              _list[i].closeH = "25px";
            }
            // 重新渲染
            this.dataSearch = _list;
            // 重新刷新组件
            this.$forceUpdate();
          });
        });
      },
      // 表格
      TableList() {
        this.selectedNum = 0;
        const sortKey = this.sortList.find((item) => item.sortType);
        this.Table_loading = true;
        this.$axios("/baike/standServer/requestData", "get", {
          uid: this.$store.state.user.userInfo.username,
          uToken: this.$store.state.user.userInfo.token,
          requestSource: "BZ",
          requestCode: "90226",
          requestFuncId: "301",
          requestTime: Date.parse(new Date()) / 1000,
          requestParams: {
            // 体系标准ID
            txStandId: this.txStandId,
            // 标准ID
            standId: this.conditionList.map((item) => item.standId).join(","),
            // 页面大小
            pageSize: "10",
            // 页码
            pageNum: this.pageNum,
            // 密级
            secretLevel: this.serchTypeVal == "全部" ? "" : this.serchTypeVal,
            // 标准编号
            standCode: this.searchVal,
            // 标准名
            standName: this.searchVal,
            // 排序列名
            orderByName: sortKey ? sortKey.key : null,
            // 排序规则
            orderByRule: sortKey ? sortKey.sortType : null,
          },
        }).then((res) => {
          this.tableData = res.data.data.standData;
          this.total = res.data.data.total;
          setTimeout(() => {
            this.Table_loading = false;
          }, 500);
        });
      },
      // 初始化体系树选择
      tree_change(item) {
        this.spinShow = true;

        // 是否选择已存在的知识体系树
        this.$axios("/baike/standServer/tree1", "post", {
            uid: this.$store.state.user.userInfo.username,
            txName: this.treeSearchVal
          })
          .then((res) => {
            let Tree_data = res.data.data;
            if (Tree_data.length == 0) {
              this.editBtnShow = false;
              this.saveBtnShow = false;
              this.addBtnShow = false;
            } else {

              this.editBtnShow = true;
              this.saveBtnShow = true;
              this.addBtnShow = true;
            }
            this.firstPageInitData = Tree_data;
            let Tree_list = this.filterTreeData(Tree_data);
            console.info(this.firstPageInitData, 'lllll')
            // this.treeData = Tree_list;

            //根节点不选
            Tree_list.map((item) => {
              // 默认不选中
              item.selected = false;
              // 不可操作
              item.disabled = true;
            });

            //体系名称
            this.sysName = Tree_list[0]['title'];
            this.spinShow = false;
            //初始化右侧
            if (Tree_list[0].children.length) {
              Tree_list[0].expand = true;
              Tree_list[0].children[0].selected = true;
              // Tree_list[0].children[0].disabled = true;
              this.txStandId = Tree_list[0].children[0].id;
              this.treeData = Tree_list;
              this.rightData();
              this.TableList();
              this.selectedNum = 0;
            } else {
              this.treeData = Tree_list;
              this.rightData();
              this.TableList();
              this.selectedNum = 0;
            }

          })
          .catch((err) => {
            this.treeData = [];
          });
      },
      // 密级筛选表格数据
      miji_change(item) {
        this.rightData();
        this.TableList();
        this.selectedNum = 0;
      },
    },
    btnShow() {
      if (this.treeData.length == 0) {
        this.editBtnShow = false;
        this.saveBtnShow = false;
        this.addBtnShow = false;
      } else {
        this.editBtnShow = true;
        this.saveBtnShow = true;
        this.addBtnShow = true;
      }
    },
    created() {
      // 是否选择已存在知识体系
      // this.btnShow();/
      if (this.treeData.length == 0) {
        this.editBtnShow = false;
        this.saveBtnShow = false;
        this.addBtnShow = false;
      } else {
        this.editBtnShow = true;
        this.saveBtnShow = true;
        this.addBtnShow = true;
      }

      // 获取已存在知识体系
      this.$axios("/baike/standServer/treeName", "post", {
        uid: this.$store.state.user.userInfo.username
      }).then((res) => {
        this.treeSearchList = res.data.data.map((item) => {
          return {
            value: item.txName,
            label: item.txName,
            id: item.id
          };
        });
        console.info(this.treeSearchList, 'jjjjj')
        this.treeSearchVal = this.treeSearchList[0].label;

        this.treeSearchList.forEach((item) => {
          this.treeNameArr.push(item.label);

        });
        // 初始化左侧树
        this.tree_change()


      });
    },
    mounted() {
      this.csSelectTreeData['append'] = [];
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (this.refresh) {
            this.reload();
          }
        },
      },
    },
  };
</script>
<style lang="less" scoped>
  .flex {
    display: flex;
  }

  // 头部消息显示
  .hotNews {
    height: 50px;
    display: flex;
    padding: 0 24px;
    box-sizing: border-box;
    background: #ffffff;
    margin-bottom: 20px;

    .hotNews_l {
      width: 140px;
      display: flex;
      align-items: center;
    }

    .hotNews_r {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &>div {
        width: 380px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 10px;
        background: url(~@/img/icon/dian.png) no-repeat center left;
      }
    }
  }

  // 中间内容显示
  .content {
    position: relative;
    overflow: hidden;
    display: flex;
    /* min-height: calc(100vh - 250px); */

    // 左侧内容显示
    .content_l {
      width: 300px;
      /* min-height: calc(100vh - 250px); */
      background: white;
      overflow: auto;
      float: left;
      padding-bottom: 40px;
      box-sizing: border-box;
      position: relative;

      /deep/.ivu-tree-empty {
        text-align: center;
        margin-top: 20px;
      }

      .bottom_btn {
        position: absolute;
        margin-top: 10px;
      }

      .add_btn {
        right: 54px;
      }

      .save_btn {
        right: 6px;
      }

      .content_l_title {
        height: 48px;
        border-bottom: 1px solid #ececec;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #3f424b;
        font-weight: 600;
        padding: 0 16px;

      }

      .content_l_title_search {
        margin-top: 20px;
        overflow: hidden;

        /deep/ .system_btn {
          margin-left: 14px;
        }
      }
    }

    .content_r {
      float: left;
      width: calc(100% - 320px);
      min-height: calc(100vh - 250px);
      margin-left: 20px;
      overflow: auto;
      display: flex;
      flex-direction: column;

      // 查询条件
      .query_module {
        padding: 0px 20px 20px 20px;
        background: white;

        // 查询头
        .query_title {
          display: flex;
          align-items: center;
          height: 50px;
          align-items: center;
          border-bottom: 1px solid #efefef;

          span {
            flex: 1;
            font-size: 15px;
            font-weight: bold;
          }
        }

        // 查询页面内容
        .searchCont {
          min-height: 95px;
          overflow: hidden;

          .searchCont_all {
            overflow: hidden;
            margin-top: 12px;

            .searchCont_li {
              display: flex;
              align-items: flex-start;
              margin-bottom: 8px;
              overflow: hidden;

              .searchCont_li_l {
                overflow: hidden;
                font-size: 14px;
                font-weight: bold;
                width: 70px;
                line-height: 25px;
              }

              .searchCont_li_r {
                flex: 1;
                flex-wrap: wrap;
                font-size: 14px;
                margin-right: 12px;
                transition: 0.3s height ease-in-out;
                display: flex;

                &>div {
                  line-height: 25px;
                  margin-right: 20px;
                  color: #60636f;
                  margin-bottom: 5px;
                  cursor: pointer;
                }

                .active {
                  color: #3388ff;
                }

                .item {
                  line-height: 23px;
                  border-radius: 3px;
                  border: solid 1px #3388ff;
                  align-items: center;
                  padding: 0px 6px;
                  display: flex;
                  color: #3388ff;
                  margin-right: 20px;
                  margin-bottom: 7px;

                  i {
                    margin-top: 1px;
                    margin-left: 6px;
                    cursor: pointer;
                  }
                }
              }

              .more {
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;

                span {
                  margin-right: 2px;
                }

                i {
                  transition: 0.5s;
                }
              }
            }
          }
        }
      }

      // 右侧下方表格

      >.standard_list_wrap {
        height: 100%;
        margin-top: 20px;
        background: white;
        padding: 0px 20px;
        flex: 1;
        position: relative;

        .table_am {
          .am {
            cursor: pointer;
          }
        }

        .sort_module {
          padding: 12px 0px;
          border-bottom: 1px solid #efefef;

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

        // 第二层
        .table_am {
          display: flex;
          height: 50px;
          border-bottom: 1px solid #ececec;
          align-items: center;

          &>div {
            display: flex;
            margin-right: 25px;

            &>span {
              display: flex;
              align-items: center;
            }

            &>i {
              margin-right: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }

    .am {
      cursor: pointer;
    }

    .page {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;

      span {
        flex: 1;
      }
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

    /deep/ .iconfont {
      cursor: pointer;
    }
  }
</style>