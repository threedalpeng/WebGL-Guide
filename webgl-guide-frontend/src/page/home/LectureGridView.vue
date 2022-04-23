<script setup lang="ts">
import LectureGridItem, { LectureItemProp } from "./LectureGridItem.vue";

const data: LectureItemProp[] = [
  {
    id: 1,
    title: "Something",
    description: "Something",
  },
  {
    id: 2,
    title: "Something",
    description: "Something",
  },
  {
    id: 3,
    title: "Something",
    description: "Something",
  },
  {
    id: 4,
    title: "Something",
    description: "Something",
  },
  {
    id: 5,
    title: "Something",
    description: "Something",
  },
];
</script>

<template>
  <div class="grid gap-x-12 gap-y-14 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <LectureGridItem
      v-for="datum in data"
      :id="datum.id"
      :title="datum.title"
      :description="datum.description"
    />
  </div>
</template>

<style></style>
