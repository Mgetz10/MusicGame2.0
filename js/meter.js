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

function startMetronome() {
  metronome = setInterval(() => {
    beatDivision = (beatDivision % 16) + 1
    if (beatDivision % 4 !== 1) return
    beat = (beat % 4) + 1
    if (beat !== 1) metronomeOSC.triggerAttackRelease('g5', '0.001')
    else metronomeOSC.triggerAttackRelease('a5', '0.001')
    // console.log(beatDivision % 4 === 1, beatDivision, beat)
  }, 250)
}

function stopMetronome() {
  clearInterval(metronome)
}

function meterContext(note, prevNote) {
  let noteType = 'whole'
  //get distance
  const distance = note.location - prevNote.location


  //return note type
  return noteType
}