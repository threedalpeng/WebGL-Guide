<script setup lang="ts">
import LectureGridView from "./LectureGridView.vue";

interface LectureInfo {
  id: number;
  title: string;
  content: string;
  description: string;
}

const lectures: LectureInfo[] = await (await fetch(`/api/lectures`)).json();
</script>

<template>
  <LectureGridView :items="lectures" />
</template>

<style></style>
