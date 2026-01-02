// Core game types

export interface Vector2 {
  x: number
  y: number
}

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface GameConfig {
  title: string
  subtitle: string
  startEnvironment: string
  startX: number
  startY: number
  playerSpeed: number
  playerSkin: string
  playerShirt: string
  playerHair: string
  bpm: number
  musicVolume: number
  sfxVolume: number
}

export interface StatConfig {
  label: string
  value: number
  max?: number
  icon?: string
  color?: string
  bar?: boolean
  barClass?: string
}

export interface Stats {
  [key: string]: StatConfig
}

export interface GameState {
  running: boolean
  paused: boolean
  time: number
  started: boolean
  transitioning: boolean
  currentEnvironment: string | null
}
