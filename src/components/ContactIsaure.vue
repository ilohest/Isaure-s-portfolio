<template>
  <section
    class="relative top-[55px] container mx-auto flex flex-col gap-4 px-4 pb-4 md:top-[40px] md:px-6 md:pb-8"
  >
    <div
      class="justify-content-between align-items-center flex flex-col gap-4 text-[var(--red)] md:flex-row md:gap-2 md:gap-8"
    >
      <h1 class="font-['Xanh_Mono'] uppercase md:pr-8">Contact</h1>

      <p class="font-light md:pl-8">
        Are you ready to transform your ideas into a digital reality? Whether you have a question, a
        project in mind, or need guidance on enhancing your online presence, I'm here to help.
      </p>
    </div>

    <!-- Bloc "formulaire OU message de succès" -->
    <div
      v-if="submitState === 'success'"
      class="border-round-xl flex flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:p-6"
    >
      <h2 class="font-['Xanh_Mono'] text-xl text-[var(--red)] uppercase">Thank you!</h2>
      <p class="font-light">
        Your message has been sent and I’ve received your request. I’ll get back to you as soon as
        possible to talk more about your project.
      </p>
    </div>

    <form
      v-else
      class="border-round-xl flex flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:p-6"
      @submit.prevent="submitForm"
    >
      <!-- Message d’erreur au-dessus du form, uniquement en cas d’erreur -->
      <p v-if="submitState === 'error'" class="border-round-xl bg-red-100 p-3 text-sm text-red-800">
        Something went wrong while sending your message. Please try again or email me directly.
      </p>

      <Accordion :multiple="true" :activeIndex="[0, 1]" class="flex flex-col gap-4">
        <!-- ACCORDION 1 : INFOS PERSONNELLES -->
        <AccordionTab header="Personal information">
          <!-- Basic Information -->
          <div class="flex flex-col gap-4 md:flex-row md:gap-2">
            <div class="flex w-full flex-col md:w-1/2">
              <label for="name" class="mb-2 uppercase">Full Name</label>
              <InputText
                id="name"
                name="name"
                v-model="formData.name"
                required
                placeholder="Your name"
                class="border-round-xl w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
              />
            </div>

            <div class="flex w-full flex-col md:w-1/2">
              <label for="email" class="mb-2 uppercase">Email</label>
              <InputText
                id="email"
                name="_replyto"
                type="email"
                ref="email"
                v-model="formData.email"
                required
                placeholder="Your email"
                class="border-round-xl w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
              />
            </div>
          </div>

          <!-- Phone + Preferred Contact -->
          <div class="mt-4 flex flex-col gap-4 md:flex-row md:gap-2">
            <div class="flex w-full flex-col md:w-1/2">
              <label for="phone-number" class="mb-2 uppercase">Phone Number (Optional)</label>
              <InputMask
                id="phone-number"
                name="phone-number"
                ref="phoneNumber"
                v-model="formData.phoneNumber"
                mask="999999999999999"
                :unmask="true"
                placeholder="Your phone number"
                class="border-round-xl w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
              />
            </div>

            <div class="flex w-full flex-col md:w-1/2">
              <p class="mb-2 uppercase">Preferred Contact Method</p>
              <SelectButton
                v-model="formData.contactMethod"
                :options="contactMethodOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
              />
            </div>
          </div>
        </AccordionTab>

        <!-- ACCORDION 2 : PROJET -->
        <AccordionTab header="Project details">
          <!-- Project Type + Pages -->
          <div class="flex flex-col gap-4 md:flex-row md:gap-2">
            <div class="flex w-full flex-col md:w-1/2">
              <p class="mb-2 uppercase">Project Type</p>
              <SelectButton
                v-model="formData.projectType"
                :options="projectTypeOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
              />
              <InputText
                v-if="formData.projectType === 'other'"
                v-model="formData.projectTypeOther"
                name="project-type-other"
                placeholder="If other, please specify"
                class="border-round-xl mt-3 w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
              />

              <label for="number-of-pages" class="mt-4 mb-2 uppercase">Number of Pages</label>
              <Dropdown
                id="number-of-pages"
                v-model="formData.numberOfPages"
                name="number-of-pages"
                :options="pagesOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select number of pages"
                class="border-round-xl w-full"
                panelClass="border-round-xl"
              />
            </div>

            <div class="flex w-full flex-col md:w-1/2">
              <p class="mb-2 uppercase">Key Features</p>
              <SelectButton
                v-model="formData.features"
                :options="featuresOptions"
                optionLabel="label"
                optionValue="value"
                multiple
                class="flex w-full flex-wrap gap-2"
              />
              <InputText
                v-if="formData.features.includes('other')"
                v-model="formData.featuresOther"
                name="features-other"
                placeholder="If other, please specify"
                class="border-round-xl mt-3 w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
              />
            </div>
          </div>

          <!-- Identity + Deadline -->
          <div class="mt-4 flex flex-col gap-4 md:flex-row md:gap-2">
            <div class="flex w-full flex-col md:w-1/2">
              <p class="mb-2 uppercase">Do you have a visual identity?</p>
              <SelectButton
                v-model="formData.visualIdentity"
                :options="visualIdentityOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
              />
            </div>

            <div class="flex w-full flex-col md:w-1/2">
              <label for="deadline" class="mb-2 uppercase">Desired Completion Time</label>
              <Dropdown
                id="deadline"
                v-model="formData.deadline"
                name="deadline"
                :options="deadlineOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select a deadline"
                class="border-round-xl w-full"
                panelClass="border-round-xl"
              />
            </div>
          </div>

          <!-- Additional Information -->
          <div class="mt-4">
            <label for="additional-info" class="mb-2 block uppercase">Additional Information</label>
            <Textarea
              id="additional-info"
              name="additional-info"
              v-model="formData.additionalInfo"
              rows="4"
              placeholder="Any other details you'd like to share with me about your project."
              class="border-round-xl w-full border border-black/10 bg-white px-4 py-4 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
              autoResize
            />
          </div>
        </AccordionTab>
      </Accordion>

      <!-- Submit -->
      <div class="mt-4">
        <Button
          type="submit"
          :disabled="submitState === 'loading'"
          :loading="submitState === 'loading'"
          :label="submitState === 'loading' ? 'Sending...' : 'Send'"
          class="border-round-xl mx-auto block border-2 border-[var(--red)] bg-[var(--brat)] px-8 py-3 text-xl font-bold tracking-wide text-[var(--red)] uppercase transition hover:bg-[var(--brat-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form>

    <!-- Aside -->
    <div class="flex flex-col gap-4">
      <p class="m-6 text-center text-3xl uppercase md:m-8">
        Feel free to reach out to me anytime. <br />Let’s create something amazing
        <span class="inline-block font-['Reenie_Beanie'] text-[var(--red)]">together</span>
        !
      </p>

      <picture>
        <source
          type="image/avif"
          srcset="
            /assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-640.avif   640w,
            /assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-960.avif   960w,
            /assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-1280.avif 1280w
          "
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcset="
            /assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-640.webp   640w,
            /assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-960.webp   960w,
            /assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-1280.webp 1280w
          "
          sizes="100vw"
        />
        <img
          src="/assets/img/Pages/getty-images-rzQE1PfPtqk-unsplash-960.png"
          alt=""
          class="services-image"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>

    <!-- Footer block -->
    <div class="border-round-2xl bg-[var(--red-bg)] p-4 text-sm text-[var(--main-white)] md:p-6">
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

<script>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import SelectButton from 'primevue/selectbutton';
import Dropdown from 'primevue/dropdown';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';

import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default {
  name: 'ContactIsaure',
  components: {
    InputText,
    Textarea,
    Accordion,
    AccordionTab,
    SelectButton,
    Dropdown,
    InputMask,
    Button,
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phoneNumber: '',
        contactMethod: 'email',
        projectType: 'website',
        projectTypeOther: '',
        numberOfPages: '1',
        features: [],
        featuresOther: '',
        visualIdentity: '',
        deadline: 'flexible',
        additionalInfo: '',
      },
      submitState: 'idle', // 'idle' | 'loading' | 'success' | 'error'
      submitError: '',

      // --- PrimeVue options ---
      contactMethodOptions: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ],
      projectTypeOptions: [
        { label: 'New Website', value: 'website' },
        { label: 'Site Redesign', value: 'site redesign' },
        { label: 'Site Maintenance', value: 'maintenance' },
        { label: 'Other', value: 'other' },
      ],
      pagesOptions: [
        { label: '1 page', value: '1' },
        { label: '2-5 pages', value: '1-5' },
        { label: '6-10 pages', value: '6-10' },
        { label: '11+ pages', value: '11+' },
      ],
      featuresOptions: [
        { label: 'E-commerce', value: 'e-commerce' },
        { label: 'User Registration/Login', value: 'user registration/login' },
        { label: 'Multilingual', value: 'multilingual' },
        { label: 'Contact Form', value: 'contact form' },
        { label: 'Blog', value: 'blog' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Social Media Integration', value: 'social media integration' },
        { label: 'Photo/Video Gallery', value: 'photo/video gallery' },
        { label: 'Other', value: 'other' },
      ],
      visualIdentityOptions: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      deadlineOptions: [
        { label: 'Urgent (less than 1 month)', value: 'urgent' },
        { label: 'Short term (1-3 months)', value: 'short-term' },
        { label: 'Flexible', value: 'flexible' },
      ],
    };
  },
  methods: {
    async submitForm() {
      // validation email simple
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(this.formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      this.submitState = 'loading';
      this.submitError = '';

      try {
        const payload = {
          name: this.formData.name,
          email: this.formData.email,
          phoneNumber: this.formData.phoneNumber || null,
          contactMethod: this.formData.contactMethod,
          projectType:
            this.formData.projectType === 'other'
              ? this.formData.projectTypeOther || 'other'
              : this.formData.projectType,
          numberOfPages: this.formData.numberOfPages,
          features: this.formData.features,
          featuresOther: this.formData.featuresOther || null,
          visualIdentity: this.formData.visualIdentity,
          deadline: this.formData.deadline,
          additionalInfo: this.formData.additionalInfo,
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, 'contactMessages'), payload);

        this.submitState = 'success';
        this.resetForm();

        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
      } catch (error) {
        console.error('Error sending contact form:', error);
        this.submitState = 'error';
        this.submitError = 'Unable to send your message.';
      }
    },

    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phoneNumber: '',
        contactMethod: 'email',
        projectType: 'website',
        projectTypeOther: '',
        numberOfPages: '1',
        features: [],
        featuresOther: '',
        visualIdentity: '',
        deadline: 'flexible',
        additionalInfo: '',
      };
    },
  },
};
</script>

<style scoped>
.services-image {
  width: 100%;
  border-radius: 10px;
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
.iti {
  width: 100% !important;
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
