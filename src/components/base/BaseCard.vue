<template>
  <div class="p-card p-component">
    <div v-if="$slots.header" class="p-card-header">
      <slot name="header" />
    </div>
    <div class="p-card-body">
      <div v-if="$slots.title" class="p-card-title">
        <slot name="title" />
      </div>
      <div v-if="$slots.subtitle" class="p-card-subtitle">
        <slot name="subtitle" />
      </div>
      <div class="p-card-content">
        <slot name="content" />
      </div>
      <div v-if="$slots.footer" class="p-card-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Remplacement natif de primevue/card. Reproduit la structure de classes
// .p-card > .p-card-body > .p-card-content pour préserver les styles existants.
</script>
