<template>
  <div id="app" class="main">
    <div class="project-summary">
      <h2 class="project-title">Creyda yoga</h2>

      <div class="project-info">
        A yoga website built in Wordpress for CREYDA Yoga, a yoga and welness center managed by passionate people based in Brussels.
        This project entailed the design and development of a minimalist website for CREYDA yoga center, aimed at those seeking both peace and personal growth.
        The objective was to create an online space that mirrors the simplicity of yoga itself, making it easy for visitors to explore and enroll in a variety of yoga training programs.
      </div>

      <div class="project-container">
        <div class="project-resp creyda">
          <h2>Responsibilities</h2>
          <p>Recovery of content from the former dysfunctional website, Web design, Wordpress Setup and Development, Domain Transfer, Launch</p>
        </div>
  
        <div class="project-url creyda">
          <h2>URL</h2>
          <a href="https://creyda-yoga.be/" target="_blank">https://creyda-yoga.be/</a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src="../assets/creyda-temp.png"
          class="video-placeholder"
          alt="Placeholder Image Creyda project"
        >
        <video
          playsinline
          @loadeddata="markVideoAsLoaded"
          src="../assets/video-creyda-short.mp4"
          class="video-projet"
          autoplay loop muted preload="auto"
          v-show="videoLoaded">
        </video>
      </div>

      <p class="responsive">
        The color scheme is inspired by natural tones, with soft hues that invoke a sense of calm and relaxation.
        Navigation is intuitive, ensuring that visitors can easily find the information they need, whether they are searching for beginner yoga classes, advanced training sessions, or wellness sebscriptions.
      </p>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img src="../assets/creyda-desktop1.png" alt="Isaure Lohest web developement project 3 - desktop vue">
        </div>

        <div class="image-container">
          <img src="../assets/creyda-desktop2.png" alt="Isaure Lohest web developement project 3 - desktop vue">
        </div>
      </div>

      <p class="responsive">
        The website is fully responsive and looks really great on mobile too.
        Ensuring accessibility across all devices, the site's design is fully responsive, providing a seamless experience whether viewed on a desktop, tablet, or smartphone.
      </p>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo"><img src="../assets/creyda-phone1.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
            <div class="photo"><img src="../assets/creyda-phone2.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
          </div> 

          <div class="image34">   
            <div class="photo"><img src="../assets/creyda-phone3.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
            <div class="photo"><img src="../assets/creyda-phone4.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
          </div>
        </div>

        <div class="line">
          <div class="image12">
            <div class="photo"><img src="../assets/creyda-phone5.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
            <div class="photo"><img src="../assets/creyda-phone6.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
          </div>

          <div class="image34">
            <div class="photo"><img src="../assets/creyda-phone7.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
            <div class="photo"><img src="../assets/creyda-phone8.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
          </div>
        </div>
      </div>

      <div class="check"><a href="https://creyda-yoga.be/" class="button" target="_blank">Check it out</a></div>
    
      <!-- Bloc de navigation -->
      <div class="project-navigation">
        <router-link>
        </router-link>
        <router-link to="/achievements/didacmania-project">
          Next Project&#8594;
        </router-link>
      </div>
    </div>
  </div>
</template>
     
<script>
  export default {
    name: 'CreydaProject',

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
    margin: 45px 0 20px 0;
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
  }
  .project-url a:hover {
    text-transform: uppercase;
  }
  .video-placeholder {
    width: 100%;
    height: 620px;
    object-fit: cover;
    object-position: top;
    border-radius: 40px;
  }
  .project-card {
    background-color: var(--blue-bg);
    overflow: hidden;
    padding: 15px;
    border-radius: 40px;
  }
  .project-card-video {
    height: 650px;
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
    height: 1435px;
    padding: 15px;
    margin-bottom: 30px;
    pointer-events: none;
    gap: 15px;
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
      min-height: 1018px;
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
      height: 1290px;
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
    .project-card-desktop {
      height: 995px;
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
      margin-bottom: 50px;
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
  }
</style>