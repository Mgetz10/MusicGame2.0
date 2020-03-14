function noteOn(note) {
  note.playing = true
  playNote(note.name);
  placeOnStaff(note, 'wholenote');
  if (!note.onKeyboard) {
    console.warn('keyboard range not yet coded')
    return
  }
  addClass('playing', note.onKeyboard);
}

function noteOff(note) {
  note.playing = false
  removeFromStaff(note)
  if (note.onKeyboard) removeClass('playing', note.onKeyboard);
}

function playNote(note) {
  synthA = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.1,
      decay: 5,
      sustain: 0,
      release: 3
    }
  }).toMaster();
  this.synthA.volume.value = -12;

  synthA.triggerAttack(note);
}

function placeOnStaff(note, type) {
  if (!note.staffLine) {
    console.warn('range not yet coded')
    return
  }
  // const noteToPlace = getNoteImg(note.name, type);
  const noteToPlace = '<span class="wholenote"></span>';
  const noteHTML = `<div class='note ${isSharp(note.name)? 'sharp':''}' data-note="${note.name}">${noteToPlace}</div>`;
  note.staffLine.innerHTML += noteHTML;
}

function removeFromStaff(note) {
  if (!note.staffLine) return
  const noteLocation = note.staffLine;
  const noteToRemove = getElementByDataset('note', note.name, '.note', noteLocation);
  return noteLocation.removeChild(noteToRemove);
}

function viewOctave(octave) {
  noteLookup['c2'].onKeyboard.scrollIntoView()
  if (octave === 9) return noteLookup['g9'].onKeyboard.scrollIntoView()
  else return noteLookup[`d${octave+1}`].onKeyboard.scrollIntoView()
}

// const distanceToScroll = document.querySelector(".keys[data-key='d5']");
// distanceToScroll.scrollIntoView();