document.addEventListener("DOMContentLoaded", initializeGame);

function initializeGame() {
    const cells = document.querySelectorAll(".item");
    let currentPlayer = "X";
    let board = Array(9).fill(null);
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = getCellIndex(cell, cells);

        if (board[index] !== null || !gameActive) return;

        const icon = createPlayerIcon(currentPlayer);
        board[index] = currentPlayer;
        cell.append(icon);

        if (checkWin(board)) {
            displayWinMessage(currentPlayer);
            gameActive = false;
        } else if (isBoardFull(board)) {
            displayWinMessage("Draw");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function getCellIndex(cell, cells) {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === cell) return i;
        }
        return -1;
    }

    function createPlayerIcon(player) {
        const icon = document.createElement("i");
        icon.className =
            player === "X"
                ? "fa-solid fa-xmark fa-6x"
                : "fa-solid fa-circle fa-6x";
        return icon;
    }

    function checkWin(board) {
        for (let i = 0; i < winPatterns.length; i++) {
            const a = winPatterns[i][0];
            const b = winPatterns[i][1];
            const c = winPatterns[i][2];

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function isBoardFull(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                return false;
            }
        }
        return true;
    }

    function displayWinMessage(winner) {
        const message = document.createElement("div");
        message.textContent =
            winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`;
        message.id = "winMessage";
        document.body.append(message);
    }

    function resetGame() {
        board.fill(null);
        gameActive = true;
        currentPlayer = "X";
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = "";
        }
        const existingMessage = document.getElementById("winMessage");
        if (existingMessage) existingMessage.remove();
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", handleClick);
    }

    document.getElementById("reset").addEventListener("click", resetGame);
}
