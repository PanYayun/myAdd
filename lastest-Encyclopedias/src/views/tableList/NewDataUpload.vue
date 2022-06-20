<template>
    <div class="newDataUpload" style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px">
        <Card :bordered="false" dis-hover :padding="0">
            <Row>
                <Col span="24" style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee">
                <p style="font-size: 18px; font-weight: 800">新增数据上传</p>
                </Col>
                <Col span="22" style="margin-bottom: 30px; padding-top: 15px">
                <p style="font-size: 16px; font-weight: 600">1.数据采集模板下载</p>
                </Col>
                <Col span="2" style="margin-bottom: 30px">
                <Button type="text" icon="md-download" @click="download_1">下载</Button>
                </Col>
                <Col span="20" style="margin-bottom: 30px">
                <RadioGroup v-model="RadioGroup_val_1" size="default" style="width: 100%; display: flex; justify-content: space-between">
                    <Radio label="SYBK">航空术语百科</Radio>
                    <Radio label="BZBK">标准百科模板</Radio>
                    <Radio label="JSBK">军事百科模板</Radio>
                    <Radio label="MHSG">民航事故模板</Radio>
                    <Radio label="YQJBK">元器件百科模板</Radio>
                    <Radio label="ZLBK">质量百科模板</Radio>
                </RadioGroup>
                </Col>
                <Col span="24" style="margin-bottom: 30px">
                <p style="font-size: 16px; font-weight: 600">2.数据上传</p>
                </Col>
                <Col span="4" style="margin-bottom: 30px">
                <p>选择上传数据类型：</p>
                </Col>
                <Col span="20" style="margin-bottom: 30px">
                <RadioGroup v-model="RadioGroup_val_2" size="default" style="width: 100%; display: flex; justify-content: space-between">
                    <Radio label="SYBK">航空术语百科</Radio>
                    <Radio label="BZBK">标准百科</Radio>
                    <Radio label="JSBK">军事百科</Radio>
                    <Radio label="MHSG">民航事故</Radio>
                    <Radio label="YQJBK">元器件百科</Radio>
                    <Radio label="ZLBK">质量百科</Radio>
                </RadioGroup>
                </Col>
                <Col span="2" style="margin-bottom: 30px; display: flex; align-items: center">
                <p>数据文件：</p>
                </Col>
                <Col span="22" style="margin-bottom: 30px">
                <!-- Test -->
                <Upload name="myfile" accept=".xlsx,.txt" action="api/baike/caiji/dataFile_upload" style="display: flex; align-items: center" :show-upload-list="false" :format="['xlsx', 'txt']" :on-success="upload_success" :on-error="upload_error" :before-upload="handleUpload" :data="{ fileType: RadioGroup_val_2 }" :on-format-error="upload_format_error">
                    <div>
                        <Input style="width: 760px; margin-right: 10px;" readonly clearable placeholder="请选择文件" v-model="fileName"></Input>
                        <Button type="primary">上传</Button>
                    </div>
                </Upload>
                </Col>
            </Row>
        </Card>
        <Modal v-model="Modal_1" width="500" :mask-closable="false" scrollable inline :styles="{ paddingBottom: '100px' }">
            <p slot="header" style="fontsize: 16px; fontweight: 600">
                <span>上传数据提示</span>
            </p>
            <div>
                <Row>
                    <Col span="24" style="text-align: center">
                    {{ Modal_Msg_1 }}
                    </Col>
                </Row>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" @click="ok">确定</Button>
                <Button type="text" @click="cancel">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'NewDataUpload',
  data() {
    return {
      RadioGroup_val_1: 'SYBK',
      RadioGroup_val_2: 'SYBK',
      fileName: '',
      Modal_1: false,
      Modal_Msg_1: '',
    };
  },
  methods: {
    download_1() {
      // this.$store.commit("setspinShow_", true);
      this.axios({
        url: 'api/baike/caiji/download_template',
        method: 'get',
        params: {
          fileType: this.RadioGroup_val_1,
        },
        responseType: 'blob',
      }).then(res => {
        setTimeout(() => {
          this.$store.commit('setspinShow_', false);
        }, 200);
        let filename;
        if (this.RadioGroup_val_1 == 'SYBK') {
          filename = '航空术语百科';
        } else if (this.RadioGroup_val_1 == 'BZBK') {
          filename = '标准百科模板';
        } else if (this.RadioGroup_val_1 == 'JSBK') {
          filename = '军事百科模板';
        } else if (this.RadioGroup_val_1 == 'MHSG') {
          filename = '民航事故模板';
        } else if (this.RadioGroup_val_1 == 'YQJBK') {
          filename = '元器件百科模板';
        } else if (this.RadioGroup_val_1 == 'ZLBK') {
          filename = '质量百科模板';
        }
        // application/x-xlsx
        // application/vnd.ms-excel
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = filename + '.xlsx'; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放blob对象
      });
    },
    upload_format_error(file) {
      setTimeout(() => {
        this.$store.commit('setspinShow_', false);
        this.$Notice.error({
          title: '文件上传失败！',
          desc: `当前上传文件为${file.name}，请上传XLSX格式！`,
          duration: 6,
        });
      }, 200);
    },
    handleUpload(file) {
      // this.$store.commit("setspinShow_", true);
    },
    upload_success(response, file, fileList) {
      if (response.code == 200) {
        let filetype;
        if (this.RadioGroup_val_2 == 'SYBK') {
          filetype = '航空术语百科';
        } else if (this.RadioGroup_val_2 == 'BZBK') {
          filetype = '标准百科';
        } else if (this.RadioGroup_val_2 == 'JSBK') {
          filetype = '军事百科';
        } else if (this.RadioGroup_val_2 == 'MHSG') {
          filetype = '民航事故百科';
        } else if (this.RadioGroup_val_2 == 'YQJBK') {
          filetype = '元器件百科';
        } else if (this.RadioGroup_val_2 == 'ZLBK') {
          filetype = '质量百科';
        }
        this.fileName = file.name;
        this.Modal_Msg_1 = `您上传的数据类型是${filetype}，一共包含数据${response.data.totalCount}条，有效数据${response.data.successCount}条`;
        setTimeout(() => {
          this.$store.commit('setspinShow_', false);
        }, 100);
        setTimeout(() => {
          this.Modal_1 = true;
        }, 700);
      } else {
        setTimeout(() => {
          this.$store.commit('setspinShow_', false);
          this.$Notice.error({
            title: '文件上传失败！',
            desc: `当前上传文件为${file.name}，请上传正确的文件！错误信息：${response.data.msg}`,
            duration: 6,
          });
        }, 200);
      }
    },
    upload_error(error, file, fileList) {
      setTimeout(() => {
        this.$store.commit('setspinShow_', false);
        this.$Notice.error({
          title: '文件上传失败！',
          desc: `当前上传文件为${file.name}，请上传正确的文件！`,
          duration: 6,
        });
      }, 200);
    },
    ok() {
      this.Modal_1 = false;
    },
    cancel() {
      this.Modal_1 = false;
    },
  },
  watch: {},
  mounted() {
    this.$store.commit('updated_Menu_top_active', '新增数据上传');
  },
};
</script>

<style lang="less" scoped>
.newDataUpload{
  /deep/ .ivu-input{
    cursor: pointer;
  }
}
</style>