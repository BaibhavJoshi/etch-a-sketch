DEFAULT_SIZE = 14;

const board = document.getElementById("board");

colors = [
    "#FAF0D7",
    "#FFD9C0",
    "#8CC0DE",
    "#CCEEBC"
];

function setupBoard(size){
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i=0; i<size*size; i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        board.appendChild(pixel)
    }
}

window.onload = () =>{
    setupBoard(DEFAULT_SIZE);
}