<script setup lang="ts">
import { useCssVar } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useLectureStore } from "../../store/LectureStore";

const backgroundDemoRef = ref<HTMLIFrameElement | null>(null);
const backgroundMaskRef = ref<HTMLDivElement | null>(null);
const backgroundMaskAlpha = useCssVar("--mask-alpha", backgroundMaskRef);

const lectureStore = useLectureStore();
const focusToDemo = () => {
  if (!lectureStore.isDemoFocused) {
    lectureStore.isDemoFocused = true;
    backgroundMaskAlpha.value = "0";
    backgroundMaskRef.value?.style.setProperty(
      "transition",
      "background-color 1s ease, visibility 0s ease 1s"
    );
    backgroundMaskRef.value?.style.setProperty("visibility", "hidden");
    backgroundDemoRef.value?.contentDocument?.body
      .querySelector("canvas")
      ?.focus();
  }
};

const unfocusFromDemo = () => {
  if (lectureStore.isDemoFocused) {
    lectureStore.isDemoFocused = false;
    backgroundMaskAlpha.value = "0.15";
    backgroundMaskRef.value?.style.setProperty(
      "transition",
      "background-color 1s ease"
    );
    backgroundMaskRef.value?.style.setProperty("visibility", "visible");
    backgroundMaskRef.value?.focus();
    window.scrollTo({ top: 0 });
  }
};
</script>

<template>
  <div class="background-screen">
    <div
      ref="backgroundMaskRef"
      class="background-mask"
      @pointerdown="focusToDemo"
    ></div>
    <svg
      viewBox="0 0 50 50"
      class="background-demo-back"
      v-if="lectureStore.isDemoFocused"
      @pointerdown="unfocusFromDemo"
    >
      <rect width="50" height="50" style="fill: #fff"></rect>
    </svg>
    <iframe
      ref="backgroundDemoRef"
      class="background-demo"
      src="/demo/pong"
    ></iframe>
  </div>
</template>

<style scoped>
.background-screen {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.background-mask {
  --mask-alpha: 0.15;

  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, var(--mask-alpha));

  transition: background-color 1s ease, visibility 0s ease 1s;
}

.background-demo-back {
  position: absolute;

  left: 25px;
  top: 25px;

  width: 50px;
  height: 50px;
}
.background-demo {
  display: block;
  width: 100vw;
  height: 100vh;
  border: none;
}
</style>
