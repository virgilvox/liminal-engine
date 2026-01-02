// Furniture rendering system - draws all furniture types

import type { FurnitureType, FurnitureRenderOptions } from '@/types'
import { darken } from './utils'

export class FurnitureRenderer {
  drawFurniture(
    ctx: CanvasRenderingContext2D,
    type: FurnitureType,
    x: number,
    y: number,
    opts: FurnitureRenderOptions = {},
    time: number = 0
  ): void {
    const { color, text } = opts

    switch (type) {
      case 'counter':
        this.drawCounter(ctx, x, y)
        break
      case 'booth':
        this.drawBooth(ctx, x, y, color)
        break
      case 'chair':
        this.drawChair(ctx, x, y, color)
        break
      case 'stool':
        this.drawStool(ctx, x, y)
        break
      case 'throne':
        this.drawThrone(ctx, x, y)
        break
      case 'bench':
        this.drawBench(ctx, x, y, color)
        break
      case 'table_small':
        this.drawTableSmall(ctx, x, y, color)
        break
      case 'table_large':
        this.drawTableLarge(ctx, x, y, color)
        break
      case 'bed':
        this.drawBed(ctx, x, y)
        break
      case 'chest':
        this.drawChest(ctx, x, y)
        break
      case 'crate':
        this.drawCrate(ctx, x, y)
        break
      case 'barrel':
        this.drawBarrel(ctx, x, y)
        break
      case 'bookshelf':
        this.drawBookshelf(ctx, x, y)
        break
      case 'cabinet':
        this.drawCabinet(ctx, x, y)
        break
      case 'wardrobe':
        this.drawWardrobe(ctx, x, y)
        break
      case 'plant':
        this.drawPlant(ctx, x, y)
        break
      case 'plant_large':
        this.drawPlantLarge(ctx, x, y)
        break
      case 'statue':
        this.drawStatue(ctx, x, y)
        break
      case 'fountain':
        this.drawFountain(ctx, x, y, time)
        break
      case 'pillar':
        this.drawPillar(ctx, x, y)
        break
      case 'lamp_floor':
        this.drawLampFloor(ctx, x, y, color, time)
        break
      case 'lamp_table':
        this.drawLampTable(ctx, x, y, color)
        break
      case 'clock':
        this.drawClock(ctx, x, y, time)
        break
      case 'mirror':
        this.drawMirror(ctx, x, y)
        break
      case 'painting':
        this.drawPainting(ctx, x, y)
        break
      case 'rug':
        this.drawRug(ctx, x, y, color)
        break
      case 'door':
        this.drawDoor(ctx, x, y, color)
        break
      case 'window':
        this.drawWindow(ctx, x, y)
        break
      case 'fireplace':
        this.drawFireplace(ctx, x, y, time)
        break
      case 'radio':
        this.drawRadio(ctx, x, y, time)
        break
      case 'jukebox':
        this.drawJukebox(ctx, x, y, time)
        break
      case 'vending':
        this.drawVending(ctx, x, y)
        break
      case 'computer':
        this.drawComputer(ctx, x, y)
        break
      case 'tv':
        this.drawTV(ctx, x, y, time)
        break
      case 'tree':
        this.drawTree(ctx, x, y)
        break
      case 'bush':
        this.drawBush(ctx, x, y)
        break
      case 'rock':
        this.drawRock(ctx, x, y)
        break
      case 'rock_large':
        this.drawRockLarge(ctx, x, y)
        break
      case 'well':
        this.drawWell(ctx, x, y)
        break
      case 'campfire':
        this.drawCampfire(ctx, x, y, time)
        break
      case 'sign':
        this.drawSign(ctx, x, y, text)
        break
      case 'grave':
        this.drawGrave(ctx, x, y)
        break
      case 'mushroom':
        this.drawMushroom(ctx, x, y, color)
        break
      case 'crystal':
        this.drawCrystal(ctx, x, y, color)
        break
      case 'altar':
        this.drawAltar(ctx, x, y)
        break
      case 'cauldron':
        this.drawCauldron(ctx, x, y, time)
        break
      case 'torch':
        this.drawTorch(ctx, x, y, time)
        break
      case 'banner':
        this.drawBanner(ctx, x, y, color)
        break
      default:
        ctx.fillStyle = color || '#666'
        ctx.fillRect(x, y, 20, 20)
    }
  }

  private drawCounter(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#3a2820'
    ctx.fillRect(x, y, 180, 25)
    ctx.fillStyle = '#5a4030'
    ctx.fillRect(x, y, 180, 5)
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = '#2a2a3a'
      ctx.fillRect(x + 15 + i * 32, y + 35, 4, 8)
      ctx.fillStyle = '#4a4a5a'
      ctx.beginPath()
      ctx.arc(x + 17 + i * 32, y + 32, 8, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  private drawBooth(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#6a3030'
    ctx.fillRect(x, y, 55, 35)
    ctx.fillStyle = darken(color || '#6a3030', 30)
    ctx.fillRect(x, y, 55, 8)
    ctx.fillStyle = '#5a4030'
    ctx.fillRect(x + 5, y + 40, 45, 20)
    ctx.fillStyle = '#3a2820'
    ctx.fillRect(x + 8, y + 55, 5, 8)
    ctx.fillRect(x + 42, y + 55, 5, 8)
    ctx.fillStyle = '#cc3333'
    ctx.fillRect(x + 15, y + 42, 5, 8)
    ctx.fillStyle = '#cccc33'
    ctx.fillRect(x + 22, y + 42, 5, 8)
  }

  private drawChair(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#5a4030'
    ctx.fillRect(x, y, 14, 16)
    ctx.fillStyle = darken(color || '#5a4030', 20)
    ctx.fillRect(x + 2, y + 12, 4, 8)
    ctx.fillRect(x + 8, y + 12, 4, 8)
  }

  private drawStool(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#4a4a5a'
    ctx.beginPath()
    ctx.arc(x + 6, y + 5, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#2a2a3a'
    ctx.fillRect(x + 4, y + 5, 4, 12)
  }

  private drawThrone(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#8b0000'
    ctx.fillRect(x, y, 20, 28)
    ctx.fillStyle = '#ffd700'
    ctx.fillRect(x + 2, y, 16, 4)
    ctx.fillRect(x + 8, y - 4, 4, 4)
    ctx.fillStyle = '#6a0000'
    ctx.fillRect(x + 2, y + 18, 16, 8)
  }

  private drawBench(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#5a4030'
    ctx.fillRect(x, y, 36, 8)
    ctx.fillStyle = darken(color || '#5a4030', 20)
    ctx.fillRect(x + 2, y + 6, 5, 10)
    ctx.fillRect(x + 29, y + 6, 5, 10)
  }

  private drawTableSmall(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#5a4030'
    ctx.fillRect(x, y, 24, 18)
    ctx.fillStyle = darken(color || '#5a4030', 20)
    ctx.fillRect(x + 3, y + 14, 5, 10)
    ctx.fillRect(x + 16, y + 14, 5, 10)
  }

  private drawTableLarge(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#5a4030'
    ctx.fillRect(x, y, 50, 24)
    ctx.fillStyle = darken(color || '#5a4030', 20)
    ctx.fillRect(x + 3, y + 20, 6, 12)
    ctx.fillRect(x + 41, y + 20, 6, 12)
  }

  private drawBed(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x, y, 30, 50)
    ctx.fillStyle = '#8888aa'
    ctx.fillRect(x + 2, y + 5, 26, 40)
    ctx.fillStyle = '#6666aa'
    ctx.fillRect(x + 2, y + 5, 26, 10)
  }

  private drawChest(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#5a3820'
    ctx.fillRect(x, y, 20, 14)
    ctx.fillStyle = '#8a8a9a'
    ctx.fillRect(x + 7, y + 5, 6, 5)
    ctx.fillStyle = '#3a2010'
    ctx.fillRect(x, y, 20, 4)
  }

  private drawCrate(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#6a5030'
    ctx.fillRect(x, y, 16, 16)
    ctx.strokeStyle = '#3a2010'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 1, y + 1, 14, 14)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 16, y + 16)
    ctx.moveTo(x + 16, y)
    ctx.lineTo(x, y + 16)
    ctx.stroke()
  }

  private drawBarrel(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#5a4020'
    ctx.beginPath()
    ctx.ellipse(x + 7, y + 18, 7, 4, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(x, y + 4, 14, 14)
    ctx.fillStyle = '#3a2010'
    ctx.fillRect(x, y + 7, 14, 2)
    ctx.fillRect(x, y + 13, 14, 2)
    ctx.beginPath()
    ctx.ellipse(x + 7, y + 4, 7, 3, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#4a3015'
    ctx.fill()
  }

  private drawBookshelf(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x, y, 36, 48)
    const colors = ['#8b0000', '#006400', '#00008b', '#8b8b00', '#4b0082', '#8b4500']
    for (let row = 0; row < 4; row++) {
      ctx.fillStyle = '#3a2010'
      ctx.fillRect(x + 2, y + 4 + row * 11, 32, 2)
      for (let b = 0; b < 6; b++) {
        ctx.fillStyle = colors[(row + b) % 6] || '#8b0000'
        ctx.fillRect(x + 3 + b * 5, y + row * 11 + 6, 4, 9)
      }
    }
  }

  private drawCabinet(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x, y, 28, 40)
    ctx.fillStyle = '#3a2010'
    ctx.fillRect(x + 3, y + 3, 22, 16)
    ctx.fillRect(x + 3, y + 22, 22, 14)
    ctx.fillStyle = '#8a8a9a'
    ctx.fillRect(x + 12, y + 9, 4, 4)
    ctx.fillRect(x + 12, y + 27, 4, 4)
  }

  private drawWardrobe(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#3a2515'
    ctx.fillRect(x, y, 32, 50)
    ctx.fillStyle = '#2a1a0a'
    ctx.fillRect(x + 2, y + 2, 13, 44)
    ctx.fillRect(x + 17, y + 2, 13, 44)
    ctx.fillStyle = '#8a8a9a'
    ctx.fillRect(x + 13, y + 20, 3, 6)
    ctx.fillRect(x + 16, y + 20, 3, 6)
  }

  private drawPlant(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#6a4030'
    ctx.fillRect(x + 3, y + 10, 10, 12)
    ctx.fillStyle = '#2a6a2a'
    ctx.beginPath()
    ctx.arc(x + 8, y + 6, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1a5a1a'
    ctx.beginPath()
    ctx.arc(x + 5, y + 4, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 11, y + 3, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawPlantLarge(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#5a3525'
    ctx.fillRect(x + 4, y + 20, 16, 16)
    ctx.fillStyle = '#2a6a2a'
    ctx.beginPath()
    ctx.arc(x + 12, y + 12, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1a5a1a'
    ctx.beginPath()
    ctx.arc(x + 6, y + 8, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 18, y + 6, 7, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawStatue(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#666666'
    ctx.fillRect(x + 2, y + 24, 12, 8)
    ctx.fillRect(x + 4, y + 10, 8, 14)
    ctx.beginPath()
    ctx.arc(x + 8, y + 6, 6, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawFountain(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#555555'
    ctx.beginPath()
    ctx.ellipse(x + 18, y + 26, 18, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#3388cc'
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.ellipse(x + 18, y + 24, 14, 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = '#666666'
    ctx.fillRect(x + 15, y + 8, 6, 16)
    ctx.fillStyle = '#3388cc'
    ctx.globalAlpha = 0.8
    const splash = Math.sin(time / 5) * 2
    ctx.beginPath()
    ctx.arc(x + 18, y + 6 + splash, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawPillar(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#777777'
    ctx.fillRect(x, y, 16, 60)
    ctx.fillStyle = '#888888'
    ctx.fillRect(x - 2, y, 20, 6)
    ctx.fillRect(x - 2, y + 54, 20, 6)
  }

  private drawLampFloor(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string, time: number = 0): void {
    const lampColor = color || '#ffaa00'
    ctx.fillStyle = '#333'
    ctx.fillRect(x + 3, y + 8, 6, 24)
    ctx.fillStyle = lampColor
    ctx.globalAlpha = 0.8 + Math.sin(time / 20) * 0.2
    ctx.beginPath()
    ctx.arc(x + 6, y + 4, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 0.15
    ctx.beginPath()
    ctx.arc(x + 6, y + 14, 30, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawLampTable(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = '#333'
    ctx.fillRect(x + 4, y + 8, 4, 6)
    ctx.fillStyle = color || '#ffcc66'
    ctx.globalAlpha = 0.9
    ctx.beginPath()
    ctx.moveTo(x + 6, y)
    ctx.lineTo(x, y + 8)
    ctx.lineTo(x + 12, y + 8)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawClock(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#222'
    ctx.beginPath()
    ctx.arc(x + 8, y + 8, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ddd'
    ctx.beginPath()
    ctx.arc(x + 8, y + 8, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#111'
    const angle = (time / 60) % (Math.PI * 2)
    ctx.fillRect(x + 7, y, 2, 10)
    ctx.save()
    ctx.translate(x + 8, y + 8)
    ctx.rotate(angle)
    ctx.fillRect(-1, -8, 2, 8)
    ctx.restore()
  }

  private drawMirror(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#5a4030'
    ctx.fillRect(x, y, 20, 30)
    ctx.fillStyle = '#aaccdd'
    ctx.fillRect(x + 2, y + 2, 16, 26)
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.fillRect(x + 4, y + 4, 4, 20)
  }

  private drawPainting(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#3a2515'
    ctx.fillRect(x, y, 28, 22)
    const paintColors = ['#8b4513', '#228b22', '#4169e1', '#dc143c']
    ctx.fillStyle = paintColors[Math.floor(x / 50) % 4] || '#8b4513'
    ctx.fillRect(x + 2, y + 2, 24, 18)
    ctx.fillStyle = '#ffd700'
    ctx.fillRect(x + 8, y + 6, 12, 10)
  }

  private drawRug(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#8b0000'
    ctx.fillRect(x, y, 50, 36)
    ctx.fillStyle = darken(color || '#8b0000', 30)
    ctx.fillRect(x + 4, y + 4, 42, 28)
    ctx.fillStyle = '#ffd700'
    ctx.fillRect(x + 8, y + 8, 34, 20)
    ctx.fillStyle = color || '#8b0000'
    ctx.fillRect(x + 12, y + 12, 26, 12)
  }

  private drawDoor(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#4a3020'
    ctx.fillRect(x, y, 28, 44)
    ctx.fillStyle = darken(color || '#4a3020', 20)
    ctx.fillRect(x + 3, y + 3, 22, 18)
    ctx.fillRect(x + 3, y + 24, 22, 16)
    ctx.fillStyle = '#8a8a9a'
    ctx.fillRect(x + 22, y + 20, 4, 6)
  }

  private drawWindow(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#3a3a4a'
    ctx.fillRect(x, y, 30, 24)
    ctx.fillStyle = '#0a1520'
    ctx.fillRect(x + 2, y + 2, 26, 20)
    ctx.strokeStyle = '#3a3a4a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x + 15, y + 2)
    ctx.lineTo(x + 15, y + 22)
    ctx.moveTo(x + 2, y + 12)
    ctx.lineTo(x + 28, y + 12)
    ctx.stroke()
  }

  private drawFireplace(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#4a4a4a'
    ctx.fillRect(x, y, 44, 36)
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(x + 8, y + 10, 28, 26)
    const fireFlicker = Math.sin(time / 3) * 0.3 + 0.7
    ctx.fillStyle = '#ff6600'
    ctx.globalAlpha = fireFlicker
    ctx.beginPath()
    ctx.moveTo(x + 22, y + 14)
    ctx.lineTo(x + 12, y + 34)
    ctx.lineTo(x + 32, y + 34)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#ffaa00'
    ctx.beginPath()
    ctx.moveTo(x + 22, y + 18)
    ctx.lineTo(x + 15, y + 32)
    ctx.lineTo(x + 29, y + 32)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawRadio(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#3a3020'
    ctx.fillRect(x, y, 24, 16)
    ctx.fillStyle = '#2a2015'
    ctx.fillRect(x + 2, y + 2, 14, 10)
    const radioGlow = Math.sin(time / 10) > 0.5 ? 1 : 0.3
    ctx.fillStyle = '#f9f002'
    ctx.globalAlpha = radioGlow
    ctx.fillRect(x + 4, y + 4, 8, 3)
    ctx.globalAlpha = 1
    ctx.fillStyle = '#111'
    ctx.fillRect(x + 12, y + 3, 5, 7)
    ctx.fillStyle = '#8a8a9a'
    ctx.fillRect(x + 18, y + 2, 4, 10)
  }

  private drawJukebox(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#4a3040'
    ctx.fillRect(x, y, 28, 44)
    ctx.fillStyle = '#2a1820'
    ctx.fillRect(x + 3, y + 4, 22, 18)
    const jukePhase = time / 5
    const colors = ['#ff2a6d', '#05d9e8', '#f9f002', '#d300c5']
    colors.forEach((c, i) => {
      ctx.fillStyle = c
      ctx.globalAlpha = (Math.sin(jukePhase + i) + 1) / 2
      ctx.fillRect(x + 4 + i * 5, y + 6, 4, 3)
    })
    ctx.globalAlpha = 1
    ctx.fillStyle = '#333'
    ctx.fillRect(x + 6, y + 26, 16, 14)
  }

  private drawVending(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#3a3a4a'
    ctx.fillRect(x, y, 24, 42)
    ctx.fillStyle = '#1a1a2a'
    ctx.fillRect(x + 2, y + 2, 20, 24)
    const itemColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00', '#0088ff']
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = itemColors[(r * 3 + c) % 9] || '#ff0000'
        ctx.fillRect(x + 4 + c * 6, y + 4 + r * 7, 5, 5)
      }
    }
    ctx.fillStyle = '#111'
    ctx.fillRect(x + 6, y + 30, 12, 6)
  }

  private drawComputer(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#333'
    ctx.fillRect(x, y + 14, 24, 10)
    ctx.fillStyle = '#222'
    ctx.fillRect(x + 2, y, 20, 14)
    ctx.fillStyle = '#003300'
    ctx.fillRect(x + 4, y + 2, 16, 10)
    ctx.fillStyle = '#00ff00'
    ctx.font = '6px monospace'
    ctx.fillText('>', x + 5, y + 9)
  }

  private drawTV(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#222'
    ctx.fillRect(x, y, 36, 28)
    ctx.fillStyle = '#111'
    ctx.fillRect(x + 3, y + 3, 30, 20)
    const tvFlicker = Math.sin(time / 2) * 0.1 + 0.2
    ctx.fillStyle = `rgba(100,150,200,${tvFlicker})`
    ctx.fillRect(x + 3, y + 3, 30, 20)
  }

  private drawTree(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x + 12, y + 30, 10, 24)
    ctx.fillStyle = '#2a5a2a'
    ctx.beginPath()
    ctx.arc(x + 17, y + 20, 18, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1a4a1a'
    ctx.beginPath()
    ctx.arc(x + 10, y + 15, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 24, y + 14, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 17, y + 8, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawBush(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#2a5a2a'
    ctx.beginPath()
    ctx.ellipse(x + 12, y + 10, 14, 10, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1a4a1a'
    ctx.beginPath()
    ctx.arc(x + 6, y + 8, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 18, y + 7, 6, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawRock(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#5a5a5a'
    ctx.beginPath()
    ctx.ellipse(x + 10, y + 8, 12, 8, 0.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#4a4a4a'
    ctx.beginPath()
    ctx.arc(x + 6, y + 6, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawRockLarge(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#4a4a4a'
    ctx.beginPath()
    ctx.ellipse(x + 18, y + 14, 20, 14, 0.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#5a5a5a'
    ctx.beginPath()
    ctx.arc(x + 10, y + 10, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 26, y + 12, 7, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawWell(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#555'
    ctx.beginPath()
    ctx.ellipse(x + 14, y + 24, 16, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#3388cc'
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.ellipse(x + 14, y + 22, 12, 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = '#666'
    ctx.fillRect(x + 2, y, 4, 24)
    ctx.fillRect(x + 22, y, 4, 24)
    ctx.fillRect(x, y - 2, 28, 4)
  }

  private drawCampfire(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#4a4a4a'
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      ctx.beginPath()
      ctx.arc(x + 10 + Math.cos(angle) * 8, y + 10 + Math.sin(angle) * 5, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    const campFlicker = Math.sin(time / 2) * 0.3 + 0.7
    ctx.fillStyle = '#ff4400'
    ctx.globalAlpha = campFlicker
    ctx.beginPath()
    ctx.moveTo(x + 10, y - 2)
    ctx.lineTo(x + 2, y + 12)
    ctx.lineTo(x + 18, y + 12)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#ffaa00'
    ctx.beginPath()
    ctx.moveTo(x + 10, y + 2)
    ctx.lineTo(x + 5, y + 10)
    ctx.lineTo(x + 15, y + 10)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawSign(ctx: CanvasRenderingContext2D, x: number, y: number, text?: string): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x + 8, y + 16, 4, 20)
    ctx.fillStyle = '#6a5030'
    ctx.fillRect(x, y, 20, 16)
    ctx.fillStyle = '#111'
    ctx.font = '8px VT323'
    ctx.fillText(text || '?', x + 4, y + 11)
  }

  private drawGrave(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#555'
    ctx.fillRect(x + 2, y + 18, 16, 6)
    ctx.fillRect(x + 4, y, 12, 20)
    ctx.fillRect(x + 1, y + 4, 18, 4)
  }

  private drawMushroom(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = '#8b4513'
    ctx.fillRect(x + 6, y + 10, 4, 8)
    ctx.fillStyle = color || '#ff6b6b'
    ctx.beginPath()
    ctx.arc(x + 8, y + 8, 8, Math.PI, 0)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(x + 5, y + 5, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 11, y + 6, 2, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawCrystal(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = color || '#88ccff'
    ctx.globalAlpha = 0.8
    ctx.beginPath()
    ctx.moveTo(x + 8, y)
    ctx.lineTo(x, y + 20)
    ctx.lineTo(x + 16, y + 20)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.globalAlpha = 0.3
    ctx.beginPath()
    ctx.moveTo(x + 8, y + 2)
    ctx.lineTo(x + 4, y + 12)
    ctx.lineTo(x + 8, y + 10)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawAltar(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = '#555'
    ctx.fillRect(x, y + 16, 36, 12)
    ctx.fillStyle = '#666'
    ctx.fillRect(x + 4, y + 8, 28, 10)
    ctx.fillStyle = '#8b0000'
    ctx.fillRect(x + 8, y + 10, 20, 4)
  }

  private drawCauldron(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#333'
    ctx.beginPath()
    ctx.ellipse(x + 12, y + 18, 14, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(x, y + 4, 24, 14)
    ctx.fillStyle = '#00aa00'
    ctx.globalAlpha = 0.7 + Math.sin(time / 8) * 0.2
    ctx.beginPath()
    ctx.ellipse(x + 12, y + 4, 10, 5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
    const bubble = (time / 10) % 1
    ctx.fillStyle = '#88ff88'
    ctx.beginPath()
    ctx.arc(x + 8 + Math.sin(time / 5) * 4, y + 2 - bubble * 6, 2, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawTorch(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x + 4, y + 10, 6, 20)
    const torchFlicker = Math.sin(time / 3) * 0.3 + 0.7
    ctx.fillStyle = '#ff6600'
    ctx.globalAlpha = torchFlicker
    ctx.beginPath()
    ctx.moveTo(x + 7, y)
    ctx.lineTo(x + 2, y + 12)
    ctx.lineTo(x + 12, y + 12)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#ffaa00'
    ctx.beginPath()
    ctx.moveTo(x + 7, y + 4)
    ctx.lineTo(x + 4, y + 10)
    ctx.lineTo(x + 10, y + 10)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  private drawBanner(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string): void {
    ctx.fillStyle = '#4a3020'
    ctx.fillRect(x + 10, y, 4, 6)
    ctx.fillStyle = color || '#8b0000'
    ctx.fillRect(x + 2, y + 4, 20, 30)
    ctx.fillStyle = '#ffd700'
    ctx.beginPath()
    ctx.arc(x + 12, y + 16, 6, 0, Math.PI * 2)
    ctx.fill()
  }
}

export const furnitureRenderer = new FurnitureRenderer()
