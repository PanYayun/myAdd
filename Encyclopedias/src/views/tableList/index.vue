<template>
  <div class="layout_container">
    <Row style="padding-top: 30px;dispaly:flex;justify-content: space-between;padding-bottom: 30px;">
      <Col>
        <Menu
          ref="Menu_left"
          theme="light"
          :active-name="Menu_left_active_val"
          @on-select="Menu_left_select"
          style="z-index: initial; width: 200px"
        >
          <MenuGroup title="数据采集" v-if="$route.path == '/TableList/UploadRecordManagementDetails' || $route.path =='/TableList/UploadRecordManagement'||$route.path =='/TableList/NewDataUpload'">
            <MenuItem
              name="上传记录管理"
              style="padding-left: 30px"
              to="/TableList/UploadRecordManagement"
              >上传记录管理</MenuItem
            >
            <MenuItem
              name="新增数据上传"
              style="padding-left: 30px"
              to="/TableList/NewDataUpload"
              >新增数据上传</MenuItem
            >
          </MenuGroup>
          <MenuGroup title="知识抽取" v-else>
            <MenuItem
              name="新建任务"
              style="padding-left: 30px"
              to="/TableList/addTask"
              >新建任务</MenuItem
            >
             <MenuItem
              name="任务管理"
              style="padding-left: 30px"
              to="/TableList/TaskManagement"
              >任务管理</MenuItem
            >
          </MenuGroup>
        </Menu>
      </Col>
      <Col style="width:980px">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "TableList",
  components: {},
  data() {
    return {
      Menu_left_active_val: ""
    };
  },
  mounted() {},
  methods: {
    Menu_change_route() {
      this.$nextTick(() => {
        this.$refs.Menu_left.updateActiveName();
      });
    },
    Menu_left_select(name) {
      if (name) {
        this.$store.commit("updated_Menu_top_active", name);
      }
    }
  },
  computed: {
    Menu_left_active() {
      return this.$store.state.page.Menu_top_active;
    }
  },
  watch: {
    Menu_left_active: {
      handler(newVal, oldVal) {
        this.Menu_left_active_val = newVal;
        this.Menu_change_route();
      },
      // 加上之后第一次定义时就会执行
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-menu-vertical .ivu-menu-item-group-title{
  font-size: 17px !important;
  color: #3f424b !important; 
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
  background:transparent ;
  padding-left: 28px !important;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
  background: transparent;
}
.ivu-menu-item {
  font-size: 12px;
}
.ivu-menu-vertical.ivu-menu-light:after{
  background: transparent;
}
.ivu-menu .ivu-menu-item-group{
  border-bottom:1px solid #dcdee2
}
.ivu-menu .ivu-menu-item-group:last-child{
  border-bottom:1px solid transparent
}
</style>