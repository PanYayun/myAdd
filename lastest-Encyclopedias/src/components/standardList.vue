<template>

    <div style="padding: 12px 0px 25px 0px">
        <Table :columns="columns" :data="dataSource" @on-selection-change="table_change" ref="tables" :loading="loading" border></Table>
        <div class="page">
            <span>每页10条,共计<span style="margin: 0px 3px;color: #3388ff;">{{totalPage}}</span>页</span>
            <Page :total="total" @on-change="pageChange" ref="pages"></Page>
        </div>

    </div>
</template>

<script>
export default {
  name: 'standardList',
  props: {
    columns: {
      type: Array,
      default: [],
    },
    dataSource: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    totalPage: function() {
      let pageNum = !this.total ? 0 : Math.ceil(this.total / 10);
      return pageNum;
    },
  },
  data() {
    return {};
  },
  methods: {
    getSelectRow() {
      return this.$refs.tables.getSelection();
    },
    resetPage() {
      this.$refs.pages.currentPage = 1;
    },
    pageChange(page) {
      this.$emit('change', page);
    },
    table_change(selection) {
      this.$emit('table_change', selection);
      this.$emit('table_select', this.$refs.tables.getSelection());
    },
    selectAll(data) {
      this.$refs.tables.selectAll(data);
    },
  },
};
</script>

<style scoped lang="less">
.page {
  display: flex;
  align-items: center;
  margin-top: 20px;
  span {
    flex: 1;
  }
}
</style>