<template>
    <div id="app" class="main">
      <div class="project-summary">
        <h2 class="project-title">Tranche de CaKe</h2>
  
        
        <div class="project-info">
          For this e-commerce project, I collaborated with belgian founders, Arnaud and Virginie, to create an online platform that offers
          a diverse range of handcrafted snacks delivered directly to customers' doors. The site features a minimalist design aesthetic with
          an earthy color palette of terracotta, orange, and chocolate brown that appeals to the senses and enhances the artisanal feel of the products.
          I focused on creating a simple, intuitive interface that reflects the homemade and artisanal nature of the products. Through this platform,
          Tranche de CaKe successfully delivers convenience, variety, and the richness of authentic, homemade snacks to a broad audience.
        </div>
  
        <div class="project-container">
          <div class="project-resp">
            <h2>Responsibilities</h2>
            <p>Web Design Personalization, Shopify setup, Site Development and features personalization, Website Launch.</p>
          </div>
  
          <div class="project-url">
            <h2>URL</h2>
            <a href="https://tranchedecake.be/" target="_blank">
              tranchedecake.be/
            </a>
          </div>
        </div>
      </div>

      <div class="mockup-container">
        <img
          src="../assets/mockup-tdc-desktop1.png"
          class="mockup1"
          alt="Tranche de CaKe project - desktop vue 1"
        >
      </div>
      <div class="mockup-container">
        <img
          src="../assets/mockup-tdc-desktop5.png"
          class="mockup2"
          alt="Tranche de CaKe project - desktop vue 1"
        >
      </div>
      <div class="mockup-container">
        <img
          src="../assets/mockup-tdc-phone1.png"
          class="mockup3"
          alt="Tranche de CaKe project - desktop vue 1"
        >
      </div>
  
      <div class="cards-container">
        <div class="video-intro">
          <div class="project-card project-card-video">
            <img
              v-show="!videoLoaded"
              src="../assets/tdc-desktop1.png"
              class="video-placeholder"
              alt="Placeholder Tranche de CaKe project"
            >
            <video
              playsinline
              @loadeddata="markVideoAsLoaded"
              src="../assets/video-tdc-accueil.mp4"
              class="video-projet"
              autoplay loop muted preload="auto"
              v-show="videoLoaded">
            </video>
          </div>
          <p>Tranche de CaKe, <br> la révolution de la collation</p>
        </div>

        <div class="project-card">
          <img
            src="../assets/tdc-desktop5.png"
            class="video-placeholder"
            alt="La petite serre urbaine project - desktop vue 2"
          >
        </div>

        <div class="project-card">
          <img
            src="../assets/tdc-desktop2.png"
            class="video-placeholder"
            alt="La petite serre urbaine project - desktop vue 2"
          >
        </div>

        <div class="left">
          <div class="project-card">
            <img
              src="../assets/tdc-desktop3.png"
              class="video-placeholder"
              alt="La petite serre urbaine project - desktop vue 3"
            >
          </div>
          <p>
            The website features an intuitive and user-friendly interface for customizing weekly snack boxes,
            allowing customers to select from a curated range of artisanal snacks to fill their box. To ensure
            a full and satisfying experience, each box must contain exactly 10 snacks before the purchase option
            becomes available.
          </p>
        </div>

        <div class="right">
          <p>
            This design choice not only enhances user engagement by encouraging exploration of
            different snacks but also minimizes order errors, ensuring that every box ordered meets the startup's
            quality standards. This personalized approach to ordering allows users to tailor their weekly deliveries
            to their specific tastes, making each delivery a unique culinary adventure.
          </p>

          <div class="project-card">
            <img
              src="../assets/tdc-desktop4.png"
              class="video-placeholder"
              alt="La petite serre urbaine project - desktop vue 4"
            >
          </div> 
        </div>

        <p class="text">
          The Tranche de Cake ecommerce website includes a fully integrated backoffice system designed to streamline 
          operations and enhance management efficiency for our client. This backoffice suite provides robust tools for 
          order processing, inventory management, and customer relations. It allows for real-time tracking of sales 
          trends and inventory levels, ensuring that our client can make informed decisions quickly. Additionally, 
          the system supports promotional and marketing activities, enabling personalized customer engagements and 
          targeted campaigns. This comprehensive backoffice solution empowers our client to maintain a high level of 
          service quality while optimizing operational workflows.
        </p>
        
        <div class="project-card carte">
          <div class="line">
            <div class="image12">
              <div class="photo"><img src="../assets/tdc-phone2.png" alt="Tranche de CaKe project - mobile vue 1"></div>
              <div class="photo"><img src="../assets/tdc-phone5.png" alt="Tranche de CaKe project - mobile vue 2"></div>
            </div> 
  
            <div class="image34">   
              <div class="photo"><img src="../assets/tdc-phone4.png" alt="Tranche de CaKe project - mobile vue 3"></div>
              <div class="photo"><img src="../assets/tdc-phone6.png" alt="Tranche de CaKe project - mobile vue 4"></div>
            </div>
          </div>
        </div>
        
        <div class="check"><a href="https://tranchedecake.be/" class="button" target="_blank">Check it out</a></div>
      </div>
    </div>
  </template>
       
  <script>
    export default {
      name: 'LaPetiteSerreUrbaine',
  
      data() {
        return {
          videoLoaded: false,
        };
      },
  
      methods: {
        markVideoAsLoaded() {
          this.videoLoaded = true;
        }
      },
  
      mounted() {
        window.scrollTo(0, 0);
      }
    }
  </script>
    
  <style scoped>
    .project-info {
      font-size: var(--fs-20);
      margin: 20px 0 30px 0;
    }
    .project-title {
      font-size: 34px;
    }
    .project-container {
      display: flex;
      justify-content: space-between;
      font-size: var(--fs-30);
    }
    .project-summary {
      border-radius: 40px;
      padding: 40px;
      background: var(--blue-bg);
      color: var(--light-content);
      margin-top: 45px;
      margin-bottom: 30px;
    }
    h2 {
      color: var(--light-content);
      text-transform: uppercase;
      font-size: 28px;
      letter-spacing: 0.05em;
      font-family: 'Anton';
      margin-bottom: 20px;
      font-weight: 400;
    }
    .project-resp {
      width: 60%;
      font-size: var(--fs-20);
    }
    .project-url {
      width: 40%;
      font-size: var(--fs-20);
      margin-left: 80px;
    }
    .project-url a {
      text-decoration: none;
      color: inherit;
      word-break: break-all;
    }
    .project-url a:hover {
      text-transform: uppercase;
    }
    .video-placeholder {
      width: 100%;
      object-fit: cover;
      object-position: top;
      border-radius: 40px;
    }
    .mockup3 {
      width: 65%;
      object-fit: cover;
      object-position: top;
      border-radius: 40px;
    }
    .mockup2 {
      width: 45%;
      object-fit: cover;
      object-position: top;
      border-radius: 40px;
    }
    .mockup1 {
      width: 55%;
      object-fit: cover;
      object-position: top;
      border-radius: 40px;
    }
    .project-card {
      background-color: var(--blue-bg);
      overflow: hidden;
      padding: 15px;
      border-radius: 40px;
      margin-bottom: 30px;
    }
    .left {
      display: 	flex;
      justify-content: left;
      align-items: center;
      gap: 20px;
    }
    .right {
      display: 	flex;
      justify-content: right;
      align-items: center;
      gap: 20px;
    }
    .left>.project-card,
    .right>.project-card {
      width: 70%;
    }
    .left p {
      width: 30%;
      color: var(--red);
      font-weight: 600;
    }
    .right p {
      width: 30%;
      color: var(--red);
      font-weight: 600;
      text-align: right;
    }
    .project-card-video {
      width: 63%;
      margin-bottom: 30px;
    }
    .mockup-container {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
    }
    .video-projet {
      overflow: hidden;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      object-position: top;
      border-radius: 40px;
    }
    .project-card-desktop {
      height: 444px;
      display: flex;
      pointer-events: none;
      margin-bottom: 30px;
    }
    .image-container {
      width: 50%;
      overflow: hidden;
    }
    .image-container:nth-child(1) {
      padding-right: 15px;
    }
    .image-container img {
      width: 100%;
      display: block;
      border-radius: 40px;
      height: 414px;
      object-position: top;
    }
    .responsive {
      color: var(--red);
      font-weight: 600;
      margin: 20px;
    }
    .project-card.carte {
      display: flex;
      flex-direction: column;
      height: 624px;
      padding: 15px;
      margin-bottom: 50px;
      pointer-events: none;
    }
    .video-intro {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .video-intro p {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 37%;
      text-transform: uppercase;
      font-family: 'Anton';
      font-size: 23px;
      color: var(--red);
    }
    .line {
      display: flex;
      gap: 15px;
      height: 100%;
    }
    .image12,
    .image34 {
      display: flex;
      flex-direction: row;
      gap: 15px;
      flex: 1;
      height: 100%;
    } 
    .image12 .photo,
    .image34 .photo {
      flex: 1;
      overflow: hidden;
      height: 100%;
    }
    .image12 .photo img,
    .image34 .photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
    .photo img {
      border-radius: 40px;
    }
    .check {
      display: flex;
      justify-content: center; 
    }
    .button {
      text-align: center;
      text-decoration: none;
      margin-bottom: 80px!important;
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
    .text {
      color: var(--red);
      font-weight: 600;
      margin : 20px 0 50px 0;
    }
  
    /* Responsive */
    @media screen and (max-width: 970px) {
      .project-card-dev {
        height: 484px;
      }
      .dark-light-button {
        height: 20px !important;
        bottom: 40px !important;
        left: 40px !important;
      }
      .project-card-desktop {
        min-height: 1000px;
        flex-direction: column;
        gap: 15px;
      }
      .image-container {
        width: 100%;
        overflow: hidden;
        padding: 0!important;
      }
      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .project-card.carte {
        flex-direction: column;
        height: 1248px;
        width: 600px;
      }
      .line {
        flex-wrap: wrap;
        height: 100%;
      }
      .image12,
      .image34 {
        height: 100%;
        width: 50%; 
        flex-direction: column;
      }
      .image12 .photo img,
      .image34 .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
      .video-placeholder {
        height: 723px;
      }
      .project-card-video {
        height: 754px;
      }
      .line:nth-of-type(2) {
        display: none; 
      }
      .project-info {
        font-size: var(--fs-18);
      }
      .project-container {
        font-size: var(--fs-24);
      }
      h2 {
        font-size: var(--fs-24);
      }
      .project-resp {
        font-size: var(--fs-18);
      }
      .project-url {
        font-size: var(--fs-18);
      }
      h1 {
        font-size:var(--fs-30);
      }
      .cards-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .project-container {
        flex-direction: column;
      }
      .project-resp {
        width: 100%;
        text-align: left;
        margin-bottom: 30px;
      }
      .project-url {
        width: 100%;
        margin-left: 0;
      }
    }
    @media screen and (max-width: 628px) {
      main {
        max-width: 299px!important;
      }
      .header {
        flex-direction: column;
      }
      .right-section {
        border-left: none;
        width: 100%;
        padding: 13px 0;
        border-top: var(--main-black) solid 3px;
      }
      .left-section {
        padding: 13px 0;
      }
      .project-card-video {
        margin-bottom: 30px;
        width: 100%;
        order: 2;
      }
      .project-card-desktop {
        height: 985px;
        min-height: unset;
      }
      .image-container img {
        width: 187%;
        transform: translateX(-18%);
      }
      .image-container {
        border-radius: 40px;
        padding: 0;
      }
      .project-card.carte {
        height: 2400px;
        margin-bottom: 30px;
        width: 300px;
      }
      .video-placeholder {
        height: 451px;
      }
      .line {
        flex-direction: column;
      }
      .image2 img {
        object-position: -117px 0px;
      }
      .video-projet {
        object-position: 45% top;
      }
      .project-card-video {
        height: 480px;
      }
      .image12,
      .image34 {
        height: 49%;
        width: 100%;
      }
      .project-info {
        margin: 30px 0;
      }
      h1 {
        margin-top: 50px;
      }
      .button {
        margin-bottom: 50px;
      }
      .project-summary {
        margin-top: 0;
      }
      .mockup1 {
        width: 85%;
      }
      .mockup2 {
        width: 80%;
      }
      .mockup3 {
        width: 100%;
      }
      .video-intro {
        flex-direction: column;
        width: 100%;
      }
      .left,
      .right {
        flex-direction: column;
      }
      .left>.project-card,
      .right>.project-card,
      .left p,
      .right p,
      .video-intro p {
        width: unset;
      }
      .left>.project-card {
        order: 2;
      }
      .right p {
        text-align: left;
      }
    }
  </style>