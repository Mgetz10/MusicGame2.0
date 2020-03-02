const domKeys = Array.from(document.querySelectorAll('.keys'));
const staffKeys = Array.from(document.querySelectorAll('.staff-line'));
var octave = 4
var keyCodes = {
  '65': () => { return `c${octave}` },
  '87': () => { return `c#${octave}` },
  '83': () => { return `d${octave}` },
  '69': () => { return `d#${octave}` },
  '68': () => { return `e${octave}` },
  '70': () => { return `f${octave}` },
  '84': () => { return `f#${octave}` },
  '71': () => { return `g${octave}` },
  '89': () => { return `g#${octave}` },
  '72': () => { return `a${octave}` },
  '85': () => { return `a#${octave}` },
  '74': () => { return `b${octave}` },
  '75': () => { return `c${octave + 1}` },
  '79': () => { return `c#${octave + 1}` },
  '76': () => { return `d${octave + 1}` },
}

const notesObj = new Proxy({
  "f3": {
    name: "f3",
    onKeyboard: domKeys[0],
    onStaff: undefined
  },
  "f#3": {
    name: "f#3",
    onKeyboard: domKeys[1],
    onStaff: undefined
  },
  "g3": {
    name: "g3",
    onKeyboard: domKeys[2],
    onStaff: undefined
  },
  "g#3": {
    name: "g#3",
    onKeyboard: domKeys[3],
    onStaff: undefined
  },
  "a3": {
    name: "a3",
    onKeyboard: domKeys[4],
    onStaff: undefined
  },
  "a#3": {
    name: "a#3",
    onKeyboard: domKeys[5],
    onStaff: undefined
  },
  "b3": {
    name: "b3",
    onKeyboard: domKeys[6],
    onStaff: undefined
  },
  "c4|65": {
    name: "c4",
    onKeyboard: domKeys[7],
    onStaff: staffKeys[13]
  },
  "c#4|87": {
    name: "c#4",
    onKeyboard: domKeys[8],
    onStaff: staffKeys[13]
  },
  "d4": {
    name: "d4",
    onKeyboard: domKeys[9],
    onStaff: staffKeys[12]
  },
  "d#4": {
    name: "d#4",
    onKeyboard: domKeys[10],
    onStaff: staffKeys[12]
  },
  "e4": {
    name: "e4",
    onKeyboard: domKeys[11],
    onStaff: staffKeys[11]
  },
  "f4": {
    name: "f4",
    onKeyboard: domKeys[12],
    onStaff: staffKeys[10]
  },
  "f#4": {
    name: "f#4",
    onKeyboard: domKeys[13],
    onStaff: staffKeys[10]
  },
  "g4": {
    name: "g4",
    onKeyboard: domKeys[14],
    onStaff: staffKeys[9]
  },
  "g#4": {
    name: "g#4",
    onKeyboard: domKeys[15],
    onStaff: staffKeys[9]
  },
  "a4": {
    name: "a4",
    onKeyboard: domKeys[16],
    onStaff: staffKeys[8]
  },
  "a#4": {
    name: "a#4",
    onKeyboard: domKeys[17],
    onStaff: staffKeys[8]
  },
  "b4": {
    name: "b4",
    onKeyboard: domKeys[18],
    onStaff: staffKeys[7]
  },
  "c5": {
    name: "c5",
    onKeyboard: domKeys[19],
    onStaff: staffKeys[6]
  },
  "c#5": {
    name: "c#5",
    onKeyboard: domKeys[20],
    onStaff: staffKeys[6]
  },
  "d5": {
    name: "d5",
    onKeyboard: domKeys[21],
    onStaff: staffKeys[5]
  },
  "d#5": {
    name: "d#5",
    onKeyboard: domKeys[22],
    onStaff: staffKeys[5]
  },
  "e5": {
    name: "e5",
    onKeyboard: domKeys[23],
    onStaff: staffKeys[4]
  },
  "f5": {
    name: "f5",
    onKeyboard: domKeys[24],
    onStaff: staffKeys[3]
  }
}, {
  get: function (target, property, receiver) {

    for (let k in target)
      if (new RegExp(k).test(property))
        return target[k]

    return null

  }

}

)
