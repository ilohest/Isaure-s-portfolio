<template>
  <section class="contact-page container mx-auto flex flex-col px-4 md:px-6">
    <h1 class="sr-only">Contact Isaure Lohest</h1>
    <div class="contact-top flex flex-col gap-6 md:flex-row md:items-stretch">
      <div
        class="contact-intro flex w-full flex-col text-left text-[var(--text-primary)] md:w-[30%]"
      >
        <p class="font-light">
          Are you ready to transform your ideas into a digital reality? Whether you have a question,
          a project in mind, or need guidance on enhancing your online presence, I'm here to help.
        </p>
        <p>
          <a href="mailto:isaure.lohest@gmail.com" class="text-inherit">isaure.lohest@gmail.com</a>
        </p>
        <p class="font-display mt-6 text-[2rem] uppercase md:mt-auto">
          Feel free to reach out to me anytime. Let’s create something amazing
          <span class="font-script inline-block text-[var(--interactive-primary)]">together</span>
          !
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
            <label for="name" class="mb-1 text-xs uppercase">Subject</label>
            <InputText
              id="name"
              name="name"
              v-model="formData.name"
              required
              placeholder="A quick hello, a big idea, or both"
              class="raw-field w-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div class="flex w-full flex-col">
            <label for="email" class="mb-1 text-xs uppercase">Email</label>
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
            <label for="additional-info" class="mb-1 text-xs uppercase"
              >Talk about your project</label
            >
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
            class="raw-submit font-display mx-auto mt-1 block px-6 py-2 text-base font-bold tracking-wide uppercase transition disabled:cursor-not-allowed disabled:opacity-60"
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

import { db } from '@/firebase';
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
        if (!db) {
          throw new Error('Firestore is not available in the current runtime.');
        }

        const payload = buildContactMessagePayload(formData, serverTimestamp());

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
      } catch {
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
      window.addEventListener('resize', updateStripBounds, { passive: true });
      window.addEventListener('resize', updateStripOffset, { passive: true });
      stripScrollTarget.addEventListener('scroll', updateStripOffset, { passive: true });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateStripBounds);
      window.removeEventListener('resize', updateStripOffset);
      stripScrollTarget.removeEventListener('scroll', updateStripOffset);
    });

    return {
      formData,
      submitState,
      submitForm,
      contactStripImages,
      contactStripWrap,
      contactStripTrack,
      stripOffset,
      onStripImageLoad,
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

.contact-top {
  align-items: stretch;
}

.contact-intro {
  gap: 1.2rem;
}

@media (max-width: 970px) {
  .contact-page {
    padding-top: calc(62px + 0.8rem);
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

.contact-form-shell {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: transparent;
}

.contact-success-shell {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
}

.raw-field {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: var(--surface-accent);
  color: #fff;
  caret-color: #fff;
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
  color: rgba(255, 255, 255, 0.8) !important;
  opacity: 1 !important;
}

:global(body.dark-mode .contact-page .raw-field::-webkit-input-placeholder) {
  color: rgba(255, 255, 255, 0.8) !important;
  opacity: 1 !important;
}

.raw-field:focus-visible {
  outline: 1px solid var(--text-primary);
}

.raw-textarea {
  min-height: 110px;
  resize: vertical;
}

.raw-submit {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: transparent;
  color: var(--text-primary);
}

.raw-submit:hover:not(:disabled) {
  background: var(--text-primary);
  color: var(--text-inverse);
}

:global(.dark-mode) .raw-submit.p-button:hover:not(:disabled),
:global(.dark-mode) .raw-submit.p-button:hover:not(:disabled) .p-button-label,
:global(.dark-mode) .raw-submit.p-button:hover:not(:disabled) .p-button-icon {
  color: var(--surface-accent) !important;
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
