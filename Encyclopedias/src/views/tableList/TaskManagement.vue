<template>
    <div style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px">
        <Card :bordered="false" dis-hover :padding="0">
            <Row>
                <Col span="24" style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee">
                <p style="font-size: 18px; font-weight: 800">任务管理</p>
                </Col>
                <Col span="24" style="padding-top: 25px; border-bottom: 1px solid #eeeeee">
                <!-- ref="table_form_1"绑定Form -->
                <Form inline :label-width="75" ref="table_form_1" :rules="form_rules_1" :model="table_form_1" label-position="left" :hide-required-mark="true">
                    <!-- prop的值要与v-model的值相同便于重置 -->
                    <FormItem label="任务类型:" prop="dataType">
                        <Select filterable placeholder="请选择数据类型" v-model="table_form_1.dataType" style="width: 200px;margin-right:30px" @on-change="selectVal">
                            <Option value="shuyu" key="shuyu">术语百科</Option>
                            <Option value="minhang" key="minhang">民航事故百科</Option>
                            <Option value="biaozhun" key="biaozhun">标准知识加工</Option>
                            <Option value="junshi" key="junshi">军事百科</Option>
                            <Option value="yuanqijian" key="yuanqijian">元器件百科</Option>
                            <Option value="suipianhua" key="suipianhua">标准碎片化加工</Option>
                            <Option value="zhiliang" key="zhiliang">装备故障/产品质量知识加工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="创建时间:" prop="temporary_date">
                        <DatePicker :editable="false" style="width: 200px" type="daterange" placement="bottom-start" placeholder="请选择数据上传时间" format="yyyy-MM-dd" @on-change="getDateValue" v-model="table_form_1.temporary_date"></DatePicker>
                    </FormItem>
                    <br />
                    <FormItem label="任务名称:" prop="keyWord">
                        <Tooltip max-width="200" :content="
                  table_form_1.keyWord.toString() == ''
                    ? '您未输入数据'
                    : table_form_1.keyWord.toString()
                " placement="top">
                            <Input style="width: 200px;margin-right:30px" clearable placeholder="请输入任务名称" v-model="table_form_1.keyWord"></Input>
                        </Tooltip>
                    </FormItem>
                    <Form-item prop="taskStatus" label="任务状态:" :label-width="75">
                        <Select clearable v-model="table_form_1.taskStatus" placeholder="请选择任务状态" style="width: 200px;">
                            <Option value="0" v-show="this.table_form_1.dataType !== 'suipianhua'">通用知识加工中</Option>
                            <Option value="1" v-show="this.table_form_1.dataType !== 'suipianhua'">专业知识加工中</Option>
                            <Option value="2" v-show="this.table_form_1.dataType !== 'suipianhua'">知识审核中</Option>
                            <Option value="3" v-show="this.table_form_1.dataType !== 'suipianhua'">任务完成</Option>

                            <Option value="4" v-show="this.table_form_1.dataType == 'suipianhua'">执行中</Option>
                            <Option value="5" v-show="this.table_form_1.dataType == 'suipianhua'">已完成</Option>

                            <Option value="ALL">全部</Option>
                        </Select>
                    </Form-item>
                    <FormItem>
                        <Button type="primary" icon="ios-search" style="margin-left: -75px;width:100px" @click="handleSubmit('table_form_1')">查询
                        </Button>
                        <Button @click="handleReset('table_form_1')" style="margin-left: 8px;width:100px">重置
                        </Button>
                    </FormItem>
                </Form>
                </Col>
                <Col span="24" style="padding-top: 15px; padding-bottom: 15px">
                <Button type="text" icon="ios-add-circle-outline" @click="add_1" style="padding: 0px; box-shadow: 0px 0px 0px 0px">新增
                </Button>
                </Col>
            </Row>
            <!-- 表格 -->
            <!-- border -->
            <Table border stripe ref="TaskManagementtable1" height="522" highlight-row :data="tableData_1" :loading="loading_1" :columns="tableColumns_1" @on-select="handleSelectRow_1" @on-select-all="handleSelectAll_1" @on-select-cancel="handleCancelRow_1" @on-select-all-cancel="handleSelectAll_1"></Table>
            <Row>
                <Col span="24">
                <div style="
              margin: 20px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
                    <div>
                        <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
                        <span>已选择{{ selectedSum_1 }}条记录</span>
                    </div>
                    <div>
                        <Page :total="totalCount" :current="table_current_1" @on-change="table_Pagechange_1" @on-page-size-change="table_PageSizechange_1" show-sizer show-elevator></Page>
                    </div>
                </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import { fun_date, fun_date_start_3 } from '@/libs/tools';
import { _debounce, _throttle } from '@/libs/Perform_optimization.js';
import { parse } from 'qs';

export default {
  name: 'TaskManagement',
  data() {
    return {
      // 筛选框验证
      formItem: {},
      form_rules_1: {
        temporary_date: [
          {
            // blur失去焦点时触发  change数据发生改变时触发
            required: true,
            // blur失去焦点时触发  change数据发生改变时触发
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (
                this.table_form_1.beginStartDate == '' &&
                this.table_form_1.endStartDate == ''
              ) {
                return callback(new Error('请选择时间范围！'));
              } else {
                return callback();
              }
            },
          },
        ],
      },
      // 表格的loading
      loading_1: true,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 表格表头
      tableColumns_1: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: '序号',
          key: 'num_id',
          align: 'center',
          tooltip: true,
          width: 80,
        },
        {
          title: '任务类型',
          key: 'JOBTYPE',
          align: 'center',
          tooltip: true,
          minWidth: 140,
          render: (h, params) => {
            let text;
            if (params.row.JOBTYPE == 'shuyu') {
              text = '术语知识抽取';
            } else if (params.row.JOBTYPE == 'minhang') {
              text = '民航事故知识抽取';
            } else if (params.row.JOBTYPE == 'biaozhun') {
              text = '标准知识抽取';
            } else if (params.row.JOBTYPE == 'junshi') {
              text = '军事知识抽取';
            } else if (params.row.JOBTYPE == 'yuanqijian') {
              text = '元器件知识抽取';
            } else if (params.row.JOBTYPE == 'suipianhua') {
              text = '标准碎片化加工';
            } else if (params.row.JOBTYPE == 'zhiliang') {
              text = '质量知识抽取';
            }
            return h('div', [h('P', {}, text)]);
          },
        },
        {
          title: '任务名称',
          key: 'JOBNAME',
          align: 'center',
          tooltip: true,
          minWidth: 160,
        },
        {
          title: '创建人',
          key: 'STARTUSER',
          align: 'center',
          tooltip: true,
          minWidth: 100,
        },
        {
          title: '创建时间',
          key: 'JOBSTARTTIME',
          align: 'center',
          tooltip: true,
          minWidth: 120,
        },
        {
          title: '任务状态',
          key: 'STATUS',
          align: 'center',
          tooltip: true,
          minWidth: 140,
          //   0-通用知识加工中；1-专业知识加工中；2-知识审核中；3-任务完成
          render: (h, params) => {
            if (this.tabTitle) {
              return h('div', [
                h(
                  'P',
                  {},
                  params.row.STATUS == 0
                    ? '通用知识加工中'
                    : params.row.STATUS == 1
                    ? '专业知识加工中'
                    : params.row.STATUS == 2
                    ? '知识审核中'
                    : params.row.STATUS == 3
                    ? '任务完成'
                    : params.row.STATUS == 4
                    ? '碎片化'
                    : ''
                  //<Progress :percent="25" :stroke-width="20" text-inside />
                ),
              ]);
            } else {
              return h('div', [
                h('Progress', {
                  props: {
                    percent: params.row.STATUS_OF,
                    strokeWidth: 23,
                    textInside: true,
                    status: 'active',
                    strokeColor: '#5cbf6c',
                  },
                }),
              ]);
            }
          },
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                    ghost: true,
                  },
                  style: {
                    marginRight: '5px',
                    color: '#2d8cf0',
                  },
                  on: {
                    click: () => {
                      this.show_1(params);
                    },
                  },
                },
                '详情'
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
      // 获取表格数据时用到的参数
      table_form_1: {
        taskStatus: 'ALL',
        // dataType: "minhang",
        dataType: 'biaozhun',
        beginStartDate: '',
        endStartDate: '',
        keyWord: '',
        temporary_date: [],
        // 获取第几页的数据
        pageIndex: '1',
        // 分页的粒度
        pageNum: '10',
      },
      //判断是否是标准碎片化
      tabTitle: true,
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
        let data = this.$refs.TaskManagementtable1.data;
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
      let objData = this.$refs.TaskManagementtable1.objData;
      for (let index in objData) {
        if (this.selectedData_1.has(objData[index].num_id)) {
          objData[index]._isChecked = true;
        }
      }
    },
    // 获取时间
    getDateValue(val) {
      this.table_form_1.beginStartDate = val[0];
      this.table_form_1.endStartDate = val[1];
    },
    // 检索搜索框
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (
          valid &&
          this.table_form_1.startTime != '' &&
          this.table_form_1.endStartDate != ''
        ) {
          // 需先重置参数如分页倒序检索条件
          this.loading_1 = true;
          this.selectedData_1 = new Set();
          this.selectedData_2 = new Set();
          this.selectedSum_1 = this.selectedData_1.size;
          //第几页
          this.table_form_1.pageIndex = 1;
          if (this.table_form_1.dataType === 'suipianhua') {
            this.tableColumns_1.forEach(item => {
              if (item.title == '任务状态') {
                item.title = '加工状态';
                this.tabTitle = false;
              }
            });

            this.tableColumns_1.splice(
              4,
              0,
              {
                title: '上传文件数',
                key: 'total_files_count',
                align: 'center',
                tooltip: true,
                minWidth: 120,
              },
              {
                title: '成功上传的文件数',
                key: 'success_files_count',
                align: 'center',
                tooltip: true,
                minWidth: 150,
              }
            );
            if (this.tableColumns_1.length > 9) {
              this.tableColumns_1.splice(4, 2);
            }
          } else {
            this.tableColumns_1.forEach(item => {
              if (item.title == '任务状态' || item.title == '加工状态') {
                item.title = '任务状态';
                this.tabTitle = true;
              }
            });
            if (this.tableColumns_1[4].title === '上传文件数') {
              this.tableColumns_1.splice(4, 2);
            }
          }
          this.TableData_1();
        } else {
        }
      });
    },
    handleReset(name) {
      // 重置$refs为table_form_1的表单数据
      this.$refs[name].resetFields();
      // 获取上个月的日期然后减去7天
      let date_temporary = fun_date(0, 0);
      // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
      this.$set(this.table_form_1.temporary_date, '1', date_temporary[0]);
      this.table_form_1.endStartDate = date_temporary[0];
      // 传入今天的时间，获取三个月前的时间
      let date_temporary_2 = fun_date_start_3(date_temporary[0]);
      this.$set(this.table_form_1.temporary_date, '0', date_temporary_2);
      this.table_form_1.beginStartDate = date_temporary_2;
      this.TableData_1();
    },
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      if (this.table_form_1.dataType === 'suipianhua') {
        this.$axios(
          '/baike/chip/page_task',
          'post',
          this.$qs.stringify({
            page_size: this.table_form_1.pageNum,
            page_num: this.table_form_1.pageIndex,
            begin_time: this.table_form_1.beginStartDate,
            end_time: this.table_form_1.endStartDate,
            task_name: this.table_form_1.keyWord,
          })
        ).then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            // 总页数
            this.totalCount = res.data.data.count;
            // 当前页码
            this.table_current_1 = this.table_form_1.pageIndex;
            res.data.data.data_details.map((item, key) => {
              let staus_ =
                item.process_per.substring(0, item.process_per.length - 1) * 1;
              item.num_id =
                this.table_form_1.pageNum * (this.table_current_1 - 1) +
                key +
                1;
              item.JOBTYPE = 'suipianhua';
              item.JOBNAME = item.task_name;
              item.STARTUSER = item.created_by;
              item.JOBSTARTTIME = item.created_time;
              item.STATUS_OF = staus_;
            });

            // 表数据
            setTimeout(() => {
              this.tableData_1 = res.data.data.data_details;
              this.loading_1 = false;
            }, 200);
          }
        });
        return;
      }
      this.$axios(
        '/baike/yuchuli/listJobsNew',
        'post',
        this.$qs.stringify({
          pageIndex: this.table_form_1.pageIndex - '1',
          pageNum: this.table_form_1.pageNum,
          dataType: this.table_form_1.dataType,
          keyWord: this.table_form_1.keyWord,
          jobStatus: this.table_form_1.taskStatus,
          beginStartDate: this.table_form_1.beginStartDate + ' 00:00:00',
          endStartDate: this.table_form_1.endStartDate + ' 23:59:59',
        })
      ).then(res => {
        console.log(res);
        // 总页数
        this.totalCount = res.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.pageIndex + 1;
        res.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_1.pageNum * (this.table_current_1 - 1) + key + 1;
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
      this.table_form_1.pageIndex = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.table_form_1.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 表格行查看
    show_1: _throttle(function(params) {
      console.log(params, '去哪了');
      let data = JSON.parse(JSON.stringify(params.row));
      this.$store.commit('updated_TaskManagementDetailsFirst', data);
      let value =
        this.table_form_1.dataType === 'minhang'
          ? '民航事故知识抽取'
          : this.table_form_1.dataType === 'shuyu'
          ? '术语百科知识抽取'
          : this.table_form_1.dataType === 'biaozhun'
          ? '标准知识加工'
          : this.table_form_1.dataType === 'zhiliang'
          ? '装备故障/产品质量问题知识抽取'
          : '';
      this.$store.commit('StartBut', value);
      this.$store.commit('ModifiesTaskList', {
        list: '',
        id: data.id,
        name: data.JOBNAME,
        TaskData: '',
      });
      if (params.row.JOBTYPE === 'suipianhua') {
        //碎片化任务详情
        if (params.row.STATUS_OF === 100) {
          this.$store.commit('NestTaskFlow', 5);
          this.$router.push('DataWarehousing');
          return;
        }
        this.$Message.info('加工未完成');
      }
      this.$store.commit('ModifiesTaskList', {
        list: '',
        id: data.JOBID,
        name: data.JOBNAME,
        TaskData: '',
      });
      if (data.STATUS == 0) {
        // status为0时，则跳转通用知识加工，也就是TaskManagementDetails第一
        this.$store.commit('NestTaskFlow', 1);
        this.$router.push('TaskManagementDetailsFirst');
      } else if (data.STATUS == 1) {
        //专业知识
        this.$store.commit('NestTaskFlow', 2);
        this.$router.push('TaskExpertise');
      } else if (data.STATUS == 2) {
        //知识审核
        this.$store.commit('NestTaskFlow', 3);
        this.$router.push('KnowledgeAudit');
      } else if (data.STATUS == 3) {
        //数据入库
        this.$store.commit('NestTaskFlow', 4);
        this.$router.push('DataWarehousing');
      }
      // else if (data.STATUS == 2) {
      //   // status为2时，则跳转知识审核页面，也就是TaskManagementDetails第二
      //   this.$router.push("TaskManagementDetailsSecond");
      // } else {
      //   this.$store.commit("updated_TaskManagementDetailsThird", {
      //     jobId: data.JOBID,
      //     status: "3"
      //   });
      //   this.$router.push("TaskManagementDetailsThird");
      // }
    }, 300),
    add_1() {
      this.$store.commit('updated_Menu_top_active', '新建任务');
      this.$router.push('addTask');
    },
    //选择数据类型
    selectVal(e) {
      if (e === 'suipianhua') {
      }
      console.log(e);
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
    this.$store.commit('updated_Menu_top_active', '任务管理');
    // 获取上个月的日期然后减去7天
    let date_temporary = fun_date(0, 0);
    // 因为要获取三月前的时间和今天的时间，所以今天的时间放到数组的第二个位置，三个月前的时间放第一个位置
    this.$set(this.table_form_1.temporary_date, '1', date_temporary[0]);
    this.table_form_1.endStartDate = date_temporary[0];
    // 传入今天的时间，获取三个月前的时间
    let date_temporary_2 = fun_date_start_3(date_temporary[0]);
    this.$set(this.table_form_1.temporary_date, '0', date_temporary_2);
    this.table_form_1.beginStartDate = date_temporary_2;
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
  },
};
</script>
<style lang="less" scoped>
@import '../../styles/unified.css';

.ivu-btn-text:hover {
  background: initial;
}

.search_form {
  padding: 15px 0px;
  border-bottom: 1px solid #eeeeee;
}
/deep/ .ivu-progress-inner {
  background-color: #ed4014;
}
/deep/ .ivu-progress-inner{
  position:relative;
  overflow: hidden;
}
/deep/ .ivu-progress-bg{
  position: unset;
}
/deep/ .ivu-progress-inner-text{
  position: absolute;
    left: 50%;
    margin: 0;
    margin-left: -30px;
    width: 60px;
    line-height: 23px;
    text-align: center;
}
</style>
