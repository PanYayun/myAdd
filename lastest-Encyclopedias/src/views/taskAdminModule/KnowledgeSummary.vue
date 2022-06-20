<template>
  <div
    style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px"
  >
    <Card :bordered="false" dis-hover :padding="0">
      <Row>
        <Col
          span="24"
          style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee"
        >
          <p style="font-size: 18px; font-weight: 800">
            "{{ TaskName }}"任务审核
          </p>
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <p style="font-size: 18px; font-weight: 800">文本摘要</p>
        </Col>
        <Col
            span="24"
            style="display:flex;align-items: center;margin:10px 0;"
            class="Stame"
             v-if="StandardKnowledge"
        >
          <span class="StandardName">标准名称：</span>
          <!-- <div class="textName" v-html="name_value"></div> -->
          <Input v-model="standard_name" type="textarea" disabled />
        </Col>
        <Col
            span="24"
            style="display:flex;align-items: center;margin:10px 0;"
            class="Stame"
             v-if="StandardKnowledge"
        >
          <span class="StandardName">标准编号：</span>
          <!-- <div class="textName" v-html="name_value"></div> -->
          <Input v-model="standard_no" type="textarea" disabled />
        </Col>
        <Col   v-if="StandardKnowledge" span="24" style="display:flex;align-items: center;margin:10px 0;">
          <span class="StandardName">适用范围：</span>
          <!-- <div class="textarea" v-html="text_value"></div> -->
          <div class="textarea" v-html="textarea"></div>
        </Col>
          <Col   v-else span="24" style="display:flex;align-items: center;margin:10px 0;">
          <span class="StandardName">事故报告文本：</span>
          <!-- <div class="textarea" v-html="text_value"></div> -->
          <div class="textarea" v-html="textarea"></div>
        </Col>
<!--        <Col span="24">-->
<!--          <div class="textarea" v-html="textarea"></div>-->
<!--        </Col>-->
        <Col span="24" style="padding:  15px 0;text-align: right;">
          <p>当前审核第{{ current_count }}条数据，共{{ total_count }}条</p>
        </Col>
        <Col :span="24" style="display:flex;align-items: center;margin:10px 0;">
          <span style="margin-right:10px">选择摘要类型:</span>
          <Select v-model="model1" style="width:200px" @on-change="CurrentType">
            <Option
              v-for="item in cityList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <Button type="primary" style="width: 100px" @click="PreviousStep()"
            >查看下一条</Button
          >
          <Button
          type="primary"
            style="width: 100px;margin-left:20px;"
            @click="NextSteps()"
            >刷新结果</Button
          >
        </Col>
        <Col span="24" style="padding:  30px 0;">
          <p style="font-size: 18px; font-weight: 800">
            分析结果
          </p>
        </Col>
        <Col span="24">
          <Input
            v-model="value17"
            type="textarea"
          />
        </Col>
      </Row>
      <Row style="padding-bottom:80px">
        <Col
          span="24"
          style="text-align: center; margin-top: 30px;padding-bootm:30px"
        >
          <Button
            type="primary"
            @click="preservation"
            style="width: 100px;margin-right:20px"
            >保存结果</Button
          >
          <Button
          type="primary"
            @click="returnkey"
            style="width: 100px;"
            >返回</Button
          >
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "KnowledgeSummary",
  data() {
    return {
      textarea: "", //文本摘要
      value17: "", //分析结果
      model1: "", //摘要类型
      num: 0, //默认从0
      record_id: "", //当前审核的ID
      total_count: "", //总条数
      current_count: "", //当前审核第几条
      StandardKnowledge: false, //判断是否是相似标准推荐
      cityList: [{ label: "", value: "" }],
      standard_name: "",
      standard_no: "",
    };
  },
  methods: {
    //初始化
    Initialize() {
      //原ID this.toExamineid
      //测试ID "3c0ec79a-00bf-11ec-9e0d-0242ac110006"
      let thats=this.StandardKnowledge?'/baike/yuchuli/biaozhun/check_biaozhun_summary':'/baike/yuchuli/shigu/check_accident_summary';
      this.$axios(
        thats,
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.num,
        })
      ).then((res) => {
        this.textarea = res.data.original_text;
        this.standard_name = res.data.standard_name;
        this.standard_no = res.data.standard_no;
        this.record_id = res.data.record_id;
        this.total_count = res.data.total_count;
        this.current_count = res.data.current_count;
        this.cityList = res.data.model_list.map((item, index) => {
          return {
            label: item.model_type,
            value: index,
            summary: item.summary,
          };
        });
        this.model1 = this.cityList[0].value;
        this.value17 = this.cityList[0].summary;
        console.log(res, "文本摘要");
      });
    },
    //刷新结果
    NextSteps() {
      this.Initialize();
    },
    //下一条数据
    PreviousStep() {
      if (this.current_count === this.total_count) {
        this.$Message.info("已经是最后一条");
        return;
      }
      this.num += 1;
      this.Initialize();
    },
    //保存结果
    preservation() {
      let thats=this.StandardKnowledge?'/baike/yuchuli/biaozhun/save_biaozhun_summary':'/baike/yuchuli/shigu/save_accident_summary';
      this.$axios(
        thats,
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          record_id: this.record_id,
          model_type: this.cityList[this.model1].label,
          summary: this.value17,
        })
      ).then((res) => {
        if (this.total_count === 1) {
          this.$router.push("/TableList/KnowledgeAudit");
          return;
        }
        this.num = 0;
        this.Initialize();
        console.log(res, "保存结果");
      });
    },
    //返回
    returnkey() {
      this.$router.push("/TableList/KnowledgeAudit");
    },
    //选择类型
    CurrentType() {
      this.value17 = this.cityList[this.model1].summary;
      console.log(this.model1);
    },
  },
  mounted() {
     console.log(this.Selected,'是什么');
    this.Selected === "标准知识加工"
      ? (this.StandardKnowledge = true)
      : (this.StandardKnowledge = false);
    this.Initialize();
  },
  computed: {
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    //知识审核传的ID
    toExamineid() {
      return this.$store.state.standard.toExamineid;
    },
    //判断是通过事故还是标准知识进来
    Selected() {
      return this.$store.state.standard.Selected;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/textarea.ivu-input {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #fff;
  border-radius: 0;
  line-height: 2;
}
.textarea {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  //max-width: 100%;
  //min-height: 100px;
  //max-height: 100px;
  //vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  //overflow-y: auto;
  //word-wrap: break-word;
  line-height: 2;
  //margin-left: 24px;
}
.Stame /deep/ .ivu-input {
  min-height: 40px;
  max-height: 40px;
  color: #666;
}
.StandardName {
  display: inline-block;
  width: 12%;
  text-align: right;
  margin-right: 10px;
}
</style>
