// Game loop composable

import { ref, onUnmounted } from 'vue'

export function useGameLoop(onUpdate: (deltaTime: number) => void) {
  const running = ref(false)
  let lastTime = 0
  let animationId: number | null = null

  function loop(time: number): void {
    if (!running.value) return

    const deltaTime = time - lastTime
    lastTime = time

    onUpdate(deltaTime)

    animationId = requestAnimationFrame(loop)
  }

  function start(): void {
    if (running.value) return

    running.value = true
    lastTime = performance.now()
    animationId = requestAnimationFrame(loop)
  }

  function stop(): void {
    running.value = false
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  function toggle(): void {
    if (running.value) {
      stop()
    } else {
      start()
    }
  }

  onUnmounted(() => {
    stop()
  })

  return {
    running,
    start,
    stop,
    toggle,
  }
}
