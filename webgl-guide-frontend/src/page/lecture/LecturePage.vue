<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import MarkdownView from "../../components/view/MarkdownView.vue";

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
  <div>
    <div class="lecture-content-wrapper p-8">
      <MarkdownView :title="lecture.title" :content="lecture.content" />
    </div>
  </div>
</template>

<style scoped>
.lecture-content-wrapper {
  background-color: white;
  border-radius: 39px;
  box-shadow: 19px 19px 40px #8eafb0, -19px -19px 40px #daffff;
  width: 80vw;
}
</style>
