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
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

body {
  width: 100vw;
  margin: 0;
}

#app {
  font-family: "Spoqa Han Sans Neo", "Noto Sans KR", Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  overflow: hidden;
}
</style>
