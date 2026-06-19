/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by <Your Name Here>, Term 2 202?
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise }
    from './fb_io.mjs';
window.fb_initialise = fb_initialise;

import { fb_authenticate }
    from './fb_io.mjs';
window.fb_authenticate = fb_authenticate;

import { fb_WriteRecPrivate }
    from './fb_io.mjs';
window.fb_WriteRecPrivate = fb_WriteRecPrivate;

import { fb_detectloginchange }
    from './fb_io.mjs';
window.fb_detectloginchange = fb_detectloginchange;

import { fb_detectloginchangeGameMenu }
    from './fb_io.mjs';
window.fb_detectloginchangeGameMenu = fb_detectloginchangeGameMenu;

import { fb_detectloginchangeregister }
    from './fb_io.mjs';
window.fb_detectloginchangeregister = fb_detectloginchangeregister;

import { fb_WriteRec }
    from './fb_io.mjs';
window.fb_WriteRec = fb_WriteRec;

import { fb_WriteScore }
    from './fb_io.mjs';
window.fb_WriteScore = fb_WriteScore;

import { fb_DeleteRec }
    from './fb_io.mjs';
window.fb_DeleteRec = fb_DeleteRec;

import { fb_createGame }
    from './fb_io.mjs';
window.fb_createGame = fb_createGame;

import { fb_sortedread }
    from './fb_io.mjs';
window.fb_sortedread = fb_sortedread;

import { fb_sortedreadcoin }
    from './fb_io.mjs';
window.fb_sortedreadcoin = fb_sortedreadcoin;
import { fb_readListener }
    from './fb_io.mjs';
window.fb_readListener = fb_readListener;
import { fb_GuessTheNumberGame }
    from './fb_io.mjs';
window.fb_GuessTheNumberGame = fb_GuessTheNumberGame;

import { fb_sendplayertogame }
    from './fb_io.mjs';
window.fb_sendplayertogame = fb_sendplayertogame;


import { fb_detectloginchangeGTN }
    from './fb_io.mjs';
window.fb_detectloginchangeGTN = fb_detectloginchangeGTN;


import { fb_cancelgame }
    from './fb_io.mjs';
window.fb_cancelgame = fb_cancelgame;

import { fb_generaterandomnumber }
    from './fb_io.mjs';
window.fb_generaterandomnumber = fb_generaterandomnumber;

import { fb_detectloginchangenumber }
    from './fb_io.mjs';
window.fb_detectloginchangenumber = fb_detectloginchangenumber;

import { fb_guestorhost }
    from './fb_io.mjs';
window.fb_guestorhost = fb_guestorhost;

/**************************************************************/
// index.html main code
/**************************************************************/


/**************************************************************/
//   END OF CODE
/**************************************************************/