// NPC state store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NPCState, NPCMemory, CharacterAppearance, NPCTemplate } from '@/types'
import { getNPCTemplate } from '@/data/npcs'

export interface ActiveNPC extends NPCState {
  templateId: string
  appearance: CharacterAppearance
}

export const useNPCStore = defineStore('npc', () => {
  // State
  const npcs = ref<ActiveNPC[]>([])
  const npcMemory = ref<Record<string, NPCMemory>>({})

  // Computed
  const activeNPCs = computed(() => npcs.value.filter(n => !n.leaving))

  // Actions
  function spawnNPCs(spawns: Array<{ templateId: string; x: number; y: number }>): void {
    npcs.value = []

    for (const spawn of spawns) {
      const template = getNPCTemplate(spawn.templateId)
      if (!template) {
        console.warn(`NPC template not found: ${spawn.templateId}`)
        continue
      }

      const npc: ActiveNPC = {
        id: `${spawn.templateId}_${spawn.x}_${spawn.y}`,
        templateId: spawn.templateId,
        name: template.name,
        x: spawn.x,
        y: spawn.y,
        targetX: spawn.x,
        targetY: spawn.y,
        dir: 'down',
        frame: 0,
        frameTimer: 0,
        moving: false,
        state: 'idle',
        leaving: false,
        appearance: template.appearance,
      }

      npcs.value.push(npc)
    }
  }

  function clearNPCs(): void {
    npcs.value = []
  }

  function getNPC(id: string): ActiveNPC | undefined {
    return npcs.value.find(n => n.id === id)
  }

  function getTemplate(templateId: string): NPCTemplate | undefined {
    return getNPCTemplate(templateId)
  }

  function getMemory(npcId: string): NPCMemory {
    if (!npcMemory.value[npcId]) {
      npcMemory.value[npcId] = {}
    }
    return npcMemory.value[npcId]
  }

  function updateMemory(npcId: string, updates: Partial<NPCMemory>): void {
    if (!npcMemory.value[npcId]) {
      npcMemory.value[npcId] = {}
    }
    Object.assign(npcMemory.value[npcId], updates)
  }

  function setNPCLeaving(npcId: string): void {
    const npc = npcs.value.find(n => n.id === npcId)
    if (npc) {
      npc.leaving = true
      npc.state = 'idle'
    }
  }

  function removeNPC(npcId: string): void {
    const index = npcs.value.findIndex(n => n.id === npcId)
    if (index !== -1) {
      npcs.value.splice(index, 1)
    }
  }

  function updateNPCAnimation(delta: number = 1): void {
    for (const npc of npcs.value) {
      if (npc.leaving) {
        // Fade out and remove
        npc.frameTimer += delta
        if (npc.frameTimer > 60) {
          removeNPC(npc.id)
        }
      } else if (npc.moving) {
        npc.frameTimer += delta
        if (npc.frameTimer > 7) {
          npc.frame = (npc.frame + 1) % 4
          npc.frameTimer = 0
        }
      }
    }
  }

  function findNearestNPC(x: number, y: number, range: number = 40): ActiveNPC | null {
    let nearest: ActiveNPC | null = null
    let nearestDist = range

    for (const npc of npcs.value) {
      if (npc.leaving) continue

      const dist = Math.hypot(npc.x - x, npc.y - y)
      if (dist < nearestDist) {
        nearest = npc
        nearestDist = dist
      }
    }

    return nearest
  }

  return {
    // State
    npcs,
    npcMemory,

    // Computed
    activeNPCs,

    // Actions
    spawnNPCs,
    clearNPCs,
    getNPC,
    getTemplate,
    getMemory,
    updateMemory,
    setNPCLeaving,
    removeNPC,
    updateNPCAnimation,
    findNearestNPC,
  }
})
