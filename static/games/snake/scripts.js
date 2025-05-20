document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const restartButton = document.getElementById("restart");
    const scoreText = document.getElementById("score");

    const boxSize = 20;
    let snake = [{ x: 200, y: 200 }];
    let direction = "RIGHT";
    let food = generateFood();
    let score = 0;
    let gameInterval;

    const snakeColor = "#4CAF50";
    const foodColor = "#FF0000";

    function generateFood() {
        return {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Rysowanie węża
        ctx.fillStyle = snakeColor;
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
            ctx.strokeStyle = "#2E7D32";
            ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
        });

        // Rysowanie jedzenia
        ctx.fillStyle = foodColor;
        ctx.beginPath();
        ctx.arc(food.x + boxSize / 2, food.y + boxSize / 2, boxSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function move() {
        let head = { ...snake[0] };

        switch (direction) {
            case "UP": head.y -= boxSize; break;
            case "DOWN": head.y += boxSize; break;
            case "LEFT": head.x -= boxSize; break;
            case "RIGHT": head.x += boxSize; break;
        }

        // Kolizja z jedzeniem
        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
            score += 10;
            scoreText.textContent = `Wynik: ${score}`;
        } else {
            snake.pop();
        }

        // Kolizja ze ścianą
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            gameOver();
            return;
        }

        // Kolizja z własnym ciałem
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        snake.unshift(head);
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert(`Koniec gry! Twój wynik: ${score}`);
    }

    function gameLoop() {
        move();
        draw();
    }

    function startGame() {
        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT";
        food = generateFood();
        score = 0;
        scoreText.textContent = `Wynik: 0`;
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 150);
    }

    restartButton.addEventListener("click", startGame);

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });

    startGame();
});
