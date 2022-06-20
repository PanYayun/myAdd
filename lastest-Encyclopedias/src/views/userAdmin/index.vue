<template>
  <div class="main_container">
    <div class="content_wrap flex">
      <div class="left_menu">
        <div
          style="width:172px;height:48px;font-size:17px;display:flex;font-size: 17px; display: flex;align-items: center;"
        >
          用户中心
        </div>
        <ul>
          <li
            :class="{ active: item.selected }"
            @click="togglePage(item.path)"
            v-for="(item, index) in userPermissionsMenu"
            :key="index"
          >
            <div
              v-if="
                $store.state.user.isAdmin == true ||
                  ($store.state.user.isAdmin == false &&
                    item.name != '用户管理')
              "
            >
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <transition name="fade-transform" mode="out-in">
          <!-- <keep-alive> -->
          <router-view />
          <!-- </keep-alive> -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      userPermissionsMenu: [
        { name: "我的资料", selected: true, path: "/userAdmin/mineInfo" },
        { name: "兴趣标签", selected: false, path: "/userAdmin/mineInterest" },
        {
          name: "修改密码",
          selected: false,
          path: "/userAdmin/modifiPassword",
        },
        {
          name: "我的收藏",
          selected: false,
          path: "/userAdmin/userCollection",
        },
        { name: "用户管理", selected: false, path: "/userAdmin/userManagemen" },
      ],
    };
  },
  watch: {
    $route: {
      handler(val) {
        const index = this.userPermissionsMenu.findIndex(
          (item) => item.path == val.path
        );
        this.userPermissionsMenu = this.userPermissionsMenu.map((item) => ({
          ...item,
          selected: false,
        }));
        this.userPermissionsMenu[index].selected = true;
      },
      immediate: true,
    },
  },
  methods: {
    togglePage(path) {
      if (path === "/userAdmin/userManagemen") {
        if (this.$store.state.user.isAdmin === false) {
          return;
        }
      }
      this.$router.push({ path });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../styles/unified.css";

.left_menu {
  width: 200px;
  padding: 0px 20px;
  background: white;

  ul > li {
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333333;
    cursor: pointer;
  }

  .active {
    color: rgb(51, 136, 255);
  }
}

.right {
  background: white;
  flex: 1;
  padding: 0px 15px;
  margin-left: 20px;
}
</style>
