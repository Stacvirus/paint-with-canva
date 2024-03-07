import { saveAs } from 'file-saver'
const save = document.querySelector('.download')

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const colors = document.querySelector('.colors')
const thickness = document.querySelector('.bold')
const eraser = document.querySelector('.eraser')
const clear = document.querySelector('.clear')

const svgs = document.querySelectorAll('svg')

let isArase = false
let isRainbow = false
const newColor = {
    color: 'black'
}

//resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.6;

//settings of the canvas
context.strokeStyle = "black";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 10;

//mouse behaviour
var isDraw = false;
var lastX = 0, lastY = 0;
var hue = 0;//rainbaw color

function draw(e) {
    if (!isDraw) return;
    console.log(isRainbow)
    if (isRainbow && !isArase) {
        context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    } else {
        if (!isArase) context.strokeStyle = newColor.color;
    }
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
}

function selectOption(e) {
    const { value, name } = e.target
    console.log(value)
    if (name != 'lineWidth') newColor.color = value
    name == 'strokeStyle' ? context.strokeStyle = value : context.lineWidth = value
}


canvas.addEventListener('mousedown', (e) => {
    isDraw = true;
    [lastX, lastY] = [e.clientX, e.offsetY];
    console.log("fuck");
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDraw = false);
canvas.addEventListener('mouseout', () => isDraw = false);

//other options
colors.addEventListener('change', selectOption)
thickness.addEventListener('change', selectOption)
eraser.addEventListener('click', (e) => {
    console.log('in eraser function')
    isArase = !isArase
    !isArase
        ? context.strokeStyle = newColor.color
        : eraserOption()
})

function eraserOption() {
    console.log(isArase)
    context.strokeStyle = "#ffff";
}

//download your paint
save.addEventListener('click', () => {
    canvas.toBlob((blob) => {
        const imageName = prompt('Enter your paint name: ')
        saveAs(blob, `${imageName}.png`)
    })
})

//show shadow when clicked
svgs.forEach(btn => {
    btn.addEventListener('mousedown', showShadow)
})


function showShadow() {
    console.log(this.title)
    this.classList.contains('svg')
        ? this.style.boxShadow = ''
        : this.style.boxShadow = `0 0 10px 5px ${newColor.color}`
    this.classList.toggle('svg')
    !this.classList.contains('stay') && setTimeout(() => {
        this.style.boxShadow = ``
    }, 2000);

    if (this.classList.contains('Rainbow')) isRainbow = !isRainbow
}

//clear the board
clear.addEventListener('click', () => {
    window.confirm('I sure you want to clear your work ?') && context.clearRect(0, 0, canvas.width, canvas.height)
})
