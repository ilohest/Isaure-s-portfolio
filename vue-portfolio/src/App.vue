<template>
  <header>
    <div class="header">
      <router-link to="/" @click="closeMenu" class="mobile-logo-container"><img src="./assets/sticker-isaure-v2-noQR.png" alt="logo" class="logo-menu"></router-link>

      <div class="sections">
        <div class="left-section">Available for freelance work</div>
        <div class="right-section"><a href="mailto:">isaure.lohest@gmail.com</a></div>
      </div>

      <!-- Menu Mobile -->
      <div class="mobile-menu">
        <button @click="toggleMobileMenu" class="hamburger" :class="{ open: isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div 
          :class="{'mobile-menu-content': true, 'opened': isMobileMenuOpen}" 
          v-show="isMobileMenuOpen"
        >
          <template v-if="currentMenu === 'main'">
            <ul>
              <li
                :class="{'menu-item': true, 'show': isMobileMenuOpen}"
                :style="{'--stagger-delay': '0.05s'}"
              >
                <router-link to="/" @click="closeMenu">Home</router-link>
              </li>

              <li 
                @click="navigateTo('achievements')" 
                :class="{ active: isAchievementsActive, 'menu-item': true, 'show': isMobileMenuOpen }"
                :style="{'--stagger-delay': '0.13s'}"
              >
              Achievements
                <span class="arrow-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="16px"
                    height="16px"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.58z" />
                  </svg>
                </span>
              </li>

              <li
                :class="{'menu-item': true, 'show': isMobileMenuOpen}"
                :style="{'--stagger-delay': '0.21s'}"
              >
                <router-link to="/services" @click="closeMenu">Services</router-link>
              </li>

              <li
                :class="{'menu-item': true, 'show': isMobileMenuOpen}"
                :style="{'--stagger-delay': '0.29s'}"
              >
                <router-link to="/contact" @click="closeMenu">Contact</router-link>
              </li>
            </ul>
          </template>

          <template v-else-if="currentMenu === 'achievements'">
            <div class="sub-menu">
              <h2 class="submenu-title">Achievements</h2>
              <button class="back-button" @click="navigateTo('main')">← Back</button>
              <ul>
                <li><router-link to="/achievements/tranche-de-cake-project" @click="closeMenu">Tranche de Cake</router-link></li>
                <li><router-link to="/achievements/boda-marta-y-pedro-project" @click="closeMenu">Boda Marta & Pedro</router-link></li>
                <li><router-link to="/achievements/academie-cle-do-re-project" @click="closeMenu">Académie Clé Do Ré</router-link></li>
                <li><router-link to="/achievements/la-petite-serre-urbaine-project" @click="closeMenu">La petite serre urbaine</router-link></li>
                <li><router-link to="/achievements/the-perfect-hamburger-project" @click="closeMenu">The perfect hamburger</router-link></li>
                <li><router-link to="/achievements/didacmania-project" @click="closeMenu">Didacmanía</router-link></li>
                <li><router-link to="/achievements/creyda-project" @click="closeMenu">Creyda</router-link></li>
                <li><router-link to="/achievements/gradient-project" @click="closeMenu">Gradient generator</router-link></li>
                <li><router-link to="/achievements/john-scissors-project" @click="closeMenu">John Scissors</router-link></li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Menu Desktop -->
    <nav class="desktop-menu">
      <ul>
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li 
          class="dropdown" 
          :class="{ active: isAchievementsActive }"
          @mouseenter="openDropdown"
          @mouseleave="closeDropdown"
        >
          Achievements
          <ul v-show="isDropdownOpen" class="dropdown-content">
            <li><router-link to="/achievements/tranche-de-cake-project">Tranche de Cake</router-link></li>
            <li><router-link to="/achievements/boda-marta-y-pedro-project">Boda Marta & Pedro</router-link></li>
            <li><router-link to="/achievements/academie-cle-do-re-project">Académie Clé Do Ré</router-link></li>
            <li><router-link to="/achievements/la-petite-serre-urbaine-project">La petite serre urbaine</router-link></li>
            <li><router-link to="/achievements/the-perfect-hamburger-project">The perfect hamburger</router-link></li>
            <li><router-link to="/achievements/didacmania-project">Didacmanía</router-link></li>
            <li><router-link to="/achievements/creyda-project">Creyda</router-link></li>
            <li><router-link to="/achievements/gradient-project">Gradient generator</router-link></li>
            <li><router-link to="/achievements/john-scissors-project">John Scissors</router-link></li>
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

    <a :href="whatsappLink" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
    </a>
       
    <div class="ribbon-container">
      <div class="ribbon-content" ref="ribbonContent">
        <div class="ribbon-text" ref="content">
          <span v-for="(item, index) in formattedItems" :key="index">
            {{ item }}
          </span>
        </div>
        <div class="ribbon-text">
          <span v-for="(item, index) in formattedItems" :key="'duplicate-' + index">
            {{ item }}
          </span>
        </div>
        <div class="ribbon-text">
          <span v-for="(item, index) in formattedItems" :key="'duplicate-' + index">
            {{ item }}
          </span>
        </div>
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
        phoneNumber: '+34600049801',
        message: 'Hello, I would like to know more about your services!',

        // Desktop menu
        isDropdownOpen: false,

        // Mobile menu
        isMobileMenuOpen: false,
        isAchievementsOpen: false,
        currentMenu: 'main',

        // Ruban
        items: [
          "Design with purpose",
          "Web development",
          "Creative websites",
          "Available for freelance work",
          "Contact me",
          "Fast delivery",
          "Attention to detail",
          "Creativity meets functionality",
          "Seamless Navigation",
          "Let's Work Together!",
          "Collaboration Opportunities",
        ],
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.applyDarkModeBasedOnTime();
        this.startBirdAnimation();

        // Gestion du ruban
        const content = this.$refs.content;
        const ribbonContent = this.$refs.ribbonContent;

        // Ajuster dynamiquement la largeur du contenu pour le ruban
        const contentWidth = content.offsetWidth;
        ribbonContent.style.width = `${contentWidth * 2}px`;
      });

      window.scrollTo(0, 0); // Forcer le défilement en haut
    },

    watch: {
      $route() {
        this.closeMenu();
      }
    },

    computed: {
      whatsappLink() {
        const encodedMessage = encodeURIComponent(this.message);
        return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
      },

      whatsappIcon() {
        return require('@/assets/whatsapp.svg'); 
      },

      isAchievementsActive() {
        // Vérifie si l'utilisateur est dans une route sous "achievements"
        return this.$route.path.startsWith('/achievements');
      },

      // Ruban
      formattedItems() {
        // Add the separator ✺ after every item, including the last one
        return this.items.flatMap(item => [item, "✺"]);
      },
    },

    methods: {
      applyDarkModeBasedOnTime() {
        const hour = new Date().getHours();
        
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

      // Desktop menu
      openDropdown() {
        this.isDropdownOpen = true;
      },
      closeDropdown() {
        this.isDropdownOpen = false;
      },

      // Mobile menu
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        if (!this.isMobileMenuOpen) {
          this.currentMenu = 'main'; // Réinitialise au menu principal lorsqu'on ferme
        }
      },
      navigateTo(menu) {
        this.currentMenu = menu;
      },
      closeMenu() {
        this.isMobileMenuOpen = false;
        this.currentMenu = 'main';
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
    --light-content: #ffffff;
    --red: #eb5027;
    --red-bg: #eb5027;
    --yellow-bg: #f6cd45;
    --blue-bg: #3077b5;
    --brat: #a6ff00;
    --brat-hover: #d0ff78;
    --service-four: #ff772b;
    --service-three: #394255;
    
    /* Dark */
    --dark-hover: #656575;
    --dark-bg: #1a4061;
    --dark-startColorstr: #303030;
    --dark-endColorstr: #1F1F2E;
    --main-white: white;
    --dark-element: #7D7D8F;
    --dark-button: #252534;
    --dark-button-hover: #48485f;
    --darker-bg: #19344b;
    --dark-brat: #689f00;
    --dark-brat-hover: #90ca26;
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
    --red-bg: var(--darker-bg);
    --yellow-bg: var(--darker-bg);
    --blue-bg: var(--darker-bg);
    --brat: var(--dark-brat);
    --brat-hover: var(--dark-brat-hover);
    --service-four: var(--darker-bg);
    --service-three: var(--darker-bg);
  }
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    scroll-behavior: auto;
  }
  #app {
    min-height: 100vh;
    overflow: hidden;
  }

  /* Header */
  .border-container {
    margin-top: 91px;
    padding: 0 20px;
    max-width: 1300px;
  }
  main {
    margin: 0 auto;
    background-attachment: fixed;
    font-family: 'Rajdhani', sans-serif;
    font-size: var(--fs-18);
    background: var(--light-bg);
    color: var(--main-black);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    border: 2px solid var(--red);
    display: flex;
    justify-content: center;
    transition: background-color 0.5s ease, color 0.5s ease;
  }
  header {
    z-index: 100;
    position: relative;
    background: var(--red-bg);
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
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
  }
  .logo-menu {
    width: 60px;
    height: 60px;
  }
  .logo-container {
    margin-left: 15px;
    display: flex;
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
    font-size: 20px;
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
  .whatsapp-button {
    position: fixed;
    bottom: 57px;
    right: 57px;
    z-index: 1000;
  }
  .whatsapp-icon {
    width: 40px;
    height: 40px;
  }
  .router-link-active,
  .active > a {
    color: #a6ff00!important;
  }

  /* Desktop Menu */
  .desktop-menu {
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
  }
  .desktop-menu ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  .desktop-menu li {
    margin: 0 15px;
    position: relative;
    cursor: pointer;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--red-bg);
    list-style: none;
    padding: 10px!important;
    width: 250px;
    border-radius: 10px;
    cursor: pointer;
  }
  .dropdown-content li {
    margin: 0;
    padding: 4px 0;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Mobile Menu */
  .mobile-menu {
    display: none;
  }
  .mobile-menu a,
  .mobile-menu div {
    color: inherit;
    text-decoration: none;
    font-size: var(--fs-24);
  }
  .mobile-menu-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .mobile-dropdown {
    margin-top: 10px;
    padding-left: 20px;
  }
  .menu-item.active,
  .dropdown.active {
    color: #a6ff00; 
  }
  .arrow {
    display: inline-block;
    margin-left: 10px;
    transition: transform 0.3s;
  }
  .arrow-active {
    transform: rotate(180deg);
  }
  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    font-family: inherit;
  }
  .submenu-title {
    font-size: var(--fs-30);
    color: white;
    margin-bottom: 20px;
    text-align: center;
  }
  .hamburger {
    position: relative;
    width: 30px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 100;
  }
  .hamburger span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: #fff;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .hamburger.open span:nth-child(1) {
    transform: translateY(11px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open span:nth-child(3) {
    transform: translateY(-11px) rotate(-45deg);
  }
  /* Arrivée décalée des éléments li du menu mobile */
  @keyframes slideInFromLeft {
    from {
      transform: translateX(-200%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .menu-item {
    opacity: 0;
    transform: translateX(-100%);
    animation: slideInFromLeft 0.5s ease-out forwards;
  }
  .menu-item.show {
    animation-delay: var(--stagger-delay);
  }
  /* Arrivée de mobile-menu-content d'en haut à droite */
  @keyframes expandFromTopRight {
    0% {
      width: 20px; /* Taille initiale, correspondant au bouton hamburger */
      height: 20px; /* Taille initiale */
      top: 10px; /* Position initiale, ajustez selon la position du bouton */
      right: 10px; /* Position initiale */
      border-radius: 20px;
      transform: scale(0); /* Réduction initiale */
    }
    100% {
      width: 100%; /* Prend toute la largeur */
      height: 100%; /* Prend toute la hauteur */
      top: 0; /* Remplit l'écran */
      right: 0; /* Remplit l'écran */
      border-radius: 0; /* Forme rectangle */
      transform: scale(1); /* Forme normale */
    }
  }
  .mobile-menu-content {
    background-color: var(--red-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 50;
    overflow-y: auto;
    position: fixed;
    width: 20px; /* Taille initiale */
    height: 20px; /* Taille initiale */
    top: 10px; /* Position initiale */
    right: 10px; /* Position initiale */
    border-radius: 20px;
    transform: scale(0);
    animation: expandFromTopRight 0.5s ease-out forwards; /* Transition pour les propriétés */
  }
  .mobile-menu-content.opened {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    border-radius: 0;
    transform: scale(1);
  }


  /* Style général de la scrollbar */
  ::-webkit-scrollbar {
    width: 12px; /* Largeur de la barre de défilement */
    background-color: #f4f4f4; /* Couleur de fond */
    border-radius: 10px; /* Coins arrondis */
  }
  ::-webkit-scrollbar-track { /* Style du "track" de la scrollbar */
    background-color: #e0e0e0; /* Couleur de fond de la piste */
    border-radius: 10px; /* Coins arrondis */
  }
  ::-webkit-scrollbar-thumb { /* Style de la "thumb" (poignée) */
    background-color: var(--red-bg); /* Couleur de la poignée */
    border-radius: 10px; /* Coins arrondis */
    border: 3px solid #f4f4f4; /* Espacement entre la poignée et la piste */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #eb5027; /* Couleur de la poignée au survol */
  }
  ::-webkit-scrollbar-thumb:active { 
    background-color: #a6ff00; /* Couleur de la poignée lors d'un clic */
  }


  @media (min-width: 629px) {
    nav ul {
      flex-direction: row;
      justify-content: flex-end;
    }
    .mobile-logo-container {
      display: none;
    }
  }
  @media (max-width: 628px) {
    nav {
      display: none;
    }
    nav ul {
      padding-top: 15px;
      align-items: center;
    }
    nav.menu-active {
      display: block;
      position: absolute;
      width: 100%;
      height: 100vh;
      top: 74px;
      left: 0;
      background-color: var(--red-bg);
    }
    .mobile-logo-container {
      width: 18%;
      display: flex;
      justify-content: center;
    }
    .sections {
      width: 74%;
      border-bottom: 0;
      display: unset;
    }
    .header {
      flex-direction: unset!important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 5px 10px;
    }
    .left-section {
      text-align: center;
    }
    .desktop-menu {
      display: none;
    }
    .mobile-menu {
      display: block;
      height: 20px;
      width: 18%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  /* Bottom slider */
  .ribbon-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: var(--red-bg);
    z-index: 1000;
    padding: 5px 0;
    cursor: pointer;
  }
  .ribbon-content {
    display: flex;
    animation: scroll-left 20s linear infinite; 
    animation-play-state: running;
  }
  .ribbon-content:hover {
    animation-play-state: paused; /* L'animation est arrêtée au survol */
  }
  .ribbon-text {
    display: flex;
    align-items: center;
    white-space: nowrap; 
    color: var(--light-content);
    font-family: 'Rajdhani', sans-serif !important;
    text-transform: uppercase;
  }
  .ribbon-text span {
    margin-right: 20px; /* Espacement entre les éléments */
    font-size: 14px;
    color: white;
  }
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%); /* Déplace de moitié pour boucler */
    }
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
    .whatsapp-button {
      right: 37px;
    }
    .dark-light-button {
      left: 37px;
    }
    .dropdown-content {
      position: relative; /* Maintient les éléments visibles */
    }
  }
</style>
