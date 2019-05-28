console.log("field_types.js loaded");

const NUL = 0; //nothing = empty
const MAN = 1; //mana
const ATT = 2; //attack
const DEF = 3; //defense
const MOV = 4; //move
const POI = 5; //poison
const ANT = 6; //anti poison <-- if there are 3+ poisons next to each other we make it to anti poison
const PRO = 7; //promoted
const PMA = 11; //promoted mana
const PAT = 12; //promoted attack
const PDE = 13; //promoted defense
const PMO = 14; //promoted move
const JOK = 15; //joker
const PJO = 16; //promoted joker
const SJO = 17; //stun joker
