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
let actions = ["look"]




window.onload = document.getElementById('text-input').select();

commandsFooter.innerHTML = availableActions.join(" ");

// Event listener on textbox fires when player presses enter and calls function to find keywords

submitButton.addEventListener('click', findKeyWords);
submittedText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
    }
});

// This let's you add items. Pass the arguments as strings and it will add to the inventory and the list of available
// actions. It incorporates the strings well enough to make them keywords.

function youGotAnItem(itemName, itemAction) {
    if (inventory.includes(itemName) === true) {
        $(".big-text").hide().html('You already have that.').fadeIn(800);
    } else {
        // This may need refactor later with new setup.
        availableActions.pop();
        availableActions.push('<li>');
        availableActions.push(itemAction);
        availableActions.push('</li>');
        availableActions.push('</ul>');
        commandsFooter.innerHTML = availableActions.join(" ");
        inventory.pop();
        inventory.push('<li>');
        inventory.push(itemName);
        inventory.push('</li>');
        inventory.push('</ul>');
        inventoryAside.innerHTML = inventory.join(" ");
    }
}

// This let's you add to the action list without adding an item. I was using it for the tutorial but not sure if it's
// going to be used much now.

function addNewCommand(newAction) {
    if (availableActions.includes(newAction) === true) {
        return "oops";
    } else {
        // Add code to update new actions array without html elements
        availableActions.pop();
        availableActions.push('<li>');
        availableActions.push(newAction);
        availableActions.push('</li>');
        availableActions.push('</ul>');
        commandsFooter.innerHTML = availableActions.join(" ");
    }
}

// This takes away the item from the inventory and the action that came with it. Pass the arguments as strings and make
// sure they are spelled correctly and capitalized correctly. If you do that then it just works.

function removeItemAndCommand(itemName, itemAction) {
    var itemPosition = inventory.indexOf(itemName) - 1;
    var actionPosition = availableActions.indexOf(itemAction) - 1;
    if (inventory.includes(itemName)) {
        inventory.splice(itemPosition, 3);
        inventoryAside.innerHTML = inventory.join(" ");
        availableActions.splice(actionPosition, 3);
        commandsFooter.innerHTML = availableActions.join(" ");
    }
}

// This allows you to add a new Item without an action.
function addNewItem(newItem) {
    if (inventory.includes(newItem) === true) {
        return "oops";
    } else {
        inventory.pop();
        inventory.push('<li>');
        inventory.push(newItem);
        inventory.push('</li>');
        inventory.push('</ul>');
        inventoryAside.innerHTML = inventory.join(" ");
    }
}

// Removes an item and nothing else
function removeOneItem(itemName) {
    var itemPosition = inventory.indexOf(itemName) - 1;
    if (inventory.includes(itemName)) {
        inventory.splice(itemPosition, 3);
        inventoryAside.innerHTML = inventory.join(" ");
    }
}

// If player doesn't choose to play tutorial this catches the game up to where it should be
function skipToCenter() {
    addNewCommand("Go");
    addNewCommand("Get");
    addNewCommand("Use");
    actions[1] = "go"
    actions[2] = "get"
    actions[3] = "use"
}

// This is a shenanigan. Don't worry about it.

function gameOver() {
    $(".big-text").hide().html("<h1>GAME OVER</h1>").fadeIn(800);
}

// First two arguments are the names of the items being combined and are removed from the inventory
// Third argument is the name of the combined item
// Does not add action with new combined item
function itemCombine(itemOne, itemTwo, combinedItem) {
    removeOneItem(itemOne);
    removeOneItem(itemTwo);
    addNewItem(combinedItem);
    $(".big-text").hide().html("You fiddle around for a while and you combine " + itemOne + " and " + itemTwo + " into " + combinedItem).fadeIn(800);
    submitButton.disabled = false;
    submittedText.value = '';
}

// Function converts text to pig latin
function pigLatinify(text){
    var splitText = text.split(" ");

    splitText.forEach(function(word, i) {
        if(word.length === 1){
            splitText[i] = word + "ay"
        }else if(word.substring(0, 1) === "<"){
            
        }else if(word.charAt(word.length - 1) === "."){
            splitText[i] = word.substring(1, word.length - 1) + word.substring(0, 1) + "ay."
        }else{
            splitText[i] = word.substring(1) + word.substring(0, 1) + "ay"
        }
    });

    return splitText.join(" ");
}

// First index point is what room we are in
// 0: Outside tutorial
// 1: Inside tutorial
// 2: Center

// Second index point is what actor the player is interacting with.
// index point 0 will have a list of actors and will be referenced by the function looking for keywords
// index point 1 will have default actions if the player did not include an actor in the submitted text

// Third index point is the action that the player is taking.
// Constants are 0: look 1: go 2: get 3: use

// New function to check the players text for keywords
// Instead of stopping as soon as it finds two keywords it checks if there are too many so there is no confusion as to which action the player is taking
function findKeyWords(){
    if(!decidedOnTutorial){
        dealWithTutorial();
    }else{

    const actors = textOptions[roomIndex][0]
    const checkThisText = submittedText.value.toLowerCase();
    submittedText.value = "";
    let actorIndex = null;
    let actionIndex = null;
    let tooManyCommands = false;
    let displayText = "";
    
    for(let actor of actors){
        if(checkThisText.indexOf(actor) !== -1 && actorIndex !== null){
            tooManyCommands = true;
        }else if(checkThisText.indexOf(actor) !== -1 && actorIndex === null){
            // +1 because 0 index is is the array of actors and 1 index is default actions
            actorIndex = actors.indexOf(actor) + 2;
        }
    }

    if(actorIndex === null){
        // Use default actions
        // Actor index will only be null if no actor was found in the player's text
        actorIndex = 1;
    }

    for(let action of actions){
        if(checkThisText.indexOf(action) !== -1 && actionIndex !== null){
            tooManyCommands = true;
        }else if(checkThisText.indexOf(action) !== -1 && actionIndex === null){
            actionIndex = actions.indexOf(action);
        }
    }

    // This each index point of the array will have a function that returns a block of text
    if(tooManyCommands){
        displayText = "Calm down and do one thing at a time. Pick one thing to interact with and one thing to do."
    }else{
        console.log(roomIndex)
        console.log(actorIndex)
        console.log(actionIndex)
        displayText = textOptions[roomIndex][actorIndex][actionIndex]();
    }

    $(".big-text").hide().html(displayText).fadeIn(800);
}

function dealWithTutorial(){
    const checkThisText = submittedText.value.toLowerCase();
    let displayText = "";
    submittedText.value = "";
    if(checkThisText.toLowerCase().indexOf("yes") !== -1){
        decidedOnTutorial = true;
        roomIndex = 0;
        displayText = textOptions[0][1][0]();
    }else if(checkThisText.toLowerCase().indexOf("no") !== -1){
        decidedOnTutorial = true;
        skipToCenter();
        roomIndex = 2;
        displayText = "Doesn't work yet"
    }else{
        displayText = "It's a yes or no question. Do you want to play a tutorial. It's starting to seem like you should."
    }
    $(".big-text").hide().html(displayText).fadeIn(800);
}
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
        function(){return "Good luck going there."}
    ],
    // For the door
    [
        function(){
            actions[1] = "go";
            addNewCommand("Go");
            return "This is a standard issue <em>door</em>. It's unlocked and it leads to the tutorial. I'm a nice guy. I just gave you the ability to <em>go</em> places. The tutorial is still <em>north</em> so why don't you <em>go north</em>."
        },
        function(){return "You go up to the <em>door</em> in preparation to go <em>north</em>"}
    ],
    // For north
    [
        function(){return "You look <em>north</em> and see a <em>door</em>. You should <em>go north</em>"},
        function(){
            roomIndex = 1;
            actions[2] = "get"
            addNewCommand("Get");
            return "So far so good. You are now in the tutorial proper. You hear the door behind you lock and shortly after you hear the room you came from cave in, become radioactive and fade from reality. You weren't supposed to be there anyway. This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it. Look at that. I let you <em>get</em> things. You're smart. Have fun.";
        }
    ]
]

const insideTutorial = [
    ["button", "door", "glass", "hammer", "north", "south"],
    [
        function(){
            if(!isGlassSmashed && !didHammerGetGot){
                return "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it."
            }else if(isGlassSmashed && !didHammerGetGot){
                return "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there was a <em>hammer</em> next to it."
            }else if(isGlassSmashed && didHammerGetGot){
                return "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. There is shattered <em>glass</em> and a small <em>hammer</em> on the ground"
            }
        },
        function(){return "Good luck going there."},
        function(){return "You try your best but you just don't get it."},
        function(){return "The functionality of this is beyond you and you do not know how to use it."}
    ],
    [
        function(){
            if(!isGlassSmashed){
                return "It's red round and pressable. If only that dang <em>glass</em> wasn't in the way."
            }else if(isGlassSmashed){
                return "Though the <em>button</em> can't move, speak or think, you're pretty sure it is grateful to be freed."
            }
        },
        function(){return "You travel for many feet and arrive at the button."},
        function(){return "You try to pry the button off the wall but to no avail."},
        function(){
            if(!isGlassSmashed){
                return "You poke at the button real good. If it wasn't for that <em>glass</em> then you would have pushed the hell out of that button."
            }else if(isGlassSmashed){
                tutorialButtonPushed = true;
                return "You hear a click. If I were a bettin man, I'd say that <em>door</em> is unlocked. The real game is to the <em>north</em>. If you think this game is going to be hard, don't worry about dying. We have a top notch cleaning crew."
            }
        }
    ]
]

// All blocks of text are being stored in this array to eliminate the need to write most of the current conditions
// Separating some of the 3d array for organization
const textOptions = [outsideTutorial, insideTutorial]