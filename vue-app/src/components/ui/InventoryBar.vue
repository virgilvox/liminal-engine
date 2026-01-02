<script setup lang="ts">
import { useInventoryStore, useDialogueStore } from '@/stores'
import { audioEngine } from '@/systems/audio'

const inventoryStore = useInventoryStore()
const dialogueStore = useDialogueStore()

function selectSlot(index: number) {
  if (dialogueStore.active) return
  inventoryStore.selectSlot(index)
  audioEngine.playBlip()
}
</script>

<template>
  <div class="inventory-bar" :class="{ 'dialogue-active': dialogueStore.active }">
    <div
      v-for="(item, index) in inventoryStore.items"
      :key="item.id"
      class="inventory-slot"
      :class="{ selected: index === inventoryStore.selectedSlot }"
      :title="`${item.name}: ${item.desc}`"
      @click="selectSlot(index)"
    >
      <span class="slot-key">{{ index + 1 }}</span>
      <span class="slot-icon">{{ item.icon }}</span>
      <span class="slot-count" :class="{ empty: item.count === 0 }">
        {{ item.count }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.inventory-bar {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
  background: var(--ui-bg);
  border: 2px solid var(--neon-primary);
  padding: 0.25rem;
  transition: opacity var(--transition-fast);
}

/* Hide on mobile/touch devices */
@media (max-width: 768px), (pointer: coarse) {
  .inventory-bar {
    display: none;
  }
}

.inventory-bar.dialogue-active {
  opacity: 0.3;
  pointer-events: none;
}

.inventory-slot {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 42, 109, 0.3);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.inventory-slot:hover {
  border-color: var(--neon-secondary);
  background: rgba(5, 217, 232, 0.1);
}

.inventory-slot.selected {
  border-color: var(--neon-tertiary);
  background: rgba(249, 240, 2, 0.1);
  box-shadow: 0 0 8px rgba(249, 240, 2, 0.3);
}

.slot-key {
  position: absolute;
  top: 1px;
  left: 3px;
  font-size: 0.6rem;
  color: rgba(240, 230, 211, 0.4);
}

.slot-icon {
  font-size: 1.1rem;
}

.slot-count {
  position: absolute;
  bottom: 1px;
  right: 3px;
  font-size: 0.6rem;
  color: var(--neon-secondary);
}

.slot-count.empty {
  color: rgba(255, 42, 109, 0.5);
}
</style>
