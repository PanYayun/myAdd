<template>
  <Modal v-model="visible" title="标准需求说明" width="900" @on-ok="saveInfo()">
    <div slot="footer" style="text-align: center">
      <Button type="text" size="default" @click="coloseView">取消</Button>
      <Button type="primary" size="default" @click="saveInfo">确定</Button>
    </div>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="130"
    >
      <FormItem label="标准需求名称：" prop="model1">
        <Input
          v-model="formValidate.model1"
          placeholder="请输入标准需求名称"
        ></Input>
      </FormItem>
      <FormItem label="体系类别：">
        <Select v-model="selectTab.text" disabled="">
          <Option
            v-for="(item, index) in tabList"
            :value="item.text"
            :key="index"
            >{{ item.text }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="节点名称：">
        <Select v-model="selectTree" disabled="">
          <Option
            v-for="(item, index) in selectTrees"
            :value="item"
            :key="index"
            >{{ item }}</Option
          >
        </Select>
        <!--        <selectTree v-model="formValidate.model3" :treeData="treeList" :showQuery="false" :disabled="selectTreeDisable" :defaultQueryVal="selectTree"></selectTree>-->
      </FormItem>
      <FormItem label="用途或场景：" prop="model4">
        <Input
          v-model="formValidate.model4"
          type="textarea"
          placeholder="请输入用途或场景"
        />
      </FormItem>
      <FormItem label="存在问题：" prop="model5">
        <Input
          v-model="formValidate.model5"
          type="textarea"
          placeholder="请输入存在的问题"
        />
      </FormItem>
      <FormItem label="标准内容：" prop="model6">
        <Input
          v-model="formValidate.model6"
          type="textarea"
          placeholder="请输入标准内容"
        />
      </FormItem>
      <FormItem label="参考文件：" prop="model7">
        <Input
          v-model="formValidate.model7"
          type="textarea"
          placeholder="请输入参考文件"
        />
      </FormItem>
      <FormItem label="状态：" prop="status">
        <RadioGroup v-model="status" @on-change="changeStatus()">
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
  name: "newDemand",
  components: {
    selectTree,
  },
  props: {
    appear: {
      type: Boolean,
      default: false,
    },
    tabList: {
      type: Array,
      default: [],
    }, // 体系类别
    treeList: {
      type: Array,
      default: [],
    }, //节点名称
  },
  data() {
    return {
      status: "有效",
      selectTreeDisable: true,
      visible: false,
      formValidate: {
        model1: "", //标准需求名称
        model2: "", //体系类别
        model3: "", //节点名称
        model4: "", //用途或场景
        model5: "", //存在问题
        model6: "", //标准内容
        model7: "", //参考文件
      },
      ruleValidate: {
        model1: [
          { required: true, message: "请输入标准需求名称", trigger: "blur" },
        ], //标准需求名称
        model4: [
          { required: true, message: "请输入用途或场景", trigger: "blur" },
        ], //用途或场景
        model5: [
          { required: true, message: "请输入存在问题", trigger: "blur" },
        ], //存在问题
        model6: [
          { required: true, message: "请输入标准内容", trigger: "blur" },
        ], //标准内容
        model7: [
          { required: false, message: "请输入参考文件", trigger: "blur" },
        ], //参考文件
      },
      systemShow: false,
      standardShow: false,
      selectTree: "", //用于展示节点名称
      selectTrees: "", //用于展示节点名称
      selectTab: {}, //体系类别 模型 包含展示字段和上传参数字段
      sysCode: "", //用于节点名称上传字段
    };
  },
  mounted() {},
  watch: {
    treeList: {
      handler(newVal, oldVal) {},
      // 加上之后第一次定义时就会执行
      immediate: true,
    },
  },
  methods: {
    coloseView() {
      this.visible = false;
    },
    //jiedian 用于展示节点名称
    //sysCode 用于节点名称上传字段
    //stdType 体系类别 模型 包含展示字段和上传参数字段
    showModule(item, jiedian, stdType, sysCode) {
      console.log(jiedian, "jiedian");
      this.visible = true;
      this.showDemandItem = item;
      this.selectTrees = { jiedian };
      this.selectTree = jiedian;
      this.selectTab = stdType;
      this.sysCode = sysCode;
      console.log(sysCode, "sysCode = ");

      this.formValidate.model1 = "";
      this.formValidate.model4 = "";
      this.formValidate.model5 = "";
      this.formValidate.model6 = "";
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
      if (!this.formValidate.model1) {
        this.$Message.error("请输入需求名称");
        return;
      }
      if (!this.formValidate.model4) {
        this.$Message.error("请输入用途或场景");
        return;
      }
      if (!this.formValidate.model5) {
        this.$Message.error("请输入存在问题");
        return;
      }
      if (!this.formValidate.model6) {
        this.$Message.error("请输入标准内容");
        return;
      }
      const parameter = {
        demandName: this.formValidate.model1, //  --需求名称
        stdType: this.selectTab.stdType, //  --建议分类体系 0-GJB;1-AVIC;2-832;3-832A
        scope: this.formValidate.model4, //  --用途或场景
        problem: this.formValidate.model5, //  --存在问题
        content: this.formValidate.model6, //  --标准编制内容
        relatedFile: this.formValidate.model7, //  --相关文件
        stdSystemId: this.sysCode, //建议分类号
        status: this.status === "有效" ? 1 : 0,
        username: this.$store.state.user.userInfo.username
      };
      this.$axios(stdDemandEdit, "post", this.$qs.stringify(parameter)).then(
        (res) => {
          if (res.data.demandId) {
            this.visible = false;
            this.$emit("saveFinish");
            this.$Message.success("新增成功");
          } else {
            this.$Message.error("新增失败");
          }
        }
      );
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
