<template>
  <section class="about-scene" aria-labelledby="about-heading">
    <div class="about-scene__copy">
      <p class="page-kicker">CAPÍTULO 02 / SOBRE</p>
      <h1 id="about-heading" class="section-title" data-page-focus>
        O CÓDIGO<br />É SÓ O <em>COMEÇO.</em>
      </h1>
      <p class="about-scene__intro">
        Sou Vinicius Spanol. Gosto de entender o problema por inteiro — e construir
        soluções que façam sentido para quem usa e para quem mantém.
      </p>
      <AboutInfos />
    </div>

    <div class="about-scene__portrait">
      <HomeImageComponent />
      <span class="about-scene__caption">PROCESSO / CURIOSIDADE / CÓDIGO</span>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AboutInfos from "@/components/AboutInfos.vue";
import HomeImageComponent from "@/components/HomeImageComponent.vue";
</script>

<style scoped>
.about-scene {
  display: grid;
  min-height: min(100svh - 11rem, 75rem);
  align-items: center;
  grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.72fr);
  gap: clamp(2rem, 7vw, 7rem);
  padding-block: clamp(2.5rem, 7vh, 6rem);
}
.about-scene__copy { max-width: 56rem; }
.about-scene__copy > .page-kicker { margin-bottom: 1.7rem; }
.about-scene__intro {
  max-width: 43rem;
  margin: 1.7rem 0 2.4rem;
  color: hsl(var(--color-muted));
  font-size: clamp(1rem, 1.5vw, 1.18rem);
  line-height: 1.65;
}
.about-scene__portrait {
  position: relative;
  display: grid;
  min-height: 34rem;
  align-items: center;
  justify-items: center;
}
.about-scene__portrait :deep(.hero-object) { width: min(100%, 22rem); }
.about-scene__caption {
  position: absolute;
  right: -0.3rem;
  bottom: 6%;
  color: hsl(var(--color-muted));
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  writing-mode: vertical-rl;
}
@media (max-width: 820px) {
  .about-scene {
    grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.72fr);
    gap: 1.5rem;
  }
  .about-scene__portrait { min-height: 28rem; }
}
@media (max-width: 640px) {
  .about-scene {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.8rem;
    padding-block: 2.2rem;
  }
  .about-scene__copy > .page-kicker { margin-bottom: 1.35rem; }
  .about-scene__intro { margin-block: 1.3rem 1.8rem; }
  .about-scene__portrait {
    min-height: 23rem;
    justify-items: end;
    margin-right: 1rem;
  }
  .about-scene__portrait :deep(.hero-object) { width: min(74vw, 19rem); }
}
</style>
