<script setup lang="ts">
import LectureGridItem, { LectureItemProp } from "./LectureGridItem.vue";

const props = defineProps<{ items: LectureItemProp[] }>();
</script>

<template>
  <div class="grid gap-x-12 gap-y-14 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <LectureGridItem
      v-for="item in props.items"
      :id="item.id"
      :title="item.title"
      :description="item.description"
    />
  </div>
</template>

<style></style>
