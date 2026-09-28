<template>
  <section class="home-scene" aria-labelledby="home-heading">
    <div class="home-scene__copy">
      <p class="page-kicker">ENGENHARIA DE SOFTWARE / PORTFÓLIO</p>
      <HomeHeading :contact-icons="contactIcons" />
    </div>

    <div class="home-scene__visual">
      <HomeImageComponent />
      <span class="home-scene__visual-note" aria-hidden="true">VOLUME 01 / VINICIUS SPANOL</span>
    </div>

    <HomeTechnologies :tech-stack-icons="techStackIcons" />
  </section>
</template>

<script setup>
import HomeHeading from "@/components/HomeHeading.vue";
import HomeImageComponent from "@/components/HomeImageComponent.vue";
import HomeTechnologies from "@/components/HomeTechnologies.vue";
import { contactIcons } from "@/data/contactIcons";

const techStackIcons = [
  {
    name: "HTML",
    icon: "vi-file-type-html",
  },
  {
    name: "CSS",
    icon: "vi-file-type-css",
  },

  {
    name: "TypeScript",
    icon: "vi-file-type-typescript",
  },
  {
    name: "C#",
    icon: "vi-file-type-csharp",
  },
  {
    name: "Angular",
    icon: "vi-file-type-angular",
  },
  {
    name: ".NET",
    icon: "si-dotnet",
  },
  {
    name: "NestJS",
    icon: "vi-file-type-nestjs",
  },
  {
    name: "Arduino",
    icon: "vi-file-type-arduino",
  },
  {
    name: "Docker",
    icon: "vi-file-type-docker",
  },
];
</script>

<style scoped>
.home-scene {
  display: grid;
  min-height: min(100svh - 11rem, 75rem);
  align-items: center;
  grid-template-columns: minmax(0, 1.12fr) minmax(19rem, 0.88fr);
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 1.5rem clamp(2rem, 6vw, 7rem);
  padding-block: clamp(2rem, 5vh, 4rem) 1.25rem;
}

.home-scene__copy {
  position: relative;
  z-index: 2;
  min-width: 0;
  padding-block: 1rem 2rem;
}

.home-scene__visual {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 29rem;
  align-items: center;
  justify-items: center;
}

.home-scene__visual::before {
  position: absolute;
  width: min(31rem, 92%);
  aspect-ratio: 1;
  border: 1px solid hsl(var(--color-primary) / 0.2);
  border-radius: 50%;
  box-shadow: 0 0 0 2.5rem hsl(var(--color-primary) / 0.035);
  content: "";
}

.home-scene__visual-note {
  position: absolute;
  right: 0;
  bottom: 1rem;
  color: hsl(var(--color-muted));
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  writing-mode: vertical-rl;
}

.home-scene :deep(.technology-strip) {
  grid-column: 1 / -1;
}

@media (max-width: 850px) {
  .home-scene {
    grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.75fr);
    gap: 1rem 2rem;
  }

  .home-scene__visual {
    min-height: 25rem;
  }
}

@media (max-width: 640px) {
  .home-scene {
    min-height: 0;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto;
    gap: 1rem;
    padding-block: 2.2rem 1rem;
  }

  .home-scene__copy {
    padding: 0.5rem 0 0;
  }

  .home-scene__visual {
    min-height: 20rem;
    justify-items: end;
    margin-right: 0.75rem;
  }

  .home-scene__visual::before {
    right: 3%;
    width: min(75vw, 21rem);
  }

  .home-scene__visual-note {
    right: -0.7rem;
    bottom: 0.5rem;
  }
}
</style>
