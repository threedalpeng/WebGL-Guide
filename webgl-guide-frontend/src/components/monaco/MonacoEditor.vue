<script lang="ts" setup>
import { onMounted, ref } from "vue";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const editorContainer = ref<HTMLElement | null>(null);
onMounted(() => {
  console.log(editorContainer.value);
  if (editorContainer.value !== null) {
    console.log(editorContainer.value);
    monaco.editor.create(editorContainer.value, {
      value: "javascript",
      language: "javascript",
      glyphMargin: true,
    });
  }
});
</script>

<template>
  <div id="monaco-editor" ref="editorContainer"></div>
</template>

<style>
#monaco-editor {
  width: 80vw;
  height: 60vh;
  text-align: left;
}
</style>
