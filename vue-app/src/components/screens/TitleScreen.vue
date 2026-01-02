<script setup lang="ts">
import { DEFAULT_CONFIG } from '@/config'

const emit = defineEmits<{
  start: []
}>()

function handleStart() {
  emit('start')
}
</script>

<template>
  <div class="title-screen">
    <div class="title-art animate-neon">{{ DEFAULT_CONFIG.title }}</div>
    <div class="title-sub">{{ DEFAULT_CONFIG.subtitle }}</div>
    <div class="title-tagline">
      "Explore the spaces between. Meet strange travelers. See everything this engine can do."
    </div>
    <button class="start-btn animate-blink" @click="handleStart">ENTER</button>
    <div class="title-controls">
      <kbd>WASD</kbd> Move &nbsp;&bull;&nbsp; <kbd>E</kbd> Interact &nbsp;&bull;&nbsp;
      <kbd>1-5</kbd> Items
    </div>
    <div class="title-credits">LIMINAL_ENGINE V2 // 2024</div>
  </div>
</template>

<style scoped>
.title-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #1a0a1a 0%, #0a0a0f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: opacity 0.8s, visibility 0.8s;
  padding: 1rem;
}

.title-screen.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.title-art {
  font-family: var(--font-pixel);
  font-size: clamp(1.5rem, 6vw, 3rem);
  color: var(--neon-primary);
  text-align: center;
}

.title-sub {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--neon-secondary);
  margin-top: 0.5rem;
  opacity: 0.8;
  letter-spacing: 0.5em;
}

.title-tagline {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: var(--color-paper);
  margin-top: 2rem;
  font-style: italic;
  text-align: center;
  max-width: 450px;
  opacity: 0.7;
  line-height: 1.6;
}

.start-btn {
  margin-top: 2.5rem;
  font-family: var(--font-pixel);
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  color: var(--neon-tertiary);
  background: transparent;
  border: 3px solid var(--neon-tertiary);
  padding: 1rem 2rem;
  cursor: pointer;
}

.start-btn:hover {
  background: var(--neon-tertiary);
  color: #0a0a0f;
  animation: none;
}

.title-controls {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  line-height: 1.8;
}

.title-controls kbd {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

.title-credits {
  position: absolute;
  bottom: 1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.2);
}
</style>
