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
            <img
              class="impact-main-image"
              :src="images.coffee.src"
              :alt="images.coffee.alt"
              loading="lazy"
            />
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

        <figure class="impact-tertiary panel-media">
          <img :src="images.jordan.src" :alt="images.jordan.alt" loading="lazy" />
        </figure>

        <div class="impact-text panel-copy">
          <div class="impact-columns">
            <div class="impact-column">
              <p class="font-display uppercase">Design has changed.</p>
              <p class="font-display uppercase">Not visually, but fundamentally.</p>
              <p>Design is no longer about being good.</p>
              <p>Or clean.</p>
              <p>Or correct.</p>
              <p>That era is over.</p>
            </div>

            <div class="impact-column">
              <p>
                Clean, neutral, “well-designed” work is everywhere now. It’s fast to produce, easy
                to replicate, and increasingly invisible.
              </p>
              <p>What cuts through is no longer perfection. It’s presence.</p>
              <p>
                Work that feels alive. Work that feels chosen. Work that feels like someone actually
                made decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="quoteStage" class="quote-stage global-fade-up global-fade-visible">
      <picture ref="quoteStageBg" class="quote-stage-bg">
        <source :srcset="srcSetWide(images.blurField)" type="image/webp" />
        <img :src="images.blurField.src" :alt="images.blurField.alt" loading="lazy" />
      </picture>

      <div class="quote-stage-content">
        <figure class="quote-stage-envelope panel-media">
          <img :src="images.quoteEnvelope.src" :alt="images.quoteEnvelope.alt" loading="lazy" />
        </figure>

        <figure class="quote-stage-overlay-image panel-media">
          <img :src="images.quoteOverlay.src" :alt="images.quoteOverlay.alt" loading="lazy" />
        </figure>

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
        <p class="panel-label font-display uppercase">more feeling - less explaining</p>
      </div>

      <div class="sensory-stage">
        <div class="sensory-collage">
          <figure class="sensory-card sensory-card-top-left panel-media">
            <picture>
              <source :srcset="srcSet(images.citrus)" type="image/webp" />
              <img :src="images.citrus.src" :alt="images.citrus.alt" loading="lazy" />
            </picture>
          </figure>

          <figure class="sensory-card sensory-card-top-right panel-media">
            <picture>
              <source :srcset="srcSet(images.swirl)" type="image/webp" />
              <img :src="images.swirl.src" :alt="images.swirl.alt" loading="lazy" />
            </picture>
          </figure>

          <div class="sensory-sticker font-display sticker-handwritten uppercase">
            Make it felt, not understood
          </div>

          <figure class="sensory-card sensory-card-bottom panel-media">
            <picture>
              <source :srcset="srcSet(images.hansSilhouette)" type="image/webp" />
              <img
                :src="images.hansSilhouette.src"
                :alt="images.hansSilhouette.alt"
                loading="lazy"
              />
            </picture>
            <figcaption class="overlay-copy overlay-copy-bottom">
              <span class="overlay-big font-display uppercase"
                >design should not explain. it should hit.</span
              >
            </figcaption>
          </figure>

          <figure class="sensory-card sensory-card-inline panel-media">
            <img :src="images.olivie.src" :alt="images.olivie.alt" loading="lazy" />
          </figure>
        </div>

        <div class="floating-quote panel-copy">
          <p class="sensory-lead">
            <span>People don’t read first.</span>
            <span>They react first.</span>
          </p>
          <p class="sensory-body">
            Before hierarchy, before structure, before meaning,
            <span>there’s a sensation.</span>
          </p>
          <p class="sensory-list">
            <span>A texture.</span>
            <span>A tension.</span>
            <span>A temperature.</span>
            <span>A discomfort.</span>
            <span>A pull.</span>
            <span>A curiosity.</span>
          </p>
          <p class="sensory-body">
            The role of design is shifting from clarity to emotion.
            <span>Not just showing something, but making it felt.</span>
          </p>
          <p class="sensory-closing">
            <span>Because information is forgettable.</span>
            <span>Feeling isn’t.</span>
          </p>
        </div>
      </div>
    </section>

    <section class="panel panel-spread">
      <div class="spread-scroll" :style="{ '--spread-steps': spreadStackImages.length + 1 }">
        <div class="spread-stage">
          <div class="spread-bg" aria-hidden="true">
            <div
              v-for="(color, index) in spreadBackgrounds"
              :key="`spread-bg-${index}`"
              class="spread-bg-layer"
              :style="{ backgroundColor: color }"
            ></div>
          </div>

          <div class="spread-stack">
            <figure
              v-for="(item, index) in spreadStackImages"
              :key="item.key"
              class="spread-stack-item spread-image panel-media"
              :data-spread-bg="item.bg"
              :style="spreadStackStyle(item, spreadStackImages.length - index + 1)"
            >
              <picture>
                <source :srcset="item.srcSet(item.image)" type="image/webp" />
                <img
                  :src="item.image.src"
                  :alt="item.image.alt"
                  :style="{ objectPosition: item.objectPosition ?? 'center' }"
                  loading="lazy"
                />
              </picture>
            </figure>

            <div
              class="spread-stack-item spread-card panel-copy"
              :style="spreadStackStyle(spreadCardConfig, 1)"
            >
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
                  A direction only exists once you’ve pushed it far enough to risk ruining it.
                  That’s where taste begins.
                </p>
                <p>Not in moderation. Not in compromise.</p>
                <p>In excess. In tension. In decisions that don’t try to be validated.</p>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </section>

    <section class="panel panel-catalog">
      <div class="catalog-layout">
        <div class="catalog-copy">
          <div class="panel-heading catalog-heading">
            <span class="panel-number font-display">10</span>
            <p class="panel-label font-display uppercase">what actually matters</p>
          </div>

          <div class="catalog-headline">
            <h2 class="font-display uppercase">
              <span class="catalog-title-line">design is not decoration.</span>
              <span class="catalog-title-divider" aria-hidden="true"></span>
              <span class="catalog-title-line catalog-title-line-shift">it’s a position.</span>
            </h2>
          </div>

          <div class="catalog-footer catalog-footer-wide">
            <p>And in 2026, the only thing that matters is this:</p>
            <p class="catalog-footer-script">
              Did you make something that feels like you meant it?
            </p>
            <p>Or something that could have been made by anyone.</p>
          </div>
        </div>

        <figure class="catalog-side-image panel-media">
          <picture>
            <source :srcset="srcSetWide(images.liane)" type="image/webp" />
            <img :src="images.liane.src" :alt="images.liane.alt" loading="lazy" />
          </picture>
        </figure>
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

type SpreadStackConfig = {
  key: string;
  rotate: string;
  offsetX: string;
  offsetY: string;
  width: string;
  aspectRatio?: string;
  scale?: string;
  bg: string;
  image?: InspoImage;
  objectPosition?: string;
  srcSet?: (image: InspoImage) => string;
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
    src: '/assets/media/pages/2026-inspo/annie-spratt-v5gPEQqhy1c-unsplash.jpg',
    src1600: '/assets/media/pages/2026-inspo/annie-spratt-v5gPEQqhy1c-unsplash.jpg',
    alt: 'Atmospheric still image by Annie Spratt with a soft editorial mood.',
  },
  quoteOverlay: {
    src: '/assets/media/pages/2026-inspo/evelyn-verdin-qpFOfd7o1gY-unsplash.png',
    src1600: '/assets/media/pages/2026-inspo/evelyn-verdin-qpFOfd7o1gY-unsplash.png',
    alt: 'Small cutout image overlay by Evelyn Verdin.',
  },
  quoteEnvelope: {
    src: '/assets/media/pages/2026-inspo/evelyn-verdin-ZmvOI3mGREg-unsplash.png',
    src1600: '/assets/media/pages/2026-inspo/evelyn-verdin-ZmvOI3mGREg-unsplash.png',
    alt: 'Open envelope and letter cutout by Evelyn Verdin.',
  },
  olivie: {
    src: '/assets/media/pages/2026-inspo/olivie-strauss-EDMEVpvUzhg-unsplash.jpg',
    src1600: '/assets/media/pages/2026-inspo/olivie-strauss-EDMEVpvUzhg-unsplash.jpg',
    alt: 'Moody editorial still life by Olivie Strauss.',
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
  liane: {
    src: '/assets/media/pages/2026-inspo/liane-tHHoR5oJyY4-unsplash-960.webp',
    src1600: '/assets/media/pages/2026-inspo/liane-tHHoR5oJyY4-unsplash-1920.webp',
    alt: 'Atmospheric portrait by Liane with moody editorial light.',
  },
  jordan: {
    src: '/assets/media/pages/2026-inspo/jordan-gonzalez-7hco7GHzQKw-unsplash.jpg',
    src1600: '/assets/media/pages/2026-inspo/jordan-gonzalez-7hco7GHzQKw-unsplash.jpg',
    alt: 'Soft editorial image by Jordan Gonzalez with warm tones and tactile atmosphere.',
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

const spreadStackImages: SpreadStackConfig[] = [
  {
    key: 'spread-ramses',
    image: images.ramsesTexture,
    srcSet: srcSetWide,
    rotate: '-11deg',
    offsetX: '-4%',
    offsetY: '1%',
    width: 'min(32rem, 72vw)',
    aspectRatio: '0.78',
    scale: '1.02',
    bg: '#3b261d',
    objectPosition: 'center 52%',
  },
  {
    key: 'spread-laura',
    image: images.lauraPortrait,
    srcSet: srcSet,
    rotate: '9deg',
    offsetX: '6%',
    offsetY: '-2%',
    width: 'min(29rem, 68vw)',
    aspectRatio: '0.76',
    bg: '#b57f65',
    objectPosition: 'center 38%',
  },
  {
    key: 'spread-ivana',
    image: images.ivanaDog,
    srcSet: srcSetWide,
    rotate: '-7deg',
    offsetX: '-7%',
    offsetY: '4%',
    width: 'min(30rem, 70vw)',
    aspectRatio: '0.74',
    bg: '#26211f',
    objectPosition: 'center',
  },
  {
    key: 'spread-annie',
    image: images.annieField,
    srcSet: srcSet,
    rotate: '12deg',
    offsetX: '4%',
    offsetY: '6%',
    width: 'min(27rem, 66vw)',
    aspectRatio: '0.74',
    bg: '#8b7f68',
    objectPosition: 'center 60%',
  },
  {
    key: 'spread-joshua',
    image: images.joshuaForest,
    srcSet: srcSet,
    rotate: '-8deg',
    offsetX: '-2%',
    offsetY: '-5%',
    width: 'min(31rem, 72vw)',
    aspectRatio: '0.78',
    bg: '#425348',
    objectPosition: 'center',
  },
  {
    key: 'spread-polina',
    image: images.polinaMotion,
    srcSet: srcSet,
    rotate: '6deg',
    offsetX: '3%',
    offsetY: '2%',
    width: 'min(28rem, 69vw)',
    aspectRatio: '0.78',
    bg: '#c4875d',
    objectPosition: 'center',
  },
];

const spreadCardConfig: SpreadStackConfig = {
  key: 'spread-card',
  rotate: '-3deg',
  offsetX: '2%',
  offsetY: '4%',
  width: 'min(42rem, 86vw)',
  aspectRatio: '1',
  scale: '1',
  bg: '#f2eadf',
};

const spreadBackgrounds = [...spreadStackImages.map((item) => item.bg), spreadCardConfig.bg];

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

function spreadStackStyle(item: SpreadStackConfig, zIndex: number) {
  return {
    '--spread-rotate': item.rotate,
    '--spread-offset-x': item.offsetX,
    '--spread-offset-y': item.offsetY,
    '--spread-width': item.width,
    '--spread-aspect': item.aspectRatio ?? '0.76',
    '--spread-scale': item.scale ?? '1',
    '--spread-z': String(zIndex),
  } as Record<string, string>;
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsapContext = gsap.context(() => {
    const scrollerEl =
      (document.querySelector('[data-scroll-container]') as HTMLElement) || undefined;
    const triggerDefaults = scrollerEl ? { scroller: scrollerEl } : {};
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const allowHeavyScrollFx = !prefersReducedMotion && !isCoarsePointer && !ScrollTrigger.isTouch;

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from('.title-line', { y: 56, opacity: 0, rotate: 1.5, duration: 1.05, stagger: 0.1 })
      .from(
        '.hero-kicker, .hero-intro',
        { y: 28, opacity: 0, duration: 0.8, stagger: 0.08 },
        '-=0.65',
      )
      .from('.magazine-float', { y: 40, opacity: 0, duration: 1, stagger: 0.12 }, '-=1');

    if (allowHeavyScrollFx) {
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

      gsap.to('.impact-main-image', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.panel-impact',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
          ...triggerDefaults,
        },
      });

      gsap.to('.panel-impact .overlay-copy', {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.panel-impact',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
          ...triggerDefaults,
        },
      });
    }

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

    if (allowHeavyScrollFx) {
      gsap.to('.quote-stage-overlay-image', {
        y: -92,
        x: 340,
        rotate: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.quote-stage',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
          ...triggerDefaults,
        },
      });
    }

    const spreadPanel = document.querySelector('.panel-spread');
    const spreadStage = spreadPanel?.querySelector('.spread-stage');
    const spreadBackgroundLayers = gsap.utils.toArray<HTMLElement>(
      '.panel-spread .spread-bg-layer',
    );
    const spreadCards = gsap.utils.toArray<HTMLElement>('.panel-spread .spread-image');
    const spreadCopyCard = spreadPanel?.querySelector<HTMLElement>('.spread-card');

    if (
      spreadPanel &&
      spreadStage &&
      spreadCards.length &&
      spreadCopyCard &&
      spreadBackgroundLayers.length
    ) {
      gsap.set(spreadBackgroundLayers, { opacity: 0 });
      gsap.set(spreadBackgroundLayers[0], { opacity: 1 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: spreadPanel,
            start: 'top 72%',
            once: true,
            ...triggerDefaults,
          },
          defaults: { ease: 'power2.inOut' },
        })
        .from('.panel-spread .spread-stack-item', {
          opacity: 0,
          y: 48,
          force3D: true,
          duration: 0.7,
          stagger: 0.08,
        })
        .from(
          spreadCopyCard,
          {
            scale: 0.94,
            duration: 0.8,
          },
          0,
        );

      if (allowHeavyScrollFx) {
        const spreadTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: spreadPanel.querySelector('.spread-scroll'),
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.45,
            ...triggerDefaults,
          },
        });

        spreadCards.forEach((card, index) => {
          spreadTimeline.to(
            spreadBackgroundLayers[index + 1],
            {
              opacity: 1,
              duration: 0.22,
              ease: 'none',
            },
            index,
          );

          spreadTimeline.to(
            card,
            {
              yPercent: -190,
              xPercent: index % 2 === 0 ? -8 : 8,
              rotation: index % 2 === 0 ? '-=10' : '+=10',
              opacity: 0.14,
              force3D: true,
              duration: 0.82,
              ease: 'none',
            },
            index,
          );
        });
      }
    }

    gsap.utils.toArray<HTMLElement>('.panel').forEach((panel) => {
      if (panel.classList.contains('panel-spread') || panel.classList.contains('panel-scatter')) {
        return;
      }

      const media = Array.from(panel.querySelectorAll<HTMLElement>('.panel-media'));
      const copy = Array.from(panel.querySelectorAll<HTMLElement>('.panel-copy, .panel-heading'));
      const cards = Array.from(panel.querySelectorAll<HTMLElement>('.catalog-item'));

      if (!media.length && !copy.length && !cards.length) {
        return;
      }

      const panelTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          once: true,
          ...triggerDefaults,
        },
        defaults: { ease: 'power3.out' },
      });

      if (copy.length) {
        panelTimeline.from(copy, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08 });
      }

      if (media.length) {
        panelTimeline.from(media, { y: 40, opacity: 0, duration: 0.95, stagger: 0.12 }, '-=0.5');
      }

      if (cards.length) {
        panelTimeline.from(cards, { y: 40, opacity: 0, duration: 0.7, stagger: 0.05 }, '-=0.45');
      }
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

.quote-stage-content {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 175svh;
  margin-top: -100svh;
  padding: 8rem 1rem 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quote-stage-envelope {
  position: absolute;
  left: 4%;
  bottom: 17vh;
  width: min(18vw, 12rem);
  z-index: 2;
  margin: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  pointer-events: none;
  transform-origin: center top;
  will-change: transform;
}

.quote-stage-envelope img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.quote-stage-overlay-image {
  position: absolute;
  right: 8%;
  top: 18svh;
  width: min(22vw, 16rem);
  z-index: 1;
  margin: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  pointer-events: none;
  transform-origin: center center;
  will-change: transform;
}

.quote-stage-overlay-image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
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
  margin-top: 1.18em;
  font-style: normal;
  max-width: 9ch;
  color: rgba(255, 252, 252, 0.96);
  font-size: 0.8em;
  line-height: 1.2;
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
  overflow: visible;
  position: relative;
  z-index: 2;
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
.sensory-card,
.grit-image,
.catalog-item {
  background: rgba(var(--paper-rgb), 0.45);
}

.hero-card {
  background: rgba(var(--paper-rgb), 0.45);
}

.impact-main img,
.impact-secondary img,
.sensory-card img,
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
}

.hero-sticker-manifesto {
  left: 14rem;
  top: 10.5rem;
  background: rgba(var(--paper-rgb), 0.92);
}

.hero-sticker-shift {
  left: 50%;
  top: -8px;
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

.panel-impact {
  z-index: 1;
}

.panel-sensory {
  padding: 0;
  min-height: 44rem;
  margin-top: 0;
  overflow: hidden;
}

.panel-sensory,
.panel-break,
.panel-human,
.panel-taste,
.panel-scatter,
.panel-catalog {
  margin-top: 3rem;
}

.panel-spread {
  padding: 0;
  background: #3b261d;
}

.spread-scroll {
  min-height: calc(var(--spread-steps, 7) * 100svh);
  position: relative;
  background: #3b261d;
}

.spread-stage {
  position: sticky;
  top: 0;
  display: grid;
  place-items: center;
  height: 100svh;
  padding: 2rem;
  background: #3b261d;
  overflow: hidden;
  isolation: isolate;
}

.spread-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.spread-bg-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  will-change: opacity;
}

.spread-stack {
  position: relative;
  z-index: 1;
  width: min(40rem, 92vw);
  height: min(46rem, 82vh);
  overflow: visible;
  contain: layout;
}

.spread-image {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: var(--spread-z);
  width: var(--spread-width);
  aspect-ratio: var(--spread-aspect);
  margin: 0;
  overflow: hidden;
  border: 0.08rem solid rgba(19, 16, 16, 0.12);
  box-shadow: 0 1.6rem 3rem rgba(8, 6, 6, 0.18);
  transform: translate(calc(-50% + var(--spread-offset-x)), calc(-50% + var(--spread-offset-y)))
    rotate(var(--spread-rotate)) scale(var(--spread-scale));
  will-change: transform, opacity;
  backface-visibility: hidden;
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

.spread-card {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: var(--spread-z);
  width: var(--spread-width);
  max-width: 100%;
  padding: 1.7rem 1.4rem 1.9rem;
  background: rgba(255, 249, 244, 0.95);
  color: var(--ink);
  border: 0.08rem solid rgba(58, 40, 28, 0.14);
  box-shadow: 0 1.8rem 3.4rem rgba(11, 7, 6, 0.16);
  transform: translate(calc(-50% + var(--spread-offset-x)), calc(-50% + var(--spread-offset-y)))
    rotate(var(--spread-rotate)) scale(var(--spread-scale));
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.spread-card-copy {
  display: grid;
  gap: 0.9rem;
}

.spread-card-copy p {
  margin: 0;
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
  padding: 7.5rem 0 10rem;
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
    border-color 0.35s ease;
  will-change: transform;
}

.scatter-card:hover {
  z-index: 20;
  box-shadow: 0 18px 32px rgba(63, 97, 45, 0.14);
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

.impact-tertiary {
  position: relative;
  width: min(68%, 22rem);
  max-width: 22rem;
  margin: 2rem 0 0 10%;
  z-index: 2;
  overflow: visible;
}

.impact-tertiary img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.impact-text {
  position: relative;
  z-index: 4;
  width: min(31rem, calc(100% - 1rem));
  margin: -2.5rem 0 0 0;
  padding: 1rem;
  background: transparent;
}

.impact-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
  align-items: start;
}

.impact-column p {
  margin: 0 0 0.85rem;
}

.impact-column p:last-child {
  margin-bottom: 0;
}

.impact-text p:first-child,
.sensory-sticker,
.catalog-headline p,
.catalog-footer p:first-child {
  margin: 0 0 0.65rem;
}

.impact-column p.font-display {
  font-size: clamp(1.35rem, 2vw, 1.9rem);
  line-height: 1.08;
}

.acid-panel {
  background: var(--olive);
}

.acid-panel p:last-child {
  color: rgba(63, 97, 45, 0.9);
}

.sensory-stage {
  min-height: 44rem;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 0.56fr) minmax(0, 0.44fr);
  grid-template-areas: 'collage quote';
  align-items: stretch;
  gap: 0;
  width: 100%;
  margin: 0;
}

.panel-sensory > .panel-heading {
  position: absolute;
  top: 0.85rem;
  right: 1rem;
  z-index: 5;
  margin: 0;
}

.sensory-sticker {
  position: absolute;
  left: 50%;
  top: 0.9rem;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  max-width: none;
  padding: 0.42rem 1.15rem;
  margin: 0;
  background: rgba(255, 252, 252, 0.9);
  box-shadow: 0 10px 24px rgba(34, 31, 30, 0.08);
  z-index: 4;
  white-space: nowrap;
  text-wrap: nowrap;
  line-height: 1;
}

.sensory-collage {
  grid-area: collage;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: minmax(0, 0.4fr) minmax(0, 0.45fr) auto;
  align-self: stretch;
  gap: 0;
  height: 100%;
  min-height: 44rem;
}

.floating-quote {
  grid-area: quote;
  position: relative;
  z-index: 4;
  width: min(25rem, calc(100vw - 2rem));
  margin: auto;
  padding: 1rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.floating-quote p {
  margin: 0;
}

.sensory-lead {
  display: grid;
  gap: 0.12rem;
  margin-bottom: 1rem;
  font-family: var(--font-family-display);
  font-size: clamp(1.55rem, 2.3vw, 2.15rem);
  line-height: 0.96;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  justify-items: center;
}

.sensory-lead span,
.sensory-body span,
.sensory-closing span {
  display: block;
}

.sensory-body {
  max-width: 24ch;
  margin-bottom: 1rem;
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.45;
  text-align: center;
}

.sensory-body span {
  margin-top: 0.3rem;
  font-family: var(--font-family-display);
  font-size: clamp(1.2rem, 1.9vw, 1.65rem);
  line-height: 1.02;
  text-transform: uppercase;
  letter-spacing: -0.04em;
}

.sensory-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.55rem;
  margin-bottom: 1.15rem;
  font-family: var(--font-family-display);
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  line-height: 1.02;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  justify-content: center;
}

.sensory-closing {
  display: grid;
  gap: 0.18rem;
  max-width: 18ch;
  font-size: clamp(1.02rem, 1.2vw, 1.14rem);
  line-height: 1.35;
  justify-items: center;
  text-align: center;
}

.sensory-closing span:last-child {
  font-family: var(--font-family-display);
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  line-height: 0.95;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.sensory-inline-image {
  width: min(12rem, 58%);
  margin: 1rem 0 0 auto;
}

.sensory-inline-image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.sensory-card {
  position: relative;
  margin: 0;
  min-height: 0;
  height: 100%;
}

.sensory-card-top-left,
.sensory-card-top-right {
  aspect-ratio: auto;
}

.sensory-card-bottom {
  grid-column: 1 / -1;
}

.sensory-card-inline {
  grid-column: 1 / -1;
  justify-self: stretch;
  align-self: stretch;
  width: 100%;
  max-width: none;
  aspect-ratio: 1.95;
  min-height: 0;
  overflow: hidden;
}

.sensory-card-inline img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.taste-copy p {
  margin: 0 0 0.85rem;
  line-height: 1.65;
}
.catalog-footer p {
  margin: 0 0 0.85rem;
  line-height: 1.25;
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
  margin-bottom: clamp(0.45rem, 1.5vh, 1.1rem);
}

.catalog-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 50%);
  align-items: stretch;
  height: 100%;
  min-height: 100%;
}

.catalog-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: clamp(0.65rem, 1.4vh, 1rem) 1.5rem clamp(0.8rem, 1.8vh, 1.15rem) 0;
}

.catalog-headline h2 {
  margin: 0;
  font-size: clamp(2.15rem, min(6vw, 10.5vh), 6.4rem);
  line-height: 0.86;
  max-width: 10ch;
  letter-spacing: -0.06em;
  overflow-wrap: anywhere;
}

.catalog-title-line {
  display: block;
  text-align: left;
}

.catalog-title-divider {
  display: block;
  width: 100%;
  margin: 0.2em 0 0.26em;
  border-top: 3px solid currentColor;
}

.catalog-title-line-shift {
  text-align: right;
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
  margin-top: clamp(0.6rem, 1.6vh, 1.4rem);
  width: min(34rem, 100%);
  margin-left: auto;
  padding: 0;
}

.catalog-footer-wide {
  width: min(42rem, 100%);
}

.catalog-footer-script {
  font-family: 'Ballet', cursive;
  font-size: clamp(1.9rem, min(3.4vw, 5.8vh), 3.85rem);
  line-height: 0.8;
  text-transform: none;
  letter-spacing: 0;
}

.catalog-side-image {
  margin: 0;
  min-height: 100%;
  align-self: stretch;
}

.catalog-side-image picture,
.catalog-side-image img {
  display: block;
  width: 100%;
  height: 100%;
}

.catalog-side-image img {
  object-fit: cover;
}

.panel-catalog {
  background: linear-gradient(180deg, rgba(201, 35, 22, 0.96), rgba(201, 35, 22, 0.9)), var(--red);
  color: var(--text-inverse);
  height: 100svh;
  overflow: hidden;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.panel-catalog .catalog-headline p,
.panel-catalog .catalog-headline h2,
.panel-catalog .panel-number,
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

@media (max-width: 767px) {
  .catalog-layout {
    grid-template-columns: 1fr;
  }

  .catalog-copy {
    padding: 1rem;
  }

  .catalog-side-image {
    min-height: 20rem;
  }

  .quote-stage-overlay-image {
    right: 1rem;
    top: 16svh;
    width: min(42vw, 10rem);
  }

  .quote-stage-envelope {
    left: 0.75rem;
    top: 12svh;
    width: min(30vw, 7.5rem);
  }

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

  .impact-columns {
    grid-template-columns: 1fr;
    gap: 0.4rem;
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
    grid-template-columns: 1fr;
    grid-template-areas:
      'collage'
      'quote';
  }

  .sensory-collage {
    width: 100%;
    min-height: 32rem;
  }

  .sensory-sticker {
    top: 0.75rem;
    transform: translateX(-50%);
    max-width: min(calc(100% - 1.5rem), 15rem);
    white-space: normal;
    text-align: center;
    text-wrap: balance;
  }

  .floating-quote {
    position: relative;
    top: auto;
    right: auto;
    margin: 1rem 0 0 auto;
  }

  .sensory-card {
    min-height: 10rem;
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

  .spread-stage {
    padding: 1rem;
  }

  .spread-stack {
    width: 100%;
    height: min(42rem, 78svh);
  }

  .spread-image {
    width: min(80vw, 22rem);
    border-radius: 1rem;
  }

  .spread-card {
    width: min(92vw, 27rem);
    padding: 1.35rem 1.1rem 1.45rem;
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

  .panel-sensory {
    padding: 0;
    margin-top: 0;
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

  .impact-composition {
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

  .impact-tertiary {
    position: absolute;
    left: 10%;
    bottom: 2rem;
    width: min(24%, 18rem);
    max-width: 18rem;
    margin: 0;
  }

  .impact-text {
    position: absolute;
    right: 7%;
    bottom: 4rem;
    width: min(34rem, 38vw);
    margin: 0;
  }

  .sensory-stage {
    min-height: 56rem;
    grid-template-columns: minmax(0, 0.58fr) minmax(0, 0.42fr);
    grid-template-areas: 'collage quote';
    gap: 0;
  }

  .sensory-collage {
    gap: 0;
    min-height: 56rem;
  }

  .floating-quote {
    margin-top: 6.2rem;
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
