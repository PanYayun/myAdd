<template>
  <div class="standard_item">
    <div
      class="standard_item_box"
      :key="index"
      v-for="(item, index) in standardList2"
    >
      <div class="standard_item_title">
        <div class="standard_item_title_text">
          <img
            class="standard_item_icon"
            src="@/img/icon_titleLeft.png"
            alt=""
          />
          {{ item.fatherName }}
        </div>
        <div
          class="standard_standard_more"
          @click="clickMore(item)"
          v-if="item.isShowMore"
        >
          {{ item.isExpand ? "收起" : "更多" }}
          <img src="@/img/icon_more.png" />
        </div>
      </div>
      <div
        class="standard_label"
        :id="index"
        :style="{ height: item.standard_label_height }"
      >
        <div
          class="standard_label_child"
          :key="index"
          v-for="(item, index) in item.childInfo"
          @click="touchChild(item)"
        >
          {{ item.childName }}
          <span class="ner">({{ item.count }})</span>
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
      isFirstListen: true, //是否有用凭感觉吧
    };
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
              function(element) {
                that.$nextTick(function() {
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
  mounted() {},
  methods: {
    // 请求列表
    bzList() {
      this.$axios("/baike/biaozhun/get_classification", "get", {
        fatherID: "ROOT",
      }).then((res) => {
        this.standardList = res.data.data;
      });
    },
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
    touchChild(item) {
      this.$emit("touchChild", item);
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
      width: 770px;
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
      margin: 0 58px 14px 0;
      &:hover {
        color: #136ec2;
        cursor: pointer;
        .ner {
          color: #136ec2;
        }
      }
      .ner {
        color: #999999;
        margin-left: 4px;
      }
    }
  }
  .maxHeight100 {
    max-height: 100px;
  }
}
</style>
