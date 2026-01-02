<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameStore } from '@/stores'

const gameStore = useGameStore()
const opacity = ref(0)

watch(
  () => gameStore.transitioning,
  (transitioning) => {
    if (transitioning) {
      opacity.value = 1
    } else {
      opacity.value = 0
    }
  }
)
</script>

<template>
  <div
    class="transition-overlay"
    :class="{ active: gameStore.transitioning }"
    :style="{ opacity }"
  />
</template>

<style scoped>
.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  pointer-events: none;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.transition-overlay.active {
  pointer-events: all;
}
</style>
