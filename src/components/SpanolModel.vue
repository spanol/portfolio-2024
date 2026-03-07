<template>
  <canvas ref="canvasRef" class="blob-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { usePrimaryColor } from "@/composables/usePrimaryColor";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { hue } = usePrimaryColor();

let renderer: THREE.WebGLRenderer | null = null;
let animationId: number | null = null;

const vertexShader = `
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uDisplacement;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Simplex 3D noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float noise = snoise(normal * uNoiseScale + uTime * 0.4);
    noise += 0.5 * snoise(normal * uNoiseScale * 2.0 + uTime * 0.3);
    noise += 0.25 * snoise(normal * uNoiseScale * 4.0 + uTime * 0.2);

    float displacement = noise * uDisplacement;
    vDisplacement = noise;

    vec3 newPosition = position + normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uHue;
  uniform float uIsDark;
  uniform float uIsMatrix;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

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
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);

    // Base color from dynamic hue
    vec3 baseColor = hsl2rgb(uHue, 0.8, 0.5);

    // Shift hue slightly based on displacement for depth
    float hueShift = vDisplacement * 30.0;
    vec3 shiftedColor = hsl2rgb(mod(uHue + hueShift, 360.0), 0.7, 0.4);

    // Brighter edge glow
    vec3 glowColor = hsl2rgb(uHue, 0.9, 0.7);

    // Matrix override: use matrix green palette
    if (uIsMatrix > 0.5) {
      baseColor = vec3(0.0, 1.0, 0.255);
      shiftedColor = vec3(0.0, 0.6 + vDisplacement * 0.4, 0.1);
      glowColor = vec3(0.4, 1.0, 0.5);
    }

    // Combine: body color + fresnel glow
    vec3 color = mix(shiftedColor, baseColor, vDisplacement * 0.5 + 0.5);
    color = mix(color, glowColor, fresnel * 0.8);

    // Subtle specular highlight
    vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
    color += spec * 0.3;

    // Ambient intensity based on theme
    float ambientBoost = mix(0.15, 0.05, uIsDark);
    // Matrix: even darker ambient for contrast
    ambientBoost = mix(ambientBoost, 0.02, uIsMatrix);
    color += ambientBoost;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}

function isMatrixMode(): boolean {
  return document.documentElement.getAttribute("data-theme") === "matrix";
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 3.2;

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(400, 400);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new THREE.IcosahedronGeometry(1, 64);

  const uniforms = {
    uTime: { value: 0 },
    uNoiseScale: { value: 1.5 },
    uDisplacement: { value: 0.35 },
    uHue: { value: hue.value },
    uIsDark: { value: isDarkMode() ? 1.0 : 0.0 },
    uIsMatrix: { value: isMatrixMode() ? 1.0 : 0.0 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Wireframe overlay for extra detail
  const wireMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: `
      precision highp float;
      uniform float uHue;
      uniform float uIsMatrix;

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
        vec3 color = hsl2rgb(uHue, 0.6, 0.7);
        // Matrix: green wireframe
        if (uIsMatrix > 0.5) {
          color = vec3(0.0, 1.0, 0.255);
        }
        gl_FragColor = vec4(color, 0.08);
      }
    `,
    uniforms,
    wireframe: true,
    transparent: true,
  });

  const wireGeo = new THREE.IcosahedronGeometry(1, 16);
  const wireMesh = new THREE.Mesh(wireGeo, wireMaterial);
  scene.add(wireMesh);

  // Theme observer
  const observer = new MutationObserver(() => {
    uniforms.uIsDark.value = isDarkMode() ? 1.0 : 0.0;
    uniforms.uIsMatrix.value = isMatrixMode() ? 1.0 : 0.0;
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });

  function animate() {
    uniforms.uTime.value += 0.012;
    uniforms.uHue.value = hue.value;

    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.001;
    wireMesh.rotation.y = mesh.rotation.y;
    wireMesh.rotation.x = mesh.rotation.x;

    renderer!.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  animate();
});

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.blob-canvas {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
}
</style>
