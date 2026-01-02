<script setup lang="ts">
import { useUIStore, useDialogueStore } from '@/stores'

const uiStore = useUIStore()
const dialogueStore = useDialogueStore()
</script>

<template>
  <Transition name="prompt">
    <div
      v-if="uiStore.showInteractPrompt && !dialogueStore.active"
      class="interaction-prompt"
      :class="{ warp: uiStore.isWarpPrompt }"
    >
      <span class="key">[E]</span>
      <span class="label">{{ uiStore.interactPromptText.replace('[E] ', '') }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.interaction-prompt {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ui-bg);
  border: 2px solid var(--neon-primary);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.8rem, 2vw, 1rem);
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.3);
}

.interaction-prompt.warp {
  border-color: var(--neon-secondary);
  box-shadow: 0 0 10px rgba(5, 217, 232, 0.3);
}

.key {
  color: var(--neon-tertiary);
  font-weight: bold;
}

.label {
  color: var(--neon-primary);
}

.interaction-prompt.warp .label {
  color: var(--neon-secondary);
}

/* Transition animations */
.prompt-enter-active,
.prompt-leave-active {
  transition: all var(--transition-fast) ease-out;
}

.prompt-enter-from,
.prompt-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
