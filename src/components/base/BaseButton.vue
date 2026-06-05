<template>
  <button class="p-button p-component" :class="{ 'p-button-icon-only': !label }" type="button">
    <span
      v-if="icon && iconPos === 'left'"
      :class="['p-button-icon', 'p-button-icon-left', icon]"
      aria-hidden="true"
    ></span>
    <span v-if="label" class="p-button-label">{{ label }}</span>
    <span
      v-if="icon && iconPos === 'right'"
      :class="['p-button-icon', 'p-button-icon-right', icon]"
      aria-hidden="true"
    ></span>
  </button>
</template>

<script setup lang="ts">
// Remplacement natif de primevue/button. Émet les mêmes classes (.p-button…)
// pour préserver les overrides CSS scoped des composants existants.
withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
    iconPos?: 'left' | 'right';
  }>(),
  { iconPos: 'left' },
);
</script>
