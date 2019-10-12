// ==UserScript==
// @name         QC Message Delete Button
// @version      1.0
// @description  adds a delete button to messages in QC
// @author       mhchen
// @match        questioncove.com/*
// @grant        none
// ==/UserScript==

(function() {
    
    
    window.deletedMessageIds = [];
    if(localStorage.getItem("deletedMessageIds")){
        window.deletedMessageIds = JSON.parse(localStorage.getItem("deletedMessageIds"));
    } else {
        localStorage.setItem("deletedMessageIds" , JSON.stringify(window.deletedMessageIds) );
    }

    let messages = document.getElementsByClassName('messages')[1].children;
    for(let i=0;i<messages.length;i++){
        //show delete button
        messages[i].children[5].children[1].children[0].style.display = "block";
        //add function to delete button to delete messages
     let messageId = messages[i].getAttribute("data-id");
    messages[i].children[5].children[1].children[0].setAttribute("onclick","window.deletedMessageIds.push('"+messageId+"');this.parentNode.parentNode.parentNode.style.display='none'");
    }
})();
