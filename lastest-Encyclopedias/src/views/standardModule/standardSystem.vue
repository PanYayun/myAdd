<template>
  <div>
    <tab
      :tabList="tabList"
      :tabIndex="tabIndex"
      class="tab"
      @tabClick="toggleNav"
    ></tab>
    <div class="content">
      <!-- 左侧树 -->
      <div class="system_node" :style="{ height: maxHeight }">
        <Spin size="large" fix v-if="!treeData"></Spin>
        <div class="wrap">
          <div class="search flex">
            <!-- 暂时去掉 2021.12.3 -->
            <!-- <Input
              search
              placeholder="请输入分类名称或分类号"
              v-model="treeVal"
              @on-search="searchTreeData"
            ></Input> -->
            <!--                        <Button type="primary" class="system_btn" @click="addSystem">新建</Button>-->
          </div>
          <div class="tree" v-if="treeData">
            <Tree
              :data="treeData"
              :show-checkbox="false"
              :render="renderContent"
              @on-select-change="treeChange"
            ></Tree>
          </div>
        </div>
      </div>
      <!-- 右侧数据 -->
      <div class="data" ref="data">
        <div class="query_module">
          <!-- 查询头 -->
          <div class="query_title flex">
            <span>查询标准</span>
            <!--                        <Select v-model="model1" style="width: 100px;margin-right: 20px;">-->
            <!--                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}-->
            <!--                            </Option>-->
            <!--                        </Select>-->
            <Input
              search
              placeholder="请输入标准号或标准名称关键字进行搜索"
              style="width: 310px"
              v-model="searchVal"
              @on-search="conditionData"
            ></Input>
          </div>
          <!-- 查询列表 -->
          <div class="query_list">
            <div style="position: relative;height: 150px;" v-if="!queryList">
              <Spin size="large" fix></Spin>
            </div>

            <ul v-if="queryList">
              <li v-for="(item, index) in queryList" :key="index">
                <div class="title">{{ item.label }}：</div>
                <div
                  class="list_wrap flex"
                  :style="{ height: item.isOpen ? item.openH : item.closeH }"
                  ref="wrap"
                >
                  <div
                    v-for="(itemList, indexList) in item.list"
                    :key="indexList"
                    :class="{ active: itemList.selected }"
                    @click="selectedCondition(item, itemList, index, indexList)"
                  >
                    {{ itemList.dictLabel }}
                  </div>
                </div>
                <div
                  class="more"
                  @click="fold(index)"
                  v-if="item.openH != '30px'"
                >
                  <span>{{ item.isOpen ? "收起" : "展开" }}</span>
                  <i
                    class="iconfont icon-shouqi"
                    :style="{
                      transform: item.isOpen
                        ? 'rotate(0deg)'
                        : 'rotate(-180deg)',
                    }"
                  ></i>
                </div>
              </li>
            </ul>
            <div class="searching_condition flex" v-if="queryList">
              <div class="title">检索条件：</div>
              <div class="list">
                <div
                  class="item"
                  v-for="(item, index) in conditionList"
                  :key="index"
                >
                  <span>{{ item.dictLabel }}</span>
                  <i
                    class="iconfont icon-cuowu"
                    @click="clearCondition(item, index)"
                  ></i>
                </div>
                <div
                  class="reset_condition"
                  v-if="conditionList.length != 0"
                  @click="resetCondition"
                >
                  重置条件
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="standard_list_wrap" ref="listWrap">
          <Spin size="large" fix v-if="tableLoading"></Spin>
          <!-- 排序 -->
          <div class="sort_module flex">
            <sort
              v-for="(item, index) in sortList"
              :sortType="item.sortType"
              :text="item.text"
              :key="item.key"
              @sort="sort(item.key, index)"
            ></sort>
          </div>
          <!-- 排序下的功能键 -->
          <div class="table_am flex">
            <div class="selected_num">
              (<span style="margin: 0px 3px;"
                >已选<span style="color: #3388ff;margin: 0px 3px;">{{
                  selectedNum
                }}</span
                >条</span
              >)
            </div>
            <div class="am flex" @click="clearSelected">
              <i class="iconfont icon-lajitong"></i>
              <span>清除已选</span>
            </div>
            <div class="am flex" @click="jumpzstp">
              <i class="iconfont icon-chakan"></i>
              <span>查看标准关系图谱</span>
            </div>
            <!--                        <div class="am flex" @click="addSystem">-->
            <!--                            <i class="iconfont icon-shujucaiji-"></i>-->
            <!--                            <span>纳入自定义体系</span>-->
            <!--                        </div>-->
            <div
              class="flex"
              style="flex: 1;margin-right: 0px;justify-content: flex-end;"
            >
              找到<span style="margin: 0px 3px;color: #3388ff;">{{
                !dataSource ? 0 : dataSource.length
              }}</span
              >条结果
            </div>
          </div>
          <!-- 表格数据 -->
          <div class="data_list">
            <standard-list
              :columns="columns"
              :dataSource="dataSource ? dataSource : []"
              :total="total"
              @change="pageChange"
              @table_change="table_change"
              @table_select="table_select"
              ref="table"
            ></standard-list>
          </div>
        </div>
      </div>
    </div>
    <!--  创建体系 -->
    <create-system ref="createSystem"></create-system>
  </div>
</template>

<script>
import tab from "@/components/tab"; //顶部消息
import sort from "@/components/sort"; //右侧筛选
import { construct } from "@aximario/json-tree";
import standardList from "@/components/standardList"; //表格+页码
import elementResizeDetectorMaker from "element-resize-detector"; //查看更多
import {
  gjbSearchCondition, //智慧标准体系页—832A和832搜索条件
  gjbSystemList, // 智慧标准体系页—832A和832体系列表
  mirrorTree, //智慧标准体系页—832和832a标准分类树
  searchCondition, // 智慧标准体系页—集团标准体系和国军标搜索条件
  standardTree, //智慧标准体系页—国军标和国家标准体系查询树
  systemList, // 智慧标准体系页—集团标准体系和国军标体系列表
} from "@/libs/api"; //获取接口
import createSystem from "./components/createSystem"; //创建新体系

export default {
  name: "standardSystem",
  components: {
    tab,
    sort,
    standardList,
    createSystem,
  },
  data() {
    return {
      // 顶部列表信息
      tabList: [
        { text: "集团标准体系", treeApi: "standard", classType: 2 },
        { text: "国军标体系", treeApi: "standard", classType: 1 },
        { text: "832A", treeApi: "mirror", classType: 3 },
        { text: "832", treeApi: "mirror", classType: 4 },
      ],
      tabIndex: 0, //默认下标
      treeData: null, //左侧树的数据
      queryList: null, //查询列表
      conditionList: [], //条件列表
      maxHeight: null, //最大高度
      erd: elementResizeDetectorMaker(), //查看更多
      sortList: [
        //排序列表
        { text: "标准号", key: "std_no" },
        { text: "标准名称", key: "name_cn" },
        { text: "发布日期", key: "pub_date" },
        { text: "实施日期", key: "implement_date" },
      ],
      treeIds: [], //选择的树的ID
      requiredQuery: {
        //查询必选项
        fieldIdStr: null,
        hTypeStr: null,
        levelIdStr: null,
        productTypeStr: null,
        armyFlagStr: null,
        pageSize: 10,
        pageNum: 1,
      },
      columns: [], //表头
      dataSource: null, //数据
      total: 0, //表格的页码
      selectedNum: 0, //表格选中的数据的条数
      treeVal: "", // 左侧树的搜索关键字
      searchVal: "", //搜索条件
      tableLoading: true, //loading是否出现
      selectData: "", //选中的数据
    };
  },
  mounted() {
    // 获取表头
    this.columns = this.columnsData();
    const { index, id } = this.$route.query;
    if (index != null && index != undefined) {
      this.tabIndex = index;
    } else {
      this.$router.push({
        path: "/standard/standardSystem",
        query: { index: "0" },
      });
    }
    // 获取树
    this.sysManagetreeData(id);
  },
  methods: {
    // 获取表头
    columnsData() {
      let columns = [
        {
          type: "selection",
          width: 80,
          align: "center",
        },
        {
          title: "分类编号",
          key: "sysCode",
          align: "center",
          minWidth: 100,
        },
        {
          title: "分类名称",
          key: "sysName",
          minWidth: 100,
          align: "center",
        },
        {
          title: "标准编号",
          key: "stdNo",
          align: "center",
          minWidth: 150,
          resizable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  class: "jumpKey",
                  style: {
                    cursor: "pointer",
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
          minWidth: 200,
          resizable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    // 设置属性--但是placement不定义，则为自动
                    // placement: "bottom",
                  },
                },
                [
                  h(
                    "span",
                    {
                      class: "jumpKey",
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
                          this.toBZDetail(params);
                        },
                      },
                    },
                    params.row.nameCn
                  ), // 表格显示文字
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    params.row.nameCn // 气泡内的文字
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "标准级别",
          key: "hType",
          align: "center",
          minWidth: 100,
          resizable: true,
        },
        {
          title: "状态",
          key: "stdStateStr",
          minWidth: 80,
          align: "center",
          render: function(h, params) {
            let className = null;
            let { stdStateStr } = params.row;
            if (stdStateStr == "计划") {
              className = "plan";
            } else if (stdStateStr == "有效") {
              className = "valid";
            } else {
              className = "abolish";
            }
            return h(
              "div",
              {
                class: `${className} stdStatus`,
              },
              stdStateStr
            );
          },
        },
        {
          title: "发布日期",
          key: "pubDate",
          minWidth: 100,
          align: "center",
        },
        {
          title: "实施日期",
          key: "implementDate",
          minWidth: 100,
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
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
                      marginRight: "15px",
                      cursor: "pointer",
                    },
                    on: {
                      click: () => {
                        this.collectionBtn(params.row.nameCn, params.row.stdNo);
                      },
                    },
                  }),
                  h("i", {
                    class: "iconfont icon-icon_zhishiku",
                    style: {
                      cursor: "pointer",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/BasicDetail",
                          query: { id: params.row.stdNo },
                        });
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
                      marginRight: "15px",
                      cursor: "pointer",
                    },
                    on: {
                      click: () => {
                        // 取消收藏
                        this.iscollectionCancel(
                          params.row.nameCn,
                          params.row.stdNo
                        );
                      },
                    },
                  }),
                  h("i", {
                    class: "iconfont icon-icon_zhishiku",
                    style: {
                      cursor: "pointer",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/BasicDetail",
                          query: { id: params.row.stdNo },
                        });
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
    // 跳转到详情页
    toBZDetail(values) {
      console.log(values);
      this.$router.push({
        path: "/BasicDetail",
        query: { id: values.row.stdNo },
      });
    },
    // 筛选条件de 点击事件
    selectedCondition({ queryKey }, { dictLabel, dictValue }, pIndex, cIndex) {
      const findRepetition = this.conditionList.find(
        (item) => item.queryKey == queryKey && item.dictValue == dictValue
      );
      if (!findRepetition) {
        this.queryList[pIndex].list[cIndex].selected = true;
        this.conditionList.push({
          dictLabel,
          queryKey,
          dictValue,
          pIndex,
          cIndex,
        });
        this.listData();
      }
    },
    // 收藏按钮
    collectionBtn(val, id) {
      let coliectionData = {
          username: this.$store.state.user.userInfo.username,
          content: {
            type: "标准知识百科",
            name: val,
            param: { BZBH: id },
          },
        },
        _this = this;
      _this
        .$axios("/users/add_collection", "post", coliectionData)
        .then((res) => {
          this.$Message.success("收藏成功");
          this.listData();
        });
    },
    // 取消收藏
    iscollectionCancel(val, id) {
      let coliectionData = {
          username: this.$store.state.user.userInfo.username,
          content: {
            type: "标准知识百科",
            name: val,
            param: { BZBH: id },
          },
        },
        _this = this;
      _this
        .$axios("/users/delete_collection", "post", coliectionData)
        .then((res) => {
          this.$Message.success("已取消收藏");
          this.listData();
        });
    },
    // 选择条件
    filterConditionArr() {
      // 将选中的条件数组过滤成 key value 形式的
      let { conditionList } = this;
      let map = {};
      if (conditionList && conditionList.length > 0) {
        conditionList.forEach((item) => {
          if (!map[item.queryKey]) {
            map[item.queryKey] = [];
          }
          map[item.queryKey].push(item.dictValue);
        });
        for (let key in map) {
          map[key] = map[key].join(",");
        }
        return map;
      }
      return false;
    },
    // 清除某个条件
    clearCondition(item, index) {
      this.conditionList.splice(index, 1);
      const { pIndex, cIndex } = item;
      this.queryList[pIndex].list[cIndex].selected = false;
      this.listData();
    },
    // 重置条件
    resetCondition() {
      this.conditionList = [];
      for (let i of this.queryList) {
        for (let j of i.list) {
          j.selected = false;
        }
      }
      this.listData();
    },
    // 树的渲染条件
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
          },
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: node.children
                  ? "ios-folder-outline"
                  : "ios-document-outline",
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
    // 排序
    sort(key, index) {
      this.sortList.forEach((t, i) => {
        if (i != index) t.sortType = null;
      });
      this.sortList[index].sortType = this.sortList[index].sortType
        ? this.sortList[index].sortType == "asc"
          ? "desc"
          : "asc"
        : "asc";
      this.listData();
      this.$forceUpdate();
    },
    // 点击数获取父节点
    findParentNode(list, id) {
      const mofifNode = (data, cid) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (item.id == id) {
            item.selected = true;
          }
          if (item.id === cid) {
            item.expand = true;
            mofifNode(list, item.pId);
          } else {
            if (item.children) {
              mofifNode(item.children, cid);
            }
          }
        }
      };
      mofifNode(list, id);
    },
    // findParentNode(data, id) {
    //     const field = data.find((item) => item.id === id);
    //     data.forEach(item => {
    //         if (item.id == id) {
    //             item.selected = true;
    //         }
    //     })
    //     if (field == null && field == undefined) {
    //         return false;
    //     }
    //     let parentId = field.pId;
    //     let cache = [field];
    //     //中条件
    //     while (parentId !== 0) {
    //         // 首先找到当前 ParentId
    //         const f = data.find((item) => item.id == parentId);
    //         f.expand = true;
    //         cache.push(f);
    //         parentId = f.pId;
    //     }
    // },
    //查找所有的子节点
    findChildIds(data, id, Arr) {
      for (let i = 0; i < data.length; i++) {
        let len = data[i].children && data[i].children.length > 0;
        let wid = id;
        if (data[i].pId == id) {
          Arr.push(data[i].id);
          wid = data[i].id;
        }
        if (len) {
          this.findChildIds(data[i].children, wid, Arr);
        }
      }
      return Arr;
    },
    // 获取体系树
    sysManagetreeData(id) {
      const { treeApi, classType } = this.tabList[this.tabIndex];
      const url = treeApi == "mirror" ? mirrorTree : standardTree;
      this.$axios(url, "get", { searchQuery: this.treeVal, classType }).then(
        (res) => {
          const { data } = res;
          if (data.code != 500) {
            let treeList = this.filterTreeData(data);
            let selectSystem = null;
            if (id != null && id != undefined) {
              selectSystem = data.find((item) => item.id == id);
              // 查找所有当前选中id的所有父元素  让所有父元素处于展开状态
              this.findParentNode(treeList, selectSystem.id);
            }
            this.treeData = treeList;
            this.treeData.forEach((item, index) => {
              if (item.pId == "0" || item.pId == "-1") {
                item.disabled = true;
              }
            });
            this.treeIds =
              id != null && id != undefined
                ? [...this.findChildIds(treeList, selectSystem.id, []), ...[id]]
                : this.getTreeIds(treeList, []);
            this.listDictData();
          } else {
            this.$Message.error("获取体系树异常！");
          }
        }
      );
    },
    // 获取搜索条件
    listDictData() {
      const { treeApi, classType } = this.tabList[this.tabIndex];
      const url = treeApi == "mirror" ? gjbSearchCondition : searchCondition;
      const allSysIds = this.treeIds.join(",");
      this.$axios(url, "post", this.$qs.stringify({ allSysIds })).then(
        (res) => {
          if (res.data.code != 500) {
            let queryArr = [];
            let key = [
              "ARMY_PEOPLE",
              "PRODUCT_LEVEL",
              "STD_FIELD",
              "STD_LEVEL",
              "STD_RANK",
            ];
            key.forEach((item) => {
              let value = res.data[item];
              if (value && value.length != 0) {
                queryArr.push({
                  key: item,
                  label: this.listDictText(item).text, // label 展示的汉字
                  queryKey: this.listDictText(item).queryKey, // queryKey 点击筛选条件传给服务端的key值
                  list: value,
                  isOpen: false, // 是否展开
                });
              }
            });
            this.queryList = queryArr;
            this.listData();
            this.$nextTick(() => {
              // 数据渲染完之后获取可视高度  点击收起  展开 动态更改div的高度
              const _dom = this.$refs.wrap;
              let _list = this.queryList;
              for (let i = 0; i < _dom.length; i++) {
                _list[i] = {
                  ..._list[i],
                  openH: `${_dom[i].clientHeight}px`,
                  closeH: "25px",
                };
              }
              this.queryList = _list;
              this.$forceUpdate();
            });
          } else {
            this.$Message.error("获取查询条件异常！");
          }
        }
      );
    },
    // 获取列表
    listData(isPage = false) {
      if (!isPage) {
        this.requiredQuery.pageNum = 1;
        this.$refs.table.resetPage();
      }
      this.tableLoading = true;
      this.erd.uninstall(this.$refs.data);
      const sortKey = this.sortList.find((item) => item.sortType);
      const allSysIds = this.treeIds.join(",");
      const filterConditionArr = this.filterConditionArr();
      const parameter = {
        ...this.requiredQuery,
        ...filterConditionArr,
        orderByColumn: sortKey ? sortKey.key : null,
        isAsc: sortKey ? sortKey.sortType : null,
        allSysIds,
        querystr: this.searchVal,
      };
      const { treeApi, classType } = this.tabList[this.tabIndex];
      const url = treeApi == "mirror" ? gjbSystemList : systemList;
      this.$axios(url, "post", this.$qs.stringify(parameter)).then((res) => {
        const { data } = res;
        if (data.code != 500) {
          const _this = this;
          _this.tableLoading = false;
          _this.dataSource = data.rows;
          _this.total = data.total;
          this.erd.listenTo(this.$refs.data, function(element) {
            _this.maxHeight = `${element.clientHeight}px`;
          });
        } else {
          this.$Message.error("获取列表异常！");
        }
      });
    },
    // 筛选树的数据
    filterTreeData(data) {
      let result = construct(data, { id: "id", pid: "pId" });
      const treeData = this.tree(result);
      return treeData;
    },
    tree(result) {
      let newData = this.deepClone(result);
      return this.recursionTree(newData);
    },
    // 递归树
    recursionTree(data) {
      data.forEach((item) => {
        let len = item.children && item.children.length > 0;
        if (item.pId == 0 || item.pId == -1) {
          item.expand = true;
        }
        item.title = item.name;
        if (len) {
          this.recursionTree(item.children);
        }
      });
      return data;
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
    // 树的值改变
    treeChange(data) {
      if (data.length != 0) {
        this.treeIds = this.getTreeIds(data, []);
        this.resetParameter();
        this.tableLoading = true;
        this.listDictData();
        // this.treeData[0].disabled = true;
        this.treeData.forEach((item, index) => {
          if (item.pId == "0" || item.pId == "-1") {
            item.disabled = true;
          }
        });
      }
    },
    // 条件数据筛选
    conditionData() {
      this.listDictData();
    },
    // 查询数据的表头
    listDictText(data) {
      let [text, queryKey] = [null, null];
      switch (data) {
        case "STD_FIELD":
          text = "标准领域";
          queryKey = "fieldIdStr";
          break;
        case "STD_LEVEL":
          text = "标准层级";
          queryKey = "levelIdStr";
          break;
        case "PRODUCT_LEVEL":
          text = "产品层级";
          queryKey = "productTypeStr";
          break;
        case "ARMY_PEOPLE":
          text = "军民属性";
          queryKey = "armyFlagStr";
          break;
        case "STD_RANK":
          text = "标准级别";
          queryKey = "hTypeStr";
          break;
      }
      return { text, queryKey };
    },
    // 清除表格选择
    clearSelected() {
      this.$refs.table.selectAll(false);
    },
    // 页码改变
    pageChange(page) {
      this.selectedNum = 0;
      this.requiredQuery.pageNum = page;
      this.tableLoading = true;
      this.listData(true);
    },
    // 接收表格改变数据
    table_change(data) {
      this.selectedNum = data.length;
    },
    // 接收表格改变数据
    table_select(data) {
      // this.selectedNum = data.length;
      this.selectData = data;
    },
    // 折叠
    fold(index) {
      const { isOpen } = this.queryList[index];
      this.queryList[index].isOpen = !isOpen;
      this.$forceUpdate();
    },
    // 头部切换导航
    toggleNav(index) {
      if (this.tabIndex != index) {
        this.$router.push({
          path: "/standard/standardSystem",
          query: { index: index },
        });
        this.tabIndex = index;
        this.treeData = null;
        this.tableLoading = true;
        this.resetParameter();
        this.sysManagetreeData();
      }
    },
    // 左侧树的搜索关键词
    searchTreeData() {
      // 重置状态
      this.treeData = null;
      this.resetParameter();
      this.sysManagetreeData();
    },
    // 重置参数
    resetParameter() {
      this.queryList = null;
      this.dataSource = null;
      this.requiredQuery.pageNum = 1;
      this.selectedNum = 0;
      this.conditionList = [];
      this.resetSort();
    },
    // 重置排序
    resetSort() {
      this.sortList.forEach((item) => {
        item.sortType = null;
      });
    },
    // 添加系统
    addSystem() {
      this.$refs.createSystem.showModal();
    },
    // 跳转
    jumpzstp() {
      if (this.selectData.length == 0) {
        this.$Message.warning("请选择至少一条标准");
        return false;
      }
      const stdNos = this.selectData.map((item) => item.stdNo).join(",");
      this.$store.dispatch("setStdNo", stdNos);
      this.$router.push("/standard/standardAtlas");
    },
  },
  // 折叠
  beforeDestroy() {
    this.erd.uninstall(this.$refs.data);
  },
};
</script>

<style scoped lang="less">
@import "../../styles/less/standardModule";

/deep/ .ivu-table-cell {
  padding-right: 10px;
  padding-left: 10px;
}

.flex {
  display: flex;
}

.tab {
  margin-bottom: 20px;
  /deep/ .active:after {
    bottom: -1px;
  }
}

.content {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 250px);

  .system_node {
    width: 300px;
    min-height: calc(100vh - 250px);
    background: white;
    overflow: auto;
    float: left;
    position: relative;

    .wrap {
      padding: 0px 16px;
      margin-bottom: 20px;
    }

    .search {
      margin-top: 20px;

      .system_btn {
        margin-left: 6px;
      }
    }

    .tree {
      overflow: auto;
    }
  }

  .data {
    float: left;
    width: calc(100% - 320px);
    min-height: calc(100vh - 250px);
    margin-left: 20px;
    overflow: auto;
    display: flex;
    flex-direction: column;

    > .query_module {
      padding: 0px 20px 20px 20px;
      background: white;

      .query_title {
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #efefef;

        span {
          flex: 1;
          font-size: 15px;
          font-weight: bold;
        }
      }

      .query_list {
        margin-top: 12px;
        overflow: hidden;
      }

      .query_list > ul {
        overflow: hidden;
      }

      .query_list > ul > li {
        display: flex;
        align-items: flex-start;
        margin-bottom: 8px;

        &:last-of-type {
          margin-bottom: 0px;
        }

        .title {
          font-size: 14px;
          font-weight: bold;
          width: 70px;
          line-height: 25px;
        }

        .list_wrap {
          flex: 1;
          flex-wrap: wrap;
          font-size: 14px;
          margin-right: 12px;
          transition: 0.3s height ease-in-out;

          > div {
            line-height: 25px;
            margin-right: 20px;
            color: #60636f;
            margin-bottom: 5px;
            cursor: pointer;
          }

          .active {
            color: #3388ff;
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

      .searching_condition {
        align-items: flex-start;
        margin-top: 8px;
        font-size: 14px;

        .title {
          font-weight: bold;
          width: 70px;
          line-height: 25px;
        }

        .list {
          flex-wrap: wrap;
          display: flex;
          flex: 1;

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

        .reset_condition {
          color: #3388ff;
          cursor: pointer;
          height: 25px;
          line-height: 25px;
        }
      }
    }

    > .standard_list_wrap {
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
    }
  }
}

/deep/ .jumpKey:hover {
  color: #3388ff;
}
/deep/ .jumpKey {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
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
.jumpKey {
  line-height: 20px;
}
</style>
