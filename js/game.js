document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 8;
    const colors = ["red", "green", "blue", "yellow", "purple"];
    const board = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const movesLeftDisplay = document.getElementById("moves-left");
    const timerDisplay = document.getElementById("timer");
    const resetButton = document.getElementById("reset-game");

    let gameArray = [];
    let score = 0;
    let level = 1;
    let movesLeft = 30;
    let timeLeft = 60;
    let timer;

    function createBoard() {
        board.innerHTML = "";
        gameArray = [];
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            cell.dataset.color = randomColor;
            cell.setAttribute("draggable", true);
            board.appendChild(cell);
            gameArray.push(cell);
        }
    }

    function swapElements(el1, el2) {
        let tempColor = el1.dataset.color;
        el1.dataset.color = el2.dataset.color;
        el2.dataset.color = tempColor;
    }

    function checkForMatches() {
        let matchesFound = false;
        for (let i = 0; i < gameArray.length; i++) {
            let rowMatch = [i];
            let colMatch = [i];

            for (let j = 1; j < 3; j++) {
                if (i % boardSize + j < boardSize && gameArray[i].dataset.color === gameArray[i + j].dataset.color) {
                    rowMatch.push(i + j);
                } else {
                    break;
                }
            }

            for (let j = 1; j < 3; j++) {
                if (i + j * boardSize < gameArray.length && gameArray[i].dataset.color === gameArray[i + j * boardSize].dataset.color) {
                    colMatch.push(i + j * boardSize);
                } else {
                    break;
                }
            }

            if (rowMatch.length >= 3) {
                rowMatch.forEach(index => gameArray[index].dataset.color = "");
                score += rowMatch.length * 10;
                matchesFound = true;
            }

            if (colMatch.length >= 3) {
                colMatch.forEach(index => gameArray[index].dataset.color = "");
                score += colMatch.length * 10;
                matchesFound = true;
            }
        }
        return matchesFound;
    }

    function updateBoard() {
        for (let i = 0; i < gameArray.length; i++) {
            if (gameArray[i].dataset.color === "") {
                let randomColor = colors[Math.floor(Math.random() * colors.length)];
                gameArray[i].dataset.color = randomColor;
            }
        }
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        alert(`Игра окончена! Ваши очки: ${score}`);
        resetGame();
    }

    function addDragAndDropEvents() {
        let draggedItem = null;
        gameArray.forEach(cell => {
            cell.addEventListener("dragstart", () => {
                draggedItem = cell;
            });

            cell.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            cell.addEventListener("drop", () => {
                if (draggedItem && draggedItem !== cell) {
                    swapElements(draggedItem, cell);
                    if (checkForMatches()) {
                        updateBoard();
                        movesLeft--;
                        movesLeftDisplay.textContent = movesLeft;
                        scoreDisplay.textContent = score;
                        if (movesLeft <= 0) {
                            endGame();
                        }
                    }
                }
                draggedItem = null;
            });
        });
    }

    function resetGame() {
        score = 0;
        level = 1;
        movesLeft = 30;
        timeLeft = 60;
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        movesLeftDisplay.textContent = movesLeft;
        timerDisplay.textContent = timeLeft;
        createBoard();
        addDragAndDropEvents();
        startTimer();
    }

    createBoard();
    addDragAndDropEvents();
    startTimer();

    resetButton.addEventListener("click", resetGame);
});
