<script setup lang="ts">
import Header from "./components/view/Header.vue"
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <Header v-if="$route.name != 'lecture'"></Header>
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback> loading... </template>
    </Suspense>
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
</style>
