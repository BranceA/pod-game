var inventory = [];
var availableActions = ['<ul>', '<li>Get</li>', '<li>Use</li>', '<li>Look</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');


commandsFooter.innerHTML = availableActions.join(" ");

submitButton.addEventListener('click', checkKeyWords);

function checkKeyWords() {
    var checkThisText = submittedText.value;
    if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1) {
    bigText.innerText = 'Ignore this.';
    } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1){
        availableActions.pop();
        availableActions.push('<li>Unlock</li>');
        availableActions.push('</ul>');
        commandsFooter.innerHTML = availableActions.join(" ");
    }
}