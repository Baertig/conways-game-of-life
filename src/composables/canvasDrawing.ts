import { withCtx } from "vue";

interface Point {
  x: number;
  y: number;
}

interface Line {
  startPoint: Point;
  endPoint: Point;
}

export function drawGrid(
  canvas: HTMLCanvasElement,
  x_gap: number,
  y_gap: number
) {
  const ctx = canvas.getContext("2d");
  calculateLinePointsForGrid(canvas.width, canvas.height, x_gap, y_gap).forEach(
    ({ startPoint, endPoint }) => {
      ctx?.moveTo(startPoint.x, startPoint.y);
      ctx?.lineTo(endPoint.x, endPoint.y);
    }
  );
  ctx?.stroke();
}

export function calculateLinePointsForGrid(
  width: number,
  height: number,
  x_gap: number,
  y_gap: number
): Line[] {
  const lines = [] as Line[];
  for (let x = 0; x < width; x += x_gap) {
    const startPoint = { x, y: 0 };
    const endPoint = { x, y: height };
    lines.push({ startPoint, endPoint });
  }
  for (let y = 0; y < height; y += y_gap) {
    const startPoint = { x: 0, y };
    const endPoint = { x: width, y };
    lines.push({ startPoint, endPoint });
  }
  return lines;
}
