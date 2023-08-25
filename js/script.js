const DEFAULT_SIZE = 14;
const DEFAULT_MODE = "pencil";
const DEFAULT_COLOR = "#09078d"

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById("pencil-color");
const boardSizeValue = document.getElementById("range-value");
const sizeSlider = document.getElementById("input-range");
const board = document.getElementById("board");
const pencilBtn = document.getElementById("pencilBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");

colorPicker.oninput = (event) => setColor(event.target.value); 
sizeSlider.onmousemove = (event) => updateBoardSizeValue(event.target.value);
sizeSlider.onchange = (event) => changeBoardSize(event.target.value);

let mouseDown = false;
board.onmousedown = () => (mouseDown = true);
board.onmouseup = () => (mouseDown = false);


function updateBoardSizeValue(value){
    boardSizeValue.innerHTML = `${value} <i class="fa fa-light fa-xmark"></i> ${value}`;
}

function changeBoardSize(value){
    setSize(Number(value));
    clearBoard();
}

function setColor(color){
    currentColor = color;
}

function setMode(mode){
    currentMode = mode;

    switch(mode){
        case "pencil":
            pencilBtn.classList.add("active");
            rainbowBtn.classList.remove("active");
            eraserBtn.classList.remove("active");
            break;
        case "rainbow":
            rainbowBtn.classList.add("active");
            pencilBtn.classList.remove("active");
            eraserBtn.classList.remove("active");
            break;
        case "eraser":
            eraserBtn.classList.add("active");
            rainbowBtn.classList.remove("active");
            pencilBtn.classList.remove("active");
    }

}

function setSize(size){
    currentSize = size;
}

function clearBoard(){
    board.innerHTML = "";
    setupBoard(currentSize);
}

function colorPixel(event){
    if(event.type==="mouseover" && mouseDown===false){
        return;
    } else {
        switch(currentMode){
            case "pencil":
                event.target.style.backgroundColor = currentColor;
                break;
            case "eraser":
                event.target.style.backgroundColor = "white";
                break;
            case "rainbow":
                let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0").toUpperCase();
                event.target.style.backgroundColor = randomColor;
                break;
        }
    }
}


function setupBoard(size){
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i=0; i<size*size; i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.addEventListener("mouseover", colorPixel);
        pixel.addEventListener("mousedown", colorPixel);
        board.appendChild(pixel)
    }
}

window.onload = () =>{
    setupBoard(DEFAULT_SIZE);
}

