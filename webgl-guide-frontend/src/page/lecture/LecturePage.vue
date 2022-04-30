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
  <div class="m-0 w-100vw h-100vh select-none">
    <div class="background-demo bg-black">
      <img
        class="w-100% h-100%"
        src="/src/assets/week2-a2.png"
        style="object-fit: contain; object-position: 50% 50%"
      />
    </div>
    </div>
  </div>
</template>

<style scoped>
.background-demo {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: -1;
  border: none;
  pointer-events: none;
}
}
</style>
