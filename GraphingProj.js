var selected;
var canvas;
var ctx;

window.onload = function() {
    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");
    ctx.drawImage(document.getElementById("capitol"), 0, 0);
    
    canvas.onclick = getCursorPosition;
    
    
    var names = document.getElementsByClassName("name");
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        name.addEventListener("click", onTxtClicked, false);
        // name.onblur = function() {
        //     selected = 0;
        // }
    }
    
    canvas.addEventListener("click", function(e){
        e.stopPropagation(); //don't reset selected if canvas clicked
    }, false);
    
    function onTxtClicked(e) {
        e.stopPropagation();
        //console.log("but you say nothing...");
        //console.log(this);
        selected = this;
        if(this.value.substring(0, 4) == "line") {
            var val1 = this.value.substring(5, 6);
            var val2 = this.value.substring(7, 8);
           //                
            var point1 = [document.getElementsByTagName("tr")[val1].x, document.getElementsByTagName("tr")[val1].x];
            
            var split = this.value.split(",");console.log(split);
            split[0] = split[0].substring(0, split[0].length);
            split[1] = split[1].substring(0, split[0].length);
            
        }
        //console.log(name);
    } 
    
    document.onclick = function() {
        selected = 0;
    };
    
    window.setInterval(function() {
        //console.log(selected);
    }, 500); 
}

function getCursorPosition(event) {
    
    
    var rect = canvas.getBoundingClientRect();
    var x = 0.049 * (event.clientX - rect.left) - 21.69;
    var y = -0.051 * (event.clientY - rect.top) + 13.402;

    if(selected) {
        //           input        td           tr           td          input
        console.log(selected.parentElement.parentElement.children[1].children[0]);
        if(selected.value.substring(0, 5) == "point") {
            selected.parentElement.parentElement.children[1].children[0].value = 
            "(" + x + "," + y + ")";
            selected.x = x;
            selected.y = y;
        }
    }
    
}

function line(sel, p1, p2) {
    //           input  td           tr          table      tr      td             input
    p1 = sel.parentElement.parentElement.parentElement.children[p1].children[1].children[0].value;
    console.log(p1);
    //var point2 = sel.parentElement.parentElement.parentElement.children[p2];
}
//var test[""]