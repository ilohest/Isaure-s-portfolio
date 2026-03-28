<template>
  <div class="floating-actions" aria-label="Quick actions">
    <img :src="src" alt="dark / light background button" class="dark-light-button" @click="$emit('toggle')" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<style scoped>
.floating-actions {
  position: relative;
  z-index: 20;
}

.dark-light-button {
  height: 25px;
  position: fixed;
  bottom: 57px;
  left: 57px;
  border: none;
  cursor: pointer;
}

@media (max-width: 628px) {
  .dark-light-button {
    left: 20px;
    bottom: 50%;
  }
}
</style>
