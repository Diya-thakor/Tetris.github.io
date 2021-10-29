let cvs = document.getElementById('tetris');
let ctx = cvs.getContext("2d");
const ROW = 20;
const COL = 10;
const SQ = squareSize = 30;
const vacant = "rgb(12, 12, 41)";
let speedControl = document.getElementById('speedBtn');
let speed;
speedControl.addEventListener('click', () => {
    speed = document.getElementById('speed').value;
}
);
let levelSelect = document.getElementById('level');
//Create a board-surface for playing the game
//Logical distribution of board using array
let board = [];
function createBoard() {
    for (r = 0; r < ROW; r++) {
        board[r] = [];
        for (c = 0; c < COL; c++) {
            board[r][c] = vacant;
        }
    }
}
createBoard();
//Create square method for creating square
function drawSquare(x, y, color, bgcolor) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    // roundRect(ctx, x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = bgcolor;
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
}
//Distribute entire cvs into square blocks
function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            if (board[r][c] == vacant) {
                drawSquare(c, r, board[r][c], board[r][c]);
            }
            else {
                drawSquare(c, r, board[r][c], "white");
            }
        }
    }
}
drawBoard();

let PIECE = [
    [Z, "rgb(26, 209, 194)"],
    [I, " rgb(230, 240, 97)"],
    [J, "rgb(238, 63, 185)"],
    [L, "rgb(247, 34, 34)"],
    [T, "rgb(156, 11, 105)"],
    [O, "rgb(238, 20, 104)"],
    [S, "rgb(6, 211, 6)"]
];

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;
}

function randomPiece() {
    let r = Math.floor(Math.random() * 7);
    return new Piece(PIECE[r][0], PIECE[r][1]);
}

Piece.prototype.fill = function (color) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color, "white");
            }
        }
    }
}

Piece.prototype.draw = function () {
    p.fill(this.color);
}

Piece.prototype.undraw = function () {
    p.fill(vacant);
    drawBoard();
}

addEventListener('keydown', CONTROL);
let left = document.getElementById('left');
let right = document.getElementById('right');
let rotate = document.getElementById('rotate');
let down = document.getElementById('down');


function CONTROL(event) {
    if (event.keyCode == 37) {
        p.moveLefteft();
    }
    else if (event.keyCode == 38) {
        p.rotate();
    }
    else if (event.keyCode == 39) {
        p.moveRightight();
    }
    else if (event.keyCode == 40) {
        p.moveDownown();
    }
}

Piece.prototype.collision = function (x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            //skip empty square of pattern
            if (!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if (newY < 0) {
                continue;
            }
            //for boundray from left,right or deepest row
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            //for allready fill square
            if (board[newY][newX] != vacant) {
                return true;
            }
        }
    }
    return false;
}

let score = 0;
let scoreElement = document.getElementById('score');
let GameOver = false;

Piece.prototype.lock = function () {
    for (let i = 0; i < this.activeTetromino.length; i++) {
        for (let j = 0; j < this.activeTetromino.length; j++) {
            if (this.activeTetromino[i][j])
                board[this.y + i][this.x + j] = this.color;
        }
    }

    //if the row is full then we have to clear that row
    for (i = 0; i < ROW; i++) {
        let isfull = true;
        for (j = 0; j < COL; j++) {
            isfull = isfull && (board[i][j] != vacant);
        }
        if (isfull) {
            for (let y = i; y > 0; y--) {
                for (let col = 0; col < COL; col++) {
                    board[y][col] = board[y - 1][col];
                }
            }
            score += 10;
            scoreElement.innerHTML = score;
        }
        for (j = 0; j < COL; j++) {
            board[0][j] = vacant;
        }
    }
    drawBoard();

    //check for game over
    if (this.y <= 1) {
        // let modal=document.getElementById('modal');
        // modal.addEventListener('show.bs.modal',function(event){
        //     let modalBodyInput = exampleModal.querySelector('.modal-body input');
        //     modalBodyInput.value = score;
        // })
        alert("Oops!!Game Over...Better luck next time!!");
        speed = 1;
        document.getElementById("speed").value = 1;
        createBoard();
        drawBoard();
        score = 0;
        scoreElement.textContent = score;
    }
}


Piece.prototype.moveLefteft = function () {
    if (!p.collision(-1, 0, this.activeTetromino)) {
        p.undraw();
        this.x--;
        // dropStart = Date.now();
        p.draw();
    }
}

Piece.prototype.moveRightight = function () {
    if (!p.collision(1, 0, this.activeTetromino)) {
        p.undraw();
        this.x++;
        // dropStart = Date.now();
        p.draw();
    }
}

Piece.prototype.moveDownown = function () {
    if (!p.collision(0, 1, this.activeTetromino)) {
        p.undraw();
        this.y++;
        p.draw();
    }
    else {
        p.lock();
        p = randomPiece();
        p.draw();
    }
}

Piece.prototype.rotate = function () {
    let next = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;
    if (this.collision(0, 0, this.activeTetromino)) {
        if (this.x < COL / 2) {
            kick = +1;
        }
        else if (this.x < COL / 2) {
            kick = -1;
        }
    }
    if (!this.collision(kick, 0, next)) {
        this.undraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        // dropStart = Date.now();
        this.draw();
    }
}

let dropStart = Date.now();
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000 / speed) {
        dropStart = Date.now();
        p.moveDownown();
    }
    if (!GameOver) {
        requestAnimationFrame(drop);
    }
}

p = randomPiece();
p.draw();
drop();
left.addEventListener('click', () => p.moveLefteft());
right.addEventListener('click', () => p.moveRightight());
down.addEventListener('click', () => p.moveDownown());
rotate.addEventListener('click', () => p.rotate());

ctx.fillStyle = "rgb(24, 180, 24)";
ctx.fillRect(0, 0, 30, 30);
ctx.strokeStyle = "rgb(31, 128, 31)";
ctx.strokeRect(0, 0, 30, 30);