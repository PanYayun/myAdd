<template>
    <div class="collection" @click="collectionBtn">
        <div v-if="isTrue">
            <img style="width:18px;margin-right:8px" src="../img/scimg1.png" alt=""> 已收藏
        </div>
        <div v-else>
            <img style="width:18px;margin-right:8px" src="../img/scimg2.png" alt=""> 收藏
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['coliectionData'],
  name: 'collection',
  data() {
    return {
      isTrue: true,
    };
  },
  watch: {
    coliectionData: {
      handler(newVal, oldVal) {
        this.iscollection();
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
      deep: true,
    },
  },
  $route: {
    handler: function(val, oldVal) {
      this.iscollection();
    },
  },
  computed: {},
  methods: {
    collectionBtn() {
      if (this.isTrue) {
        this.iscollectionCancel();
      } else {
        this.iscollectionTrue();
      }
    },
    // 判断是否收藏
    iscollection() {
      this.$forceUpdate();
      this.$axios(
        '/users/entry_is_collected',
        'post',
        this.coliectionData
      ).then(res => {
        if (res.data.data.is_collected == 1) {
          this.isTrue = true;
        } else {
          this.isTrue = false;
        }
      });
    },
    // 请求收藏
    iscollectionTrue() {
      this.$axios('/users/add_collection', 'post', this.coliectionData).then(
        res => {
          this.$Message.success('收藏成功');
          this.isTrue = true;
        }
      );
    },
    // 取消收藏
    iscollectionCancel() {
      this.$axios('/users/delete_collection', 'post', this.coliectionData).then(
        res => {
          this.$Message.success('已取消收藏');
          this.isTrue = false;
        }
      );
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.collection {
  display: flex;
  height: 28px;
  align-items: center;
  & > div {
    cursor: pointer;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
}
</style>