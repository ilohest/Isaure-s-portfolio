<template>
  <div id="app" class="main">
    <div class="project-summary">
      <h2 class="project-title">La petite serre urbaine</h2>

      <div class="project-info">
        Discover the essence of sustainable beauty at La Petite Serre Urbaine, a
        responsible florist based in Brussels. Our newly designed website
        mirrors the fresh and minimalist style that defines their boutique.
        Experience the simplicity and elegance of our user-friendly interface,
        where you can easily browse the services, and visualize a gallery of
        their creations.
      </div>

      <div class="project-container">
        <div class="project-resp">
          <h2>Responsibilities</h2>
          <p>
            Web design personalization, Readymag setup, Site development,
            Website launch.
          </p>
        </div>

        <div class="project-url">
          <h2>URL</h2>
          <a
            href="https://readymag.website/u2550487877/la-petite-serre-urbaine"
            target="_blank"
          >
            readymag.website/u2550487877/la-petite-serre-urbaine
          </a>
        </div>
      </div>
    </div>

    <div class="cards-container">
      <div class="project-card project-card-video">
        <img
          src="../../assets/la-petite-serre-urbaine-desktop1.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 1"
        />
      </div>
      <div class="project-card project-card-video">
        <img
          src="../../assets/la-petite-serre-urbaine-desktop2.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 2"
        />
      </div>
      <div class="project-card project-card-video">
        <img
          src="../../assets/la-petite-serre-urbaine-desktop3.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 3"
        />
      </div>
      <div class="project-card project-card-video">
        <img
          src="../../assets/la-petite-serre-urbaine-desktop4.png"
          class="video-placeholder"
          alt="La petite serre urbaine project - desktop vue 4"
        />
      </div>

      <div class="project-card carte">
        <div class="line">
          <div class="image12">
            <div class="photo">
              <img
                src="../../assets/la-petite-serre-urbaine-mobile1.png"
                alt="La petite serre urbaine project - mobile vue 1"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/la-petite-serre-urbaine-mobile2.png"
                alt="La petite serre urbaine project - mobile vue 2"
              />
            </div>
          </div>

          <div class="image34">
            <div class="photo">
              <img
                src="../../assets/la-petite-serre-urbaine-mobile3.png"
                alt="La petite serre urbaine project - mobile vue 3"
              />
            </div>
            <div class="photo">
              <img
                src="../../assets/la-petite-serre-urbaine-mobile4.png"
                alt="La petite serre urbaine project - mobile vue 4"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="check">
        <a
          href="https://readymag.website/u2550487877/la-petite-serre-urbaine"
          class="button"
          target="_blank"
          >Check it out</a
        >
      </div>

      <!-- Bloc de navigation -->
      <div class="project-navigation">
        <router-link to="/achievements/web-developement/the-perfect-hamburger">
          &#8592; Previous Project
        </router-link>
        <router-link to="/achievements/web-developement/academie-cle-do-re">
          Next Project&#8594;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LaPetiteSerreUrbaine",

  data() {
    return {
      videoLoaded: false,
    };
  },

  methods: {
    markVideoAsLoaded() {
      this.videoLoaded = true;
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.project-info {
  font-size: var(--fs-18);
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
  border-radius: 10px;
  padding: 40px;
  background: var(--blue-bg);
  color: var(--light-content);
  margin-top: 45px;
  margin-bottom: 30px;
}
h2 {
  color: var(--light-content);
  text-transform: uppercase;
  font-size: var(--fs-18);
  letter-spacing: 0.05em;
  font-family: "Chakra Petch", sans-serif;
  margin-bottom: 20px;
  font-weight: 400;
}
.project-resp {
  width: 60%;
  font-size: var(--fs-18);
}
.project-url {
  width: 40%;
  font-size: var(--fs-18);
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
.video-placeholder {
  width: 100%;
  height: 809px;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.project-card {
  background-color: var(--blue-bg);
  overflow: hidden;
  padding: 15px;
  border-radius: 10px;
}
.project-card-video {
  height: 840px;
  margin-bottom: 30px;
}
.video-projet {
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  object-position: top;
  border-radius: 10px;
}
.project-card-desktop {
  height: 444px;
  display: flex;
  pointer-events: none;
  margin-bottom: 30px;
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
  border-radius: 10px;
  height: 414px;
  object-position: top;
}
.responsive {
  color: var(--red);
  margin: 20px;
}
.project-card.carte {
  display: flex;
  flex-direction: column;
  height: 672px;
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
  border-radius: 10px;
}
.check {
  display: flex;
  justify-content: center;
}
.button {
  text-align: center;
  text-decoration: none;
  margin-bottom: 80px !important;
  display: block;
  margin: 0px auto;
  background-color: var(--brat);
  color: var(--red);
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
    padding: 0 !important;
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
    font-size: var(--fs-30);
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
  .right-section {
    border-left: none;
    width: 100%;
    padding: 13px 0;
    border-top: var(--main-black) solid 3px;
  }
}
@media screen and (max-width: 628px) {
  main {
    max-width: 299px !important;
  }
  .header {
    flex-direction: column;
  }
  .left-section {
    padding: 13px 0;
  }
  .project-card-video {
    margin-bottom: 30px;
  }
  .project-card-desktop {
    height: 985px;
    min-height: unset;
  }
  .image-container img {
    width: 187%;
    transform: translateX(-18%);
  }
  .image-container {
    border-radius: 10px;
    padding: 0;
  }
  .project-card.carte {
    height: 2400px;
    margin-bottom: 30px;
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
