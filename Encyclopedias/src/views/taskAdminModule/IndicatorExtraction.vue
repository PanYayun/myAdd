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
        <Col span="24" style="margin:20px 0"
          ><span style="color:#333;font-size:20px;font-weight: 800"
            >指标参数提取</span
          ></Col
        >

        <Col span="24" style="border-bottom:1px solid #999;margin-bottom:20px;">
          <Form
            inline
            :label-width="100"
            ref="formCustom_1"
            :model="formCustom_1"
          >
            <!-- <FormItem label="标准名称：">
              <Input
                style="width: 240px"
                v-model="formCustom_1.TaskName"
                disabled
              ></Input>
            </FormItem> -->
            <p style="padding-top:7px;padding-left:20px;margin-bottom:15px;">
              <span>标准名称：</span><span>{{ formCustom_1.TaskName }}</span>
            </p>
            <p style="padding-top:7px;padding-left:20px;margin-bottom:15px;">
              <span>条款路径：</span><span>{{ formCustom_1.ClausePath }}</span>
            </p>
          </Form>
          <Input
            v-model="formCustom_1.value17"
            disabled
            type="textarea"
            class="textval"
          />
        </Col>
        <Col style="margin-bottom:20px">
          <span style="color:#333;font-size:20px;font-weight: 800;">
            标准指标参数
          </span>
          <div style="margin-top:10px">
            <Button
              type="text"
              icon="ios-add-circle-outline"
              style="font-size:16px"
              @click="modal = true"
              >新增</Button
            >
          </div>
        </Col>
      </Row>
      <Table
        border
        ref="currentRowTable"
        :columns="columns3"
        :data="data1"
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
        <Col span="24" style="text-align: center;padding:50px">
          <Button
            v-if="IndicatorIndex == 2"
            type="primary"
            style="width:120px"
            @click="preservation"
          >
            保存当前页
          </Button>
          <Button
            type="primary"
            style="width:120px;margin-left:20px"
            @click="returnkey"
            >返回</Button
          >
        </Col>
      </Row>
    </Card>
    <Modal v-model="modal" footer-hide>
      <div slot="header" style="text-align: center;font-size:18px">
        指标参数信息
      </div>
      <Form
        inline
        :label-width="100"
        ref="formCustom_3"
        :model="formCustom_3"
        :rules="ruleValidate"
        style="minHeight:300px;"
      >
        <FormItem label="参数名称" prop="IndicatorName">
          <Input v-model="formCustom_3.IndicatorName" style="width: 300px" />
        </FormItem>
        <FormItem label="参数值" prop="IndicatorValue">
          <Input
            v-model="formCustom_3.IndicatorValue"
            type="textarea"
            style="width: 300px"
            class="ivuTextar"
          />
        </FormItem>
        <FormItem label="约束条件" prop="Conditions">
          <Input
            v-model="formCustom_3.Conditions"
            type="textarea"
            style="width: 300px"
            class="ivuTextar"
          />
        </FormItem>
        <br />
        <div style="text-align: center;">
          <Button type="primary" @click="addDetermine('formCustom_3')"
            >确定</Button
          >
          <Button type="primary" style="margin-left:20px" @click="modal = false"
            >取消</Button
          >
        </div>
      </Form>
    </Modal>
    <Modal v-model="modal1" footer-hide>
      <div slot="header" style="text-align: center;font-size:18px">
        指标参数信息
      </div>
      <Form
        inline
        :label-width="100"
        ref="formCustom_2"
        :model="formCustom_2"
        :rules="ruleValidate"
        style="minHeight:300px;"
      >
        <FormItem label="参数名称" prop="IndicatorName">
          <Input v-model="formCustom_2.IndicatorName" style="width: 300px" />
        </FormItem>
        <FormItem label="参数值" prop="IndicatorValue">
          <Input
            v-model="formCustom_2.IndicatorValue"
            type="textarea"
            style="width: 300px"
            class="ivuTextar"
          />
        </FormItem>
        <FormItem label="约束条件" prop="Conditions">
          <Input
            v-model="formCustom_2.Conditions"
            type="textarea"
            style="width: 300px"
            class="ivuTextar"
          />
        </FormItem>
        <br />
        <div style="text-align: center;">
          <Button type="primary" @click="Determine('formCustom_2')"
            >确定</Button
          >
          <Button
            type="primary"
            style="margin-left:20px"
            @click="modal1 = false"
            >取消</Button
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
  name: "IndicatorExtraction",
  data() {
    return {
      modal1: false, //编辑弹框是否显示
      modal: false, //新增弹框是否显示
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      //当前列表的id
      subjobid: "",
      //请求表数据返回的zbid
      zbids: "",
      formCustom_1: {
        ClausePath: "", //条款路径
        // 任务名称
        TaskName: "123",
        value17: "", //文本
        // 获取第几页的数据
        pageIndex: "1",
        // 分页的粒度
        pageNum: "10",
      },
      //修改
      formCustom_2: {
        IndicatorName: "", //指标名称
        IndicatorValue: "", //指标值
        Conditions: "", //约束条件
        CSID: "", //点击编辑获取当前ID
      },
      //新增
      formCustom_3: {
        IndicatorName: "", //指标名称
        IndicatorValue: "", //指标值
        Conditions: "", //约束条件
      },
      columns3: [
        {
          title: "序号",
          key: "num_id",
          align: "center",
          minWidth: 60,
        },
        {
          title: "参数名称",
          key: "ZBMC",
          align: "center",
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "参数值",
          key: "ZBZ",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "约束条件",
          key: "YSTJ",
          align: "center",
          tooltip: true,
          minWidth: 150,
        },
        {
          title: "审核状态",
          key: "STATUS",
          align: "center",
          tooltip: true,
          minWidth: 150,
          render(h, params) {
            return h("div", [
              h("span", params.row.STATUS === "0" ? "未审核" : "已审核"),
            ]);
          },
        },
        {
          title: "操作",
          key: "address",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.STATUS === "1") {
              return h("div", [h("span", "/")]);
            } else {
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
                        (this.formCustom_2.IndicatorName = params.row.ZBMC), //指标名称
                          (this.formCustom_2.IndicatorValue = params.row.ZBZ), //指标值
                          (this.formCustom_2.Conditions = params.row.YSTJ), //约束条件
                          (this.formCustom_2.CSID = params.row.CSID), //获取当前ID
                          (this.modal1 = true);
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
                        //this.Deleted()
                        this.$Spin.show();
                        this.$axios(
                          "/baike/yuchuli/del_zhibiao",
                          "post",
                          this.$qs.stringify({
                            CSID: params.row.CSID,
                          })
                        ).then((res) => {
                          if (res.data.code === 200) {
                            setTimeout(() => {
                              this.TableData_1();
                              this.$Spin.hide();
                            }, 600);
                          }
                        });
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            }
          },
        },
      ],
      data1: [
        {
          name: "John Brown",
          age: "已审核",
          standardName: "1.范围",
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: "待审核",
          standardName: "2.引用文件",
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: "已审核",
          standardName: "3.一般要求",
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: "待审核",
          standardName: "4.具体要求",
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
      ruleValidate: {
        IndicatorName: [
          {
            required: true,
            message: "请填写内容",
            trigger: "blur",
          },
        ],
        IndicatorValue: [
          {
            required: true,
            message: "请填写内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 表数据，_debounce为防抖事件，例如共20条数据，我在第二页切换数据粒度
    //原id   subjobid  this.toExamineid   zbid: this.IndicatorClauseID
    //测试id   subjobid: "71753f9e-1691-11ec-ad91-0242ac110016",  zbid: test11+4.5.3,
    TableData_1: _debounce(function() {
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/search_zhibiao",
        "post",
        this.$qs.stringify({
          zbid: this.IndicatorClauseID,
          pageIndex: this.formCustom_1.pageIndex - 1,
          pageNum: this.formCustom_1.pageNum,
          subjobid: this.toExamineid,
        })
      ).then((res) => {
        if (res.data.code === 200) {
          this.formCustom_1.TaskName = res.data.tkmc;
          this.formCustom_1.value17 = res.data.text;
          this.formCustom_1.ClausePath = res.data.tkpath;
          this.subjobid = res.data.subjobid;
          this.totalCount = res.data.total_len;
          this.zbids = res.data.zbid;
          this.data1 = res.data.table.map((item, key) => {
            item.num_id =
              this.formCustom_1.pageNum * (this.formCustom_1.pageIndex - 1) +
              key +
              1;
            return item;
          });
          setTimeout(() => {
            this.$Spin.hide();
            this.data1 = res.data.table;
          }, 600);
        }
        console.log(res, "标准指标");
      });
      console.log(this.data1);
    }),
    //保存结果
    preservation() {
      this.$Spin.show();
      let listID = this.data1.map((item) => {
        return item.CSID;
      });
      // console.log(listID,'id');

      this.$axios("/baike/yuchuli/confirm_zhibiao", "post", {
        CSIDS: listID,
        subjobid: this.subjobid,
        zbid: this.zbids,
      }).then((res) => {
        console.log(res, "1222222");
        if (res.data.code === 200) {
          if (res.data.zbid_next == "") {
            this.$Message.info("保存成功");
            this.$store.commit("changeIndicatorClauseID", res.data.zbid_next);
            this.$store.commit("changetoExamineid", res.data.subjobid);
            this.$router.push("/TableList/AuditClauseList");
            setTimeout(() => {
              this.$Spin.hide();
            }, 300);
            return;
          }
          if (this.totalCount <= 10) {
            setTimeout(() => {
              this.$Message.info("保存成功");
              this.$store.commit("changeIndicatorClauseID", res.data.zbid_next);
              this.$store.commit("changetoExamineid", res.data.subjobid);
              this.TableData_1();
              this.$Spin.hide();
            }, 600);
          } else if (this.totalCount > 10) {
            if (this.data1.length == 10) {
              this.formCustom_1.pageIndex += 1;
              this.table_current_1 = this.formCustom_1.pageIndex;
              this.TableData_1();
            } else {
              setTimeout(() => {
                this.$Message.info("保存成功");
                this.$store.commit(
                  "changeIndicatorClauseID",
                  res.data.zbid_next
                );
                this.$store.commit("changetoExamineid", res.data.subjobid);
                this.TableData_1();
                this.$Spin.hide();
              }, 600);
            }
          }
        }
        console.log(res, "保存成功");
      });
    },
    //返回
    returnkey() {
      this.$router.push("/TableList/AuditClauseList");
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.formCustom_1.pageIndex = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.formCustom_1.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    //编辑弹框确定
    Determine(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Spin.show();
          this.$axios(
            "/baike/yuchuli/edit_zhibiao",
            "post",
            this.$qs.stringify({
              CSID: this.formCustom_2.CSID,
              ZBMC: this.formCustom_2.IndicatorName,
              ZBZ: this.formCustom_2.IndicatorValue,
              YSTJ: this.formCustom_2.Conditions,
            })
          ).then((res) => {
            console.log(res, "编辑成功");
            if (res.data.code === 200) {
              this.$Message.success("修改成功!");
              setTimeout(() => {
                this.modal1 = false;
                this.TableData_1();
                this.$Spin.hide();
                this.$refs[name].resetFields();
              }, 600);
            }
          });
        } else {
          this.$Message.error("请完成信息");
        }
      });
    },
    //添加弹框确定
    addDetermine(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Spin.show();
          this.$axios(
            "/baike/yuchuli/add_zhibiao",
            "post",
            this.$qs.stringify({
              ZBID: this.IndicatorClauseID,
              ZBMC: this.formCustom_3.IndicatorName,
              ZBZ: this.formCustom_3.IndicatorValue,
              YSTJ: this.formCustom_3.Conditions,
            })
          ).then((res) => {
            console.log(res, "添加成功");
            if (res.data.code === 200) {
              this.$Message.success("添加成功!");
              setTimeout(() => {
                this.modal = false;
                this.TableData_1();
                this.$Spin.hide();
                this.$refs[name].resetFields();
              }, 600);
            }
          });
        } else {
          this.$Message.error("请完成信息");
        }
      });
    },
  },
  mounted() {
    this.TableData_1();
    console.log(this.IndicatorIndex, "--------------------");
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
    //标准条款列表详情ID
    IndicatorClauseID() {
      return this.$store.state.standard.IndicatorClauseID;
    },
    //标准条款列表是通过详情或查看, 1=详情  2=查看
    IndicatorIndex() {
      return this.$store.state.standard.IndicatorIndex;
    },
  },
};
</script>
<style lang="less" scoped>
.textval {
  margin-bottom: 20px;
}
.textval /deep/ .ivu-input {
  min-height: 150px;
  max-height: 150px;
  background: #f5f5f5;
  color: #333;
  line-height: 2;
}
.ivuTextar /deep/ .ivu-input {
  min-height: 80px;
  max-height: 80px;
}
</style>
