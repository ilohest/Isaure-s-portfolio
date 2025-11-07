<template>
  <div id="app" class="main">
    <!-- Image 1 centered small with white background -->
    <div class="image-wrapper-xl">
      <img src="@/assets/blc1.png" alt="Bellelachaise 1" class="image-small"/>
    </div>

    <!-- Project summary with custom layout -->
    <div class="project-summary custom-layout">
        <!-- Colonne de gauche : About + Project -->
        <div class="col-left">
          <div class="section about">
            <h3>Responsibilities</h3>
            <ul>
              <li>Visual identity</li>
              <li>Art direction</li>
            </ul>
          </div>
          <div class="section about">
            <h3>About</h3>
            <p><i>Client: </i>Bellelachaise<br>
              <i>Sector: </i>Home décor & interior design (vintage furniture)<br>
              <i>Country: </i>Belgium
            </p>
          </div>
        </div>

        <!-- Colonne centrale : Idea -->
        <div class="col-center section idea">
          <h3>Project</h3>
          <p>
            This project brings iconic 1970s–80s vintage furniture through a minimalist lens. Each piece — carefully selected for 
            its era-defining form and quality — is refined to its essence: clean lines, natural materials, and a muted palette that 
            blends simplicity with warmth. The result is a cohesive collection that honors the bold silhouettes of the past while 
            delivering a serene, contemporary aesthetic. Perfectly balanced between nostalgia and modern restraint, this curated 
            lineup brings timeless character and effortless sophistication to any living space.
          </p>
        </div>

        <!-- Colonne de droite : Implementations -->
        <div class="col-right section implementations">
          <div class="section project">
            <h3>Branding</h3>
            <p>
              This logo takes the clean outline of a classic mid-century chair and distills it into a single, uninterrupted line—an abstract 
              “Pantone silhouette” that immediately suggests both design precision and timeless comfort. The slender serifs and high-contrast 
              strokes lend a timeless, upscale feel with a modern, approachable touch. Rendered in a deep, muted charcoal, the palette hints 
              at sophistication and pairs beautifully with the color palette. The palette draws directly from Pantone’s 2024 selection evoking 
              a sense of contemporary sophistication. Together, type and icon form a cohesive logo that speaks directly to the brand’s promise: 
              carefully curated, design-forward vintage furnishings brought to life in a minimalist, boutique setting.
            </p>
          </div>
        </div>
      </div>

     <div class="image-wrapper image-large">
      <img src="@/assets/blc2.jpg" alt="Bellelachaise 2" />
    </div>
    <div class="image-wrapper-xl custom-bg">
      <img src="@/assets/blc8.png" alt="Bellelachaise 8" class="image-xs"/>
    </div>
    <div class="two-image-row">
      <img src="@/assets/blc3.png" alt="Bellelachaise 3" />
      <img src="@/assets/blc4.png" alt="Bellelachaise 4" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/blc5.png" alt="Bellelachaise 5" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/blc6.png" alt="Bellelachaise 6" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/blc7.png" alt="Bellelachaise 7" />
    </div> 
    <!--
    <div class="image-wrapper image-large">
      <img src="@/assets/blc4.png" alt="Bellelachaise 4" />
    </div>
    <div class="image-wrapper">
      <img src="@/assets/blc6.png" alt="Bellelachaise 6"  class="image-small"/>
    </div>-->
    <br>
    <br>
    <div class="check"><router-link class="button" to="/achievements/branding">Back to projects</router-link></div>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'BellelachaiseBranding',
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
img,
.image-wrapper-xl,
.row-container {
  border-radius: 10px;
}
.image-wrapper-xl {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15rem 0;
  margin: 3rem 0;
}
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding:  2rem 0;
}
.image-small {
  max-width: 700px;
  min-width: 370px;
  margin: 0 auto;
}
.image-xs {
  max-width: 370px;
  min-width: 180px;
  width: 50%;
  margin: 0 auto;
}
.image-large img {
  width: 100%;
  max-width: 1500px;
  display: block;
  margin: 0 auto;
}
.custom-bg {
  background: #A47764;
}

/* Project summary custom layout (25-50-25) */
.project-summary.custom-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 2rem;
  border-radius: 10px;
  padding: 2rem;
  background: var(--blue-bg);
  color: var(--light-content);
  margin: 2rem 0;
}
.col-left, .col-center, .col-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.section h3 {
  text-transform: uppercase;
  font-family: "Anton", sans-serif;
  margin-bottom: 0.5rem;
}
.section p, .section ul {
  font-size: var(--fs-18);
  line-height: 1.5;
}
.section ul {
  list-style: inside disc;
  margin: 0;
  padding-left: 1rem;
}
.check {
    display: flex;
    justify-content: center; 
  }
  .button {
    text-align: center;
    text-decoration: none;
    display: block; 
    margin: 0px auto; 
    background-color: var(--brat);
    color: var(--red)!important;
    padding: 8px 20px;
    border: 2px solid; 
    border-radius: 10px;
    cursor: pointer; 
    text-transform: uppercase;
    font-size: var(--fs-18);
    letter-spacing: 0.05em;
    font-family: "Chakra Petch", sans-serif;
  }
  .button:hover {
    background: var(--brat-hover);
  }

  .two-image-row {
  display: flex;
  gap: 1rem;             /* espace entre les images */
  padding: 2rem 0;
  justify-content: center;
  align-items: center;
}

.two-image-row img {
  width: calc(50% - 0.5rem);  /* deux colonnes égales moins moitié du gap */
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .two-image-row {
    flex-direction: column;
    gap: 1.5rem;
  }
  .two-image-row img {
    width: 100%;              /* pleine largeur sur mobile */
  }
}


/* Responsive */
@media (max-width: 970px) {
  .project-summary.custom-layout {
    grid-template-columns: 1fr;
  }
  .col-left, .col-center, .col-right {
    width: 100%;
  }
  /* Réduire les paddings globaux */
  .image-wrapper-xl {
    padding: 6rem 1rem;   /* avant 15rem */
    margin: 2rem 0;
  }
  .image-wrapper {
    padding: 1rem 0;
  }
  /* Projet summary : passage en une colonne */
  .project-summary.custom-layout {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
}

/* Responsive pour mobiles (≤628px) */
@media (max-width: 628px) {
  /* Encore moins de padding pour économiser l’espace */
  .image-wrapper-xl {
    padding: 4rem 0.5rem;
  }
  .image-wrapper {
    padding: 0.5rem 0;
  }

  /* Ajuster les petites images */
  .image-small {
    max-width: 90%;
    min-width: auto;
  }
  .image-xs {
    width: 70%;
  }
}

/* Responsive pour tout petit (≤480px) */
@media (max-width: 480px) {
  .image-wrapper-xl {
    padding: 2rem 0;
  }

  /* Texte du résumé plus lisible */
  .section p, .section ul {
    font-size: 0.9rem;
  }
  .section h3 {
    font-size: 1rem;
  }
}
</style>
