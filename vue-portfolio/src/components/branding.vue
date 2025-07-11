<template>
  <section class="gallery-section">
    <h1 class="gallery-title anton-regular">Branding</h1>
    <br />
    <div class="gallery">
      <div
        v-for="project in brandingprojects"
        :key="project.id"
        class="gallery-item project-card"
      >
        <router-link
          v-if="project.projectLink"
          :to="project.projectLink"
          class="item-link"
        >
          <img :src="project.placeholder" :alt="`Image de ${project.title}`" />
          <div class="project-info">
            <span>{{ project.title }}</span>
            <span>{{ project.year }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import brandingprojects from "@/branding-projects.js";

export default {
  name: "WebDevelopement",
  data() {
    return {
      brandingprojects,
    };
  },
};
</script>

<style scoped>
.gallery-section {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: auto;
}

.gallery-title {
  text-transform: uppercase;
  color: var(--red);
  text-align: center;
  margin-bottom: 1.5rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  aspect-ratio: 3/3;
  object-fit: cover;
  transition: transform 0.3s ease;
  flex-grow: 1;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  height: 100%;
}

.gallery-item:hover .overlay {
  transform: translateY(0);
}
.project-card {
  cursor: pointer;
  transition: background-color 0.5s ease;
}
.project-card::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 36%;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background-color 0.5s ease, opacity 0.5s ease;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
}
.project-card:hover::before {
  opacity: 1;
}
.project-card:hover .project-info {
  visibility: visible;
  opacity: 1;
}
.project-info {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
  z-index: 2;
  color: var(--red-bg);
}
.project-info span {
  text-transform: uppercase;
  text-align: center;
  font-size: var(--fs-16);
}

/* Responsive */
@media screen and (max-width: 970px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .project-info {
    visibility: visible;
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 10px;
    color: var(--red-bg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 68vw;
  }
}

@media screen and (max-width: 628px) {
  .gallery {
    grid-template-columns: 1fr;
    margin-bottom: 80px;
  }
  .project-card::before {
    display: none;
  }
}
</style>
