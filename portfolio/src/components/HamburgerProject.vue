<template>
  <div id="app" class="main">
    <div class="project-summary">
      <h2 class="project-title">The perfect hamburger</h2>

      <div class="project-info">
        Discover the ultimate burger experience with our demo website for "The perfect hamburger".
        Each animation brings the flavors to life, making you almost taste the savory, juicy burgers through your screen.
        Enjoy exploring this demo site, where each click unveils a new layer of the gourmet burger world!
      </div>

      <div class="project-container">
        <div class="project-resp didacmania">
          <h2>Responsibilities</h2>
          <p>Web Design Personalization, Tilda setup, Site Development, Website Launch.</p>
        </div>

        <div class="project-url didacmania">
          <h2>URL</h2>
          <a href="http://the-perfect-hamburger.tilda.ws/" target="_blank">http://the-perfect-hamburger.tilda.ws/</a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <p class="responsive">
        Enjoy seamless navigation with subtle animations that guide you through the restaurant's story and menu.
        The parallax scrolling and dynamic effects create a delightful journey from start to finish.
        Feast your eyes on our high-definition, animated displays of "The perfect Hamburger's" signature burgers.
      </p>

      <div class="project-card project-card-video">
        <img src="../../../ressources/hamburger-desktop1.png" class="video-placeholder" alt="Placeholder  The perfect hamburger project">
        <video src="../../../ressources/video-the-perfect-burger.mp4" class="video-projet" autoplay loop muted preload="auto"></video>
      </div>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img src="../../../ressources/hamburger-desktop2.png" alt="Isaure Lohest web developement project 4 - desktop vue">
        </div>

        <div class="image-container">
          <img src="../../../ressources/hamburger-desktop3.png" alt="Isaure Lohest web developement project 4 - desktop vue">
        </div>
      </div>
      
      <p class="responsive">
        Designed to provide an optimal viewing experience across all devices.
        Watch animations and transitions adapt smoothly to your screen, ensuring a beautiful and functional presentation whether you're on a phone, tablet, or desktop.
      </p>
      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo"><img src="../../../ressources/hamburger-mobile1.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
            <div class="photo"><img src="../../../ressources/hamburger-mobile2.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
          </div> 
          <div class="image34">   
            <div class="photo"><img src="../../../ressources/hamburger-mobile3.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
            <div class="photo"><img src="../../../ressources/hamburger-mobile4.png" alt="Isaure Lohest web developement project 3 - mobile vue"></div>
          </div>
        </div>
      </div>
      
      <div class="check"><a href="http://the-perfect-hamburger.tilda.ws/" class="button" target="_blank">Check it out</a></div>
    </div>
  </div>
</template>
     
  
<script>
  export default {
    name: 'HamburgerProject',

    data() {
      return {
      }
    }
  }
</script>
  
<style scoped>
  .project-info {
    font-size: var(--fs-20);
    text-align: justify;
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
    margin-top: 30px;
  }
  h2 {
    color: var(--light-content);
    text-transform: uppercase;
    font-size: 28px;
    letter-spacing: 0.05em;
    font-family: 'Anton';
    margin-bottom: 20px;
  }
  .project-resp {
    width: 60%;
    font-size: var(--fs-20);
    text-align: justify;
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
    background-color: #3077b5;
    overflow: hidden;
    padding: 15px;
    border-radius: 40px;
  }
  .project-card-video {
    height: 650px;
    margin-bottom: 30px;
  }
  .video-projet {
    overflow: hidden;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    object-position: top;
    transform: translateY(-102%);
    border-radius: 40px;
  }
  .project-card-desktop {
    height: 444px;
    margin-bottom: 30px;
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
    margin-bottom: 80px!important;
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
      margin-bottom: 50px;
    }
    .project-card-desktop {
      height: 882px;
      margin-bottom: 50px;
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
    .responsive {
      text-align: justify;
    }
    .project-summary {
      margin-top: 60px;
    }
  }
</style>