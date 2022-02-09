const canvasDrawing = require("../src/composables/canvasDrawing");

test("simple grid with gap=10 and 100x100 canvas", () => {
  const width = 100;
  const height = 100;
  const x_gap = 10;
  const y_gap = 10;
  console.log(canvasDrawing);
  const linePoints = canvasDrawing.calculateLinePointsForGrid(
    width,
    height,
    x_gap,
    y_gap
  );
  const examplelineY = {
    startPoint: {
      x: 0,
      y: 30,
    },
    endPoint: {
      x: width,
      y: 30,
    },
  };
  const examplelineX = {
    startPoint: {
      x: 40,
      y: 0,
    },
    endPoint: {
      x: 40,
      y: height,
    },
  };
  expect(linePoints.length).toEqual(20);
  expect(linePoints).toContainEqual(examplelineY);
  expect(linePoints).toContainEqual(examplelineX);
});
