<template>
  <section
    class="contact-page relative top-[15px] container mx-auto flex flex-col px-4 pb-4 md:top-[40px] md:px-6 md:pb-8"
  >
    <div class="flex flex-col gap-6 md:flex-row md:items-stretch">
      <div class="flex w-full flex-col text-left text-[var(--text-primary)] md:w-[30%]">
        <p class="font-light">
          Are you ready to transform your ideas into a digital reality? Whether you have a question,
          a project in mind, or need guidance on enhancing your online presence, I'm here to help.
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
          class="border-round-xl flex flex-col gap-4 bg-[var(--surface-muted)] p-4 text-[var(--text-primary)] md:p-6"
        >
          <h2 class="font-display text-xl text-[var(--interactive-primary)] uppercase">
            Thank you!
          </h2>
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
              class="raw-field w-full px-3 py-2 text-sm placeholder:text-black/50 focus:outline-none"
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
              class="raw-field w-full px-3 py-2 text-sm placeholder:text-black/50 focus:outline-none"
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
              class="raw-field raw-textarea w-full px-3 py-2 text-sm placeholder:text-black/50 focus:outline-none"
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

    <div class="flex flex-col items-center gap-4">
      <div class="contact-images-row">
        <div class="contact-image-col-phone">
          <img
            src="/assets/img/Pages/phone.svg"
            alt="Isaure answering to phone"
            class="contact-phone-image"
          />
        </div>

        <div class="contact-image-col-main">
          <picture>
            <source
              type="image/avif"
              srcset="
                /assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-640.avif   640w,
                /assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-960.avif   960w,
                /assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-1280.avif 1280w
              "
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcset="
                /assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-640.webp   640w,
                /assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-960.webp   960w,
                /assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-1280.webp 1280w
              "
              sizes="100vw"
            />
            <img
              src="/assets/media/pages/getty-images-rzQE1PfPtqk-unsplash-960.png"
              alt=""
              class="services-image"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </div>

    <div class="legal-frame">
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
      <div class="legal-outer legal-outer-left" aria-hidden="true"></div>
      <div class="legal-outer legal-outer-right" aria-hidden="true"></div>
    </div>
  </section>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { defineComponent, nextTick, reactive, ref } from 'vue';

import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { ContactFormState, SubmitState } from '@/types/contact-form';
import {
  buildContactMessagePayload,
  createInitialFormData,
  isValidEmail,
} from '@/types/contact-form';

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
    const formData = reactive<ContactFormState>(createInitialFormData());
    const submitState = ref<SubmitState>('idle');

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
        const payload = buildContactMessagePayload(formData, serverTimestamp());

        await addDoc(collection(db, 'contactMessages'), payload);

        submitState.value = 'success';
        resetForm();

        await nextTick();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } catch {
        submitState.value = 'error';
      }
    };

    return {
      formData,
      submitState,
      submitForm,
    };
  },
});
</script>

<style scoped>
.contact-page {
  --contact-gap: 1.5rem;
  gap: var(--contact-gap);
}

.contact-form-shell {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: transparent;
}

.raw-field {
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  background: var(--surface-accent);
  color: #fff;
  caret-color: #fff;
}

.raw-field::placeholder {
  color: #fff !important;
  opacity: 0.6;
}

:global(.dark-mode) .raw-field::placeholder {
  color: #fff !important;
  opacity: 1;
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

.services-image {
  width: 100%;
  border-radius: 2px;
  object-fit: cover;
  height: auto;
  object-position: 0 -55px;
}
.amazing span {
  color: #a6ff00;
  text-shadow:
    -2px -2px 0 var(--surface-accent),
    2px -2px 0 var(--surface-accent),
    -2px 2px 0 var(--surface-accent),
    2px 2px 0 var(--surface-accent);
}

.contact-phone-image {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  object-fit: cover;
}

.contact-images-row {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: var(--contact-gap);
  margin-bottom: var(--contact-gap);
}

.contact-image-col-phone,
.contact-image-col-main {
  width: 100%;
}

.contact-image-col-main picture {
  display: block;
  width: 100%;
}

.legal-frame {
  position: relative;
  margin-bottom: 0;
}

.legal-frame::before,
.legal-frame::after {
  content: '';
  position: absolute;
  top: 100%;
  height: 18vh;
  width: 1px;
  background: var(--text-primary);
  pointer-events: none;
  z-index: 2;
}

.legal-frame::before {
  left: 0;
}

.legal-frame::after {
  right: 0;
}

.legal-box {
  position: relative;
  z-index: 3;
  background: var(--surface-muted);
}

.legal-outer {
  position: absolute;
  top: 100%;
  height: 18vh;
  width: calc((100vw - 100%) / 2);
  background: var(--surface-muted);
  pointer-events: none;
  z-index: 1;
}

.legal-outer-left {
  left: calc((100vw - 100%) / -2);
}

.legal-outer-right {
  right: calc((100vw - 100%) / -2);
}

.legal-box::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 100vw;
  height: 1px;
  background: var(--text-primary);
  transform: translateX(-50%);
  pointer-events: none;
}

@media screen and (min-width: 971px) {
  .contact-images-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    height: clamp(260px, 30vw, 520px);
    align-items: stretch;
  }

  .contact-image-col-phone {
    display: flex;
    width: auto;
    flex: none;
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  .contact-image-col-main {
    display: flex;
    width: auto;
    flex: none;
    min-width: 0;
    height: 100%;
  }

  .contact-phone-image,
  .contact-image-col-main picture {
    height: 100%;
  }

  .services-image {
    height: 100%;
  }

  .services-image {
    object-position: 50% 50%;
  }
}
@media screen and (max-width: 970px) {
  .services-image {
    height: 100%;
    object-position: unset;
  }

  .legal-frame {
    margin-bottom: 0;
  }

  .legal-frame::before,
  .legal-frame::after {
    height: 10vh;
  }

  .legal-outer {
    height: 10vh;
  }
}
</style>
