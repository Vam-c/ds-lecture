export function render(maze, visitedCells, currentCell, cellsToProcess, parentMap = null) {
    const div = document.getElementById("maze");
    div.innerHTML = "";

    // Assuming square mazes.
    div.style.gridTemplateRows = `repeat(${maze.length}, 1fr)`;
    div.style.gridTemplateColumns = `repeat(${maze[0].length}, 1fr)`;

    maze.forEach((row, rowIndex) =>
        row.forEach((character, colIndex) => {
            // Override characters for special cells. Order matters.
            cellsToProcess.forEach((cell, i) => {
                if (cell[0] === rowIndex && cell[1] === colIndex) character = i;
            });
            if (rowIndex === currentCell[0] && colIndex === currentCell[1]) character = '@';

            const cell = createCell(character, visitedCells.has([rowIndex, colIndex].join(",")));
            div.appendChild(cell);
        })
    )

    renderArray(cellsToProcess);
}

// Maze elements:
// 
// . -> empty cell
// @ -> current cell
// # -> blocked cell
// $ -> starting cell
// ^ -> finishing cell
// ? -> cells waiting to be processed
// * -> path taken to reach destination
function createCell(character, visited) {
    const cell = document.createElement("div")
    cell.className = "cell";

    switch (character) {
        case '.':
            if (visited) cell.style.backgroundColor = "yellow";
            else cell.style.backgroundColor = "white";
            break;
        case '#':
            cell.style.backgroundColor = "gray";
            break;
        case '$':
            cell.style.backgroundColor = "lightblue";
            break;
        case '^':
            cell.style.backgroundColor = "limegreen";
            break;
        case '*':
            cell.style.backgroundColor = "limegreen";
            break;
        case '@':
            cell.style.backgroundColor = "red";
            break;
        default:
            cell.style.backgroundColor = "orange";
            cell.innerText = character;
            break;
    }

    return cell;
}


function renderArray(array) {
    const div = document.getElementById("array");
    div.innerHTML = "";
    console.log(array);

    array.forEach((element, i)=> {
        const cell = document.createElement("div")
        cell.className = "cell";
        cell.style.backgroundColor = "lightblue";
        cell.innerHTML = `
        <strong>${i}</strong> <br/>
        <span>${element}</span>`;
        div.appendChild(cell);
    });
}