<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import LectureFront from "./LectureFront.vue";
import LectureContent from "./LectureContent.vue";

interface LectureInfo {
  id: number;
  title: string;
  content: string;
  description: string;
}

const route = useRoute();
const id = route.params.id;

const lecture: LectureInfo = await (await fetch(`/api/lecture/${id}`)).json();

const scrollOffset = ref(0);
const lectureContentRef = ref<HTMLDivElement>();

const onWheel = (e: WheelEvent) => {
  //e.preventDefault();
  scrollOffset.value = Math.min(
    1,
    Math.max(0, scrollOffset.value - e.deltaY / 1000)
  );
  lectureContentRef.value!.style.setProperty(
    "--scroll",
    scrollOffset.value.toString()
  );
};
</script>

<template>
  <div
    class="m-0 w-100vw h-100vh -mr-16px select-none overflow-x-hidden"
    @wheel="onWheel"
  >
    <LectureFront
      :title="lecture.title"
      :description="lecture.description"
    ></LectureFront>
    <LectureContent ref="lectureContentRef"></LectureContent>
  </div>
</template>

<style scoped></style>
