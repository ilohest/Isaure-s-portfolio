<template>
  <div id="app" class="main flex flex-col gap-4">
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor1.png"
        alt="Elinor 1"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <!-- Project summary -->
    <Card
      class="border-round-xl bg-[var(--blue-bg)] font-['Red_Hat_Text'] font-light text-[var(--light-content)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:flex-row md:p-6">
          <div class="flex w-full flex-col gap-4 md:w-3/12">
            <section>
              <h3 class="mb-2 uppercase">Responsibilities</h3>
              <ul class="list-inside list-disc pl-6 text-base">
                <li>Visual identity</li>
                <li>Art direction</li>
                <li>Social network templates</li>
              </ul>
            </section>

            <section>
              <h3 class="mb-2 uppercase">About</h3>

              <div class="flex flex-col gap-1 text-base">
                <p><i>Client: </i>Elinor kinésiologie</p>
                <p><i>Sector: </i>Health &amp; wellness</p>
                <p><i>Country: </i>Belgium</p>
              </div>
            </section>
          </div>

          <div class="md:w-4/12">
            <h3 class="mb-2 uppercase">Project</h3>
            <p>
              Elinor Kinesiology offers personalized holistic care that gently balances body and
              mind through expert muscle-response testing and tailored energy techniques. Elinor
              creates a nurturing environment for expectant mothers, alleviating stress, easing
              tension, and promoting optimal well-being for both mother and baby. Elinor’s
              compassionate approach adapts the unique needs of the patients, guiding them toward a
              more harmonious, energized, and empowered journey.
            </p>
          </div>

          <div class="md:w-5/12">
            <h3 class="mb-2 uppercase">Branding</h3>
            <p>
              This logo is built on a continuous, flowing line that forms an infinity loop — an
              intentional nod to the unending cycle of energy in the body. Its shape subtly echoes
              the therapist’s hands in motion, listening and responding to the body’s own signals.
              By bridging earth and sky, the logo embodies restored balance and the seamless
              connection between physical sensation and emotional well-being. With its clean,
              organic form, it communicates professionalism, trust, and the core kinesiological
              promise of guiding clients back to their natural state of harmony. The typography uses
              slender, elegant typefaces with generous letter-spacing, projecting both precision and
              refinement. The color palette is built from soft pastels—muted tones that work
              together to soothe the senses and reinforce the brand’s promise of balanced,
              restorative care.
            </p>
          </div>
        </div>
      </template>
    </Card>

    <div class="border-round-xl flex items-center justify-center bg-[#DCB2A2] py-[15rem] md:py-40">
      <img
        src="@/assets/img/elinor8.png"
        alt="Elinor 8"
        class="block h-auto w-1/2 max-w-[370px] sm:w-2/5"
      />
    </div>

    <!-- Séquence d’images -->
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor2.png"
        alt="Elinor 2"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor3.png"
        alt="Elinor 3"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor4.png"
        alt="Elinor 4"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor5.png"
        alt="Elinor 5"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor6.png"
        alt="Elinor 6"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>

    <!-- Grilles 3 colonnes -->
    <section class="three-block">
      <div class="three-grid">
        <img src="@/assets/img/elinor9.png" alt="Elinor 9" />
        <img src="@/assets/img/elinor10.png" alt="Elinor 10" />
        <img src="@/assets/img/elinor11.png" alt="Elinor 11" />
      </div>

      <div class="three-grid">
        <img src="@/assets/img/elinor12.png" alt="Elinor 12" />
        <img src="@/assets/img/elinor13.png" alt="Elinor 13" />
        <img src="@/assets/img/elinor14.png" alt="Elinor 14" />
      </div>
    </section>

    <div class="flex items-center justify-center">
      <img
        src="@/assets/img/elinor7.png"
        alt="Elinor 7"
        class="border-round-xl block h-auto max-w-full"
      />
    </div>
    <br />
    <br />

    <div class="justify-content-center flex">
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
  components: { Card },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.main {
  overflow-x: hidden;
}

.button {
  text-align: center;
  text-decoration: none;
  display: block;
  margin: 0 auto;
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

/* Bloc avec fond et padding (équivalent de ce que tu avais) */
.three-block {
  background: #f7efe4;
  border-radius: 12px;
  padding: 24px; /* mobile */
}

/* Une rangée d'images */
.three-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 colonne par défaut */
  gap: 16px;
  margin-bottom: 7px;
}

/* 3 colonnes dès ~tablette */
@media (min-width: 640px) {
  .three-block {
    padding: 40px;
  }
  .three-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }
}

/* Images responsives et propres */
.three-grid img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 12px;
}
</style>
