import Vue from "vue";
import VueRouter from "vue-router";
import ListView from "../views/List.vue";
import { MessageBox } from "element-ui";

Vue.prototype.$mb = MessageBox;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: ListView,
  },
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import(/* webpackChunkName: "Upload" */ "../views/Upload.vue"),
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: () => import(/* webpackChunkName: "about" */ "../views/UserInfo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 解决路由守卫重定向跳转问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

// 路由守卫
router.beforeEach((to, from, next) => {
  // 此处进行鉴权操作
  let token;
  if (localStorage.getItem("token") != undefined) {
    token = localStorage.getItem("token");
  } else {
    token = "";
  }
  
  if (!token) {
    if (to.path === "/login") {
      next(); // 系统根路由
    } else {
      Vue.prototype.$mb.alert("您还没有登录，请先登录!", "熊仔图床提示您", {
        confirmButtonText: "去登录",
        type: "warning",
        callback: (action) => {
          if (action == "confirm") {
            next("/login");
          }
        },
      });
    }
  } else {
    next();
  }
});

export default router;
