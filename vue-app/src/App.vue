<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore, useUIStore } from '@/stores'
import { audioEngine } from '@/systems/audio'
import TitleScreen from '@/components/screens/TitleScreen.vue'
import GameCanvas from '@/components/game/GameCanvas.vue'
import LocationBar from '@/components/ui/LocationBar.vue'
import StatsPanel from '@/components/ui/StatsPanel.vue'
import InteractionPrompt from '@/components/ui/InteractionPrompt.vue'
import DialogueBox from '@/components/ui/DialogueBox.vue'
import InventoryBar from '@/components/ui/InventoryBar.vue'
import PauseMenu from '@/components/ui/PauseMenu.vue'
import MobileControls from '@/components/ui/MobileControls.vue'
import CRTOverlay from '@/components/effects/CRTOverlay.vue'
import Vignette from '@/components/effects/Vignette.vue'
import TransitionOverlay from '@/components/effects/TransitionOverlay.vue'

const gameStore = useGameStore()
const uiStore = useUIStore()

function handleStart() {
  // Initialize audio
  audioEngine.init()
  audioEngine.resume()
  audioEngine.startMusic()

  // Start game
  gameStore.startGame()
}

onMounted(() => {
  uiStore.detectMobile()
})
</script>

<template>
  <div class="game-container">
    <!-- Title Screen -->
    <TitleScreen v-if="!gameStore.started" @start="handleStart" />

    <!-- Game World -->
    <GameCanvas />

    <!-- UI Overlay -->
    <div v-if="gameStore.started" class="ui-overlay">
      <LocationBar />
      <StatsPanel />
      <InventoryBar />
      <InteractionPrompt />
      <DialogueBox />
      <MobileControls />
    </div>

    <!-- Pause Menu -->
    <PauseMenu />

    <!-- Visual Effects -->
    <CRTOverlay />
    <Vignette />
    <TransitionOverlay />
  </div>
</template>

<style scoped>
.game-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ui-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
}

.ui-overlay > * {
  pointer-events: auto;
}
</style>
