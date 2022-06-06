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
            >指标审核</span
          ></Col
        >

        <Col span="24" style="border-bottom:1px solid #999;margin-bottom:20px">
          <Form
            inline
            :label-width="100"
            ref="formCustom_1"
            :model="formCustom_1"
          >
            <FormItem label="任务名称">
              <Input
                style="width: 240px"
                v-model="formCustom_1.TaskName"
                disabled
              ></Input>
            </FormItem>
            <FormItem label="创建时间">
              <Input
                style="width: 240px"
                v-model="formCustom_1.TaskDate"
                disabled
              ></Input>
            </FormItem>
            <br />
            <FormItem label="标准名称" prop="StandardName">
              <Input
                style="width: 240px"
                v-model="formCustom_1.StandardName"
              ></Input>
            </FormItem>
            <FormItem label="审核状态">
              <Select style="width: 240px" v-model="formCustom_1.TaskState">
                <Option value="1">已审核</Option>
                <Option value="0">待审核</Option>
              </Select>
            </FormItem>
            <Button
              type="primary"
              style="margin-left:20px"
              @click="handleSubmit('formCustom_1')"
              >查询</Button
            >
            <Button
            type="primary"
              style="margin-left:20px"
              @click="handleReset('formCustom_1')"
              >重置</Button
            >
          </Form>
        </Col>
        <Col style="margin-bottom:20px">
          <span style="color:#333;font-size:20px;font-weight: 800;">
            标准列表
          </span>
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
          <Button type="primary" style="width:120px;margin-left:20px" @click="returnkey"
            >返回</Button
          >
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "AuditIndicatorsList",
  data() {
    return {
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      formCustom_1: {
        // 任务名称
        TaskName: "123",
        // 任务时间
        TaskDate: "312",
        //标准名称
        StandardName: "",
        //审核状态
        TaskState: "0",
        // 获取第几页的数据
        pageIndex: "1",
        // 分页的粒度
        pageNum: "10",
      },
      columns3: [
        {
          title: "序号",
          key: "num_id",
          align: "center",
          minWidth: 60,
        },
                {
          title: "标准编号",
          key: "bzbh",
          align: "center",
          tooltip: true,
          minWidth: 120,
        },
        {
          title: "标准名称",
          key: "name",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "审核状态",
          key: "age",
          align: "center",
          tooltip: true,
          minWidth: 200,
          render(h,params) {
            return h('div',[
              h('span',params.row.status==='0'?'未审核':'已审核')
            ])
          },
        },
        {
          title: "操作",
          key: "address",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            if (params.row.status === "1") {
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
                        this.$store.commit('changeIndicatorListID',params.row.bzid)
                        this.$router.push("/TableList/AuditClauseList");
                      },
                    },
                  },
                  "详情"
                ),
              ]);
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
                        //审核跳转页面
                        this.$store.commit('changeIndicatorListID',params.row.bzid)
                        this.$router.push("/TableList/AuditClauseList");
                      },
                    },
                  },
                  "审核"
                ),
              ]);
            }
          },
        },
      ],
      data1: [
      ],
    };
  },
  methods: {
    // 表数据，_debounce为防抖事件，例如共20条数据，我在第二页切换数据粒度
    //原jobid this.TaskId  subjobid   this.toExamineid
    //测试 jobid 7164f418-1691-11ec-ad91-0242ac110016  subjobid   71753f9e-1691-11ec-ad91-0242ac110016
    TableData_1: _debounce(function() {
      this.$Spin.show();
      this.$axios(
        "/baike/yuchuli/list_zhibiao",
        "post",
        this.$qs.stringify({
          jobid: this.TaskId,
          subjobid: this.toExamineid,
          zhiBiaoName:this.formCustom_1.StandardName,
          status: this.formCustom_1.TaskState,
          pageIndex:this.formCustom_1.pageIndex-1,
          pageNum:this.formCustom_1.pageNum,
        })
      ).then((res) => {
        console.log(res, "标准列表");
        if (res.data.code === 200) {
          this.formCustom_1.TaskName=res.data.jobname;
          this.formCustom_1.TaskDate=res.data.starttime;
          // 总页数
          this.totalCount = res.data.total_len;
          res.data.table.map((item, key) => {
              item.num_id =
                this.formCustom_1.pageNum * (this.table_current_1 - 1) +
                key +
                1;
              
              return item;
          });
          setTimeout(() => {this.$Spin.hide();
          this.data1=res.data.table
          }, 500);
        }
        
      });
      
    }),
    //返回
    returnkey() {
      this.$router.push("/TableList/KnowledgeAudit");
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

    // 检索搜索框
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 需先重置参数如分页倒序检索条件
          this.loading_1 = true;
          //第几页
          this.formCustom_1.pageIndex = 1;
          this.TableData_1();
        } else {
        }
      });
    },
    // 重置$refs表单数据
    handleReset(name) {
      this.$refs[name].resetFields();
      this.formCustom_1.TaskState = "0";
    },
  },
  mounted() {
    this.TableData_1();
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
    TaskId() {
      return this.$store.state.standard.TaskId;
    },
  },
};
</script>
<style lang="less" scoped></style>
