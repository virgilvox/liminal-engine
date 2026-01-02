// Diner environment - retro diner with booths

import type { Environment } from '@/types'

export const diner: Environment = {
  id: 'diner',
  name: 'THE DINER',
  width: 500,
  height: 350,
  floor: { type: 'checker', color1: '#252020', color2: '#201a1a', tileSize: 12 },
  walls: [
    { x: 0, y: 0, w: 500, h: 35, color: '#1a1418' },
    { x: 0, y: 0, w: 10, h: 350, color: '#1a1418' },
    { x: 490, y: 0, w: 10, h: 350, color: '#1a1418' },
    { x: 0, y: 340, w: 220, h: 10, color: '#1a1418' },
    { x: 280, y: 340, w: 220, h: 10, color: '#1a1418' },
  ],
  colliders: [
    { x: 0, y: 0, w: 235, h: 35 },
    { x: 265, y: 0, w: 235, h: 35 },
    { x: 0, y: 0, w: 10, h: 350 },
    { x: 490, y: 0, w: 10, h: 350 },
    { x: 0, y: 340, w: 220, h: 10 },
    { x: 280, y: 340, w: 220, h: 10 },
    { x: 160, y: 80, w: 180, h: 25 },
    { x: 20, y: 140, w: 55, h: 35 },
    { x: 20, y: 230, w: 55, h: 35 },
    { x: 425, y: 140, w: 55, h: 35 },
    { x: 425, y: 230, w: 55, h: 35 },
  ],
  zones: [
    { id: 'entrance', name: 'ENTRANCE', x: 200, y: 20, w: 100, h: 50 },
    { id: 'counter', name: 'COUNTER', x: 160, y: 75, w: 180, h: 60 },
    { id: 'booth-1', name: 'BOOTH #1', x: 10, y: 130, w: 80, h: 60 },
    { id: 'booth-2', name: 'BOOTH #2', x: 10, y: 220, w: 80, h: 60 },
    { id: 'booth-3', name: 'BOOTH #3', x: 410, y: 130, w: 80, h: 60 },
    { id: 'booth-4', name: 'BOOTH #4', x: 410, y: 220, w: 80, h: 60 },
  ],
  furniture: [
    { type: 'counter', x: 160, y: 80 },
    { type: 'booth', x: 20, y: 140 },
    { type: 'booth', x: 20, y: 230 },
    { type: 'booth', x: 425, y: 140 },
    { type: 'booth', x: 425, y: 230 },
    { type: 'jukebox', x: 120, y: 290 },
    { type: 'radio', x: 380, y: 50 },
    { type: 'clock', x: 240, y: 45 },
  ],
  interactables: [
    { id: 'jukebox', name: 'Jukebox', x: 120, y: 290, w: 30, h: 45 },
    { id: 'radio', name: 'Radio', x: 380, y: 50, w: 30, h: 20 },
  ],
  warps: [
    { id: 'to_hub', x: 220, y: 340, w: 60, h: 10, target: 'hub', targetX: 300, targetY: 60, label: 'EXIT' },
  ],
  npcSpawns: [],
  customRender(ctx, time) {
    ctx.fillStyle = '#0a1520'
    ctx.fillRect(30, 5, 80, 22)
    ctx.fillRect(390, 5, 80, 22)
    ctx.strokeStyle = '#3a3a4a'
    ctx.lineWidth = 2
    ctx.strokeRect(30, 5, 80, 22)
    ctx.strokeRect(390, 5, 80, 22)
    const glow = Math.sin(time / 20) * 0.3 + 0.7
    ctx.shadowColor = '#ff2a6d'
    ctx.shadowBlur = 15 * glow
    ctx.fillStyle = '#ff2a6d'
    ctx.font = '10px "Press Start 2P"'
    ctx.fillText('OPEN', 135, 18)
    ctx.shadowBlur = 0
  },
}
