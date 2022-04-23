<script setup lang="ts">
import LectureItem, {LectureItemProp} from './LectureItem.vue';

const data: LectureItemProp[] = [{
  id: 1,
  title: "Something",
  description: "Something"
}];
</script>

<template>
  <div class="grid gap-x-12 gap-y-14 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <LectureItem v-for="i in [1, 2, 3, 4, 5]" />
  </div>
</template>

<style>
</style>
