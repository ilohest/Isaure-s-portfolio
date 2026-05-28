<template>
  <section class="contact-page container mx-auto flex flex-col px-4 md:px-6">
    <h1 class="sr-only">Contact Isaure Lohest</h1>
    <section class="contact-hero" @pointermove="onHeroPointerMove" @pointerleave="resetHeroLetters">
      <div ref="contactHeroWord" class="contact-hero-word" aria-hidden="true">
        <span
          v-for="(letter, index) in heroLetters"
          :key="`hero-letter-${index}`"
          :ref="(el) => setHeroLetterRef(el as HTMLElement | null, index)"
          class="contact-hero-letter"
          :style="heroLetterStyles[index]"
        >
          {{ letter }}
        </span>
      </div>
      <p class="contact-hero-caption">
        Got a platform to build, a brand to launch, or a site that needs to finally feel right?
        Tell me what you&apos;re working on.
      </p>
    </section>

    <div class="contact-top flex flex-col gap-6 md:flex-row md:items-stretch">
      <div
        class="contact-intro flex w-full flex-col text-left text-[var(--text-primary)] md:w-[30%]"
      >
        <p>
          <a href="mailto:isaure.lohest@gmail.com" class="contact-email text-inherit">
            isaure.lohest@gmail.com
          </a>
        </p>
      </div>

      <div class="w-full md:w-[70%]">
        <div
          v-if="submitState === 'success'"
          class="contact-success-shell flex flex-col gap-4 bg-[var(--surface-muted)] p-4 text-[var(--text-primary)] md:p-6"
        >
          <h2 class="font-display text-xl text-[var(--text-primary)] uppercase">Thank you!</h2>
          <p class="font-light">
            Your message has been sent and I’ve received your request. I’ll get back to you within
            24 hours to discuss your project.
          </p>
        </div>

        <form
          v-else
          class="contact-form-shell flex w-full max-w-none flex-col gap-3 p-4 text-[var(--text-primary)] md:p-5"
          @submit.prevent="submitForm"
        >
          <p
            v-if="submitState === 'error'"
            class="border border-[var(--text-primary)] p-3 text-sm text-red-800"
          >
            Something went wrong while sending your message. Please try again or email me directly.
          </p>

          <div class="flex w-full flex-col">
            <InputText
              id="name"
              name="name"
              v-model="formData.name"
              required
              placeholder="Your name"
              class="raw-field w-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div class="flex w-full flex-col">
            <InputText
              id="email"
              name="_replyto"
              type="email"
              ref="email"
              v-model="formData.email"
              required
              placeholder="Where should I send my reply?"
              class="raw-field w-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div class="flex w-full flex-col">
            <Textarea
              id="additional-info"
              name="additional-info"
              v-model="formData.additionalInfo"
              rows="4"
              required
              placeholder="What are you building, and what do you want it to feel like?"
              class="raw-field raw-textarea w-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            :disabled="submitState === 'loading'"
            :loading="submitState === 'loading'"
            :label="submitState === 'loading' ? 'Sending...' : 'Send'"
            :icon="submitState === 'loading' ? undefined : 'pi pi-arrow-right'"
            icon-pos="right"
            class="raw-submit font-display mt-1 self-end px-6 py-2 text-base font-bold tracking-wide uppercase transition disabled:cursor-not-allowed disabled:opacity-60"
          />
        </form>
      </div>
    </div>

    <div class="contact-strip-bleed">
      <div ref="contactStripWrap" class="contact-strip-wrap">
        <div
          ref="contactStripTrack"
          class="contact-strip-track"
          :style="{ transform: `translate3d(${stripOffset}px,0,0)` }"
        >
          <figure
            v-for="(image, index) in contactStripImages"
            :key="`${image.src}-${index}`"
            class="contact-strip-item"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              decoding="async"
              @load="onStripImageLoad"
            />
          </figure>
        </div>
      </div>
    </div>

    <div
      class="legal-box rounded-[2px] border border-[var(--text-primary)] p-2 text-sm text-[var(--text-primary)] md:p-3"
    >
      <p>
        Lohest d'Hooghvorst, Isaure - travaille par l’intermédiaire de la coopérative d’activités
        JobYourself Coop - N° de TVA : BE 0479 233 349 - Siège social et d’exploitation : Chaussée
        de Charleroi 112, 1060 Bruxelles -
        <a href="mailto:info@jobyourself.be" class="text-inherit">info@jobyourself.be</a> -
        <a href="http://www.jobyourself.be" target="_blank" class="text-inherit"
          >www.jobyourself.be</a
        >
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

import { getDb } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { ContactFormState, SubmitState } from '@/types/contact-form';
import { CONTACT_STRIP_IMAGES } from '@/data/contact-strip-images';
import {
  buildContactMessagePayload,
  createInitialFormData,
  isValidEmail,
} from '@/types/contact-form';

type ContactStripImage = {
  src: string;
  alt: string;
};

const HERO_WORD = 'CONTACT.';

export default defineComponent({
  name: 'ContactIsaure',
  components: {
    InputText,
    Textarea,
    Button,
  },

  props: {
    isDark: { type: Boolean, default: false },
  },

  setup() {
    const route = useRoute();
    const formData = reactive<ContactFormState>(createInitialFormData());
    const submitState = ref<SubmitState>('idle');
    const contactStripWrap = ref<HTMLElement | null>(null);
    const contactStripTrack = ref<HTMLElement | null>(null);
    const stripOffset = ref(0);
    const maxStripOffset = ref(0);
    const contactStripImages = ref<ContactStripImage[]>([...CONTACT_STRIP_IMAGES]);
    const contactHeroWord = ref<HTMLElement | null>(null);
    const heroLetters = HERO_WORD.split('');
    const contactHeroLetters = ref<(HTMLElement | null)[]>([]);
    const heroLetterStyles = ref(
      heroLetters.map(() => ({
        transform: 'translate3d(0px, 0px, 0) scale(1)',
      })),
    );
    let stripScrollTarget: Window | HTMLElement =
      typeof window !== 'undefined' ? window : globalThis.window;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const shuffleStripImages = () => {
      const shuffled = [...contactStripImages.value];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = tmp;
      }
      contactStripImages.value = shuffled;
    };

    const updateStripBounds = () => {
      if (!contactStripWrap.value || !contactStripTrack.value) return;
      const available = contactStripTrack.value.scrollWidth - contactStripWrap.value.clientWidth;
      maxStripOffset.value = Math.max(0, available);
    };

    const updateStripOffset = () => {
      if (!contactStripWrap.value) return;
      const rect = contactStripWrap.value.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
      stripOffset.value = -maxStripOffset.value * progress;
    };

    const onStripImageLoad = () => {
      updateStripBounds();
      updateStripOffset();
    };

    const setHeroLetterRef = (el: HTMLElement | null, index: number) => {
      contactHeroLetters.value[index] = el;
    };

    const resetHeroLetters = () => {
      heroLetterStyles.value = heroLetters.map(() => ({
        transform: 'translate3d(0px, 0px, 0) scale(1)',
      }));
    };

    const onHeroPointerMove = (event: PointerEvent) => {
      if (window.matchMedia?.('(pointer: coarse)')?.matches) return;

      heroLetterStyles.value = heroLetters.map((_, index) => {
        const el = contactHeroLetters.value[index];
        if (!el) return { transform: 'translate3d(0px, 0px, 0) scale(1)' };

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 190);
        const shiftX = dx * 0.16 * influence;
        const shiftY = dy * 0.1 * influence;
        const lift = -16 * influence;
        const scale = 1 + 0.42 * influence;

        return {
          transform: `translate3d(${shiftX.toFixed(2)}px, ${(shiftY + lift).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`,
        };
      });
    };

    const resetForm = () => {
      Object.assign(formData, createInitialFormData());
    };

    const submitForm = async () => {
      if (!isValidEmail(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      submitState.value = 'loading';

      try {
        const db = getDb();
        if (!db) {
          throw new Error('Firestore is not available in the current runtime.');
        }

        const source = window.location.hostname;
        const payload = buildContactMessagePayload(formData, serverTimestamp(), source);

        await addDoc(collection(db, 'contactMessages'), payload);

        submitState.value = 'success';
        resetForm();

        await nextTick();
        updateStripBounds();
        updateStripOffset();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } catch (err) {
        console.error('[ContactForm] submit error:', err);
        submitState.value = 'error';
      }
    };

    onMounted(() => {
      const subject = route.query?.subject;
      const message = route.query?.message;

      if (typeof subject === 'string' && !formData.name) formData.name = subject;
      if (typeof message === 'string' && !formData.additionalInfo)
        formData.additionalInfo = message;

      shuffleStripImages();
      const customScroller = document.querySelector('main[data-scroll-container]');
      stripScrollTarget = customScroller instanceof HTMLElement ? customScroller : window;
      updateStripBounds();
      updateStripOffset();
      resetHeroLetters();
      window.addEventListener('resize', updateStripBounds, { passive: true });
      window.addEventListener('resize', updateStripOffset, { passive: true });
      window.addEventListener('resize', resetHeroLetters, { passive: true });
      stripScrollTarget.addEventListener('scroll', updateStripOffset, { passive: true });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateStripBounds);
      window.removeEventListener('resize', updateStripOffset);
      window.removeEventListener('resize', resetHeroLetters);
      stripScrollTarget.removeEventListener('scroll', updateStripOffset);
    });

    return {
      contactHeroWord,
      formData,
      submitState,
      submitForm,
      contactStripImages,
      contactStripWrap,
      contactStripTrack,
      stripOffset,
      heroLetters,
      heroLetterStyles,
      onStripImageLoad,
      onHeroPointerMove,
      resetHeroLetters,
      setHeroLetterRef,
    };
  },
});
</script>

<style scoped>
.contact-page {
  --contact-gap: 1.5rem;
  gap: var(--contact-gap);
  padding-top: calc(48px + 0.9rem);
}

.contact-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 2.4vw, 2rem);
  padding: clamp(4rem, 6vw, 5rem) 0 clamp(1.5rem, 3vw, 2.5rem);
}

.contact-hero-caption {
  max-width: 58rem;
  margin: 0;
  font-family: 'Synt Mono Regular', monospace;
  font-size: clamp(1.35rem, 3.8vw, 2rem);
  line-height: 1.16;
  letter-spacing: 0;
  color: var(--text-primary);
  text-align: center;
}

.contact-hero-word {
  color: #ffffff;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--text-primary);
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  line-height: 0.82;
  cursor: default;
  user-select: none;
  white-space: nowrap;
}

.contact-hero-letter {
  display: inline-block;
  font-family: var(--font-family-display);
  font-size: clamp(3.3rem, 12.8vw, 14rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform-origin: 50% 75%;
  transition:
    transform 280ms cubic-bezier(0.2, 0.9, 0.2, 1),
    color 180ms ease;
  will-change: transform;
}

.contact-top {
  align-items: stretch;
  padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.contact-intro {
  gap: 1.2rem;
  justify-content: flex-start;
  font-family: var(--font-family-display);
  text-transform: uppercase;
}

.contact-intro a {
  text-transform: none;
  letter-spacing: 0;
}

.contact-email {
  font-family: var(--font-family-body);
  font-weight: 300;
}

@media (max-width: 970px) {
  .contact-page {
    padding-top: calc(62px + 0.8rem);
  }

  .contact-hero {
    min-height: auto;
    gap: 0.5rem;
  }

  .contact-hero-word {
    width: 100%;
    justify-content: space-between;
    line-height: 0.88;
  }

  .contact-hero-letter {
    flex: 0 0 auto;
    font-size: clamp(2.7rem, 13.8vw, 5.6rem);
    letter-spacing: -0.11em;
  }
}

@media (min-width: 971px) {
  .contact-top {
    gap: clamp(2.5rem, 4vw, 4.5rem);
  }

  .contact-intro {
    gap: 1.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero-letter {
    transition: none;
  }
}

.contact-form-shell {
  border: 0;
  border-radius: 0;
  background: transparent;
  padding: 0 !important;
}

.contact-success-shell {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
}

.raw-field {
  border: 0 !important;
  border-bottom: 1px solid var(--text-primary) !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--text-primary) !important;
  caret-color: var(--text-primary);
  padding: 0.85rem 0 0.75rem !important;
}

:global(.contact-page .raw-field::placeholder) {
  color: rgba(23, 23, 23, 0.62) !important;
  opacity: 1 !important;
}

:global(.contact-page .raw-field::-webkit-input-placeholder) {
  color: rgba(23, 23, 23, 0.62) !important;
  opacity: 1 !important;
}

:global(body.dark-mode .contact-page .raw-field::placeholder) {
  color: rgba(23, 23, 23, 0.62) !important;
  opacity: 1 !important;
}

:global(body.dark-mode .contact-page .raw-field::-webkit-input-placeholder) {
  color: rgba(23, 23, 23, 0.62) !important;
  opacity: 1 !important;
}

.raw-field:focus-visible {
  border-bottom-color: var(--surface-accent) !important;
  outline: 0;
}

:global(html.home-palette-sun .contact-page .raw-field:focus),
:global(html.home-palette-sun .contact-page .raw-field:focus-visible) {
  border-bottom-color: #ff572a !important;
}

.raw-textarea {
  min-height: 130px;
  resize: vertical;
}

.raw-submit {
  border: 1px solid var(--text-primary);
  border-radius: 999px;
  background: var(--text-primary);
  color: var(--text-inverse);
}

.raw-submit:hover:not(:disabled) {
  border-color: var(--surface-accent);
  background: var(--surface-accent);
  color: var(--text-inverse);
}

.contact-strip-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  margin-bottom: var(--contact-gap);
}

.contact-strip-wrap {
  overflow: hidden;
  width: 100%;
}

.contact-strip-track {
  display: flex;
  gap: 12px;
  width: max-content;
  will-change: transform;
  transition: transform 0.08s linear;
}

.contact-strip-item {
  margin: 0;
  height: clamp(170px, 22vw, 320px);
  width: clamp(300px, 25vw, 520px);
  overflow: hidden;
}

.contact-strip-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--text-primary);
}

.legal-box {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  background: var(--surface-muted);
}

@media screen and (max-width: 970px) {
  .contact-strip-track {
    gap: 10px;
  }

  .contact-strip-item {
    width: clamp(220px, 62vw, 420px);
    height: clamp(140px, 36vw, 240px);
  }
}
</style>
