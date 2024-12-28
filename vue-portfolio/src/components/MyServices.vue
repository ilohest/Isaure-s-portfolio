<template>
  <div id="app" class="main">
    <div class="services-container">
      <h1 class="anton-regular">Services</h1>

      <p>
        I take care of managing your expectations in terms of web design and development.
        Whether it's a redesign of a single page or a complete development of your site,
        I will ensure that your online presence shines brightly.
      </p>
    </div>

    <img src="../assets/getty-images-OPCEau8Ondk-unsplash.png" alt="services picture" class="services-image">

    <div class="first-service">
      <h2 class="service-title">Custom web page design</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in services" :key="index">
          <div class="service-header" @click="toggleContent(index, 'services')">
            {{ service.title }}
            <span>
              <img :src="service.show ? removeButton : addButton"
                   alt="Toggle"
                   class="icon-toggle">
            </span>
          </div>

          <div :style="contentStyle(service)" class="service-content">
            <p>{{ service.description }}</p>
          </div>

          <div class="divider"></div>
        </div>
      </div>
    </div>
    
    <div class="second-service">
      <h2 class="service-title">Web page redesign</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in redesignServices" :key="index">
          <div class="service-header" @click="toggleContent(index, 'redesignServices')">
            {{ service.title }}
            <span>
              <img :src="service.show ? removeButton : addButton"
                   alt="Toggle"
                   class="icon-toggle">
            </span>
          </div>

          <div :style="contentStyle(service)" class="service-content">
            <p>{{ service.description }}</p>
          </div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div class="third-service">
      <h2 class="service-title">Web development</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in developmentServices" :key="index">
          <div class="service-header" @click="toggleContent(index, 'developmentServices')">
            {{ service.title }}
            <span>
              <img :src="service.show ? removeButton : addButton"
                   alt="Toggle"
                   class="icon-toggle">
            </span>
          </div>

          <div :style="contentStyle(service)" class="service-content">
            <p>{{ service.description }}</p>
          </div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div class="fourth-service">
      <h2 class="service-title">Other customized services</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in otherServices" :key="index">
          <div class="service-header" @click="toggleContent(index, 'otherServices')">
            {{ service.title }}
            <span>
              <img :src="service.show ? removeButton : addButton"
                   alt="Toggle"
                   class="icon-toggle">
            </span>
          </div>

          <div v-html="service.description" :style="contentStyle(service)" class="service-content"></div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div class="achieve left">
      <p class="anton-regular">
        Reach out now to begin our collaboration. Together, we can turn your ideas into reality!
      </p>
    </div>

    <div class="check"><router-link class="button" to="/contact">Schedule a consultation</router-link></div>
    
    <div class="content">
      <h2 class="anton-regular workflow">Our Project Workflow</h2>

      <h3>1. Initial consultation</h3>
      <p><strong>Meet & greet:</strong> we start by getting to know you and your brand. This can be done over a call, video conference, or in-person meeting.</p>
      <p><strong>Project understanding:</strong> we discuss your business goals, and what you hope to achieve with your website.</p>
      
      <h3>2. Proposal & agreement</h3>
      <p><strong>Custom proposal:</strong> based on our initial consultation, we will provide a detailed proposal including the project scope, timeline, and quote.</p>
      <p><strong>Agreement:</strong> once you’re happy with the proposal, we’ll formalize our partnership with a contract that outlines terms, conditions, and project deliverables.</p>
      
      <h3>3. Planning & strategy</h3>
      <p><strong>Use case development:</strong> we develop specific use cases to ensure all functional requirements are captured and the website serves your business needs effectively.</p>
      <p><strong>Site structure:</strong> we outline the website’s architecture, planning all pages and features to ensure a smooth user experience.</p>
      
      <h3>4. Design phase</h3>
      <p><strong>Initial design:</strong> you will receive a draft design of your website, which includes layout, colors, and font choices.</p>
      <p><strong>Feedback & revisions:</strong> we value your input and encourage feedback. This phase includes rounds of revisions to refine the design until it aligns perfectly with your vision.</p>
      
      <h3>5. Development</h3>
      <p><strong>Site build:</strong> our development team turns the design into a fully functioning website using the latest web technologies.</p>
      <p><strong>Content integration:</strong> we integrate all provided content, from text to images, ensuring that your site communicates effectively with your audience.</p>
      
      <h3>6. Testing & quality assurance</h3>
      <p><strong>Functionality testing:</strong> every feature on the website is tested to ensure it works seamlessly across different devices and browsers.</p>
      <p><strong>Performance optimization:</strong> we optimize the site’s performance to ensure fast loading times and a smooth user experience.</p>
      
      <h3>7. Launch & training</h3>
      <p><strong>Launch:</strong> once everything is tested and approved, we go live with your new website.</p>
      <p><strong>Training:</strong> we provide training on how to manage and update your website, ensuring you feel confident in using and maintaining it.</p>
      
      <h3>8. Post-launch support</h3>
      <p><strong>Maintenance:</strong> we offer ongoing support and maintenance to ensure your website continues to perform well and stays up to date with the latest web standards.</p>
    </div>

    <div class="achieve left">
      <p class="anton-regular">
        Ready to elevate your digital presence? Contact us to start your journey together. Let's make your vision come to life!
      </p>
    </div>

    <div class="check"><router-link class="button" to="/contact">Contact us</router-link></div>

    <div class="achieve right">
      <p class="anton-regular">
        I am here to help you achieve your digital goals with professional and reliable web development services.
      </p>
    </div>
  </div>
</template>
     
  
<script>
  export default {
    name: 'MesServices',

    data() {
      return {
        services: [
        {
          id: 1,
          title: 'Tailored Aesthetic',
          description: 'I create visually appealing web pages designed to reflect your brand’s unique identity. Each design is meticulously crafted to ensure it aligns with your vision and business objectives.',
          show: false
        },
        {
          id: 2,
          title: 'Responsive Layouts',
          description: 'With a focus on user experience, I design responsive web pages that provide seamless viewing on any device - from desktops to mobile phones. This approach ensures that your site is accessible and enjoyable for all users.',
          show: false
        },
        {
          id: 3,
          title: 'Interactive Features',
          description: 'Incorporating interactive elements like animations and dynamic content to engage your visitors and keep them coming back for more.',
          show: false
        }
      ],
      redesignServices: [
        {
          id: 4,
          title: 'Modernization',
          description: 'I can transform your existing web page by updating it with modern design trends, improving both its form and functionality. This includes optimizing navigation and enhancing the overall layout to boost user engagement.',
          show: false
        },
        {
          id: 5,
          title: 'Content Reorganization',
          description: 'Redefining the structure and presentation of your content to improve readability and interaction, making sure that key information is always front and center.',
          show: false
        }
      ],
      developmentServices: [
        {
          id: 6,
          title: 'Front-End Programming',
          description: 'Using the latest technologies like HTML5, CSS3, JavaScript, and frameworks like Vue.js, I build interactive and efficient architectures that bring your site’s design to life through dynamic, interactive web pages.',
          show: false
        },
        {
          id: 7,
          title: 'E-commerce',
          description: 'I build engaging interfaces for e-commerce platforms, focusing on user experience to facilitate seamless shopping experiences. This includes product display pages, shopping carts, and checkout processes.',
          show: false
        },
        {
          id: 8,
          title: 'Management Interfaces',
          description: 'I have the capability to develop solutions for content management systems that can help businesses manage their online store inventory more effectively. This includes creating intuitive interfaces for stock management, product updates, and order processing.',
          show: false
        }
      ],
      otherServices: [
        {
          id: 9,
          title: 'Wedding & events stationery',
          description: 'In partnership with <a style="color: inherit" href="https://www.huecostudio.com/" target="_blank">HUECO STUDIO</a>, we create and set up your website using our custom illustrations to ensure that everything follows the unique style of your celebration. HUECO STUDIO is a creative hub that brings unique handcrafted designs to weddings, brands, and events. From start to finish, we create a fully designed website, seamlessly integrating HUECO STUDIO\'s unique artistic touch, ready to share with your loved ones.<br><br>Teaming up with <a style="color: inherit" href="https://www.lainvitaciondeliana.com/" target="_blank">La Invitación de Liana</a>, we craft wedding websites that showcase their stunning watercolor illustrations. Each design is tailored to reflect your personality and the ambiance of your celebration, resulting in a beautifully personalized site to delight your guests. The final delivery will be a fully set up website, with handmade illustrations, ready for you to share with your guests.  ',
          show: false
        },
        {
          id: 10,
          title: 'Branding & social media management',
          description: 'In collaboration with <a style="color: inherit" href="https://www.instagram.com/lara.gonzalez.estudio/" target="_blank">Lara González Studio</a>, we create unique and impactful websites that complement their bold branding and graphic design expertise. Together, we bring cohesive digital solutions that align seamlessly with your brand\'s identity, ensuring a strong online presence.',
          show: false
        }
      ],
      addButton: require('@/assets/add.svg'),
      removeButton: require('@/assets/remove.svg'),
    };
  },

  methods: {
    toggleContent(index, category) {
      // Parcourir les services et fermer ceux qui ne sont pas sélectionnés
      this[category].forEach((service, i) => {
            service.show = i === index ? !service.show : false;
        });
    },

    contentStyle(service) {
      if (service.show) {
        return {
          maxHeight: '500px',
          opacity: '1',
          transition: 'max-height 0.5s ease, opacity 0.5s ease'
        };
      } else {
        return {
          maxHeight: '0',
          opacity: '0',
          transition: 'max-height 0.5s ease, opacity 0.5s ease'
        };
      }
    }
  }
};
</script>
  
<style scoped>
  .services-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--red);
    margin: 50px 0;
  }
  .achieve {
    margin: 50px 0;
    display: flex;
  }
  .right {
    justify-content: flex-end;
    margin-bottom: 170px;
  }
  .left {
    justify-content: flex-start;
  }
  .right p {
    color: var(--red);
    width: 65%;
    text-align: start;
    letter-spacing: 0.01em;
    font-size: 35px;
    margin-bottom: 130px;
    border-left: solid;
    padding-left: 20px;
  }
  .left p {
    color: var(--red);
    width: 65%;
    text-align: end;
    letter-spacing: 0.01em;
    font-size: 35px;
    border-right: solid;
    padding-right: 20px;
  }
  .services-container h1 {
    width: 40%;
    margin: 0;
    text-transform: uppercase;
  }
  .service-content-container,
  .services-container p {
    width: 70%;
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
    margin-bottom: 30px;
  }
  .first-service,
  .second-service,
  .third-service,
  .fourth-service {
    display: flex;
    width: 100%;
    border-radius: 40px;
    padding: 40px;
    margin-bottom: 20px;
    color: var(--light-content);
  }
  .first-service {
    background: var(--red-bg);
  }
  .second-service {
    background: var(--blue-bg);
  }
  .third-service {
    background: var(--service-three);
  }
  .fourth-service {
    background: var(--service-four);
  }
  .service-title {
    width: 30%;
  }
  .service-content {
    transition: max-height 0.5s ease, opacity 0.5s ease;
    height: auto;
    overflow: hidden;
  }
  .icon-toggle {
    transition: transform 0.3s ease;
  }
  .service-content-container > div:not(.service-content) img[alt="Toggle"]:not([src*="remove"]) {
    transform: rotate(0deg);
  }
  .service-content-container > div:not(.service-content) img[alt="Toggle"][src*="remove"] {
    transform: rotate(180deg);
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
  .content {
    padding: 40px; 
    column-count: 2; 
    column-gap: 40px; 
    border-radius: 40px;
    border: solid var(--red);
    color: var(--red);
    margin-top: 50px;
  }
  .workflow {
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 20px;
  }
  h3 {
    margin: 15px 0;
  }
  .check {
    display: flex;
    justify-content: center; 
  }
  .button {
    text-align: center;
    text-decoration: none;
    display: block; 
    margin: 0px auto; 
    background-color: var(--brat);
    color: var(--red);
    padding: 8px 20px;
    border: 2px solid; 
    border-radius: 40px;
    cursor: pointer; 
    text-transform: uppercase;
    font-size: 28px;
    letter-spacing: 0.05em;
    font-family: 'Anton';
  }
  .button:hover {
    background: var(--brat-hover);
  }
    
  /* Responsive */
  @media screen and (max-width: 970px) {
    .dark-light-button {
      height: 20px !important;
      bottom: 40px !important;
      left: 40px !important;
    }
    .image-container {
      width: 100%;
      overflow: hidden;
    }
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
    .image-container:nth-child(1) {
      padding: 0 0 15px 0 !important;
    }
    h2 {
      font-size: var(--fs-24);
    }
    h1 {
      font-size:var(--fs-30);
    }
    .bird-container {
      animation-duration: 22s!important;
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
    .achieve p {
      font-size: 34px;
    }
  }
  @media screen and (max-width: 628px) {
    .image-container img {
      width: 187%;
    }
    h1 {
      margin-top: 50px;
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
    .service-title {
      width: unset;
    }
    .first-service,
    .second-service,
    .third-service,
    .fourth-service {
      flex-direction: column;
    }
    .service-content p {
      font-size: 18px;
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
    .content {
      column-count: 1; /* Switches to one column on smaller screens */
    }
    .button {
      font-size: 25px;
    }
  }
</style>