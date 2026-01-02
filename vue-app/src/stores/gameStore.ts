// Core game state store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState, Environment, Warp } from '@/types'
import { DEFAULT_CONFIG } from '@/config'
import { environments } from '@/data/environments'

export const useGameStore = defineStore('game', () => {
  // State
  const running = ref(false)
  const paused = ref(false)
  const started = ref(false)
  const transitioning = ref(false)
  const time = ref(0)
  const currentEnvironmentId = ref<string | null>(null)

  // Pending warp (set during transition)
  const pendingWarp = ref<{ envId: string; targetX: number; targetY: number } | null>(null)

  // Camera
  const camX = ref(0)
  const camY = ref(0)

  // World dimensions
  const worldWidth = ref(DEFAULT_CONFIG.startX * 2)
  const worldHeight = ref(DEFAULT_CONFIG.startY * 2)

  // Computed
  const currentEnvironment = computed((): Environment | null => {
    if (!currentEnvironmentId.value) return null
    return environments[currentEnvironmentId.value] || null
  })

  const gameState = computed((): GameState => ({
    running: running.value,
    paused: paused.value,
    time: time.value,
    started: started.value,
    transitioning: transitioning.value,
    currentEnvironment: currentEnvironmentId.value,
  }))

  // Actions
  function startGame(): void {
    started.value = true
    running.value = true
    loadEnvironment(DEFAULT_CONFIG.startEnvironment)
  }

  function loadEnvironment(envId: string): void {
    const env = environments[envId]
    if (!env) {
      console.error(`Environment not found: ${envId}`)
      return
    }

    currentEnvironmentId.value = envId
    worldWidth.value = env.width
    worldHeight.value = env.height
  }

  function initiateWarp(warp: Warp): void {
    if (transitioning.value) return

    // Store warp destination
    pendingWarp.value = {
      envId: warp.target,
      targetX: warp.targetX,
      targetY: warp.targetY,
    }

    // Start transition
    transitioning.value = true
  }

  function completeWarp(): { targetX: number; targetY: number } | null {
    if (!pendingWarp.value) return null

    const { envId, targetX, targetY } = pendingWarp.value

    // Load new environment
    loadEnvironment(envId)

    // Clear pending warp
    pendingWarp.value = null

    return { targetX, targetY }
  }

  function endTransition(): void {
    transitioning.value = false
  }

  function setTransitioning(value: boolean): void {
    transitioning.value = value
  }

  function togglePause(): void {
    paused.value = !paused.value
  }

  function update(): void {
    if (!running.value || paused.value || transitioning.value) return
    time.value++
  }

  function updateCamera(playerX: number, playerY: number, viewWidth: number, viewHeight: number): void {
    camX.value = Math.max(0, Math.min(worldWidth.value - viewWidth, playerX - viewWidth / 2))
    camY.value = Math.max(0, Math.min(worldHeight.value - viewHeight, playerY - viewHeight / 2))
  }

  return {
    // State
    running,
    paused,
    started,
    transitioning,
    time,
    currentEnvironmentId,
    camX,
    camY,
    worldWidth,
    worldHeight,

    // Computed
    currentEnvironment,
    gameState,

    // Actions
    startGame,
    loadEnvironment,
    initiateWarp,
    completeWarp,
    endTransition,
    setTransitioning,
    togglePause,
    update,
    updateCamera,
  }
})
