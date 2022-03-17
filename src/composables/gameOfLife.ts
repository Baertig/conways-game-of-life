import { ref, Ref } from "vue";
import { cloneDeep, concat, drop, dropRight, map } from "lodash";

export function createEmptyGameBoardArrayFromSize(size: number): Array<Uint8Array> {
  return new Array(size).fill(new Uint8Array(size).fill(0));
}

export const CellState = Object.freeze({
  DEAD: 0,
  ALIVE: 1,
});

export function calculateNextBoard(gameBoard: Array<Uint8Array>): Array<Uint8Array> {
  const ymax = gameBoard.length;
  const xmax = gameBoard[0].length;
  const newBoard = [];
  for (let y = 0; y < ymax; y++) {
    const row = new Uint8Array(xmax);
    for (let x = 0; x < xmax; x++) {
      const numberLivingOfNeigbours = calculateNumberOfLivingNeighbours(gameBoard, { x, y });
      row[x] = calclulateNextCellState(gameBoard[y][x], numberLivingOfNeigbours);
    }
    newBoard.push(row);
  }
  return newBoard;
}

export function xAndYPositionFromTotalIndexAndSize(
  index: number,
  size: number
): { x: number; y: number } {
  const xPos = index % size;
  const yPos = Math.floor(index / size);
  return { x: xPos, y: yPos };
}

export function calculateNumberOfLivingNeighbours(
  board: Array<Uint8Array>,
  pos: { x: number; y: number }
): number {
  const ymin = Math.max(pos.y - 1, 0);
  const ymax = Math.min(pos.y + 1, board.length - 1);
  const xmin = Math.max(pos.x - 1, 0);
  const xmax = Math.min(pos.x + 1, board.length - 1);
  let livingNeighbours = 0;
  for (let y = ymin; y <= ymax; y++) {
    for (let x = xmin; x <= xmax; x++) {
      livingNeighbours += board[y][x];
    }
  }
  livingNeighbours -= board[pos.y][pos.x]; //because we don't want to count the current cell
  return livingNeighbours;
}

export function doesCellSurvive({
  numberOfLivingNeighbours,
}: {
  numberOfLivingNeighbours: number;
}): boolean {
  if (numberOfLivingNeighbours <= 1) {
    return false;
  } else if (numberOfLivingNeighbours <= 3) {
    return true;
  } else {
    return false;
  }
}

export function willCellPopulate({
  numberOfLivingNeighbours,
}: {
  numberOfLivingNeighbours: number;
}): boolean {
  if (numberOfLivingNeighbours === 3) {
    return true;
  }
  return false;
}

export function calclulateNextCellState(
  currentState: number,
  numberOfLivingNeighbours: number
): number {
  if (currentState === CellState.DEAD) {
    return willCellPopulate({ numberOfLivingNeighbours }) ? CellState.ALIVE : CellState.DEAD;
  } else if (currentState === CellState.ALIVE) {
    return doesCellSurvive({ numberOfLivingNeighbours }) ? CellState.ALIVE : CellState.DEAD;
  } else {
    console.error(`Unexpected Value in GameBoard: ${currentState}`);
    return CellState.DEAD;
  }
}
export function growGameboard(
  gameBoard: Array<Uint8Array>,
  requiredSize: number
): Array<Uint8Array> {
  if (gameBoard.length >= requiredSize) {
    return gameBoard;
  }
  return growGameboard(addOneRowAndColToBoard(gameBoard), requiredSize);
}

function addOneRowAndColToBoard(gameBoard: Array<Uint8Array>) {
  return addRowToGameBoard(addColToGameBoard(gameBoard));
}

export function addRowToGameBoard(gameBoard: Array<Uint8Array>) {
  const newRow = new Uint8Array(gameBoard[0].length).fill(0);
  if (gameBoard.length % 2 == 0) {
    return concat(gameBoard, [newRow]);
  } else {
    return concat([newRow], gameBoard);
  }
}

export function addColToGameBoard(gameBoard: Array<Uint8Array>): Array<Uint8Array> {
  if (gameBoard[0].length % 2 == 0) {
    return map(gameBoard, (row) => Uint8Array.of(...row, 0));
  } else {
    return map(gameBoard, (row) => Uint8Array.of(0, ...row));
  }
}

export function shrinkGameBoard(gameBoard: Array<Uint8Array>, size: number): Array<Uint8Array> {
  if (gameBoard.length <= size) {
    return gameBoard;
  }
  return shrinkGameBoard(removeOneRowAndColFromGameBoard(gameBoard), size);
}

function removeOneRowAndColFromGameBoard(gameBoard: Array<Uint8Array>) {
  return removeRowFromGameBoard(removeColFromGameBoard(gameBoard));
}
export function removeRowFromGameBoard(gameBoard: Array<Uint8Array>) {
  if (gameBoard.length % 2 === 0) {
    return drop(gameBoard);
  } else {
    return dropRight(gameBoard);
  }
}

export function removeColFromGameBoard(gameBoard: Array<Uint8Array>): Array<Uint8Array> {
  if (gameBoard[0].length % 2 === 0) {
    return map(gameBoard, (row) => Uint8Array.of(...row.subarray(1)));
  } else {
    return map(gameBoard, (row) => Uint8Array.of(...row.subarray(0, row.length - 1)));
  }
}

export function countActiveCells(gameBoard: Array<Uint8Array>) {
  const sumOfUint8Array = (array: Uint8Array) => {
    return array.reduce((acc, number) => acc + number);
  };
  return gameBoard.reduce((sum, array) => sum + sumOfUint8Array(array), 0);
}
