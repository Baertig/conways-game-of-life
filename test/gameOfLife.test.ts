const gameOfLife = require("../src/composables/gameOfLife");

test("initialze Array with size 4", () => {
  const gameBoardSize4 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  expect(gameOfLife.createGameBoardArrayFromSize(4)).toEqual(gameBoardSize4);
});

// Size 5x5
// Total Index      Rows
// 0  1  2  3  X    0 -> (4,0)
// 5  6  7  8  9    1
// 10 11 12 13 14   2
// 15 16 17 18 19   3
// 20 21 22 23 24   4
test("index: 4, size: 5x5 => x=4 and y=0", () => {
  const position = { x: 4, y: 0 };
  expect(gameOfLife.xAndYPositionFromTotalIndexAndSize(4, 5)).toEqual(position);
});

// Size 5x5
// Total Index      Rows
// 0  1  2  3  4    0
// 5  6  X  8  9    1 -> (2,1)
// 10 11 12 13 14   2
// 15 16 17 18 19   3
// 20 21 22 23 24   4
test("index: 7, size: 5x5 => x=2 and y=1", () => {
  const position = { x: 2, y: 1 };
  expect(gameOfLife.xAndYPositionFromTotalIndexAndSize(7, 5)).toEqual(position);
});

test("cell with 2 neigbours", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ];
  const position = { x: 1, y: 1 };
  expect(gameOfLife.numberOfLivingNeighbours(board, position)).toBe(2);
});

test("cell with 3 neighbours and 2 non related", () => {
  const board = [
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ];
  const position = { x: 2, y: 3 };
  expect(gameOfLife.numberOfLivingNeighbours(board, position)).toBe(3);
});

test("row of 3 number of Living neighbours middle", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];
  const position = { x: 2, y: 2 };
  expect(gameOfLife.numberOfLivingNeighbours(board, position)).toBe(2);
});

test("row of 3 number of Living neighbours side", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];
  const position = { x: 1, y: 2 };
  expect(gameOfLife.numberOfLivingNeighbours(board, position)).toBe(3);
});

test("cell dies from solitude(only on neighbour)", () => {
  const board = [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const position = { x: 0, y: 0 };
  expect(gameOfLife.doesCellSurvive(board, position)).toBe(false);
});

test("cell survives(2 neighbours)", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ];
  const position = { x: 2, y: 1 };
  expect(gameOfLife.doesCellSurvive(board, position)).toBe(true);
});

test("cell dies from overpopulation (5 neighbours)", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
  ];
  const position = { x: 1, y: 2 };
  expect(gameOfLife.doesCellSurvive(board, position)).toBe(false);
});

test("does cell survive row of 3 middle", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];
  const position = { x: 2, y: 2 };
  expect(gameOfLife.doesCellSurvive(board, position)).toBe(true);
});

test("cell populates (3 neighbours)", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 0],
  ];
  const position = { x: 2, y: 1 };
  expect(gameOfLife.willCellPopulate(board, position)).toBe(true);
});

test("cell is not pupulated (0 neigbours)", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 0],
  ];
  const position = { x: 1, y: 0 };
  expect(gameOfLife.willCellPopulate(board, position)).toBe(false);
});

test("row of 3 will Cell Populate side", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];
  const position = { x: 1, y: 2 };
  expect(gameOfLife.willCellPopulate(board, position)).toBe(true);
});

test("useGameBoard simple Row of Three", () => {
  const startBoard = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ];
  const endBoard = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const { gameBoard, calculateNextBoard } = gameOfLife.useGameOfLife(4);
  gameBoard.value = startBoard;
  calculateNextBoard();
  expect(gameBoard.value).toEqual(endBoard);
});
