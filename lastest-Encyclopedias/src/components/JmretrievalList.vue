<template>
  <div class="standard_item">
    <div
      class="standard_item_box"
      :key="index"
      v-for="(item1, index) in standardList2"
    >
      <div class="standard_item_title">
        <div class="standard_item_title_text">
          <img
            class="standard_item_icon"
            src="@/img/icon_titleLeft.png"
            alt=""
          />
          {{ item1.fl_name }}
        </div>
        <div
          class="standard_standard_more"
          @click="clickMore(item1)"
          v-if="item1.isShowMore"
        >
          {{ item1.isExpand ? "收起" : "更多" }}
          <img src="@/img/icon_more.png" />
        </div>
      </div>
      <div
        class="standard_label"
        :id="index"
        :style="{ height: item1.standard_label_height }"
      >
        <!-- <div class="standard_label_child" :key="index" v-for="(item , index) in item.child_info" >{{item.year}}</div> -->
        <div
          class="standard_label_child"
          v-for="(item, index) in item1.child_info"
          :key="index"
          @click="standard_label_child_click(item1.fl_name, item)"
        >
          {{ item | js_item }}  
          <span style="margin-left: 4px" >({{ item.count }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "retrievalList",
  props: ["standardList"],
  data() {
    return {
      standardList2: [],
      standardLabelMaxHeight: 88, //是否展开
      isFirstListen: true,//是否有用凭感觉吧  
    };
  },
  mounted() {
    // for (var item of this.standardList) {
    //   item.isExpand = false;//是否展开
    //   item.isShowMore = false;//是否展示更多
    //   item.isFirst = true;//第一处理事务
    //   item.standard_label_height = "auto";//元素高度
    //   item.standardHeightTemp = 0;//元素缓存高度
    // }
    // this.standardList2=JSON.parse(JSON.stringify(this.standardList));
  },
  watch: {
    standardList: {
      handler(newVal, oldVal) {
        for (var item of newVal) {
          item.isExpand = false; //是否展开
          item.isShowMore = false; //是否展示更多
          item.isFirst = true; //第一处理事务
          item.standard_label_height = "auto"; //元素高度
          item.standardHeightTemp = 0; //元素缓存高度
        }
        this.standardList2 = JSON.parse(JSON.stringify(newVal));
        if (this.isFirstListen) {
          var that = this;
          this.$nextTick(() => {
            this.$erd.listenTo(
              document.getElementsByClassName("standard_label"),
              function (element) {
                that.$nextTick(function () {
                  let id = element.id;
                  let height = element.offsetHeight;
                  var item = that.standardList2[id];
                  item.standardHeightTemp = height;
                  if (item.isFirst) {
                    if (height > that.standardLabelMaxHeight) {
                      item.isShowMore = true;
                    } else {
                      item.isShowMore = false;
                    }
                    item.isFirst = false;
                    that.setupStandardLabelHeight(item);
                  }
                });
              }
            );
          });
          this.isFirstListen = false;
        }
      },
    },
  },
  methods: {
    clickMore(item) {
      item.isExpand = !item.isExpand;
      this.setupStandardLabelHeight(item);
    },
    setupStandardLabelHeight(item) {
      if (item.isExpand) {
        item.standard_label_height = "auto";
      } else {
        if (item.standardHeightTemp > this.standardLabelMaxHeight) {
          item.standard_label_height = this.standardLabelMaxHeight + "px";
        } else {
          item.standard_label_height = "auto";
        }
      }
    },
    standard_label_child_click(title, val) {
      let msg;
      for (let i in val) {
        if (i != "count") {
          msg = val[i];
        }
      }
      this.$router.push({
        name: "SearchResult",
        query: {
          fl_name: title,
          childName: msg,
        },
      });
    },
  },
  filters: {
    js_item(val) {
      let msg;
      for (let i in val) {
        if (i != "count") {
          msg = val[i];
        }
      }
      return msg;
    },
  },
};
</script>

<style lang="less" scoped>
.standard_item {
  border-bottom: 1px solid #eeeeee;

  .standard_item_box {
    padding-top: 26px;
    border-bottom: 1px solid #eeeeee;
  }

  & > .standard_item_box:last-child {
    border-bottom: 0;
  }

  .standard_item_title {
    margin-bottom: 14px;
    overflow: hidden;

    .standard_item_title_text {
      font-size: 18px;
      line-height: 26px;
      // width: 770px;
      float: left;
      color: #3f424b;
    }

    .standard_standard_more {
      float: right;
      font-size: 14px;

      &:hover {
        color: #136ec2;
        cursor: pointer;
      }

      .standard_standard_more_icon {
        width: 10px;
        height: 6px;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
      }
      .transfromRotate {
        transform: rotate(180deg);
      }
    }
    .standard_item_icon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
  .standard_label {
    font-size: 14px;
    line-height: 22px;
    color: #60636f;
    overflow: hidden;
    .standard_label_child {
      float: left;
      line-height: 16px;
      padding: 0 58px 14px 0;
      width: 270px;
      &:hover {
        color: #136ec2;
        cursor: pointer;
      }
    }
  }
  .maxHeight100 {
    max-height: 100px;
  }
}
</style>