//Almost all code here taken straight from year 12 assesment

//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
  'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules


import { initializeApp }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { signOut }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { get }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { update }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { query, orderByChild, limitToFirst, onValue }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/




export {
  fb_initialise,
  fb_authenticate,
  fb_detectloginchange,
  fb_detectloginchangeregister,
  fb_detectloginchangeGameMenu,
  fb_DeleteRec,
  fb_WriteRec,
  fb_createGame,
  fb_readListener,
  fb_GuessTheNumberGame,
  fb_sendplayertogame,
  fb_detectloginchangeGTN,
  fb_cancelgame,
  fb_sortedread,
  fb_WriteScore,
  fb_WriteScore1,
  fb_WriteRecPrivate,
  fb_sortedreadcoin,
  fb_generaterandomnumber,
  fb_detectloginchangenumber
 
};
/******************************************************/
// fb_login()
// Called by html LOGIN button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
  console.log('%c fb_initialise(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const firebaseConfig = {
    apiKey: "AIzaSyA3npLrDl0XMDq66G7K1iyNLXhervsK0DU",
    authDomain: "caleb-lowe-13comp.firebaseapp.com",
    databaseURL: "https://caleb-lowe-13comp-default-rtdb.firebaseio.com",
    projectId: "caleb-lowe-13comp",
    storageBucket: "caleb-lowe-13comp.firebasestorage.app",
    messagingSenderId: "486660971961",
    appId: "1:486660971961:web:c6f46cda55d839d9612a68"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firebaseGameDB = getDatabase(app);
  console.info(firebaseGameDB);

}

var currentUser = null;
var userId = null;
function fb_authenticate() {
  console.log('%c fb_authenticate(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();





  const PROVIDER = new GoogleAuthProvider();

  // The following makes Google ask the user to select the account

  PROVIDER.setCustomParameters({

    prompt: 'select_account'

  });

  signInWithPopup(AUTH, PROVIDER).then((result) => {

    //✅ Code for a successful authentication goes here
    console.log("successful authentication")
    currentUser = result.user;
    userId = currentUser.uid;
    console.log(userId)

  })

    .catch((error) => {

      //❌ Code for an authentication error goes here
      console.log("authentication error: " + error)

    });

};
function fb_detectloginchangeGameMenu() {
  console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      fb_getUsername();
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
    } else {
      console.log("⚠️ Not logged in — redirecting to registration.html");
      location.href = "registration.html";
    }
  }, (error) => {
    console.error("❌ Auth detection error:", error);
  });
};



function fb_detectloginchange() {
  console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
    } else {
      console.log("⚠️ Not logged in — redirecting to registration.html");
      location.href = "registration.html";
    }
  }, (error) => {
    console.error("❌ Auth detection error:", error);
  });
};

function fb_detectloginchangeregister() {
  console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
      location.href = "gameMenu.html";

    } else {
      console.log("⚠️ Not logged in — redirecting to registration.html");
      location.href = "registration.html"
    }
  }, (error) => {
    console.error("❌ Auth detection error:", error);
  });
};






function fb_WriteScore1(userScoregamethatworks) {
  const DB = getDatabase();
  const highScoreRefgamethatworks = ref(DB, "Public/" + userId + "/userHighScoregamethatworks");
  const userRefgamethatworks = ref(DB, "Public/" + userId);

  get(highScoreRefgamethatworks).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
    const prevHighgamethatworks = snap.exists() ? snap.val() : 0;
    const highScoregamethatworks = userScoregamethatworks > prevHighgamethatworks ? userScoregamethatworks : prevHighgamethatworks;

    update(userRefgamethatworks, {
      userScoregamethatworks: userScoregamethatworks,
      userHighScoregamethatworks: highScoregamethatworks
    }).then(() => {
      console.log("written")
    });
  });
}
function fb_WriteScore(userScore) {
  const DB = getDatabase();
  const highScoreRef = ref(DB, "Public/" + userId + "/userHighScoreCaverun");
  const userRef = ref(DB, "Public/" + userId);
  console.log("Score written")
  get(highScoreRef).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
    const prevHigh = snap.exists() ? snap.val() : 0;
    const highScore = userScore > prevHigh ? userScore : prevHigh;


    update(userRef, {
      userScoreCaverun: userScore,
      userHighScoreCaverun: highScore
    }).then(() => {
      console.log("written")
    });
  });

}




function fb_WriteRec() {
  const AUTH = getAuth();
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var birthday = document.getElementById("birthday").value;
  //if the users name is invalid, age is invalid or gender is invalid they are given an alert and can not continue to the next page
  if (!currentUser || name == "" || name == null || !isNaN(name) || age == null || age == "" || isNaN(age) || gender == "" || gender == null || !isNaN(gender)) {
    alert("You must be logged in and enter a valid name and gender (must have only letters) and a valid age (must have only numbers).")
    return;
  }




  console.log('%c fb_WriteRec(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase()

  const dbReference = ref(DB, "Public/" + userId);

  update(dbReference, { Name: name }).then(() => {

    //✅ Code for a successful write goes here
    console.log("successful write")


  }).catch((error) => {

    //❌ Code for a write error goes here
    console.log("Writing error")
  });
  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      update(dbReference, { Photo: user.photoURL }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")


      }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
      });
    } else {
      console.log("⚠️ Not logged in — redirecting to index.html");
      location.href = "registration.html";
    }
  },
    (error) => {
      console.error("❌ Auth detection error:", error);
    });


}

function fb_WriteRecPrivate() {
  const AUTH = getAuth();
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var birthday = document.getElementById("birthday").value;


  const DB = getDatabase();
  const dbReference = ref(DB, "Private/" + userId);

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, gender);
      update(dbReference, { Email: user.email, Emaildisplayname: user.displayName, Age: age, Gender: gender, Birthday: birthday }).then(() => {
        location.href = 'gameMenu.html'
        console.log("hello")
        //✅ Code for a successful write goes here
        console.log("successful write")


      }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
      });
    } else {
      console.log("⚠️ Not logged in — redirecting to index.html");
      location.href = "index.html";
    }
  },
    (error) => {
      console.error("❌ Auth detection error:", error);
    });
};








//some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
function fb_sortedread() {
  console.log('%c fb_sortedread(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase();
  const sortKey = "userHighScoreCaverun";
  const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey));
  const table = document.getElementById("highScoreTableLibrary");
  table.innerHTML = "";

  get(dbReference).then((snapshot) => {
    var rank = 1;
    const users = [];
    snapshot.forEach((userSnap) => {
      users.push(userSnap.val());
    });
    users.reverse();
    users.forEach((obj) => {
      table.innerHTML += "<tr><td>" + rank + "</td><td>" + obj.Name + "</td><td>" + obj.userHighScoreCaverun + "</td></tr>";
      rank++;
    });
  }).catch((error) => {
    console.log("Sorting failed", error);
  });
}

function fb_sortedreadcoin() {
  console.log('%c fb_sortedreadcoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase();
  const sortKey = "userHighScoregamethatworks";
  const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey));
  const table = document.getElementById("highScoreTableCoin");
  table.innerHTML = "";

  get(dbReference).then((snapshot) => {
    var rank = 1;
    const users = [];
    snapshot.forEach((userSnap) => {
      users.push(userSnap.val());
    });
    users.reverse();
    users.forEach((obj) => {
      table.innerHTML += "<tr><td>" + rank + "</td><td>" + obj.Name + "</td><td>" + obj.userHighScoregamethatworks + "</td></tr>";
      rank++;
    });
  }).catch((error) => {
    console.log("Sorting failed", error);
  });
}

function fb_DeleteRec() {
  console.log('%c fb_DeleteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase()

  const dbReference = ref(DB, "Private/" + userId);

  remove(dbReference).then(() => {

    //✅ Code for a successful delete goes here
    console.log("Record Deleted");

  }).catch((error) => {

    //❌ Code for a delete error goes here
    console.log("ERROR: DeleteRec")

  });

}


function fb_getUsername() {
  const DB = getDatabase();
  const dbReference = ref(DB, "Public/" + userId + "/Name");
  get(dbReference).then((data) => {
    var fb_data = data.val();
    //puts the users name in the console log
    console.log(fb_data);
    //where the name is put onto the page
    namedIndex.innerHTML = "Play my games " + fb_data;
  });


}

function fb_createGame() {
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/" + userId);
  //updates the database
  update(dbReference, { Full: false }).then(() => {
    location.href = "GTNloadingpage.html";
    //shows if it successfully writes
    console.log("written")
  }).catch((error) => {
    //shows if it fails to send to the database
    console.log("error while trying to create game")
  });


}

function fb_cancelgame() {
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/" + userId);
  //update the database and sets the playerstatus to full, then it sends the player back to the GTNlobby
  update(dbReference, { Full: true }).then(() => {
    //just here to ensure that the player is actually sent back to the lobby, don't actually need
    location.href = "GTNlobby.html";
    //shows if it successfully writes
    console.log("written")
  }).catch((error) => {
    //shows if it fails to send to the database
    console.log("error while trying to cancel game")
  });
}

function fb_readListener() {
  console.log("Setting up listener")
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/");
  onValue(dbReference, (snapshot) => {
    //getting the playerstatus (Full or not) data from database
    var playerstatus = snapshot.val();
    if (playerstatus != null) {

      console.log("successfully reading")
      var GTNbuttons = window.document.getElementById("GTNbuttons");
      //creating the buttons
      GTNbuttons.innerHTML = null
      console.log(playerstatus)
      let GTNactivegames = Object.keys(playerstatus)
      console.log(GTNactivegames);
      //creating a loop so that the buttons are added and updated
      for (var i = 0; i < GTNactivegames.length; i++) {
        let key = GTNactivegames[i]
        console.log(key)
        console.log("hello")

        if (playerstatus[key]["Full"] == false) {
          GTNbuttons.innerHTML += "<button onclick=fb_GuessTheNumberGame('" + key + "')>" + key + "</button>"
        }
      };




    }
  })
}

function fb_GuessTheNumberGame(player) {
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/" + player);
  //updated the database to set the game status to full then send the player to the game
  update(dbReference, { Full: true }).then(() => {
    location.href = ("GTNgame.html")
})
}

function fb_sendplayertogame() {
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/" + userId);

  onValue(dbReference, (snapshot) => {
    var playerstatus = snapshot.val();
    //if the game is full then it will send the user who filled the game to gameGTN
  if (playerstatus["Full"] == true) {
    location.href = "GTNlobby.html"
          
        }

  })
}



function fb_detectloginchangeGTN() {
  console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
      fb_sendplayertogame();
    } else {
      console.log("⚠️ Not logged in — redirecting to registration.html");
      location.href = "registration.html";
      
    }
  }, (error) => {
    console.error("❌ Auth detection error:", error);
  });
};


function fb_detectloginchangenumber() {
  console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      currentUser = user;
      userId = user.uid;
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
      fb_generaterandomnumber()
    } else {
      console.log("⚠️ Not logged in — redirecting to registration.html");
      location.href = "registration.html";
      
    }
  }, (error) => {
    console.error("❌ Auth detection error:", error);
  });
};


function GTNgamestart(guessNumber) {
console.log("test, this is from GTNgamestart " + guessNumber)
}

function fb_generaterandomnumber() {
const AUTH = getAuth(); 
const DB = getDatabase();
const dbReference = ref(DB, "games/GTN/number/" + userId);
const guessNumber = Math.ceil(Math.random() * 100);
//generates number between 1 and 100
console.log(guessNumber)
update(dbReference, { Number: guessNumber }).then(() => {
console.log("Successfully sent number")
GTNgamestart(guessNumber);
//updates the database with the new generated number
})
};


function playerturns() {


}
/**************************************************************/
// END OF CODE
/**************************************************************/