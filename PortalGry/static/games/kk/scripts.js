document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const statusText = document.getElementById("game-status");
    const currentPlayerSpan = document.getElementById("current-player");
    const resetButton = document.getElementById("reset");
    const winLine = document.getElementById("win-line");

    let boardState = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    function createBoard() {
        board.innerHTML = "";
        boardState.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            if (cell === "X") cellElement.classList.add("x");
            if (cell === "O") cellElement.classList.add("o");
            cellElement.addEventListener("click", handleCellClick);
            board.appendChild(cellElement);
        });
        board.appendChild(winLine);
        winLine.style.width = "0";
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (boardState[index] || !gameActive) return;

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());

        const winningCombo = checkWin();
        if (winningCombo) {
            drawWinLine(winningCombo);
            statusText.textContent = `Gracz ${currentPlayer} wygrywa!`;
            statusText.classList.replace("is-info", "is-success");
            gameActive = false;
            return;
        }

        if (boardState.every(cell => cell !== "")) {
            statusText.textContent = "Remis!";
            statusText.classList.replace("is-info", "is-warning");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayerSpan.textContent = currentPlayer;
    }

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Poziome
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Pionowe
            [0, 4, 8], [2, 4, 6]              // Ukośne
        ];
        return winningCombinations.find(combination =>
            combination.every(index => boardState[index] === currentPlayer)
        );
    }

    function drawWinLine(combination) {
        const cells = document.querySelectorAll(".cell");
        const firstCell = cells[combination[0]].getBoundingClientRect();
        const lastCell = cells[combination[2]].getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();

        const startX = firstCell.left - boardRect.left + firstCell.width / 2;
        const startY = firstCell.top - boardRect.top + firstCell.height / 2;
        const endX = lastCell.left - boardRect.left + lastCell.width / 2;
        const endY = lastCell.top - boardRect.top + lastCell.height / 2;

        const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

        winLine.style.width = `${distance}px`;
        winLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
    }

    resetButton.addEventListener("click", () => {
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = "Tura gracza: X";
        statusText.className = "notification is-info";
        currentPlayerSpan.textContent = currentPlayer;
        winLine.style.width = "0";
        createBoard();
    });

    createBoard();
});
