// Keep all new variables up here for organization
// For testing we can come up here and set up where we want the player to be by changing the starting value

let inventory = ['<ul>', '</ul>'];
let availableActions = ['<ul>', '<li>', 'Look', '</li>', '</ul>'];
let bigText = document.getElementById('big-text-text');
let commandsFooter = document.getElementById('commands-box');
let submitButton = document.getElementById('submit');
let submittedText = document.getElementById('text-input');
let inventoryAside = document.getElementById('inventory-aside');
let isGlassSmashed = false;
let firstCommand = false;
let didHammerGetGot = false;
let tutorialButtonPushed = false;
let didStandUp = true;
let mooseStatus = "unseen";
let earringsStatus = "unseen";
let staffStatus = "ground";
let fishingPoleStatus = "none";
let eastKeyStatus = "under";
let decidedOnTutorial = false;
let babelFish = false;
let checkThisText = "";

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
//0: look 
// 1: go 
// 2: get 
// 3: use
// 4: smash (for tutorial)

// New function to check the players text for keywords
// Instead of stopping as soon as it finds two keywords it checks if there are too many so there is no confusion as to which action the player is taking
function findKeyWords(){
    checkThisText = submittedText.value.toLowerCase();
    if(!decidedOnTutorial || !didStandUp){
        checkCertainActions();
    }else{

    const actors = textOptions[roomIndex][0]
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
        displayText = textOptions[roomIndex][actorIndex][actionIndex]();
    }
    $(".big-text").hide().html(displayText).fadeIn(800);
}

function checkCertainActions(){
    if(!decidedOnTutorial){
        dealWithTutorial();
    }else if(!didStandUp){
        playerNeedsToStand();
    }
}

function dealWithTutorial(){
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
        didStandUp = false;
        displayText = "Things could always be worse. Sure life hasn't been great lately. Five years ago the Dark Wizard Leslie, took over the world and reshaped it into a twisted hellscape. It was pretty unfortunate when Emperor Leslie the Terrible and Great, set up his Fortress of Power down the street from your house. Crime went down due to the tyrannical nature of Leslie but he also needs a never ending supply of humans to sacrifice to evil forces better left alone. That's where you come in. You were knocked out and when you woke up, you were tied right here on the ground with the sound of chanting. It doesn't take a genius to realize that you were the next sacrifice on the docket. Something caused an explosion and there was some screaming and now you seem to be by yourself. Like I said, things could be worse. You have been pulling on your restraints for a while and you finally get loose. To get a better idea of what is going on, you should <em>stand up</em>."
    }else{
        displayText = "It's a yes or no question. Do you want to play a tutorial. It's starting to seem like you should."
    }
    $(".big-text").hide().html(displayText).fadeIn(800);
}
}

function playerNeedsToStand(){
    if(checkThisText.toLowerCase().indexOf("stand") !== -1){
        didStandUp = true;
        displayText = "Sweet freedom. You take in your surroundings as you stretch. You are in a room with a bare stone floor and the <em>wall</em>s are covered in some kind of symbols. All things considered, this place doesn't seem too bad. The epicenter of dark magic is sparsely furnished. The only really disturbing thing in here is a shrunken <em>head</em> that is hanging from the ceiling. The center of the room is clear and you are standing in a red <em>circle</em> painted on the ground. There is a <em>podium</em> facing towards you. Near the <em>podium</em>, a <em>staff</em> is laying on the ground and the area surrounding the <em>staff</em> is blackened. The directions leading out are <em>east</em> and <em>west</em>. There is a <em>TBD barrier</em> to the <em>north</em> and <em>south</em>."
    }else{
        displayText = "That's a great idea but first you need to <em>stand up</em>."
    }
    $(".big-text").hide().html(displayText).fadeIn(800);
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
                return "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The <em>door</em> is still to the <em>north</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it."
            }else if(!isGlassSmashed && didHammerGetGot){
                return "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The <em>door</em> is still to the <em>north</em>. The button is covered by <em>glass</em> and there was a <em>hammer</em> next to it."
            }else if(isGlassSmashed && didHammerGetGot){
                return "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The <em>door</em> is still to the <em>north</em>. There is shattered <em>glass</em> and a small <em>hammer</em> on the ground"
            }
        },
        function(){return "Good luck going there."},
        function(){return "You try your best but you just don't get it."},
        function(){return "The functionality of this is beyond you and you do not know how to use it."},
        function(){return "You smash it as hard as you can with your tiny hammer. You hear a plink and there is no noticeable change."}
    ],
    [
        function(){
            if(!isGlassSmashed){
                return "It's red round and pressable. If only that dang <em>glass</em> wasn't in the way."
            }else if(isGlassSmashed){
                return "Though the <em>button</em> can't move, speak or think, you're pretty sure it is grateful to be freed."
            }
        },
        function(){return "You travel for many feet and arrive at the <em>button</em>."},
        function(){return "You try to pry the <em>button</em> off the wall but to no avail."},
        function(){
            if(!isGlassSmashed){
                return "You poke at the button real good. If it wasn't for that <em>glass</em> then you would have pushed the hell out of that button."
            }else if(isGlassSmashed){
                tutorialButtonPushed = true;
                return "You hear a click. If I were a bettin man, I'd say that <em>door</em> is unlocked. The real game is to the <em>north</em>. If you think this game is going to be hard, don't worry about dying. We have a top notch cleaning crew."
            }
        },
        function(){return "<em>Glass</em> is still in the way. One thing at a time."}
    ],
    [
        function(){return "It's the same <em>door</em> except this one is locked. You don't see a keyhole anywhere."},
        function(){return "It's not a big room. It doesn't take you long to go to the <em>door</em>."},
        function(){return "You inspect the door and come to the conclusion that you do not have the tools to remove the <em>door</em> from where it fastened, nor can you think of a good use for a <em>door</em> and taking it with you is unweildy to say the least."},
        function(){
            if(!tutorialButtonPushed){
                return "You jiggle the handle a bit but this <em>door</em> is locked as hell."
            }else if(tutorialButtonPushed){
                return "My God. The <em>door</em> is open. You can't quite see what lies ahead but you should <em>go north</em> and find out."
            }
        },
        function(){return "Wow you are actually trying to break through this <em>door</em> with a <em>hammer</em>. I was joking. You take your fun sized whacking tool and really go to town on that door. If somebody is on the other side, they might hear you knocking. Try <em>smash</em>ing the <em>glass</em>"}
    ],
    [
        function(){
            if(!isGlassSmashed){
                return "It's <em>glass</em> and it's preventing you from pressing the button. What else do you want?"
            }else if(isGlassSmashed){
                return "You look at the ground and admire your work. Too bad there weren't any witnesses to your battle against the glass. Songs would have been written. You would have gone down in history."
            }
        },
        function(){return "Deciding to take this one step at a time, you walk to the <em>glass</em> and comtemplate your next move."},
        function(){
            if(!isGlassSmashed){
                return "The <em>glass</em> is flush against the wall. There is no getting the <em>glass</em> or getting at the <em>button</em> while it's in the way."
            }else if(isGlassSmashed){
                return "You scoop some shards of <em>glass</em> into your hand. This isn't a bad idea but it certainly isn't a good one so you put it back."
            }
        },
        function(){return "You take the glass and use it as the final component of the MOST POWERFUL SPELL IN THE... oh wait no you don't. Even if you could get the <em>glass</em> you know no use for it."},
        function(){
            isGlassSmashed = true;
            actions.pop()
            actions[3] = "use"
            addNewCommand("Use");
            removeItemAndCommand("Hammer", "Smash");
            return "This <em>hammer</em> is really here just so you don't have to smash open this thin sheet of <em>glass</em> with your hand. You drop the <em>hammer</em> because it's kinda useless at this point. The <em>button</em> is now exposed to fresh air and I'm giving you one last thing for now. You may now <em>use</em> things. <em>Use</em> will let you generally interact with interactable objects. Like... I dunno... maybe a <em>button</em>?"
        }
    ],
    [
        function(){
            if(!didHammerGetGot){
                return "It isn't very big and it's just sorta hanging on the wall. There is a sign that says 'in case of glass'. Just go ahead and <em>get</em> the <em>hammer</em>."
            }else if(didHammerGetGot && !isGlassSmashed){
                return "It's in your hand."
            }else if(didHammerGetGot && isGlassSmashed){
                return "You look down at your former ally and salute the <em>hammer</em>. You couldn't have done it without him."
            }
        },
        function(){return "You go to the <em>hammer</em>. It's even more beautiful up close"},
        function(){
            if(!didHammerGetGot){
                youGotAnItem("Hammer", "Smash");
                actions[4] = "smash";
                didHammerGetGot = true;
                return "You have acquired a <em>hammer</em>. If you wanna move your eyes slightly to the left, you can see that you have an inventory and the <em>hammer</em> has been added. Why do you want a hammer? Check out what actions you can do. You see that? You can <em>smash</em> things now. Getting new items will allow you to do new and exciting things. Obviously it's time to <em>smash</em> through the <em>door</em>."
            }else if(didHammerGetGot && !isGlassSmashed){
                return "You already have the <em>hammer</em>. It's in your inventory."
            }else if(didHammerGetGot && isGlassSmashed){
                return "If you love something, then you set it free. Your time with <em>hammer</em> was a magical one. Time that you will cherish forever but it's time to move on."
            }
        },
        function(){return "I see where the confusion is. You <em>use</em> things that are in the environment. You can <em>use</em> that <em>button</em> if the <em>glass</em> isn't in the way. The <em>hammer</em> is an item you have aquired and it lets you take the action <em>smash</em>."},
        function(){return "It's... simply not possible. I'm not sure what you were expecting. Did you think that a version of yourself was going to arrive from an alternate dimension with the exact same <em>hammer</em> and <em>smash</em> the one you're holding? Do you want to tear reality apart with a paradox? That's how that happens."}
    ],
    [
        function(){return "You direct your gaze <em>north</em> and see a <em>door</em>."},
        function(){
            if(!tutorialButtonPushed){
                return "You go <em>north</em> until you hit a wall. Literally. Oh wait that's not a wall. That's the <em>door</em> I mentioned earlier. The locked one. The one preventing you from moving forward. I'm not going to keep babying you when we get to the real game."
            }else if(tutorialButtonPushed){
                roomIndex = 2;
                didStandUp = false;
                return "Things could always be worse. Sure life hasn't been great lately. Five years ago the Dark Wizard Leslie, took over the world and reshaped it into a twisted hellscape. It was pretty unfortunate when Emperor Leslie the Terrible and Great, set up his Fortress of Power down the street from your house. Crime went down due to the tyrannical nature of Leslie but he also needs a never ending supply of humans to sacrifice to evil forces better left alone. That's where you come in. You were knocked out and when you woke up, you were tied right here on the ground with the sound of chanting. It doesn't take a genius to realize that you were the next sacrifice on the docket. Something caused an explosion and there was some screaming and now you seem to be by yourself. Like I said, things could be worse. You have been pulling on your restraints for a while and you finally get loose. To get a better idea of what is going on, you should <em>stand up</em>."
            }
        },
        function(){return "Direction is more of a concept than a thing. I don't know what you are trying to get."},
        function(){return "Direction is more of a concept than a thing. I don't know what you are trying to use."},
        function(){return "You brandish your <em>hammer</em> menacingly towards that bastard, <em>north</em>. You swing as hard as you can over and over but your attacks have nothing to come in contact with. After hours of combat you pass out. When you awaken, everything is as it was before."}
    ]
]

const centerRoom = [
    //actors
    []
]

// All blocks of text are being stored in this array to eliminate the need to write most of the current conditions
// Separating some of the 3d array for organization
const textOptions = [outsideTutorial, insideTutorial]