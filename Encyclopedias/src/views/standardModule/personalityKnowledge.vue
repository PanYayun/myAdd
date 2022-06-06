<template>
  <div>
    <!-- <div class="hotNews">
      <div class="hotNews_l">
        <img style="margin-right:8px" src="~@/img/icon/icon_laba.png" alt="" />
        我的知识动态：
      </div>
      <div class="hotNews_r">
        <div>知识体系动态:增加10项目、删掉8项、更改6项</div>
        <div>知识积累动态:收藏10项目、删掉8项、更改6项</div>
        <div>知识分享动态:分享12项</div>
      </div>
    </div> -->
    <div class="content">
      <div class="content_l">
        <div class="content_l_title">
          我的知识体系
        </div>
        <div style="padding:0 16px;box-sizeing:border-box;">
          <div class="content_l_title_search">
            <Select
              clearable
              v-model="treeSearchVal"
              style="width:120px;"
              @on-change="tree_change"
            >
              <Option
                v-for="item in treeSearchList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}
              </Option>
            </Select>
            <Button type="primary" class="system_btn" @click="addNewProject"
              >新建</Button
            >
            <!-- <Button type="primary" class="system_btn" @click="editNewProject"
              >编辑</Button
            > -->
          </div>
          <div>
            <Tree
              class="user_tree"
              :data="treeData"
              :show-checkbox="false"
              :render="renderContent"
              @on-select-change="treeChange"
            ></Tree>
          </div>
        </div>
      </div>
      <div class="content_r">
        <!-- 查询条件 -->
        <div class="query_module">
          <!-- 查询头部 -->
          <div class="query_title" style="justify-content: space-between;">
            <span>查询标准</span>
            <Select
              v-model="serchTypeVal"
              @on-change="miji_change"
              style="width: 100px;margin-right: 20px;"
            >
              <Option
                v-for="item in searchTypeList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}
              </Option>
            </Select>
            <Input
              search
              placeholder="请输入标准号或标准名称关键字进行搜索"
              style="width: 310px"
              v-model="searchVal"
              @on-search="conditionData"
            ></Input>
          </div>
          <!-- 查询内容 -->
          <div class="searchCont">
            <ul class="searchCont_all">
              <li
                class="searchCont_li"
                :key="index"
                v-for="(search, index) in dataSearch"
              >
                <div class="searchCont_li_l">{{ search.standDataTittle }}</div>
                <div
                  class="searchCont_li_r"
                  ref="wrap"
                  :style="{
                    height: search.isOpen ? search.openH : search.closeH,
                  }"
                >
                  <div
                    @click="
                      selectedCondition(
                        item.standId,
                        item.standName,
                        item.standCounts
                      )
                    "
                    :key="index"
                    :id="item.standId"
                    v-for="(item, index) in search.stands"
                  >
                    {{ item.standName }}
                  </div>
                </div>
                <div
                  class="more"
                  @click="fold(index)"
                  v-if="search.openH != '30px'"
                >
                  <span>{{ search.isOpen ? "收起" : "展开" }}</span>
                  <i
                    class="iconfont icon-shouqi"
                    :style="{
                      transform: search.isOpen
                        ? 'rotate(0deg)'
                        : 'rotate(-180deg)',
                    }"
                  ></i>
                </div>
              </li>
            </ul>
            <div class="searchCont_all">
              <li class="searchCont_li">
                <div class="searchCont_li_l">检索条件：</div>
                <div class="searchCont_li_r">
                  <div
                    class="item"
                    v-for="(item, indexs) in conditionList"
                    :key="item.standId"
                  >
                    <span>{{ item.standName }}</span>
                    <i
                      class="iconfont icon-cuowu"
                      @click="clearCondition(indexs)"
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
              </li>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="standard_list_wrap">
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
          <div class="table_am">
            <div class="selected_num">
              (<span style="margin: 0px 3px;"
                >已选<span style="color: #3388ff;margin: 0px 3px;">{{
                  selectedNum
                }}</span
                >条</span
              >)
            </div>
            <div class="am " @click="clearSelected">
              <i class="iconfont icon-lajitong"></i>
              <span>清除已选</span>
            </div>
            <div class="am " @click="jumpzstp">
              <i class="iconfont icon-chakan"></i>
              <span>查看标准关系图谱</span>
            </div>
            <div
              style="display:flex;flex: 1;margin-right: 0px;justify-content: flex-end;"
            >
              找到<span style="margin: 0px 3px;color: #3388ff;">{{
                total
              }}</span
              >条结果
            </div>
          </div>
          <div>
            <Table
              border
              :columns="tableTitle"
              :data="tableData"
              :loading="Table_loading"
              @on-selection-change="table_change"
              ref="tables"
              height="521"
            ></Table>
            <div class="page">
              <span
                >每页10条,共计<span style="margin: 0px 3px;color: #3388ff;">{{
                  totalPage
                }}</span
                >页</span
              >
              <Page :total="total" @on-change="pageChange" ref="pages"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  创建体系 -->
    <create-system ref="createSystem"></create-system>
  </div>
</template>

<script>
import sort from "@/components/sort"; //右侧筛选

import createSystem from "./components/createSystem"; //创建新体系
export default {
  components: {
    createSystem,
    sort,
  },
  props: {},
  data() {
    return {
      sortList: [
        //排序列表
        { text: "标准编号", key: "classificationCode" },
        { text: "标准名称", key: "standName" },
        { text: "发布时间", key: "releaseTime" },
      ],
      Table_loading: true,
      treeData: [], //树数据
      dataSearch: [], //查询数据
      tableData: [], //查询数据
      treeSearchVal: "", //左侧树筛选下拉关键字
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
      tableTitle: [
        {
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
                  "span",
                  {
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
                          query: { id: params.row.standCode },
                        });
                      },
                    },
                  },
                  params.row.standCode
                ), // 表格显示文字
                h(
                  "div",
                  {
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
                  "span",
                  {
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
                          query: { id: params.row.standCode },
                        });
                      },
                    },
                  },
                  params.row.standName
                ), // 表格显示文字
                h(
                  "div",
                  {
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
          render: function(h, params) {
            let className = null;
            let { status } = params.row;
            if (status == null) return;
            if (status == "计划") {
              className = "plan";
            } else if (status == "有效") {
              className = "valid";
            } else {
              className = "abolish";
            }
            return h(
              "div",
              {
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
                "div",
                {
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
                          query: { id: params.row.standCode },
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
                          query: { id: params.row.standCode },
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
  watch: {},
  computed: {
    totalPage: function() {
      let pageNum = !this.total ? 0 : Math.ceil(this.total / 10);
      return pageNum;
    },
  },
  methods: {
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

      this.TableList();
      this.$forceUpdate();
    },
    // 折叠
    fold(index) {
      const { isOpen } = this.dataSearch[index];
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
      this.$refs.createSystem.editFile();
      this.$refs.createSystem.showModal();
    },
    //左侧的编辑按钮
    editNewProject() {},
    // 获取当前页面的值
    treeChange(item) {
      if (item.length != 0) {
        // 处于选中状态
        // 体系标准ID
        this.txStandId = item[0].txNodeId;
        // 重置全部的数据的状态，默认不选中，可操作
        this.update_disabled(this.treeData);
        this.find_update(this.treeData, item[0].txNodeId);
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
            param: { BZBH: id },
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
            param: { BZBH: id },
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
    // 体系树选择筛选树数据
    tree_change(item) {
      this.$axios("/baike/standServer/requestData", "get", {
        uid: this.$store.state.user.userInfo.username,
        uToken: this.$store.state.user.userInfo.token,
        requestSource: "BZ",
        requestCode: "90226",
        requestFuncId: "102",
        requestTime: Date.parse(new Date()) / 1000,
        requestParams: {
          // 体系名
          txName: item,
        },
      })
        .then((res) => {
          let Tree_list = [res.data.data.children];
          Tree_list.map((item) => {
            // 默认不选中
            item.selected = false;
            // 不可操作
            item.disabled = true;
          });
          if (Tree_list[0].children.length) {
            Tree_list[0].expand = true;
            Tree_list[0].children[0].selected = true;
            Tree_list[0].children[0].disabled = true;
            this.txStandId = Tree_list[0].children[0].txNodeId;
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
  created() {
    // 获取体系树数据
    this.$axios("/baike/standServer/requestData", "get", {
      uid: this.$store.state.user.userInfo.username,
      uToken: this.$store.state.user.userInfo.token,
      requestSource: "BZ",
      requestCode: "90226",
      requestFuncId: "102",
      requestTime: Date.parse(new Date()) / 1000,
      requestParams: {
        // 体系名
        // txName: "我的体系1",
      },
    }).then((res) => {
      let Tree_list = [res.data.data.children];
      this.treeSearchList = res.data.data.txs.map((item) => {
        return { value: item, label: item };
      });
      Tree_list.map((item) => {
        // 默认不选中
        item.selected = false;
        // 不可操作
        item.disabled = true;
      });
      if (Tree_list[0].children.length) {
        Tree_list[0].expand = true;
        Tree_list[0].children[0].selected = true;
        Tree_list[0].children[0].disabled = true;
        this.txStandId = Tree_list[0].children[0].txNodeId;
        this.treeData = Tree_list;
        this.rightData();
        this.TableList();
      } else {
        this.treeData = Tree_list;
        this.rightData();
        this.TableList();
      }
    });
  },
  mounted() {},
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
    & > div {
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
  min-height: calc(100vh - 250px);

  // 左侧内容显示
  .content_l {
    width: 300px;
    min-height: calc(100vh - 250px);
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
              & > div {
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

    > .standard_list_wrap {
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
        & > div {
          display: flex;
          margin-right: 25px;
          & > span {
            display: flex;
            align-items: center;
          }
          & > i {
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
