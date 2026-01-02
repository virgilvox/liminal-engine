// Environment and world types

import type { Rect } from './game'

export type FloorType = 'checker' | 'grass' | 'stone' | 'wood' | 'sand' | 'cave' | 'solid'

export interface FloorConfig {
  type: FloorType
  color?: string
  color1?: string
  color2?: string
  tileSize?: number
}

export interface Wall extends Rect {
  color?: string
}

export interface Collider extends Rect {}

export interface Zone {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
}

export interface Warp {
  id: string
  x: number
  y: number
  w: number
  h: number
  target: string
  targetX: number
  targetY: number
  label?: string
  color?: string
}

export interface Interactable {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
}

export interface FurniturePlacement {
  type: FurnitureType
  x: number
  y: number
  color?: string
  variant?: string
  text?: string
}

export type FurnitureType =
  | 'counter'
  | 'booth'
  | 'chair'
  | 'stool'
  | 'throne'
  | 'bench'
  | 'table_small'
  | 'table_large'
  | 'bed'
  | 'chest'
  | 'crate'
  | 'barrel'
  | 'bookshelf'
  | 'cabinet'
  | 'wardrobe'
  | 'plant'
  | 'plant_large'
  | 'statue'
  | 'fountain'
  | 'pillar'
  | 'lamp_floor'
  | 'lamp_table'
  | 'clock'
  | 'mirror'
  | 'painting'
  | 'rug'
  | 'door'
  | 'window'
  | 'fireplace'
  | 'radio'
  | 'jukebox'
  | 'vending'
  | 'computer'
  | 'tv'
  | 'tree'
  | 'bush'
  | 'rock'
  | 'rock_large'
  | 'well'
  | 'campfire'
  | 'sign'
  | 'grave'
  | 'mushroom'
  | 'crystal'
  | 'altar'
  | 'cauldron'
  | 'torch'
  | 'banner'

export interface Environment {
  id: string
  name: string
  width: number
  height: number
  floor: FloorConfig
  walls: Wall[]
  colliders: Collider[]
  zones: Zone[]
  furniture: FurniturePlacement[]
  interactables: Interactable[]
  warps: Warp[]
  background?: string
  customRender?: (ctx: CanvasRenderingContext2D, time: number) => void
  onEnter?: () => void
  onExit?: () => void
  npcSpawns?: Array<{ templateId: string; x: number; y: number }>
}
