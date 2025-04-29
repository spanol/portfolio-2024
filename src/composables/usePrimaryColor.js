import { ref, watch } from 'vue';

const hue = ref(0); 
const miliseconds = 110; 

export function usePrimaryColor() {
  watch(hue, (newHue) => {
    document.documentElement.style.setProperty('--color-primary', `${newHue} 70% 40%`);
  }, { immediate: true });

  function animateHue() {
    setInterval(() => {
      hue.value = (hue.value + 1) % 360;
    }, miliseconds);
  }

  return {
    hue,
    animateHue
  };
}