document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const restartButton = document.getElementById("restart");
    const scoreText = document.getElementById("score");

    const ROWS = 20;
    const COLS = 10;
    const SIZE = 20;
    const board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    let score = 0;
    let gameInterval;
    
    const TETROMINOES = [
        [[1, 1, 1, 1]], // I
        [[1, 1], [1, 1]], // O
        [[0, 1, 0], [1, 1, 1]], // T
        [[1, 1, 0], [0, 1, 1]], // Z
        [[0, 1, 1], [1, 1, 0]], // S
        [[1, 0, 0], [1, 1, 1]], // L
        [[0, 0, 1], [1, 1, 1]]  // J
    ];

    const COLORS = ["#00F0F0", "#F0F000", "#A000F0", "#F00000", "#00F000", "#F0A000", "#0000F0"];

    let currentPiece = getRandomPiece();
    let position = { x: 3, y: 0 };

    function getRandomPiece() {
        const index = Math.floor(Math.random() * TETROMINOES.length);
        return { shape: TETROMINOES[index], color: COLORS[index] };
    }

    function drawSquare(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
    }

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Rysowanie siatki
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c]) {
                    drawSquare(c, r, board[r][c]);
                } else {
                    ctx.strokeStyle = "#444";
                    ctx.strokeRect(c * SIZE, r * SIZE, SIZE, SIZE);
                }
            }
        }

        // Rysowanie spadającego klocka
        currentPiece.shape.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell) drawSquare(position.x + c, position.y + r, currentPiece.color);
            });
        });
    }

    function canMove(newX, newY, newShape = currentPiece.shape) {
        return newShape.every((row, r) =>
            row.every((cell, c) => {
                if (!cell) return true;
                let newRow = newY + r;
                let newCol = newX + c;
                return newRow < ROWS && newCol >= 0 && newCol < COLS && (newRow < 0 || !board[newRow][newCol]);
            })
        );
    }

    function rotate() {
        const newShape = currentPiece.shape[0].map((_, i) =>
            currentPiece.shape.map(row => row[i]).reverse()
        );
        if (canMove(position.x, position.y, newShape)) {
            currentPiece.shape = newShape;
        }
    }

    function move(dir) {
        const newX = position.x + dir;
        if (canMove(newX, position.y)) position.x = newX;
    }

    function drop() {
        if (canMove(position.x, position.y + 1)) {
            position.y++;
        } else {
            placePiece();
        }
    }

    function placePiece() {
        currentPiece.shape.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell) board[position.y + r][position.x + c] = currentPiece.color;
            });
        });
        clearRows();
        currentPiece = getRandomPiece();
        position = { x: 3, y: 0 };
        if (!canMove(position.x, position.y)) gameOver();
    }

    function clearRows() {
        for (let r = ROWS - 1; r >= 0; r--) {
            if (board[r].every(cell => cell)) {
                board.splice(r, 1);
                board.unshift(Array(COLS).fill(0));
                score += 100;
                scoreText.textContent = `Wynik: ${score}`;
            }
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert(`💀 Koniec gry! Twój wynik: ${score}`);
    }

    function gameLoop() {
        drop();
        drawBoard();
    }

    function startGame() {
        for (let r = 0; r < ROWS; r++) board[r].fill(0);
        score = 0;
        scoreText.textContent = `Wynik: 0`;
        currentPiece = getRandomPiece();
        position = { x: 3, y: 0 };
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 500);
    }

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
        if (event.key === "ArrowDown") drop();
        if (event.key === "ArrowUp") rotate();
    });

    restartButton.addEventListener("click", startGame);
    startGame();
});
