<template>
  <div style="position: relative;overflow: hidden;">
    <div style="height: calc(100vh - 50px)" ref="myPage">
      <div class="atlasCont_l_ul">
        <div
          v-for="(item, index) in atlas_typelist"
          :class="item == checked_type ? 'click_active' : ''"
          @click="activeClick(item)"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
      >
        <div
          slot="node"
          slot-scope="{ node }"
          @mouseover="showNodeTips(node, $event)"
          @mouseout="hideNodeTips(node, $event)"
        >
          <span>
            {{ node.text }}
          </span>
        </div>
      </RelationGraph>
    </div>
    <div
      v-if="isShowNodeTipsPanel"
      :style="{
        left: nodeMenuPanelPosition.x + 'px',
        top: nodeMenuPanelPosition.y + 'px',
      }"
      style="
        z-index: 999;
        padding: 10px;
        background-color: #ffffff;
        border: #eeeeee solid 1px;
        box-shadow: 0px 0px 8px #cccccc;
        position: absolute;
      "
    >
      <div
        style="
          line-height: 25px;
          padding-left: 10px;
          color: #888888;
          font-size: 12px;
        "
      >
        {{ currentNode.text }}
      </div>
    </div>
  </div>
</template>

<script>
import RelationGraph from "relation-graph";
export default {
  props: {
    // listUl: {
    //   default: ""
    // },
    clickIdVal: {
      default: ""
    },
  },
  name: "atlasComponents",
  components: { RelationGraph },
  data() {
    return {
      checked_type: "",
      links: [],
      linksNew: [],
      nodes: [],
      rootId: '',
      graphAll: {},
      atlas_typelist: this.$store.state.page.atlasTypeList,
      checked_sex: "",
      isShowCodePanel: false,
      isShowNodeTipsPanel: false,
      listUlnew: [],
      listUlAll: [],
      nodeMenuPanelPosition: { x: 6, y: 34 },
      currentNode: {},
      graphOptions: {
        defaultNodeBorderWidth: 0,
        allowSwitchLineShape: false,
        lineWidth: 2,
        allowSwitchJunctionPoint: false,
        allowShowMiniToolBar: true,
        allowShowMiniNameFilter: false,
        layouts: [
          {
            "label": "中心",
            "layoutName": "center",
            "layoutClassName": "seeks-layout-center",
            "distance_coefficient": 1.5,
            "useLayoutStyleOptions": true,
            "defaultLineWidth": 1.5,
            "defaultNodeFontColor": "#ffffff",
            "defaultNodeBorderWidth": 0
          }

        ]
      }
    };
  },
  mounted() {
    this.layout()
  },
  computed: {
    atlas_data() {
      return this.$store.state.page.atlasImg;
    },
    contractFile() {
      return this.$store.state.page.atlasTypeList;
    }

  },
  methods: {
    
    // 点击上方的标题栏
    activeClick(item) {
      this.checked_type = item;
    },
    // 初始化
    layout() {
      debugger
      this.graphOptions.layouts.push()
    },
    showSeeksGraph(query) {
      var __graph_json_data = this.atlas_data;
      this.$refs.seeksRelationGraph.setJsonData(
        __graph_json_data,
        seeksRGGraph => { }
      );
    },
    // 获取所有的links的 to 和 from 和 text 信息
    hasClickBtn_line() {
      debugger
      this.links = this.$store.state.page.atlasImg.links;
      if (this.linksNew != '') {
        const linksArr = this.linksNew.links
        const arr = []
        for (let i in linksArr) {
          arr.push(linksArr[i])
        }
        arr.forEach(arrs => {
          this.links.push(arrs)
        })
      }
    },
    // 获取所有的 node 的 节点 信息
    hasClickBtn_node() {
      debugger
      const _all_json = this.$refs.seeksRelationGraph.getGraphJsonData();
      const graphNodesAll = _all_json.nodes;
      this.rootId = _all_json.rootId;
      this.nodes = [];
      graphNodesAll.forEach(graphNodes => {
        this.nodes.push({ "id": graphNodes.id, "text": graphNodes.text, "styleClass": graphNodes.styleClass })
      });
    },
    onNodeClick(nodeObject, $event) {
      debugger
      this.$store.commit("setspinShow_", true);
      this.hasClickBtn_line()
      this.hasClickBtn_node()
      // 取到当前页面的
      // 保存在data里
      this.graphAll = { nodes: this.nodes, links: this.links, rootId: this.rootId }

      const nodeData = {
        id: nodeObject.id,
        text: nodeObject.text,
        type: nodeObject.data.category
      };
      if (nodeObject.data.detail != undefined) {
        const typeVal = nodeObject.data.detail.type
        if (typeVal == "none") {
          this.$emit('showBtn', false)
        } else {
          this.$emit('showBtn', true)
          this.$emit('typeVal', nodeObject.data.detail.type)
          this.$emit('typeInfo', nodeObject.data.detail.info)
        }
      }
      const parameter = {
        click: nodeObject.id,
        graph: this.graphAll
      }
      const baseUrl = this.$route.path
      if (baseUrl === '/BasicDetail' || baseUrl === '/CivilAviationDetail' || baseUrl == '/BasicQuotaDetail') {
        this.$axios(
          "/baike/newindex/tupu/click_node",
          "post",
          parameter
        ).then(res => {
          this.$store.commit("setspinShow_", false);
          this.listUlnew = res.data.data.typelist
          this.linksNew = res.data.data.graph
          this.newatlasBtn(res.data.data.graph)
        });
      } else if (baseUrl === '/atlasImg') {
        this.$axios(
          "/baike/newindex/tupu/click_node_main",
          "post",
          parameter
        ).then(res => {
          this.$store.commit("setspinShow_", false);
          this.listUlnew = res.data.data.typelist
          this.$emit("rightList", res.data.data.nodelist);
          this.linksNew = res.data.data.graph
          this.newatlasBtn(res.data.data.graph)
        });
        this.$emit("nodeClick", nodeData);
      } else if (baseUrl === '/TermDetail') {
        this.$axios(
          "/baike/hangkongshuyu/click_node",
          "post",
          parameter
        ).then(res => {
          this.$store.commit("setspinShow_", false);
          this.listUlnew = res.data.data.typelist
          this.linksNew = res.data.data.graph
          this.newatlasBtn(res.data.data.graph)
        });
      } else if (baseUrl === '/ElectronDetailTools' || baseUrl === '/ElectronDetailInvalid' || baseUrl == '/ElectronDetail') {
        this.$axios(
          "/baike/newindex/tupu/click_node",
          "post",
          parameter
        ).then(res => {
          this.$store.commit("setspinShow_", false);
          this.listUlnew = res.data.data.typelist
          this.linksNew = res.data.data.graph
          this.newatlasBtn(res.data.data.graph)
        });
      } else if(baseUrl === '/standard/standardAtlas'){


      }else {
        this.$store.commit("setspinShow_", false);
      }
      // /


    },
    newatlasBtn(res) {
      var __graph_json_data = res
      this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => { })
    },
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject;
      var _base_position = this.$refs.myPage.getBoundingClientRect();
      this.isShowNodeTipsPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10;
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false;
    }
  },
  watch: {
    contractFile: {
      handler: function (newval) {
        this.atlas_typelist = newval
      }
    },
    atlas_data(neWval) {
      this.showSeeksGraph();
    },
    listUlnew(neWval, oldval) {
      let arr1 = this.atlas_typelist
      let arr2 = neWval;
      let arr = arr1.concat(arr2);
      let arrNew = new Set(arr);
      this.atlas_typelist = Array.from(arrNew)
    },
    clickIdVal() {
      var graph = this.$refs.seeksRelationGraph
      graph.focusNodeById(this.clickIdVal)
    },
    // 筛选
    checked_type() {
      var _all_nodes = this.$refs.seeksRelationGraph.getNodes();
      var _all_lines = this.$refs.seeksRelationGraph.getLines()
      _all_nodes.forEach(thisNode => {
        var _isHideThisLine = false;
        if (this.checked_type != "全部") {
          console.log(thisNode.data["category"],)
          if (thisNode.data["category"] == this.checked_type) {
            _isHideThisLine = true;
          }
          thisNode.opacity = _isHideThisLine ? 1 : 0.1;
        } else {
          thisNode.opacity = 1;
        }
      });
    }

  }
};
</script>

<style lang="less">
@import "/styles/atlasColor.css";
.atlasCont_l_ul {
  width: 100%;
  overflow: hidden;
  .click_active {
    border-color: #3388ff;
    color: #3388ff;
  }
  > div {
    float: left;
    min-width: 80px;
    padding: 0px 20px;
    margin: 5px 0;
    height: 32px;
    border: 1px solid #d7d7d7;
    margin-right: 10px;
    text-align: center;
    line-height: 32px;
    color: #60636f;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
  }
}
.my-node-style {
  background-color: red !important; /** 通过自定义样式设置节点颜色需要加 !important **/
  color: red !important;
}
.rel-node-peel {
  overflow: hidden;
  cursor: pointer;
  font-size: 12px !important;
}
.my-node-style:hover {
  background-color: #ff0000 !important;
}
/* 大 */
.bigBox {
  width: 70px !important;
  height: 70px !important;
}
/* 中 */
.middleBox {
  width: 58px !important;
  height: 58px !important;
}
/* 小 */
.smallBox {
  width: 48px !important;
  height: 48px !important;
}
/* 绿色 */
.color1 {
  background: #07b36e !important;
}
.color1hover {
  box-shadow: 0px 0px 6px 4px #07b36e !important;
}
/* 橙色 */
.color2 {
  background: #fa761d !important;
}
.color2hover {
  box-shadow: 0px 0px 6px 4px #fa761d !important;
}

/* 蓝色 */
.color3 {
  background: #3ea0fa !important;
}
.color3hover {
  box-shadow: 0px 0px 6px 4px #3ea0fa !important;
}
/* 黄色 */
.color4 {
  background: #ffba00 !important;
}
.color4hover {
  box-shadow: 0px 0px 6px 4px #ffba00 !important;
}
/* 紫色 */
.color5 {
  background: #9d9ffb !important;
}
.color5hover {
  box-shadow: 0px 0px 6px 4px #9d9ffb !important;
}
/* 红色 */
.color6 {
  background: #f29661 !important;
}
.color6hover {
  box-shadow: 0px 0px 6px 4px #f29661 !important;
}
/* 灰色 */
.color7 {
  background: #a8b0bf !important;
}
.color7hover {
  box-shadow: 0px 0px 6px 4px #a8b0bf !important;
}
/* 粉色 */
.color8 {
  background: #fcbdba !important;
}
.color8hover {
  box-shadow: 0px 0px 6px 4px #fcbdba !important;
}

/* 标准分类 */
.BZFL {
  .bigBox();
  .color4();
}
.rel-node-checked.BZFL {
  .color4hover();
}
.rel-node-hover.BZFL {
  .color4hover();
}
.BZFL.rel-node-shape-0:hover {
  .color4hover();
}
/* 标准 */
.BZ {
  .middleBox();
  .color3();
}
.rel-node-checked.BZ {
  .color3hover();
}
.rel-node-hover.BZ {
  .color3hover();
}
.BZ.rel-node-shape-0:hover {
  .color3hover();
}
/* 标准指标 */
.BZZB {
  .smallBox();
  .color4();
}
.rel-node-checked.BZZB {
  .color4hover();
}
.rel-node-hover.BZZB {
  .color4hover();
}
.BZZB.rel-node-shape-0:hover {
  .color4hover();
}
/* 机构 */
.JG {
  .bigBox();
  .color1();
}
.rel-node-checked.JG {
  .color1hover();
}
.rel-node-hover.JG {
  .color1hover();
}
.JG.rel-node-shape-0:hover {
  .color1hover();
}
/* 人员 */
.YR {
  .smallBox();
  .color4();
}
.rel-node-checked.YR {
  .color4hover();
}
.rel-node-hover.YR {
  .color4hover();
}
.YR.rel-node-shape-0:hover {
  .color4hover();
}
/* 项目 */
.XM {
  .middleBox();
  .color7();
}
.rel-node-checked.XM {
  .color7hover();
}
.rel-node-hover.XM {
  .color7hover();
}
.XM.rel-node-shape-0:hover {
  .color7hover();
}
/* 装备类型 */
.ZBLX {
  .bigBox();
  .color1();
}
.rel-node-checked.ZBLX {
  .color1hover();
}
.rel-node-hover.ZBLX {
  .color1hover();
}
.ZBLX.rel-node-shape-0:hover {
  .color1hover();
}
/* 装备结构 */
.ZBJG {
  .middleBox();
  .color4();
}
.rel-node-checked.ZBJG {
  .color4hover();
}
.rel-node-hover.ZBJG {
  .color4hover();
}
.ZBJG.rel-node-shape-0:hover {
  .color4hover();
}
/* 设备/零部件 */
.SBLBJ {
  .smallBox();
  .color8();
}
.rel-node-checked.SBLBJ {
  .color8hover();
}
.rel-node-hover.SBLBJ {
  .color8hover();
}
.SBLBJ.rel-node-shape-0:hover {
  .color8hover();
}
/* 装备型号 */
.ZBFH {
  .middleBox();
  .color6();
}
.rel-node-checked.ZBFH {
  .color6hover();
}
.rel-node-hover.ZBFH {
  .color6hover();
}
.ZBFH.rel-node-shape-0:hover {
  .color6hover();
}
/* 装备逐号 */
.ZBZH {
  .smallBox();
  .color6();
}
.rel-node-checked.ZBZH {
  .color6hover();
}
.rel-node-hover.ZBZH {
  .color6hover();
}
.ZBZH.rel-node-shape-0:hover {
  .color6hover();
}
/* 术语 */
.SY {
  .smallBox();
  .color7();
}
.rel-node-checked.SY {
  .color7hover();
}
.rel-node-hover.SY {
  .color7hover();
}
.SY.rel-node-shape-0:hover {
  .color7hover();
}
/* 民航事故 */
.MHSG {
  .middleBox();
  .color5();
}
.rel-node-checked.MHSG {
  .color5hover();
}
.rel-node-hover.MHSG {
  .color5hover();
}
.MHSG.rel-node-shape-0:hover {
  .color5hover();
}
/* 事故 */
.SG {
  .bigBox();
  .color1();
}
.rel-node-checked.SG {
  .color1hover();
}
.rel-node-hover.SG {
  .color1hover();
}
.SG.rel-node-shape-0:hover {
  .color1hover();
}
/* 事件 */
.SJ {
  .middleBox();
  .color2();
}
.rel-node-checked.SJ {
  .color2hover();
}
.rel-node-hover.SJ {
  .color2hover();
}
.SJ.rel-node-shape-0:hover {
  .color2hover();
}
/* .体系架构节点 */
.JTZXBZTXJGJD {
  .middleBox();
  .color7();
}
.rel-node-checked.JTZXBZTXJGJD {
  .color7hover();
}
.rel-node-hover.JTZXBZTXJGJD {
  .color7hover();
}
.JTZXBZTXJGJD.rel-node-shape-0:hover {
  .color7hover();
}
/* 产品层级 */
.CPCJ {
  .middleBox();
  .color6();
}
.rel-node-checked.CPCJ {
  .color6hover();
}
.rel-node-hover.CPCJ {
  .color6hover();
}
.CPCJ.rel-node-shape-0:hover {
  .color6hover();
}
/* 元器件品种 */
.YQJPZ {
  .middleBox();
  .color6();
}
.rel-node-checked.YQJPZ {
  .color6hover();
}
.rel-node-hover.YQJPZ {
  .color6hover();
}
.YQJPZ.rel-node-shape-0:hover {
  .color6hover();
}
/* WBS层次 */
.WBSCC {
  .middleBox();
  .color1();
}
.rel-node-checked.WBSCC {
  .color1hover();
}
.rel-node-hover.WBSCC {
  .color1hover();
}
.WBSCC.rel-node-shape-0:hover {
  .color1hover();
}
/* 标准级别 */
.BZJB {
  .middleBox();
  .color2();
}
.rel-node-checked.BZJB {
  .color2hover();
}
.rel-node-hover.BZJB {
  .color2hover();
}
.BZJB.rel-node-shape-0:hover {
  .color2hover();
}
/* 标准专业 */
.BZZY {
  .middleBox();
  .color3();
}
.rel-node-checked.BZZY {
  .color3hover();
}
.rel-node-hover.BZZY {
  .color3hover();
}
.BZZY.rel-node-shape-0:hover {
  .color3hover();
}
/* 标准层次 */
.BZCC {
  .middleBox();
  .color4();
}
.rel-node-checked.BZCC {
  .color4hover();
}
.rel-node-hover.BZCC {
  .color4hover();
}
.BZCC.rel-node-shape-0:hover {
  .color4hover();
}
/* 标准领域 */
.BZLY {
  .middleBox();
  .color5();
}
.rel-node-checked.BZLY {
  .color5hover();
}
.rel-node-hover.BZLY {
  .color5hover();
}
.BZLY.rel-node-shape-0:hover {
  .color5hover();
}
/* 分析设备与工具 */
.SBGJ {
  .middleBox();
  .color6();
}
.rel-node-checked.SBGJ {
  .color6hover();
}
.rel-node-hover.SBGJ {
  .color6hover();
}
.SBGJ.rel-node-shape-0:hover {
  .color6hover();
}
/* 失效案例 */
.SXAL {
  .middleBox();
  .color3();
}
.rel-node-checked.SXAL {
  .color3hover();
}
.rel-node-hover.SXAL {
  .color3hover();
}
.SXAL.rel-node-shape-0:hover {
  .color3hover();
}
/* 元器件厂家 */
.YQJCJ {
  .middleBox();
  .color1();
}
.rel-node-checked.YQJCJ {
  .color1hover();
}
.rel-node-hover.YQJCJ {
  .color1hover();
}
.YQJCJ.rel-node-shape-0:hover {
  .color1hover();
}
/* 元器件分类 */
.YQJFL {
  .middleBox();
  .color5();
}
.rel-node-checked.YQJFL {
  .color5hover();
}
.rel-node-hover.YQJFL {
  .color5hover();
}
.YQJFL.rel-node-shape-0:hover {
  .color5hover();
}

.c-node-text > span {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  overflow: hidden !important;
}
.rel-node-checked {
  box-shadow: 0px 0px 1px 4px skyblue !important;
}
.rel-node-shape-0 > div > span {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  overflow: hidden !important;
}
.rel-node-shape-0:hover {
  box-shadow: 0px 0px 5px 1px skyblue !important;
}
</style>