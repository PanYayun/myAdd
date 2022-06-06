<template>
    <div class="sort" @click="sort">
        <span :class="{'on':sortType }">{{text}}</span>
        <div class="sort_wrap">
            <i class="iconfont icon-xiaoyuanjiaoshengxu asc" :class="{'on':sortType == 'asc'}"></i>
            <i class="iconfont icon-xiaoyuanjiaoshengxu desc" :class="{'on':sortType == 'desc'}"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'sort',
  props: {
    text: {
      type: String,
    },
    sortType: {},
  },
  methods: {
    sort() {
      this.$emit('sort');
    },
  },
};
</script>

<style scoped lang="less">
.sort {
  display: flex;
  color: #60636f;
  align-items: center;
  cursor: pointer;
  .on {
    color: #2d8cf0;
  }
  .sort_wrap {
    display: flex;
    flex-direction: column;
    width: 14px;
    height: 16px;
    position: relative;
    margin-top: -1px;
    color: #999999;
    margin-left: 2px;

    i {
      width: 14px;
      line-height: 9px;
      font-size: 14px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .desc {
      transform: rotate(-180deg);
    }

    .asc {
      top: 0px;
    }

    .desc {
      bottom: 0px;
    }
  }
}
</style>