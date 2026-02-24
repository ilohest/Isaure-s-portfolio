<template>
  <section
    class="relative top-[55px] container mx-auto flex flex-col gap-4 px-4 pb-4 md:top-[40px] md:px-6 md:pb-8"
  >
    <div class="flex flex-col gap-6 md:flex-row md:items-stretch">
      <div class="flex w-full flex-col text-left text-[var(--main-black)] md:w-[30%]">
        <h1 class="font-display uppercase">Contact</h1>
        <p class="mt-4 font-light">
          Are you ready to transform your ideas into a digital reality? Whether you have a question, a
          project in mind, or need guidance on enhancing your online presence, I'm here to help.
        </p>
        <p class="mt-6 text-base leading-relaxed uppercase md:mt-auto">
          Feel free to reach out to me anytime.
          <br />Let’s create something amazing
          <span class="inline-block font-script text-[var(--red)]">together</span>
          !
        </p>
      </div>

      <div class="w-full md:w-[70%]">
        <div
          v-if="submitState === 'success'"
          class="border-round-xl flex flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:p-6"
        >
          <h2 class="font-display text-xl text-[var(--red)] uppercase">Thank you!</h2>
          <p class="font-light">
            Your message has been sent and I’ve received your request. I’ll get back to you within 24
            hours to discuss your project.
          </p>
        </div>

        <form
          v-else
          class="contact-form-shell flex w-full max-w-none flex-col gap-3 p-4 text-[var(--main-black)] md:p-5"
          @submit.prevent="submitForm"
        >
          <p
            v-if="submitState === 'error'"
            class="border border-[var(--main-black)] p-3 text-sm text-red-800"
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
            <label for="additional-info" class="mb-1 text-xs uppercase">Talk about your project</label>
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
            class="raw-submit mx-auto mt-1 block px-6 py-2 font-display text-base font-bold tracking-wide uppercase transition disabled:cursor-not-allowed disabled:opacity-60"
          />
        </form>
      </div>
    </div>

    <div class="flex flex-col items-center gap-4">
      <div class="flex flex-col items-center">
        <img
          :src="
            isDark
              ? require('../assets/img/isaure-logo-W.png')
              : require('../assets/img/isaure-logo-B.png')
          "
          alt="Logo"
          class="hover-zoom mb-6 max-w-[150px] md:mb-8"
        />
      </div>

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

    <div class="rounded-[2px] border border-[var(--main-black)] bg-[#ece7e1] p-2 text-sm text-[var(--main-black)] md:p-3">
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
.contact-form-shell {
  border: 1px solid var(--main-black);
  border-radius: 2px;
  background: transparent;
}

.raw-field {
  border: 1px solid var(--main-black);
  border-radius: 2px;
  background: transparent;
  color: var(--main-black);
}

.raw-field:focus-visible {
  outline: 1px solid var(--main-black);
}

.raw-textarea {
  min-height: 110px;
  resize: vertical;
}

.raw-submit {
  border: 1px solid var(--main-black);
  border-radius: 2px;
  background: transparent;
  color: var(--main-black);
}

.raw-submit:hover:not(:disabled) {
  background: var(--main-black);
  color: var(--main-white);
}

.services-image {
  width: 100%;
  border-radius: 2px;
  object-fit: cover;
  height: 620px;
  object-position: 0 -55px;
}
.amazing span {
  color: #a6ff00;
  text-shadow:
    -2px -2px 0 var(--red-bg),
    2px -2px 0 var(--red-bg),
    -2px 2px 0 var(--red-bg),
    2px 2px 0 var(--red-bg);
}

@media screen and (min-width: 971px) {
  .services-image {
    object-position: 50% 50%;
  }
}
@media screen and (max-width: 970px) {
  .services-image {
    height: 100%;
    object-position: unset;
  }
}
</style>
