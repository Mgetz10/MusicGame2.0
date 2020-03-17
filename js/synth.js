synthA = new Tone.PolySynth(6, Tone.Synth, {
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.01,
    decay: 5,
    sustain: 0,
    release: 4
  }
})
// synthA.portamento = 0.05
this.synthA.volume.value = -12;
synthA.toMaster();