<template>
  <div
    style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px"
  >
    <Card :bordered="false" dis-hover :padding="0">
      <Row>
        <Col
          span="24"
          style="padding-bottom: 10px; border-bottom: 1px solid #eeeeee"
        >
          <p style="font-size: 18px; font-weight: 800">新建任务</p>
        </Col>
        <Col span="24" style="padding-top: 10px">
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
            <Col span="24" style="padding: 5px 0">
              <div>
                任务类型:
                <span style="margin-left:11px">{{ Selected }}</span>
              </div>
            </Col>
            <!-- prop的值要与v-model的值相同便于重置 -->
            <FormItem
              label="任务名称:"
              prop="missionName"
              style="margin-bottom: 20px"
            >
              <Input
                style="width: 250px"
                clearable
                placeholder="请输入任务名称"
                v-model="table_form_1.missionName"
              ></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="24">
          <p style="font-size: 18px; font-weight: 800">选择模型类别</p>
          <div class="chebox">
            <span>通用知识加工模型:</span>
            <CheckboxGroup v-model="UniversalModel">
              <Checkbox
                v-for="(item, index) in commonModel"
                :label="item.modelName"
                :key="index"
              ></Checkbox>
            </CheckboxGroup>
          </div>
          <div class="chebox" style="padding-bottom:0px">
            <span>专业知识抽取模型:</span>
            <CheckboxGroup v-model="ProfessionalModel">
              <Checkbox
                v-for="(item, index) in specialModel"
                :label="item.modelName"
                :key="index"
              ></Checkbox>
            </CheckboxGroup>
          </div>
        </Col>
        <Col span="24" style="padding-top: 10px">
          <p style="font-size: 18px; font-weight: 800">选择类型</p>
          <!-- ref="table_form_2"绑定Form -->
          <Form
            inline
            :label-width="75"
            ref="table_form_2"
            :rules="form_rules_2"
            :model="table_form_2"
            label-position="left"
            :hide-required-mark="true"
          >
            <!-- prop的值要与v-model的值相同便于重置 -->
            <FormItem
              label="请选择类型:"
              prop="dataType"
              :label-width="90"
              style="margin-bottom: 10px"
            >
              <Select
                filterable
                placeholder="请选择数据类型"
                v-model="table_form_2.dataType"
                style="width: 120px"
              >
                <Option value="shuyu" key="shuyu">术语百科</Option>
                <Option value="minhang" key="minhang">民航事故百科</Option>
                <Option value="biaozhun" key="biaozhun">标准知识百科</Option>
                <Option value="junshi" key="junshi">军事百科</Option>
                <Option value="yuanqijian" key="yuanqijian">元器件百科</Option>
                <Option value="zhiliang" key="zhiliang">质量知识百科</Option>
              </Select>
            </FormItem>
            <FormItem
              label="上传时间:"
              prop="temporary_date"
              :label-width="75"
              style="margin-bottom: 15px"
            >
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
            <FormItem
              label="关键词:"
              prop="keyWord"
              :label-width="60"
              style="margin-bottom: 15px"
            >
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
            <FormItem style="margin-bottom: 15px">
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
        height="523"
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
        <template slot="action">
          <Button type="primary" size="small" style="margin-right: 5px"
            >View</Button
          >
        </template>
      </Table>
      <Row>
        <Col
          span="4"
          style="text-align: left;display: flex;align-items: center;"
        >
          <Button
            type="primary"
            @click="Knowledge_extraction_bth"
            style="width: 100px"
            >创建任务</Button
          >
        </Col>
        <Col span="20">
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
    <Modal
      v-model="Modal_1"
      width="550"
      :mask-closable="false"
      scrollable
      inline
      :styles="{ paddingBottom: '100px' }"
    >
      <p slot="header" style="fontSize: 16px;fontWeight: 600">
        <span>标准基本信息</span>
      </p>
      <div>
        <Row>
          <Col span="24">
            <Form
              inline
              :label-width="150"
              ref="table_form_one"
              :rules="form_rules_one"
              :model="table_form_one"
              label-position="left"
              :hide-required-mark="false"
            >
              <div class="Modal_row_box">
                <FormItem
                  :label="item.COLUMN_COMMENT"
                  v-for="(item, idenx) in table_form_title"
                  :key="idenx"
                >
                  <Input
                    style=" width: 300px"
                    clearable
                    v-model="table_form_one[item.COLUMN_NAME]"
                    disabled
                    v-if="!table_form_one[item.COLUMN_NAME]"
                  ></Input>
                  <Input
                    style=" width: 300px"
                    clearable
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 5 }"
                    v-model="table_form_one[item.COLUMN_NAME]"
                    disabled
                    v-else
                  ></Input>
                </FormItem>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <div slot="footer" style="text-align:center">
        <!-- <Button type="primary" @click="asyncOK">确定</Button> -->
        <Button type="text" @click="Modal_1 = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { fun_date, fun_date_start_3 } from "@/libs/tools";
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "NewTask",
  data() {
    return {
      isFirstSetAllSelect: true,
      Modal_1: false,
      // 表格的loading
      loading_1: true,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      StandardKnowledge: false, //知识抽取
      QualityKnowledge: false, //质量抽取
      AccidentKnowledge: false, //事故抽取
      idKey: "", //判断不是事故id抽取，勾选的key修改
      NameKey: "", //判断不是事故名称抽取，勾选的key修改
      // 表格表头
      tableColumns_1: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80,
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
        {
          title: "操作",
          align: "center",
          tooltip: true,
          minWidth: 80,
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
                      this.show_1(params);
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      // 表格数据
      tableData_1: [],
      // 表格勾选的数据ID
      selectedData_1: new Set(),
      // 表格勾选的数据
      selectedData_2: new Set(),
      // 选中的总数量
      selectedSum_1: 0,
      form_rules_1: {
        missionName: [
          {
            // blur失去焦点时触发  change数据发生改变时触发
            required: true,
            // blur失去焦点时触发  change数据发生改变时触发
            trigger: "change",
            message: "请输入任务名称！",
          },
        ],
      },
      //通用模型
      UniversalModel: [],
      //专业模型
      ProfessionalModel: [],
      table_form_1: {
        missionName: "",
      },
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
      //通用list
      commonModel: [],
      //专业list
      specialModel: [],

      table_form_2: {
        dataType: "zhiliang",
        beginDate: "",
        endDate: "",
        keyWord: "",
        temporary_date: [],
        // 获取第几页的数据
        pageIndex: "1",
        // 分页的粒度
        pageNum: "10",
      },
      //弹框表单
      table_form_one: {},
      //弹框title
      table_form_title: [],
      // 筛选框验证
      form_rules_one: {
        SGLYWJMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入事故来源文件名称!",
          },
        ],
        SGMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入事故名称!",
          },
        ],
        SGCWB: [
          {
            required: true,
            trigger: "blur",
            message: "请输入事故纯文本!",
          },
        ],
        SYLY: [
          {
            required: true,
            trigger: "blur",
            message: "请输入术语来源!",
          },
        ],
        SYZWMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入术语中文名称!",
          },
        ],
        // Test
        DYHJS: [
          {
            required: true,
            trigger: "blur",
            message: "请输入定义或解释!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入元器件百科!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入型号规格!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入标准编号!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入标准中文名称!",
          },
        ],
        // 质量百科
        ZBXH: [
          {
            required: true,
            trigger: "blur",
            message: "请输入装备型号!",
          },
        ],
        SSXT: [
          {
            required: true,
            trigger: "blur",
            message: "请输入所属系统!",
          },
        ],
        CPMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入产品名称!",
          },
        ],
        CPXH: [
          {
            required: true,
            trigger: "blur",
            message: "请输入产品型号!",
          },
        ],
        XXMS: [
          {
            required: true,
            trigger: "blur",
            message: "请输入现象描述!",
          },
        ],
        GZYY: [
          {
            required: true,
            trigger: "blur",
            message: "请输入故障原因!",
          },
        ],
        GLXX_JLFX_SXFX: [
          {
            required: true,
            trigger: "blur",
            message: "请输入机理分析/失效分析!",
          },
        ],
        GLXX_GJCS: [
          {
            required: true,
            trigger: "blur",
            message: "请输入改进措施!",
          },
        ],
      },
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
      this.selectedData_2.forEach((item) => {
        if (item.num_id == row.num_id) {
          this.selectedData_2.delete(item);
        }
      });
      this.selectedSum_1 = this.selectedData_1.size;
    },
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
          console.log(this.table_form_2.dataType, "-==============");
          if (
            this.table_form_2.dataType !== "biaozhun" &&
            this.table_form_2.dataType !== "zhiliang" &&
            this.table_form_2.dataType !== "minhang"
          ) {
            return this.$Message.info("建设中...");
          }
          // 需先重置参数如分页倒序检索条件
          this.loading_1 = true;
          this.selectedData_1 = new Set();
          this.selectedData_2 = new Set();
          this.selectedSum_1 = this.selectedData_1.size;
          //第几页
          this.table_form_2.pageIndex = 1;
          this.TableHeader();
          this.TableData_1();
          //修改表头
          if (this.table_form_2.dataType == "biaozhun") {
            this.StandardKnowledge = true;
            this.QualityKnowledge = false;
            this.AccidentKnowledge = false;
            this.tableColumns_1.map((item) => {
              console.log(123);
              if (
                item.title === "事故名称" ||
                item.title === "装备型号" ||
                item.title === "标准名称"
              ) {
                item.title = "标准名称";
                item.key = "bzzwmc";
              }
              if (
                item.title == "事故ID" ||
                item.title == "标准ID" ||
                item.title == "故障ID"
              ) {
                item.title = "标准ID";
                item.key = "bzid";
              }

              return item;
            });
          } else if (this.table_form_2.dataType == "zhiliang") {
            this.QualityKnowledge = true;
            this.StandardKnowledge = false;
            this.AccidentKnowledge = false;
            this.tableColumns_1.map((item) => {
              if (
                item.title === "事故名称" ||
                item.title === "装备型号" ||
                item.title === "标准名称"
              ) {
                item.title = "装备型号";
                item.key = "zbxh";
              }
              if (
                item.title == "事故ID" ||
                item.title == "标准ID" ||
                item.title == "故障ID"
              ) {
                item.title = "故障ID";
                item.key = "gzid";
              }
              return item;
            });
          } else if (this.table_form_2.dataType == "minhang") {
            this.AccidentKnowledge = true;
            this.QualityKnowledge = false;
            this.StandardKnowledge = false;
            this.tableColumns_1.map((item) => {
              if (
                item.title === "事故名称" ||
                item.title === "装备型号" ||
                item.title === "标准名称"
              ) {
                item.title = "事故名称";
                item.key = "sgmc";
              }
              if (
                item.title == "事故ID" ||
                item.title == "标准ID" ||
                item.title == "故障ID"
              ) {
                item.title = "故障ID";
                item.key = "sgid";
              }
              return item;
            });
          }
          this.idKey = this.StandardKnowledge
            ? "bzid"
            : this.AccidentKnowledge
            ? "sgid"
            : this.QualityKnowledge
            ? "gzid"
            : "";
          this.NameKey = this.StandardKnowledge
            ? "bzzwmc"
            : this.AccidentKnowledge
            ? "sgmc"
            : this.QualityKnowledge
            ? "zbxh"
            : "";
        } else {
        }
      });
    },
    handleReset(name) {
      // 重置$refs为table_form_2的表单数据
      this.$refs[name].resetFields();
      // 获取上个月的日期然后减去7天
      let date_temporary = fun_date(0, 0);
      // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
      this.$set(this.table_form_2.temporary_date, "1", date_temporary[0]);
      this.table_form_2.endDate = date_temporary[0];
      // 传入今天的时间，获取三个月前的时间
      let date_temporary_2 = fun_date_start_3(date_temporary[0]);
      this.$set(this.table_form_2.temporary_date, "0", date_temporary_2);
      this.table_form_2.beginDate = date_temporary_2;
      this.handleSubmit("table_form_2");
    },
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      this.$axios(
        "/baike/yuchuli/searchUploadRecordsByRowNew",
        "post",
        this.$qs.stringify({
          pageIndex: this.table_form_2.pageIndex - "1",
          pageNum: this.table_form_2.pageNum,
          dataType: this.table_form_2.dataType,
          beginDate: this.table_form_2.beginDate,
          endDate: this.table_form_2.endDate,
          keyWord: this.table_form_2.keyWord,
        })
      ).then((res) => {
        // console.log(res,this.table_form_2.pageIndex - "1",this.table_form_2.pageNum,this.table_form_2.dataType,this.table_form_2.beginDate + " 00:00:00",this.table_form_2.endDate + " 23:59:59",this.table_form_2.keyWord, "表");
        // 总页数
        this.totalCount = res.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.pageIndex + 1;
        res.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_2.pageNum * (this.table_current_1 - 1) + key + 1;
          return item;
        });
        console.log(res.data);
        // 表数据
        setTimeout(() => {
          this.tableData_1 = res.data.resultList;
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    //获取模型数据
    TableHeader: _debounce(function() {
      this.$axios(
        "/baike/yuchuli/newJobInitQuery",
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
        console.log(res, "数据模型");
        if (res.data.code == 200) {
          this.commonModel = res.data.commonModel;
          this.specialModel = res.data.specialModel;
          this.$nextTick(() => {
            if (this.isFirstSetAllSelect) {
              this.ProfessionalModel = res.data.specialModel.map((item) => {
                return item.modelName;
              });
              this.UniversalModel = res.data.commonModel.map((item) => {
                return item.modelName;
              });
              this.isFirstSetAllSelect = false;
            }
          });
        }
        console.log(this.ProfessionalModel, this.UniversalModel);
      });
    }),
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
    // 创建任务
    Knowledge_extraction_bth() {
      let arr = [];
      let arr1 = [];
      this.UniversalModel.forEach((item) => {
        this.commonModel.forEach((item1) => {
          if (item === item1.modelName) {
            arr.push(item1.modelID);
          }
        });
      });
      this.ProfessionalModel.forEach((item) => {
        this.specialModel.forEach((item1) => {
          if (item === item1.modelName) {
            arr1.push(item1.modelID);
          }
        });
      });
      this.$refs.table_form_1.validate((valid) => {
        if (valid) {
          if (
            this.UniversalModel.length === 0 ||
            this.ProfessionalModel.length === 0
          ) {
            this.$Message.warning({
              content: "请先勾选要模型类别！",
              background: true,
              duration: 3,
            });
            return;
          }
          // 表单校验通过，进行判断表格内是否有选中一条数据
          if (this.selectedSum_1 == 0) {
            this.$Message.warning({
              content: "请先勾选要进行知识抽取的数据！",
              background: true,
              duration: 3,
            });
            return;
          } else {
            // 验证成功，进行知识抽取的下一步操作

            let selected_data = JSON.parse(
              JSON.stringify(Array.from(this.selectedData_2))
            );

            let filter_data = selected_data.map((item) => {
              console.log(
                this.idKey,
                item,
                item[this.idKey],
                "=================="
              );
              return item[this.idKey];
            });
            console.log(filter_data, selected_data, "sa|||||");
            filter_data = filter_data.join("|");
            this.$store.commit("ModifiesTaskList", {
              list: "",
              id: "",
              name: this.table_form_1.missionName,
              TaskData: {
                dataType: this.table_form_2.dataType,
                recordId: filter_data,
                jobName: this.table_form_1.missionName,
                commonModelId: arr.join("@"),
                specialModelId: arr1.join("@"),
              },
            });
            this.$store.dispatch("changeTaskFlow", -1);
            this.$router.push("TaskManagementDetailsFirst");

            //#region
            // this.$axios(
            //   "/baike/yuchuli/makeJobForInforExtractionNew",
            //   "post",
            //   this.$qs.stringify({
            //     dataType: this.table_form_2.dataType,
            //     recordId: filter_data,
            //     jobName: this.table_form_1.missionName,
            //     commonModelId: arr.join("@"),
            //     specialModelId: arr1.join("@"),
            //   })
            // ).then((data) => {
            //   console.log(data, "成功");
            //   if (data.data.code === 200) {
            //     // console.log(this.table_form_1.missionName, "sad");
            //     this.$store.commit("ModifiesTaskList", {
            //       list: data.data.resultList,
            //       id: data.data.JOBID,
            //       name: this.table_form_1.missionName,
            //     });
            //     if (data.data.resultList.length > 0) {
            //       this.$router.push("TaskManagementDetailsFirst");
            //     }
            //   }
            // });
            //#endregion
          }
        } else {
          this.$Message.warning({
            content: "请填写任务名称！",
            background: true,
            duration: 3,
          });
        }
      });
    },
    //查看
    show_1(params) {
      this.$Spin.show();
      let TypeName = this.StandardKnowledge
        ? "BZBK"
        : this.AccidentKnowledge
        ? "MHSG"
        : this.QualityKnowledge
        ? "ZLBK"
        : "";
      this.$axios("/baike/caiji/get_detail_info", "get", {
        detailID: params.row[this.idKey],
        dataType: TypeName,
      }).then((res) => {
        console.log(res, "=================");
        this.table_form_title = res.data.column_name_pair;
        this.table_form_one = res.data.data[0];
        setTimeout(() => {
          this.$Spin.hide();
        }, 600);
      });
      this.Modal_1 = true;
    },
    //弹框的确认
    asyncOK() {},
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
    // 获取上个月的日期然后减去7天
    let date_temporary = fun_date(0, 0);
    // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
    this.$set(this.table_form_2.temporary_date, "1", date_temporary[0]);
    this.table_form_2.endDate = date_temporary[0];
    // 传入今天的时间，获取三个月前的时间
    let date_temporary_2 = fun_date_start_3(date_temporary[0]);
    this.$set(this.table_form_2.temporary_date, "0", date_temporary_2);
    this.table_form_2.beginDate = date_temporary_2;

    this.table_form_2.dataType =
      this.Selected === "民航事故知识抽取"
        ? "minhang"
        : this.Selected === "术语百科知识抽取"
        ? "shuyu"
        : this.Selected === "装备故障/产品质量问题知识抽取"
        ? "zhiliang"
        : this.Selected === "标准知识加工"
        ? "biaozhun"
        : "";
    // console.log(
    //   this.Selected === "术语百科知识抽取",
    //   this.Selected,
    //   this.table_form_2.dataType,
    //   "123"
    // );
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
    //获取模型数据
    this.TableHeader();

    let table_form_2 = {
      dataType: this.table_form_2.dataType,
      beginDate: this.table_form_2.beginDate,
      endDate: this.table_form_2.endDate,
      keyWord: this.table_form_2.keyWord,
      pageIndex: this.table_form_2.pageIndex,
      pageNum: this.table_form_2.pageNum,
    };
    if (this.Selected == "标准知识加工") {
      this.StandardKnowledge = true;
      this.tableColumns_1.map((item) => {
        if (item.title === "事故名称") {
          item.title = "标准名称";
          item.key = "bzzwmc";
        }
        if (item.title == "事故ID") {
          item.title = "标准ID";
          item.key = "bzid";
        }

        return item;
      });
    } else if (this.Selected == "装备故障/产品质量问题知识抽取") {
      this.QualityKnowledge = true;
      this.tableColumns_1.map((item) => {
        if (item.title === "事故名称") {
          item.title = "装备型号";
          item.key = "zbxh";
        }
        if (item.title == "事故ID") {
          item.title = "故障ID";
          item.key = "gzid";
        }
        return item;
      });
    } else {
      this.AccidentKnowledge = true;
    }
    this.idKey = this.StandardKnowledge
      ? "bzid"
      : this.AccidentKnowledge
      ? "sgid"
      : this.QualityKnowledge
      ? "gzid"
      : "";
    this.NameKey = this.StandardKnowledge
      ? "bzzwmc"
      : this.AccidentKnowledge
      ? "sgmc"
      : this.QualityKnowledge
      ? "zbxh"
      : "";
  },
  computed: {
    Selected() {
      return this.$store.state.standard.Selected;
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.chebox {
  display: flex;
  padding-top: 8px;
  span {
    margin-right: 10px;
  }
}
.model_form {
  /deep/.ivu-form-item {
    width: 100%;
    .ivu-form-item-label {
      text-align: left;
    }
  }
}
.Modal_row_box {
  height: 450px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.ivu-btn-text:hover {
  background: initial;
}
</style>
