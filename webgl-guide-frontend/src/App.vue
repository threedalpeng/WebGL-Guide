<script setup lang="ts">
import LecturePage from "./page/lecture/LecturePage.vue";
import MarkdownView from "./components/view/MarkdownView.vue";
const sampleData = {
  title: "hi",
  markdown: `# hi
  ## Welcome Friends`,
};
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <div>
      <h1>WebGL Study</h1>
    </div>
    <LecturePage />
    <div class="lecture-content-wrapper p-8">
      <MarkdownView :title="sampleData.title" :markdown="sampleData.markdown" />
    </div>
  </div>
</template>

<style>
:root {
  --theme-bg-color: #b4dedf;
}

body {
  background-color: var(--theme-bg-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.lecture-content-wrapper {
  background-color: white;
  border-radius: 39px;
  box-shadow: 19px 19px 40px #8eafb0, -19px -19px 40px #daffff;
  width: 80vw;
}
</style>
