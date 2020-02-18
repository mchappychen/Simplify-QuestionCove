
// ==UserScript==
// @name         Simplify QuestionCove
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  Make question cove simpler
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
            document.getElementsByClassName('user-link username')[i].setAttribute('style','color:darkorange!important;');
            if(document.getElementsByClassName('user-link username')[i].innerText == "mhchen" || document.getElementsByClassName('user-link username')[i].innerText == "mhchen:"){
                document.getElementsByClassName('user-link username')[i].setAttribute('style','color:magenta!important;');
            }
        }
    }
    setTimeout(setSameUsernameColor,1000);
}

setTimeout(collapseButton,5000);


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


let waitForAeon = false;
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
        var voice = new SpeechSynthesisUtterance(trueMessage);
        var smoothVoice = speechSynthesis.getVoices()[17];
        var mickeyVoice = speechSynthesis.getVoices()[49];
        voice.voice = mickeyVoice;
        voice.pitch = 2;
        voice.rate = 0.9;
        speechSynthesis.cancel();
        speechSynthesis.speak(voice);

        if(roomid == mhchenRoom){
            if(trueMessage.substring(0,4) == "\\ai "){
                sendGlobalChat(trueMessage);
                waitForAeon = true;
            }
            if(trueMessage.substring(0,8) == "what is "){
                try{
                    let evaluated = eval(trueMessage.substring(8));
                    sendToChat(mhchenRoom,evaluated);
                } catch(e){
                    sendToChat(mhchenRoom,"Syntax Error");
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
    var e = $.Event(d);

    if(d == "insert-chat"){
        if(waitForAeon){
            if(f.chatJson.poster == "aeon"){
                sendToChat(mhchenRoom,f.chatJson.body);
                waitForAeon = false;
            }
        }
        let trueMessage = f.chatJson.body.toLowerCase();
        let messageSender = f.chatJson.poster.toLowerCase();
    }

    if(d == "message-received"){
        let sender = f.messageJson.sender.toLowerCase();
        let message = f.messageJson.body.toLowerCase();
        console.log(sender,message);
    }

    for (var g in f) {e[g] = f[g]}
    return $(document).trigger(e);
};


//Time to work on profile rotater

let redString = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgABQAFAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A4CiiioP6UP/Z";
let orangeString = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SEhUSEg8VFRUXFxUXFRcVFRUVFRUVFxcXFxcVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0NFQ8PFS0dFR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAIBABAQEAAQQCAwAAAAAAAAAAAAERQRIh0fAx4QJRgf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgb/xAAYEQEBAQEBAAAAAAAAAAAAAAAAEQExIf/aAAwDAQACEQMRAD8A6gpHEO7QUBJVhgCaqUBRFAEUQDTQANAAAAAABQFoAQwAqAvUHUiACAoABAACgAABQAABBUAFAQUFRdRQNJRMEXRAFExQMQ0RVTQUWoe0AqsqCiLQBAFEAXUKtA0RQASiKBABFAENBYQARUUDEXQGVCCgigFIACKABQAANInCgRUAUSggqFFVAEFACgACKBsEwFURQQUgIqRREUBUFMBICghigCLAQAARQAAEKoKVFARQBNF/iApQEAAIAAAACAoAAFAClAAAAAAAAADQAgAnVBAqqsQAUAAMIgFgAAAigAFACgBAACEAAAAAAgAAJ0CgtEUERUBVl7Kyq1FVNXWvEMZXUZ1QBAIABbyAAFACgAABAAAAA0EwawFrIoAioAogKAIAAGAAFAAAAAKAAKgAABAAABnv+xrsC1FQ8gYACgAlVFAAERaAqKAAAgYigAUAAAAAAAIAyq9ILUFQAgAKkABUBQBBBQEKoEKAAAIKmCrABAAAABUqgIaAioooAAAAAIAABQAAAAAAAIoIAAAAAAABgCiKIiqAIAAAAFCgAAAAAKAqIEAAAAAAAAABdDEARQUAEAAAFAIACoAVUgKUKCCogRQXAxGkq7gIoyAigi0FAACJPgEFEAOFoKCABVvyAH0lAFp4QBpAUTysQZFngBRqce8p+QNbxEIDCpwtBRPtaAAAP//Z";
let yellowString = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgADwAPAwEiAAIRAQMRAf/EABUAAQEAAAAAAAAAAAAAAAAAAAAJ/8QAFxAAAwEAAAAAAAAAAAAAAAAAAAERYf/EABUBAQEAAAAAAAAAAAAAAAAAAAYJ/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AoJRRcCaJVnD/2Q==";
let greenString = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAPTGF2YzU3Ljg5LjEwMP/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAVMCWgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAACf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKwAlmiuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==";
let blueString = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAFaAc0DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCOApiegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==";
let purpleString = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAFAAUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDlPBfjy/8A7LKOA+0gAk0UUV/bOJwtD20vdR/QVWjT53of/9k=";

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){u8arr[n] = bstr.charCodeAt(n);}
    return new File([u8arr], filename, {type:mime});
}

let pics = [];
pics.push(dataURLtoFile(redString,"red.jpg"));
pics.push(dataURLtoFile(orangeString,"orange.jpg"));
pics.push(dataURLtoFile(yellowString,"yellow.jpg"));
pics.push(dataURLtoFile(greenString,"green.jpg"));
pics.push(dataURLtoFile(blueString,"blue.jpg"));
pics.push(dataURLtoFile(purpleString,"purple.jpg"));

let picIndex = 0;

function rotatePic(){
    picIndex++;
    if(picIndex == pics.length){picIndex = 0}
    let form_data = new FormData();
    form_data.append('file', pics[picIndex]);
    $.ajax({type: "POST",url: "/ajax_request/profilepictureupload.php",xhrFields: {withCredentials: true},data: form_data,cache: false,contentType: false,processData: false});
    setTimeout(rotatePic,1000);
}

if(rotatePics){
    setTimeout(rotatePic,1000);
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

ultrilliam.postGroupChat = function(group) {
    let original = $('section[data-group-id="' + group.toLowerCase() + '"]').find('.chat-body').val();
    let newMsg = "[center][font=Arial Black]";

    function colorText(str){
        let phase = 0;
        let center = 128;
        let width = 127;
        let frequency = Math.PI*2/str.length;
        let returnThis = "";
        for (var i = 0; i < str.length; ++i){
            let red   = Math.sin(frequency*i+2+phase) * width + center;
            let green = Math.sin(frequency*i+0+phase) * width + center;
            let blue  = Math.sin(frequency*i+4+phase) * width + center;
            returnThis += '[color=' + '#' + byte2Hex(red) + byte2Hex(green) + byte2Hex(blue) + ']' + str.substr(i,1) + '[/color]';
        }
        return returnThis;
    }
    function byte2Hex(n){
        return String("0123456789ABCDEF".substr((n >> 4) & 0x0F,1)) + "0123456789ABCDEF".substr(n & 0x0F,1);
    }

    newMsg += colorText(original);
    console.log(newMsg);

    $.ajax({
        type: "POST",
        url: "/ajax_request/",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "chat_post": newMsg,
            "group_id": group
        }
    }).done(function() {
        ga('send', 'event', 'Chat', 'Sent', group);
    });
}

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.recognition = new SpeechRecognition();
recognition.continuous = false;

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 116) {
        recognition.onresult = function(event) {
            var current = event.resultIndex;
            console.log(event.results[current][0].transcript);
            sendToChat(mhchenRoom,event.results[current][0].transcript);
        }
        recognition.start();
    }
    if(event.keyCode == 121){
        recognition.onresult = function(event) {
            var current = event.resultIndex;
            console.log(event.results[current][0].transcript);
            sendGlobalChat(event.results[current][0].transcript);
        }
        recognition.start();
    }
})
recognition.onerror = function(event) {console.log(event);}
