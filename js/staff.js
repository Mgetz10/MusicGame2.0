const staff = {
  dom: document.querySelector('.staff .bar'),
  time: 0,
  notes: []
}

function placeOnStaff(note, type) {
  if (!note.staffLine) {
    console.warn('out of range')
    return
  }
  const domNote = createNote(note.name, 'whole')
  note.staffLine.appendChild(domNote)

  domNote.style.gridColumnStart = beatDivision

  const pushIndex = staff.notes.push({
    noteLookup: note,
    dom: domNote,
    type: 'whole',
    location: beatDivision,
  }) - 1
  const noteObj = staff.notes[pushIndex]
  const prevNote = staff.notes[pushIndex - 1]
  noteObj.type = calculateNoteType(noteObj)
  if (prevNote) {
    const sameBar = noteObj.location - prevNote.location >= 0
    const sameLocation = noteObj.location === prevNote.location
    if (sameBar && !sameLocation) {
      prevNote.type = calculateNoteType(prevNote, noteObj)
      handleBridging(noteObj, prevNote)
    }
  }

}

function removeFromStaff(note, type) {
  if (!note.staffLine) return
  const noteLocation = note.staffLine;
  const noteToRemove = getElementByDataset('note', note.name, '.note', noteLocation);
  staff.notes.pop()
  const bridge = staff.dom.querySelector('.bridge')
  if (bridge) bridge.remove()
  return noteLocation.removeChild(noteToRemove);
}

function createNote(name, type) {
  // const noteToPlace = '<span class="note-body"><span class="stem"></span></span>';
  const note = document.createElement('div')
  const noteBody = document.createElement('span')
  const stem = document.createElement('span')
  addClass(['note'], note)
  setAttributes(note, {
    'data-type': type
  })
  if (isSharp(name)) addClass(["sharp"], note)
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

const getPreviousNote = (note) => {
  staff.notes[staff.notes.indexOf(note) - 1]
}

function calculateNoteType(noteOne, noteTwo) {
  const end = noteTwo ? noteTwo.location : 16
  const spacesToFill = end - noteOne.location
  console.log(spacesToFill)
  let noteType;
  switch (spacesToFill) {
    case 16:
      noteType = 'whole'
      break;
    case 15:
      noteType = 'half'
      addClass(['dotted'], noteOne.dom)
      // tied to dotted eigth
      break
    case 14:
      noteType = 'half'
      addClass(['dotted'], noteOne.dom)
      // tied to eigth
      break;
    case 13:
      noteType = 'half'
      addClass(['dotted'], noteOne.dom)
      //tied to a sixteenth
      break
    case 12:
      noteType = 'half'
      addClass(['dotted'], noteOne.dom)
      break
    case 11:
      noteType = 'half'
      //tied to dotted eigth
      break
    case 10:
      noteType = 'half'
      // tied to eigth
      break
    case 9:
      noteType = 'half'
      // tied to sixteenth
      break;
    case 8:
      noteType = 'half'
      break
    case 7:
      noteType = 'half'
      addClass(['dotted'], noteOne.dom)
      // tied to a sixteenth
      break
    case 6:
      noteType = 'quarter'
      addClass(['dotted'], noteOne.dom)
      break
    case 5:
      noteType = 'quarter'
      //tied to a sixteenth
      break
    case 4:
      noteType = 'quarter'
      break;
    case 3:
      noteType = 'eight'
      addClass(['dotted'], noteOne.dom)
      break
    case 2:
      noteType = 'eigth'
      break
    case 1:
      noteType = 'sixteenth'
      break
  }
  setAttributes(noteOne.dom, {
    'data-type': noteType
  })
  return noteType
}