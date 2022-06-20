<template>
  <div class="contbody">
    <div class="contbody_title">
      知识元抽取
    </div>
    <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
      <Form :model="formVal" :label-width="98" ref="formVal" :rules="ruleFormVal">
        <FormItem label="模型描述：" prop="modelDes">
          <div class="modelStyle_r">
            <Input v-model="formVal.modelDescribe" disabled type="textarea" :rows="4" placeholder="暂无描述" />
          </div>
        </FormItem>
        <FormItem label="标题：" prop="taskName">
          <Input v-model="formVal.taskName" placeholder="请输入标题"></Input>
        </FormItem>


        <FormItem label="原文：" prop="context">
          <Input v-model="formVal.context" type="textarea" style="resize: none;" :autosize="{minRows: 3,maxRows: 5}"
            placeholder="请输入原文"></Input>
        </FormItem>
        <FormItem style="width:100%;margin-top:30px;margin-bottom:50px;display: flex;justify-content: center;">
          <Button type="primary" @click="handleSubmit('formVal')">抽取</Button>
        </FormItem>
        <FormItem label="" prop="exactContents">
          <!-- <Input v-model="exactcontent" type="textarea" style="resize: none;" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入备注"></Input>
                     -->
          <div style="margin-left:-98px">知识元抽取结果： 图例：<span
              style="color:white;background-color:green;font-weight:bold;">实体</span> <span
              style="color:white;background-color:red;font-weight:bold;">属性名称</span> <span
              style="color:white;background-color:blue;font-weight:bold;">属性值</span> <span
              style="color:white;background-color:brown;font-weight:bold;">约束条件</span></div>
          <div
            style="padding-bottom:30px;margin-top:20px;width:100%;display:block;min-height:120px;max-height:500px;overflow-y:auto;">
            <Table border stripe highlight-row :data="tableData" :columns="Columns"></Table>

            <!-- <div style="overflow:hidden;padding:10px 0">
                            <Page :total="totalCount" :current="table_current" @on-change="table_Pagechange" @on-page-size-change="table_PageSizechange" show-sizer show-elevator></Page>
                        </div> -->
          </div>
          <Modal @on-ok="ok1" @on-cancel="cancel" width="600" v-model="showBox" class="layer_box" title="模型对应类别">
            <Table border :columns="columns2" :data="data2"></Table>
            <div style="margin-top:10px;overflow:hidden;padding: 10px 0;">
              <Page :total="totalCount2" :current="table_current2" @on-change="table_Pagechange2"
                @on-page-size-change="table_PageSizechange2" size=small show-sizer show-elevator></Page>
            </div>
          </Modal>
        </FormItem>
      </Form>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: 'sourseCeive',
    components: {},
    props: {},
    data() {
      return {
        listData: [], //下拉的数据列表
        formVal: {
          taskName: '', //原文名称
          context: '', //原文内容
          modelChoice: '', //模型选择
          modelDescribe: '标准指标抽取模型：从给定标题和文本的内容中抽取出实体、属性名称、属性值和约束条件。', //模型描述
          formData: '', //数据文件
          remarks: '', //备注
        },
        exactcontent: "参数值:xxx;\n参数名:sss;\n约束条件:sss;",
        file: '', //上传的文件
        // 规则
        ruleFormVal: {
          //任务名称
          taskName: [{
            required: true,
            message: '请输入关键字',
            trigger: 'change',
          }, ],
        },
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
        Columns: [{
            title: '序号',
            key: 'name',
            align: 'center',
            width: 70,
            render: (h, params) => {
              return h('span', {}, params.index + 1);
            },
          },
          {
            title: '实体',
            align: 'center',
            width: 150,
            key: 'object',
          },
          {
            title: '属性名称',
            align: 'center',
            width: 110,
            key: 'relation',
          },
          {
            title: '属性值',
            align: 'center',
            key: 'subject',
          },
          {
            title: '约束条件',
            width: 110,
            align: 'center',
            key: 'condition',
          },
          {
            title: '来源句子',
            width: 210,
            align: 'center',
            key: 'sentence',
            render: (h, params) => {
              return h('span', {
                domProps: {
                  innerHTML: params.row.sentence // 这里是要渲染的数据
                }
              })
            },
          },

        ],
        columns2: [{
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
        // console.log("handleSubmit");
        this.$refs[name].validate(valid => {
          if (valid) {
            let param = new FormData(); // 创建form对象
            param.append('title', _this.formVal.taskName); //任务名称
            param.append('context', _this.formVal.context); //用户选择的模型的主键ID
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                Accept: '*/*'
              },
            };
            // console.log(_this.formVal.taskName, _this.formVal.context)
            // param = this.$qs.stringify({"title":_this.formVal.taskName, "context": _this.formVal.context});
            // console.log(param);
            // // 添加请求头
            axios.post('/knowledge', param, config).then(res => {

              if (res.status == 200) {
                console.log('知识元抽取表格数据data', res.data.data[0])
                if (res.data.data[0]) {
                  this.tableData = res.data.data;
                  this.totalCount = res.data.count;
                  for (var i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].sentence = this.tableData[i].sentence.replace(this.tableData[i].object,
                      '<el-button style="color:white;background-color:green;font-weight:bold">' + this
                      .tableData[i].object + '</el-button>')
                    this.tableData[i].sentence = this.tableData[i].sentence.replace(this.tableData[i].relation,
                      '<el-button style="color:white;background-color:red;font-weight:bold">' + this
                      .tableData[i].relation + '</el-button>')
                    this.tableData[i].sentence = this.tableData[i].sentence.replace(this.tableData[i].subject,
                      '<el-button style="color:white;background-color:blue;font-weight:bold">' + this
                      .tableData[i].subject + '</el-button>')
                    this.tableData[i].sentence = this.tableData[i].sentence.replace(this.tableData[i].condition,
                      '<span style="color:white;background-color:brown;font-weight:bold">' + this.tableData[i]
                      .condition + '</span>')

                  }
                }else{
                this.$Message.error('无匹配抽取信息！');

                }

              } else {
                this.$Message.error(res.data.msg);
              }
            });
          }
        });
        //   加载表格数据
        // this.loadData();
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
          console.log(res);
          this.totalCount2 = res.data.count;
          this.data2 = res.data.data;
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
          console.log('加载知识元抽取表格数据data', res);

          this.tableData = res.data.data;
          this.totalCount = res.data.count;
        });
      },
      ok1() {
        this.cancel();
      },
      cancel() {
        this.showBox = false;
        setTimeout(function () {
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