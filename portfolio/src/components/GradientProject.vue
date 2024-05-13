<template>
  <div id="app" class="main">
    <div class="project-summary">
      <h2 class="project-title">Gradient generator</h2>

      <div class="project-info">
        A web application that enables the creation of a wide variety of gradients,
        providing users with the ability to obtain the associated CSS code.
      </div>

      <div class="project-container">
        <div class="project-resp gradient">
          <h2>Responsibilities</h2>
          <p>
            Conceptualization of application's features and functionalities, User Interface Design, Front-end Implementation,
            Autonomous Project Development
          </p>
        </div>

        <div class="project-url gradient">
          <h2>URL</h2>
          <a href="/Gradient-generator/index.html" target="_blank">
            https://isaure-lohest.com/Gradient-generator/index.html
          </a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <p class="responsive">
        This project is designed with Material Design principles, focusing on clean interfaces, bold colors,
        and user-friendly interactions for a seamless experience. This project offers a visually appealing, user-centric environment,
        prioritizing simplicity and functionality.
      </p>
      
      <div class="project-card project-card-video">
        <img
          v-show="!videoLoaded"
          src='../assets/gradient-temp.png'
          class="video-placeholder"
          alt="Placeholder Image Gradient Generator project"
        >
        <video
          @loadeddata="markVideoAsLoaded"
          src='../assets/video-gradient.mp4'
          class="video-projet"
          autoplay loop muted preload="auto"
          v-show="videoLoaded">
        </video> 
      </div>

      <p class="responsive">
        The application allows for both color picking and manual input of color codes.
      </p>
      
      <div class="project-card project-card-desktop">
        <div class="image-container color-picker">
          <img src="../assets/gradient-desktop1.png" alt="Isaure Lohest web developement project 2 - color picker">
        </div>

        <div class="image-container  manual-input">
          <img src="../assets/gradient-desktop2.png" alt="Isaure Lohest web developement project 2 - manual input of color code">
        </div>
      </div>

      <p class="responsive">
        The user can choose the type of gradient (linear or radial) and adjust various parameters such as tilt,
        radius, background repetition, size, shuffle color picking, etc.
      </p>
      
      <div class="project-card project-card-desktop">
        <div class="image-container radial-gradient">
          <img src="../assets/gradient-desktop3.png" alt="Isaure Lohest web developement project 2 - radial gradient">
        </div>

        <div class="image-container linear-gradient">
          <img src="../assets/gradient-desktop4.png" alt="Isaure Lohest web developement project 2 - linear gradient">
        </div>
      </div>
      
      <div class="check">
        <a href="/Gradient-generator/index.html" class="button" target="_blank">
          Check it out
        </a>
      </div>
    </div>
  </div>
</template>
     
  
<script>
  export default {
    name: 'GradientProject',

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
    background: #3077b5;
    color: var(--light-content);
    margin-top: 45px;
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
    height: 601px;
    object-fit: cover;
    object-position: top;
    border-radius: 40px;
  }
  .project-card {
    background-color: #3077b5;
    overflow: hidden;
    padding: 15px;
    border-radius: 40px;
  }
  .project-card-video {
    height: 632px;
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
    object-fit: cover;
  }
  .responsive {
    color: var(--red);
    font-weight: 600;
    margin: 20px;
  }
  .project-card.carte {
    display: flex;
    flex-direction: column;
    height: 594px;
    padding: 15px;
    margin-bottom: 30px;
    pointer-events: none;
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
    margin: 20px 0 80px 0!important;
    display: block; 
    margin: 0px auto; 
    background-color: #a6ff00;
    color: #eb5027;
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
    background: #d0ff78;
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
      min-height: 855px;
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
      height: 830px;
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