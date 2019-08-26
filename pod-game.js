var inventory = ['<ul>', '</ul>'];
var availableActions = ['<ul>', '<li>Look</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');
var inventoryAside = document.getElementById('inventory-aside');
var didPlayerPullLever = false;
var whatRoomWeIn = 'start';
var firstCommand = false;

commandsFooter.innerHTML = availableActions.join(" ");

submitButton.addEventListener('click', checkKeyWords);
submittedText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
    }
});

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

function addNewCommand(newAction) {
    availableActions.pop();
    availableActions.push('<li>');
    availableActions.push(newAction);
    availableActions.push('</li>');
    availableActions.push('</ul>');
    commandsFooter.innerHTML = availableActions.join(" ");
}

function gameOver() {
    bigText.innerHTML = "<h1>GAME OVER</h1>";
}

function checkKeyWords() {
    var checkThisText = submittedText.value;
    submittedText.value = '';
    if (whatRoomWeIn === 'start') {
        if (checkThisText.toLowerCase().indexOf('look') !== -1 && firstCommand === false) {
            bigText.innerHTML = 'When you just <em>look</em>, you take a look at your surroundings. You are currently in a small, uniformly gray, cube shaped room. To the <em>north</em> you see a <em>door</em>. When you see a glowing italicized word like <em>this</em> then you can interact with it. Go ahead and <em>look</em> at the <em>door</em>.';
            firstCommand = true;
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1 && firstCommand === true) {
            bigText.innerHTML = "This is a standard issue <em>door</em>. It's unlocked and it leads to the tutorial. I'm a nice guy. I just gave you the ability to <em>go</em> places. The tutorial is still <em>north</em> so why don't you <em>go north</em>.";
            addNewCommand("Go");
        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1) {
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
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('glass') !== -1) {
            bigText.innerHTML = "It's glass and it's preventing you from pressing the button. What else do you want?";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('button') !== -1) {
            bigText.innerHTML = "It's red round and <em>press</em>able. If only that dang <em>glass</em> wasn't in the way.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1) {
            bigText.innerHTML = "That's where the door is. Try and keep up.";
        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('south') !== -1) {
            bigText.innerHTML = "You turn around and see nothing. When I say nothing, I truly mean nothing. If you picture the empty void of space, you still picture a black void. You don't even see a black void, you see nothing. Your mind turns somersaults as it comes to terms with experiencing true nonexistence. ABANDON ALL HOPE YE WHO ENTER HERE!";
            submitButton.disabled = true;
            var timeoutId = setTimeout(function () {
                gameOver();
            }, 15000);
        }
    }
}