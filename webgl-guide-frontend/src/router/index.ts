import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../page/main/MainPage.vue";

const LecturePage = () => import("../page/lecture/LecturePage.vue");
const DemoPage = () => import("../page/demo/DemoPage.vue");

const routes = [
  { path: "/", component: MainPage },
  { path: "/lecture/:id", component: LecturePage },
  { path: "/demo", component: DemoPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
