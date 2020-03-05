const domKeys = Array.from(document.querySelectorAll('.keys'));
const staffKeys = Array.from(document.querySelectorAll('.staff-line'));
var octave = 4

const notesObj = {
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
  "c4": {
    name: "c4",
    onKeyboard: domKeys[7],
    onStaff: staffKeys[13]
  },
  "c#4": {
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
  },
  "f#5": {
    name: "f#5",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g5": {
    name: "g5",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g#5": {
    name: "g#5",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a5": {
    name: "a5",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a#5": {
    name: "a#5",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "b5": {
    name: "b5",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c6": {
    name: "c6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c#6": {
    name: "c#6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d6": {
    name: "d6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d#6": {
    name: "d#6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "e6": {
    name: "e6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f6": {
    name: "f6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f#6": {
    name: "f#6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g6": {
    name: "g6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g#6": {
    name: "g#6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a6": {
    name: "a6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a#6": {
    name: "a#6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "b6": {
    name: "b6",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c7": {
    name: "c7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c#7": {
    name: "c#7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d7": {
    name: "d7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d#7": {
    name: "d#7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "e7": {
    name: "e7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f7": {
    name: "f7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f#7": {
    name: "f#7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g7": {
    name: "g7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g#7": {
    name: "g#7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a7": {
    name: "a7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a#7": {
    name: "a#7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "b7": {
    name: "b7",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c8": {
    name: "c8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c#8": {
    name: "c#8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d8": {
    name: "d8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d#8": {
    name: "d#8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "e8": {
    name: "e8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f8": {
    name: "f8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f#8": {
    name: "f#8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g8": {
    name: "g8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g#8": {
    name: "g#8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a8": {
    name: "a8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "a#8": {
    name: "a#8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "b8": {
    name: "b8",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c9": {
    name: "c9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "c#9": {
    name: "c#9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d9": {
    name: "d9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "d#9": {
    name: "d#9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "e9": {
    name: "e9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f9": {
    name: "f9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "f#9": {
    name: "f#9",
    onKeyboard: undefined,
    onStaff: undefined
  },
  "g9": {
    name: "g9",
    onKeyboard: undefined,
    onStaff: undefined
  },
}