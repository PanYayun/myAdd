<template>
  <Modal
    v-model="visible"
    title="标准需求说明"
    width="900"
    v-if="showDemandItem"
    @on-ok="saveInfo()"
  >
    <div slot="footer" style="text-align: center">
      <Button type="text" size="default" @click="coloseView">取消</Button>
      <Button type="primary" size="default" @click="saveInfo">确定</Button>
    </div>
    <Form
      ref="showDemandItem"
      :model="showDemandItem"
      :rules="ruleValidate"
      :label-width="130"
    >
      <FormItem label="标准需求名称：" prop="demandName">
        <Input
          disabled
          v-model="showDemandItem.demandName"
          placeholder="请输入标准需求名称"
        ></Input>
      </FormItem>
      <FormItem label="体系类别：">
        <Select v-model="showDemandItem.stdTypeText" disabled>
          <Option
            v-for="(item, index) in tabList"
            disabled
            :value="item.text"
            :key="index"
            >{{ item.text }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="节点名称：" disabled>
        <selectTree
          class="subStyle"
          v-model="form.systemVal1"
          :treeData="systemTree"
          :showQuery="false"
          :disabled="treeDisabled"
          :defaultQueryVal="seleteTree"
          style="cursor:no-drop"
        ></selectTree>
      </FormItem>
      <FormItem label="用途或场景：" prop="scope">
        <div
          style="cursor: not-allowed;max-height:160px;line-height: 22px;padding:4px 7px;box-sizing: border-box;border:1px solid #e3e5e8;overflow:auto;min-height:70px"
        >
          {{ showDemandItem.scope }}
        </div>
      </FormItem>
      <FormItem label="存在问题：" prop="problem">
        <div
          style="cursor: not-allowed;max-height:160px;line-height: 22px;padding:4px 7px;box-sizing: border-box;border:1px solid #e3e5e8;overflow:auto;min-height:70px"
        >
          {{ showDemandItem.problem }}
        </div>
      </FormItem>
      <FormItem label="标准内容：" prop="content">
        <div
          style="cursor: not-allowed;max-height:160px;line-height: 22px;padding:4px 7px;box-sizing: border-box;border:1px solid #e3e5e8;overflow:auto;min-height:70px"
        >
          {{ showDemandItem.content }}
        </div>
      </FormItem>
      <FormItem label="参考文件：" prop="relatedFile">
        <div
          style="cursor: not-allowed;max-height:160px;line-height: 22px;padding:4px 7px;box-sizing: border-box;border:1px solid #e3e5e8;overflow:auto;min-height:70px"
        >
          {{ showDemandItem.relatedFile }}
        </div>
      </FormItem>
      <FormItem label="状态：" prop="status">
        <RadioGroup v-model="valid" disabled>
          <Radio label="有效" disabled></Radio>
          <Radio label="无效" disabled></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import selectTree from "@/components/selectTree";
import axios from "axios";
import {
  stdDemandEdit,
  stdDemandExportReport, // 生成报告
} from "@/libs/api"; //获取接口

export default {
  name: "feedBack",
  components: {
    selectTree,
  },
  props: {
    appear: {
      type: Boolean,
      default: false,
    },
    demandItem: {},
    tabList: {
      type: Array,
      default: [],
    }, // 体系类别
  },
  data() {
    return {
      treeDisabled: true,
      visible: false,
      showDemandItem: this.demandItem,
      form: {
        systemVal: "",
        systemVal1: "",
        name: "",
      },
      systemTree: [],
      systemShow: false,
      standardShow: false,
      seleteTree: "",
      ruleValidate: {
        demandName: [
          { required: true, message: "请输入标准需求名称", trigger: "blur" },
        ], //标准需求名称
        scope: [
          { required: true, message: "请输入用途或场景", trigger: "blur" },
        ], //用途或场景
        problem: [
          { required: true, message: "请输入存在问题", trigger: "blur" },
        ], //存在问题
        content: [
          { required: true, message: "请输入标准内容", trigger: "blur" },
        ], //标准内容
        relatedFile: [
          { required: false, message: "请输入参考文件", trigger: "blur" },
        ], //参考文件
      },
    };
  },
  mounted() {},
  watch: {},
  methods: {
    coloseView() {
      this.visible = false;
    },
    showModule(item, jiedian) {
      console.log(jiedian, item);
      this.visible = true;
      this.showDemandItem = item;
      this.seleteTree = jiedian;

      var stdTypeText = "";
      if (item.stdType == 0) {
        stdTypeText = "国军标体系";
      } else if (item.stdType == 1) {
        stdTypeText = "集团标准体系";
      } else if (item.stdType == 2) {
        stdTypeText = "832";
      } else if (item.stdType == 3) {
        stdTypeText = "832A";
      }
      this.showDemandItem.stdTypeText = stdTypeText;
    },
    selectSystem() {
      this.systemShow = true;
      this.standardShow = false;
    },
    selectStandard() {
      this.systemShow = false;
      this.standardShow = true;
    },
    saveInfo() {
      this.visible = false;
    },
  },
  computed: {
    valid: {
      get() {
        return this.showDemandItem.status == 1 ? "有效" : "无效";
      },
      set(v) {
        console.log(v);
        this.showDemandItem.status = v === "有效" ? "1" : "0";
      },
    },
  },
};
</script>

<style scoped lang="less">
.treeWrap {
  position: absolute;
  width: calc(100% - 150px);
  height: 200px;
  background-color: #ffffff;
  left: 2px;
  top: 37px;
  overflow: auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 99;
  border-radius: 5px;
}
.subStyle {
  /deep/ .ivu-select-selection:hover {
    border: 1px solid #dcdee2;
  }
  /deep/ .ivu-select-selection {
    background: #f3f3f3;
    color: #ccc;
  }
  /deep/ .ivu-select-arrow {
    color: #ccc;
  }
}

.transition-drop-appear,
.transition-drop-enter-active {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.transition-drop-leave-active {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.transition-drop-appear,
.transition-drop-enter-active {
  -webkit-animation-name: ivuTransitionDropIn;
  animation-name: ivuTransitionDropIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.transition-drop-leave-active {
  -webkit-animation-name: ivuTransitionDropOut;
  animation-name: ivuTransitionDropOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.transition-drop-appear,
.transition-drop-enter-active {
  opacity: 0;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.transition-drop-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
</style>
