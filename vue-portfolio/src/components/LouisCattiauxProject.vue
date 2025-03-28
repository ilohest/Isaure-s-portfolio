<template>
    <div id="app" class="main">
      <div class="project-summary">
        <h2 class="project-title">Louis Cattiaux</h2>
  
        <div class="project-info">
            This website serves as a comprehensive portal dedicated to the life and works of Louis Cattiaux,
            an enigmatic figure in the realm of mystical and esoteric art. Designed as a digital archive,
            the site hosts an extensive collection of articles, essays, and analyses that explore Cattiaux’s
            profound influence on spiritual art and thought. A curated gallery of high-resolution images showcases
            Cattiaux’s most notable artworks, providing visitors with a visual understanding of his unique style
            and thematic preoccupations. This website is fully multilingual, allowing users to navigate in their
            preferred language, and it offers both a light and dark mode for an optimal viewing experience.
        </div>
  
        <div class="project-container">
          <div class="project-resp">
            <h2>Responsibilities</h2>
            <p>
                Web Design Personalization, WordPress Installation and database setup, Site Development, SEO Optimization
                for improved visibility, Website Launch, Client Training on back-office management
            </p>
          </div>
  
          <div class="project-url">
            <h2>URL</h2>
            <a href="http://louiscattiaux.com" target="_blank">
              louiscattiaux.com
            </a>
          </div>
        </div>
      </div>
  
      <div class="gallery-grid project-bg">
        <!-- Ligne 1 : Deux colonnes en format paysage -->
        <div class="grid-row row1">
          <div class="grid-item landscape">
            <img src="../assets/lc-desktop-image1.png" alt="Desktop image 1">
          </div>
          <div class="grid-item landscape">
            <img src="../assets/lc-desktop-image2.png" alt="Desktop image 2">
          </div>
        </div>

        <!-- Ligne 2 : Trois colonnes
        - Colonne 1 (50%) : Deux images en pile
        - Colonnes 2 et 3 (25% chacune) : Une image chacune -->
        <div class="grid-row row2">
          <div class="grid-item stack">
            <div class="stack-item">
              <img src="../assets/lc-desktop-image4.png" alt="Desktop image 3">
            </div>
            <div class="stack-item">
              <img src="../assets/lc-desktop-image5.png" alt="Desktop image 4">
            </div>
          </div>
          <div class="grid-item portrait">
            <img src="../assets/lc-mobile-image1.png" alt="Mobile image 5">
          </div>
          <div class="grid-item portrait">
            <img src="../assets/lc-mobile-image2.png" alt="Mobile image 6">
          </div>
        </div>

        <!-- Ligne 3 modifiée :
        - Colonne 1 : Image portrait
        - Colonne 2 : Conteneur stack avec 2 images paysage superposées
        - Colonne 3 : Image portrait -->
        <div class="grid-row row3">
          <div class="grid-item portrait">
            <img src="../assets/lc-mobile-image3.png" alt="Mobile image 1">
          </div>
          <div class="grid-item stack landscape-stack">
            <div class="stack-item">
              <img src="../assets/lc-desktop-image6.png" alt="Stacked Landscape image 1">
            </div>
            <div class="stack-item">
              <img src="../assets/lc-desktop-image3.png" alt="Stacked Landscape image 2">
            </div>
          </div>
          <div class="grid-item portrait">
            <img src="../assets/lc-mobile-image4.png" alt="Mobile image 4">
          </div>
        </div>

        <div class="check"><a href="http://louiscattiaux.com" class="button" target="_blank">Check it out</a></div>
        
        <!-- Bloc de navigation -->
        <div class="project-navigation">
          <router-link to="/achievements/boda-natalia-y-mauricio-project">
            &#8592; Previous Project
          </router-link>
        </div>
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
    .project-bg {
      border-radius: 40px;
      /* padding: 20px;
      background: var(--blue-bg);
      color: var(--light-content); */
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
      width: 70%;
      font-size: var(--fs-20);
    }
    .project-url {
      width: 30%;
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
    .responsive {
      color: var(--red);
      font-weight: 600;
      margin: 20px;
    }
    .check {
      display: flex;
      justify-content: center; 
    }
    .button {
      text-align: center;
      text-decoration: none;
      display: block; 
      margin: 30px auto; 
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

   /* Container principal de la galerie */
    .gallery-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    /* Chaque ligne de la galerie utilise CSS Grid */
    .grid-row {
        display: grid;
        gap: 20px;
    }

    /* Ligne 1 : deux colonnes pour images paysage */
    .row1 {
        grid-template-columns: 1fr 1fr;
    }

    /* Ligne 2 : trois colonnes (50% pour le stack + 25% pour chaque portrait) */
    .row2 {
        grid-template-columns: 2fr 1fr 1fr;
    }

    /* Ligne 3 (desktop) : trois colonnes (portrait - stack - portrait) */
    .row3 {
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-areas: "portrait1 stack portrait2";
    }

    /* Attribution des grid-areas aux enfants de row3 */
    .row3 > .grid-item:nth-child(1) {
        grid-area: portrait1;
    }
    .row3 > .grid-item:nth-child(2) {
        grid-area: stack;
    }
    .row3 > .grid-item:nth-child(3) {
        grid-area: portrait2;
    }

    /* Styles généraux pour les images */
    .grid-item img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        border-radius: 10px;
    }

    /* Ratio pour les images paysage */
    .landscape img,
    .landscape-stack img {
        aspect-ratio: 16 / 9;
    }

    /* Ratio pour les images portrait */
    .portrait img {
        aspect-ratio: 3 / 4;
    }

    /* Pour les conteneurs en pile */
    .stack {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .stack-item {
        flex: 1;
        overflow: hidden;
    }

    /* Responsive */
    @media screen and (max-width: 970px) {
      /* Pour les lignes contenant des images paysage, on passe à 1 colonne */
      .row1 {
        grid-template-columns: 1fr;
      }
      /* Ligne 2 passe à 2 colonnes :
      Le conteneur stack occupe les deux colonnes, les images portrait restent en grille */
      .row2 {
        grid-template-columns: repeat(2, 1fr);
      }
      .row2 > .grid-item.stack {
        grid-column: 1 / -1;
      }
      /* Ligne 3 passe à 2 colonnes.
      On force le conteneur stack (landscape-stack) à occuper toute la largeur */
      .row3 {
        grid-template-columns: 1fr 1fr;
        /* Le conteneur stack occupe la première ligne et s'étend sur deux colonnes,
        les deux images portrait s'affichent côte à côte sur la deuxième ligne */
        grid-template-areas:
        "stack stack"
        "portrait1 portrait2";
      }
      .portrait img {
        aspect-ratio: unset;
      }
      .dark-light-button {
        height: 20px !important;
        bottom: 40px !important;
        left: 40px !important;
      }
      .line {
        flex-wrap: wrap;
        height: 100%;
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
      .line {
        flex-direction: column;
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