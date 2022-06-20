<template>
  <div
    style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px"
  >
    <Card :bordered="false" dis-hover :padding="0">
      <Row>
        <Col span="24" style="padding-top: 8px">
          <!-- ref="table_form_2"绑定Form，form_rules_2绑定表单验证，hide-required-mark不显示小红点，不要 -->
          <Form
            inline
            :label-width="75"
            ref="table_form_2"
            :rules="form_rules_2"
            :model="table_form_2"
            label-position="left"
            :hide-required-mark="true"
            style="margin-top:8px"
          >
            <!-- prop的值要与v-model的值相同便于重置 -->
            <FormItem label="请选择类型:" prop="dataType" :label-width="90">
              <Select
                filterable
                placeholder="请选择数据类型"
                v-model="table_form_2.dataType"
                style="width: 120px"
              >
                <Option value="shuyu" key="shuyu">术语百科</Option>
                <Option value="minhang" key="minhang">民航事故百科</Option>
                <Option value="biaozhun" key="biaozhun">标准百科</Option>
                <Option value="junshi" key="junshi">军事百科</Option>
                <Option value="yuanqijian" key="yuanqijian">元器件百科</Option>
              </Select>
            </FormItem>
            <FormItem label="上传时间:" prop="temporary_date" :label-width="75">
              <DatePicker
                style="width: 200px"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择数据上传时间"
                format="yyyy-MM-dd"
                @on-change="getDateValue"
                v-model="table_form_2.temporary_date"
              ></DatePicker>
            </FormItem>
            <FormItem label="关键词:" prop="keyWord" :label-width="60">
              <Tooltip
                max-width="200"
                :content="
                  table_form_2.keyWord.toString() == ''
                    ? '您未输入数据'
                    : table_form_2.keyWord.toString()
                "
                placement="top"
              >
                <Input
                  style="width: 180px"
                  clearable
                  placeholder="请输入关键词"
                  v-model="table_form_2.keyWord"
                ></Input>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                icon="ios-search"
                style="margin-left: -70px"
                @click="handleSubmit('table_form_2')"
                >查询</Button
              >
              <Button
                @click="handleReset('table_form_2')"
                style="margin-left: 8px"
                >重置</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Table
        border
        stripe
        height="522"
        highlight-row
        :data="tableData_1"
        ref="NewTask_table1"
        :loading="loading_1"
        :columns="tableColumns_1"
        @on-select="handleSelectRow_1"
        @on-select-all="handleSelectAll_1"
        @on-select-cancel="handleCancelRow_1"
        @on-select-all-cancel="handleSelectAll_1"
      >
      </Table>
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
              <span>已选择{{ selectedSum_1 }}条记录</span>
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
    </Card>
  </div>
</template>

<script>
import { fun_date, fun_date_start_3 } from "@/libs/tools";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "aaaa",
  data() {
    return {
      // 表格的loading
      loading_1: true,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 表格表头
      tableColumns_1: [],
      // 表格数据
      tableData_1: [],
      // 表格勾选的数据ID
      selectedData_1: new Set(),
      // 表格勾选的数据
      selectedData_2: new Set(),
      // 选中的总数量
      selectedSum_1: 0,
      form_rules_2: {
        temporary_date: [
          {
            // blur失去焦点时触发  change数据发生改变时触发
            required: true,
            // blur失去焦点时触发  change数据发生改变时触发
            trigger: "change",
            validator: (rule, value, callback) => {
              if (
                this.table_form_2.beginDate == "" &&
                this.table_form_2.endDate == ""
              ) {
                return callback(new Error("请选择时间范围！"));
              } else {
                return callback();
              }
            },
          },
        ],
      },

      table_form_2: {
        dataType: "minhang",
        beginDate: "",
        endDate: "",
        keyWord: "",
        // 仅存放显示时间，给时间选择框加入change事件，重置beginDate和endDate，传输时使用beginDate和endDate
        temporary_date: [],
        // 获取第几页的数据
        pageIndex: "1",
        // 分页的粒度
        pageNum: "10",
      },
    };
  },
  methods: {
    //  选中某一行，不动
    handleSelectRow_1(selection, row) {
      this.selectedData_1.add(row.num_id);
      this.selectedData_2.add(row);
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  取消某一行，不动
    handleCancelRow_1(selection, row) {
      this.selectedData_1.delete(row.num_id);
      this.selectedData_2.forEach((item) => {
        if (item.num_id == row.num_id) {
          this.selectedData_2.delete(item);
        }
      });
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  不动
    handleSelectAll_1(selection) {
      // 取消全选 数组为空
      if (selection.length === 0) {
        let data = this.$refs.NewTask_table1.data;
        data.forEach((item) => {
          if (this.selectedData_1.has(item.num_id)) {
            this.selectedData_1.delete(item.num_id);
            this.selectedData_2.forEach((item_) => {
              if (item_.num_id == item.num_id) {
                this.selectedData_2.delete(item_);
              }
            });
          }
        });
      } else {
        selection.forEach((item) => {
          this.selectedData_1.add(item.num_id);
          this.selectedData_2.forEach((item_) => {
            if (item_.num_id == item.num_id) {
              this.selectedData_2.delete(item_);
            }
          });
          this.selectedData_2.add(item);
        });
      }
      // 同步
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  不动
    setChecked() {
      // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
      let objData = this.$refs.NewTask_table1.objData;
      for (let index in objData) {
        if (this.selectedData_1.has(objData[index].num_id)) {
          objData[index]._isChecked = true;
        }
      }
    },
    // 获取时间
    getDateValue(val) {
      this.table_form_2.beginDate = val[0];
      this.table_form_2.endDate = val[1];
    },
    // 检索搜索框
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (
          valid &&
          this.table_form_2.startTime != "" &&
          this.table_form_2.endDate != ""
        ) {
          // 需先重置参数如分页倒序检索条件
          this.loading_1 = true;
          this.selectedData_1 = new Set();
          this.selectedData_2 = new Set();
          this.selectedSum_1 = this.selectedData_1.size;
          //第几页
          this.table_form_2.pageIndex = 1;
          this.TableData_1();
        } else {
        }
      });
    },
    // 重置$refs为table_form_2的表单数据
    handleReset(name) {
      this.$refs[name].resetFields();
      // 获取上个月的日期然后减去参数天
      let date_temporary = fun_date(0, 0);
      // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
      this.$set(this.table_form_2.temporary_date, "1", date_temporary[0]);
      this.table_form_2.endDate = date_temporary[0];
      // 传入今天的时间，获取三个月前的时间
      let date_temporary_2 = fun_date_start_3(date_temporary[0]);
      this.$set(this.table_form_2.temporary_date, "0", date_temporary_2);
      this.table_form_2.beginDate = date_temporary_2;
    },
    // 表数据，_debounce为防抖事件，例如共20条数据，我在第二页切换数据粒度
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      this.$axios(
        "/baike/yuchuli/searchUploadRecordsByRow",
        "post",
        this.$qs.stringify({
          pageIndex: this.table_form_2.pageIndex - "1",
          pageNum: this.table_form_2.pageNum,
          dataType: this.table_form_2.dataType,
          beginDate: this.table_form_2.beginDate + " 00:00:00",
          endDate: this.table_form_2.endDate + " 23:59:59",
          keyWord: this.table_form_2.keyWord,
        })
      ).then((res) => {
        // 总页数
        this.totalCount = res.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.pageIndex + 1;
        res.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_2.pageNum * (this.table_current_1 - 1) + key + 1;
        });
        // 表数据
        setTimeout(() => {
          this.tableData_1 = res.data.resultList;
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    // 切换页码
    table_Pagechange_1(index) {
      this.table_form_2.pageIndex = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.table_form_2.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
  },
  watch: {
    tableData_1: function() {
      // 给表格数据赋值后并渲染完成表格后执行
      this.$nextTick(function() {
        // Spin.hide();
        this.setChecked();
        this.loading_1 = false;
      });
    },
  },
  mounted() {
    if (this.table_form_2.dataType == "minhang") {
      this.tableColumns_1 = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          width: 70,
        },
        {
          title: "事故ID",
          key: "sgid",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "事故名称",
          key: "sgmc",
          align: "center",
          tooltip: true,
          minWidth: 200,
        },
        {
          title: "上传人",
          key: "scrid",
          align: "center",
          tooltip: true,
          minWidth: 80,
        },
        {
          title: "上传时间",
          key: "scsj",
          align: "center",
          tooltip: true,
          minWidth: 110,
        },
      ];
    }
    // 获取上个月的日期然后减去7天
    let date_temporary = fun_date(0, 0);
    // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
    this.$set(this.table_form_2.temporary_date, "1", date_temporary[0]);
    this.table_form_2.endDate = date_temporary[0];
    // 传入今天的时间，获取三个月前的时间
    let date_temporary_2 = fun_date_start_3(date_temporary[0]);
    this.$set(this.table_form_2.temporary_date, "0", date_temporary_2);
    this.table_form_2.beginDate = date_temporary_2;
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
  },
  created() {},
};
</script>

<style lang="less" scoped></style>
