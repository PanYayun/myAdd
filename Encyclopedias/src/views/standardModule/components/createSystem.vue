<template>
    <!--  创建新的体系 -->
    <Modal v-model="modal" :mask-closable="false" title="创建新的体系" width="800" @on-visible-change="Modal_1_status">
        <div class="wrap" style="width: 500px;">
            <div class="downloadTemplate flex">
                <span>模板下载：</span>
                <Button @click="downBtn()" type="primary" style="width: 60px;height:32px;">下载</Button>
            </div>
            <div class="downloadTemplate flex">
                <span>体系名称：</span>
                <Input style="width:auto;" placeholder="请输入体系名称" v-model="fileName"></Input>
            </div>
            <div style="display:flex">
                <div class="box_l">{{ textName }}</div>
                <Upload style="margin-left:10px;" accept=".xlsx" :show-upload-list="false" :data="paramsVal" :on-success="handleSuccess" :on-error="upload_error" action="/personality/baike/standServer/requestDataSenior">
                    <Button>上传</Button>
                </Upload>
                <Button type="primary" style="margin-left: 10px;" @click="editFile()">
                    撤销
                </Button>
            </div>
        </div>
        <div slot="footer" style="display: flex;justify-content: flex-end;">
            <Button type="primary" @click="ok_1">确定</Button>
            <Button @click="cancel_1">取消</Button>
        </div>
    </Modal>
</template>

<script>
import tab from '@/components/tab';
export default {
  name: 'createSystem',
  inject: ['reload'],
  components: {
    tab,
  },
  data() {
    return {
      modal: false,
      fileName: '', //文件名字
      textName: '',
      file: null,
      paramsVal: {
        uid: this.$store.state.user.userInfo.username,
        uToken: this.$store.state.user.userInfo.token,
        requestSource: 'BZ',
        requestCode: '90226',
        requestFuncId: '105',
      }, //上传参数
    };
  },
  methods: {
    handleSuccess(res, file) {
      this.textName = file.name;
      this.$Message.destroy();
      this.$Message.success({
        content: '文件上传成功！',
        background: true,
        duration: 3,
      });
    },
    upload_error(error, file, fileList) {
      setTimeout(() => {
        this.$Notice.error({
          title: '文件上传失败！',
          desc: `当前上传文件为${fileList.name}，请上传正确的文件！`,
          duration: 6,
        });
      }, 200);
    },
    editFile() {
      this.file = '';
      this.textName = '';
      this.fileName = '';
    },
    // 下载
    downBtn() {
      //下载参数
      this.axios({
        url: '/personality/baike/standServer/requestData',
        method: 'get',
        params: {
          uid: this.$store.state.user.userInfo.username,
          uToken: this.$store.state.user.userInfo.token,
          requestSource: 'BZ',
          requestCode: '90226',
          requestFuncId: '104',
        },
        responseType: 'blob',
      }).then(res => {
        // application/x-xlsx
        // application/vnd.ms-excel
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        let fileName = res.headers['content-disposition'].substring(
          res.headers['content-disposition'].indexOf('fileName=') + 9,
          res.headers['content-disposition'].length
        );
        downloadElement.download = decodeURIComponent(fileName); // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放blob对象
      });
    },
    navChange(index) {
      this.tabIndex = index;
    },
    showModal() {
      this.modal = true;
    },
    // 确定事件
    ok_1() {
      if (!this.fileName) {
        this.$Message.destroy();
        this.$Message.warning({
          content: '请输入体系名称！',
          background: true,
          duration: 3,
        });
        return;
      }
      if (!this.textName) {
        this.$Message.destroy();
        this.$Message.warning({
          content: '请先上传文件！',
          background: true,
          duration: 3,
        });
        return;
      }
      this.$axios('/baike/standServer/requestData', 'get', {
        uid: this.$store.state.user.userInfo.username,
        uToken: this.$store.state.user.userInfo.token,
        requestSource: 'BZ',
        requestCode: '90226',
        requestFuncId: '101',
        requestParams: {
          // 文件名
          fileName: this.textName,
          // 体系名
          txName: this.fileName,
          Timestamp: Date.parse(new Date()) / 1000,
        },
        requestTime: Date.parse(new Date()) / 1000,
      }).then(res => {
        setTimeout(() => {
          this.$Message.destroy();
          this.$Message.success({
            content: '体系树新增成功！',
            background: true,
            duration: 3,
          });
          this.editFile();
          this.modal = false;
          this.reload();
        }, 200);
      });

    },
    cancel_1() {
      this.modal = false;
      this.editFile();
    },
    Modal_1_status(status) {
      if (status) {
      } else {
        setTimeout(() => {
          this.editFile();
        }, 200);
      }
    },
  },
  mounted() {
    this.editFile();
  },
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.box_l {
  flex: 1;
  border: 1px solid #ececec;
  padding: 0 10px;
  box-sizing: border-box;
  width: 200px;
  height: 32px;
  line-height: 32px;
}

.wrap {
  margin: 0 auto;
  .downloadTemplate {
    margin: 13px 0px;
    align-items: center;
    span {
      float: left;
      width: 100px;
    }
  }
}
</style>
