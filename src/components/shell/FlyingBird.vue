<template>
  <div
    v-if="birdEnabled"
    class="bird-container"
    :class="directionClass"
    @animationend="onFlightEnd"
  >
    <div class="bird" :class="birdClass"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const directionClass = ref<'gauche-droite' | 'droite-gauche'>('gauche-droite');
const mirrored = ref(false);
const birdEnabled = ref(false);

const birdClass = computed(() => ({
  birdDG: mirrored.value,
}));

// Aller-retour : à la fin de chaque traversée on inverse le sens. Les keyframes
// sont symétriques (parking final d'un sens = départ de l'autre, tous deux hors
// écran), donc l'enchaînement gauche↔droite est continu et sans saut.
const onFlightEnd = (event: AnimationEvent) => {
  // Ignore l'animation des ailes (enfant, qui remonte par bubbling).
  if (event.target !== event.currentTarget) return;
  mirrored.value = !mirrored.value;
  directionClass.value = mirrored.value ? 'droite-gauche' : 'gauche-droite';
};

// Désactivé en reduced-motion, pointeur grossier (tactile) ou viewport mobile.
const computeBirdEnabled = () =>
  !(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(max-width: 970px)').matches
  );

onMounted(() => {
  birdEnabled.value = computeBirdEnabled();
});
</script>

<style scoped>
.bird {
  width: 100px;
  height: 100px;
  background-size: auto 100%;
  background-image: url('@/assets/media-static/common/bird-animation.svg');
  animation: wings 1s steps(6) infinite;
}

.birdDG {
  transform: scaleX(-1);
}

.bird-container {
  animation-duration: 30s;
  animation-delay: 2s;
  top: 20%;
  position: fixed;
  animation-timing-function: linear;
  /* Une traversée par animation ; on relance dans l'autre sens à animationend.
     both : l'oiseau tient sa position hors écran aussi bien pendant le délai
     (avant la traversée, via le 0%) qu'après (fin, via le 100%) — jamais sur sa
     position statique visible. */
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.gauche-droite {
  animation-name: avancementGD;
  left: -10%;
}

.droite-gauche {
  animation-name: avancementDG;
  left: -10%;
}

@keyframes wings {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -600px 0;
  }
}

/* Ordre des transforms constant (translateX, translateY, scale) pour une
   interpolation propre. Départ et arrivée totalement hors écran :
   - 120vw  → bord droit + largeur de l'oiseau (hors écran à droite, toute taille)
   - -150px → tampon px qui couvre les 100px de l'oiseau même sur petit mobile. */
@keyframes avancementGD {
  0% { transform: translateX(-150px) translateY(0) scale(0.8); }
  5% { transform: translateX(10vw) translateY(2vh) scale(0.85); }
  10% { transform: translateX(30vw) translateY(0) scale(0.9); }
  15% { transform: translateX(50vw) translateY(1vh) scale(1); }
  20% { transform: translateX(70vw) translateY(2vh) scale(1); }
  25% { transform: translateX(90vw) translateY(0) scale(1); }
  30%, 100% { transform: translateX(120vw) translateY(0) scale(1); }
}

@keyframes avancementDG {
  0% { transform: translateX(120vw) translateY(0) scale(0.8); }
  5% { transform: translateX(90vw) translateY(2vh) scale(0.85); }
  10% { transform: translateX(70vw) translateY(0) scale(0.9); }
  15% { transform: translateX(50vw) translateY(1vh) scale(1); }
  20% { transform: translateX(30vw) translateY(2vh) scale(1); }
  25% { transform: translateX(10vw) translateY(0) scale(1); }
  30%, 100% { transform: translateX(-150px) translateY(0) scale(1); }
}

@media (max-width: 628px) {
  .bird-container {
    animation-duration: 15s !important;
  }
}
</style>
