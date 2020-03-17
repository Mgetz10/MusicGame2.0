function noteOn(note) {
  note.playing = true
  playNote(note.name);
  placeOnStaff(note, 'eigth');
  if (!note.onKeyboard) {
    console.warn('keyboard range not yet coded')
    return
  }
  addClasses({
    playing: [note.onKeyboard]
  });
}

function noteOff(note) {
  note.playing = false
  removeFromStaff(note, 'eigth')
  if (note.onKeyboard) removeClasses({
    playing: [note.onKeyboard]
  });
}

function playNote(note) {
  synthA.triggerAttackRelease(note, '8n');
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

function createSVG(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setAttributes(svg, {
    width: width,
    height: height
  })
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
  const prevNote = staff.notes[staff.notes.length - 2]
  const sameNoteType = note.type === prevNote.type
  if (!sameNoteType) return
  const alreadyBridged = prevNote.dom.classList.contains('bridged')
  const stem = note.dom.querySelector('.stem')
  const stemCoords = stem.getBoundingClientRect()
  if (!alreadyBridged) {
    const prevStem = prevNote.dom.querySelector('.stem')
    const prevStemCoords = prevStem.getBoundingClientRect()
    const firstNoteLower = prevStemCoords.y > stemCoords.y
    const higherStem = firstNoteLower ? stemCoords : prevStemCoords
    const svgHeight = Math.abs(prevStemCoords.y - stemCoords.y)
    const svgWidth = (stemCoords.x - prevStemCoords.x) + 2
    const bridge = {
      notes: [{
        dom: prevNote.dom,
      }, {
        dom: note.dom,
      }],
      dom: createSVG(svgWidth, svgHeight),
      top: higherStem.y,
      left: prevStemCoords.x,
      height: svgHeight,
      width: svgWidth
    }
    const bridgeLine = createLine(0, 0, svgWidth, 0)
    const noteLine = createLine(firstNoteLower ? '0' : svgWidth,
      '0',
      firstNoteLower ? '0' : svgWidth,
      svgHeight)
    const dummyLine = createLine(!firstNoteLower ? '0' : svgWidth,
      '0',
      !firstNoteLower ? '0' : svgWidth,
      '0')
    bridge.notes[0].stemLine = firstNoteLower ? noteLine : dummyLine
    bridge.notes[1].stemLine = firstNoteLower ? dummyLine : noteLine
    bridge.line = bridgeLine
    setStyles(bridge.dom, {
      top: `${bridge.top}px`,
      left: `${bridge.left}px`
    })
    addClasses({
      bridged: [note.dom, prevNote.dom],
      'note-line': [noteLine, dummyLine],
      bridge: [bridge.dom]
    })

    note.bridge = bridge
    prevNote.bridge = bridge
    bridge.dom.appendChild(bridgeLine)
    bridge.dom.appendChild(noteLine)
    bridge.dom.appendChild(dummyLine)
    staff.dom.appendChild(bridge.dom)
  } else {
    const bridge = prevNote.bridge
    const taller = stemCoords.y < bridge.top
    if (taller) {
      // update svg height
      const difference = bridge.top - stemCoords.y
      bridge.height += difference
      setAttributes(bridge.dom, {
        height: bridge.height
      })
      // update svg y
      bridge.top = stemCoords.y
      setStyles(bridge.dom, {
        top: stemCoords.y
      })
      // update note lines
      bridge.notes.forEach(note => {
        note.stemLine.y2.baseVal.value += difference
      });

    }
    // update svg X
    bridge.width = stemCoords.x - bridge.left
    bridge.dom.width.baseVal.value = bridge.width + 2
    // update bridgeline x
    bridge.line.x2.baseVal.value = bridge.width
    // new note line
    const noteLine = createLine(bridge.width,
      '0',
      bridge.width,
      stemCoords.y - bridge.top)
    note.bridge = bridge
    addClass(['note-line'], noteLine)
    addClass(['bridged'], note.dom)
    bridge.notes.push({
      dom: note.dom,
      stemLine: noteLine
    })
    bridge.dom.appendChild(noteLine)
  }
}

// function lowerMinusHigher