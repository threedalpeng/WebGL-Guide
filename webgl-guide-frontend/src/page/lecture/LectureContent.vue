<script setup lang="ts"></script>

<template>
  <div class="lecture-content bg-white w-100% h-100%"></div>
</template>

<style scoped>
.lecture-content {
  animation: slideup 1s linear infinite;
  animation-play-state: paused;
}

@keyframes slideup {
  from {
    margin-top: 100vh;
  }

  to {
    margin-top: 0vh;
  }
}
</style>
