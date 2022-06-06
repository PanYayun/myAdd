<template>
    <div class="contbody">
        <div class="contbody_title">
            新建任务
        </div>
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
            <Form :model="formVal" :label-width="98" ref="formVal" :rules="ruleFormVal">
                <FormItem label="任务名称：" prop="taskName">
                    <Input v-model="formVal.taskName" placeholder="请输入任务名称"></Input>
                </FormItem>
                <FormItem label="选择模型：" prop="modelChoice">
                    <Select v-model="formVal.modelChoice">
                        <Option v-for="(item,index) in listData" label-in-value :id="item.id" :key="index" @click.native="descriptionBtn(item.description)" :description="item.description" :value="item.id">{{item.name}} </Option>
                    </Select>
                </FormItem>
                <FormItem label="模型描述：" prop="modelDescribe">
                    <Input disabled v-model="formVal.modelDescribe" placeholder="请输入模型描述"></Input>
                </FormItem>
                <FormItem class="fromClass_1" label="数据文件：" prop="formData">
                    <!-- <div style="flex:1"> -->
                    <Input disabled v-model="formVal.formData" style="flex:1" placeholder="请选择文件"></Input>
                    <div style="width:138px;margin-left:20px;display: flex;">
                        <Upload style="margin-left:10px;" accept=".xlsx,.csv" :show-upload-list="false" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-error="upload_error" action="api/baike/tyzx/create_task">
                            <Button type="primary">上传</Button>
                        </Upload>
                        <Button style="margin-left: 8px" @click="downBtn()">下载</Button>
                    </div>
                </FormItem>
                <div style="line-height:34px;font-size:color:#60636f;font-size:12px;margin-bottom:10px;margin-left:98px;">
                    说明：请点击下载按钮下载后按模板规范上传文件，仅支持EXCEL和CSV文件
                </div>
                <FormItem label="备注：" prop="remarks">
                    <Input v-model="formVal.remarks" type="textarea" style="resize: none;" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
                <FormItem style="width:100%;margin-top:30px;margin-bottom:50px;display: flex;justify-content: center;">
                    <Button type="primary" @click="handleSubmit('formVal')">创建任务</Button>
                    <Button style="margin-left: 8px">返回</Button>
                </FormItem>
            </Form>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'newTask',
  components: {},
  props: {},
  data() {
    return {
      listData: [], //下拉的数据列表
      formVal: {
        taskName: '', //任务名称
        modelChoice: '', //模型选择
        modelDescribe: '', //模型描述
        formData: '', //数据文件
        remarks: '', //备注
      },
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
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = new FormData(); // 创建form对象
          param.append('task_name', _this.formVal.taskName); //任务名称
          param.append('image_id', _this.formVal.modelChoice); //用户选择的模型的主键ID
          param.append('user', _this.$store.state.user.userInfo.username); //用户名称
          param.append('remark', _this.formVal.remarks); //备注
          param.append('file', _this.file); // 通过append向form对象添加数据

          let config = {
            headers: { 'Content-Type': 'multipart/form-data', Accept: '*/*' },
          };
          // 添加请求头
          axios.post('api/baike/tyzx/create_task', param, config).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 下载
    downBtn() {
      location.href = `/api/baike/tyzx/download_template?type_name=文本分类`;
    },
  },
  created() {
    this.getListDown();
  },
  mounted() {},
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