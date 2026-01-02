// UI state store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NotificationConfig, Warp } from '@/types'

export const useUIStore = defineStore('ui', () => {
  // Notification state
  const notification = ref<NotificationConfig | null>(null)
  const notificationVisible = ref(false)
  let notificationTimeout: ReturnType<typeof setTimeout> | null = null

  // Interaction state
  const currentInteraction = ref<{ type: 'npc' | 'object'; data: any } | null>(null)
  const currentWarp = ref<Warp | null>(null)
  const currentZone = ref<string>('UNKNOWN')

  // Mobile
  const isMobile = ref(false)

  // Computed
  const showInteractPrompt = computed((): boolean => {
    return !!currentInteraction.value || !!currentWarp.value
  })

  const interactPromptText = computed((): string => {
    if (currentInteraction.value) {
      return `[E] ${currentInteraction.value.data.name}`
    }
    if (currentWarp.value) {
      return `[E] ${currentWarp.value.label || 'ENTER'}`
    }
    return ''
  })

  const isWarpPrompt = computed((): boolean => {
    return !!currentWarp.value && !currentInteraction.value
  })

  // Actions
  function showNotification(config: NotificationConfig): void {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }

    notification.value = config
    notificationVisible.value = true

    const duration = config.duration ?? 3000
    notificationTimeout = setTimeout(() => {
      hideNotification()
    }, duration)
  }

  function hideNotification(): void {
    notificationVisible.value = false
    notification.value = null
  }

  function notify(message: string, type?: NotificationConfig['type']): void {
    showNotification({ message, type })
  }

  function setCurrentInteraction(interaction: { type: 'npc' | 'object'; data: any } | null): void {
    currentInteraction.value = interaction
  }

  function setCurrentWarp(warp: Warp | null): void {
    currentWarp.value = warp
  }

  function setCurrentZone(zone: string): void {
    currentZone.value = zone
  }

  function detectMobile(): void {
    isMobile.value = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
  }

  return {
    // State
    notification,
    notificationVisible,
    currentInteraction,
    currentWarp,
    currentZone,
    isMobile,

    // Computed
    showInteractPrompt,
    interactPromptText,
    isWarpPrompt,

    // Actions
    showNotification,
    hideNotification,
    notify,
    setCurrentInteraction,
    setCurrentWarp,
    setCurrentZone,
    detectMobile,
  }
})
