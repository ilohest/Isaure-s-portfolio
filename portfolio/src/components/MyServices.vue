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

    <img src="../../../ressources/getty-images-OPCEau8Ondk-unsplash.jpg" alt="services picture" class="services-image">

    <div class="first-service">
      <h2 class="service-title">Custom Web Page Design</h2>
      <div class="service-content-container">
        <div v-for="(service, index) in services" :key="index">
          <!-- <div class="service-header" @click="toggleContent(service.id)"> -->
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
      <h2 class="service-title">Web Page Redesign</h2>
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
      <h2 class="service-title">Web Development</h2>
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

    <div class="achieve">
      <p class="anton-regular">
        I am here to help you achieve your digital goals with professional and
        reliable web development services.
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
      addButton: require('@/assets/add.svg'),
      removeButton: require('@/assets/remove.svg'),
    };
  },

  methods: {
    // toggleContent(serviceId) {
    //    // Find the service across all categories
    //   const service = this.services.find(s => s.id === serviceId)
    //     || this.redesignServices.find(s => s.id === serviceId)
    //     || this.developmentServices.find(s => s.id === serviceId);

    //     if (service) {
    //       // Toggle the 'show' property
    //       service.show = !service.show;
    //     }
    // },

    toggleContent(index, category) {
      this[category][index].show = !this[category][index].show;
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
    color: #eb5027;
    margin: 30px 0;
  }
  .achieve {
    margin: 30px 0;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 170px;
  }
  .achieve p {
    color: #eb5027;
    font-weight: 700;
    width: 65%;
    text-align: end;
    letter-spacing: 0.01em;
    font-size: 44px;
    margin-bottom: 50px;
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
  .services-image {
    width: 100%;
    border-radius: 40px;
    object-fit: cover;
    height: 450px;
    margin-bottom: 30px;
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
  .first-service {
    background: #eb5027;
  }
  .second-service {
    background: #3077b5;
  }
  .third-service {
    background: #394255;
  }
  .service-title {
    width: 40%;
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
    .button {
      margin-bottom: 50px;
    }
    .achieve p {
      width: 100%;
      font-size: 24px;
      margin-bottom: 100px;
    }
    .services-image {
      height: 100%;
      margin-bottom: 20px;
      object-position: unset;
    }
    .service-title {
      width: unset;
    }
    .first-service, .second-service, .third-service {
      flex-direction: column;
    }
    .service-content p {
      font-size: 18px;
    }
    .services-container {
      margin-top: 60px;
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