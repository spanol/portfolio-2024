<template>
  <section class="home-view" aria-labelledby="home-heading">
    <div class="home-view__poster">
      <div class="home-view__copy">
        <p class="home-view__kicker"><span>01</span> DESENVOLVEDOR FULLSTACK</p>
        <HomeHeading :contact-icons="contactIcons" />
      </div>
      <HomeImageComponent />
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
.home-view {
  display: grid;
  min-height: 100%;
  grid-template-rows: minmax(0, 1fr) auto;
  padding: clamp(1.25rem, 4.5cqi, 2.4rem);
}

.home-view__poster {
  display: grid;
  align-items: end;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
  gap: clamp(1rem, 3cqi, 2rem);
  padding-block: 0.4rem 1.25rem;
}

.home-view__copy {
  min-width: 0;
  align-self: center;
  padding-bottom: 0.75rem;
}

.home-view__kicker {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: clamp(1rem, 2.7cqi, 1.8rem);
  color: hsl(var(--color-primary-ink));
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.home-view__kicker span {
  display: grid;
  width: 1.55rem;
  height: 1.55rem;
  place-items: center;
  background: hsl(var(--color-primary));
  color: hsl(var(--color-on-primary));
  font-size: 0.68rem;
}

@container (max-width: 540px) {
  .home-view {
    grid-template-rows: auto auto;
  }

  .home-view__poster {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.4rem;
    padding-bottom: 0.9rem;
  }

  .home-view__copy {
    order: 0;
  }

  .home-view__poster :deep(.portrait-object) {
    order: 1;
    justify-self: end;
    width: 56%;
    margin-top: -0.5rem;
  }

  .home-view__kicker {
    margin-bottom: 0.8rem;
  }
}
</style>
