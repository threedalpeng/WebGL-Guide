<script setup lang="ts">
import { vScroll } from "@vueuse/components";
import { TransitionPresets, useTransition } from "@vueuse/core";
import { computed, ref, StyleValue } from "vue";

const MIN_SEQ = 1;
const seq = ref(1);
const CNT_SEQ = 10;
const gap = "4em";

const isSidebarOpen = ref(false);

const openSidebar = (e: MouseEvent) => {
  e.preventDefault();
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = (e: MouseEvent) => {
  e.preventDefault();
};

const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    seq.value = seq.value > MIN_SEQ ? seq.value - 1 : MIN_SEQ;
  } else if (e.deltaY > 0) {
    seq.value = seq.value < CNT_SEQ ? seq.value + 1 : CNT_SEQ;
  }
};

const RADIUS_PX = 500;
const DEG_TO_RAD = Math.PI / 180;
const getGalleryItemStyle: (i: number) => StyleValue = (currentSeq) => {
  const diff = currentSeq - seq.value;
  const gap = diff > 0 ? diff : -diff;
  const angle = 20 * diff * DEG_TO_RAD;
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  return {
    left: "0",
    top: `calc(50% + ${RADIUS_PX * s}px)`,
    transform: `translateY(-50%) scale(${c})`,
    opacity: `${1 - gap / 3}`,
    "z-index": 5 - gap,
    transition: `top 0.3s ease, transform 0.3s ease, opacity 0.2s ease, z-index 0.1s`,
  };
};
</script>

<template>
  <div class="lecture-sidebar">
    <div
      class="position-absolute text-20 color-white margin-none left-20px top-50% transform -translate-y-50%"
      @click="openSidebar"
    >
      <img
        class="transform"
        :class="{ '-rotate-y-180': isSidebarOpen }"
        style="transition: all 0.3 ease"
        src="../../assets/icons/opener2.svg"
      />
    </div>
    <div
      v-show="isSidebarOpen"
      ref="galleryRef"
      class="lecture-sidebar-gallery w-300px"
      @wheel="onWheel"
    >
      <template
        v-for="i in [...Array(CNT_SEQ).keys()].map((i) => i + 1)"
        :key="i"
      >
        <div
          v-if="Math.abs(i - seq) <= 3"
          class="lecture-sidebar-gallery-item color-blue h-200px w-300px flex flex-col justify-center"
          :style="getGalleryItemStyle(i)"
        >
          <img
            class="h-75px object-contain object-center"
            src="../../assets/logo.png"
            style="pointer-events: none; user-select: none"
          />
          <h3 class="text-center">hihi</h3>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.lecture-sidebar {
  position: fixed;
  height: 100vh;

  top: 0;
  border: none;
  transition: left 0.3s ease;
}

.lecture-sidebar-gallery {
  position: absolute;

  top: 0;
  left: 100px;

  height: 100%;
  width: max-content;

  display: flex;
  align-items: center;
  justify-content: center;
}

.lecture-sidebar-gallery-item {
  position: absolute;

  border-radius: 21px;
  background: #3a3737;
  opacity: 0;
}
</style>
