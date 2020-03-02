
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

// navigator.requestMIDIAccess()
//   .then(onMIDISuccess, onMIDIFailure);

// function onMIDISuccess(midiAccess) {
//   for (var input of midiAccess.inputs.values()) {
//     input.onmidimessage = getMIDIMessage;
//   }
// }

// function getMIDIMessage(midiMessage) {
//   if(midiMessage.data[0] !== 248){
//     switch(midiMessage.data[1]){
//       case 48:
//         playKey("c4")
//     }
//     console.log(midiMessage.data);
//   }
// }
// function onMIDIFailure() {
//   console.log('Could not access your MIDI devices.');
// }