// Audio system types

export interface AudioConfig {
  bpm: number
  musicVolume: number
  sfxVolume: number
  masterVolume: number
}

export interface AudioState {
  initialized: boolean
  muted: boolean
  playing: boolean
}

export type SoundEffect =
  | 'step'
  | 'blip'
  | 'good'
  | 'bad'
  | 'warp'
  | 'door'
  | 'talk'
  | 'quest'
  | 'serve'
  | 'static'
