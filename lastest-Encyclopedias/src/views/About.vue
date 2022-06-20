<template>
  <div class="layout_container"></div>
</template>

<script>
export default {
  name: "About",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("updated_SearchImg", vm.$route.query);
      vm.$router.push({
        path: from.path,
        query: vm.$route.query
      });
      return;
    });
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
</style>