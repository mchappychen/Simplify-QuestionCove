// ==UserScript==
// @name         Simplifies QuestionCove
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Makes QuestionCove more minimalistic
// @author       mhchen
// @match        https://questioncove.com/*
// @grant        none
// ==/UserScript==

/*
qc.userById('mhchen') just so I remember this exists
*/
(function() {
    'use strict';
    function simplifyPosts(){
        /* REMOVE SS SCORES FROM POSTS */
        let posts = document.getElementsByClassName('update-list all-questions loaded open-questions')[0].children;
        for (let i=0;i<posts.length;i++){
            //console.log(posts[i].firstChild.nextElementSibling);
            if(posts[i].firstChild.nextElementSibling){
                posts[i].firstChild.nextElementSibling.style.display = "none";
            }
        }

        /* REMOVE UPDATE STATUSES FROM POSTS */
        let postStatuses = document.getElementsByClassName('update-status-template');
        for (let i=0;i<postStatuses.length;i++){
            postStatuses[i].parentNode.removeChild(postStatuses[i]);
        }
        setTimeout(simplifyPosts,1000);
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
        setTimeout(deleteSS,1000);
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
        setTimeout(removeMedals,800);
    }

    /* REMOVE POSTS WITH SS SCORE OF 0 */
    function removeSpam(){
        if(document.getElementsByClassName('update-list all-questions loaded open-questions')){
            let lurkers = document.getElementsByClassName('update-list all-questions loaded open-questions');
            if(lurkers.length >0){
                for(let i=1;i<lurkers[0].children.length;i++){
                    //console.log(lurkers[0].children[i].firstElementChild.innerText);
                    if(lurkers[0].children[i].firstElementChild){
                        if(lurkers[0].children[i].firstElementChild.innerText == 0){
                            lurkers[0].children[i].parentNode.removeChild(lurkers[0].children[i]);
                        }
                    }
                }
            }
        }
        setTimeout(removeSpam,500);
    }


    function start(){
        if(document.getElementsByClassName('update-list all-questions loaded open-questions')[0]){
            if(document.getElementsByClassName('update-list all-questions loaded open-questions')[0].children){
                for(let i=0;i<2;i++){
                    setTimeout(simplifyPosts,100);
                }
            } else {
               setTimeout(start,700);
            }
        } else {
           setTimeout(start,700);
        }
    }


    setTimeout(removeSpam,400);
    setTimeout(start,400);
    setTimeout(deleteSS,500);
    setTimeout(removeMedals,200);

})();
