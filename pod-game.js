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
    if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1 && inventory.includes('Key')) {
        bigText.innerHTML = 'Ignore this.';
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
    }
}