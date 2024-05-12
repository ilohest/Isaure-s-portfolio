<template>
  <div id="app" class="main">
    <div class="project-summary">
      <h2>John Scissors</h2>

      <div class="project-info">
        A single page demo website of a traditional barber. Know-how and expertise at customer service.
      </div>
      
      <div class="project-container">
        <div class="project-resp barber">
          <h2>Responsibilities</h2>
          <p>Web design, Front-end web application Development, Launch</p>
        </div>

        <div class="project-url barber">
          <h2>URL</h2>
          <a href="John-Scissors/index.html" target="_blank">https://isaure-lohest.com/John-Scissors-project/John-Scissors/index.html</a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <p class="responsive">Desktop vue of the website.</p>

      <div class="project-card project-card-video">
        <img src="../../../ressources/barber-temp.png" class="video-placeholder" alt="Placeholder Image John Scissors project">
        <video src="../../../ressources/video-barbier.mp4" class="video-projet" autoplay loop muted preload="auto"></video>
      </div>

      <div class="project-card project-card-desktop">
        <div class="image-container">
          <img src="../../../ressources/barber-desktop1.png" alt="Isaure Lohest web developement project 1 - desktop vue">
        </div>

        <div class="image-container">
          <img src="../../../ressources/barber-desktop2.png" alt="Isaure Lohest web developement project 1 - desktop vue">
        </div>
      </div>

      <p class="responsive">The website is completely adaptable, providing an impressive display on mobile devices as well.</p>
      
      <div class="project-card carte">
        <div class="image12">
          <div class="photo"><img src="../../../ressources/barber-phone1.png" alt="Isaure Lohest web developement project 1 - mobile vue"></div>
          <div class="photo"><img src="../../../ressources/barber-phone2.png" alt="Isaure Lohest web developement project 1 - mobile vue"></div>
        </div>

        <div class="image34">
          <div class="photo"><img src="../../../ressources/barber-phone3.png" alt="Isaure Lohest web developement project 1 - mobile vue"></div>
          <div class="photo"><img src="../../../ressources/barber-phone4.png" alt="Isaure Lohest web developement project 1 - mobile vue"></div>
        </div>
      </div>

      <p class="responsive">Web developement using HTML5, CSS3, and JavaScript in Visual Studio Code.</p>
      
      <div class="project-card project-card-dev">
        <div class="image-container-dev">
          <img src="../../../ressources/barber-web-dev.png" alt="Isaure Lohest web developement project 1 - screen of the code editor">
        </div>
      </div>

      <div class="check"><a href="John-Scissors/index.html" class="button" target="_blank">Check it out</a></div>
    </div>
  </div>
</template>
     
  
<script>
  export default {
    name: 'JohnScissorsProject',
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
    transform: translateY(-101%);
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
    width: 100%;
  }
.project-card.carte {
  display: flex;
  height: 790px;
  padding: 15px;
  pointer-events: none;
}
.image12 {
  padding-right: 15px;
}
.image12,
.image34 {
  display: flex;
  gap: 15px;
  width: 50%;
}
.image12 .photo,
.image34 .photo {
  flex: 1;
  overflow: hidden;
}
.image12 .photo img,
.image34 .photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-card-dev {
  height: 700px;
  padding: 15px;
  margin-bottom: 30px;
  display: flex;
}
.image-container-dev {
  height: 100%;
  overflow: hidden;
  border-radius: 40px;
}
.image-container-dev img {
  width: 100%;
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
    height: 388px;
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
    height: 1630px;
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
  .image-container-dev img {
    width: 150%;
  }
}
@media screen and (max-width: 628px) {
  .project-card-video {
    margin-bottom: 30px;
  }
  .project-card-desktop {
    height: 889px;
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
    height: 3300px;
    width: 300px;
    flex-direction: column;
    gap: 15px;
  }
  .image12 {
    padding-right: 0;
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
    height: 50%;
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
  .image-container-dev img{
    width: 320%;
    transform: translateX(-123px);
  }
  .project-card-dev {
    height: 545px;
  }
}
</style>