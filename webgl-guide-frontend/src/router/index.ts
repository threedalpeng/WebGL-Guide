import HomePage from "../page/home/HomePage.vue"
import { createRouter, createWebHistory } from "vue-router"

const LecturePage = () => import("../page/lecture/LecturePage.vue")

const routes = [
  { path: "/", component: HomePage },
  { path: "/lecture/:id", component: LecturePage, name: "lecture" },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
