<template>
  <section
    class="relative top-[55px] container mx-auto flex flex-col gap-4 px-4 pb-4 md:top-[40px] md:px-6 md:pb-8"
  >
    <div
      class="justify-content-between align-items-center flex flex-col gap-4 text-[var(--red)] md:flex-row md:gap-2 md:gap-8"
    >
      <h1 class="font-['Xanh_Mono'] uppercase md:pr-8">Services</h1>

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
      class="border-round-xl flex w-full flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:flex-row md:p-6"
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
      class="border-round-xl flex w-full flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:flex-row md:p-6"
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
      class="border-round-xl flex w-full flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:flex-row md:p-6"
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
      class="border-round-xl flex w-full flex-col gap-4 bg-[var(--blue-bg)] p-4 text-[var(--main-black)] md:flex-row md:p-6"
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

    <div class="my-8 flex flex-col gap-6">
      <p class="text-center text-2xl uppercase">
        Reach out now to begin our collaboration.<br />
        <span class="inline-block font-['Reenie_Beanie'] text-[var(--red)]">Together</span>, we can
        turn your ideas into reality!
      </p>

      <router-link class="button" to="/contact">Schedule a consultation</router-link>
    </div>
  </section>

  <div class="bg-[var(--yellow-bg)] py-6">
    <h2 class="my-6 text-center font-['Xanh_Mono'] text-4xl uppercase">Our Project Workflow</h2>

    <section class="container mx-auto flex flex-col gap-4 pt-0 md:pt-6">
      <Timeline :value="workflowSteps" align="alternate" class="customized-timeline">
        <template #marker="slotProps">
          <span
            class="z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm"
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <span class="text-sm font-semibold">
              {{ slotProps.item.step }}
            </span>
          </span>
        </template>

        <template #content="slotProps">
          <Card class="border-round-xl bg-none p-0 shadow-none md:p-3 md:pt-0">
            <template #title>
              {{ slotProps.item.status }}
            </template>

            <template #subtitle>
              {{ slotProps.item.subtitle }}
            </template>

            <template #content>
              <div class="flex flex-col gap-2">
                <p
                  v-for="point in slotProps.item.points"
                  :key="point.label"
                  class="text-sm md:text-base"
                >
                  <span class="underline">{{ point.label }}:</span>
                  {{ ' ' + point.text }}
                </p>
              </div>
            </template>
          </Card>
        </template>
      </Timeline>
    </section>
  </div>

  <section class="container mx-auto flex flex-col gap-6 py-0 md:py-8">
    <p class="text-center text-[var(--red)] uppercase md:text-xl">
      Ready to elevate your digital presence? <br />Contact me to start your journey together.<br />
      Let's make your vision come to life!
    </p>

    <p class="text-center text-[var(--red)] uppercase md:text-xl">
      I am here to help you achieve your digital goals with professional and reliable web
      development services.
    </p>

    <router-link class="button" to="/contact">Contact me</router-link>

    <p class="mb-6 text-center">
      <a
        href="mailto:isaurelohest@gmail.com"
        class="font-['Reenie_Beanie'] text-3xl text-[var(--red)]"
        >isaurelohest@gmail.com</a
      >
    </p>
  </section>

  <Ribbon></Ribbon>
</template>

<script>
import Ribbon from '@/components/Ribbon.vue';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';

export default {
  name: 'MesServices',
  components: {
    Ribbon,
    Timeline,
    Card,
  },
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
            'Teaming up with <a style="color: inherit" href="https://www.lainvitaciondeliana.com/" target="_blank">La Invitación de Liana</a>, we craft wedding websites that showcase their stunning watercolor illustrations. Each design is tailored to reflect your personality and the ambiance of your celebration, resulting in a beautifully personalized site to delight your guests. The final delivery will be a fully set up website, with handmade illustrations, ready for you to share with your guests.',
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

      // 🔹 Timeline data
      workflowSteps: [
        {
          step: 1,
          status: 'Initial consultation',
          subtitle: 'Getting to know you & your brand',
          color: '#EF4444',
          points: [
            {
              label: 'Meet & greet',
              text: 'we start by getting to know you and your brand. This can be done over a call, video conference, or in-person meeting.',
            },
            {
              label: 'Project understanding',
              text: 'we discuss your business goals, and what you hope to achieve with your website.',
            },
          ],
        },
        {
          step: 2,
          status: 'Proposal & agreement',
          subtitle: 'Project scope, timeline & quote',
          color: '#F97316',
          points: [
            {
              label: 'Custom proposal',
              text: 'based on our initial consultation, we will provide a detailed proposal including the project scope, timeline, and quote.',
            },
            {
              label: 'Agreement',
              text: 'once you’re happy with the proposal, we’ll formalize our partnership with a contract that outlines terms, conditions, and project deliverables.',
            },
          ],
        },
        {
          step: 3,
          status: 'Planning & strategy',
          subtitle: 'Use cases & site structure',
          color: '#EAB308',
          points: [
            {
              label: 'Use case development',
              text: 'we develop specific use cases to ensure all functional requirements are captured and the website serves your business needs effectively.',
            },
            {
              label: 'Site structure',
              text: 'we outline the website’s architecture, planning all pages and features to ensure a smooth user experience.',
            },
          ],
        },
        {
          step: 4,
          status: 'Design phase',
          subtitle: 'Visual identity & UI',
          color: '#22C55E',
          points: [
            {
              label: 'Initial design',
              text: 'you will receive a draft design of your website, which includes layout, colors, and font choices.',
            },
            {
              label: 'Feedback & revisions',
              text: 'we value your input and encourage feedback. This phase includes rounds of revisions to refine the design until it aligns perfectly with your vision.',
            },
          ],
        },
        {
          step: 5,
          status: 'Development',
          subtitle: 'From design to live code',
          color: '#06B6D4',
          points: [
            {
              label: 'Site build',
              text: 'our development team turns the design into a fully functioning website using the latest web technologies.',
            },
            {
              label: 'Content integration',
              text: 'we integrate all provided content, from text to images, ensuring that your site communicates effectively with your audience.',
            },
          ],
        },
        {
          step: 6,
          status: 'Testing & quality assurance',
          subtitle: 'Bugs, performance & polish',
          color: '#3B82F6',
          points: [
            {
              label: 'Functionality testing',
              text: 'every feature on the website is tested to ensure it works seamlessly across different devices and browsers.',
            },
            {
              label: 'Performance optimization',
              text: 'we optimize the site’s performance to ensure fast loading times and a smooth user experience.',
            },
          ],
        },
        {
          step: 7,
          status: 'Launch & training',
          subtitle: 'Going live',
          color: '#8B5CF6',
          points: [
            {
              label: 'Launch',
              text: 'once everything is tested and approved, we go live with your new website.',
            },
            {
              label: 'Training',
              text: 'we provide training on how to manage and update your website, ensuring you feel confident in using it.',
            },
          ],
        },
        {
          step: 8,
          status: 'Post-launch support',
          subtitle: 'Keeping things running smoothly',
          color: '#EC4899',
          points: [
            {
              label: 'Maintenance',
              text: 'we offer ongoing support and maintenance to ensure your website continues to perform well and stays up to date with the latest web standards.',
            },
          ],
        },
      ],
    };
  },

  methods: {
    toggleContent(index, category) {
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

.divider {
  border-bottom: 1px solid;
  margin: 10px 0;
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
  font-family: 'Xanh Mono', monospace;
}
.button:hover {
  background: var(--brat-hover);
}

/* Responsive */
@media screen and (max-width: 970px) {
  .services-container {
    flex-direction: column;
  }

  .services-container p {
    width: unset !important;
    padding-left: 0;
  }
}
@media screen and (max-width: 769px) {
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
}
:deep(.p-timeline-event-separator span) {
  padding: 5px 12px;
}
:deep(.p-timeline .p-timeline-event-connector) {
  background-color: rgb(255, 255, 255);
}
:deep(.p-card-title) {
  font-family: 'Xanh Mono';
  font-weight: none;
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 1rem;
}
:deep(.p-card) {
  margin-bottom: 1.5rem;
  margin-top: none;
  background: none;
}
:deep(.p-card-subtitle) {
  color: var(--main-black);
  font-weight: 500;
  margin-bottom: 1rem;
}
:deep(.p-card-content) {
  color: var(--main-black);
  font-weight: 300;
}
</style>
