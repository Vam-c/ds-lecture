export function render(maze, visited) {
    const div = document.getElementById("maze");
    div.innerHTML = "";

    // Assuming square mazes.
    div.style.gridTemplateRows = `repeat(${maze.length}, 1fr)`;
    div.style.gridTemplateColumns = `repeat(${maze[0].length}, 1fr)`;

    maze.forEach((row, rowIndex) =>
        row.forEach((character, colIndex) => {
            const cell = createCell(character, visited.has([rowIndex, colIndex].join(",")));
            div.appendChild(cell);
        })
    )
}

// Maze elements:
// 
// . -> empty cell
// # -> block
// $ -> starting cell
// ^ -> finishing cell
// ? -> cells waiting to be explored
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
        default:
            console.error("Invalid character");
    }

    return cell;
}