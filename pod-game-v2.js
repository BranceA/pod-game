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
// Need array not containing html elements
// Index points need to line up with where they fall on big array
let actions = []




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
const textOptions = [outsideTutorial]

// Second index point is what actor the player is interacting with.
// index point 0 will have a list of actors and will be referenced by the function looking for keywords
// index point 1 will have default actions if the player did not include an actor in the submitted text

// Third index point is the action that the player is taking.
// Constants are 0: look 1: go 2: get 3: use


function findKeyWords(){
    const actors = textOptions[roomIndex][0]
    const checkThisText = submittedText.value;
    let actorIndex = null;
    let actionIndex = null;
    
    for(let actor of actors){
        if(checkThisText.indexOf(actor) !== -1 && actorIndex === null){
            //return block of text to tell player to calm down and pick one thing
        }else if(checkThisText.indexOf(actor) !== -1 && actorIndex !== null){
            // +1 because 0 index is is the array of actors
            actorIndex = actors.findIndex(actor) + 1;
        }
    }

    if(actorIndex === null){
        // Use default actions
        // Actor index will only be null if no actor was found in the player's text
        actorIndex = 1;
    }

    for(let action of actions){
        if(checkThisText.indexOf(action) !== -1 && actionIndex === null){
            //return block of text to tell player to calm down and pick one thing
        }else if(checkThisText.indexOf(action) !== -1 && actionIndex !== null){
            actionIndex = actions.findIndex(action);
        }
    }

    // This each index point of the array will have a function that returns a block of text
    textOptions[roomIndex][actorIndex][actionIndex]()
}

// Outside tutorial does not have much
const outsideTutorial = [
    // Door and north are the only actors while outside tutorial
    ["door", "north"],
    // Index 1 is default actions. Look and go are the only actions ever available so there are only 2 index points
    [
        function(){
            if(firstCommand === false){
                firstCommand = true;
                return "Welcome to name pending. This is a text based adventure game. This means that you get the benefit of an awesome videogame with no annoying graphics to distract you and no confusing controller to get in your way. I accidentally dropped you outside the tutorial so I need you to work with me. Down below is a list of things you are currently able to accomplish. All you can do right now is <em>look</em>. Go ahead and try that out."
            } else {
                return "When you just <em>look</em>, you take a look at your surroundings. You are currently in a small, uniformly gray, cube shaped room. To the <em>north</em> you see a <em>door</em>. When you see a glowing italicized word like <em>this</em> then you can interact with it. The best (and only) way to do things is to type one of the actions you have available to you and whatever you want to interact with. Then hit enter. Go ahead and <em>look</em> at the <em>door</em>."
            }
        },
        function(){
            return "Good luck going there."
        }
    ],
    // For the door
    [
        function(){
            return "This is a standard issue <em>door</em>. It's unlocked and it leads to the tutorial. I'm a nice guy. I just gave you the ability to <em>go</em> places. The tutorial is still <em>north</em> so why don't you <em>go north</em>."
        },
        function(){
            return "You go up to the <em>door</em> in preparation to go <em>north</em>"
        }
    ],
    // For north
    [
        function(){
            return "You look <em>north</em> and see a <em>door</em>. You should <em>go north</em>"
        },
        function(){
            roomIndex = 1;
            return "go north text";
        }
    ]
]