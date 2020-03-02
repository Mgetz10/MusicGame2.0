const midiNote = {
  60: 'c4',
  61: 'c#4',
  62: 'd4',
  63: 'd#4',
  64: 'e4',
  65: 'f4',
  66: 'f#4',
  67: 'g4',
  68: 'g#4',
  69: 'a4',
  70: 'a#4',
  71: 'b4',
  72: 'c5',
  73: 'c#5',
  74: 'd5',
  75: 'd#5',
  76: 'e5',
  77: 'f5',
  78: 'f#5',
  79: 'g5',
  80: 'g#5',
  81: 'a5',
  82: 'a#5',
  83: 'b5',
  84: 'c6'
}

navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function getMIDIMessage(midiMessage) {
  if (midiMessage.data[0] !== 248) {
    console.log(midiMessage.data);
    if (midiMessage.data[0] === 144) {
      console.log(midiNote[midiMessage.data[1]]);
      playNote(midiNote[midiMessage.data[1]])
    }
    if (midiMessage.data[0] === 128) {
      handleKeyUp(undefined, notesObj[midiNote[midiMessage.data[1]]].onKeyboard)
    }
  }
}
function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}