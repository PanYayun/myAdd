<template>
    <div class="contbody">
        <div class="contbody_title">
            任务管理
        </div>
        <Card :bordered="false" dis-hover :padding="0">
            <Row>
                <Col span="24" style="padding-top: 25px; border-bottom: 1px solid #eeeeee">
                <Form inline :label-width="75" label-position="left" :hide-required-mark="true" ref="table_form" :model="table_form">
                    <FormItem label="任务类型:" prop="dataType">
                        <Select filterable placeholder="请选择数据类型" v-model="table_form.dataType" style="width: 200px;margin-right:30px">
                            <Option v-for="(item,index) in listData" label-in-value :id="item.id" :key="index" :value="item.id">{{item.name}} </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="创建时间:" prop="temporary_date">
                        <DatePicker  :editable="false" style="width: 200px" type="daterange" placement="bottom-start" placeholder="请选择数据上传时间" format="yyyy-MM-dd" @on-change="getDateValue" v-model="table_form.temporary_date"></DatePicker>
                    </FormItem>
                    <br />
                    <FormItem label="任务名称:" prop="keyWord">
                        <Input style="width: 200px;margin-right:30px" clearable placeholder="请输入任务名称" v-model="table_form.keyWord"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="ios-search" style="margin-left: -75px;width:100px" @click="handleSubmit('table_form')">查询
                        </Button>
                        <Button @click="handleReset('table_form')" style="margin-left: 8px;width:100px">重置
                        </Button>
                    </FormItem>
                </Form>
                </Col>
            </Row>
        </Card>
        <div>
            <Table border stripe highlight-row :data="tableData" :columns="tableColumns"></Table>
            <div style="overflow: hidden;display: flex;justify-content: right;padding: 10px 0;">
                <Page :total="totalCount" :current="table_current" @on-change="table_Pagechange" @on-page-size-change="table_PageSizechange" show-sizer show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'taskManagement',
  components: {},
  props: {},
  data() {
    return {
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current: 1,
      // 获取表格数据时用到的参数
      table_form: {
        dataType: '', //任务类型
        beginStartDate: '', //开始时间
        endStartDate: '', // 结束时间
        keyWord: '', // 关键字
        // 获取第几页的数据
        pageIndex: '1',
        // 分页的粒度
        pageNum: '10',
        temporary_date: '', //数据时间
      },
      listData: [], //下拉的数据列表
      // 查询数据
      tableData: [],
      tableColumns: [
        {
          title: '序号',
          key: 'name',
          align: 'center',
          width: 70,
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          },
        },
        {
          title: '任务名称',
          key: 'name',
          align: 'center',
        },
        {
          title: '创建时间',
          width: 180,
          key: 'created_time',
          align: 'center',
        },
        {
          title: '模型名称',
          align: 'center',
          key: 'image_name',
        },
        {
          title: '上传人',
          align: 'center',
          key: 'user',
        },
        {
          title: '备注',
          align: 'center',
          key: 'remark',
        },
        {
          title: '状态',
          align: 'center',
          key: 'process_per',
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
                      this.show_page(params);
                    },
                  },
                },
                '详情'
              ),
            ]);
          },
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取时间
    getDateValue(val) {
      this.table_form.beginStartDate = val[0];
      this.table_form.endStartDate = val[1];
    },
    // 选择模型下拉
    getListDown() {
      this.$axios(
        '/baike/tyzx/get_task_type',
        'post',
        this.$qs.stringify({
          type: '文本分类',
        })
      ).then(res => {
        this.listData = res.data.data;
      });
    },
    // 查询
    handleSubmit() {
      this.loadData();
    },
    //重置按钮
    handleReset(name) {
      this.$refs[name].resetFields();
      this.table_form.beginStartDate = ''
       this.table_form.endStartDate = ''
       this.loadData();
    },
    // 获取详情
    show_page(val) {
      this.$router.push({
        name: 'taskPage',
        params: {
          id: val.row.id,
        },
      });
    },
    // 获取页面数据
    loadData() {
      this.$axios(
        '/baike/tyzx/page_task',
        'post',
        this.$qs.stringify({
          page_size: this.table_form.pageNum, //页码大小
          page_num: this.table_form.pageIndex, //第几页
          begin_time: this.table_form.beginStartDate, //开始时间
          end_time: this.table_form.endStartDate, //结束时间
          task_name: this.table_form.keyWord, //关键字
          image_id: this.table_form.dataType, //关键Id
        })
      ).then(res => {
        this.tableData = res.data.data.data_details;
        this.totalCount = res.data.data.count;
      });
    },
    // 切换页码
    table_Pagechange(index) {
      this.table_form.pageIndex = index;
      this.loadData();
    },
    // 切换每页显示数量
    table_PageSizechange(index) {
      this.table_form.pageNum = index;
      this.loadData();
    },
  },
  created() {
    this.getListDown();
    this.loadData();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.contbody {
  padding: 0px 20px 0px 20px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  .contbody_title {
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #3f424b;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>