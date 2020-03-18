questioncove.event = function(d, f) {
    var e = $.Event(d);
    if(e.type == "insert-notification"){
       console.log("event",e.type);
       console.log("data",f);
    } else {
        for (g in f) {
            e[g] = f[g]
        }
        return $(document).trigger(e)
    }
};
