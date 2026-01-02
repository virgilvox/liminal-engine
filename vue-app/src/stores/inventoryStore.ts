// Inventory state store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { InventoryItem } from '@/types'
import { DEFAULT_INVENTORY } from '@/config'

export const useInventoryStore = defineStore('inventory', () => {
  // State
  const items = ref<InventoryItem[]>(DEFAULT_INVENTORY.map(i => ({ ...i })))
  const selectedSlot = ref(0)
  const specialItems = ref<string[]>([])

  // Computed
  const selectedItem = computed((): InventoryItem | null => {
    return items.value[selectedSlot.value] || null
  })

  const hasItem = computed(() => (itemId: string): boolean => {
    const item = items.value.find(i => i.id === itemId)
    return !!item && item.count > 0
  })

  const itemCount = computed(() => (itemId: string): number => {
    const item = items.value.find(i => i.id === itemId)
    return item?.count || 0
  })

  // Actions
  function selectSlot(slot: number): void {
    if (slot >= 0 && slot < items.value.length) {
      selectedSlot.value = slot
    }
  }

  function addItem(itemId: string, count: number = 1): boolean {
    const item = items.value.find(i => i.id === itemId)
    if (item) {
      item.count += count
      return true
    }
    return false
  }

  function removeItem(itemId: string, count: number = 1): boolean {
    const item = items.value.find(i => i.id === itemId)
    if (item && item.count >= count) {
      item.count -= count
      return true
    }
    return false
  }

  function useSelectedItem(): boolean {
    const item = selectedItem.value
    if (item && item.count > 0) {
      item.count--
      return true
    }
    return false
  }

  function addSpecialItem(itemId: string): void {
    if (!specialItems.value.includes(itemId)) {
      specialItems.value.push(itemId)
    }
  }

  function hasSpecialItem(itemId: string): boolean {
    return specialItems.value.includes(itemId)
  }

  function reset(): void {
    items.value = DEFAULT_INVENTORY.map(i => ({ ...i }))
    selectedSlot.value = 0
    specialItems.value = []
  }

  return {
    // State
    items,
    selectedSlot,
    specialItems,

    // Computed
    selectedItem,
    hasItem,
    itemCount,

    // Actions
    selectSlot,
    addItem,
    removeItem,
    useSelectedItem,
    addSpecialItem,
    hasSpecialItem,
    reset,
  }
})
