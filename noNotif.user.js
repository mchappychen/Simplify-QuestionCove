window.unSubbed = [];

questioncove.event = function(d, f) {
    var e = $.Event(d);
    if(e.type == "insert-notification"){
       console.log("data",f.notificationJson);
       if(!unSubbed.includes(f.notificationJson.id)){
            for (g in f) {
                e[g] = f[g]
            }
            return $(document).trigger(e)
       } else {
           console.log("no notif pls");
       }
    } else {
        for (g in f) {
            e[g] = f[g]
        }
        return $(document).trigger(e)
    }
};

function makeUnsubButton(){
    if($(".update-list")[0]){
        for(let i=0;i<$(".update-list")[0].children.length;i++){
            try{
                if(!$(".update-list")[0].children[i].children[2].innerHTML.includes("<button>")){
                    let mhchenButton = document.createElement("button");
                    mhchenButton.appendChild(document.createTextNode("Unsub"));
                    mhchenButton.onclick = function(){unSubbed.push(this.parentNode.parentNode.getAttribute("data-id"))}
                    $(".update-list")[0].children[i].children[2].appendChild(mhchenButton);
                }
            } catch(e){
                //console.log(e);
            }
        }
    }
    setTimeout(makeUnsubButton,2000);
}
setTimeout(makeUnsubButton,4000);
