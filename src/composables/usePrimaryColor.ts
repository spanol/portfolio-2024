import { ref, watch, onUnmounted } from "vue";
import { useTheme } from "./useTheme";

const hue = ref(0);
const milliseconds = 110;

export function usePrimaryColor() {
  const { isMatrix } = useTheme();

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
      if (isMatrix.value) {
        // Lock to green hue (120°) in matrix mode
        hue.value = 120;
      } else {
        hue.value = (hue.value + 1) % 360;
      }
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
