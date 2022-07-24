import { defineStore } from "pinia";
import { ref } from "vue";

export const useLectureStore = defineStore("lecture", () => {
  const isDemoFocused = ref(false);
  return { isDemoFocused };
});
