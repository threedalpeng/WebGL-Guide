<script setup lang="ts">
const focusOnClick = (e: PointerEvent) => {
  console.log("pointerdown");
  (e.target as HTMLIFrameElement).focus();
};
</script>

<template>
  <iframe
    class="background-demo"
    src="/demo/pong"
    tabindex="0"
    @pointerdown="focusOnClick"
  ></iframe>
</template>

<style scoped>
.background-demo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  width: 100vw;
  height: 100vh;
  border: none;
}
</style>
