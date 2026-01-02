// Main canvas renderer - coordinates all rendering subsystems

import type { Environment, Warp, Wall, PlayerState, NPCState, CharacterAppearance } from '@/types'
import { FloorRenderer, floorRenderer } from './FloorRenderer'
import { FurnitureRenderer, furnitureRenderer } from './FurnitureRenderer'
import { CharacterRenderer, characterRenderer } from './CharacterRenderer'

export interface RenderState {
  environment: Environment | null
  player: PlayerState & { appearance: CharacterAppearance }
  npcs: Array<NPCState & { appearance: CharacterAppearance }>
  camX: number
  camY: number
}

export class CanvasRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width: number = 0
  private height: number = 0
  private scale: number = 2

  private floorRenderer: FloorRenderer
  private furnitureRenderer: FurnitureRenderer
  private characterRenderer: CharacterRenderer

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2D context')
    this.ctx = ctx

    this.floorRenderer = floorRenderer
    this.furnitureRenderer = furnitureRenderer
    this.characterRenderer = characterRenderer
  }

  resize(containerWidth: number, containerHeight: number, worldWidth: number, worldHeight: number): void {
    const scaleX = containerWidth / worldWidth
    const scaleY = containerHeight / worldHeight
    this.scale = Math.max(1, Math.floor(Math.min(scaleX, scaleY)))

    this.width = Math.min(worldWidth, Math.floor(containerWidth / this.scale))
    this.height = Math.min(worldHeight, Math.floor(containerHeight / this.scale))

    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = `${this.width * this.scale}px`
    this.canvas.style.height = `${this.height * this.scale}px`
  }

  getSize(): { width: number; height: number; scale: number } {
    return { width: this.width, height: this.height, scale: this.scale }
  }

  render(state: RenderState, time: number): void {
    const { environment, player, npcs, camX, camY } = state
    const ctx = this.ctx

    // Clear
    ctx.fillStyle = environment?.background || '#0a0a0f'
    ctx.fillRect(0, 0, this.width, this.height)

    if (!environment) return

    // Apply camera transform
    ctx.save()
    ctx.translate(-Math.floor(camX), -Math.floor(camY))

    // Draw floor
    this.floorRenderer.drawFloor(ctx, environment.floor, environment.width, environment.height)

    // Draw walls
    this.drawWalls(ctx, environment.walls)

    // Custom environment render
    if (environment.customRender) {
      environment.customRender(ctx, time)
    }

    // Draw furniture
    for (const f of environment.furniture) {
      this.furnitureRenderer.drawFurniture(ctx, f.type, f.x, f.y, {
        color: f.color,
        variant: f.variant,
        text: f.text,
      }, time)
    }

    // Draw warp points
    for (const warp of environment.warps) {
      this.drawWarpPoint(ctx, warp, time)
    }

    // Sort and draw entities (NPCs and player) by Y position for depth
    const entities = [
      ...npcs.map(n => ({ ...n, isNPC: true as const })),
      { ...player, isPlayer: true as const },
    ].sort((a, b) => a.y - b.y)

    for (const entity of entities) {
      if ('isPlayer' in entity && entity.isPlayer) {
        this.characterRenderer.drawCharacter(
          ctx,
          Math.floor(entity.x),
          Math.floor(entity.y),
          {
            ...entity.appearance,
            dir: entity.dir,
            frame: entity.frame,
            moving: entity.moving,
          },
          true,
          time
        )
      } else if ('isNPC' in entity) {
        this.drawNPC(ctx, entity, time)
      }
    }

    ctx.restore()
  }

  private drawWalls(ctx: CanvasRenderingContext2D, walls: Wall[]): void {
    for (const wall of walls) {
      ctx.fillStyle = wall.color || '#1a1418'
      ctx.fillRect(wall.x, wall.y, wall.w, wall.h)
    }
  }

  private drawWarpPoint(ctx: CanvasRenderingContext2D, warp: Warp, time: number): void {
    const pulse = Math.sin(time / 15) * 0.3 + 0.7
    ctx.fillStyle = warp.color || '#d300c5'
    ctx.globalAlpha = pulse * 0.4
    ctx.fillRect(warp.x, warp.y, warp.w, warp.h)
    ctx.globalAlpha = 1
    ctx.fillStyle = warp.color || '#d300c5'
    ctx.font = '8px VT323'
    ctx.textAlign = 'center'
    ctx.fillText(warp.label || '→', warp.x + warp.w / 2, warp.y - 4)
    ctx.textAlign = 'left'
  }

  private drawNPC(
    ctx: CanvasRenderingContext2D,
    npc: NPCState & { appearance: CharacterAppearance },
    time: number
  ): void {
    const x = Math.floor(npc.x)
    const y = Math.floor(npc.y)

    this.characterRenderer.drawCharacter(
      ctx,
      x,
      y,
      {
        ...npc.appearance,
        dir: npc.dir,
        frame: npc.frame,
        moving: false,
      },
      false,
      time
    )

    // Draw NPC name and indicator
    const idle = Math.sin(time / 30 + npc.x) * 0.5
    // TODO: Check if NPC was visited from memory
    const visited = false
    ctx.fillStyle = visited ? '#05d9e8' : '#ff2a6d'
    ctx.font = '8px VT323'
    ctx.textAlign = 'center'
    ctx.fillText(npc.name, x, y - 24 - idle)

    if (!visited) {
      const bob = Math.sin(time / 8) * 2
      ctx.fillStyle = '#f9f002'
      ctx.font = '12px VT323'
      ctx.fillText('!', x, y - 32 - idle + bob)
    }
    ctx.textAlign = 'left'
  }
}
