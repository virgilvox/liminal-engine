// Procedural music generator - creates lo-fi beats

export class MusicGenerator {
  private ctx: AudioContext
  private outputGain: GainNode
  private bpm: number
  private musicInterval: ReturnType<typeof setInterval> | null = null
  private beat: number = 0

  // Musical data
  private scale = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63]
  private bassPattern = [0, 0, 5, 5, 3, 3, 7, 5]
  private chordProg = [
    [0, 3, 7, 10],
    [5, 8, 0, 3],
    [10, 2, 5, 8],
    [7, 10, 2, 5],
  ]

  constructor(ctx: AudioContext, outputGain: GainNode, bpm: number = 70) {
    this.ctx = ctx
    this.outputGain = outputGain
    this.bpm = bpm
  }

  start(): void {
    if (this.musicInterval) return

    const beatTime = 60000 / this.bpm / 2
    this.beat = 0
    this.playBeat()
    this.musicInterval = setInterval(() => this.playBeat(), beatTime)
  }

  stop(): void {
    if (this.musicInterval) {
      clearInterval(this.musicInterval)
      this.musicInterval = null
    }
  }

  isPlaying(): boolean {
    return this.musicInterval !== null
  }

  private playBeat(): void {
    const now = this.ctx.currentTime
    const beatInBar = this.beat % 16
    const bar = Math.floor(this.beat / 16) % 4

    // Drums
    if (beatInBar === 0 || beatInBar === 10) this.playKick(now)
    if (beatInBar === 4 || beatInBar === 12) this.playSnare(now)
    if (beatInBar % 2 === 0) this.playHat(now, beatInBar % 4 !== 0)

    // Bass
    if (beatInBar % 4 === 0) {
      const bassIndex = this.bassPattern[beatInBar / 2]
      if (bassIndex !== undefined) {
        const bassFreq = this.scale[bassIndex]
        if (bassFreq !== undefined) {
          this.playBass(now, bassFreq * 0.25)
        }
      }
    }

    // Chords/Pads
    if (beatInBar === 0 && Math.random() > 0.3) {
      const chord = this.chordProg[bar]
      if (chord) {
        this.playPad(now, chord)
      }
    }

    // Random bells
    if (Math.random() > 0.94) {
      const bellFreq = this.scale[Math.floor(Math.random() * this.scale.length)]
      if (bellFreq !== undefined) {
        this.playBell(now, bellFreq * 2)
      }
    }

    this.beat++
  }

  private playKick(time: number): void {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(80, time)
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.15)

    gain.gain.setValueAtTime(0.5, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(time)
    osc.stop(time + 0.2)
  }

  private playSnare(time: number): void {
    const bufferSize = this.ctx.sampleRate * 0.12
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    filter.type = 'bandpass'
    filter.frequency.value = 3000

    gain.gain.setValueAtTime(0.15, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.outputGain)
    noise.start(time)
    noise.stop(time + 0.12)
  }

  private playHat(time: number, soft: boolean): void {
    const bufferSize = this.ctx.sampleRate * 0.04
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    filter.type = 'highpass'
    filter.frequency.value = 8000

    gain.gain.setValueAtTime(soft ? 0.03 : 0.06, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.outputGain)
    noise.start(time)
    noise.stop(time + 0.04)
  }

  private playBass(time: number, freq: number): void {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    osc.type = 'triangle'
    osc.frequency.value = freq

    filter.type = 'lowpass'
    filter.frequency.value = 300

    gain.gain.setValueAtTime(0.4, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.outputGain)
    osc.start(time)
    osc.stop(time + 0.4)
  }

  private playPad(time: number, chord: number[]): void {
    chord.forEach((semitone, i) => {
      const freq = 130.81 * Math.pow(2, semitone / 12) * 0.5
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'sine'
      osc.frequency.value = freq

      filter.type = 'lowpass'
      filter.frequency.value = 400

      gain.gain.setValueAtTime(0, time)
      gain.gain.linearRampToValueAtTime(0.04, time + 0.3)
      gain.gain.setValueAtTime(0.04, time + 1.5)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 2.5)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.outputGain)
      osc.start(time + i * 0.05)
      osc.stop(time + 2.5)
    })
  }

  private playBell(time: number, freq: number): void {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = freq

    gain.gain.setValueAtTime(0.08, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5)

    osc.connect(gain)
    gain.connect(this.outputGain)
    osc.start(time)
    osc.stop(time + 1.5)
  }
}
