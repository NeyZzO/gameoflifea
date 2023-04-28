var w, columns, rows;
var board, next;
var gen = false;
var framerate = 30;
w = 15;

function setup() {
    frameRate(framerate);
    createCanvas(1900, 900);
    columns = Math.floor(width / w);
    rows = Math.floor(height / w);
    randomTable();
}

function generateBlank() {
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            board[i][j] = 0;
        }
    }
    next = new Array(columns);
    for (let i = 0; i < columns; i++) {
        next[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            next[i][j] = 0;
        }
    }
}

function randomTable() {
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            board[i][j] = 0;
        }
    }
    next = JSON.parse(JSON.stringify(board));
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = floor(random(2));
            if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1)
                board[i][j] = 0;
        }
    }
}

function draw() {
    background(255);
    if (gen) {
        generate();
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            fill(255);
            if (board[i][j]) fill(0);
            strokeWeight(1);
            stroke(0);
            if (i == 0 || i == columns - 1 || j == 0 || j == rows - 1)
                noStroke();
            rect(i * w, j * w, w, w);
        }
    }
}

function generate() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            let n = 0;
            // Compte le nombre de voisins
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    n += board[x + i][y + j];
                }
            }
            if (n > 4 || n < 3) { // Mort
                next[i][j] = 0;
            } else if (board[i][j] === 0 && n === 3) { // Naissance
                next[i][j] = 1
            } else { // Même état
                next[i][j] = board[i][j];
            }
        }
    }
    let temp = JSON.parse(JSON.stringify(board));
    board = JSON.parse(JSON.stringify(next));
    next = temp;
}

document.addEventListener("keyup", (e) => {
    if (e.keyCode == 32) {
        gen = !gen;
    }
});

// Events part
const changeW = (w2) => {
    w = w2;
};

function mousePressed() {
    let mx = mouseX;
    let my = mouseY;
    let sRow = Math.floor(mx / w);
    let sCol = Math.floor(my / w);
    board[sRow][sCol] = Math.abs(board[sRow][sCol] - 1);
    draw();
}
