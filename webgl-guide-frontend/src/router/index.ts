import HomePage from "../page/home/HomePage.vue";
import LecturePage from "../page/lecture/LecturePage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: HomePage },
  { path: "/lecture/:id", component: LecturePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
