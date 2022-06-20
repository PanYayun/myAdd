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
          v-model="showDemandItem.demandName"
          placeholder="请输入标准需求名称"
        ></Input>
      </FormItem>
      <FormItem label="体系类别：">
        <Select v-model="showDemandItem.stdTypeText" disabled>
          <Option
            v-for="(item, index) in tabList"
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
        <Input
          v-model="showDemandItem.scope"
          type="textarea"
          placeholder="请输入用途或场景"
        />
      </FormItem>
      <FormItem label="存在问题：" prop="problem">
        <Input
          v-model="showDemandItem.problem"
          type="textarea"
          placeholder="请输入存在的问题"
        />
      </FormItem>
      <FormItem label="标准内容：" prop="content">
        <Input
          v-model="showDemandItem.content"
          type="textarea"
          placeholder="请输入标准内容"
        />
      </FormItem>
      <FormItem label="参考文件：" prop="relatedFile">
        <Input
          v-model="showDemandItem.relatedFile"
          type="textarea"
          placeholder="请输入参考文件"
        />
      </FormItem>
      <FormItem label="状态：" prop="status">
        <RadioGroup v-model="valid">
          <Radio label="有效"></Radio>
          <Radio label="无效"></Radio>
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
      if (!this.showDemandItem.demandName) {
        this.$Message.error("请输入需求名称");
        return;
      }
      if (!this.showDemandItem.scope) {
        this.$Message.error("请输入用途或场景");
        return;
      }
      if (!this.showDemandItem.problem) {
        this.$Message.error("请输入存在问题");
        return;
      }
      if (!this.showDemandItem.content) {
        this.$Message.error("请输入标准内容");
        return;
      }
      const parameter = {
        demandId: this.showDemandItem.demandId, // --需求编号
        demandName: this.showDemandItem.demandName, //  --需求名称
        stdType: this.showDemandItem.stdType, //  --建议分类体系 0-GJB;1-AVIC;2-832;3-832A
        scope: this.showDemandItem.scope, //  --用途或场景
        problem: this.showDemandItem.problem, //  --存在问题
        content: this.showDemandItem.content, //  --标准编制内容
        relatedFile: this.showDemandItem.relatedFile, //  --相关文件
        stdSystemId: this.showDemandItem.stdSystemId, //建议分类号
        createDept: this.showDemandItem.createDept, // 提出人所属单位
        status: this.showDemandItem.status, // 状态 0-有效、1-无效
        id: this.showDemandItem.id,
      };
        this.$axios(stdDemandEdit, "post", this.$qs.stringify(parameter))
        .then((res) => {
          console.log(res);
          if (res.data.demandId) {
            this.visible = false;
            this.$emit("saveFinish");
            this.$Message.success("编辑成功");
          } else {
            this.$Message.error("编辑失败");
          }
        });
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
/deep/ .textarea.ivu-input{
  line-height: 22px;
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
