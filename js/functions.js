function alterClass(addOrRemove) {
  return (element, classToRemove) =>
    addOrRemove === 'add'
      ? element.classList.add(classToRemove)
      : element.classList.remove(classToRemove);
}
const addClass = alterClass('add');
const removeClass = alterClass('remove');

function getElementByDataset(
  data,
  searchString,
  specifier = '',
  elementToSearch = document
) {
  return elementToSearch.querySelector(
    `${specifier}[data-${data}="${searchString}"]`
  );
}

function clickOrKey(e, keyUpOrDown) {
  if (e.type === keyUpOrDown) {
    const note = keyCodes[`${e.keyCode}`]
    if (note) return notesObj[note()].onKeyboard
  } else return e.target
}

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

function handleKeyUp(e, inputKey) {
  const key = inputKey ? inputKey : clickOrKey(e, 'keyup');
  if (!key) return;
  const note = key.dataset.key;
  const noteLocation = notesObj[note].onStaff;
  const noteToRemove = getElementByDataset('note', note, '.note', noteLocation);
  if (!noteToRemove) return;

  noteLocation.removeChild(noteToRemove);

  removeClass(key, 'playing');
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
  const noteToPlace = getNoteImg(note, type);
  const noteHTML = `<div class='note' data-note="${note}">${noteToPlace}</div>`;
  notesObj[note].onStaff.innerHTML += noteHTML;
}

function playNote(note) {
  playKey(note);
  placeNote(note, 'wholenote');
  addClass(notesObj[note].onKeyboard, 'playing');
}


function freePlay(e) {
  const key = clickOrKey(e, 'keydown');
  if (!key) return;
  if (alreadyPlaying(key)) return;

  const note = key.dataset.key;
  playKey(note);
  placeNote(note, 'wholenote');
  addClass(key, 'playing');
}
