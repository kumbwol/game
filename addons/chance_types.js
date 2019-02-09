console.log("chance_types.js loaded");

const LUCK     = 0; // basic luck
const RAGE     = 1; // less hp you have, more luck you have
const SPELL    = 2; // depends if you have enough mana on secondary skill
const BALANCE  = 3; // the less skill got played last turn, the more chance it will be played, doesnt count itself
const STUCK    = 4; // (stunned+paralyzed fields) / all fields
const DEVELOP  = 5; // (sum of rank levels) / (sum of max rank levels)
const WEAKNESS = 6; // depends on how many type of skills the player activated
