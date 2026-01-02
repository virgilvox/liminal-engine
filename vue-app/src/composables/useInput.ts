// Input handling composable (singleton pattern for shared state)

import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { Vector2 } from '@/types'

export interface InputState {
  direction: Vector2
  interact: boolean
  inventorySlots: boolean[]
}

// Shared state (singleton)
const direction = reactive<Vector2>({ x: 0, y: 0 })
const interact = ref(false)
const inventorySlots = reactive([false, false, false, false, false])
const keys = reactive<Record<string, boolean>>({})

// Joystick state
let joystickActive = false
let joystickCenter = { x: 0, y: 0 }

// Track if keyboard listeners are registered
let keyboardListenersRegistered = false

function handleKeyDown(e: KeyboardEvent): void {
  keys[e.code] = true
  updateDirection()

  // Interact
  if (['Space', 'KeyE'].includes(e.code)) {
    e.preventDefault()
    interact.value = true
  }

  // Inventory slots
  if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code)) {
    const slot = parseInt(e.code.slice(-1)) - 1
    inventorySlots[slot] = true
  }

  // Prevent arrow key scrolling
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault()
  }
}

function handleKeyUp(e: KeyboardEvent): void {
  keys[e.code] = false
  updateDirection()

  if (['Space', 'KeyE'].includes(e.code)) {
    interact.value = false
  }

  if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code)) {
    const slot = parseInt(e.code.slice(-1)) - 1
    inventorySlots[slot] = false
  }
}

function updateDirection(): void {
  // Only update from keyboard if joystick not active
  if (joystickActive) return

  let dx = 0
  let dy = 0

  if (keys['KeyW'] || keys['ArrowUp']) dy = -1
  if (keys['KeyS'] || keys['ArrowDown']) dy = 1
  if (keys['KeyA'] || keys['ArrowLeft']) dx = -1
  if (keys['KeyD'] || keys['ArrowRight']) dx = 1

  direction.x = dx
  direction.y = dy
}

function handleJoystickStart(e: TouchEvent, baseElement: HTMLElement): void {
  e.preventDefault()
  joystickActive = true
  const rect = baseElement.getBoundingClientRect()
  joystickCenter = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

function handleJoystickMove(e: TouchEvent): { dx: number; dy: number; distance: number; angle: number } | null {
  if (!joystickActive) return null

  e.preventDefault()
  const touch = e.touches[0]
  if (!touch) return null
  const dx = touch.clientX - joystickCenter.x
  const dy = touch.clientY - joystickCenter.y
  const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 32)
  const angle = Math.atan2(dy, dx)

  // Update direction based on joystick
  direction.x = dx < -12 ? -1 : dx > 12 ? 1 : 0
  direction.y = dy < -12 ? -1 : dy > 12 ? 1 : 0

  return { dx, dy, distance, angle }
}

function handleJoystickEnd(): void {
  joystickActive = false
  direction.x = 0
  direction.y = 0
}

function triggerInteract(): void {
  interact.value = true
  setTimeout(() => {
    interact.value = false
  }, 100)
}

function consumeInteract(): boolean {
  if (interact.value) {
    interact.value = false
    return true
  }
  return false
}

function consumeInventorySlot(): number | null {
  for (let i = 0; i < inventorySlots.length; i++) {
    if (inventorySlots[i]) {
      inventorySlots[i] = false
      return i
    }
  }
  return null
}

export function useInput() {
  onMounted(() => {
    if (!keyboardListenersRegistered) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      keyboardListenersRegistered = true
    }
  })

  onUnmounted(() => {
    // Don't remove listeners since other components may still use them
  })

  return {
    direction,
    interact,
    inventorySlots,
    keys,
    handleJoystickStart,
    handleJoystickMove,
    handleJoystickEnd,
    triggerInteract,
    consumeInteract,
    consumeInventorySlot,
  }
}
