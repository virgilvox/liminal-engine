// Sound effects library

import type { SoundEffect } from '@/types'

export class SoundEffects {
  private ctx: AudioContext
  private outputGain: GainNode

  constructor(ctx: AudioContext, outputGain: GainNode) {
    this.ctx = ctx
    this.outputGain = outputGain
  }

  play(effect: SoundEffect, options?: { pitch?: number }): void {
    const pitch = options?.pitch ?? 1

    switch (effect) {
      case 'step':
        this.playStep()
        break
      case 'blip':
        this.playBlip()
        break
      case 'good':
        this.playGood()
        break
      case 'bad':
        this.playBad()
        break
      case 'warp':
        this.playWarp()
        break
      case 'door':
        this.playDoor()
        break
      case 'talk':
        this.playTalk(pitch)
        break
      case 'quest':
        this.playQuest()
        break
      case 'serve':
        this.playServe()
        break
      case 'static':
        this.playStatic()
        break
    }
  }

  private playStep(): void {
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'square'
    osc.frequency.value = 40 + Math.random() * 20

    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(now)
    osc.stop(now + 0.025)
  }

  private playBlip(): void {
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06)

    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(now)
    osc.stop(now + 0.06)
  }

  private playGood(): void {
    const now = this.ctx.currentTime
    const frequencies = [523, 659, 784]

    frequencies.forEach((f, i) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = f

      gain.gain.setValueAtTime(0, now + i * 0.08)
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15)

      osc.connect(gain)
      gain.connect(this.outputGain)
      osc.start(now + i * 0.08)
      osc.stop(now + i * 0.08 + 0.15)
    })
  }

  private playBad(): void {
    const now = this.ctx.currentTime
    const frequencies = [180, 150]

    frequencies.forEach((f, i) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.value = f

      gain.gain.setValueAtTime(0.08, now + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.2)

      osc.connect(gain)
      gain.connect(this.outputGain)
      osc.start(now + i * 0.15)
      osc.stop(now + i * 0.15 + 0.2)
    })
  }

  private playWarp(): void {
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.3)

    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(now)
    osc.stop(now + 0.3)
  }

  private playDoor(): void {
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(now)
    osc.stop(now + 0.15)
  }

  private playTalk(pitch: number = 1): void {
    const now = this.ctx.currentTime
    const baseFreq = 120 + Math.random() * 80
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(baseFreq * pitch, now)
    osc.frequency.setValueAtTime(baseFreq * pitch * 0.9, now + 0.02)

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(now)
    osc.stop(now + 0.05)
  }

  private playQuest(): void {
    const now = this.ctx.currentTime
    const frequencies = [440, 550, 660, 880]

    frequencies.forEach((f, i) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = f

      gain.gain.setValueAtTime(0, now + i * 0.1)
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.1 + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2)

      osc.connect(gain)
      gain.connect(this.outputGain)
      osc.start(now + i * 0.1)
      osc.stop(now + i * 0.1 + 0.2)
    })
  }

  private playServe(): void {
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, now)
    osc.frequency.setValueAtTime(900, now + 0.08)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(now)
    osc.stop(now + 0.15)
  }

  private playStatic(): void {
    const now = this.ctx.currentTime
    const bufferSize = this.ctx.sampleRate * 0.3
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    filter.type = 'bandpass'
    filter.frequency.value = 2000

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.outputGain)
    noise.start()
  }
}
