// Shop environment - item shop with bookshelves

import type { Environment } from '@/types'

export const shop: Environment = {
  id: 'shop',
  name: 'THE SHOP',
  width: 350,
  height: 300,
  floor: { type: 'wood', color: '#2a1a10' },
  walls: [
    { x: 0, y: 0, w: 350, h: 30, color: '#1a1010' },
    { x: 0, y: 270, w: 130, h: 30, color: '#1a1010' },
    { x: 180, y: 270, w: 170, h: 30, color: '#1a1010' },
    { x: 0, y: 0, w: 20, h: 300, color: '#1a1010' },
    { x: 330, y: 0, w: 20, h: 300, color: '#1a1010' },
  ],
  colliders: [
    { x: 0, y: 0, w: 350, h: 30 },
    { x: 0, y: 270, w: 130, h: 30 },
    { x: 180, y: 270, w: 170, h: 30 },
    { x: 0, y: 0, w: 20, h: 300 },
    { x: 330, y: 0, w: 20, h: 300 },
    { x: 40, y: 50, w: 270, h: 30 },
    { x: 40, y: 120, w: 50, h: 60 },
    { x: 260, y: 120, w: 50, h: 60 },
  ],
  zones: [
    { id: 'counter', name: 'SHOP COUNTER', x: 40, y: 50, w: 270, h: 50 },
    { id: 'floor', name: 'SHOP FLOOR', x: 20, y: 100, w: 310, h: 170 },
  ],
  furniture: [
    { type: 'counter', x: 40, y: 50 },
    { type: 'bookshelf', x: 40, y: 120 },
    { type: 'bookshelf', x: 260, y: 120 },
    { type: 'chest', x: 150, y: 60 },
    { type: 'lamp_table', x: 100, y: 55 },
    { type: 'lamp_table', x: 220, y: 55 },
    { type: 'rug', x: 130, y: 180, color: '#4a1a4a' },
  ],
  interactables: [
    { id: 'chest', name: 'Treasure Chest', x: 150, y: 60, w: 20, h: 15 },
    { id: 'shelf_l', name: 'Bookshelf', x: 40, y: 120, w: 40, h: 50 },
    { id: 'shelf_r', name: 'Bookshelf', x: 260, y: 120, w: 40, h: 50 },
  ],
  warps: [
    { id: 'to_hub', x: 130, y: 270, w: 50, h: 20, target: 'hub', targetX: 480, targetY: 440, label: 'EXIT' },
  ],
  npcSpawns: [
    { templateId: 'merchant', x: 175, y: 100 },
  ],
}
