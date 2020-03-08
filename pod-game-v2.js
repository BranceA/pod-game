// Keep all new variables up here for organization
// For testing we can come up here and set up where we want the player to be by changing the starting value

var inventory = ['<ul>', '</ul>'];
var availableActions = ['<ul>', '<li>', 'Look', '</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');
var inventoryAside = document.getElementById('inventory-aside');
var whatRoomWeIn = 'pageload';
var isGlassSmashed = false;
var firstCommand = false;
var didHammerGetGot = false;
var tutorialButtonPushed = false;
var didStandUp = false;
var mooseStatus = "unseen";
var earringsStatus = "unseen";
var staffStatus = "ground";
var fishingPoleStatus = "none";
var eastKeyStatus = "under";
var decidedOnTutorial = false;
var babelFish = false;

let roomIndex = 0;
let actions = new Map()




window.onload = document.getElementById('text-input').select();
actions.set("look", 0)

commandsFooter.innerHTML = availableActions.join(" ");

// Event listener on textbox fires when player presses enter and calls function to find keywords

submitButton.addEventListener('click', checkKeyWords);
submittedText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
    }
});

// First index point is what room we are in
// 0: Outside tutorial
// 1: Inside tutorial
// 2: Center
const textOptions = []

// Second index point is what actor the player is interacting with.
// index point 0 will have a list of actors and will be referenced by the function looking for keywords

// Third index point is the action that the player is taking.
// Constants are 0: look 1: go 2: get 3: use


function findKeyWords(){
    const actors = textOptions[roomIndex][0]
    const checkThisText = submittedText.value;
    



}