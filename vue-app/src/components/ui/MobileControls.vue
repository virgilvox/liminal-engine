<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useUIStore, useDialogueStore } from '@/stores'
import { useInput } from '@/composables/useInput'
import { audioEngine } from '@/systems/audio'

const uiStore = useUIStore()
const dialogueStore = useDialogueStore()
const { handleJoystickStart, handleJoystickMove, handleJoystickEnd, triggerInteract } = useInput()

const joystickBase = ref<HTMLElement | null>(null)
const knobOffset = ref({ x: 0, y: 0 })

function onTouchStart(e: TouchEvent) {
  if (!joystickBase.value) return
  handleJoystickStart(e, joystickBase.value)
}

function onTouchMove(e: TouchEvent) {
  const result = handleJoystickMove(e)
  if (result) {
    knobOffset.value = {
      x: Math.cos(result.angle) * result.distance,
      y: Math.sin(result.angle) * result.distance,
    }
  }
}

function onTouchEnd() {
  handleJoystickEnd()
  knobOffset.value = { x: 0, y: 0 }
}

function onActionPress() {
  audioEngine.playBlip()
  triggerInteract()
}

onMounted(() => {
  uiStore.detectMobile()
  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('touchend', onTouchEnd)
  document.addEventListener('touchcancel', onTouchEnd)
})

onUnmounted(() => {
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
  document.removeEventListener('touchcancel', onTouchEnd)
})
</script>

<template>
  <div v-if="uiStore.isMobile" class="mobile-controls">
    <!-- Joystick -->
    <div
      ref="joystickBase"
      class="joystick-base"
      @touchstart.prevent="onTouchStart"
    >
      <div
        class="joystick-knob"
        :style="{
          transform: `translate(calc(-50% + ${knobOffset.x}px), calc(-50% + ${knobOffset.y}px))`
        }"
      />
    </div>

    <!-- Action Button -->
    <button
      class="action-btn"
      @touchstart.prevent="onActionPress"
    >
      {{ dialogueStore.active ? 'NEXT' : 'ACT' }}
    </button>
  </div>
</template>

<style scoped>
.mobile-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 60;
}

.joystick-base {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: rgba(10, 10, 15, 0.6);
  border: 3px solid var(--neon-primary);
  pointer-events: auto;
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
}

.joystick-knob {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, var(--neon-primary), #800040);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.05s ease-out;
}

.action-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: var(--ui-bg-light);
  border: 3px solid var(--neon-tertiary);
  color: var(--neon-tertiary);
  font-family: var(--font-terminal);
  font-size: 0.9rem;
  pointer-events: auto;
  box-shadow: 0 0 12px rgba(249, 240, 2, 0.3);
  transition: all var(--transition-fast);
}

.action-btn:active {
  background: rgba(249, 240, 2, 0.2);
  transform: scale(0.95);
}
</style>
