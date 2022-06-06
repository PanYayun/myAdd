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
          <p style="font-size: 18px; font-weight: 800">上传记录管理</p>
        </Col>
        <Col
          span="24"
          style="padding-top: 25px; border-bottom: 1px solid #eeeeee"
        >
          <!-- ref="table_form_1"绑定Form -->
          <Form
            inline
            :label-width="75"
            ref="table_form_1"
            :rules="form_rules_1"
            :model="table_form_1"
            label-position="left"
            :hide-required-mark="true"
          >
            <!-- prop的值要与v-model的值相同便于重置 -->
            <FormItem label="数据类型:" prop="dataType">
              <Select
                filterable
                placeholder="请选择数据类型"
                v-model="table_form_1.dataType"
                style="width: 120px"
              >
                <Option value="术语百科" key="术语百科">术语百科</Option>
                <Option value="民航事故" key="民航事故">民航事故</Option>
                <Option value="标准百科" key="标准百科">标准百科</Option>
                <Option value="军事百科" key="军事百科">军事百科</Option>
                <Option value="元器件百科" key="元器件百科">元器件百科</Option>
                <Option value="质量百科" key="质量百科">质量百科</Option>
              </Select>
            </FormItem>
            <FormItem
              label="数据上传时间:"
              prop="temporary_date"
              :label-width="105"
            >
              <DatePicker
                style="width: 200px"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择数据上传时间"
                format="yyyy-MM-dd"
                @on-change="getDateValue"
                v-model="table_form_1.temporary_date"
              ></DatePicker>
            </FormItem>
            <FormItem label="文件名称:" prop="fileName">
              <Tooltip
                max-width="200"
                :content="
                  table_form_1.fileName.toString() == ''
                    ? '您未输入数据'
                    : table_form_1.fileName.toString()
                "
                placement="top"
              >
                <Input
                  style="width: 160px"
                  clearable
                  placeholder="请输入文件名称"
                  v-model="table_form_1.fileName"
                ></Input>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                icon="ios-search"
                style="margin-left: -70px"
                @click="handleSubmit('table_form_1')"
                >查询</Button
              >
              <Button
                @click="handleReset('table_form_1')"
                style="margin-left: 8px"
                >重置</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col span="24" style="padding-top: 15px; padding-bottom: 15px">
          <Button
            type="text"
            @click="add_1"
            style="
              padding: 0px;
              box-shadow: 0px 0px 0px 0px;
              margin-right: 10px;
            "
          >
            <img
              src="~@/img/icon/add.png"
              alt=""
              style="margin-right: 5px"
            />新增</Button
          >
          <Button
            type="text"
            @click="removes_1"
            style="
              padding: 0px;
              box-shadow: 0px 0px 0px 0px;
              margin-right: 10px;
            "
          >
            <img
              src="~@/img/icon/delete.png"
              alt=""
              style="margin-right: 5px"
            />删除</Button
          >
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Table
        border
        stripe
        ref="UploadRecordManagement_table1"
        height="522"
        highlight-row
        :data="tableData_1"
        :loading="loading_1"
        :columns="tableColumns_1"
        @on-select="handleSelectRow_1"
        @on-select-all="handleSelectAll_1"
        @on-select-cancel="handleCancelRow_1"
        @on-select-all-cancel="handleSelectAll_1"
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
  name: "UploadRecordManagement",
  data() {
    return {
      // 筛选框验证
      form_rules_1: {
        temporary_date: [
          {
            // blur失去焦点时触发  change数据发生改变时触发
            required: true,
            // blur失去焦点时触发  change数据发生改变时触发
            trigger: "change",
            validator: (rule, value, callback) => {
              if (
                this.table_form_1.beginTime == "" &&
                this.table_form_1.endTime == ""
              ) {
                return callback(new Error("请选择时间范围！"));
              } else {
                return callback();
              }
            }
          }
        ]
      },
      // 表格的loading
      loading_1: true,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 表格表头
      tableColumns_1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80
        },
        {
          title: "数据类型",
          key: "SCMBLX",
          align: "center",
          tooltip: true,
          minWidth: 130
        },
        {
          title: "文件名称",
          key: "SCWJMC",
          align: "center",
          tooltip: true,
          minWidth: 200
        },
        {
          title: "上传时间",
          key: "SCSJ",
          align: "center",
          tooltip: true,
          minWidth: 120
        },
        {
          title: "上传人",
          key: "SCRID",
          align: "center",
          tooltip: true,
          minWidth: 120
        },
        {
          title: "记录数",
          key: "JLTS",
          align: "center",
          tooltip: true,
          minWidth: 100
        },
        {
          title: "详情",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0"
                  },
                  on: {
                    click: () => {
                      this.show_1(params);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      // 表格数据
      tableData_1: [],
      // 表格勾选的数据ID
      selectedData_1: new Set(),
      // 表格勾选的数据
      selectedData_2: new Set(),
      // 选中的总数量
      selectedSum_1: 0,
      // 获取表格数据时用到的参数
      table_form_1: {
        dataType: "民航事故",
        beginTime: "",
        endTime: "",
        fileName: "",
        temporary_date: [],
        // 获取第几页的数据
        pageNum: "1",
        // 分页的粒度
        pageSize: "10"
      },
      // 获取表格数据时标记一下type的参数
      get_table_dataType: ""
    };
  },
  methods: {
    //  选中某一行
    handleSelectRow_1(selection, row) {
      this.selectedData_1.add(row.num_id);
      this.selectedData_2.add(row);
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  取消某一行
    handleCancelRow_1(selection, row) {
      this.selectedData_1.delete(row.num_id);
      this.selectedData_2.forEach(item => {
        if (item.num_id == row.num_id) {
          this.selectedData_2.delete(item);
        }
      });
      this.selectedSum_1 = this.selectedData_1.size;
    },
    handleSelectAll_1(selection) {
      // 取消全选 数组为空
      if (selection.length === 0) {
        let data = this.$refs.UploadRecordManagement_table1.data;
        data.forEach(item => {
          if (this.selectedData_1.has(item.num_id)) {
            this.selectedData_1.delete(item.num_id);
            this.selectedData_2.forEach(item_ => {
              if (item_.num_id == item.num_id) {
                this.selectedData_2.delete(item_);
              }
            });
          }
        });
      } else {
        selection.forEach(item => {
          this.selectedData_1.add(item.num_id);
          this.selectedData_2.forEach(item_ => {
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
    setChecked() {
      // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
      let objData = this.$refs.UploadRecordManagement_table1.objData;
      for (let index in objData) {
        if (this.selectedData_1.has(objData[index].num_id)) {
          objData[index]._isChecked = true;
        }
      }
    },
    // 获取时间
    getDateValue(val) {
      this.table_form_1.beginTime = val[0];
      this.table_form_1.endTime = val[1];
    },
    // 检索搜索框
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (
          valid &&
          this.table_form_1.startTime != "" &&
          this.table_form_1.endTime != ""
        ) {
          // 需先重置参数如分页倒序检索条件
          this.loading_1 = true;
          this.selectedData_1 = new Set();
          this.selectedData_2 = new Set();
          this.selectedSum_1 = this.selectedData_1.size;
          //第几页
          this.table_form_1.pageNum = 1;
          this.TableData_1();
        } else {
          this.$Message.error({
            content: "表单验证失败！",
            background: true,
            duration: 3
          });
        }
      });
    },
    handleReset(name) {
      // 重置$refs为table_form_1的表单数据
      this.$refs[name].resetFields();
      // 获取上个月的日期然后减去7天
      const date_temporary = fun_date(0, 0);
      // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
      this.$set(this.table_form_1.temporary_date, "1", date_temporary[0]);
      this.table_form_1.endTime = date_temporary[0];
      // 传入今天的时间，获取三个月前的时间
      const date_temporary_2 = fun_date_start_3(date_temporary[0]);
      this.$set(this.table_form_1.temporary_date, "0", date_temporary_2);
      this.table_form_1.beginTime = date_temporary_2;
    },
    // 表数据
    TableData_1: _debounce(function () {
      this.get_table_dataType = this.table_form_1.dataType;
      this.loading_1 = true;
      this.$axios("/baike/caiji/get_upload_records", "get", {
        recordType: this.table_form_1.dataType,
        beginTime: this.table_form_1.beginTime + " 00:00:00",
        endTime: this.table_form_1.endTime + " 23:59:59",
        keyWords: this.table_form_1.fileName,
        pageNum: this.table_form_1.pageNum,
        pageSize: this.table_form_1.pageSize
      }).then(res => {
        // 总页数
        this.totalCount = res.data.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.data.pageNum;
        res.data.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_1.pageSize * (this.table_current_1 - 1) + key + 1;
        });
        // 表数据
        setTimeout(() => {
          this.tableData_1 = res.data.data.resultList;
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    // 切换页码
    table_Pagechange_1(index) {
      this.table_form_1.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.table_form_1.pageSize = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 表格行查看
    show_1(params) {
      //  术语百科/民航事故/标准百科/军事百科/元器件百科
      let data = JSON.parse(JSON.stringify(params.row));
      // 目前只有民航事故
      console.log(data.SCMBLX,data);
      this.$store.commit("updated_UploadRecordManagementDetails", data);
      this.$router.push("UploadRecordManagementDetails");
    },
    add_1() {
      this.$store.commit("updated_Menu_top_active", "新增数据上传");
      this.$router.push("NewDataUpload");
    },
    // 表格多选删除
    removes_1() {
      if (this.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要删除的数据！",
          background: true,
          duration: 3
        });
        return;
      }
      // 已选择的数据
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      // 删除民航事故所需的ID参数
      let data_filter = data.map(item => {
        return item.SCJLID;
      });
      data_filter = data_filter.join(",");
      this.$axios("/baike/caiji/delete_upload_record", "GET", {
        dataType: this.get_table_dataType,
        recordID: data_filter
      }).then(res => {
        if (res.data.code == 200) {
          this.$Message.success({
            content: "删除数据成功！",
            background: true,
            duration: 3
          });
        } else {
          this.$Message.error({
            content: "删除数据失败,请重新选择！",
            background: true,
            duration: 3
          });
        }
        // // 重置检索
        // this.handleReset("table_form_1");
        // 需先重置参数如分页倒序检索条件
        this.loading_1 = true;
        this.selectedData_1 = new Set();
        this.selectedData_2 = new Set();
        this.selectedSum_1 = this.selectedData_1.size;
        //第几页
        this.table_form_1.pageNum = 1;
        this.TableData_1();
      });
    },
    // 检索搜索框
    search_input_change_1(index) {
      // 需先重置参数如分页倒序检索条件
      this.selectedData_1 = new Set();
      this.selectedData_2 = new Set();
      this.selectedSum_1 = this.selectedData_1.size;
      // this.table_form_1.age = index;
      this.loading_1 = true;
      this.TableData_1();
    }
  },
  watch: {
    tableData_1: function () {
      // 给表格数据赋值后并渲染完成表格后执行
      this.$nextTick(function () {
        // Spin.hide();
        this.setChecked();
        this.loading_1 = false;
      });
    }
  },
  mounted() {
    this.$store.commit("updated_Menu_top_active", "上传记录管理");
    // 获取上个月的日期然后减去7天
    let date_temporary = fun_date(0, 0);
    // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
    this.$set(this.table_form_1.temporary_date, "1", date_temporary[0]);
    this.table_form_1.endTime = date_temporary[0];
    // 传入今天的时间，获取三个月前的时间
    const date_temporary_2 = fun_date_start_3(date_temporary[0]);
    this.$set(this.table_form_1.temporary_date, "0", date_temporary_2);
    this.table_form_1.beginTime = date_temporary_2;
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
  }
};
</script>
<style lang="less" scoped>
.ivu-btn-text:hover {
  background: initial;
}
</style>

