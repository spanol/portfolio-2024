<template>
  <div class="about-notes">
    <section class="about-note">
      <h2>Interface</h2>
      <p>Angular, React, Vue, TypeScript, Tailwind e Bootstrap.</p>
    </section>
    <section class="about-note">
      <h2>Serviços</h2>
      <p>C#, .NET, NestJS, Node.js, Express e Flask.</p>
    </section>
    <section class="about-note">
      <h2>Dados &amp; integração</h2>
      <p>PostgreSQL, MongoDB, Oracle e RabbitMQ.</p>
    </section>
  </div>
</template>

<style scoped>
.about-notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid hsl(var(--color-line));
}
.about-note {
  min-width: 0;
  padding: 1rem 1rem 0 0;
}
.about-note + .about-note {
  border-left: 1px solid hsl(var(--color-line));
  padding-left: 1rem;
}
.about-note h2 {
  margin: 0;
  color: hsl(var(--color-primary-ink));
  font-size: 0.6rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.about-note p {
  margin: 0.6rem 0 0;
  color: hsl(var(--color-muted));
  font-size: 0.78rem;
  line-height: 1.55;
}
@media (max-width: 640px) {
  .about-notes { grid-template-columns: minmax(0, 1fr); }
  .about-note { padding: 0.85rem 0; }
  .about-note + .about-note { border-top: 1px solid hsl(var(--color-line)); border-left: 0; padding-left: 0; }
}
</style>
