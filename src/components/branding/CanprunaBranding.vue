<template>
  <div id="app" class="main">
    <!-- Image 1 centered small with white background -->
    <div class="image-wrapper-xl">
      <img src="@/assets/img/canpruna1.png" alt="Can Pruna 1" class="image-small" />
    </div>

    <!-- Project summary with custom layout -->
    <div class="project-summary custom-layout">
      <!-- Colonne de gauche : About + Project -->
      <div class="col-left">
        <div class="section about">
          <h3>Responsibilities</h3>
          <ul>
            <li>Visual identity</li>
            <li>Web design</li>
          </ul>
        </div>
        <div class="section about">
          <h3>About</h3>
          <p>
            <i>Client: </i>Can Pruna<br />
            <i>Sector: </i>Hospitality & tourism<br />
            <i>Country: </i>Catalonia, Spain
          </p>
        </div>
      </div>

      <div class="col-center section idea">
        <h3>Project</h3>
        <p>
          Our design distilled Can Pruna’s Masía into a cohesive visual story,
          anchored by an earthy palette of charcoal, off-white, bright olive,
          and deep forest green drawn directly from the site. Hand-sketched
          elements bring an artisanal touch that feels both welcoming and
          authentic. We paired a generously spaced sans-serif for headings with
          a humanist serif for body text, allowing ample white space for imagery
          and line art to breathe. I also photographed and retouched all site
          imagery, ensuring each shot reflects the Masía’s tranquil, hospitable
          spirit. Together, these choices create an inviting, narrative-driven
          interface that evokes rest and reconnection from first glance.
        </p>
      </div>

      <div class="col-right section implementations">
        <h3>Branding</h3>
        <p>
          The Can Pruna logo features three stylized cypress trees set in subtle
          perspective. The trio conveys true hospitality : three trees speak to
          abundance and generosity, inviting visitors to join in a shared
          experience of rest and reconnection. In Mediterranean lore, one tree
          invites travelers for a drink, two promise food and drink, and three,
          just like here, signal full accommodation (drink, a meal, and a bed
          for the night). It underscores the Masía’s promise to offer not just
          shelter, but a gracious, inclusive welcome under the Montseny sky.
        </p>
      </div>
    </div>

    <div class="image-wrapper">
      <img src="@/assets/img/canpruna2.png" class="image-small" alt="Can Pruna 2" />
    </div>
    <div class="image-wrapper-xl custom-bg">
      <img src="@/assets/img/canpruna3.png" alt="Can Pruna 3" class="image-xs" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/img/canpruna4.png" alt="Can Pruna 4" />
    </div>
    <div class="image-wrapper image-large">
      <img src="@/assets/img/canpruna5.png" alt="Can Pruna 5" />
    </div>

    <div class="image-grid">
      <img src="@/assets/img/DSCF3669-1.jpg" alt="Grid image 1" />
      <img src="@/assets/img/DSCF3638-1.jpg" alt="Grid image 2" />
      <img src="@/assets/img/DSCF9479-1.jpg" alt="Grid image 3" />
      <img src="@/assets/img/DSCF9614-1.jpg" alt="Grid image 4" />
      <img src="@/assets/img/DSCF3622-1.jpg" alt="Grid image 5" />
      <img src="@/assets/img/DSCF9439-1.jpg" alt="Grid image 6" />
      <img src="@/assets/img/DSCF3659-1.jpg" alt="Grid image 7" />
      <img src="@/assets/img/DSCF3662-1.jpg" alt="Grid image 8" />
      <img src="@/assets/img/DSCF9586-1.jpg" alt="Grid image 9" />
    </div>

    <br />
    <br />
    <div class="check">
      <router-link class="button" to="/achievements/branding"
        >Back to projects</router-link
      >
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "CanprunaBranding",
  mounted() {
    window.scrollTo(0, 0);
  },
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
  padding: 2rem 0;
}
.image-small {
  max-width: 700px;
  min-width: 370px;
  margin: 30px auto;
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
  background: #153d27;
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
.col-left,
.col-center,
.col-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.section h3 {
  text-transform: uppercase;
  font-family: "Anton", sans-serif;
  margin-bottom: 0.5rem;
}
.section p,
.section ul {
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
  color: var(--red) !important;
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
  gap: 1rem; /* espace entre les images */
  padding: 2rem 0;
  justify-content: center;
  align-items: center;
}

.two-image-row img {
  width: calc(50% - 0.5rem); /* deux colonnes égales moins moitié du gap */
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
    width: 100%; /* pleine largeur sur mobile */
  }
}

/* Responsive */
@media (max-width: 970px) {
  .project-summary.custom-layout {
    grid-template-columns: 1fr;
  }
  .col-left,
  .col-center,
  .col-right {
    width: 100%;
  }
  /* Réduire les paddings globaux */
  .image-wrapper-xl {
    padding: 6rem 1rem; /* avant 15rem */
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
  .section p,
  .section ul {
    font-size: 0.9rem;
  }
  .section h3 {
    font-size: 1rem;
  }
}

/* Grille 3x3 responsive */
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; /* espace entre les images */
  margin: 2rem 0;
}

.image-grid img {
  width: 100%;
  aspect-ratio: 1 / 1; /* force le carré */
  object-fit: cover; /* recadrage centré si nécessaire */
  border-radius: 10px;
}

/* Passage à 1 colonne sur mobile */
@media (max-width: 628px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
