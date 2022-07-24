<script setup lang="ts">
import { watch } from "vue";
import { useLectureStore } from "../../store/LectureStore";
import LectureBackground from "./LectureBackground.vue";
import LectureSidebar from "./LectureSidebar.vue";

defineProps<{ title: string; description: string }>();

const lectureStore = useLectureStore();
watch(
  () => lectureStore.isDemoFocused,
  (isDemoFocused, old) => {
    if (isDemoFocused) {
      // backgroundDemoRef.value!.querySelector('canvas').;
    } else {
    }
  }
);
</script>

<template>
  <div style="position: relative; z-index: 1">
    <LectureBackground class="background"></LectureBackground>
    <LectureSidebar v-show="!lectureStore.isDemoFocused"></LectureSidebar>
    <div v-show="!lectureStore.isDemoFocused" class="description-card">
      <h1>{{ title }}</h1>
      <p style="word-break: keep-all">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.description-card {
  position: absolute;
  width: 300px;
  right: 30px;
  z-index: 1;

  top: 50%;
  transform: translateY(-50%);

  padding: 2em;

  color: white;
  border-radius: 31px;
  background: linear-gradient(145deg, #6e6e6ea1, #181818bf);
  box-shadow: 6px 6px 18px #08080830, -6px -6px 18px #1f1f1f30;

  pointer-events: none;
}
</style>
