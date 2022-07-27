<script setup lang="ts">
import { vScroll } from "@vueuse/components";
import { UseScrollReturn } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import { ref } from "vue";
import { useLectureStore } from "../../store/LectureStore";
import LectureContent from "./LectureContent.vue";
import LectureFront from "./LectureFront.vue";

interface LectureInfo {
  id: number;
  title: string;
  content: string;
  description: string;
}

const lectureId = useRouteParams("id");

const lecture: LectureInfo = await (
  await fetch(`/api/lecture/${lectureId.value}`)
).json();

const lectureStore = useLectureStore();
</script>

<template>
  <div
    class="m-0 w-100vw h-100vh -mr-10px select-none overflow-y-auto overflow-x-hidden scrollbar scrollbar-rounded scrollbar-w-12px scrollbar-radius-2"
  >
    <LectureFront
      :title="lecture.title"
      :description="lecture.description"
    ></LectureFront>
    <LectureContent v-if="!lectureStore.isDemoFocused"></LectureContent>
  </div>
</template>

<style scoped></style>
