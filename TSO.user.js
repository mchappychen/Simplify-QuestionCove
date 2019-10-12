// ==UserScript==
// @name         For TheSmartOne
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  removes avatars
// @author       You
// @match        https://questioncove.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function removeAvatars(){
        if(document.getElementsByClassName('avatar')){
            for (let i=0;i<document.getElementsByClassName('avatar').length;i++){
                document.getElementsByClassName('avatar')[i].style.display = "none";
            }
        }
        setTimeout(removeAvatars,100);
    }
    setTimeout(removeAvatars,100);
})();
