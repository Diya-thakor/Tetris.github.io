const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];
/*Piece.prototype.fill = function (color) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

function random(){
    let random=Math.floor(Math.random()*7);
    return new Piece(PIECE[random][0],PIECE[random][1]);
}

//For this Piece constructor function we want methods like:draw,undraw,collision,moveLefteft,moveRightight,moveDownown...
Piece.prototype.draw = function () {
    this.fill(this.color);
}

Piece.prototype.undraw = function () {
    this.fill(vacant);
}

//control the piece

addEventListener('keydown', CONTROL);
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
let dropStart = Date.now()
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        dropStart = Date.now();
        p.moveDownown();
    }
    requestAnimationFrame(drop);
}

Piece.prototype.collision = function (x,y,piece) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            let newX=this.x+x+c;
            let newY=this.y+y+r;
            if (newX < 0 || newX > COL || newY > ROW) {
                return true;
            }
            if (newY < 0) {
                continue;
            }
            if(board[newX][newY]!=vacant){
                return true;
            }
        }
    }
    return false;
}

Piece.prototype.moveDownown = function () {
    if (!this.collision(0,1,this.activeTetromino)) {
        this.undraw();
        this.y++;
        this.draw();
    }
}

Piece.prototype.moveLefteft = function () {
    if (!this.collision(-1,0,this.activeTetromino)) {
        this.undraw();
        this.x--;
        this.draw();
        dropStart = Date.now()
    }
}

Piece.prototype.moveRightight = function () {
    if (!this.collision(1,0,this.activeTetromino)) {
        this.undraw();
        this.x++;
        this.draw();
        dropStart = Date.now()
    }
}

Piece.prototype.rotate = function () {
    if(this.collision){

    }
    // if (!this.collision) {
        this.undraw;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw;
        dropStart = Date.now()
    // }
}
p=random();
p.draw();
console.log(p);
drop();*/
//     for (r = 0; r < this.activeTetromino.length; r++) {
    //         for (c = 0; c < this.activeTetromino.length; c++) {
    //             if (this.activeTetromino[r][c]) {
    //                 board[r + this.y][c + this.x] = this.color;
    //             }
    //         }
    //     }
    //     for (r = 0; r < ROW; r++) {
    //         let isFull = true;
    //         for (c = 0; c < COL; c++) {
    //             isFull = isFull && (board[r][c] != vacant);
    //         }
    //         if (isFull) {
    //             for (y = r; y > 1; y--) {
    //                 for (c = 0; c < COL; c++) {
    //                     board[y][c] = board[y - 1][c];
    //                 }
    //             }
    //             for (c = 0; c < COL; c++) {
    //                 board[0][c] = vacant;
    //             }
    //             score += 10;
    //         }
    //         drawBoard();
    //     }
    //     scoreElement.innerHTML = score;
    //     if (this.y <= 1) {
    //         alert("Game Over");
    //         score = 0;
    //         document.getElementById('speed').value=3;
    //         speed=3;
    //         scoreElement.innerHTML = score;
    //         createBoard();
    //         drawBoard();
    //     }