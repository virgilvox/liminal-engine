// Player state store

import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import type { PlayerState, Direction, CharacterAppearance, Stats } from '@/types'
import { DEFAULT_CONFIG, DEFAULT_STATS } from '@/config'

export const usePlayerStore = defineStore('player', () => {
  // Position and movement
  const x = ref(DEFAULT_CONFIG.startX)
  const y = ref(DEFAULT_CONFIG.startY)
  const speed = ref(DEFAULT_CONFIG.playerSpeed)
  const dir = ref<Direction>('down')
  const frame = ref(0)
  const frameTimer = ref(0)
  const moving = ref(false)
  const stepTimer = ref(0)

  // Appearance
  const appearance = reactive<CharacterAppearance>({
    skin: DEFAULT_CONFIG.playerSkin,
    shirt: DEFAULT_CONFIG.playerShirt,
    hair: DEFAULT_CONFIG.playerHair,
  })

  // Stats
  const stats = reactive<Stats>(JSON.parse(JSON.stringify(DEFAULT_STATS)))

  // Computed
  const state = computed((): PlayerState => ({
    x: x.value,
    y: y.value,
    speed: speed.value,
    dir: dir.value,
    frame: frame.value,
    frameTimer: frameTimer.value,
    moving: moving.value,
    stepTimer: stepTimer.value,
  }))

  const position = computed(() => ({ x: x.value, y: y.value }))

  // Actions
  function setPosition(newX: number, newY: number): void {
    x.value = newX
    y.value = newY
  }

  function move(dx: number, dy: number): void {
    x.value += dx
    y.value += dy
  }

  function clampPosition(minX: number, minY: number, maxX: number, maxY: number): void {
    x.value = Math.max(minX, Math.min(maxX, x.value))
    y.value = Math.max(minY, Math.min(maxY, y.value))
  }

  function setDirection(newDir: Direction): void {
    dir.value = newDir
  }

  function setMoving(isMoving: boolean): void {
    moving.value = isMoving
    if (!isMoving) {
      frame.value = 0
      stepTimer.value = 0
    }
  }

  function updateAnimation(): boolean {
    // Returns true if a step sound should be played
    let playStep = false

    if (moving.value) {
      frameTimer.value++
      if (frameTimer.value > 7) {
        frame.value = (frame.value + 1) % 4
        frameTimer.value = 0
      }
      stepTimer.value++
      if (stepTimer.value > 16) {
        playStep = true
        stepTimer.value = 0
      }
    }

    return playStep
  }

  function modifyStat(key: string, delta: number): void {
    if (stats[key]) {
      const stat = stats[key]
      const max = stat.max ?? Infinity
      stat.value = Math.max(0, Math.min(max, stat.value + delta))
    }
  }

  function setStat(key: string, value: number): void {
    if (stats[key]) {
      const stat = stats[key]
      const max = stat.max ?? Infinity
      stat.value = Math.max(0, Math.min(max, value))
    }
  }

  function setAppearance(newAppearance: Partial<CharacterAppearance>): void {
    Object.assign(appearance, newAppearance)
  }

  function reset(): void {
    x.value = DEFAULT_CONFIG.startX
    y.value = DEFAULT_CONFIG.startY
    dir.value = 'down'
    frame.value = 0
    moving.value = false
    Object.assign(stats, JSON.parse(JSON.stringify(DEFAULT_STATS)))
  }

  return {
    // State
    x,
    y,
    speed,
    dir,
    frame,
    frameTimer,
    moving,
    stepTimer,
    appearance,
    stats,

    // Computed
    state,
    position,

    // Actions
    setPosition,
    move,
    clampPosition,
    setDirection,
    setMoving,
    updateAnimation,
    modifyStat,
    setStat,
    setAppearance,
    reset,
  }
})
