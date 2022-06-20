<template>
    <div style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px">
        <Card :bordered="false" dis-hover :padding="0">
            <Row>
                <Col span="24" style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee">
                <p style="font-size: 18px; font-weight: 800">
                    "{{ TaskName }}"任务审核
                </p>
                </Col>
                <Col span="24" style="padding:  15px 0;">
                <p style="font-size: 18px; font-weight: 800">新词发现</p>
                </Col>
                <Col v-if="StandardKnowledge" span="24" style="display:flex;align-items: center;margin:10px 0;" class="Stame">
                <span class="StandardName">标准名称：</span>
                <!-- <div class="textName" v-html="name_value"></div> -->
                <Input v-model="standard_name" type="textarea" disabled />
                </Col>
                <Col v-if="StandardKnowledge" span="24" style="display:flex;align-items: center;margin:10px 0;" class="Stame">
                <span class="StandardName">标准编号：</span>
                <!-- <div class="textName" v-html="name_value"></div> -->
                <Input v-model="standard_no" type="textarea" disabled />
                </Col>
                <Col v-if="StandardKnowledge" span="24" style="display:flex;align-items: center;margin:10px 0;">
                <span class="StandardName">适用范围：</span>
                <!-- <div class="textarea" v-html="text_value"></div> -->
                <div class="textarea" v-html="textarea"></div>
                </Col>
                <Col v-else span="24" style="display:flex;align-items: center;margin:10px 0;">
                <span class="StandardName">事故报告文本：</span>
                <!-- <div class="textarea" v-html="text_value"></div> -->
                <div class="textarea" v-html="textarea"></div>
                </Col>
                <!--        <Col span="24">-->
                <!--          <div class="textarea" v-html="textarea"></div>-->
                <!--        </Col>-->

                <Col span="24" style="padding:  15px 0;text-align: right;">
                <p>当前审核第{{ num + 1 }}条数据，共{{ total_count }}条</p>
                </Col>
                <Col span="24" style="padding:  10px 0">
                <span style="margin-right:10px">模型选择：</span>
                <Select v-model="model1" style="width:300px" @on-change="ModelProperties($event)">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="24" style="padding:  15px 0;">
                <Button type="primary" style="width: 100px" @click="PreviousStep()">查看下一条</Button>
                <Button type="primary" style="width: 100px;margin-left:20px" @click="NextSteps()">刷新结果</Button>
                </Col>
                <Col span="24" style="padding:  30px 0;">
                <p style="font-size: 18px; font-weight: 800">
                    分析结果
                </p>
                </Col>
            </Row>
            <Table border stripe height="522" highlight-row :data="tableData_1" ref="NewTask_table1" :loading="loading_1" :columns="tableColumns_1" :on-cell-click="tableName_1">
            </Table>
            <div style="
              margin: 20px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
                <div>
                    <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
                </div>
                <div>
                    <Page :total="totalCount" :current="table_current_1" @on-change="table_Pagechange_1" @on-page-size-change="table_PageSizechange_1" show-sizer show-elevator></Page>
                </div>
            </div>
            <Row>
                <Col span="24" style="text-align: center; margin-top: 30px;padding-bottom:50px;">
                <Button type="primary" @click="preservation" style="width: 100px;margin-right:20px">保存结果</Button>
                <Button type="primary" @click="returnkey" style="width: 100px">返回</Button>
                </Col>
            </Row>
        </Card>
        <Modal v-model="modal1" width="600" :mask-closable="false" scrollable inline class="modal1_log_1" @on-visible-change="Modal_status">
            <p slot="header" style="fontsize: 16px; fontweight: 600;text-align: center;">
                <span>修改属性值</span>
            </p>
            <div>
                <Form ref="formCustom_1" :model="formCustom_1">
                    <Row :gutter="32">
                        <Col span="12">
                        <FormItem label="属性值" label-position="top">
                            <Input v-model="formCustom_1.name" placeholder="请输入属性值" />
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div slot="footer" style="text-align: center">
                <Button style="width: 80px" type="primary" @click="ok_1">确定</Button>
                <Button style="width: 80px" type="primary" @click="modal1 = false">关闭</Button>
            </div>
        </Modal>
        <!-- 查看弹框 -->
        <Modal v-model="modal_table_1" width="800" :mask-closable="false" scrollable inline @on-visible-change="Modal_table_status">
            <p slot="header" style="fontsize: 16px; fontweight: 600">
                <span>"{{ Modal_title }}"库中同义术语</span>
            </p>
            <div>
                <Table border stripe height="424" highlight-row :data="Modal_tableData_1" ref="modal_table1" :loading="modal_table_loading_1" :columns="Modal_tableColumns_1" @on-selection-change="Table_change_1">
                </Table>
            </div>
            <div slot="footer" style="text-align: center;">
                <Button style="width: 80px" type="text" @click="cancel_table_1">关闭</Button>
                <Button style="width: 80px" type="primary" @click="ok_table_1">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { _debounce } from '@/libs/Perform_optimization.js';
export default {
  name: 'NeologismDiscovery',
  data() {
    return {
      modal1: false, //编辑弹出框
      standard_no: '', //标准编号
      standard_name: '', //标准名称
      textarea: '',
      // 表格的loading
      loading_1: false,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 分页的粒度
      pageNum: '10',
      // 表格表头
      tableColumns_1: [
        {
          title: '序号',
          key: 'num_id',
          align: 'center',
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          width: '80px',
        },
        {
          title: '新词名称',
          key: 'value',
          align: 'center',
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h(
                'Tooltip',
                {
                  props: {
                    // 设置属性--但是placement不定义，则为自动
                    placement: 'top',
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        cursor: 'pointer',
                        display: 'inline-block',
                        width: params.column._width * 0.7 + 'px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                      class: { 'span-text-hover': true },
                      on: {
                        click: () => {
                          if (
                            this.textarea.indexOf(
                              `<span style='color:red'>${params.row.value}</span>`
                            ) !== -1
                          ) {
                            this.textarea = this.textarea.replace(
                              new RegExp("<span style='color:red'>", 'g'),
                              ''
                            );
                            this.textarea = this.textarea.replace(
                              new RegExp('</span>', 'g'),
                              ''
                            );
                            return;
                          }
                          this.textarea = this.textarea.replace(
                            new RegExp("<span style='color:red'>", 'g'),
                            ''
                          );
                          this.textarea = this.textarea.replace(
                            new RegExp('</span>', 'g'),
                            ''
                          );
                          this.textarea = this.textarea.replace(
                            new RegExp(params.row.value, 'g'),
                            `<span style='color:red'>${params.row.value}</span>`
                          );
                        },
                      },
                    },
                    params.row.value
                  ), // 表格显示文字
                  h(
                    'div',
                    {
                      slot: 'content',
                      style: {
                        whiteSpace: 'normal',
                      },
                    },
                    params.row.value // 气泡内的文字
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: '140px',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '10px',
                    cursor: 'pointer',
                    color: '#3388ff',
                  },
                  on: {
                    click: () => {
                      this.show_1(params);
                    },
                  },
                },
                '编辑'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '确定要删除吗？',
                    'ok-text': '确定',
                    'cancel-text': '取消',
                  },
                  style: {
                    textAlign: 'initial',
                  },
                  on: {
                    'on-ok': () => {
                      this.$axios(
                        '/baike/yuchuli/delete_newword',
                        'post',
                        this.$qs.stringify({
                          jobId: this.TaskId,
                          index: this.num,
                          model: this.model1,
                          newword_delete: params.row.value,
                        })
                      ).then(data => {
                        this.TableData_1();
                        console.log(data, '删除成功');
                      });
                      console.log(params.row, '确认');
                    },
                    'on-cancel': () => {
                      console.log(params.row, '取消');
                    },
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        cursor: 'pointer',
                        color: '#3388ff',
                      },
                      on: {
                        click: () => {},
                      },
                    },
                    '删除'
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: '已选的近义术语',
          key: 'text',
          align: 'center',
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
        },
        {
          title: '查看库中近义术语',
          align: 'center',
          // 超出部分显示省略号，鼠标悬停显示悬浮框
          tooltip: true,
          width: '150px',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '10px',
                    cursor: 'pointer',
                    color: '#3388ff',
                  },
                  on: {
                    click: () => {
                      this.Modal_table_select = [];
                      this.modal_table_loading_1 = true;
                      this.modal_table_1 = true;
                      this.Modal_title = params.row.value;
                      this.$axios(
                        '/baike/yuchuli/get_newword_synonyms',
                        'post',
                        this.$qs.stringify({
                          text: this.textarea,
                          newword: params.row.value,
                        })
                      ).then(res => {
                        console.log(res, '查看当前同义词');
                        this.Modal_newword = params.row.value;
                        let line_ = params.row.text.split(';');
                        this.Modal_tableData_1 = res.data.data.synonyms;
                        for (
                          let i = 0;
                          i < this.Modal_tableData_1.length;
                          i++
                        ) {
                          const element = this.Modal_tableData_1[i].word;
                          for (let k = 0; k < line_.length; k++) {
                            const element2 = line_[k];
                            if (element == element2) {
                              this.Modal_tableData_1[i]._checked = true;
                              this.Modal_table_select.push(
                                this.Modal_tableData_1[i]
                              );
                            }
                          }
                        }
                        // 存储一下当前唤出弹窗用的新词，待会弹窗内确定按钮要用
                        setTimeout(() => {
                          this.modal_table_loading_1 = false;
                        }, 200);
                      });
                    },
                  },
                },
                '查看'
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
      //默认请求
      num: 0,
      //总数据个数
      total_count: '',
      //修改数据 编辑后的内容
      formCustom_1: {
        name: '',
      },
      //模型数据
      cityList: [],
      //选择模型数据
      model1: '',
      //查看表格弹框
      modal_table_1: false,
      modal_table_loading_1: false,
      //弹框表格数据
      Modal_tableColumns_1: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '库中术语',
          key: 'word',
          align: 'center',
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '术语释义',
          key: 'explaination',
          align: 'center',
          tooltip: true,
          minWidth: 200,
        },
        {
          title: '相似度',
          key: 'similarity',
          align: 'center',
          tooltip: true,
          minWidth: 80,
        },
      ],
      Modal_table_select: [],
      Modal_tableData_1: [],
      //编辑前的内容
      formCustom_2: '',
      // 用这个新词唤出的弹窗
      Modal_newword: '',
      //弹框的title
      Modal_title: '',
      StandardKnowledge: false, //判断是否是相似标准推荐
    };
  },
  methods: {
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      //原id this.TaskId
      //9e00f7b2-fff6-11eb-aa87-0242ac110006
      this.$axios(
        '/baike/yuchuli/get_newwords',
        'post',
        this.$qs.stringify({
          jobId: this.TaskId,
          index: this.num,
          pageNum: this.table_current_1,
          pageSize: this.pageNum,
          model: this.model1,
        })
      ).then(res => {
        console.log(res, '新词发现');
        this.textarea = res.data.data.text;
        this.standard_name = res.data.data.standard_name;
        this.standard_no = res.data.data.standard_no;
        this.total_count = res.data.data.totalRecordNum;
        // 总页数
        this.totalCount = res.data.data.totalCount;
        this.tableData_1 = res.data.data.newwords.map((item, key) => {
          return {
            value: item.newword,
            text: item.synonyms.join(';'),
            num_id: this.pageNum * (this.table_current_1 - 1) + key + 1,
          };
        });
        setTimeout(() => {
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    //刷新结果
    NextSteps() {
      this.TableData_1();
    },
    //查看下一条
    PreviousStep() {
      if (this.total_count == this.num + 1) {
        this.$Message.info('已经是最后一条数据');
        return;
      }
      this.num += 1;
      this.TableData_1();
    },
    //保存结果
    preservation() {
      let newwords = JSON.stringify(this.tableData_1);
      this.$axios(
        '/baike/yuchuli/confirm_newwords',
        'post',
        this.$qs.stringify({
          jobId: this.TaskId,
          index: this.num,
          newwords,
        })
      ).then(data => {
        if (this.total_count === 1) {
          this.$router.push('/TableList/KnowledgeAudit');
          return;
        }
        console.log(data, '新词保存成功');
        this.num = 0;
        this.TableData_1();
      });
    },
    //返回
    returnkey() {
      this.$router.push('/TableList/KnowledgeAudit');
    },
    //点击属性名文本变红
    tableName_1(e) {
      console.log('123', e);
    },
    //编辑
    show_1(params) {
      this.formCustom_2 = JSON.parse(JSON.stringify(params.row.value));
      this.formCustom_1 = {
        // 姓名
        name: params.row.value,
        age: params.row.num_id,
      };
      this.$nextTick(() => {
        this.modal1 = true;
      });
    },
    //重置修改表单
    Modal_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          this.$refs['formCustom_1'].resetFields();
          // 重置
        }, 300);
      }
    },
    //确认修改
    ok_1() {
      console.log(this.formCustom_1.name, 1, this.formCustom_2, 2);
      this.modal1 = false;
      this.$axios(
        '/baike/yuchuli/edit_newword',
        'post',
        this.$qs.stringify({
          jobId: this.TaskId,
          index: this.num,
          model: this.model1,
          newword_old: this.formCustom_2, //编辑前
          newword_new: this.formCustom_1.name, //编辑后
        })
      ).then(data => {
        this.TableData_1();
        console.log(data, '编辑成功');
      });
      console.log(this.formCustom_1, '123');
    },
    //切换模型属性
    ModelProperties(e) {
      this.num = 0;
      this.TableData_1();
      console.log(e, '模型已修改');
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.table_current_1 = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 弹窗的关闭按钮
    cancel_table_1() {
      // 关闭弹窗
      this.modal_table_1 = false;
    },
    Modal_table_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          // 重置选中的数据
          this.Modal_table_select = [];
          // 重置表格的数据
          this.Modal_tableData_1 = [];
        }, 300);
      }
    },
    //查看 表格选中的值发生变化
    Table_change_1(item) {
      this.Modal_table_select = item;
    },
    //查看弹窗的确定按钮
    ok_table_1() {
      if (this.Modal_table_select.length == 0) {
        this.$Message.warning('请选择同义术语');
        return;
      }
      let word_action = this.Modal_table_select.map(item => {
        return { synonym: item.word, similarity: item.similarity };
      });
      this.$axios('/baike/yuchuli/confirm_synonyms', 'post', {
        jobId: this.TaskId,
        index: this.num,
        newword: this.Modal_newword,
        synonyms: word_action,
      }).then(res => {
        if (res.data.code != 200) {
          this.$Message.warning('添加失败！');
          return;
        }
        this.loading_1 = true;
        this.TableData_1();
        this.modal_table_1 = false;
      });
    },
  },
  mounted() {
    this.Selected === '标准知识加工'
      ? (this.StandardKnowledge = true)
      : (this.StandardKnowledge = false);

    //初始化模型
    this.$axios(
      '/baike/yuchuli/get_newword_models',
      'post',
      this.$qs.stringify({
        jobId: this.TaskId,
      })
    ).then(data => {
      console.log(data, '获取新词发现的可用模型');
      this.cityList = data.data.data.models.map(item => {
        return {
          label: item,
          value: item,
        };
      });
      this.model1 = this.cityList[0].value;
    });
    this.TableData_1();
  },
  computed: {
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    //任务ID
    TaskId() {
      return this.$store.state.standard.TaskId;
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
  background: #f5f5f5;
  border-radius: 0;
  line-height: 2;
}
.textarea {
  //max-width: 100%;
  //min-height: 100px;
  //max-height: 100px;
  //vertical-align: bottom;
  //font-size: 14px;
  //background: #f5f5f5;
  //border-radius: 0;
  //border: 1px solid #dcdee2;
  //padding: 10px;
  //overflow-y: auto;
  //word-wrap: break-word;
  //line-height: 2;

  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  //max-width: 100%;
  //min-height: 100px;
  //max-height: 100px;
  //vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  //overflow-y: auto;
  //word-wrap: break-word;
  line-height: 2;
  //margin-left: 24px;
}
.Stame /deep/ .ivu-input {
  min-height: 40px;
  max-height: 40px;
  color: #666;
}
.StandardName {
  display: inline-block;
  width: 12%;
  text-align: right;
  margin-right: 10px;
}
</style>
