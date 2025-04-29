import { ref, watch, onUnmounted } from "vue";

const hue = ref(0);
const milliseconds = 110;

export function usePrimaryColor() {
  watch(
    hue,
    (newHue) => {
      document.documentElement.style.setProperty(
        "--color-primary",
        `${newHue} 70% 40%`
      );
    },
    { immediate: true }
  );

  function animateHue() {
    const intervalId = setInterval(() => {
      hue.value = (hue.value + 1) % 360;
    }, milliseconds);

    onUnmounted(() => {
      clearInterval(intervalId);
    });
  }

  return {
    hue,
    animateHue,
  };
}
