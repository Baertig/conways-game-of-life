import { ref, Ref } from "vue";
import { concat, drop, dropRight, map } from "lodash";

export function createEmptyGameBoardArrayFromSize(size: number): number[][] {
  return new Array(size).fill(new Array(size).fill(0));
}
export function xAndYPositionFromTotalIndexAndSize(
  index: number,
  size: number
): { x: number; y: number } {
  const xPos = index % size;
  const yPos = Math.floor(index / size);
  return { x: xPos, y: yPos };
}

export function numberOfLivingNeighbours(board: number[][], pos: { x: number; y: number }): number {
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
  livingNeighbours -= board[pos.y][pos.x]; //because we don't want to count the own cell
  return livingNeighbours;
}

export function doesCellSurvive(board: number[][], pos: { x: number; y: number }): boolean {
  const neighbours = numberOfLivingNeighbours(board, pos);
  if (neighbours <= 1) {
    return false;
  } else if (neighbours <= 3) {
    return true;
  } else {
    return false;
  }
}

export function willCellPopulate(board: number[][], pos: { x: number; y: number }): boolean {
  const neighbours = numberOfLivingNeighbours(board, pos);
  if (neighbours === 3) {
    return true;
  }
  return false;
}

export function useGameOfLife(size: number) {
  const gameBoard = ref(createEmptyGameBoardArrayFromSize(size));
  const boardSize = size;

  function reset(size = boardSize) {
    gameBoard.value = createEmptyGameBoardArrayFromSize(size);
  }

  function calculateNextBoard() {
    const ymax = gameBoard.value.length;
    const xmax = gameBoard.value[0].length;
    const newBoard = [];
    for (let y = 0; y < ymax; y++) {
      const row = [...gameBoard.value[y]];
      for (let x = 0; x < xmax; x++) {
        if (row[x] === 0) {
          row[x] = willCellPopulate(gameBoard.value, { x, y }) ? 1 : 0;
        } else if (row[x] === 1) {
          row[x] = doesCellSurvive(gameBoard.value, { x, y }) ? 1 : 0;
        } else {
          console.error(`Unexpected Value in GameBoard: ${row[x]}`);
        }
      }
      newBoard.push(row);
    }
    gameBoard.value = newBoard;
  }

  return { gameBoard, calculateNextBoard, reset };
}

export function calculateNextBoard(gameBoard: number[][]) {
  const ymax = gameBoard.length;
  const xmax = gameBoard[0].length;
  const newBoard = [];
  for (let y = 0; y < ymax; y++) {
    const row = [...gameBoard[y]];
    for (let x = 0; x < xmax; x++) {
      if (row[x] === 0) {
        row[x] = willCellPopulate(gameBoard, { x, y }) ? 1 : 0;
      } else if (row[x] === 1) {
        row[x] = doesCellSurvive(gameBoard, { x, y }) ? 1 : 0;
      } else {
        console.error(`Unexpected Value in GameBoard: ${row[x]}`);
      }
    }
    newBoard.push(row);
  }
  return newBoard;
}
export function growGameboard(gameBoard: number[][], requiredSize: number): number[][] {
  if (gameBoard.length >= requiredSize) {
    return gameBoard;
  }
  return growGameboard(addOneRowAndColToBoard(gameBoard), requiredSize);
}

function addOneRowAndColToBoard(gameBoard: number[][]) {
  return addRowToGameBoard(addColToGameBoard(gameBoard));
}

export function addRowToGameBoard(gameBoard: number[][]) {
  const newRow = Array(gameBoard[0].length).fill(0);
  if (gameBoard.length % 2 == 0) {
    return concat(gameBoard, [newRow]) as number[][];
  } else {
    return concat([newRow], gameBoard) as number[][];
  }
}

export function addColToGameBoard(gameBoard: number[][]) {
  if (gameBoard[0].length % 2 == 0) {
    return map(gameBoard, (row) => concat(row, 0));
  } else {
    return map(gameBoard, (row) => concat(0, row));
  }
}

export function shrinkGameBoard(gameBoard: number[][], size: number): number[][] {
  if (gameBoard.length <= size) {
    return gameBoard;
  }
  return shrinkGameBoard(removeOneRowAndColFromGameBoard(gameBoard), size);
}

function removeOneRowAndColFromGameBoard(gameBoard: number[][]) {
  return removeRowFromGameBoard(removeColFromGameBoard(gameBoard));
}
export function removeRowFromGameBoard(gameBoard: number[][]) {
  if (gameBoard.length % 2 === 0) {
    return drop(gameBoard);
  } else {
    return dropRight(gameBoard);
  }
}

export function removeColFromGameBoard(gameBoard: number[][]) {
  if (gameBoard[0].length % 2 === 0) {
    return map(gameBoard, (row) => drop(row));
  } else {
    return map(gameBoard, (row) => dropRight(row));
  }
}

export function countActiveCells(gameBoard: number[][]) {
  return gameBoard.flat().reduce((sum, cell) => sum + cell);
}
