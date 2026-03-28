<template>
  <div class="bird-container" :class="directionClass">
    <div class="bird" :class="birdClass"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isDark: boolean;
}>();

const directionClass = ref<'gauche-droite' | 'droite-gauche'>('gauche-droite');
const mirrored = ref(false);

let birdTimeoutId: ReturnType<typeof setTimeout> | null = null;
let birdIntervalId: ReturnType<typeof setInterval> | null = null;
let counter = 0;

const birdClass = computed(() => ({
  'bird-light': !props.isDark,
  'bird-dark': props.isDark,
  birdDG: mirrored.value,
}));

const fly = () => {
  mirrored.value = counter % 2 === 0;
  directionClass.value = mirrored.value ? 'droite-gauche' : 'gauche-droite';
  counter += 1;
};

onMounted(() => {
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
  animation: wings 1s steps(6) infinite;
}

.bird-light {
  background-image: url('@/assets/media-static/common/bird-animation.svg');
}

.bird-dark {
  background-image: url('@/assets/media-static/common/bird-animation-dark.svg');
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
