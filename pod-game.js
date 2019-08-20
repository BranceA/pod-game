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
    if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1) {
    bigText.innerText = 'Ignore this.';
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1){
        youGotAnItem("Key", "Unlock");
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('key')) {

    }
}


//Player Inventory

var inventory = [ {
    item: 'torch',
    action: 'add an action'
}
];

//Compiled list of all in game items

var allGameItems = [
    {
        item: 'key',
        action: 'unlocks door'
    }



];


// FUNCTION - player finds an item



function copyItemFromArray(itemFound, array) {

    if(allGameItems.item === itemFound) {
        array.push(allGameItems.item);
    }





}


copyItemFromArray(allGameItems.item, allGameItems);

allGameItems.forEach(function() {
    copyItemFromArray();
});



// This function would push a found item to an array of objects(inventory)


