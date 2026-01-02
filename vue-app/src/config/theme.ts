// Color palette and theme configuration

export const COLORS = {
  // Paper/Ink
  paper: '#f0e6d3',
  ink: '#1a1a1a',

  // Neon palette
  neonPrimary: '#ff2a6d',
  neonSecondary: '#05d9e8',
  neonTertiary: '#f9f002',
  neonAccent: '#d300c5',

  // UI backgrounds
  uiBg: 'rgba(10, 10, 15, 0.9)',
  uiBgLight: 'rgba(10, 10, 15, 0.7)',

  // Game backgrounds
  gameBg: '#0a0a0f',

  // Furniture palette
  furniture: {
    wood: '#5a4030',
    woodDark: '#3a2820',
    metal: '#4a4a5a',
    metalDark: '#2a2a3a',
    chrome: '#8a8a9a',
  },

  // Nature palette
  nature: {
    grass: '#1a3a1a',
    grassDark: '#153015',
    tree: '#2a5a2a',
    treeDark: '#1a4a1a',
    rock: '#5a5a5a',
    rockDark: '#4a4a4a',
  },

  // Character palettes
  skins: {
    light: '#fae0c8',
    medium: '#e5c0b0',
    tan: '#d4a574',
    olive: '#c9a182',
    brown: '#8b6050',
    dark: '#5a3a2a',
  },

  hairs: {
    black: '#1a1a1a',
    brown: '#4a3728',
    blonde: '#d4a857',
    red: '#8b3a2a',
    grey: '#7a7a7a',
    white: '#aaaaaa',
  },
} as const

export const FONTS = {
  terminal: "'VT323', monospace",
  pixel: "'Press Start 2P', monospace",
} as const

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
