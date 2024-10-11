document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 8;
    const colors = ["red", "green", "blue", "yellow", "purple"];
    const board = document.getElementById("game-board");
    let gameArray = [];

    function createBoard() {
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
            }

            if (colMatch.length >= 3) {
                colMatch.forEach(index => gameArray[index].dataset.color = "");
            }
        }
    }

    function updateBoard() {
        for (let i = 0; i < gameArray.length; i++) {
            if (gameArray[i].dataset.color === "") {
                let randomColor = colors[Math.floor(Math.random() * colors.length)];
                gameArray[i].dataset.color = randomColor;
            }
        }
    }

    createBoard();

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
                checkForMatches();
                updateBoard();
            }
            draggedItem = null;
        });
    });
});
