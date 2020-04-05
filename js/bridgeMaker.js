function handleBridging(note, prevNote) {
  if (!bridgable(note, prevNote)) return

  const alreadyBridged = prevNote.dom.classList.contains('bridged')
  const stemCoords = getStemCoords(note)

  if (!alreadyBridged) {
    const bridge = createBridge(prevNote, note)
    staff.dom.appendChild(bridge.dom)

  } else {
    const bridge = prevNote.bridge
    const bridgeFull = bridge.noteStems.length >= 4;
    if (bridgeFull) return

    updateBridgeHeight(bridge, stemCoords.y)

    // update svg width
    const newWidth = stemCoords.x - bridge.left
    updateSVGvalue(bridge.dom, {
      width: newWidth + 2
    })

    // update bridgeline
    bridge.lines.forEach((line) => {
      updateSVGvalue(line, {
        x2: newWidth
      })
    })

    // new note line
    drawNoteLines(bridge, [{
      x: newWidth + 1,
      width: stemCoords.y - bridge.top
    }])

    defineAsBridged([note], bridge)
  }
}

function updateBridgeHeight(bridge, incomingHeight) {
  const taller = incomingHeight < bridge.top
  const lower = incomingHeight > bridge.bottom
  if (!taller && !lower) return
  var newHeight;
  if (taller) {
    // update note lines
    const difference = bridge.top - incomingHeight
    updateStems(bridge.noteStems, difference)

    // update svg y
    bridge.top = incomingHeight
    setStyles(bridge.dom, {
      top: incomingHeight
    })

    // update svg height
    newHeight = bridge.bottom - incomingHeight
  } else if (lower) {
    bridge.bottom = incomingHeight
    newHeight = incomingHeight - bridge.top
  }
  updateSVGvalue(bridge.dom, {
    height: newHeight
  })
}

function updateSVGvalue(elem, value) {
  for (key in value) {
    elem[key].baseVal.value = value[key]
  }
}

function updateStems(stems, difference) {
  stems.forEach(stem => {
    stem.y2.baseVal.value += difference
  });
}

function createBridge(firstNote, secondNote) {
  const firstNoteCoords = getStemCoords(firstNote)
  const secondNoteCoords = getStemCoords(secondNote)
  const bridge = bridgeInit(firstNoteCoords, secondNoteCoords, firstNote.type)
  posAbs(bridge.dom, `${bridge.top}px`, `${bridge.left}px`)
  defineAsBridged([firstNote, secondNote], bridge)
  return bridge
}

function bridgeInit(firstNoteCoords, secondNoteCoords, type) {
  const bridge = {
    noteStems: [],
    top: Math.min(firstNoteCoords.y, secondNoteCoords.y),
    left: firstNoteCoords.x,
    bottom: Math.max(firstNoteCoords.y, secondNoteCoords.y),
    height: Math.abs(firstNoteCoords.y - secondNoteCoords.y),
    width: (secondNoteCoords.x - firstNoteCoords.x) + 2,
    type: type
  }
  bridge.dom = createDomBridge(bridge)
  drawNoteLines(bridge, [{
    x: '0',
    width: firstNoteCoords.y - bridge.top
  }, {
    x: bridge.width - 1,
    width: secondNoteCoords.y - bridge.top
  }])
  return bridge
}

function createBridgeSVG(width, height) {
  //buffer leaves space for 16th note bridge
  const bufferedHeight = height + 10;
  const bridge = createSVG(width, bufferedHeight)
  addClass(['bridge'], bridge)
  return bridge
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
  updateSVGvalue(line, {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  })
  return line
}

function createDomBridge(bridge) {
  const bridgeSVG = createBridgeSVG(bridge.width, bridge.height)
  const bridgeLines = createBridgeLine(bridge.width, bridge.type)
  bridgeLines.forEach((line) => {
    bridgeSVG.appendChild(line)
  })
  bridge.lines = bridgeLines;
  return bridgeSVG
}

function drawNoteLines(bridge, lineInfo) {
  lineInfo.forEach(info => {
    const line = createNoteLine(info.x, info.width)
    bridge.dom.appendChild(line)
    bridge.noteStems.push(line)
  })

}

function defineAsBridged(notes, bridge) {
  notes.forEach(note => {
    addClass(['bridged'], note.dom)
    note.bridge = bridge
  })
}

function getStemCoords(note) {
  const stem = note.dom.querySelector('.stem')
  return stem.getBoundingClientRect()
}

function bridgable(note, prevNote) {
  const validNoteType = note.type === 'eigth' || note.type === 'sixteenth'
  const sameNoteType = note.type === prevNote.type
  // const bridgeFull = prevNote.bridge.length(
  return validNoteType && sameNoteType
}

function createBridgeLine(width, type) {
  let lines = []
  if (type === 'eight') lines.push(createLine(0, 0, width, 0))
  else {
    lines.push(createLine(0, 0, width, 0), createLine(0, 15, width, 15))
    addClass(['bridge-line-sixteenth'], lines[1])
  }
  addClass(['bridge-line'], lines[0])
  return lines
}

function createNoteLine(x, height) {
  const line = createLine(x, 0, x, height)
  addClass(['note-line'], line)
  return line
}