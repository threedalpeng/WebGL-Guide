<script setup lang="ts">
import { useTransition, watchDebounced } from "@vueuse/core";
import { reactive, ref, StyleValue } from "vue";

const MIN_SEQ = 1;
const CNT_SEQ = 10;
const seq = ref<number>(1);
const changeSeq = (delta: number) => {
  let newSeq = seq.value + delta;
  seq.value = Math.min(Math.max(newSeq, MIN_SEQ), CNT_SEQ);
};

const isSidebarOpen = ref(false);
const toggleSidebar = (e: MouseEvent) => {
  e.preventDefault();
  isSidebarOpen.value = !isSidebarOpen.value;
};

const onWheel = (e: WheelEvent) => {
  changeSeq(e.deltaY > 0 ? 1 : -1);
};

interface SwipePoint {
  x: number;
  y: number;
}
const isSwiping = ref(false);
const prevSwipePoint = reactive<SwipePoint>({ x: 0, y: 0 });
const onSwipeStart = (e: PointerEvent) => {
  prevSwipePoint.x = e.x;
  prevSwipePoint.y = e.y;
  isSwiping.value = true;
};
const onSwiping = (e: PointerEvent) => {
  if (isSwiping.value) {
    changeSeq((prevSwipePoint.y - e.y) / 100);
    prevSwipePoint.x = e.x;
    prevSwipePoint.y = e.y;
  }
};
const onSwipeEnd = (e: PointerEvent) => {
  if (isSwiping.value) {
    isSwiping.value = false;
  }
};

watchDebounced(
  [seq, isSwiping],
  ([currentSeq, currentIsSwiping], [oldSeq, oldIsSwiping]) => {
    if (!currentIsSwiping) {
      seq.value = Math.round(currentSeq as number);
    }
  },
  { debounce: 100 }
);
const animatedSeq = useTransition(seq, { duration: 300 });
const RADIUS_PX = 500;
const DEG_TO_RAD = Math.PI / 180;
const getGalleryItemStyle: (
  i: number
) => { [key: string]: any } & StyleValue = (currentSeq) => {
  const diff = currentSeq - (isSwiping.value ? seq.value : animatedSeq.value);
  const gap = diff > 0 ? diff : -diff;
  const angle = 20 * diff * DEG_TO_RAD;
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  return {
    "--translate-offset": `${RADIUS_PX * s}px`,
    "--scale": c,
    "--gap": gap,
  };
};
</script>

<template>
  <div class="lecture-sidebar">
    <div
      class="position-absolute text-20 color-white margin-none left-20px top-50% transform -translate-y-50%"
      @click="toggleSidebar"
    >
      <img
        class="transform"
        :class="{ '-rotate-y-180': isSidebarOpen }"
        style="transition: all 0.4s ease"
        src="../../assets/icons/opener2.svg"
      />
    </div>
    <div
      v-show="isSidebarOpen"
      ref="galleryRef"
      class="lecture-sidebar-gallery w-300px"
      @wheel.prevent="onWheel"
      @pointerdown.prevent="onSwipeStart"
      @pointermove.prevent="onSwiping"
      @pointerup.prevent="onSwipeEnd"
      @pointerleave.prevent="onSwipeEnd"
    >
      <template
        v-for="i in [...Array(CNT_SEQ).keys()].map((i) => i + 1)"
        :key="i"
      >
        <div
          v-show="Math.abs(i - seq) <= 3"
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

  display: flex;
  align-items: center;
  justify-content: center;

  touch-action: none;
}

.lecture-sidebar-gallery-item {
  position: absolute;

  border-radius: 21px;
  /* border-radius: 50px; */

  background: #3a3737;
  /* box-shadow: 31px 31px 24px #322f2f, -31px -31px 24px #423f3f; */

  left: 0;
  top: calc(50% + var(--translate-offset));
  transform: translateY(-50%) scale(var(--scale));
  opacity: calc(1 - var(--gap) / 3);
  z-index: calc(5 - var(--gap));
  /*transition: top 0.1s ease, transform 0.1s ease, opacity 0.1s ease,
    z-index 0.1s;*/
}
</style>
