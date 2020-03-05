var keyCodes = {
  '65': () => {
    return `c${octave}`
  },
  '87': () => {
    return `c#${octave}`
  },
  '83': () => {
    return `d${octave}`
  },
  '69': () => {
    return `d#${octave}`
  },
  '68': () => {
    return `e${octave}`
  },
  '70': () => {
    return `f${octave}`
  },
  '84': () => {
    return `f#${octave}`
  },
  '71': () => {
    return `g${octave}`
  },
  '89': () => {
    return `g#${octave}`
  },
  '72': () => {
    return `a${octave}`
  },
  '85': () => {
    return `a#${octave}`
  },
  '74': () => {
    return `b${octave}`
  },
  '75': () => {
    return `c${octave + 1}`
  },
  '79': () => {
    return `c#${octave + 1}`
  },
  '76': () => {
    return `d${octave + 1}`
  },
}
window.addEventListener('keydown', parseKeyboard);
window.addEventListener('keyup', handleKeyUp);

function parseKeyboard(e) {
  if (!keyCodes[`${e.keyCode}`]) return
  const noteName = keyCodes[`${e.keyCode}`]()
  const note = notesObj[noteName]
  if (alreadyPlaying(note.onKeyboard)) return
  playNote(note)
}

function handleKeyUp(e) {
  if (!keyCodes[`${e.keyCode}`]) return
  const noteName = keyCodes[`${e.keyCode}`]()
  const note = notesObj[noteName]
  removeNote(note)
}