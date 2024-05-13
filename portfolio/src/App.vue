<template>
  <header>
    <div class="header">
      <div class="sections">
        <div class="left-section">Available for freelance work</div>
        <div class="right-section"><a href="mailto:">isaure.lohest@gmail.com</a></div>
      </div>

      <div class="mobile-menu" @click="toggleMenu">
        <span class="hamburger-icon"  :class="{ 'menu-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>

    <nav :class="{ 'menu-active': isMenuOpen }">
      <ul>
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li class="dropdown" :class="{ 'is-dropdown-open': isDropdownOpen, 'active': isAchievementsActive() }">
          <a href="#" @click.prevent="toggleDropdown">
            Achievements
            <span class="arrow" :class="{ 'arrow-active': isDropdownOpen }">&#9660;</span>
          </a>
            <ul class="dropdown-content">
              <li><router-link to="/achievements/the-perfect-hamburger-project" @click="closeMenu">The perfect hamburger</router-link></li>
              <li><router-link to="/achievements/didacmania-project" @click="closeMenu">Didacmanía</router-link></li>
              <li><router-link to="/achievements/creyda-project" @click="closeMenu">Creyda</router-link></li>
              <li><router-link to="/achievements/gradient-project" @click="closeMenu">Gradient generator</router-link></li>
              <li><router-link to="/achievements/john-scissors-project" @click="closeMenu">John Scissors</router-link></li>
            </ul>
        </li>
        <li><router-link to="/services" @click="closeMenu">Services</router-link></li>
        <li><router-link to="/contact" @click="closeMenu">Contact</router-link></li>
      </ul>
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
        isMenuOpen: false,
        isDropdownOpen: false,
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.applyDarkModeBasedOnTime();
        this.startBirdAnimation();
      });
    },

    watch: {
      $route() {
        this.closeMenu();
      }
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
        const projectRoutes = ['/achievements/the-perfect-hamburger-project', '/achievements/didacmania-project', '/achievements/creyda-project', '/achievements/gradient-project', '/achievements/john-scissors-project'];
        // Vérifie si la route actuelle est l'une des routes des projets
        return projectRoutes.includes(this.$route.path);
      },

      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },

      closeMenu() {
        this.isMenuOpen = false;
        this.isDropdownOpen = false;  // Ensure dropdown also closes
      },

      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
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
  .sections {
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
  nav a {
    text-decoration: none;
    color: var(--light-content);
    font-family: 'Anton';
    letter-spacing: 0.05em;
    font-size: 20px;
  }
  nav li {
    text-decoration: none;
    color: var(--light-content);
    font-family: 'Anton';
    letter-spacing: 0.05em;
    font-size: 18px;
  }
  nav a:hover,
  nav li:hover {
    color: #d0ff78;
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
  .active > a {
    color: #a6ff00!important;
  }

  /* Dropdown styles */
  nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
    flex-direction: column;
  }
  li {
    position: relative;
    list-style: none;
    cursor: pointer;
    padding: 10px;
  }
  .dropdown-content {
    display: none; 
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    position: absolute;
    z-index: 1;
    width: 174px;
    background-color: #eb5027;
    padding-top: 20px;
  }
  .dropdown-content a {
    color: var(--light-content);
    text-decoration: none;
    display: block;
    font-size: 15px;
  }
  .dropdown:hover .dropdown-content {
    display: block;
    max-height: none;
  }
  .mobile-menu {
    display: none;
    cursor: pointer;
  }
  .hamburger-icon {
    display: block;
    cursor: pointer;
    position: relative;
    width: 30px;
    height: 25px;
  }
  .hamburger-icon span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 10px;
    opacity: 1;
    left: 0;
    transition: all 0.25s ease-in-out;
  }
  .hamburger-icon span:nth-child(1) {
    top: 0px;
  }
  .hamburger-icon span:nth-child(2) {
    top: 9px;
  }
  .hamburger-icon span:nth-child(3) {
    top: 18px;
  }
  /* Transform into a cross */
  .menu-active span:nth-child(1) {
    top: 9px;
    transform: rotate(45deg);
  }
  .menu-active span:nth-child(2) {
    opacity: 0;
  }
  .menu-active span:nth-child(3) {
    top: 9px;
    transform: rotate(-45deg);
  }
  .arrow {
    display: inline-block;
    margin-left: 5px;
    transition: transform 0.3s;
    transform: rotate(0)!important;
  }
  .arrow-active {
    transform: rotate(180deg)!important;
  }
  .dropdown .arrow {
    transition: transform 0.3s ease;
  }
  .is-dropdown-open .dropdown-content {
    max-height: 240px;
    width: 174px;
    background-color: #eb5027;
    padding-top: 20px;
  }

  @media (min-width: 629px) {
    nav {
      display: block;
    }
    nav ul {
      flex-direction: row;
      justify-content: flex-end;
    }
    .arrow {
      display: none;
    }
  }
  @media (max-width: 628px) {
    nav {
      display: none;
    }
    nav.menu-active {
      display: block;
      position: absolute;
      width: 100%;
      top: 65px;
      left: 0;
      background-color: #eb5027;
    }
    .mobile-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15%;
    }
    .sections {
      width: 85%;
      border-right: 1px solid var(--light-content);
      border-bottom: 0;
      display: unset;
    }
    .header {
      flex-direction: unset!important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .left-section {
      text-align: center;
    }
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
    background-image: url('assets/bird-animation.svg');
  }
  .bird-dark {
    background-image: url('assets/bird-animation-dark.svg');
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
