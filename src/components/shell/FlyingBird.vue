<template>
  <div v-if="birdEnabled" class="bird-container" :class="directionClass">
    <div class="bird" :class="birdClass"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const directionClass = ref<'gauche-droite' | 'droite-gauche'>('gauche-droite');
const mirrored = ref(false);
const birdEnabled = ref(false);

let birdTimeoutId: ReturnType<typeof setTimeout> | null = null;
let birdIntervalId: ReturnType<typeof setInterval> | null = null;
let counter = 0;

const birdClass = computed(() => ({
  birdDG: mirrored.value,
}));

const fly = () => {
  mirrored.value = counter % 2 === 0;
  directionClass.value = mirrored.value ? 'droite-gauche' : 'gauche-droite';
  counter += 1;
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

  birdTimeoutId = window.setTimeout(() => {
    fly();
    birdIntervalId = window.setInterval(fly, 80000);
  }, 80000);
});

onBeforeUnmount(() => {
  if (birdTimeoutId) clearTimeout(birdTimeoutId);
  if (birdIntervalId) clearInterval(birdIntervalId);
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
  animation-iteration-count: infinite;
}

.gauche-droite {
  animation-name: avancementGD;
  left: -10%;
}

.droite-gauche {
  animation-name: avancementDG;
  right: 90%;
}

@keyframes wings {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -600px 0;
  }
}

@keyframes avancementGD {
  0% { transform: scale(0.8) translateX(-10vh); }
  5% { transform: translateY(2vh) translateX(10vw) scale(0.8); }
  10% { transform: translateY(0) translateX(30vw) scale(0.9); }
  15% { transform: translateY(1vh) translateX(50vw) scale(1); }
  20% { transform: translateY(2vh) translateX(70vw) scale(1); }
  25% { transform: translateY(0) translateX(90vw) scale(1); }
  30%, 50%, 100% { transform: translateY(0) translateX(110vw) scale(1); }
}

@keyframes avancementDG {
  0% { transform: scale(0.8) translateX(130vw); }
  5% { transform: translateY(2vh) translateX(90vw) scale(0.8); }
  10% { transform: translateY(0) translateX(70vw) scale(0.9); }
  15% { transform: translateY(1vh) translateX(50vw) scale(1); }
  20% { transform: translateY(2vh) translateX(30vw) scale(1); }
  25% { transform: translateY(0) translateX(10vw) scale(1); }
  30%, 50%, 100% { transform: translateY(0) translateX(-10vw) scale(1); }
}

@media (max-width: 628px) {
  .bird-container {
    animation-duration: 15s !important;
  }
}
</style>
