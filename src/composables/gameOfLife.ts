export function createGameBoardArrayFromSize(size: number): number[][] {
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

export function numberOfLivingNeighbours(
  board: number[][],
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
  livingNeighbours -= board[pos.y][pos.x]; //because we don't want to count the own cell
  return livingNeighbours;
}

export function doesCellSurvive(
  board: number[][],
  pos: { x: number; y: number }
): boolean {
  const neighbours = numberOfLivingNeighbours(board, pos);
  if (neighbours <= 1) {
    return false;
  } else if (neighbours <= 3) {
    return true;
  } else {
    return false;
  }
}

export function willCellPopulate(
  board: number[][],
  pos: { x: number; y: number }
): boolean {
  const neighbours = numberOfLivingNeighbours(board, pos);
  console.log(`neighbours=${neighbours}`);
  if (neighbours === 3) {
    return true;
  }
  return false;
}
