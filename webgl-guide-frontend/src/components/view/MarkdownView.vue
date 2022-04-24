<script setup lang="ts">
import MarkdownIt from "markdown-it";

const props = defineProps<{
  title: string;
  content: string;
}>();
const md = new MarkdownIt({ breaks: true });
const result = md.render(props.content);
</script>

<template>
  <div class="text-left" v-html="result"></div>
</template>

<style></style>
