<script setup lang="ts"></script>

<template>
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback> loading... </template>
  </Suspense>
</template>

<style>
body {
  width: 100vw;
  margin: 0;
}

#app {
  font-family: "Noto Sans KR", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.scrollbar-hide {
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
