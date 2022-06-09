<script setup lang="ts"></script>

<template>
  <iframe class="background-demo" src="/demo/pong" tabindex="0"></iframe>
</template>

<style scoped>
.background-demo {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  border: none;
  z-index: -1;
}
</style>
