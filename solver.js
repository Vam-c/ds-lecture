import { render } from "./maze.js";

const input = `
$ . . # . .
. # . # . ^
. # . . . .
. . . # # .
. # . . . .
. # . . . .
`

// Solution for 1.2.1
const maze = input.split("\n").filter(row => Boolean(row)).map(row => row.split(" "))
console.log(maze);
recursiveDFS([0,0], new Set());

function recursiveDFS(cell, visited) { // Solution for 1.1. => visited (Set).
    // 1. process (process here means to run the same logic) unvisited neighbours.
    //  1.1. Who are visited neighbours?
    //  sol: Store them somewhere (Set/Hashmap).
    // 
    //  1.2. How to GET these neighbours, even if we know which ones are visited?
    //  sol: consider the adjacent cells of current cell. Hmm...
    //         
    //       (idea) A cell can be uniquely identified by it's coordinates in the maze.
    //       1.2.1. How can coordinates be implemented in a program?
    // 
    //       (implementation) The maze can be converted into ROWs and COLUMNs, where
    //       each element of the array (ROW) is itself an array, containing the character
    //       corresponding to each COLUMN in that row. TADA: A 2D array datastructure.
    //       
    //       1.2.2. Getting neighbours? just return the adjacent cells!
    visited.add(cell.join(","));

    // 2. What is our process (logic/algorithm)?
    //
    // We will scan all cells (in some manner: variable 1)
    // until we find the destination.
    if (maze[cell[0]][cell[1]] == '^') {
        console.log("Found the solution!");
        console.log(visited, "are visited");
        render(input);
        throw "Solved!";
    }

    // If this is not the solution cell, process each neighbour.
    // 2.1. We have multiple neighbours of a cell. Which cell to
    //      process next? 
    // sol: It is upto us! Let us start by using the function
    //      call stack, the first neighbour will be explored
    //      till its full depth until there are no paths remaining: 
    //      DEPTH FIRST SEARCH.
    neighbours(cell).forEach(neighbour => {
        if (!visited.has(neighbour.join(","))) recursiveDFS(neighbour, visited);
    });
}

// Solution to 1.2.2.
// 
// Adjacent cells are those which are listed below.
//                     (x, y-1) 
//                         
//         (x-1, y)     (x, y)    (x+1, y)
// 
//                     (x, y+1) 
function neighbours(cell) {
    const left   = [cell[0] - 1, cell[1]];
    const right  = [cell[0] + 1, cell[1]];
    const top    = [cell[0], cell[1] - 1];
    const bottom = [cell[0], cell[1] + 1];

    let cells = [left, right, top, bottom];

    let validCells = [];

    const rows = maze.length;
    const columns = maze[0].length;
    cells.forEach(cell => {
        if ((cell[0] >= 0 && cell[0] < rows) && (cell[1] >= 0 && cell[1] < columns))
            validCells.push(cell);
    })

    return validCells;
}