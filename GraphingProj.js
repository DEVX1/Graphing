var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
ctx.drawImage(document.getElementById("capitol"), 0, 0);

canvas.onclick = getCursorPosition;

function getCursorPosition(event) {
        
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        //console.log(x, y);
        
        console.log(0.049 * x - 21.69, -0.051 * y + 13.402);
}