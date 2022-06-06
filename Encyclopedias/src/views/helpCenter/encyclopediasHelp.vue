<template>
  <div class=" ">
    <div class=" layout_container main_wrap">
      <div style="width:1200px">
        <Row
          style="padding-top: 30px;dispaly:flex;justify-content: space-between;padding-bottom: 60px;"
        >
          <Col>
            <Menu
              ref="Menu_left2"
              theme="light"
              :active-name="Menu_left_active_val"
              @on-select="Menu_left_select"
              style="z-index: initial; width: 220px;height:500px;"
            >
              <MenuGroup title="帮助中心">
                <MenuItem
                  name="平台简介"
                  style="padding-left: 30px"
                  to="/helpCenter/introduce"
                >
                  平台简介</MenuItem
                >
                <MenuItem
                  name="关于我们"
                  style="padding-left: 30px"
                  to="/helpCenter/our"
                  >关于我们</MenuItem
                >
                <MenuItem
                  name="版权声明"
                  style="padding-left: 30px"
                  to="/helpCenter/copyright"
                  >版权声明</MenuItem
                >
                <MenuItem
                  name="免责声明"
                  style="padding-left: 30px"
                  to="/helpCenter/exemption"
                  >免责声明</MenuItem
                >
              </MenuGroup>
            </Menu>
          </Col>
          <Col style="width:960px;height:500px;background: #fff;">
            <transition name="fade-transform" mode="out-in">
              <router-view />
            </transition>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  name: "encyclopediasHelp",
  components: {},
  data() {
    return {
      Menu_left_active_val: "",
    };
  },
  mounted() {
    if (this.$route.path == "/helpCenter/exemption") {
      this.Menu_left_active_val = "免责声明";
    } else if (this.$route.path == "/helpCenter/copyright") {
      this.Menu_left_active_val = "版权声明";
    } else if (this.$route.path == "/helpCenter/our") {
      this.Menu_left_active_val = "关于我们";
    } else if (this.$route.path == "/helpCenter/introduce") {
      this.Menu_left_active_val = "平台简介";
    }
    this.Menu_change_route();
  },
  methods: {
    Menu_change_route() {
      this.$nextTick(() => {
        this.$refs.Menu_left2.updateActiveName();
      });
    },
    Menu_left_select(name) {
      if (name) {
        this.$store.commit("updated_Menu_top_active_help", name);
      }
    },
  },
  computed: {
    Menu_left_active() {
      return this.$store.state.page.Menu_top_active_help;
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
/deep/ .ivu-menu-item-group-title {
  border-bottom: 1px solid #f7f9fa;
}

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
  font-size: 15px;
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
.main_wrap {
  width: 100%;
  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
