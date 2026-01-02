// Dialogue state store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DialogueTree, DialogueLine, NPCTemplate, NPCMemory } from '@/types'

interface ActiveDialogue {
  npcId: string
  npcName: string
  portrait: string
  pitch: number
  tree: DialogueTree
  state: string
  index: number
}

export const useDialogueStore = defineStore('dialogue', () => {
  // State
  const active = ref(false)
  const currentDialogue = ref<ActiveDialogue | null>(null)
  const typewriterIndex = ref(0)
  const typewriterText = ref('')

  // Computed
  const currentLine = computed((): DialogueLine | null => {
    if (!currentDialogue.value) return null
    const lines = currentDialogue.value.tree[currentDialogue.value.state]
    if (!lines || currentDialogue.value.index >= lines.length) return null
    return lines[currentDialogue.value.index] ?? null
  })

  const hasChoices = computed((): boolean => {
    return !!currentLine.value?.choices?.length
  })

  const isTypewriterComplete = computed((): boolean => {
    return typewriterIndex.value >= typewriterText.value.length
  })

  const displayText = computed((): string => {
    return typewriterText.value.substring(0, typewriterIndex.value)
  })

  // Actions
  function startDialogue(
    npc: { id: string; name: string },
    template: NPCTemplate,
    memory: NPCMemory,
    quests: Record<string, unknown>,
    items: string[]
  ): void {
    const tree = template.getDialogue(memory, quests, items)

    currentDialogue.value = {
      npcId: npc.id,
      npcName: npc.name,
      portrait: template.portrait,
      pitch: template.pitch,
      tree,
      state: 'start',
      index: 0,
    }

    active.value = true
    showLine()
  }

  function showLine(): void {
    const line = currentLine.value
    if (!line) {
      endDialogue()
      return
    }

    typewriterText.value = line.text
    typewriterIndex.value = 0
  }

  function advanceTypewriter(): boolean {
    // Returns true if a talk sound should be played
    if (typewriterIndex.value >= typewriterText.value.length) {
      return false
    }

    typewriterIndex.value++
    const char = typewriterText.value[typewriterIndex.value - 1]
    return char !== ' ' && char !== '*' && typewriterIndex.value % 2 === 0
  }

  function skipTypewriter(): void {
    typewriterIndex.value = typewriterText.value.length
  }

  function advance(): { shouldEnd: boolean; effect?: Record<string, unknown>; leave?: boolean } {
    if (!isTypewriterComplete.value) {
      skipTypewriter()
      return { shouldEnd: false }
    }

    if (!currentDialogue.value) {
      return { shouldEnd: true }
    }

    const line = currentLine.value
    const effect = line?.effect
    const leave = line?.leave

    // Move to next line
    currentDialogue.value.index++
    const lines = currentDialogue.value.tree[currentDialogue.value.state]

    if (!lines || currentDialogue.value.index >= lines.length) {
      return { shouldEnd: true, effect, leave }
    }

    showLine()
    return { shouldEnd: false, effect, leave }
  }

  function selectChoice(choiceId: string): { effect?: Record<string, unknown> } {
    if (!currentDialogue.value) return {}

    if (currentDialogue.value.tree[choiceId]) {
      currentDialogue.value.state = choiceId
      currentDialogue.value.index = 0
      showLine()
    } else {
      endDialogue()
    }

    return {}
  }

  function endDialogue(): void {
    active.value = false
    currentDialogue.value = null
    typewriterText.value = ''
    typewriterIndex.value = 0
  }

  return {
    // State
    active,
    currentDialogue,
    typewriterIndex,
    typewriterText,

    // Computed
    currentLine,
    hasChoices,
    isTypewriterComplete,
    displayText,

    // Actions
    startDialogue,
    showLine,
    advanceTypewriter,
    skipTypewriter,
    advance,
    selectChoice,
    endDialogue,
  }
})
