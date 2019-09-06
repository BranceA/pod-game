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
var earingsStatus = "unseen";
var staffStatus = "ground";
var decidedOnTutorial = false;
var babelFish = false;

window.onload = document.getElementById('text-input').select();

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
        $(".big-text").hide().html('You already have that.').fadeIn(800);
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

function removeOneItem(itemName) {
    var itemPosition = inventory.indexOf(itemName) - 1;
    if (inventory.includes(itemName)) {
        inventory.splice(itemPosition, 3);
        inventoryAside.innerHTML = inventory.join(" ");
    }
}

function skipToCenter() {
    addNewCommand("Get");
    addNewCommand("Use");
    addNewCommand("Go");
}

// This is a shenanigan. Don't worry about it.

function gameOver() {
    $(".big-text").hide().html("<h1>GAME OVER</h1>").fadeIn(800);
}

function itemCombine(itemOne, itemTwo, combinedItem) {
    removeOneItem(itemOne);
    removeOneItem(itemTwo);
    addNewItem(combinedItem);
    $(".big-text").hide().html("You fiddle around for a while and you combine " + itemOne + " and " + itemTwo + " into " + combinedItem).fadeIn(800);
    submitButton.disabled = false;
    submittedText.value = '';
}

// This is probably going to end up being 95% of our code. It checks whatRoomWeIn and based on what room we in, it will check the nested conditionals. When you add commands to Go places, make sure to change the room variable.

// The else if statements are meant to be mass copy/pasted. The bottom of 'tutorial' has examples of default text, if the player doesn't use 2 keywords.

// Use variables to keep track of the state of the room.
// Such as whether a button has been pressed or not. You can use inventory.includes to check to see if the player has the required item or availableActions.includes to see if they have the required action.

//This function converts player input to lowercase and checks to see if its an index of the required command to progress. Mainly a way to clean up the code and make it more readable.

function checkText(playerInput, requiredCommand) {

    return playerInput.toLowerCase().indexOf(requiredCommand) !== -1;



}

// This function
function checkKeyWords() {

    var checkThisText = submittedText.value;
    submittedText.value = '';
    if (whatRoomWeIn === 'pageload') {
        if (decidedOnTutorial === false && checkText(checkThisText, "no")) {
            $(".big-text").hide().html("Things could always be worse. Sure life hasn't been great lately. Five years ago the Dark Wizard Leslie, took over the world and reshaped it into a twisted hellscape. It was pretty unfortunate when Emperor Leslie the Terrible and Great, set up his Fortress of Power down the street from your house. Crime went down due to the tyrannical nature of Leslie but he also needs a never ending supply of humans to sacrifice to evil forces better left alone. That's where you come in. You were knocked out and when you woke up, you were tied right here on the ground with the sound of chanting. It doesn't take a genius to realize that you were the next sacrifice on the docket. Something caused an explosion and there was some screaming and now you seem to be by yourself. Like I said, things could be worse. You have been pulling on your restraints for a while and you finally get loose. To get a better idea of what is going on, you should <em>stand up</em>").fadeIn(800);
            decidedOnTutorial = true;
            whatRoomWeIn = "center";
            skipToCenter();
        } else if (decidedOnTutorial === false && checkText(checkThisText, "yes")) {
            $(".big-text").hide().html("Welcome to name pending. This is a text based adventure game. This means that you get the benefit of an awesome videogame with no annoying graphics to distract you and no confusing controller to get in your way. I accidentally dropped you outside the tutorial so I need you to work with me. Down below is a list of things you are currently able to accomplish. All you can do right now is <em>look</em>. Go ahead and try that out.").fadeIn(800);
            decidedOnTutorial = true;
            whatRoomWeIn = "start";
        } else {
            $(".big-text").hide().html("You probably need the tutorial. Type 'yes' and press enter.").fadeIn(800);
        }
    }

    else if (whatRoomWeIn === 'start') { //START OF THE GAME,

        if (checkText(checkThisText, 'look') && firstCommand === false) {

            $(".big-text").hide().html('When you just <em>look</em>, you take a look at your surroundings. You are currently in a small, uniformly gray, cube shaped room. To the <em>north</em> you see a <em>door</em>. When you see a glowing italicized word like <em>this</em> then you can interact with it. The best (and only) way to do things is to type one of the actions you have available to you and whatever you want to interact with. Then hit enter. Go ahead and <em>look</em> at the <em>door</em>.').fadeIn(800);

            firstCommand = true;

        } else if (checkText(checkThisText, 'look') && (checkText(checkThisText, 'door')) && firstCommand === true) {

            $(".big-text").hide().html("This is a standard issue <em>door</em>. It's unlocked and it leads to the tutorial. I'm a nice guy. I just gave you the ability to <em>go</em> places. The tutorial is still <em>north</em> so why don't you <em>go north</em>.").fadeIn(800);

            addNewCommand("Go");

        } else if (checkText(checkThisText, 'go') && (checkText(checkThisText, 'north')) && availableActions.includes('Go')) {

            $(".big-text").hide().html("So far so good. You are now in the tutorial proper. You hear the door behind you lock and shortly after you hear the room you came from cave in, become radioactive and fade from reality. You weren't supposed to be there anyway. This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it. Look at that. I let you <em>get</em> things. You're smart. Have fun.").fadeIn(800);

            addNewCommand("Get"); //add new player command for the hammer

            whatRoomWeIn = 'tutorial'; //whatRoomWeIn reassign

        } else if (checkText(checkThisText, 'look') && firstCommand === true) {

            $(".big-text").hide().html("When you just <em>look</em>, you take a look at your surroundings. You are currently in a small, uniformly gray, cube shaped room. To the <em>north</em> you see a <em>door</em>. When you see a glowing italicized word like <em>this</em> then you can interact with it. Go ahead and <em>look</em> at the <em>door</em>.").fadeIn(800);

        } else { //if player enters wrong combination of words

            $(".big-text").hide().html("Words are hard but I'm going to need you to trust me and type what I say. Go ahead and type <em>look</em>").fadeIn(800);
        }

        //END OF START

    } else if (whatRoomWeIn === 'tutorial') { //START OF TUTORIAL


        if (checkText(checkThisText, 'look') && checkText(checkThisText, 'door')) {

            $(".big-text").hide().html("It's the same <em>door</em> except this one is locked. You don't see a keyhole anywhere.").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'glass') && isGlassSmashed === false) {

            $(".big-text").hide().html("It's glass and it's preventing you from pressing the button. What else do you want?").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'button') && isGlassSmashed === false) {

            $(".big-text").hide().html("It's red round and pressable. If only that dang <em>glass</em> wasn't in the way.").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'north')) {

            $(".big-text").hide().html("That's where the door is. Try and keep up.").fadeIn(800);

        } else if ((checkText(checkThisText, 'look') || checkText(checkThisText, 'go')) && checkText(checkThisText, 'south')) {

            $(".big-text").hide().html("You turn around and see nothing. When I say nothing, I truly mean nothing. If you picture the empty void of space, you still picture a black void. You don't even see a black void, you see nothing. Your mind turns somersaults as it comes to terms with experiencing true nonexistence. ABANDON ALL HOPE YE WHO ENTER HERE!").fadeIn(800);

            submitButton.disabled = true;

            var timeoutId = setTimeout(function () {
                gameOver();
            }, 15000);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'hammer') && didHammerGetGot === false) {

            $(".big-text").hide().html("It isn't very big and it's just sorta hanging on the wall. There is a sign that says 'in case of glass'. Just go ahead and <em>get</em> the <em>hammer</em>.").fadeIn(800);

        } else if (checkText(checkThisText, 'get') && checkText(checkThisText, 'hammer') && didHammerGetGot === false) {

            $(".big-text").hide().html("You have acquired a <em>hammer</em>. If you wanna move your eyes slightly to the left, you can see that you have an inventory and the <em>hammer</em> has been added. Why do you want a hammer? Check out what actions you can do. You see that? You can <em>smash</em> things now. Getting new items will allow you to do new and exciting things. Obviously it's time to <em>smash</em> through the <em>door</em>.").fadeIn(800);

            youGotAnItem("Hammer", "Smash");
            didHammerGetGot = true;

        } else if (checkText(checkThisText, 'smash') && checkText(checkThisText, 'door') && inventory.includes('Hammer')) {

            $(".big-text").hide().html("Wow you are actually trying to break through this <em>door</em> with a <em>hammer</em>. I was joking. You take your fun sized whacking tool and really go to town on that door. If somebody is on the other side, they might hear you knocking. Try <em>smash</em>ing the <em>glass</em>").fadeIn(800);

        } else if (checkText(checkThisText,'smash') !== -1 && checkThisText.toLowerCase().indexOf('glass') !== -1 && inventory.includes('Hammer') && isGlassSmashed === false) {

            $(".big-text").hide().html("This <em>hammer</em> is really here just so you don't have to smash open this thin sheet of <em>glass</em> with your hand. You drop the <em>hammer</em> because it's kinda useless at this point. The <em>button</em> is now exposed to fresh air and I'm giving you one last thing for now. You may now <em>use</em> things. <em>Use</em> will let you generally interact with interactable objects. Like... I dunno... maybe a <em>button</em>?").fadeIn(800);

            isGlassSmashed = true;

            addNewCommand("Use");

            removeItemAndCommand("Hammer", "Smash");

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'glass') && isGlassSmashed === true) {

            $(".big-text").hide().html("You look at the ground and admire your work. Too bad there weren't any witnesses to your battle against the glass. Songs would have been written. You would have gone down in history.").fadeIn(800);

        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'button') && isGlassSmashed === false) {

            $(".big-text").hide().html("You poke at the button real good. If it wasn't for that <em>glass</em> then you would have pushed the hell out of that button.").fadeIn(800);

        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'button') && isGlassSmashed === true) {

            $(".big-text").hide().html("You hear a click. If I were a bettin man, I'd say that <em>door</em> is unlocked. The real game is to the <em>north</em>. If you think this game is going to be hard, don't worry about dying. We have a top notch cleaning crew.").fadeIn(800);

            tutorialButtonPushed = true;

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('hammer') !== -1 && isGlassSmashed === true) {

            $(".big-text").hide().html("You look down at your former ally and salute the <em>hammer</em>. You couldn't have done it without him.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('hammer') !== -1 && isGlassSmashed === true) {

            $(".big-text").hide().html("If you love something, then you set it free. Your time with <em>hammer</em> was a magical one. Time that you will cherish forever but it's time to move on.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('button') !== -1 && isGlassSmashed === true) {

            $(".big-text").hide().html("Though the <em>button</em> can't move, speak or think, you're pretty sure it is grateful to be freed.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1 && tutorialButtonPushed === false) {

            $(".big-text").hide().html("You go <em>north</em> until you hit a wall. Literally. Oh wait that's not a wall. That's the <em>door</em> I mentioned earlier. The locked one. The one preventing you from moving forward. I'm not going to keep babying you when we get to the real game.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('north') !== -1 && tutorialButtonPushed === true) {

            $(".big-text").hide().html("Things could always be worse. Sure life hasn't been great lately. Five years ago the Dark Wizard Leslie, took over the world and reshaped it into a twisted hellscape. It was pretty unfortunate when Emperor Leslie the Terrible and Great, set up his Fortress of Power down the street from your house. Crime went down due to the tyrannical nature of Leslie but he also needs a never ending supply of humans to sacrifice to evil forces better left alone. That's where you come in. You were knocked out and when you woke up, you were tied right here on the ground with the sound of chanting. It doesn't take a genius to realize that you were the next sacrifice on the docket. Something caused an explosion and there was some screaming and now you seem to be by yourself. Like I said, things could be worse. You have been pulling on your restraints for a while and you finally get loose. To get a better idea of what is going on, you should <em>stand up</em>.").fadeIn(800);

            whatRoomWeIn = "center";

        } else if (checkThisText.toLowerCase().indexOf('get') !== -1) {

            $(".big-text").hide().html("You try your best but you just don't get it.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('go') !== -1) {

            $(".big-text").hide().html("You begin to go there but then decide against it.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('use') !== -1) {

            $(".big-text").hide().html("You fiddle with it but without an instruction manuel, you're not sure how to use it.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('smash') !== -1 && inventory.includes("Hammer")) {

            $(".big-text").hide().html("You smash it as hard as you can with your tiny hammer. You hear a plink and there is no noticeable change.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && didHammerGetGot === false && isGlassSmashed === false) {

            $(".big-text").hide().html("This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there is a <em>hammer</em> next to it.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && didHammerGetGot === true && isGlassSmashed === false) {

            $(".big-text").hide().html("This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. The button is covered by <em>glass</em> and there was a <em>hammer</em> next to it.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && didHammerGetGot === true && isGlassSmashed === true) {

            $(".big-text").hide().html("This room is identical to the one you came from except there is a <em>button</em> next to the <em>door</em>. There is shattered <em>glass</em> and I small <em>hammer</em> on the ground").fadeIn(800);

        } else {

            $(".big-text").hide().html("I'm telling you almost exactly what to do. Type <em>look</em> and try to get your bearings").fadeIn(800);

        }

    } else if (whatRoomWeIn === 'center') {
        if (checkText(checkThisText, 'wololo')) {

            $(".big-text").hide().html("Things could always be worse. Sure life hasn't been great lately. Five years ago the Dark Wizard Leslie, took over the world and reshaped it into a twisted hellscape. It was pretty unfortunate when Emperor Leslie the Terrible and Great, set up his Fortress of Power down the street from your house. Crime went down due to the tyrannical nature of Leslie but he also needs a never ending supply of humans to sacrifice to evil forces better left alone. That's where you come in. You were knocked out and when you woke up, you were tied right here on the ground with the sound of chanting. It doesn't take a genius to realize that you were the next sacrifice on the docket. Something caused an explosion and there was some screaming and now you seem to be by yourself. Like I said, things could be worse. You have been pulling on your restraints for a while and you finally get loose. To get a better idea of what is going on, you should <em>stand up</em>").fadeIn(800);

            skipToCenter();

        } else if (checkText(checkThisText, 'stand') && checkText(checkThisText, 'up') && didStandUp === false) {

            $(".big-text").hide().html("Sweet freedom. You take in your surroundings as you stretch. You are in a room with a bare stone floor and the <em>wall</em>s are covered in some kind of symbols. All things considered, this place doesn't seem too bad. The epicenter of dark magic is sparsely furnished. The only really disturbing thing in here is a shrunken <em>head</em> that is hanging from the ceiling. The center of the room is clear and you are standing in a red <em>circle</em> painted on the ground. There is a <em>podium</em> facing towards you. Near the <em>podium</em> a <em>staff</em> is laying on the ground and the area surrounding the <em>staff</em> is blackened. The directions leading out are <em>east</em> and <em>west</em>. There is a <em>TBD barrier</em> to the <em>north</em> and <em>south</em>.").fadeIn(800);

            didStandUp = true;

        } else if (didStandUp === false) {

            $(".big-text").hide().html("You think about doing that and it seems like a good idea. The first step towards accomplishing that is to <em>stand up</em>.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('wall') !== -1) {

            $(".big-text").hide().html("Looking at the <em>wall</em> you see that it is made of dirt. Wherever you are, it's likely underground. The symbols on the wall are a deep red and glowing faintly. It's nothing you want to understand and they give you the creeps.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('wall') !== -1) {

            $(".big-text").hide().html("I guess it is made of dirt. You scrape off some wall and put it in your pocket. You feel like a more complete person.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('wall') !== -1) {

            $(".big-text").hide().html("Use it how? The <em>wall</em>'s entire purpose is to be a barrier between two places. It's is currently fulfilling it's mission.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('wall') !== -1) {

            $(".big-text").hide().html("Use it how? The <em>wall</em>'s entire purpose is to be a barrier between two places. It's is currently fulfilling it's mission.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('go') !== -1 && checkThisText.toLowerCase().indexOf('wall') !== -1) {

            $(".big-text").hide().html("You go right up to the <em>wall</em> and give it the stink eye.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('look') !== -1 && checkThisText.toLowerCase().indexOf('circle') !== -1) {

            $(".big-text").hide().html("There is a five pointed star on the inside of a <em>circle</em> large enough for you to lay down in. An unlit candle is at each point of the star. It's understandably uncomfortable standing here so you pretend to be someplace nice. A place called not here.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('get') !== -1 && checkThisText.toLowerCase().indexOf('circle') !== -1) {

            $(".big-text").hide().html("It's a circle painted on the ground. You cannot acquire a two dimensional shape painted on the ground.").fadeIn(800);

        } else if (checkThisText.toLowerCase().indexOf('use') !== -1 && checkThisText.toLowerCase().indexOf('circle') !== -1) {

            $(".big-text").hide().html("You know nothing of magic. Even if you knew how to use the circle, it probably isn't a good idea.").fadeIn(800);

        } else if (checkText(checkThisText, 'go') && checkText(checkThisText, 'circle')) {

            $(".big-text").hide().html("You had wandered away from the circle. You return to the closest thing you have to a home in this place.").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'west')) {

            $(".big-text").hide().html("There is a wooden door to the <em>west</em>. You swear that you can hear breathing coming from the other side.").fadeIn(800);

        } else if (checkText(checkThisText, 'what type of wood')) {

            $(".big-text").hide().html("Mahogany").fadeIn(800);

        } else if (checkText(checkThisText, 'go') && checkText(checkThisText, 'west') && mooseStatus === "unseen") {

            $(".big-text").hide().html("You mosey on over to the door to the <em>west</em>. The door is unlocked so you open it up. In the next room you see a monstrosity. There is a hulking creature on the far side of the room. You have heard tales of the <em>Dire Moose</em> but you didn't think they were real. You feel true terror as the <em>Dire Moose</em>'s solid black eyes meet your own. The <em>Dire Moose</em> unleashes a roar that makes you realize how truly insignificant you are. It charges towards you at a speed that should be impossible for a creature it's size. You close the door.").fadeIn(800);

            mooseStatus = "seen";

        } else if (checkText(checkThisText, 'go') && checkText(checkThisText, 'west') && mooseStatus === "seen") {

            $(".big-text").hide().html("How about you don't do that? You really need to find a way to deal with the <em>Dire Moose</em>.").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'head') && (earingsStatus === "unseen" || earingsStatus === "seen")) {

            $(".big-text").hide().html("The shrunken <em>head</em> is exactly what you think it is. It's icky and it's suspended from a rope that comes down from the ceiling and is tied to it's hair. It is wearing a pretty sweet set of hoop <em>earrings</em>. You are thinking of naming him Frank").fadeIn(800);

            earingsStatus = "seen";

        } else if (checkText(checkThisText, 'get') && checkText(checkThisText, 'head')) {

            $(".big-text").hide().html("You grab the <em>head</em> and try to <em>get</em> it. The fact that the head is tied to the ceiling is preventing this.").fadeIn(800);

        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'head')) {

            $(".big-text").hide().html("Use it to do what exactly?").fadeIn(800);

        } else if (checkText(checkThisText, 'talk') && checkText(checkThisText, 'head')) {

            $(".big-text").hide().html("You discus your feelings with Frank. He is a very good listener.").fadeIn(800);

        } else if (checkText(checkThisText, 'go') && checkText(checkThisText, 'head')) {

            $(".big-text").hide().html("You coyly approach the head. You get so nervous around strangers.").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'earring') && earingsStatus === "seen") {

            $(".big-text").hide().html("The <em>earrings</em> are the only ornamentation that the <em>head</em> has. They are large, circular and appear to be made out of gold.").fadeIn(800);

        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'earring') && earingsStatus === "seen") {

            $(".big-text").hide().html("No. You can't do that. They are still attached to the <em>head</em>.").fadeIn(800);

        } else if (checkText(checkThisText, 'get') && checkText(checkThisText, 'earrings') && earingsStatus === "seen") {

            $(".big-text").hide().html("You take off one of the earrings. As a captive of Emperor Leslie, this holds no value to you as an earring. It would probably make a great fishing <em>hook</em>.").fadeIn(800);

            earingsStatus = "gotten";

            addNewItem("Hook");

            if (inventory.includes("Pole") && inventory.includes("Hook")) {

                submitButton.disabled = true;

                var timeoutId = setTimeout(function () {
                    itemCombine("Pole", "Hook", "Fishing Pole");
                    addNewCommand("Fish");
                }, 5000);
            }

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'head') && earingsStatus === "gotten") {

            $(".big-text").hide().html("It's the same head but with no earrings.").fadeIn(800);

        } else if ((checkText(checkThisText, 'look') || checkText(checkThisText, 'get') || checkText(checkThisText, 'go') || checkText(checkThisText, 'use')) && checkText(checkThisText, 'podium')) {

            $(".big-text").hide().html("There's going to be a spellbook here later.").fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'staff') && staffStatus === "ground") {

            $(".big-text").hide().html("This obviously has some kind of magical power. You do some quick detective work and deduce that the explosion you heard came from this <em>staff</em>. All surfaces radiating from around the staff are charred black. It is made from a fine polished wood, etched with runes and topped with a diamond.").fadeIn(800);

        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'staff') && staffStatus === "ground") {

            $(".big-text").hide().html("Listen here dumb dumb. That <em>staff</em> can go boom. You no know how to <em>use staff</em>.").fadeIn(800);

        } else if (checkText(checkThisText, 'go') && checkText(checkThisText, 'staff') && staffStatus === "ground") {

            $(".big-text").hide().html("You walk until you get to the edge of what is probably a blast radius.").fadeIn(800);

        } else if (checkText(checkThisText, 'go') && checkText(checkThisText, 'east') && babelFish === false) {

            $(".big-text").hide().html("ouyay idn\'tday evenyay inkthay otay akemay ouryay edbay ethay astlay imetay ouyay ereway erehay . ouryay othermay ouldway ebay isappointedday . onestlyhay , atwhay indkay ofyay obslay areyay ouyay ? obviouslyyay oppyslay enoughyay otay etgay aughtcay ybay ethay evilyay izardway esleylay . ohyay andyay ooklay , ouryay anketblay isyay emblazonedyay ithway ayay eirdway urplepay inosaurday . anywaysyay , <em>look</em> ackbay atyay ethay oomray osay eway ancay ontinuecay isthay igpay atinlay artypay estfay .").fadeIn(800);

            whatRoomWeIn = 'ryan';

        }else if (checkText(checkThisText, 'get') && checkText(checkThisText, 'staff') && staffStatus === "ground") {

            $(".big-text").hide().html("You gingerly lift the <em>staff</em> off of the ground. Huh. This feels a lot like holding your old fishing pole.").fadeIn(800);

            staffStatus = "gotten";

            addNewItem("Pole");

            if (inventory.includes("Pole") && inventory.includes("Hook")) {

                submitButton.disabled = true;

                var timeoutId = setTimeout(function () {
                    itemCombine("Pole", "Hook", "Fishing Pole");
                    addNewCommand("Fish");
                }, 5000);
            }

        } else if (checkText(checkThisText, 'fish') && checkText(checkThisText, 'moose') && mooseStatus === "seen" && availableActions.includes("Fish")) {

            $(".big-text").hide().html("There are good ideas and bad ideas. Using a fishing pole to try and catch a <em>Dire Moose</em> will go down in history as the most poorly thought out plan that has ever been conceived by arguably intelligent life.").fadeIn(800);

        } else if (checkText(checkThisText, 'go')) {

            $(".big-text").hide().html("There are many places you can go. That is not one of them").fadeIn(800);

        } else if (checkText(checkThisText, 'look')) {

            $(".big-text").hide().html("You are in a room with a bare stone floor and the <em>wall</em>s are covered in some kind of symbols. All things considered, this place doesn't seem too bad. The epicenter of dark magic is sparsely furnished. The only really disturbing thing in here is a shrunken <em>head</em> that is hanging from the ceiling. The center of the room is clear and you are standing in a red <em>circle</em> painted on the ground. There is a <em>podium</em> facing towards you. Near the <em>podium</em> a <em>staff</em> is laying on the ground and the area surrounding the <em>staff</em> is blackened. The directions leading out are <em>east</em> and <em>west</em>. There is a <em>TBD barrier</em> to the <em>north</em> and <em>south</em>.").fadeIn(800);

        } else if (checkText(checkThisText, 'get')) {

            $(".big-text").hide().html("I might want to get that too if I knew what it was.").fadeIn(800);

        } else if (checkText(checkThisText, 'use')) {

            $(".big-text").hide().html("You use it to the best of your ability but nothing happens.").fadeIn(800);

        } else if ((checkText(checkThisText, 'get') || checkText(checkThisText, 'use')) && (checkText(checkThisText, 'west')) || checkText(checkThisText, 'north') || checkText(checkThisText, 'south')) {

            $(".big-text").hide().html("That's a direction. I've had to delete five different responses because I don't know how to deal to this.").fadeIn(800);

        }
    } else if(whatRoomWeIn === 'ryan') {


        if (checkText(checkThisText, 'look') && checkText(checkThisText, 'bed')) {

            $('.big-text').hide().html('ouyay idn\'tday evenyay inkthay otay akemay ouryay edbay ethay astlay imetay ouyay ereway erehay . ouryay othermay ouldway ebay isappointedday . onestlyhay , atwhay indkay ofyay obslay areyay ouyay ? obviouslyyay oppyslay enoughyay otay etgay aughtcay ybay ethay evilyay izardway esleylay . ohyay andyay ooklay , ouryay anketblay isyay emblazonedyay ithway ayay eirdway urplepay inosaurday . anywaysyay , <em>look</em> ackbay atyay ethay oomray osay eway ancay ontinuecay isthay igpay atinlay artypay estfay .').fadeIn(800);

            //Translated Text:

            //"You didn't even think to make your bed the last time you were here. Your mother would be disappointed. Honestly, what kind of slob are you? Obviously sloppy enough to get caught by the evil wizard Lesley. Oh and look, your blanket is emblazoned with a weird purple dinosaur. Anyways, <em>look</em> back at the room so we can continue this pig latin party fest."

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'aquarium')) {

            $('.big-text').hide().html('ethay aquariumyay inyay elationray otay ouryay oomray isyay inyay istinepray onditioncay . actuallyyay , isthay isyay ayay inelyfay aftedcray arvendway aquariumyay , orgedfay inyay ethay epthsday ofyay eirthay ativenay ountainsmay . ouyay owknay atwhay ? isn\'tyay ityay indkay ofyay eirdway atthay ountainmay ellingdway umanoidshay ouldway ebay oncernedcay ithway oceanyay andyay iverray ellingdway eastbay ? oddyay eaturescray osethay arvesdway . orrysay , iyay asway abblingbay erethay . ownay <em>use</em> atthay <em>fishing pole</em> andyay eesay atwhay eway ancay etgay ityay .').fadeIn(800);

            //Translated Text:

            //"The aquarium in relation to your room is in pristine condition. Actually, this is a finely crafted dwarven aquarium, forged in the depths of their native mountains. You know what? Isn't it kind of weird that mountain dwelling humanoids would be concerned with ocean and river dwelling beast? Odd creatures those dwarves. Sorry, I was babbling there. Now <em>use</em> that <em>fishing pole</em> and see what we can get it."

        } else if(checkText(checkThisText, 'use') && checkText(checkThisText, 'fishing pole') && babelFish === false) {

            $('.big-text').hide().html('ouyay owerlay ethay ookhay intoyay ethay aterway andyay instantlyyay eelfay ayay ugtay , ouyay overyay eagerlyyay ankyay ethay inelay outyay ofyay ethay aterway andyay ayay allsmay <em>babelfish</em> andslay inyay ouryay ocketpay . isn\'tyay atthay onvenientcay .').fadeIn(800);

            addNewItem("Babel Fish");

            babelFish = true;

            //Translate Text:

            //"You lower the hook into the water and instantly feel a tug, you over eagerly yank the line out of the water and a small <em>babelfish</em> lands in your pocket. Isn't that convenient."
        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'babelfish') && inventory.includes('Babel Fish')) {

            $('.big-text').hide().html('Alright you weirdo, you decide to put the fish in your ear and all of a sudden everything is clearer and you understand everything. Looks like you could explore the room or just leave out the door. And yes, it was open the whole time. Jokes on you.').fadeIn(800);

        } else if (checkText(checkThisText, 'look')) {

            $('.big-text').hide().html('ellway , isthay asway unexpectedyay . ityay appearsyay atthay ethay arkday izardway eslielay ashay ecreatedray ouryay ildhoodchay edroombay . atthay isyay uiteqay oddyay . omeonesay eedsnay otay alktay otay isthay uygay , iyay eanmay it\'syay adbay enoughyay atthay ehay idnapskay adventurersyay ikelay ourselfyay . inyay ethay ornercay isyay ouryay oldyay <em>bed</em> . ohyay ooklay , ethay illowpay isyay illstay etway omfray ouryay earstay ouyay igbay abybay . iyay an\'tcay elievebay iyay otgay uckstay arratingnay ethay orystay ofyay anyay adultyay abybay . ustjay ymay ucklay . anywaysyay , iyay asway abblingbay . andyay inyay ethay iddlemay ofyay ouryay oomray itssay anyay <em>aquarium</em> . iyay etbay at\'sthay erewhay ouyay orestay ouryay igbay abybay earstay . atyay isthay ointpay ityay ightmay ebay ayay oodgay ideayay otay <em>look</em> atyay omethingsay . ancay ouyay andlehay atthay ouyay igbay abybay ?').fadeIn(800);

            //Translated Text:

            //"Well, this was unexpected. It appears that the dark wizard Leslie has recreated your childhood bedroom. That is quite odd. Someone needs to talk to this guy, I mean it's bad enough that he kidnaps adventurers like yourself. In the corner is your old <em>bed</em>. Oh look, the pillow is still wet from your tears you big baby. I can't believe I got stuck narrating the story of an adult baby. Just my luck. Anyways, I was babbling. And in the middle of your room sits an <em>aquarium</em>. I bet that's where you store your big baby tears. At this point it might be a good idea to <em>look</em> at something. Can you handle that you big baby?"


        }

        //        Translate Ryan Room


        if (checkText(checkThisText, 'look') && checkText(checkThisText, 'bed') && babelFish === true) {

            $('.big-text').hide().html('You didn\'t even think to make your bed the last time you were here. Your mother would be disappointed. Honestly, what kind of slob are you? Obviously sloppy enough to get caught by the evil wizard Lesley. Oh and look, your blanket is emblazoned with a weird purple dinosaur. Anyways, <em>look</em> back at the room so we can continue this pig latin party fest.').fadeIn(800);

        } else if (checkText(checkThisText, 'look') && checkText(checkThisText, 'aquarium') && babelFish === true ) {
            console.log('hey there');
            $('.big-text').hide().html('The aquarium in relation to your room is in pristine condition. Actually, this is a finely crafted dwarven aquarium, forged in the depths of their native mountains. You know what? Isn\'t it kind of weird that mountain dwelling humanoids would be concerned with ocean and river dwelling beast? Odd creatures those dwarves. Sorry, I was babbling there. Now <em>use</em> that <em>fishing pole</em> and see what we can get it.').fadeIn(800);

        } else if(checkText(checkThisText, 'use') && checkText(checkThisText, 'fishingPole') && babelFish === true) {

            $('.big-text').hide().html('You lower the hook into the water and instantly feel a tug, you over eagerly yank the line out of the water and a small <em>babelfish</em> lands in your pocket. Isn\'t that convenient.').fadeIn(800);

        } else if (checkText(checkThisText, 'use') && checkText(checkThisText, 'babelfish') && inventory.includes('babelfish')) {

            $('.big-text').hide().html('Alright you weirdo, you decide to put the fish in your ear and all of a sudden everything is clearer and you understand everything. Looks like you could explore the room or just leave out the door. And yes, it was open the whole time. Jokes on you.').fadeIn(800);

        } else if (checkText(checkThisText, 'look') && babelFish === true) {

            $('.big-text').hide().html('Well, this was unexpected. It appears that the dark wizard Leslie has recreated your childhood bedroom. That is quite odd. Someone needs to talk to this guy, I mean it\'s bad enough that he kidnaps adventurers like yourself. In the corner is your old <em>bed</em>. Oh look, the pillow is still wet from your tears you big baby. I can\'t believe I got stuck narrating the story of an adult baby. Just my luck. Anyways, I was babbling. And in the middle of your room sits an <em>aquarium</em>. I bet that\'s where you store your big baby tears. At this point it might be a good idea to <em>look</em> at something. Can you handle that you big baby?').fadeIn(800);

        }

    } //if else Ryan's room

}