var octave = 4

var keyCodeLookup = {
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
  '90': () => {
    if (octave > 2) octave--
    return undefined
  },
  '88': () => {
    if (octave < 9) octave++
    return undefined
  },
}
window.addEventListener('keydown', parseKeyboard);
window.addEventListener('keyup', handleKeyUp);

function parseKeyboard(e) {
  var keyCodeResult = keyCodeLookup[`${e.keyCode}`]
  var octaveShift = e.keyCode === 88 || e.keyCode === 90
  if (!keyCodeResult) return
  else if (!octaveShift) {
    const note = noteLookup[keyCodeResult()]
    if (note.playing) return
    noteOn(note)
  } else {
    keyCodeResult()
  }
}

function handleKeyUp(e) {
  var keyCodeResult = keyCodeLookup[`${e.keyCode}`]
  var octaveShift = e.keyCode === 88 || e.keyCode === 90
  if (!keyCodeResult || octaveShift) return
  const note = noteLookup[keyCodeResult()]
  noteOff(note)
}