const keys = Array.from(document.querySelectorAll('.keys'));
keys.forEach(key => key.addEventListener('mousedown', handleTouch));
keys.forEach(key => key.addEventListener('touchstart', handleTouch));
keys.forEach(key => key.addEventListener('touchmove', handleTouch));
// keys.forEach(key => key.addEventListener('touchend', handleTouchUp));
keys.forEach(key => key.addEventListener('touchcancel', handleTouchUp));
keys.forEach(key => key.addEventListener('mouseup', handleTouchUp));
keys.forEach(key => key.addEventListener('mouseout', handleTouchUp));

function handleTouch(e) {
  const note = getNoteFromTarget(e.target)
  if (note.playing) noteOn(note)
}

function handleTouchUp(e) {
  const note = getNoteFromTarget(e.target)
  if (note.playing) noteOff(note)
}

function getNoteFromTarget(target) {
  const noteName = target.dataset.key
  return noteLookup[noteName]
}