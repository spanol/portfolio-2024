<template>
  <canvas ref="canvasRef" class="matrix-rain" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationId: number | null = null;

// Character set: Katakana + Latin + Numbers
const katakana =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const chars = katakana + latin + nums;

const fontSize = 10;

interface Column {
  y: number;
  speed: number;
  chars: string[];
  switchTimer: number;
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let columns: Column[] = [];
  let columnCount = 0;

  function randomChar(): string {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function initColumns() {
    columnCount = Math.floor(canvas!.width / fontSize);
    columns = [];
    for (let i = 0; i < columnCount; i++) {
      const trailLen = Math.floor(Math.random() * 15) + 8;
      columns.push({
        y: Math.random() * -100,
        speed: Math.random() * 0.6 + 0.3,
        chars: Array.from({ length: trailLen }, () => randomChar()),
        switchTimer: 0,
      });
    }
  }

  function resize() {
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
    initColumns();
  }

  resize();
  window.addEventListener("resize", resize);

  let lastTime = 0;
  const frameInterval = 50; // ~20fps for authentic matrix feel

  function draw(timestamp: number) {
    if (timestamp - lastTime < frameInterval) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    lastTime = timestamp;

    // Semi-transparent black to create fade trail
    ctx!.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const x = i * fontSize;

      // Randomly switch some characters for the "changing" effect
      col.switchTimer++;
      if (col.switchTimer > 3) {
        col.switchTimer = 0;
        const idx = Math.floor(Math.random() * col.chars.length);
        col.chars[idx] = randomChar();
      }

      // Draw trail characters (from dimmest to brightest)
      const trailLen = col.chars.length;
      for (let j = 0; j < trailLen; j++) {
        const charY = (col.y - (trailLen - 1 - j)) * fontSize;
        if (charY < 0 || charY > canvas!.height) continue;

        const progress = j / (trailLen - 1); // 0 = tail, 1 = head

        if (j === trailLen - 1) {
          // Leading character: bright white-green
          ctx!.fillStyle = "#AAFFAA";
          ctx!.shadowColor = "#00FF41";
          ctx!.shadowBlur = 12;
        } else if (j === trailLen - 2) {
          // Second character: bright green
          ctx!.fillStyle = "#00FF41";
          ctx!.shadowColor = "#00FF41";
          ctx!.shadowBlur = 6;
        } else {
          // Trail: fade from green to dark
          const alpha = 0.15 + progress * 0.7;
          const green = Math.floor(80 + progress * 175);
          ctx!.fillStyle = `rgba(0, ${green}, ${Math.floor(green * 0.25)}, ${alpha})`;
          ctx!.shadowBlur = 0;
        }

        ctx!.font = `${fontSize}px "Courier New", monospace`;
        ctx!.fillText(col.chars[j], x, charY);
      }

      // Reset shadow
      ctx!.shadowBlur = 0;

      // Advance column
      col.y += col.speed;

      // Reset column when it goes off screen
      if ((col.y - col.chars.length) * fontSize > canvas!.height) {
        col.y = Math.random() * -20;
        col.speed = Math.random() * 0.6 + 0.3;
        const trailLen = Math.floor(Math.random() * 15) + 8;
        col.chars = Array.from({ length: trailLen }, () => randomChar());
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  animationId = requestAnimationFrame(draw);

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
    if (animationId !== null) cancelAnimationFrame(animationId);
  });
});
</script>

<style scoped>
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
