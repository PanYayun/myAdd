<template>
    <div class="contbody">
        <div class="contbody_title">
            任务详情
        </div>
        <div style="overflow:hidden;padding-top:24px;">
            <div class="modelStyle_one">
                <div class="modelStyle_l">
                    任务名称：
                </div>
                <div class="modelStyle_r">
                    <Input v-model="taskName" placeholder="请输入任务名称"></Input>
                </div>
            </div>
            <div class="modelStyle_one">
                <div class="modelStyle_l">
                    模型名称：
                </div>
                <div class="modelStyle_r">
                    <Input v-model="formData" style="margin-right:20px" placeholder="请输入模型对应类别"></Input>
                    <Button @click="editBtn(1)" type="primary">模型对应类别</Button>
                </div>
            </div>
            <div class="modelStyle_one">
                <div class="modelStyle_l">
                    创建时间：
                </div>
                <div class="modelStyle_r modelStyle_r_time">
                    <span>{{pageTime}}</span>
                </div>
            </div>
            <div class="modelStyle_one">
                <div class="modelStyle_l">
                    模型描述：
                </div>
                <div class="modelStyle_r">
                    <Input v-model="modelDescribe" type="textarea" style="height:80px;" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                </div>
            </div>
            <div class="modelStyle_one">
                <div class="modelStyle_l">
                    任务状态：
                </div>
                <div class="modelStyle_r modelStyle_r_time">
                    完成完成完成完成
                </div>
            </div>

            <div class="data_bar">
                <div class="data_bar_l">
                    <div>
                        <div>已完成：</div>
                        <div class="data_bar_l_val">{{finish_count}}</div>
                    </div>
                    <div>
                        <div>总计：</div>
                        <div class="data_bar_l_val">{{count}}</div>
                    </div>
                    <div>
                        <div>完成率：</div>
                        <div class="data_bar_l_val">{{process_per}}</div>
                    </div>
                </div>
                <div class="uploadBtn" @click="uploadBtn()"> 刷新结果</div>
            </div>
            <div class="table_data">
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <div style="width:100%;margin-top:30px;margin-bottom:40px;display: flex;justify-content: center;">
                <Button type="primary" @click="dataDown">完成数据下载</Button>
                <Button type="primary" @click="dataInitDown" ghost style="margin-left: 8px">原始数据下载</Button>
                <Button type="primary" @click="historyBtn" ghost style="margin-left: 8px">返回</Button>
            </div>
        </div>
        <Modal @on-ok="ok1" @on-cancel="cancel" width="600" v-model="showBox" class="layer_box" title="模型对应类别">
            <div style="height:280px;overflow-y:auto"><Table border :columns="columns2" :data="data2"></Table></div>
            <div style="margin-top:10px;overflow:hidden;padding: 10px 0;">
                <Page :total="totalCount" :current="table_current" @on-change="table_Pagechange" @on-page-size-change="table_PageSizechange" size=small show-sizer show-elevator></Page>
            </div>
        </Modal>
        <Modal @on-ok="ok2()" @on-cancel="cancel" width="600" v-model="showBox2" class="layer_box" title="模型对应类别">
            <div style="display:flex;margin-bottom:20px">
                <div style=" width: 80px;line-height: 32px;text-align: right;">关键词：</div> <Input v-model="keyWords" placeholder="请输入关键字"></Input> <Button style="margin-left:10px" @click="searchBtn()" type="primary">搜索</Button>
            </div>
            <div style="height:280px;overflow-y:auto"><Table border :columns="columns3" :data="data2"></Table></div>
            
            <div style="margin-top:10px;overflow:hidden;padding: 10px 0;">
                <Page :total="totalCount" :current="table_current" @on-change="table_Pagechange" @on-page-size-change="table_PageSizechange" size=small show-sizer show-elevator></Page>
            </div>

        </Modal>
    </div>
</template>

<script>
export default {
  name: 'taskPage',
  components: {},
  props: {},
  data() {
    return {
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current: 1,
      pageId: '', //页面的ID
      pageIndex: '1',
      pageNum: '10',
      tableDataAll: [],
      showBox: false, //遮罩层
      showBox2: false, //遮罩层
      clooseID: '', //选中的当前ID
      clooseName: '', //选中的name
      taskName: '', //任务名称
      modelDescribe: '', //模型描述
      pageTime: '', //时间
      formData: '', //模型名称
      count: '', //总条数
      finish_count: '', //已经完成条数
      process_per: '', //完成率
      columns1: [
        {
          title: '序号',
          key: 'index',
          width: 53,
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          },
        },
        {
          title: '文本',
          key: 'text',
          width: 460,
          align: 'center',
          tooltip: true,
        },
        {
          title: '模型分类',
          key: 'model_result',
          width: 208,
          align: 'center',
          tooltip: true,
        },
        {
          title: '校验类别',
          width: 128,
          key: 'final_result',
          align: 'center',
          tooltip: true,
        },
        {
          title: '操作',
          width: 88,
          key: 'address',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                    ghost: true,
                  },
                  style: {
                    marginRight: '5px',
                    color: '#2d8cf0',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      this.editBtn(2, params.row.id);
                    },
                  },
                },
                '编辑'
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
      columns3: [
        {
          title: '选中',
          align: 'center',
          width: 80,
          key: 'checkBox',
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  'on-change': e => {
                    this.clooseName = params.row.name;
                    this.data2.forEach(items => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, 'checkBox', false);
                    });
                    this.data2[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
              }),
            ]);
          },
        },
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
      keyWords: '', //关键字
      data1: [],
      data2: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索关键字
    searchBtn() {
      this.loadTable();
    },
    // 完成数据下载
    dataDown() {
      location.href = `/api/baike/tyzx/download_result_file?task_id=${this.pageId}`;
    },
    // 原始数据下载
    dataInitDown() {
      location.href = `/api/baike/tyzx/download_original_file?task_id=${this.pageId}`;
    },
    // 返回
    historyBtn() {
      this.$router.push({
        path: 'taskManagement',
      });
    },
    // 获取当前页面的ID
    haveId() {
      if (this.$route.params.id != undefined && this.$route.params.id != '') {
        this.pageId = this.$route.params.id;
        this.$store.commit('updated_taskPageVal', {
          pageId: this.$route.params.id,
        });
      } else {
        this.pageId = this.$store.state.page.taskPageVal.pageId;
      }
    },
    // 点击刷新
    uploadBtn() {
      this.loadData();
      this.$Message.success('刷新成功');
    },
    //获取数据
    loadData() {
      this.$axios(
        '/baike/tyzx/task_detail',
        'post',
        this.$qs.stringify({
          id: this.pageId,
        })
      ).then(res => {
        this.image_id = res.data.data.image_id; //获取主键ID
        this.data1 = res.data.data.finish_data_detail;
        this.taskName = res.data.data.task_name; //任务名称
        this.modelDescribe = res.data.data.model_description; //模型描述
        this.pageTime = res.data.data.created_time; //时间
        this.formData = res.data.data.image_name; //模型名称
        this.count = res.data.data.count; //总条数
        this.finish_count = res.data.data.finish_count; //已经完成条数
        this.process_per = res.data.data.process_per; //完成率
      });
    },
    // 切换页码
    table_Pagechange(index) {
      this.pageIndex = index;
      this.loadTable();
    },
    // 切换每页显示数量
    table_PageSizechange(index) {
      this.pageNum = index;
      this.loadTable();
    },

    // 获取弹窗数据
    loadTable() {
      this.$axios(
        '/baike/tyzx/get_image_addition',
        'post',
        this.$qs.stringify({
          page_size: this.pageNum, //页码大小
          page_num: this.pageIndex, //第几页
          image_id: this.image_id, //模型主键ID
          name: this.keyWords, //模糊查询关键字
        })
      ).then(res => {
        this.totalCount = res.data.data.count;
        this.data2 = res.data.data.data_details;
      });
    },
    // 点击编辑
    editBtn(val, id) {
      this.clooseID = id;
      if (val == '1') {
        this.showBox = true;
      } else {
        this.showBox2 = true;
      }
      this.loadTable();
    },
    ok1() {
      this.cancel();
    },
    ok2() {
      if (this.clooseName != '') {
        this.$axios(
          '/baike/tyzx/check_task_data',
          'post',
          this.$qs.stringify({
            task_data_id: this.clooseID,
            res_data: this.clooseName,
          })
        ).then(res => {
          this.$Message.success(res.data.msg);
          this.cancel();
          this.loadData();
        });
      } else {
        this.cancel();
        this.showBox2 = false;
      }
    },
    cancel() {
      this.keyWords = '';
      this.pageNum = '10'; //页码大小
      this.pageIndex = '1'; //第几页
      this.totalCount = 0; // 总页数
      this.table_current = 1; // 当前页码
      this.data2 = [];
      this.loadTable();
      this.showBox = false;
      this.showBox2 = false;
    },
  },
  created() {},
  mounted() {
    this.haveId();
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
// 弹窗的样式
.layer_box {
  /deep/ .ivu-modal-header {
    font-size: 16px;
    color: #282828;
  }
  /deep/ .ivu-modal-footer {
    border: none;
    text-align: center;
  }
  /deep/ .ivu-table td {
    height: 36px;
  }
  /deep/ .ivu-modal-body {
    padding-bottom: 0;
  }
  /deep/.ivu-page-options {
    float: right;
  }
  /deep/ .ivu-page-options-elevator {
    margin: 0;
  }
  /deep/ .ivu-page-options-sizer {
    margin: 0;
  }
}
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
  // 模块的模板1
  .modelStyle_one {
    display: flex;
    margin-bottom: 20px;
    .modelStyle_l {
      min-width: 70px;
      line-height: 30px;
      text-align: right;
    }
    .modelStyle_r_time {
      line-height: 30px;
    }
    .modelStyle_r {
      display: flex;
      flex: 1;
      min-height: 30px;
      /deep/ textarea.ivu-input {
        resize: none;
        height: 100% !important;
      }
    }
  }
  // 模块的模板2
  .modelStyle_two {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .modelStyle_l {
      min-width: 70px;
      line-height: 30px;
      text-align: right;
    }
    .modelStyle_r {
      flex: 1;
      min-height: 30px;
      /deep/ textarea.ivu-input {
        resize: none;
        height: 100% !important;
      }
    }
  }
  // 数据导航
  .data_bar {
    display: flex;
    line-height: 18px;
    font-size: 18px;
    .uploadBtn {
      width: 80px;
      font-size: 14px;
      color: #60636f;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: url(../../img/uploadBtn.png) no-repeat left center;
      background-size: contain;
      padding-left: 18px;
    }
    .uploadBtn:hover {
      width: 80px;
      font-size: 14px;
      color: #57a3f3;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: url(../../img/uploadBtn1.png) no-repeat left center;
      background-size: contain;
      padding-left: 18px;
    }
    .data_bar_l {
      display: flex;
      flex: 1;
      color: #3f424b;
      font-size: 18px;
      display: flex;
      & > div {
        display: flex;
        width: 33%;
        text-align: left;
      }
      .data_bar_l_val {
        color: #3388ff;
      }
    }
  }
  // 表格数据
  .table_data {
    clear: both;
    margin-top: 20px;
    overflow: hidden;
    /deep/ .ivu-table-cell {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    /deep/ .ivu-table td {
      padding: 0 4px !important;
    }
  }
}
</style>