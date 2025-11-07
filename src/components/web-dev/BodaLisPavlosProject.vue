<template>
  <div id="app" class="main">
    <div class="project-summary">
      <h2 class="project-title">Boda Lis & Pavlos</h2>

      <div class="project-info">
        For this collaboration with La Invitación de Liana, I created a wedding
        website that celebrates both craftsmanship and digital elegance.
        Designed around the couple’s vision, the site features a rich blend of
        soft animations and personalized illustrations, adding charm and
        personality to every section. Guests can explore the wedding details in
        an aesthetically balanced layout. A secure password-protected access
        ensures the privacy of all information, making the experience both
        intimate and exclusive.
      </div>

      <div class="project-container">
        <div class="project-resp">
          <h2>Responsibilities</h2>
          <p>
            HTML, CSS, JavaScript development, server-side setup, custom
            illustration integration, hosting and domain configuration, website
            launch, post-launch support.
          </p>
        </div>

        <div class="project-url">
          <h2>URL</h2>
          <a href="https://pavlosandlis.com/" target="_blank">
            pavlosandlis.com
          </a>
        </div>
      </div>
    </div>

    <div class="mockup-container">
      <img
        src="../../assets/img/bodalp-desktop1.png"
        class="mockup1"
        alt="Boda Natalia & Mauricio - mockup 1"
      />
    </div>

    <p class="text">
      Fully bilingual, the website allows both local and international guests to
      navigate seamlessly in their preferred language. The site provides a
      dedicated page with a curated list of recommended accommodations near the
      event venue, complete with direct booking links. The site is fully
      responsive, optimized for all devices, and includes a custom domain
      featuring the couple’s names. Hosting is included, and post-launch
      technical support ensures everything runs smoothly..
    </p>

    <div class="cards-container">
      <div class="video-intro">
        <div class="project-card project-card-video">
          <img
            v-show="!videoLoaded"
            src="../../assets/img/bodalp-desktop2.png"
            class="video-placeholder"
            alt="Boda Lis & Pavlos"
          />
        </div>
        <p>
          Share all your wedding details effortlessly <br />
          with a personalized digital touch
        </p>
      </div>

      <div class="grid-row row1">
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop3.png" alt="Boda Lis & Pavlos" />
        </div>
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop4.png" alt="Boda Lis & Pavlos" />
        </div>
      </div>

      <div class="grid-row row2">
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop7.png" alt="Boda Lis & Pavlos" />
        </div>
        <div class="grid-item landscape">
          <img src="../../assets/img/bodalp-desktop8.png" alt="Boda Lis & Pavlos" />
        </div>
      </div>

      <div class="left">
        <div class="project-card">
          <img
            src="../../assets/img/bodalp-desktop5.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - RSVP form"
          />
        </div>

        <p>
          Guests can easily confirm their attendance through a personalized RSVP
          page that allows them to submit dietary preferences and song requests,
          with automated email confirmations for convenience.
        </p>
      </div>

      <div class="right">
        <p>
          A private administration page for the couple includes tools to manage
          guest responses, export RSVP data to Excel format, and track total
          attendance.
        </p>

        <div class="project-card">
          <img
            src="../../assets/img/bodalp-desktop6.png"
            class="video-placeholder"
            alt="Boda Natalia & Mauricio - Control panel connection"
          />
        </div>
      </div>

      <div class="check">
        <a href="https://pavlosandlis.com/" class="button" target="_blank"
          >Check it out</a
        >
      </div>

      <!-- Bloc de navigation -->
      <div class="project-navigation">
        <router-link to="/achievements/web-developement/bellelachaise">
          &#8592; Previous Project
        </router-link>
        <router-link to="/achievements/web-developement/boda-carmen-nestor">
          Next Project&#8594;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BodaLisPavlosProject",

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
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
  border: 2px var(--blue-bg) solid;
}
.mockup3 {
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup2 {
  width: 45%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.mockup1 {
  width: 55%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}
.project-card {
  overflow: hidden;
  border-radius: 10px;
  width: 80%;
  margin: 30px auto;
}
.project-description {
  overflow: hidden;
  width: 80%;
  margin: 30px auto;
}
.left {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
}
.right {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;
}
.left > .project-card,
.right > .project-card {
  width: 70%;
}
.left p {
  width: 30%;
  color: var(--red);
}
.right p {
  width: 30%;
  color: var(--red);
  text-align: right;
}
.project-card-video {
  width: 63%;
  margin-bottom: 30px;
}
.mockup-container {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
.mockup1 {
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
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
  height: 624px;
  padding: 15px;
  margin-bottom: 50px;
  pointer-events: none;
}
.video-intro {
  display: flex;
  align-items: center;
  gap: 20px;
}
.video-intro p {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37%;
  font-family: "Chakra Petch", sans-serif;
  font-size: var(--fs-24);
  color: var(--red);
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
.grid-row {
  display: grid;
  gap: 20px;
  height: 100%;
}

.row1 {
  grid-template-columns: 1fr 1fr;
}
.row2 {
  grid-template-columns: 1fr 1fr;
  margin-top: 30px;
}
.grid-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 10px;
  border: 2px var(--blue-bg) solid;
}
.text {
  color: var(--red);
  margin: 0px 0 50px 0;
}

/* Responsive */
@media screen and (max-width: 970px) {
  .project-card-dev {
    height: 484px;
  }
  .row1,
  .row2 {
    grid-template-columns: 1fr;
  }
  .row2 {
    margin: 20px 0;
  }
  .left,
  .right {
    margin-bottom: 20px;
  }
  .project-card {
    margin: 0;
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
  .video-placeholder {
    height: 723px;
  }
  .project-card-video {
    height: 754px;
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
    margin-bottom: 20px;
    width: 100%;
    order: 2;
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
    height: 100%;
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
  .mockup1 {
    width: 85%;
  }
  .mockup2 {
    width: 80%;
  }
  .mockup3 {
    width: 100%;
  }
  .video-intro {
    flex-direction: column;
    width: 100%;
  }
  .left,
  .right {
    flex-direction: column;
  }
  .left > .project-card,
  .right > .project-card,
  .left p,
  .right p,
  .video-intro p {
    width: unset;
  }
  .left > .project-card {
    order: 2;
  }
  .right p {
    text-align: left;
  }
}
</style>
