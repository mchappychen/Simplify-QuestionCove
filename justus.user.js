
// ==UserScript==
// @name         For Justus
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  Question Cove Modifier
// @author       mhchen
// @match        https://questioncove.com/study*
// @grant        none
// ==/UserScript==

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
            if(document.getElementsByClassName('user-link username')[i].innerText.toLowerCase() == "justus" || document.getElementsByClassName('user-link username')[i].innerText.toLowerCase() == "justus:"){
                document.getElementsByClassName('user-link username')[i].setAttribute('style','color:lime!important;');
            } else if(document.getElementsByClassName('user-link username')[i].innerText.toLowerCase() == "justjm" || document.getElementsByClassName('user-link username')[i].innerText.toLowerCase() == "justjm:"){
                document.getElementsByClassName('user-link username')[i].setAttribute('style','color:blue!important;');
            } else {
                document.getElementsByClassName('user-link username')[i].setAttribute('style','color:red!important;');
            }
        }
    }
    setTimeout(setSameUsernameColor,600);
}

setTimeout(collapseButton,5000);
setTimeout(setSameUsernameColor,2000);


window.sendGlobalChat = function(x){
    document.getElementById('chat-body-all-subjects').value = x;
    questioncove.currentGroup().value.submitFn();
    document.getElementById('chat-body-all-subjects').value = "";
}
window.sendToChat = function(room,message){
    if(room == "global"){
        sendGlobalChat(message);
    } else {
        $.ajax({
            type: "POST",
            url: "/ajax_request/group_chat/send_chat.php",
            xhrFields: {
                withCredentials: true
            },
            data:{"chat_body":message,"room_id":room}
        });
    }
}
window.sendToUser = function(name,message){
    $.ajax({
        type: "POST",
        url: "/ajax_request/",
        xhrFields: {withCredentials: true},
        data: {
            "messagereciever": name,
            "messagebody": message,
            "sendmessage": "_"
        }
    })
}

ultrilliam.addMessageToRoom = function(roomid,message) {
    if (message != "") {
        var chatelement = $(".ultrilliamchat[data-room-id='"+roomid+"']");
        var chatcontainerelement = chatelement.find('.ultrilliamchatcontainer');
        chatcontainerelement.attr("data-load-num", parseInt(chatcontainerelement.attr("data-load-num"))+1);
        chatcontainerelement.append(message);
        ultrilliam.updateUserClassesInRoom(roomid);
        let trueMessage = message.substring(message.indexOf('body')+6);
        trueMessage = trueMessage.substring(0,trueMessage.indexOf("</p>"));
        let messageSender = message.substring(message.indexOf('data-poster-id')+16,message.indexOf("data-bind")-2);

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
    var e = $.Event(d);

    if(d == "message-received"){
        let sender = f.messageJson.sender.toLowerCase();
        let message = f.messageJson.body.toLowerCase();
        console.log(sender,message);
    }

    for (var g in f) {e[g] = f[g]}
    return $(document).trigger(e);
};






