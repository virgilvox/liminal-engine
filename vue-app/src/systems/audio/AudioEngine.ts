// Audio engine - Web Audio API wrapper

import type { AudioConfig, SoundEffect } from '@/types'
import { MusicGenerator } from './MusicGenerator'
import { SoundEffects } from './SoundEffects'

export class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private musicGain: GainNode | null = null
  private sfxGain: GainNode | null = null

  private musicGenerator: MusicGenerator | null = null
  private soundEffects: SoundEffects | null = null

  private initialized = false
  private muted = false

  private config: AudioConfig = {
    bpm: 70,
    musicVolume: 0.2,
    sfxVolume: 0.5,
    masterVolume: 0.4,
  }

  init(config?: Partial<AudioConfig>): boolean {
    if (this.initialized) return true

    if (config) {
      this.config = { ...this.config, ...config }
    }

    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Master gain
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = this.config.masterVolume
      this.masterGain.connect(this.ctx.destination)

      // Music gain
      this.musicGain = this.ctx.createGain()
      this.musicGain.gain.value = this.config.musicVolume
      this.musicGain.connect(this.masterGain)

      // SFX gain
      this.sfxGain = this.ctx.createGain()
      this.sfxGain.gain.value = this.config.sfxVolume
      this.sfxGain.connect(this.masterGain)

      // Initialize subsystems
      this.musicGenerator = new MusicGenerator(this.ctx, this.musicGain, this.config.bpm)
      this.soundEffects = new SoundEffects(this.ctx, this.sfxGain)

      this.initialized = true
      return true
    } catch (e) {
      console.error('Audio initialization failed:', e)
      return false
    }
  }

  resume(): void {
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume()
    }
  }

  isInitialized(): boolean {
    return this.initialized
  }

  isMuted(): boolean {
    return this.muted
  }

  toggleMute(): boolean {
    this.muted = !this.muted
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : this.config.masterVolume
    }
    return this.muted
  }

  setMute(muted: boolean): void {
    this.muted = muted
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : this.config.masterVolume
    }
  }

  setMusicVolume(volume: number): void {
    this.config.musicVolume = volume
    if (this.musicGain) {
      this.musicGain.gain.value = volume
    }
  }

  setSfxVolume(volume: number): void {
    this.config.sfxVolume = volume
    if (this.sfxGain) {
      this.sfxGain.gain.value = volume
    }
  }

  startMusic(): void {
    if (!this.initialized || !this.musicGenerator) return
    this.musicGenerator.start()
  }

  stopMusic(): void {
    if (this.musicGenerator) {
      this.musicGenerator.stop()
    }
  }

  play(effect: SoundEffect, options?: { pitch?: number }): void {
    if (!this.ctx || !this.soundEffects || this.muted) return
    this.soundEffects.play(effect, options)
  }

  // Convenience methods
  playStep(): void {
    this.play('step')
  }

  playBlip(): void {
    this.play('blip')
  }

  playGood(): void {
    this.play('good')
  }

  playBad(): void {
    this.play('bad')
  }

  playWarp(): void {
    this.play('warp')
  }

  playDoor(): void {
    this.play('door')
  }

  playTalk(pitch: number = 1): void {
    this.play('talk', { pitch })
  }

  playQuest(): void {
    this.play('quest')
  }

  playServe(): void {
    this.play('serve')
  }

  playStatic(): void {
    this.play('static')
  }

  destroy(): void {
    this.stopMusic()
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
    this.initialized = false
  }
}

// Singleton instance
export const audioEngine = new AudioEngine()
