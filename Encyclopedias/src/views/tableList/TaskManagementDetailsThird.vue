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
            "{{ TaskManagementDetailsFirst.JOBNAME }}"任务详情
          </p>
        </Col>
        <Col
          span="24"
          style="
            padding-top: 55px;
            padding-bottom: 45px;
            display: flex;
            justify-content: center;
          "
        >
          <div style="width: 80%">
            <Steps :current="2">
              <Step>
                <p slot="content" class="Step_item">服务监控</p>
              </Step>
              <Step>
                <p slot="content" class="Step_item">知识审核</p>
              </Step>
              <Step>
                <p slot="content" class="Step_item">数据入库</p>
              </Step>
            </Steps>
          </div>
        </Col>
        <Col span="24" style="padding-bottom: 15px">
          <p style="font-size: 18px; font-weight: 800">数据入库详情</p>
          <div
            style="
              margin-top: 20px;
              padding: 20px 0px 0px 20px;
              border-left: 1px solid #eeeeee;
            "
          >
            <p style="font-size: 16px; font-weight: 600; padding-bottom: 10px">
              {{ li_data_obj.job_time }} {{ li_data_obj.job_name }}已入库完成
            </p>
            <ul class="ul_data_box">
              <li>
                <span class="li_data_dian">●</span
                ><span class="li_data"
                  >入库事故数量{{ li_data_obj.accident_num }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span
                ><span class="li_data"
                  >入库新词数量{{ li_data_obj.new_word_num }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span
                ><span class="li_data"
                  >入库属性数量{{ li_data_obj.attribute_num }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span
                ><span class="li_data"
                  >入库相似事故数量{{
                    li_data_obj.similar_accident_num
                  }}条</span
                >
              </li>
              <li>
                <span class="li_data_dian">●</span
                ><span class="li_data"
                  >入库事件数量{{ li_data_obj.event_num }}条</span
                >
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
export default {
  name: "TaskManagementDetailsThird",
  data() {
    return {
      li_data_obj: {
        // 任务时间
        job_time: "",
        // 任务名称
        job_name: "",
        // 事故数量
        accident_num: "",
        // 新词数量
        new_word_num: "",
        // 属性数量
        attribute_num: "",
        // 相似事故数量
        similar_accident_num: "",
        // 事件数量
        event_num: ""
      }
    };
  },
  methods: {},
  computed: {
    TaskManagementDetailsThird() {
      return this.$store.state.page.TaskManagementDetailsThird;
    },
    TaskManagementDetailsFirst() {
      return this.$store.state.page.TaskManagementDetailsFirst;
    }
  },
  watch: {},
  mounted() {
    // this.TaskManagementDetailsFirst.JOBTYPE
    // <Option value="shuyu" key="shuyu">术语百科</Option>
    // <Option value="minhang" key="minhang">民航事故百科</Option>
    // <Option value="biaozhun" key="biaozhun">标准百科</Option>
    // <Option value="junshi" key="junshi">军事百科</Option>
    // <Option value="yuanqijian" key="yuanqijian">元器件百科</Option>
    this.$axios(
      "/baike/yuchuli/get_model_detail",
      "post",
      this.$qs.stringify({
        jobId: this.TaskManagementDetailsThird.jobId,
        recordId: this.TaskManagementDetailsThird.recordId || "",
        status: this.TaskManagementDetailsThird.status
      })
    ).then(res => {
      this.li_data_obj = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.ivu-steps-item {
  overflow: visible;
}
.ivu-btn-text:hover {
  background: initial;
}
.Step_item {
  font-size: 20px;
  font-weight: 600;
  position: relative;
  top: 10px;
  left: -50px;
}
.ivu-steps-item /deep/ .ivu-steps-head-inner {
  width: 40px;
  height: 40px;
  line-height: 38px;
  .ivu-icon-ios-checkmark {
    font-size: 38px;
  }
}
.ivu-steps-item /deep/ .ivu-steps-tail {
  top: 20px;
}
.ul_data_box {
  li {
    padding: 10px 0px;
    .li_data_dian {
      color: #d7d7d7;
      font-size: 20px;
      margin-right: 15px;
    }
    .li_data {
      font-size: 18px;
    }
  }
}
</style>

