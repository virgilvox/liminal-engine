// Cave environment - crystal cave with glowing crystals

import type { Environment } from '@/types'

export const cave: Environment = {
  id: 'cave',
  name: 'CRYSTAL CAVE',
  width: 500,
  height: 400,
  floor: { type: 'cave', color: '#12100f' },
  walls: [
    { x: 0, y: 0, w: 500, h: 40, color: '#0a0808' },
    { x: 0, y: 360, w: 500, h: 40, color: '#0a0808' },
    { x: 0, y: 0, w: 40, h: 400, color: '#0a0808' },
    { x: 460, y: 0, w: 40, h: 400, color: '#0a0808' },
  ],
  colliders: [
    { x: 0, y: 0, w: 500, h: 40 },
    { x: 0, y: 360, w: 500, h: 40 },
    { x: 0, y: 0, w: 40, h: 400 },
    { x: 460, y: 0, w: 40, h: 400 },
    { x: 150, y: 150, w: 30, h: 30 },
    { x: 300, y: 200, w: 30, h: 30 },
  ],
  zones: [
    { id: 'entrance', name: 'CAVE ENTRANCE', x: 150, y: 40, w: 200, h: 80 },
    { id: 'cavern', name: 'CRYSTAL CAVERN', x: 100, y: 150, w: 300, h: 180 },
  ],
  furniture: [
    { type: 'rock_large', x: 80, y: 100 },
    { type: 'rock_large', x: 350, y: 280 },
    { type: 'rock', x: 200, y: 300 },
    { type: 'rock', x: 380, y: 120 },
    { type: 'crystal', x: 150, y: 150, color: '#88ccff' },
    { type: 'crystal', x: 300, y: 200, color: '#ff88cc' },
    { type: 'crystal', x: 250, y: 250, color: '#88ffcc' },
    { type: 'crystal', x: 120, y: 280, color: '#ccff88' },
    { type: 'torch', x: 60, y: 80 },
    { type: 'torch', x: 420, y: 80 },
    { type: 'torch', x: 60, y: 300 },
    { type: 'torch', x: 420, y: 300 },
  ],
  interactables: [
    { id: 'crystal1', name: 'Blue Crystal', x: 150, y: 150, w: 20, h: 20 },
    { id: 'crystal2', name: 'Pink Crystal', x: 300, y: 200, w: 20, h: 20 },
  ],
  warps: [
    { id: 'to_hub', x: 180, y: 40, w: 40, h: 20, target: 'hub', targetX: 120, targetY: 440, label: 'EXIT' },
  ],
  npcSpawns: [
    { templateId: 'skeleton', x: 350, y: 200 },
    { templateId: 'demon', x: 120, y: 180 },
  ],
}
