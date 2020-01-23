// ==UserScript==
// @name         Simplify QuestionCove
// @namespace    http://tampermonkey.net/
// @version      6.1
// @description  Make question cove simpler
// @author       mhchen
// @match        https://questioncove.com/study*
// @grant        none
// ==/UserScript==

let globalEval = 1;
let sendFacts = 0;
let jokes = [];
let facts = [];
let waitForAeon = false;
let mhchenRoom = "5dc46ab62b1fe9fe05b2c400";
let payloadRoom = "5dc477ac7eb78a6f2e995c00";

window.removedPosts = [];

(function() {

    function simplifyPosts(){
        /* REMOVE SS SCORES FROM POSTS */
        let posts = document.getElementsByClassName('update-list all-questions loaded open-questions')[0].children;
        for (let i=0;i<posts.length;i++){
            if(posts[i].firstChild.nextElementSibling){
                posts[i].firstChild.nextElementSibling.style.display = "none";
            }
        }

        /* REMOVE UPDATE STATUSES FROM POSTS */
        let postStatuses = document.getElementsByClassName('update-status-template');
        for (let i=0;i<postStatuses.length;i++){
            postStatuses[i].parentNode.removeChild(postStatuses[i]);
        }

        /* REMOVE AUTHOR NAME FROM POSTS */
        let tier1Names = document.getElementsByClassName('username user-link colon-suffixed tier-1');
        let tier2Names = document.getElementsByClassName('username user-link colon-suffixed tier-2');
        let tier3Names = document.getElementsByClassName('username user-link colon-suffixed tier-3');
        let tier4Names = document.getElementsByClassName('username user-link colon-suffixed tier-4');
        let tier5Names = document.getElementsByClassName('username user-link colon-suffixed tier-5');
        for(let i=0;i<tier1Names.length;i++){
            tier1Names[i].style.display = "none";
        }
        for(let i=0;i<tier2Names.length;i++){
            tier2Names[i].style.display = "none";
        }
        for(let i=0;i<tier3Names.length;i++){
            tier3Names[i].style.display = "none";
        }
        for(let i=0;i<tier4Names.length;i++){
            tier4Names[i].style.display = "none";
        }
        for(let i=0;i<tier5Names.length;i++){
            tier5Names[i].style.display = "none";
        }

        setTimeout(simplifyPosts,200);
    }

    /* REMOVE SS SCORES FROM EVERYWHERE */
    function deleteSS(){
        if(document.getElementsByClassName('avatar-link user-link poster tier-1')){
            let SSscores = document.getElementsByClassName('avatar-link user-link poster tier-1');
            for(let i=0;i<SSscores.length;i++){
                SSscores[i].style.display = "none";
            }
        }
        if(document.getElementsByClassName('avatar-link user-link poster tier-2')){
            let SSscores = document.getElementsByClassName('avatar-link user-link poster tier-2');
            for(let i=0;i<SSscores.length;i++){
                SSscores[i].style.display = "none";
            }
        }
        if(document.getElementsByClassName('avatar-link user-link poster tier-3')){
            let SSscores = document.getElementsByClassName('avatar-link user-link poster tier-3');
            for(let i=0;i<SSscores.length;i++){
                SSscores[i].style.display = "none";
            }
        }
        if(document.getElementsByClassName('avatar-link user-link poster tier-4')){
            let SSscores = document.getElementsByClassName('avatar-link user-link poster tier-4');
            for(let i=0;i<SSscores.length;i++){
                SSscores[i].style.display = "none";
            }
        }
        if(document.getElementsByClassName('avatar-link user-link poster tier-5')){
            let SSscores = document.getElementsByClassName('avatar-link user-link poster tier-5');
            for(let i=0;i<SSscores.length;i++){
                SSscores[i].style.display = "none";
            }
        }
        if(document.getElementsByClassName('level')){
            let SSscores = document.getElementsByClassName('level');
            for(let i=0;i<SSscores.length;i++){
                SSscores[i].style.display = "none";
            }
        }
        if(document.getElementsByClassName('current-action')){
            let SSscores = document.getElementsByClassName('current-action');
            for(let i=0;i<SSscores.length;i++){
                if(SSscores[i].innerText == "is just looking around"){
                    SSscores[i].parentNode.removeChild(SSscores[i]);
                }
            }
        }
        setTimeout(deleteSS,200);
    }

    /* REMOVE MEDALS */
    function removeMedals(){
        if(document.getElementsByClassName('medal-count')){
            let medals = document.getElementsByClassName('medal-count');
            for(let i=0;i<medals.length;i++){
                medals[i].parentNode.removeChild(medals[i]);
            }
        }
        if(document.getElementsByClassName('medals')){
            let medals = document.getElementsByClassName('medals');
            for(let i=0;i<medals.length;i++){
                medals[i].parentNode.removeChild(medals[i]);
            }
        }
        setTimeout(removeMedals,200);
    }

    /* REMOVE POSTS WITH SS SCORE OF 0 */
    function removeSpam(){
        if(document.getElementsByClassName('update-list all-questions loaded open-questions')){
            let lurkers = document.getElementsByClassName('update-list all-questions loaded open-questions');
            if(lurkers.length >0){
                for(let i=1;i<lurkers[0].children.length;i++){
                    if(lurkers[0].children[i].firstElementChild){
                        if(lurkers[0].children[i].firstElementChild.innerText == 0){
                            lurkers[0].children[i].parentNode.removeChild(lurkers[0].children[i]);
                        } else {
                            //add a border frame
                            lurkers[0].children[i].style.border = "4px solid #FF6EC7"
                            lurkers[0].children[i].children[2].style.borderRadius = "20px"
                        }
                    }
                }
            }
        }

        setTimeout(removeSpam,200);
    }

    function start(){

        if(document.getElementsByClassName('update-list all-questions loaded open-questions')[0]){
            if(document.getElementsByClassName('update-list all-questions loaded open-questions')[0].children){
                for(let i=0;i<2;i++){
                    setTimeout(simplifyPosts,100);
                }
            } else {
                setTimeout(start,200);
            }
        } else {
            setTimeout(start,200);
        }
    }
    function collapseButton(){
        let replies = document.getElementsByClassName('replies')[0].children;
        for(let i=0;i<replies.length;i++){
            let button = document.createElement("button");
            button.innerText = "Collapse"
            button.setAttribute('onclick','this.parentNode.parentNode.parentNode.style.display="none";window.removedPosts.push(this.parentNode.parentNode.parentNode.getAttribute("data-id"));');
            button.setAttribute('style','float:right;padding:6px 25px;margin-right:5px;border-radius:10px;');
            if(!replies[i].innerHTML.contains("this.parentNode.parentNode")){
                replies[i].children[1].children[4].appendChild(button);
            }
        }

        //remove posts that are collapsed
        for(let i=0;i<replies.length;i++){
            if(window.removedPosts.includes(replies[i].getAttribute("data-id"))){
                replies[i].style.display = "none !important";
            }
        }

        setTimeout(collapseButton,2000);
    }
    function setSameUsernameColor(){
        for(let i=0;i< document.getElementsByClassName('user-link username').length;i++){
            if(document.getElementsByClassName('user-link username')[i].style.display != "none"){
                document.getElementsByClassName('user-link username')[i].setAttribute('style','color:darkorange!important;');
                if(document.getElementsByClassName('user-link username')[i].innerText == "justus" || document.getElementsByClassName('user-link username')[i].innerText == "justus:" ){
                    document.getElementsByClassName('user-link username')[i].setAttribute('style','color:lime!important;');
                }
                if(document.getElementsByClassName('user-link username')[i].innerText == "mhchen" ||  document.getElementsByClassName('user-link username')[i].innerText == "mhchen:"){
                    document.getElementsByClassName('user-link username')[i].setAttribute('style','color:magenta!important;');
                }
            }
        }
        setTimeout(setSameUsernameColor,1000);
    }
    function removeSubtitle(){
        for(let i=0;i< document.getElementsByClassName('rank-text').length;i++){
            if(document.getElementsByClassName('rank-text')[i].style.display != "none"){
                document.getElementsByClassName('rank-text')[i].style.display = "none";
            }
        }
        setTimeout(removeSubtitle,1000);
    }
    function removeAvatars(){
        //Remove default-page avatars:
        let defaultPagePeople = document.getElementById('online-users').children[3].children;
        for(let i=0;i<defaultPagePeople.length;i++){
            defaultPagePeople[i].children[0].style.display="none";
        }

        setTimeout(removeAvatars,1000);
    }

    document.getElementsByClassName('logo')[3].style.borderRadius = "20px";

    setTimeout(removeSpam,400);
    setTimeout(start,400);
    setTimeout(deleteSS,500);
    setTimeout(removeMedals,200);
    setTimeout(collapseButton,3000);
    setTimeout(setSameUsernameColor,1000);
    setTimeout(removeSubtitle,1500);

})();

function blowItUp(){
    if(document.getElementsByClassName('group-chat info-closed ultrilliamchat chat-open')[0]){
        document.getElementsByClassName('group-chat info-closed ultrilliamchat chat-open')[0].style.width = "700px";
        document.getElementsByClassName('group-chat info-closed ultrilliamchat chat-open')[0].style.height = "620px";
        document.getElementsByClassName('group-chat info-closed ultrilliamchat chat-open')[0].style.fontSize = "21px";
    }
}

setTimeout(blowItUp,5000);

window.sendGlobalChat = function(x){
    document.getElementById('chat-body-all-subjects').value = x;
    questioncove.currentGroup().value.submitFn()
    document.getElementById('chat-body-all-subjects').value = "";
}

let sendToChat = function(room,message){
    $.ajax({
        type: "POST",
        url: "/ajax_request/group_chat/send_chat.php",
        xhrFields: {
            withCredentials: true
        },
        data:{"chat_body":message,"room_id":room}
    });
}

let gameRunning = false;
let players = [];
let gameState = 0;
let criminalIndex = 0;
let night = 1;

ultrilliam.addMessageToRoom = function(roomid,message) {
    if (message != "") {
        var chatelement = $(".ultrilliamchat[data-room-id='"+roomid+"']");
        var chatcontainerelement = chatelement.find('.ultrilliamchatcontainer');
        chatcontainerelement.attr("data-load-num", parseInt(chatcontainerelement.attr("data-load-num"))+1);
        chatcontainerelement.append(message);
        ultrilliam.updateUserClassesInRoom(roomid);

        if(roomid == "5dc46ab62b1fe9fe05b2c400"){
            let trueMessage = message.substring(message.indexOf('body')+6);
            trueMessage = trueMessage.substring(0,trueMessage.indexOf("</p>"));

            if(trueMessage.substring(0,4) == "\\ai "){
                sendGlobalChat(trueMessage);
                waitForAeon = true;
            }
            if(trueMessage == "joke"){
                let firstJoke = Math.floor(Math.random()*jokes.length);
                if(jokes[firstJoke].substring(0,1)=="A"){
                    firstJoke--;
                }
                let first = jokes[firstJoke];
                let second = jokes[firstJoke+1];
                $.ajax({
                    type: "POST",
                    url: "/ajax_request/group_chat/send_chat.php",
                    xhrFields: {
                        withCredentials: true
                    },
                    data:{"chat_body":first,"room_id":"5dc46ab62b1fe9fe05b2c400"}
                });
                function tellTheJoke(){
                    $.ajax({
                        type: "POST",
                        url: "/ajax_request/group_chat/send_chat.php",
                        xhrFields: {
                            withCredentials: true
                        },
                        data:{"chat_body":second,"room_id":"5dc46ab62b1fe9fe05b2c400"}
                    });
                }
                setTimeout( tellTheJoke , 4000);
            }
            if(trueMessage.substring(0,8) == "what is "){
                try{
                    let evaluated = eval(trueMessage.substring(8));
                    $.ajax({
                        type: "POST",
                        url: "/ajax_request/group_chat/send_chat.php",
                        xhrFields: {
                            withCredentials: true
                        },
                        data:{"chat_body":evaluated,"room_id":"5dc46ab62b1fe9fe05b2c400"}
                    });
                } catch(e){
                    $.ajax({
                        type: "POST",
                        url: "/ajax_request/group_chat/send_chat.php",
                        xhrFields: {
                            withCredentials: true
                        },
                        data:{"chat_body":"Syntax Error","room_id":"5dc46ab62b1fe9fe05b2c400"}
                    });
                }
            }
            if(trueMessage == "start game" && !gameRunning){
                gameRunning = true;
                sendToChat("5dc46ab62b1fe9fe05b2c400","Everyone who wants to play has 10 seconds to type something");
                gameState = 0;
                function changeGameStateTo1(){
                    gameState = 1;
                    sendToChat("5dc46ab62b1fe9fe05b2c400",players.length + " players have joined the game"+" added to the game");
                    if(players.length>2){
                        criminalIndex = Math.floor(Math.random()*players.length);
                    } else {
                        sendToChat("5dc46ab62b1fe9fe05b2c400","Not enough people, game ended");
                        gameState = 0;
                        gameRunning = false;
                    }

                }
                setTimeout(changeGameStateTo1,10000);
            }
            if(gameRunning){
                if(gameState == 0){
                    let playerName = message.substring(message.indexOf('data-poster-id')+16,message.indexOf("data-bind")-2);
                    if(!players.includes(playerName)){
                        players.push(playerName);
                        console.log(players);
                        sendToChat("5dc46ab62b1fe9fe05b2c400",playerName+" added to the game");
                    }
                } else if(gameState == 1){
                    sendToChat(mhchenRoom,"Night one begins. You have 20 seconds to reply to my DM");
                }
            }
        }

        if (chatelement.hasClass("chat-open")) {
            if (Math.floor(chatcontainerelement[0].scrollHeight) - Math.floor(chatcontainerelement.scrollTop()) - 150 < chatcontainerelement.height() && Math.floor(chatcontainerelement[0].scrollHeight) - Math.floor(chatcontainerelement.scrollTop()) + 150 > chatcontainerelement.height()) {
                chatcontainerelement.scrollTop(Math.floor(chatcontainerelement[0].scrollHeight));
            }
        } else {
            chatelement.addClass("strobing");
            chatelement.addClass("unread");
        }
    }
}


questioncove.event = function(d, f) {
    var e, g;
    e = $.Event(d);

    if(d == "insert-chat"){
        if(waitForAeon){
            if(f.chatJson.poster == "aeon"){
                $.ajax({
                    type: "POST",
                    url: "/ajax_request/group_chat/send_chat.php",
                    xhrFields: {
                        withCredentials: true
                    },
                    data:{"chat_body":f.chatJson.body,"room_id":"5dc46ab62b1fe9fe05b2c400"}
                });
                waitForAeon = false;
            }
        }
        if(f.chatJson.body.includes("joke")){
            let firstJoke = Math.floor(Math.random()*jokes.length);
            if(jokes[firstJoke].substring(0,1)=="A"){
                firstJoke--;
            }
            let first = jokes[firstJoke];
            let second = jokes[firstJoke+1];
            sendGlobalChat(first);
            function tellTheJoke(){
                sendGlobalChat(second);
            }
            setTimeout( tellTheJoke , 4000);
        }
        if(f.chatJson.body.substring(0,8)=="what is " && globalEval){
            try{
                let evaluated = eval(f.chatJson.body.substring(8));
                sendGlobalChat(evaluated);
            } catch(e){
                sendGlobalChat("Error");
            }
        }
    }

    if(d == "message-received"){
        let sender = f.messageJson.sender;
        let message = f.messageJson.body;
        sendToChat(mhchenRoom,sender+" wrote '"+message+"' in my dms");
    }

    for (g in f) {
        e[g] = f[g]
    }
    return $(document).trigger(e);
};



let jokeString = "1. Q: What did the baby corn say to the mama corn?,A: Where’s pop corn?,2. Q: What did one toilet say to another?,A: You look flushed!,3. Q: How do you make an egg-roll?,A: You push it!,4. Q: Did you hear about the race between the lettuce and the tomato?,A: The lettuce was a-head and the tomato was trying to ketchup.,5. Q: What do you call a group of unorganized cats?,A: A cat-astrophe!,6. Q: What do you call a mermaid on a roof?,A: Aerial.,7. Q: What do you call security guards working outside Samsung shops?,A: Guardians of the Galaxy.,8. Q: Why couldn’t the sesame seed leave the gambling casino?,A: Because he was on a roll.,9. Q: Why did the picture go to jail?,A: Because he was framed!,10. Q: Have you heard the cookie joke?,A: Nah, but I wouldn’t like it. I’m sure it’s pretty crumby.,11. Q: What disease do you get when you decorate for Christmas?,A: Tinselitus!,12. Q: What is an astronaut’s favorite place on a computer?,A: The space bar!,13. Q: What did the mayonnaise say when someone opened the fridge door?,A: Close the door – I’m dressing!,14. Q: Why don’t they play poker in the jungle?,A: Too many cheetahs!,15. Q: Why was the sand wet?,A: The sea weed.,16. Q: What do you get when you cross a snowman with a vampire?,A: Frostbite.,17. Q: Why couldn’t the bike stand by itself?,A: It was two-tired.,18. Q: How many tickles does it take to make an octopus laugh?,A: Tentickles.,19. Q: Why is the sky so unhappy?,A: It has the blues!,20. Q: Why did the poor man sell yeast?,A: Because he was trying to raise some dough!,21. Q: Why didn’t the toiled paper cross the road?,A: Because it got stuck in a crack.,22. Q: Have you seen the movie Constipation?,A: No, it hasn’t come out yet.,23. Q: What do you call bees who produce milk?,A: Boo-bees.,24. Q: What do you call a T-Rex that’s been beaten up?,A: Dino-sore.,25. Q: Why does Snoop Dogg use an umbrella?,A: For drizzle.,26. Q: Why did Johnny throw a clock out the window?,A: Because he wanted to see time fly.,27. Q: Why did the smart phone need glasses?,A: It lost its contacts.,28. Q: What do you call an alligator in a vest?,A: An in-vest-igator.,29. Q: What did one eye say to the other eye?,A: Something smells between us.,30. Q: What did the football coach say to the broken vending machine?,A: Give me my quarter back!,31. Q: What do lawyers wear to court?,A: Lawsuits!,32. Q: Why can’t ghosts have babies?,A: Because they have a Halloweenie!,33. Q: Why should you feel sorry for shopping carts?,A: Because they always get pushed around.,34. Q: Why aren’t teddybears hungry?,A: Because they’re stuffed!,35. Q: What did the tree say to the wind?,A: Leaf me alone!,36. Q: How does a squid go into battle?,A: Well armed!,37. Q: What do you call a magic owl?,A: Hoodini!,38. Q: How do you find Will Smith in the snow?,A: Follow the Fresh Prince!,39. Q: What does a horse saw when it’s fallen?,A: Help, I can’t giddy up!,40. Q: How do billboards talk?,A: Sign language!,40. Q: What do they call cans in Mexico?,A: Mexi-cans!,41. Q: How did the hipster burn his tongue?,A: He drank his coffee before it was cool!,42. Q: How do asteroids get so big?,A: They take A-Steriod!,43. Q: What kind of tea is hard to swallow?,A: Reality!,44. Q: What did one pair of jeans say to another pair?,A: That’s jeanius!,45. Q: Why did the scarecrow win an award?,A: Because he was out-standing in his field!,46. Q: How do snails fight?,A: They slug it out!,47. Q: What would bears be without bees?,A: Ears.,48. Q: Where does Friday come before Thursday?,A: In the dictionary!,49. Q: Why don’t you ever see hippopotamus hiding in the trees?,A: Because they’re really good at it!,50. Q: Why did the fish get bad grades?,A: Because it was below sea level!,51. Q: How do crazy people walk through the forest?,A: They take the psycho path!,52. Q: What did the worker at the rubber band factory say when he lost his job?,A: Oh, snap!,53. Q: How many lips does a tulip have?,A: Two-lips.,54. Q: What did one hat say to the other when they met on a person’s head?,A: You stay here, I’ll move a head!,55. Q: Did you hear about the nun who quit?,A: She kicked her habit!,56. Q: What did the elder chimney say to the younger chimney?,A: You’re too young to smoke!,57. Q: What lights up a soccer stadium?,A: A soccer match.,58. Q: What’s Dr. Jekyll when he’s himself?,A: De-hyde-rated!,59. Q: Why shouldn’t you write with a broken pencil?,A: Because it’s pointless!,60. Q: What’s the difference between a poorly dressed man on a tricycle and a well dressed man on a bicycle?,A: Attire!,61. Q: Why are movie stars so cool?,A: Because they have a lot of fans!,62. Q: What do you call cheer that isn’t yours?,A: Nacho cheese!,63. Q: When is a door not a door?,A: When it’s a jar!,64. Q: What do you call four bullfighters standing in quicksand?,A: Quattro sinko!,65. Q: The hot dog and the banana had a race. Who won?,A: The wiener!,66. Q: Why are televisions attracted to people?,A: Because they turn them on.,67. Q: What lies at the bottom of the ocean and twitches?,A: A nervous wreck!,68. Q: Why did the fish get bad grades?,A: Because it was below sea level!,69. Q: What does a nut say when it sneezes?,A: Cashews!,70. Q: Why couldn’t Dracula’s wife sleep?,A: Because his coffin!,71. Q: What do you call pretty ghosts?,A: Bootiful.,70. Q: What did the lawyer name his daughter?,A: Sue!,71. Q: Why did the barber win the race?,A: Because he took a short cut!,72. Q: What do you call a pile of cats?,A: A meowntain.,73. Q: What do you call a sleeping bull?,A: A bull-dozer!,74. Q: What do you call a singing laptop?,A: A Dell.,75. Q: What pet makes the loudest noise?,A: A trum-pet!,76. Q: What do you call an anxious dinosaur?,A: Nervous Rex!,77. Q: What’s the best day to go to the beach?,A: Sunday.,78. Q: Where do beef burgers go to dance?,A: The meatball!,79. Q: Why was a guy looking for food on his friend?,A: Because his friend said dinner’s on me!,80. Q: What do you call clumsy grapes?,A: Unconcordinated!,81. Q: Did you hear the joke about the roof?,A: Never mind, it’s over your head!,82. Q: What’s orange and sounds like parrot?,A: A carrot.,83. Q: Why didn’t the skeleton go to the dance?,A: Because he had no-body to go with.,84. Q: What’s a bear with no teeth called?,A: A gummy bear.,85. Q: Why did the tomato turn red?,A: It saw the salad dressing.,86. Q: What’s the moon’s favorite gum?,A: Orbit.,87. Q: Why did the robber take a bath?,A: Because he wanted to make a clean getaway.,88. Q: What kind of music do mummies listen to?,A: Wrap music.,89. Q: What did the judge say to the dentist before having his tooth pulled?,A: Do you swear to pull the tooth, the whole tooth and nothing but the tooth?,90. Q: How do you impress a female baker?,A: You bring her flours.,91. Q: Why did the boy tiptoe past the medicine cabinet?,A: He didn’t want to wake the sleeping pills.,91. Q: When is a car no longer a car?,A: When it turns into a street.,92. Q: Who cleans the bottom of the ocean?,A: A mer-maid.,93. Q: What do you get when you cross a fish with an elephant?,A: Swimming trunks.,94. Q: How do you flatten a ghost?,A: Use a spirit level.,95. Q: What’s heavy forward but not backward?,A: A ton.,96. Q: Where did the cow take his date?,A: To the mooooovies.,97. Q: What stays in a corner, but travels the world?,A: A stamp!,98. Q: Why do cows wear bells?,A: Because their horns don’t work.,99. Q: What do you call two fat people having a chat?,A: A heavy discussion.,100. Q: What did they do with the cow that learned the whole bible?,A: Put it out to pastor.,101. Q: Why did the traffic light turn red?,A: You would too if you had to change in the middle of the street!,102. Q: What shoes does an artist wear?,A: Sketchers.,103. Q: What do you call a man that irons clothes?,A: Iron Man.,104. Q: Who married the hamburger?,A: Patty did.,105. Q: What kind of egg did the bad chicken lay.,A: A deviled egg!,106. Q: How do you make a Swiss roll?,A: Push him down a mountain.,107. Q: What kind of key opens the door on Thanksgiving?,A: A turkey.,108. Q: Why are frogs so happy?,A: They eat whatever bugs them.,109. Q: What do you call a show made out of a banana?,A: A slipper.,110. Q: When do you stop at green and go at red?,A: When you’re eating a watermelon.,111. Q: Why do French people eat snails?,A: Because they don’t like fast food.,112. Q: Why did the man put his money in the freezer?,A: Because he wanted cold hard cash.,113. Q: Why is corn such a good listener?,A: Because it’s all ears.,114. Q: What kind of crackers do firemen like in their soup?,A: Firecrackers.,115. Q: What do you call an unpredictable camera?,A: A loose Canon.,116. Q: What crime did the tree commit?,A: Treeson.,117. Q: Why do bananas wear sunscreen?,A: To stop them from peeling.,118. Q: What do you call a young locomotive?,A: A trainee.,119. Q: Why do guys play baseball?,A: To get to first base.,120. Q: What does the former soap addict say?,A: I’m clean.";
let jokeString2 = "How do you throw a space party? You planet. How was Rome split in two? With a pair of Ceasars. Nope. Unintended. The shovel was a ground breaking invention, but everyone was blow away by the leaf blower. A scarecrow says, 'This job isn't for everyone, but hay, it's in my jeans.' Did you hear about the guy who lost the left side of his body? He's alright now. What do you call a girl with one leg that's shorter than the other? Ilene. The broom swept the nation away. I did a theatrical performance on puns. It was a play on words. What does a clock do when it's hungry? It goes back for seconds. What do you do with a dead chemist? You barium. I bet the person who created the door knocker won a Nobel prize. Towels can’t tell jokes. They have a dry sense of humor. Two birds are sitting on a perch and one says “Do you smell fish?” Did you hear about the cheese factory that exploded in france? There was nothing but des brie. Do you know sign language? You should learn it, it’s pretty handy. What do you call a beautiful pumpkin? GOURDgeous. Why did one banana spy on the other? Because she was appealing. What do you call a cow with no legs? Ground beef. What do you call a cow with two legs? Lean beef. What do you call a cow with all of its legs? High steaks. A cross eyed teacher couldn’t control his pupils. After the accident, the juggler didn’t have the balls to do it. I used to be afraid of hurdles, but I got over it. To write with a broken pencil is pointless. I read a book on anti-gravity. I couldn’t put it down. I couldn’t remember how to throw a boomerang but it came back to me. What did the buffalo say to his son? Bison. What should you do if you’re cold? Stand in the corner. It’s 90 degrees. How does Moses make coffee? Hebrews it. The energizer bunny went to jail. He was charged with battery. What did the alien say to the pitcher of water? Take me to your liter. What happens when you eat too many spaghettiOs? You have a vowel movement. The soldier who survived mustard gas and pepper spray was a seasoned veteran. Sausage puns are the wurst. What do you call a bear with no teeth? A gummy bear. How did Darth Vader know what luke was getting him for his birthday? He could sense his presence. Why shouldn’t you trust atoms? They make up everything. What’s the difference between a bench, a fish, and a bucket of glue? You can’t tune a bench but you can tuna fish. I bet you got stuck on the bucket of glue part. What’s it called when you have too many aliens? Extraterrestrials. Want to hear a pizza joke? Nevermind, it’s too cheesy. What do you call a fake noodle? An impasta. What do cows tell each other at bedtime? Dairy tales. Why can’t you take inventory in Afghanistan? Because of the tally ban. Why didn’t the lion win the race? Because he was racing a cheetah. Why did the man dig a hole in his neighbor’s backyard and fill it with water? Because he meant well. What happens to nitrogen when the sun comes up? It becomes daytrogen. What’s it called when you put a cow in an elevator? Raising the steaks. What’s america’s favorite soda? Mini soda. Why did the tomato turn red? Because it saw the salad dressing. What kind of car does a sheep drive? A lamborghini, but if that breaks down they drive their SuBAHHru. What do you call a spanish pig? Porque. What do you call a line of rabbits marching backwards? A receding hairline. Why don’t vampires go to barbecues? They don’t like steak. A cabbage and celery walk into a bar and the cabbage gets served first because he was a head. How do trees access the internet? They log on. Why should you never trust a train? They have loco motives."
jokes = jokeString.split(',');
jokes = jokes.concat(jokeString2.split(/\.|\?/));
let factString = "Banging your head against a wall for one hour burns 150 calories.In Switzerland it is illegal to own just one guinea pig.Pteronophobia is the fear of being tickled by feathers.Snakes can help predict earthquakes.A flock of crows is known as a murder.The oldest “your mom” joke was discovered on a 3,500 year old Babylonian tablet.So far, two diseases have successfully been eradicated: smallpox and rinderpest.29th May is officially “Put a Pillow on Your Fridge Day”.Cherophobia is an irrational fear of fun or happiness.7% of American adults believe that chocolate milk comes from brown cows.If you lift a kangaroo’s tail off the ground it can’t hop.Bananas are curved because they grow towards the sun.Billy goats urinate on their own heads to smell more attractive to females.The inventor of the Frisbee was cremated and made into a Frisbee after he died.During your lifetime, you will produce enough saliva to fill two swimming pools.If Pinocchio says “My Nose Will Grow Now”, it would cause a paradox.Polar bears could eat as many as 86 penguins in a single sitting…King Henry VIII slept with a gigantic axe beside him.Movie trailers were originally shown after the movie, which is why they were called “trailers”.An eagle can kill a young deer and fly away with it.Heart attacks are more likely to happen on a Monday.Tennis players are not allowed to swear when they are playing in Wimbledon.In 2017 more people were killed from injuries caused by taking a selfie than by shark attacks.The top six foods that make your fart are beans, corn, bell peppers, cauliflower, cabbage and milk.There is a species of spider called the Hobo Spider.A lion’s roar can be heard from 5 miles away.Saint Lucia is the only country in the world named after a woman.A baby spider is called a spiderling.The United States Navy has started using Xbox controllers for their periscopes.The following can be read forward and backwards: Do geese see God?A baby octopus is about the size of a flea when it is born.A sheep, a duck and a rooster were the first passengers in a hot air balloon.In Uganda, around 48% of the population is under 15 years of age.The average male gets bored of a shopping trip after 26 minutes.In the 16th Century, Turkish women could initiate a divorce if their husbands didn’t pour coffee for them.Recycling one glass jar saves enough energy to watch television for 3 hours.After the premiere of “16 and Pregnant,” teen pregnancy rates dropped.Approximately 10-20% of U.S. power outages are caused by squirrels.Facebook, Instagram and Twitter are all banned in China.95% of people text things they could never say in person.Honeybees can recognize human faces.The Battle of Hastings didn’t take place in Hastings.While trying to find a cure for AIDS, the Mayo Clinic made glow in the dark cats.A swarm of 20,000 bees followed a car for two days because their queen was stuck inside.Nearly 3% of the ice in Antarctic glaciers is penguin urine.Bob Dylan’s real name is Robert Zimmerman.A crocodile can’t poke its tongue out.Sea otters hold hands when they sleep so they don’t drift away from each other.A small child could swim through the veins of a blue whale.Bin Laden’s death was announced on 1st May 2011. Hitler’s death was announced on 1st May 1945.J.K. Rowling chose the unusual name “Hermione” so young girls wouldn’t be teased for being nerdy.Hewlett-Packard’s (also known as HP) name was decided in a coin toss in 1939.There is a total of 1,710 steps in the Eiffel Tower.The Pokémon Hitmonlee and Hitmonchan are based off of Bruce Lee and Jackie Chan.A woman tried to commit suicide by jumping off the Empire State Building. She jumped from the 86th floor but was blown back onto the 85th floor by a gust of wind.Pirates wore earrings because they believed it improved their eyesight.Los Angeles’s full name is “El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula.”The Twitter bird actually has a name – Larry.Octopuses have four pairs of arms.In the popular sitcom, Parks and Recreation, the writers had no idea Nick Offerman was a talented saxophone player when they wrote the Duke Silver plot line.It snowed in the Sahara desert for 30 minutes on the 18th February 1979.Mike Tyson once offered a zoo attendant 10,000 dollars to let him fight a gorilla.ABBA turned down 1 billion dollars to do a reunion tour.There has never been a verified snow leopard attack on a human being.The first alarm clock could only ring at 4 a.m.Birds don’t urinate.Dying is illegal in the Houses of Parliaments.The most venomous jellyfish in the world is the Irukandji.The 20th of March is Snowman Burning Day.Queen Elizabeth can’t sit on the Iron Throne from Game of Thrones.There is official Wizard of New Zealand.An apple, potato, and onion all taste the same if you eat them with your nose plugged.Vincent van Gogh only sold one painting in his lifetime.A company in Taiwan makes dinnerware out of wheat, so you can eat your plate!The average person walks the equivalent of five times around the world in their lifetime.Michael Jackson offered to make a Harry Potter musical, but J.K. Rowling rejected the idea.The world record for stuffing drinking straws into your mouth at once is 459.Nutella was invented during WWII, when hazelnuts were mixed into chocolate to extend chocolate rations.In 2011, more than 1 in 3 divorce filings in the U.S. contained the word “Facebook.”According to Genesis 1:20-22 the chicken came before the egg.Honeybees can get drunk on fermented tree sap.Tears contain a natural pain killer which reduces pain and improves your mood.Squirrels forget where they hide about half of their nuts.Millions of birds a year die from smashing into windows in the U.S. alone.Dolly Parton lost in a Dolly Parton look-alike contest.George W. Bush was once a cheerleader.In total, there are 205 bones in the skeleton of a horse.Coca-Cola owns all website URLs that can be read as ahh, all the way up to 62 h’s.Each year there are more than 40,000 toilet related injuries in the United States.Strawberries can be red, yellow, green or white.Mewtwo is a clone of the Pokémon Mew, yet it comes before Mew in the Pokédex.Four people lived in a home for 6 months infested with about 2,000 brown recluse spiders, but none of them were harmed.Madonna suffers from brontophobia, which is the fear of thunder.In June 2017, the Facebook community reached 2 billion active users.Samuel L. Jackson requested a purple lightsaber in Star Wars in order for him to accept the part as Mace Windu.Paraskavedekatriaphobia is the fear of Friday the 13th.Kleenex tissues were originally used as filters in gas masks.In 1998, Sony accidentally sold 700,000 camcorders that had the technology to see through people’s clothes.During your lifetime, you will spend around thirty-eight days brushing your teeth.Ronald McDonald is “Donald McDonald” in Japan because it makes pronunciation easier for the Japanese.";
facts = factString.split(".");


function sendFunFacts(){
    if(sendFacts){
        let fact = facts[Math.floor(Math.random()*facts.length)];
        sendGlobalChat("Fun fact: "+ fact);
        setTimeout(sendFunFacts,60000);
    }
}

setTimeout(sendFunFacts,60000);
