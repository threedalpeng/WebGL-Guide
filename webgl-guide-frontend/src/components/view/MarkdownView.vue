<script setup lang="ts">
import MarkdownIt from "markdown-it";

const props = defineProps<{
  markdown: string;
}>();
const md = new MarkdownIt({ breaks: true });
const result = md.render(props.markdown);
</script>

<template>
  <div class="text-left" v-html="result"></div>
</template>

<style></style>
