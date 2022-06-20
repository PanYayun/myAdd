<template>
    <div class="contbody">
        <div class="contbody_title">
            任务管理
        </div>
        <div style="overflow:hidden;padding-bottom:30px;margin-top:20px">
            <Table border stripe highlight-row :data="tableData" :columns="Columns"></Table>
            <div style="overflow:hidden;padding:10px 0">
                <Page :total="totalCount" :current="table_current" @on-change="table_Pagechange" @on-page-size-change="table_PageSizechange" show-sizer show-elevator></Page>
            </div>
        </div>
        <Modal @on-ok="ok1" @on-cancel="cancel" width="600" v-model="showBox" class="layer_box" title="模型对应类别">
            <div style="height:350px;overflow-y:auto"><Table border :columns="columns2" :data="data2"></Table></div>
            <div style="margin-top:10px;overflow:hidden;padding: 10px 0;">
                <Page :total="totalCount2" :current="table_current2" @on-change="table_Pagechange2" @on-page-size-change="table_PageSizechange2" size=small show-sizer show-elevator></Page>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'modelPage',
  components: {},
  props: {},
  data() {
    return {
      // 表格数据
      tableData: [],
      data2: [],
      showBox: false, //遮罩层
      // 获取第几页的数据
      pageIndex: '1',
      // 分页的粒度
      pageNum: '10',
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current: 1,
      // 获取第几页的数据
      pageIndex2: '1',
      // 分页的粒度
      pageNum2: '10',
      // 总页数
      totalCount2: 0,
      // 当前页码
      table_current2: 1,
      Columns: [
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
          title: '模型名称',
          width: 180,
          align: 'center',
          key: 'name',
        },
        {
          title: '模型描述',
          align: 'center',
          key: 'description',
        },
        {
          title: '备注',

          align: 'center',
          key: 'remark',
        },
        {
          title: '操作',
          key: 'action',
          width: 160,
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
                      this.show_page(params.row.id);
                    },
                  },
                },
                '模型对应类别'
              ),
            ]);
          },
        },
      ],
      columns2: [
        {
          title: '序号',
          key: 'index',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          },
        },
        {
          title: '类别名称',
          key: 'name',
          align: 'center',
          tooltip: true,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取弹窗数据
    loadTable() {
      this.$axios(
        '/baike/tyzx/get_image_addition',
        'post',
        this.$qs.stringify({
          page_size: this.pageNum2, //页码大小
          page_num: this.pageIndex2, //第几页
          image_id: this.image_id, //模型主键ID
          name: '', //模糊查询关键字
        })
      ).then(res => {
        this.totalCount2 = res.data.data.count;
        this.data2 = res.data.data.data_details;
      });
    },
    loadData() {
      this.$axios(
        '/baike/tyzx/page_model',
        'post',
        this.$qs.stringify({
          page_size: this.pageNum, //页码大小
          page_num: this.pageIndex, //第几页
        })
      ).then(res => {
        console.log(res);
        this.tableData = res.data.data.data_details;
        this.totalCount = res.data.data.count;
      });
    },
    ok1() {
      this.cancel();
    },
    cancel() {
      this.showBox = false;
      setTimeout(function() {
        this.pageNum2 = '10'; //页码大小
        this.pageIndex2 = '1'; //第几页
        this.totalCount2 = 0; // 总页数
        this.table_current2 = 1; // 当前页码
        this.data2 = [];
        this.loadTable();
      }, 500);
    },
    // 切换页码
    table_Pagechange(index) {
      this.pageIndex = index;
      this.loadData();
    },
    // 切换每页显示数量
    table_PageSizechange(index) {
      this.pageNum = index;
      this.loadData();
    },
    // 获取详情
    show_page(val) {
      this.image_id = val;
      this.loadTable();
      this.showBox = true;
    },
    // 切换页码
    table_Pagechange2(index) {
      this.pageIndex2 = index;
      this.loadTable();
    },
    // 切换每页显示数量
    table_PageSizechange2(index) {
      this.pageNum2 = index;
      this.loadTable();
    },
  },
  created() {},
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
.contbody {
  padding: 0px 20px 0px 20px;
  background: white;
  border-radius: 5px;
  .contbody_title {
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #3f424b;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>