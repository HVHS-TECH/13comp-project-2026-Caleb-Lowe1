//Some code here taken straight from year 12 assesment

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
  fb_detectloginchangenumber,
  fb_guestorhost,
  isplayerturn,
  gamestarttriggerlisteners




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
  const totalwins = ref(DB, "Public/" + userId + "/guessNumbertotalwins");
  const totallosses = ref(DB, "Public/" + userId + "/guessNumbertotallosses");
  //if the user doesn't have guessNumbertotalwins in the database then it is added and set to zero
  get(totalwins).then((snapshot) => {
    if (!snapshot.exists()) {
      set(totalwins, 0)
    }
  })
  //if the user doesn't have guessNumbertotallosses in the database then it is added and set to zero
  get(totallosses).then((snapshot) => {
    if (!snapshot.exists()) {
      set(totallosses, 0)
    }
  })
  update(dbReference, {
    Name: name,
    guessNumbertotalwins: 0
  }).then(() => {

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
  const hoststatus = ref(DB, "games/GTN/activegames/" + userId + "/hoststatus")
  //updates the database
  fb_generaterandomnumber();
  sessionStorage.getItem("hostId");
  update(dbReference, { Full: false }).then(() => {
    update(hoststatus, { hostId: userId })
    location.href = "GTNloadingpage.html";
    //shows if it successfully writes
    console.log("written")
  }).catch((error) => {
    //shows if it fails to send to the database
    console.log("error while trying to create game")
  });
  update(hoststatus, { isHost: true }).then(() => {
    console.log("User is the host")
  }
  )


}

function fb_cancelgame() {
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/" + userId);
  //update the database and sets the playerstatus to full, then it sends the player back to the GTNlobby
  location.href = "GTNlobby.html";
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

function fb_GuessTheNumberGame(hostId) {
  const DB = getDatabase();
  const hoststatus = ref(DB, "games/GTN/activegames/" + userId + "/hoststatus")
  const dbReference = ref(DB, "games/GTN/activegames/" + hostId);
  const guestref = ref(DB, "games/GTN/activegames/" + userId);
  const guessingnumber = ref(DB, "games/GTN/activegames/number/" + hostId + "/Number")
  const playerturn = ref(DB, "games/GTN/activegames/playerturn/" + userId)
  var guestId = userId;
  sessionStorage.setItem("hostId", hostId);


  update(playerturn, { Playerturn: false }).then(() => {
    console.log("successfully set playerturn to false")
  })


  get(guessingnumber).then((snapshot) => {
    var guessNumber = snapshot.val();
    sessionStorage.setItem("guessNumber", guessNumber);

    console.log(guessingnumber)
    console.log(snapshot.val())
    console.log(hostId)
    console.log("testguessingnumber")
  })
  update(dbReference, { guestId: userId }).then(() => {
    console.log("hello")
  })
  update(guestref, { hostId: hostId }).then(() => {
    console.log("Successfully sent hostId")
    //sends the hosts UID to the guest
  })

  //if the game is full then it will send the user who filled the game to gameGTN
  //updated the database to set the game status to full then send the player to the game
  update(dbReference, { Full: true }).then(() => {
    location.href = ("GTNgame.html")
  })

  update(hoststatus, { isHost: false }).then(() => {
    console.log("User is not the host")
  }
  )
}

function fb_sendplayertogame() {
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/" + userId);
  const host = ref(DB, "games/GTN/activegames/" + userId + "/host")
  const playerturn = ref(DB, "games/GTN/activegames/playerturn/" + userId)
  const getguestId = ref(DB, "games/GTN/activegames/" + userId + "/guestId");


  update(playerturn, { Playerturn: true }).then(() => {
    console.log("successfully set playerturn to true")
  })

  onValue(dbReference, (snapshot) => {
    var playerstatus = snapshot.val();
    //if the game is full then it will send the user who filled the game to gameGTN
    if (playerstatus["Full"] == true) {
      location.href = "GTNgame.html"
      update(host, { hostId: userId })


    }

  })
  //gets the guestId from the database then puts it into sessionStorage
  onValue(getguestId, (snapshot) => {
    var guestId = snapshot.val();
    sessionStorage.setItem("guestId", guestId);

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
      userlisteningforturn();
      gamestarttriggerlisteners();
      console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
    } else {
      console.log("⚠️ Not logged in — redirecting to registration.html");
      location.href = "registration.html";

    }
  }, (error) => {
    console.error("❌ Auth detection error:", error);
  });
};




function fb_generaterandomnumber() {
  const AUTH = getAuth();
  const DB = getDatabase();
  const dbReference = ref(DB, "games/GTN/activegames/number/" + userId);
  //generates a number between 1 and 100
  const guessNumber = Math.ceil(Math.random() * 100);
  //generates number between 1 and 100
  console.log(guessNumber)
  //puts the randomly generated number to the hosts sessionstorage
  sessionStorage.setItem("guessNumber", guessNumber);
  //updates the database with the new generated number
  update(dbReference, { Number: guessNumber }).then(() => {
    console.log("Successfully sent number")

  })
};



function writtennumberguest() {
  const DB = getDatabase();
  const writingthenumber = ref(DB, "games/GTN/activegames/numberguessed/" + userId);
  const userwinner = ref(DB, "games/GTN/activegames/winner/" + userId)
  //takes the guess from what the user submitted and turns it from a string to a number and defines it as a variable
  var guess = Number(document.getElementById("guess").value);
  const playerturn = ref(DB, "games/GTN/activegames/playerturn/" + userId)
  var playerguestguess;
  //takes hostId from sessionStorage to be used in this function
  let hostId = sessionStorage.getItem("hostId");
  //takes the randomly generated number from sessionStorage to be used in this function
  let guessNumber = Number(sessionStorage.getItem("guessNumber"));
  console.log(hostId)
  const playerturnhost = ref(DB, "games/GTN/activegames/playerturn/" + hostId)


  //checking if the guess is valid
  if ( isNaN(guess) || guess == " " || guess == null || guess <= 0 || guess >= 101) { alert("this is not a valid number, your guess must be between 1 and 100 please guess again") }
  else {
    //sends the players guess to the database
    update(writingthenumber, { Playerguess: guess }).then(() => {

      //✅ Code for a successful write goes here
      console.log("successful write")
      console.log(guess)


    }).catch((error) => {

      //❌ Code for a write error goes here
      console.log("Writing error")
    })

    //if the user guesses the correct number they win
    if (guess == guessNumber) {

      console.log("Congrats! You win")
      console.log("guessnumber " + guessNumber)
      update(userwinner, { iswinner: true })
    }
    //if the user guesses too high they are told so
    else if (guess > guessNumber) {
      console.log("Too high")
      console.log("guessnumber " + guessNumber)
      playerguess.innerHTML = "Your last guess was " + guess + ", this guess was too high"
    }
    //if the user guesses too low they are told so
    else if (guess < guessNumber) {
      console.log("Too low")
      console.log("guessnumber " + guess)
      playerguess.innerHTML = "Your last guess was " + guess + ", this guess was too low"
    }

    //sets Playerturn to false, sets the hosts turn to true
    update(playerturn, { Playerturn: false }).then(() => {
      console.log("successfully set playerturn to false")
      update(playerturnhost, { Playerturn: true })
    })




  }
}

function writtennumberhost() {
  const DB = getDatabase();
  const writingthenumber = ref(DB, "games/GTN/activegames/numberguessed/" + userId);
  const playerturn = ref(DB, "games/GTN/activegames/playerturn/" + userId)
  const userwinner = ref(DB, "games/GTN/activegames/winner/" + userId)
  var guess = Number(document.getElementById("guess").value);
  let guessNumber = Number(sessionStorage.getItem("guessNumber"))
  let guestId = sessionStorage.getItem("guestId");
  const playerturnguest = ref(DB, "games/GTN/activegames/playerturn/" + guestId)
  console.log(guestId)
  //checking if the guess is valid
  if (isNaN(guess) || guess == " " || guess == null || guess <= 0 || guess >= 101) { alert("this is not a valid number, your guess must be between 1 and 100 please guess again") }
  else {
    //sends the players guess to the database
    update(writingthenumber, { Playerguess: guess }).then(() => {

      //✅ Code for a successful write goes here
      console.log("successful write")
      console.log(guess)


    }).catch((error) => {

      //❌ Code for a write error goes here
      console.log("Writing error")
    })
    //sets Playerturn to false, sets guests turn to true
    update(playerturn, { Playerturn: false }).then(() => {
      console.log("successfully set playerturn to false")
      update(playerturnguest, { Playerturn: true })
    })

    //if the user guesses the correct number they win
    if (guess == guessNumber) {

      console.log("Congrats! You win")
      console.log("guessnumber " + guessNumber)
      update(userwinner, { iswinner: true })
    }
    //if the user guesses too high they are told so
    else if (guess > guessNumber) {
      console.log("Too high")
      console.log("guessnumber " + guessNumber)
      playerguess.innerHTML = "Your last guess was " + guess + ", this guess was too high"
    }
    //if the user guesses too low they are told so
    else if (guess < guessNumber) {
      console.log("Too low")
      console.log("guessnumber " + guessNumber)
      playerguess.innerHTML = "Your last guess was " + guess + ", this guess was too low"
    }

  }



}

function fb_guestorhost() {
  const DB = getDatabase();
  const hoststatus = ref(DB, "games/GTN/activegames/" + userId + "/hoststatus/");
  get(hoststatus).then((snapshot) => {
    const isuserhost = snapshot.val();
    console.log(isuserhost)
    //if the user is the host then it runs the function writtennumberhost
    if (isuserhost["isHost"] == true) {
      console.log("you are the host")
      writtennumberhost();
    }
    //if the user is the host then it runs the function writtennumberguest
    else if (isuserhost["isHost"] == false) {
      console.log("you are the guest")
      writtennumberguest();

    }
    //if there is an issue and isHost is null then an alert will appear
    else if (isuserhost["isHost"] == null) { alert("error, cannot determine if you are host or guest") }

  });
}


function userlisteningforturn() {
  const DB = getDatabase();
  const userTurn = ref(DB, "games/GTN/activegames/playerturn/" + userId)

  //if Playerturn is true then it updates the users html to say that it is their turn.
  onValue(userTurn, (snapshot) => {
    const userData = snapshot.val();
    if (userData != null && userData.Playerturn == true) {
      isitplayerturn.innerHTML = "It is your turn."
    }
    //if Playerturn is false then it updates the users html to say that it is not their turn
    else if (userData != null && userData.Playerturn == false) {
      isitplayerturn.innerHTML = "It is not yet your turn, please wait for your opponent to make their guess."
    }
  })
}

function isplayerturn() {
  const DB = getDatabase();
  const userTurn = ref(DB, "games/GTN/activegames/playerturn/" + userId)
  //getting information from the database that says if it is the players turn or not
  get(userTurn).then((snapshot) => {
    const isuserturn = snapshot.val();
    console.log(isuserturn);
    //if it is the players turn then the function fb_guestorhost is run if not then an alert appears telling the user to wait.
    if (isuserturn["Playerturn"] == true) { console.log(isuserturn); fb_guestorhost(); }
    else {
      alert("It is not your turn, please wait for your opponent to go.");
    }
  })
}

function gamestarttriggerlisteners() {
  const DB = getDatabase();
  const ishost = ref(DB, "games/GTN/activegames/" + userId + "/hoststatus")
  const userwinner = ref(DB, "games/GTN/activegames/winner/" + userId)
  get(ishost).then((snapshot) => {
    const isuserhost = snapshot.val();
    console.log(isuserhost);
    //ensuring that the userwinner is set to false so the game doesn't think the user immediately won
    update(userwinner, { iswinner: false }).then(() => { console.log("Successfully reset iswinner to false") })

    //if the user is the host then it starts running the winner listner
    if (isuserhost["isHost"] == true) {
      console.log("you are the host")
      winnerlistenerhost();
    }
    //if the user is the host then starts running the winner listener
    else if (isuserhost["isHost"] == false) {
      console.log("you are the guest")
      winnerlistenerguest();

    }

  })
}

function winnerlistenerguest() {
  const DB = getDatabase();
  let hostId = sessionStorage.getItem("hostId");
  const hostwinner = ref(DB, "games/GTN/activegames/winner/" + hostId)
  const userwinner = ref(DB, "games/GTN/activegames/winner/" + userId)
  let guessNumber = Number(sessionStorage.getItem("guessNumber"))
  const totalwins = ref(DB, "Public/" + userId + "/guessNumbertotalwins")
  const totallosses = ref(DB, "Public/" + userId + "/guessNumbertotallosses")
  //temporary just to check that they work
  console.log("winnerlistenerguest is running")


  onValue(userwinner, (snapshot) => {
    const userwin = snapshot.val();
    //if the user is the winner then it updates the database
    if (userwin != null && userwin.iswinner == true) {
      get(totalwins).then((snapshot) => {
        const userTotalwins = snapshot.val();
        //updates the users wins by adding one
        const usernewTotalwins = userTotalwins + 1;
        set(totalwins, usernewTotalwins).then(() => { console.log("successfully updated wins") })
        //alerts the user that they won and then sends them back to the lobby page
        update(userwinner, { iswinner: false }).then(() => { console.log("Successfully reset iswinner to false") })
      })
      alert("You win! The correct number was " + guessNumber)
      location.href = "./GTNlobby.html"
    }

  })

  onValue(hostwinner, (snapshot) => {
    const hostwin = snapshot.val();
    //alerts the user that they lost and then sends them back to the lobby page
    if (hostwin != null && hostwin.iswinner == true) {
      get(totallosses).then((snapshot) => {
        const userTotallosses = snapshot.val();
        //updates the users total losses by adding 1
        const usernewTotallosses = userTotallosses + 1;
        set(totallosses, usernewTotallosses).then(() => { console.log("successfully updated wins") })
      })
     update(userwinner, { iswinner: false }).then(() => { console.log("Successfully reset iswinner to false") })
      alert("You lost, your opponent guessed the correct number. The correct number was " + guessNumber)
      location.href = "./GTNlobby.html" 
    }
  })

}


function winnerlistenerhost() {
  const DB = getDatabase();
  let guestId = sessionStorage.getItem("guestId");
  const guestwinner = ref(DB, "games/GTN/activegames/winner/" + guestId)
  const userwinner = ref(DB, "games/GTN/activegames/winner/" + userId)
  let guessNumber = Number(sessionStorage.getItem("guessNumber"))
  const totalwins = ref(DB, "Public/" + userId + "/guessNumbertotalwins")
  const totallosses = ref(DB, "Public/" + userId + "/guessNumbertotallosses")
  //temporary just to check that they work
  console.log("winnerlistenerhost is running")

  onValue(userwinner, (snapshot) => {
    const userwin = snapshot.val();
    //if user is the winner then it will update the database 
    if (userwin != null && userwin.iswinner == true) {
      
      get(totalwins).then((snapshot) => {
        const userTotalwins = snapshot.val();
        //updates the wins by adding one
        const usernewTotalwins = userTotalwins + 1;
        set(totalwins, usernewTotalwins).then(() => { console.log("successfully updated wins") })
      })
      //setting iswinner to false early for the users next game
      update(userwinner, { iswinner: false }).then(() => { console.log("Successfully reset iswinner to false") })
      alert("You win! The corret number was " + guessNumber)
      location.href = "./GTNlobby.html"

    }
  })
  onValue(guestwinner, (snapshot) => {
    const guestwin = snapshot.val();
    //if the user is the loser then it will update the database
    if (guestwin != null && guestwin.iswinner == true) {
      get(totallosses).then((snapshot) => {
        const userTotallosses = snapshot.val();
        //updates the losses by adding one
        const usernewTotallosses = userTotallosses + 1;
        set(totallosses, usernewTotallosses).then(() => { console.log("successfully updated wins") })
      })
      update(userwinner, { iswinner: false }).then(() => { console.log("Successfully reset iswinner to false") })
      alert("You lost, your opponent guessed the correct number. The correct number was " + guessNumber)
      location.href = "./GTNlobby.html"
    }
  })






}



/**************************************************************/
// END OF CODE
/**************************************************************/