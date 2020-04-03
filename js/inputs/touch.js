const keys = Array.from(document.querySelectorAll('.keys'));
keys.forEach(key => {
  key.addEventListener('mousedown', handleTouch)
  key.addEventListener('touchstart', handleTouch)
  key.addEventListener('touchmove', handleTouch)
  key.addEventListener('touchcancel', handleTouchUp)
  key.addEventListener('mouseup', handleTouchUp)
  key.addEventListener('mouseout', handleTouchUp)
});

function handleTouch(e) {
  const note = getNoteFromTarget(e.target)
  if (!note.playing) noteOn(note)
}

function handleTouchUp(e) {
  const note = getNoteFromTarget(e.target)
  if (note.playing) noteOff(note)
}

function getNoteFromTarget(target) {
  const noteName = target.dataset.key
  return noteLookup[noteName]
}