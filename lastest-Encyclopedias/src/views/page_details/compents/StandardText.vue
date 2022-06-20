<template>
  <div class="standardText">
    <div class="content-box">
      <div class="left-box">
        <span>目录</span>
        <div
          style="cursor: pointer"
          v-for="(item, index) in menu_default"
          :class="[index == idex ? 'active' : '']"
          @click="seletMulu(item, index)"
          :key="index"
          class="con-mulu"
        >
          {{ item.BZZJBH }} {{ item.BTMC }}
        </div>
      </div>
      <div class="right-box">
        <Spin fix v-if="spin_StandardText_right"></Spin>
        <div class="con-text" v-html="itemCon" @click="clickText($event)"></div>
      </div>
    </div>
    <div class="look-all-button" @click="touchOpenAllML">查看全部 >></div>
  </div>
</template>

<script>
export default {
  name: "StandardText",
  props: ["StandardTextBoxData"],
  components: {},
  data() {
    return {
      idex: 0,
      menu_default: [],
      itemCon: "",
      spin_StandardText_right: true,
    };
  },
  mounted() {},
  methods: {
    seletMulu(item, index) {
      // this.spin_StandardText_right = true;
      // if (item.SFYZW == 0) {
      //   // 如果本目录没有正文
      //   this.itemCon = "暂无数据";
      this.idex = index;
      //   this.$Message.warning({
      //     content: "当前目录没有正文！",
      //     background: true,
      //     duration: 3,
      //   });
      //   setTimeout(() => {
      //     this.spin_StandardText_right = false;
      //   }, 200);
      //   return;
      // }
      // this.$axios(
      //   "/baike/biaozhun/get_bzzw",
      //   "post",
      //   this.$qs.stringify({
      //     BTID: item.BTID, //当前分类ID
      //   })
      // ).then((res) => {
      //   this.idex = index;
      //   const str1 = res.data.data.WBNR.replace(/<(\s*[^>]*)?>/g, "<$1>");
      //   this.itemCon = str1.replace(
      //     /<BK>(.*?)<\/BK>/g,
      //     '<a style="font-size:12pt;color: #136ec2">$1</a>'
      //   );
      //   setTimeout(() => {
      //     this.spin_StandardText_right = false;
      //   }, 200);
      // });
    },
    touchOpenAllML() {
      this.$emit("touchOpenAll");
    },
    clickText(e) {
      if (e.target.text != undefined) {
        console.log(e.target.text);
        this.$router.push({
          path: "/TermDetail",
          query: {
            id: e.target.text,
          },
        });
      }
    },
  },
  computed: {},
  watch: {
    StandardTextBoxData: {
      handler(val) {
        this.spin_StandardText_right = true;
        this.$axios(
          "/baike/biaozhun/get_bzml",
          "post",
          this.$qs.stringify({
            BZBH: val.form_data, //当前分类ID
          })
        ).then((res) => {
          // 初始化目录
          this.menu_default = res.data.data;
          // this.seletMulu(this.menu_default[0], 0);
          // // 根据路由传值，初始化默认选中的目录和默认选中的目录对应的正文
          // for (const key in val.default.zw) {
          const str1 = val.default.zw.replace(/<(\s*[^>]*)?>/g, "<$1>");
          this.itemCon = str1.replace(
            /<BK>(.*?)<\/BK>/g,
            '<a style="font-size:12pt;color: #136ec2">$1</a>'
          );
          // this.idex = val.default.ml.indexOf(key);
          // }
          setTimeout(() => {
            this.spin_StandardText_right = false;
          }, 200);
        });
      },
    },
  },
};
</script>
<style lang="less" scoped>
.standardText {
  width: 100%;

  .content-box {
    height: 210px;
    overflow: hidden;
    .left-box {
      width: 180px;
      height: 100%;
      float: left;
      overflow-y: scroll;
      span {
        font-size: 16px;
        color: #3f424b;
        margin-bottom: 20px;
      }
      .con-mulu {
        margin-top: 5px;
        font-size: 14px;
        color: #3f424b;
      }
      .active {
        color: #136ec2;
      }
    }
    .right-box {
      width: 660px;
      height: 210px;
      float: left;
      padding-left: 30px;
      // padding-top: 15px;
      border-left: 1px solid #eee;
      line-height: 30px;
      position: relative;
      .con-text {
        height: 210px;
        line-height: 30px;
        font-size: 14px;
        color: #3f424b;
        overflow-y: auto;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 7;
        // overflow: hidden;
        // font-weight: normal;
      }
    }
  }
  .look-all-button {
    height: 20px;
    width: 90px;
    font-size: 14px;
    color: #3388ff;
    cursor: pointer;
    margin-top: 5px;
  }
  .look-all-button:hover {
    color: #3388ff;
  }
}
</style>
