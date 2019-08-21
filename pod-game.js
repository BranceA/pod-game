var inventory = ['<ul>', '</ul>'];
var availableActions = ['<ul>', '<li>Get</li>', '<li>Use</li>', '<li>Look</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');
var inventoryAside = document.getElementById('inventory-aside');
var didPlayerPullLever = false;


commandsFooter.innerHTML = availableActions.join(" ");

submitButton.addEventListener('click', checkKeyWords);
submittedText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
    }
});

function youGotAnItem(itemName, itemAction) {
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

function checkKeyWords() {
    var checkThisText = submittedText.value;
    submittedText.value = '';
    if (checkThisText.toLowerCase().indexOf('unlock') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1 && inventory.includes('Key')) {
        bigText.innerHTML = 'The key fits right in. You turn the key until you hear a click and the door slowly swings inward to reveal... playMusic(roundAbout) <h1>To Be Continued</h1>';
    } else if (checkThisText.toLowerCase().indexOf('unlock') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1 && inventory.includes('Key') === false) {
        bigText.innerHTML = 'How do you propose to do that?';
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1 && didPlayerPullLever === false) {
        bigText.innerHTML = 'What key?';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('bookcase') !== -1) {
        bigText.innerHTML = 'This thing is kinda gross. The titles are all faded off the spines of the books and when you open one the pages crumble to dust. Wait is that a <em>lever</em>?';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('lever') !== -1) {
        bigText.innerHTML = 'You take a gander at it. It is a wooden lever that probably does something if you <em>use</em> it.';
    } else if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('lever') !== -1) {
        bigText.innerHTML = 'There is a little resistance but you pull the lever. A small panel pops open in the back of the <em>bookcase</em>. Inside you see a <em>key</em>.';
        didPlayerPullLever = true;
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1 && didPlayerPullLever === true){
        youGotAnItem("Key", "Unlock");
        bigText.innerHTML = 'You pick up the key.';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('door') !== -1){
        bigText.innerHTML = 'BEHOLD!!! This <em>door</em> is the only thing preventing you from leaving. You jiggle the handle a few times just to make sure it is locked. Historical empirical evidence says that it will probably open if you have a <em>key</em> that fits in that keyhole.';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('fish') !== -1){
        bigText.innerHTML = 'This appears to be one of those fish that a wizard enchanted to sing but the magic seems to have worn off. You are not any sort of fish expert but you are pretty sure this is a red herring.';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1 && didPlayerPullLever === false) {
        bigText.innerHTML = 'What key?';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1 && didPlayerPullLever === true) {
        bigText.innerHTML = 'This key looks like it will probably fit in the <em>door</em>.';
    } else if (checkThisText.toLowerCase().indexOf('look') !== -1){
        bigText.innerHTML = 'You wake up with a sharp pain on the top of your head. Sitting up, you find yourself in an unfamiliar room. Your bed technically has a mattress and you don\'t look too closely at the sheet. To the north you see the only <em>door</em>, which is locked. There is a <em>bookcase</em>, full of decomposing books. A <em>fish</em> of some sort is hanging on the wall.';
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1){
        bigText.innerHTML = 'You try your best but you just do not get it.';
    } else if (checkThisText.toLowerCase().indexOf('use') !== -1){
        bigText.innerHTML = 'Neither of us know how to use that.';
    }  else {
        bigText.innerHTML = 'Ok listen up. Down below you have a list of actions you can do. If you see a word like <em>this</em> then you can interact with it in some way. Type <em>look</em> to take a look at the room again.'
    }
}