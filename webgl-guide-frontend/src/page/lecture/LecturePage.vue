<script setup lang="ts">
import { useRoute } from "vue-router";
import MarkdownView from "../../components/view/MarkdownView.vue";
const sampleData = {
  title: "hi",
  markdown: `# hi
  ## Welcome Friends`,
};
const route = useRoute();
const id = route.params.id;
</script>

<template>
  <div>
    {{ id }}
    <div class="lecture-content-wrapper p-8">
      <MarkdownView :title="sampleData.title" :markdown="sampleData.markdown" />
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
