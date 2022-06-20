import router from "../router";
import ViewUI from "view-design";
import store from "@/store";

router.beforeEach((to, from, next) => {
  const { userInfo } = store.state.user;
  const whiteList = ["/login", "/register"]; //不需要登录的页面 但是登录状态下不能进入
  const avoidLogin = [
    "/digitalQuality",
    // "/about",
    // "/home",
    // "/standard/index",
    // "/BasicDetail",
    // "/TermDetail",
 
    // "/magicBox",
    // "/magicSquare",
    // "/magicMirror",
    // "/practice",
  ]; // 游客模式下可以进入的页面 不需要登录
  const { path } = to;
  $("html,body").animate({ scrollTop: "0px" }, 500);
  window.document.title = "航空百科" + to.meta.title;
  setTimeout(() => {
    if (userInfo) {
      // 如果token存在
      if (whiteList.includes(path)) {
        next({ path: "/" });
      }
      next();
    } else {
      // 如果token不存在
      if (whiteList.includes(path) || avoidLogin.includes(path)) {
        next();
      } else {
        next({
          path: "/login",
          query: {
            redirect: escape(to.fullPath),
          },
        });
      }
    }
  }, 200);
});

router.afterEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  ViewUI.LoadingBar.finish();
  // window.scrollTo(0, 0);
});
