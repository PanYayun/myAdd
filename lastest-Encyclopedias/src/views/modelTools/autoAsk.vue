<template>
    <div class="contbody">
        <div class="contbody_title">
            智能问答
        </div>
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
            <Form :model="formVal" :label-width="98" ref="formVal" :rules="ruleFormVal">
                <FormItem label="模型描述：" prop="modelDes">
                    <div class="modelStyle_r">
                        <Input v-model="formVal.modelDescribe" disabled type="textarea" :rows="4" placeholder="暂无描述" />
                    </div>
                </FormItem>
                <FormItem label="问题：" prop="question">
                    <Input v-model="formVal.question" placeholder="请输入问题"></Input>
                </FormItem>
                
                
                <!-- <FormItem label="原文：" prop="remarks">
                    <Input v-model="formVal.remarks" type="textarea" style="resize: none;" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入原文"></Input>
                </FormItem> -->
                <FormItem style="width:100%;margin-top:30px;margin-bottom:50px;display: flex;justify-content: center;">
                    <Button type="primary" @click="handleSubmit('formVal')">智能问答</Button>
                </FormItem>
                <FormItem label="" prop="exactContents">
                    <!-- <Input v-model="exactcontent" type="textarea" style="resize: none;" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入备注"></Input> -->
                    
                    <div >
                        <div style="border-bottom: 1px solid #eeeeee;font-weight: bold;">答案：{{results}}</div>
                        <div style="font-weight: bold;">答案来源：</div>
                        <div v-for="(item,index) in data2" :key="index" style="margin-top: 10px;border-bottom: 1px solid #eeeeee;">
                            <div>来源标准号:{{item.id}}</div>
                            <div>来源标准名称:{{item.title}}</div>
                            <div>来源指标名称:{{item.name}}</div>
                            <div>来源标准指标原文:<span v-html='item.context'></span></div>
                        </div>
                        <!-- <div>来源标准号:{{sourceID}}</div>
                        <div>来源标准名称:{{sourceTitle}}</div>
                        <div>来源指标名称:{{sourceName}}</div>
                        <div>来源标准指标原文:<span v-html='sourceTxt1'></span></div>
 -->

                        
                    </div>

                     <!-- <div style="overflow:hidden;padding-bottom:30px;margin-top:20px">
                        <Table border stripe highlight-row :data="tableData" :columns="Columns"></Table>
                        <div style="overflow:hidden;padding:10px 0">
                            <Page :total="totalCount" :current="table_current" @on-change="table_Pagechange" @on-page-size-change="table_PageSizechange" show-sizer show-elevator></Page>
                        </div>
                    </div>
                    <Modal @on-ok="ok1" @on-cancel="cancel" width="600" v-model="showBox" class="layer_box" title="模型对应类别">
                        <Table border :columns="columns2" :data="data2"></Table>
                        <div style="margin-top:10px;overflow:hidden;padding: 10px 0;">
                            <Page :total="totalCount2" :current="table_current2" @on-change="table_Pagechange2" @on-page-size-change="table_PageSizechange2" size=small show-sizer show-elevator></Page>
                        </div>
                    </Modal> -->
                </FormItem>
            </Form>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'autoAsk',
  components: {},
  props: {},
  data() {
    return {
      listData: [], //下拉的数据列表
      formVal: {
        question: '',
        taskName: '', //任务名称
        modelChoice: '', //模型选择
        modelDescribe: '智能问答模型：针对用户提出问题从标准文件中抽取答案。在问题文本框输入需要提问的问题，点击智能问答按钮即可在下方显示问题的答案和答案来源的标准号、标准名称、指标名称和原文。', //模型描述
        formData: '', //数据文件
        remarks: '', //备注
      },
      exactcontent:"答案：xxxxx\n来源标准号:xxx;\n来源标准合格:sss;\n来源标准指标原文:sss;",
      results:'',
      sourceNum:'',
      sourceYes:'',
      sourceTxt:'',

      file: '', //上传的文件
      // 规则
      ruleFormVal: {
        //任务名称
        taskName: [
          {
            required: true,
            message: '请输入关键字',
            trigger: 'change',
          },
        ],
      },
       // 表格数据
      tableData: [],
      data2: [{'id': '', 'title': '', 'name': '', 'context': ''}],
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
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    //   处理高亮字符
    handleString(){
        let result=this.results;
        let sourceTxt=this.sourceTxt;
        let sourceTxt1='';
        sourceTxt1=sourceTxt.replace(new RegExp(result,'g'),'<em>'+result+'</em>')
        this.sourceTxt1=sourceTxt1;
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
    descriptionBtn(item) {
      this.formVal.modelDescribe = item;
    },
    // 上传获取数据
    handleBeforeUpload(file) {
      this.file = file;
    },
    // 上传成功
    handleSuccess(res, file) {
      this.formVal.formData = file.name;
      console.log('上传成功');
    },
    // 上传失败
    upload_error(error, file, fileList) {
      setTimeout(() => {
        this.$Notice.error({
          title: '文件上传失败！',
          desc: `当前上传文件为${file.name}，请上传正确的文件！`,
          duration: 6,
        });
      }, 200);
    },
    // 点击创建任务
    handleSubmit(name) {
      const _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = new FormData(); // 创建form对象
          param.append('question', _this.formVal.question); //问题

          let config = {
            headers: { 'Content-Type': 'multipart/form-data', Accept: '*/*' },
          };
          // 添加请求头
          axios.post('/QA', param, config).then(res => {
            if (res.status == 200) {
              console.log('data', res.data)
              this.results = res.data.data.answer;
              this.data2 = res.data.data.according;
              console.log(this.data2)
              for (var i=0;i<this.data2.length;i++){
                for(var j=0; j<this.data2[i].sentence.length;j++){
                  this.data2[i].context = this.data2[i].context.replace(this.data2[i].sentence[j],'<span style="color:white;background-color:green;font-weight:bold;">' + this.data2[i].sentence[j] + '</span>')

                } 
              }
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        }
      });
    //   加载表格数据
    this.loadData();
    },
    // 下载
    downBtn() {
      location.href = `/api/baike/tyzx/download_template?type_name=文本分类`;
    },

    // 表格方法
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
    }
  },
  created() {
    this.getListDown();
  },
  mounted() {
      this.handleString()

  },
};
</script>
<style lang="less" scoped>
// 修改特殊的样式
.FromDataBox {
  /deep/ textarea.ivu-input {
    resize: none;
  }
  /deep/ .ivu-form-item-label {
    padding: 0px;
    display: flex;
    align-items: center;
    height: 32px;
    justify-content: right;
  }
  .fromClass_1 {
    margin-bottom: 16px;
    /deep/ .ivu-form-item-content {
      display: flex;
      justify-content: space-between;
    }
  }
  /deep/ em {
      color: #e21e1e;
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
      min-width: 86px;
      line-height: 30px;
      text-align: right;
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
      min-width: 86px;
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
}
</style>