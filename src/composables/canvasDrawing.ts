import { withCtx } from "vue";

interface Point {
  x: number;
  y: number;
}

interface Line {
  startPoint: Point;
  endPoint: Point;
}
function isCanvasOrCtxNull(canvas: HTMLCanvasElement | null) {
  return canvas === null || canvas.getContext("2d") === null;
}

export function calculateGameBoardToCanvasFaktor(
  canvas: HTMLCanvasElement | null,
  gameBoard: number[][]
) {
  if (isCanvasOrCtxNull(canvas)) {
    console.warn("canvas or Context was null could not calclulate gameBoardToCanvasFaktor");
    return {
      horizontal: 1,
      vertical: 1,
    };
  }
  canvas = canvas as HTMLCanvasElement;
  return {
    horizontal: Math.floor(canvas.width / gameBoard[0].length),
    vertical: Math.floor(canvas.height / gameBoard.length),
  };
}
export function clearCanvas(canvas: HTMLCanvasElement | null) {
  if (isCanvasOrCtxNull(canvas)) {
    return;
  }
  canvas = canvas as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function drawGameOfLifeOnCanvas(canvas: HTMLCanvasElement | null, gameBoard: number[][]) {
  if (isCanvasOrCtxNull(canvas)) {
    console.warn("canvas or Context was null");
    return;
  }
  canvas = canvas as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const gameBoardToCanvasFaktor = calculateGameBoardToCanvasFaktor(canvas, gameBoard);
  setup(ctx, canvas);

  ctx.beginPath();

  for (let y = 0; y < gameBoard.length; y++) {
    for (let x = 0; x < gameBoard[y].length; x++)
      if (gameBoard[y][x] === 1) {
        const canvasX = x * gameBoardToCanvasFaktor.horizontal;
        const canvasY = y * gameBoardToCanvasFaktor.vertical;
        ctx.fillRect(
          canvasX,
          canvasY,
          gameBoardToCanvasFaktor.horizontal,
          gameBoardToCanvasFaktor.vertical
        );
      }
  }
  ctx.stroke();
}

function setup(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.fillStyle = "black";
}
