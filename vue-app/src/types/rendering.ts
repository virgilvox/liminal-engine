// Rendering system types

import type { CharacterAppearance, Direction } from './entities'

// Re-export used types for convenience
export type { CharacterAppearance, Direction }

export interface RenderContext {
  ctx: CanvasRenderingContext2D
  time: number
  camX: number
  camY: number
}

export interface CharacterRenderOptions extends CharacterAppearance {
  dir: Direction
  frame: number
  moving: boolean
}

export interface FurnitureRenderOptions {
  color?: string
  variant?: string
  text?: string
}

export interface CanvasSize {
  width: number
  height: number
  scale: number
}
