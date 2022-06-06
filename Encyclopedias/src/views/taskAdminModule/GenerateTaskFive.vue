<template>
  <div style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px">
    <Card :bordered="false" dis-hover :padding="0">
      <Row>
        <Col span="24" style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee">
        <p style="font-size: 18px; font-weight: 800">
          事理图谱生成过程
        </p>
        </Col>
        <Col span="24" style="padding:  15px 0;">
        <p style="font-size: 18px; font-weight: 800">航空领域文本</p>
        </Col>
        <Col span="24">
        <Input v-model="textarea" disabled  type="textarea" placeholder="Enter something..." />
        </Col>
        <Col span="24" style="padding:  15px 0;">
        <Button type="primary" style="width: 100px" @click="PreviousStep(Steps)">上一步</Button>
        <Button type="primary" style="width: 100px;margin-left:20px" @click="NextSteps()">下一步</Button>
        <Button
            type="primary"
            style="width: 100px;margin-left:20px"
            @click="ReturnSuperior()"
            >返回</Button
          >
        </Col>
        <Col span="24" style="padding:  20px 0;">
        <div class="box">
          <div :class="[
                Steps === 1 ? 'avtion' : Steps > 1 ? 'avtionllis' : '',
                'item',
              ]" style="width:125px">
            <div style="left:0">1</div>
            <span style="left: -25%;">因果关系判断1</span>
          </div>
          <div :class="[
                Steps === 2 ? 'avtion' : Steps > 2 ? 'avtionllis' : '',
                'item',
              ]">
            <div>2</div>
            <span style="left: 17%;">因果关系判断2</span>
          </div>
          <div :class="[
                Steps === 3 ? 'avtion' : Steps > 3 ? 'avtionllis' : '',
                'item',
              ]">
            <div>3</div>
            <span style="left: 17%;">因果关系判断3</span>
          </div>
          <div :class="[
                Steps === 4 ? 'avtion' : Steps > 4 ? 'avtionllis' : '',
                'item',
              ]">
            <div>4</div>
            <span style="left: 30%;">共指消解</span>
          </div>
          <div :class="[
                Steps === 5 ? 'avtion' : Steps > 5 ? 'avtionllis' : '',
                'item',
              ]">
            <div>5</div>
            <span style="left: 30%;">事件抽取</span>
          </div>
          <div :class="[Steps === 6 ? 'avtion' : '', 'item']" style="width:125px">
            <div style="left:auto;right:0">6</div>
            <span style="right: -10%;">图谱生成</span>
          </div>
        </div>
        </Col>
        <Col span="24" style="padding:  30px 0;">
        <p style="font-size: 18px; font-weight: 800">
          {{description}}
        </p>
        </Col>
      </Row>
      <Table border stripe height="522" highlight-row :data="tableData_1" ref="NewTask_table1" :loading="loading_1" :columns="tableColumns_1">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px">View</Button>
        </template>
      </Table>
      <div style="
              margin: 20px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom:50px;
            ">
        <div>
          <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
        </div>
        <div>
          <Page :total="totalCount" :current="pageIndex" @on-change="table_Pagechange_1" @on-page-size-change="table_PageSizechange_1" show-sizer show-elevator></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "GenerateTaskFive",
  data() {
    return {
      textarea: "未知",
      description: "未知",
      // 表格的loading
      loading_1: true,
      // 表格表头
      tableColumns_1: [
        {
          title: "序号",
          width: 70,
          tooltip: true,
          key: "num_id",
          align: "center"
        },
        {
          title: "原因事件",
          minWidth: 200,
          tooltip: true,
          key: "from",
          align: "center"
        },
        {
          title: "原因主体",
          minWidth: 150,
          tooltip: true,
          key: "from_zhuti",
          align: "center"
        },
        {
          title: "原因客体",
          minWidth: 150,
          tooltip: true,
          key: "from_keti",
          align: "center"
        },
        {
          title: "原因触发词",
          minWidth: 150,
          tooltip: true,
          key: "from_chufaci",
          align: "center"
        },
        {
          title: "结果事件",
          minWidth: 200,
          tooltip: true,
          key: "to",
          align: "center"
        },
        {
          title: "结果主体",
          minWidth: 150,
          tooltip: true,
          key: "to_zhuti",
          align: "center"
        },
        {
          title: "结果客体",
          minWidth: 150,
          tooltip: true,
          key: "to_keti",
          align: "center"
        },
        {
          title: "结果触发词",
          minWidth: 150,
          tooltip: true,
          key: "to_chufaci",
          align: "center"
        }
      ],
      // 表格数据
      tableData_1: [],
      // 总页数
      totalCount: 0,
      // 当前页码
      pageIndex: 1,
      // 分页的粒度
      pageNum: 10
    };
  },
  methods: {
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      this.$axios(
        "/baike/yuchuli/search_event_graph_new",
        "post",
        this.$qs.stringify({
          // subjobid: this.subjobid,
          //测试ID "9e082000-fff6-11eb-aa87-0242ac110006"
          subjobid: this.subjobid,
          index: 0,
          pageNum: this.pageNum,
          pageIndex: this.pageIndex - 1,
          step: 5
        })
      ).then(res => {
        console.log(res, "第五步");
        // 总页数
        this.totalCount = res.data.total_num;
        this.pageIndex = res.data.pageIndex + 1;
        res.data.table.map((item, key) => {
          item.num_id = this.pageNum * (this.pageIndex - 1) + key + 1;
        });
        // 表数据
        this.textarea = res.data.text;
        this.description = res.data.description;
        this.tableData_1 = res.data.table;
        setTimeout(() => {
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    // 切换页码
    table_Pagechange_1(index) {
      this.pageIndex = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    //下一步
    NextSteps() {
      this.$Spin.show();
      this.$store.dispatch("NextSteps", this.Steps);
      this.$router.push("GenerateTaskSix");
    },
    //上一步
    PreviousStep() {
      this.$store.dispatch("PreviousStep", this.Steps);
      this.$router.push("GenerateTaskFour");
    },
    //返回
    ReturnSuperior() {
      this.$router.push("TaskExpertise");
    },
  },
  mounted() {
    this.TableData_1();
  },
  computed: {
    Steps() {
      return 5;
    },
    subjobid() {
      return this.$store.state.standard.subjobid;
    }
  }
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
