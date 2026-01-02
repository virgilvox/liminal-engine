// UI state types

export interface InventoryItem {
  id: string
  name: string
  icon: string
  count: number
  desc: string
}

export interface Quest {
  id: string
  title: string
  desc: string
  obj: string
  completed?: boolean
}

export interface NotificationConfig {
  message: string
  type?: 'default' | 'bad' | 'quest' | 'item' | 'warp'
  duration?: number
}

export interface UIVisibility {
  titleScreen: boolean
  dialogueBox: boolean
  interactPrompt: boolean
  notification: boolean
  questTracker: boolean
  statsPanel: boolean
  inventoryBar: boolean
  mobileControls: boolean
}
