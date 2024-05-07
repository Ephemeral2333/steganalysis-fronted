import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "Content",
    component: () => import("@/components/Content.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/steganography",
    name: "Steganography",
    component: () => import("@/views/steganography"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/views/history"),
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
