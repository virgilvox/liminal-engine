<script setup lang="ts">
import { useUIStore } from '@/stores'

const uiStore = useUIStore()
</script>

<template>
  <div class="location-bar animate-flicker">
    {{ uiStore.currentZone }}
  </div>
</template>

<style scoped>
.location-bar {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: var(--ui-bg);
  border: 2px solid var(--neon-primary);
  padding: 0.4rem 0.8rem;
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: var(--neon-primary);
}
</style>
