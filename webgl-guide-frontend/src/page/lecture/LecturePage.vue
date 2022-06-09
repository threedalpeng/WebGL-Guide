<script setup lang="ts">
import { useRoute } from "vue-router";
import LectureBackground from "./LectureBackground.vue";
import LectureSidebar from "./LectureSidebar.vue";

interface LectureInfo {
  id: number;
  title: string;
  content: string;
  description: string;
}

const route = useRoute();
const id = route.params.id;

const lecture: LectureInfo = await (
  await fetch(`${import.meta.env.VITE_API_URL}/lecture/${id}`)
).json();
</script>

<template>
  <div class="m-0 w-100vw h-100vh select-none">
    <LectureBackground></LectureBackground>
    <LectureSidebar></LectureSidebar>
    <!--div class="description-card">
      <h1>{{ lecture.title }}</h1>
      <p>{{ lecture.description }}</p>
    </div-->
  </div>
</template>

<style scoped>
.description-card {
  position: fixed;
  width: 300px;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);

  color: white;
}
</style>
