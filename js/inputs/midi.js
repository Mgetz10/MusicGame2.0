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
  84: 'c6',
  85: 'c#6',
  86: 'd6',
  87: 'd#6',
  88: 'e6',
  89: 'f6',
  90: 'f#6',
  91: 'g6',
  92: 'g#6',
  93: 'a6',
  94: 'a#6',
  95: 'b6',
  96: 'c7',
  97: 'c#7',
  98: 'd7',
  99: 'd#7',
  100: 'e7',
  101: 'f7',
  102: 'f#7',
  103: 'g7',
  104: 'g#7',
  105: 'a7',
  106: 'a#7',
  107: 'b7',
  108: 'c8',
  109: 'd8',
  110: 'd#8',
  111: 'e8',
  112: 'f8',
  113: 'f#8',
  114: 'g8',
  115: 'g#8',
  116: 'a8',
  117: 'a#8',
  118: 'b8',
  119: 'c9',
  120: 'c#9',
  121: 'd9',
  122: 'd#9',
  123: 'e9',
  124: 'f9',
  125: 'f#9',
  126: 'g9',
  127: 'g#9',
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
    if (midiMessage.data[0] === 144) {
      const noteName = midiNote[midiMessage.data[1]]
      playNote(notesObj[noteName])
    }
    if (midiMessage.data[0] === 128) {
      removeNote(notesObj[midiNote[midiMessage.data[1]]])
    }
  }
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}