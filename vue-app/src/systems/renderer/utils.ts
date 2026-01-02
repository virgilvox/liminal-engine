// Rendering utility functions

export function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, ((num >> 16) & 0xff) - amount)
  const g = Math.max(0, ((num >> 8) & 0xff) - amount)
  const b = Math.max(0, (num & 0xff) - amount)
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
}

export function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, ((num >> 16) & 0xff) + amount)
  const g = Math.min(255, ((num >> 8) & 0xff) + amount)
  const b = Math.min(255, (num & 0xff) + amount)
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
}

export function pixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
): void {
  ctx.fillStyle = color
  ctx.fillRect(x, y, 2, 2)
}

export function drawShadow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scaleX: number = 1,
  scaleY: number = 1
): void {
  ctx.fillStyle = 'rgba(0,0,0,0.3)'
  ctx.beginPath()
  ctx.ellipse(x, y + 2, 6 * scaleX, 3 * scaleY, 0, 0, Math.PI * 2)
  ctx.fill()
}
