<template>
  <section ref="inspoRoot" class="inspo-page" data-reveal-ignore>
    <section class="hero-stage">
      <div class="hero-background-word font-display uppercase">2026 inspo</div>

      <div class="hero-copy">
        <p class="hero-kicker font-display uppercase">a design manifesto</p>
        <h1 class="hero-title font-display uppercase">
          <span class="title-line title-line-main">personality</span>
          <span class="title-line title-line-shift">
            <span class="title-line-over">over</span>
            <span class="title-line-tail">
              <span class="title-line-offset">perfection</span>
              <em class="title-line-accent title-script">With impact</em>
            </span>
          </span>
        </h1>
      </div>

      <div class="hero-gallery">
        <div class="hero-card-wrap hero-card-left-wrap magazine-float">
          <figure class="hero-card hero-card-left">
            <img :src="images.heroLeft.src" :alt="images.heroLeft.alt" loading="eager" />
          </figure>

          <div class="hero-sticker hero-sticker-acid font-display sticker-handwritten uppercase">
            <span>Designing</span>
            <span>with intention,</span>
            <span>not perfection</span>
          </div>
        </div>

        <figure class="hero-card hero-card-center magazine-float">
          <img :src="images.heroCenter.src" :alt="images.heroCenter.alt" loading="eager" />
        </figure>

        <div class="hero-card-wrap hero-card-right-wrap magazine-float">
          <figure class="hero-card hero-card-right">
            <img :src="images.heroRight.src" :alt="images.heroRight.alt" loading="eager" />
          </figure>

          <div class="hero-sticker hero-sticker-shift font-display sticker-handwritten uppercase">
            The shift
          </div>
        </div>
      </div>

      <div class="hero-sticker hero-sticker-dark font-display uppercase">Taste beats volume</div>
    </section>

    <section class="panel panel-impact">
      <div class="panel-heading">
        <span class="panel-number font-display">01</span>
        <p class="panel-label font-display uppercase">the shift</p>
      </div>

      <div class="impact-composition">
        <figure class="impact-main panel-media">
          <picture>
            <source :srcset="srcSet(images.coffee)" type="image/webp" />
            <img :src="images.coffee.src" :alt="images.coffee.alt" loading="lazy" />
          </picture>
          <figcaption class="overlay-copy">
            <span class="overlay-big font-display uppercase"
              >if your design could have been made by anyone, it’s already lost</span
            >
          </figcaption>
        </figure>

        <figure class="impact-secondary panel-media">
          <picture>
            <source :srcset="srcSet(images.umbrellas)" type="image/webp" />
            <img :src="images.umbrellas.src" :alt="images.umbrellas.alt" loading="lazy" />
          </picture>
        </figure>

        <div class="impact-text acid-panel panel-copy">
          <p class="font-display uppercase">Design has changed. Not visually, but fundamentally.</p>
          <p>Design is no longer about being good. Or clean. Or correct.</p>
          <p>That era is over.</p>
          <p>
            Clean, neutral, “well-designed” work is everywhere now. It’s fast to produce, easy to
            replicate, and increasingly invisible.
          </p>
          <p>What cuts through is no longer perfection. It’s presence.</p>
          <p>
            Work that feels alive. Work that feels chosen. Work that feels like someone actually
            made decisions.
          </p>
          <p>If your design could have been made by anyone, it’s already lost.</p>
        </div>
      </div>
    </section>

    <section ref="quoteStage" class="quote-stage global-fade-up global-fade-visible">
      <picture ref="quoteStageBg" class="quote-stage-bg">
        <source :srcset="srcSetWide(images.blurField)" type="image/webp" />
        <img :src="images.blurField.src" :alt="images.blurField.alt" loading="lazy" />
      </picture>

      <div class="quote-stage-overlay"></div>

      <div class="quote-stage-content">
        <div class="quote-stage-index font-display">02</div>

        <h2 class="quote-stage-title font-display uppercase">
          <span class="quote-line">people see it</span>
          <span class="quote-line quote-line-shift">before they read it.</span>
          <em class="quote-line quote-line-script title-script">
            <span>Make</span>
            <span>That first</span>
            <span>Moment</span>
            <span>Count.</span>
          </em>
        </h2>
      </div>
    </section>

    <section class="panel panel-sensory">
      <div class="panel-heading panel-heading-right">
        <span class="panel-number font-display">03</span>
        <p class="panel-label font-display uppercase">more feeling / less explaining</p>
      </div>

      <div class="sensory-stage">
        <figure class="sensory-wide panel-media">
          <picture>
            <source :srcset="srcSet(images.citrus)" type="image/webp" />
            <img :src="images.citrus.src" :alt="images.citrus.alt" loading="lazy" />
          </picture>
        </figure>

        <div class="floating-quote panel-copy">
          <span class="font-display sticker-handwritten uppercase"
            >Make it felt, not understood</span
          >
          <p>
            People don’t read first. They react first. Before hierarchy, before structure, before
            meaning, there’s a sensation.
          </p>
          <p>A texture. A tension. A temperature. A discomfort. A pull. A curiosity.</p>
          <p>
            The role of design is shifting from clarity to emotion. Not just showing something, but
            making it felt. Because information is forgettable. Feeling isn’t.
          </p>
        </div>

        <figure class="sensory-dark panel-media">
          <picture>
            <source :srcset="srcSet(images.swirl)" type="image/webp" />
            <img :src="images.swirl.src" :alt="images.swirl.alt" loading="lazy" />
          </picture>
          <figcaption class="overlay-copy overlay-copy-bottom">
            <span class="overlay-big font-display uppercase"
              >design should not explain. it should hit.</span
            >
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="panel panel-grit">
      <div class="panel-heading">
        <span class="panel-number font-display">05</span>
        <p class="panel-label font-display uppercase">imperfection is the new authority</p>
      </div>

      <div class="grit-layout">
        <div class="grit-essay dark-panel panel-copy">
          <span class="essay-word font-display uppercase">credibility</span>
          <p>
            Today, the more perfect something looks, the less people trust it, the more it feels
            artificial.
          </p>
          <p>
            We’ve entered a moment where polish signals automation. And rawness has become valuable.
            Flaws signal authorship.
          </p>
          <p>
            Grain, flash, blur, rough edges, they signal something essential: this was made. Not
            generated.
          </p>
          <p>Imperfection is no longer a flaw. It’s credibility.</p>
        </div>

        <div class="grit-stickers">
          <div class="mini-tag font-display sticker-handwritten uppercase">
            Scratches. Noise. Misalignment. Texture.
          </div>
          <div class="mini-tag mini-tag-secondary font-display uppercase">
            Not decoration. Evidence.
          </div>
          <div class="mini-tag mini-tag-tertiary font-display uppercase">
            Proof that someone was involved.
          </div>
        </div>

        <figure class="grit-image grit-image-a panel-media">
          <picture>
            <source :srcset="srcSet(images.flower)" type="image/webp" />
            <img :src="images.flower.src" :alt="images.flower.alt" loading="lazy" />
          </picture>
        </figure>

        <figure class="grit-image grit-image-b panel-media">
          <picture>
            <source :srcset="srcSet(images.fence)" type="image/webp" />
            <img :src="images.fence.src" :alt="images.fence.alt" loading="lazy" />
          </picture>
        </figure>
      </div>
    </section>

    <section class="panel panel-spread">
      <div class="spread-stage">
        <figure class="spread-image spread-image-back panel-media">
          <picture>
            <source :srcset="srcSetSpread(images.ramsesTexture)" type="image/webp" />
            <img :src="images.ramsesTexture.src" :alt="images.ramsesTexture.alt" loading="lazy" />
          </picture>
        </figure>

        <figure class="spread-image spread-image-left panel-media">
          <picture>
            <source :srcset="srcSet(images.lauraPortrait)" type="image/webp" />
            <img :src="images.lauraPortrait.src" :alt="images.lauraPortrait.alt" loading="lazy" />
          </picture>
        </figure>

        <figure class="spread-image spread-image-right panel-media">
          <picture>
            <source :srcset="srcSetSpread(images.ivanaDog)" type="image/webp" />
            <img :src="images.ivanaDog.src" :alt="images.ivanaDog.alt" loading="lazy" />
          </picture>
        </figure>

        <figure class="spread-image spread-image-bottom panel-media">
          <picture>
            <source :srcset="srcSet(images.annieField)" type="image/webp" />
            <img :src="images.annieField.src" :alt="images.annieField.alt" loading="lazy" />
          </picture>
        </figure>

        <div class="spread-card panel-copy">
          <div class="panel-heading">
            <span class="panel-number font-display">04</span>
            <p class="panel-label font-display uppercase">bold is commitment</p>
          </div>

          <div class="spread-card-copy">
            <p>Bold design isn’t about doing more. It’s about going further.</p>
            <p>One idea, pushed until it becomes unmistakable.</p>
            <p>
              Color, type, composition, none of it matters without intent. And intent only shows
              when something is taken to its edge.
            </p>
            <p>Half-measures are what make design look generic.</p>
            <p>
              A direction only exists once you’ve pushed it far enough to risk ruining it. That’s
              where taste begins.
            </p>
            <p>Not in moderation. Not in compromise.</p>
            <p>In excess. In tension. In decisions that don’t try to be validated.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel-break">
      <div class="panel-heading">
        <span class="panel-number font-display">06</span>
        <p class="panel-label font-display uppercase">break the logic</p>
      </div>

      <div class="break-layout">
        <figure class="break-image break-image-large panel-media">
          <picture>
            <source :srcset="srcSet(images.joshuaHaze)" type="image/webp" />
            <img :src="images.joshuaHaze.src" :alt="images.joshuaHaze.alt" loading="lazy" />
          </picture>
        </figure>

        <div class="break-copy panel-copy dark-panel">
          <p>The eye doesn’t stop for what it understands. It stops for what feels off.</p>
          <p>
            Unexpected compositions. A warped perspective. A strange proportion. Something slightly
            wrong. Things that don’t quite fit.
          </p>
          <p>
            That moment of friction, that’s where attention lives. Attention doesn’t come from
            clarity. It comes from interruption.
          </p>
          <p>That moment where the brain hesitates, that’s the entry point.</p>
        </div>
      </div>
    </section>

    <section class="panel panel-human">
      <div class="panel-heading panel-heading-right">
        <span class="panel-number font-display">07</span>
        <p class="panel-label font-display uppercase">human &gt; digital</p>
      </div>

      <div class="human-layout">
        <div class="human-copy panel-copy">
          <p>
            Pure digital design has become frictionless. Too smooth. Too controlled. And because of
            that, forgettable.
          </p>
          <p>What’s missing is resistance. Cutting. Scanning. Drawing. Layering.</p>
          <p>
            Introducing the physical, scanned textures, hand-drawn elements, imperfect layers,
            brings back weight.
          </p>
          <p>
            It creates something that can’t be perfectly replicated. Something that feels owned.
          </p>
        </div>

        <figure class="human-image human-image-a panel-media">
          <picture>
            <source :srcset="srcSet(images.hansTexture)" type="image/webp" />
            <img :src="images.hansTexture.src" :alt="images.hansTexture.alt" loading="lazy" />
          </picture>
        </figure>

        <figure class="human-image human-image-b panel-media">
          <picture>
            <source :srcset="srcSet(images.hansSilhouette)" type="image/webp" />
            <img :src="images.hansSilhouette.src" :alt="images.hansSilhouette.alt" loading="lazy" />
          </picture>
        </figure>
      </div>
    </section>

    <section class="panel panel-taste">
      <div class="panel-heading">
        <span class="panel-number font-display">08</span>
        <p class="panel-label font-display uppercase">taste over volume</p>
      </div>

      <div class="taste-layout">
        <div class="taste-copy panel-copy">
          <p>We can produce infinitely now. That’s no longer the skill.</p>
          <p>
            The skill is knowing what to keep. What to remove. What to elevate. What you insist on.
          </p>
          <p>
            The goal is no longer to appeal. It’s to resonate. With someone. Strongly. Which means
            not resonating with everyone else.
          </p>
          <p class="taste-sticker font-display sticker-handwritten uppercase">
            Taste is the last skill
          </p>
          <p>
            Neutrality is forgettable. Point of view is memorable. Tools are no longer the barrier.
            Execution is no longer the challenge. The only thing left that can’t be scaled is taste.
          </p>
          <p>Design is shifting from making to choosing with precision.</p>
          <p class="taste-sticker taste-sticker-secondary font-display uppercase">
            Not for everyone
          </p>
        </div>

        <figure class="taste-image panel-media">
          <picture>
            <source :srcset="srcSet(images.drinks)" type="image/webp" />
            <img :src="images.drinks.src" :alt="images.drinks.alt" loading="lazy" />
          </picture>
        </figure>
      </div>
    </section>

    <section
      class="panel panel-scatter"
      :class="{ 'panel-scatter-active': Boolean(hoveredScatterImage) }"
    >
      <div
        class="scatter-hover-bg"
        :style="
          hoveredScatterImage ? { backgroundImage: `url(${hoveredScatterImage})` } : undefined
        "
        aria-hidden="true"
      ></div>

      <div class="scatter-board">
        <div class="panel-heading">
          <span class="panel-number font-display">09</span>
          <p class="panel-label font-display uppercase">clean is invisible</p>
        </div>

        <article
          v-for="item in scatterItems"
          :key="item.index"
          class="scatter-card panel-media"
          :class="item.className"
          @mouseenter="setHoveredScatterImage(item.image.src1600)"
          @focusin="setHoveredScatterImage(item.image.src1600)"
          @mouseleave="clearHoveredScatterImage"
          @focusout="clearHoveredScatterImage"
        >
          <span class="scatter-index font-display">[ {{ item.index }} ]</span>
          <picture class="scatter-image">
            <source :srcset="srcSet(item.image)" type="image/webp" />
            <img :src="item.image.src" :alt="item.image.alt" loading="lazy" />
          </picture>
        </article>

        <aside class="scatter-note panel-copy">
          <p class="font-display uppercase">Clean is invisible</p>
        </aside>

        <blockquote class="scatter-quote">
          <p class="font-display uppercase">taste defines everything</p>
          <footer class="font-display uppercase">not for everyone</footer>
        </blockquote>

        <div class="scatter-sticker scatter-sticker-2 font-display uppercase">
          Imperfection builds trust
        </div>
        <div class="scatter-sticker scatter-sticker-3 font-display uppercase">
          Emotion drives attention
        </div>

        <div class="scatter-contact-sheet">
          <figure
            v-for="image in allInspoImages"
            :key="image.src"
            class="contact-sheet-item panel-media"
          >
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="panel panel-catalog">
      <div class="catalog-headline">
        <p class="font-display uppercase">10 / what actually matters</p>
        <h2 class="font-display uppercase">design is not decoration. it’s a position.</h2>
      </div>

      <div class="catalog-footer catalog-footer-wide">
        <p>And in 2026, the only thing that matters is this:</p>
        <p>Did you make something that feels like you meant it?</p>
        <p>Or something that could have been made by anyone.</p>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onBeforeUnmount, onMounted, ref } from 'vue';

type InspoImage = {
  src: string;
  src1600: string;
  alt: string;
};

const quoteStage = ref<HTMLElement | null>(null);
const quoteStageBg = ref<HTMLElement | null>(null);
const inspoRoot = ref<HTMLElement | null>(null);
const hoveredScatterImage = ref<string | null>(null);
let gsapContext: gsap.Context | null = null;

const images = {
  coffee: {
    src: '/assets/media/pages/2026-inspo/joshua-earle-ro3QWk_7ne4-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/joshua-earle-ro3QWk_7ne4-unsplash-1600.webp',
    alt: 'Coffee cup casting a hard shadow on a spill of coffee.',
  },
  drinks: {
    src: '/assets/media/pages/2026-inspo/ivana-cajina-IDJloCbfGpU-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/ivana-cajina-IDJloCbfGpU-unsplash-1600.webp',
    alt: 'Tray of bright drinks photographed with direct flash at night.',
  },
  umbrellas: {
    src: '/assets/media/pages/2026-inspo/roberta-sant-anna-BQXnC52jdOI-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/roberta-sant-anna-BQXnC52jdOI-unsplash-1600.webp',
    alt: 'Striped parasols and chairs against a pale stone wall.',
  },
  leaves: {
    src: '/assets/media/pages/2026-inspo/getty-images-jcXcMuXRgHs-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/getty-images-jcXcMuXRgHs-unsplash-1600.webp',
    alt: 'Translucent leaves floating like soft white sketches.',
  },
  citrus: {
    src: '/assets/media/pages/2026-inspo/polina-kuzovkova-7FJE-ul8w80-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/polina-kuzovkova-7FJE-ul8w80-unsplash-1600.webp',
    alt: 'Bare feet in grass framed with lemons and oranges.',
  },
  swirl: {
    src: '/assets/media/pages/2026-inspo/hulki-okan-tabak-x3kQTL7yw30-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/hulki-okan-tabak-x3kQTL7yw30-unsplash-1600.webp',
    alt: 'Abstract black-and-white metallic swirl texture.',
  },
  blurField: {
    src: '/assets/media/pages/2026-inspo/ruliff-andrean-2MLUrMVEFgs-unsplash-1280.webp',
    src1600: '/assets/media/pages/2026-inspo/ruliff-andrean-2MLUrMVEFgs-unsplash-1920.webp',
    alt: 'Blurred grainy field of green and plum tones used as an atmospheric background.',
  },
  ramsesTexture: {
    src: '/assets/media/pages/2026-inspo/ramses-cervantes-kENuZtNGQxM-unsplash-1280.webp',
    src1600: '/assets/media/pages/2026-inspo/ramses-cervantes-kENuZtNGQxM-unsplash-1920.webp',
    alt: 'Warm textured surface with straps laid across it.',
  },
  ivanaDog: {
    src: '/assets/media/pages/2026-inspo/ivana-cajina-jUXr0tcweT8-unsplash-1280.webp',
    src1600: '/assets/media/pages/2026-inspo/ivana-cajina-jUXr0tcweT8-unsplash-1920.webp',
    alt: 'Close-up editorial image of a black dog with a reflective eye.',
  },
  joshuaForest: {
    src: '/assets/media/pages/2026-inspo/joshua-earle-xA3iAPojhZ0-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/joshua-earle-xA3iAPojhZ0-unsplash-1600.webp',
    alt: 'Atmospheric forest landscape fading into mist.',
  },
  hansTexture: {
    src: '/assets/media/pages/2026-inspo/hans-mRnnSYw_afA-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/hans-mRnnSYw_afA-unsplash-1600.webp',
    alt: 'Dark textured abstract image with tactile grain.',
  },
  joshuaHaze: {
    src: '/assets/media/pages/2026-inspo/joshua-earle-VtnlYXgm4Og-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/joshua-earle-VtnlYXgm4Og-unsplash-1600.webp',
    alt: 'Moody hazy landscape with soft light and depth.',
  },
  lauraPortrait: {
    src: '/assets/media/pages/2026-inspo/laura-adai-byH2tfPyFgI-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/laura-adai-byH2tfPyFgI-unsplash-1600.webp',
    alt: 'Soft portrait with editorial warmth and muted color.',
  },
  polinaMotion: {
    src: '/assets/media/pages/2026-inspo/polina-kuzovkova-XTUbHjGlReA-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/polina-kuzovkova-XTUbHjGlReA-unsplash-1600.webp',
    alt: 'Fruit-toned still life with motion and tactile contrast.',
  },
  hansSilhouette: {
    src: '/assets/media/pages/2026-inspo/hans-bE9TykdSYAs-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/hans-bE9TykdSYAs-unsplash-1600.webp',
    alt: 'Soft atmospheric silhouette with muted colors.',
  },
  annieField: {
    src: '/assets/media/pages/2026-inspo/annie-spratt-I8S0fL0sVuA-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/annie-spratt-I8S0fL0sVuA-unsplash-1600.webp',
    alt: 'Field scene with high texture and lived-in softness.',
  },
  flower: {
    src: '/assets/media/pages/2026-inspo/planet-volumes-81e0ZluNM_o-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/planet-volumes-81e0ZluNM_o-unsplash-1600.webp',
    alt: 'Soft-focus black-and-white flower with visible grain.',
  },
  fence: {
    src: '/assets/media/pages/2026-inspo/annie-spratt-JlO-9XGSqxM-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/annie-spratt-JlO-9XGSqxM-unsplash-1600.webp',
    alt: 'Wild flower caught in a wire fence in a sunlit field.',
  },
  heroLeft: {
    src: '/assets/media/pages/2026-inspo/gabrielle-maurer-TcYmNElR8B8-unsplash.jpg',
    src1600: '/assets/media/pages/2026-inspo/gabrielle-maurer-TcYmNElR8B8-unsplash.jpg',
    alt: 'Dark editorial still life with tactile objects and moody light.',
  },
  heroCenter: {
    src: '/assets/media/pages/2026-inspo/getty-images-uqyxPry0grs-unsplash-1.jpg',
    src1600: '/assets/media/pages/2026-inspo/getty-images-uqyxPry0grs-unsplash-1.jpg',
    alt: 'Portrait with cinematic red lighting and a composed gaze.',
  },
  heroRight: {
    src: '/assets/media/pages/2026-inspo/alexander-lunyov-F20ny2NmwYc-unsplash.jpg',
    src1600: '/assets/media/pages/2026-inspo/alexander-lunyov-F20ny2NmwYc-unsplash.jpg',
    alt: 'Solitary figure walking on a dark beach toward sea stacks in mist.',
  },
} satisfies Record<string, InspoImage>;

const scatterItems = [
  { index: '01', image: images.drinks, className: 'scatter-card-1' },
  { index: '02', image: images.joshuaForest, className: 'scatter-card-2' },
  { index: '04', image: images.blurField, className: 'scatter-card-3' },
  { index: '07', image: images.fence, className: 'scatter-card-4' },
  { index: '08', image: images.hansTexture, className: 'scatter-card-5' },
  { index: '09', image: images.citrus, className: 'scatter-card-6' },
  { index: '11', image: images.leaves, className: 'scatter-card-7' },
  { index: '14', image: images.joshuaHaze, className: 'scatter-card-8' },
  { index: '15', image: images.swirl, className: 'scatter-card-9' },
  { index: '19', image: images.umbrellas, className: 'scatter-card-10' },
  { index: '22', image: images.lauraPortrait, className: 'scatter-card-11' },
  { index: '25', image: images.flower, className: 'scatter-card-12' },
  { index: '26', image: images.polinaMotion, className: 'scatter-card-13' },
  { index: '28', image: images.hansSilhouette, className: 'scatter-card-14' },
  { index: '29', image: images.coffee, className: 'scatter-card-15' },
  { index: '30', image: images.annieField, className: 'scatter-card-16' },
];

const allInspoImages = [
  'a-c-JwKR7P1Sqs8-unsplash.jpg',
  'adrian-schledorn-ViMF7W26MEQ-unsplash.jpg',
  'alexander-lunyov-F20ny2NmwYc-unsplash.jpg',
  'annie-spratt-AImfs6Xh1ZA-unsplash.jpg',
  'annie-spratt-CPJkDD2MAYA-unsplash.jpg',
  'annie-spratt-I8S0fL0sVuA-unsplash.jpg',
  'annie-spratt-JlO-9XGSqxM-unsplash.jpg',
  'annie-spratt-LNRv5FHYul0-unsplash.jpg',
  'annie-spratt-W5mbaU5v0ak-unsplash.jpg',
  'annie-spratt-Y1LI13aeyW4-unsplash.jpg',
  'annie-spratt-qEFIDEJyV5o-unsplash.jpg',
  'antonio-verdin-fwkFUCZ_sXs-unsplash.jpg',
  'bhavik-nasit-4kjL_YgaqRE-unsplash.jpg',
  'diana-light-7heBVCiQ6AU-unsplash.jpg',
  'drazen-nesic-rlI7agDcb_A-unsplash.jpg',
  'fellipe-ditadi-ThHPxbhsgQQ-unsplash.jpg',
  'fotis-fotopoulos-3TG3SRgEWDs-unsplash.jpg',
  'frank-flores-WZ1L1-bnULc-unsplash.jpg',
  'gabrielle-maurer-TcYmNElR8B8-unsplash.jpg',
  'getty-images-jcXcMuXRgHs-unsplash.jpg',
  'getty-images-uqyxPry0grs-unsplash-1.jpg',
  'hans-bE9TykdSYAs-unsplash.jpg',
  'hans-mRnnSYw_afA-unsplash.jpg',
  'hulki-okan-tabak-x3kQTL7yw30-unsplash.jpg',
  'ivana-cajina-0v5oUHy-poI-unsplash.jpg',
  'ivana-cajina-B2X6Wm8adVM-unsplash.jpg',
  'ivana-cajina-IDJloCbfGpU-unsplash.jpg',
  'ivana-cajina-NWNLGcxXehI-unsplash.jpg',
  'ivana-cajina-jUXr0tcweT8-unsplash.jpg',
  'ivana-cajina-roya5ApxXUA-unsplash.jpg',
  'ivana-cajina-tZsPDtrIDXw-unsplash.jpg',
  'joshua-earle-NZIkn4ZaT2I-unsplash.jpg',
  'joshua-earle-VtnlYXgm4Og-unsplash.jpg',
  'joshua-earle-Z0x2WGijEx0-unsplash.jpg',
  'joshua-earle-ro3QWk_7ne4-unsplash.jpg',
  'joshua-earle-xA3iAPojhZ0-unsplash.jpg',
  'joshua-earle-xxpekYtVBuM-unsplash.jpg',
  'kateryna-hliznitsova-516VzPHRGHQ-unsplash.jpg',
  'khristina-sergeychik-cWK6wDHGs80-unsplash.jpg',
  'laura-adai-H0AbaB75F9w-unsplash.jpg',
  'laura-adai-Kfd0b4qzKhw-unsplash.jpg',
  'laura-adai-Wez1GtTVmhg-unsplash.jpg',
  'laura-adai-byH2tfPyFgI-unsplash.jpg',
  'liane-tHHoR5oJyY4-unsplash.jpg',
  'margaret-jaszowska-k1dGnJYZzI0-unsplash.jpg',
  'planet-volumes-81e0ZluNM_o-unsplash.jpg',
  'planet-volumes-TdcDaaX1eV0-unsplash.jpg',
  'polina-kuzovkova-7FJE-ul8w80-unsplash.jpg',
  'polina-kuzovkova-XTUbHjGlReA-unsplash.jpg',
  'ramses-cervantes-VhZX1o7W5kE-unsplash.jpg',
  'ramses-cervantes-ixsoP9YUHQQ-unsplash.jpg',
  'ramses-cervantes-kENuZtNGQxM-unsplash.jpg',
  'ramses-cervantes-keIRSxNlyoo-unsplash.jpg',
  'ramses-cervantes-rntA8bw2zqo-unsplash.jpg',
  'ramses-cervantes-thITlJY88bw-unsplash.jpg',
  'roberta-sant-anna-BQXnC52jdOI-unsplash.jpg',
  'ruliff-andrean-2MLUrMVEFgs-unsplash.jpg',
  'ruliff-andrean-j0dZtmf4lPI-unsplash.jpg',
  'yuri-krupenin-wSRuljSPrwQ-unsplash.jpg',
].map((filename) => ({
  src: `/assets/media/pages/2026-inspo/${filename.replace(/\.(png|jpe?g)$/i, '')}-960.webp`,
  alt: filename.replace(/\.[a-z]+$/i, '').replace(/[-_]/g, ' '),
}));

function srcSet(image: InspoImage) {
  return `${image.src} 960w, ${image.src1600} 1600w`;
}

function srcSetWide(image: InspoImage) {
  return `${image.src} 1280w, ${image.src1600} 1920w`;
}

function srcSetSpread(image: InspoImage) {
  return `${image.src} 1280w, ${image.src1600} 1920w`;
}

function setHoveredScatterImage(src: string) {
  hoveredScatterImage.value = src;
}

function clearHoveredScatterImage() {
  hoveredScatterImage.value = null;
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsapContext = gsap.context(() => {
    const scrollerEl =
      (document.querySelector('[data-scroll-container]') as HTMLElement) || undefined;
    const triggerDefaults = scrollerEl ? { scroller: scrollerEl } : {};

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from('.title-line', { y: 56, opacity: 0, rotate: 1.5, duration: 1.05, stagger: 0.1 })
      .from(
        '.hero-kicker, .hero-intro',
        { y: 28, opacity: 0, duration: 0.8, stagger: 0.08 },
        '-=0.65',
      )
      .from('.magazine-float', { y: 40, opacity: 0, duration: 1, stagger: 0.12 }, '-=1');

    gsap.to('.hero-background-word', {
      xPercent: 10,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-stage',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        ...triggerDefaults,
      },
    });

    gsap.to('.hero-sticker-acid', {
      x: () => {
        const sticker = document.querySelector('.hero-sticker-acid') as HTMLElement | null;
        return sticker ? window.innerWidth - sticker.offsetWidth - 16 : 0;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-stage',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9,
        invalidateOnRefresh: true,
        ...triggerDefaults,
      },
    });

    gsap.to('.hero-image-left', {
      yPercent: -12,
      rotate: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-stage',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9,
        ...triggerDefaults,
      },
    });

    gsap.to('.hero-image-right', {
      yPercent: -18,
      rotate: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-stage',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        ...triggerDefaults,
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.quote-stage',
          start: 'top 72%',
          once: true,
          ...triggerDefaults,
        },
        defaults: { ease: 'power3.out' },
      })
      .from('.quote-stage-index', {
        y: 28,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        '.quote-line',
        {
          yPercent: 115,
          rotate: 1.5,
          duration: 1,
          stagger: 0.08,
        },
        '-=0.5',
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.panel-spread',
          start: 'top 78%',
          once: true,
          ...triggerDefaults,
        },
        defaults: { ease: 'power3.out' },
      })
      .from('.spread-image, .spread-card', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
      });

    gsap.to('.spread-image-left', {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: {
        trigger: '.panel-spread',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.9,
        ...triggerDefaults,
      },
    });

    gsap.to('.spread-image-right', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.panel-spread',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        ...triggerDefaults,
      },
    });

    gsap.utils.toArray<HTMLElement>('.panel').forEach((panel) => {
      if (panel.classList.contains('panel-spread') || panel.classList.contains('panel-scatter')) {
        return;
      }

      const media = panel.querySelectorAll<HTMLElement>('.panel-media');
      const copy = panel.querySelectorAll<HTMLElement>('.panel-copy, .panel-heading');
      const cards = panel.querySelectorAll<HTMLElement>('.catalog-item');

      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            once: true,
            ...triggerDefaults,
          },
          defaults: { ease: 'power3.out' },
        })
        .from(copy, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08 })
        .from(media, { y: 40, opacity: 0, duration: 0.95, stagger: 0.12 }, '-=0.5')
        .from(cards, { y: 40, opacity: 0, duration: 0.7, stagger: 0.05 }, '-=0.45');
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.panel-scatter',
          start: 'top 75%',
          once: true,
          ...triggerDefaults,
        },
        defaults: { ease: 'power3.out' },
      })
      .from('.scatter-note, .scatter-quote', { y: 42, opacity: 0, duration: 0.9, stagger: 0.12 })
      .from('.scatter-card', { y: 42, opacity: 0, duration: 0.85, stagger: 0.06 }, '-=0.55');
  }, inspoRoot.value || undefined);
});

onBeforeUnmount(() => {
  gsapContext?.revert();
  gsapContext = null;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap');

.inspo-page {
  --paper: var(--surface-base);
  --paper-rgb: 248, 248, 246;
  --ink: var(--text-primary);
  --muted: rgba(48, 43, 41, 0.78);
  --line: rgba(63, 97, 45, 0.18);
  --red: #c92316;
  --olive: #9fa617;
  --green: #3f612d;
  --blue: #4c5ef7;
  --accent: var(--olive);
  background:
    radial-gradient(circle at 10% 0%, rgba(159, 166, 23, 0.16), transparent 22rem),
    radial-gradient(circle at 100% 20%, rgba(76, 94, 247, 0.12), transparent 28rem), var(--paper);
  color: var(--ink);
}

.inspo-page *,
.inspo-page *::before,
.inspo-page *::after {
  border-color: transparent !important;
}

.inspo-page :deep(*) {
  text-wrap: balance;
}

.hero-stage,
.panel {
  position: relative;
  overflow: clip;
}

.quote-stage {
  position: relative;
  min-height: 175svh;
  display: block;
  margin-top: 1rem;
  overflow: clip;
  color: var(--paper);
}

.quote-stage-bg img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quote-stage-bg {
  position: sticky;
  top: 0;
  display: block;
  width: 100%;
  height: 100svh;
  will-change: transform;
}

.quote-stage-overlay {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100svh;
  margin-top: -100svh;
  pointer-events: none;
  background:
    linear-gradient(
      180deg,
      rgba(63, 97, 45, 0.08) 0%,
      rgba(63, 97, 45, 0.18) 22%,
      rgba(63, 97, 45, 0.5) 100%
    ),
    radial-gradient(circle at 68% 74%, rgba(201, 35, 22, 0.42), transparent 18rem),
    linear-gradient(
      90deg,
      rgba(76, 94, 247, 0.12) 0%,
      rgba(63, 97, 45, 0.03) 34%,
      rgba(63, 97, 45, 0.24) 100%
    );
}

.quote-stage-content {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 175svh;
  margin-top: -100svh;
  padding: 8rem 1rem 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quote-stage-index {
  font-size: clamp(3rem, 10vw, 7rem);
  line-height: 0.8;
  color: rgba(255, 252, 252, 0.26);
}

.quote-stage-title {
  margin: auto 0 0;
  max-width: 10ch;
  font-size: clamp(3.5rem, 9vw, 8.8rem);
  line-height: 0.9;
  letter-spacing: -0.06em;
}

.quote-line,
.quote-stage-title em {
  display: block;
  overflow: hidden;
}

.quote-line-shift {
  margin-left: 0.85em;
}

.quote-stage-title em {
  margin-top: 0.18em;
  font-style: normal;
  max-width: 9ch;
  color: rgba(255, 252, 252, 0.96);
  font-size: 0.8em;
  line-height: 0.82;
}

.quote-line-script {
  overflow: visible !important;
  max-width: none !important;
  padding: 0.12em 0.08em 0.18em;
  text-transform: capitalize;
  line-height: 0.92;
}

.quote-line-script span {
  display: block;
  white-space: nowrap;
}

.hero-stage {
  min-height: 100svh;
  height: 100svh;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 6.5rem 0 1.5rem;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  align-items: start;
  gap: 0.5rem;
  overflow: hidden;
  position: relative;
}

.hero-background-word {
  position: absolute;
  left: 0.5rem;
  top: 5rem;
  font-size: clamp(4rem, 18vw, 14rem);
  line-height: 0.84;
  color: var(--surface-panel);
  z-index: 0;
  pointer-events: none;
}

.impact-main,
.impact-secondary,
.sensory-wide,
.sensory-dark,
.grit-image,
.catalog-item {
  border: 1px solid var(--line);
  background: rgba(var(--paper-rgb), 0.45);
}

.hero-card {
  border: 1px solid var(--line);
  background: rgba(var(--paper-rgb), 0.45);
}

.impact-main img,
.impact-secondary img,
.sensory-wide img,
.sensory-dark img,
.grit-image img,
.catalog-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-copy {
  position: relative;
  z-index: 1;
  width: max-content;
  max-width: min(100%, calc(100vw - 2rem));
  margin: 0 auto;
  text-align: left;
}

.hero-kicker {
  margin: 0 0 0.8rem;
  letter-spacing: 0.08em;
}

.hero-title {
  display: inline-block;
  margin: 0;
  padding-inline: 0.045em;
  margin-inline: -0.045em;
  font-size: clamp(3.9rem, 11vw, 9.8rem);
  line-height: 0.88;
  max-width: none;
  letter-spacing: -0.07em;
  word-break: normal;
  overflow-wrap: normal;
}

.title-line,
.hero-title em {
  display: block;
  white-space: nowrap;
}

.title-line-shift {
  margin-left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-line-over {
  display: block;
}

.title-line-tail {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: max-content;
  margin-left: 3.55ch;
}

.title-line-offset {
  display: block;
}

.title-line-accent {
  margin-top: 0.18em;
  font-style: normal;
  color: var(--blue);
  font-size: clamp(2.8rem, 5vw, 5.5rem);
  line-height: normal;
  letter-spacing: 0;
  margin-left: 0;
}

.hero-gallery {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: end;
  gap: clamp(0.75rem, 2vw, 2rem);
  min-height: 0;
  align-self: end;
  padding: 0;
}

.hero-card-wrap {
  position: relative;
  width: fit-content;
  max-width: none;
}

.hero-card {
  position: relative;
  margin: 0;
  width: fit-content;
  box-shadow: 0 30px 60px rgba(63, 97, 45, 0.12);
  overflow: visible;
}

.hero-card picture {
  display: block;
}

.hero-card img {
  display: block;
  width: auto;
  height: auto !important;
  max-width: min(25vw, 18.5rem);
  max-height: min(31svh, 19.5rem);
  object-fit: contain !important;
  object-position: center;
}

.hero-card-left {
  align-self: end;
  z-index: 2;
}

.hero-card-left-wrap {
  justify-self: start;
  align-self: end;
  margin-left: -1px;
  z-index: 3;
}

.hero-card-center {
  position: relative;
  justify-self: center;
  align-self: center;
  z-index: 4;
}

.hero-card-right-wrap {
  justify-self: end;
  align-self: end;
  margin-right: -1px;
  z-index: 2;
}

.hero-card-right {
  align-self: end;
  z-index: 2;
}

.hero-sticker {
  position: absolute;
  z-index: 3;
  max-width: 18rem;
  padding: 0.7rem 0.8rem;
  font-size: 0.9rem;
  line-height: 1.15;
  box-shadow: 0 12px 24px rgba(63, 97, 45, 0.12);
  transform-origin: center;
}

.sticker-handwritten {
  font-family: 'Rock Salt', cursive;
  font-style: normal;
  letter-spacing: 0;
  text-transform: none;
}

.title-script {
  font-family: 'Ballet', cursive;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}

.hero-sticker-acid {
  left: 72%;
  top: 58%;
  width: max-content;
  max-width: calc(100vw - 2rem);
  background: var(--red);
  color: var(--text-inverse);
  white-space: nowrap;
  transform: translate(0, -50%);
  z-index: 4;
}

.hero-sticker-acid span {
  display: block;
}

.hero-sticker-dark {
  right: 1rem;
  top: 9.2rem;
  background: var(--blue);
  color: var(--paper);
  mix-blend-mode: multiply;
  isolation: isolate;
}

.hero-sticker-manifesto {
  left: 14rem;
  top: 10.5rem;
  background: rgba(var(--paper-rgb), 0.92);
}

.hero-sticker-shift {
  left: 50%;
  top: 0;
  transform: translate(-50%, -22%) rotate(-1deg);
  background: rgba(var(--paper-rgb), 0.92);
  z-index: 4;
  white-space: nowrap;
}

.panel {
  padding: 1rem;
}

.panel-impact,
.panel-grit {
  margin-top: 1rem;
}

.panel-sensory,
.panel-break,
.panel-human,
.panel-taste,
.panel-spread,
.panel-scatter,
.panel-catalog {
  margin-top: 3rem;
}

.panel-spread {
  padding: 0;
}

.spread-stage {
  position: relative;
  min-height: 100svh;
  background: var(--ink);
  overflow: clip;
}

.spread-image {
  position: absolute;
  margin: 0;
  border: none;
}

.spread-image picture,
.spread-image img {
  display: block;
  width: 100%;
  height: 100%;
}

.spread-image img {
  object-fit: cover;
}

.spread-image-back {
  inset: 0;
}

.spread-image-back img {
  object-position: center;
}

.spread-image-left {
  position: absolute;
  left: 3%;
  top: 11%;
  width: min(42vw, 34rem);
  height: 72%;
  z-index: 4;
}

.spread-image-right {
  right: 0;
  top: 0;
  width: min(18vw, 16rem);
  height: 62%;
  z-index: 3;
}

.spread-image-bottom {
  right: 0;
  bottom: 0;
  width: min(18vw, 16rem);
  height: 24%;
  z-index: 3;
}

.spread-card {
  position: absolute;
  right: 7%;
  bottom: 8%;
  z-index: 5;
  width: min(62rem, 62%);
  padding: 1.4rem 1.2rem 1.6rem;
  background: rgba(255, 252, 252, 0.96);
  color: var(--ink);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.16);
}

.spread-card-copy {
  display: grid;
  gap: 0.9rem;
}

.spread-card-copy p {
  margin: 0;
  max-width: 52ch;
  line-height: 1.6;
}

.panel-scatter {
  min-height: 100svh;
  isolation: isolate;
  background:
    radial-gradient(circle at 18% 30%, rgba(201, 35, 22, 0.12), transparent 18rem),
    radial-gradient(circle at 84% 76%, rgba(76, 94, 247, 0.12), transparent 20rem),
    var(--surface-base);
}

.scatter-hover-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 0.45s ease,
    transform 0.7s ease;
  filter: none;
}

.panel-scatter-active .scatter-hover-bg {
  opacity: 1;
  transform: scale(1);
}

.scatter-board {
  position: relative;
  z-index: 1;
  min-height: max(72rem, 100svh);
  padding: 1rem 0 10rem;
}

.scatter-contact-sheet {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
  margin-top: 76rem;
  padding: 0 0.75rem;
}

.contact-sheet-item {
  position: relative;
  min-height: 7rem;
  margin: 0;
  overflow: clip;
}

.contact-sheet-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scatter-card {
  position: absolute;
  width: 7.5rem;
  transition:
    transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.45s ease,
    filter 0.45s ease,
    border-color 0.35s ease;
  will-change: transform;
}

.scatter-card:hover {
  z-index: 20;
  filter: saturate(1.08) contrast(1.05);
  box-shadow: 0 24px 48px rgba(63, 97, 45, 0.18);
  border-color: rgba(76, 94, 247, 0.4);
  transform: scale(1.06) rotate(-1.5deg);
}

.scatter-index {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
}

.scatter-image {
  display: block;
  background: rgba(var(--paper-rgb), 0.55);
}

.scatter-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scatter-card-1 {
  left: 0.5rem;
  top: 2rem;
  width: 7rem;
}

.scatter-card-2 {
  left: 14%;
  top: 0.5rem;
  width: 8.2rem;
}

.scatter-card-3 {
  left: 31%;
  top: 1rem;
  width: 7.2rem;
}

.scatter-card-4 {
  right: 30%;
  top: 1rem;
  width: 6.6rem;
}

.scatter-card-5 {
  right: 16%;
  top: 0.9rem;
  width: 7rem;
}

.scatter-card-6 {
  right: 8%;
  top: 3.2rem;
  width: 7rem;
}

.scatter-card-7 {
  left: 10%;
  top: 17rem;
  width: 6.6rem;
}

.scatter-card-8 {
  left: 25%;
  top: 17.5rem;
  width: 7.4rem;
}

.scatter-card-9 {
  left: 46%;
  top: 18rem;
  width: 7.8rem;
}

.scatter-card-10 {
  right: 10%;
  top: 19rem;
  width: 8rem;
}

.scatter-card-11 {
  left: 10%;
  top: 34rem;
  width: 8.2rem;
}

.scatter-card-12 {
  left: 41%;
  top: 33rem;
  width: 8.6rem;
}

.scatter-card-13 {
  left: 58%;
  top: 33rem;
  width: 7.6rem;
}

.scatter-card-14 {
  right: 22%;
  top: 34rem;
  width: 7rem;
}

.scatter-card-15 {
  right: 9%;
  top: 39rem;
  width: 8.4rem;
}

.scatter-card-16 {
  right: 4%;
  top: 53rem;
  width: 7.8rem;
}

.scatter-note {
  position: absolute;
  right: 0;
  top: 11rem;
  width: min(15rem, 40vw);
  color: rgba(63, 97, 45, 0.28);
}

.scatter-note p {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.scatter-quote {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  text-align: center;
}

.scatter-quote p {
  margin: 0;
  font-size: clamp(2.4rem, 8vw, 6.4rem);
  line-height: 0.94;
  letter-spacing: -0.06em;
}

.scatter-quote footer {
  margin-top: 1.3rem;
  font-size: clamp(0.95rem, 2vw, 1.6rem);
  letter-spacing: 0.06em;
}

.scatter-sticker {
  position: absolute;
  z-index: 2;
  max-width: 16rem;
  padding: 0.45rem 0.6rem;
  background: rgba(255, 252, 252, 0.9);
  border: 1px solid var(--line);
  box-shadow: 0 14px 28px rgba(63, 97, 45, 0.12);
}

.scatter-sticker-1 {
  left: 36%;
  top: 8rem;
  background: var(--red);
  color: var(--text-inverse);
}

.scatter-sticker-2 {
  right: 20%;
  top: 28rem;
}

.scatter-sticker-3 {
  left: 18%;
  top: 52rem;
  background: var(--blue);
  color: var(--text-inverse);
}

.panel-heading {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: end;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.panel-heading-right {
  justify-content: flex-end;
}

.panel-number {
  font-size: clamp(2rem, 8vw, 6rem);
  line-height: 0.8;
  color: var(--red);
}

.panel-label {
  margin: 0 0 0.18rem;
  letter-spacing: 0.08em;
}

.impact-composition,
.sensory-stage,
.grit-layout {
  position: relative;
}

.impact-main {
  position: relative;
  min-height: 34rem;
}

.overlay-copy {
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: 1rem;
  pointer-events: none;
}

.overlay-copy-bottom {
  top: auto;
  bottom: 1rem;
}

.overlay-big {
  display: inline-block;
  max-width: min(10ch, 82vw);
  font-size: clamp(2rem, 8vw, 5.6rem);
  line-height: 0.9;
  color: var(--paper);
  text-shadow: 0 2px 18px rgba(63, 97, 45, 0.45);
  letter-spacing: -0.05em;
  overflow-wrap: anywhere;
}

.impact-secondary {
  position: relative;
  width: min(62%, 20rem);
  min-height: 13rem;
  margin: -3.5rem 0 0 auto;
  z-index: 3;
}

.impact-text,
.floating-quote,
.catalog-footer,
.dark-panel {
  border: 1px solid var(--line);
}

.impact-text {
  position: relative;
  z-index: 4;
  width: min(28rem, calc(100% - 1rem));
  margin: -2.5rem 0 0 0;
  padding: 1rem;
}

.impact-text p:first-child,
.floating-quote span,
.catalog-headline p,
.catalog-footer p:first-child {
  margin: 0 0 0.65rem;
}

.impact-text p:last-child,
.floating-quote p,
.catalog-footer p:last-child,
.grit-essay p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.acid-panel {
  background: var(--olive);
}

.acid-panel p:last-child {
  color: rgba(63, 97, 45, 0.9);
}

.sensory-stage {
  min-height: 44rem;
}

.sensory-wide {
  position: absolute;
  left: 0;
  top: 0;
  width: 72%;
  height: 56%;
}

.floating-quote {
  position: absolute;
  right: 0;
  top: 18%;
  z-index: 4;
  width: min(25rem, calc(100vw - 2rem));
  padding: 1rem;
  background: rgba(var(--paper-rgb), 0.9);
  backdrop-filter: blur(8px);
}

.sensory-dark {
  position: absolute;
  right: 4%;
  bottom: 0;
  width: 78%;
  height: 44%;
  background: var(--blue);
}

.grit-layout {
  display: grid;
  gap: 1rem;
}

.grit-stickers {
  display: contents;
}

.dark-panel {
  position: relative;
  background: var(--green);
  color: var(--paper);
  padding: 1rem;
}

.essay-word {
  display: block;
  margin-bottom: 0.8rem;
  font-size: clamp(2.8rem, 10vw, 7rem);
  line-height: 0.84;
  letter-spacing: -0.05em;
}

.grit-essay p {
  color: rgba(255, 252, 252, 0.82);
}

.grit-image {
  position: relative;
  min-height: 26rem;
}

.mini-tag {
  position: relative;
  background: var(--red);
  color: var(--text-inverse);
  padding: 0.35rem 0.5rem;
  width: fit-content;
}

.mini-tag-secondary {
  background: rgba(var(--paper-rgb), 0.92);
  color: var(--ink);
}

.mini-tag-tertiary {
  background: var(--blue);
}

.break-layout,
.human-layout,
.taste-layout {
  display: grid;
  gap: 1rem;
}

.break-image-large,
.human-image,
.taste-image {
  min-height: 24rem;
}

.break-copy,
.human-copy,
.taste-copy {
  padding: 1rem;
}

.break-copy p,
.human-copy p,
.taste-copy p,
.catalog-footer p {
  margin: 0 0 0.85rem;
  line-height: 1.65;
}

.break-copy p:last-child,
.human-copy p:last-child,
.taste-copy p:last-child,
.catalog-footer p:last-child {
  margin-bottom: 0;
}

.human-layout {
  grid-template-columns: 1fr;
}

.taste-layout {
  align-items: start;
}

.taste-sticker {
  display: inline-block;
  width: fit-content;
  padding: 0.35rem 0.55rem;
  background: var(--red);
  color: var(--text-inverse);
}

.taste-sticker-secondary {
  background: var(--blue);
}

.catalog-headline {
  margin-bottom: 1.1rem;
}

.catalog-headline h2 {
  margin: 0;
  font-size: clamp(2.8rem, 8vw, 7rem);
  line-height: 0.9;
  max-width: 9ch;
  letter-spacing: -0.06em;
  overflow-wrap: anywhere;
}

.catalog-board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.catalog-item {
  background: rgba(var(--paper-rgb), 0.76);
  transform: translateY(0);
}

.catalog-item:nth-child(2),
.catalog-item:nth-child(5),
.catalog-item:nth-child(7) {
  transform: translateY(1.25rem);
}

.catalog-label {
  display: block;
  padding: 0.45rem 0.55rem;
  border-bottom: 1px solid var(--line);
}

.catalog-item picture {
  display: block;
  aspect-ratio: 0.92;
}

.catalog-footer {
  margin-top: 2rem;
  width: min(34rem, 100%);
  margin-left: auto;
  padding: 1rem;
  background: rgba(var(--paper-rgb), 0.82);
}

.catalog-footer-wide {
  width: min(42rem, 100%);
}

.panel-catalog {
  background: linear-gradient(180deg, rgba(201, 35, 22, 0.96), rgba(201, 35, 22, 0.9)), var(--red);
  color: var(--text-inverse);
}

.panel-catalog .catalog-headline p,
.panel-catalog .catalog-headline h2,
.panel-catalog .catalog-label,
.panel-catalog .catalog-footer p:first-child,
.panel-catalog .catalog-footer p:last-child {
  color: var(--text-inverse);
}

.panel-catalog .catalog-item {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.28);
}

.panel-catalog .catalog-label {
  border-bottom-color: rgba(255, 255, 255, 0.28);
}

.panel-catalog .catalog-footer {
  background: rgba(63, 97, 45, 0.26);
  border-color: rgba(255, 255, 255, 0.24);
}

@media (max-width: 767px) {
  .hero-background-word {
    font-size: clamp(3rem, 15vw, 7rem);
    top: 4.75rem;
  }

  .hero-copy {
    padding-top: 10rem;
  }

  .hero-stage {
    height: auto;
    min-height: 100svh;
    padding-bottom: 2rem;
  }

  .hero-title {
    font-size: clamp(3.9rem, 11vw, 9.8rem);
  }

  .hero-gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }

  .hero-card img {
    max-width: min(66vw, 16.5rem);
    max-height: min(26svh, 16.5rem);
  }

  .hero-card-left {
    justify-self: start;
  }

  .hero-card-center {
    justify-self: center;
  }

  .hero-card-right-wrap {
    justify-self: end;
  }

  .impact-main {
    min-height: 29rem;
  }

  .impact-secondary {
    width: min(58%, 14rem);
    min-height: 10rem;
    margin-top: -2rem;
  }

  .impact-text {
    width: calc(100% - 1rem);
    margin-top: -1.2rem;
  }

  .overlay-copy {
    left: 0.8rem;
    right: 0.8rem;
    top: 0.8rem;
  }

  .overlay-copy-bottom {
    bottom: 0.8rem;
  }

  .sensory-stage {
    min-height: 48rem;
  }

  .sensory-wide {
    position: relative;
    width: 100%;
    height: 18rem;
  }

  .floating-quote {
    position: relative;
    top: auto;
    right: auto;
    margin: 14rem 0 0 auto;
  }

  .sensory-dark {
    width: 88%;
    height: 18rem;
  }

  .scatter-note {
    top: 7.5rem;
    width: min(12rem, 42vw);
  }

  .scatter-quote {
    padding: 0 0.75rem;
  }

  .scatter-sticker {
    max-width: 10.5rem;
    font-size: 0.74rem;
  }

  .scatter-sticker-1 {
    left: auto;
    right: 0.75rem;
    top: 8.5rem;
  }

  .scatter-sticker-2 {
    right: 0.75rem;
    top: 30rem;
  }

  .scatter-sticker-3 {
    left: 0.75rem;
    top: 58rem;
  }

  .spread-image-left {
    left: 0;
    top: 0;
    width: 78%;
    height: 42%;
  }

  .spread-image-right {
    width: 28%;
    height: 34%;
  }

  .spread-image-bottom {
    width: 34%;
    height: 18%;
  }

  .spread-card {
    right: 1rem;
    left: 1rem;
    bottom: 1rem;
    width: auto;
  }

  .scatter-contact-sheet {
    margin-top: 78rem;
  }
}

@media (max-width: 1440px) {
  .hero-title {
    font-size: clamp(3.6rem, 9.6vw, 8.4rem);
  }
}

@media (min-width: 768px) {
  .hero-stage {
    padding: 8rem 3vw 0;
  }

  .hero-copy {
    padding: 0 10vw;
  }

  .panel {
    padding: 1.5rem 3vw 2rem;
  }

  .panel-spread {
    padding: 0;
  }

  .quote-stage-content {
    padding: 7rem 4vw 12rem;
  }

  .quote-stage-title {
    margin: 9rem 0 0 48%;
    max-width: 9ch;
  }

  .panel-impact {
    min-height: 62rem;
  }

  .impact-main {
    position: absolute;
    left: 0;
    top: 3.4rem;
    width: 58%;
    min-height: 42rem;
  }

  .impact-secondary {
    position: absolute;
    right: 0;
    top: 0;
    width: min(29%, 22rem);
    min-height: 22rem;
    margin: 0;
  }

  .impact-text {
    position: absolute;
    right: 7%;
    bottom: 4rem;
    margin: 0;
  }

  .panel-sensory {
    min-height: 66rem;
  }

  .sensory-stage {
    min-height: 56rem;
  }

  .sensory-wide {
    left: 4%;
    width: 56%;
    height: 58%;
  }

  .floating-quote {
    right: 5%;
    top: 10%;
  }

  .sensory-dark {
    right: 10%;
    width: 52%;
    height: 42%;
  }

  .panel-grit {
    min-height: 54rem;
  }

  .grit-layout {
    grid-template-columns: 0.8fr 0.48fr 0.58fr 0.62fr;
    align-items: end;
    gap: 1.3rem;
  }

  .grit-image-a {
    transform: translateY(3rem);
  }

  .grit-image-b {
    transform: translateY(-2rem);
  }

  .break-layout {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }

  .human-layout {
    grid-template-columns: 0.95fr 0.52fr 0.52fr;
    align-items: end;
  }

  .taste-layout {
    grid-template-columns: 0.92fr 0.58fr;
    align-items: start;
  }

  .catalog-board {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }

  .scatter-card-1 {
    left: 3%;
    top: 2rem;
    width: 9rem;
  }

  .scatter-card-2 {
    left: 13%;
    top: 1rem;
    width: 10rem;
  }

  .scatter-card-3 {
    left: 24%;
    top: 1rem;
    width: 8rem;
  }

  .scatter-card-4 {
    left: 32%;
    top: 1rem;
    width: 8.5rem;
  }

  .scatter-card-5 {
    left: 42%;
    top: 0.9rem;
    width: 7.4rem;
  }

  .scatter-card-6 {
    left: 74%;
    top: 2rem;
    width: 8rem;
  }

  .scatter-card-7 {
    left: 3%;
    top: 18rem;
    width: 8.5rem;
  }

  .scatter-card-8 {
    left: 22%;
    top: 17rem;
    width: 7.6rem;
  }

  .scatter-card-9 {
    left: 42%;
    top: 17rem;
    width: 7.8rem;
  }

  .scatter-card-10 {
    left: 84%;
    top: 19rem;
    width: 8.5rem;
  }

  .scatter-card-11 {
    left: 13%;
    top: 36rem;
    width: 8.8rem;
  }

  .scatter-card-12 {
    left: 42%;
    top: 37rem;
    width: 8.5rem;
  }

  .scatter-card-13 {
    left: 54%;
    top: 36.5rem;
    width: 7.8rem;
  }

  .scatter-card-14 {
    left: 71%;
    top: 35rem;
    width: 7rem;
  }

  .scatter-card-15 {
    left: 84%;
    top: 38rem;
    width: 8.6rem;
  }

  .scatter-card-16 {
    left: 86%;
    top: 53rem;
    width: 8rem;
  }

  .scatter-note {
    right: 1.5%;
    top: 8.5rem;
    width: 14rem;
  }

  .scatter-contact-sheet {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 0.8rem;
    margin-top: 70rem;
    padding: 0;
  }

  .contact-sheet-item {
    min-height: 10rem;
  }

  .catalog-item:nth-child(1) {
    transform: translateY(0);
  }

  .catalog-item:nth-child(2) {
    transform: translateY(2rem);
  }

  .catalog-item:nth-child(3) {
    transform: translateY(0.6rem);
  }

  .catalog-item:nth-child(4) {
    transform: translateY(3rem);
  }

  .catalog-item:nth-child(5) {
    transform: translateY(-0.4rem);
  }

  .catalog-item:nth-child(6) {
    transform: translateY(2.3rem);
  }

  .catalog-item:nth-child(7) {
    transform: translateY(0.8rem);
  }

  .catalog-item:nth-child(8) {
    transform: translateY(3.4rem);
  }

  .catalog-footer {
    margin-top: 4.5rem;
  }
}
</style>
