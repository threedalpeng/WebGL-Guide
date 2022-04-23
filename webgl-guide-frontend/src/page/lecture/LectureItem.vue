<script setup lang="ts">
export interface LectureItemProp {
  id: number,
  title: string,
  description: string,
}
</script>

<template>
  <div class="lecture-item w-20rem flex-col p-4">
    <div class="flex-column">
      <div>
        <span class="text-xl">hi</span>
      </div>
      <img class="max-w-full max-h-full object-cover" src="../../assets/logo.png" />
      <div>hi</div>
    </div>
  </div>
</template>

<style>
.lecture-item {
  border-radius: 39px;
  background: var(--theme-bg-color);
  box-shadow: 19px 19px 40px #8eafb0, -19px -19px 40px #daffff;
}
</style>
