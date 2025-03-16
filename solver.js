import { render } from "./maze.js";
import { maze1, maze2, maze3, maze4 } from "./input.js";

// Solution for 1.2.1
const maze = maze4.split("\n").filter(row => Boolean(row)).map(row => row.split(" "))
solve(maze);

async function solve(maze) {
    // 1. process (process here means to run the same logic) unvisited neighbours.
    //  1.1. Unvisited neighbours, how to keep track of visited ones?
    //  sol: Store them somewhere (Set/Hashmap).
    let visited = new Set();
    let parentCellMap = {};
    let previousCell = null;

    // I want you to pay special attention to this.
    // Bootstrapping with start cell to begin.
    const startCellCoordinates = findStartCell(maze)
    let cellsToProcess = [startCellCoordinates];

    // 2. What is our process (logic/algorithm)?
    //
    // 2.1. We should do something UNTIL there are no cellsToProcess.
    while (cellsToProcess.length > 0) {
        // Get a cell from unprocessed cells.
        // 2.2. We have multiple unprocessed cells. Which cell to
        //      process next? 
        // sol: It is upto us! Let us start by fetching the cell which
        //      just entered the list of yet-to-process-cells.
        //      result: the first neighbour will be explored
        //      till its full depth until there are no paths remaining.
        //      DEPTH FIRST SEARCH.
        //      
        //      If we choose the cell which is the oldest one, we will
        //      be BREADTH FIRST SEARCHing for the solution.
        const currentCell = cellsToProcess.shift();

        // Solution for backtracking the path from destination to start.
        parentCellMap[currentCell.join(",")] = previousCell;
        previousCell = currentCell;

        // Mark this cell as visited/processed.
        visited.add(currentCell.join(",")); // NOTE Add debugger here to visualize.

        // If this cell is the destination, we found the solution. Exit.
        if (getCharacter(currentCell) == '^') {
            render(maze, visited, currentCell, [], parentCellMap);
            return;
        }

        // Since the current cell is not the destination cell,
        // we need to process its neighbours (with the same logic, which is looped).
        //  1.2. How to GET these neighbours, even if we know which ones are visited?
        //  sol: consider the adjacent cells of current cell. Hmm...
        //         
        //       (idea) A cell can be uniquely identified by it's coordinates in the maze.
        //       1.2.1. How can coordinates be implemented in a program?
        // 
        //       (implementation) The maze can be converted into ROWs and COLUMNs, where
        //       each element of the array (ROW) is itself an array, containing the character
        //       corresponding to each COLUMN in that row. TADA: A 2D array datastructure.
        //       We can directly lookup what character is in a particular cell in O(1)
        //       instead of looping through our input.
        //       
        //       1.2.2. Getting neighbours? just return the adjacent cells!
        getNeighbours(currentCell).forEach(neighbour => {
            // Maze specific conditions can be handled here. % can mean one way blocks
            // if we want them to be one way blocks :)
            if (!isBlocked(neighbour) && !visited.has(neighbour.join(","))) {
                // Also check if this neighbour is already being 
                // considered for processing. Another edge case.
                let considered = false;
                cellsToProcess.forEach(cell => {
                    if (cell[0] === neighbour[0] && cell[1] === neighbour[1])
                        considered = true;
                })

                if (!considered) cellsToProcess.push(neighbour);
            }

        });
        render(maze, visited, currentCell, cellsToProcess);
        await sleep(300);
    }
}

// Solution to 1.2.2.
// 
// Adjacent cells are those which are listed below.
//                     (x, y-1) 
//                         
//         (x-1, y)     (x, y)    (x+1, y)
// 
//                     (x, y+1) 
function getNeighbours(cell) {
    const left = [cell[0] - 1, cell[1]];
    const right = [cell[0] + 1, cell[1]];
    const top = [cell[0], cell[1] - 1];
    const bottom = [cell[0], cell[1] + 1];

    // NOTE change this to see different results.
    // these are pushed i.e. return value will be reversed.
    let cells = [top, right, bottom, left];

    let validCells = [];

    const rows = maze.length;
    const columns = maze[0].length;
    cells.forEach(cell => {
        // Classic error handling code. This is the part where you might start
        // hating to write code. But without problems, there is no problem solving.
        if ((cell[0] >= 0 && cell[0] < rows) && (cell[1] >= 0 && cell[1] < columns))
            validCells.push(cell);
    })

    return validCells;
}


function getCharacter(cell) {
    return maze[cell[0]][cell[1]];
}

// Finds and returns the coordinates of
// start cell in a maze.
function findStartCell(maze) {
    for (let rowIndex = 0; rowIndex < maze.length; rowIndex++)
        for (let colIndex = 0; colIndex < maze[0].length; colIndex++)
            if (getCharacter([rowIndex, colIndex]) === '$') return [rowIndex, colIndex];
}

function isBlocked(cell) {
    return getCharacter(cell) === "#";
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms))
}