<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useGameStore, useDialogueStore } from '@/stores'
import { audioEngine } from '@/systems/audio'

const gameStore = useGameStore()
const dialogueStore = useDialogueStore()

function handleResume() {
  audioEngine.playBlip()
  gameStore.togglePause()
}

function handleQuit() {
  audioEngine.playBlip()
  // For now, just reload the page to return to title screen
  window.location.reload()
}

function handleKeydown(e: KeyboardEvent) {
  // Only handle escape when game is running
  if (!gameStore.started) return

  // Don't pause during dialogue
  if (dialogueStore.active) return

  if (e.key === 'Escape') {
    e.preventDefault()
    audioEngine.playBlip()
    gameStore.togglePause()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Pause/resume music when game pauses
watch(
  () => gameStore.paused,
  (paused) => {
    if (paused) {
      audioEngine.stopMusic()
    } else {
      audioEngine.startMusic()
    }
  }
)
</script>

<template>
  <Transition name="pause">
    <div v-if="gameStore.paused" class="pause-overlay">
      <div class="pause-menu">
        <h2 class="pause-title animate-flicker">PAUSED</h2>

        <div class="menu-options">
          <button class="menu-button" @click="handleResume">
            <span class="button-icon">></span>
            RESUME
          </button>
          <button class="menu-button" @click="handleQuit">
            <span class="button-icon">></span>
            QUIT
          </button>
        </div>

        <div class="pause-hint">Press [ESC] to resume</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pause-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 15, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
}

.pause-menu {
  text-align: center;
}

.pause-title {
  font-size: clamp(2rem, 6vw, 3rem);
  color: var(--neon-primary);
  margin-bottom: 2rem;
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(255, 42, 109, 0.5);
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.menu-button {
  background: var(--ui-bg);
  border: 2px solid var(--neon-primary);
  color: var(--color-paper);
  padding: 0.75rem 2rem;
  font-family: var(--font-terminal);
  font-size: clamp(1rem, 3vw, 1.2rem);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 200px;
}

.menu-button:hover,
.menu-button:focus {
  background: rgba(255, 42, 109, 0.2);
  border-color: var(--neon-secondary);
  color: var(--neon-secondary);
  box-shadow: 0 0 15px rgba(5, 217, 232, 0.3);
  outline: none;
}

.button-icon {
  color: var(--neon-tertiary);
  font-weight: bold;
}

.pause-hint {
  color: rgba(240, 230, 211, 0.4);
  font-size: 0.8rem;
}

/* Transition animations */
.pause-enter-active,
.pause-leave-active {
  transition: all var(--transition-normal) ease-out;
}

.pause-enter-from,
.pause-leave-to {
  opacity: 0;
}

.pause-enter-from .pause-menu,
.pause-leave-to .pause-menu {
  transform: scale(0.9);
}
</style>
