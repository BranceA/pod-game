// Keep all new variables up here for organization

var inventory = ['<ul>', '</ul>'];
var availableActions = ['<ul>', '<li>', 'Look', '</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');
var inventoryAside = document.getElementById('inventory-aside');
var whatRoomWeIn = 'start';
var isGlassSmashed = false;
var firstCommand = false;
var didHammerGetGot = false;
var tutorialButtonPushed = false;

commandsFooter.innerHTML = availableActions.join(" ");

// This makes the text box work. Don't touch this

submitButton.addEventListener('click', checkKeyWords);
submittedText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
    }
});

// This let's you add items. Pass the arguments as strings and it will add to the inventory and the list of available actions. It incorporates the strings well enough to make them keywords.

function youGotAnItem(itemName, itemAction) {
    if (inventory.includes(itemName) === true) {
        bigText.innerHTML = 'You already have that.';
    } else {
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

// This let's you add to the action list without adding an item. I was using it for the tutorial but not sure if it's going to be used much now.

function addNewCommand(newAction) {
    if (availableActions.includes(newAction) === true) {
        return "oops";
    } else {
        availableActions.pop();
        availableActions.push('<li>');
        availableActions.push(newAction);
        availableActions.push('</li>');
        availableActions.push('</ul>');
        commandsFooter.innerHTML = availableActions.join(" ");
    }
}

// This takes away the item from the inventory and the action that came with it. Pass the arguments as strings and make sure they are spelled correctly and capitalized correctly. If you do that then it just works.

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

// This is a shenanigan. Don't worry about it.

function gameOver() {
    bigText.innerHTML = "<h1>GAME OVER</h1>";
}

// This is probably going to end up being 95% of our code. It checks whatRoomWeIn and based on what room we in, it will check the nested conditionals. When you add commands to Go places, make sure to change the room variable.
// The else if statements are meant to be mass copy/pasted. The bottom of 'tutorial' has examples of default text, if the player doesn't use 2 keywords.
// Use variables to keep track of the state of the room. Such as whether a button has been pressed or not. You can use inventory.includes to check to see if the player has the required item or availableActions.includes to see if they have the required action.

function checkKeyWords() {
    var checkThisText = submittedText.value;
    submittedText.value = '';
    if (whatRoomWeIn === 'start') {
        if (checkThisText.toLowerCase().indexOf('look') !== -1 && firstCommand === false) {
            bigText.innerHTML = 'When you just <em>look</em>, you take a look at your surroundings. You are currently in a small, uniformly gray, cube shaped room. To the <em>north</em> you see a <em>door</em>. When you see a glowing italicized word like <em>this</em> then you can interact with it. The best (and only) way to do things is to type one of the actions you have available to you and whatever you want to interact with. Then hit enter. Go ahead and <em>look</em> at the <em>door</em>.';
            firstCommand = true;
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1 && firstCommand === true) {
            bigText.innerHTML = "This is a standard issue <em>door</em>. It's unlocked and it leads to the tutorial. I'm a nice guy. I just gave you the ability to <em>go</em> places. The tutorial is still <em>north</em> so why don't you <em>go north</em>.";
            addNewCommand("Go");
        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1 && availableActions.includes('Go')) {
            bigText.innerHTML = "So far so good. You are now in the tutorial proper. You hear the door behind you lock and shortly after you hear the room you came from, cave in, become radioactive and fade from reality. You weren't supposed to be there anyway. This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it. Look at that. I let you <em>get</em> things. You're smart. Have fun.";
            addNewCommand("Get");
            whatRoomWeIn = 'tutorial';
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && firstCommand === true) {
            bigText.innerHTML = "When you just <em>look</em>, you take a look at your surroundings. You are currently in a small, uniformly gray, cube shaped room. To the <em>north</em> you see a <em>door</em>. When you see a glowing italicized word like <em>this</em> then you can interact with it. Go ahead and <em>look</em> at the <em>door</em>.";
        } else {
            bigText.innerHTML = "Words are hard but I'm going to need you to trust me and type what I say. Go ahead and type <em>look</em>."
        }
    } else if (whatRoomWeIn === 'tutorial') {
        if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1) {
            bigText.innerHTML = "It's the same <em>door</em> except this one is locked. You don't see a keyhole anywhere.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('glass') !== -1 && isGlassSmashed === false) {
            bigText.innerHTML = "It's glass and it's preventing you from pressing the button. What else do you want?";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('button') !== -1 && isGlassSmashed === false) {
            bigText.innerHTML = "It's red round and pressable. If only that dang <em>glass</em> wasn't in the way.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1) {
            bigText.innerHTML = "That's where the door is. Try and keep up.";
        } else if ((checkThisText.toLowerCase().indexOf('look') !== -1 || checkThisText.toLowerCase().indexOf('go') !== -1) && checkThisText.toLowerCase().indexOf('south') !== -1) {
            bigText.innerHTML = "You turn around and see nothing. When I say nothing, I truly mean nothing. If you picture the empty void of space, you still picture a black void. You don't even see a black void, you see nothing. Your mind turns somersaults as it comes to terms with experiencing true nonexistence. ABANDON ALL HOPE YE WHO ENTER HERE!";
            submitButton.disabled = true;
            var timeoutId = setTimeout(function () {
                gameOver();
            }, 15000);
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('hammer') !== -1 && didHammerGetGot === false) {
            bigText.innerHTML = "It isn't very big and it's just sorta hanging on the wall. There is a sign that says 'in case of glass'. Just go ahead and <em>get</em> the <em>hammer</em>.";
        } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('hammer') !== -1 && didHammerGetGot === false) {
            bigText.innerHTML = "You have acquired a <em>hammer</em>. If you wanna move your eyes slightly to the left, you can see that you have an inventory and the <em>hammer</em> has been added. Why do you want a hammer? Check out what actions you can do. You see that? You can <em>smash</em> things now. Getting new items will allow you to do new and exciting things. Obviously it's time to <em>smash</em> through the <em>door</em>.";
            youGotAnItem("Hammer", "Smash");
            didHammerGetGot = true;
        } else if (checkThisText.toLowerCase().indexOf('smash') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1  && inventory.includes('Hammer')) {
            bigText.innerHTML = "Wow you are actually trying to break through this <em>door</em> with a <em>hammer</em>. I was joking. You take your fun sized whacking tool and really go to town on that door. If somebody is on the other side, they might hear you knocking. Try <em>smash</em>ing the <em>glass</em>";
        } else if (checkThisText.toLowerCase().indexOf('smash') !== -1 && checkThisText.toLowerCase().indexOf('glass') !== -1  && inventory.includes('Hammer') && isGlassSmashed === false) {
            bigText.innerHTML = "This <em>hammer</em> is really here just so you don't have to smash open this thin sheet of <em>glass</em> with your hand. You drop the <em>hammer</em> because it's kinda useless at this point. The <em>button</em> is now exposed to fresh air and I'm giving you one last thing for now. You may now <em>use</em> things. <em>Use</em> will let you generally interact with interactable objects. Like... I dunno... maybe a <em>button</em>?";
            isGlassSmashed = true;
            addNewCommand("Use");
            removeItemAndCommand("Hammer", "Smash");
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('glass') !== -1  && isGlassSmashed === true) {
            bigText.innerHTML = "You look at the ground and admire your work. Too bad there weren't any witnesses to your battle against the glass. Songs would have been written. You would have gone down in history.";
        } else if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('button') !== -1  && isGlassSmashed === false) {
            bigText.innerHTML = "You poke at the button real good. If it wasn't for that <em>glass</em> then you would have pushed the hell out of that button.";
        } else if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('button') !== -1  && isGlassSmashed === true) {
            bigText.innerHTML = "You hear a click. If I were a bettin man, I'd say that <em>door</em> is unlocked. The real game is to the <em>north</em>. If you think this game is going to be hard, don't worry about dying. We have a top notch cleaning crew.";
            tutorialButtonPushed = true;
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('hammer') !== -1  && isGlassSmashed === true) {
            bigText.innerHTML = "You look down at your former ally and salute the <em>hammer</em>. You couldn't have done it without him.";
        } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('hammer') !== -1  && isGlassSmashed === true) {
            bigText.innerHTML = "If you love something, then you set it free. Your time with <em>hammer</em> was a magical one. Time that you will cherish forever but it's time to move on.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('button') !== -1  && isGlassSmashed === true) {
            bigText.innerHTML = "Though the <em>button</em> can't move, speak or think, you're pretty sure it is grateful to be freed.";
        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1  && tutorialButtonPushed === false) {
            bigText.innerHTML = "You go <em>north</em> until you hit a wall. Literally. Oh wait that's not a wall. That's the <em>door</em> I mentioned earlier. The locked one. The one preventing you from moving forward. I'm not going to keep babying you when we get to the real game.";
        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1  && tutorialButtonPushed === true) {
            bigText.innerHTML = "Game Start. Add something better later.";
        } else if (checkThisText.toLowerCase().indexOf('get') !== -1) {
            bigText.innerHTML = "You try your best but you just don't get it.";
        } else if (checkThisText.toLowerCase().indexOf('go') !== -1) {
            bigText.innerHTML = "You begin to go there but then decide against it.";
        } else if (checkThisText.toLowerCase().indexOf('use') !== -1) {
            bigText.innerHTML = "You fiddle with it but without an instruction manuel, you're not sure how to use it.";
        } else if (checkThisText.toLowerCase().indexOf('smash') !== -1 && inventory.includes("Hammer")) {
            bigText.innerHTML = "You smash it as hard as you can with your tiny hammer. You hear a plink and there is no noticeable change.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && didHammerGetGot === false && isGlassSmashed === false) {
            bigText.innerHTML = "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && didHammerGetGot === true && isGlassSmashed === false) {
            bigText.innerHTML = "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there was a <em>hammer</em> next to it.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && didHammerGetGot === true && isGlassSmashed === true) {
            bigText.innerHTML = "This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. There is shattered <em>glass</em> and I small <em>hammer</em> on the ground";
        } else {
            bigText.innerHTML = "I'm telling you almost exactly what to do. Type <em>look</em> and try to get your bearings"
        }
    }
}