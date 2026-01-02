// Hub environment - central area

import type { Environment } from '@/types'

export const hub: Environment = {
  id: 'hub',
  name: 'THE HUB',
  width: 600,
  height: 500,
  floor: { type: 'checker', color1: '#252020', color2: '#201a1a', tileSize: 16 },
  walls: [
    // Top wall with gap for diner
    { x: 0, y: 0, w: 270, h: 30, color: '#1a1418' },
    { x: 330, y: 0, w: 270, h: 30, color: '#1a1418' },
    // Bottom wall with gaps
    { x: 0, y: 470, w: 80, h: 30, color: '#1a1418' },
    { x: 160, y: 470, w: 100, h: 30, color: '#1a1418' },
    { x: 340, y: 470, w: 100, h: 30, color: '#1a1418' },
    { x: 520, y: 470, w: 80, h: 30, color: '#1a1418' },
    // Side walls with gaps
    { x: 0, y: 0, w: 20, h: 200, color: '#1a1418' },
    { x: 0, y: 300, w: 20, h: 200, color: '#1a1418' },
    { x: 580, y: 0, w: 20, h: 200, color: '#1a1418' },
    { x: 580, y: 300, w: 20, h: 200, color: '#1a1418' },
  ],
  colliders: [
    // Top wall with gap
    { x: 0, y: 0, w: 270, h: 30 },
    { x: 330, y: 0, w: 270, h: 30 },
    // Bottom wall with gaps
    { x: 0, y: 470, w: 80, h: 30 },
    { x: 160, y: 470, w: 100, h: 30 },
    { x: 340, y: 470, w: 100, h: 30 },
    { x: 520, y: 470, w: 80, h: 30 },
    // Side walls with gaps
    { x: 0, y: 0, w: 20, h: 200 },
    { x: 0, y: 300, w: 20, h: 200 },
    { x: 580, y: 0, w: 20, h: 200 },
    { x: 580, y: 300, w: 20, h: 200 },
    // Fountain
    { x: 270, y: 200, w: 60, h: 40 },
  ],
  zones: [
    { id: 'center', name: 'HUB CENTER', x: 200, y: 150, w: 200, h: 200 },
    { id: 'north', name: 'NORTH CORRIDOR', x: 250, y: 30, w: 100, h: 120 },
    { id: 'south', name: 'SOUTH CORRIDOR', x: 200, y: 350, w: 200, h: 120 },
    { id: 'east', name: 'EAST WING', x: 450, y: 150, w: 130, h: 200 },
    { id: 'west', name: 'WEST WING', x: 20, y: 150, w: 130, h: 200 },
  ],
  furniture: [
    { type: 'fountain', x: 270, y: 200 },
    { type: 'lamp_floor', x: 100, y: 100 },
    { type: 'lamp_floor', x: 480, y: 100 },
    { type: 'lamp_floor', x: 100, y: 380 },
    { type: 'lamp_floor', x: 480, y: 380 },
    { type: 'sign', x: 290, y: 60, text: 'HUB' },
    { type: 'bench', x: 150, y: 240 },
    { type: 'bench', x: 410, y: 240 },
    { type: 'plant_large', x: 40, y: 60 },
    { type: 'plant_large', x: 530, y: 60 },
    { type: 'sign', x: 100, y: 440, text: 'CAVE' },
    { type: 'sign', x: 280, y: 440, text: 'SHOW' },
    { type: 'sign', x: 460, y: 440, text: 'SHOP' },
  ],
  interactables: [
    { id: 'fountain', name: 'Fountain', x: 270, y: 200, w: 40, h: 40 },
  ],
  warps: [
    { id: 'to_diner', x: 270, y: 30, w: 60, h: 25, target: 'diner', targetX: 250, targetY: 300, label: 'DINER' },
    { id: 'to_forest', x: 0, y: 200, w: 25, h: 100, target: 'forest', targetX: 550, targetY: 200, label: 'FOREST' },
    { id: 'to_alley', x: 575, y: 200, w: 25, h: 100, target: 'alley', targetX: 80, targetY: 200, label: 'ALLEY' },
    { id: 'to_cave', x: 80, y: 460, w: 80, h: 40, target: 'cave', targetX: 200, targetY: 100, label: 'CAVE', color: '#88ccff' },
    { id: 'to_showcase', x: 260, y: 460, w: 80, h: 40, target: 'showcase', targetX: 400, targetY: 80, label: 'SHOWCASE', color: '#f9f002' },
    { id: 'to_shop', x: 440, y: 460, w: 80, h: 40, target: 'shop', targetX: 150, targetY: 250, label: 'SHOP', color: '#ffd700' },
  ],
  npcSpawns: [
    { templateId: 'robot', x: 450, y: 300 },
  ],
  customRender(ctx, time) {
    ctx.fillStyle = '#ff2a6d'
    ctx.font = '12px "Press Start 2P"'
    ctx.textAlign = 'center'
    const glow = Math.sin(time / 20) * 0.3 + 0.7
    ctx.shadowColor = '#ff2a6d'
    ctx.shadowBlur = 15 * glow
    ctx.fillText('LIMINAL HUB', 300, 20)
    ctx.shadowBlur = 0
    ctx.textAlign = 'left'
  },
}
