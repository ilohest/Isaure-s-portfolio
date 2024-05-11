<template>
  <header>
    <div class="header">
      <div class="left-section">Available for freelance work</div>
      <div class="right-section"><a href="mailto:">isaure.lohest@gmail.com</a></div>
    </div>

    <nav>
      <router-link to="/">Home</router-link>
      <li class="dropdown" :class="{ 'active': isAchievementsActive() }">
        Achievements
        <ul class="dropdown-content">
          <li><router-link to="/achievements/the-perfect-hamburger-project">The perfect hamburger</router-link></li>
          <li><router-link to="/achievements/didacmania-project">Didacmanía</router-link></li>
        </ul>
      </li>
      <router-link to="/services">Services</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>

  <main>
    <div class="border-container">
      <router-view/>
  
      <div ref="birdContainer" class="bird-container gauche-droite">
        <div ref="bird" class="bird bird-light"></div>
      </div>
    </div>
  </main>

  <footer>
    <img
      ref="darkButton"
      :src="darkButtonSrc"
      alt="dark / light background button"
      class="dark-light-button"
      @click="toggleDarkMode"
    >
    
    <div class="slider-container">
      <div class="slider">
        <span>Design * Web developement * Frontend developement * Wordpress developement * Creative websites * Startups * New buisnesses * Available for freelance work * Contact me at isaure.lohest@gmail.com * </span>
        <span>Design * Web developement * Frontend developement * Wordpress developement * Creative websites * Startups * New buisnesses * Available for freelance work * Contact me at isaure.lohest@gmail.com * </span>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'HomeIsaure',

    data() {
      return {
        darkBackground: false,
        compteur: 0,
        darkButtonSrc: require('@/assets/dark.svg'),
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.applyDarkModeBasedOnTime();
        this.startBirdAnimation();
      });
    },

    methods: {
      applyDarkModeBasedOnTime() {
        const hour = new Date().getHours();
        // const darkButton = this.$refs.darkButton;
        
        if (hour >= 20 || hour <= 6) {
          document.body.classList.add('dark-mode');
          this.darkButtonSrc = require('@/assets/light.svg');
          this.darkBackground = true;
        } else {
          document.body.classList.remove('dark-mode');
          this.darkButtonSrc = require('@/assets/dark.svg');
          this.darkBackground = false;
        }
      },

      toggleDarkMode() {
        // const darkButton = this.$refs.darkButton;
        const bird = this.$refs.bird;

        if (!this.darkBackground) {
          document.body.classList.add('dark-mode');
          this.darkButtonSrc = require('@/assets/light.svg');
          bird.classList.add('bird-dark');
          bird.classList.remove('bird-light');
          this.darkBackground = true;
        } else {
          document.body.classList.remove('dark-mode');
          this.darkButtonSrc = require('@/assets/dark.svg');
          bird.classList.add('bird-light');
          bird.classList.remove('bird-dark');
          this.darkBackground = false;
        }
      },

      voler() {
        const bird = this.$refs.bird;
        const birdContainer = this.$refs.birdContainer;

        if (!bird || !birdContainer) {
          //console.warn('Bird or BirdContainer not found');
          return;
        }

        if (this.compteur % 2 === 0) {
          bird.classList.add('birdDG');
          birdContainer.classList.add('droite-gauche');
          birdContainer.classList.remove('gauche-droite');
        } else {
          bird.classList.remove('birdDG');
          birdContainer.classList.remove('droite-gauche');
          birdContainer.classList.add('gauche-droite');
        }

        this.compteur++;
      },

      startBirdAnimation() {
        setTimeout(() => {
          this.voler(); 
          setInterval(this.voler, 30000);
        }, 30000);
      },

      isAchievementsActive() {
        // Liste des routes des projets
        const projectRoutes = ['/achievements/the-perfect-hamburger-project', '/achievements/didacmania-project'];
        // Vérifie si la route actuelle est l'une des routes des projets
        return projectRoutes.includes(this.$route.path);
      }

    }
  };
</script>

<style>
  /* Design system */
  :root {
    /* Font-size */
    --fs-14: 0.875rem;
    --fs-16: 1rem;
    --fs-18: 1.125rem;
    --fs-20: 1.25rem;
    --fs-24: 1.5rem;
    --fs-30: 1.875rem;

    /* Palette */
    
    /* Light */
    --light-hover: #DADAD8;
    --light-bg: rgb(244, 241, 224) 00%, rgb(255, 255, 255) 100%;
    --light-startColorstr: #93a7b5;
    --light-endColorstr: #ece7e1;
    --main-black: #2c313b;
    --light-element: #ECE7E1;
    --light-button: #a49786;
    --light-button-hover: #b5a795;
    --light-content: #ece8d0;
    --red: #eb5027;
    
    /* Dark */
    --dark-hover: #656575;
    --dark-bg: #eb5027 00%, #ffae99 100%;
    --dark-startColorstr: #303030;
    --dark-endColorstr: #1F1F2E;
    --main-white: white;
    --dark-element: #7D7D8F;
    --dark-button: #252534;
    --dark-button-hover: #48485f;
  }
  .dark-mode {
    --light-hover: var(--dark-hover);
    --light-bg: var(--dark-bg);
    --light-startColorstr: var(--dark-startColorstr);
    --light-endColorstr: var(--dark-endColorstr);
    --main-black: var(--main-white);
    --light-element: var(--dark-element);
    --light-button: var(--dark-button);
    --light-button-hover: var(--dark-button-hover);
    --light-content: var(--main-white);
    --red: var(--main-white);
  }
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Header */
  .border-container {
    margin-top: 91px;
    padding: 0 20px;
    max-width: 1300px;
  }
  main {
    margin: 0 auto;
    background: rgb(147,167,181);
    background-attachment: fixed;
    font-family: 'Rajdhani', sans-serif;
    font-size: var(--fs-18);
    background: -moz-linear-gradient(351deg, var(--light-bg));
    background: -webkit-linear-gradient(351deg, var(--light-bg));
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="var(light-startColorstr)",endColorstr="var(light-endColorstr)",GradientType=1);
    background: linear-gradient(351deg, var(--light-bg));
    color: var(--main-black);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    border: 2px solid #eb5027;
    display: flex;
    justify-content: center;
  }
  header {
    z-index: 100;
    position: relative;
    background: #eb5027;
    color: var(--light-content);
    font-family: 'Rajdhani';
    border-bottom: 2px solid var(--light-content);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom: 1px solid var(--light-content);
  }
  .left-section {
    padding: 5px 20px;
  }
  .right-section {
    text-align: center;
    padding: 5px 20px;
    border-left: var(--light-content) solid 1px;
  }
  .right-section a {
    text-decoration: none;
    color: inherit;
  }
  nav {
    font-size: var(--fs-14);
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    gap: 25px;
  }
  nav a,
  nav li {
    text-decoration: none;
    color: var(--light-content);
    font-family: 'Anton';
    letter-spacing: 0.05em;
    font-size: 20px;
  }
  nav a:hover,
  nav li:hover {
    color: #d0ff78;
  }
  .breadcrumb {
    display: flex;
    list-style-type: none; 
  }
  .breadcrumb li, .breadcrumb span {
    padding: 10px; 
  }
  .breadcrumb a {
    text-decoration: none;
    color: inherit;
  }
  .dark-light-button {
    height: 25px;
    position: fixed;
    bottom: 57px;
    left: 57px;
    border: none;
    cursor: pointer;
  }
  .router-link-active,
  li.active {
    color: #a6ff00!important;
  }
  /* Dropdown styles */
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    background-color: #333;
    margin: 0;
  }
  li {
    position: relative;
    list-style: none;
    cursor: pointer;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    padding-top: 20px;
    background-color: #eb5027;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 0 0 10px 10px;
  }
  .dropdown-content a {
    color: var(--light-content);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 15px;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }














  /* Bottom slider */
  .slider {
    text-transform: uppercase;
    display: inline-block;
    white-space: nowrap;
    animation: defilement 20s linear infinite;
    cursor: pointer;
    bottom: 0;
    position: fixed; 
    background: #eb5027;
  }
  .slider span {
    color: var(--light-content);
    font-family: 'Rajdhani', sans-serif!important;
  }
  .slider-container {
    overflow: hidden;
  }
  @keyframes defilement {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .slider:hover {
    animation: defilement 25s linear infinite;
  }

  /* Flying bird animation */
  .bird {
    width: 100px;
    height: 100px;
    background-size: auto 100%;
    will-change: background-position;
    animation-duration: 1s;
    animation-name: ailes;
    animation-timing-function: steps(6);
    animation-iteration-count: infinite;
  }
  .bird-light {
    background-image: url('../../ressources/bird-animation.svg');
  }
  .bird-dark {
    background-image: url('../../ressources/bird-animation-dark.svg');
  }
  .birdDG {
    transform: scaleX(-1);
  }
  @keyframes ailes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -600px 0;
    }
  }
  .bird-container {
    animation-duration: 30s;
    animation-delay: 2s;
    top: 20%;
    position: fixed; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .gauche-droite {
    animation-name: avancementGD;
    left: -10%;
    transform: scale(0) translateX(-10vh);
  }
  @keyframes avancementGD {
    0% {
        transform: scale(.8) translateX(-10vh);
    }
    5% {
        transform: translateY(2vh) translateX(10vw) scale(.8);
    }
    10% {
        transform: translateY(0) translateX(30vw) scale(.9);
    }
    15% {
        transform: translateY(1vh) translateX(50vw) scale(1);
    }
    20% {
        transform: translateY(2vh) translateX(70vw) scale(1);
    }
    25% {
        transform: translateY(0) translateX(90vw) scale(1);
    }
    30% {
        transform: translateY(0) translateX(110vw) scale(1);
    }
    50% {
        transform: translateY(0) translateX(110vw) scale(1);
    }
    100% {
        transform: translateY(0) translateX(110vw) scale(1);
    }
  }
  .droite-gauche {
    animation-name: avancementDG;
    right: 90%;
    transform: scale(0) translateX(130vw);
  }
  @keyframes avancementDG {
    0% {
        transform: scale(.8) translateX(130vw);
    }
    5% {
        transform: translateY(2vh) translateX(90vw) scale(.8);
    }
    10% {
        transform: translateY(0) translateX(70vw) scale(.9);
    }
    15% {
        transform: translateY(1vh) translateX(50vw) scale(1);
    }
    20% {
        transform: translateY(2vh) translateX(30vw) scale(1);
    }
    25% {
        transform: translateY(0) translateX(10vw) scale(1);
    }
    30% {
        transform: translateY(0) translateX(-10vw) scale(1);
    }
    50% {
        transform: translateY(0) translateX(-10vw) scale(1);
    }
    100% {
        transform: translateY(0) translateX(-10vw) scale(1);
    }
  }

  /* Responsive */
  @media screen and (max-width: 628px) {
    .bird-container {
      animation-duration: 22s!important;
    }
  }
  @media screen and (max-width: 628px) {
    .header {
      flex-direction: column;
    }
    .right-section {
      border-left: none;
      width: 100%;
      padding: 5px 0;
      border-top: var(--light-content) solid 1px;
    }
    .left-section {
      padding: 5px 0;
    }
    nav a {
      font-size: 18px;
    }
    .border-container {
      width: 100%;
    }
    .bird-container {
      animation-duration: 15s!important;
    }
  }
</style>
