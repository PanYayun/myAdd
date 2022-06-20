<template>
  <div>
    <el-dialog
      :visible.sync="isNewTree"
      width="30%"
      :before-close="handleClose"
    >
      <div slot="title">新增知识体系</div>
      <div class="treeCont">
        <div class="establishName">
          <div>知识体系名称：</div>
          <el-input placeholder="请输入内容" v-model="newTreeName"> </el-input>
        </div>
        <div class="newTreeNav">
          <ul>
            <li
              v-for="(item, index) in treeList"
              :key="index"
              :class="{ active: nowIndex == index }"
              @click="treeNavClick(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="newTreeSearch">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="newTreeSearch"
          >
          </el-input>
        </div>
        <div class="newTreeCont">
          <div
            v-for="(item, index) in treeList"
            :key="index"
            :class="{ isShowDiv: nowIndex == index }"
          >
            <el-tree
              :data="data"
              show-checkbox
              class="filter-tree"
              ref="tree"
              node-key="id"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              default-expand-all
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" size="mini" @click="() => append(data)"
                    >Append</el-button
                  >
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                  >
                    Delete
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isNewTree = false">取 消</el-button>
        <el-button type="primary" @click="isNewTree = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  props: {
    isNewTreeList: {
      type: Boolean,
      default: false,
    },
  },
  name: "",
  components: {},
  props: {},
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
              },
              {
                id: 10,
                label: "三级 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1",
          },
          {
            id: 8,
            label: "二级 3-2",
          },
        ],
      },
    ];
    return {
      isNewTree: "", //判断弹窗的显示隐藏
      newTreeName: "", //新建的树的名字
      newTreeSearch: "", //搜索树的名字
      treeList: ["集团标准体系", "国军标体系", "823A", "823B"], //树的nav
      nowIndex: "",
      data: JSON.parse(JSON.stringify(data)),
    };
  },
  watch: {
    isNewTreeList: {
      handler: function(newval) {
        this.isNewTree = newval;
      },
    },
    newTreeSearch(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // nav点击切换
    treeNavClick(index) {
      this.nowIndex = index;
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 0 0;
}
.treeCont {
  overflow: hidden;
  padding: 8px;
  // 创建树的新名字
  .establishName {
    display: flex;
    align-items: center;
    div {
      font-size: 14px;
      width: 106px;
    }
    .el-input {
      flex: 1;
      /deep/ .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      /deep/ .el-input__icon {
        line-height: 32px;
        height: 32px;
      }
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  // nav
  .newTreeNav {
    overflow: hidden;
    margin-top: 10px;

    & > ul {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      overflow: hidden;
      display: -webkit-box;
      overflow-x: scroll;
      display: -webkit-box;
      -webkit-overflow-scrolling: touch;
      & > li {
        padding: 0 5px;
        height: 38px;
        line-height: 38px;
        float: left;
        font-size: 14px;
        color: #323232;
        position: relative;
        cursor: pointer;
      }
      & > .active:after {
        bottom: -1px;
      }
      & > .active:after {
        content: "";
        width: 100%;
        height: 2px;
        background: #3388ff;
        position: absolute;
        bottom: 1px;
        left: 0px;
      }
    }
  }
  // 搜索框
  .newTreeSearch {
    .el-input {
      flex: 1;
      /deep/ .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      /deep/ .el-input__icon {
        line-height: 32px;
        height: 32px;
      }
    }
  }
  // 树的结构
  .newTreeCont {
    height: 300px;
    width: 100%;
    margin-top: 10px;
    & > div {
      display: none;
    }
  }
  .isShowDiv {
    display: block !important;
  }
}
</style>
