<template>
  <div class="layout_container">
    <Row
      style="padding-top: 30px;dispaly:flex;justify-content: space-between;padding-bottom: 30px;"
    >
      <Col>
        <Menu
          ref="Menu_left3"
          theme="light"
          :active-name="Menu_left_active_val"
          @on-select="Menu_left_select"
          style="z-index: initial; width: 200px"
        >
          <MenuGroup title="文本分类">
            <MenuItem
              name="立即体验"
              style="padding-left: 30px"
              to="/modelTools/experienceNow"
            >
              立即体验</MenuItem
            >
            <MenuItem
              name="新建任务"
              style="padding-left: 30px"
              to="/modelTools/newTask"
              >新建任务</MenuItem
            >
            <MenuItem
              name="任务管理"
              style="padding-left: 30px"
              to="/modelTools/taskManagement"
              >任务管理</MenuItem
            >
            <MenuItem
              name="模型详情"
              style="padding-left: 30px"
              to="/modelTools/modelPage"
              >模型详情</MenuItem
            >
          </MenuGroup>
          <MenuGroup title="知识抽取">
            <MenuItem
              name="知识元抽取"
              style="padding-left: 30px"
              to="/modelTools/sourseCeive"
              > 知识元抽取</MenuItem
            >
            <MenuItem
              name="指标抽取"
              style="padding-left: 30px"
              to="/modelTools/indexCeive"
              >指标抽取</MenuItem
            >
             
          </MenuGroup>
          <MenuGroup title="智能问答">
            <MenuItem
              name="智能问答"
              style="padding-left: 30px"
              to="/modelTools/autoAsk"
              > 智能问答</MenuItem
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
  inject: ["reload"],
  name: "modelTools",
  components: {},
  data() {
    return {
      Menu_left_active_val: "",
    };
  },
  mounted() {
    if (this.$route.path == "/modelTools/experienceNow") {
      this.Menu_left_active_val = "立即体验";
      this.$store.commit("updated_Menu_top_active_tools", "立即体验");
    } else if (this.$route.path == "/modelTools/newTask") {
      this.Menu_left_active_val = "新建任务";
      this.$store.commit("updated_Menu_top_active_tools", "新建任务");
    } else if (
      this.$route.path == "/modelTools/taskManagement" ||
      this.$route.path == "/modelTools/taskPage"
    ) {
      this.Menu_left_active_val = "任务管理";
      this.$store.commit("updated_Menu_top_active_tools", "任务管理");
    } else if (this.$route.path == "/modelTools/modelPage") {
      this.Menu_left_active_val = "模型详情";
      this.$store.commit("updated_Menu_top_active_tools", "模型详情");
    }
    this.Menu_change_route();
  },
  methods: {
    Menu_change_route() {
      this.$nextTick(() => {
        this.$refs.Menu_left3.updateActiveName();
      });
    },
    Menu_left_select(name) {
      if (name) {
        this.$store.commit("updated_Menu_top_active_tools", name);
      }
    },
  },
  computed: {
    Menu_left_active() {
      return this.$store.state.page.Menu_top_active_tools;
    },
  },
  watch: {
    Menu_left_active: {
      handler(newVal, oldVal) {
        this.Menu_left_active_val = newVal;
        this.Menu_change_route();
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
    },
    $route: {
      handler: function(val, oldVal) {
        this.reload();
      },
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.ivu-menu-vertical .ivu-menu-item-group-title {
  font-size: 17px !important;
  color: #3f424b !important;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: transparent;
  padding-left: 28px !important;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  background: transparent;
}
.ivu-menu-item {
  font-size: 12px;
}
.ivu-menu-vertical.ivu-menu-light:after {
  background: transparent;
}
.ivu-menu .ivu-menu-item-group {
  border-bottom: 1px solid #dcdee2;
}
.ivu-menu .ivu-menu-item-group:last-child {
  border-bottom: 1px solid transparent;
}
</style>
