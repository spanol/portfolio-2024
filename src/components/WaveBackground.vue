<template>
  <div ref="containerRef" class="wave-container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";
import { usePrimaryColor } from "@/composables/usePrimaryColor";

const containerRef = ref<HTMLDivElement | null>(null);
const { hue } = usePrimaryColor();

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.OrthographicCamera | null = null;
let material: THREE.ShaderMaterial | null = null;
let animationId: number | null = null;
let resizeObserver: ResizeObserver | null = null;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uHue;
  uniform float uIsDark;

  vec3 hsl2rgb(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h / 60.0, 2.0) - 1.0));
    float m = l - c / 2.0;
    vec3 rgb;
    if (h < 60.0) rgb = vec3(c, x, 0.0);
    else if (h < 120.0) rgb = vec3(x, c, 0.0);
    else if (h < 180.0) rgb = vec3(0.0, c, x);
    else if (h < 240.0) rgb = vec3(0.0, x, c);
    else if (h < 300.0) rgb = vec3(x, 0.0, c);
    else rgb = vec3(c, 0.0, x);
    return rgb + m;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    // Theme-aware background
    vec3 bgColor = mix(vec3(1.0), vec3(0.102), uIsDark);

    // Wave primary color
    vec3 waveColor = hsl2rgb(uHue, 0.75, 0.45);

    // Consistent sinusoidal wave distortion
    float t = uTime;
    float wave = sin(uv.x * 6.2832 * 2.0 + t) * 0.06
               + sin(uv.x * 6.2832 * 3.0 - t * 0.7) * 0.03;

    // Uniform stripe pattern
    float stripeY = uv.y + wave;
    float band = fract(stripeY * 8.0);
    float pattern = smoothstep(0.4, 0.45, band) - smoothstep(0.55, 0.6, band);
    pattern = 1.0 - pattern;

    // Blend wave color with background
    vec3 color = mix(waveColor, bgColor, pattern);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}

function initScene() {
  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          width * window.devicePixelRatio,
          height * window.devicePixelRatio
        ),
      },
      uHue: { value: hue.value },
      uIsDark: { value: isDarkMode() ? 1.0 : 0.0 },
    },
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Watch theme changes via MutationObserver
  const observer = new MutationObserver(() => {
    if (material) {
      material.uniforms.uIsDark.value = isDarkMode() ? 1.0 : 0.0;
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Resize handling
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width: w, height: h } = entry.contentRect;
      if (renderer && material) {
        renderer.setSize(w, h);
        material.uniforms.uResolution.value.set(
          w * window.devicePixelRatio,
          h * window.devicePixelRatio
        );
      }
    }
  });
  resizeObserver.observe(container);
}

function animate() {
  if (!renderer || !scene || !camera || !material) return;

  material.uniforms.uTime.value += 0.035;
  material.uniforms.uHue.value = hue.value;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  initScene();
  animate();
});

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId);
  if (resizeObserver) resizeObserver.disconnect();
  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }
  if (material) material.dispose();
});
</script>

<style scoped>
.wave-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.wave-container :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
