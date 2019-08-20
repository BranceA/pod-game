var inventory = ['<ul>', '</ul>'];
var availableActions = ['<ul>', '<li>Get</li>', '<li>Use</li>', '<li>Look</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');
var inventoryAside = document.getElementById('inventory-aside');


commandsFooter.innerHTML = availableActions.join(" ");

submitButton.addEventListener('click', checkKeyWords);

function youGotAnItem(itemName, itemAction) {
    availableActions.pop();
    availableActions.push('<li>');
    availableActions.push(itemName);
    availableActions.push('</li>');
    availableActions.push('</ul>');
    commandsFooter.innerHTML = availableActions.join(" ");
    inventory.pop();
    inventory.push('<li>');
    inventory.push(itemAction);
    inventory.push('</li>');
    inventory.push('</ul>');
    inventoryAside.innerHTML = inventory.join(" ");
}

function checkKeyWords() {
    var checkThisText = submittedText.value;
    if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1) {
    bigText.innerText = 'Ignore this.';
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1){
        youGotAnItem("Key", "Unlock");
    }
}