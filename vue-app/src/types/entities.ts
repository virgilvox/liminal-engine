// Entity types for players and NPCs

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface CharacterAppearance {
  skin: string
  shirt: string
  hair: string
  translucent?: boolean
  small?: boolean
  short?: boolean
  mechanical?: boolean
  horns?: boolean
  halo?: boolean
  ears?: 'pointed' | null
  beard?: boolean
  tusks?: boolean
  crown?: boolean
  wings?: boolean
  tail?: boolean
  blob?: boolean
  rocky?: boolean
  bones?: boolean
  glowing?: boolean
  glowColor?: string
}

export interface EntityState {
  x: number
  y: number
  dir: Direction
  frame: number
  frameTimer: number
  moving: boolean
}

export interface PlayerState extends EntityState {
  speed: number
  stepTimer: number
}

export interface NPCState extends EntityState {
  id: string
  name: string
  targetX: number
  targetY: number
  state: 'idle' | 'walking' | 'talking'
  leaving: boolean
}

export interface NPCMemory {
  visited?: boolean
  [key: string]: unknown
}

export interface NPCTemplate {
  id: string
  name: string
  portrait: string
  pitch: number
  appearance: CharacterAppearance
  getDialogue: (
    memory: NPCMemory,
    quests: Record<string, unknown>,
    items: string[]
  ) => DialogueTree
}

export interface DialogueLine {
  text: string
  choices?: DialogueChoice[]
  effect?: DialogueEffect
  leave?: boolean
}

export interface DialogueChoice {
  text: string
  id: string
  type?: 'kind' | 'strange' | 'action' | 'serve' | 'bad'
  need?: string
  disabled?: boolean
}

export interface DialogueEffect {
  memory?: Record<string, unknown>
  [key: string]: unknown
}

export interface DialogueTree {
  [state: string]: DialogueLine[]
}
