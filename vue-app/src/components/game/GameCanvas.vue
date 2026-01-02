<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useGameStore, usePlayerStore, useUIStore, useNPCStore, useDialogueStore, useInventoryStore } from '@/stores'
import { useGameLoop } from '@/composables/useGameLoop'
import { useInput } from '@/composables/useInput'
import { useCollision } from '@/composables/useCollision'
import { CanvasRenderer } from '@/systems/renderer'
import { audioEngine } from '@/systems/audio'
import type { Warp } from '@/types'

const canvas = ref<HTMLCanvasElement | null>(null)
let renderer: CanvasRenderer | null = null
let warpCooldown = 0

const gameStore = useGameStore()
const playerStore = usePlayerStore()
const uiStore = useUIStore()
const npcStore = useNPCStore()
const dialogueStore = useDialogueStore()
const inventoryStore = useInventoryStore()
const { direction, consumeInteract, consumeInventorySlot } = useInput()
const { checkMovement, isInZone } = useCollision()

// Game loop
const { start, stop } = useGameLoop(() => {
  if (!gameStore.running || gameStore.paused) return

  // Handle transitioning state
  if (gameStore.transitioning) {
    render()
    return
  }

  // Update game time
  gameStore.update()

  // Update warp cooldown
  if (warpCooldown > 0) warpCooldown--

  // Handle input
  handleMovement()
  handleInteraction()
  handleInventory()

  // Check for warps
  checkWarps()

  // Update zone display
  updateZone()

  // Update NPC animations
  npcStore.updateNPCAnimation()

  // Check for nearby NPCs
  updateNearbyNPC()

  // Update animation
  const playStep = playerStore.updateAnimation()
  if (playStep) {
    audioEngine.playStep()
  }

  // Update camera
  if (renderer) {
    const size = renderer.getSize()
    gameStore.updateCamera(playerStore.x, playerStore.y, size.width, size.height)
  }

  // Render
  render()
})

function handleMovement() {
  // Don't move during dialogue
  if (dialogueStore.active) {
    playerStore.setMoving(false)
    return
  }

  let dx = direction.x
  let dy = direction.y

  if (dx === 0 && dy === 0) {
    playerStore.setMoving(false)
    return
  }

  // Normalize diagonal movement
  if (dx !== 0 && dy !== 0) {
    dx *= 0.707
    dy *= 0.707
  }

  dx *= playerStore.speed
  dy *= playerStore.speed

  const env = gameStore.currentEnvironment
  if (!env) return

  const newX = playerStore.x + dx
  const newY = playerStore.y + dy

  const { canMoveX, canMoveY } = checkMovement(
    playerStore.x,
    playerStore.y,
    newX,
    newY,
    env.colliders
  )

  if (canMoveX) {
    playerStore.move(dx, 0)
  }
  if (canMoveY) {
    playerStore.move(0, dy)
  }

  // Clamp to world bounds
  playerStore.clampPosition(10, 10, gameStore.worldWidth - 10, gameStore.worldHeight - 10)

  // Update direction
  if (Math.abs(dx) > Math.abs(dy)) {
    playerStore.setDirection(dx > 0 ? 'right' : 'left')
  } else {
    playerStore.setDirection(dy > 0 ? 'down' : 'up')
  }

  playerStore.setMoving(true)
}

function handleInteraction() {
  if (consumeInteract()) {
    // Don't interact if dialogue is active
    if (dialogueStore.active) return

    // Check for nearby NPC
    const nearestNPC = npcStore.findNearestNPC(playerStore.x, playerStore.y)
    if (nearestNPC) {
      const template = npcStore.getTemplate(nearestNPC.templateId)
      if (template) {
        const memory = npcStore.getMemory(nearestNPC.id)
        audioEngine.playBlip()
        dialogueStore.startDialogue(
          { id: nearestNPC.id, name: nearestNPC.name },
          template,
          memory,
          {}, // quests (not implemented yet)
          []  // items (not implemented yet)
        )
        return
      }
    }

    audioEngine.playBlip()
  }
}

function handleInventory() {
  // Don't switch inventory during dialogue
  if (dialogueStore.active) return

  const slot = consumeInventorySlot()
  if (slot !== null) {
    inventoryStore.selectSlot(slot)
    audioEngine.playBlip()
  }
}

function checkWarps() {
  if (warpCooldown > 0) return

  const env = gameStore.currentEnvironment
  if (!env) return

  for (const warp of env.warps) {
    if (isInZone(playerStore.x, playerStore.y, warp)) {
      triggerWarp(warp)
      return
    }
  }
}

function triggerWarp(warp: Warp) {
  warpCooldown = 60 // Prevent immediate re-warp
  audioEngine.playWarp()
  gameStore.initiateWarp(warp)

  // Wait for fade out, then complete warp
  setTimeout(() => {
    const target = gameStore.completeWarp()
    if (target) {
      playerStore.setPosition(target.targetX, target.targetY)
    }

    // Wait a bit then fade in
    setTimeout(() => {
      gameStore.endTransition()
    }, 300)
  }, 300)
}

function updateZone() {
  const env = gameStore.currentEnvironment
  if (!env) return

  for (const zone of env.zones) {
    if (isInZone(playerStore.x, playerStore.y, zone)) {
      if (uiStore.currentZone !== zone.name) {
        uiStore.setCurrentZone(zone.name)
      }
      return
    }
  }
}

function updateNearbyNPC() {
  const nearestNPC = npcStore.findNearestNPC(playerStore.x, playerStore.y)
  if (nearestNPC) {
    uiStore.setCurrentInteraction({ type: 'npc', data: nearestNPC })
  } else {
    uiStore.setCurrentInteraction(null)
  }
}

function spawnEnvironmentNPCs() {
  const env = gameStore.currentEnvironment
  if (!env || !env.npcSpawns) {
    npcStore.clearNPCs()
    return
  }

  npcStore.spawnNPCs(env.npcSpawns)
}

function render() {
  if (!renderer || !gameStore.currentEnvironment) return

  renderer.render(
    {
      environment: gameStore.currentEnvironment,
      player: {
        ...playerStore.state,
        appearance: playerStore.appearance,
      },
      npcs: npcStore.activeNPCs,
      camX: gameStore.camX,
      camY: gameStore.camY,
    },
    gameStore.time
  )
}

function handleResize() {
  if (!canvas.value || !renderer) return

  const container = canvas.value.parentElement
  if (!container) return

  const rect = container.getBoundingClientRect()
  renderer.resize(
    rect.width,
    rect.height,
    gameStore.worldWidth,
    gameStore.worldHeight
  )
}

onMounted(() => {
  if (canvas.value) {
    renderer = new CanvasRenderer(canvas.value)
    handleResize()
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  stop()
  window.removeEventListener('resize', handleResize)
})

// Watch for game start
watch(
  () => gameStore.started,
  async (started) => {
    if (started) {
      // Wait for DOM to update (display: none -> flex) before measuring
      await nextTick()
      // Additional frame delay to ensure layout is complete
      requestAnimationFrame(() => {
        handleResize()
        spawnEnvironmentNPCs()
        start()
      })
    }
  }
)

// Watch for environment changes to spawn NPCs
watch(
  () => gameStore.currentEnvironmentId,
  () => {
    if (gameStore.started) {
      spawnEnvironmentNPCs()
    }
  }
)
</script>

<template>
  <div class="game-world" :class="{ active: gameStore.started }">
    <canvas ref="canvas" class="game-canvas" />
  </div>
</template>

<style scoped>
.game-world {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background: var(--game-bg);
}

.game-world.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-canvas {
  display: block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
