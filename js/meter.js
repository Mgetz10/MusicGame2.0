let beatDivision = 0;
let beat = 0
var metronomeOSC = new Tone.Synth({
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.0,
    decay: 0.0,
    sustain: 0.1,
    release: 0.05
  }
})
this.metronomeOSC.volume.value = -10;
metronomeOSC.toMaster();


let metronome;
let lastBeatCountedAt;
let bpm = 60
let beatEvery = 60000 / bpm
let metronomeRunning = false

function startMetronome() {
  if (!metronome) {
    staff.startTime = Date.now()
    metronome = (callback) => {
      const newDate = Date.now();
      const difference = (newDate - staff.startTime) % beatEvery;
      const buffer = 24
      const nextBeat = difference <= buffer || difference >= beatEvery - buffer
      if (nextBeat) {
        const beatCountedAlready = newDate - lastBeatCountedAt < (buffer * 2)
        if (!beatCountedAlready) {
          beat = (beat % 4) + 1
          lastBeatCountedAt = newDate
          if (beat !== 1) metronomeOSC.triggerAttackRelease('g5', '0.001')
          else {
            staff.startTime = newDate
            metronomeOSC.triggerAttackRelease('a5', '0.001')
          }
        }
      }
      if (metronome) requestAnimationFrame(metronome)
    }
    requestAnimationFrame(metronome)
  } else stopMetronome()
}

function stopMetronome() {
  cancelAnimationFrame(metronome)
  metronome = undefined
  beat = 0
}

function quantize(time) {
  if (!staff.startTime) return 1
  const barEnd = staff.startTime + msCalc.whole()
  let spacesToFill = Math.round((barEnd - time) / msCalc.sixteenth())
  if (spacesToFill === 0) spacesToFill = 16
  return 17 - spacesToFill
}

const msCalc = {
  whole: () => beatEvery * 4,
  half: () => beatEvery * 2,
  quarter: () => beatEvery,
  eigth: () => beatEvery / 2,
  sixteenth: () => beatEvery / 4,
}