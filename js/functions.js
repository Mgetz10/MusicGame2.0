function noteOn(note) {
  note.playing = true
  playNote(note.name);

  placeOnStaff(note, 'sixteenth');
  if (!note.onKeyboard) {
    console.warn('keyboard range not yet coded')
    return
  }
  addClasses({
    playing: [note.onKeyboard]
  });
}

function noteOff(note) {
  note.playing = false
  removeFromStaff(note, 'sixteenth')
  if (note.onKeyboard) removeClasses({
    playing: [note.onKeyboard]
  });
}

function viewOctave(octave) {
  noteLookup['c2'].onKeyboard.scrollIntoView()
  if (octave === 9) return noteLookup['g9'].onKeyboard.scrollIntoView()
  else return noteLookup[`d${octave+1}`].onKeyboard.scrollIntoView()
}