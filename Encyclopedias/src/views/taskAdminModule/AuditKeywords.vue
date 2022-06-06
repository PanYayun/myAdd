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
          <p style="font-size: 18px; font-weight: 800">关键词抽取</p>
        </Col>
        <Col
          span="24"
          style="display:flex;align-items: center;margin:10px 0;"
          class="Stame"
        >
          <span class="StandardName" style="padding-right:10px"
            >{{ name_key }}：</span
          >
          <!-- <div class="textName" v-html="name_value"></div> -->
          <!-- <Input v-model="name_value" type="textarea" disabled /> -->
          <span>{{ name_value }}</span>
        </Col>
        <Col span="24" style="display:flex;align-items: center;margin:10px 0;">
          <span class="StandardName">{{ text_key }}：</span>
          <!-- <div class="textarea" v-html="text_value"></div> -->
          <Input v-model="text_value" type="textarea" disabled />
        </Col>
        <Col span="24" style="padding:  15px 0;text-align: right;">
          <p>当前审核第{{ current_count + 1 }}条数据，共{{ total_count }}条</p>
        </Col>
        <Col span="24" style="padding:  15px 0;">
          <Button type="primary" style="width: 100px" @click="PreviousStep()"
            >查看下一条</Button
          >
          <Button
            style="width: 100px;margin-left:20px;color:#4d96ff;border:1px solid #4d96ff"
            @click="NextSteps()"
            >刷新结果</Button
          >
        </Col>
        <Col span="24" style="padding:  30px 0;">
          <p style="font-size: 18px; font-weight: 800">
            抽取结果
            <Button
              type="primary"
              style="width:80px;marginLeft:20px"
              @click="modal1 = true"
            >
              新增</Button
            >
          </p>
        </Col>
      </Row>
      <Table
        border
        ref="selection"
        :columns="columns4"
        :data="not_choiced_classList"
      ></Table>
      <Row>
        <Col span="24">
          <div
            style="
              margin: 20px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div>
              <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
            </div>
            <div>
              <Page
                :total="totalCount"
                :current="table_current_1"
                @on-change="table_Pagechange_1"
                @on-page-size-change="table_PageSizechange_1"
                show-sizer
                show-elevator
              ></Page>
            </div>
          </div>
        </Col>
      </Row>
      <Row style="padding-bottom:50px">
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
            @click="returnkey"
            style="width: 100px;color:#4d96ff;border:1px solid #4d96ff"
            >返回</Button
          >
        </Col>
      </Row>
    </Card>
    <Modal v-model="modal" footer-hide fivu-modal>
      <div slot="header" style="text-align:center;font-size:18px">
        关键词信息录入
      </div>
      <Form
        inline
        :label-width="100"
        ref="table_form_2"
        :rules="rules"
        :model="table_form_2"
      >
        <FormItem label="关键词：" prop="name">
          <Input v-model="table_form_2.name" style="width:240px"></Input>
        </FormItem>
        <div style="text-align:center;">
          <Button type="primary" @click="Determine">确定</Button>
          <Button
            type="primary"
            style="margin-left:20px"
            @click="FromReset('table_form_2')"
            >重置</Button
          >
        </div>
      </Form>
    </Modal>
    <Modal v-model="modal1" footer-hide fivu-modal>
      <div slot="header" style="text-align:center;font-size:18px">
        关键词信息录入
      </div>
      <Form
        inline
        :label-width="100"
        ref="table_form_3"
        :rules="rules"
        :model="table_form_3"
      >
        <FormItem label="关键词：" prop="name">
          <Input v-model="table_form_3.name" style="width:240px"></Input>
          <br />
          说明：多个关键词请以中文顿号分隔
        </FormItem>
        <div style="text-align:center;">
          <Button type="primary" @click="addDetermine">确定</Button>
          <Button
            type="primary"
            style="margin-left:20px"
            @click="FromReset('table_form_3')"
            >重置</Button
          >
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "AuditKeywords",
  data() {
    return {
      modal: false, //编辑弹框
      modal1: false, //新增弹框
      total_count: "", //总条数
      current_count: 0, //当前审核的条数
      record_id: "", //当前审核数据的Id
      name_key: "标准", //名称
      name_value: "", //名称的值
      text_key: "标准范围", //文本标题
      text_value: "", //文本内容
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 获取第几页的数据
      pageIndex: "1",
      // 分页的粒度
      pageNum: "10",
      //编辑弹框的form
      table_form_2: {
        name: "",
        paramsVal: "", //编辑后的内容
      },
      //新增弹框的form
      table_form_3: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写内容",
            trigger: "blur",
          },
        ],
      },

      not_choiced_classList: [], //表数据
      columns4: [
        {
          title: "序号",
          align: "center",
          key: "num_id",
          width: 150,
        },
        {
          title: "关键词",
          key: "age",
          align: "center",
        },
        {
          title: "操作",
          key: "address",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    cursor: "pointer",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.table_form_2.name = params.row.age;
                      this.table_form_2.paramsVal = params.row.age;
                      this.modal = true;
                    },
                  },
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    cursor: "pointer",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.$Spin.show();
                      const that = this;
                      this.$axios(
                        "/baike/yuchuli/delete_biaozhun_keywords",
                        "post",
                        this.$qs.stringify({
                          subjob_id: this.toExamineid,
                          index: this.current_count,
                          keyword_to_delete: params.row.age,
                        })
                      ).then((res) => {
                        if ((res.data.code = 200)) {
                          setTimeout(function() {
                            that.$Spin.hide();
                            console.log(res, "删除成功");
                            that.Initialize();
                          }, 600);
                        }
                      });
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    //初始化
    //原ID this.toExamineid
    //测试ID "d32cdae2-16b6-11ec-8752-0242ac110011"
    Initialize() {
      this.$Spin.show();
      const that = this;
      this.$axios(
        "/baike/yuchuli/get_biaozhun_keywords",
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.current_count,
          pageNum: this.pageIndex * 1,
          pageSize: this.pageNum,
        })
      ).then((res) => {
        if (res.data.code === 200) {
          this.name_value =
            res.data.data.standard_number.join("") +
            "《" +
            res.data.data.standard_name.join("") +
            "》";
          this.text_value = res.data.data.standard_scope.join("");
          let keywords = res.data.data.keywords.map((item, key) => {
            return {
              num_id: this.pageNum * (this.pageIndex - 1) + key + 1,
              age: item,
            };
          });
          this.totalCount = res.data.data.keywords_num;
          this.total_count = res.data.data.total_record_num;
          setTimeout(() => {
            that.not_choiced_classList = keywords;
            that.$Spin.hide();
          }, 500);

          console.log(res, "关键词");
        }
      });
    },
    //刷新结果
    NextSteps() {
      this.Initialize();
    },
    //下一条数据
    PreviousStep() {
      if (this.current_count + 1 === this.total_count) {
        this.$Message.info("已经是最后一条");
        return;
      }
      this.current_count += 1;
      this.Initialize();
    },
    //保存结果
    //测试ID "test_subjob_id_4444"
    preservation() {
      const that = this;
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/confirm_biaozhun_keywords",
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.current_count,
        })
      ).then((res) => {
        if (res.data.code === 200) {
          setTimeout(function() {
            that.Initialize();
            that.$Spin.hide();
            if (that.total_count == 1) {
            that.$router.push("/TableList/KnowledgeAudit");
          }
          }, 600);

        }

        console.log(res, "保存成功");
      });
    },
    //返回
    returnkey() {
      this.$router.push("/TableList/KnowledgeAudit");
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.pageIndex = index;
      this.loading_1 = true;
      this.Initialize();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageNum = index;
      this.loading_1 = true;
      this.Initialize();
    },
    //编辑弹框确定
    Determine() {
      const that = this;
      this.$Spin.show();
      this.$axios(
        "baike/yuchuli/edit_biaozhun_keywords",
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.current_count,
          keyword_old: this.table_form_2.paramsVal,
          keyword_new: this.table_form_2.name,
        })
      ).then((res) => {
        console.log(res, "编辑成功");
        setTimeout(function() {
          that.Initialize();
          that.$Spin.hide();
          that.modal = false;
        }, 600);
      });
      console.log(name);
    },
    //新增确定
    addDetermine() {
      // let name = JSON.stringify(this.table_form_2.name.split("、"));
      const that = this;
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/add_biaozhun_keywords",
        "post",
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.current_count,
          keyword_to_add: this.table_form_3.name,
        })
      ).then((res) => {
        console.log(res, "编辑成功");
        setTimeout(function() {
          that.Initialize();
          that.$Spin.hide();
          that.modal1 = false;
        }, 600);
      });
    },
    //编辑弹框重置
    FromReset(name) {
      this.$refs[name].resetFields();
    },
  },
  mounted() {
    this.Initialize();
    // this.model1 = this.cityList[0].label;
  },
  computed: {
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    //知识审核传的ID
    toExamineid() {
      return this.$store.state.standard.toExamineid;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.ivu-input[disabled] {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  color: #666 !important;
}
.Stame /deep/ .ivu-input {
  min-height: 40px;
  max-height: 40px;
  color: #666;
}
/deep/.textarea {
  width: 90%;
  height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  overflow-y: scroll;
}
.StandardName {
  display: inline-block;
  width: 12%;
  text-align: right;
  margin-right: 10px;
}
/deep/.textName {
  width: 90%;
  height: 40px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  overflow-y: scroll;
  word-wrap: break-word;
}
/deep/.ivu-modal-content {
  min-height: 200px;
}
</style>
