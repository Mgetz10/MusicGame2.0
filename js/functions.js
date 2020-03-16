function noteOn(note) {
  note.playing = true
  playNote(note.name);
  placeOnStaff(note, 'eigth');
  if (!note.onKeyboard) {
    console.warn('keyboard range not yet coded')
    return
  }
  addClass('playing', note.onKeyboard);
}

function noteOff(note) {
  note.playing = false
  removeFromStaff(note, 'eigth')
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
  const domNote = createNote(note.name, type)
  domNote.style.gridColumnStart = staff.spotsFull + 1
  note.staffLine.appendChild(domNote)
  staff.spotsFull += calculateSpaces(type)
  const pushIndex = staff.notes.push({
    noteLookup: note,
    dom: domNote,
    type: type
  }) - 1

  handleBridging(staff.notes[pushIndex])

}

function removeFromStaff(note, type) {
  if (!note.staffLine) return
  staff.spotsFull -= calculateSpaces(type)
  const noteLocation = note.staffLine;
  const noteToRemove = getElementByDataset('note', note.name, '.note', noteLocation);
  staff.notes.pop()
  const bridge = staff.dom.querySelector('.bridge')
  if (bridge) bridge.remove()
  return noteLocation.removeChild(noteToRemove);
}

function viewOctave(octave) {
  noteLookup['c2'].onKeyboard.scrollIntoView()
  if (octave === 9) return noteLookup['g9'].onKeyboard.scrollIntoView()
  else return noteLookup[`d${octave+1}`].onKeyboard.scrollIntoView()
}

function createNote(name, type) {
  // const noteToPlace = '<span class="note-body"><span class="stem"></span></span>';
  const note = document.createElement('div')
  const noteBody = document.createElement('span')
  const stem = document.createElement('span')
  note.classList.add('note', type)
  if (isSharp(name)) note.classList.add('sharp')
  note.setAttribute('data-note', name)
  noteBody.classList.add('note-body')
  stem.classList.add('stem')
  noteBody.appendChild(stem)
  note.appendChild(noteBody)
  return note
}

function calculateSpaces(noteType) {
  var spaces;
  switch (noteType) {
    case 'whole':
      spaces = 16
      break;
    case 'half':
      spaces = 8
      break;
    case 'quarter':
      spaces = 4
      break;
    case 'eigth':
      spaces = 2
      break;
    case 'sixteenth':
      spaces = 1
      break;
    default:
      spaces = 1
      break
  }
  return spaces
}

function createSVG(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width)
  svg.setAttribute('height', height)
  return svg
}

function createLine(x1, y1, x2, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", 'line')
  setAttributes(line, {
    'x1': x1,
    'y1': y1,
    'x2': x2,
    'y2': y2
  })
  return line
}


function handleBridging(note) {
  const bridgable = note.type === 'eigth' || note.type === 'sixteenth'
  const firstNote = staff.notes.length <= 1
  if (!bridgable || firstNote) return
  const previousNote = staff.notes[staff.notes.length - 2]
  console.log(previousNote)
  const sameNoteType = note.type === previousNote.type
  if (!sameNoteType) return
  addClass('bridged', note.dom)
  addClass('bridged', previousNote.dom)
  const stem = note.dom.querySelector('.stem')
  const prevStem = previousNote.dom.querySelector('.stem')
  const stemCoords = stem.getBoundingClientRect()
  const prevStemCoords = prevStem.getBoundingClientRect()
  const firstNoteLower = prevStemCoords.y > stemCoords.y
  const lowerStem = firstNoteLower ? prevStemCoords : stemCoords
  const higherStem = firstNoteLower ? stemCoords : prevStemCoords
  const svgHeight = lowerStem.y - higherStem.y
  const svgWidth = (stemCoords.x - prevStemCoords.x) + 2
  const bridge = createSVG(svgWidth, svgHeight)
  setStyles(bridge, {
    left: `${prevStemCoords.x}px`,
    top: `${higherStem.y}px`
  })
  const bridgeLine = createLine(0, 0, svgWidth, 0)
  bridge.appendChild(bridgeLine)

  const noteLine = createLine(firstNoteLower ? '0' : svgWidth,
    '0',
    firstNoteLower ? '0' : svgWidth,
    svgHeight)

  addClass('note-line', noteLine)
  addClass('bridge', bridge)
  bridge.appendChild(noteLine)
  staff.dom.appendChild(bridge)


}
// const distanceToScroll = document.querySelector(".keys[data-key='d5']");
// distanceToScroll.scrollIntoView();