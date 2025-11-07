<template>
  <div id="app" class="main">
    <!-- Image 1 centered small with white background -->
    <div class="image-wrapper-xl">
      <img src="@/assets/elinor1.png" alt="Elinor 1" class="image-small"/>
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
              <li>Social network templates</li>
            </ul>
          </div>
          <div class="section about">
            <h3>About</h3>
            <p><i>Client: </i>Elinor kinésiologie<br>
              <i>Sector: </i>Health & wellness<br>
              <i>Country: </i>Belgium
            </p>
          </div>
        </div>

        <!-- Colonne centrale : Idea -->
        <div class="col-center section idea">
          <h3>Project</h3>
          <p>
            Elinor Kinesiology offers personalized holistic care that gently balances body and mind through expert muscle-response 
            testing and tailored energy techniques. Elinor creates a nurturing environment for expectant mothers, alleviating stress, 
            easing tension, and promoting optimal well-being for both mother and baby. Elinor’s compassionate approach adapts the 
            unique needs of the patients, guiding them toward a more harmonious, energized, and empowered journey.
          </p>
        </div>

        <!-- Colonne de droite : Implementations -->
        <div class="col-right section implementations">
          <div class="section project">
            <h3>Branding</h3>
            <p>
              This logo is built on a continuous, flowing line that forms an infinity loop — an intentional nod to the unending cycle of 
              energy in the body. Its shape subtly echoes the therapist’s hands in motion, listening and responding to the body’s own 
              signals. By bridging earth and sky, the logo embodies restored balance and the seamless connection between physical sensation 
              and emotional well-being. With its clean, organic form, it communicates professionalism, trust, and the core kinesiological 
              promise of guiding clients back to their natural state of harmony. The typography uses slender, elegant typefaces with generous 
              letter-spacing, projecting both precision and refinement. The color palette is built from soft pastels—muted tones that work 
              together to soothe the senses and reinforce the brand’s promise of balanced, restorative care.
            </p>
          </div>
        </div>
      </div>

    <!-- Sequence of large images under summary -->
    <div class="image-wrapper image-large">
      <img src="@/assets/elinor2.png" alt="Elinor 2" />
    </div>
    <div class="image-wrapper-xl custom-bg">
      <img src="@/assets/elinor8.png" alt="Elinor 8" class="image-xs"/>
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/elinor3.png" alt="Elinor 3" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/elinor4.png" alt="Elinor 4" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/elinor5.png" alt="Elinor 5" />
    </div>
    <div class="image-wrapper">
      <img src="@/assets/elinor6.png" alt="Elinor 6"  class="image-small"/>
    </div>
    <div class="row-container">
      <div class="image-row">
        <img src="@/assets/elinor9.png" alt="Elinor 9" />
        <img src="@/assets/elinor10.png" alt="Elinor 10" />
        <img src="@/assets/elinor11.png" alt="Elinor 11" />
      </div>
      <div class="image-row">
        <img src="@/assets/elinor12.png" alt="Elinor 9" />
        <img src="@/assets/elinor13.png" alt="Elinor 10" />
        <img src="@/assets/elinor14.png" alt="Elinor 11" />
      </div>
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/elinor7.png" alt="Elinor 7" />
    </div>
    <br>
    <br>
    <div class="check"><router-link class="button" to="/achievements/branding">Back to projects</router-link></div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'ElinorBranding',
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
  background: #DCB2A2;
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
.image-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.row-container {
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: #F7EFE4;
    padding: 10rem;
    margin: 3rem 0;
}
.image-row img {
  max-width: 300px;
  width: 100%;
  height: auto;
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

/* Responsive */
@media (max-width: 970px) {
  .project-summary.custom-layout {
    grid-template-columns: 1fr;
  }
  .col-left, .col-center, .col-right {
    width: 100%;
  }
}


@media (max-width: 970px) {
  /* Réduire les paddings globaux */
  .image-wrapper-xl {
    padding: 6rem 1rem;   /* avant 15rem */
    margin: 2rem 0;
  }
  .image-wrapper {
    padding: 1rem 0;
  }
  .row-container {
    padding: 4rem 1rem;   /* avant 10rem */
    margin: 2rem 0;
  }

  /* Projet summary : passage en une colonne */
  .project-summary.custom-layout {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  /* Images de ligne : toujours 3, mais plus petites */
  .image-row {
    gap: 0.5rem;          /* réduire l’écart horizontal */
  }
  .image-row img {
    max-width: 30%;       /* 3 images côte-à-côte */
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
  .row-container {
    padding: 2rem 0.5rem;
  }

  /* Réorganisation des images en une seule colonne */
  .image-row {
    flex-direction: column;
  }
  .image-row img {
    max-width: 300px;
    margin-bottom: 1rem;
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
  .row-container {
    padding: 1.5rem 0;
  }
  /* Réduire encore l’écart */
  .image-row {
    gap: 0.25rem;
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
