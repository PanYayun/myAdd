<template>
  <div class="standardText">
    <div class="content-box">
      <div class="left-box">
        <div
          style="cursor: pointer"
          v-for="(item, index) in menu_default"
          :class="[index === idex ? 'active' : '']"
          @click="seletMulu(item, index)"
          :key="index"
          class="con-mulu"
        >
          {{ item }}
        </div>
      </div>
      <div class="right-box">
        <div
          :key="indexVal"
          v-for="(item, indexVal) in StandardTextBoxData"
          @click="clickText($event)"
           :class="indexVal === idex ? 'showText' : ''"
        >
         <span v-html="item"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StandardText",
  props: ["StandardTextBoxData",'menu_default'],
  components: {},
  data() {
    return {
      idex: 0,
      itemCon: "",
    };
  },
  mounted() { },
  methods: {
    seletMulu(item, index) {
      this.idex = index
    },
    clickText(e) {
      if (e.target.text != undefined) {
        console.log(e.target.text)
        this.$router.push({
          path: '/TermDetail', query: {
            id: e.target.text
          }
        })
      }
    },
  },
  computed: {},
  watch: {
    StandardTextBoxData: {
      handler(val) {
        this.spin_StandardText_right = true;
        setTimeout(() => {
          this.spin_StandardText_right = false;
        }, 200);
      }
    }
  }
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
      border-left: 1px solid #eee;
      line-height: 30px;
      position: relative;
      &>div {
        display: none;
        height: 210px;
        line-height: 30px;
        font-size: 14px;
        color: #3f424b;
        overflow-y: auto;
      }
      .showText{
          display: block !important;
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