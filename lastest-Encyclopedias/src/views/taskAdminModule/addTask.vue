<template>
  <div style="padding: 20px;background: white;">
    <div class="title">
      新建知识抽取任务
    </div>
    <div class="list">
      <div
        :class="[Selected == 1 ? 'active' : '', 'item']"
        @click="Selected = 1"
      >
        <i class="iconfont icon-jiaobiao cornerMark"></i>
        <div class="cover cover_img_1">
          <div class="shade">
            <i class="iconfont icon-weixian"></i>
            <p>民航事故知识抽取</p>
          </div>
        </div>
        <div class="content">
          根据近20年民用航空领域发生的各类事故报告数据，利用新词发现、关键词抽取、实体识别、事理图谱等算法模型，从海量非结构化文本数据中按需抽取民航事故知识，为民航事故知识库建设提供批量化、自动化、智能化构建与专业化审核功能，可提高民航事故知识库的构建效率和质量。
        </div>
      </div>

      <div
        :class="[Selected == 4 ? 'active' : '', 'item']"
        @click="Selected = 4"
      >
        <i class="iconfont icon-jiaobiao cornerMark"></i>
        <div class="cover cover_img_4">
          <div class="shade">
            <i class="iconfont icon-zhishiku"></i>
            <p style="padding:0 20px">装备故障/产品质量问题知识抽取</p>
          </div>
        </div>
        <div class="content">
          针对装备故障记录、产品质量问题分析报告等数据资源，利用新词发现、文本摘要、事理图谱生成等算法模型，从大量的非结构化文本数据中按需抽取装备/产品质量知识，为装备/产品质量知识库建设提供批量化、自动化、智能化构建与专业化审核功能，可提高装备/产品质量知识库的构建效率和质量。
        </div>
      </div>
      <div
        :class="[Selected == 5 ? 'active' : '', 'item']"
        @click="Selected = 5"
      >
        <i class="iconfont icon-jiaobiao cornerMark"></i>
        <div class="cover cover_img_4">
          <div class="shade">
            <i class="iconfont icon-zhishiku"></i>
            <p style="padding:0 20px">标准碎片化加工</p>
          </div>
        </div>
        <div class="content">
          针对标准的碎片化加工和结构化存储需求，以WORD、RTF格式的标准文件为输入，基于模式识别、自然语言处理、机器学习技术应用，提供标准碎片化加工与可视化功能，实现标准的批量化、结构化、智能化、专业化加工与可视化展示，为标准数据的深度加工和智能应用提供支撑。
        </div>
      </div>
      <div
        :class="[Selected == 3 ? 'active' : '', 'item']"
        @click="Selected = 3"
      >
        <i class="iconfont icon-jiaobiao cornerMark"></i>
        <div class="cover cover_img_3">
          <div class="shade">
            <i class="iconfont icon-shuju"></i>
            <p>标准知识加工</p>
          </div>
        </div>
        <div class="content">
         基于标准碎片化加工的结果数据，利用新词发现、文本摘要、实体加链、关键词抽取、标准多维分类、标准指标参数抽取、相似标准推荐等算法模型，从大量的标准文本数据中按需抽取结构化、细粒度、多维度的标准知识，为新型标准知识库建设提供批量化、自动化、智能化构建与专业化审核功能，可提高标准知识库的构建效率和质量。
        </div>
      </div>
      <div
        :class="[Selected == 2 ? 'active' : '', 'item']"
        @click="Selected = 2"
      >
        <i class="iconfont icon-jiaobiao cornerMark"></i>
        <div class="cover cover_img_2">
          <div class="shade">
            <i class="iconfont icon-icon_zhishiku"></i>
            <p>术语百科知识抽取</p>
          </div>
        </div>
        <div class="content">
          术语百科知识抽取任务，将采集来的近20年民用航空领域发生的各类事故报告数据，利用新词发现、关键词抽取、实体识别、事理图谱等算法模型，从海量非结构化文本数据中按需抽取相应的领域知识，为航空百科平台建设。
        </div>
      </div>
    </div>
    <div class="StartBut">
      <Button type="primary" @click="StartTask">开始任务</Button>
    </div>
    <Modal
      v-model="Modal1"
      title='新建 " 标准碎片化加工 " 任务'
      footer-hide
      lock-scroll
    >
      <Form
        ref="formInline"
        :model="formInline"
        :rules="rules"
        :label-width="100"
      >
        <FormItem prop="TaskName" label="任务名称：">
          <Input type="text" v-model="formInline.TaskName" placeholder=" ">
          </Input>
        </FormItem>
        <FormItem label="选择文件：">
          <Upload
            ref="upload"
            :before-upload="handleUpload"
            action=""
            show-upload-list
            accept=".docx,.doc"
            multiple
          >
            <Button>选择文件</Button>
            <p>说明：仅支持Word和Rtf格式</p>
          </Upload>
          <div v-if="formInline.file !== []">
            <div v-for="(item, index) in formInline.file" :key="index">
              Upload file: {{ item.name }}
              <Button type="text" @click="upload(index)"> 删除</Button>
            </div>
          </div>
        </FormItem>
        <div class="butTask">
          <Button @click="ok('formInline')">创建任务</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { parse } from "qs";
import { mapActions } from "vuex";
export default {
  name: "addTask",
  data() {
    return {
      Modal1: false, //标准碎片化弹框
      Selected: 1,
      formInline: {
        TaskName: "",
        file: [],
      },

      rules: {
        TaskName: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["Jump"]),
    //开始任务
    StartTask() {
      if (this.Selected === 5) {
        this.Modal1 = true;
      } else {
        this.Jump(this.Selected);
      }
    },
    //碎片化弹框确认
    ok(name) {
      let that = this;
      this.$Spin.show();
      this.$refs[name].validate((valid) => {
        if (valid && this.formInline.file.length > 0) {
          let parm = new FormData();
          for (var i = 0; i < this.formInline.file.length; i++) {
            parm.append("files", this.formInline.file[i]); // 文件对象
          }
          parm.append("task_name", this.formInline.TaskName);
          parm.append("user_name", this.user_name);
          console.log(parm, "是否有文件");
          this.$axios("/baike/chip/create_task", "post", parm).then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              setTimeout(function() {
                that.$Message.success("Success!");
                that.$router.push("/TableList/TaskManagement");
                that.$Spin.hide();
              }, 600);
            }
          });
        } else {
          setTimeout(function() {
            that.$Spin.hide();
            that.$Message.error("请填写任务名称并上传文件!");
          }, 600);
        }
      });
      console.log("确定被点击");
    },
    handleUpload(file) {
      this.formInline.file.push(file);
      console.log(this.formInline.file);
      return false;
    },
    upload(index) {
      this.formInline.file.splice(index, 1);
      this.$Message.success("Success");
    },
  },
  mounted() {
     this.$store.commit("updated_Menu_top_active", "新建任务");
  },
  computed: {
    user_name() {
      return this.$store.state.user.userInfo.username;
    },
  },
};
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 18px;
  border-bottom: 1px solid #eeeeee;
}

.list {
  display: flex;
  padding: 0px 14px;
  margin-top: 50px;
  overflow-y: auto;

  .item {
    width: 215px;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    &:last-of-type {
      margin-right: 0px;
    }

    .cover {
      width: 100%;
      height: 160px;
      position: relative;
    }
    .cover_img_1 {
      background: url(../../img/knowledge/minhang.jpg) no-repeat center;
    }
    .cover_img_2 {
      background: url(../../img/knowledge/shuyu.jpg) no-repeat center;
    }
    .cover_img_3 {
      background: url(../../img/knowledge/biaozhun.jpg) no-repeat center;
    }
    .cover_img_4 {
      background: url(../../img/knowledge/zhishi.jpg) no-repeat center;
    }

    .shade {
      position: absolute;
      left: 0px;
      top: 0px;
      background: rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      font-size: 17px;

      i {
        font-size: 26px;
      }

      p {
        margin-top: 10px;
      }
    }

    .content {
      width: 212px;
      height: 200px;
      overflow-x: auto;
      padding: 6px 8px;
      border: 1px solid #eeeeee;
      font-size: 13px;
      line-height: 19px;
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
    }

    .cornerMark {
      position: absolute;
      right: 0px;
      top: -8px;
      z-index: 99;
      font-size: 30px;
      color: #3388ff;
      display: none;
    }
  }

  .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .cornerMark {
      display: block;
    }
    .content {
      border: 1px solid #3388ff;
    }
  }
}
.StartBut {
  text-align: center;
  padding: 40px 0;
}
/deep/.ivu-modal-body {
  min-height: 300px;
}
.butTask {
  text-align: center;
  .ivu-btn {
    width: 200px;
    height: 36px;
    background: cornflowerblue;
    color: #fff;
    letter-spacing: 2px;
  }
}
</style>
