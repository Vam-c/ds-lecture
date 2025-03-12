function render(maze) {
    div = document.getElementById("maze");

    const rows = maze.split("\n").filter(row => Boolean(row));

    // Assuming square mazes.
    div.style.gridTemplateRows = `repeat(${rows.length}, 1fr)`;
    div.style.gridTemplateColumns = `repeat(${rows.length}, 1fr)`;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++ ) {
        cols = rows[rowIndex].split(" ");
        console.log(cols)
        for (let colIndex = 0; colIndex < cols.length; colIndex++ ) {
            cell = createCell(cols[colIndex])
            div.appendChild(cell)
        }
    }
}

// Maze elements:
// 
// . -> empty cell
// # -> block
// $ -> starting cell
// ^ -> finishing cell
// ? -> cells waiting to be explored
// * -> path taken to reach destination
function createCell(character) {
    // console.log(character);
    const cell = document.createElement("div")
    cell.className = "cell";


    switch (character) {
        case '.': 
            cell.style.backgroundColor = "white";
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
        case '?': 
            cell.style.backgroundColor = "yellow";
            break;
        case '*': 
            cell.style.backgroundColor = "limegreen";
            break;
        default:
            console.error("Invalid character");
    }

    return cell;
}

const maze = `
$ . . # . .
. # . # . ^
. # . . . .
. . . # # .
. # . . . .
. # . . . .
`

render(maze)