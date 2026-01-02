// Floor rendering system - draws different floor patterns

import type { FloorConfig } from '@/types'

export class FloorRenderer {
  drawFloor(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    width: number,
    height: number
  ): void {
    switch (floor.type) {
      case 'checker':
        this.drawChecker(ctx, floor, width, height)
        break
      case 'grass':
        this.drawGrass(ctx, floor, width, height)
        break
      case 'stone':
        this.drawStone(ctx, floor, width, height)
        break
      case 'wood':
        this.drawWood(ctx, floor, width, height)
        break
      case 'sand':
        this.drawSand(ctx, floor, width, height)
        break
      case 'cave':
        this.drawCave(ctx, floor, width, height)
        break
      default:
        this.drawSolid(ctx, floor, width, height)
    }
  }

  private drawChecker(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    const ts = floor.tileSize || 12
    const color1 = floor.color1 || '#252020'
    const color2 = floor.color2 || '#201a1a'

    for (let y = 0; y < h; y += ts) {
      for (let x = 0; x < w; x += ts) {
        ctx.fillStyle = ((x / ts) + (y / ts)) % 2 === 0 ? color1 : color2
        ctx.fillRect(x, y, ts, ts)
      }
    }
  }

  private drawGrass(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = floor.color || '#1a3a1a'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#153015'
    for (let i = 0; i < 200; i++) {
      const gx = (i * 37) % w
      const gy = (i * 23) % h
      ctx.fillRect(gx, gy, 2, 2)
    }
  }

  private drawStone(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = floor.color || '#3a3a3a'
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = '#2a2a2a'
    ctx.lineWidth = 1

    for (let y = 0; y < h; y += 20) {
      for (let x = 0; x < w; x += 30) {
        const ox = (y / 20) % 2 === 0 ? 0 : 15
        ctx.strokeRect(x + ox, y, 30, 20)
      }
    }
  }

  private drawWood(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = floor.color || '#3a2515'
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = '#2a1a0a'
    ctx.lineWidth = 1

    for (let x = 0; x < w; x += 20) {
      ctx.strokeRect(x, 0, 20, h)
    }
  }

  private drawSand(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = floor.color || '#c2a060'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#b89850'
    for (let i = 0; i < 150; i++) {
      const sx = (i * 41) % w
      const sy = (i * 29) % h
      ctx.fillRect(sx, sy, 3, 2)
    }
  }

  private drawCave(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = floor.color || '#1a1515'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#151010'
    for (let i = 0; i < 100; i++) {
      const cx = (i * 53) % w
      const cy = (i * 31) % h
      ctx.beginPath()
      ctx.arc(cx, cy, 3 + (i % 5), 0, Math.PI * 2)
      ctx.fill()
    }
  }

  private drawSolid(
    ctx: CanvasRenderingContext2D,
    floor: FloorConfig,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = floor.color || '#1a1a1a'
    ctx.fillRect(0, 0, w, h)
  }
}

export const floorRenderer = new FloorRenderer()
