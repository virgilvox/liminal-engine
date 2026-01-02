// Character rendering system - draws player and NPC sprites

import type { CharacterRenderOptions } from '@/types'
import { darken, pixel, drawShadow } from './utils'

export class CharacterRenderer {
  drawCharacter(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    opts: CharacterRenderOptions,
    isPlayer: boolean = false,
    time: number = 0
  ): void {
    const {
      skin = '#e5c0b0',
      shirt = '#446655',
      hair = '#333',
      dir = 'down',
      frame = 0,
      moving = false,
      translucent = false,
      small = false,
      short = false,
      mechanical = false,
      horns = false,
      halo = false,
      ears = null,
      beard = false,
      tusks = false,
      crown = false,
      wings = false,
      tail = false,
      blob = false,
      rocky = false,
      bones = false,
      glowing = false,
      glowColor = '#fff',
    } = opts

    const px = (ox: number, oy: number, c: string) => pixel(ctx, x + ox, y + oy, c)
    const scale = small ? 0.7 : short ? 0.85 : 1
    const yOffset = small ? 4 : short ? 2 : 0

    if (translucent) ctx.globalAlpha = 0.6
    if (glowing) {
      ctx.shadowColor = glowColor
      ctx.shadowBlur = 10
    }

    // Shadow
    drawShadow(ctx, x, y, scale, scale)

    const bob = moving
      ? Math.sin(frame * Math.PI / 2) * 0.5
      : isPlayer
        ? 0
        : Math.sin(time / 30 + x) * 0.3
    const legL = moving ? Math.sin(frame * Math.PI / 2) * 2 : 0
    const legR = moving ? -Math.sin(frame * Math.PI / 2) * 2 : 0
    const shirtDark = darken(shirt, 25)

    if (blob) {
      // Blob/slime character
      const blobBob = Math.sin(time / 10 + x) * 2
      ctx.fillStyle = skin
      ctx.beginPath()
      ctx.ellipse(x, y - 6 + blobBob, 10, 8, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#111'
      px(-2, -8 + blobBob, '#111')
      px(2, -8 + blobBob, '#111')
    } else {
      // Legs
      const legColor1 = bones ? '#f5f5dc' : '#1a1a2a'
      const legColor2 = bones ? '#e5e5ce' : '#1a1a2a'
      const legColor3 = bones ? '#f5f5dc' : '#2a2a3a'
      const legColor4 = bones ? '#e5e5ce' : '#2a2a3a'

      px(-3, -2 + legL + yOffset, legColor1)
      px(-1, -2 + legL + yOffset, legColor2)
      px(1, -2 + legR + yOffset, legColor2)
      px(3, -2 + legR + yOffset, legColor1)
      px(-3, -4 + legL + yOffset, legColor3)
      px(-1, -4 + legL + yOffset, legColor4)
      px(1, -4 + legR + yOffset, legColor4)
      px(3, -4 + legR + yOffset, legColor3)
      px(-3, -6 + yOffset, '#2a2a3a')
      px(-1, -6 + yOffset, '#2a2a3a')
      px(1, -6 + yOffset, '#2a2a3a')
      px(3, -6 + yOffset, '#2a2a3a')

      // Body
      for (let ty = -8; ty >= -14; ty -= 2) {
        px(-3, ty - bob + yOffset, ty === -8 ? shirtDark : shirt)
        px(-1, ty - bob + yOffset, shirt)
        px(1, ty - bob + yOffset, shirt)
        px(3, ty - bob + yOffset, ty === -8 ? shirtDark : shirt)
      }

      // Tail
      if (tail) {
        px(5, -6 + yOffset, skin)
        px(7, -4 + yOffset, skin)
      }

      // Arms
      if (dir === 'left') {
        px(-5, -10 - bob + yOffset, skin)
        px(-5, -8 - bob + yOffset, skin)
      } else if (dir === 'right') {
        px(5, -10 - bob + yOffset, skin)
        px(5, -8 - bob + yOffset, skin)
      } else {
        px(-5, -10 - bob + yOffset, skin)
        px(5, -10 - bob + yOffset, skin)
      }

      // Head
      const headY = -16 - bob + yOffset
      const headColor = rocky ? '#8b7355' : skin
      px(-3, headY, headColor)
      px(-1, headY, headColor)
      px(1, headY, headColor)
      px(3, headY, headColor)
      px(-3, headY - 2, headColor)
      px(-1, headY - 2, headColor)
      px(1, headY - 2, headColor)
      px(3, headY - 2, headColor)

      // Hair
      if (!bones) {
        px(-3, headY - 4, hair)
        px(-1, headY - 4, hair)
        px(1, headY - 4, hair)
        px(3, headY - 4, hair)
        if (dir !== 'up') {
          px(-3, headY - 2, hair)
          px(3, headY - 2, hair)
        }
      }

      // Eyes
      if (dir !== 'up') {
        const eyeOff = dir === 'left' ? -1 : dir === 'right' ? 1 : 0
        const eyeColor = mechanical ? '#ff0000' : bones ? '#ff0000' : '#111'
        px(-1 + eyeOff, headY, eyeColor)
        px(1 + eyeOff, headY, eyeColor)
      }

      // Tusks
      if (tusks) {
        px(-3, headY + 2, '#fffff0')
        px(3, headY + 2, '#fffff0')
      }

      // Beard
      if (beard) {
        px(-1, headY + 2, hair)
        px(1, headY + 2, hair)
        px(0, headY + 4, hair)
      }

      // Pointed ears
      if (ears === 'pointed') {
        px(-5, headY - 2, skin)
        px(5, headY - 2, skin)
      }

      // Horns
      if (horns) {
        px(-5, headY - 6, '#880000')
        px(5, headY - 6, '#880000')
        px(-5, headY - 8, '#660000')
        px(5, headY - 8, '#660000')
      }

      // Halo
      if (halo) {
        ctx.fillStyle = '#ffd700'
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.ellipse(x, y + headY - 8, 6, 2, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = translucent ? 0.6 : 1
      }

      // Crown
      if (crown) {
        ctx.fillStyle = '#ffd700'
        px(-3, headY - 6, '#ffd700')
        px(0, headY - 8, '#ffd700')
        px(3, headY - 6, '#ffd700')
      }

      // Wings
      if (wings) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.beginPath()
        ctx.moveTo(x - 5, y - 10 - bob + yOffset)
        ctx.lineTo(x - 15, y - 16 - bob + yOffset)
        ctx.lineTo(x - 5, y - 14 - bob + yOffset)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(x + 5, y - 10 - bob + yOffset)
        ctx.lineTo(x + 15, y - 16 - bob + yOffset)
        ctx.lineTo(x + 5, y - 14 - bob + yOffset)
        ctx.fill()
      }
    }

    // Player marker
    if (isPlayer) {
      ctx.fillStyle = '#05d9e8'
      ctx.beginPath()
      ctx.moveTo(x, y - 26 - bob + yOffset)
      ctx.lineTo(x - 3, y - 30 - bob + yOffset)
      ctx.lineTo(x + 3, y - 30 - bob + yOffset)
      ctx.closePath()
      ctx.fill()
    }

    if (translucent || glowing) {
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }
  }
}

export const characterRenderer = new CharacterRenderer()
