var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const colors = document.querySelector('.colors')

//resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.6;

//settings of the canvas
context.strokeStyle = "#BADASS";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 20;

//mouse behaviour
var isDraw = false;
var lastX = 0, lastY = 0;
var hue = 0;//rainbaw color

function draw(e) {
    if (!isDraw) return;
    // context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
}

function selectColor(e) {
    context.strokeStyle = e.target.value
}

colors.addEventListener('change', selectColor)

canvas.addEventListener('mousedown', (e) => {
    isDraw = true;
    [lastX, lastY] = [e.clientX, e.offsetY];
    console.log("fuck");
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDraw = false);
canvas.addEventListener('mouseout', () => isDraw = false);

