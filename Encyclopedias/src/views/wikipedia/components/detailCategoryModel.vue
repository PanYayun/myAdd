<template>
    <div>
        <Modal v-model="isShowTree" width="700" title="结构树" @on-ok="ok" @on-cancel="cancel">
            <div class="three_level_item 3333-ji">
                <label v-if="checkfloorIsShow(forLevelItem)">
                    <Icon :type="
              forLevelItem.isOpen ? 'md-arrow-dropdown' : 'md-arrow-dropup'
            " @click="clickIsOpen(forLevelItem)" /><span @click="clickTitleIsOpen(forLevelItem)">{{
            forLevelItem.Fault_Name
          }}</span>
                </label>
                <collapse>
                    <div class="threeChildren 4444-ji" v-show="forLevelItem.isOpen">
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
                            <div class="five_level flex " :class="'standard_label'" :id="index5" :style="{ height: item5.standard_label_height }">
                                <label class="title" v-for="(item6, index6) in item5.Lower_Fault_List" :key="'six' + index6" @click="clickPushDetail6(item6)">{{ item6.Fault_Name }}</label>
                            </div>
                        </div>
                    </div>
                </collapse>
            </div>
        </Modal>
    </div>
</template>

<script>
import collapse from '@/libs/collapse';

export default {
  name: 'detailCategoryModel',
  props: ['group_index'],
  components: {
    collapse,
  },
  data() {
    return {
      isShowTree: false,
      standardLabelMaxHeight: 26, //是否展开
      isFirstListen: true, //是否有用凭感觉吧
      forLevelItem2: [],
      forLevelItem: {},
    };
  },
  computed: {
    // WikipediaDetailsCagetory() {
    //   return this.$store.state.page.WikipediaDetailsCagetory;
    // },
  },
  watch: {},
  mounted() {},
  methods: {
    watchChangeData() {
      //   for (var item of this.forLevelItem.Lower_Fault_List) {
      //     item.isExpand = false; //是否展开
      //     item.isShowMore = false; //是否展示更多
      //     item.isFirst = true; //第一处理事务
      //     item.standard_label_height = "auto"; //元素高度
      //     item.standardHeightTemp = 0; //元素缓存高度
      //   }
      this.forLevelItem2 = JSON.parse(
        JSON.stringify(this.forLevelItem.Lower_Fault_List)
      );
      let className = 'standard_label';
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
                  console.log(item);
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
    subShowTree() {
      this.forLevelItem = JSON.parse(
        JSON.stringify(this.$store.state.page.WikipediaDetailsCagetory)
      );
      this.watchChangeData();

      this.isShowTree = true;
    },
    ok() {},
    cancel() {},
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

    clickPushDetail5(item5) {
      this.isShowTree = false;
      //路由跳转详情
      this.pushDetail(item5.Fault_Id);
    },
    clickPushDetail6(item6) {
      this.isShowTree = false;
      //路由跳转详情
      this.pushDetail(item6.Fault_Id);
    },
    clickIsOpen(item4) {
      item4.isOpen = !item4.isOpen;
      this.$forceUpdate();
    },
    clickTitleIsOpen(item4) {
      console.log('clickIsOpen', item4);
      //Click：点击Spread：展开   Display：本层不展示
      if (item4.deed && item4.deed != undefined) {
        if (item4.deed.toLowerCase() == 'click') {
          this.isShowTree = false;
          this.pushDetail(item4.Fault_Id);

          //详情的数据就是首页保存的不需要在重新覆盖
          //   this.$store.commit("updated_WikipediaDetailsCagetory", item4);
          return;
        } else if (item4.deed.toLowerCase() == 'spread') {
          this.clickIsOpen(item4);
          return;
        }
      }
      this.clickIsOpen(item4);
    },
    pushDetail(Fault_Id) {
      this.$router.push({
        name: 'qualityWikipediaDetails',
        query: { id: Fault_Id },
      });
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
@import '../../../styles/unified.css';

.three_level_item {
  > label {
    font-size: 16px;
    font-weight: bold;
  }

  label {
    cursor: pointer;
  }
  .four_level {
    font-size: 14px;
    margin-top: 13px;
    margin-left: 25px;
    .four_level_label {
      font-weight: bold;
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
  }
}
.down-rotate {
  transform: rotate(180deg);
}
</style>
