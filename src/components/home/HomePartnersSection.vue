<template>
  <section
    v-if="sectors.length"
    ref="section"
    class="home-partners-section"
    aria-label="Sectors I have worked in"
  >
    <div class="home-partners-inner">
      <div class="partners-block">
        <p class="partners-intro font-display uppercase">
          Some partners I had the chance to collaborate with
        </p>

        <div
          v-if="partnerDisplaySlots.length"
          class="partners-rail"
          aria-label="Partners carousel"
        >
          <div
            v-for="slot in partnerDisplaySlots"
            :key="`partner-slot-${slot.slotIndex}`"
            class="partner-slot"
          >
            <Transition name="partner-fade" mode="out-in">
              <img
                :key="slot.renderKey"
                :src="getLogoSrc(slot.logo)"
                :alt="slot.logo.alt"
                class="partner-logo"
                loading="lazy"
                decoding="async"
              />
            </Transition>
          </div>
        </div>
      </div>

      <div class="sectors-block">
        <p class="sectors-title font-display uppercase">Sectors</p>

        <div class="sector-rows" aria-hidden="true">
          <div
            v-for="(row, rowIndex) in sectorRows"
            :key="`sector-row-${rowIndex}`"
            class="sector-row"
          >
            <div ref="rowTracks" class="sector-row-track">
              <template v-for="(sector, i) in row" :key="`${rowIndex}-${i}`">
                <span class="sector-tag">{{ sector }}</span>
                <span v-if="i < row.length - 1" class="sector-sep" aria-hidden="true">·</span>
              </template>
            </div>
          </div>
        </div>

        <p class="sectors-justified" aria-hidden="true">
          <template v-for="(sector, i) in sectors" :key="`sector-inline-${sector}`">
            <span class="sector-tag">{{ sector }}</span>
            <span v-if="i < sectors.length - 1" class="sector-sep" aria-hidden="true">&nbsp;· </span>
          </template>
        </p>

        <ul class="sectors-sr-only">
          <li v-for="sector in sectors" :key="`sr-${sector}`">{{ sector }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
const ROW_COUNT = 5;
const AMPLITUDE = 55;

export default {
  name: 'HomePartnersSection',
  props: {
    sectors: {
      type: Array,
      default: () => [],
    },
    partnerDisplaySlots: {
      type: Array,
      default: () => [],
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollRaf: null,
      reduceMotion: false,
    };
  },
  computed: {
    // Répartit TOUS les secteurs sur ROW_COUNT lignes, sans duplication, en
    // équilibrant la longueur de chaque ligne (bin-packing glouton) pour qu'aucune
    // ne déborde : chaque secteur apparaît une seule fois et reste lisible.
    sectorRows() {
      if (!this.sectors.length) return [];
      const rows = Array.from({ length: ROW_COUNT }, () => ({ items: [], weight: 0 }));
      // Du plus long au plus court : meilleur équilibrage.
      [...this.sectors]
        .sort((a, b) => b.length - a.length)
        .forEach((sector) => {
          const target = rows.reduce((min, row) => (row.weight < min.weight ? row : min), rows[0]);
          target.items.push(sector);
          target.weight += sector.length + 3; // +3 ≈ séparateur " · "
        });
      return rows
        .filter((row) => row.items.length)
        .map((row) => row.items.slice().sort((a, b) => a.localeCompare(b)));
    },
  },
  mounted() {
    this.reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.reduceMotion) {
      // Le scroll se fait sur un conteneur interne (<main>), pas sur window :
      // une écoute en phase de capture attrape l'event même s'il ne bulle pas.
      window.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      this.onScroll();
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
  },
  methods: {
    getLogoSrc(logo) {
      if (!logo) return '';
      if (this.isDark && logo.whiteSrc) return logo.whiteSrc;
      return logo.src || '';
    },
    onScroll() {
      if (this.reduceMotion || this.scrollRaf) return;
      this.scrollRaf = requestAnimationFrame(() => {
        this.scrollRaf = null;
        const el = this.$refs.section;
        const tracks = this.$refs.rowTracks;
        if (!el || !tracks || !tracks.length) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // Hors écran : rien à mettre à jour (évite tout travail inutile au scroll).
        if (rect.bottom < 0 || rect.top > vh) return;
        // 0 quand la section arrive en bas du viewport, 1 quand elle en sort par le haut.
        const travel = rect.height + vh;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / travel));
        // Écriture DOM directe (pas de re-render Vue) : une ligne sur deux part
        // vers la droite, l'autre vers la gauche.
        for (let i = 0; i < tracks.length; i += 1) {
          const direction = i % 2 === 0 ? 1 : -1;
          const amplitude = AMPLITUDE * (1 + i * 0.1);
          const shift = (progress - 0.5) * amplitude * direction;
          tracks[i].style.transform = `translate3d(${shift.toFixed(2)}px, 0, 0)`;
        }
      });
    },
  },
};
</script>

<style scoped>
.home-partners-section {
  width: 100%;
  margin: 0;
  padding-top: clamp(5rem, 11vw, 9rem);
  padding-bottom: clamp(5rem, 11vw, 9rem);
  background: var(--palette-white);
}

.home-partners-inner {
  width: 100%;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(3rem, 7vw, 6rem);
}

.partners-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1160px;
}

.partners-intro {
  margin: 0;
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  line-height: 1.25;
  letter-spacing: 0.015em;
  color: var(--text-primary);
  text-align: center;
}

.partners-rail {
  /* Une seule ligne ; le nombre de logos est réduit par paliers (JS) pour
     la garder le plus longtemps possible. */
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4.5rem);
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
  width: 100%;
}

.partner-slot {
  /* Largeur identique pour chaque logo, partagée également sur la ligne. */
  flex: 1 1 0;
  min-width: 0;
  max-width: 200px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.35rem;
}

.partner-logo {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.partner-fade-enter-active,
.partner-fade-leave-active {
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.partner-fade-enter-from,
.partner-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.sectors-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1880px;
}

.sectors-title {
  margin: 0 0 clamp(1.4rem, 3vw, 2.4rem);
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  letter-spacing: 0.015em;
  line-height: 1.2;
  color: var(--text-primary);
  text-align: center;
}

.sector-rows {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(0.45rem, 1.2vw, 0.95rem);
  /* Bords fondus : l'opacité diminue légèrement à gauche et à droite. */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 7%,
    #000 93%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
}

.sectors-justified {
  display: none;
}

.sector-row {
  overflow: hidden;
}

.sector-row-track {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: clamp(0.7rem, 1.5vw, 2.4rem);
  width: max-content;
  margin-inline: auto;
  white-space: nowrap;
  will-change: transform;
}

.sector-tag {
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: clamp(1rem, 2.2vw, 1.7rem);
  line-height: 1.2;
  text-transform: lowercase;
  letter-spacing: 0.01em;
}

.sector-sep {
  color: var(--text-secondary);
  font-size: clamp(1rem, 2.2vw, 1.7rem);
  line-height: 1.2;
  opacity: 0.55;
}

.sectors-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 970px) {
  .home-partners-inner {
    gap: clamp(2.5rem, 8vw, 4rem);
  }

  .partners-rail {
    gap: clamp(0.75rem, 3.5vw, 2rem);
  }

  .sector-tag,
  .sector-sep {
    font-size: clamp(0.95rem, 4.5vw, 1.4rem);
  }

  .sector-rows {
    display: none;
  }

  .sectors-justified {
    display: block;
    width: 100%;
    margin: 0;
    color: var(--text-primary);
    text-align: justify;
    text-align-last: justify;
  }

  .sectors-justified .sector-tag,
  .sectors-justified .sector-sep {
    display: inline;
    white-space: normal;
  }

  .sectors-justified .sector-sep {
    margin-inline: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sector-row-track {
    transform: none !important;
  }
}
</style>
