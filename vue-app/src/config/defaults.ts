// Default game configuration

import type { GameConfig, Stats } from '@/types'
import type { InventoryItem } from '@/types/ui'

export const DEFAULT_CONFIG: GameConfig = {
  title: 'LIMINAL_ENGINE',
  subtitle: 'TEMPLATE V2',
  startEnvironment: 'hub',
  startX: 300,
  startY: 250,
  playerSpeed: 2,
  playerSkin: '#e5c0b0',
  playerShirt: '#446655',
  playerHair: '#332211',
  bpm: 70,
  musicVolume: 0.2,
  sfxVolume: 0.5,
}

export const DEFAULT_STATS: Stats = {
  gold: {
    label: 'GOLD',
    value: 100,
    icon: '$',
    color: 'var(--neon-tertiary)',
  },
  hp: {
    label: 'HP',
    value: 100,
    max: 100,
    bar: true,
    barClass: 'primary',
  },
}

export const DEFAULT_INVENTORY: InventoryItem[] = [
  { id: 'potion', name: 'Potion', icon: '🧪', count: 5, desc: 'Restores HP' },
  { id: 'key', name: 'Key', icon: '🗝️', count: 3, desc: 'Opens doors' },
  { id: 'coin', name: 'Coin', icon: '🪙', count: 50, desc: 'Currency' },
  { id: 'food', name: 'Food', icon: '🍖', count: 10, desc: 'Restores energy' },
  { id: 'gem', name: 'Gem', icon: '💎', count: 2, desc: 'Valuable' },
]

export const CANVAS_CONFIG = {
  baseWidth: 600,
  baseHeight: 500,
  minScale: 1,
  maxScale: 4,
}
