<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useDialogueStore, useNPCStore } from '@/stores'
import { audioEngine } from '@/systems/audio'

const dialogueStore = useDialogueStore()
const npcStore = useNPCStore()
const selectedChoice = ref(0)

// Typewriter advancement
let typewriterInterval: ReturnType<typeof setInterval> | null = null

function startTypewriter() {
  stopTypewriter()
  typewriterInterval = setInterval(() => {
    const shouldPlaySound = dialogueStore.advanceTypewriter()
    if (shouldPlaySound && dialogueStore.currentDialogue) {
      audioEngine.playTalk(dialogueStore.currentDialogue.pitch)
    }
    if (dialogueStore.isTypewriterComplete) {
      stopTypewriter()
    }
  }, 30)
}

function stopTypewriter() {
  if (typewriterInterval) {
    clearInterval(typewriterInterval)
    typewriterInterval = null
  }
}

function handleEffects(effect?: Record<string, unknown>, leave?: boolean) {
  const npcId = dialogueStore.currentDialogue?.npcId
  if (!npcId) return

  // Handle memory updates
  if (effect?.memory && typeof effect.memory === 'object') {
    npcStore.updateMemory(npcId, effect.memory as Record<string, unknown>)
  }

  // Handle NPC leaving
  if (leave) {
    npcStore.setNPCLeaving(npcId)
  }
}

function handleAdvance() {
  if (dialogueStore.hasChoices && dialogueStore.isTypewriterComplete) {
    // Select the choice
    const choices = dialogueStore.currentLine?.choices
    const choice = choices?.[selectedChoice.value]
    if (choice) {
      dialogueStore.selectChoice(choice.id)
      selectedChoice.value = 0
      startTypewriter()
    }
  } else {
    const result = dialogueStore.advance()
    if (result.shouldEnd) {
      handleEffects(result.effect, result.leave)
      audioEngine.playBlip()
      dialogueStore.endDialogue()
    } else {
      // Handle effects from intermediate lines too
      if (result.effect) {
        handleEffects(result.effect, false)
      }
      startTypewriter()
    }
  }
}

function handleChoiceNav(delta: number) {
  if (!dialogueStore.hasChoices || !dialogueStore.isTypewriterComplete) return
  const choices = dialogueStore.currentLine?.choices
  if (!choices) return

  selectedChoice.value = Math.max(0, Math.min(choices.length - 1, selectedChoice.value + delta))
  audioEngine.playBlip()
}

function handleKeydown(e: KeyboardEvent) {
  if (!dialogueStore.active) return

  if (e.key === ' ' || e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
    e.preventDefault()
    handleAdvance()
  } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
    e.preventDefault()
    handleChoiceNav(-1)
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    e.preventDefault()
    handleChoiceNav(1)
  } else if (e.key === 'Escape') {
    e.preventDefault()
    dialogueStore.endDialogue()
    audioEngine.playBlip()
  }
}

// Watch for dialogue activation
watch(
  () => dialogueStore.active,
  (active) => {
    if (active) {
      startTypewriter()
      window.addEventListener('keydown', handleKeydown)
    } else {
      stopTypewriter()
      window.removeEventListener('keydown', handleKeydown)
    }
  }
)

onUnmounted(() => {
  stopTypewriter()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Transition name="dialogue">
    <div v-if="dialogueStore.active && dialogueStore.currentDialogue" class="dialogue-overlay">
      <div class="dialogue-box">
        <!-- Header with portrait and name -->
        <div class="dialogue-header">
          <span class="portrait">{{ dialogueStore.currentDialogue.portrait }}</span>
          <span class="npc-name">{{ dialogueStore.currentDialogue.npcName }}</span>
        </div>

        <!-- Text area -->
        <div class="dialogue-text">
          {{ dialogueStore.displayText }}<span class="cursor" v-if="!dialogueStore.isTypewriterComplete">_</span>
        </div>

        <!-- Choices -->
        <div v-if="dialogueStore.hasChoices && dialogueStore.isTypewriterComplete" class="dialogue-choices">
          <button
            v-for="(choice, index) in dialogueStore.currentLine?.choices"
            :key="choice.id"
            class="choice-button"
            :class="{ selected: index === selectedChoice }"
            @click="selectedChoice = index; handleAdvance()"
            @mouseenter="selectedChoice = index"
          >
            <span class="choice-indicator">{{ index === selectedChoice ? '>' : ' ' }}</span>
            {{ choice.text }}
          </button>
        </div>

        <!-- Continue hint -->
        <div v-else-if="dialogueStore.isTypewriterComplete" class="continue-hint animate-pulse">
          [SPACE] or [E] to continue
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dialogue-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  z-index: 200;
  pointer-events: auto;
}

.dialogue-box {
  max-width: 600px;
  margin: 0 auto;
  background: var(--ui-bg);
  border: 2px solid var(--neon-primary);
  padding: 1rem;
  box-shadow: 0 0 20px rgba(255, 42, 109, 0.3);
}

.dialogue-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 42, 109, 0.3);
}

.portrait {
  font-size: 1.5rem;
}

.npc-name {
  color: var(--neon-secondary);
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  letter-spacing: 0.1em;
}

.dialogue-text {
  color: var(--color-paper);
  font-size: clamp(0.85rem, 2vw, 1rem);
  line-height: 1.6;
  min-height: 3rem;
  margin-bottom: 0.75rem;
}

.cursor {
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.dialogue-choices {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.choice-button {
  background: transparent;
  border: 1px solid transparent;
  color: var(--color-paper);
  text-align: left;
  padding: 0.4rem 0.5rem;
  font-family: var(--font-terminal);
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.choice-button:hover,
.choice-button.selected {
  background: rgba(255, 42, 109, 0.1);
  border-color: var(--neon-primary);
  color: var(--neon-primary);
}

.choice-indicator {
  color: var(--neon-tertiary);
  margin-right: 0.25rem;
}

.continue-hint {
  color: rgba(240, 230, 211, 0.5);
  font-size: 0.75rem;
  text-align: center;
}

/* Transition animations */
.dialogue-enter-active,
.dialogue-leave-active {
  transition: all var(--transition-normal) ease-out;
}

.dialogue-enter-from,
.dialogue-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
