<template>
    <canvas ref="threeCanvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
const threeCanvas = ref(null);

onMounted(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 1);

    const renderer = new THREE.WebGLRenderer({
        canvas: threeCanvas.value!,
        alpha: true,
        antialias: true,
    });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new FBXLoader();
    loader.load(
        "/models/spanol-model.fbx",
        (model) => {
            scene.add(model);
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            camera.position.z = center.z + Math.max(size.x, size.y, size.z) * 1.5;

            animate();
        },
        undefined,
        (error) => {
            console.error("Error loading model:", error);
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
});
</script>

<style scoped>
.image-wrapper {
    position: relative;
}

canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>