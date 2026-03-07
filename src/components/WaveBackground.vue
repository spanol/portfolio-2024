<template>
  <canvas ref="canvasRef" class="wave-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { usePrimaryColor } from "@/composables/usePrimaryColor";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { hue } = usePrimaryColor();
let animationId: number | null = null;
let time = 0;

function draw() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const currentHue = hue.value;

  ctx.clearRect(0, 0, width, height);

  // Dark base fill
  ctx.fillStyle = `hsl(${currentHue}, 30%, 8%)`;
  ctx.fillRect(0, 0, width, height);

  const waveCount = 14;
  const amplitude = width * 0.12;
  const waveSpacing = height / (waveCount - 1);

  for (let i = 0; i < waveCount; i++) {
    const isColored = i % 2 === 0;
    const baseY = i * waveSpacing;

    ctx.beginPath();

    // Start from below the previous wave
    ctx.moveTo(0, baseY - waveSpacing * 0.5);

    // Draw the wave shape across the width
    for (let x = 0; x <= width; x += 2) {
      const normalizedX = x / width;
      const waveOffset = i * 0.8;
      const y =
        baseY +
        Math.sin(normalizedX * Math.PI * 3 + time + waveOffset) * amplitude +
        Math.sin(normalizedX * Math.PI * 1.5 + time * 0.7 + waveOffset) *
          amplitude *
          0.5;
      ctx.lineTo(x, y);
    }

    // Close the path filling downward
    ctx.lineTo(width, baseY + waveSpacing * 1.5);
    ctx.lineTo(0, baseY + waveSpacing * 1.5);
    ctx.closePath();

    if (isColored) {
      ctx.fillStyle = `hsl(${currentHue}, 75%, 45%)`;
    } else {
      ctx.fillStyle = `hsl(${currentHue}, 30%, 8%)`;
    }
    ctx.fill();
  }

  time += 0.015;
  animationId = requestAnimationFrame(draw);
}

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const parent = canvas.parentElement;
  if (!parent) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = parent.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) ctx.scale(dpr, dpr);
}

onMounted(() => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  draw();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
});
</script>

<style scoped>
.wave-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
