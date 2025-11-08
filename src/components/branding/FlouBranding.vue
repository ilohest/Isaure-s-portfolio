<template>
  <div id="app" class="main flex flex-col gap-4">
    <div class="image-wrapper-xl m-0 p-0 md:my-6">
      <img src="@/assets/img/flou1.png" alt="Flou " class="m-auto" />
    </div>

    <!-- Project summary with PrimeVue Card + Tailwind, layout conservé -->
    <Card
      class="border-round-xl font-[Red Hat Text] bg-[var(--blue-bg)] font-light text-[var(--light-content)] shadow-none"
    >
      <template #content>
        <div class="flex p-4 md:p-6">
          <!-- Colonne gauche : Responsibilities + About -->
          <div class="col-3 flex flex-col gap-4">
            <section>
              <h3 class="mb-2 tracking-wide uppercase">Responsibilities</h3>
              <ul class="list-inside list-disc pl-6 text-base">
                <li>Visual identity</li>
                <li>Art direction</li>
              </ul>
            </section>

            <section>
              <h3 class="mb-2 tracking-wide uppercase">About</h3>
              <div class="flex flex-col gap-1 text-base">
                <p><i>Client: </i>Flouwers</p>
                <p><i>Sector: </i>Floral scenography</p>
                <p><i>Country: </i>Belgium</p>
                <p><i>Instagram: </i>@f.lou.wers</p>
              </div>
            </section>
          </div>

          <!-- Colonne centre : Project -->
          <div class="col-4">
            <h3 class="mb-2 tracking-wide uppercase">Project</h3>
            <p class="text-sm">
              Flou brings a poetic touch to floral design, where emotion meets artistry. Founded by
              Mary-Lou, this Brussels-based floral studio crafts refined, imaginative compositions
              that blend texture, color, and whimsy in perfect balance. From bespoke bouquets to
              immersive event scenography, every creation embodies her signature mix of intuition
              and precision. Whether for weddings, birthdays, or intimate gatherings, Flou
              transforms spaces into living art, fleeting yet unforgettable.
            </p>
          </div>

          <!-- Colonne droite : Branding -->
          <div class="col-5">
            <h3 class="mb-2 tracking-wide uppercase">Branding</h3>
            <p class="text-base">
              The identity of Flou translates Mary-Lou’s floral world into a sensory, living brand.
              The logo, composed of organic petals cut from a rectangle, captures both structure and
              spontaneity, like a bouquet balanced between precision and wildness. Its negative
              space allows it to morph with its background, blending into photographs and textures
              to echo the natural flow of petals, light, and movement. Typography combines softness
              and character. The color palette — a dialogue between mulberry, dark purple, and moss
              green — celebrates nature in all its contrasts: lush, daring, and tender. The result
              is a brand that feels alive, playful yet elegant, earthy yet poetic. "Half Lou, half
              mad, 100% Flou".
            </p>
          </div>
        </div>
      </template>
    </Card>

    <!-- Masonry gallery -->
    <section class="masonry">
      <div class="masonry-item">
        <img src="@/assets/img/flou-1.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-15.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-2.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-3.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-16.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-4.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-17.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-5.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-6.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-21.png" alt="Flou" loading="lazy" class="no-radius" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-13.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-7.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-8.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-9.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-10.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-12.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-11.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-14.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-18.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-19.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-20.png" alt="Flou" loading="lazy" />
      </div>
      <div class="masonry-item">
        <img src="@/assets/img/flou-22.png" alt="Flou" loading="lazy" />
      </div>

      <div class="masonry-item">
        <img src="@/assets/img/flou-palette.png" alt="Elinor 11" loading="lazy" />
      </div>
    </section>

    <!-- Brandbook -->
    <img src="@/assets/img/flou-brandbook.png" alt="Flou brandbook" class="border-round-xl" />

    <br />
    <br />

    <div class="check">
      <router-link class="button" to="/achievements/branding">Back to projects</router-link>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import Card from 'primevue/card';

export default {
  name: 'ElinorBranding',
  components: {
    Card,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.image-wrapper-xl {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15rem 0;
  margin: 3rem 0;
}

.check {
  display: flex;
  justify-content: center;
}
.button {
  text-align: center;
  text-decoration: none;
  display: block;
  margin: 0px auto;
  background-color: var(--brat);
  color: var(--red) !important;
  padding: 8px 20px;
  border: 2px solid;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: var(--fs-18);
  letter-spacing: 0.05em;
  font-family: 'Chakra Petch', sans-serif;
}
.button:hover {
  background: var(--brat-hover);
}

/* Masonry responsive: 4 / 3 / 2 colonnes */
.masonry {
  column-count: 4;
  column-gap: 1rem;
  border-radius: 10px;
}

.masonry-item {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: 1rem;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px; /* cohérent avec tes images */
}

/* Tablet ≤ 970px: 3 colonnes */
@media (max-width: 970px) {
  .masonry {
    column-count: 3;
  }
}

/* Mobile ≤ 628px: 2 colonnes */
@media (max-width: 628px) {
  .masonry {
    column-count: 2;
    column-gap: 0.75rem;
  }
}

.masonry-item img.no-radius,
img.no-radius {
  border-radius: 0 !important;
}
</style>
