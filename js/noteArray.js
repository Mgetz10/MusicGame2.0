const noteLookup = {
  "c2": {},
  "c#2": {},
  "d2": {},
  "d#2": {},
  "e2": {},
  "f2": {},
  "f#2": {},
  "g2": {},
  "g#2": {},
  "a2": {},
  "a#2": {},
  "b2": {},
  "c3": {},
  "c#3": {},
  "d3": {},
  "d#3": {},
  "e3": {},
  "f3": {},
  "f#3": {},
  "g3": {},
  "g#3": {},
  "a3": {},
  "a#3": {},
  "b3": {},
  "c4": {},
  "c#4": {},
  "d4": {},
  "d#4": {},
  "e4": {},
  "f4": {},
  "f#4": {},
  "g4": {},
  "g#4": {},
  "a4": {},
  "a#4": {},
  "b4": {},
  "c5": {},
  "c#5": {},
  "d5": {},
  "d#5": {},
  "e5": {},
  "f5": {},
  "f#5": {},
  "g5": {},
  "g#5": {},
  "a5": {},
  "a#5": {},
  "b5": {},
  "c6": {},
  "c#6": {},
  "d6": {},
  "d#6": {},
  "e6": {},
  "f6": {},
  "f#6": {},
  "g6": {},
  "g#6": {},
  "a6": {},
  "a#6": {},
  "b6": {},
  "c7": {},
  "c#7": {},
  "d7": {},
  "d#7": {},
  "e7": {},
  "f7": {},
  "f#7": {},
  "g7": {},
  "g#7": {},
  "a7": {},
  "a#7": {},
  "b7": {},
  "c8": {},
  "c#8": {},
  "d8": {},
  "d#8": {},
  "e8": {},
  "f8": {},
  "f#8": {},
  "g8": {},
  "g#8": {},
  "a8": {},
  "a#8": {},
  "b8": {},
  "c9": {},
  "c#9": {},
  "d9": {},
  "d#9": {},
  "e9": {},
  "f9": {},
  "f#9": {},
  "g9": {},
}
const octaves = {
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
}

buildNoteLookup()

function buildNoteLookup() {
  const staff = document.querySelector('.staff')
  const keyboard = document.querySelector('.keyboard')
  for (key in noteLookup) {
    noteLookup[key].name = key
    noteLookup[key].onKeyboard = keyboard.querySelector(`[data-key='${key}']`)
    noteLookup[key].staffLine = staff.querySelector(`[data-key='${removeAccidental(key)}']`)
    octaves[key.slice(-1)].push(noteLookup[key])
  }
}

function removeAccidental(note) {
  if (isSharp(note)) return note.split('#').join('');
  else return note;
}

function getNoteImg(note, type) {
  return `<img src="imgs/${type}.svg" class="${type}"/>`;
}

function isSharp(note) {
  return note.includes('#');
}