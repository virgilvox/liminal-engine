// Showcase environment - sprite showcase displaying all furniture types

import type { Environment } from '@/types'

export const showcase: Environment = {
  id: 'showcase',
  name: 'SPRITE SHOWCASE',
  width: 800,
  height: 900,
  floor: { type: 'checker', color1: '#1a1a2a', color2: '#15152a', tileSize: 20 },
  walls: [
    { x: 0, y: 0, w: 800, h: 30, color: '#0a0a15' },
    { x: 0, y: 870, w: 800, h: 30, color: '#0a0a15' },
    { x: 0, y: 0, w: 20, h: 900, color: '#0a0a15' },
    { x: 780, y: 0, w: 20, h: 900, color: '#0a0a15' },
  ],
  colliders: [
    { x: 0, y: 0, w: 800, h: 30 },
    { x: 0, y: 870, w: 800, h: 30 },
    { x: 0, y: 0, w: 20, h: 900 },
    { x: 780, y: 0, w: 20, h: 900 },
  ],
  zones: [
    { id: 'characters', name: 'CHARACTER SHOWCASE', x: 20, y: 30, w: 760, h: 200 },
    { id: 'furniture', name: 'FURNITURE SHOWCASE', x: 20, y: 250, w: 760, h: 600 },
  ],
  furniture: [
    // Row 1: Seating
    { type: 'chair', x: 50, y: 280 },
    { type: 'stool', x: 100, y: 280 },
    { type: 'throne', x: 140, y: 270 },
    { type: 'bench', x: 200, y: 285 },
    { type: 'booth', x: 280, y: 260, color: '#6a3030' },

    // Row 2: Tables
    { type: 'table_small', x: 50, y: 360 },
    { type: 'table_large', x: 120, y: 355 },
    { type: 'counter', x: 220, y: 350 },

    // Row 3: Storage
    { type: 'chest', x: 50, y: 440 },
    { type: 'crate', x: 100, y: 438 },
    { type: 'barrel', x: 150, y: 430 },
    { type: 'bookshelf', x: 200, y: 410 },
    { type: 'cabinet', x: 270, y: 415 },
    { type: 'wardrobe', x: 330, y: 405 },

    // Row 4: Decorative
    { type: 'plant', x: 50, y: 510 },
    { type: 'plant_large', x: 90, y: 500 },
    { type: 'statue', x: 150, y: 495 },
    { type: 'fountain', x: 200, y: 495 },
    { type: 'pillar', x: 280, y: 475 },
    { type: 'lamp_floor', x: 330, y: 500 },
    { type: 'lamp_table', x: 380, y: 515 },
    { type: 'clock', x: 430, y: 510 },
    { type: 'mirror', x: 490, y: 500 },
    { type: 'painting', x: 550, y: 505 },
    { type: 'rug', x: 620, y: 510 },

    // Row 5: Functional
    { type: 'door', x: 50, y: 580 },
    { type: 'window', x: 110, y: 595 },
    { type: 'fireplace', x: 180, y: 590 },
    { type: 'bed', x: 270, y: 575 },

    // Row 6: Tech
    { type: 'radio', x: 50, y: 680 },
    { type: 'jukebox', x: 100, y: 655 },
    { type: 'vending', x: 160, y: 655 },
    { type: 'computer', x: 220, y: 680 },
    { type: 'tv', x: 280, y: 675 },

    // Row 7: Nature
    { type: 'tree', x: 50, y: 720 },
    { type: 'bush', x: 120, y: 760 },
    { type: 'rock', x: 180, y: 765 },
    { type: 'rock_large', x: 240, y: 755 },
    { type: 'well', x: 320, y: 750 },
    { type: 'campfire', x: 390, y: 765 },

    // Row 8: Fantasy
    { type: 'mushroom', x: 50, y: 820 },
    { type: 'mushroom', x: 90, y: 820, color: '#9966ff' },
    { type: 'crystal', x: 130, y: 815, color: '#88ccff' },
    { type: 'crystal', x: 170, y: 815, color: '#ff88cc' },
    { type: 'altar', x: 220, y: 820 },
    { type: 'cauldron', x: 290, y: 825 },
    { type: 'torch', x: 350, y: 820 },
    { type: 'banner', x: 400, y: 810 },
    { type: 'grave', x: 460, y: 825 },
    { type: 'sign', x: 520, y: 830, text: 'HI' },
  ],
  interactables: [],
  warps: [
    { id: 'to_hub', x: 380, y: 30, w: 40, h: 20, target: 'hub', targetX: 300, targetY: 420, label: 'HUB' },
  ],
  npcSpawns: [],
  customRender(ctx, _time) {
    // Section labels
    ctx.fillStyle = '#05d9e8'
    ctx.font = '14px "Press Start 2P"'
    ctx.fillText('CHARACTERS', 50, 60)
    ctx.fillText('FURNITURE', 50, 270)
  },
}
