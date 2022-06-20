<template>
    <div class="qualitySixLevel">
        <div class="four_level" v-for="(item5, index5) in forLevelItem2" :key="'five' + index5">
            <div class="flex vertical_center" v-if="checkfloorIsShow(item5)">
                <label style="flex: 1" class="four_level_label" @click="clickPushDetail5(item5)">
                    {{ item5.Fault_Name }}
                </label>
                <div class="flex vertical_center show_type" @click="clickMore(item5)" v-if="item5.isShowMore">
                    <span>{{ item5.isExpand ? "收起" : "展开" }}</span>
                    <i class="iconfont icon-shouqi " :class="{ 'down-rotate': !item5.isExpand }"></i>
                </div>
            </div>
            <div class="five_level flex " :class="'standard_label' + group_index" :id="index5" :style="{ height: item5.standard_label_height }">
                <label class="title" v-for="(item6, index6) in item5.Lower_Fault_List" :key="'six' + index6" @click="clickPushDetail6(item6)">{{ item6.Fault_Name }}</label>
            </div>
        </div>
    </div>
</template>

<script>
import collapse from '@/libs/collapse';

export default {
  name: 'qualitySixLevel',
  props: ['forLevelItem', 'group_index'],

  data() {
    return {
      isShow1: true,
      standardLabelMaxHeight: 26, //是否展开
      isFirstListen: true, //是否有用凭感觉吧
      forLevelItem2: [],
    };
  },
  watch: {
    'forLevelItem.Lower_Fault_List': {
      handler(newVal, oldVal) {
        for (var item of newVal) {
          item.isExpand = false; //是否展开
          item.isShowMore = false; //是否展示更多
          item.isFirst = true; //第一处理事务
          item.standard_label_height = 'auto'; //元素高度
          item.standardHeightTemp = 0; //元素缓存高度
        }
        this.forLevelItem2 = JSON.parse(JSON.stringify(newVal));
        // console.log(this.forLevelItem2)
        let className = 'standard_label' + this.group_index;
        this.$nextTick(() => {
          if (this.isFirstListen) {
            var that = this;
            this.$nextTick(() => {
              this.$erd.listenTo(
                document.getElementsByClassName(className),
                function(element) {
                  that.$nextTick(function() {
                    let id = element.id;
                    let height = element.offsetHeight;
                    var item = that.forLevelItem2[id];
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
        });
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
      // 深度监听即当要监听对象或数组的时候需要添加deep:true属性
      deep: true,
    },
  },
  mounted() {},
  methods: {
    clickMore(item) {
      item.isExpand = !item.isExpand;
      this.setupStandardLabelHeight(item);
    },
    setupStandardLabelHeight(item) {
      if (item.isExpand) {
        item.standard_label_height = 'auto';
      } else {
        if (item.standardHeightTemp > this.standardLabelMaxHeight) {
          item.standard_label_height = this.standardLabelMaxHeight + 'px';
        } else {
          item.standard_label_height = 'auto';
        }
      }
      this.$forceUpdate();
    },
    touchChild(item) {
      this.$emit('touchChild', item);
    },

    clickPushDetail5(item5) {
      //路由跳转详情
      this.$router.push({
        name: 'qualityWikipediaDetails',
        query: { id: item5.Fault_Id },
      });
      this.$store.commit('updated_WikipediaDetailsCagetory', this.forLevelItem);
    },
    clickPushDetail6(item6) {
      //路由跳转详情
      this.$router.push({
        name: 'qualityWikipediaDetails',
        query: { id: item6.Fault_Id },
      });
      this.$store.commit('updated_WikipediaDetailsCagetory', this.forLevelItem);
    },
    checkfloorIsShow(item) {
      if (item.deed == undefined || item.deed == '') {
        return true;
      }
      if (item.deed.toLowerCase() == 'display') {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="less">
.qualitySixLevel {
  .four_level {
    font-size: 14px;
    margin-top: 13px;
    margin-left: 25px;
    .four_level_label {
      font-weight: bold;
    }
  }

  .five_level {
    flex-wrap: wrap;
    margin-top: 10px;
    overflow: hidden;
    .title {
      margin-left: 10px;
      line-height: 26px;
      color: #60636f;
      cursor: pointer;
    }
    .title:hover {
      color: #3388ff;
    }
  }
  .down-rotate {
    transform: rotate(180deg);
  }
}
</style>
