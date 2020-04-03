/* New Strategy
Create staff object
display staff by rendering staff object
*/
const noteTemplate = buildNote()
const staffLines = document.querySelectorAll('.staff-line')
const staff = {
  dom: document.querySelector('.staff .bar'),
  time: 0,
  notes: [],
}

function placeOnStaff(note, type) {
  if (!note.staffLine) {
    console.warn('out of range')
    return
  }
  const prevNote = staff.notes[staff.notes.length - 1]
  // use beatDivision inside calcnote to calculate if current note
  //// if beatDivision > note.location = not current note
  // calculateNoteType(prevNote)

  staff.notes.push({
    ...note,
    // recreate calculateNoteType() so it involves no dom elems
    type: 'whole', //calculateNoteType()
    location: beatDivision,
    bridge: '' //handleBridging(noteObj, prevNote)
  }) - 1

  // POSSIBLY PUT CHECKS BELOW IN FUNCTION
  // if (prevNote) {
  //   const sameBar = beatDivision - prevNote.location >= 0
  //   const sameLocation = noteObj.location === prevNote.location
  //   if (sameBar && !sameLocation)
  // }
  // console.time('g')
  renderStaff(staff)
  // console.timeEnd('g')
}

function renderStaff(staff) {
  staffLines.forEach(line => line.innerHTML = '')
  staff.notes.forEach(note => {
    const domNote = createNote()
    attachLabels(domNote, note.name, note.type)
    note.staffLine.appendChild(domNote)
  })
}

function removeFromStaff(note, type) {
  if (!note.staffLine) return
  // const noteLocation = note.staffLine;
  // const noteToRemove = getElementByDataset('note', note.name, '.note', noteLocation);
  staff.notes = staff.notes.filter(staffNote => staffNote.name !== note.name)
  renderStaff(staff)
  // const bridge = staff.dom.querySelector('.bridge')
  // if (bridge) bridge.remove()
  // return noteLocation.removeChild(noteToRemove);
}

function buildNote() {
  const note = document.createElement('div')
  const noteBody = document.createElement('span')
  const stem = document.createElement('span')
  noteBody.classList.add('note-body')
  stem.classList.add('stem')
  noteBody.appendChild(stem)
  note.appendChild(noteBody)
  return note
}

function createNote(name, type) {
  // const noteToPlace = '<span class="note-body"><span class="stem"></span></span>';
  let note = noteTemplate.cloneNode(true)
  addClass('note', note)
  return note
}

function attachLabels(note, name, type) {
  setAttributes(note, {
    'data-type': type,
    'data-note': name,
    'data-accidental': accidental(name)
  })
}

function accidental(name) {
  return isSharp(name) ? 'sharp' : 'none';
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
  return staff.notes[staff.notes.indexOf(note) - 1]
}

function calculateNoteType(noteOne, noteTwo) {
  const end = noteTwo ? noteTwo.location : 16
  const spacesToFill = end - noteOne.location
  let noteType;
  switch (spacesToFill) {
    case 16:
      noteType = 'whole'
      break;
    case 15:
      noteType = 'half'
      addClass('dotted', noteOne.dom)
      // tied to dotted eigth
      break
    case 14:
      noteType = 'half'
      addClass('dotted', noteOne.dom)
      // tied to eigth
      break;
    case 13:
      noteType = 'half'
      addClass('dotted', noteOne.dom)
      //tied to a sixteenth
      break
    case 12:
      noteType = 'half'
      addClass('dotted', noteOne.dom)
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
      addClass('dotted', noteOne.dom)
      // tied to a sixteenth
      break
    case 6:
      noteType = 'quarter'
      addClass('dotted', noteOne.dom)
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
      addClass('dotted', noteOne.dom)
      if (noteTwo) {
        let prevNote = getPreviousNote(noteOne)
        console.log(prevNote)
        if (prevNote) {
          handleBridging(noteOne, prevNote)
        }
      }
      break
    case 2:
      noteType = 'eigth'
      if (noteTwo) {
        let prevNote = getPreviousNote(noteOne)
        console.log(prevNote)
        if (prevNote) {
          handleBridging(noteOne, prevNote)
        }
      }
      break
    case 1:
      noteType = 'sixteenth'
      if (noteTwo) {
        let prevNote = getPreviousNote(noteOne)
        console.log(prevNote)
        if (prevNote) {
          handleBridging(noteOne, prevNote)
        }
      }
      break
  }
  setAttributes(noteOne.dom, {
    'data-type': noteType
  })
  return noteType
}