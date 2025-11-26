<template>
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
</template>

<script>
export default {
  name: 'Ribbon',

  data() {
    return {
      items: [
        'Design with purpose',
        'Web development',
        'Creative websites',
        'Available for freelance work',
        'Contact me',
        'Fast delivery',
        'Attention to detail',
        'Creativity meets functionality',
        'Seamless Navigation',
        "Let's Work Together!",
        'Collaboration Opportunities',
      ],
    };
  },

  mounted() {
    this.$nextTick(() => {
      // Gestion du ruban
      const content = this.$refs.content;
      const ribbonContent = this.$refs.ribbonContent;

      // Ajuster dynamiquement la largeur du contenu pour le ruban
      const contentWidth = content.offsetWidth;
      ribbonContent.style.width = `${contentWidth * 2}px`;
    });
  },

  computed: {
    // Ruban
    formattedItems() {
      // Add the separator ✺ after every item, including the last one
      return this.items.flatMap((item) => [item, '✺']);
    },
  },
};
</script>

<style scoped>
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
  animation: scroll-left 23s linear infinite;
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
  font-family: 'Red Hat Text', sans-serif !important;
  text-transform: uppercase;
}
.ribbon-text span {
  margin-right: 20px; /* Espacement entre les éléments */
  font-size: 14px;
  color: var(--main-white);
}
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Déplace de moitié pour boucler */
  }
}
</style>
