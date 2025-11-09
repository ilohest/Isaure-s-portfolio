<template>
  <section class="mx-auto flex flex-col gap-4 px-4 py-4 md:px-6 md:py-8">
    <div
      class="justify-content-between align-items-center tex-[var(--red)] flex flex-col gap-4 md:flex-row md:gap-2 md:gap-8"
    >
      <h1 class="font-['Chakra_Petch'] uppercase md:pr-8">Contact</h1>

      <p class="font-light md:pl-8">
        Are you ready to transform your ideas into a digital reality? Whether you have a question, a
        project in mind, or need guidance on enhancing your online presence, I'm here to help.
      </p>
    </div>

    <!-- Form -->
    <form
      action="https://formspree.io/f/mjvnrwey"
      ref="form"
      method="POST"
      enctype="multipart/form-data"
      class="border-round-xl flex flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:p-6"
      @submit.prevent="validateEmailAndSubmit"
    >
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
      <div class="flex flex-col gap-4 md:flex-row md:gap-2">
        <div class="flex w-full flex-col md:w-1/2">
          <label for="phone-number" class="mb-2 uppercase">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            ref="phoneNumber"
            v-model="formData.phoneNumber"
            pattern="\d{5,15}"
            placeholder="Your phone number"
            class="border-round-xl w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
          />
        </div>

        <div class="flex w-full flex-col md:w-1/2">
          <p class="mb-2 uppercase">Preferred Contact Method</p>
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-2 md:gap-6">
            <label for="contact-email" class="inline-flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                v-model="formData.contactMethod"
                id="contact-email"
                name="contact-method"
                value="email"
                checked
                class="h-4 w-2"
              />
              <span>Email</span>
            </label>

            <label for="contact-phone" class="inline-flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                v-model="formData.contactMethod"
                id="contact-phone"
                name="contact-method"
                value="phone"
                class="h-4 w-2"
              />
              <span>Phone</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Project Type + Pages -->
      <div class="flex flex-col gap-4 md:flex-row md:gap-2">
        <div class="flex w-full flex-col md:w-1/2">
          <p class="mb-2 uppercase">Project Type</p>
          <div class="flex flex-col gap-2">
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="radio"
                v-model="formData.projectType"
                name="project-type"
                value="website"
                checked
                class="h-4 w-2"
              />New Website</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="radio"
                v-model="formData.projectType"
                name="project-type"
                value="site redesign"
                class="h-4 w-2"
              />Site Redesign</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="radio"
                v-model="formData.projectType"
                name="project-type"
                value="maintenance"
                class="h-4 w-2"
              />Site Maintenance</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="radio"
                v-model="formData.projectType"
                name="project-type"
                value="other"
                class="h-4 w-2"
              />Other</label
            >
            <input
              type="text"
              v-if="formData.projectType === 'other'"
              v-model="formData.projectTypeOther"
              name="project-type-other"
              placeholder="If other, please specify"
              class="border-round-xl mt-1 w-full border border-black/10 bg-white px-4 py-3 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
            />
          </div>

          <label for="number-of-pages" class="mt-4 mb-2 uppercase">Number of Pages</label>
          <select
            id="number-of-pages"
            v-model="formData.numberOfPages"
            name="number-of-pages"
            class="border-round-xl w-full border border-black/10 bg-white px-4 py-3 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
          >
            <option value="1">1 page</option>
            <option value="1-5">2-5 pages</option>
            <option value="6-10">6-10 pages</option>
            <option value="11+">11+ pages</option>
          </select>
        </div>

        <div class="flex w-full flex-col md:w-1/2">
          <p class="mb-2 uppercase">Key Features</p>
          <div class="flex flex-col">
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="e-commerce"
                class="h-4 w-2"
              />E-commerce</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="user registration/login"
                class="h-4 w-2"
              />User Registration/Login</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="multilingual"
                class="h-4 w-2"
              />Multilingual</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="contact form"
                class="h-4 w-2"
              />Contact Form</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="blog"
                class="h-4 w-2"
              />Blog</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="portfolio"
                class="h-4 w-2"
              />Portfolio</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2 sm:col-span-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="social media integration"
                class="h-4 w-2"
              />Social Media Integration</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="photo/video gallery"
                class="h-4 w-2"
              />Photo/Video Gallery</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="checkbox"
                v-model="formData.features"
                name="features"
                value="other"
                class="h-4 w-2"
              />Other</label
            >
          </div>

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
      <div class="flex flex-col gap-4 md:flex-row md:gap-2">
        <div class="flex w-full flex-col md:w-1/2">
          <p class="mb-2 uppercase">Do you have a visual identity?</p>
          <div class="flex flex-row flex-wrap items-center gap-6">
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="radio"
                v-model="formData.visualIdentity"
                name="visual-identity"
                value="yes"
                class="h-4 w-4"
              />Yes</label
            >
            <label class="inline-flex cursor-pointer items-center gap-2"
              ><input
                type="radio"
                v-model="formData.visualIdentity"
                name="visual-identity"
                value="no"
                class="h-4 w-4"
              />No</label
            >
          </div>
        </div>

        <div class="flex w-full flex-col md:w-1/2">
          <label for="deadline" class="mb-2 uppercase">Desired Completion Time</label>
          <select
            id="deadline"
            v-model="formData.deadline"
            name="deadline"
            class="border-round-xl w-full border border-black/10 bg-white px-4 py-3 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
          >
            <option value="urgent">Urgent (less than 1 month)</option>
            <option value="short-term">Short term (1-3 months)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <!-- Additional Information -->
      <div>
        <label for="additional-info" class="mb-2 block uppercase">Additional Information</label>
        <Textarea
          id="additional-info"
          name="additional-info"
          v-model="formData.additionalInfo"
          rows="4"
          placeholder="Any other details you'd like to share with me about your project."
          class="border-round-xl w-full border border-black/10 bg-white px-4 py-4 placeholder:text-black/50 focus:ring-2 focus:ring-[var(--red)] focus:outline-none"
        />
      </div>

      <!-- Submit -->
      <div class="mt-4">
        <button
          type="submit"
          class="border-round-xl mx-auto block border-2 border-[var(--red)] bg-[var(--brat)] px-8 py-3 text-xl font-bold tracking-wide text-[var(--red)] uppercase transition hover:bg-[var(--brat-hover)]"
        >
          Send
        </button>
      </div>
    </form>

    <!-- Aside -->
    <div class="flex flex-col gap-4">
      <p class="amazing text-right text-xl font-semibold text-[var(--red)] md:text-2xl">
        Feel free to reach out to me anytime. Let’s create something <span>amazing</span> together!
      </p>
      <img
        src="../../public/media/images/getty-images-rzQE1PfPtqk-unsplash.png"
        alt=""
        class="services-image"
      />
    </div>

    <!-- Footer block -->
    <div
      class="border-round-2xl mb-8 bg-[var(--red-bg)] p-4 text-sm text-[var(--main-white)] md:p-6"
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

<script>
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

// PrimeVue
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

export default {
  name: 'ContactIsaure',
  components: { InputText, Textarea },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phoneNumber: '',
        contactMethod: 'email',
        projectType: '',
        featuresOther: '',
        numberOfPages: '1',
        features: [],
        visualIdentity: '',
        deadline: '',
        additionalInfo: '',
      },
      phoneInputInitialized: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeTelephoneNumberInput();
      this.resetForm();
    });
  },
  methods: {
    initializeTelephoneNumberInput() {
      const input = this.$refs.phoneNumber;
      intlTelInput(input, {
        initialCountry: 'be',
        utilsScript:
          'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/23.0.0/js/intlTelInput.min.js',
        formatOnDisplay: true,
      });
      this.phoneInputInitialized = true;
    },
    validateEmailAndSubmit() {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(this.formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      this.$refs.form.submit();
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phoneNumber: '',
        contactMethod: '',
        projectType: '',
        featuresOther: '',
        numberOfPages: '1',
        features: [],
        visualIdentity: '',
        deadline: '',
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
