var inventory = [];
var availableActions = ['<ul>', '<li>Get</li>', '<li>Use</li>', '<li>Look</li>', '</ul>'];
var bigText = document.getElementById('big-text-text');
var commandsFooter = document.getElementById('commands-box');
var submitButton = document.getElementById('submit');
var submittedText = document.getElementById('text-input');

var test = 'Testing this out';


commandsFooter.innerHTML = "Hello";

submitButton.addEventListener('click', checkKeyWords);

function checkKeyWords() {
    var checkThisText = submittedText.value;
    if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('key') !== -1) {
    bigText.innerText = test;

    }
}