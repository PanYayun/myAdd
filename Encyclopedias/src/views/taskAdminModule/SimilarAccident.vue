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
          <p style="font-size: 18px; font-weight: 800">
            {{ this.StandardKnowledge ? "相似标准推荐" : "相似事故推荐" }}
          </p>
        </Col>
      </Row>
      <Table border ref="selection" :columns="HeaderData1" :data="data1">
        <template slot-scope="{  index }" slot="index">
          {{ index + 1 }}
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="ViewDetails(row)"
            >查看</Button
          >
        </template>
      </Table>
      <Row style="padding-bottom:80px">
        <Col
          span="24"
          style="text-align: center; margin-top: 30px;padding-bootm:30px"
        >
          <!-- <Button
            type="primary"
            @click="preservation"
            v-show="data1.length>0"
            style="width: 100px;margin-right:20px"
            >保存结果</Button
          > -->
          <Button type="primary" @click="returnkey" style="width: 100px;"
            >返回</Button
          >
        </Col>
      </Row>
      <Modal
        v-model="modal3"
        :closable="false"
        :mask-closable="false"
        width="1000"
        footer-hide
      >
        <div slot="header" style="fontSize:16px">
          {{ this.StandardKnowledge ? "相似标准数据" : "相似事故数据" }}
        </div>
        <Table
          border
          ref="selection"
          :columns="HeaderData2"
          :data="SpringFrameList"
          @on-selection-change="Checklist"
        >
        </Table>
        <div style="text-align: center;margin-top:20px">
          <Button @click="ConfirmCheck" type="primary" style="width: 100px;"
            >确认</Button
          >
          <Button
            @click="Uncheck"
            type="primary"
            style="width: 100px;margin-left:20px"
            >取消</Button
          >
        </div>
      </Modal>
    </Card>
  </div>
</template>
<script>
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "SimilarAccident",
  data() {
    return {
      modal3: false, //弹框是否显示
      HeaderData: [], //原始表头数据
      HeaderData1: [], //外面表头数据
      HeaderData2: [], //弹框表头数据
      tableData: [], //表格总数据
      SpringFrameList: [], //弹框列表
      TickId: [], //勾选的ID
      record_id: "", //当前这条数据的id
      StandardKnowledge: false, //判断是否是相似标准推荐
      columns4: [],
      data1: [],
    };
  },
  methods: {
    //初始化
    Initialize() {
      //原ID this.toExamineid
      //测试ID "test_subjob_id_2222" 'biaozhun-subtest-00005'
      let paths = this.StandardKnowledge
        ? "/baike/yuchuli/biaozhun/check_similar_biaozhun"
        : "/baike/yuchuli/shigu/check_similar_accident";
      this.$Spin.show();
      this.$axios(
        paths,
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
        })
      ).then((res) => {
        if (res.data.code === 200) {
          this.tableData = JSON.parse(JSON.stringify(res.data.table_result));
          this.data1 = res.data.table_result.map((item) => {
            return item.property_list;
          });
          setTimeout(() => {
            this.$Spin.hide();
          }, 600);
        }

        console.log(
          res,
          this.StandardKnowledge ? "相似推荐列表" : "相似事故推荐"
        );
      });
    },
    //事故表头
    AccidentHeader() {
      let paths = this.StandardKnowledge
        ? "/baike/yuchuli/biaozhun/get_similar_bz_title"
        : "/baike/yuchuli/shigu/get_similar_accident_title";
      this.$Spin.show();
      this.$axios(paths, "post").then((res) => {
        if (res.data.code === 200) {
          this.columns4 = res.data.table_title_list;
          this.HeaderData1 = JSON.parse(
            JSON.stringify(res.data.table_title_list)
          );
          this.HeaderData1.forEach((item, index) => {
            if (item.title == "相似度") {
              this.HeaderData1.splice(index, 1);
            }
            if (item.title == "标准ID") {
              this.HeaderData1.splice(index, 1);
            }
          });
          this.HeaderData1.push({
            title: "查看相似",
            slot: "action",
            fixed: "right",
            width: 150,
            align: "center",
          });
          this.HeaderData1.unshift({
            title: "序号",
            slot: "index",
            width: 80,
            align: "center",
          });
          this.HeaderData2 = JSON.parse(
            JSON.stringify(res.data.table_title_list)
          );
          this.HeaderData2.forEach((item, index) => {
            if (item.title == "标准ID") {
              this.HeaderData2.splice(index, 1);
            }
          });
          console.log(res.data.table_title_list,'12121212121');
          this.HeaderData2.unshift({
            type: "selection",
            width: 60,
            align: "center",
          });
          setTimeout(() => {
            this.$Spin.hide();
          }, 600);
        }

        // console.log(
        //   res,
        //   this.HeaderData1,
        //   this.StandardKnowledge ? "相似推荐表头" : "表头数据"
        // );
      });
    },
    //保存结果
    preservation() {},
    //返回
    returnkey() {
      this.$router.push("/TableList/KnowledgeAudit");
    },
    //查看
    ViewDetails(row) {
      let ogs_ID = this.StandardKnowledge ? "bz_id" : "sg_id";
      this.tableData.forEach((item, index) => {
        if (item.property_list[ogs_ID] === row[ogs_ID]) {
          this.SpringFrameList = this.tableData[index].similar_result_list;
        }
      });
      this.modal3 = true;
      this.record_id = row[ogs_ID];
      console.log(row, this.SpringFrameList);
    },
    //弹框勾选
    Checklist(item) {
      let ogs_ID = this.StandardKnowledge ? "bz_id" : "sg_id";
      this.TickId = item.map((items) => {
        return items[ogs_ID];
      });
      console.log(item, this.TickId);
    },
    //确认勾选
    //测试ID "test_subjob_id_1111"
    ConfirmCheck() {
      //true 执行相似推荐
      let paths = this.StandardKnowledge
        ? "/baike/yuchuli/biaozhun/save_similar_biaozhun"
        : "/baike/yuchuli/shigu/save_similar_accident";
      this.$Spin.show();
      // this.modal3 = false;
      let recordList = JSON.stringify(this.TickId);
      console.log(recordList, this.TickId, "////////////");
      this.$axios(
        paths,
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          record_id: this.record_id,
          choiced_recordList: recordList,
        })
      ).then((res) => {
        console.log(
          res,
          this.StandardKnowledge ? "相似推荐完成" : "相似事故完成"
        );
        if (res.data.code === 200) {
          setTimeout(() => {
            this.Initialize();
            this.modal3 = false;
            this.TickId = [];
            this.$Spin.hide();
          });
        }
      });
    },
    //取消勾选
    Uncheck() {
      this.modal3 = false;
      this.TickId = [];
      this.$refs.selection.selectAll(false);
      console.log(this.TickId, "是否取消");
    },
  },
  mounted() {
    console.log(this.Selected, "是什么 ");
    this.Selected === "标准知识加工"
      ? (this.StandardKnowledge = true)
      : (this.StandardKnowledge = false);

    this.AccidentHeader();
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
textarea.ivu-input {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #fff;
  border-radius: 0;
}
.textarea {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
}
</style>
