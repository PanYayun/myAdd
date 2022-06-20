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
            事理图谱生成过程
          </p>
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <p style="font-size: 18px; font-weight: 800">航空领域文本</p>
        </Col>
        <Col span="24">
          <Input
            v-model="textarea"
            maxlength="100"
            disabled
            show-word-limit
            type="textarea"
            placeholder="Enter something..."
          />
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <Button
            type="primary"
            style="width: 100px"
            @click="PreviousStep(Steps)"
            >上一步</Button
          >
          <Button
            type="primary"
            style="width: 100px;margin-left:20px"
            @click="NextSteps()"
            >返回</Button
          >
          <!-- <Button
            type="primary"
            style="width: 100px;margin-left:20px"
            @click="ReturnSuperior()"
            >返回</Button
          > -->
        </Col>
        <Col span="24" style="padding:  20px 0;">
          <div class="box">
            <div
              :class="[
                Steps === 1 ? 'avtion' : Steps > 1 ? 'avtionllis' : '',
                'item',
              ]"
              style="width:125px"
            >
              <div style="left:0">1</div>
              <span style="left: -25%;">因果关系判断1</span>
            </div>
            <div
              :class="[
                Steps === 2 ? 'avtion' : Steps > 2 ? 'avtionllis' : '',
                'item',
              ]"
            >
              <div>2</div>
              <span style="left: 17%;">因果关系判断2</span>
            </div>
            <div
              :class="[
                Steps === 3 ? 'avtion' : Steps > 3 ? 'avtionllis' : '',
                'item',
              ]"
            >
              <div>3</div>
              <span style="left: 17%;">因果关系判断3</span>
            </div>
            <div
              :class="[
                Steps === 4 ? 'avtion' : Steps > 4 ? 'avtionllis' : '',
                'item',
              ]"
            >
              <div>4</div>
              <span style="left: 30%;">共指消解</span>
            </div>
            <div
              :class="[
                Steps === 5 ? 'avtion' : Steps > 5 ? 'avtionllis' : '',
                'item',
              ]"
            >
              <div>5</div>
              <span style="left: 30%;">事件抽取</span>
            </div>
            <div
              :class="[Steps === 6 ? 'avtion' : '', 'item']"
              style="width:125px"
            >
              <div style="left:auto;right:0">6</div>
              <span style="right: -10%;">图谱生成</span>
            </div>
          </div>
        </Col>
        <Col span="24" style="padding:  30px 0;">
          <p style="font-size: 18px; font-weight: 800">
            {{ description }}
          </p>
        </Col>
      </Row>
    </Card>
    <div style="overflow:hidden;padding-bottom:50px">
      <atlas-components></atlas-components>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { _debounce } from "@/libs/Perform_optimization.js";
import atlasComponents from "@/components/atlasComponents.vue";
export default {
  name: "GenerateTaskSix",
  components: {
    atlasComponents,
  },
  data() {
    return {
      textarea: "未知",
      description: "未知",
      graph: {},
    };
  },
  methods: {
    // 表数据
    TableData_1: _debounce(function() {
      this.$axios(
        "/baike/yuchuli/search_event_graph_new",
        "post",
        this.$qs.stringify({
            subjobid: this.subjobid,
          //测试ID "9e082000-fff6-11eb-aa87-0242ac110006"
          //subjobid: "9e082000-fff6-11eb-aa87-0242ac110006",
          index: 0,
          pageNum: 10,
          pageIndex: 0,
          step: 6,
        })
      ).then((res) => {
        this.textarea = res.data.text;
        this.description = res.data.description;
        // 图谱
        // this.graph = res.data.graph;
        var arr1 = res.data.typelist;
        arr1.unshift("全部");
        this.$store.commit("updated_atlasTypeList", arr1);
        this.$store.commit("updated_atlasImg", res.data.graph);
        setTimeout(() => {
          this.$Spin.hide();
        }, 400);
      });
    }, 200),
    //下一步
    NextSteps() {
      this.$store.dispatch("NextSteps", this.Steps);
      this.$router.push("/TableList/TaskExpertise");
    },
    //上一步
    PreviousStep() {
      this.$store.dispatch("PreviousStep", this.Steps);
      this.$router.push("GenerateTaskFive");
    },
    //返回
    // ReturnSuperior() {
    //   this.$router.push("TaskExpertise");
    // },
  },
  mounted() {
    this.$Spin.show();
    this.TableData_1();
  },
  computed: {
    Steps() {
      return 6;
    },
    subjobid() {
      return this.$store.state.standard.subjobid;
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
  background: #f5f5f5;
  border-radius: 0;
  color: #666;
}
.box {
  display: flex;
  align-items: center;
  margin: 40px 0;
  padding: 0 29px;
  .item {
    position: relative;
    width: 175px;
    height: 3px;
    background: #ccc;
    div {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      color: #fff;
      border: 2px solid #e5e5e5;
      background: #ccc;
      position: absolute;
      top: -22px;
      left: 35%;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    span {
      position: absolute;
      top: 35px;
      font-size: 16px;
      color: #656873;
    }
  }
  .avtion {
    background: #4788ff !important;
    div {
      border: 2px solid #c8dfff;
      background: #4788ff;
    }
    span {
      color: #4788ff;
    }
  }
  .avtionllis {
    background: #a8ccff !important;
    div {
      border: 2px solid #dcebff;
      background: #a8ccff;
    }
  }
}
</style>
