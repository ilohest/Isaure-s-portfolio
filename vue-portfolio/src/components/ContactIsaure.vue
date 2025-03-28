<template>
  <div id="app" class="main">
    <div class="services-container">
      <h1 class="anton-regular">Contact</h1>

      <p>
        Are you ready to transform your ideas into a digital reality?
        Whether you have a question, a project in mind, or need guidance on enhancing
        your online presence, I'm here to help.
      </p>
    </div>
   
    <form
      action="https://formspree.io/f/mjvnrwey"
      ref="form"
      method="POST"
      enctype="multipart/form-data" 
      class="form"
      @submit.prevent="validateEmailAndSubmit"
    >               
      <!-- Basic Information -->
      <div class="field-container">
        <div class="field">
          <label for="name" class="name">Full Name</label>
          <input type="text" id="name" name="name" v-model="formData.name" required placeholder="Your name">
        </div>
    
        <div class="field">
          <label for="email" class="email">Email</label>
          <input type="email" id="email" name="_replyto" ref="email" v-model="formData.email" required placeholder="Your email">
        </div>
      </div>

      <div class="field-container align">
        <div class="field">
          <label for="phone-number" class="phoneNb">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            ref="phoneNumber"
            v-model="formData.phoneNumber"
            pattern="\d{5,15}"
            placeholder="Your phone number"
          >
        </div>
        
        <div class="field">
          <!-- Preferred Contact Method -->
          <p>Preferred Contact Method</p>
          <div class="field field-container">
            <label for="contact-email" class="field"><input type="radio" v-model="formData.contactMethod" id="contact-email" name="contact-method" value="email" checked>Email</label>
            <label for="contact-phone" class="field"><input type="radio" v-model="formData.contactMethod" id="contact-phone" name="contact-method" value="phone" class="phone">Phone</label>
          </div>
        </div>
      </div>
      
      <div class="field-container">
        <div class="field">
          <!-- Project Type -->
          <p>Project Type:</p>
          <label><input type="radio" v-model="formData.projectType" name="project-type" value="website" checked>New Website</label>
          <label><input type="radio" v-model="formData.projectType" name="project-type" value="site redesign">Site Redesign</label>
          <label><input type="radio" v-model="formData.projectType" name="project-type" value="maintenance">Site Maintenance</label>
          <label><input type="radio" v-model="formData.projectType" name="project-type" value="other">Other</label>
          <input type="text" v-if="formData.projectType === 'other'" v-model="formData.projectTypeOther" name="project-type-other" placeholder="If other, please specify">
          
          <label for="number-of-pages" class="pageNb">Number of Pages</label>
          <select id="number-of-pages" v-model="formData.numberOfPages" name="number-of-pages">
            <option value="1">1 page</option>
            <option value="1-5">2-5 pages</option>
            <option value="6-10">6-10 pages</option>
            <option value="11+">11+ pages</option>
          </select>
        </div>

        <div class="field">
          <!-- Key Features -->
          <p>Key Features</p>
          <label><input type="checkbox" v-model="formData.features" name="features" value="e-commerce">E-commerce</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="user registration/login">User Registration/Login</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="multilingual">Multilingual</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="contact form">Contact Form</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="blog">Blog</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="portfolio">Portfolio</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="social media integration">Social Media Integration</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="photo/video gallery">Photo/Video Gallery</label>
          <label><input type="checkbox" v-model="formData.features" name="features" value="other">Other</label>
          <input type="text" v-if="formData.features.includes('other')" v-model="formData.featuresOther" name="features-other" placeholder="If other, please specify">
        </div>
      </div>
  
      <div class="field-container align">
        <div class="field">
          <!-- Design -->
          <p>Do you have a visual identity?</p>
          <div class="field field-container">
            <label class="field"><input type="radio" v-model="formData.visualIdentity" name="visual-identity" value="yes">Yes</label>
            <label class="field"><input type="radio" v-model="formData.visualIdentity" name="visual-identity" value="no" class="no">No</label>
          </div>
        </div>

        <div class="field">
          <!-- Deadline -->
          <label for="deadline" class="deadline">Desired Completion Time</label>
          <select id="deadline" v-model="formData.deadline" name="deadline">
            <option value="urgent">Urgent (less than 1 month)</option>
            <option value="short-term">Short term (1-3 months)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>
      
      <!-- Additional Information -->
      <label for="additional-info" class="add-info">Additional Information</label>
      <textarea id="additional-info" name="additional-info" v-model="formData.additionalInfo" rows="4" placeholder="Any other details you'd like to share with me about your project."></textarea>
      
      <!-- Submit Button -->
      <button type="submit" class="anton-regular">Send</button>
    </form>

    <div class="achieve">
      <p class="anton-regular amazing">
        Feel free to reach out to me anytime.
        Let’s create something <span>amazing</span> together!
      </p>
      <img src="../assets/getty-images-rzQE1PfPtqk-unsplash.png" alt="" class="services-image">
    </div>

    <div class="coop-info">
      <p>
        Lohest d'Hooghvorst, Isaure - travaille par l’intermédiaire de la coopérative d’activités JobYourself Coop
        - N° de TVA : BE 0479 233 349 - Siège social et d’exploitation : Chaussée de Charleroi 112, 1060 Bruxelles
        - <a href="mailto:info@jobyourself.be">info@jobyourself.be</a> -
        <a href="http://www.jobyourself.be" target="_blank">www.jobyourself.be</a>
      </p>
    </div>
  </div>
</template>
     
  
<script>
  import intlTelInput from 'intl-tel-input';
  import 'intl-tel-input/build/css/intlTelInput.css';

  export default {
    name: 'ContactIsaure',

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
          additionalInfo: ''
        },
        phoneInputInitialized: false
      }
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
          initialCountry: "be",
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/23.0.0/js/intlTelInput.min.js",
          formatOnDisplay: true,
        });

        this.phoneInputInitialized = true;
      },

      validateEmailAndSubmit() {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(this.formData.email)) {
          alert("Please enter a valid email address.");
          return;
        }

        // If everything is valid, programmatically submit the form to Formspree
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
          additionalInfo: ''
        };
      }
    }
  }
</script>
  
<style scoped>
  .achieve {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 30px;
  }
  .achieve p {
    color: var(--red);
    font-weight: 700;
    width: 65%;
    text-align: end;
    letter-spacing: 0.01em;
    font-size: 44px;
  }
  .services-container h1 {
    width: 40%;
    margin: 0;
  }
  .service-content-container,
  .services-container p {
    width: 60%;
    padding-left: 40px;
  }
  .services-container p {
    font-weight: 600;
    font-size: 20px;
  }
  .services-image {
    width: 100%;
    border-radius: 40px;
    object-fit: cover;
    height: 620px;
    object-position: 0 -55px;
  }
  .first-service,
  .second-service,
  .third-service {
    display: flex;
    width: 100%;
    border-radius: 40px;
    padding: 40px;
    margin-bottom: 20px;
    color: var(--light-content);
  }
  .service-content {
    display: none;
    margin-top: 8px;
  }
  .service-header {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon-toggle {
    width: 35px; 
    height: 35px;
    margin-right: 8px;
  }
  .divider {
    border-bottom: 1px solid ; 
    margin: 10px 0;
  }
  .anton-regular {
    font-family: "Anton", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  .services-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--red);
    margin: 50px 0;
  }
  .services-container h1 {
    width: 40%;
    margin: 0;
    text-transform: uppercase;
  }
  .service-content-container,
  .services-container p {
    width: 60%;
    padding-left: 40px;
  }
  .services-container p {
    font-weight: 600;
    font-size: 20px;
  }
  .amazing span {
    color: #a6ff00;
    text-shadow: 
      -2px -2px 0 var(--red-bg),  
      2px -2px 0 var(--red-bg),
      -2px  2px 0 var(--red-bg),
      2px  2px 0 var(--red-bg);
  }
    
  /* Form */
  form {
    background: var(--red-bg);
    padding: 40px;;
    border-radius: 40px;
    margin: 0 auto;
    color: var(--light-content);
  }
  .form p,
  .name,
  .email,
  .phoneNb,
  .deadline,
  .add-info,
  .pageNb {
    font-weight: 600;
    text-transform: uppercase;
  }
  h2 {
    font-weight: bold;
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin: 10px 0 5px;
  }
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 40px;
    box-sizing: border-box;
  }
  select,
  textarea {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: none;
    border-radius: 40px;
    box-sizing: border-box;
  }
  .phone,
  .no,
  .iti--allow-dropdown {
    margin-bottom: 20px;
  }
  .iti,
  .iti__country-container input {
    width: 100%!important;
  }
  input[type="checkbox"],
  input[type="radio"] {
    margin-right: 5px;
  }
  input[type="file"] {
    background: none;
    border: none;
    margin-bottom: 20px;
  }
  button[type="submit"]:hover {
    background-color: #dceafa;
  }
  select {
    cursor: pointer;
  }
  ::placeholder {
    color: #aaa;
    font-family: 'Rajdhani', sans-serif;
  }
  select {
    font-family: 'Rajdhani', sans-serif;
  }
  button[type="submit"] {
    display: block; 
    margin: 0px auto; 
    background-color: var(--brat);
    color: var(--red);
    padding: 10px 25px;
    border: 2px solid; 
    border-radius: 40px;
    cursor: pointer; 
    font-weight: bold;
    text-transform: uppercase;
    font-size: 32px;
    letter-spacing: 0.05em;
  }
  button[type="submit"]:hover {
    background-color: var(--brat-hover);
  }
  .field-container {
    display: flex;
    gap: 30px;
    margin-bottom: 20px
  }
  .field {
    width: 50%;
  }
  .align {
    align-items: baseline;
  }
  #additional-info {
    padding: 25px;
  }
  .iti {
    width: 100%;
  }

  /* Responsive */
  @media screen and (min-width: 971px) {
    .services-image {
      object-position: 50% 50%;
    }
  }
  @media screen and (max-width: 970px) {
    .services-image {
      height: 100%;
      margin-bottom: 20px;
      object-position: unset;
    }
    .achieve p {
      font-size: 34px;
    }
    .services-container {
      flex-direction: column;
    }
    .services-container h1 {
      width: unset!important;
      margin-bottom: 10px;
    }
    .services-container p {
      width: unset!important;
      padding-left: 0;
    }
  }
  @media screen and (max-width: 628px) {
    .field-container {
      flex-direction: column;
      gap: 0;
    }
    .field {
      width: 100%;
    }
    button[type="submit"] {
      font-size: 22px;
    }
    .achieve p {
      width: 100%;
      font-size: 24px;
    }
    .services-image {
      height: 100%;
      margin-bottom: 20px;
      object-position: unset;
    }
    .services-container {
      margin-top: 20px;
    }
    .service-content-container,
    .services-container p {
      width: unset;
      padding-left: 0;
      margin-top: 20px;
      font-size: 20px;
    }
  }
</style>