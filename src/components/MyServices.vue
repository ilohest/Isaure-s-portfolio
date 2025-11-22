<template>
  <section class="mx-auto flex flex-col gap-4 px-4 py-4 md:px-6 md:py-8">
    <div
      class="justify-content-between align-items-center tex-[var(--red)] flex flex-col gap-2 md:flex-row md:gap-8"
    >
      <h1 class="font-['Chakra_Petch'] uppercase md:pr-8">Services</h1>

      <p class="font-light md:pl-8">
        I take care of managing your expectations in terms of web design and development. Whether
        it's a redesign of a single page or a complete development of your site, I will ensure that
        your online presence shines brightly.
      </p>
    </div>

    <picture>
      <source
        type="image/avif"
        srcset="
          /assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-640.avif   640w,
          /assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-960.avif   960w,
          /assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-1280.avif 1280w
        "
        sizes="100vw"
      />
      <source
        type="image/webp"
        srcset="
          /assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-640.webp   640w,
          /assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-960.webp   960w,
          /assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-1280.webp 1280w
        "
        sizes="100vw"
      />
      <img
        src="/assets/img/Pages/getty-images-OPCEau8Ondk-unsplash-960.png"
        alt="My services"
        class="border-round-xl w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <div
      class="border-round-xl flex w-full flex-col gap-2 bg-[var(--secondary-black)] p-4 text-[var(--main-white)] md:flex-row md:p-6"
    >
      <h2 class="service-title font-light uppercase">Custom web page design</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in services" :key="index">
          <div class="service-header" @click="toggleContent(index, 'services')">
            {{ service.title }}
            <span>
              <img
                :src="service.show ? removeButton : addButton"
                alt="Toggle"
                class="icon-toggle"
              />
            </span>
          </div>

          <div :style="contentStyle(service)" class="service-content">
            <p class="font-light">{{ service.description }}</p>
          </div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div
      class="border-round-xl flex w-full flex-col gap-2 bg-[var(--secondary-black)] p-4 text-[var(--main-white)] md:flex-row md:p-6"
    >
      <h2 class="service-title font-light uppercase">Web page redesign</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in redesignServices" :key="index">
          <div class="service-header" @click="toggleContent(index, 'redesignServices')">
            {{ service.title }}
            <span>
              <img
                :src="service.show ? removeButton : addButton"
                alt="Toggle"
                class="icon-toggle"
              />
            </span>
          </div>

          <div :style="contentStyle(service)" class="service-content">
            <p class="font-light">{{ service.description }}</p>
          </div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div
      class="border-round-xl flex w-full flex-col gap-2 bg-[var(--secondary-black)] p-4 text-[var(--main-white)] md:flex-row md:p-6"
    >
      <h2 class="service-title font-light uppercase">Web development</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in developmentServices" :key="index">
          <div class="service-header" @click="toggleContent(index, 'developmentServices')">
            {{ service.title }}
            <span>
              <img
                :src="service.show ? removeButton : addButton"
                alt="Toggle"
                class="icon-toggle"
              />
            </span>
          </div>

          <div :style="contentStyle(service)" class="service-content">
            <p class="font-light">{{ service.description }}</p>
          </div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div
      class="border-round-xl flex w-full flex-col gap-2 bg-[var(--secondary-black)] p-4 text-[var(--main-white)] md:flex-row md:p-6"
    >
      <h2 class="service-title font-light uppercase">Other customized services</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in otherServices" :key="index">
          <div class="service-header" @click="toggleContent(index, 'otherServices')">
            {{ service.title }}
            <span>
              <img
                :src="service.show ? removeButton : addButton"
                alt="Toggle"
                class="icon-toggle"
              />
            </span>
          </div>

          <div
            v-html="service.description"
            :style="contentStyle(service)"
            class="service-content font-light"
          ></div>

          <div class="divider"></div>
        </div>
      </div>
    </div>

    <div class="achieve left">
      <p class="anton-regular">
        Reach out now to begin our collaboration. Together, we can turn your ideas into reality!
      </p>
    </div>

    <div class="check">
      <router-link class="button" to="/contact">Schedule a consultation</router-link>
    </div>

    <div class="content">
      <h2 class="anton-regular workflow">Our Project Workflow</h2>

      <h3 class="font-light uppercase">1. Initial consultation</h3>
      <p>
        <span class="underline">Meet & greet:</span> we start by getting to know you and your brand.
        This can be done over a call, video conference, or in-person meeting.
      </p>
      <p>
        <span class="underline">Project understanding:</span> we discuss your business goals, and
        what you hope to achieve with your website.
      </p>

      <h3 class="font-light uppercase">2. Proposal & agreement</h3>
      <p class="font-light">
        <span class="underline">Custom proposal:</span> based on our initial consultation, we will
        provide a detailed proposal including the project scope, timeline, and quote.
      </p>
      <p>
        <span class="underline">Agreement:</span> once you’re happy with the proposal, we’ll
        formalize our partnership with a contract that outlines terms, conditions, and project
        deliverables.
      </p>

      <h3 class="font-light uppercase">3. Planning & strategy</h3>
      <p>
        <span class="underline">Use case development:</span> we develop specific use cases to ensure
        all functional requirements are captured and the website serves your business needs
        effectively.
      </p>
      <p>
        <span class="underline">Site structure:</span> we outline the website’s architecture,
        planning all pages and features to ensure a smooth user experience.
      </p>

      <h3 class="font-light uppercase">4. Design phase</h3>
      <p>
        <span class="underline">Initial design:</span> you will receive a draft design of your
        website, which includes layout, colors, and font choices.
      </p>
      <p>
        <span class="underline">Feedback & revisions:</span> we value your input and encourage
        feedback. This phase includes rounds of revisions to refine the design until it aligns
        perfectly with your vision.
      </p>

      <h3 class="font-light uppercase">5. Development</h3>
      <p>
        <span class="underline">Site build:</span> our development team turns the design into a
        fully functioning website using the latest web technologies.
      </p>
      <p>
        <span class="underline">Content integration:</span> we integrate all provided content, from
        text to images, ensuring that your site communicates effectively with your audience.
      </p>

      <h3 class="font-light uppercase">6. Testing & quality assurance</h3>
      <p>
        <span class="underline">Functionality testing:</span> every feature on the website is tested
        to ensure it works seamlessly across different devices and browsers.
      </p>
      <p>
        <span class="underline">Performance optimization:</span> we optimize the site’s performance
        to ensure fast loading times and a smooth user experience.
      </p>

      <h3 class="font-light uppercase">7. Launch & training</h3>
      <p>
        <span class="underline">Launch:</span> once everything is tested and approved, we go live
        with your new website.
      </p>
      <p>
        <span class="underline">Training:</span> we provide training on how to manage and update
        your website, ensuring you feel confident in using and maintaining it.
      </p>

      <h3 class="font-light uppercase">8. Post-launch support</h3>
      <p>
        <span class="underline">Maintenance:</span> we offer ongoing support and maintenance to
        ensure your website continues to perform well and stays up to date with the latest web
        standards.
      </p>
    </div>

    <div class="achieve left">
      <p class="font-light">
        Ready to elevate your digital presence? Contact us to start your journey together. Let's
        make your vision come to life!
      </p>
    </div>

    <div class="check"><router-link class="button" to="/contact">Contact us</router-link></div>

    <div class="achieve right">
      <p class="font-light">
        I am here to help you achieve your digital goals with professional and reliable web
        development services.
      </p>
    </div>
  </section>
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
          description:
            'I create visually appealing web pages designed to reflect your brand’s unique identity. Each design is meticulously crafted to ensure it aligns with your vision and business objectives.',
          show: false,
        },
        {
          id: 2,
          title: 'Responsive Layouts',
          description:
            'With a focus on user experience, I design responsive web pages that provide seamless viewing on any device - from desktops to mobile phones. This approach ensures that your site is accessible and enjoyable for all users.',
          show: false,
        },
        {
          id: 3,
          title: 'Interactive Features',
          description:
            'Incorporating interactive elements like animations and dynamic content to engage your visitors and keep them coming back for more.',
          show: false,
        },
      ],
      redesignServices: [
        {
          id: 4,
          title: 'Modernization',
          description:
            'I can transform your existing web page by updating it with modern design trends, improving both its form and functionality. This includes optimizing navigation and enhancing the overall layout to boost user engagement.',
          show: false,
        },
        {
          id: 5,
          title: 'Content Reorganization',
          description:
            'Redefining the structure and presentation of your content to improve readability and interaction, making sure that key information is always front and center.',
          show: false,
        },
      ],
      developmentServices: [
        {
          id: 6,
          title: 'Full Stack Programming',
          description:
            'Using the latest technologies like HTML5, CSS3, JavaScript, and frameworks like Vue.js, I build interactive and efficient architectures that bring your site’s design to life through dynamic, interactive web pages. I also create end-to-end solutions by integrating robust back-end technologies like Node.js, Express, and NoSQL databases, ensuring secure, scalable, and seamless web applications.',
          show: false,
        },
        {
          id: 7,
          title: 'E-commerce',
          description:
            'I build engaging interfaces for e-commerce platforms, focusing on user experience to facilitate seamless shopping experiences. This includes product display pages, shopping carts, and checkout processes.',
          show: false,
        },
        {
          id: 8,
          title: 'Management Interfaces',
          description:
            'I have the capability to develop solutions for content management systems that can help businesses manage their online store inventory more effectively. This includes creating intuitive interfaces for stock management, product updates, and order processing.',
          show: false,
        },
      ],
      otherServices: [
        {
          id: 9,
          title: 'Wedding & events stationery',
          description:
            'In partnership with <a style="color: inherit" href="https://www.huecostudio.com/" target="_blank">HUECO STUDIO</a>, we create and set up your website using our custom illustrations to ensure that everything follows the unique style of your celebration. HUECO STUDIO is a creative hub that brings unique handcrafted designs to weddings, brands, and events. From start to finish, we create a fully designed website, seamlessly integrating HUECO STUDIO\'s unique artistic touch, ready to share with your loved ones.<br><br>Teaming up with <a style="color: inherit" href="https://www.lainvitaciondeliana.com/" target="_blank">La Invitación de Liana</a>, we craft wedding websites that showcase their stunning watercolor illustrations. Each design is tailored to reflect your personality and the ambiance of your celebration, resulting in a beautifully personalized site to delight your guests. The final delivery will be a fully set up website, with handmade illustrations, ready for you to share with your guests.  ',
          show: false,
        },
        {
          id: 10,
          title: 'Branding & social media management',
          description:
            'In collaboration with <a style="color: inherit" href="https://www.instagram.com/lara.gonzalez.estudio/" target="_blank">Lara González Studio</a>, we create unique and impactful websites that complement their bold branding and graphic design expertise. Together, we bring cohesive digital solutions that align seamlessly with your brand\'s identity, ensuring a strong online presence.',
          show: false,
        },
      ],
      addButton: require('@/assets/img/add.svg'),
      removeButton: require('@/assets/img/remove.svg'),
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
          transition: 'max-height 0.5s ease, opacity 0.5s ease',
        };
      } else {
        return {
          maxHeight: '0',
          opacity: '0',
          transition: 'max-height 0.5s ease, opacity 0.5s ease',
        };
      }
    },
  },
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
}
.left {
  justify-content: flex-start;
}
.right p {
  color: var(--red);
  width: 65%;
  text-align: start;
  letter-spacing: 0.01em;
  border-left: solid;
  padding-left: 20px;
}
.left p {
  color: var(--red);
  width: 65%;
  text-align: end;
  letter-spacing: 0.01em;
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

.first-service,
.second-service,
.third-service,
.fourth-service {
  display: flex;
  width: 100%;
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 20px;
  color: var(--main-white);
  background: var(--secondary-black);
}
.service-title {
  width: 30%;
}
.service-content {
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
  height: auto;
  overflow: hidden;
}
.icon-toggle {
  transition: transform 0.3s ease;
}
.service-content-container > div:not(.service-content) img[alt='Toggle']:not([src*='remove']) {
  transform: rotate(0deg);
}
.service-content-container > div:not(.service-content) img[alt='Toggle'][src*='remove'] {
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
  border-bottom: 1px solid;
  margin: 10px 0;
}
.anton-regular {
  font-family: 'Anton', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.content {
  padding: 40px;
  column-count: 2;
  column-gap: 40px;
  border-radius: 10px;
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
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Chakra Petch', sans-serif;
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

  .bird-container {
    animation-duration: 22s !important;
  }
  .services-container {
    flex-direction: column;
  }
  .services-container h1 {
    width: unset !important;
    margin-bottom: 10px;
  }
  .services-container p {
    width: unset !important;
    padding-left: 0;
  }
}
@media screen and (max-width: 769px) {
  .image-container img {
    width: 187%;
  }
  h1 {
    margin-top: 50px;
  }
  .achieve p {
    width: 100%;
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

  .services-container {
    margin-top: 20px;
  }
  .service-content-container,
  .services-container p {
    width: unset;
    padding-left: 0;
    margin-top: 20px;
  }
  .content {
    column-count: 1; /* Switches to one column on smaller screens */
  }
}
</style>
