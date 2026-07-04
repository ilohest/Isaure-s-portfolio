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
              <template v-for="(sector, i) in getDisplayRow(row)" :key="`${rowIndex}-${i}-${sector}`">
                <span class="sector-chip">{{ sector }}</span>
                <img
                  :src="getSectorIcon(sector)"
                  :alt="''"
                  class="sector-icon"
                  loading="lazy"
                  decoding="async"
                />
              </template>
            </div>
          </div>
        </div>

        <ul class="sectors-sr-only">
          <li v-for="sector in sectors" :key="`sr-${sector}`">{{ sector }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
const ROW_COUNT = 3;
const ROW_DIRECTIONS = [1, -1, 1];
const BASE_DRIFT_SPEED = 18;
const SCROLL_BOOST = 6200;
const BOOST_DECAY = 0.08;
const SECTOR_ICONS = {
  'Art & literature': 'art-literature.png',
  'Classical music': 'classical-music.png',
  'Coaching for creatives': 'coaching-for-creatives.png',
  'Curated events': 'curated-events.png',
  'Floral scenography': 'floral-scenography.png',
  'Food & Beverage': 'food-production.png',
  'Health & wellness': 'health-wellness.png',
  'Home décor & Vintage furniture': 'home-decor-vintage-furniture.png',
  'Hospitality & tourism': 'hospitality-tourism.png',
  'Illustration / painting / art': 'illustration-painting-art.png',
  'Illustration /painting / art': 'illustration-painting-art.png',
  'Legal tech / law': 'legal-tech-law.png',
  'Music education': 'music-education.png',
  Restaurant: 'Restaurant.png',
  Toys: 'Toys.png',
  'Urban architecture': 'urban-architecture.png',
  'Weddings & events': 'weddings-events.png',
  Yoga: 'Yoga.png',
};

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
      animationRaf: null,
      lastMotionTime: 0,
      previousScrollProgress: null,
      idleOffsets: [],
      scrollBoosts: [],
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
      this.startSectorMotion();
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
    if (this.animationRaf) cancelAnimationFrame(this.animationRaf);
  },
  methods: {
    getLogoSrc(logo) {
      if (!logo) return '';
      if (this.isDark && logo.whiteSrc) return logo.whiteSrc;
      return logo.src || '';
    },
    getDisplayRow(row) {
      return [...row, ...row, ...row];
    },
    getSectorIcon(sector) {
      const filename = SECTOR_ICONS[sector] || 'art-literature.png';
      return `/assets/media/sectors/${filename}`;
    },
    getRowDirection(index) {
      return ROW_DIRECTIONS[index % ROW_DIRECTIONS.length];
    },
    startSectorMotion() {
      const animate = (time) => {
        const tracks = this.$refs.rowTracks;
        if (!tracks || !tracks.length) {
          this.animationRaf = requestAnimationFrame(animate);
          return;
        }

        const previousTime = this.lastMotionTime || time;
        const dt = Math.min(0.04, (time - previousTime) / 1000);
        this.lastMotionTime = time;

        for (let i = 0; i < tracks.length; i += 1) {
          const direction = this.getRowDirection(i);
          const baseSpeed = BASE_DRIFT_SPEED * (1 + i * 0.1);
          const boost = this.scrollBoosts[i] || 0;
          const cycleDistance = tracks[i].scrollWidth / 3;
          const nextOffset = (this.idleOffsets[i] || 0) + (baseSpeed + boost) * dt;
          this.idleOffsets[i] = cycleDistance ? nextOffset % cycleDistance : nextOffset;
          this.scrollBoosts[i] = boost * Math.pow(BOOST_DECAY, dt);
          const shift = direction > 0 ? this.idleOffsets[i] - cycleDistance : -this.idleOffsets[i];
          tracks[i].style.setProperty('--motion-shift', `${shift.toFixed(2)}px`);
        }

        this.animationRaf = requestAnimationFrame(animate);
      };

      this.animationRaf = requestAnimationFrame(animate);
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
        const previousProgress = this.previousScrollProgress;
        this.previousScrollProgress = progress;
        if (previousProgress === null) return;
        const scrollAmount = Math.abs(progress - previousProgress);
        if (scrollAmount < 0.0001) return;

        // Le scroll ajoute un boost de vitesse dans le même sens que le drift
        // naturel de chaque ligne.
        for (let i = 0; i < tracks.length; i += 1) {
          const rowBoost = scrollAmount * SCROLL_BOOST * (1 + i * 0.08);
          this.scrollBoosts[i] = Math.min(140, (this.scrollBoosts[i] || 0) + rowBoost);
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
  padding-bottom: clamp(4.5rem, 10vw, 8rem);
  background: var(--palette-white);
  overflow: hidden;
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
  width: 100vw;
  max-width: none;
  margin-inline: calc(50% - 50vw);
}

.sectors-title {
  margin: 0 0 clamp(1.6rem, 3.2vw, 2.8rem);
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
  gap: clamp(0.65rem, 1.15vw, 1rem);
}

.sector-row {
  position: relative;
  overflow: hidden;
  padding-inline: clamp(1rem, 6vw, 7rem);
  box-sizing: border-box;
}

.sector-row::before,
.sector-row::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: clamp(1rem, 6vw, 7rem);
  pointer-events: none;
}

.sector-row::before {
  left: 0;
  background: linear-gradient(to right, var(--palette-white) 28%, transparent 100%);
}

.sector-row::after {
  right: 0;
  background: linear-gradient(to left, var(--palette-white) 28%, transparent 100%);
}

.sector-row-track {
  --motion-shift: 0px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: clamp(0.9rem, 1.55vw, 1.8rem);
  width: max-content;
  margin-inline: auto;
  white-space: nowrap;
  will-change: transform;
  transform: translate3d(var(--motion-shift), 0, 0);
}

.sector-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(2.45rem, 3.8vw, 3.45rem);
  padding: clamp(0.4rem, 0.75vw, 0.7rem) clamp(1rem, 1.65vw, 1.55rem);
  border: 1px solid color-mix(in srgb, var(--text-primary) 17%, transparent);
  border-radius: 999px;
  background: var(--palette-white);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--text-primary) 7%, transparent);
  color: var(--text-primary);
  font-family: var(--font-family-body);
  font-size: clamp(1rem, 1.7vw, 1.45rem);
  line-height: 1;
  text-transform: lowercase;
  letter-spacing: 0;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.sector-chip:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--text-primary) 34%, transparent);
  background: color-mix(in srgb, var(--palette-white) 88%, var(--palette-yellow) 12%);
  box-shadow: 0 4px 0 color-mix(in srgb, var(--text-primary) 10%, transparent);
}

.sector-icon {
  display: block;
  width: clamp(2.4rem, 4.4vw, 4.4rem);
  height: clamp(2.4rem, 4.4vw, 4.4rem);
  object-fit: contain;
  flex: 0 0 auto;
  transform: rotate(-3deg);
}

.sector-row:nth-child(even) .sector-icon {
  transform: rotate(4deg);
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

  .sector-row-track {
    gap: clamp(0.65rem, 3vw, 1rem);
  }

  .sector-row {
    padding-inline: clamp(0.85rem, 5vw, 2rem);
  }

  .sector-row::before,
  .sector-row::after {
    width: clamp(0.85rem, 5vw, 2rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sector-row-track {
    transform: none !important;
  }
}
</style>
