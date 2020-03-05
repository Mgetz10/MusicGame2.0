function alreadyPlaying(key) {
  return key.classList.contains('playing');
}

function isSharp(note) {
  return note.includes('#');
}

function removeAccidental(note) {
  if (isSharp(note)) return note.split('#').join('');
  else return note;
}

function removeNote(key) {
  const noteLocation = key.onStaff;
  const noteToRemove = getElementByDataset('note', key.name, '.note', noteLocation);
  if (!noteToRemove) return;

  noteLocation.removeChild(noteToRemove);

  removeClass(key.onKeyboard, 'playing');
  keydown = false;
}

function playKey(note) {
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

function getNoteImg(note, type) {
  if (isSharp(note))
    return `<img src="imgs/sharp.svg" class="accidental"/><img src="imgs/${type}.svg" class="${type}"/>`;
  else return `<img src="imgs/${type}.svg" class="${type}"/>`;
}

function placeNote(note, type) {
  if (!note.onStaff) {
    console.warn('range not yet coded')
    return
  }
  const noteToPlace = getNoteImg(note.name, type);
  const noteHTML = `<div class='note' data-note="${note.name}">${noteToPlace}</div>`;
  note.onStaff.innerHTML += noteHTML;
}

function playNote(note) {
  playKey(note.name);
  placeNote(note, 'wholenote');
  if (!note.onKeyboard) {
    console.warn('keyboard range not yet coded')
    return
  }
  addClass(note.onKeyboard, 'playing');
}