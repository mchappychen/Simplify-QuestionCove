// ==UserScript==
// @name         Simplify QuestionCove
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Make question cove simpler
// @author       mhchen
// @match        https://questioncove.com/*
// @grant        none
// ==/UserScript==

/*
qc.userById('mhchen')
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
                    //console.log(lurkers[0].children[i].firstElementChild.innerText);
                    if(lurkers[0].children[i].firstElementChild){
                        if(lurkers[0].children[i].firstElementChild.innerText == 0){
                            lurkers[0].children[i].parentNode.removeChild(lurkers[0].children[i]);
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
            button.setAttribute('onclick','this.parentNode.parentNode.parentNode.style.display="none"');
            button.setAttribute('style','float:right;padding:5px 10px;margin-right:15px;border-radius:10px;');
            if(!replies[i].innerHTML.contains("this.parentNode.parentNode")){
                replies[i].children[1].children[4].appendChild(button);
            }
        }
        setTimeout(collapseButton,2000);
    }

    function setSameUsernameColor(){
        for(let i=0;i< document.getElementsByClassName('user-link username').length;i++){
            if(document.getElementsByClassName('user-link username')[i].style.display != "none"){
                document.getElementsByClassName('user-link username')[i].setAttribute('style','color:darkorange!important;');
            }
        }
        setTimeout(setSameUsernameColor,1000);
    }


    setTimeout(removeSpam,400);
    setTimeout(start,400);
    setTimeout(deleteSS,500);
    setTimeout(removeMedals,200);
    setTimeout(collapseButton,3000);
    setTimeout(setSameUsernameColor,1000);
})();
