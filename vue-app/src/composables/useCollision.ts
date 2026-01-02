// Collision detection composable

import type { Rect, Collider } from '@/types'

export function useCollision() {
  function rectOverlap(a: Rect, b: Rect): boolean {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    )
  }

  function pointInRect(x: number, y: number, rect: Rect): boolean {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h
  }

  function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.hypot(x2 - x1, y2 - y1)
  }

  function checkMovement(
    currentX: number,
    currentY: number,
    newX: number,
    newY: number,
    colliders: Collider[],
    playerWidth: number = 10,
    playerHeight: number = 6
  ): { canMoveX: boolean; canMoveY: boolean } {
    let canMoveX = true
    let canMoveY = true

    const halfWidth = playerWidth / 2
    const halfHeight = playerHeight / 2

    for (const collider of colliders) {
      // Check X movement
      const xRect: Rect = {
        x: newX - halfWidth,
        y: currentY - halfHeight,
        w: playerWidth,
        h: playerHeight,
      }
      if (rectOverlap(xRect, collider)) {
        canMoveX = false
      }

      // Check Y movement
      const yRect: Rect = {
        x: currentX - halfWidth,
        y: newY - halfHeight,
        w: playerWidth,
        h: playerHeight,
      }
      if (rectOverlap(yRect, collider)) {
        canMoveY = false
      }
    }

    return { canMoveX, canMoveY }
  }

  function findNearestInteractable<T extends { x: number; y: number; w?: number; h?: number }>(
    playerX: number,
    playerY: number,
    items: T[],
    range: number = 30
  ): T | null {
    let nearest: T | null = null
    let nearestDist = range

    for (const item of items) {
      const cx = item.x + (item.w || 0) / 2
      const cy = item.y + (item.h || 0) / 2
      const dist = distance(playerX, playerY, cx, cy)

      if (dist < nearestDist) {
        nearest = item
        nearestDist = dist
      }
    }

    return nearest
  }

  function isInZone(
    x: number,
    y: number,
    zone: { x: number; y: number; w: number; h: number }
  ): boolean {
    return x >= zone.x && x <= zone.x + zone.w && y >= zone.y && y <= zone.y + zone.h
  }

  return {
    rectOverlap,
    pointInRect,
    distance,
    checkMovement,
    findNearestInteractable,
    isInZone,
  }
}
