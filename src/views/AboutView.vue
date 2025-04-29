<template>
  <div class="about my-auto dark:bg-dark-background dark:text-dark-text">
    <div
      class="about flex flex-col-reverse xl:flex-row justify-center items-center gap-32"
    >
      <div class="image-wrapper hidden xl:block">
        <canvas ref="threeCanvas"></canvas>
      </div>

      <div class="infos flex flex-col gap-y-10 lg:w-2/4">
        <h1 class="font-bold text-3xl text-center mt-8 lg:mt-0">
          Olá! Eu sou Vinicius Spanol ╰(*°▽°*)╯
        </h1>

        <div class="text-xl text-light dark:text-dark-text mt-3">
          <span>
            Meu nome é Vinicius, sou desenvolvedor fullstack apaixonado por
            criar aplicações limpas, seguras e inovadoras. Tenho experiência
            profissional com Angular e .NET Framework, e me destaco na
            utilização de bibliotecas de estilização como Tailwind e Bootstrap
            para entregar interfaces modernas e funcionais.
          </span>

          <br />
          <br />

          <span>
            No backend, já trabalhei profissionalmente com C# .NET e NestJS, e
            desenvolvi pequenos projetos utilizando Node.js (Express) e Flask.
            Também possuo experiência com bancos de dados NoSQL, como MongoDB, e
            SQL, com Oracle.
          </span>
          <br />
          <br />

          <span>
            Ao longo da minha carreira, explorei também o ecossistema de
            frameworks como React e Vue, além de consolidar minha experiência
            com Angular. No campo dos bancos de dados, já trabalhei com soluções
            NoSQL, como MongoDB, e SQL, com Oracle.
          </span>
        </div>
      </div>
    </div>
  </div>
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
