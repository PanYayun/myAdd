<template>
    <div style="padding: 10px;background: white;">
        <div @click="$router.back(-1)" class="backBtn">返回</div>
        <atlasComponents></atlasComponents>
    </div>

</template>

<script>
import atlasComponents from '@/components/atlasComponents.vue';
export default {
  name: 'standardAtlas',
  components: {
    atlasComponents,
  },
  computed: {
    stdNos() {
      return this.$store.state.standard.stdNos;
    },
  },
  mounted() {
    this.$axios(
      '/baike/newindex/standardKG',
      'post',
      this.$qs.stringify({
        keyword: this.stdNos,
      })
    ).then(res => {
      if (res.data.code != 500) {
        let { typelist, graph } = res.data.data;
        typelist.unshift('全部');
        this.$store.commit('updated_atlasTypeList', typelist);
        this.$store.commit('updated_atlasImg', graph);
      } else {
        this.$Message.error('获取知识图谱失败!');
      }
    });
  },
  methods: {
    goHistory() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.backBtn {
  cursor: pointer;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  float: right;
  border: 1px solid #e5e5e5;
}
</style>