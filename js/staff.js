/*
New Strategy
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
const bridges = {}

function placeOnStaff(note, type, time) {
  if (!note.staffLine) {
    console.warn('out of range')
    return
  }
  const prevNote = staff.notes[staff.notes.length - 1]

  staff.notes.push({
    ...note,
    location: quantize(time),
    bridge: '' //handleBridging(noteObj, prevNote)
  })

  updateRelationships(staff)
  renderStaff(staff)
}

function renderStaff(staff) {
  staffLines.forEach(line => line.innerHTML = '')
  staff.notes.forEach(note => {
    const domNote = createNote()
    attachLabels(domNote, note.name, note.type)
    domNote.style.gridColumnStart = note.location
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
  let note = noteTemplate.cloneNode(true)
  addClass('note', note)
  return note
}

function attachLabels(note, name, type) {
  setAttributes(note, {
    'data-type': type[0],
    'data-dotted': type[1],
    'data-note': name,
    'data-accidental': accidental(name)
  })
}

function accidental(name) {
  return isSharp(name) ? 'sharp' : 'none';
}


const spaceConverter = {
  'whole': 16,
  'half': 8,
  'quarter': 4,
  'eigth': 2,
  'sixteenth': 1,
  16: 'whole',
  8: 'half',
  4: 'quarter',
  2: 'eigth',
  1: 'sixteenth',
}


const getPreviousNote = (note) => {
  return staff.notes[staff.notes.indexOf(note) - 1]
}

function updateRelationships(staff) {
  const notes = staff.notes
  const bar = beatEvery * 4
  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i]
    const noteAfter = notes[i + 1]
    const prevNote = notes[i - 1]
    let spacesToFill;
    let sameLocation;
    let sameType;
    if (noteAfter) {
      spacesToFill = noteAfter.location
      sameLocation = note.location === noteAfter.location
      sameType = note.type === noteAfter.type
    } else spacesToFill = 17
    if (sameLocation) {
      console.log(sameLocation)
      note.type = noteAfter.type
    } else {
      note.type = calculateSpaces(spacesToFill - note.location)
      console.log(note.type)
    }
    if (prevNote && bridgable(note, prevNote)) {
      let existingBridge = prevNote.bridge;
      if (existingBridge) {
        existingBridge.notes.push(note)
      } else {
        newBridge = bridges[prevNote.name] = {
          notes: [prevNote, note]
        }
        prevNote.bridge = newBridge;
        note.bridge = newBridge;
      }

    }
    console.log(note.location)
  }

  //detirmine 
  // distance from next note

}

function calculateSpaces(spaces) {
  // console.log(spaces)
  //perfect
  if (spaceConverter[spaces]) return [spaceConverter[spaces], false]
  //dotted
  const closestSpace = findClosestSpace(spaces)
  const mainNote = spaceConverter[closestSpace]
  const isDotNote = closestSpace + (closestSpace / 2) === spaces
  if (isDotNote) return [mainNote, isDotNote]
  //tied
  const tiedNote = calculateSpaces(spaces - closestSpace)
  return [mainNote, isDotNote, tiedNote]
}


function findClosestSpace(n) {
  //finds nearest power of 2
  return 1 << 31 - Math.clz32(n);
}