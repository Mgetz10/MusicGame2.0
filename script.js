const keys = Array.from(document.querySelectorAll('.keys'));
const distanceToScroll = document.querySelector(".keys[data-key='d5']");
distanceToScroll.scrollIntoView();

window.addEventListener('keydown', freePlay);
window.addEventListener('keyup', handleKeyUp);
keys.forEach(key => key.addEventListener('mousedown', freePlay));
keys.forEach(key => key.addEventListener('touchstart', freePlay));
keys.forEach(key => key.addEventListener('touchmove', freePlay));
// keys.forEach(key => key.addEventListener('touchend', handleKeyUp));
keys.forEach(key => key.addEventListener('touchcancel', handleKeyUp));
keys.forEach(key => key.addEventListener('mouseup', handleKeyUp));
keys.forEach(key => key.addEventListener('mouseout', handleKeyUp));
