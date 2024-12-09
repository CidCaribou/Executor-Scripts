var opt = 1; // Opacity
var pen = 'none'; // Pen status (none or circle)
var size = 10; // Default size for the circle
var clr = 'black'; // Default color

alert("Keyboard commands: \n c = color picker\n u = pen up\n d = pen down\n s = size\n o = opacity\n Reload to clear.");

function createColorBanner() {
    var color = document.createElement('div');
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(color);
    color.style.position = 'fixed';
    color.style.bottom = '0px';
    color.style.right = '0px';
    color.style.margin = '0px';
    color.style.paddingTop = '0px';
    color.style.width = '1366px';
    color.style.height = '20px';
    color.style.zIndex = 10000;
    color.style.opacity = 0.8;
    color.style.color = 'white';
    color.style.backgroundColor = 'black';
    color.style.border = '0px solid black';
    color.style.textAlign = 'center';
    color.style.cursor = 'pointer';
    color.id = 'color';
    color.style.display = 'circle';
    color.innerText = 'Made by Legend7269';
    document.getElementById('color').addEventListener('click', function() {
        window.open('https://github.com/dragon731012');
    });
}

function mousemove(event) {
    var x = event.clientX;
    var y = event.clientY;
    x = x - 9 - size;
    y = y - 12 - size;

    var elem = document.createElement('div');
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(elem);
    elem.style.position = 'fixed';
    elem.style.top = `${y}px`;
    elem.style.left = `${x}px`;
    elem.style.margin = '10px';
    elem.style.paddingTop = '10px';
    elem.style.width = `${size}px`;
    elem.style.height = `${size}px`;
    elem.style.zIndex = 10000;
    elem.style.opacity = opt;
    elem.style.color = clr;
    elem.style.backgroundColor = clr;
    elem.style.border = '0px solid white';
    elem.style.textAlign = 'center';
    elem.id = 'paint';
    elem.style.display = pen;
    elem.innerText = '';
}

function handleKeydown(event) {
    if (event.key === 'c') {
        clr = prompt("What color do you want? Must be broad, and no caps or special characters (e.g., blue).");
    }
    if (event.key === 's') {
        size = parseInt(prompt("What size do you want? (e.g., 10)"), 10);
    }
    if (event.key === 'u') {
        pen = 'none';
    }
    if (event.key === 'd') {
        pen = 'circle';
    }
    if (event.key === 'o') {
        opt = parseFloat(prompt("What do you want the opacity to be? (1 to 0, 1 = none, 0 = lots of opacity)"));
    }
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("mousemove", mousemove);

// Initialize color banner
createColorBanner();
