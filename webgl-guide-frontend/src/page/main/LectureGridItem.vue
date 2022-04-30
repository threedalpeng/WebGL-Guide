<script setup lang="ts">
import { useRouter } from "vue-router";

export interface LectureItemProp {
  id: number;
  title: string;
  description: string;
}

const props = defineProps<LectureItemProp>();
const router = useRouter();

const showLecture = () => {
  router.push(`/lecture/${props.id}`);
};
</script>

<template>
  <div class="lecture-item w-20rem flex-col p-4" @click="showLecture">
    <div class="flex-column">
      <div>
        <span class="text-xl">{{ props.title }}</span>
      </div>
      <img
        class="max-w-full max-h-full object-cover"
        src="../../assets/logo.png"
      />
      <div>{{ props.description }}</div>
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
