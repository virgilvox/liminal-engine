// Forest environment - dark forest with trees and campfire

import type { Environment } from '@/types'

export const forest: Environment = {
  id: 'forest',
  name: 'DARK FOREST',
  width: 600,
  height: 450,
  floor: { type: 'grass', color: '#1a2a1a' },
  walls: [],
  colliders: [
    { x: 0, y: 0, w: 600, h: 20 },
    { x: 0, y: 430, w: 600, h: 20 },
    { x: 0, y: 0, w: 20, h: 450 },
    { x: 580, y: 0, w: 20, h: 170 },
    { x: 580, y: 280, w: 20, h: 170 },
    { x: 100, y: 80, w: 40, h: 60 },
    { x: 250, y: 120, w: 40, h: 60 },
    { x: 400, y: 60, w: 40, h: 60 },
    { x: 180, y: 300, w: 40, h: 60 },
    { x: 350, y: 280, w: 40, h: 60 },
    { x: 480, y: 320, w: 40, h: 60 },
  ],
  zones: [
    { id: 'clearing', name: 'FOREST CLEARING', x: 200, y: 150, w: 200, h: 150 },
    { id: 'path', name: 'FOREST PATH', x: 20, y: 100, w: 560, h: 80 },
  ],
  furniture: [
    { type: 'tree', x: 100, y: 50 },
    { type: 'tree', x: 250, y: 90 },
    { type: 'tree', x: 400, y: 30 },
    { type: 'tree', x: 180, y: 270 },
    { type: 'tree', x: 350, y: 250 },
    { type: 'tree', x: 480, y: 290 },
    { type: 'bush', x: 60, y: 200 },
    { type: 'bush', x: 520, y: 150 },
    { type: 'bush', x: 300, y: 380 },
    { type: 'rock', x: 150, y: 180 },
    { type: 'rock_large', x: 420, y: 180 },
    { type: 'mushroom', x: 280, y: 200 },
    { type: 'mushroom', x: 320, y: 220, color: '#9966ff' },
    { type: 'campfire', x: 290, y: 280 },
  ],
  interactables: [
    { id: 'campfire', name: 'Campfire', x: 290, y: 280, w: 20, h: 20 },
    { id: 'mushroom', name: 'Strange Mushroom', x: 280, y: 200, w: 20, h: 20 },
  ],
  warps: [
    { id: 'to_hub', x: 560, y: 170, w: 20, h: 110, target: 'hub', targetX: 50, targetY: 250, label: 'HUB' },
  ],
  npcSpawns: [
    { templateId: 'ghost_girl', x: 300, y: 200 },
    { templateId: 'elf', x: 150, y: 350 },
  ],
}
