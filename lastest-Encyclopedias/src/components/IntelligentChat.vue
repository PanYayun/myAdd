<template>
  <div class="IntelligentChat">
    <Modal v-model="isShowChat" draggable scrollable :mask="false" width="530">
      <p slot="header" style="text-align: center">
        <span>小航</span>
      </p>

      <div class="model-container">
        <div class="main-content" ref="mainContent">
          <div
            class="chatRecordBox"
            v-for="(item, index) in chatRecord"
            :key="index"
          >
            <div
              :class="item.type == 'robot' ? 'left-text-box' : 'right-text-box'"
            >
              <img
                v-if="item.type == 'robot'"
                class="header-img"
                src="../img/chat/kefu_image.png"
              />
              <img v-else class="header-img" src="../img/chat/user_image.png" />
              <div
                class="text-box"
                :class="
                  item.type == 'robot' ? 'text-box-left' : 'text-box-right'
                "
              >
                <div v-if="item.answer" @click="touchAnswer(item)">
                  {{ item.answer }}
                </div>
                <img :src="item.imgUrl" v-else />
                <div
                  style="
                    overflow: hidden;
                    clear: both;
                    font-size: 12px;
                    color: #666666;
                    margin-top: 5px;
                  "
                  v-if="item.source"
                >
                  {{ item.source }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <Upload
            ref="upload"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :data="uploadData"
            :show-upload-list="false"
            name="img"
            type="drag"
            action="api/baike/sousuo/search_answer_image"
          >
            <img
              src="../img/chat/photo_image.png"
              style="padding-bottom: 10px; padding-top: 10px"
            />
          </Upload>
          <Input
            v-model="message"
            type="textarea"
            :border="false"
            :rows="4"
            placeholder="随便说点什么吧"
            @on-enter="spendBtn()"
          />
        </div>
      </div>
      <div
        slot="footer"
        style="text-align: right; padding: 0 20px; box-sizing: border-box"
      >
        <Button size="large" @click="handleReset()">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit()"
          >发送</Button
        >
      </div>
    </Modal>
    <div class="chatBoxShow" id="drift">
      <div style="height:10px;background:#3388ff;display:inline-block;width: 100%;margin:0;margin-bottom: -4px;border-radius: 2px; cursor: all-scroll;" @mousedown="mousedown"></div>
      <div class="artificial_service" @click="handShow()">
        <div class="chatImg chatImg1"></div>
        <p>智能问答</p>
      </div>
      <div class="artificial_service" @click="goToTool()">
        <div class="chatImg chatImg2"></div>
        <p>工具箱</p>
      </div>
      <div class="artificial_service" @click="scrollTop()">
        <div class="chatImg chatImg3"></div>
        <p>返回顶部</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntelligentChat",
  props: {
    isShowChat2: {
      default: true,
    },
    isRightBox: {
      default: false,
    },
  },
  // props: { isShowChat: "" },
  data() {
    return {
      message: "",
      isShowChat: false,
      chatRecord: [],
      uploadData: {
        uid: "",
        image_name: "",
      },
      file: "",
    };
  },
  mounted() {},
  methods: {
    //滑动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$refs.mainContent;
        container.scrollTop = container.scrollHeight;
      });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      let promise = new Promise((resolve) => {
        this.$nextTick(function() {
          let _this = this;
          let reader = new FileReader();
          // תbase64
          reader.onload = function(e) {
            var fileUrl = e.target.result; // img里可以显示未上传的图片文件以供预览
            var imgUrl = this.result;
            _this.chatRecord.push({ type: "user", imgUrl: imgUrl });
            var chatHistory = [{ type: "user", img: "", imgName: file.name }];
            res.data.forEach((item) => {
              _this.chatRecord.push(item);
              chatHistory.push(item);
            });
            _this.saveChatToService(chatHistory);
          };
          reader.readAsDataURL(_this.file);
          resolve(true);
        });
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    handleBeforeUpload(file) {
      this.file = file;
      this.uploadData.image_name = file.name;
      this.uploadData.uid = this.$store.state.user.userInfo.username;
    },
    handleReset() {
      this.isShowChat = false;
    },
    spendBtn(e) {
      this.handleSubmit(); //调用查询方法
    },
    handleSubmit() {
      if (this.message.trim()) {
        this.chatRecord.push({ type: "user", answer: this.message });
        this.scrollToBottom();
        this.chatRobot();
        this.message = "";
      } else {
        this.$Message.warning("随便说点什么吧");
      }
    },
    // 发送问题到机器人
    chatRobot() {
      var question = this.message;
      this.$axios(
        "/baike/sousuo/search_answer",
        "post",
        this.$qs.stringify({
          query: this.message,
        })
      ).then((res) => {
        const data = res.data.data;
        //当前这次聊天的问题 和回答
        var chatHistory = [
          {
            type: "user",
            answer: question,
          },
        ];
        if (res.data.data.length > 0) {
          data.forEach((element) => {
            this.$set(element, "type", "robot"); //暂时使用
            this.chatRecord.push(element);
            chatHistory.push(element);
          });
        } else {
          var answer = { type: "robot", answer: data.answer };
          this.chatRecord.push(answer);
          chatHistory.push(answer);
        }
        this.saveChatToService(chatHistory);
        this.scrollToBottom();
      });
    },
    // 去工具箱
    goToTool() {
      this.$router.push({
        path: "/TableList/TaskManagement",
      });
    },
    // 去顶部
    scrollTop() {
      $("html,body").animate({ scrollTop: 0 }, 500);
    },

    // 保存聊天记录到本地
    saveChatToLocal() {
      this.$store.dispatch("storageChatHistory", this.chatRecord);
    },
    // 保存聊天记录到后台 多此一举的操作
    saveChatToService(chatHistory) {
      chatHistory.forEach((item) => {
        if (!item.hasOwnProperty("data_jump")) {
          item.data_jump = "";
        }
        if (!item.hasOwnProperty("search_id")) {
          item.search_id = "";
        }
        if (!item.hasOwnProperty("source")) {
          item.source = "";
        }
        if (!item.hasOwnProperty("imgName")) {
          item.imgName = "";
        }
      });
      var par = {
        uid: this.$store.state.user.userInfo.username,
        chatRecord: chatHistory,
      };
      this.saveChatToLocal();
      if (this.$store.state.user.userInfo.username) {
        this.axios({
          url: "api/baike/sousuo/receive_chat_record",
          method: "POST",
          data: JSON.stringify(par),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res);
        });
      }
    },
    handShow() {
      this.isShowChat = !this.isShowChat;
      this.scrollToBottom();
    },
    openModel() {
      this.isShowChat = true;
    },
    // 点击内容跳转
    touchAnswer(val) {
      this.isShowChat = false;
      if (val.data_jump) {
        let pageId = val.search_id;
        let values = Object.values(pageId).toString();

        if (val.data_jump == "/baike/biaozhun/details_page") {
          this.$router.push({
            path: "/BasicDetail",
            query: { id: values },
          });
        } else if (val.data_jump == "/baike/hangkongshuyu/details_page") {
          this.$router.push({
            path: "/TermDetail",
            query: { id: values },
          });
        } else if (val.data_jump == "/baike/minhang/request") {
          this.$router.push({
            path: "/CivilAviationDetail",
            query: { id: values },
          });
        } else if (val.data_jump == "/baike/yuanqijian/get_case") {
          this.$router.push({
            path: "/ElectronDetailInvalid",
            query: { id: values },
          });
        }
      }
    },

    mousedown(event) {
      this.selectElement = document.getElementById("drift");
      var div1 = this.selectElement;
      this.selectElement.style.cursor = "move";
      this.isDowm = true;
      var distanceX = event.clientX - this.selectElement.offsetLeft;
      var distanceY = event.clientY - this.selectElement.offsetTop;
      // alert(distanceX)
      // alert(distanceY)
      console.log(distanceX);
      console.log(distanceY);
      document.onmousemove = function(ev) {
        var oevent = ev || event;
        div1.style.top = oevent.clientY - distanceY + "px";
        div1.style.left = oevent.clientX - distanceX + "px";
        div1.style.right = "auto";
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        div1.style.cursor = "default";
      };
    },
  },
  mounted() {
    var chatHistoryFromVUEX = this.$store.state.user.chatHistory;
    if (chatHistoryFromVUEX) {
      this.chatRecord = chatHistoryFromVUEX;
    } else {
      this.chatRecord = [];
    }
  },
  computed: {
    islogin() {
      return this.$store.state.user.userInfo;
    },
  },
  watch: {
    isShowChat2(newV, oldV) {
      this.isShowChat = newV;
      alert(newV);
    },
    islogin: {
      //退出登录后清空聊天记录
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) != "null") {
          if (newVal.name) {
            return;
          }
        }
        this.chatRecord = [];
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
/* 右侧小模块的显示隐藏  需要的页面  在页面上添加display：block */
.ivu-upload {
  float: left;
  padding: 8px;
}
/deep/ .ivu-upload-drag {
  display: flex;
  width: 24px;
  border: none !important;
  img {
    padding: 0px !important;
  }
}
.ivu-upload-list {
  margin: 0;
}
.chatBoxShow {
  // display: none;
  z-index: 9999;
  position: fixed;
  right: 30px;
  top: 60%;
  & > div {
    margin-bottom: 8px;
  }
}
.artificial_service {
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px #e5e5e5;
  width: 72px;
  height: 64px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  display: flex;
}
.artificial_service:hover p {
  color: #3388ff;
}
.artificial_service:hover p {
  color: #3388ff;
}

.artificial_service:hover p {
  color: #3388ff;
}

.artificial_service:hover .chatImg1 {
  background: url(~@/img/chat/chat003_b.png) no-repeat center;
}
.artificial_service:hover .chatImg2 {
  background: url(~@/img/chat/chat002_b.png) no-repeat center;
}

.artificial_service:hover .chatImg3 {
  background: url(~@/img/chat/chat001_b.png) no-repeat center;
}

.chatRecordBox {
  overflow: hidden;
}

.artificial_service p {
  margin-top: 5px;
  color: #999999;
  font-size: 12px;
  text-align: center;
}

.artificial_service img {
  width: 25px;
  height: 25px;
}
.model-container {
  .main-content {
    height: 340px;
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    overflow-y: scroll;
  }

  .left-text-box {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .right-text-box {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
  }
  .header-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
    vertical-align: middle;
  }
  .text-box {
    padding: 5px;
    background-color: #f1f3f5;
    color: #333;
    font-size: 14px;
    border-radius: 4px;
  }
  .text-box-left {
    margin-left: 10px;
    max-width: 340px;
    img {
      max-width: 284px;
    }
  }
  .text-box-right {
    margin-right: 10px;
    max-width: 340px;
    img {
      max-width: 284px;
    }
  }
}
/deep/ .ivu-modal-body {
  padding: 0 20px;
  overflow: hidden;
}
/deep/ .ivu-modal-footer {
  padding: 0;
  padding: 14px 0;
  border: none;
}
/deep/ .ivu-btn-large {
  height: 30px;
  span {
    font-size: 14px;
  }
}
/deep/ .textarea .ivu-input {
  resize: none !important;
  padding: 0;
}
/deep/ .ivu-input {
  resize: none;
}
.chatImg {
  width: 25px;
  height: 25px;
  display: inline-block;
}
.chatImg1 {
  background: url(~@/img/chat/chat003.png) no-repeat center;
}
.chatImg2 {
  background: url(~@/img/chat/chat002.png) no-repeat center;
}
.chatImg3 {
  background: url(~@/img/chat/chat001.png) no-repeat center;
}
</style>
