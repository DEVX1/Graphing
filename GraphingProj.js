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
            
            var point1 = document.getElementsByTagName("tr")[parseInt(val1)].children[1].children[0].value;
            //var point1 = [document.getElementsByTagName("tr")[parseInt(val1)].children[1].children[0].value, document.getElementsByTagName("tr")[val1].y];
            point1 = point1.split(",");
            //console.log(point1[0].substr(1, point1[0].length));
            point1[0] = parseFloat(point1[0].substr(1, point1[0].length));
            point1[1] = parseFloat(point1[1].substr(0, point1[0].length));
            //console.log(point1);
            
            var point2 = document.getElementsByTagName("tr")[parseInt(val2)].children[1].children[0].value;
            //var point2 = [document.getElementsByTagName("tr")[parseInt(val1)].children[1].children[0].value, document.getElementsByTagName("tr")[val1].y];
            point2 = point2.split(",");
            //console.log(point2[0].substr(1, point2[0].length));
            point2[0] = parseFloat(point2[0].substr(1, point2[0].length));
            point2[1] = parseFloat(point2[1].substr(0, point2[0].length));
            //console.log(point2);
            
            console.log([point1, point2]);
            
            var equ = regression("linear", [point1, point2]);
            console.log(equ.string);
            
            this.parentElement.parentElement.children[1].children[0].value = 
                equ.string + " { " + Math.min(point1[0], point2[0]) + " < x < " + Math.max(point1[0], point2[0]) + " }";
            //split[0] = split[0].substring(0, split[0].length);
            //split[1] = split[1].substring(0, split[0].length);
            
        }
        //console.log(name);
    } 
    
    document.onclick = function() {
        selected = 0;
    };
    
    window.setInterval(function() {
        //console.log(selected);
    }, 500); 
    
    canvas.onmousemove = getMousePos;
}

function getCursorPosition(event) {
    
    
    var rect = canvas.getBoundingClientRect();
    var x = round(0.049 * (event.clientX - rect.left) - 21.69, 3);
    var y = round(-0.051 * (event.clientY - rect.top) + 13.402, 3);


    if(selected) {
        //           input        td           tr           td          input
        console.log(selected.parentElement.parentElement.children[1].children[0]);
        if(selected.value.substring(0, 1) == "p") {
            selected.parentElement.parentElement.children[1].children[0].value = 
            "(" + x + "," + y + ")";
            selected.x = x;
            selected.y = y;
        }
    }
    
}

function getMousePos() {
    var rect = canvas.getBoundingClientRect();
    var x = round(0.049 * (event.clientX - rect.left) - 21.69, 3);
    var y = round(-0.051 * (event.clientY - rect.top) + 13.402, 3);
    document.getElementById("coords").innerHTML = "(" + x + "," + y + ")";
}

// function line(sel, p1, p2) {
//     //           input  td           tr          table      tr      td             input
//     p1 = sel.parentElement.parentElement.parentElement.children[p1].children[1].children[0].value;
//     console.log(p1);
//     //var point2 = sel.parentElement.parentElement.parentElement.children[p2];
// }

function round(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}

//var test[""]