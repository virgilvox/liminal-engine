// Alley environment - dark narrow alley

import type { Environment } from '@/types'

export const alley: Environment = {
  id: 'alley',
  name: 'DARK ALLEY',
  width: 300,
  height: 400,
  floor: { type: 'stone', color: '#1a1a1a' },
  walls: [
    { x: 0, y: 0, w: 40, h: 400, color: '#1a1515' },
    { x: 260, y: 0, w: 40, h: 400, color: '#1a1515' },
  ],
  colliders: [
    { x: 0, y: 0, w: 40, h: 400 },
    { x: 260, y: 0, w: 40, h: 400 },
    { x: 0, y: 0, w: 300, h: 20 },
    { x: 0, y: 380, w: 300, h: 20 },
    { x: 80, y: 100, w: 50, h: 30 },
    { x: 170, y: 250, w: 50, h: 30 },
  ],
  zones: [
    { id: 'alley', name: 'DARK ALLEY', x: 40, y: 20, w: 220, h: 360 },
  ],
  furniture: [
    { type: 'crate', x: 80, y: 100 },
    { type: 'crate', x: 98, y: 95 },
    { type: 'crate', x: 110, y: 102 },
    { type: 'barrel', x: 170, y: 250 },
    { type: 'barrel', x: 188, y: 255 },
    { type: 'barrel', x: 205, y: 248 },
    { type: 'lamp_floor', x: 60, y: 50, color: '#ffaa00' },
    { type: 'lamp_floor', x: 220, y: 320, color: '#ffaa00' },
  ],
  interactables: [
    { id: 'crates', name: 'Crates', x: 80, y: 100, w: 50, h: 30 },
    { id: 'barrels', name: 'Barrels', x: 170, y: 250, w: 50, h: 30 },
  ],
  warps: [
    { id: 'to_hub', x: 40, y: 170, w: 20, h: 60, target: 'hub', targetX: 530, targetY: 250, label: 'HUB' },
  ],
  npcSpawns: [],
  customRender(ctx, _time) {
    ctx.fillStyle = '#330033'
    ctx.font = '10px VT323'
    ctx.fillText('THEY WATCH', 100, 200)
    ctx.fillStyle = 'rgba(30, 50, 80, 0.3)'
    ctx.beginPath()
    ctx.ellipse(150, 180, 25, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(200, 340, 20, 6, 0.3, 0, Math.PI * 2)
    ctx.fill()
  },
}
