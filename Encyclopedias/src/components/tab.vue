<template>
    <div class="tab_type">
        <ul class="flex">
            <li v-for="(item,index) in tabList" :key="index" :class="{'active': tabIndex == index }" @click="tabClick(index)">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabList: {
      type: Array,
    },
    tabIndex: {},
  },
  methods: {
    tabClick(index) {
      this.$emit('tabClick', index);
    },
  },
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.tab_type {
  background: white;
  padding-left: 23px;
  li {
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    margin-right: 70px;
    position: relative;
    cursor: pointer;
  }
  .active {
    font-weight: bold;
  }
  .active:after {
    content: '';
    width: 100%;
    height: 2px;
    background: #3388ff;
    position: absolute;
    bottom: 1px;
    left: 0px;
  }
}
</style>